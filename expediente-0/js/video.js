/* EXPEDIENTE 0 — análisis de vídeo de cámara de seguridad.
 * El reloj de la grabadora no va en hora. El jugador busca en la grabación un hecho
 * de hora conocida (un pago con tarjeta registrado por el banco), calcula el desfase
 * y después marca cuándo sale y vuelve a entrar la persona de interés. Con eso se
 * obtienen las horas reales y los hechos de la solicitud entran en el expediente.
 * Datos: digital[].video = { offset, ref: { label, time }, range: [ini, fin],
 *   subject: { pid, intervals: [[ini, fin], ...] }, gates: [factIds] } */
(function () {
  const EN = () => E0.engine;
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const fmtS = m => { const s = Math.round(m * 60), h = Math.floor(s / 3600) % 24, mm = Math.floor(s / 60) % 60, ss = s % 60; return [h, mm, ss].map(x => String(x).padStart(2, '0')).join(':'); };

  /* Clientes que entran y salen (horas reales). */
  function crowd(d) {
    const r = rng(d.id.length * 7919 + 13), V = d.video, lo = EN().minutes(V.range[0]), hi = EN().minutes(V.range[1]);
    const out = [];
    for (let i = 0; i < 9; i++) { const a = lo + r() * (hi - lo - 20), dur = 12 + r() * 50; out.push({ a, b: a + dur, seat: i % 6, col: ['#8a5a44', '#44608a', '#5a8a44', '#8a8a44', '#6a448a', '#3a3a3a'][i % 6] }); }
    return out;
  }
  /* Color de la ropa de cada persona (el mismo del retrato), con un nombre para el jugador. */
  const CLOTH = { '#2f3a4a': ['azul marino', '#3d5a8a'], '#4a2f2f': ['granate', '#9a3a3a'], '#2f4a3c': ['verde', '#3a8a5a'], '#3c3c46': ['gris', '#8a8a96'], '#4a432f': ['marrón', '#8a6a3a'], '#1f2833': ['negro', '#1a1a1a'] };
  const SEATS = [[0.2, 0.62], [0.32, 0.78], [0.5, 0.66], [0.62, 0.82], [0.78, 0.64], [0.86, 0.8]];
  const DOOR = [0.94, 0.44], COUNTER = [0.38, 0.3];

  function draw(cv, c, d, st) {
    const g = cv.getContext('2d'), W = cv.width, H = cv.height, V = d.video;
    const camT = st.t, realT = camT - V.offset;
    // suelo y mobiliario
    g.fillStyle = '#857a6c'; g.fillRect(0, 0, W, H);
    g.fillStyle = '#93887a'; for (let x = 0; x < W; x += 40) g.fillRect(x, 0, 1, H);
    g.fillStyle = '#5b3d26'; g.fillRect(W * 0.08, H * 0.16, W * 0.6, H * 0.1);
    g.fillStyle = '#2a2420'; g.fillRect(W * 0.08, H * 0.06, W * 0.6, H * 0.08);
    g.fillStyle = '#1d1a17'; g.fillRect(W * 0.9, H * 0.34, W * 0.1, H * 0.2);
    g.fillStyle = '#6b6258'; g.font = '600 11px monospace'; g.fillText('PUERTA · TERRAZA', W * 0.84, H * 0.32);
    SEATS.forEach(([x, y]) => { g.fillStyle = '#6a4a30'; g.beginPath(); g.arc(x * W, y * H, 20, 0, Math.PI * 2); g.fill(); });
    const person = (x, y, col, head) => { g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(x + 3, y + 5, 14, 9, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = col; g.beginPath(); g.arc(x, y, 12, 0, Math.PI * 2); g.fill(); g.fillStyle = head; g.beginPath(); g.arc(x, y - 2, 6, 0, Math.PI * 2); g.fill(); };
    const walk = (from, to, k) => [from[0] + (to[0] - from[0]) * k, from[1] + (to[1] - from[1]) * k];
    const place = (a, b, seat, t) => {
      if (t < a - 1 || t > b + 1) return null;
      if (t < a) return walk(DOOR, seat, t - a + 1);
      if (t > b) return walk(seat, DOOR, t - b);
      return seat;
    };
    crowd(d).forEach(p => { const pos = place(p.a, p.b, SEATS[p.seat], realT); if (pos) person(pos[0] * W + 22, pos[1] * H, p.col, '#d9b48c'); });
    // cliente de referencia pagando en la barra
    const rt = EN().minutes(V.ref.time);
    if (realT > rt - 3 && realT < rt + 2) {
      const pos = realT < rt - 2 ? walk(DOOR, COUNTER, realT - rt + 3) : realT > rt + 1 ? walk(COUNTER, DOOR, realT - rt - 1) : COUNTER;
      person(pos[0] * W, pos[1] * H + 26, '#a03a3a', '#e0c09a');
      if (Math.abs(realT - rt) < 0.35) { g.fillStyle = '#5ccd8c'; g.fillRect(COUNTER[0] * W + 16, COUNTER[1] * H - 8, 10, 7); }
    }
    // persona de interés
    const subj = (c.people.find(p => p.id === V.subject.pid));
    const A = E0.appearance(subj);
    V.subject.intervals.forEach(([a, b]) => { const pos = place(EN().minutes(a), EN().minutes(b), SEATS[2], realT); if (pos) person(pos[0] * W - 22, pos[1] * H - 4, CLOTH[A.cloth][1], A.skin); });
    // aspecto de cámara: grano, viñeta y rótulo
    const img = g.getImageData(0, 0, W, H), dd = img.data, r = rng(Math.floor(camT * 6));
    for (let i = 0; i < dd.length; i += 4) { const n = (r() - 0.5) * 30, l = (dd[i] * 0.3 + dd[i + 1] * 0.59 + dd[i + 2] * 0.11); for (let k = 0; k < 3; k++) dd[i + k] = (l * 0.55 + dd[i + k] * 0.45) * 0.95 + n; }
    g.putImageData(img, 0, 0);
    g.fillStyle = 'rgba(0,0,0,.12)'; for (let y = 0; y < H; y += 3) g.fillRect(0, y, W, 1);
    const vg = g.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.8); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = vg; g.fillRect(0, 0, W, H);
    g.fillStyle = '#f2f2f2'; g.font = '700 16px monospace'; g.fillText('CAM 02 · ' + fmtS(camT), 14, H - 14);
    g.fillStyle = '#e2555d'; g.beginPath(); g.arc(W - 22, 20, 6, 0, Math.PI * 2); g.fill();
  }

  function html(c, cs, d) {
    const V = d.video, st = cs.videos[d.id], EN0 = EN();
    const lo = EN0.minutes(V.range[0]) + V.offset, hi = EN0.minutes(V.range[1]) + V.offset;
    const done = st.status !== 'pendiente';
    const subj = c.people.find(p => p.id === V.subject.pid);
    const marks = st.marks || {};
    const step = (label, key, ok) => '<li class="' + (ok ? 'ok' : '') + '">' + label + (ok ? ' <b class="mono">✓ ' + esc(ok) + '</b>' : '') + '</li>';
    return '<article class="panel stack video-panel"><div class="panel-head"><h3>Análisis de vídeo · ' + esc(d.name) + '</h3><button class="btn small ghost" data-act="vid-close">Cerrar</button></div>' +
      '<canvas class="vid-cv" width="640" height="360" aria-label="Grabación de la cámara"></canvas>' +
      '<div class="row" style="flex-wrap:nowrap"><button class="btn small" data-act="vid-play" id="vid-play">▶</button><input type="range" id="vid-time" data-act="vid-time" min="' + lo + '" max="' + hi + '" step="0.1667" value="' + st.t + '" style="flex:1" aria-label="Posición en la grabación"><span class="mono" id="vid-clock">' + fmtS(st.t) + '</span></div>' +
      '<ol class="vid-steps">' + step('Busca el momento en que ' + esc(V.ref.label.toLowerCase()) + '. El banco lo registra a las <b>' + esc(V.ref.time) + '</b>.', 'ref', marks.ref != null ? fmtS(marks.ref) + ' en cámara · desfase ' + (V.offset > 0 ? '+' : '') + V.offset + ' min' : '') +
      step('Marca el último momento en que ' + esc(subj.name.split(' ')[0]) + ' (ropa de color ' + CLOTH[E0.appearance(subj).cloth][0] + ') está en el bar antes de salir.', 'out', marks.out != null ? fmtS(marks.out - V.offset) + ' real' : '') +
      step('Marca cuándo vuelve a entrar.', 'in', marks.in != null ? fmtS(marks.in - V.offset) + ' real' : '') + '</ol>' +
      (done ? '<div class="result"><b>Vídeo sincronizado.</b> Las horas reales ya están en el expediente.</div>' :
        '<div class="row"><button class="btn small" data-act="vid-mark" data-k="ref">Marcar el pago aquí</button><button class="btn small" data-act="vid-mark" data-k="out"' + (marks.ref == null ? ' disabled' : '') + '>Sale aquí</button><button class="btn small" data-act="vid-mark" data-k="in"' + (marks.out == null ? ' disabled' : '') + '>Vuelve aquí</button>' + (cs.nightmare ? '' : '<button class="btn small ghost" data-act="vid-auto">Análisis automático <span class="cost">' + EN0.costOf('digital', 120) + ' €</span></button>') + '</div>') +
      '<p class="muted" style="font-size:.84rem">El reloj de esta grabadora no está en hora. Primero calcula su desfase con un hecho de hora conocida; después convierte las horas de la grabación en horas reales.</p></article>';
  }
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  /* Marca un momento. Devuelve { msg, warn, solved }. */
  function mark(c, cs, d, k) {
    const V = d.video, st = cs.videos[d.id], EN0 = EN();
    st.marks = st.marks || {};
    const real = st.t - V.offset;
    if (k === 'ref') {
      if (Math.abs(real - EN0.minutes(V.ref.time)) > 0.6) return { msg: 'En ese momento no se ve el pago en la barra. Busca cuando el datáfono se ilumina.', warn: true };
      st.marks.ref = st.t; return { msg: 'Desfase calculado: la cámara va ' + Math.abs(V.offset) + ' minutos ' + (V.offset > 0 ? 'adelantada' : 'atrasada') + '.' };
    }
    const iv = V.subject.intervals.map(([a, b]) => [EN0.minutes(a), EN0.minutes(b)]);
    if (k === 'out') {
      const target = iv[0][1];
      if (Math.abs(real - target) > 1.2) return { msg: 'Ahí no sale. Fíjate en cuándo se levanta y va hacia la puerta.', warn: true };
      st.marks.out = st.t; return { msg: 'Salida marcada a las ' + fmtS(real) + ' (hora real).' };
    }
    if (k === 'in') {
      const target = iv[1][0];
      if (Math.abs(real - target) > 1.2) return { msg: 'Ahí no vuelve. Avanza hasta que entre por la puerta.', warn: true };
      st.marks.in = st.t; st.status = 'resuelto';
      return { msg: 'Vuelta marcada a las ' + fmtS(real) + ' (hora real).', solved: true };
    }
    return null;
  }

  E0.video = { draw, html, mark, fmtS };
})();
