/* EXPEDIENTE 0 — controlador: acciones del jugador, recompensas y arranque.
 * Un único juego de listeners delegados en document (se registran una sola vez). */
(function () {
  const C = E0.config;
  const EN = E0.engine;
  const UI = E0.ui;
  const store = E0.store;
  const S = () => store.state;

  let els = {};
  let lastKey = '';
  let audio = null;

  /* ---------- Utilidades ---------- */
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  const curCase = () => {
    const id = S().view.caseId;
    return id ? { c: EN.getCase(id), cs: S().cases[id] } : { c: null, cs: null };
  };

  function tone() {
    if (!S().settings.sound) return;
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = 'sine'; o.frequency.value = 660;
      g.gain.setValueAtTime(0.0001, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.05, audio.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.25);
      o.connect(g).connect(audio.destination);
      o.start(); o.stop(audio.currentTime + 0.26);
    } catch (e) { /* sin audio disponible */ }
  }

  function toast(msg, kind) {
    const t = document.createElement('div');
    t.className = 'toast' + (kind ? ' ' + kind : '');
    t.textContent = msg;
    els.toasts.appendChild(t);
    while (els.toasts.children.length > 3) els.toasts.firstChild.remove();
    tone();
    setTimeout(() => t.remove(), 3200);
  }

  function newInfo(fresh) {
    if (fresh.length) toast('Nueva información incorporada al expediente (' + fresh.length + ').');
  }

  function applySettings() {
    const st = S().settings;
    document.body.dataset.e0theme = st.theme;
    document.body.classList.toggle('no-anim', !st.anim);
    document.documentElement.style.fontSize = (16 * st.scale / 100) + 'px';
    document.body.style.fontSize = (15 * st.scale / 100) + 'px';
  }

  function copyText(text, fallbackEl) {
    const done = () => toast('Copiado al portapapeles.');
    const fail = () => {
      if (fallbackEl) { fallbackEl.focus(); fallbackEl.select(); toast('Selecciona y copia el texto manualmente.', 'warn'); }
      else toast('No se pudo copiar automáticamente.', 'warn');
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail);
      else fail();
    } catch (e) { fail(); }
  }

  /* ---------- Render ---------- */
  function render() {
    const s = S();
    if (s.view.screen === 'case' && (!s.view.caseId || !s.cases[s.view.caseId])) s.view.screen = 'home';
    const key = s.view.screen + '|' + (s.view.screen === 'case' ? s.view.tab : '');
    const y = window.scrollY;
    els.top.innerHTML = UI.topbar();
    els.side.innerHTML = UI.sidebar();
    els.main.innerHTML = UI.screens[s.view.screen]();
    els.modal.innerHTML = UI.modal();
    if (key === lastKey) window.scrollTo(0, y); else window.scrollTo(0, 0);
    lastKey = key;
    const tr = document.getElementById('transcript');
    if (tr) tr.scrollTop = tr.scrollHeight;
    store.save();
  }

  /* ---------- Carrera ---------- */
  function addXP(n) {
    const s = S();
    const before = UI.rankInfo(s.xp).i;
    s.xp = Math.max(0, s.xp + n);
    const after = UI.rankInfo(s.xp).i;
    if (after > before) {
      toast('Ascenso: ' + C.ranks[after].name + '.');
      return C.ranks[after].name;
    }
    return null;
  }

  function doJornada(id) {
    const s = S();
    const j = C.jornada.find(x => x.id === id);
    if (j.energy < 0 && s.energy + j.energy < 0) { toast('Energía insuficiente. Descansa antes.', 'warn'); return; }
    s.energy = clamp(s.energy + j.energy, 0, 100);
    s.money += j.money;
    addXP(j.xp);
    if (id === 'practicar') s.skills.verbal = clamp(s.skills.verbal + 1, 0, 100);
    if (id === 'antiguos') s.skills.memoria = clamp(s.skills.memoria + 1, 0, 100);
    if (id === 'estudiar') s.skills.logica = clamp(s.skills.logica + 1, 0, 100);
    s.jornada += 1;
    toast('Jornada completada: ' + j.name + '.');
    if (s.jornada % C.jornadasPorSemana === 0) {
      s.week += 1;
      const sal = C.ranks[UI.rankInfo(s.xp).i].salary;
      s.money += sal;
      toast('Semana cerrada. Salario cobrado: +' + sal + ' €.');
    }
  }

  /* ---------- Caso ---------- */
  function openCase(id) {
    const s = S();
    const c = EN.getCase(id);
    let cs = s.cases[id];
    if (!cs) {
      cs = store.startCase(c);
      EN.discover(cs, c.initialFacts);
      EN.log(cs, 'open_case');
      s.view.tab = 'resumen';
      toast(c.id + ' abierto. Expediente activo.');
    } else if (s.view.caseId !== id) {
      s.view.tab = cs.status === 'cerrado' ? 'veredicto' : 'resumen';
    }
    s.view.caseId = id;
    s.view.screen = 'case';
  }

  function guardOpen(cs) {
    if (cs.status === 'cerrado') { toast('El expediente está cerrado. Puedes revisarlo o repetirlo desde cero.', 'warn'); return false; }
    return true;
  }

  function examine(id) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const e = c.evidence.find(x => x.id === id);
    cs.lastView.evSeen = cs.lastView.evSeen || {};
    if (!cs.examined[id]) {
      cs.examined[id] = true;
      const fresh = EN.discover(cs, e.reveals);
      EN.log(cs, 'examine', { ev: id });
      newInfo(fresh);
      if (!fresh.length) toast('Elemento examinado y documentado.');
    } else {
      const last = cs.lastView.evSeen[id] || 0;
      if (cs.seq > last) { EN.log(cs, 'revisit', { ev: id }); toast('Revisión registrada: vuelves sobre ' + e.name + ' con información nueva.'); }
      else toast('Sin cambios desde tu último examen.');
    }
    cs.lastView.evSeen[id] = cs.seq;
    cs.lastView.sceneSel = id;
  }

  function spend(cs, cost) {
    const s = S();
    if (s.money < cost) { toast('Fondos insuficientes. Consigue presupuesto con trabajo administrativo.', 'warn'); return false; }
    s.money -= cost;
    cs.spent += cost;
    return true;
  }

  function requestLab(id, kind) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const e = c.evidence.find(x => x.id === id);
    const a = e.lab[kind];
    const key = id + ':' + kind;
    if (cs.lab[key] || !cs.examined[id]) return;
    if (!spend(cs, a.cost)) return;
    cs.lab[key] = true;
    const fresh = EN.discover(cs, a.reveals);
    EN.log(cs, 'lab', { ev: id, kind });
    toast('Resultado de laboratorio recibido.');
    newInfo(fresh);
  }

  function requestDigital(id) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const d = c.digital.find(x => x.id === id);
    if (cs.digital[id] || (d.requires && !cs.examined[d.requires])) return;
    if (!spend(cs, d.cost)) return;
    cs.digital[id] = true;
    const fresh = EN.discover(cs, d.reveals);
    EN.log(cs, 'digital', { id });
    newInfo(fresh);
  }

  function requestJudicial() {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const sel = document.getElementById('jud-person');
    const pid = sel && sel.value;
    if (!pid || cs.judicial.includes(pid) || cs.judicial.length >= c.judicial.max) return;
    cs.judicial.push(pid);
    const fresh = EN.discover(cs, c.judicial.results[pid]);
    EN.log(cs, 'judicial', { person: pid });
    toast('El juzgado autoriza la solicitud.');
    newInfo(fresh);
  }

  function ask(pid, qid) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const p = c.people.find(x => x.id === pid);
    const q = p.questions.find(x => x.id === qid);
    cs.asked[pid] = cs.asked[pid] || {};
    if (cs.asked[pid][qid]) return;
    cs.asked[pid][qid] = true;
    cs.transcripts[pid] = cs.transcripts[pid] || [];
    cs.transcripts[pid].push({ kind: 'q', q: q.q, a: q.a });
    const fresh = EN.discover(cs, q.reveals);
    EN.log(cs, 'ask', { person: pid, q: qid });
    newInfo(fresh);
  }

  function confront(pid) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const sel = document.getElementById('confront-fact');
    const fid = sel && sel.value;
    if (!fid) { toast('Elige primero un hecho del expediente.', 'warn'); return; }
    const p = c.people.find(x => x.id === pid);
    cs.confronted[pid] = cs.confronted[pid] || {};
    cs.transcripts[pid] = cs.transcripts[pid] || [];
    const label = 'Le muestras: ' + UI.factLabel(c, fid);
    if (cs.confronted[pid][fid]) {
      cs.transcripts[pid].push({ kind: 'c', q: label, a: 'Ya hemos hablado de eso. ' + cs.confronted[pid][fid] });
      EN.log(cs, 'revisit', { person: pid, fact: fid, recall: true });
      return;
    }
    const def = p.confront[fid];
    let a, fresh = [];
    if (def) {
      a = def.afterVisit && EN.known(cs, 'S_JAV_VISITA') ? def.afterVisit : def.a;
      fresh = EN.discover(cs, def.reveals);
    } else a = p.confrontDefault;
    cs.confronted[pid][fid] = a;
    cs.transcripts[pid].push({ kind: 'c', q: label, a });
    EN.log(cs, 'confront', { person: pid, fact: fid, relevant: !!def, gap: cs.seq - cs.discovered[fid] });
    newInfo(fresh);
  }

  function recall(pid, i) {
    const { cs } = curCase();
    const t = (cs.transcripts[pid] || [])[i];
    if (!t || cs.status === 'cerrado') return;
    cs.transcripts[pid].push({ kind: 'r', q: 'Vuelves sobre: ' + t.q, a: 'Lo que le dije: ' + t.a.replace(/^Ya hemos hablado de eso\. /, '') });
    EN.log(cs, 'revisit', { person: pid, recall: true });
  }

  function compare() {
    const { c, cs } = curCase();
    const a = document.getElementById('cmp-a').value, b = document.getElementById('cmp-b').value;
    if (!a || !b) { toast('Elige dos fuentes para comparar.', 'warn'); return; }
    if (a === b) { toast('Elige dos fuentes distintas.', 'warn'); return; }
    const k = EN.findConflict(c, a, b);
    cs.lastView.compare = { a, b, conflict: k ? k.id : null };
    if (k && !cs.conflicts[k.id] && cs.status !== 'cerrado') {
      cs.conflicts[k.id] = Object.keys(cs.conflicts).length + 1;
      toast('Contradicción registrada.');
    }
    EN.log(cs, 'compare', { a, b, found: !!k, gap: Math.abs(cs.discovered[a] - cs.discovered[b]) });
  }

  function addTimelineFact() {
    const { c, cs } = curCase();
    const fid = document.getElementById('tl-fact').value;
    if (!fid) { toast('Elige un hecho con hora.', 'warn'); return; }
    const f = c.facts[fid];
    cs.timeline.push({ id: uid(), factId: fid, time: f.time, end: f.end || '', text: f.text, source: f.source, person: f.person || '', place: f.place || '', kind: f.kind || 'record', note: '' });
    EN.log(cs, 'timeline_add', { fact: fid });
  }

  function timelineCompare() {
    const { c, cs } = curCase();
    const res = EN.timelineCompare(c, cs);
    const texts = [];
    res.forEach(r => {
      if (r.kind === 'conflict') {
        texts.push(r.conflict.type + ': ' + r.conflict.desc);
        if (!cs.conflicts[r.conflict.id] && cs.status !== 'cerrado') cs.conflicts[r.conflict.id] = Object.keys(cs.conflicts).length + 1;
      } else texts.push(r.text);
    });
    cs.lastView.tlCompare = texts;
    EN.log(cs, 'timeline_compare', { n: texts.length });
    if (texts.length) toast('Comparación completada: ' + texts.length + ' diferencia(s) objetiva(s).');
  }

  function hypLink(hid, side) {
    const { cs } = curCase();
    const h = cs.hypotheses.find(x => x.id === hid);
    const fid = document.getElementById('hyp-link-' + hid).value;
    if (!fid) { toast('Elige un hecho para vincular.', 'warn'); return; }
    const other = side === 'supports' ? 'against' : 'supports';
    h[other] = h[other].filter(x => x !== fid);
    if (!h[side].includes(fid)) h[side].push(fid);
    EN.log(cs, 'hyp_link', { hyp: hid, side, fact: fid });
  }

  function emitVerdict(form) {
    const { c, cs } = curCase();
    const s = S();
    const fd = new FormData(form);
    const v = {
      culprit: fd.get('culprit'), motive: fd.get('motive'), method: fd.get('method'), window: fd.get('window'),
      accomplices: fd.getAll('acc'), evidence: fd.getAll('ev'), explain: String(fd.get('explain') || '').trim()
    };
    if (!v.evidence.length) { toast('Selecciona al menos una prueba principal.', 'warn'); return; }
    if (v.evidence.length > 6) { toast('Máximo 6 pruebas principales.', 'warn'); return; }
    if (v.culprit !== 'insuficiente' && v.accomplices.includes(v.culprit)) { toast('La persona autora no puede ser también cómplice.', 'warn'); return; }
    EN.log(cs, 'verdict', { culprit: v.culprit });
    cs.verdict = v;
    const ev = EN.evaluate(c, cs, v);
    cs.evaluation = ev;
    cs.status = 'cerrado';
    const xp = 60 + ev.total * 2;
    const rep = Math.round((ev.total - 50) / 5);
    const cash = 300 + ev.total * 4;
    const promo = addXP(xp);
    s.reputation = clamp(s.reputation + rep, 0, 100);
    s.money += cash;
    C.skills.forEach(k => { s.skills[k.id] = clamp(Math.round(s.skills[k.id] * 0.5 + ev.profile[k.id].score * 0.5), 0, 100); });
    cs.rewards = { xp, rep, money: cash, promo };
    s.history.push({ caseId: c.id, title: c.title, score: ev.total, date: new Date().toLocaleDateString('es-ES'), culpritOk: v.culprit === c.truth.culprit, lines: ev.lines });
    toast('Veredicto emitido. Expediente cerrado.');
  }

  function submitTrial(form) {
    const { c, cs } = curCase();
    const s = S();
    const fd = new FormData(form);
    const answers = {};
    for (const [k, val] of fd.entries()) if (val) answers[k] = val;
    const r = EN.trialResolve(c, cs.verdict.culprit, answers);
    cs.trial = r;
    s.reputation = clamp(s.reputation + r.rebutted * 3 - (r.rebutted ? 0 : 3), 0, 100);
    addXP(r.rebutted * 15);
    toast('Juicio simulado concluido.');
  }

  /* ---------- Acciones por clic ---------- */
  const CLICK = {
    'nav-toggle': () => { document.body.classList.toggle('nav-open'); return false; },
    'scrim': () => { document.body.classList.remove('nav-open'); return false; },
    go: el => { S().view.screen = el.dataset.screen; S().view.confirmReset = false; S().view.confirmRestart = null; },
    'set-active': el => { S().active = el.dataset.id; toast('Turno de ' + S().investigators[el.dataset.id] + '.'); },
    'open-case': el => openCase(el.dataset.id),
    tab: el => { S().view.tab = el.dataset.tab; },
    jornada: el => doJornada(el.dataset.id),
    'academy-open': el => { S().view.module = S().view.module === el.dataset.id ? null : el.dataset.id; },
    'academy-answer': el => {
      const s = S();
      const m = E0.academy.find(x => x.id === el.dataset.id);
      if (s.academy[m.id]) return;
      const i = Number(el.dataset.i);
      const ok = i === m.correct;
      s.academy[m.id] = { answer: i, correct: ok };
      addXP(ok ? m.xp : Math.round(m.xp / 4));
      s.skills[m.skill] = clamp(s.skills[m.skill] + (ok ? 3 : 1), 0, 100);
    },
    'ask-restart': el => { S().view.confirmRestart = el.dataset.id; },
    'cancel-restart': () => { S().view.confirmRestart = null; },
    'restart-case': el => {
      const s = S();
      delete s.cases[el.dataset.id];
      s.view.confirmRestart = null;
      openCase(el.dataset.id);
    },
    'note-del': el => { S().notes = S().notes.filter(n => n.id !== el.dataset.id); },
    'note-filter': el => { S().view.noteFilter = el.dataset.id; },
    theme: el => { S().settings.theme = el.dataset.id; applySettings(); },
    'copy-export': () => { copyText(store.exportJSON(), document.getElementById('export-area')); return false; },
    'download-export': () => {
      const blob = new Blob([store.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'expediente0-partida.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      return false;
    },
    'ask-reset': () => { S().view.confirmReset = true; },
    'cancel-reset': () => { S().view.confirmReset = false; },
    'reset-game': () => { store.reset(); applySettings(); toast('Partida borrada. Empezáis de nuevo.'); },
    'scene-sel': el => { const { cs } = curCase(); cs.lastView.sceneSel = el.dataset.id || null; },
    examine: el => examine(el.dataset.id),
    'to-lab': el => { const { cs } = curCase(); cs.lastView.labFocus = el.dataset.id; S().view.tab = 'laboratorio'; },
    'ev-filter': el => { curCase().cs.lastView.evFilter = el.dataset.id; },
    lab: el => requestLab(el.dataset.id, el.dataset.kind),
    digital: el => requestDigital(el.dataset.id),
    judicial: () => requestJudicial(),
    person: el => { curCase().cs.lastView.person = el.dataset.id; },
    ask: el => ask(el.dataset.person, el.dataset.q),
    confront: el => confront(el.dataset.person),
    recall: el => recall(el.dataset.person, Number(el.dataset.i)),
    compare: () => compare(),
    'tl-add-fact': () => addTimelineFact(),
    'tl-del': el => { const { cs } = curCase(); cs.timeline = cs.timeline.filter(e => e.id !== el.dataset.id); },
    'tl-compare': () => timelineCompare(),
    'hyp-link': el => hypLink(el.dataset.id, el.dataset.side),
    'hyp-unlink': el => {
      const { cs } = curCase();
      const h = cs.hypotheses.find(x => x.id === el.dataset.id);
      h.supports = h.supports.filter(x => x !== el.dataset.fact);
      h.against = h.against.filter(x => x !== el.dataset.fact);
    },
    'hyp-discard': el => { const { cs } = curCase(); const h = cs.hypotheses.find(x => x.id === el.dataset.id); h.status = 'descartada'; EN.log(cs, 'hyp_abandon', { hyp: h.id, suspect: h.suspect }); },
    'hyp-restore': el => { const { cs } = curCase(); const h = cs.hypotheses.find(x => x.id === el.dataset.id); h.status = 'activa'; EN.log(cs, 'hyp_restore', { hyp: h.id }); },
    'copy-report': () => { const r = document.getElementById('report'); copyText(r ? r.innerText : ''); return false; },
    print: () => { window.print(); return false; },
    'modal-close': () => { S().introSeen = true; S().view.modal = null; },
    'tutorial-start': () => { S().view.modal = 'tut0'; },
    'tutorial-next': el => { S().view.modal = 'tut' + el.dataset.i; }
  };

  /* ---------- Formularios ---------- */
  const FORMS = {
    note: f => {
      const fd = new FormData(f);
      const text = String(fd.get('text') || '').trim();
      if (!text) return;
      S().notes.push({ id: uid(), author: S().active, cat: fd.get('cat'), caseId: fd.get('caseId') || '', text, t: Date.now() });
      const { cs } = curCase();
      if (cs && fd.get('caseId') === S().view.caseId) EN.log(cs, 'note');
      toast('Nota guardada.');
    },
    names: f => {
      const fd = new FormData(f);
      const a = String(fd.get('omi') || '').trim(), b = String(fd.get('rebe') || '').trim();
      if (!a || !b) { toast('Los nombres no pueden quedar vacíos.', 'warn'); return; }
      S().investigators = { omi: a.slice(0, 24), rebe: b.slice(0, 24) };
      toast('Nombres actualizados.');
    },
    import: f => {
      const text = String(new FormData(f).get('json') || '').trim();
      if (!text) { toast('Pega un JSON o elige un archivo.', 'warn'); return; }
      const err = store.importJSON(text);
      if (err) { toast('Importación rechazada: ' + err, 'warn'); return; }
      applySettings();
      S().view.screen = 'home';
      toast('Partida importada correctamente.');
    },
    'tl-custom': f => {
      const { cs } = curCase();
      const fd = new FormData(f);
      const text = String(fd.get('text') || '').trim();
      if (!fd.get('time') || !text) return;
      cs.timeline.push({ id: uid(), factId: null, custom: true, time: fd.get('time'), end: fd.get('end') || '', text, source: fd.get('source'), person: fd.get('person') || '', place: fd.get('place') || '', kind: 'custom', note: '' });
      EN.log(cs, 'timeline_add', { custom: true });
    },
    hyp: f => {
      const { cs } = curCase();
      if (!guardOpen(cs)) return;
      const fd = new FormData(f);
      const text = String(fd.get('text') || '').trim();
      if (!text) return;
      const conf = Number(fd.get('conf'));
      const h = { id: uid(), author: S().active, text, suspect: fd.get('suspect'), conf, confHistory: [conf], supports: [], against: [], status: 'activa', created: cs.seq };
      cs.hypotheses.push(h);
      EN.log(cs, 'hyp_create', { hyp: h.id, suspect: h.suspect, conf });
      toast('Hipótesis registrada para ' + S().investigators[S().active] + '.');
    },
    query: f => {
      const { c, cs } = curCase();
      const q = String(new FormData(f).get('q') || '').trim();
      if (!q) return;
      const r = EN.query(c, cs, q);
      cs.queries.push({ q, ids: r.results.map(x => x.id) });
      if (cs.queries.length > 40) cs.queries.shift();
      EN.log(cs, 'query', { found: r.results.length });
    },
    verdict: f => emitVerdict(f),
    trial: f => submitTrial(f)
  };

  /* ---------- Listeners delegados (una sola vez) ---------- */
  function bind() {
    document.addEventListener('click', e => {
      if (e.target.classList && e.target.classList.contains('scrim')) { document.body.classList.remove('nav-open'); return; }
      const el = e.target.closest('[data-act]');
      if (!el || /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) return;
      const fn = CLICK[el.dataset.act];
      if (!fn) return;
      e.preventDefault();
      if (el.classList.contains('nav-btn')) document.body.classList.remove('nav-open');
      const r = fn(el);
      if (r !== false) render();
    });

    document.addEventListener('submit', e => {
      const f = e.target.closest('form[data-form]');
      if (!f) return;
      e.preventDefault();
      const fn = FORMS[f.dataset.form];
      if (fn) { fn(f); render(); }
    });

    document.addEventListener('input', e => {
      const el = e.target;
      const act = el.dataset && el.dataset.act;
      if (act === 'range-out' || act === 'hyp-conf') {
        const out = document.getElementById(el.dataset.out);
        if (out) out.textContent = el.value;
      } else if (act === 'report-field') {
        const { cs } = curCase();
        cs.report[el.dataset.key] = el.value;
        store.save();
      }
    });

    document.addEventListener('change', e => {
      const el = e.target;
      const act = el.dataset && el.dataset.act;
      if (!act) return;
      const s = S();
      if (act === 'toggle-setting') { s.settings[el.dataset.key] = el.checked; applySettings(); store.save(); }
      else if (act === 'set-scale') { s.settings.scale = Number(el.value); applySettings(); store.save(); }
      else if (act === 'conflict-resolve') { const { cs } = curCase(); cs.resolved = cs.resolved || {}; cs.resolved[el.dataset.id] = el.checked; store.save(); }
      else if (act === 'tl-note') { const { cs } = curCase(); const ev = cs.timeline.find(x => x.id === el.dataset.id); if (ev) { ev.note = el.value; store.save(); } }
      else if (act === 'hyp-conf') {
        const { cs } = curCase();
        const h = cs.hypotheses.find(x => x.id === el.dataset.id);
        const to = Number(el.value);
        if (h && to !== h.conf) { EN.log(cs, 'hyp_conf', { hyp: h.id, from: h.conf, to }); h.conf = to; h.confHistory.push(to); render(); }
      } else if (act === 'ev-limit') {
        const n = document.querySelectorAll('input[name="ev"]:checked').length;
        if (n > 6) { el.checked = false; toast('Máximo 6 pruebas principales.', 'warn'); }
      } else if (act === 'import-file') {
        const file = el.files && el.files[0];
        if (!file) return;
        const rd = new FileReader();
        rd.onload = () => { const ta = document.getElementById('import-area'); if (ta) ta.value = String(rd.result || ''); toast('Archivo cargado. Pulsa «Validar e importar».'); };
        rd.readAsText(file);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.body.classList.remove('nav-open');
    });
    window.addEventListener('beforeunload', () => store.saveNow());
    document.addEventListener('visibilitychange', () => { if (document.hidden) store.saveNow(); });
  }

  function boot() {
    els = {
      top: document.getElementById('topbar'),
      side: document.getElementById('sidebar'),
      main: document.getElementById('main'),
      modal: document.getElementById('modal-root'),
      toasts: document.getElementById('toasts')
    };
    store.load();
    const s = S();
    if (!s.introSeen) s.view.modal = 'intro';
    applySettings();
    bind();
    render();
  }

  E0.app = { render, boot };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
