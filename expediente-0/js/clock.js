/* EXPEDIENTE 0 — el reloj de la investigación, la prensa y el jefe.
 * Cada acción consume horas (ver HOURS en engine.js). Con el tiempo:
 *   - las grabaciones privadas se sobrescriben (recuperarlas cuesta el doble),
 *   - la memoria de los testigos empeora (rueda de reconocimiento menos fiable),
 *   - el autor puede huir antes de la detención,
 *   - la prensa publica titulares que señalan a alguien (no siempre al culpable),
 *   - el jefe aprieta para que cierres el caso.
 * En modo pesadilla los plazos son la mitad. */
(function () {
  function hash(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  const START = 8; // el caso se abre a las 08:00 del día 1

  function deadlines(cs) {
    const k = cs && cs.nightmare ? 0.5 : 1;
    return { footage: 72 * k, memory: 96 * k, flee: 240 * k, quick: 120 * k };
  }
  function label(cs) {
    const h = START + ((cs && cs.hours) || 0);
    const day = Math.floor(h / 24) + 1, hh = Math.floor(h % 24), mm = Math.round((h % 1) * 60) % 60;
    return 'Día ' + day + ' · ' + String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
  }
  const isFootage = d => /c[aá]mara|grabaci|v[ií]deo/i.test(d.name + ' ' + d.desc);

  /* Titulares: cada uno señala a alguien elegido sin mirar la solución. */
  const HEAD = [
    '«{name}, en el punto de mira de los investigadores», según fuentes cercanas al caso',
    'Los vecinos hablan: «{first} no era trigo limpio»',
    '¿Qué ocultaba {name}? Las preguntas que nadie responde',
    'La familia pide que se investigue a {name}',
    'Exclusiva: la coartada de {first}, en entredicho'
  ];
  const PRESS_AT = [10, 40, 90, 160];
  function press(c, cs) {
    const out = [];
    PRESS_AT.forEach((h, i) => {
      if (((cs && cs.hours) || 0) < h) return;
      const seed = hash(c.id + '|' + (c.variant || '') + '|' + i);
      const p = c.people[seed % c.people.length];
      const t = HEAD[(seed >>> 8) % HEAD.length].replace('{name}', p.name).replace('{first}', p.name.split(' ')[0]);
      out.push({ h, text: t, pid: p.id, medium: ['El Diario Provincial', 'Noticias 24 h', 'La Crónica', 'Radio Comarca'][i % 4] });
    });
    return out;
  }
  /* Persona más señalada por la prensa hasta ahora (para avisar si te dejas llevar). */
  function pressTarget(c, cs) {
    const n = {}; press(c, cs).forEach(x => { n[x.pid] = (n[x.pid] || 0) + 1; });
    const top = Object.keys(n).sort((a, b) => n[b] - n[a])[0];
    return top && n[top] >= 2 ? top : null;
  }
  const BOSS = [
    { h: 24, text: 'El jefe: «Quiero un primer informe esta tarde. ¿Qué tenemos?»' },
    { h: 96, text: 'El jefe: «La prensa nos está comiendo. ¿Para cuándo una detención?»' },
    { h: 168, text: 'El jefe: «Una semana. O cierras esto pronto o se lo paso a otra unidad.»' }
  ];
  function boss(cs) { return BOSS.filter(b => ((cs && cs.hours) || 0) >= b.h); }

  /* Avisos que se disparan al cruzar un umbral entre dos momentos. */
  function crossed(c, cs, h0, h1) {
    const D = deadlines(cs), out = [];
    const at = x => h0 < x && h1 >= x;
    if (at(D.footage)) out.push({ warn: true, text: 'Han pasado ' + D.footage + ' h: las cámaras privadas ya han sobrescrito sus grabaciones. Recuperarlas costará el doble.' });
    if (at(D.memory)) out.push({ warn: true, text: 'La memoria de los testigos empieza a fallar: las ruedas de reconocimiento serán menos fiables.' });
    if (at(D.flee)) out.push({ warn: true, text: 'Una de las personas investigadas ha salido del país. Si es quien lo hizo, la detención se complica.' });
    press(c, Object.assign({}, cs, { hours: h1 })).filter(p => at(p.h)).forEach(p => out.push({ text: p.medium + ': ' + p.text }));
    BOSS.filter(b => at(b.h)).forEach(b => out.push({ warn: true, text: b.text }));
    return out;
  }

  /* Panel para el resumen del caso. */
  function html(c, cs, esc) {
    const D = deadlines(cs), h = (cs && cs.hours) || 0;
    const bar = (name, lim) => { const left = Math.max(0, lim - h); return '<div class="clock-row"><span>' + name + '</span><div class="bar"><i style="width:' + Math.min(100, h / lim * 100) + '%;background:' + (left <= 0 ? 'var(--red)' : left < lim * 0.25 ? 'var(--amber)' : 'var(--accent)') + '"></i></div><span class="mono">' + (left <= 0 ? 'vencido' : Math.ceil(left) + ' h') + '</span></div>'; };
    const P = press(c, cs), B = boss(cs);
    return '<article class="panel stack"><div class="panel-head"><h3>Reloj de la investigación</h3><span class="badge mono">' + label(cs) + (cs && cs.nightmare ? ' · PESADILLA' : '') + '</span></div>' +
      bar('Grabaciones de cámaras privadas', D.footage) + bar('Memoria de los testigos', D.memory) + bar('Riesgo de fuga', D.flee) +
      '<p class="faint" style="font-size:.8rem">Cada diligencia consume tiempo: un análisis de laboratorio, 6 h; una solicitud judicial, 12 h; examinar un objeto, media hora. Cerrar antes de ' + D.quick + ' h tiene premio.</p>' +
      (B.length ? '<div class="boss">' + esc(B[B.length - 1].text) + '</div>' : '') +
      (P.length ? '<div class="sub">Prensa</div><div class="press">' + P.slice().reverse().map(p => '<div class="clip"><small>' + esc(p.medium) + ' · ' + label({ hours: p.h }) + '</small><b>' + esc(p.text) + '</b></div>').join('') + '</div><p class="faint" style="font-size:.78rem">La prensa publica lo que se rumorea, no lo que está probado.</p>' : '') +
      '</article>';
  }

  E0.clock = { deadlines, label, isFootage, press, pressTarget, boss, crossed, html };
})();
