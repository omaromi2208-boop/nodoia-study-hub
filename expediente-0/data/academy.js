/* EXPEDIENTE 0 — Academia. Cada módulo: lección breve, ejemplo y una evaluación. */
window.E0 = window.E0 || {};

E0.academy = [
  {
    id: 'evidencia',
    area: 'Análisis de evidencia',
    title: 'Lo que una huella puede decir (y lo que no)',
    lesson: 'Una huella dactilar identificada indica que una persona tocó una superficie. Por sí sola no dice cuándo la tocó, ni por qué, ni si estaba presente en el momento del hecho. Su valor depende del contexto: dónde está, si esa persona tenía motivos legítimos para tocar ese objeto y qué otras fuentes la sitúan en el lugar.',
    example: 'Una huella del repartidor en el pomo de la puerta de un piso al que entrega paquetes cada semana tiene un valor muy distinto al de la misma huella en el interior de una caja fuerte.',
    question: 'Aparece la huella de un sospechoso en la manilla interior de la puerta de la víctima. ¿Qué conclusión es defendible?',
    options: [
      'El sospechoso estuvo en la vivienda en algún momento; la huella no fecha esa presencia.',
      'El sospechoso estuvo en la vivienda a la hora de la muerte.',
      'El sospechoso es el autor, porque nadie más dejó huellas en la manilla.'
    ],
    correct: 0,
    explain: 'Las huellas no se pueden fechar con fiabilidad. Sitúan un contacto, no un momento.',
    xp: 40,
    skill: 'atencion'
  },
  {
    id: 'sesgos',
    area: 'Sesgos cognitivos',
    title: 'El sesgo de confirmación',
    lesson: 'Cuando ya tenemos un sospechoso en mente tendemos a buscar, recordar e interpretar la información de forma que confirme esa idea, y a restar peso a lo que la contradice. La defensa más eficaz es formular hipótesis alternativas desde el principio y preguntarse qué dato las descartaría.',
    example: 'Un investigador convencido de la culpabilidad del socio interpreta una llamada corta como "prueba de discusión", cuando el registro solo muestra su duración.',
    question: '¿Qué práctica reduce mejor el sesgo de confirmación?',
    options: [
      'Reunir el máximo de pruebas contra el sospechoso principal antes de considerar a otros.',
      'Mantener al menos una hipótesis alternativa y buscar activamente el dato que descartaría la propia.',
      'Confiar en la primera impresión, que suele ser la correcta.'
    ],
    correct: 1,
    explain: 'Buscar lo que refutaría la hipótesis propia es la forma más directa de compensar el sesgo.',
    xp: 40,
    skill: 'flexibilidad'
  },
  {
    id: 'digital',
    area: 'Investigación digital',
    title: 'Antenas de telefonía: zonas, no puntos',
    lesson: 'Los registros de antenas indican qué estación base dio servicio a un teléfono. Cada antena cubre una zona que puede ir de unos cientos de metros a varios kilómetros. Sitúan el teléfono, no a la persona: un teléfono puede quedarse en casa mientras su titular sale.',
    example: 'Que un móvil conecte con la antena que cubre una calle es compatible con estar en esa calle, pero también en edificios cercanos dentro de la misma zona de cobertura.',
    question: 'El teléfono de una persona permanece toda la noche en la antena de su domicilio. ¿Qué se puede afirmar?',
    options: [
      'Que la persona no salió de casa.',
      'Que el teléfono permaneció en la zona de cobertura de esa antena; no prueba dónde estuvo la persona.',
      'Nada: los registros de antenas no tienen ningún valor.'
    ],
    correct: 1,
    explain: 'El registro ubica el dispositivo dentro de una zona. La presencia de la persona necesita otras fuentes.',
    xp: 40,
    skill: 'espacial'
  },
  {
    id: 'interrogatorio',
    area: 'Interrogatorios',
    title: 'Contradicción no es mentira',
    lesson: 'Una diferencia entre una declaración y un registro objetivo es un dato, no un veredicto. Puede deberse a una mentira, a un error de memoria, a una creencia equivocada o a un registro mal interpretado. Lo profesional es documentar la diferencia y confrontarla, sin presuponer la causa.',
    example: 'Un testigo afirma que oyó un golpe "a las doce menos cuarto" porque acababa una película. Si la película terminó antes, el testigo no miente: se equivoca de referencia.',
    question: 'Un testigo sitúa un ruido a una hora que no encaja con una cámara. ¿Cuál es el siguiente paso más adecuado?',
    options: [
      'Descartar al testigo por mentiroso.',
      'Registrar la diferencia y preguntarle en qué se basa para fijar esa hora.',
      'Ignorar la cámara, porque el testigo estaba allí.'
    ],
    correct: 1,
    explain: 'Confrontar la referencia temporal permite distinguir error, creencia falsa o mentira.',
    xp: 40,
    skill: 'verbal'
  }
];
