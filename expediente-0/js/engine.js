/* EXPEDIENTE 0 — motor del caso: descubrimiento, consulta libre, contradicciones,
 * cronología, mapa y evaluación del razonamiento. Genérico: todo lo específico
 * de cada expediente vive en sus datos (data/caseNN.js). */
(function () {
  const NOT_FOUND = 'No consta en el expediente.';

  /* ---------- Versiones (varias soluciones por caso) ----------
   * Un caso con `variants` comparte estructura (personas, escena, evidencias, solicitudes)
   * y cada versión sobrescribe contenidos: hechos, detalles, respuestas, contradicciones y verdad. */
  const resolved = {};
  function resolveCase(base, vid) {
    const key = base.id + '|' + vid;
    if (resolved[key]) return resolved[key];
    const v = base.variants[vid];
    const c = Object.assign({}, base, { variant: vid, variantIndex: Object.keys(base.variants).indexOf(vid), variantCount: Object.keys(base.variants).length });
    c.facts = Object.assign({}, base.facts, v.facts || {});
    c.evidence = base.evidence.map(e => (v.evidence || {})[e.id] ? Object.assign({}, e, v.evidence[e.id]) : e);
    c.people = base.people.map(p => {
      const ans = (v.answers || {})[p.id], cf = (v.confront || {})[p.id];
      if (!ans && !cf) return p;
      return Object.assign({}, p, {
        questions: p.questions.map(q => ans && ans[q.id] ? Object.assign({}, q, ans[q.id]) : q),
        confront: Object.assign({}, p.confront, cf || {})
      });
    });
    c.conflicts = (base.conflicts || []).concat(v.conflicts || []);
    c.truth = v.truth;
    c.trial = Object.assign({}, base.trial || {}, v.trial || {});
    c.trialIntro = Object.assign({}, base.trialIntro || {}, v.trialIntro || {});
    c.evaluation = Object.assign({}, base.evaluation || {}, v.evaluation || {});
    resolved[key] = c;
    return c;
  }
  function getCase(id) {
    const base = E0.cases.find(c => c.id === id) || null;
    if (!base || !base.variants) return base;
    const st = E0.store && E0.store.state;
    const cs = st && st.cases[id];
    const vid = cs && cs.variant && base.variants[cs.variant] ? cs.variant : Object.keys(base.variants)[0];
    return resolveCase(base, vid);
  }
  function pickVariant(base, avoid) {
    const ids = Object.keys(base.variants);
    const pool = ids.length > 1 && avoid ? ids.filter(x => x !== avoid) : ids;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /* HH:MM → minutos desde las 12:00 del día del hecho (madrugada = +24 h). */
  function minutes(hhmm) {
    if (!hhmm) return null;
    const [h, m] = hhmm.split(':').map(Number);
    const hh = h < 12 ? h + 24 : h;
    return hh * 60 + m;
  }
  function fmt(min) {
    const h = Math.floor(min / 60) % 24;
    const m = min % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  function norm(t) {
    return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function known(cs, id) { return Object.prototype.hasOwnProperty.call(cs.discovered, id); }

  function log(cs, type, data) {
    cs.log.push(Object.assign({ type, seq: cs.seq, ts: Date.now() }, data || {}));
  }

  /* Incorpora hechos al expediente. Devuelve los nuevos. */
  function discover(cs, ids) {
    const fresh = [];
    (ids || []).forEach(id => {
      if (!known(cs, id)) {
        cs.seq += 1;
        cs.discovered[id] = cs.seq;
        fresh.push(id);
      }
    });
    return fresh;
  }

  function knownFacts(c, cs, filter) {
    return Object.keys(cs.discovered)
      .sort((a, b) => cs.discovered[a] - cs.discovered[b])
      .map(id => Object.assign({ id }, c.facts[id]))
      .filter(f => f.text && (!filter || filter(f)));
  }

  function personName(c, pid) {
    if (pid === c.victim.id) return c.victim.name;
    const x = (c.extraPersons || []).find(q => q.id === pid);
    if (x) return x.name;
    const p = c.people.find(x => x.id === pid);
    if (p) return p.name;
    const t = (c.judicial.targets || []).find(x => x.id === pid);
    return t ? t.name : '';
  }

  /* Personas a las que se puede pedir antenas: las del expediente y las extra del caso. */
  function judicialTargets(c) {
    return c.people.map(p => ({ id: p.id, name: p.name })).concat(c.judicial.targets || []);
  }

  /* Ventajas de especialidad: costes y solicitudes judiciales. */
  function costOf(kind, base) {
    const sp = E0.store.state.player.specialty;
    if ((kind === 'lab' && sp === 'criminalistica') || (kind === 'digital' && sp === 'digital')) return Math.round(base * 0.8);
    return base;
  }
  function judicialMax(c) {
    return c.judicial.max + (E0.store.state.player.specialty === 'juridica' ? 1 : 0);
  }

  /* ---------- Mapa ---------- */
  function placeDistance(c, a, b) {
    const pa = c.places[a], pb = c.places[b];
    if (!pa || !pb || pa.offmap || pb.offmap) return null;
    return Math.hypot(pa.x - pb.x, pa.y - pb.y) * (c.mapScale || 0.1);
  }
  function knownPlaces(c, cs) {
    const set = new Set();
    knownFacts(c, cs).forEach(f => { if (f.place) set.add(f.place); });
    return Object.keys(c.places).filter(k => set.has(k));
  }

  /* ---------- Consulta libre (determinista, solo sobre hechos ya incorporados) ---------- */
  const TOPIC_WORDS = {
    llamada: ['llamada', 'llamadas', 'llamo', 'llamar', 'telefono', 'telefonos', 'movil', 'buzon'],
    mensaje: ['mensaje', 'mensajes', 'whatsapp', 'escribio', 'sms', 'chat'],
    camara: ['camara', 'camaras', 'video', 'grabacion', 'grabaciones', 'portal', 'ascensor'],
    vehiculo: ['coche', 'coches', 'vehiculo', 'vehiculos', 'matricula', 'audi', 'seat', 'turismo', 'furgoneta', 'transit', 'clio'],
    garaje: ['garaje', 'rampa', 'plaza', 'tarjeta'],
    portatil: ['portatil', 'ordenador', 'pc', 'excel', 'archivo', 'hoja', 'calendario', 'correo', 'borrador', 'tablet', 'documento', 'testamento'],
    acceso: ['acceso', 'llave', 'llaves', 'entrar', 'entro', 'puerta', 'abrir', 'abrio', 'copia', 'gancho'],
    dinero: ['dinero', 'transferencia', 'transferencias', 'seguro', 'deuda', 'deudas', 'prestamo', 'alquiler', 'cuentas', 'fondo', 'pagares', 'efectivo', 'herencia'],
    copa: ['copa', 'copas', 'vino', 'botella'],
    tox: ['zolpidem', 'toxico', 'toxicologia', 'droga', 'sedante', 'medicacion', 'pastillas'],
    huella: ['huella', 'huellas', 'dactilar'],
    adn: ['adn', 'cabello', 'pelo', 'unas'],
    fibra: ['fibra', 'fibras', 'lana', 'abrigo', 'sudadera', 'ropa'],
    arma: ['arma', 'golpe', 'herida', 'sujetalibros', 'objeto', 'escritorio', 'esquina'],
    ventana: ['ventana', 'alfeizar'],
    ubicacion: ['donde', 'ubicacion', 'antena', 'antenas', 'estaba', 'estuvo', 'coartada', 'gps'],
    muerte: ['muerte', 'murio', 'hora', 'autopsia', 'forense'],
    testigo: ['oyo', 'ruido', 'discusion', 'testigo', 'escucho', 'vio'],
    peaje: ['peaje', 'autopista', 'portico'],
    rio: ['rio', 'puente', 'barandilla', 'zapatilla', 'zapato'],
    audio: ['audio', 'voz', 'grabacion', 'buzon']
  };
  const SOURCE_OF = { llamada: 'llamada', mensaje: 'mensaje', camara: 'cámara', ubicacion: 'antena' };
  const STOP = new Set(['quiero', 'saber', 'sabes', 'sabe', 'dime', 'decir', 'busca', 'buscar', 'registra', 'registrar', 'compara', 'comparar', 'consta', 'tenia', 'tenian', 'hubo', 'alguien', 'alguna', 'algun', 'noche', 'aquella', 'despues', 'antes', 'entre', 'sobre', 'quien', 'quienes', 'cuando', 'cuanto', 'cuantos', 'donde', 'desde', 'hasta', 'hacia', 'tiene', 'tienen', 'existe', 'existen', 'informacion', 'declaracion', 'declaraciones', 'datos', 'todos', 'todas', 'cosas', 'puedes', 'podemos', 'mostrar', 'muestra', 'muestrame', 'ensena', 'cuales', 'segun', 'hacer', 'hecho', 'hechos', 'pasado', 'paso', 'ocurrio', 'estaban', 'estuvieron', 'hicieron', 'llego', 'salio', 'visto']);

  /* Palabras que identifican a cada persona del caso: nombre, apellidos y alias opcionales. */
  function personWords(c) {
    const out = {};
    const add = (id, name, extra) => {
      const toks = norm(name).split(/[^a-zñ]+/).filter(w => w.length >= 3);
      out[id] = { names: toks, all: toks.concat((extra || []).map(norm)) };
    };
    c.people.forEach(p => add(p.id, p.name, (c.queryAliases || {})[p.id]));
    add(c.victim.id, c.victim.name, ['victima'].concat((c.queryAliases || {})[c.victim.id] || []));
    (c.extraPersons || []).forEach(x => add(x.id, x.name, ['victima']));
    (c.judicial.targets || []).forEach(t => { if (!out[t.id]) add(t.id, t.name); });
    return out;
  }

  function query(c, cs, text) {
    const q = norm(text);
    const words = q.replace(/[^a-z0-9:ñ ]/g, ' ').split(/\s+/).filter(Boolean);
    const PW = personWords(c);
    const persons = Object.keys(PW).filter(p => PW[p].all.some(w => words.includes(w)));
    const topics = Object.keys(TOPIC_WORDS).filter(t => TOPIC_WORDS[t].some(w => words.includes(w)));
    const tm = q.match(/\b(\d{1,2})[:.h](\d{2})\b/);
    const qTime = tm ? minutes(tm[1].padStart(2, '0') + ':' + tm[2]) : null;

    if (!persons.length && !topics.length && qTime === null) return { results: [], message: NOT_FOUND };

    // Si la pregunta nombra algo que no figura en ningún hecho incorporado, no se inventa una respuesta.
    const vocab = new Set([].concat(...Object.values(PW).map(x => x.all), ...Object.values(TOPIC_WORDS)));
    const corpus = knownFacts(c, cs).map(f => norm(f.text)).join(' ');
    const unknownTerm = words.some(w => w.length >= 5 && !/\d/.test(w) && !STOP.has(w) && !vocab.has(w) && !corpus.includes(w.slice(0, 5)));
    if (unknownTerm) return { results: [], message: NOT_FOUND };

    const hasWord = (txt, w) => new RegExp('(^|[^a-z0-9])' + w + '([^a-z0-9]|$)').test(txt);
    const genericTopics = topics.every(t => t === 'ubicacion' || t === 'muerte');

    const scored = knownFacts(c, cs).map(f => {
      const ftext = norm(f.text);
      let score = 0;
      let personHit = false;
      persons.forEach(p => {
        if (f.person === p || PW[p].names.some(w => hasWord(ftext, w))) { score += 3; personHit = true; }
      });
      let topicHit = false;
      topics.forEach(t => {
        if ((f.tags || []).includes(t) || TOPIC_WORDS[t].some(w => hasWord(ftext, w))) { score += 2; topicHit = true; }
        if (SOURCE_OF[t] && f.source === SOURCE_OF[t]) score += 2;
      });
      let timeHit = false;
      if (qTime !== null && f.time) {
        const a = minutes(f.time), b = f.end ? minutes(f.end) : a;
        if (qTime >= a - 20 && qTime <= b + 20) { score += 3; timeHit = true; }
      }
      let ok = true;
      if (persons.length && !personHit) ok = false;
      if (topics.length && !topicHit && !(genericTopics && timeHit)) ok = false;
      if (qTime !== null && !timeHit && !persons.length && !topics.length) ok = false;
      return { f, score: ok ? score : 0, timeHit };
    }).filter(x => x.score > 0);

    let list = scored;
    if (qTime !== null && scored.some(x => x.timeHit)) list = scored.filter(x => x.timeHit);
    list.sort((a, b) => b.score - a.score);
    const results = list.slice(0, 6).map(x => x.f);
    return { results, message: results.length ? null : NOT_FOUND };
  }

  /* ---------- Comparador de fuentes ---------- */
  function findConflict(c, a, b) {
    return c.conflicts.find(k => (k.a === a && k.b === b) || (k.a === b && k.b === a)) || null;
  }

  /* ---------- Cronología: solapamientos objetivos ---------- */
  function timelineCompare(c, cs) {
    const items = cs.timeline.filter(e => e.time).map(e => {
      const a = minutes(e.time), b = e.end ? minutes(e.end) : a;
      return Object.assign({}, e, { a, b });
    });
    const out = [];
    const seen = new Set();
    const pname = k => (c.places[k] || { name: k }).name;
    const span = x => fmt(x.a) + (x.b !== x.a ? '–' + fmt(x.b) : '');
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const x = items[i], y = items[j];
        if (x.factId && y.factId) {
          const k = findConflict(c, x.factId, y.factId);
          if (k && !seen.has(k.id)) { seen.add(k.id); out.push({ kind: 'conflict', conflict: k, x, y }); continue; }
        }
        if (x.person && x.person === y.person && x.place && y.place && x.place !== y.place && x.a <= y.b && y.a <= x.b) {
          out.push({ kind: 'overlap', x, y, text: personName(c, x.person) + ' figura en dos lugares distintos en intervalos que se solapan: «' + pname(x.place) + '» (' + x.source + ', ' + span(x) + ') y «' + pname(y.place) + '» (' + y.source + ', ' + span(y) + ').' });
        }
      }
    }
    return out;
  }

  /* ---------- Hipótesis ---------- */
  function hypStatus(h) {
    if (h.status === 'descartada') return { key: 'off', label: '✘ Descartada' };
    if (h.against.length) return { key: 'warn', label: '⚠ Contradice ciertos hechos' };
    if (h.supports.length >= 2) return { key: 'ok', label: '✔ Compatible con los hechos vinculados' };
    return { key: 'unk', label: '? Información insuficiente' };
  }

  /* ---------- Cadena de custodia ---------- */
  function custody(c, cs, e) {
    const steps = [];
    const done = !!cs.examined[e.id];
    const labs = Object.keys(e.lab || {}).filter(k => cs.lab[e.id + ':' + k]);
    const photo = !!(cs.photos || {})[e.id];
    const seal = 'E0-' + c.id.replace('EXP-', '') + '-' + e.id;
    steps.push({ k: 'Identificación', ok: done, text: done ? 'Indicio ' + e.id + ' identificado en la inspección ocular (' + e.room + ').' : 'Pendiente de inspección.' });
    if (e.fixed) {
      steps.push({ k: 'Recogida', ok: done, text: done ? 'Elemento fijo: se documenta in situ, no se traslada.' : '—' });
      steps.push({ k: 'Almacenamiento', ok: done, text: done ? 'No procede (permanece en el lugar).' : '—' });
    } else {
      steps.push({ k: 'Recogida', ok: done, text: done ? (e.custody || 'Recogido con guantes y embalado') + '. Precinto ' + seal + '.' : '—' });
      steps.push({ k: 'Almacenamiento', ok: done, text: done ? 'Depósito de efectos de la unidad, estante ' + c.id + '.' : '—' });
    }
    const labName = k => (e.lab[k].label || c.labKinds[k]);
    steps.push({ k: 'Transferencia', ok: labs.length > 0, text: labs.length ? 'Remitido al laboratorio con el precinto intacto: ' + labs.map(labName).join(', ') + '.' : (e.lab ? 'Sin remitir a laboratorio.' : 'No requiere análisis de laboratorio.'), na: !e.lab });
    steps.push({ k: 'Análisis', ok: labs.length > 0, text: labs.length ? labs.length + ' análisis realizado(s).' : '—', na: !e.lab });
    const results = labs.reduce((n, k) => n + e.lab[k].reveals.length, 0);
    steps.push({ k: 'Resultado', ok: labs.length > 0, text: labs.length ? results + ' resultado(s) incorporados al expediente.' : '—', na: !e.lab });
    const notes = ((cs.custodyNotes || {})[e.id] || []);
    steps.push({ k: 'Documentación', ok: photo, text: (photo ? 'Reportaje fotográfico realizado.' : 'Falta reportaje fotográfico.') + (notes.length ? ' Notas: ' + notes.join(' · ') : '') });
    const complete = done && photo;
    return { steps, complete, photo, seal };
  }

  /* ---------- Evaluación final ---------- */
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }
  const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));

  function evaluate(c, cs, v) {
    const T = c.truth;
    const X = c.evaluation;
    const L = cs.log;
    const count = t => L.filter(e => e.type === t).length;
    const has = id => known(cs, id);
    const usedDig = id => !!cs.digital[id];
    const conflictsFound = Object.keys(cs.conflicts);
    const keyFound = conflictsFound.filter(id => T.keyConflicts.includes(id));
    const examined = Object.keys(cs.examined).length;
    const totalEv = c.evidence.length;
    const asked = Object.values(cs.asked).reduce((n, o) => n + Object.keys(o).length, 0);
    const interviewed = Object.keys(cs.asked).filter(p => Object.keys(cs.asked[p]).length).length;
    const confronts = L.filter(e => e.type === 'confront');
    const relevantConfronts = confronts.filter(e => e.relevant).length;
    const revisits = count('revisit');
    const hyps = cs.hypotheses;
    const abandoned = hyps.filter(h => h.status === 'descartada').length;
    const suspects = new Set(hyps.map(h => h.suspect).filter(s => s && s !== 'nd'));
    const confUpdates = count('hyp_conf');
    const confDrops = L.filter(e => e.type === 'hyp_conf' && e.to < e.from).length;
    const tlCompares = count('timeline_compare');
    const queries = L.filter(e => e.type === 'query');
    const photos = Object.keys(cs.photos || {}).filter(id => cs.examined[id]).length;
    const forensicUses = Object.keys(cs.forensic || {}).length;
    const forensicHits = Object.values(cs.forensic || {}).filter(x => x === 'pos').length;
    const wallLinks = ((cs.wall || {}).links || []).length;
    const mapLinks = (cs.mapLinks || []).length;
    const stmtConflicts = conflictsFound.filter(id => { const k = c.conflicts.find(x => x.id === id); return k && (c.facts[k.a].kind === 'statement' || c.facts[k.b].kind === 'statement'); }).length;
    const evidenceChosen = v.evidence || [];
    const decisiveChosen = evidenceChosen.filter(id => T.decisive.includes(id));
    const weakChosen = evidenceChosen.filter(id => T.weak.includes(id));
    const insufficient = v.culprit === 'insuficiente';
    const okCulprit = v.culprit === T.culprit;
    const desc = arr => arr.find(o => /_desc$|_nd$|desconocido/.test(o.id));
    const vo = c.verdictOptions;

    /* --- Resultado del caso --- */
    const comp = [];
    const idPts = okCulprit ? 30 : insufficient ? (decisiveChosen.length < 3 ? 12 : 6) : 0;
    comp.push({ name: vo.culpritLabel || 'Identidad', pts: idPts, max: 30, text: okCulprit ? 'Conclusión principal correcta.' : insufficient ? 'Declaraste evidencia insuficiente. Es una conclusión prudente, pero el caso admitía una explicación.' : 'La conclusión principal no coincide con lo que ocurrió.' });
    const moD = desc(vo.motives);
    const moPts = v.motive === T.motive ? 15 : (moD && v.motive === moD.id) ? 4 : 0;
    comp.push({ name: 'Móvil', pts: moPts, max: 15, text: moPts === 15 ? 'Móvil correcto.' : moPts ? 'No determinaste el móvil.' : 'Móvil incorrecto.' });
    const meD = desc(vo.methods);
    const partial = (T.partialMethods || {})[v.method];
    const mePts = v.method === T.method ? 15 : partial ? 7 : (meD && v.method === meD.id) ? 4 : 0;
    comp.push({ name: 'Método', pts: mePts, max: 15, text: mePts === 15 ? 'Método correcto.' : mePts === 7 ? partial : mePts ? 'No determinaste el método.' : 'Método incorrecto.' });
    const wD = desc(vo.windows);
    const wPts = v.window === T.window ? 10 : (wD && v.window === wD.id) ? 3 : 0;
    comp.push({ name: 'Cronología', pts: wPts, max: 10, text: wPts === 10 ? 'Franja temporal correcta.' : wPts ? 'No fijaste la franja.' : 'La franja propuesta no es la real.' });
    const pPts = Math.max(0, Math.min(15, decisiveChosen.length * 3) - weakChosen.length * 3);
    comp.push({ name: 'Pruebas', pts: pPts, max: 15, text: decisiveChosen.length + ' prueba(s) sólidas entre las principales' + (weakChosen.length ? ' y ' + weakChosen.length + ' de valor débil o engañoso presentada(s) como principal(es).' : '.') });
    const lPts = Math.round(keyFound.length / T.keyConflicts.length * 10);
    comp.push({ name: 'Mentiras y contradicciones', pts: lPts, max: 10, text: keyFound.length + ' de ' + T.keyConflicts.length + ' contradicciones clave registradas.' });
    const acc = v.accomplices || [];
    const aPts = sameSet(acc, T.accomplices) ? 5 : 0;
    comp.push({ name: vo.accompliceLabel || 'Cómplices', pts: aPts, max: 5, text: aPts ? (T.accomplices.length ? 'Identificaste correctamente a quien colaboró.' : 'Correcto: nadie más participó.') : (T.accomplices.length ? 'No identificaste correctamente a quien colaboró.' : 'Atribuiste una colaboración que no existió.') });
    const raw = comp.reduce((n, x) => n + x.pts, 0);
    /* Señalar a quien no fue nunca aprueba, por buena que sea la investigación. */
    const total = okCulprit || insufficient ? raw : Math.min(raw, 45);

    /* --- Perfil de razonamiento observado --- */
    const P = {};
    P.contradicciones = { score: clamp(conflictsFound.length / c.conflicts.length * 55 + keyFound.length / T.keyConflicts.length * 45),
      why: 'Registraste ' + conflictsFound.length + ' de ' + c.conflicts.length + ' diferencias objetivas posibles; ' + keyFound.length + ' eran clave para la reconstrucción.' };
    const subtle = X.subtle.ids.filter(has);
    P.atencion = { score: clamp(examined / totalEv * 45 + subtle.length * 9 + (examined ? photos / examined * 8 : 0) + Math.min(12, forensicHits * 4)),
      why: 'Examinaste ' + examined + ' de ' + totalEv + ' elementos, ' + subtle.length + ' de ' + X.subtle.ids.length + ' detalles discretos (' + X.subtle.label + '), fotografiaste ' + photos + ' y obtuviste ' + forensicHits + ' hallazgo(s) con herramientas forenses.' };
    const tc = X.temporalConflicts.filter(id => cs.conflicts[id]).length;
    P.temporal = { score: clamp(Math.min(10, cs.timeline.length) * 4 + (tlCompares ? 20 : 0) + (wPts === 10 ? 25 : 0) + tc * 8),
      why: cs.timeline.length + ' eventos en tu cronología; ' + (tlCompares ? 'usaste la comparación de cronologías' : 'no usaste la comparación de cronologías') + '; franja final ' + (wPts === 10 ? 'correcta' : 'no correcta') + '.' };
    const judRelevant = cs.judicial.filter(p => X.judicialRelevant.includes(p)).length;
    const mov = X.movement.ids.filter(usedDig).length;
    P.espacial = { score: clamp(mov * 18 + judRelevant * 12 + X.spatialBonus.filter(has).length * 8 + Math.min(12, mapLinks * 4)),
      why: 'Consultaste ' + mov + ' de ' + X.movement.ids.length + ' fuentes de movimiento (' + X.movement.label + '), ' + cs.judicial.length + ' solicitud(es) de antenas y trazaste ' + mapLinks + ' conexión(es) en el mapa.' };
    P.memoria = { score: clamp(Math.min(60, relevantConfronts * 12) + Math.min(20, revisits * 10) + Math.min(20, L.filter(e => e.type === 'compare' && e.found && e.gap > 8).length * 10)),
      why: relevantConfronts + ' confrontaciones pertinentes con información de otras fuentes y ' + revisits + ' revisión(es) de evidencia o respuestas tras incorporar datos nuevos.' };
    P.verbal = { score: clamp(interviewed / c.people.length * 30 + Math.min(30, asked * 1.2) + Math.min(40, stmtConflicts * 8)),
      why: 'Entrevistaste a ' + interviewed + ' de ' + c.people.length + ' personas con ' + asked + ' preguntas; ' + stmtConflicts + ' contradicciones detectadas implican declaraciones.' };
    const firstHyp = L.find(e => e.type === 'hyp_create');
    const earlyFix = !!(firstHyp && firstHyp.seq < 12 && firstHyp.conf >= 80);
    P.incertidumbre = { score: clamp(50 + (earlyFix ? -15 : 15) - weakChosen.length * 12 + (confUpdates ? 15 : 0) + (insufficient && decisiveChosen.length < 3 ? 15 : 0) + (!insufficient && decisiveChosen.length >= 3 ? 10 : 0)),
      why: (earlyFix ? 'Asignaste alta confianza a una hipótesis con poca información. ' : 'No fijaste confianzas altas de forma prematura. ') + (weakChosen.length ? 'Presentaste ' + weakChosen.length + ' indicio(s) de valor limitado como prueba principal.' : 'No presentaste indicios débiles como prueba principal.') };
    P.flexibilidad = { score: clamp(Math.min(40, abandoned * 20) + (suspects.size >= 3 ? 30 : suspects.size === 2 ? 20 : 0) + Math.min(20, confUpdates * 5) + (revisits ? 10 : 0)),
      why: 'Consideraste ' + suspects.size + ' persona(s) de interés en tus hipótesis, descartaste ' + abandoned + ' y actualizaste la confianza ' + confUpdates + ' vez/veces.' };
    P.deduccion = { score: clamp((idPts + moPts + mePts + wPts) / 70 * 100),
      why: 'Basado en la conclusión principal, el móvil, el método y la franja temporal del veredicto.' };
    P.logica = { score: clamp((okCulprit ? 40 : insufficient ? 15 : 0) + Math.min(40, decisiveChosen.length * 8) + (weakChosen.length ? 0 : 20)),
      why: 'Coherencia entre la conclusión y las pruebas que la sostienen (' + decisiveChosen.length + ' sólidas, ' + weakChosen.length + ' débiles).' };
    let lat = 0;
    const latWhy = [];
    X.lateral.forEach(r => {
      const hit = r.type === 'fact' ? has(r.id) : r.type === 'conflict' ? !!cs.conflicts[r.id] : evidenceChosen.includes(r.id);
      if (hit) lat += r.pts;
      if (r.yes && hit) latWhy.push(r.yes); else if (r.no && !hit) latWhy.push(r.no);
    });
    P.lateral = { score: clamp(lat + Math.min(10, wallLinks * 2)), why: latWhy.join(' ') + (wallLinks ? ' Conectaste ' + wallLinks + ' relación(es) en el muro.' : '') };
    const labKeys = Object.keys(cs.lab);
    const labUseful = labKeys.filter(k => X.usefulLab.includes(k)).length;
    P.estrategia = { score: clamp(30 + (labKeys.length ? labUseful / labKeys.length * 30 : 0) + judRelevant * 15 + (queries.length ? 10 : 0) - (E0.store.state.money < 0 ? 10 : 0)),
      why: labUseful + ' de ' + labKeys.length + ' análisis de laboratorio aportaron información relevante; ' + judRelevant + ' de ' + cs.judicial.length + ' solicitudes de antenas fueron especialmente informativas.' };

    /* --- Sesgo de confirmación y texto explicativo --- */
    const lines = [];
    lines.push('Examinaste ' + examined + ' de ' + totalEv + ' elementos de la escena y solicitaste ' + labKeys.length + ' análisis de laboratorio y ' + Object.keys(cs.digital).length + ' consultas digitales.');
    lines.push('Hiciste ' + asked + ' preguntas a ' + interviewed + ' personas y ' + confronts.length + ' confrontaciones (' + relevantConfronts + ' pertinentes).');
    lines.push('Detectaste ' + conflictsFound.length + ' contradicciones objetivas.');
    lines.push('Creaste ' + hyps.length + ' hipótesis' + (abandoned ? ' y abandonaste ' + abandoned + ' al cambiar la información disponible.' : '.'));
    if (revisits) lines.push('Volviste a revisar evidencia o respuestas anteriores ' + revisits + ' vez/veces tras incorporar datos nuevos.');
    let bias;
    if (!hyps.length) bias = 'No formulaste hipótesis explícitas: el veredicto no se apoya en un proceso documentado de contraste.';
    else if (earlyFix && !abandoned && !confDrops) bias = 'Tu investigación mostró una tendencia a mantener la hipótesis inicial: la formulaste pronto, con confianza alta, y no la revisaste a la baja.';
    else if (abandoned || confDrops) bias = 'Mostraste flexibilidad: revisaste o abandonaste hipótesis cuando la información dejó de encajar.';
    else bias = 'No se observa una fijación clara en una hipótesis inicial.';
    lines.push(bias);
    if (examined) lines.push('Cadena de custodia: documentaste fotográficamente ' + photos + ' de ' + examined + ' indicios examinados.');
    if (forensicUses) lines.push('Usaste herramientas forenses ' + forensicUses + ' vez/veces; ' + forensicHits + ' dieron un hallazgo.');

    const stats = [
      ['Evidencias examinadas', examined + '/' + totalEv],
      ['Preguntas realizadas', asked],
      ['Confrontaciones', confronts.length],
      ['Contradicciones detectadas', conflictsFound.length],
      ['Hipótesis creadas', hyps.length],
      ['Hipótesis descartadas', abandoned],
      ['Revisiones', revisits],
      ['Conexiones en el muro', wallLinks],
      ['Conexiones en el mapa', mapLinks],
      ['Consultas libres', queries.length],
      ['Gasto del caso', cs.spent + ' €']
    ];

    return { total, comp, profile: P, lines, stats, decisiveChosen, weakChosen };
  }

  function trialSet(c, key) { return c.trial[key] || c.trial.generic; }

  function trialResolve(c, key, answers) {
    const set = trialSet(c, key);
    const res = set.map(o => ({ id: o.id, text: o.text, answer: answers[o.id] || null, ok: !!(answers[o.id] && o.accept.includes(answers[o.id])) }));
    const rebutted = res.filter(r => r.ok).length;
    let verdict;
    if (rebutted === set.length) verdict = 'El tribunal simulado considera la reconstrucción sólida: todas las objeciones quedaron respondidas con prueba.';
    else if (rebutted >= 1) verdict = 'El tribunal simulado aprecia lagunas: parte de las objeciones no quedaron respondidas.';
    else verdict = 'La parte contraria prevalece: ninguna objeción quedó respondida con una prueba pertinente.';
    return { res, rebutted, total: set.length, verdict };
  }

  /* ---------- Lofoscopia ---------- */
  /* Huellas latentes de un hecho (fact.prints). Si las tiene, el hecho no entra en el
     expediente hasta que se cotejan todas en el banco del laboratorio. */
  function printsOf(c, fid) { return (c.facts[fid] && c.facts[fid].prints) || []; }
  function cardPeople(c) {
    const v = c.victim && c.victim.id ? [{ id: c.victim.id, name: c.victim.name, role: 'Víctima (necrorreseña)' }] : [];
    return v.concat(c.people.map(p => ({ id: p.id, name: p.name, role: p.role })), (c.extraPersons || []).map(p => ({ id: p.id, name: p.name, role: 'Víctima (necrorreseña)' })));
  }
  function gateReveal(c, cs, ids) {
    const direct = [], pending = [];
    (ids || []).forEach(id => {
      const P = printsOf(c, id);
      if (!P.length || known(cs, id)) { direct.push(id); return; }
      cs.latents[id] = cs.latents[id] || { items: {} };
      P.forEach((_, i) => { cs.latents[id].items[i] = cs.latents[id].items[i] || { status: 'pendiente', pick: null, pairs: [], bad: {}, match: null }; });
      pending.push(id);
    });
    return { fresh: discover(cs, direct), pending };
  }
  /* Incorpora el hecho cuando todas sus latentes están resueltas. */
  function settleLatents(c, cs, fid) {
    const g = cs.latents[fid];
    if (!g || known(cs, fid)) return false;
    const done = printsOf(c, fid).every((_, i) => g.items[i] && g.items[i].status !== 'pendiente');
    if (done) discover(cs, [fid]);
    return done;
  }

  E0.engine = { printsOf, cardPeople, gateReveal, settleLatents, NOT_FOUND, getCase, resolveCase, pickVariant, costOf, judicialMax, minutes, fmt, known, discover, knownFacts, personName, judicialTargets, placeDistance, knownPlaces, log, query, findConflict, timelineCompare, hypStatus, custody, evaluate, trialSet, trialResolve, norm };
})();
