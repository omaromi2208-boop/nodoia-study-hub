/* EXPEDIENTE 0 — render de pantallas. Solo genera HTML a partir del estado;
 * las acciones se resuelven en app.js mediante atributos data-act. */
(function () {
  const C = E0.config;
  const EN = E0.engine;

  const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  const S = () => E0.store.state;

  const ICONS = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    cases: '<path d="M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>',
    academy: '<path d="M2 8l10-4 10 4-10 4z"/><path d="M6 10v5c3 2 9 2 12 0v-5"/>',
    career: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    notebook: '<path d="M6 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6z"/><path d="M6 3v18M9 8h6M9 12h6"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    case: '<path d="M6 2h9l5 5v15H6z"/><circle cx="12" cy="14" r="3"/><path d="M14.2 16.2L17 19"/>'
  };
  const icon = k => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[k] + '</svg>';

  /* Retrato procedural: rasgos derivados del identificador de la persona (estable entre partidas). */
  function portrait(p, size) {
    const A = E0.appearance(p);
    const { skin, hair, cloth, style, glasses, beard, old } = A;
    const hairSvg = [
      '<path d="M30 44c0-14 9-22 20-22s20 8 20 22c-3-6-9-10-20-10s-17 4-20 10z" fill="' + hair + '"/>',
      '<path d="M28 50c-2-18 8-28 22-28s24 10 22 28c-1 10-2 22-4 30h-6c2-10 3-20 2-30-6-6-22-6-28 0-1 10 0 20 2 30h-6c-2-8-3-20-4-30z" fill="' + hair + '"/>',
      '<path d="M31 42c1-12 9-19 19-19 11 0 19 7 19 19-5-5-12-7-19-7s-14 2-19 7z" fill="' + hair + '"/><path d="M31 42c-1 4-1 8 0 11M69 42c1 4 1 8 0 11" stroke="' + hair + '" stroke-width="3"/>',
      '<path d="M33 40c3-10 10-15 17-15 9 0 15 5 17 15-4-3-10-4-17-4s-13 1-17 4z" fill="' + hair + '" opacity=".85"/>'
    ][style];
    return '<svg class="portrait" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" role="img" aria-label="Retrato de ' + esc(p.name) + '">' +
      '<circle cx="50" cy="50" r="50" fill="var(--panel-2)"/>' +
      '<path d="M16 100c2-18 16-26 34-26s32 8 34 26z" fill="' + cloth + '"/>' +
      '<rect x="44" y="62" width="12" height="12" rx="4" fill="' + skin + '"/>' +
      '<ellipse cx="50" cy="48" rx="18" ry="21" fill="' + skin + '"/>' +
      (beard ? '<path d="M34 52c2 14 8 19 16 19s14-5 16-19c-4 6-10 8-16 8s-12-2-16-8z" fill="' + hair + '" opacity=".9"/>' : '') +
      hairSvg +
      '<ellipse cx="43" cy="48" rx="2.2" ry="2.6" fill="#1a1a1a"/><ellipse cx="57" cy="48" rx="2.2" ry="2.6" fill="#1a1a1a"/>' +
      '<path d="M39 42.5h8M53 42.5h8" stroke="' + (old ? '#8f8a82' : hair) + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M44 59c4 2 8 2 12 0" stroke="#5b2f2a" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      (glasses ? '<g fill="none" stroke="#1a1d22" stroke-width="1.6"><circle cx="43" cy="48" r="6"/><circle cx="57" cy="48" r="6"/><path d="M49 48h2"/></g>' : '') +
      (old ? '<path d="M38 54c2 1 4 1 6 0M56 54c2 1 4 1 6 0" stroke="#00000033" stroke-width="1"/>' : '') +
      '</svg>';
  }

  function rankIndex(xp) {
    let i = 0;
    C.ranks.forEach((r, k) => { if (xp >= r.xp) i = k; });
    return i;
  }
  function rankInfo(xp) {
    const i = rankIndex(xp);
    const cur = C.ranks[i], next = C.ranks[i + 1] || null;
    const pct = next ? Math.round((xp - cur.xp) / (next.xp - cur.xp) * 100) : 100;
    return { i, cur, next, pct };
  }
  const playerName = () => S().player.name || 'Investigador/a';
  const invName = () => playerName();
  const initials = n => String(n || '?').trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const specialty = () => C.specialties.find(x => x.id === S().player.specialty) || null;
  const money = n => n.toLocaleString('es-ES') + ' €';

  /* ---------- Shell ---------- */
  function topbar() {
    const s = S();
    const r = rankInfo(s.xp);
    return '<button class="burger" data-act="nav-toggle" aria-label="Abrir menú"><i></i><i></i><i></i></button>' +
      '<div class="brand"><b>EXPEDIENTE <span>0</span></b><small>INVESTIGACIÓN</small></div>' +
      '<div class="top-stats">' +
      '<span class="chip opt" title="Rango">' + esc(r.cur.name) + '</span>' +
      '<span class="chip" title="Dinero"><em>€</em>' + s.money.toLocaleString('es-ES') + '</span>' +
      '<span class="chip opt" title="Energía"><em>EN</em>' + s.energy + '</span>' +
      '<button class="player-chip" data-act="go" data-screen="profile" title="Perfil"><span class="avatar sm acc">' + esc(initials(playerName())) + '</span><span class="pc-name">' + esc(playerName()) + '</span></button>' +
      '</div>';
  }

  function sidebar() {
    const s = S();
    const cur = s.view.screen;
    const items = [['home', 'Inicio'], ['cases', 'Expedientes'], ['academy', 'Academia'], ['career', 'Carrera'], ['notebook', 'Cuaderno'], ['profile', 'Perfil'], ['settings', 'Ajustes']];
    let h = items.map(([id, label]) => '<button class="nav-btn" data-act="go" data-screen="' + id + '"' + (cur === id ? ' aria-current="page"' : '') + '>' + icon(id) + label + '</button>').join('');
    const active = Object.keys(s.cases).find(id => s.cases[id].status === 'activo');
    const shown = s.view.caseId || active;
    if (shown) {
      const c = EN.getCase(shown);
      h += '<div class="eyebrow nav-sep">Expediente activo</div>' +
        '<button class="nav-btn nav-case" data-act="open-case" data-id="' + c.id + '"' + (cur === 'case' ? ' aria-current="page"' : '') + '>' + icon('case') +
        '<span>' + esc(c.title) + '<small>' + c.id + ' · ' + (s.cases[c.id] && s.cases[c.id].status === 'cerrado' ? 'cerrado' : 'activo') + '</small></span></button>';
    }
    h += '<div class="side-foot">Semana ' + s.week + ' · jornada ' + (s.jornada % C.jornadasPorSemana + 1) + '/' + C.jornadasPorSemana + (E0.store.storageOk ? '<br>Guardado automático activo' : '<br><span style="color:var(--amber)">Sin almacenamiento local: exporta la partida para no perderla</span>') + '</div>';
    return h;
  }

  /* ---------- Inicio ---------- */
  function caseProgress(c, cs) {
    if (!cs) return { ev: 0, int: 0, hyp: 0, lab: 0, dig: 0, con: 0 };
    return {
      ev: Object.keys(cs.examined).length,
      int: c.people.filter(p => cs.asked[p.id] && Object.keys(cs.asked[p.id]).length).length,
      hyp: cs.hypotheses.filter(h => h.status !== 'descartada').length,
      lab: Object.keys(cs.lab).length,
      dig: Object.keys(cs.digital).length + cs.judicial.length,
      con: Object.keys(cs.conflicts).length
    };
  }

  const unlocked = c => rankInfo(S().xp).i >= (c.minRank || 0);
  function featuredCase() {
    const s = S();
    return E0.cases.find(c => s.cases[c.id] && s.cases[c.id].status === 'activo') ||
      E0.cases.find(c => unlocked(c) && !s.cases[c.id]) ||
      E0.cases.find(c => !unlocked(c)) || E0.cases[E0.cases.length - 1];
  }
  function lockText(c) {
    const need = C.ranks[c.minRank || 0];
    return 'Requiere rango «' + need.name + '» (faltan ' + Math.max(0, need.xp - S().xp) + ' XP)';
  }

  function caseButton(c) {
    const cs = S().cases[c.id];
    if (!cs && !unlocked(c)) return '<button class="btn" disabled>' + esc(lockText(c)) + '</button>';
    if (!cs) return '<button class="btn primary" data-act="open-case" data-id="' + c.id + '">Abrir expediente</button>';
    if (cs.status === 'cerrado') return '<button class="btn" data-act="open-case" data-id="' + c.id + '">Revisar expediente</button>';
    return '<button class="btn primary" data-act="open-case" data-id="' + c.id + '">Continuar investigación</button>';
  }

  function screenHome() {
    const s = S();
    const r = rankInfo(s.xp);
    const c = featuredCase();
    const cs = s.cases[c.id];
    const solved = s.history.length;
    const doneMods = E0.academy.filter(m => s.academy[m.id]).length;
    const status = !cs ? (unlocked(c) ? 'Sin abrir' : 'Bloqueado') : cs.status === 'cerrado' ? 'Cerrado' : 'Activo';
    const p = caseProgress(c, cs);
    const pendingMods = E0.academy.filter(m => !s.academy[m.id]).slice(0, 4);
    return '<section class="screen stack-lg">' +
      '<div class="screen-head"><div><div class="eyebrow">Centro de investigación · Semana ' + s.week + '</div><h1>' + esc(playerName()) + '</h1></div>' +
      '<div class="team"><div class="team-member"><div class="avatar lg acc">' + esc(initials(playerName())) + '</div><div><b>' + esc(rankInfo(s.xp).cur.name) + '</b><div class="faint mono" style="font-size:.72rem">' + esc(specialty() ? specialty().name.toUpperCase() : 'SIN ESPECIALIDAD') + '</div></div></div></div></div>' +
      '<div class="hero">' +
      '<article class="panel dossier hero-case stack"><span class="stamp badge ' + (status === 'Activo' ? 'acc' : status === 'Cerrado' ? 'ok' : '') + '">' + status + '</span>' +
      '<div><div class="case-code">' + c.id + ' · EXPEDIENTE DESTACADO</div><div class="case-title">' + esc(c.title) + '</div>' +
      '<p class="muted">' + esc(c.type) + ' · Dificultad ' + esc(c.difficulty) + ' · ' + esc(c.location) + '</p></div>' +
      '<p>' + esc(c.briefing[0]) + '</p>' +
      (cs ? '<div class="row mono faint" style="font-size:.76rem">EVIDENCIAS ' + p.ev + '/' + c.evidence.length + ' · ENTREVISTAS ' + p.int + '/' + c.people.length + ' · HIPÓTESIS ' + p.hyp + ' · CONTRADICCIONES ' + p.con + '</div>' : '') +
      '<div class="row">' + caseButton(c) + '</div></article>' +
      '<article class="panel stack"><div class="panel-head"><h3>Carrera</h3><span class="badge acc">' + esc(r.cur.name) + '</span></div>' +
      '<div class="stack" style="gap:6px"><div class="spread mono" style="font-size:.78rem"><span>' + s.xp + ' XP</span><span class="muted">' + (r.next ? r.next.xp + ' XP → ' + esc(r.next.name) : 'Rango máximo') + '</span></div><div class="bar"><i style="width:' + r.pct + '%"></i></div></div>' +
      '<div class="grid-sm" style="grid-template-columns:repeat(2,minmax(0,1fr))">' +
      '<div class="stat"><b>' + s.reputation + '</b><span>Reputación</span></div>' +
      '<div class="stat"><b>' + money(s.money) + '</b><span>Dinero</span></div>' +
      '<div class="stat"><b>' + solved + '/' + E0.cases.length + '</b><span>Casos cerrados</span></div>' +
      '<div class="stat"><b>' + doneMods + '/' + E0.academy.length + '</b><span>Academia</span></div></div>' +
      '<div class="stack" style="gap:6px"><div class="spread mono" style="font-size:.78rem"><span>Energía de jornada</span><span>' + s.energy + '/100</span></div><div class="bar energy ' + (s.energy < 30 ? 'low' : '') + '"><i style="width:' + s.energy + '%"></i></div></div>' +
      '</article></div>' +
      '<div class="grid">' +
      '<article class="panel stack"><div class="panel-head"><h3>Realizar jornada</h3><span class="eyebrow">Semana ' + s.week + ' · jornada ' + (s.jornada % C.jornadasPorSemana + 1) + '/' + C.jornadasPorSemana + '</span></div>' +
      '<div class="jornada-list">' + C.jornada.map(j => {
        const fx = [j.energy ? (j.energy > 0 ? '+' : '') + j.energy + ' EN' : '', j.xp ? '+' + j.xp + ' XP' : '', j.money ? '+' + j.money + ' €' : ''].filter(Boolean).join(' · ');
        const can = j.energy >= 0 || s.energy + j.energy >= 0;
        return '<div class="jornada-item"><div class="min0"><b>' + esc(j.name) + '</b><p>' + esc(j.desc) + '</p></div><div class="row" style="flex-wrap:nowrap"><span class="fx">' + fx + '</span><button class="btn small" data-act="jornada" data-id="' + j.id + '"' + (can ? '' : ' disabled title="Energía insuficiente"') + '>Hacer</button></div></div>';
      }).join('') + '</div><p class="faint" style="font-size:.8rem">Al completar ' + C.jornadasPorSemana + ' jornadas se cobra el salario semanal de tu rango (' + money(r.cur.salary) + ').</p></article>' +
      '<article class="panel stack"><div class="panel-head"><h3>Academia</h3><button class="btn small ghost" data-act="go" data-screen="academy">Abrir</button></div>' +
      '<p class="muted" style="font-size:.86rem">' + doneMods + ' de ' + E0.academy.length + ' módulos completados.' + (pendingMods.length ? ' Pendientes:' : ' Formación inicial completa.') + '</p>' +
      pendingMods.map(m => '<div class="spread" style="padding:6px 0;border-bottom:1px dashed var(--line-soft)"><div class="min0"><div class="eyebrow">' + esc(m.area) + '</div><div>' + esc(m.title) + '</div></div><span class="badge">+' + m.xp + ' XP</span></div>').join('') +
      '</article></div></section>';
  }

  /* ---------- Expedientes ---------- */
  function screenCases() {
    const s = S();
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Archivo de la unidad</div><h1>Expedientes</h1></div></div>' +
      E0.cases.map(c => {
        const cs = s.cases[c.id];
        const p = caseProgress(c, cs);
        const status = !cs ? (unlocked(c) ? 'Disponible' : 'Bloqueado') : cs.status === 'cerrado' ? 'Cerrado' : 'Activo';
        return '<article class="panel dossier stack' + (status === 'Bloqueado' ? ' locked' : '') + '"><div class="spread"><div><div class="case-code">' + c.id + '</div><h2 style="font-size:1.8rem;text-transform:uppercase">' + esc(c.title) + '</h2></div><span class="badge ' + (status === 'Activo' ? 'acc' : status === 'Cerrado' ? 'ok' : '') + '">' + status + '</span></div>' +
          '<dl class="kv"><dt>Tipo</dt><dd>' + esc(c.type) + '</dd><dt>Dificultad</dt><dd>' + esc(c.difficulty) + '</dd>' + (c.budget ? '<dt>Presupuesto</dt><dd>' + money(c.budget) + (s.budgets && s.budgets[c.id] ? ' (asignado)' : ' (se asigna al abrirlo)') + '</dd>' : '') + '<dt>Lugar</dt><dd>' + esc(c.location) + '</dd><dt>Fecha</dt><dd>' + esc(c.date) + '</dd><dt>' + esc(c.victimLabel || 'Víctima') + '</dt><dd>' + esc(c.victim.summary || c.victim.name + ', ' + c.victim.age + ' años') + '</dd>' + (c.variants ? '<dt>Versiones</dt><dd>' + Object.keys(c.variants).length + ' soluciones posibles: los hechos cambian en cada partida</dd>' : '') + '</dl>' +
          (status === 'Bloqueado' ? '<p class="faint" style="font-size:.86rem">Se desbloquea al ascender. Gana XP cerrando expedientes, en la academia o con jornadas de estudio.</p>' : '') +
          (cs ? '<div class="row mono faint" style="font-size:.76rem">EVIDENCIAS ' + p.ev + '/' + c.evidence.length + ' · ENTREVISTAS ' + p.int + '/' + c.people.length + ' · LAB ' + p.lab + ' · DIGITAL ' + p.dig + ' · CONTRADICCIONES ' + p.con + '</div>' : '') +
          (cs && cs.evaluation ? '<div class="result">Resultado: <b>' + cs.evaluation.total + '/100</b>' + (cs.trial ? ' · Juicio: ' + cs.trial.rebutted + '/' + cs.trial.total + ' objeciones respondidas' : '') + '</div>' : '') +
          '<div class="row">' + caseButton(c) +
          (cs ? (s.view.confirmRestart === c.id ? '<button class="btn danger" data-act="restart-case" data-id="' + c.id + '">Confirmar: borrar progreso y repetir</button><button class="btn ghost" data-act="cancel-restart">Cancelar</button>' : '<button class="btn ghost" data-act="ask-restart" data-id="' + c.id + '">Repetir desde cero</button>') : '') +
          '</div></article>';
      }).join('') + '</section>';
  }

  /* ---------- Academia ---------- */
  function screenAcademy() {
    const s = S();
    const open = s.view.module;
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Formación continua</div><h1>Academia</h1></div><span class="badge">' + E0.academy.filter(m => s.academy[m.id]).length + '/' + E0.academy.length + ' módulos</span></div>' +
      '<div class="grid">' + E0.academy.map(m => {
        const st = s.academy[m.id];
        const isOpen = open === m.id;
        let body = '';
        if (isOpen) {
          body = '<p>' + esc(m.lesson) + '</p><div class="result neutral"><div class="sub">Ejemplo</div>' + esc(m.example) + '</div>' +
            '<div class="sub">Evaluación</div><p><b>' + esc(m.question) + '</b></p><div class="stack" style="gap:6px">' +
            m.options.map((o, i) => {
              let cls = '';
              if (st) cls = i === m.correct ? ' right' : (st.answer === i ? ' wrong' : '');
              return '<button class="option' + cls + '" data-act="academy-answer" data-id="' + m.id + '" data-i="' + i + '"' + (st ? ' disabled' : '') + '>' + esc(o) + '</button>';
            }).join('') + '</div>' +
            (st ? '<div class="result ' + (st.correct ? '' : 'neutral') + '">' + (st.correct ? 'Respuesta correcta. ' : 'Respuesta incorrecta. ') + esc(m.explain) + ' <span class="mono">(+' + (st.correct ? m.xp : Math.round(m.xp / 4)) + ' XP)</span></div>' : '');
        }
        return '<article class="panel module"><div class="spread"><div class="eyebrow">' + esc(m.area) + '</div>' + (st ? '<span class="badge ok">Completado</span>' : '<span class="badge">+' + m.xp + ' XP</span>') + '</div><h3>' + esc(m.title) + '</h3>' + body +
          '<div class="row"><button class="btn small ' + (isOpen ? 'ghost' : '') + '" data-act="academy-open" data-id="' + m.id + '">' + (isOpen ? 'Cerrar' : (st ? 'Repasar' : 'Empezar módulo')) + '</button></div></article>';
      }).join('') + '</div>' + legalLibrary() + '</section>';
  }

  function legalLibrary() {
    const L = E0.legal;
    return '<article class="panel stack" id="biblioteca"><div class="panel-head"><h2>Biblioteca jurídica</h2><span class="badge warn">Comprueba la vigencia</span></div>' +
      '<p class="muted" style="font-size:.9rem">' + esc(L.disclaimer) + '</p>' +
      '<div class="grid"><div class="stack"><div class="sub">Fuentes oficiales (BOE)</div>' +
      L.official.map(o => '<div class="note"><a class="ext" href="' + esc(o.url) + '" target="_blank" rel="noopener">' + esc(o.name) + ' ↗</a><p class="muted" style="font-size:.85rem">' + esc(o.note) + '</p></div>').join('') + '</div>' +
      '<div class="stack"><div class="sub">Contenido educativo interno</div>' +
      L.internal.map(o => '<div class="note"><b>' + esc(o.title) + '</b><p style="font-size:.88rem">' + esc(o.text) + '</p></div>').join('') + '</div></div>' +
      '<div class="result neutral"><div class="sub">Simulación del juego</div>' + esc(L.simulation) + '</div></article>';
  }

  /* ---------- Carrera ---------- */
  function screenCareer() {
    const s = S();
    const r = rankInfo(s.xp);
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Progresión profesional</div><h1>Carrera</h1></div><span class="badge acc">' + s.xp + ' XP</span></div>' +
      '<div class="grid"><article class="panel stack"><h3>Escalafón</h3><div class="ladder">' + C.ranks.map((rk, i) =>
        '<div class="rung ' + (i === r.i ? 'now' : i < r.i ? 'done' : '') + '"><span class="mono faint">' + (i + 1) + '</span><div class="min0"><b>' + esc(rk.name) + '</b><div class="faint mono" style="font-size:.72rem">Salario semanal ' + money(rk.salary) + '</div></div><span class="mono" style="font-size:.8rem">' + rk.xp + ' XP</span></div>').join('') + '</div></article>' +
      '<article class="panel stack"><h3>Situación</h3><dl class="kv"><dt>Rango</dt><dd>' + esc(r.cur.name) + '</dd><dt>Siguiente</dt><dd>' + (r.next ? esc(r.next.name) + ' (faltan ' + (r.next.xp - s.xp) + ' XP)' : '—') + '</dd><dt>Reputación</dt><dd>' + s.reputation + '/100</dd><dt>Dinero</dt><dd>' + money(s.money) + '</dd><dt>Calendario</dt><dd>Semana ' + s.week + ', jornada ' + (s.jornada % C.jornadasPorSemana + 1) + '</dd></dl>' +
      '<h3 style="margin-top:8px">Historial de casos</h3>' + (s.history.length ? s.history.map(hh => '<div class="result neutral"><b>' + esc(hh.caseId) + ' · ' + esc(hh.title) + '</b><br><span class="mono" style="font-size:.8rem">' + hh.score + '/100 · ' + esc(hh.date) + ' · ' + (hh.culpritOk ? 'atribución correcta' : 'atribución no correcta') + '</span></div>').join('') : '<p class="muted">Todavía no has cerrado ningún expediente.</p>') +
      '</article></div></section>';
  }

  /* ---------- Cuaderno ---------- */
  function screenNotebook() {
    const s = S();
    const notes = s.notes.slice().reverse();
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Libreta de la unidad</div><h1>Cuaderno</h1></div></div>' +
      '<div class="grid"><form class="panel stack" data-form="note"><h3>Nueva entrada</h3>' +
      '<div class="row" style="flex-wrap:nowrap"><label class="field" style="flex:1">Categoría<select id="note-cat" name="cat">' + C.noteCategories.map(c => '<option>' + c + '</option>').join('') + '</select></label>' +
      '<label class="field" style="flex:1">Expediente<select id="note-case" name="caseId"><option value="">General</option>' + E0.cases.map(c => '<option value="' + c.id + '"' + (s.view.caseId === c.id ? ' selected' : '') + '>' + c.id + '</option>').join('') + '</select></label></div>' +
      '<label class="field">Texto<textarea id="note-text" name="text" required placeholder="Escribe libremente: dudas, horas, ideas por comprobar…"></textarea></label>' +
      '<div class="row"><button class="btn primary" type="submit">Guardar nota</button></div></form>' +
      '<div class="stack">' +
      (notes.length ? notes.map(n => '<div class="note"><div class="spread"><span class="row"><span class="badge acc">' + esc(n.cat) + '</span>' + (n.caseId ? '<span class="badge">' + esc(n.caseId) + '</span>' : '') + '</span><button class="linkish" data-act="note-del" data-id="' + n.id + '">Eliminar</button></div><p>' + esc(n.text) + '</p><span class="faint mono" style="font-size:.7rem">' + new Date(n.t).toLocaleString('es-ES') + '</span></div>').join('') : '<p class="muted">Aún no hay notas.</p>') +
      '</div></div></section>';
  }

  /* ---------- Perfil ---------- */
  function screenProfile() {
    const s = S();
    const r = rankInfo(s.xp);
    const last = s.history.length ? s.history[s.history.length - 1] : null;
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Ficha del investigador</div><h1>' + esc(playerName()) + '</h1></div><div class="avatar lg acc">' + esc(initials(playerName())) + '</div></div>' +
      '<div class="grid"><article class="panel stack"><dl class="kv"><dt>Nombre</dt><dd>' + esc(playerName()) + '</dd><dt>Especialidad</dt><dd>' + (specialty() ? esc(specialty().name) + ' — ' + esc(specialty().perk) : 'Sin especialidad') + '</dd><dt>Rango</dt><dd>' + esc(r.cur.name) + '</dd><dt>XP</dt><dd>' + s.xp + '</dd><dt>Reputación</dt><dd>' + s.reputation + '/100</dd><dt>Casos</dt><dd>' + s.history.length + ' cerrados / ' + E0.cases.length + ' disponibles</dd></dl>' +
      '<h3>Perfil de razonamiento acumulado</h3>' + (last ? '<div class="stack" style="gap:6px">' + last.lines.map(l => '<p style="font-size:.9rem">' + esc(l) + '</p>').join('') + '</div>' : '<p class="muted">Aparecerá al cerrar el primer expediente. Se basa en tus acciones reales durante la investigación.</p>') +
      '</article><article class="panel stack"><h3>Habilidades</h3>' + C.skills.map(k => '<div class="skill-row"><span>' + k.name + '</span><div class="bar"><i style="width:' + s.skills[k.id] + '%"></i></div><span class="mono">' + s.skills[k.id] + '</span></div>').join('') +
      '<p class="faint" style="font-size:.78rem">Las habilidades se actualizan con la evaluación de cada caso y con la academia. No son un test psicológico ni una medida de inteligencia.</p></article></div></section>';
  }

  /* ---------- Ajustes ---------- */
  function screenSettings() {
    const s = S();
    const st = s.settings;
    const inFrame = window.self !== window.top;
    return '<section class="screen stack-lg"><div class="screen-head"><div><div class="eyebrow">Configuración</div><h1>Ajustes</h1></div></div>' +
      '<div class="grid"><form class="panel stack" data-form="player"><h3>Tu investigador/a</h3>' +
      '<label class="field">Nombre<input type="text" id="player-name" name="name" maxlength="24" required value="' + esc(s.player.name) + '"></label>' +
      '<label class="field">Especialidad<select id="player-spec" name="specialty"><option value="">Sin especialidad</option>' + C.specialties.map(x => '<option value="' + x.id + '"' + (s.player.specialty === x.id ? ' selected' : '') + '>' + esc(x.name) + ' — ' + esc(x.perk) + '</option>').join('') + '</select></label>' +
      '<div class="row"><button class="btn primary" type="submit">Guardar</button></div></form>' +
      '<article class="panel stack"><h3>Tema visual</h3><div class="swatches">' + C.themes.map(t => '<button class="swatch" data-act="theme" data-id="' + t.id + '" aria-pressed="' + (st.theme === t.id) + '"><i class="sw-' + t.id + '"></i>' + esc(t.name) + '</button>').join('') + '</div>' +
      '<h3>Interfaz</h3><label class="check"><input type="checkbox" id="set-anim" data-act="toggle-setting" data-key="anim"' + (st.anim ? ' checked' : '') + '>Animaciones activadas</label>' +
      '<label class="check"><input type="checkbox" id="set-sound" data-act="toggle-setting" data-key="sound"' + (st.sound ? ' checked' : '') + '>Sonido de interfaz discreto</label>' +
      '<label class="field">Tamaño de interfaz<select id="set-scale" data-act="set-scale">' + [90, 100, 112, 125].map(v => '<option value="' + v + '"' + (st.scale === v ? ' selected' : '') + '>' + v + ' %</option>').join('') + '</select></label>' +
      '<p class="faint" style="font-size:.78rem">Si tu sistema pide reducir el movimiento, las animaciones se desactivan automáticamente.</p></article>' +
      '<article class="panel stack"><h3>Exportar partida</h3><p class="muted" style="font-size:.88rem">Copia este JSON para guardar una copia de seguridad o pasarla a otro dispositivo.</p>' +
      '<textarea class="copy-area" id="export-area" readonly>' + esc(E0.store.exportJSON()) + '</textarea>' +
      '<div class="row"><button class="btn" data-act="copy-export">Copiar JSON</button>' + (inFrame && !E0.downloads ? '' : '<button class="btn ghost" data-act="download-export">Descargar .json</button>') + '</div></article>' +
      '<form class="panel stack" data-form="import"><h3>Importar partida</h3><p class="muted" style="font-size:.88rem">Pega aquí un JSON exportado o elige un archivo. Se valida antes de sustituir la partida actual.</p>' +
      '<textarea class="copy-area" id="import-area" name="json" placeholder="{ &quot;v&quot;: 1, … }"></textarea>' +
      '<input type="file" id="import-file" accept="application/json,.json" data-act="import-file">' +
      '<div class="row"><button class="btn primary" type="submit">Validar e importar</button></div></form>' +
      '<article class="panel stack"><h3>Borrar partida</h3><p class="muted" style="font-size:.88rem">Elimina perfil, progreso, notas y casos de este navegador.</p><div class="row">' +
      (s.view.confirmReset ? '<button class="btn danger" data-act="reset-game">Confirmar: borrar todo</button><button class="btn ghost" data-act="cancel-reset">Cancelar</button>' : '<button class="btn danger" data-act="ask-reset">Borrar partida</button>') +
      '</div></article></div></section>';
  }

  /* ---------- Caso ---------- */
  const TABS = [
    ['resumen', 'Resumen'], ['escena', 'Escena'], ['evidencias', 'Evidencias'], ['laboratorio', 'Laboratorio'], ['digital', 'Digital'],
    ['personas', 'Personas'], ['comparador', 'Comparador'], ['cronologia', 'Cronología'], ['mapa', 'Mapa'], ['muro', 'Muro'],
    ['hipotesis', 'Hipótesis'], ['consulta', 'Consulta'], ['informe', 'Informe'], ['custodia', 'Custodia'], ['veredicto', 'Veredicto']
  ];

  function factRow(c, f, extra) {
    const t = f.time ? f.time + (f.end ? '–' + f.end : '') : (f.date ? f.date.split(',')[0] : '—');
    return '<div class="fact ' + (f.kind === 'statement' ? 'statement' : '') + '"><time>' + esc(t) + '</time><div class="min0"><span class="src">' + esc(f.source) + '</span>' + esc(f.text) + (extra || '') + '</div></div>';
  }

  function factLabel(c, id) {
    const f = c.facts[id];
    const t = f.time ? f.time + ' · ' : '';
    const txt = f.text.length > 90 ? f.text.slice(0, 88) + '…' : f.text;
    return '[' + f.source + '] ' + t + txt;
  }

  function factOptions(c, cs, opts) {
    opts = opts || {};
    const facts = EN.knownFacts(c, cs, opts.filter);
    const stm = facts.filter(f => f.kind === 'statement');
    const rec = facts.filter(f => f.kind !== 'statement');
    const o = list => list.map(f => '<option value="' + f.id + '"' + (opts.selected === f.id ? ' selected' : '') + '>' + esc(factLabel(c, f.id)) + '</option>').join('');
    return '<option value="">' + (opts.placeholder || 'Elige un hecho del expediente…') + '</option>' +
      (stm.length ? '<optgroup label="Declaraciones">' + o(stm) + '</optgroup>' : '') +
      (rec.length ? '<optgroup label="Registros y hallazgos">' + o(rec) + '</optgroup>' : '');
  }

  function screenCase() {
    const s = S();
    const c = EN.getCase(s.view.caseId);
    const cs = s.cases[c.id];
    const tab = s.view.tab || 'resumen';
    const p = caseProgress(c, cs);
    const closed = cs.status === 'cerrado';
    const counts = { evidencias: p.ev, personas: p.int, hipotesis: p.hyp, laboratorio: p.lab, digital: p.dig, comparador: p.con, muro: cs.wall.cards.length, mapa: cs.mapLinks.length };
    const R = {
      resumen: tabResumen, escena: tabEscena, evidencias: tabEvidencias, laboratorio: tabLab, digital: tabDigital, personas: tabPersonas,
      comparador: tabComparador, cronologia: tabCronologia, mapa: tabMapa, muro: tabMuro, hipotesis: tabHipotesis, consulta: tabConsulta,
      informe: tabInforme, custodia: tabCustodia, veredicto: tabVeredicto
    };
    return '<section class="screen">' +
      '<div class="case-head"><div class="min0"><div class="crumbs"><button data-act="go" data-screen="cases">Expedientes</button> / ' + c.id + ' / ' + esc(TABS.find(t => t[0] === tab)[1]) + '</div>' +
      '<div class="case-code">' + c.id + '</div><h1>' + esc(c.title) + '</h1>' +
      '<div class="row" style="margin-top:8px"><span class="badge">' + esc(c.victimLabel || 'Víctima') + ': ' + esc(c.victim.name) + '</span><span class="badge ' + (closed ? 'ok' : 'acc') + '">' + (closed ? 'Cerrado' : 'Activo') + '</span><span class="badge warn">Dificultad ' + esc(c.difficulty) + '</span></div></div>' +
      '<div class="stack" style="gap:4px;align-items:flex-end"><span class="eyebrow">Objetivo</span><span style="font-size:.9rem">Reconstrucción del caso</span><span class="faint mono" style="font-size:.72rem">Investiga: ' + esc(playerName()) + '</span></div></div>' +
      '<nav class="tabs" role="tablist" aria-label="Herramientas del expediente">' + TABS.map(([id, l]) => '<button class="tab" role="tab" data-act="tab" data-tab="' + id + '" aria-selected="' + (tab === id) + '">' + l + (counts[id] ? '<sup>' + counts[id] + '</sup>' : '') + '</button>').join('') + '</nav>' +
      '<div id="tab-body">' + R[tab](c, cs) + '</div>' +
      '<div class="case-bar" aria-label="Estado de la investigación"><span>Evidencias <b>' + p.ev + '/' + c.evidence.length + '</b></span><span>Entrevistas <b>' + p.int + '/' + c.people.length + '</b></span><span>Hipótesis <b>' + p.hyp + '</b></span><span>Lab <b>' + p.lab + '</b></span><span>Digital <b>' + p.dig + '</b></span><span>Contradicciones <b>' + p.con + '</b></span></div>' +
      '</section>';
  }

  function tabResumen(c, cs) {
    const facts = EN.knownFacts(c, cs);
    const recent = facts.slice(-6).reverse();
    return '<div class="grid grid-2">' +
      '<article class="panel dossier stack"><div class="eyebrow">Informe inicial</div>' + c.briefing.map(b => '<p>' + esc(b) + '</p>').join('') +
      '<dl class="kv"><dt>Lugar</dt><dd>' + esc(c.location) + '</dd><dt>Fecha</dt><dd>' + esc(c.date) + '</dd><dt>' + esc(c.victimLabel || 'Víctima') + '</dt><dd>' + esc(c.victim.summary || c.victim.name + ', ' + c.victim.age + ' años') + '. ' + esc(c.victim.job) + '</dd><dt>Ventana</dt><dd>' + esc(c.deathWindow) + '</dd></dl></article>' +
      '<article class="panel stack"><div class="panel-head"><h3>Últimas incorporaciones</h3><span class="badge">' + facts.length + ' hechos</span></div>' +
      recent.map(f => factRow(c, f)).join('') +
      '<div class="sub">Personas del expediente</div><div class="stack" style="gap:6px">' + c.people.map(p => '<div class="row" style="flex-wrap:nowrap">' + portrait(p, 34) + '<div class="min0"><b style="font-size:.9rem">' + esc(p.name) + '</b> <span class="muted" style="font-size:.82rem">· ' + esc(p.role) + '</span></div></div>').join('') + '</div></article></div>';
  }

  function scenePlanId(c, cs) {
    const sel = cs.lastView.sceneSel || null;
    const plans = c.scene.plans;
    let planId = cs.lastView.plan || plans[0].id;
    if (!plans.find(pl => pl.id === planId)) planId = plans[0].id;
    if (sel && !plans.find(pl => pl.id === planId).hotspots.some(h => h.ev === sel)) {
      const owner = plans.find(pl => pl.hotspots.some(h => h.ev === sel));
      if (owner) planId = owner.id;
    }
    return planId;
  }
  const use3d = () => S().settings.view3d !== false && !!E0.scene3d && E0.scene3d.available();

  function tabEscena(c, cs) {
    const sel = cs.lastView.sceneSel || null;
    const evById = id => c.evidence.find(e => e.id === id);
    const plans = c.scene.plans;
    const planId = scenePlanId(c, cs);
    const can3d = !!E0.scene3d && E0.scene3d.available();
    const in3d = use3d();
    const P = plans.find(pl => pl.id === planId);
    const planTabs = plans.length > 1 ? '<div class="row" role="group" aria-label="Zonas de la escena" style="margin-bottom:10px">' + plans.map(pl => {
      const n = pl.hotspots.filter(h => cs.examined[h.ev]).length;
      return '<button class="btn small ' + (pl.id === planId ? 'primary' : 'ghost') + '" data-act="scene-plan" data-id="' + pl.id + '">' + esc(pl.name) + ' <span class="cost">' + n + '/' + pl.hotspots.length + '</span></button>';
    }).join('') + '</div>' : '';
    const plan = '<div class="plan" role="group" aria-label="Plano: ' + esc(P.name) + '">' +
      P.rooms.map(r => '<div class="room" style="left:' + r.x + '%;top:' + r.y + '%;width:' + r.w + '%;height:' + r.h + '%"><span>' + esc(r.name) + '</span></div>').join('') +
      P.hotspots.map(hs => {
        const e = evById(hs.ev);
        return '<button class="hotspot ' + (cs.examined[e.id] ? 'done ' : '') + (sel === e.id ? 'sel' : '') + '" style="left:' + hs.x + '%;top:' + hs.y + '%" data-act="scene-sel" data-id="' + e.id + '" title="' + esc(e.name) + '" aria-label="' + esc(e.name) + '">' + e.id.replace(/^[A-Z]+/, '') + '</button>';
      }).join('') + '</div>';
    let side;
    if (!sel) {
      side = '<article class="panel stack"><h3>Inspección ocular</h3><p class="muted">' + (in3d ? 'Pulsa un objeto de la escena (los que tienen un rombo encima no se han examinado) o elígelo en la lista.' : 'Selecciona un punto del plano para ver el elemento. Los puntos con anillo animado no se han examinado todavía.') + '</p>' +
        '<div class="sub">Elementos de esta zona</div><div class="stack" style="gap:4px">' + P.hotspots.map(h => evById(h.ev)).map(e => '<button class="linkish" style="text-align:left;text-decoration:none;color:' + (cs.examined[e.id] ? 'var(--muted)' : 'var(--text)') + '" data-act="scene-sel" data-id="' + e.id + '"><span class="mono" style="color:var(--accent)">' + e.id + '</span> ' + esc(e.name) + (cs.examined[e.id] ? ' ✓' : '') + '</button>').join('') + '</div></article>';
    } else {
      const e = evById(sel);
      const done = cs.examined[e.id];
      const onWall = cs.wall.cards.some(k => k.kind === 'evidence' && k.ref === e.id);
      side = '<article class="panel stack ev-card"><header><div><div class="ev-id">' + e.id + ' · ' + esc(e.room) + '</div><h3>' + esc(e.name) + '</h3></div><span class="badge">' + esc(e.type) + '</span></header>' +
        '<p>' + esc(done ? e.detail : e.public) + '</p>' +
        (done ? '<dl class="kv"><dt>Valor posible</dt><dd>' + esc(e.value) + '</dd><dt>Limitaciones</dt><dd>' + esc(e.limits) + '</dd></dl>' : '') +
        '<div class="row">' + (done ? '<button class="btn" data-act="examine" data-id="' + e.id + '">Volver a examinar</button>' : '<button class="btn primary" data-act="examine" data-id="' + e.id + '">Examinar</button>') +
        (done ? '<button class="btn" data-act="photo" data-id="' + e.id + '"' + (cs.photos[e.id] ? ' disabled' : '') + '>' + (cs.photos[e.id] ? 'Fotografiado ✓' : 'Fotografiar') + '</button>' : '') +
        (done && e.lab ? '<button class="btn" data-act="to-lab" data-id="' + e.id + '">Enviar a laboratorio</button>' : '') +
        (done && e.unlocks ? '<button class="btn" data-act="tab" data-tab="digital">Solicitar análisis digital</button>' : '') +
        (done ? '<button class="btn" data-act="wall-add-ev" data-id="' + e.id + '"' + (onWall ? ' disabled' : '') + '>' + (onWall ? 'En el muro ✓' : 'Añadir al muro') + '</button>' : '') +
        (done ? '<button class="btn" data-act="gen-question" data-id="' + e.id + '">Generar pregunta</button>' : '') +
        (in3d ? '<button class="btn" data-act="s3-inspect">' + (cs.lastView.inspect ? 'Dejar de inspeccionar' : 'Inspeccionar de cerca') + '</button>' : '') +
        '<button class="btn ghost" data-act="scene-sel" data-id="">Cerrar</button></div>' +
        (done ? forensicPanel(c, cs, e, in3d) : '') + '</article>';
    }
    const viewTabs = '<div class="row" role="group" aria-label="Tipo de vista" style="margin-bottom:10px">' +
      (can3d ? '<button class="btn small ' + (in3d ? 'primary' : 'ghost') + '" data-act="view3d" data-on="1">Vista 3D</button><button class="btn small ' + (in3d ? 'ghost' : 'primary') + '" data-act="view3d" data-on="0">Plano</button>' : '<span class="faint" style="font-size:.8rem">Tu navegador no permite 3D: se muestra el plano.</span>') + '</div>';
    const fp = !!cs.lastView.fp;
    const view3d = '<div class="scene3d' + (fp ? ' fp' : '') + '" id="scene3d" aria-label="Escena en 3D: ' + esc(P.name) + '"><div class="s3-tip" hidden></div><div class="s3-hint">' + (fp ? 'WASD o flechas para caminar · arrastra para mirar · toca un objeto' : 'Arrastra para girar · rueda o pellizca para acercar · toca un objeto') + '</div>' +
      (fp ? '<i class="s3-cross" aria-hidden="true"></i><div class="s3-pad" aria-label="Moverse"><button data-move="f" aria-label="Avanzar">▲</button><button data-move="l" aria-label="Girar a la izquierda">◀</button><button data-move="b" aria-label="Retroceder">▼</button><button data-move="r" aria-label="Girar a la derecha">▶</button></div>' : '') +
      '<div class="s3-tools"><button class="btn small' + (fp ? ' primary' : '') + '" data-act="s3-fp">' + (fp ? 'Salir de primera persona' : 'Recorrer en primera persona') + '</button>' + (fp ? '' : '<button class="btn small" data-act="s3-reset">Vista general</button>') + '</div></div>';
    return '<div class="scene-wrap"><div class="min0">' + viewTabs + planTabs + (in3d ? view3d : plan) +
      '<div class="legend"><span>◯ sin examinar</span><span>● examinado</span><span>' + esc(P.legend) + '</span></div></div>' + side + '</div>';
  }

  function forensicPanel(c, cs, e, in3d) {
    const used = tool => Object.keys(cs.forensic).filter(k => k.endsWith(':' + tool)).length;
    const results = C.forensicTools.filter(t => cs.forensic[e.id + ':' + t.id]);
    const fx = cs.lastView.fx && cs.lastView.fx.ev === e.id ? cs.lastView.fx : null;
    return '<div class="forensic"><div class="spread"><div class="sub">Herramientas forenses</div>' + (fx && in3d ? '<button class="linkish" data-act="fx-off">Volver a luz normal</button>' : '') + '</div><div class="tool-row">' +
      C.forensicTools.map(t => {
        const key = e.id + ':' + t.id;
        const left = t.kit ? t.kit - used(t.id) : null;
        const dis = cs.forensic[key] || (left !== null && left <= 0);
        return '<button class="tool tool-' + t.id + (fx && fx.tool === t.id ? ' on' : '') + '" data-act="forensic" data-id="' + e.id + '" data-tool="' + t.id + '"' + (dis ? ' disabled' : '') + ' title="' + esc(t.desc) + '"><b>' + esc(t.name) + '</b><small>' + (cs.forensic[key] ? 'Aplicado' : left === null ? 'Ilimitado' : left + ' en el kit') + '</small></button>';
      }).join('') + '</div>' +
      results.map(t => {
        const def = (e.forensic || {})[t.id];
        return def ? def.reveals.map(id => EN.known(cs, id) ? '<div class="result"><b>' + esc(t.name) + '.</b> ' + esc(c.facts[id].text.replace(/^[^:]+:\s*/, '')) + '</div>' : factOrPending(c, cs, id)).join('') : '<div class="result neutral"><b>' + esc(t.name) + '.</b> Sin hallazgos con esta técnica en este elemento.</div>';
      }).join('') + '</div>';
  }

  function evFacts(c, cs, e) {
    const ids = [].concat(e.reveals || []);
    Object.keys(e.forensic || {}).forEach(k => { if (cs.forensic[e.id + ':' + k] === 'pos') ids.push.apply(ids, e.forensic[k].reveals); });
    Object.keys(e.lab || {}).forEach(k => { if (cs.lab[e.id + ':' + k]) ids.push.apply(ids, e.lab[k].reveals); });
    return ids.filter(id => EN.known(cs, id)).map(id => c.facts[id]);
  }

  function tabEvidencias(c, cs) {
    const show = cs.lastView.evFilter || 'all';
    const list = c.evidence.filter(e => show === 'all' || (show === 'done' ? cs.examined[e.id] : !cs.examined[e.id]));
    return '<div class="stack"><div class="spread"><div class="row" role="group" aria-label="Filtrar evidencias">' +
      [['all', 'Todas'], ['done', 'Examinadas'], ['todo', 'Sin examinar']].map(([id, l]) => '<button class="btn small ' + (show === id ? 'primary' : 'ghost') + '" data-act="ev-filter" data-id="' + id + '">' + l + '</button>').join('') +
      '</div><span class="badge">' + Object.keys(cs.examined).length + '/' + c.evidence.length + ' examinadas</span></div>' +
      '<div class="grid">' + list.map(e => {
        const done = cs.examined[e.id];
        const facts = done ? evFacts(c, cs, e) : [];
        return '<article class="panel ev-card ' + (done ? '' : 'locked') + '"><header><div><div class="ev-id">' + e.id + ' · ' + esc(e.room) + '</div><h3>' + esc(e.name) + '</h3></div><span class="badge">' + esc(e.type) + '</span></header>' +
          '<p style="font-size:.9rem">' + esc(done ? e.detail : e.public) + '</p>' +
          (done ? '<dl class="kv"><dt>Valor</dt><dd>' + esc(e.value) + '</dd><dt>Límites</dt><dd>' + esc(e.limits) + '</dd></dl>' : '') +
          (facts.length ? '<div class="sub">Información incorporada</div>' + facts.map(f => '<div class="result neutral" style="font-size:.86rem">' + esc(f.text) + '</div>').join('') : '') +
          '<div class="row">' + (done ? '<button class="btn small ghost" data-act="examine" data-id="' + e.id + '">Volver a examinar</button>' + (e.lab ? '<button class="btn small" data-act="to-lab" data-id="' + e.id + '">Laboratorio</button>' : '') : '<button class="btn small primary" data-act="examine" data-id="' + e.id + '">Examinar</button>') + '</div></article>';
      }).join('') + '</div></div>';
  }

  function tabLab(c, cs) {
    const s = S();
    const focus = cs.lastView.labFocus;
    const avail = c.evidence.filter(e => e.lab && cs.examined[e.id]);
    const pending = c.evidence.filter(e => e.lab && !cs.examined[e.id]).length;
    return '<div class="stack">' + periciaSection(c, cs) + benchSection(c, cs) + '<div class="spread"><p class="muted" style="max-width:62ch">Decide qué análisis solicitar. Cada análisis tiene un coste para el presupuesto de la unidad. Los resultados respetan los límites de cada técnica.</p><span class="chip keep"><em>Fondos</em>' + money(s.money) + '</span></div>' +
      (avail.length ? '<div class="grid">' + avail.map(e => '<article class="panel stack" ' + (focus === e.id ? 'style="border-color:var(--accent)"' : '') + ' id="lab-' + e.id + '"><div><div class="ev-id">' + e.id + '</div><h3>' + esc(e.name) + '</h3></div>' +
        Object.keys(e.lab).map(k => {
          const a = e.lab[k];
          const key = e.id + ':' + k;
          const done = cs.lab[key];
          const label = a.label || c.labKinds[k];
          return '<div class="lab-row"><span>' + esc(label) + '</span>' + (done ? '<span class="badge ok">Completado</span>' : '<button class="btn small" data-act="lab" data-id="' + e.id + '" data-kind="' + k + '"' + (s.money < EN.costOf('lab', a.cost) ? ' disabled title="Fondos insuficientes"' : '') + '>Solicitar <span class="cost">' + EN.costOf('lab', a.cost) + ' €</span></button>') + '</div>' +
            (done ? a.reveals.map(id => factOrPending(c, cs, id)).join('') : '');
        }).join('') + '</article>').join('') + '</div>' : '<div class="panel"><p class="muted">Todavía no has examinado ningún elemento que admita análisis. Empieza por la escena.</p></div>') +
      (pending ? '<p class="faint" style="font-size:.82rem">Hay elementos de la escena sin examinar que podrían admitir análisis.</p>' : '') +
      (s.money < 120 ? '<div class="result neutral">Fondos bajos. Puedes conseguir presupuesto con «Trabajo administrativo» en el centro de investigación.</div>' : '') + '</div>';
  }

  /* Pericias jugables pendientes y resueltas. */
  function periciaSection(c, cs) {
    const ids = Object.keys(cs.pericias || {}).filter(id => c.facts[id] && c.facts[id].pericia);
    if (!ids.length) return '';
    const sel = cs.lastView.pericia && ids.includes(cs.lastView.pericia) ? cs.lastView.pericia : null;
    return '<article class="panel stack"><div class="panel-head"><h3>Pericias</h3><span class="badge">' + ids.length + '</span></div><div class="latent-items">' +
      ids.map(id => { const st = cs.pericias[id], P = c.facts[id].pericia; return '<button class="latent-item" data-act="per-open" data-id="' + id + '" aria-pressed="' + (sel === id) + '"><span>' + esc(E0.pericias.NAMES[P.type]) + ' · ' + esc(P.label || sourceOfFact(c, id)) + '</span>' + (st.status === 'pendiente' ? '<span class="badge warn">Pendiente</span>' : '<span class="badge ok">Concluida</span>') + '</button>'; }).join('') + '</div>' +
      (sel ? E0.pericias.html(c, cs, sel) + '<div class="row">' + (cs.pericias[sel].status === 'pendiente' ? '<button class="btn small ghost" data-act="per-auto" data-id="' + sel + '">Pericia automática <span class="cost">' + EN.costOf('lab', 150) + ' €</span></button>' : '') + '<button class="btn small ghost" data-act="per-close">Cerrar</button></div>' : '') + '</article>';
  }

  /* Resultado de un análisis, o aviso de huellas pendientes de cotejo. */
  function factOrPending(c, cs, id) {
    if (!EN.known(cs, id) && c.facts[id].pericia) return '<div class="result neutral"><b>Muestra preparada.</b> El resultado se conoce al hacer la pericia. <button class="linkish" data-act="per-open" data-id="' + id + '">Ir a la pericia</button></div>';
    if (EN.known(cs, id) || !EN.printsOf(c, id).length) return '<div class="result">' + esc(c.facts[id].text) + '</div>';
    const n = EN.printsOf(c, id).length;
    return '<div class="result neutral"><b>' + n + ' huella' + (n > 1 ? 's latentes recogidas' : ' latente recogida') + '.</b> El resultado se conoce al cotejarlas. <button class="linkish" data-act="bench-open" data-fid="' + id + '" data-i="0">Ir al banco de cotejo</button></div>';
  }

  /* Banco de lofoscopia: lista de latentes y comparación punto a punto. */
  function benchSection(c, cs) {
    const groups = Object.keys(cs.latents || {});
    if (!groups.length) return '';
    const PR = E0.prints;
    const people = EN.cardPeople(c);
    const nameOf = id => (people.find(p => p.id === id) || {}).name || id;
    const list = groups.map(fid => {
      const g = cs.latents[fid];
      const P = EN.printsOf(c, fid);
      const pend = P.filter((_, i) => g.items[i].status === 'pendiente').length;
      return '<div class="latent-group"><div class="spread"><b>' + esc(sourceOfFact(c, fid)) + '</b>' + (pend ? '<button class="btn small ghost" data-act="bench-auto" data-fid="' + fid + '">Cotejo automático <span class="cost">' + EN.costOf('lab', 150) + ' €</span></button>' : '<span class="badge ok">Cotejo completo</span>') + '</div>' +
        '<div class="latent-items">' + P.map((p, i) => {
          const it = g.items[i];
          const st = it.status === 'identificada' ? '<span class="badge ok">' + esc(nameOf(it.match)) + '</span>' : it.status === 'no_apta' ? '<span class="badge">No apta</span>' : '<span class="badge warn">Pendiente</span>';
          const on = cs.lastView.bench && cs.lastView.bench.fid === fid && cs.lastView.bench.i === i;
          return '<button class="latent-item" data-act="bench-open" data-fid="' + fid + '" data-i="' + i + '" aria-pressed="' + !!on + '"><span>' + esc(p.at || 'Latente ' + (i + 1)) + '</span>' + st + '</button>';
        }).join('') + '</div></div>';
    }).join('');
    const b = cs.lastView.bench;
    let bench = '';
    if (b && cs.latents[b.fid]) {
      const L = PR.latent(c, b.fid, b.i);
      const it = cs.latents[b.fid].items[b.i];
      const key = b.cand !== null && b.fi !== null ? b.cand + '#' + b.fi : null;
      const hits = key ? it.pairs.filter(p => p.ok && p.key === key).length : 0;
      const bad = key ? (it.bad[key] || 0) : 0;
      const closed = it.status !== 'pendiente';
      const fichero = '<div class="bench-file"><div class="sub">Fichero decadactilar</div><div class="cand-list">' + people.map(p => '<button class="cand" data-act="bench-cand" data-id="' + p.id + '" aria-pressed="' + (b.cand === p.id) + '">' + esc(p.name) + '</button>').join('') + '</div>' +
        (b.cand !== null ? '<div class="tenprint">' + PR.FINGERS.map((f, i) => {
          const k = b.cand + '#' + i, out = (it.bad[k] || 0) >= PR.MAX_BAD;
          return '<button class="finger' + (out ? ' out' : '') + '" data-act="bench-finger" data-i="' + i + '" aria-pressed="' + (b.fi === i) + '" title="' + esc(f) + '"><canvas width="72" height="72" data-thumb="' + b.cand + '|' + i + '"></canvas><small>' + (i + 1) + ' · ' + esc(PR.TYPES[PR.finger(b.cand, i).type].replace('Presilla ', 'P. ')) + '</small></button>';
        }).join('') + '</div>' : '<p class="muted" style="font-size:.86rem">Elige una ficha. Empieza por el tipo de dibujo: descarta los dedos que no coinciden.</p>') + '</div>';
      if (it.status === 'pendiente' && it.revealed === false) {
        const lv = cs.lastView.labBench || { powder: 'negro', light: false };
        const ev = c.evidence.find(x => x.lab && Object.values(x.lab).some(a => a.reveals.includes(b.fid)));
        const surf = E0.lab3d && ev ? E0.lab3d.surfaceFor(ev).name : 'la superficie';
        const has3d = E0.lab3d && E0.lab3d.available();
        bench = '<div class="labbench"><div class="sub">Mesa de revelado · ' + esc(L.label) + ' · superficie de ' + esc(surf) + '</div>' +
          (has3d ? '<div class="lab3d" id="lab3d" aria-label="Mesa de revelado en 3D"><div class="s3-hint">Arrastra la brocha sobre la superficie · fuera de ella, gira la vista</div></div>' : '<p class="muted">Tu navegador no permite 3D: el revelado se hace automáticamente.</p>') +
          '<div class="lab-tools"><div class="row"><span class="eyebrow">Polvo</span><button class="btn small" data-act="lab-powder" data-id="negro" aria-pressed="' + (lv.powder === 'negro') + '">Negro</button><button class="btn small" data-act="lab-powder" data-id="aluminio" aria-pressed="' + (lv.powder === 'aluminio') + '">Aluminio</button></div>' +
          '<div class="row"><button class="btn small" data-act="lab-light" aria-pressed="' + !!lv.light + '">' + (lv.light ? 'Apagar luz rasante' : 'Encender luz rasante') + '</button><button class="btn small ghost" data-act="lab-clean">Limpiar</button><button class="btn small primary" data-act="lab-lift">Levantar con cinta</button></div>' +
          (has3d ? '<div class="bench-stats"><span>Huella revelada <b class="mono" id="lab-cov">0 %</b></span><span>Exceso de polvo <b class="mono" id="lab-smear">0 %</b></span></div>' : '') + '</div>' +
          '<p class="muted" style="font-size:.86rem">La huella es invisible. Enciende la luz rasante para ver dónde brillan los residuos. Elige el polvo que contraste con la superficie: negro sobre superficies claras y aluminio sobre las oscuras. Pasa la brocha sin insistir demasiado: el exceso empasta las crestas. Con la huella revelada, levántala con cinta.</p>' +
          '<div class="row"><button class="btn small ghost" data-act="bench-close">Cerrar el banco</button></div></div>';
      } else
      bench = '<div class="bench">' + fichero +
        '<div class="bench-col"><div class="sub">Latente · ' + esc(L.label) + '</div><canvas class="print-cv" width="256" height="256" data-act="bench-latent" aria-label="Huella latente"></canvas>' +
        '<div class="bench-stats"><span>Dibujo: <b>' + (L.apta ? esc(PR.TYPES[L.F.type]) : 'no determinable') + '</b></span>' +
        (key ? '<span>Coincidentes <b class="mono">' + hits + '/' + PR.NEED + '</b></span><span>Discrepancias <b class="mono">' + bad + '/' + PR.MAX_BAD + '</b></span>' : '') + '</div>' +
        '<div class="row"><button class="btn small ghost" data-act="bench-hl" aria-pressed="' + !!b.hl + '">' + (b.hl ? 'Ocultar ayuda' : 'Resaltar puntos') + '</button>' + (closed ? '' : '<button class="btn small ghost" data-act="bench-noapta">Declarar no apta</button>') + '</div></div>' +
        '<div class="bench-col">' + (key ? '<div class="sub">Ficha · ' + esc(nameOf(b.cand)) + ' · ' + esc(PR.FINGERS[b.fi]) + '</div><canvas class="print-cv" width="256" height="256" data-act="bench-card" aria-label="Huella de la ficha"></canvas>' : '<div class="sub">Ficha</div><div class="print-empty">Elige una persona y un dedo del fichero para compararlo con la latente.</div>') + '</div>' +
        '<div class="bench-help">' + (closed ? '<b>' + (it.status === 'identificada' ? 'Identificada: ' + esc(nameOf(it.match)) + '.' : 'Declarada no apta.') + '</b> ' + (EN.known(cs, b.fid) ? 'El resultado ya está en el expediente.' : 'Quedan otras latentes de este elemento por cotejar.') :
          'Toca un punto característico de la latente (un final de cresta o una bifurcación) y después el mismo punto en la huella de la ficha. Con ' + PR.NEED + ' puntos coincidentes hay identificación. Tres discrepancias descartan ese dedo. Si la latente no tiene puntos suficientes, declárala no apta.') +
        '</div><div class="row"><button class="btn small ghost" data-act="bench-close">Cerrar el banco</button></div></div>';
    }
    return '<article class="panel stack"><div class="panel-head"><h3>Lofoscopia · cotejo de huellas</h3><span class="badge">' + groups.length + ' elemento(s)</span></div>' + list + bench + '</article>';
  }
  function sourceOfFact(c, fid) {
    const e = c.evidence.find(x => (x.lab && Object.values(x.lab).some(a => a.reveals.includes(fid))) || (x.forensic && Object.values(x.forensic).some(f => f.reveals.includes(fid))));
    return e ? e.id + ' · ' + e.name : fid;
  }

  function tabDigital(c, cs) {
    const s = S();
    const jud = c.judicial;
    const jmax = EN.judicialMax(c);
    const left = jmax - cs.judicial.length;
    return '<div class="stack-lg"><div class="spread"><p class="muted" style="max-width:62ch">Solicita registros digitales y compáralos después con las declaraciones y la cronología.</p><span class="chip keep"><em>Fondos</em>' + money(s.money) + '</span></div>' +
      deviceView(c, cs) + (cs.lastView.video && (cs.videos || {})[cs.lastView.video] ? E0.video.html(c, cs, c.digital.find(x => x.id === cs.lastView.video)) : '') +
      '<div class="grid">' + c.digital.map(d => {
        const done = cs.digital[d.id];
        const reqOk = (!d.requires || cs.examined[d.requires]) && (!d.requiresDigital || cs.digital[d.requiresDigital]);
        const reqName = d.requires && !cs.examined[d.requires] ? 'examinar ' + c.evidence.find(e => e.id === d.requires).name : d.requiresDigital ? 'obtener «' + c.digital.find(x => x.id === d.requiresDigital).name + '»' : '';
        const facts = done ? d.reveals.filter(id => EN.known(cs, id)).map(id => c.facts[id]) : [];
        return '<article class="panel stack"><div class="spread"><h3>' + esc(d.name) + '</h3>' + (done ? '<span class="badge ok">Recibido</span>' : '<span class="badge">' + EN.costOf('digital', d.cost) + ' €</span>') + '</div><p class="muted" style="font-size:.88rem">' + esc(d.desc) + '</p>' +
          (done && d.video && (cs.videos || {})[d.id] ? '<div class="row"><button class="btn small' + (cs.videos[d.id].status === 'pendiente' ? ' primary' : '') + '" data-act="vid-open" data-id="' + d.id + '">' + (cs.videos[d.id].status === 'pendiente' ? 'Analizar el vídeo' : 'Ver el vídeo') + '</button></div>' : '') +
          (done ? (isDevice(d) ? '<div class="row"><button class="btn small" data-act="device-open" data-id="' + d.id + '">' + (deviceKind(d) === 'pc' ? 'Abrir el ordenador' : 'Abrir el dispositivo') + '</button></div>' : '') + '<div>' + facts.map(f => factRow(c, f)).join('') + '</div>' :
            (reqOk ? '<div class="row"><button class="btn" data-act="digital" data-id="' + d.id + '"' + (s.money < EN.costOf('digital', d.cost) ? ' disabled title="Fondos insuficientes"' : '') + '>Solicitar <span class="cost">' + EN.costOf('digital', d.cost) + ' €</span></button></div>' : '<p class="faint" style="font-size:.84rem">Requiere antes: ' + esc(reqName) + '.</p>')) + '</article>';
      }).join('') + '</div>' +
      '<article class="panel stack"><div class="spread"><h3>Solicitud judicial de antenas</h3><span class="badge ' + (left ? 'acc' : '') + '">' + left + '/' + jmax + ' disponibles</span></div><p class="muted" style="font-size:.88rem">' + esc(jud.desc) + '</p>' +
      (left ? '<div class="row" style="flex-wrap:nowrap"><select id="jud-person" aria-label="Persona">' + EN.judicialTargets(c).filter(p => !cs.judicial.includes(p.id)).map(p => '<option value="' + p.id + '">' + esc(p.name) + '</option>').join('') + '</select><button class="btn" data-act="judicial">Solicitar</button></div>' : '') +
      cs.judicial.map(pid => jud.results[pid].map(id => factRow(c, c.facts[id])).join('')).join('') + '</article></div>';
  }

  /* ---------- Visor de dispositivos extraídos ---------- */
  const isDevice = d => /tel[eé]fono|m[oó]vil|tablet|port[aá]til|ordenador|dispositivo/i.test(d.name);
  const deviceKind = d => /port[aá]til|ordenador/i.test(d.name) ? 'pc' : 'phone';
  const APPS = [
    { id: 'llamadas', name: 'Llamadas', icon: '📞', test: f => f.source === 'llamada' || (f.tags || []).includes('llamada') },
    { id: 'mensajes', name: 'Mensajes', icon: '💬', test: f => ['mensaje', 'correo'].some(t => (f.tags || []).includes(t)) || f.source === 'mensaje' },
    { id: 'ubicacion', name: 'Ubicación', icon: '📍', test: f => f.source === 'antena' || (f.tags || []).includes('ubicacion') || (f.tags || []).includes('gps') },
    { id: 'archivos', name: 'Archivos', icon: '🗂', test: f => f.source === 'documento' || (f.tags || []).includes('documento') },
    { id: 'registro', name: 'Registro', icon: '⚙', test: () => true }
  ];
  function deviceApps(c, cs, d) {
    const facts = d.reveals.filter(id => EN.known(cs, id)).map(id => Object.assign({ id }, c.facts[id]));
    const used = new Set();
    return APPS.map(a => { const items = facts.filter(f => !used.has(f.id) && a.test(f)); items.forEach(f => used.add(f.id)); return Object.assign({ items }, a); }).filter(a => a.items.length);
  }
  function deviceView(c, cs) {
    const dv = cs.lastView.device;
    const d = dv && c.digital.find(x => x.id === dv.id);
    if (!d || !cs.digital[d.id]) return '';
    const apps = deviceApps(c, cs, d);
    const app = apps.find(a => a.id === dv.app);
    const dir = f => /entrante|recibe|de [A-ZÁÉÍÓÚ]/.test(f.text) ? 'in' : /saliente|envía|a [A-ZÁÉÍÓÚ]/.test(f.text) ? 'out' : '';
    const item = f => {
      const t = esc(f.time ? f.time + (f.end ? '–' + f.end : '') : '');
      const tools = '<div class="dev-tools"><button class="linkish" data-act="wall-add-fact" data-id="' + f.id + '">Al muro</button></div>';
      if (app.id === 'mensajes') return '<div class="dev-msg ' + dir(f) + '"><div class="bubble">' + esc(f.text) + '</div><time>' + t + '</time>' + tools + '</div>';
      if (app.id === 'llamadas') return '<div class="dev-row"><span class="dev-ico ' + dir(f) + '">' + (dir(f) === 'in' ? '↙' : dir(f) === 'out' ? '↗' : '•') + '</span><div class="min0"><div>' + esc(f.text) + '</div><time>' + t + '</time>' + tools + '</div></div>';
      return '<div class="dev-row"><span class="dev-ico">' + app.icon + '</span><div class="min0"><div>' + esc(f.text) + '</div><time>' + t + '</time>' + tools + '</div></div>';
    };
    const screen = app ? '<div class="dev-bar"><button class="linkish" data-act="device-app" data-app="">‹ Inicio</button><b>' + esc(app.name) + '</b><span>' + app.items.length + '</span></div><div class="dev-list">' + app.items.map(item).join('') + '</div>' :
      '<div class="dev-home">' + apps.map(a => '<button class="dev-app" data-act="device-app" data-app="' + a.id + '"><span>' + a.icon + '</span><small>' + esc(a.name) + '</small><em>' + a.items.length + '</em></button>').join('') + '</div>';
    const pc = deviceKind(d) === 'pc';
    return '<article class="panel stack"><div class="panel-head"><h3>' + esc(d.name) + '</h3><button class="btn small ghost" data-act="device-close">Cerrar</button></div>' +
      '<div class="dev-wrap"><div class="' + (pc ? 'dev-pc' : 'dev-phone') + '"><div class="dev-status"><span>EXTRACCIÓN FORENSE</span><span>' + esc(c.id) + '</span></div><div class="dev-screen">' + screen + '</div></div>' +
      '<p class="muted" style="font-size:.86rem;max-width:42ch">Copia forense del dispositivo. Todo lo que ves aquí ya está en el expediente; ordénalo por aplicaciones, llévalo al muro y contrástalo en el comparador.</p></div></article>';
  }

  /* ---------- Reproducción temporal en el mapa ----------
     Une cada hecho con persona, lugar y hora. Los registros (cámaras, antenas, pagos…)
     se pintan llenos; lo que la persona declara, con borde discontinuo. */
  function mapTracks(c, cs) {
    const ids = new Set([c.victim.id].concat(c.people.map(p => p.id)));
    const out = {};
    EN.knownFacts(c, cs, f => f.person && ids.has(f.person) && f.place && c.places[f.place] && !c.places[f.place].offmap && f.time).forEach(f => {
      const t0 = EN.minutes(f.time), t1 = f.end ? EN.minutes(f.end) : t0;
      (out[f.person] = out[f.person] || []).push({ id: f.id, t0, t1: Math.max(t0, t1), place: f.place, st: f.kind === 'statement', text: f.text, time: f.time });
    });
    return out;
  }
  function mapPlayback(c, cs) {
    const tracks = mapTracks(c, cs);
    const pids = Object.keys(tracks);
    if (!pids.length) return '';
    let lo = Infinity, hi = -Infinity;
    pids.forEach(p => tracks[p].forEach(e => { lo = Math.min(lo, e.t0); hi = Math.max(hi, e.t1); }));
    hi = Math.max(hi, lo + 30);
    const t = cs.lastView.mapT != null ? Math.min(hi, Math.max(lo, cs.lastView.mapT)) : lo;
    const name = id => id === c.victim.id ? c.victim.name : c.people.find(p => p.id === id).name;
    return '<article class="panel stack" id="map-play" data-lo="' + lo + '" data-hi="' + hi + '"><div class="panel-head"><h3>Reproducción temporal</h3><span class="badge mono" id="map-clock">' + EN.fmt(t) + '</span></div>' +
      '<div class="row" style="flex-wrap:nowrap"><button class="btn small" data-act="map-play" id="map-play-btn">▶ Reproducir</button><input type="range" id="map-time" data-act="map-time" min="' + lo + '" max="' + hi + '" step="1" value="' + t + '" aria-label="Hora" style="flex:1"></div>' +
      '<div class="legend"><span><i class="lg-rec"></i>Registro (cámara, antena, pago…)</span><span><i class="lg-st"></i>Lo que declara</span><span><i class="lg-gap"></i>No coinciden a esa hora</span></div>' +
      '<div class="map-people">' + pids.map(p => '<label class="check"><input type="checkbox" data-act="map-person" value="' + p + '"' + ((cs.lastView.mapHide || []).includes(p) ? '' : ' checked') + '>' + esc(name(p)) + '</label>').join('') + '</div>' +
      '<div class="map-now" id="map-now"></div></article>';
  }

  function tabPersonas(c, cs) {
    const sel = cs.lastView.person || null;
    const grid = '<div class="people">' + c.people.map(p => {
      const n = cs.asked[p.id] ? Object.keys(cs.asked[p.id]).length : 0;
      return '<button class="person" data-act="person" data-id="' + p.id + '" aria-pressed="' + (sel === p.id) + '">' + portrait(p, 52) + '<div class="min0"><b>' + esc(p.name) + '</b><small>' + esc(p.role) + '</small><div class="faint mono" style="font-size:.7rem">' + (n ? n + ' pregunta(s)' : 'Sin entrevistar') + '</div></div></button>';
    }).join('') + '</div>';
    if (!sel) return '<div class="stack">' + grid + '<p class="muted">Elige a quién interrogar. Las personas pueden decir la verdad, medias verdades, mentir, no saber o estar equivocadas. Ninguna lo anunciará.</p></div>';
    const p = c.people.find(x => x.id === sel);
    const asked = cs.asked[p.id] || {};
    const avail = p.questions.filter(q => !asked[q.id] && (!q.requires || q.requires.some(id => EN.known(cs, id))));
    const tr = cs.transcripts[p.id] || [];
    const last = tr[tr.length - 1];
    const room = use3d() && E0.room3d ? '<div class="room3d" id="room3d" data-person="' + p.id + '" aria-label="Sala de interrogatorio con ' + esc(p.name) + '">' +
      '<div class="room-bubble" aria-live="polite">' + (last ? '<div class="room-bubble-q">' + (last.kind === 'c' ? 'Confrontación · ' : '') + esc(last.q) + '</div><div class="room-bubble-a">' + esc(last.a) + '</div>' : '<div class="room-bubble-q">Sala 2 · grabación en curso</div><div class="room-bubble-a muted">' + esc(p.name.split(' ')[0]) + ' espera tu primera pregunta.</div>') + '</div>' +
      '<div class="room-tools">' + (last && 'speechSynthesis' in window ? '<button class="btn small" data-act="speak" data-person="' + p.id + '">Escuchar</button>' : '') + '<button class="btn small ghost" data-act="view3d" data-on="0">Solo texto</button></div>' +
      '<div class="s3-hint">Arrastra para mirar · rueda para acercar</div></div>' : '';
    const roomOff = !use3d() && E0.scene3d && E0.scene3d.available() ? '<div class="row"><button class="btn small ghost" data-act="view3d" data-on="1">Ver la sala en 3D</button></div>' : '';
    return '<div class="stack-lg">' + grid + room + roomOff +
      '<div class="interview"><article class="panel stack"><div class="row" style="flex-wrap:nowrap">' + portrait(p, 84) + '<div class="min0"><h3>' + esc(p.name) + ', ' + p.age + ' años</h3><div class="muted" style="font-size:.88rem">' + esc(p.role) + ' · ' + esc(p.relation) + '</div></div></div>' +
      '<div class="spread"><span class="eyebrow">Estado de la entrevista</span><span class="badge">' + Object.keys(asked).length + ' preguntas · ' + (cs.confronted[p.id] ? Object.keys(cs.confronted[p.id]).length : 0) + ' confrontaciones</span></div>' +
      tensionMeter(cs, p) +
      (cs.lawyer[p.id] === 'pide' ? '<div class="result warn-note"><b>Ha pedido un abogado.</b> La entrevista queda suspendida. Puedes volver a citarle con su abogado presente: la presión le afectará la mitad.</div><div class="row"><button class="btn" data-act="recite" data-person="' + p.id + '">Volver a citar <span class="cost">−15 energía</span></button></div></article>' :
      '<div class="sub">Nueva pregunta</div>' + (avail.length ? '<div class="q-list">' + avail.map(q => '<button class="q-btn" data-act="ask" data-person="' + p.id + '" data-q="' + q.id + '">' + esc(q.q) + '</button>').join('') + '</div>' : '<p class="muted" style="font-size:.88rem">No quedan preguntas nuevas con la información actual. Confrontarle con datos puede abrir otras líneas.</p>') +
      '<div class="sub">Confrontar con información del expediente</div><select id="confront-fact" aria-label="Hecho para confrontar">' + factOptions(c, cs) + '</select>' +
      '<div class="row"><button class="btn" data-act="confront" data-person="' + p.id + '">Confrontar</button></div></article>') +
      '<article class="panel stack"><div class="panel-head"><h3>Transcripción</h3><span class="badge">' + tr.length + ' intervenciones</span></div>' +
      (tr.length ? '<div class="transcript" id="transcript">' + tr.map((t, i) => '<div><div class="turn-q">' + (t.kind === 'c' ? 'CONFRONTACIÓN · ' : t.kind === 'r' ? 'REPASO · ' : t.kind === 'l' ? 'ACTA · ' : '') + esc(t.q) + '</div><div class="turn-a ' + (t.kind === 'c' || t.kind === 'l' ? 'conf' : '') + '">' + esc(t.a) + '</div>' +
        (t.kind === 'l' ? '' : '<div class="turn-tools"><button class="linkish" data-act="recall" data-person="' + p.id + '" data-i="' + i + '">Volver sobre esta respuesta</button></div>') + '</div>').join('') + '</div>' : '<p class="muted">Aún no has hablado con ' + esc(p.name.split(' ')[0]) + '.</p>') +
      '</article></div></div>';
  }

  /* Tensión de la persona entrevistada (0–100). Refleja su carácter y la presión, no su culpa. */
  function tensionMeter(cs, p) {
    const t = cs.tension[p.id] || 0;
    const lab = t < 25 ? 'Tranquila' : t < 50 ? 'Incómoda' : t < 75 ? 'Tensa' : 'Al límite';
    return '<div class="tension"><span class="eyebrow">Tensión</span><div class="tension-bar"><i style="width:' + t + '%;background:' + (t < 50 ? 'var(--green)' : t < 75 ? 'var(--amber)' : 'var(--red)') + '"></i></div><span class="mono">' + lab + '</span>' + (cs.lawyer[p.id] === 'presente' ? '<span class="badge">Con abogado</span>' : '') + '</div>';
  }

  function tabComparador(c, cs) {
    const res = cs.lastView.compare;
    const found = Object.keys(cs.conflicts).sort((a, b) => cs.conflicts[a] - cs.conflicts[b]).map(id => c.conflicts.find(k => k.id === id));
    let resHtml = '';
    if (res) {
      const fa = c.facts[res.a], fb = c.facts[res.b];
      resHtml = '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))"><div class="panel tight"><div class="sub">Fuente A · ' + esc(fa.source) + '</div>' + esc(fa.text) + '</div><div class="panel tight"><div class="sub">Fuente B · ' + esc(fb.source) + '</div>' + esc(fb.text) + '</div></div>' +
        (res.conflict ? (() => { const k = c.conflicts.find(x => x.id === res.conflict); return '<div class="result"><b>Diferencia objetiva: ' + esc(k.type) + '.</b> ' + esc(k.desc) + '</div>'; })() : '<div class="result neutral">No se aprecian diferencias objetivas entre ambas fuentes.</div>');
    }
    return '<div class="stack-lg"><article class="panel stack"><h3>Comparador de declaraciones y fuentes</h3><p class="muted" style="font-size:.88rem">Elige dos elementos del expediente: dos declaraciones, o una declaración y un registro objetivo. El comparador solo señala diferencias objetivas (hora, lugar, secuencia, hecho omitido o añadido). No dice quién miente.</p>' +
      '<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr))"><label class="field">Fuente A<select id="cmp-a">' + factOptions(c, cs, { selected: res && res.a }) + '</select></label><label class="field">Fuente B<select id="cmp-b">' + factOptions(c, cs, { selected: res && res.b }) + '</select></label></div>' +
      '<div class="row"><button class="btn primary" data-act="compare">Comparar</button></div>' + resHtml + '</article>' +
      '<article class="panel stack"><div class="panel-head"><h3>Registro de contradicciones</h3><span class="badge">' + found.length + '</span></div>' +
      (found.length ? found.map(k => '<div class="note"><div class="spread"><span class="row"><span class="badge ' + (k.severity === 'alta' ? 'crit' : k.severity === 'media' ? 'warn' : '') + '">' + esc(k.type) + ' · ' + esc(k.severity) + '</span></span>' +
        '<label class="check" style="font-size:.8rem"><input type="checkbox" data-act="conflict-resolve" data-id="' + k.id + '"' + ((cs.resolved || {})[k.id] ? ' checked' : '') + '>Resuelta</label></div><p>' + esc(k.desc) + '</p><span class="faint mono" style="font-size:.7rem">Origen: ' + esc(c.facts[k.a].source) + ' ↔ ' + esc(c.facts[k.b].source) + '</span></div>').join('') : '<p class="muted">Todavía no has registrado contradicciones.</p>') +
      '</article></div>';
  }

  function tabCronologia(c, cs) {
    const pool = EN.knownFacts(c, cs, f => f.time && !cs.timeline.some(e => e.factId === f.id));
    const items = cs.timeline.filter(e => e.time).map(e => Object.assign({}, e, { a: EN.minutes(e.time), b: e.end ? EN.minutes(e.end) : EN.minutes(e.time) })).sort((x, y) => x.a - y.a);
    let visual = '<p class="muted">Añade eventos para construir la línea temporal.</p>';
    if (items.length) {
      const minT = Math.floor(Math.min.apply(null, items.map(i => i.a)) / 60) * 60;
      const maxT = Math.ceil(Math.max.apply(null, items.map(i => i.b)) / 60) * 60 + (items.some(i => i.b % 60 === 0) ? 0 : 0);
      const span = Math.max(60, maxT - minT);
      const lanes = [];
      items.forEach(i => { const k = i.person || '_'; if (!lanes.includes(k)) lanes.push(k); });
      const pos = m => ((m - minT) / span * 100).toFixed(2);
      const ticks = [];
      for (let t = minT; t <= minT + span; t += 60) ticks.push(t);
      visual = '<div class="tl-scroll"><div class="tl"><div class="tl-axis">' + ticks.map(t => '<div class="tl-tick" style="left:' + pos(t) + '%"><span>' + EN.fmt(t) + '</span></div>').join('') + '</div>' +
        lanes.map(l => '<div class="tl-lane"><label>' + esc(l === '_' ? 'Sin persona' : EN.personName(c, l)) + '</label>' +
          items.filter(i => (i.person || '_') === l).map(i => {
            const point = i.a === i.b;
            const cls = (i.kind === 'statement' ? 'statement' : i.custom ? 'custom' : '') + (point ? ' point' : '');
            return '<span class="tl-mark ' + cls + '" style="left:' + pos(i.a) + '%;' + (point ? '' : 'width:' + Math.max(0.8, (i.b - i.a) / span * 100).toFixed(2) + '%') + '" title="' + esc(i.time + (i.end ? '–' + i.end : '') + ' · ' + i.text) + '"></span>';
          }).join('') + '</div>').join('') + '</div></div>' +
        '<div class="legend"><span style="color:var(--accent)">■ registro objetivo</span><span style="color:var(--amber)">■ declaración</span><span>■ evento propio</span><span>Desliza horizontalmente si no cabe.</span></div>';
    }
    const cmp = cs.lastView.tlCompare;
    return '<div class="stack-lg"><article class="panel stack"><div class="panel-head"><h3>Línea temporal</h3><div class="row"><span class="badge">' + cs.timeline.length + ' eventos</span><button class="btn small primary" data-act="tl-compare">Comparar cronologías</button></div></div>' + visual +
      (cmp ? '<div class="stack" style="gap:8px"><div class="sub">Resultado de la comparación</div>' + (cmp.length ? cmp.map(r => '<div class="result">' + esc(r) + '</div>').join('') : '<div class="result neutral">No se detectan solapamientos ni diferencias objetivas entre los eventos de tu cronología.</div>') + '</div>' : '') + '</article>' +
      '<div class="grid"><article class="panel stack"><h3>Añadir desde el expediente</h3>' +
      (pool.length ? '<select id="tl-fact" aria-label="Hecho con hora">' + '<option value="">Elige un hecho con hora…</option>' + pool.map(f => '<option value="' + f.id + '">' + esc(factLabel(c, f.id)) + '</option>').join('') + '</select><div class="row"><button class="btn" data-act="tl-add-fact">Añadir a la cronología</button></div>' : '<p class="muted" style="font-size:.88rem">No hay hechos con hora pendientes de añadir.</p>') + '</article>' +
      '<form class="panel stack" data-form="tl-custom"><h3>Evento propio</h3><div class="row" style="flex-wrap:nowrap"><label class="field" style="flex:1">Hora<input type="time" id="tl-time" name="time" required></label><label class="field" style="flex:1">Hasta (opcional)<input type="time" id="tl-end" name="end"></label></div>' +
      '<label class="field">Descripción<input type="text" id="tl-text" name="text" required maxlength="160" placeholder="Ej.: posible salida por la escalera"></label>' +
      '<div class="row" style="flex-wrap:nowrap"><label class="field" style="flex:1">Fuente<select id="tl-src" name="source">' + C.sources.map(s => '<option>' + s + '</option>').join('') + '</select></label><label class="field" style="flex:1">Persona<select id="tl-person" name="person"><option value="">—</option>' + c.people.map(p => '<option value="' + p.id + '">' + esc(p.name) + '</option>').join('') + '<option value="daniel">' + esc(c.victim.name) + '</option></select></label></div>' +
      '<label class="field">Lugar<select id="tl-place" name="place"><option value="">—</option>' + Object.keys(c.places).map(k => '<option value="' + k + '">' + esc(c.places[k].name) + '</option>').join('') + '</select></label>' +
      '<div class="row"><button class="btn" type="submit">Añadir evento</button></div></form></div>' +
      (items.length ? '<article class="panel stack tl-list"><h3>Eventos</h3>' + items.map(i => '<div class="fact ' + (i.kind === 'statement' ? 'statement' : '') + '"><time>' + esc(i.time + (i.end ? '–' + i.end : '')) + '</time><div class="min0"><span class="src">' + esc(i.source) + (i.custom ? ' · propio' : '') + '</span>' + esc(i.text) +
        '<div class="tl-note"><input type="text" id="tl-note-' + i.id + '" data-act="tl-note" data-id="' + i.id + '" value="' + esc(i.note || '') + '" placeholder="Nota sobre este evento…" aria-label="Nota"></div></div><button class="linkish" data-act="tl-del" data-id="' + i.id + '">Quitar</button></div>').join('') + '</article>' : '') +
      '</div>';
  }

  function tabHipotesis(c, cs) {
    const s = S();
    const actives = cs.hypotheses.filter(h => h.status !== 'descartada');
    const sus = [...new Set(actives.map(h => h.suspect).filter(x => x && x !== 'nd'))];
      return '<div class="stack-lg"><div class="theory"><div class="eyebrow">Tu teoría ahora mismo</div>' + (actives.length ? '<p style="font-size:.92rem">' + actives.length + ' hipótesis activa(s)' + (sus.length ? ' · personas de interés: ' + esc(sus.map(x => EN.personName(c, x)).join(', ')) : '') + '.</p>' + (sus.length > 1 ? '<p class="faint" style="font-size:.84rem">Mantienes varias líneas abiertas. El sistema no dirá cuál es la buena hasta el cierre.</p>' : '') : '<p class="muted" style="font-size:.88rem">Sin hipótesis activas. Una buena práctica es mantener al menos dos alternativas.</p>') + '</div>' +
      '<form class="panel stack" data-form="hyp"><h3>Nueva hipótesis</h3>' +
      '<label class="field">Enunciado<textarea id="hyp-text" name="text" required maxlength="400" placeholder="Ej.: Creo que X entró por el garaje y salió en un vehículo antes de las 00:05."></textarea></label>' +
      '<div class="row" style="flex-wrap:nowrap;align-items:flex-end"><label class="field" style="flex:1">Persona de interés<select id="hyp-suspect" name="suspect"><option value="nd">Sin determinar</option>' + c.people.map(p => '<option value="' + p.id + '">' + esc(p.name) + '</option>').join('') + '</select></label>' +
      '<label class="field" style="flex:1">Confianza inicial: <span id="hyp-conf-out">50</span> %<input type="range" id="hyp-conf" name="conf" min="0" max="100" step="5" value="50" data-act="range-out" data-out="hyp-conf-out"></label></div>' +
      '<div class="row"><button class="btn primary" type="submit">Crear hipótesis</button></div></form>' +
      (cs.hypotheses.length ? cs.hypotheses.slice().reverse().map(h => {
        const st = EN.hypStatus(h);
        const lst = arr => arr.length ? '<ul>' + arr.map(id => '<li>' + esc(c.facts[id].text) + ' <button class="linkish" data-act="hyp-unlink" data-id="' + h.id + '" data-fact="' + id + '">quitar</button></li>').join('') + '</ul>' : '<p class="faint" style="font-size:.82rem">Ninguno.</p>';
        return '<article class="panel hyp ' + (h.status === 'descartada' ? 'off' : '') + '"><div class="spread"><span class="row"><span class="badge">' + esc(h.suspect && h.suspect !== 'nd' ? EN.personName(c, h.suspect) : 'Sin persona') + '</span></span><span class="badge ' + st.key + '">' + st.label + '</span></div>' +
          '<p class="hyp-text">' + esc(h.text) + '</p>' +
          '<div class="links"><div><div class="sub">Hechos a favor</div>' + lst(h.supports) + '</div><div><div class="sub">Hechos en contra</div>' + lst(h.against) + '</div></div>' +
          (h.status !== 'descartada' ? '<div class="row" style="flex-wrap:nowrap"><select id="hyp-link-' + h.id + '" aria-label="Hecho a vincular">' + factOptions(c, cs, { placeholder: 'Vincular un hecho…' }) + '</select></div><div class="row"><button class="btn small" data-act="hyp-link" data-id="' + h.id + '" data-side="supports">A favor</button><button class="btn small" data-act="hyp-link" data-id="' + h.id + '" data-side="against">En contra</button></div>' +
            '<label class="field">Confianza: <span id="hyp-c-out-' + h.id + '">' + h.conf + '</span> %<input type="range" id="hyp-c-' + h.id + '" min="0" max="100" step="5" value="' + h.conf + '" data-act="hyp-conf" data-id="' + h.id + '" data-out="hyp-c-out-' + h.id + '"></label>' : '') +
          '<div class="spread"><span class="faint mono" style="font-size:.7rem">Historial de confianza: ' + h.confHistory.join(' → ') + ' %</span>' + (h.status !== 'descartada' ? '<button class="btn small danger" data-act="hyp-discard" data-id="' + h.id + '">Descartar</button>' : '<button class="btn small ghost" data-act="hyp-restore" data-id="' + h.id + '">Reactivar</button>') + '</div></article>';
      }).join('') : '<p class="muted">Aún no hay hipótesis. Una buena práctica es mantener al menos dos alternativas abiertas.</p>') + '</div>';
  }

  function tabConsulta(c, cs) {
    const qs = cs.queries.slice().reverse().slice(0, 8);
    return '<div class="stack-lg"><form class="panel stack" data-form="query"><h3>Consulta al expediente</h3><p class="muted" style="font-size:.88rem">Escribe una pregunta libre. El motor busca únicamente en la información ya incorporada al expediente. Si el dato no existe, lo dirá.</p>' +
      '<div class="row" style="flex-wrap:nowrap"><input type="search" id="query-input" name="q" required maxlength="160" placeholder="Ej.: ¿Dónde estaba Javier a las 23:18?" aria-label="Pregunta"><button class="btn primary" type="submit">Consultar</button></div>' +
      '<div class="row faint" style="font-size:.78rem">Ejemplos: «¿Qué llamadas hizo Daniel?» · «¿Qué se sabe del portátil?» · «¿Quién tenía acceso a la vivienda?» · «vehículo oscuro»</div></form>' +
      qs.map(q => '<article class="panel stack"><div class="turn-q">› ' + esc(q.q) + '</div>' + (q.ids.length ? q.ids.map(id => factRow(c, Object.assign({ id }, c.facts[id]))).join('') : '<div class="result neutral">' + EN.NOT_FOUND + '</div>') + '</article>').join('') + '</div>';
  }

  function tabInforme(c, cs) {
    const inFrame = window.self !== window.top;
    const facts = EN.knownFacts(c, cs);
    const tl = cs.timeline.slice().sort((a, b) => EN.minutes(a.time) - EN.minutes(b.time));
    const conf = Object.keys(cs.conflicts).map(id => c.conflicts.find(k => k.id === id));
    const ex = c.evidence.filter(e => cs.examined[e.id]);
    const custodyOk = ex.filter(e => EN.custody(c, cs, e).complete).length;
    const sec = (n, t, body) => '<section class="stack" style="gap:6px"><h3>' + n + '. ' + t + '</h3>' + body + '</section>';
    return '<div class="stack-lg"><div class="spread no-print"><p class="muted" style="max-width:62ch">El informe se compone con tu propio material: cronología, contradicciones registradas, hipótesis y lo que escribas aquí.</p><div class="row"><button class="btn" data-act="copy-report">Copiar texto</button>' + (inFrame ? '' : '<button class="btn ghost" data-act="print">Imprimir</button>') + '</div></div>' +
      '<article class="panel stack-lg" id="report">' +
      sec(1, 'Identificación del expediente', '<p>' + c.id + ' · ' + esc(c.title) + ' · ' + esc(c.type) + ' · ' + esc(c.date) + '. Investigador/a: ' + esc(playerName()) + '.</p>') +
      sec(2, esc(c.victimLabel || 'Víctima'), '<p>' + esc(c.victim.summary || c.victim.name + ', ' + c.victim.age + ' años') + '. ' + esc(c.victim.job) + '.</p>') +
      sec(3, 'Escena', '<p>' + esc(c.location) + '. ' + esc(c.sceneSummary) + '</p>') +
      sec(4, 'Cronología', tl.length ? tl.map(e => '<div class="fact"><time>' + esc(e.time + (e.end ? '–' + e.end : '')) + '</time><div><span class="src">' + esc(e.source) + '</span>' + esc(e.text) + (e.note ? ' <i class="muted">— ' + esc(e.note) + '</i>' : '') + '</div></div>').join('') : '<p class="muted">Sin cronología elaborada.</p>') +
      sec(5, 'Personas', '<ul style="margin:0;padding-left:18px">' + c.people.map(p => '<li>' + esc(p.name) + ' — ' + esc(p.role) + (cs.asked[p.id] ? ' (entrevistada)' : ' (no entrevistada)') + '</li>').join('') + '</ul>') +
      sec(6, 'Evidencias examinadas', ex.length ? '<ul style="margin:0;padding-left:18px">' + ex.map(e => '<li>' + e.id + ' ' + esc(e.name) + (EN.custody(c, cs, e).complete ? '' : ' (cadena de custodia incompleta)') + '</li>').join('') + '</ul><p class="faint" style="font-size:.84rem">Cadena de custodia completa en ' + custodyOk + ' de ' + ex.length + ' indicios.</p>' : '<p class="muted">Ninguna.</p>') +
      sec(7, 'Contradicciones', conf.length ? conf.map(k => '<p>• ' + esc(k.type) + ': ' + esc(k.desc) + '</p>').join('') : '<p class="muted">Ninguna registrada.</p>') +
      sec(8, 'Hipótesis', cs.hypotheses.length ? cs.hypotheses.map(h => '<p>• [' + EN.hypStatus(h).label + ', ' + h.conf + ' %] ' + esc(h.text) + '</p>').join('') : '<p class="muted">Ninguna.</p>') +
      sec(9, 'Análisis', '<p class="muted">' + facts.length + ' hechos en el expediente · ' + Object.keys(cs.lab).length + ' análisis de laboratorio · ' + (Object.keys(cs.digital).length + cs.judicial.length) + ' registros digitales · ' + cs.wall.links.length + ' conexiones en el muro · ' + cs.mapLinks.length + ' en el mapa.</p>') +
      '<label class="field">10–12. Reconstrucción, conclusión y pruebas principales<textarea id="rep-rec" data-act="report-field" data-key="reconstruccion" rows="6" placeholder="Qué ocurrió, en qué orden y por qué lo sostienes.">' + esc(cs.report.reconstruccion) + '</textarea></label>' +
      '<label class="field">13. Incertidumbres pendientes<textarea id="rep-unc" data-act="report-field" data-key="incertidumbres" rows="4" placeholder="Qué no está acreditado o podría explicarse de otra forma.">' + esc(cs.report.incertidumbres) + '</textarea></label>' +
      '</article></div>';
  }

  function tabCustodia(c, cs) {
    const ex = c.evidence.filter(e => cs.examined[e.id]);
    if (!ex.length) return '<div class="panel stack"><h3>Cadena de custodia</h3><p class="muted">La trazabilidad empieza al identificar un indicio en la inspección ocular. Examina elementos de la escena para abrir su registro.</p></div>';
    const ok = ex.filter(e => EN.custody(c, cs, e).complete).length;
    return '<div class="stack-lg"><div class="spread"><p class="muted" style="max-width:66ch">Cada indicio debe poder seguirse desde que se identifica hasta que se analiza: quién lo recoge, dónde se guarda, a quién se remite y qué resultado da. Una laguna debilita su valor en juicio.</p><span class="badge ' + (ok === ex.length ? 'ok' : 'warn') + '">' + ok + '/' + ex.length + ' completas</span></div>' +
      '<div class="grid">' + ex.map(e => {
        const k = EN.custody(c, cs, e);
        return '<article class="panel stack"><div class="spread"><div><div class="ev-id">' + e.id + ' · ' + k.seal + '</div><h3>' + esc(e.name) + '</h3></div><span class="badge ' + (k.complete ? 'ok' : 'warn') + '">' + (k.complete ? 'Trazabilidad completa' : 'Incompleta') + '</span></div>' +
          '<ol class="custody">' + k.steps.map(st => '<li class="' + (st.ok ? 'ok' : st.na ? 'na' : 'pend') + '"><b>' + st.k + '</b><span>' + esc(st.text) + '</span></li>').join('') + '</ol>' +
          '<form class="row" data-form="custody-note" style="flex-wrap:nowrap"><input type="hidden" name="ev" value="' + e.id + '"><input type="text" id="cn-' + e.id + '" name="note" maxlength="120" placeholder="Añadir nota de custodia…" aria-label="Nota de custodia"><button class="btn small" type="submit">Anotar</button></form>' +
          (k.photo ? '' : '<div class="row"><button class="btn small" data-act="photo" data-id="' + e.id + '">Fotografiar</button></div>') + '</article>';
      }).join('') + '</div></div>';
  }

  function tabMapa(c, cs) {
    const places = EN.knownPlaces(c, cs);
    const onMap = places.filter(k => !c.places[k].offmap);
    const off = places.filter(k => c.places[k].offmap);
    const sel = cs.lastView.mapSel || null;
    const links = cs.mapLinks.filter(l => onMap.includes(l.a) && onMap.includes(l.b));
    const pt = k => c.places[k];
    const svg = '<svg class="map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
      links.map(l => '<line x1="' + pt(l.a).x + '" y1="' + pt(l.a).y + '" x2="' + pt(l.b).x + '" y2="' + pt(l.b).y + '"/>').join('') + '</svg>';
    const labels = links.map(l => {
      const d = EN.placeDistance(c, l.a, l.b);
      return '<span class="map-link-label" style="left:' + ((pt(l.a).x + pt(l.b).x) / 2) + '%;top:' + ((pt(l.a).y + pt(l.b).y) / 2) + '%">' + esc(l.label) + (d !== null ? ' · ≈' + d.toFixed(1) + ' km' : '') + '</span>';
    }).join('');
    const pins = onMap.map(k => '<button class="map-pin k-' + esc(pt(k).kind) + (sel === k ? ' sel' : '') + '" style="left:' + pt(k).x + '%;top:' + pt(k).y + '%" data-act="map-sel" data-id="' + k + '" title="' + esc(pt(k).name) + '"><i></i><span>' + esc(pt(k).name) + '</span></button>').join('');
    const placeOpts = (id, val) => '<select id="' + id + '"><option value="">Elige un lugar…</option>' + onMap.map(k => '<option value="' + k + '"' + (val === k ? ' selected' : '') + '>' + esc(pt(k).name) + '</option>').join('') + '</select>';
    const selFacts = sel ? EN.knownFacts(c, cs, f => f.place === sel).sort((a, b) => (EN.minutes(a.time) || 0) - (EN.minutes(b.time) || 0)) : [];
    return '<div class="stack-lg"><div class="map-wrap"><div class="map" role="group" aria-label="Mapa de investigación"><div class="map-grid"></div>' + svg + labels + pins + '<svg class="map-gaps" id="map-gaps" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"></svg><div class="map-tokens" id="map-tokens"></div></div>' +
      '<div class="legend"><span>Solo aparecen los lugares que constan en el expediente.</span><span>Distancias en línea recta, aproximadas.</span>' + (off.length ? '<span>Fuera del mapa: ' + off.map(k => esc(pt(k).name) + ' (' + esc(pt(k).offmap) + ')').join(', ') + '</span>' : '') + '</div></div>' +
      mapPlayback(c, cs) +
      '<div class="grid"><article class="panel stack"><h3>Conectar lugares</h3><div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))"><label class="field">Desde' + placeOpts('map-a', sel) + '</label><label class="field">Hasta' + placeOpts('map-b') + '</label></div>' +
      '<label class="field">Tipo de conexión<select id="map-label">' + ['Ruta conocida', 'Desplazamiento posible', 'Llamada', 'Cámara', 'Vehículo', 'Relación', 'Otro'].map(x => '<option>' + x + '</option>').join('') + '</select></label>' +
      '<div class="row"><button class="btn primary" data-act="map-link">Trazar línea</button></div>' +
      (cs.mapLinks.length ? '<div class="sub">Conexiones</div>' + cs.mapLinks.map(l => { const d = EN.placeDistance(c, l.a, l.b); return '<div class="spread" style="font-size:.86rem;border-bottom:1px dashed var(--line-soft);padding:4px 0"><span>' + esc(pt(l.a).name) + ' → ' + esc(pt(l.b).name) + ' · ' + esc(l.label) + (d !== null ? ' · ≈' + d.toFixed(1) + ' km' : '') + '</span><button class="linkish" data-act="map-unlink" data-id="' + l.id + '">Quitar</button></div>'; }).join('') : '') + '</article>' +
      '<article class="panel stack"><h3>' + (sel ? esc(pt(sel).name) : 'Hechos por lugar') + '</h3>' + (sel ? (selFacts.length ? selFacts.map(f => factRow(c, f)).join('') : '<p class="muted">No consta información situada en este lugar.</p>') : '<p class="muted">Pulsa un punto del mapa para ver lo que consta en ese lugar.</p>') + '</article></div></div>';
  }

  const WALL_KINDS = { person: 'Persona', evidence: 'Evidencia', fact: 'Registro', statement: 'Declaración', place: 'Lugar', conflict: 'Contradicción', hyp: 'Hipótesis', question: 'Pregunta abierta' };
  const LINK_COLORS = { relación: '#e2555d', llamada: '#5fd3df', ubicación: '#8fa8ff', cámara: '#e7ae4b', vehículo: '#c79bff', tiempo: '#f0e68c', dinero: '#5ccd8c', contradicción: '#ff7a3d', acceso: '#d98fd0', otro: '#b9b5ad' };
  /* Línea temporal con las tarjetas del muro que tienen hora. */
  function wallTimeline(c, cs) {
    const items = cs.wall.cards.filter(k => (k.kind === 'fact' || k.kind === 'statement') && c.facts[k.ref] && c.facts[k.ref].time)
      .map(k => ({ k, f: c.facts[k.ref], m: EN.minutes(c.facts[k.ref].time) })).sort((a, b) => a.m - b.m);
    if (!items.length) return '<p class="faint" style="font-size:.8rem">Añade al muro registros o declaraciones con hora y aparecerán aquí, ordenados en una línea temporal.</p>';
    const lo = items[0].m, hi = Math.max(items[items.length - 1].m, lo + 30);
    const pos = m => 8 + (m - lo) / (hi - lo) * 84;
    return '<article class="panel stack"><div class="panel-head"><h3>Línea temporal del muro</h3><span class="badge">' + items.length + ' con hora</span></div><div class="wall-tl"><div class="wall-tl-axis"></div>' +
      items.map((x, i) => '<button class="wall-tl-mark ' + (i % 2 ? 'down' : 'up') + (x.f.kind === 'statement' ? ' st' : '') + '" style="left:' + pos(x.m) + '%" data-act="wall-focus" data-id="' + x.k.id + '" title="' + esc(x.f.text) + '"><b>' + esc(x.f.time) + (x.f.end ? '–' + esc(x.f.end) : '') + '</b><span>' + esc(x.f.text.slice(0, 38)) + (x.f.text.length > 38 ? '…' : '') + '</span></button>').join('') +
      '</div><p class="faint" style="font-size:.78rem">Toca una marca para localizar su tarjeta. Ámbar: declaraciones; azul: registros.</p></article>';
  }
  function wallText(c, cs, k) {
    const cut = (t, n) => t.length > n ? t.slice(0, n - 1) + '…' : t;
    if (k.kind === 'person') { const p = c.people.find(x => x.id === k.ref); return p ? p.name + ' · ' + p.role : c.victim.name + ' · ' + (c.victimLabel || 'Víctima'); }
    if (k.kind === 'evidence') { const e = c.evidence.find(x => x.id === k.ref); return e.id + ' · ' + e.name; }
    if (k.kind === 'fact' || k.kind === 'statement') { const f = c.facts[k.ref]; return (f.time ? f.time + ' · ' : '') + cut(f.text, 120); }
    if (k.kind === 'place') return c.places[k.ref].name;
    if (k.kind === 'conflict') { const x = c.conflicts.find(y => y.id === k.ref); return x.type + ': ' + cut(x.desc, 110); }
    if (k.kind === 'hyp') { const h = cs.hypotheses.find(y => y.id === k.ref); return h ? cut(h.text, 120) : 'Hipótesis eliminada'; }
    return k.text || '';
  }
  function wallOptions(c, cs) {
    const on = new Set(cs.wall.cards.map(k => k.kind + ':' + k.ref));
    const opt = (v, l) => on.has(v) ? '' : '<option value="' + esc(v) + '">' + esc(l) + '</option>';
    const grp = (label, html) => html ? '<optgroup label="' + label + '">' + html + '</optgroup>' : '';
    const facts = EN.knownFacts(c, cs);
    return '<option value="">Elige qué añadir…</option>' +
      grp('Personas', opt('person:' + c.victim.id, c.victim.name + ' (' + (c.victimLabel || 'víctima').toLowerCase() + ')') + c.people.map(p => opt('person:' + p.id, p.name)).join('')) +
      grp('Evidencias examinadas', c.evidence.filter(e => cs.examined[e.id]).map(e => opt('evidence:' + e.id, e.id + ' ' + e.name)).join('')) +
      grp('Registros', facts.filter(f => f.kind !== 'statement').map(f => opt('fact:' + f.id, factLabel(c, f.id))).join('')) +
      grp('Declaraciones', facts.filter(f => f.kind === 'statement').map(f => opt('statement:' + f.id, factLabel(c, f.id))).join('')) +
      grp('Lugares', EN.knownPlaces(c, cs).map(k => opt('place:' + k, c.places[k].name)).join('')) +
      grp('Contradicciones', Object.keys(cs.conflicts).map(id => { const x = c.conflicts.find(y => y.id === id); return opt('conflict:' + id, x.type + ' · ' + x.desc.slice(0, 70)); }).join('')) +
      grp('Hipótesis', cs.hypotheses.map(h => opt('hyp:' + h.id, h.text.slice(0, 80))).join(''));
  }

  function tabMuro(c, cs) {
    const W = cs.wall;
    const con = cs.lastView.wallConnect || {};
    const focus = cs.lastView.wallFocus;
    const tilt = id => { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) | 0; return ((Math.abs(h) % 50) - 25) / 10; };
    const media = k => {
      if (k.kind === 'evidence') return '<div class="wc-photo"><img data-shot="' + k.ref + '" alt=""><span>' + esc(k.ref) + '</span></div>';
      if (k.kind === 'person') { const p = c.people.find(x => x.id === k.ref) || c.victim; return '<div class="wc-face">' + portrait(p, 46) + '</div>'; }
      return '';
    };
    const cardHtml = W.cards.map(k => '<div class="wall-card k-' + k.kind + (con.from === k.id ? ' from' : '') + (focus === k.id ? ' focus' : '') + '" data-card="' + k.id + '" style="left:' + k.x + 'px;top:' + k.y + 'px;--tilt:' + tilt(k.id) + 'deg"><i class="pin" aria-hidden="true"></i><div class="wc-head"><span>' + WALL_KINDS[k.kind] + '</span><button class="wc-x" data-act="wall-remove" data-id="' + k.id + '" aria-label="Quitar del muro">✕</button></div>' + media(k) + '<div class="wc-text">' + esc(wallText(c, cs, k)) + '</div></div>').join('');
    const used = [...new Set(W.links.map(l => l.label))];
    const legend = used.length ? '<div class="wall-legend">' + used.map(l => '<span><i style="background:' + LINK_COLORS[l in LINK_COLORS ? l : 'otro'] + '"></i>' + esc(l) + '</span>').join('') + '</div>' : '';
    return '<div class="stack-lg"><article class="panel stack"><div class="wall-tools">' +
      '<div class="row" style="flex-wrap:nowrap;flex:2;min-width:min(100%,320px)"><select id="wall-add" aria-label="Elemento a añadir">' + wallOptions(c, cs) + '</select><button class="btn" data-act="wall-add">Añadir</button></div>' +
      '<form class="row" data-form="wall-question" style="flex-wrap:nowrap;flex:2;min-width:min(100%,320px)"><input type="text" id="wall-q" name="q" maxlength="140" placeholder="Pregunta abierta…" aria-label="Pregunta abierta"><button class="btn" type="submit">Añadir pregunta</button></form></div>' +
      '<div class="wall-tools"><div class="row"><select id="wall-label" aria-label="Tipo de conexión">' + ['relación', 'llamada', 'ubicación', 'cámara', 'vehículo', 'tiempo', 'dinero', 'contradicción', 'acceso', 'otro'].map(x => '<option' + (con.label === x ? ' selected' : '') + '>' + x + '</option>').join('') + '</select>' +
      '<button class="btn ' + (con.on ? 'primary' : '') + '" data-act="wall-connect">' + (con.on ? (con.from ? 'Elige la segunda tarjeta…' : 'Elige la primera tarjeta…') : 'Conectar tarjetas') + '</button>' +
      (con.on ? '<button class="btn ghost" data-act="wall-connect-cancel">Cancelar</button>' : '') + '</div>' +
      '<div class="row"><button class="btn ghost" data-act="wall-sort">Ordenar por tipo</button><span class="badge">' + W.cards.length + ' tarjetas · ' + W.links.length + ' conexiones</span></div></div>' +
      '<p class="faint" style="font-size:.8rem">Arrastra las tarjetas por su cabecera. Quitar una tarjeta solo la retira del muro: el hecho sigue en el expediente.</p></article>' +
      '<div class="wall-scroll"><div class="wall-board" id="wall-board' + (con.on ? '" data-connect="1' : '') + '"><svg class="wall-lines" id="wall-lines" aria-hidden="true"></svg>' + cardHtml +
      (W.cards.length ? '' : '<div class="wall-empty"><b>Muro vacío.</b> Añade a la víctima, a las personas, evidencias, lugares, declaraciones o preguntas abiertas y conéctalos.</div>') + '</div></div>' + legend + wallTimeline(c, cs) +
      (W.links.length ? '<article class="panel stack"><h3>Conexiones</h3>' + W.links.map(l => { const a = W.cards.find(k => k.id === l.a), b = W.cards.find(k => k.id === l.b); return '<div class="spread" style="font-size:.86rem;border-bottom:1px dashed var(--line-soft);padding:4px 0"><span>' + esc(wallText(c, cs, a).slice(0, 50)) + ' <b class="mono" style="color:var(--accent)">— ' + esc(l.label) + ' →</b> ' + esc(wallText(c, cs, b).slice(0, 50)) + '</span><button class="linkish" data-act="wall-unlink" data-id="' + l.id + '">Quitar</button></div>'; }).join('') + '</article>' : '') + '</div>';
  }

  function tabVeredicto(c, cs) {
    if (!cs.evaluation) return verdictForm(c, cs);
    return verdictResult(c, cs);
  }

  function culpritOptions(c) {
    const vo = c.verdictOptions;
    return vo.culprits || c.people.map(p => ({ id: p.id, label: p.name })).concat([{ id: 'insuficiente', label: 'Evidencia insuficiente para una atribución concluyente' }]);
  }

  function verdictForm(c, cs) {
    const facts = EN.knownFacts(c, cs);
    const vo = c.verdictOptions;
    const sel = (id, name, opts) => '<select id="' + id + '" name="' + name + '" required><option value="">Elige…</option>' + opts.map(o => '<option value="' + o.id + '">' + esc(o.label) + '</option>').join('') + '</select>';
    return '<form class="stack-lg" data-form="verdict"><article class="panel dossier stack"><h3>Emitir veredicto</h3><p class="muted" style="font-size:.9rem">El veredicto se compara con la verdad interna del caso. Se evalúan la conclusión principal, el móvil, el método, la cronología, las pruebas, las contradicciones detectadas y la calidad del proceso. Reconocer que la evidencia es insuficiente es una conclusión válida.</p>' +
      '<p class="faint" style="font-size:.84rem">Una vez emitido, el caso se cierra. Podrás revisarlo o repetirlo desde cero.</p></article>' +
      '<div class="grid"><article class="panel stack"><label class="field">' + esc(vo.culpritLabel || 'Autoría') + sel('v-culprit', 'culprit', culpritOptions(c)) + '</label>' +
      '<label class="field">Móvil' + sel('v-motive', 'motive', vo.motives) + '</label><label class="field">Método' + sel('v-method', 'method', vo.methods) + '</label><label class="field">' + esc(vo.windowLabel || 'Momento de la agresión') + sel('v-window', 'window', vo.windows) + '</label>' +
      '<div class="sub">' + esc(vo.accompliceLabel || 'Cómplices') + '</div><div class="grid-sm">' + c.people.map(p => '<label class="check"><input type="checkbox" name="acc" value="' + p.id + '" id="v-acc-' + p.id + '">' + esc(p.name) + '</label>').join('') + '</div></article>' +
      '<article class="panel stack"><div class="sub">Pruebas principales (máximo 6)</div><div class="stack" style="gap:6px;max-height:360px;overflow-y:auto">' +
      facts.map(f => '<label class="check"><input type="checkbox" name="ev" value="' + f.id + '" id="v-ev-' + f.id + '" data-act="ev-limit">' + esc(factLabel(c, f.id)) + '</label>').join('') + '</div></article></div>' +
      '<article class="panel stack"><label class="field">Explicación global<textarea id="v-expl" name="explain" rows="5" required placeholder="Reconstruye el caso con tus palabras."></textarea></label><div class="row"><button class="btn primary" type="submit">Emitir veredicto y cerrar el caso</button></div></article></form>';
  }

  function verdictResult(c, cs) {
    const ev = cs.evaluation;
    const v = cs.verdict;
    const vo = c.verdictOptions;
    const lab = (arr, id) => { const o = arr.find(x => x.id === id); return o ? o.label : '—'; };
    const key = v.culprit !== 'insuficiente' ? v.culprit : null;
    const isPerson = key && c.people.some(p => p.id === key);
    const LEVEL = { 1: 'Directamente observable', 2: 'Requiere interpretación', 3: 'Admite varias explicaciones', 4: 'Contradictoria o ambigua', 5: 'Parece incriminatoria pero engaña' };
    let trial = '';
    if (key) {
      if (cs.trial) {
        trial = '<article class="panel stack"><h3>Juicio simulado · resultado</h3>' + cs.trial.res.map(r => '<div class="objection"><b>Objeción:</b> ' + esc(r.text) + '<div class="result ' + (r.ok ? '' : 'neutral') + '">' + (r.answer ? 'Respuesta: ' + esc(c.facts[r.answer].text) + ' — ' + (r.ok ? 'el tribunal la considera pertinente.' : 'el tribunal no la considera suficiente.') : 'Sin respuesta.') + '</div></div>').join('') + '<div class="result">' + esc(cs.trial.verdict) + '</div></article>';
      } else {
        const set = EN.trialSet(c, key);
        const intro = (c.trialIntro || {})[key] || (isPerson ? 'La defensa de ' + EN.personName(c, key) + ' ataca tu reconstrucción.' : 'La parte contraria ataca tu conclusión.');
        trial = '<form class="panel stack" data-form="trial"><h3>Juicio simulado</h3><p class="muted" style="font-size:.88rem">' + esc(intro) + ' Responde a cada objeción con el elemento del expediente que mejor la rebata.</p>' +
          set.map(o => '<div class="objection"><b>Objeción:</b> ' + esc(o.text) + '<select id="trial-' + o.id + '" name="' + o.id + '">' + factOptions(c, cs, { placeholder: 'Responder con…' }) + '</select></div>').join('') +
          '<div class="row"><button class="btn primary" type="submit">Presentar respuestas</button></div></form>';
      }
    }
    return '<div class="stack-lg"><article class="panel dossier stack"><div class="spread"><div><div class="eyebrow">Resultado del caso</div><div class="score-big">' + ev.total + '<span style="font-size:1.2rem;color:var(--muted)">/100</span></div></div>' +
      '<div class="stack" style="gap:4px;font-size:.88rem"><span>' + esc(vo.culpritLabel || 'Autoría') + ': <b>' + esc(lab(culpritOptions(c), v.culprit)) + '</b></span><span>Móvil: ' + esc(lab(vo.motives, v.motive)) + '</span><span>Método: ' + esc(lab(vo.methods, v.method)) + '</span></div></div>' +
      ev.comp.map(x => '<div class="skill-row"><span>' + esc(x.name) + '</span><div class="bar"><i style="width:' + Math.round(x.pts / x.max * 100) + '%"></i></div><span class="mono">' + x.pts + '/' + x.max + '</span><div class="skill-why">' + esc(x.text) + '</div></div>').join('') +
      (ev.total < ev.comp.reduce((n, x) => n + x.pts, 0) ? '<p class="result warn-note">Nota limitada a ' + ev.total + ': la conclusión principal no es correcta, así que el resto del trabajo no basta para aprobar.</p>' : '') +
      (cs.rewards ? '<div class="result">Recompensa: +' + cs.rewards.xp + ' XP · ' + (cs.rewards.rep >= 0 ? '+' : '') + cs.rewards.rep + ' reputación · +' + money(cs.rewards.money) + (cs.rewards.promo ? ' · Ascenso: ' + esc(cs.rewards.promo) : '') + '</div>' : '') + '</article>' +
      '<div class="grid"><article class="panel stack"><h3>Perfil de razonamiento observado en esta partida</h3>' +
      C.skills.map(k => { const p = ev.profile[k.id]; return '<div class="skill-row"><span>' + k.name + '</span><div class="bar"><i style="width:' + p.score + '%"></i></div><span class="mono">' + p.score + '</span><div class="skill-why">' + esc(p.why) + '</div></div>'; }).join('') +
      '<p class="faint" style="font-size:.78rem">No es un diagnóstico ni una estimación de inteligencia: describe conductas observadas en esta investigación.</p></article>' +
      '<article class="panel stack"><h3>Lectura de tu investigación</h3>' + ev.lines.map(l => '<p style="font-size:.92rem">' + esc(l) + '</p>').join('') +
      '<div class="sub">Estadísticas</div><dl class="kv">' + ev.stats.map(([k, val]) => '<dt>' + esc(k) + '</dt><dd class="mono">' + esc(val) + '</dd>').join('') + '</dl></article></div>' +
      trial +
      '<article class="panel stack truth"><h3>Verdad interna del caso</h3>' + (c.variants ? '<div class="result">Esta partida tenía la versión ' + (c.variantIndex + 1) + ' de ' + c.variantCount + '. Si repites el expediente te tocará otra: los hechos cambiarán.</div>' : '') + c.truth.narrative.map(p => '<p>' + esc(p) + '</p>').join('') + '</article>' +
      '<article class="panel stack"><h3>Nivel interpretativo de cada evidencia</h3><div class="stack" style="gap:6px">' + c.evidence.map(e => '<div class="spread" style="font-size:.88rem;border-bottom:1px dashed var(--line-soft);padding:4px 0"><span><span class="mono" style="color:var(--accent)">' + e.id + '</span> ' + esc(e.name) + '</span><span class="badge ' + (e.level >= 4 ? 'warn' : '') + '">Nivel ' + e.level + ' · ' + LEVEL[e.level] + '</span></div>').join('') + '</div></article>' +
      '<div class="row"><button class="btn" data-act="go" data-screen="home">Volver al centro</button><button class="btn ghost" data-act="go" data-screen="cases">Ir a expedientes</button>' + (c.variants ? '<button class="btn primary" data-act="restart-case" data-id="' + c.id + '">Jugar otra versión</button>' : '') + '</div></div>';
  }

  /* ---------- Modal de bienvenida y tutorial ---------- */
  const TUTORIAL = [
    ['Escena', 'Abre la pestaña Escena y pulsa los puntos del plano. «Examinar» incorpora lo que observas al expediente; nada te dirá si es importante.'],
    ['Personas y comparador', 'Interroga, vuelve sobre respuestas y confronta con datos. El comparador señala diferencias objetivas entre fuentes, nunca quién miente.'],
    ['Cronología e hipótesis', 'Construye tu línea temporal y compara intervalos. Formula hipótesis, vincula hechos a favor y en contra, y ajusta tu confianza.'],
    ['Mapa, muro y cuaderno', 'Conecta lugares en el mapa y tarjetas en el muro, y apunta lo que quieras en el cuaderno. Todo se guarda solo en este navegador.']
  ];

  function modal() {
    const s = S();
    const m = s.view.modal;
    if (!m) return '';
    if (m === 'intro') {
      return '<div class="modal-back" role="dialog" aria-modal="true" aria-labelledby="intro-t"><div class="modal"><div class="eyebrow">Unidad de investigación · Valencia</div><div class="intro-title" id="intro-t">EXPEDIENTE <span>0</span></div>' +
        '<p class="intro-quote">Bienvenido a EXPEDIENTE 0.<br>Aquí no ganas por adivinar.<br>Ganas por reconstruir.</p>' +
        '<p class="muted">Empiezas como aspirante en una unidad de investigación, con un expediente abierto y una academia inicial.</p>' +
        '<div class="row"><button class="btn primary" data-act="modal-create">Crear mi investigador/a</button></div></div></div>';
    }
    if (m === 'create') {
      return '<div class="modal-back" role="dialog" aria-modal="true" aria-labelledby="cr-t"><form class="modal" data-form="create"><div class="eyebrow">Ficha de ingreso</div><h2 id="cr-t">¿Quién investiga?</h2>' +
        '<label class="field">Nombre de tu investigador/a<input type="text" id="cr-name" name="name" required minlength="2" maxlength="24" autocomplete="off" placeholder="Escribe un nombre" value="' + esc(s.player.name) + '"></label>' +
        '<div class="sub">Especialidad</div><div class="spec-grid">' + C.specialties.map((x, i) => '<label class="spec"><input type="radio" name="specialty" value="' + x.id + '"' + ((s.player.specialty ? s.player.specialty === x.id : i === 0) ? ' checked' : '') + '><span><b>' + esc(x.name) + '</b><small>' + esc(x.desc) + '</small><em>' + esc(x.perk) + '</em></span></label>').join('') + '</div>' +
        '<div class="row"><button class="btn primary" type="submit">Empezar la carrera</button></div></form></div>';
    }
    if (m.startsWith('tut')) {
      const i = Number(m.slice(3));
      const [t, d] = TUTORIAL[i];
      return '<div class="modal-back" role="dialog" aria-modal="true" aria-labelledby="tut-t"><div class="modal"><div class="steps">' + TUTORIAL.map((_, k) => '<i class="' + (k <= i ? 'on' : '') + '"></i>').join('') + '</div>' +
        '<div class="eyebrow">Tutorial ' + (i + 1) + '/' + TUTORIAL.length + '</div><h2 id="tut-t">' + esc(t) + '</h2><p>' + esc(d) + '</p>' +
        '<div class="row">' + (i < TUTORIAL.length - 1 ? '<button class="btn primary" data-act="tutorial-next" data-i="' + (i + 1) + '">Siguiente</button>' : '<button class="btn primary" data-act="modal-close">Empezar</button>') + '<button class="btn ghost" data-act="modal-close">Saltar tutorial</button></div></div></div>';
    }
    return '';
  }

  E0.ui = {
    esc, rankInfo, topbar, sidebar, modal, factLabel, unlocked, scenePlanId, LINK_COLORS, mapTracks, portrait,
    screens: { home: screenHome, cases: screenCases, academy: screenAcademy, career: screenCareer, notebook: screenNotebook, profile: screenProfile, settings: screenSettings, case: screenCase }
  };
})();
