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
  },
  {
    id: 'criminologia',
    area: 'Criminología',
    title: 'Móvil, oportunidad y medios',
    lesson: 'Explicar un delito exige más que un móvil. Muchas personas pueden tener razones para desear un resultado; pocas tienen a la vez la oportunidad (estar donde y cuando ocurrió) y los medios (acceso, conocimiento, herramienta). Un móvil fuerte sin oportunidad acreditada es solo una línea de investigación.',
    example: 'Un heredero con deudas tiene un móvil claro, pero si una cámara le sitúa a kilómetros durante toda la franja de la muerte, el móvil pierde peso explicativo.',
    question: '¿Qué combinación sostiene mejor una hipótesis de autoría?',
    options: [
      'Un móvil económico muy fuerte, aunque no se sepa dónde estaba la persona.',
      'Móvil, oportunidad acreditada por fuentes independientes y acceso a los medios.',
      'Que la persona haya mentido en algún punto de su declaración.'
    ],
    correct: 1,
    explain: 'La mentira o el móvil aislados no bastan; la oportunidad acreditada es lo que conecta a una persona con el hecho.',
    xp: 40,
    skill: 'logica'
  },
  {
    id: 'criminalistica',
    area: 'Criminalística',
    title: 'La escena habla de lo que falta',
    lesson: 'En la inspección ocular importa tanto lo que hay como lo que falta o no encaja: un hueco en una estantería, una anilla vacía en un llavero, un objeto colocado con demasiado orden. Las ausencias se documentan igual que los hallazgos, con fotografía y descripción.',
    example: 'Una zapatilla junto a una barandilla con los cordones atados con doble nudo es difícil de perder en una caída: invita a preguntarse cómo llegó allí.',
    question: 'En una escena falta un objeto que el resto de la decoración hace esperar. ¿Qué haces?',
    options: [
      'Ignorarlo: solo se documenta lo que se encuentra.',
      'Documentar la ausencia y la huella que deja (marca, hueco) y valorarla como posible indicio.',
      'Concluir que el autor se llevó el arma del crimen.'
    ],
    correct: 1,
    explain: 'Una ausencia documentada es un dato; atribuirle un significado concreto es una hipótesis que hay que contrastar.',
    xp: 40,
    skill: 'atencion'
  },
  {
    id: 'derecho',
    area: 'Derecho y procedimiento',
    title: 'Presunción de inocencia y carga de la prueba',
    lesson: 'La Constitución Española reconoce el derecho a la presunción de inocencia (artículo 24.2). En la práctica, quien acusa debe probar los hechos; la persona investigada no tiene que demostrar su inocencia. Una investigación profesional trata a las personas como "de interés", no como culpables, hasta que la prueba lo sostenga. Contenido educativo interno: consulta las fuentes oficiales de la biblioteca jurídica y no lo uses como asesoramiento.',
    example: 'Que un sospechoso no recuerde dónde estaba a una hora concreta no prueba nada contra él; la acusación necesita datos que le sitúen allí.',
    question: 'Un investigado no puede justificar dónde estuvo entre las 23:00 y las 23:30. ¿Qué se deduce?',
    options: [
      'Que estuvo en la escena del crimen.',
      'Nada concluyente: la carga de probar su presencia recae en la acusación.',
      'Que debe ser detenido hasta que lo justifique.'
    ],
    correct: 1,
    explain: 'La falta de coartada no equivale a prueba de presencia.',
    xp: 40,
    skill: 'incertidumbre'
  },
  {
    id: 'laboratorio',
    area: 'Laboratorio forense',
    title: 'Individualizar o asociar',
    lesson: 'Algunas técnicas pueden individualizar (un perfil de ADN nuclear completo, una huella con suficientes puntos coincidentes) y otras solo asocian a un grupo (una fibra de lana común, un neumático de medida habitual). Un buen informe dice exactamente cuál de las dos cosas permite el resultado.',
    example: '"La fibra es compatible con un abrigo gris" no equivale a "la fibra es del abrigo de X". Un cabello sin raíz no permite ADN nuclear.',
    question: 'El laboratorio informa: "neumático 215/65 R16, habitual en furgonetas comerciales". ¿Qué afirmación es correcta?',
    options: [
      'La huella pertenece a la furgoneta del sospechoso.',
      'La huella es compatible con muchos vehículos, entre ellos la furgoneta del sospechoso.',
      'La huella descarta cualquier turismo.'
    ],
    correct: 1,
    explain: 'Es un resultado de asociación de clase: compatible, no identificativo.',
    xp: 40,
    skill: 'deduccion'
  },
  {
    id: 'razonamiento',
    area: 'Razonamiento investigador',
    title: 'Hipótesis alternativas y refutación',
    lesson: 'Una hipótesis útil es la que puede resultar falsa. Por cada explicación conviene preguntarse: ¿qué dato concreto, si apareciera, la descartaría? Buscar ese dato es más eficaz que acumular indicios a favor.',
    example: 'Si la hipótesis es "cayó al río", el dato refutador sería que su teléfono siguiera activo lejos del río después de la supuesta caída.',
    question: '¿Cuál es la mejor siguiente acción ante una hipótesis prometedora?',
    options: [
      'Buscar más indicios que la confirmen.',
      'Identificar qué dato la refutaría y comprobar si existe.',
      'Cerrar el caso antes de que aparezcan datos contradictorios.'
    ],
    correct: 1,
    explain: 'La refutación activa protege contra el sesgo de confirmación y ahorra recursos.',
    xp: 40,
    skill: 'lateral'
  },
  {
    id: 'informes',
    area: 'Redacción de informes',
    title: 'Hechos, inferencias y conclusiones',
    lesson: 'Un informe sólido separa tres niveles: lo observado (hechos con fuente), lo que se infiere de ello (con su grado de apoyo) y la conclusión. Además declara las incertidumbres pendientes. Mezclar niveles es el error más frecuente y el que más explota la defensa.',
    example: 'Hecho: "la cámara registra a X entrando a las 23:18". Inferencia: "X estuvo en el edificio después de las 23:18". No es un hecho que "X subió al piso".',
    question: '¿Cuál de estas frases es un hecho y no una inferencia?',
    options: [
      '"El sospechoso entró en la vivienda para discutir."',
      '"La cámara del portal registra una entrada a las 23:18 de una persona identificada como X."',
      '"X mintió porque es culpable."'
    ],
    correct: 1,
    explain: 'Solo la segunda describe un registro con su fuente, sin añadir intenciones ni conclusiones.',
    xp: 40,
    skill: 'verbal'
  },
  {
    id: 'etica',
    area: 'Ética profesional',
    title: 'Sospecha no es acusación',
    lesson: 'Señalar a alguien públicamente o en un informe sin base suficiente puede causar un daño irreparable, aunque después se demuestre su inocencia. La ética investigadora exige lenguaje prudente ("persona de interés"), respeto a la intimidad de las personas implicadas y reconocer cuándo la prueba no alcanza.',
    example: 'Escribir "el marido es el principal sospechoso" en un informe porque es beneficiario de un seguro, sin ningún dato que le sitúe en el lugar, contamina toda la investigación.',
    question: 'Las pruebas no permiten atribuir el hecho a nadie con seguridad. ¿Qué es lo profesional?',
    options: [
      'Señalar al sospechoso más probable para cerrar el caso.',
      'Concluir que la evidencia es insuficiente y detallar qué falta.',
      'Elegir al que tenga peores antecedentes.'
    ],
    correct: 1,
    explain: 'Reconocer la incertidumbre es una conclusión válida y protege a personas inocentes.',
    xp: 40,
    skill: 'incertidumbre'
  },
  {
    id: 'cronologia',
    area: 'Cronología',
    title: 'Relojes que no coinciden',
    lesson: 'Cada fuente tiene su propio reloj: cámaras, teléfonos, peajes, testigos que se orientan por un programa de televisión. Antes de concluir que dos hechos son incompatibles, comprueba si los relojes están sincronizados y qué margen tiene cada fuente. Después busca intervalos imposibles: una misma persona en dos sitios a la vez.',
    example: 'Un testigo sitúa un golpe "al acabar la película"; si la película acabó diez minutos antes de lo que cree, su hora se desplaza, pero el orden de los hechos puede seguir siendo válido.',
    question: 'Una cámara y un registro telefónico muestran a la misma persona en dos lugares con 3 minutos de diferencia. ¿Primer paso?',
    options: [
      'Concluir que uno de los dos registros es falso.',
      'Comprobar la sincronización y el margen de cada reloj antes de concluir.',
      'Ignorar la cámara.'
    ],
    correct: 1,
    explain: 'Un desfase de reloj explica muchas aparentes imposibilidades.',
    xp: 40,
    skill: 'temporal'
  }
];
