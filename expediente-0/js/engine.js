/* EXPEDIENTE 0 — motor del caso: descubrimiento, consulta libre, contradicciones,
 * cronología y evaluación del razonamiento. No contiene texto de interfaz. */
(function () {
  const NOT_FOUND = 'No consta en el expediente.';

  function getCase(id) { return E0.cases.find(c => c.id === id) || null; }

  /* HH:MM → minutos desde las 12:00 del día del hecho (madrugada = +24 h). */
  function minutes(hhmm) {
    if (!hhmm) return null;
    const [h, m] = hhmm.split(':').map(Number);
    const hh = h < 12 ? h + 24 : h;
    return hh * 60 + m;
  }
  function fmt(min) {
    let h = Math.floor(min / 60) % 24;
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
    if (pid === 'daniel') return c.victim.name;
    const p = c.people.find(x => x.id === pid);
    return p ? p.name : '';
  }

  /* ---------- Consulta libre (determinista, solo sobre hechos ya incorporados) ---------- */
  const PERSON_WORDS = {
    javier: ['javier', 'molina', 'socio'],
    elena: ['elena', 'vidal', 'asesora', 'gestora'],
    marta: ['marta', 'ruiz', 'expareja', 'ex'],
    lucia: ['lucia', 'hermana'],
    andres: ['andres', 'pastor', 'vecino'],
    ramon: ['ramon', 'gil', 'propietario', 'casero', 'dueno', 'arrendador'],
    daniel: ['daniel', 'victima', 'ferrer']
  };
  const TOPIC_WORDS = {
    llamada: ['llamada', 'llamadas', 'llamo', 'llamar', 'telefono', 'telefonos', 'movil'],
    mensaje: ['mensaje', 'mensajes', 'whatsapp', 'escribio', 'sms'],
    camara: ['camara', 'camaras', 'video', 'grabacion', 'portal'],
    vehiculo: ['coche', 'coches', 'vehiculo', 'vehiculos', 'matricula', 'audi', 'seat', 'turismo'],
    garaje: ['garaje', 'rampa', 'plaza', 'tarjeta'],
    portatil: ['portatil', 'ordenador', 'pc', 'excel', 'archivo', 'hoja', 'calendario', 'correo', 'borrador'],
    acceso: ['acceso', 'llave', 'llaves', 'entrar', 'entro', 'puerta', 'abrir', 'abrio'],
    dinero: ['dinero', 'transferencia', 'transferencias', 'seguro', 'deuda', 'deudas', 'prestamo', 'alquiler', 'cuentas', 'fondo'],
    copa: ['copa', 'copas', 'vino', 'botella'],
    tox: ['zolpidem', 'toxico', 'toxicologia', 'droga', 'sedante', 'medicacion', 'pastillas'],
    huella: ['huella', 'huellas', 'dactilar'],
    adn: ['adn', 'cabello', 'pelo', 'unas'],
    fibra: ['fibra', 'fibras', 'lana', 'abrigo'],
    arma: ['arma', 'golpe', 'herida', 'sujetalibros', 'objeto'],
    ventana: ['ventana', 'alfeizar'],
    ubicacion: ['donde', 'ubicacion', 'antena', 'antenas', 'estaba', 'estuvo', 'coartada', 'gps'],
    muerte: ['muerte', 'murio', 'hora', 'autopsia', 'forense'],
    testigo: ['oyo', 'ruido', 'discusion', 'testigo', 'escucho']
  };

  const SOURCE_OF = { llamada: 'llamada', mensaje: 'mensaje', camara: 'cámara', ubicacion: 'antena' };
  const STOP = new Set(['quiero', 'saber', 'sabes', 'sabe', 'dime', 'decir', 'busca', 'buscar', 'registra', 'registrar', 'compara', 'comparar', 'consta', 'tenia', 'tenian', 'hubo', 'alguien', 'alguna', 'algun', 'noche', 'aquella', 'despues', 'antes', 'entre', 'sobre', 'quien', 'quienes', 'cuando', 'cuanto', 'cuantos', 'donde', 'desde', 'hasta', 'hacia', 'tiene', 'tienen', 'existe', 'existen', 'informacion', 'declaracion', 'declaraciones', 'datos', 'todos', 'todas', 'cosas', 'puedes', 'podemos', 'mostrar', 'muestra', 'muestrame', 'ensena', 'cuales', 'segun', 'hacer', 'hecho', 'hechos', 'pasado', 'paso', 'ocurrio']);

  function query(c, cs, text) {
    const q = norm(text);
    const words = q.replace(/[^a-z0-9:ñ ]/g, ' ').split(/\s+/).filter(Boolean);
    const persons = Object.keys(PERSON_WORDS).filter(p => PERSON_WORDS[p].some(w => words.includes(w)));
    const topics = Object.keys(TOPIC_WORDS).filter(t => TOPIC_WORDS[t].some(w => words.includes(w)));
    const tm = q.match(/\b(\d{1,2})[:.h](\d{2})\b/);
    const qTime = tm ? minutes(tm[1].padStart(2, '0') + ':' + tm[2]) : null;

    if (!persons.length && !topics.length && qTime === null) return { results: [], message: NOT_FOUND };

    // Si la pregunta nombra algo que no figura en ningún hecho incorporado, no se inventa una respuesta.
    const vocab = new Set([].concat(...Object.values(PERSON_WORDS), ...Object.values(TOPIC_WORDS)));
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
        if (f.person === p || PERSON_WORDS[p].slice(0, 2).some(w => hasWord(ftext, w))) { score += 3; personHit = true; }
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

    // Con hora explícita, priorizar coincidencias temporales.
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
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const x = items[i], y = items[j];
        if (x.factId && y.factId) {
          const k = findConflict(c, x.factId, y.factId);
          if (k && !seen.has(k.id)) { seen.add(k.id); out.push({ kind: 'conflict', conflict: k, x, y }); continue; }
        }
        if (x.person && x.person === y.person && x.place && y.place && x.place !== y.place && x.a <= y.b && y.a <= x.b) {
          out.push({ kind: 'overlap', x, y, text: personName(c, x.person) + ' figura en dos lugares distintos en intervalos que se solapan: «' + (c.places[x.place] || { name: x.place }).name + '» (' + x.source + ', ' + fmt(x.a) + (x.b !== x.a ? '–' + fmt(x.b) : '') + ') y «' + (c.places[y.place] || { name: y.place }).name + '» (' + y.source + ', ' + fmt(y.a) + (y.b !== y.a ? '–' + fmt(y.b) : '') + ').' });
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

  /* ---------- Evaluación final ---------- */
  function clamp(n) { return Math.max(0, Math.min(100, Math.round(n))); }

  function evaluate(c, cs, v) {
    const T = c.truth;
    const L = cs.log;
    const count = t => L.filter(e => e.type === t).length;
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
    const stmtConflicts = conflictsFound.filter(id => { const k = c.conflicts.find(x => x.id === id); return k && (c.facts[k.a].kind === 'statement' || c.facts[k.b].kind === 'statement'); }).length;
    const evidenceChosen = v.evidence || [];
    const decisiveChosen = evidenceChosen.filter(id => T.decisive.includes(id));
    const weakChosen = evidenceChosen.filter(id => T.weak.includes(id));
    const insufficient = v.culprit === 'insuficiente';

    /* --- Resultado del caso --- */
    const comp = [];
    let idPts;
    if (v.culprit === T.culprit) idPts = 30;
    else if (insufficient) idPts = decisiveChosen.length < 3 ? 12 : 6;
    else idPts = 0;
    comp.push({ name: 'Identidad', pts: idPts, max: 30, text: v.culprit === T.culprit ? 'Atribución correcta.' : insufficient ? 'Declaraste evidencia insuficiente. Con lo reunido era una conclusión prudente pero el caso admitía una atribución.' : 'La persona señalada no es la autora.' });
    const moPts = v.motive === T.motive ? 15 : v.motive === 'm_desconocido' ? 4 : 0;
    comp.push({ name: 'Móvil', pts: moPts, max: 15, text: moPts === 15 ? 'Móvil correcto.' : moPts ? 'No determinaste el móvil.' : 'Móvil incorrecto.' });
    const mePts = v.method === T.method ? 15 : v.method === 'me_golpe' ? 7 : v.method === 'me_desconocido' ? 4 : 0;
    comp.push({ name: 'Método', pts: mePts, max: 15, text: mePts === 15 ? 'Método completo: sedación y golpe.' : mePts === 7 ? 'Identificaste el golpe, pero no la sedación previa.' : mePts ? 'No determinaste el método.' : 'Método incorrecto.' });
    const wPts = v.window === T.window ? 10 : v.window === 'w_nd' ? 3 : 0;
    comp.push({ name: 'Cronología', pts: wPts, max: 10, text: wPts === 10 ? 'Franja temporal correcta.' : wPts ? 'No fijaste la franja.' : 'La franja propuesta no es la real.' });
    const pPts = Math.max(0, Math.min(15, decisiveChosen.length * 3) - weakChosen.length * 3);
    comp.push({ name: 'Pruebas', pts: pPts, max: 15, text: decisiveChosen.length + ' prueba(s) sólidas entre las principales' + (weakChosen.length ? ' y ' + weakChosen.length + ' de valor débil o engañoso presentada(s) como principal(es).' : '.') });
    const lPts = Math.round(keyFound.length / T.keyConflicts.length * 10);
    comp.push({ name: 'Mentiras y contradicciones', pts: lPts, max: 10, text: keyFound.length + ' de ' + T.keyConflicts.length + ' contradicciones clave registradas.' });
    const aPts = (v.accomplices || []).length === 0 ? 5 : 0;
    comp.push({ name: 'Cómplices', pts: aPts, max: 5, text: aPts ? 'Correcto: no hubo cómplices.' : 'Atribuiste cómplices que no existieron.' });
    const total = comp.reduce((n, x) => n + x.pts, 0);

    /* --- Perfil de razonamiento observado --- */
    const P = {};
    const has = id => known(cs, id);
    const usedDig = id => !!cs.digital[id];

    P.contradicciones = { score: clamp(conflictsFound.length / c.conflicts.length * 55 + keyFound.length / T.keyConflicts.length * 45),
      why: 'Registraste ' + conflictsFound.length + ' de ' + c.conflicts.length + ' diferencias objetivas posibles; ' + keyFound.length + ' eran clave para la reconstrucción.' };
    const subtle = ['F_ANILLA_VACIA', 'F_COCHE_DANIEL', 'F_COPA_ESCURRIDOR', 'F_BOTELLA_SIN_HUELLAS'].filter(has);
    P.atencion = { score: clamp(examined / totalEv * 60 + subtle.length * 10),
      why: 'Examinaste ' + examined + ' de ' + totalEv + ' elementos y ' + subtle.length + ' de 4 detalles discretos (llavero, plaza de garaje, escurridor, botella limpia).' };
    P.temporal = { score: clamp(Math.min(10, cs.timeline.length) * 4 + (tlCompares ? 20 : 0) + (wPts === 10 ? 25 : 0) + (cs.conflicts.C09 ? 8 : 0) + (cs.conflicts.C10 ? 7 : 0)),
      why: cs.timeline.length + ' eventos en tu cronología; ' + (tlCompares ? 'usaste la comparación de cronologías' : 'no usaste la comparación de cronologías') + '; franja final ' + (wPts === 10 ? 'correcta' : 'no correcta') + '.' };
    const judRelevant = cs.judicial.filter(p => p === 'elena' || p === 'javier').length;
    P.espacial = { score: clamp((usedDig('D_GARAJE') ? 20 : 0) + (usedDig('D_CALLE') ? 20 : 0) + (usedDig('D_VEH') ? 15 : 0) + judRelevant * 13 + (has('F_TICKET_JAV') ? 10 : 0) + (cs.conflicts.C10 ? 9 : 0)),
      why: 'Consultaste ' + ['D_GARAJE', 'D_CALLE', 'D_VEH'].filter(usedDig).length + ' de 3 fuentes de movimiento (garaje, calle, vehículos) y ' + cs.judicial.length + ' solicitud(es) de antenas.' };
    P.memoria = { score: clamp(Math.min(60, relevantConfronts * 12) + Math.min(20, revisits * 10) + Math.min(20, L.filter(e => e.type === 'compare' && e.found && e.gap > 8).length * 10)),
      why: relevantConfronts + ' confrontaciones pertinentes con información obtenida de otras fuentes y ' + revisits + ' revisión(es) de evidencia tras incorporar datos nuevos.' };
    P.verbal = { score: clamp(interviewed / c.people.length * 30 + Math.min(30, asked * 1.2) + Math.min(40, stmtConflicts * 8)),
      why: 'Entrevistaste a ' + interviewed + ' de ' + c.people.length + ' personas con ' + asked + ' preguntas; ' + stmtConflicts + ' contradicciones detectadas implican declaraciones.' };
    const firstHyp = L.find(e => e.type === 'hyp_create');
    const earlyFix = !!(firstHyp && firstHyp.seq < 12 && firstHyp.conf >= 80);
    P.incertidumbre = { score: clamp(50 + (earlyFix ? -15 : 15) - weakChosen.length * 12 + (confUpdates ? 15 : 0) + (insufficient && decisiveChosen.length < 3 ? 15 : 0) + (!insufficient && decisiveChosen.length >= 3 ? 10 : 0)),
      why: (earlyFix ? 'Asignaste alta confianza a una hipótesis con poca información. ' : 'No fijaste confianzas altas de forma prematura. ') + (weakChosen.length ? 'Presentaste ' + weakChosen.length + ' indicio(s) de valor limitado como prueba principal.' : 'No presentaste indicios débiles como prueba principal.') };
    P.flexibilidad = { score: clamp(Math.min(40, abandoned * 20) + (suspects.size >= 3 ? 30 : suspects.size === 2 ? 20 : 0) + Math.min(20, confUpdates * 5) + (revisits ? 10 : 0)),
      why: 'Consideraste ' + suspects.size + ' persona(s) de interés en tus hipótesis, descartaste ' + abandoned + ' y actualizaste la confianza ' + confUpdates + ' vez/veces.' };
    P.deduccion = { score: clamp((idPts + moPts + mePts + wPts) / 70 * 100),
      why: 'Basado en identidad, móvil, método y franja temporal del veredicto.' };
    P.logica = { score: clamp((v.culprit === T.culprit ? 40 : insufficient ? 15 : 0) + Math.min(40, decisiveChosen.length * 8) + (weakChosen.length ? 0 : 20)),
      why: 'Coherencia entre la conclusión y las pruebas que la sostienen (' + decisiveChosen.length + ' sólidas, ' + weakChosen.length + ' débiles).' };
    P.lateral = { score: clamp((has('S_JAV_DOSCOPAS') ? 30 : 0) + (cs.conflicts.C10 ? 30 : 0) + (cs.conflicts.C07 ? 20 : 0) + (evidenceChosen.includes('F_ANILLA_VACIA') || has('F_GAR_TARJETAS') && has('F_ANILLA_VACIA') ? 20 : 0)),
      why: (has('S_JAV_DOSCOPAS') ? 'Preguntaste qué vio el último visitante conocido. ' : 'No obtuviste lo que vio el último visitante conocido. ') + (cs.conflicts.C10 ? 'Relacionaste la tarjeta del garaje con el coche de la víctima.' : 'No relacionaste la salida del garaje con el coche de la víctima.') };
    const usefulLab = ['E01:autopsia', 'E02:toxicologia', 'E03:huellas', 'E04:huellas', 'E08:comparativa', 'E09:huellas'];
    const labKeys = Object.keys(cs.lab);
    const labUseful = labKeys.filter(k => usefulLab.includes(k)).length;
    P.estrategia = { score: clamp(30 + (labKeys.length ? labUseful / labKeys.length * 30 : 0) + judRelevant * 15 + (queries.length ? 10 : 0) - (E0.store.state.money < 0 ? 10 : 0)),
      why: labUseful + ' de ' + labKeys.length + ' análisis de laboratorio aportaron información relevante; ' + judRelevant + ' de ' + cs.judicial.length + ' solicitudes de antenas apuntaron a personas situadas en la zona.' };

    /* --- Sesgo de confirmación y texto explicativo --- */
    const lines = [];
    lines.push('Examinaste ' + examined + ' de ' + totalEv + ' elementos de la escena y solicitaste ' + labKeys.length + ' análisis de laboratorio y ' + Object.keys(cs.digital).length + ' consultas digitales.');
    lines.push('Hiciste ' + asked + ' preguntas a ' + interviewed + ' personas y ' + confronts.length + ' confrontaciones (' + relevantConfronts + ' pertinentes).');
    lines.push('Detectaste ' + conflictsFound.length + ' contradicciones objetivas.');
    lines.push('Creaste ' + hyps.length + ' hipótesis' + (abandoned ? ' y abandonaste ' + abandoned + ' al cambiar la información disponible.' : '.'));
    if (revisits) lines.push('Volviste a revisar evidencia ya examinada ' + revisits + ' vez/veces tras incorporar datos nuevos.');
    let bias;
    if (!hyps.length) bias = 'No formulaste hipótesis explícitas: el veredicto no se apoya en un proceso documentado de contraste.';
    else if (earlyFix && !abandoned && !confDrops) bias = 'Tu investigación mostró una tendencia a mantener la hipótesis inicial: la formulaste pronto, con confianza alta, y no la revisaste a la baja.';
    else if (abandoned || confDrops) bias = 'Mostraste flexibilidad: revisaste o abandonaste hipótesis cuando la información dejó de encajar.';
    else bias = 'No se observa una fijación clara en una hipótesis inicial.';
    lines.push(bias);

    const stats = [
      ['Evidencias examinadas', examined + '/' + totalEv],
      ['Preguntas realizadas', asked],
      ['Confrontaciones', confronts.length],
      ['Contradicciones detectadas', conflictsFound.length],
      ['Hipótesis creadas', hyps.length],
      ['Hipótesis descartadas', abandoned],
      ['Revisiones de evidencia', revisits],
      ['Consultas libres', queries.length],
      ['Gasto del caso', cs.spent + ' €']
    ];

    return { total, comp, profile: P, lines, stats, decisiveChosen, weakChosen };
  }

  function trialResolve(c, accused, answers) {
    const set = c.trial[accused] || c.trial.generic;
    const res = set.map(o => ({ id: o.id, text: o.text, answer: answers[o.id] || null, ok: !!(answers[o.id] && o.accept.includes(answers[o.id])) }));
    const rebutted = res.filter(r => r.ok).length;
    let verdict;
    if (rebutted === set.length) verdict = 'El tribunal simulado considera la reconstrucción sólida: todas las objeciones de la defensa quedaron respondidas con prueba.';
    else if (rebutted >= 1) verdict = 'El tribunal simulado aprecia lagunas: parte de las objeciones de la defensa no quedaron respondidas.';
    else verdict = 'La defensa prevalece: ninguna objeción quedó respondida con una prueba pertinente.';
    return { res, rebutted, total: set.length, verdict };
  }

  E0.engine = { NOT_FOUND, getCase, minutes, fmt, known, discover, knownFacts, personName, log, query, findConflict, timelineCompare, hypStatus, evaluate, trialResolve, norm };
})();
