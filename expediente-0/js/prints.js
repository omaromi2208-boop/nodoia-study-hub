/* EXPEDIENTE 0 — lofoscopia: huellas dactilares procedurales y cotejo punto a punto.
 * Cada persona tiene diez dedos con un tipo de dibujo y unos puntos característicos
 * fijos (derivados de su identificador). Las crestas se dibujan como franjas de fase
 * y cada punto característico es una singularidad de esa fase, así que es un final
 * o una bifurcación real de las crestas, visible en la imagen.
 * Las latentes son fragmentos girados, parciales y con ruido de un dedo concreto. */
(function () {
  const NEED = 12, MAX_BAD = 3, N_MIN = 55, SPACING = 0.17, LAMBDA = 0.074;
  const FINGERS = ['Pulgar derecho', 'Índice derecho', 'Corazón derecho', 'Anular derecho', 'Meñique derecho', 'Pulgar izquierdo', 'Índice izquierdo', 'Corazón izquierdo', 'Anular izquierdo', 'Meñique izquierdo'];
  const TYPES = { arco: 'Arco', presilla_i: 'Presilla interna', presilla_e: 'Presilla externa', verticilo: 'Verticilo' };

  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const inPrint = (x, y) => (x / 0.74) ** 2 + ((y + 0.02) / 0.92) ** 2 <= 1;

  /* ---------- Dedos ---------- */
  const fingers = {};
  function finger(pid, fi) {
    const key = pid + '#' + fi;
    if (fingers[key]) return fingers[key];
    const r = rng(hash(key));
    const t = r();
    const right = fi < 5;
    const type = t < 0.1 ? 'arco' : t < 0.4 ? 'verticilo' : (r() < 0.8) === right ? 'presilla_e' : 'presilla_i';
    const core = { x: (r() - 0.5) * 0.24, y: r() * 0.25 };
    const F = { pid, fi, type, core, rot: (r() - 0.5) * 0.3, nz: [r() * 6.28, r() * 6.28, 0.025 + r() * 0.02], minutiae: [] };
    let tries = 0;
    while (F.minutiae.length < N_MIN && tries++ < 6000) {
      const x = (r() * 2 - 1) * 0.74, y = (r() * 2 - 1) * 0.92 - 0.02;
      if (!inPrint(x, y) || (x / 0.74) ** 2 + ((y + 0.02) / 0.92) ** 2 > 0.86) continue;
      if (Math.hypot(x - core.x, y - core.y) < 0.13) continue;
      if (F.minutiae.some(m => Math.hypot(m.x - x, m.y - y) < SPACING)) continue;
      F.minutiae.push({ id: F.minutiae.length, x, y, s: F.minutiae.length % 2 ? 1 : -1 });
    }
    fingers[key] = F;
    return F;
  }

  function field(F, x, y) {
    const wx = x + F.nz[2] * Math.sin(2.3 * y + F.nz[0]), wy = y + F.nz[2] * Math.sin(2.1 * x + F.nz[1]);
    let dx = wx - F.core.x, dy = wy - F.core.y;
    const c = Math.cos(F.rot), s = Math.sin(F.rot);
    const rx = c * dx - s * dy, ry = s * dx + c * dy;
    if (F.type === 'verticilo') return Math.hypot(rx, ry * 1.15);
    if (F.type === 'arco') return -ry + 0.24 * Math.exp(-rx * rx / 0.12);
    const ux = (F.type === 'presilla_i' ? -1 : 1) * 0.48, uy = -1, ul = Math.hypot(ux, uy);
    const t = (rx * ux + ry * uy) / ul;
    return t < 0 ? Math.hypot(rx, ry) : Math.abs(rx * uy - ry * ux) / ul;
  }
  function phase(F, x, y) {
    let p = 2 * Math.PI * field(F, x, y) / LAMBDA;
    const M = F.minutiae;
    for (let i = 0; i < M.length; i++) p += M[i].s * Math.atan2(y - M[i].y, x - M[i].x);
    return p;
  }

  /* ---------- Latentes ---------- */
  function toFingerFn(L) {
    const c = Math.cos(L.theta), s = Math.sin(L.theta);
    return (u, v) => [L.c0.x + (c * u - s * v) * L.w, L.c0.y + (s * u + c * v) * L.w];
  }
  function toLatent(L, x, y) {
    const c = Math.cos(L.theta), s = Math.sin(L.theta);
    const dx = (x - L.c0.x) / L.w, dy = (y - L.c0.y) / L.w;
    return [c * dx + s * dy, -s * dx + c * dy];
  }
  function maskAt(L, u, v) {
    const a = Math.atan2(v, u);
    const rad = L.rm * (1 + 0.14 * Math.sin(3 * a + L.b[0]) + 0.08 * Math.sin(5 * a + L.b[1]));
    const d = Math.hypot(u - L.off[0], v - L.off[1]);
    return Math.max(0, Math.min(1, (rad - d) / 0.12));
  }
  const latents = {};
  /* Latente número i de un hecho con huellas (fact.prints[i]). */
  function latent(c, fid, i) {
    const P = c.facts[fid].prints[i];
    const key = c.id + '|' + fid + '|' + i + '|' + (P.match || '?') + '|' + (P.q || '');
    if (latents[key]) return latents[key];
    const seed = hash(key);
    const r = rng(seed);
    const apta = P.q !== 'no_apta';
    const source = P.match ? { pid: P.match, fi: P.finger != null ? P.finger : seed % 10 } : { pid: 'desconocido-' + seed, fi: seed % 10 };
    const F = finger(source.pid, source.fi);
    let L = null;
    for (let k = 0; k < 400; k++) {
      const cand = {
        c0: { x: (r() - 0.5) * 0.6, y: (r() - 0.5) * 0.8 }, theta: (r() - 0.5) * 1.8, w: 0.82,
        rm: apta ? 0.64 : 0.34, b: [r() * 6.28, r() * 6.28], off: [(r() - 0.5) * (apta ? 0.2 : 0.5), (r() - 0.5) * (apta ? 0.2 : 0.5)]
      };
      const vis = F.minutiae.filter(m => { const [u, v] = toLatent(cand, m.x, m.y); return Math.abs(u) < 0.9 && Math.abs(v) < 0.9 && maskAt(cand, u, v) > 0.6; }).map(m => m.id);
      if (apta ? vis.length >= 15 : vis.length >= 3 && vis.length <= 8) { L = Object.assign(cand, { visible: vis }); break; }
    }
    if (!L) L = { c0: { x: 0, y: 0 }, theta: 0, w: 0.82, rm: 0.64, b: [0, 0], off: [0, 0], visible: F.minutiae.slice(0, apta ? 15 : 6).map(m => m.id) };
    Object.assign(L, { fid, i, P, apta, source, F, seed, label: P.at || 'Latente ' + (i + 1) });
    latents[key] = L;
    return L;
  }
  const visibleCount = L => L.visible.length;

  /* ---------- Dibujo ---------- */
  const imgCache = {};
  function paint(canvas, key, draw) {
    const S = canvas.width, g = canvas.getContext('2d');
    if (!imgCache[key]) {
      const img = g.createImageData(S, S);
      draw(img.data, S);
      imgCache[key] = img;
    }
    g.putImageData(imgCache[key], 0, 0);
    return g;
  }
  function noise2(seed) { const r = rng(seed); const t = new Float32Array(4096); for (let i = 0; i < t.length; i++) t[i] = r(); return (x, y) => t[((y & 63) << 6) | (x & 63)]; }
  /* Ruido suave (interpolado) para manchas y zonas borradas. */
  function smooth2(seed, cell) {
    const n = noise2(seed);
    return (x, y) => {
      const gx = x / cell, gy = y / cell, x0 = Math.floor(gx), y0 = Math.floor(gy), fx = gx - x0, fy = gy - y0;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const a = n(x0, y0) + (n(x0 + 1, y0) - n(x0, y0)) * sx, b = n(x0, y0 + 1) + (n(x0 + 1, y0 + 1) - n(x0, y0 + 1)) * sx;
      return a + (b - a) * sy;
    };
  }

  /* Ficha decadactilar: tinta negra sobre cartulina. */
  function drawCard(canvas, pid, fi) {
    const F = finger(pid, fi);
    return paint(canvas, 'card|' + pid + '|' + fi + '|' + canvas.width, (d, S) => {
      const nz = noise2(hash(pid + fi));
      for (let py = 0; py < S; py++) for (let px = 0; px < S; px++) {
        const u = (px + 0.5) / S * 2 - 1, v = 1 - (py + 0.5) / S * 2;
        const x = u * 0.82, y = v * 0.98 - 0.02;
        let k = 0;
        if (inPrint(x, y)) {
          const edge = 1 - Math.max(0, ((x / 0.74) ** 2 + ((y + 0.02) / 0.92) ** 2 - 0.82) / 0.18);
          k = (0.5 + 0.5 * Math.tanh(Math.sin(phase(F, x, y)) * 2.4)) * (0.55 + 0.45 * edge) * (0.82 + 0.18 * nz(px, py));
        }
        const o = (py * S + px) * 4;
        d[o] = 246 - k * 214; d[o + 1] = 242 - k * 212; d[o + 2] = 232 - k * 206; d[o + 3] = 255;
      }
    });
  }
  /* Latente: polvo oscuro sobre la superficie, parcial y con ruido. */
  function drawLatent(canvas, L) {
    const toF = toFingerFn(L);
    return paint(canvas, 'lat|' + L.seed + '|' + canvas.width, (d, S) => {
      const nz = noise2(L.seed), nz2 = smooth2(L.seed + 7, 14);
      for (let py = 0; py < S; py++) for (let px = 0; px < S; px++) {
        const u = (px + 0.5) / S * 2 - 1, v = 1 - (py + 0.5) / S * 2;
        const [x, y] = toF(u, v);
        let k = 0;
        const m = maskAt(L, u, v);
        if (m > 0 && inPrint(x, y)) {
          const ridge = 0.5 + 0.5 * Math.tanh(Math.sin(phase(L.F, x, y)) * 2);
          const grain = nz(px, py), smear = nz2(px, py);
          const wipe = Math.max(0, Math.min(1, (smear - (L.apta ? 0.12 : 0.3)) / 0.12));
          k = ridge * m * (L.apta ? 0.8 : 0.55) * (0.6 + 0.4 * grain) * (0.2 + 0.8 * wipe);
        }
        const bg = 58 + nz(px * 3, py * 3) * 10;
        const o = (py * S + px) * 4;
        d[o] = bg + k * 150; d[o + 1] = bg + k * 146; d[o + 2] = bg + 4 + k * 136; d[o + 3] = 255;
      }
    });
  }

  /* Coordenadas: canvas (0..S) ↔ espacio de la imagen (-1..1). */
  const toUV = (S, px, py) => [(px / S) * 2 - 1, 1 - (py / S) * 2];
  const fromUV = (S, u, v) => [(u + 1) / 2 * S, (1 - v) / 2 * S];
  const cardToFinger = (u, v) => [u * 0.82, v * 0.98 - 0.02];
  const fingerToCard = (x, y) => [x / 0.82, (y + 0.02) / 0.98];

  /* Punto característico visible de la latente más cercano a un clic (o null). */
  function pickLatent(L, S, px, py) {
    const [u, v] = toUV(S, px, py);
    let best = null, bd = 0.085;
    L.visible.forEach(id => { const m = L.F.minutiae[id]; const [mu, mv] = toLatent(L, m.x, m.y); const dd = Math.hypot(mu - u, mv - v); if (dd < bd) { bd = dd; best = id; } });
    return best;
  }
  function pickCard(pid, fi, S, px, py) {
    const F = finger(pid, fi);
    const [x, y] = cardToFinger(...toUV(S, px, py));
    let best = null, bd = 0.07;
    F.minutiae.forEach(m => { const dd = Math.hypot(m.x - x, m.y - y); if (dd < bd) { bd = dd; best = m.id; } });
    return best;
  }
  function latentPos(L, S, id) { const m = L.F.minutiae[id]; return fromUV(S, ...toLatent(L, m.x, m.y)); }
  function cardPos(pid, fi, S, id) { const m = finger(pid, fi).minutiae[id]; return fromUV(S, ...fingerToCard(m.x, m.y)); }

  E0.prints = { NEED, MAX_BAD, FINGERS, TYPES, finger, latent, visibleCount, drawCard, drawLatent, pickLatent, pickCard, latentPos, cardPos };
})();
