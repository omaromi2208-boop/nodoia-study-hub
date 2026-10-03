/* EXPEDIENTE 0 — estado global, guardado en localStorage, exportar/importar. */
(function () {
  const C = E0.config;

  function defaultSkills() {
    const s = {};
    C.skills.forEach(k => { s[k.id] = 40; });
    return s;
  }

  function newGame() {
    return {
      v: C.saveVersion,
      created: Date.now(),
      introSeen: false,
      investigators: { omi: 'Omi', rebe: 'La Rebe' },
      active: 'omi',
      xp: 0,
      money: C.startMoney,
      energy: C.startEnergy,
      reputation: 50,
      jornada: 0,
      week: 1,
      skills: defaultSkills(),
      academy: {},
      notes: [],
      settings: { theme: 'noche', anim: true, scale: 100, sound: false },
      cases: {},
      history: [],
      view: { screen: 'home', caseId: null, tab: 'resumen' }
    };
  }

  function newCaseState(c) {
    return {
      status: 'activo',
      openedAt: Date.now(),
      seq: 0,
      discovered: {},
      examined: {},
      lab: {},
      digital: {},
      judicial: [],
      asked: {},
      confronted: {},
      conflicts: {},
      timeline: [],
      hypotheses: [],
      log: [],
      spent: 0,
      verdict: null,
      evaluation: null,
      trial: null,
      transcripts: {},
      queries: [],
      report: { reconstruccion: '', incertidumbres: '' },
      lastView: {}
    };
  }

  /* Validación estructural mínima de una partida (importada o cargada). */
  function validate(s) {
    if (!s || typeof s !== 'object') return 'El archivo no contiene un objeto de partida.';
    if (s.v !== C.saveVersion) return 'Versión de partida no compatible (se esperaba v' + C.saveVersion + ').';
    const nums = ['xp', 'money', 'energy', 'reputation', 'jornada', 'week'];
    for (const k of nums) if (typeof s[k] !== 'number' || !isFinite(s[k])) return 'Campo numérico inválido: ' + k + '.';
    if (!s.investigators || typeof s.investigators.omi !== 'string' || typeof s.investigators.rebe !== 'string') return 'Faltan los nombres de los investigadores.';
    if (!s.skills || typeof s.skills !== 'object') return 'Faltan las habilidades.';
    if (!Array.isArray(s.notes) || !Array.isArray(s.history)) return 'Notas o historial con formato incorrecto.';
    if (!s.cases || typeof s.cases !== 'object') return 'Falta el progreso de los casos.';
    for (const id of Object.keys(s.cases)) {
      const cs = s.cases[id];
      if (!E0.cases.some(c => c.id === id)) return 'Caso desconocido en la partida: ' + id + '.';
      if (!cs || typeof cs.discovered !== 'object' || !Array.isArray(cs.timeline) || !Array.isArray(cs.hypotheses) || !Array.isArray(cs.log)) return 'Progreso del caso ' + id + ' con formato incorrecto.';
    }
    if (!s.settings || typeof s.settings !== 'object') return 'Faltan los ajustes.';
    return null;
  }

  /* Rellena campos que falten sin pisar los existentes. */
  function normalize(s) {
    const base = newGame();
    for (const k of Object.keys(base)) if (s[k] === undefined) s[k] = base[k];
    s.settings = Object.assign({}, base.settings, s.settings);
    s.skills = Object.assign(defaultSkills(), s.skills);
    s.view = Object.assign({}, base.view, s.view);
    for (const id of Object.keys(s.cases)) {
      const def = newCaseState();
      for (const k of Object.keys(def)) if (s.cases[id][k] === undefined) s.cases[id][k] = def[k];
    }
    return s;
  }

  let saveTimer = null;

  E0.store = {
    state: null,
    storageOk: true,

    load() {
      let raw = null;
      try { raw = localStorage.getItem(C.storageKey); } catch (e) { this.storageOk = false; }
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (!validate(parsed)) { this.state = normalize(parsed); return; }
        } catch (e) { /* partida corrupta: se empieza de cero */ }
      }
      this.state = newGame();
    },

    save() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => this.saveNow(), 150);
    },

    saveNow() {
      clearTimeout(saveTimer);
      try {
        localStorage.setItem(C.storageKey, JSON.stringify(this.state));
        this.storageOk = true;
      } catch (e) { this.storageOk = false; }
    },

    reset() {
      this.state = newGame();
      this.state.introSeen = true;
      this.saveNow();
    },

    exportJSON() {
      return JSON.stringify(this.state, null, 2);
    },

    importJSON(text) {
      let parsed;
      try { parsed = JSON.parse(text); } catch (e) { return 'El texto no es JSON válido.'; }
      const err = validate(parsed);
      if (err) return err;
      this.state = normalize(parsed);
      this.saveNow();
      return null;
    },

    caseState(id) {
      return this.state.cases[id] || null;
    },

    startCase(c) {
      const cs = newCaseState(c);
      this.state.cases[c.id] = cs;
      return cs;
    }
  };
})();
