/* EXPEDIENTE 0 — configuración global (rangos, temas, jornada, habilidades). */
window.E0 = window.E0 || {};

E0.config = {
  saveVersion: 1,
  storageKey: 'expediente0.save.v1',
  startMoney: 600,
  startEnergy: 100,
  jornadasPorSemana: 5,

  ranks: [
    { name: 'Aspirante', xp: 0, salary: 300 },
    { name: 'Auxiliar de investigación', xp: 150, salary: 450 },
    { name: 'Investigador junior', xp: 400, salary: 600 },
    { name: 'Investigador', xp: 800, salary: 800 },
    { name: 'Investigador sénior', xp: 1400, salary: 1000 },
    { name: 'Especialista', xp: 2200, salary: 1250 },
    { name: 'Jefe de investigación', xp: 3200, salary: 1500 }
  ],

  themes: [
    { id: 'noche', name: 'Noche azul' },
    { id: 'grafito', name: 'Grafito' },
    { id: 'carbon', name: 'Carbón' },
    { id: 'operativo', name: 'Verde operativo' },
    { id: 'rojo', name: 'Rojo oscuro' },
    { id: 'cian', name: 'Cian tecnológico' }
  ],

  jornada: [
    { id: 'estudiar', name: 'Estudiar', desc: 'Repasar manuales y jurisprudencia.', energy: -20, xp: 25, money: 0 },
    { id: 'practicar', name: 'Practicar interrogatorios', desc: 'Role-play con compañeros de unidad.', energy: -25, xp: 20, money: 0 },
    { id: 'antiguos', name: 'Analizar casos antiguos', desc: 'Revisar expedientes archivados.', energy: -20, xp: 20, money: 0 },
    { id: 'admin', name: 'Trabajo administrativo', desc: 'Atestados, horas extra y papeleo.', energy: -15, xp: 5, money: 150 },
    { id: 'descanso', name: 'Descansar', desc: 'Recuperar energía para la semana.', energy: 40, xp: 0, money: 0 }
  ],

  skills: [
    { id: 'logica', name: 'Razonamiento lógico' },
    { id: 'deduccion', name: 'Deducción' },
    { id: 'lateral', name: 'Pensamiento lateral' },
    { id: 'memoria', name: 'Memoria' },
    { id: 'verbal', name: 'Análisis verbal' },
    { id: 'temporal', name: 'Análisis temporal' },
    { id: 'espacial', name: 'Análisis espacial' },
    { id: 'incertidumbre', name: 'Gestión de incertidumbre' },
    { id: 'flexibilidad', name: 'Flexibilidad mental' },
    { id: 'contradicciones', name: 'Detección de contradicciones' },
    { id: 'estrategia', name: 'Estrategia' },
    { id: 'atencion', name: 'Atención al detalle' }
  ],

  sources: ['declaración', 'cámara', 'llamada', 'mensaje', 'antena', 'vehículo', 'testigo', 'informe forense', 'dispositivo', 'registro', 'escena', 'laboratorio', 'documento'],

  noteCategories: ['Nota', 'Pregunta', 'Teoría', 'Sospecha', 'Contradicción', 'Conclusión']
};
