/* EXPEDIENTE 0 — pericias jugables del laboratorio.
 * Un hecho con `pericia: { type, match }` no entra en el expediente hasta que el
 * jugador resuelve la prueba (o paga la pericia automática):
 *   adn        leer el electroferograma: marcar los alelos reales e ignorar los artefactos
 *   neumatico  superponer la banda de rodadura de referencia sobre la marca del arcén
 *   calzado    superponer la suela de referencia sobre la pisada
 *   balistica  girar cada vaina en el microscopio de comparación hasta alinear las marcas
 *   caligrafia comparar letra a letra la nota con las muestras de escritura
 * Todo se genera a partir de identificadores fijos, así que es igual en cada partida. */
(function () {
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const CATALOG = {
    neumatico: [
      { id: 'clio', label: 'Utilitario · 185/65 R15' }, { id: 'turismo', label: 'Turismo · 205/55 R16' },
      { id: 'furgoneta', label: 'Furgoneta comercial · 215/65 R16' }, { id: 'todoterreno', label: 'Todoterreno compacto · 225/65 R17' },
      { id: 'camion', label: 'Camión · 315/80 R22,5' }
    ],
    calzado: [
      { id: 'bota_casa', label: 'Botas de campo de la casa · T43' }, { id: 'bota_seguridad', label: 'Bota de seguridad industrial · T43' },
      { id: 'running', label: 'Zapatilla de running · T44' }, { id: 'zapato', label: 'Zapato de vestir · T42' }, { id: 'zueco', label: 'Zueco de jardín · T39' }
    ]
  };
  const LOCI = [['D3S1358', 12, 19], ['vWA', 13, 21], ['FGA', 18, 27], ['D8S1179', 9, 16], ['D21S11', 26, 33], ['D18S51', 11, 20], ['TH01', 5, 10], ['D13S317', 8, 14]];
  const NAMES = { adn: 'Perfil genético', neumatico: 'Comparativa de neumáticos', calzado: 'Comparativa de calzado', balistica: 'Microscopio de comparación', caligrafia: 'Pericial caligráfica' };

  /* ---------- ADN ---------- */
  function profile(pid) {
    const r = rng(hash('adn|' + pid));
    return LOCI.map(([, lo, hi]) => { const a = lo + Math.floor(r() * (hi - lo + 1)), b = lo + Math.floor(r() * (hi - lo + 1)); return a <= b ? [a, b] : [b, a]; });
  }
  /* Picos de la muestra: alelos reales y tartamudeos (un repetido menos, ~10 % de altura). */
  function adnPeaks(fid, pid) {
    const r = rng(hash('ep|' + fid)), P = profile(pid);
    return P.map((al, li) => {
      const peaks = [];
      const uniq = al[0] === al[1] ? [al[0]] : al;
      uniq.forEach(a => {
        const h = (al[0] === al[1] ? 1700 : 900) * (0.75 + r() * 0.5);
        peaks.push({ allele: a, h, real: true });
        if (a - 1 >= LOCI[li][1] - 1) peaks.push({ allele: a - 1, h: h * (0.07 + r() * 0.07), real: false });
      });
      return peaks;
    });
  }
  function drawAdn(cv, st, peaks) {
    const g = cv.getContext('2d'), W = cv.width, H = cv.height;
    g.fillStyle = '#0d141b'; g.fillRect(0, 0, W, H);
    const pw = W / 4, ph = H / 2;
    LOCI.forEach(([name, lo, hi], li) => {
      const x0 = (li % 4) * pw, y0 = Math.floor(li / 4) * ph;
      const X = a => x0 + 14 + (a - (lo - 1)) / (hi - lo + 2) * (pw - 28), base = y0 + ph - 26;
      g.strokeStyle = '#22303e'; g.strokeRect(x0 + 0.5, y0 + 0.5, pw - 1, ph - 1);
      g.fillStyle = '#8d97a8'; g.font = '600 11px monospace'; g.fillText(name, x0 + 8, y0 + 16);
      g.strokeStyle = '#2d3c4c'; g.beginPath(); g.moveTo(x0 + 10, base); g.lineTo(x0 + pw - 10, base); g.stroke();
      for (let a = lo - 1; a <= hi + 1; a++) { g.fillStyle = '#4b5a6a'; g.fillRect(X(a), base, 1, 4); }
      // trazo con picos gaussianos y algo de ruido de línea base
      const maxH = 2000, scale = (ph - 52) / maxH;
      g.strokeStyle = '#5fd3df'; g.lineWidth = 1.4; g.beginPath();
      for (let px = x0 + 10; px <= x0 + pw - 10; px++) {
        let v = 18 + 10 * Math.sin(px * 0.7 + li) * Math.sin(px * 0.13);
        peaks[li].forEach(p => { const d = (px - X(p.allele)) / 3.2; v += p.h * Math.exp(-d * d); });
        const y = base - v * scale;
        if (px === x0 + 10) g.moveTo(px, y); else g.lineTo(px, y);
      }
      g.stroke();
      const marks = (st.marks && st.marks[li]) || [];
      marks.forEach(a => {
        const p = peaks[li].find(q => q.allele === a); if (!p) return;
        const y = base - p.h * scale;
        g.fillStyle = '#e7ae4b'; g.fillRect(X(a) - 13, Math.max(y0 + 20, y - 22), 26, 15);
        g.fillStyle = '#111'; g.font = '700 11px monospace'; g.textAlign = 'center'; g.fillText(String(a), X(a), Math.max(y0 + 31, y - 11)); g.textAlign = 'left';
      });
    });
  }
  function adnClick(cv, st, peaks, px, py) {
    const pw = cv.width / 4, ph = cv.height / 2;
    const li = Math.floor(px / pw) + 4 * Math.floor(py / ph);
    if (li < 0 || li > 7) return null;
    const [, lo, hi] = LOCI[li], x0 = (li % 4) * pw;
    const X = a => x0 + 14 + (a - (lo - 1)) / (hi - lo + 2) * (pw - 28);
    const p = peaks[li].slice().sort((a, b) => Math.abs(X(a.allele) - px) - Math.abs(X(b.allele) - px))[0];
    if (!p || Math.abs(X(p.allele) - px) > 9) return null;
    st.marks = st.marks || {};
    const m = st.marks[li] = st.marks[li] || [];
    const i = m.indexOf(p.allele);
    if (i >= 0) m.splice(i, 1); else m.push(p.allele);
    m.sort((a, b) => a - b);
    return true;
  }

  /* ---------- Huellas de impresión: neumáticos y calzado ---------- */
  function treadShapes(kind, id) {
    const r = rng(hash(kind + '|' + id)), out = [];
    if (kind === 'neumatico') {
      const widths = { clio: 0.62, turismo: 0.7, furgoneta: 0.74, todoterreno: 0.8, camion: 1.0 };
      const w = widths[id] || 0.7, style = hash(id) % 3, pitch = 0.16 + r() * 0.06;
      out.push({ t: 'band', w });
      for (let y = -1.2; y < 1.2; y += pitch) {
        if (style === 0) { out.push({ t: 'line', x1: -w / 2, y1: y, x2: 0, y2: y + pitch * 0.5, lw: 0.05 }); out.push({ t: 'line', x1: 0, y1: y + pitch * 0.5, x2: w / 2, y2: y, lw: 0.05 }); }
        else if (style === 1) { for (let k = 0; k < 4; k++) out.push({ t: 'rect', x: -w / 2 + (k + 0.15) * w / 4, y: y + (k % 2) * pitch * 0.4, w: w / 4 * 0.7, h: pitch * 0.45 }); }
        else { out.push({ t: 'line', x1: -w / 2, y1: y, x2: w / 2, y2: y + pitch * 0.9, lw: 0.04 }); out.push({ t: 'rect', x: -0.04, y: y, w: 0.08, h: pitch * 0.6 }); }
      }
      out.push({ t: 'gap', x: -w * 0.18 }, { t: 'gap', x: w * 0.18 });
    } else {
      const len = { zueco: 0.78, zapato: 0.86, bota_casa: 0.9, bota_seguridad: 0.9, running: 0.94 }[id] || 0.88;
      out.push({ t: 'sole', len });
      const style = hash(id) % 4;
      for (let y = -len; y < len; y += 0.12) {
        for (let x = -0.36; x <= 0.36; x += 0.12) {
          const jx = x + (r() - 0.5) * 0.02, jy = y + (r() - 0.5) * 0.02;
          if (style === 0) out.push({ t: 'rect', x: jx - 0.04, y: jy - 0.03, w: 0.08, h: 0.05 });
          else if (style === 1) out.push({ t: 'dot', x: jx, y: jy, r: 0.035 });
          else if (style === 2) out.push({ t: 'line', x1: jx - 0.05, y1: jy - 0.03, x2: jx + 0.05, y2: jy + 0.03, lw: 0.025 });
          else out.push({ t: 'line', x1: jx - 0.05, y1: jy + 0.03, x2: jx + 0.05, y2: jy - 0.03, lw: 0.03 });
        }
      }
      if (style === 3) out.push({ t: 'logo' });
    }
    return out;
  }
  function drawShapes(g, shapes, kind, S, tr, color, alpha) {
    g.save();
    g.translate(S / 2 + tr.x * S / 2, S / 2 + tr.y * S / 2);
    g.rotate(tr.a);
    const k = S / 2.6;
    g.globalAlpha = alpha; g.fillStyle = color; g.strokeStyle = color;
    shapes.forEach(s => {
      if (s.t === 'band') { g.globalAlpha = alpha * 0.25; g.fillRect(-s.w / 2 * k, -1.2 * k, s.w * k, 2.4 * k); g.globalAlpha = alpha; }
      else if (s.t === 'sole') { g.globalAlpha = alpha * 0.25; g.beginPath(); g.ellipse(0, -s.len * 0.35 * k, 0.4 * k, s.len * 0.62 * k, 0, 0, Math.PI * 2); g.ellipse(0, s.len * 0.62 * k, 0.3 * k, s.len * 0.38 * k, 0, 0, Math.PI * 2); g.fill(); g.globalAlpha = alpha; }
      else if (s.t === 'rect') g.fillRect(s.x * k, s.y * k, s.w * k, s.h * k);
      else if (s.t === 'dot') { g.beginPath(); g.arc(s.x * k, s.y * k, s.r * k, 0, Math.PI * 2); g.fill(); }
      else if (s.t === 'line') { g.lineWidth = s.lw * k; g.beginPath(); g.moveTo(s.x1 * k, s.y1 * k); g.lineTo(s.x2 * k, s.y2 * k); g.stroke(); }
      else if (s.t === 'gap') { g.globalCompositeOperation = 'destination-out'; g.fillRect((s.x - 0.015) * k, -1.2 * k, 0.03 * k, 2.4 * k); g.globalCompositeOperation = 'source-over'; }
      else if (s.t === 'logo') { g.lineWidth = 0.02 * k; g.beginPath(); g.arc(0, 0.62 * k, 0.12 * k, 0, Math.PI * 2); g.stroke(); }
    });
    g.restore();
  }
  function scenePose(fid) { const r = rng(hash('pose|' + fid)); return { x: (r() - 0.5) * 0.4, y: (r() - 0.5) * 0.3, a: (r() - 0.5) * 1.6 }; }
  function drawImpression(cv, kind, fid, match, st) {
    const g = cv.getContext('2d'), S = cv.width;
    // barro o tierra
    g.fillStyle = kind === 'neumatico' ? '#5a4c3c' : '#4e4232'; g.fillRect(0, 0, S, S);
    const r = rng(hash('mud|' + fid));
    for (let i = 0; i < 900; i++) { g.fillStyle = 'rgba(' + (r() < 0.5 ? '20,14,8' : '140,120,96') + ',' + (r() * 0.25) + ')'; g.fillRect(r() * S, r() * S, 2 + r() * 3, 2 + r() * 3); }
    // impresión real (más oscura), parcial
    const off = document.createElement('canvas'); off.width = off.height = S;
    const og = off.getContext('2d');
    drawShapes(og, treadShapes(kind, match), kind, S, scenePose(fid), '#1c140c', 0.85);
    og.globalCompositeOperation = 'destination-in';
    const gr = og.createRadialGradient(S * 0.5, S * 0.5, S * 0.12, S * 0.5, S * 0.5, S * 0.48);
    gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(0.8, 'rgba(0,0,0,.7)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    og.fillStyle = gr; og.fillRect(0, 0, S, S);
    g.drawImage(off, 0, 0);
    // superposición del candidato elegido
    if (st.cand) drawShapes(g, treadShapes(kind, st.cand), kind, S, st.pose || { x: 0, y: 0, a: 0 }, '#5fd3df', 0.45);
  }
  function alignment(fid, st) {
    const t = scenePose(fid), p = st.pose || { x: 0, y: 0, a: 0 };
    let da = Math.abs(p.a - t.a) % (Math.PI * 2); if (da > Math.PI) da = Math.PI * 2 - da;
    return { da: da * 180 / Math.PI, d: Math.hypot(p.x - t.x, p.y - t.y) };
  }

  /* ---------- Balística: microscopio de comparación ---------- */
  function casingMarks(seed) {
    const r = rng(seed), out = [];
    for (let i = 0; i < 26; i++) out.push({ a: r() * Math.PI * 2, r0: 0.18 + r() * 0.5, len: 0.08 + r() * 0.25, w: 0.6 + r() * 1.8 });
    return { lines: out, pin: { x: (r() - 0.5) * 0.08, y: (r() - 0.5) * 0.08, r: 0.13 + r() * 0.03 } };
  }
  const CASINGS = 5;
  function casingRot(fid, k) { return k === 0 ? 0 : (rng(hash('rot|' + fid + k))() * 300 + 30) * Math.PI / 180; }
  function drawCasing(cv, fid, k, userRot, half) {
    const g = cv.getContext('2d'), S = cv.height, W = cv.width;
    const cx = half === 'L' ? W * 0.25 : W * 0.75, cy = S / 2, R = Math.min(W / 4, S / 2) - 10;
    const marks = casingMarks(hash('arma|' + fid)), noise = rng(hash('cas|' + fid + k));
    g.save(); g.beginPath(); g.rect(half === 'L' ? 0 : W / 2, 0, W / 2, S); g.clip();
    const bg = g.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.05);
    bg.addColorStop(0, '#d8b46a'); bg.addColorStop(0.75, '#a9813e'); bg.addColorStop(1, '#3a2a12');
    g.fillStyle = '#05070a'; g.fillRect(half === 'L' ? 0 : W / 2, 0, W / 2, S);
    g.fillStyle = bg; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill();
    g.translate(cx, cy); g.rotate(casingRot(fid, k) + userRot);
    // pistón (fulminante) con las marcas del arma
    g.fillStyle = '#b9a173'; g.beginPath(); g.arc(0, 0, R * 0.62, 0, Math.PI * 2); g.fill();
    g.strokeStyle = 'rgba(40,28,10,.85)';
    marks.lines.forEach(m => { g.lineWidth = m.w; g.beginPath(); g.moveTo(Math.cos(m.a) * m.r0 * R, Math.sin(m.a) * m.r0 * R); g.lineTo(Math.cos(m.a) * (m.r0 + m.len) * R, Math.sin(m.a) * (m.r0 + m.len) * R * 0.98); g.stroke(); });
    for (let i = 0; i < 10; i++) { g.lineWidth = 0.5; g.strokeStyle = 'rgba(40,28,10,.35)'; const a = noise() * 6.28, r0 = noise() * 0.5; g.beginPath(); g.moveTo(Math.cos(a) * r0 * R, Math.sin(a) * r0 * R); g.lineTo(Math.cos(a) * (r0 + 0.1) * R, Math.sin(a) * (r0 + 0.1) * R); g.stroke(); }
    const pg = g.createRadialGradient(marks.pin.x * R, marks.pin.y * R, 1, marks.pin.x * R, marks.pin.y * R, marks.pin.r * R);
    pg.addColorStop(0, '#2a1e0c'); pg.addColorStop(1, '#8a7346');
    g.fillStyle = pg; g.beginPath(); g.arc(marks.pin.x * R, marks.pin.y * R, marks.pin.r * R, 0, Math.PI * 2); g.fill();
    g.restore();
  }
  function casingAligned(fid, k, userRot) {
    let d = (casingRot(fid, k) + userRot) % (Math.PI * 2); if (d < 0) d += Math.PI * 2;
    if (d > Math.PI) d = Math.PI * 2 - d;
    return d * 180 / Math.PI;
  }

  /* ---------- Caligrafía ---------- */
  const LETTERS = ['a', 'd', 'g', 'r', 't', 's'];
  function hand(pid) {
    const r = rng(hash('mano|' + pid));
    return { v: LETTERS.map(() => Math.floor(r() * 3)), slant: (r() * 30 - 8) * Math.PI / 180, lw: 2.2 + r() * 1.8 };
  }
  /* El autor real coincide con la nota en todo; el resto difiere al menos en dos letras. */
  function handFor(pid, writer) {
    const h = hand(pid);
    if (pid === writer) return h;
    const w = hand(writer), out = { v: h.v.slice(), slant: h.slant, lw: h.lw };
    let diff = out.v.filter((x, i) => x !== w.v[i]).length;
    for (let i = 0; diff < 2 && i < LETTERS.length; i++) if (out.v[i] === w.v[i]) { out.v[i] = (out.v[i] + 1) % 3; diff++; }
    return out;
  }
  function glyph(g, L, v) {
    g.beginPath();
    if (L === 'a') {
      if (v === 0) { g.ellipse(0, 6, 9, 9, 0, 0, Math.PI * 2); g.moveTo(9, -3); g.lineTo(9, 16); }
      else if (v === 1) { g.moveTo(-7, -4); g.quadraticCurveTo(0, -12, 7, -4); g.lineTo(7, 15); g.moveTo(7, 4); g.quadraticCurveTo(-12, 0, -6, 13); g.quadraticCurveTo(2, 18, 7, 10); }
      else { g.ellipse(-1, 6, 8, 9, 0, 0, Math.PI * 2); g.moveTo(7, 0); g.quadraticCurveTo(10, 14, 15, 16); }
    } else if (L === 'd') {
      g.ellipse(-2, 7, 8, 8, 0, 0, Math.PI * 2);
      if (v === 0) { g.moveTo(6, -18); g.lineTo(6, 16); }
      else if (v === 1) { g.moveTo(6, 16); g.lineTo(6, -12); g.quadraticCurveTo(6, -20, 0, -16); g.quadraticCurveTo(-4, -10, 6, -4); }
      else { g.moveTo(6, 16); g.lineTo(6, -14); g.quadraticCurveTo(2, -22, -8, -16); }
    } else if (L === 'g') {
      g.ellipse(0, 0, 8, 8, 0, 0, Math.PI * 2);
      if (v === 0) { g.moveTo(8, -6); g.lineTo(8, 18); g.quadraticCurveTo(6, 26, -6, 22); }
      else if (v === 1) { g.moveTo(8, -6); g.lineTo(8, 16); g.bezierCurveTo(8, 30, -12, 28, -4, 18); g.lineTo(8, 14); }
      else { g.moveTo(0, 8); g.ellipse(0, 18, 9, 6, 0, -Math.PI / 2, Math.PI * 1.5); g.moveTo(6, -6); g.lineTo(11, -9); }
    } else if (L === 'r') {
      if (v === 0) { g.moveTo(-5, -6); g.lineTo(-5, 15); g.moveTo(-5, 2); g.quadraticCurveTo(0, -8, 8, -4); }
      else if (v === 1) { g.moveTo(-5, -6); g.lineTo(-5, 15); g.moveTo(-5, -2); g.lineTo(9, -6); g.moveTo(-9, 15); g.lineTo(-1, 15); }
      else { g.moveTo(-8, 15); g.quadraticCurveTo(-6, -2, -4, -6); g.lineTo(2, -2); g.quadraticCurveTo(4, 8, 10, 15); }
    } else if (L === 't') {
      g.moveTo(0, -18); g.lineTo(0, 12);
      if (v === 0) { g.moveTo(-9, -10); g.lineTo(9, -10); }
      else if (v === 1) { g.moveTo(-5, -2); g.lineTo(6, -2); }
      else { g.moveTo(-9, -8); g.lineTo(9, -8); g.moveTo(0, 12); g.quadraticCurveTo(2, 18, 9, 14); }
    } else if (L === 's') {
      if (v === 0) { g.moveTo(7, -6); g.quadraticCurveTo(-10, -10, -6, 2); g.quadraticCurveTo(10, 8, 4, 14); g.quadraticCurveTo(-4, 18, -9, 12); }
      else if (v === 1) { g.moveTo(-12, 14); g.lineTo(-2, -6); g.quadraticCurveTo(8, 6, 0, 14); g.lineTo(-6, 12); }
      else { g.moveTo(7, -6); g.lineTo(-6, -2); g.lineTo(6, 8); g.lineTo(-7, 14); }
    }
    g.stroke();
  }
  function drawLetter(cv, L, h, ink, paper) {
    const g = cv.getContext('2d'), S = cv.width;
    g.fillStyle = paper; g.fillRect(0, 0, S, S);
    g.strokeStyle = 'rgba(80,110,160,.25)'; g.lineWidth = 1; g.beginPath(); g.moveTo(0, S * 0.72); g.lineTo(S, S * 0.72); g.stroke();
    g.save(); g.translate(S / 2, S / 2 + 2); g.transform(1, 0, -Math.tan(h.slant), 1, 0, 0); g.scale(S / 64, S / 64);
    g.strokeStyle = ink; g.lineWidth = h.lw; g.lineCap = 'round'; g.lineJoin = 'round';
    glyph(g, L, h.v[LETTERS.indexOf(L)]);
    g.restore();
  }

  /* ---------- Interfaz ---------- */
  function candidates(c, P) {
    if (P.type === 'neumatico' || P.type === 'calzado') return CATALOG[P.type];
    if (P.type === 'caligrafia') return E0.engine.cardPeople(c).map(p => ({ id: p.id, label: p.name }));
    return [];
  }
  function html(c, cs, fid) {
    const P = c.facts[fid].pericia, st = cs.pericias[fid];
    const done = st.status !== 'pendiente';
    let body = '';
    if (P.type === 'adn') {
      body = '<canvas class="per-cv wide" width="880" height="300" data-act="per-adn" aria-label="Electroferograma"></canvas>' +
        '<div class="row"><button class="btn small primary" data-act="per-adn-compare"' + (done ? ' disabled' : '') + '>Comparar con los perfiles de referencia</button><button class="btn small ghost" data-act="per-adn-clear"' + (done ? ' disabled' : '') + '>Borrar marcas</button></div>' +
        '<p class="muted" style="font-size:.86rem">Toca los picos para marcar los alelos de cada marcador. Cuidado con los picos pequeños justo a la izquierda de uno grande: son tartamudeos del análisis, no alelos. Una persona tiene uno o dos alelos por marcador.</p>';
    } else if (P.type === 'neumatico' || P.type === 'calzado') {
      body = '<div class="per-row"><canvas class="per-cv" width="360" height="360" data-act="per-drag" aria-label="Impresión y referencia superpuesta"></canvas><div class="stack" style="gap:8px;min-width:0">' +
        '<div class="sub">Referencias del laboratorio</div><div class="cand-list">' + candidates(c, P).map(k => '<button class="cand" data-act="per-cand" data-id="' + k.id + '" aria-pressed="' + (st.cand === k.id) + '">' + esc(k.label) + '</button>').join('') + '</div>' +
        (st.cand ? '<label class="field">Giro<input type="range" min="-180" max="180" step="1" value="' + Math.round(((st.pose && st.pose.a) || 0) * 180 / Math.PI) + '" data-act="per-rot"></label><p class="faint" style="font-size:.8rem">Arrastra sobre la imagen para mover la referencia y usa el giro para orientarla.</p>' +
          '<div class="row"><button class="btn small primary" data-act="per-conclude"' + (done ? ' disabled' : '') + '>Concluir: coincide</button></div>' : '<p class="muted" style="font-size:.86rem">Elige una referencia para superponerla sobre la impresión.</p>') + '</div></div>';
    } else if (P.type === 'balistica') {
      const k = st.k || 1;
      body = '<div class="sub">Vaina 1 (izquierda) frente a vaina ' + (k + 1) + ' (derecha)</div><canvas class="per-cv wide" width="720" height="340" data-act="per-none" aria-label="Microscopio de comparación"></canvas>' +
        '<div class="row">' + Array.from({ length: CASINGS - 1 }, (_, i) => '<button class="cand" data-act="per-casing" data-id="' + (i + 1) + '" aria-pressed="' + (k === i + 1) + '">Vaina ' + (i + 2) + ((st.ok || []).includes(i + 1) ? ' ✓' : '') + '</button>').join('') + '</div>' +
        '<label class="field">Giro de la vaina de la derecha<input type="range" min="0" max="359" step="1" value="' + Math.round((st.rot && st.rot[k]) || 0) + '" data-act="per-crot"></label>' +
        '<div class="row"><button class="btn small primary" data-act="per-match"' + (done || (st.ok || []).includes(k) ? ' disabled' : '') + '>Las marcas coinciden</button></div>' +
        '<p class="muted" style="font-size:.86rem">Gira la vaina de la derecha hasta que las marcas del percutor y las estrías del pistón coincidan con las de la izquierda. Confirma cada una de las cuatro.</p>';
    } else if (P.type === 'caligrafia') {
      const cand = st.cand;
      body = '<div class="sub">Letras de la nota dubitada</div><div class="letters">' + LETTERS.map(L => '<canvas width="72" height="72" data-letter="Q|' + L + '"></canvas>').join('') + '</div>' +
        '<div class="sub">Muestras de escritura</div><div class="cand-list">' + candidates(c, P).map(k => '<button class="cand" data-act="per-cand" data-id="' + k.id + '" aria-pressed="' + (cand === k.id) + '">' + esc(k.label) + ((st.out || []).includes(k.id) ? ' ✕' : '') + '</button>').join('') + '</div>' +
        (cand ? '<div class="letters">' + LETTERS.map(L => '<div class="letter-pair"><canvas width="72" height="72" data-letter="' + cand + '|' + L + '"></canvas><div class="row"><button class="btn small' + ((st.ans || {})[cand + L] === 'eq' ? ' primary' : '') + '" data-act="per-letter" data-id="' + L + '" data-v="eq">Igual</button><button class="btn small' + ((st.ans || {})[cand + L] === 'ne' ? ' primary' : '') + '" data-act="per-letter" data-id="' + L + '" data-v="ne">Distinta</button></div></div>').join('') + '</div>' : '') +
        '<p class="muted" style="font-size:.86rem">Compara cada letra de la nota con la misma letra de la muestra: forma del trazo, enlaces y remates. Para atribuir la nota, todas deben ser iguales. Para descartar a alguien basta con señalar bien una diferencia.</p>';
    }
    return '<div class="pericia"><div class="sub">' + esc(NAMES[P.type]) + ' · ' + esc(c.facts[fid].pericia.label || '') + '</div>' + body +
      (done ? '<div class="result"><b>Pericia concluida.</b> El resultado ya está en el expediente.</div>' : '') + '</div>';
  }
  function draw(c, cs, fid) {
    const P = c.facts[fid].pericia, st = cs.pericias[fid];
    const cv = document.querySelector('.pericia canvas.per-cv');
    if (P.type === 'adn' && cv) drawAdn(cv, st, adnPeaks(fid, P.match));
    if ((P.type === 'neumatico' || P.type === 'calzado') && cv) drawImpression(cv, P.type, fid, P.match, st);
    if (P.type === 'balistica' && cv) { const k = st.k || 1; drawCasing(cv, fid, 0, 0, 'L'); drawCasing(cv, fid, k, ((st.rot && st.rot[k]) || 0) * Math.PI / 180, 'R'); const g = cv.getContext('2d'); g.fillStyle = '#5fd3df'; g.fillRect(cv.width / 2 - 1, 0, 2, cv.height); }
    if (P.type === 'caligrafia') document.querySelectorAll('canvas[data-letter]').forEach(lc => {
      const [who, L] = lc.dataset.letter.split('|');
      drawLetter(lc, L, who === 'Q' ? hand(P.match) : handFor(who, P.match), who === 'Q' ? '#1d2c6b' : '#1a1a1a', who === 'Q' ? '#efe9d6' : '#f6f4ee');
    });
  }

  /* Acciones. Devuelve { solved, msg, warn } o null. */
  function act(c, cs, fid, name, el, e) {
    const P = c.facts[fid].pericia, st = cs.pericias[fid];
    if (st.status !== 'pendiente') return null;
    if (name === 'per-adn') {
      const r = el.getBoundingClientRect();
      const ok = adnClick(el, st, adnPeaks(fid, P.match), (e.clientX - r.left) / r.width * el.width, (e.clientY - r.top) / r.height * el.height);
      return ok ? {} : { msg: 'Toca justo encima de un pico.', warn: true };
    }
    if (name === 'per-adn-clear') { st.marks = {}; return {}; }
    if (name === 'per-adn-compare') {
      const marks = LOCI.map((_, i) => ((st.marks || {})[i] || []).slice().sort((a, b) => a - b));
      if (marks.some(m => !m.length)) return { msg: 'Faltan marcadores sin alelos marcados.', warn: true };
      const people = E0.engine.cardPeople(c);
      const hit = people.find(p => profile(p.id).every((al, i) => { const u = al[0] === al[1] ? [al[0]] : al; return u.length === marks[i].length && u.every((a, j) => a === marks[i][j]); }));
      if (hit) { st.status = 'resuelta'; st.result = hit.id; return { solved: true, msg: 'Coincidencia en los ocho marcadores con el perfil de ' + hit.name + '.' }; }
      const stutter = adnPeaks(fid, P.match).some((pk, i) => pk.some(q => !q.real && marks[i].includes(q.allele)));
      return { msg: stutter ? 'Ningún perfil coincide. Has marcado algún pico pequeño que parece un tartamudeo.' : 'Ningún perfil coincide. Revisa los alelos marcados.', warn: true };
    }
    if (name === 'per-cand') { st.cand = el.dataset.id; if (!st.pose) st.pose = { x: 0, y: 0, a: 0 }; return {}; }
    if (name === 'per-conclude') {
      const al = alignment(fid, st);
      if (st.cand !== P.match) return { msg: 'Al superponerlas, el dibujo y el tamaño no encajan con esta referencia.', warn: true };
      if (al.da > 8 || al.d > 0.07) return { msg: 'Puede encajar, pero aún no está bien alineada: ajusta el giro y la posición.', warn: true };
      st.status = 'resuelta'; st.result = P.match;
      return { solved: true, msg: 'Coinciden dibujo, dimensiones y desgaste con la referencia.' };
    }
    if (name === 'per-casing') { st.k = +el.dataset.id; return {}; }
    if (name === 'per-match') {
      const k = st.k || 1, rot = ((st.rot && st.rot[k]) || 0) * Math.PI / 180;
      if (casingAligned(fid, k, rot) > 6) return { msg: 'Las marcas aún no coinciden: sigue girando la vaina.', warn: true };
      st.ok = (st.ok || []).concat([k]);
      if (st.ok.length >= CASINGS - 1) { st.status = 'resuelta'; return { solved: true, msg: 'Las cinco vainas fueron percutidas por la misma arma.' }; }
      const next = [1, 2, 3, 4].find(x => !st.ok.includes(x)); st.k = next;
      return { msg: 'Coinciden. Pasa a la vaina ' + (next + 1) + '.' };
    }
    if (name === 'per-letter') {
      const cand = st.cand; if (!cand) return null;
      const L = el.dataset.id, v = el.dataset.v;
      const same = handFor(cand, P.match).v[LETTERS.indexOf(L)] === hand(P.match).v[LETTERS.indexOf(L)];
      if ((v === 'eq') !== same) return { msg: 'Fíjate otra vez en la «' + L + '»: compara el trazo y los remates.', warn: true };
      st.ans = st.ans || {}; st.ans[cand + L] = v;
      if (v === 'ne') { st.out = (st.out || []).concat(st.out && st.out.includes(cand) ? [] : [cand]); return { msg: 'Diferencia real en la «' + L + '»: la nota no es de esta persona.' }; }
      if (LETTERS.every(x => st.ans[cand + x] === 'eq')) { st.status = 'resuelta'; st.result = cand; return { solved: true, msg: 'Todas las letras coinciden con la muestra.' }; }
      return {};
    }
    return null;
  }
  /* Arrastre y giro de la referencia superpuesta (sin re-render: dibuja directamente). */
  function dragTo(c, cs, fid, el, dx, dy) {
    const st = cs.pericias[fid]; if (!st.cand) return;
    const r = el.getBoundingClientRect();
    st.pose.x = Math.max(-0.9, Math.min(0.9, st.pose.x + dx / r.width * 2));
    st.pose.y = Math.max(-0.9, Math.min(0.9, st.pose.y + dy / r.height * 2));
    draw(c, cs, fid);
  }
  function setRot(c, cs, fid, deg, which) {
    const st = cs.pericias[fid];
    if (which === 'casing') { st.rot = st.rot || {}; st.rot[st.k || 1] = deg; }
    else if (st.pose) st.pose.a = deg * Math.PI / 180;
    draw(c, cs, fid);
  }
  function autoSolve(c, cs, fid) { const st = cs.pericias[fid]; st.status = 'resuelta'; st.result = c.facts[fid].pericia.match; st.auto = true; }

  E0.pericias = { NAMES, html, draw, act, dragTo, setRot, autoSolve, profile, test: { scenePose, casingRot, adnPeaks, hand, handFor, LETTERS } };
})();
