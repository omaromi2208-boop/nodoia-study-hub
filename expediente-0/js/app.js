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
    drawWall();
    drawBench();
    mount3d();
    mountRoom();
    store.save();
  }

  /* Sala de interrogatorio 3D de la pestaña Personas. */
  function mountRoom() {
    const el = document.getElementById('room3d');
    if (!el || !E0.room3d) return;
    const { c, cs } = curCase();
    const p = c.people.find(x => x.id === el.dataset.person);
    const tr = cs.transcripts[p.id] || [];
    if (!E0.room3d.mount(el, { c, person: p, line: tr[tr.length - 1], lineNo: tr.length })) { S().settings.view3d = false; render(); }
  }

  /* Voz sintetizada del navegador para la última respuesta. El tono sale del identificador
     de la persona, no de su nombre ni de nada que se suponga sobre ella. */
  function speak(pid) {
    if (!('speechSynthesis' in window)) return;
    const { c, cs } = curCase();
    const p = c.people.find(x => x.id === pid);
    const tr = cs.transcripts[pid] || [];
    const last = tr[tr.length - 1];
    if (!last) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(last.a.replace(/\([^)]*\)/g, ' '));
    const voices = synth.getVoices().filter(v => /^es/i.test(v.lang));
    const A = E0.appearance(p);
    if (voices.length) u.voice = voices.find(v => /es-ES/i.test(v.lang)) || voices[0];
    u.lang = 'es-ES';
    u.pitch = 0.8 + (A.h % 41) / 100;
    u.rate = 0.92 + ((p.hidden && p.hidden.miedo) || 50) / 500;
    u.onstart = () => E0.room3d && E0.room3d.talk(30);
    u.onend = u.onerror = () => E0.room3d && E0.room3d.stopTalk();
    synth.speak(u);
  }

  function mount3d() {
    const el = document.getElementById('scene3d');
    if (!el || !E0.scene3d) return;
    const { c, cs } = curCase();
    const okMount = E0.scene3d.mount(el, {
      c, cs, planId: UI.scenePlanId(c, cs), sel: cs.lastView.sceneSel || null, inspect: !!cs.lastView.inspect,
      fx: cs.lastView.fx && cs.lastView.fx.ev === cs.lastView.sceneSel ? cs.lastView.fx : null,
      onPick: id => { cs.lastView.sceneSel = id; cs.lastView.inspect = false; cs.lastView.fx = null; render(); }
    });
    if (!okMount) { S().settings.view3d = false; render(); }
  }

  /* ---------- Muro: líneas y arrastre ---------- */
  function drawWall() {
    const board = document.getElementById('wall-board');
    const svg = document.getElementById('wall-lines');
    if (!board || !svg) return;
    const { cs } = curCase();
    const center = id => {
      const el = board.querySelector('[data-card="' + id + '"]');
      return el ? { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 } : null;
    };
    svg.innerHTML = cs.wall.links.map(l => {
      const a = center(l.a), b = center(l.b);
      if (!a || !b) return '';
      return '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/><text x="' + (a.x + b.x) / 2 + '" y="' + ((a.y + b.y) / 2 - 4) + '" text-anchor="middle">' + UI.esc(l.label) + '</text>';
    }).join('');
  }

  const WALL_ORDER = ['person', 'evidence', 'place', 'fact', 'statement', 'conflict', 'hyp', 'question'];
  function wallSlot(cs) {
    const n = cs.wall.cards.length;
    return { x: 20 + (n % 6) * 240, y: 20 + Math.floor(n / 6) * 150 };
  }
  function wallAdd(cs, kind, ref, text) {
    if (cs.wall.cards.some(k => k.kind === kind && k.ref === ref)) return false;
    const pos = wallSlot(cs);
    cs.wall.cards.push({ id: uid(), kind, ref, text: text || '', x: pos.x, y: Math.min(pos.y, 860) });
    EN.log(cs, 'wall_add', { kind });
    return true;
  }
  function wallCardClick(id) {
    const { cs } = curCase();
    const con = cs.lastView.wallConnect;
    if (!con || !con.on) return;
    if (!con.from) { con.from = id; render(); return; }
    if (con.from === id) { con.from = null; render(); return; }
    const dup = cs.wall.links.some(l => (l.a === con.from && l.b === id) || (l.a === id && l.b === con.from));
    if (!dup) {
      cs.wall.links.push({ id: uid(), a: con.from, b: id, label: con.label || 'relación' });
      EN.log(cs, 'wall_link', { label: con.label });
      toast('Conexión guardada en el muro.');
    }
    cs.lastView.wallConnect = { on: false, from: null, label: con.label };
    render();
  }

  let drag = null;
  function bindWall() {
    document.addEventListener('pointerdown', e => {
      const card = e.target.closest && e.target.closest('.wall-card');
      if (!card || e.target.closest('button')) return;
      drag = { id: card.dataset.card, el: card, sx: e.clientX, sy: e.clientY, ox: card.offsetLeft, oy: card.offsetTop, moved: false };
      try { card.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
    });
    document.addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      drag.moved = true;
      const board = drag.el.parentElement;
      drag.el.style.left = clamp(drag.ox + dx, 0, board.clientWidth - drag.el.offsetWidth) + 'px';
      drag.el.style.top = clamp(drag.oy + dy, 0, board.clientHeight - drag.el.offsetHeight) + 'px';
      drag.el.classList.add('dragging');
      drawWall();
    });
    const end = () => {
      if (!drag) return;
      const d = drag;
      drag = null;
      d.el.classList.remove('dragging');
      if (d.moved) {
        const { cs } = curCase();
        const k = cs.wall.cards.find(x => x.id === d.id);
        if (k) { k.x = d.el.offsetLeft; k.y = d.el.offsetTop; EN.log(cs, 'wall_move'); store.save(); }
      } else wallCardClick(d.id);
    };
    document.addEventListener('pointerup', end);
    document.addEventListener('pointercancel', end);
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
    addXP(j.xp * (id === 'practicar' && s.player.specialty === 'conducta' ? 2 : 1));
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
    if (!cs && !UI.unlocked(c)) { toast('Este expediente se desbloquea al ascender de rango.', 'warn'); return; }
    if (!cs) {
      cs = store.startCase(c);
      EN.discover(cs, c.initialFacts);
      EN.log(cs, 'open_case');
      s.view.tab = 'resumen';
      toast(c.id + ' abierto. Expediente activo.');
      s.budgets = s.budgets || {};
      if (c.budget && !s.budgets[c.id]) {
        s.budgets[c.id] = true;
        s.money += c.budget;
        toast('Presupuesto operativo asignado al expediente: +' + c.budget + ' €.');
      }
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
    if (!spend(cs, EN.costOf('lab', a.cost))) return;
    cs.lab[key] = true;
    const { fresh, pending } = EN.gateReveal(c, cs, a.reveals);
    EN.log(cs, 'lab', { ev: id, kind });
    toast(pending.length ? 'Huellas latentes recogidas: pendientes de cotejo en el banco de lofoscopia.' : 'Resultado de laboratorio recibido.');
    newInfo(fresh);
  }

  /* ---------- Banco de lofoscopia ---------- */
  function benchCtx() {
    const { c, cs } = curCase();
    const b = cs && cs.lastView.bench;
    if (!b || !cs.latents[b.fid]) return null;
    const L = E0.prints.latent(c, b.fid, b.i);
    const it = cs.latents[b.fid].items[b.i];
    return { c, cs, b, L, it };
  }
  function canvasPoint(el, e) {
    const r = el.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width * el.width, (e.clientY - r.top) / r.height * el.height];
  }
  function benchLatent(el, e) {
    const x = benchCtx(); if (!x || x.it.status !== 'pendiente' || !guardOpen(x.cs)) return false;
    const m = E0.prints.pickLatent(x.L, el.width, ...canvasPoint(el, e));
    if (m === null) { toast('Ahí no hay un punto característico claro. Busca finales de cresta y bifurcaciones.', 'warn'); return false; }
    x.it.pick = m;
  }
  function benchCard(el, e) {
    const x = benchCtx(); if (!x || x.it.status !== 'pendiente' || !guardOpen(x.cs)) return false;
    const { c, cs, b, L, it } = x;
    if (b.cand === null || b.fi === null) return false;
    if (it.pick === null) { toast('Marca primero un punto en la latente.', 'warn'); return false; }
    const key = b.cand + '#' + b.fi;
    if ((it.bad[key] || 0) >= E0.prints.MAX_BAD) { toast('Este dedo ya está descartado para esta latente.', 'warn'); return false; }
    const m = E0.prints.pickCard(b.cand, b.fi, el.width, ...canvasPoint(el, e));
    if (m === null) { toast('Ahí no hay un punto característico en la ficha.', 'warn'); return false; }
    const ok = b.cand === L.source.pid && b.fi === L.source.fi && m === it.pick;
    if (ok && it.pairs.some(p => p.ok && p.m === m && p.key === key)) { toast('Ese punto ya está cotejado.', 'warn'); it.pick = null; return; }
    it.pairs.push({ key, m: it.pick, c: m, ok });
    it.pick = null;
    EN.log(cs, 'cotejo', { fact: b.fid, ok });
    if (!ok) {
      it.bad[key] = (it.bad[key] || 0) + 1;
      toast(it.bad[key] >= E0.prints.MAX_BAD ? 'Tres discrepancias: este dedo queda descartado.' : 'Discrepancia: los puntos no se corresponden.', 'warn');
      return;
    }
    const hits = it.pairs.filter(p => p.ok && p.key === key).length;
    if (hits >= E0.prints.NEED) {
      it.status = 'identificada'; it.match = b.cand;
      const name = EN.cardPeople(c).find(p => p.id === b.cand).name;
      toast('Identificación: ' + hits + ' puntos coincidentes con ' + name + ' (' + E0.prints.FINGERS[b.fi].toLowerCase() + ').');
      finishLatent(c, cs, b.fid);
    } else toast('Coincidente (' + hits + ' de ' + E0.prints.NEED + ').');
  }
  function benchNoApta() {
    const x = benchCtx(); if (!x || x.it.status !== 'pendiente' || !guardOpen(x.cs)) return false;
    if (x.L.apta) { toast('El perito no lo acepta: la latente tiene calidad suficiente para cotejarla.', 'warn'); return false; }
    x.it.status = 'no_apta';
    toast('Latente declarada no apta para cotejo: no tiene puntos suficientes.');
    finishLatent(x.c, x.cs, x.b.fid);
  }
  function benchAuto(fid) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    if (!spend(cs, EN.costOf('lab', 150))) return;
    EN.printsOf(c, fid).forEach((P, i) => {
      const it = cs.latents[fid].items[i];
      if (it.status !== 'pendiente') return;
      const L = E0.prints.latent(c, fid, i);
      if (L.apta) { it.status = 'identificada'; it.match = L.source.pid; } else it.status = 'no_apta';
    });
    EN.log(cs, 'cotejo_auto', { fact: fid });
    toast('Cotejo automático completado.');
    finishLatent(c, cs, fid);
  }
  function finishLatent(c, cs, fid) {
    if (EN.settleLatents(c, cs, fid)) {
      toast('Cotejo completo: el resultado se incorpora al expediente.');
      const b = cs.lastView.bench;
      if (b && b.fid === fid) b.done = true;
    }
  }
  /* Dibuja las huellas y las marcas del banco tras cada render. */
  function drawBench() {
    document.querySelectorAll('canvas[data-thumb]').forEach(cv => { const [pid, fi] = cv.dataset.thumb.split('|'); E0.prints.drawCard(cv, pid, +fi); });
    const lat = document.querySelector('canvas[data-act="bench-latent"]');
    if (!lat) return;
    const x = benchCtx();
    if (!x) return;
    const { b, L, it } = x;
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#5fd3df';
    const mark = (g, px, py, color, label, r) => {
      g.strokeStyle = color; g.lineWidth = 2; g.beginPath(); g.arc(px, py, r || 7, 0, Math.PI * 2); g.stroke();
      if (label) { g.fillStyle = color; g.font = '700 11px monospace'; g.fillText(label, px + 8, py - 6); }
    };
    const key = b.cand !== null && b.fi !== null ? b.cand + '#' + b.fi : null;
    const okPairs = it.pairs.filter(p => p.ok && (key === null || p.key === key || it.status === 'identificada'));
    const g = E0.prints.drawLatent(lat, L);
    if (b.hl) L.visible.forEach(id => { const [px, py] = E0.prints.latentPos(L, lat.width, id); mark(g, px, py, 'rgba(255,255,255,.35)', '', 5); });
    okPairs.forEach((p, n) => { const [px, py] = E0.prints.latentPos(L, lat.width, p.m); mark(g, px, py, '#5ccd8c', String(n + 1)); });
    if (it.pick !== null) { const [px, py] = E0.prints.latentPos(L, lat.width, it.pick); mark(g, px, py, accent, '?', 9); }
    const card = document.querySelector('canvas[data-act="bench-card"]');
    if (card && key) {
      const g2 = E0.prints.drawCard(card, b.cand, b.fi);
      it.pairs.filter(p => p.key === key).forEach((p, n) => {
        const [px, py] = E0.prints.cardPos(b.cand, b.fi, card.width, p.c);
        mark(g2, px, py, p.ok ? '#3aa86b' : '#d64550', p.ok ? String(okPairs.indexOf(p) + 1) : '✕');
      });
    }
  }

  function requestDigital(id) {
    const { c, cs } = curCase();
    if (!guardOpen(cs)) return;
    const d = c.digital.find(x => x.id === id);
    if (cs.digital[id] || (d.requires && !cs.examined[d.requires])) return;
    if (!spend(cs, EN.costOf('digital', d.cost))) return;
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
    if (!pid || cs.judicial.includes(pid) || cs.judicial.length >= EN.judicialMax(c)) return;
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
      a = def.afterVisit && def.afterFact && EN.known(cs, def.afterFact) ? def.afterVisit : def.a;
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
    s.history.push({ caseId: c.id, title: c.title, variant: c.variant || null, score: ev.total, date: new Date().toLocaleDateString('es-ES'), culpritOk: v.culprit === c.truth.culprit, lines: ev.lines });
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
      const prev = s.cases[el.dataset.id];
      if (prev && prev.variant) { s.lastVariants = s.lastVariants || {}; s.lastVariants[el.dataset.id] = prev.variant; }
      delete s.cases[el.dataset.id];
      s.view.confirmRestart = null;
      openCase(el.dataset.id);
    },
    'note-del': el => { S().notes = S().notes.filter(n => n.id !== el.dataset.id); },
    'note-filter': el => { S().view.noteFilter = el.dataset.id; },
    theme: el => { S().settings.theme = el.dataset.id; applySettings(); },
    'copy-export': () => { copyText(store.exportJSON(), document.getElementById('export-area')); return false; },
    'download-export': () => {
      /* Dentro del visor de claude.ai la descarga pasa por su capacidad «downloads»:
         el visor pide confirmación y guarda el archivo. Fuera, enlace normal. */
      if (E0.downloads) {
        E0.downloads.save({ filename: 'expediente0-partida.json', data: store.exportJSON() }).then(
          () => toast('Partida exportada.'),
          err => {
            const code = err && err.code;
            if (code === 'declined') return;
            if (code === 'rate_limited') toast('Ya hay una descarga pendiente de confirmar.', 'warn');
            else toast('No se pudo descargar aquí. Usa «Copiar JSON».', 'warn');
          });
        return false;
      }
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
    'scene-sel': el => { const { cs } = curCase(); cs.lastView.sceneSel = el.dataset.id || null; cs.lastView.inspect = false; cs.lastView.fx = null; },
    view3d: el => { S().settings.view3d = el.dataset.on === '1'; },
    's3-inspect': () => { const { cs } = curCase(); cs.lastView.inspect = !cs.lastView.inspect; },
    's3-reset': () => { const { cs } = curCase(); cs.lastView.sceneSel = null; cs.lastView.inspect = false; if (E0.scene3d) E0.scene3d.resetView(); },
    forensic: el => {
      const { c, cs } = curCase();
      if (!guardOpen(cs)) return;
      const id = el.dataset.id, tool = el.dataset.tool;
      const e = c.evidence.find(x => x.id === id);
      const T = C.forensicTools.find(x => x.id === tool);
      const key = id + ':' + tool;
      if (!cs.examined[id] || cs.forensic[key]) return;
      if (T.kit) {
        const used = Object.keys(cs.forensic).filter(k => k.endsWith(':' + tool)).length;
        if (used >= T.kit) { toast('No te queda ' + T.name.toLowerCase() + ' en el kit de este expediente.', 'warn'); return false; }
      }
      const def = (e.forensic || {})[tool];
      cs.forensic[key] = def ? 'pos' : 'neg';
      const gate = def ? EN.gateReveal(c, cs, def.reveals) : { fresh: [], pending: [] };
      const fresh = gate.fresh;
      EN.log(cs, 'forensic', { ev: id, tool, positive: !!def });
      cs.lastView.fx = { ev: id, tool, pos: !!def };
      if (tool === 'lupa') cs.lastView.inspect = true;
      toast(T.name + ': ' + (gate.pending.length ? 'huellas reveladas. Cotéjalas en el laboratorio.' : def ? 'hay un resultado.' : 'sin hallazgos con esta técnica.'));
      newInfo(fresh);
    },
    'bench-open': el => { const { cs } = curCase(); cs.lastView.bench = { fid: el.dataset.fid, i: +el.dataset.i, cand: null, fi: null, hl: false }; S().view.tab = 'laboratorio'; },
    'bench-close': () => { curCase().cs.lastView.bench = null; },
    'bench-cand': el => { const b = curCase().cs.lastView.bench; b.cand = el.dataset.id; b.fi = null; },
    'bench-finger': el => { curCase().cs.lastView.bench.fi = +el.dataset.i; },
    'bench-hl': () => { const b = curCase().cs.lastView.bench; b.hl = !b.hl; },
    'bench-latent': (el, e) => benchLatent(el, e),
    'bench-card': (el, e) => benchCard(el, e),
    'bench-noapta': () => benchNoApta(),
    'bench-auto': el => benchAuto(el.dataset.fid),
    'fx-off': () => { curCase().cs.lastView.fx = null; },
    'scene-plan': el => { const { cs } = curCase(); cs.lastView.plan = el.dataset.id; cs.lastView.sceneSel = null; },
    photo: el => {
      const { cs } = curCase();
      if (!guardOpen(cs) || !cs.examined[el.dataset.id] || cs.photos[el.dataset.id]) return;
      cs.photos[el.dataset.id] = true;
      EN.log(cs, 'photo', { ev: el.dataset.id });
      toast('Reportaje fotográfico registrado en la cadena de custodia.');
    },
    'wall-add-ev': el => { const { cs } = curCase(); if (wallAdd(cs, 'evidence', el.dataset.id)) toast('Tarjeta añadida al muro.'); },
    'gen-question': el => {
      const { c } = curCase();
      const e = c.evidence.find(x => x.id === el.dataset.id);
      S().notes.push({ id: uid(), author: 'yo', cat: 'Pregunta', caseId: c.id, text: '¿Qué explica lo observado en ' + e.id + ' (' + e.name + ')? ' + e.detail, t: Date.now() });
      toast('Pregunta añadida al cuaderno.');
      return false;
    },
    'map-sel': el => { const { cs } = curCase(); cs.lastView.mapSel = cs.lastView.mapSel === el.dataset.id ? null : el.dataset.id; },
    'map-link': () => {
      const { c, cs } = curCase();
      const a = document.getElementById('map-a').value, b = document.getElementById('map-b').value;
      const label = document.getElementById('map-label').value;
      if (!a || !b || a === b) { toast('Elige dos lugares distintos.', 'warn'); return false; }
      if (cs.mapLinks.some(l => (l.a === a && l.b === b) || (l.a === b && l.b === a))) { toast('Esos lugares ya están conectados.', 'warn'); return false; }
      cs.mapLinks.push({ id: uid(), a, b, label });
      EN.log(cs, 'map_link', { a, b });
      const d = EN.placeDistance(c, a, b);
      toast('Línea trazada' + (d !== null ? ': ≈' + d.toFixed(1) + ' km en línea recta.' : '.'));
    },
    'map-unlink': el => { const { cs } = curCase(); cs.mapLinks = cs.mapLinks.filter(l => l.id !== el.dataset.id); },
    'wall-add': () => {
      const { cs } = curCase();
      const v = document.getElementById('wall-add').value;
      if (!v) { toast('Elige qué añadir al muro.', 'warn'); return false; }
      const i = v.indexOf(':');
      wallAdd(cs, v.slice(0, i), v.slice(i + 1));
    },
    'wall-remove': el => {
      const { cs } = curCase();
      cs.wall.cards = cs.wall.cards.filter(k => k.id !== el.dataset.id);
      cs.wall.links = cs.wall.links.filter(l => l.a !== el.dataset.id && l.b !== el.dataset.id);
      toast('Tarjeta retirada del muro. El hecho sigue en el expediente.');
    },
    'wall-connect': () => {
      const { cs } = curCase();
      if (cs.wall.cards.length < 2) { toast('Necesitas al menos dos tarjetas en el muro.', 'warn'); return false; }
      cs.lastView.wallConnect = { on: true, from: null, label: document.getElementById('wall-label').value };
    },
    'wall-connect-cancel': () => { const { cs } = curCase(); cs.lastView.wallConnect = { on: false, from: null }; },
    'wall-unlink': el => { const { cs } = curCase(); cs.wall.links = cs.wall.links.filter(l => l.id !== el.dataset.id); },
    'wall-sort': () => {
      const { cs } = curCase();
      const cols = WALL_ORDER.filter(k => cs.wall.cards.some(x => x.kind === k));
      cols.forEach((kind, ci) => {
        cs.wall.cards.filter(x => x.kind === kind).forEach((x, ri) => { x.x = 20 + (ci % 6) * 240; x.y = Math.min(860, 20 + ri * 130 + Math.floor(ci / 6) * 420); });
      });
    },
    examine: el => examine(el.dataset.id),
    'to-lab': el => { const { cs } = curCase(); cs.lastView.labFocus = el.dataset.id; S().view.tab = 'laboratorio'; },
    'ev-filter': el => { curCase().cs.lastView.evFilter = el.dataset.id; },
    lab: el => requestLab(el.dataset.id, el.dataset.kind),
    digital: el => requestDigital(el.dataset.id),
    judicial: () => requestJudicial(),
    person: el => { curCase().cs.lastView.person = el.dataset.id; },
    ask: el => ask(el.dataset.person, el.dataset.q),
    confront: el => confront(el.dataset.person),
    speak: el => { speak(el.dataset.person); return false; },
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
    'modal-close': () => { S().introSeen = true; S().view.modal = S().player.name ? null : 'create'; },
    'modal-create': () => { S().view.modal = 'create'; },
    'tutorial-start': () => { S().view.modal = 'tut0'; },
    'tutorial-next': el => { S().view.modal = 'tut' + el.dataset.i; }
  };

  /* ---------- Formularios ---------- */
  const FORMS = {
    note: f => {
      const fd = new FormData(f);
      const text = String(fd.get('text') || '').trim();
      if (!text) return;
      S().notes.push({ id: uid(), author: 'yo', cat: fd.get('cat'), caseId: fd.get('caseId') || '', text, t: Date.now() });
      const { cs } = curCase();
      if (cs && fd.get('caseId') === S().view.caseId) EN.log(cs, 'note');
      toast('Nota guardada.');
    },
    player: f => {
      const fd = new FormData(f);
      const name = String(fd.get('name') || '').trim();
      if (name.length < 2) { toast('El nombre debe tener al menos 2 caracteres.', 'warn'); return; }
      S().player.name = name.slice(0, 24);
      S().player.specialty = fd.get('specialty') || '';
      toast('Ficha actualizada.');
    },
    create: f => {
      const s = S();
      const fd = new FormData(f);
      const name = String(fd.get('name') || '').trim();
      if (name.length < 2) { toast('Escribe un nombre de al menos 2 caracteres.', 'warn'); return; }
      s.player.name = name.slice(0, 24);
      s.player.specialty = fd.get('specialty') || '';
      const sp = C.specialties.find(x => x.id === s.player.specialty);
      if (sp && !s.player.bonusGiven) {
        Object.keys(sp.skills).forEach(k => { s.skills[k] = clamp(s.skills[k] + sp.skills[k], 0, 100); });
        s.player.bonusGiven = true;
      }
      s.introSeen = true;
      s.view.modal = 'tut0';
      toast('Bienvenido/a, ' + s.player.name + '.');
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
      const h = { id: uid(), author: 'yo', text, suspect: fd.get('suspect'), conf, confHistory: [conf], supports: [], against: [], status: 'activa', created: cs.seq };
      cs.hypotheses.push(h);
      EN.log(cs, 'hyp_create', { hyp: h.id, suspect: h.suspect, conf });
      toast('Hipótesis registrada.');
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
    'wall-question': f => {
      const { cs } = curCase();
      const q = String(new FormData(f).get('q') || '').trim();
      if (!q) return;
      wallAdd(cs, 'question', uid(), q);
    },
    'custody-note': f => {
      const { cs } = curCase();
      const fd = new FormData(f);
      const note = String(fd.get('note') || '').trim();
      if (!note) return;
      const ev = fd.get('ev');
      cs.custodyNotes[ev] = cs.custodyNotes[ev] || [];
      cs.custodyNotes[ev].push(note);
      EN.log(cs, 'custody_note', { ev });
      toast('Nota de custodia registrada.');
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
      const r = fn(el, e);
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
    else if (!s.player.name) s.view.modal = 'create';
    applySettings();
    bind();
    bindWall();
    render();
    connectDownloads();
  }

  /* Capacidad de descargas del visor de claude.ai. Si no existe (archivo local, otro
     host o visor sin el permiso), se queda en null y el juego usa el enlace normal. */
  function connectDownloads() {
    if (!window.claude || typeof window.claude.use !== 'function') return;
    window.claude.use('downloads').then(d => {
      E0.downloads = d || null;
      if (d && S().view.screen === 'settings') render();
    }, () => { E0.downloads = null; });
  }

  E0.app = { render, boot, drawWall };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
