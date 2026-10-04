/* EXPEDIENTE 0 — sonido ambiente generado con Web Audio (sin archivos).
 *   room   sala de interrogatorio: fluorescente, respiración según la tensión, latidos
 *          cuando la tensión es alta y pasos ocasionales en el pasillo
 *   scene  escena: lluvia y algún trueno lejano
 *   lab    laboratorio: zumbido de equipos
 *   office resto del juego: tono de sala muy bajo y lluvia suave
 * El navegador solo deja empezar el audio tras un gesto del jugador. */
(function () {
  let ctx = null, master = null, noise = null, cur = null, wantOn = false;
  const params = { tension: 0 };

  function init() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0; master.connect(ctx.destination);
    const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    noise = buf;
    return true;
  }
  const now = () => ctx.currentTime;
  function noiseSrc() { const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true; s.start(); return s; }
  function filt(type, f, q) { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; if (q) b.Q.value = q; return b; }
  function gain(v) { const g = ctx.createGain(); g.gain.value = v; return g; }
  function chain(...n) { for (let i = 0; i < n.length - 1; i++) n[i].connect(n[i + 1]); return n[n.length - 1]; }

  /* ---------- Escenas ---------- */
  function buildRain(level) {
    const out = gain(0); out.connect(master);
    chain(noiseSrc(), filt('highpass', 400), filt('lowpass', 2600), gain(0.11 * level), out);
    chain(noiseSrc(), filt('lowpass', 500), gain(0.05 * level), out);
    // gotas sueltas
    const drops = setInterval(() => { if (!ctx) return; const s = noiseSrc(), g = gain(0), b = filt('bandpass', 2000 + Math.random() * 3000, 8); chain(s, b, g, out); const t = now(); g.gain.setValueAtTime(0.05 * level * Math.random(), t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05); s.stop(t + 0.08); }, 120);
    const thunder = setInterval(() => { if (!ctx || Math.random() > 0.35) return; const s = noiseSrc(), g = gain(0), b = filt('lowpass', 120); chain(s, b, g, out); const t = now(); g.gain.linearRampToValueAtTime(0.35 * level, t + 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 4.5); s.stop(t + 5); }, 20000);
    return { out, timers: [drops, thunder] };
  }
  function buildHum(level, freq) {
    const out = gain(0); out.connect(master);
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = freq || 100; o1.start();
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = (freq || 100) * 2; o2.start();
    const lp = filt('lowpass', 900);
    chain(o1, gain(0.02 * level), lp, out); chain(o2, gain(0.012 * level), out);
    chain(noiseSrc(), filt('bandpass', 7000, 2), gain(0.006 * level), out);
    return { out, oscs: [o1, o2], humGain: out };
  }
  function buildRoom() {
    const hum = buildHum(1, 100);
    const out = gain(0); out.connect(master);
    // respiración: ruido filtrado con una envolvente que sigue el ritmo de la tensión
    const br = gain(0); chain(noiseSrc(), filt('bandpass', 900, 0.8), br, out);
    let ph = 0;
    const breath = setInterval(() => {
      if (!ctx) return;
      const rate = 0.22 + params.tension * 0.45; // respiraciones por segundo
      ph += rate * 0.05 * Math.PI * 2;
      const v = Math.max(0, Math.sin(ph)) ** 2 * (0.03 + params.tension * 0.06);
      br.gain.setTargetAtTime(v, now(), 0.04);
    }, 50);
    // latidos cuando la tensión es alta
    let nextBeat = 0;
    const heart = setInterval(() => {
      if (!ctx || params.tension < 0.55) return;
      const t = now(); if (t < nextBeat) return;
      const bpm = 70 + params.tension * 60; nextBeat = t + 60 / bpm;
      [0, 0.18].forEach((dt, k) => { const o = ctx.createOscillator(), g = gain(0); o.type = 'sine'; o.frequency.value = k ? 48 : 55; chain(o, g, out); g.gain.setValueAtTime(0, t + dt); g.gain.linearRampToValueAtTime((k ? 0.16 : 0.22) * (params.tension - 0.4), t + dt + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.22); o.start(t + dt); o.stop(t + dt + 0.25); });
    }, 40);
    // pasos en el pasillo
    const steps = setInterval(() => {
      if (!ctx || Math.random() > 0.3) return;
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const n = 4 + Math.floor(Math.random() * 4), dir = Math.random() < 0.5 ? -1 : 1;
      for (let i = 0; i < n; i++) {
        const t = now() + i * 0.55, s = noiseSrc(), g = gain(0), b = filt('lowpass', 260);
        if (pan) { pan.pan.setValueAtTime(dir * (1 - 2 * i / n), t); chain(s, b, g, pan); } else chain(s, b, g, out);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18); s.stop(t + 0.2);
      }
      if (pan) pan.connect(out);
    }, 14000);
    return { out, extra: hum, timers: [breath, heart, steps] };
  }

  function stopScene(sc) {
    if (!sc) return;
    const t = now();
    [sc.out, sc.extra && sc.extra.out].filter(Boolean).forEach(o => { o.gain.cancelScheduledValues(t); o.gain.setTargetAtTime(0, t, 0.4); });
    (sc.timers || []).concat(sc.extra && sc.extra.timers || []).forEach(clearInterval);
    setTimeout(() => { [sc.out, sc.extra && sc.extra.out].filter(Boolean).forEach(o => { try { o.disconnect(); } catch (e) { /* ya desconectado */ } }); (sc.extra && sc.extra.oscs || []).forEach(o => { try { o.stop(); } catch (e) { /* parado */ } }); }, 2500);
  }
  function startScene(name) {
    if (name === 'room') return buildRoom();
    if (name === 'scene') return buildRain(1);
    if (name === 'lab') return buildHum(0.7, 120);
    if (name === 'office') return buildRain(0.35);
    return null;
  }
  function fadeIn(sc) { if (!sc) return; [sc.out, sc.extra && sc.extra.out].filter(Boolean).forEach(o => o.gain.setTargetAtTime(1, now(), 0.6)); }

  /* Llamado tras cada render con la escena que toca. */
  function update(name, p) {
    Object.assign(params, p || {});
    if (!wantOn || !ctx) return;
    if (cur && cur.name === name) return;
    if (cur) stopScene(cur.sc);
    const sc = startScene(name);
    cur = { name, sc };
    fadeIn(sc);
  }
  function setEnabled(on) {
    wantOn = !!on;
    if (!wantOn) { if (ctx) { master.gain.setTargetAtTime(0, now(), 0.3); } return; }
    if (!init()) return;
    if (ctx.state === 'suspended') ctx.resume();
    master.gain.setTargetAtTime(0.9, now(), 0.5);
  }
  /* Primer gesto del jugador: el navegador ya permite sonar. */
  function unlock(on) { if (on) { setEnabled(true); const n = cur && cur.name; cur = null; if (n) update(n); } }
  /* Chisporroteo del fluorescente cuando falla la lámpara de la sala. */
  function flicker() {
    if (!ctx || !wantOn || !cur || cur.name !== 'room') return;
    const t = now(), s = noiseSrc(), g = gain(0), b = filt('bandpass', 3000, 1.5);
    chain(s, b, g, master);
    for (let i = 0; i < 6; i++) { g.gain.setValueAtTime(Math.random() * 0.12, t + i * 0.05); g.gain.setValueAtTime(0, t + i * 0.05 + 0.025); }
    s.stop(t + 0.4);
  }

  E0.audio = { update, setEnabled, unlock, flicker, get scene() { return cur && cur.name; } };
})();
