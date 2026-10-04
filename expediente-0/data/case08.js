/* EXPEDIENTE 0 — Caso EXP-008 «La tercera pajarita».
 * Tres muertes de personas mayores que vivían solas en seis semanas, en la comarca de
 * Guijuelo (Salamanca), que la prensa atribuye a un mismo autor por una figura de papel
 * junto a cada víctima. Se investiga sobre el terreno la tercera; las dos anteriores
 * llegan como expedientes previos. Personas, lugares concretos y hechos son ficticios.
 *
 * CASO CON VERSIONES: la estructura (personas, escena, evidencias, solicitudes) es común y
 * cada partida elige en secreto una de tres soluciones: un único autor en serie, una
 * imitación de la serie para tapar un móvil personal, o una «serie» fabricada a partir
 * de una muerte natural. Las versiones solo sobrescriben contenidos. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-008',
  title: 'La tercera pajarita',
  type: 'Homicidio (posible serie)',
  difficulty: 'Extrema',
  minRank: 6,
  budget: 2000,
  location: 'Calle de la Iglesia, 9 · Linares de Riofrío (Salamanca)',
  date: 'Noche del domingo 4 al lunes 5 de octubre de 2026',
  victim: {
    id: 'eloisa',
    name: 'Eloísa Carrasco Gil',
    summary: 'Eloísa Carrasco Gil, 78 años (tercera muerte atribuida a la serie; antes, Anselmo Rubio Pascual y Pilar Vidal Montero)',
    age: 78,
    job: 'Viuda y jubilada; vivía sola, con teleasistencia y ayuda a domicilio'
  },
  extraPersons: [{ id: 'anselmo', name: 'Anselmo Rubio Pascual' }, { id: 'pilar', name: 'Pilar Vidal Montero' }],
  queryAliases: { eloisa: ['tia'], ruben: ['tecnico', 'teleasistencia'], nieves: ['auxiliar'], dario: ['podcaster', 'podcast'], felisa: ['vecina'] },
  deathWindow: 'Entre las 21:00 del domingo y las 02:00 del lunes (estimación preliminar en el lugar)',
  briefing: [
    'El lunes 5 de octubre, a las 09:14, Felisa Mangas llama al 112 desde Linares de Riofrío (Salamanca): su vecina Eloísa Carrasco, de 78 años, viuda, que vivía sola, está muerta en su cama. Sobre su pecho hay una figura de papel doblado.',
    'Es la tercera muerte en seis semanas en la comarca de Guijuelo que la prensa atribuye a «el asesino de la pajarita»: antes murieron Anselmo Rubio (81), en Guijuelo, a finales de agosto, y Pilar Vidal (76), en Fuenterroble de Salvatierra, en septiembre. Los tres vivían solos y tenían teleasistencia y ayuda a domicilio.',
    'La Policía Judicial asume los tres expedientes. Investigas la muerte de Eloísa sobre el terreno; las dos anteriores están en los informes que puedes pedir. Hay un técnico que entró en las tres casas, una auxiliar que atendía a los tres, un sobrino heredero, un podcaster que se sabe el caso de memoria y un condenado por engañar a personas mayores.',
    'Que la prensa hable de una serie no prueba que lo sea. Este expediente tiene varias versiones posibles: en cada partida los hechos encajan con una solución distinta. No te fíes de lo que recuerdes de otra partida.'
  ],
  initialFacts: ['F8_AVISO', 'F8_LLEGADA', 'F8_VENTANA_MUERTE', 'F8_SERIE'],
  sceneSummary: 'Casa de pueblo de una planta. Eloísa en su cama, con una figura de papel sobre el pecho. La puerta de la calle, cerrada con llave; detrás, un corral con una cancela que da al camino de las eras.',

  mapScale: 0.02,
  places: {
    casa: { name: 'Casa de Eloísa (calle de la Iglesia, 9)', x: 50, y: 50, kind: 'escena' },
    felisa: { name: 'Casa de Felisa (enfrente)', x: 56, y: 44, kind: 'domicilio' },
    eras: { name: 'Camino de las eras (detrás de la casa)', x: 44, y: 62, kind: 'calle' },
    bar: { name: 'Bar La Fuente (plaza de Linares)', x: 70, y: 32, kind: 'restaurante' },
    pueblo: { name: 'Linares de Riofrío (casco urbano)', x: 62, y: 52, kind: 'municipio' },
    guijuelo: { name: 'Guijuelo (casa de Nieves y de Anselmo)', x: 96, y: 10, kind: 'municipio', offmap: '≈ 20 km' },
    fuenterroble: { name: 'Fuenterroble de Salvatierra (casa de Pilar)', x: 96, y: 4, kind: 'municipio', offmap: '≈ 25 km' },
    bejar: { name: 'Béjar (casa de Rubén y de Benito)', x: 96, y: 96, kind: 'municipio', offmap: '≈ 30 km' },
    salamanca: { name: 'Salamanca (Gonzalo, Lorena y Darío)', x: 4, y: 4, kind: 'municipio', offmap: '≈ 50 km' }
  },

  people: [
    {
      id: 'ruben', name: 'Rubén Lozano Hierro', initials: 'RL', age: 44,
      role: 'Técnico de teleasistencia', relation: 'Revisó los terminales de las tres víctimas',
      hidden: { honestidad: 45, miedo: 35, manipulacion: 70, autocontrol: 85, confianza: 55 },
      questions: [
        { id: 'rel', q: '¿A qué se dedica exactamente?', a: 'Soy técnico de mantenimiento de Asistencia Comarcal Tormes desde 2019. Instalo y reviso los terminales de teleasistencia de toda la comarca.', type: 'verdad', reveals: [] },
        { id: 'visitas', q: '¿Estuvo en casa de las tres víctimas?', a: 'Sí, en revisiones programadas. Visito a unas cuarenta personas al mes; está todo en el sistema, con el parte firmado.', type: 'verdad', reveals: ['S8_RUBEN_VISITAS'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo por la noche?', a: 'Estaba de guardia esa noche.', type: 'verdad', reveals: ['S8_RUBEN_NOCHE'] },
        { id: 'llaves', q: '¿Cómo funcionan las llaves que guarda la empresa?', a: 'Están en un armario que se abre con tarjeta. Solo se sacan cuando la central da un aviso y hay que entrar en una casa.', type: 'verdad', reveals: ['S8_RUBEN_LLAVES'] },
        { id: 'modo', q: '¿Qué es el «modo prueba» de un terminal?', a: 'Un modo técnico para las revisiones. Mientras está activo, la central no supervisa el aparato. Se activa con el código personal de cada técnico.', type: 'verdad', reveals: ['S8_RUBEN_MODO'] },
        { id: 'botas', q: '¿Qué calzado usa para trabajar?', a: 'Las botas de seguridad de la empresa. Un 43.', type: 'verdad', reveals: ['S8_RUBEN_BOTAS'] },
        { id: 'papel', q: '¿Sabe hacer figuras de papel?', a: 'No.', type: 'verdad', reveals: ['S8_RUBEN_PAPEL'] }
      ],
      confront: {
        F8_TERMINAL_POLVO: { a: 'Revisé ese aparato el jueves. Claro que hay huellas mías.', reveals: [] },
        F8_CEN_VISITAS: { a: 'Revisiones programadas, de día y con el parte firmado por cada usuario.', reveals: [] }
      },
      confrontDefault: 'No sé qué quiere que le diga sobre eso.'
    },
    {
      id: 'gonzalo', name: 'Gonzalo Carrasco Merino', initials: 'GC', age: 49,
      role: 'Sobrino y heredero de Eloísa', relation: 'Único familiar; vive en Salamanca',
      hidden: { honestidad: 40, miedo: 70, manipulacion: 50, autocontrol: 40, confianza: 35 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con su tía?', a: 'Soy su único sobrino. Cuando murió mi madre, ella casi me crió. La quería mucho.', type: 'verdad', reveals: [] },
        { id: 'ultima', q: '¿Cuándo vio a su tía por última vez?', a: 'En agosto, en las fiestas del pueblo. Llevaba semanas sin poder ir.', type: 'mentira', reveals: ['S8_GONZ_AGOSTO'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo por la noche?', a: 'En Salamanca.', type: 'verdad', reveals: ['S8_GONZ_NOCHE'] },
        { id: 'llave', q: '¿Tiene llave de la casa?', a: 'Sí, desde siempre. De la puerta de la calle y de la de la cocina.', type: 'verdad', reveals: ['S8_GONZ_LLAVE'] },
        { id: 'poder', q: '¿Tenía algún poder notarial de su tía?', a: 'Sí, desde 2023, para gestiones del banco.', type: 'verdad', reveals: ['S8_GONZ_PODER'] },
        { id: 'pajarita', q: '¿Sabe hacer pajaritas de papel?', a: 'Como todo el mundo, de pequeño. ¿A qué viene eso?', type: 'verdad', reveals: ['S8_GONZ_PAJARITA'] },
        { id: 'talla', q: '¿Qué número calza?', requires: ['F8_CALZADO'], a: 'Un 42. Zapato de vestir, que trabajo en una oficina.', type: 'verdad', reveals: ['S8_GONZ_TALLA'] },
        { id: 'deudas', q: '¿Tiene deudas?', requires: ['F8_BANCO_GONZALO'], a: 'Tengo un negocio que va mal y un banco encima. Nada que no pueda arreglar.', type: 'media', reveals: [] }
      ],
      confront: {
        S8_FELISA_TARDE: { a: 'Vale, fui el domingo por la tarde. Le pedí dinero, discutimos y me volví a Salamanca. No lo dije porque sabía cómo iba a sonar.', reveals: ['S8_GONZ_TARDE'] },
        F8_LPR_GONZALO: { a: 'Sí, fui por la tarde. Discutimos y me volví. No me siento orgulloso.', reveals: ['S8_GONZ_TARDE'] },
        F8_PUERTA_POLVO: { a: 'Es la casa de mi tía. Claro que hay huellas mías.', reveals: [] },
        F8_TESTAMENTO: { a: 'Era lo único que me quedaba de familia. ¿Qué quiere que le diga?', reveals: [] }
      },
      confrontDefault: 'Mire, acabo de perder a la única familia que tenía.'
    },
    {
      id: 'nieves', name: 'Nieves Arroyo Sanz', initials: 'NA', age: 52,
      role: 'Auxiliar de ayuda a domicilio', relation: 'Atendía a las tres víctimas; encontró a las dos primeras',
      hidden: { honestidad: 45, miedo: 65, manipulacion: 60, autocontrol: 70, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Eloísa?', a: 'Soy auxiliar del servicio de ayuda a domicilio de la mancomunidad. La atendía desde 2024: aseo, la compra, la medicación. Era como de la familia.', type: 'verdad', reveals: [] },
        { id: 'usuarios', q: '¿A quién atendía?', a: 'A Anselmo, a Pilar y a Eloísa, entre otros, de lunes a viernes por la mañana. A Anselmo y a Pilar los encontré yo. Imagínese cómo estoy.', type: 'verdad', reveals: ['S8_NIEVES_USUARIOS'] },
        { id: 'domingo', q: '¿Fue a casa de Eloísa el domingo?', a: 'No. Los domingos no trabajo.', type: 'mentira', reveals: ['S8_NIEVES_DOMINGO'] },
        { id: 'llave', q: '¿Tiene llave de la casa?', a: 'No, nunca. Lo tenemos prohibido.', type: 'mentira', reveals: ['S8_NIEVES_LLAVE'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo por la noche?', a: 'En mi casa de Guijuelo.', type: 'verdad', reveals: ['S8_NIEVES_NOCHE'] },
        { id: 'anselmo', q: '¿Cómo encontró a Anselmo?', a: 'Fue horrible. No me lo quito de la cabeza.', type: 'verdad', reveals: ['S8_NIEVES_ANSELMO'] },
        { id: 'pastillas', q: '¿Quién preparaba la medicación de Eloísa?', a: 'Yo, en el pastillero de la semana. Por la noche, medio comprimido de lorazepam para dormir. Nada más.', type: 'verdad', reveals: ['S8_NIEVES_PASTILLAS'] },
        { id: 'zuecos', q: '¿Qué calzado usa para trabajar?', requires: ['F8_CALZADO'], a: 'Zuecos sanitarios, un 39, como todas las auxiliares.', type: 'verdad', reveals: ['S8_NIEVES_ZUECOS'] }
      ],
      confront: {
        S8_FELISA_TARDE: { a: 'Vale. Fui a llevarle pan y a ordenarle las pastillas, fuera de horario y sin cobrar. Si se entera la mancomunidad, me echan.', reveals: ['S8_NIEVES_TARDE'] },
        S8_FELISA_LLAVES: { a: 'Me la dio ella, por si se caía. No quería que nadie lo supiera, y yo tampoco.', reveals: [] },
        F8_CUADERNO: { a: 'El domingo no lo apunté porque no era servicio.', reveals: [] }
      },
      confrontDefault: 'Yo solo cuidaba de ella. No sé nada de eso.'
    },
    {
      id: 'dario', name: 'Darío Velasco Prieto', initials: 'DV', age: 36,
      role: 'Podcaster de sucesos', relation: 'Autor del pódcast que bautizó la serie',
      hidden: { honestidad: 40, miedo: 45, manipulacion: 55, autocontrol: 40, confianza: 70 },
      questions: [
        { id: 'rel', q: '¿A qué se dedica?', a: 'Hago un pódcast de crímenes, «Sombras del Tormes». Veinte mil oyentes. Llevo este caso desde el principio.', type: 'verdad', reveals: [] },
        { id: 'vinculo', q: '¿Por qué relacionó la muerte de Anselmo con la de Pilar?', a: 'Una vecina de Guijuelo me contó que junto a Anselmo había una pajarita de papel. Cuando murió Pilar, con otra pajarita, até cabos. Fui el primero.', type: 'verdad', reveals: ['S8_DARIO_VINCULO'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo por la noche?', a: 'En mi casa de Salamanca, editando el episodio de la semana.', type: 'mentira', reveals: ['S8_DARIO_NOCHE'] },
        { id: 'fuentes', q: '¿Quién le cuenta los detalles de las escenas?', a: 'Tengo mis fuentes: gente de los pueblos y algún guardia jubilado. No le voy a dar nombres.', type: 'media', reveals: ['S8_DARIO_FUENTES'] },
        { id: 'post', q: '¿Qué quiso decir con «el próximo será en la sierra»?', requires: ['F8_PODCAST'], a: 'Era un gancho para el episodio. Una predicción basada en el patrón. Nada más.', type: 'verdad', reveals: ['S8_DARIO_POST'] }
      ],
      confront: {
        F8_BAR_DARIO: { a: 'Vale, estaba en Linares. Estaba convencido de que el siguiente sería en la sierra. Salí a dar vueltas por las calles grabando sonido y volví al bar.', reveals: ['S8_DARIO_FUI', 'S8_DARIO_VIO'] },
        F8_ANT_DARIO: { a: 'Estuve en Linares, sí. Grabando ambiente para el pódcast. No entré en ninguna casa.', reveals: ['S8_DARIO_FUI', 'S8_DARIO_VIO'] },
        F8_COLILLA_ADN: { a: 'Me fumé un cigarro junto a esa cancela, vale. Estaba grabando. Eso es todo.', reveals: ['S8_DARIO_FUI', 'S8_DARIO_VIO'] },
        S8_LORENA_PODCAST: { a: 'Hago periodismo. Ella no quería hablar y yo insistí. Ya está.', reveals: [] }
      },
      confrontDefault: 'Eso no lo sé. Y si lo supiera, lo contaría en el pódcast.'
    },
    {
      id: 'benito', name: 'Benito Sastre Rollán', initials: 'BS', age: 61,
      role: 'Antiguo sospechoso', relation: 'Condenado en 2014 por engañar a personas mayores; investigado tras la muerte de Pilar',
      hidden: { honestidad: 30, miedo: 60, manipulacion: 65, autocontrol: 45, confianza: 25 },
      questions: [
        { id: 'rel', q: '¿Conocía a Eloísa Carrasco?', a: 'No la había visto en mi vida. Ni a ella ni a los otros dos.', type: 'verdad', reveals: [] },
        { id: 'antecedentes', q: 'Háblenos de su condena de 2014.', a: 'Iba por las casas como revisor del gas y cobraba lo que no era. Lo pagué. Ahora trabajo en la chatarra y no he vuelto a hacer revisiones.', type: 'mentira', reveals: ['S8_BENITO_TRABAJO'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo por la noche?', a: 'En mi casa de Béjar, viendo el fútbol. Solo.', type: 'mentira', reveals: ['S8_BENITO_NOCHE'] },
        { id: 'pilar', q: '¿Qué hacía en Fuenterroble el 17 de septiembre?', a: 'Ya me lo preguntaron entonces. Pasé con la furgoneta recogiendo chatarra. Nada más.', type: 'media', reveals: [] },
        { id: 'botas', q: '¿Qué calzado usa?', a: 'Botas de seguridad, para la chatarra. Un 43.', type: 'verdad', reveals: ['S8_BENITO_BOTAS'] }
      ],
      confront: {
        F8_LPR_OTROS: { a: '(Resopla.) Estuve en Guijuelo, en la trastienda de un bar, jugando a las cartas con dinero de nueve a una. Estoy en libertad condicional; si se sabe, vuelvo dentro.', reveals: ['S8_BENITO_TIMBA'] },
        F8_ANT_BENITO: { a: 'En Guijuelo, jugando a las cartas. No lo dije por la condicional.', reveals: ['S8_BENITO_TIMBA'] },
        F8_E2_BENITO: { a: 'Vendía revisiones, vale. Eso no es matar a nadie.', reveals: [] }
      },
      confrontDefault: 'Siempre que pasa algo a un viejo, vienen a por mí.'
    },
    {
      id: 'felisa', name: 'Felisa Mangas Ortiz', initials: 'FM', age: 73,
      role: 'Vecina de enfrente', relation: 'Amiga de Eloísa desde hace cincuenta años; tenía copia de su llave',
      hidden: { honestidad: 95, miedo: 40, manipulacion: 5, autocontrol: 60, confianza: 70 },
      questions: [
        { id: 'hallazgo', q: '¿Cómo la encontró?', a: 'A las nueve vi la persiana bajada, y Eloísa la sube a las ocho, llueva o nieve. Abrí con mi copia y estaba en la cama, quieta, con un papel doblado encima.', type: 'verdad', reveals: ['S8_FELISA_HALLAZGO'] },
        { id: 'tarde', q: '¿Quién fue a verla el domingo?', a: 'A las cuatro y diez llegó Nieves, la chica de la ayuda, con una barra de pan; se fue sobre las cinco menos veinte. A las seis menos veinte vino el coche del sobrino. Oí a Eloísa gritar: «¡No te doy ni un duro más!». Se fue a las seis y media pasadas, dando un portazo.', type: 'verdad', reveals: ['S8_FELISA_TARDE'] },
        { id: 'noche', q: '¿Oyó algo por la noche?', a: 'Algo oí, sí.', type: 'verdad', reveals: ['S8_FELISA_NOCHE'] },
        { id: 'llaves', q: '¿Quién tenía llave de la casa?', a: 'Yo, el sobrino y la empresa de la teleasistencia, que guarda una. Y la chica, Nieves: Eloísa le dio otra, aunque no quería que se supiera.', type: 'verdad', reveals: ['S8_FELISA_LLAVES'] },
        { id: 'tecnico', q: '¿Vino alguien más esa semana?', a: 'El jueves por la mañana vino el técnico de la teleasistencia a revisar el aparato. Un hombre muy educado.', type: 'verdad', reveals: ['S8_FELISA_TECNICO'] },
        { id: 'eloisa', q: '¿Le contó Eloísa algo raro estos días?', a: 'Algo me contó, sí.', type: 'verdad', reveals: ['S8_FELISA_ELOISA'] }
      ],
      confront: {},
      confrontDefault: 'Eso no lo sé, hijo.'
    },
    {
      id: 'lorena', name: 'Lorena Iglesias Vidal', initials: 'LI', age: 47,
      role: 'Hija de Pilar, la segunda víctima', relation: 'Vive en Salamanca; visitaba a su madre los fines de semana',
      hidden: { honestidad: 85, miedo: 40, manipulacion: 15, autocontrol: 55, confianza: 45 },
      questions: [
        { id: 'rel', q: '¿Cómo estaba su madre las últimas semanas?', a: 'Bien, dentro de lo que cabe. Tenía la cabeza perfecta. Por eso no entiendo nada.', type: 'verdad', reveals: [] },
        { id: 'madre', q: '¿Le comentó su madre algún problema?', a: 'Hablábamos todos los días.', type: 'verdad', reveals: ['S8_LORENA_MADRE'] },
        { id: 'tecnico', q: '¿Recuerda la revisión de la teleasistencia de septiembre?', a: 'Sí, yo estaba allí ese día.', type: 'verdad', reveals: ['S8_LORENA_TECNICO'] },
        { id: 'nieves', q: '¿Qué relación tenía su madre con Nieves?', a: 'Iba de lunes a viernes por la mañana. Mi madre la adoraba; decía que era la hija que tenía cerca.', type: 'verdad', reveals: ['S8_LORENA_NIEVES'] },
        { id: 'noche', q: '¿Dónde estuvo el domingo 4 por la noche?', a: 'En mi casa de Salamanca, con mi marido.', type: 'verdad', reveals: ['S8_LORENA_NOCHE'] },
        { id: 'podcast', q: '¿Ha hablado con la prensa?', a: 'Ese podcaster, Darío, se presentó dos veces en mi puerta con un micrófono. La segunda le denuncié.', type: 'verdad', reveals: ['S8_LORENA_PODCAST'] }
      ],
      confront: {},
      confrontDefault: 'No lo sé. Ojalá pudiera ayudar más.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'casa', name: 'Casa de Eloísa · planta baja', legend: 'Casa de pueblo de una planta · 95 m²',
        rooms: [
          { id: 'entrada', name: 'Entrada', x: 0, y: 0, w: 25, h: 40 },
          { id: 'salon', name: 'Salón', x: 25, y: 0, w: 45, h: 55 },
          { id: 'dormitorio', name: 'Dormitorio de Eloísa', x: 70, y: 0, w: 30, h: 60 },
          { id: 'cocina', name: 'Cocina', x: 0, y: 40, w: 25, h: 60 },
          { id: 'pasillo', name: 'Pasillo', x: 25, y: 55, w: 45, h: 45 },
          { id: 'bano', name: 'Baño', x: 70, y: 60, w: 30, h: 40 }
        ],
        hotspots: [
          { ev: 'E8_06', x: 10, y: 16 }, { ev: 'E8_04', x: 34, y: 10 }, { ev: 'E8_08', x: 48, y: 36 },
          { ev: 'E8_09', x: 62, y: 14 }, { ev: 'E8_05', x: 9, y: 58 }, { ev: 'E8_11', x: 16, y: 86 },
          { ev: 'E8_01', x: 86, y: 26 }, { ev: 'E8_02', x: 80, y: 18 }, { ev: 'E8_03', x: 92, y: 10 },
          { ev: 'E8_10', x: 76, y: 46 }, { ev: 'E8_15', x: 96, y: 40 }
        ]
      },
      {
        id: 'exterior', name: 'Corral y alrededores', legend: 'Corral con cancela al camino de las eras y calle de delante',
        rooms: [
          { id: 'corral', name: 'Corral', x: 0, y: 0, w: 55, h: 55 },
          { id: 'calle', name: 'Calle de la Iglesia (calzada)', x: 55, y: 0, w: 45, h: 55 },
          { id: 'eras', name: 'Camino de las eras', x: 0, y: 55, w: 100, h: 45 }
        ],
        hotspots: [{ ev: 'E8_07', x: 30, y: 48 }, { ev: 'E8_14', x: 36, y: 64 }, { ev: 'E8_12', x: 72, y: 82 }, { ev: 'E8_13', x: 82, y: 28 }]
      }
    ]
  },

  evidence: [
    { id: 'E8_01', name: 'Cuerpo de Eloísa', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal de Salamanca', room: 'Dormitorio de Eloísa',
      public: 'Eloísa yace boca arriba en su cama.', detail: 'En camisón, con la colcha subida hasta el pecho. No hay desorden en el dormitorio.',
      value: 'Causa y hora de la muerte.', limits: 'La hora en el lugar es solo orientativa.',
      reveals: ['F8_CUERPO'], lab: { autopsia: { cost: 300, reveals: ['F8_AUTOPSIA', 'F8_AUTOPSIA_HORA'] } } },
    { id: 'E8_02', name: 'Figura de papel sobre el pecho', model: 'papers', type: 'Documento', level: 2, custody: 'Recogida con pinzas en sobre de papel', room: 'Dormitorio de Eloísa',
      public: 'Una figura de papel doblado sobre el pecho de Eloísa.', detail: 'Una figura de papel del tamaño de una mano, colocada con cuidado sobre el pecho.',
      value: 'La firma que la prensa atribuye a la serie.', limits: 'Lo publicado en la prensa lo puede copiar cualquiera.',
      reveals: ['F8_PAJ3'], lab: { documentos: { cost: 200, label: 'Documentoscopia de la figura', reveals: ['F8_PAJ3_DOC'] }, adn: { cost: 250, label: 'ADN de la figura', reveals: ['F8_PAJ3_ADN'] } } },
    { id: 'E8_03', name: 'Almohadas de la cama', model: 'bag', type: 'Objeto', level: 3, custody: 'Embaladas por separado en bolsas de papel', room: 'Dormitorio de Eloísa',
      public: 'Dos almohadas en la cama de Eloísa.', detail: 'Dos almohadas de lana con funda blanca.',
      value: 'Pueden indicar cómo murió.', limits: '—',
      reveals: ['F8_ALMOHADA'], lab: { biologia: { cost: 150, label: 'Biología de las almohadas', reveals: ['F8_ALMOHADA_LAB'] } } },
    { id: 'E8_10', name: 'Mesilla con el colgante y el vaso', model: 'glass', type: 'Objeto', level: 3, custody: 'Vaso precintado; colgante fotografiado y recogido', room: 'Dormitorio de Eloísa',
      public: 'La mesilla de noche de Eloísa.', detail: 'El colgante pulsador de la teleasistencia, un vaso de agua mediado y el pastillero de la semana.',
      value: 'Qué tomó antes de dormir y por qué no pidió ayuda.', limits: '—',
      reveals: ['F8_MESILLA'], lab: { toxicologia: { cost: 120, label: 'Toxicología del vaso', reveals: ['F8_VASO_LAB'] } } },
    { id: 'E8_15', name: 'Ventana del dormitorio', type: 'Escena', level: 2, fixed: true, room: 'Dormitorio de Eloísa',
      public: 'La ventana del dormitorio, que da a la calle.', detail: 'Cerrada por dentro, con la persiana bajada. Ni marcas ni cristales rotos.',
      value: 'Posible acceso.', limits: '—',
      reveals: ['F8_VENTANA'] },
    { id: 'E8_04', name: 'Terminal de teleasistencia', model: 'tablet', type: 'Dispositivo', level: 2, fixed: true, room: 'Salón',
      public: 'El terminal de teleasistencia, sobre el aparador del salón.', detail: 'Un aparato con altavoz y una pantalla pequeña, conectado a la línea de teléfono.',
      value: 'Registra alarmas y eventos técnicos.', limits: 'El detalle de los eventos está en la central.',
      reveals: ['F8_TERMINAL'], forensic: { polvo: { reveals: ['F8_TERMINAL_POLVO'] } } },
    { id: 'E8_08', name: 'Revista de programación', model: 'papers', type: 'Documento', level: 4, room: 'Salón',
      public: 'Una revista de programación de televisión en la mesa baja del salón.', detail: 'La revista de programación de la semana, con las páginas satinadas.',
      value: 'Un detalle doméstico.', limits: '—',
      reveals: ['F8_REVISTA'] },
    { id: 'E8_09', name: 'Teléfono de Eloísa', type: 'Dispositivo', level: 2, room: 'Salón',
      public: 'El teléfono móvil de Eloísa, cargando en el salón.', detail: 'Bloqueado. Requiere extracción.',
      value: 'Llamadas y mensajes de sus últimos días.', limits: '—',
      reveals: ['F8_TEL_ELO_ESCENA'], unlocks: ['D8_TEL_ELO'] },
    { id: 'E8_06', name: 'Puerta de la calle', type: 'Escena', level: 2, fixed: true, room: 'Entrada',
      public: 'La puerta de entrada de la casa.', detail: 'Puerta de madera con cerradura de dos vueltas. Sin marcas de palanca.',
      value: 'Por dónde se entró.', limits: 'Varias personas tenían llave.',
      reveals: ['F8_PUERTA'], forensic: { polvo: { reveals: ['F8_PUERTA_POLVO'] } } },
    { id: 'E8_05', name: 'Cuaderno de visitas', model: 'papers', type: 'Documento', level: 3, room: 'Cocina',
      public: 'Un cuaderno en la mesa de la cocina.', detail: 'El cuaderno del servicio de ayuda a domicilio, donde la auxiliar firma cada visita.',
      value: 'Quién iba a la casa y cuándo.', limits: 'Solo recoge las visitas que se apuntan.',
      reveals: ['F8_CUADERNO'] },
    { id: 'E8_11', name: 'Cajón del aparador de la cocina', type: 'Documento', level: 3, room: 'Cocina',
      public: 'Un aparador con un cajón de papeles.', detail: 'El cajón donde Eloísa guardaba la cartilla y los papeles importantes.',
      value: 'Qué preocupaba a Eloísa.', limits: '—',
      reveals: ['F8_CAJON'] },
    { id: 'E8_07', name: 'Cancela del corral', model: 'door', type: 'Huella', level: 3, fixed: true, room: 'Corral',
      public: 'La cancela del corral, que da al camino de las eras.', detail: 'Cancela de hierro con cerrojo. El suelo del corral está embarrado por la lluvia del sábado.',
      value: 'Un acceso por detrás, sin vecinos a la vista.', limits: 'El calzado se comparte y se repite.',
      reveals: ['F8_CANCELA'], lab: { comparativa: { cost: 180, label: 'Comparativa de calzado', reveals: ['F8_CALZADO'] } } },
    { id: 'E8_14', name: 'Colilla junto a la tapia', model: 'trace', type: 'Biológico', level: 4, custody: 'Recogida con pinzas en tubo seco', room: 'Camino de las eras',
      public: 'Una colilla en el camino, junto a la tapia del corral.', detail: 'Una colilla de tabaco rubio, reciente, sin deshacer.',
      value: 'Alguien se paró aquí.', limits: 'Un camino es un lugar de paso.',
      reveals: ['F8_COLILLA'], lab: { adn: { cost: 200, label: 'ADN de la colilla', reveals: ['F8_COLILLA_ADN'] } } },
    { id: 'E8_12', name: 'Marcas de neumático en el camino', type: 'Huella', level: 3, fixed: true, room: 'Camino de las eras',
      public: 'Rodadas en la tierra del camino de las eras.', detail: 'Tierra blanda por la lluvia del sábado; hay rodadas de tractores y de otros vehículos.',
      value: 'Qué vehículo se acercó por detrás.', limits: 'Muchos vehículos comparten el mismo neumático.',
      reveals: ['F8_RODADAS'], lab: { comparativa: { cost: 180, label: 'Comparativa de neumáticos', reveals: ['F8_NEUMATICO'] } } },
    { id: 'E8_13', name: 'Contenedor de basura de la esquina', model: 'trashbag', type: 'Escena', level: 3, fixed: true, room: 'Calle de la Iglesia',
      public: 'El contenedor de basura de la esquina de la calle.', detail: 'Contenedor verde a veinte metros de la puerta de Eloísa.',
      value: 'Algo que alguien quiso tirar.', limits: '—',
      reveals: ['F8_CONTENEDOR'], lab: { adn: { cost: 200, label: 'ADN de lo hallado en el contenedor', reveals: ['F8_CONTENEDOR_ADN'] } } }
  ],

  labKinds: { autopsia: 'Autopsia completa', documentos: 'Documentoscopia', adn: 'ADN', biologia: 'Biología forense', toxicologia: 'Toxicología', comparativa: 'Comparativa' },

  digital: [
    { id: 'D8_EXP1', name: 'Expediente de la muerte de Anselmo Rubio', cost: 100, desc: 'Guijuelo, finales de agosto: hallazgo, autopsia revisada en septiembre e informe de la figura de papel.', reveals: ['F8_E1_HALLAZGO', 'F8_E1_AUTOPSIA', 'F8_E1_FIGURA'] },
    { id: 'D8_EXP2', name: 'Expediente de la muerte de Pilar Vidal', cost: 100, desc: 'Fuenterroble de Salvatierra, septiembre: hallazgo, autopsia, figura de papel y sospechosos investigados.', reveals: ['F8_E2_HALLAZGO', 'F8_E2_AUTOPSIA', 'F8_E2_FIGURA', 'F8_E2_BENITO'] },
    { id: 'D8_CENTRAL', name: 'Registros de la empresa de teleasistencia', cost: 200, desc: 'Eventos de la central en las tres casas, revisiones técnicas, armario de llaves custodiadas y cuadrante de guardias.', reveals: ['F8_CEN_1', 'F8_CEN_2', 'F8_CEN_3', 'F8_CEN_VISITAS', 'F8_LLAVES', 'F8_CUAD_RUBEN'] },
    { id: 'D8_TEL_ELO', name: 'Extracción del teléfono de Eloísa', cost: 200, desc: 'Llamadas, mensajes y última actividad.', requires: 'E8_09', reveals: ['F8_TEL_ELO_LLAM', 'F8_TEL_ELO_MSG'] },
    { id: 'D8_BAR', name: 'Cámara del Bar La Fuente (Linares)', cost: 60, desc: 'Grabación de la cámara interior del bar de la plaza la noche del domingo.',
      reveals: ['F8_BAR_DARIO'],
      video: { offset: -7, ref: { label: 'Un cliente paga con tarjeta en la barra', time: '21:52' }, range: ['21:20', '00:50'], subject: { pid: 'dario', intervals: [['21:30', '22:05'], ['22:50', '00:40']] }, gates: ['F8_BAR_DARIO'] } },
    { id: 'D8_BANCO', name: 'Datos bancarios y testamentos', cost: 150, desc: 'Cuentas de Eloísa y de Pilar, testamento de Eloísa y situación financiera de las personas del expediente.', reveals: ['F8_BANCO_ELO', 'F8_BANCO_PILAR', 'F8_TESTAMENTO', 'F8_BANCO_GONZALO'] },
    { id: 'D8_LPR', name: 'Lectores de matrícula y registro de vehículos', cost: 100, desc: 'Vehículos de las personas del expediente y lecturas de los lectores de la A-66 y la N-630 del domingo.', reveals: ['F8_VEH', 'F8_LPR_GONZALO', 'F8_LPR_RUBEN', 'F8_LPR_OTROS'] },
    { id: 'D8_PRENSA', name: 'Hemeroteca y pódcast', cost: 30, desc: 'Todo lo publicado sobre las tres muertes, incluido el pódcast «Sombras del Tormes».', reveals: ['F8_PRENSA', 'F8_PODCAST'] }
  ],

  judicial: {
    max: 2,
    desc: 'Datos de antenas de un teléfono del domingo 4 a las 16:00 al lunes 5 a las 02:00. Linares tiene su propia antena; Guijuelo, Béjar y Salamanca, las suyas. El juzgado autoriza dos solicitudes.',
    results: {
      ruben: ['F8_ANT_RUBEN'], gonzalo: ['F8_ANT_GONZALO'], nieves: ['F8_ANT_NIEVES'], dario: ['F8_ANT_DARIO'],
      benito: ['F8_ANT_BENITO'], felisa: ['F8_ANT_FELISA'], lorena: ['F8_ANT_LORENA']
    }
  },

  /* Hechos comunes a todas las versiones. Los hechos que cambian están en `variants`. */
  facts: {
    F8_AVISO: { text: 'Felisa Mangas llama al 112: su vecina Eloísa está muerta en la cama, «con un papel doblado encima».', time: '09:14', person: 'felisa', place: 'casa', source: 'llamada', tags: ['llamada', 'aviso'] },
    F8_LLEGADA: { text: 'La patrulla de la Guardia Civil confirma la muerte y aísla la casa. La puerta de la calle no está forzada.', time: '09:31', place: 'casa', source: 'informe policial', tags: ['hallazgo'] },
    F8_VENTANA_MUERTE: { text: 'Estimación preliminar en el lugar: la muerte se produjo entre las 21:00 del domingo y las 02:00 del lunes.', time: '21:00', end: '02:00', person: 'eloisa', source: 'informe forense', tags: ['muerte', 'hora'] },
    F8_SERIE: { text: 'La prensa atribuye la muerte al mismo autor que las de Anselmo Rubio (81, Guijuelo, hallado el 25 de agosto) y Pilar Vidal (76, Fuenterroble, hallada el 18 de septiembre): «el asesino de la pajarita».', source: 'prensa', tags: ['serie', 'pajarita'] },

    F8_CUERPO: { text: 'Eloísa yace boca arriba en su cama, en camisón y con la colcha subida hasta el pecho. Sobre el pecho hay una figura de papel doblado. No hay desorden en el dormitorio.', person: 'eloisa', place: 'casa', source: 'escena', tags: ['muerte'] },
    F8_AUTOPSIA_HORA: { text: 'Por temperatura, livideces y rigidez, la muerte se produjo entre las 23:00 y las 00:00 del domingo.', time: '23:00', end: '00:00', person: 'eloisa', place: 'casa', source: 'informe forense', tags: ['muerte', 'hora'] },
    F8_MESILLA: { text: 'En la mesilla: el colgante pulsador de la teleasistencia, un vaso de agua mediado y el pastillero semanal con la toma de la noche del domingo vacía. Eloísa no llevaba el colgante puesto.', person: 'eloisa', place: 'casa', source: 'escena', tags: ['teleasistencia', 'medicacion'] },
    F8_VENTANA: { text: 'La ventana del dormitorio está cerrada por dentro, con la persiana bajada y sin señales de forzamiento.', place: 'casa', source: 'escena', tags: ['ventana', 'acceso'] },
    F8_TERMINAL_POLVO: { prints: [{ at: 'Terminal · carcasa', match: 'ruben' }, { at: 'Terminal · teclado', match: 'eloisa' }], text: 'Polvo revelador en el terminal: huellas de Rubén Lozano en la carcasa (revisó el aparato el jueves 1/10) y de Eloísa en el teclado.', source: 'laboratorio', tags: ['huella', 'teleasistencia'] },
    F8_TEL_ELO_ESCENA: { text: 'El teléfono de Eloísa estaba cargando en el salón, con la pantalla bloqueada.', source: 'escena', tags: ['telefono'] },
    F8_PUERTA: { text: 'La puerta de la calle estaba cerrada con dos vueltas de llave y sin marcas de forzamiento; Felisa abrió con su copia.', place: 'casa', source: 'escena', tags: ['acceso', 'llave', 'puerta'] },
    F8_PUERTA_POLVO: { prints: [{ at: 'Manilla interior', match: 'eloisa' }, { at: 'Manilla interior', match: 'gonzalo' }, { at: 'Embellecedor de la cerradura', q: 'no_apta' }], text: 'Polvo revelador en la puerta de la calle: huellas de Eloísa y de Gonzalo Carrasco en la manilla interior; una latente emborronada, no apta.', source: 'laboratorio', tags: ['huella', 'puerta'] },
    F8_CUADERNO: { text: 'Cuaderno de visitas del servicio de ayuda a domicilio: Nieves firma de lunes a viernes, de 10:00 a 11:30. Última firma: viernes 2/10. Ninguna anotación el fin de semana.', person: 'nieves', source: 'documento', tags: ['documento', 'visitas'] },
    F8_COLILLA: { text: 'En el camino de las eras, junto a la tapia del corral de Eloísa, hay una colilla reciente de tabaco rubio, aún sin deshacer por el rocío.', place: 'eras', source: 'escena', tags: ['colilla'] },
    F8_COLILLA_ADN: { pericia: { type: 'adn', match: 'dario', label: 'colilla del camino de las eras' }, text: 'ADN de la colilla: perfil genético de Darío Velasco.', person: 'dario', place: 'eras', source: 'laboratorio', tags: ['adn', 'colilla'] },

    F8_E2_HALLAZGO: { text: 'Expediente de Pilar Vidal: hallada muerta en su cama el 18/9 a las 09:10 por Nieves Arroyo, su auxiliar de ayuda a domicilio. Puerta cerrada con llave, sin forzar.', person: 'pilar', place: 'fuenterroble', source: 'informe policial', tags: ['hallazgo', 'serie'] },
    F8_E2_AUTOPSIA: { text: 'Autopsia de Pilar: sofocación con la almohada. Petequias conjuntivales y erosiones en la mucosa del labio; sin lesiones en el cuello ni de defensa. Muerte entre las 22:30 y las 23:30 del 17/9.', person: 'pilar', source: 'laboratorio', tags: ['muerte', 'autopsia', 'serie'] },
    F8_E2_FIGURA: { text: 'Sobre el pecho de Pilar había una grulla de papiroflexia de papel granate de 15 × 15 cm. Dentro, a lápiz: «Ya descansas, Pilar. 2». La Guardia Civil reservó este detalle: la prensa solo habló de «una pajarita».', person: 'pilar', source: 'laboratorio', tags: ['pajarita', 'firma', 'serie'] },
    F8_E2_BENITO: { text: 'Tras la muerte de Pilar se investigó a Benito Sastre: su furgoneta se grabó en Fuenterroble la tarde del 17/9 y dos vecinas le reconocieron como el «revisor del gas» que había pasado por las casas esa semana. No se halló nada que le relacionara con la muerte.', person: 'benito', place: 'fuenterroble', source: 'informe policial', tags: ['sospechoso', 'serie'] },
    F8_CEN_VISITAS: { text: 'Registros de la empresa: el técnico Rubén Lozano (código T-07) revisó los terminales de Anselmo (12/8), de Pilar (9/9) y de Eloísa (1/10), por la mañana y con parte firmado por cada usuario.', person: 'ruben', source: 'registro', tags: ['teleasistencia', 'visitas'] },
    F8_TEL_ELO_LLAM: { text: 'Teléfono de Eloísa: el domingo, llamada saliente a Gonzalo a las 19:02 (4 min). Última actividad del teléfono a las 21:40. Ninguna llamada ni mensaje después.', time: '19:02', person: 'eloisa', source: 'llamada', tags: ['llamada', 'telefono'] },
    F8_BAR_DARIO: { text: 'Cámara del Bar La Fuente (hora corregida): Darío Velasco llega a las 21:30, sale a las 22:05 y vuelve a las 22:50. Se queda en la barra hasta el cierre, a las 00:40.', time: '21:30', end: '00:40', person: 'dario', place: 'bar', source: 'cámara', tags: ['camara', 'coartada'] },
    F8_TESTAMENTO: { text: 'Testamento de Eloísa (2019): heredero universal, su sobrino Gonzalo. Patrimonio: la casa de Linares y unos 50.000 € en cuentas.', person: 'gonzalo', source: 'documento', tags: ['herencia', 'testamento', 'dinero'] },
    F8_BANCO_GONZALO: { text: 'Gonzalo Carrasco tiene deudas por 38.000 € (préstamo de su negocio, impagado desde junio) y un embargo en curso.', person: 'gonzalo', source: 'documento', tags: ['dinero', 'deuda'] },
    F8_VEH: { text: 'Vehículos: Rubén Lozano, todoterreno compacto propio y furgoneta de la empresa; Gonzalo Carrasco, turismo gris; Nieves Arroyo, utilitario blanco; Darío Velasco, utilitario rojo; Benito Sastre, furgoneta blanca; Lorena Iglesias, turismo. Felisa no conduce.', source: 'vehículo', tags: ['vehiculo'] },
    F8_LPR_OTROS: { text: 'Otras lecturas del domingo: utilitario de Darío Velasco en la A-66 (salida sur de Salamanca) a las 20:48 dirección sur y a la 01:22 dirección norte; furgoneta de Benito Sastre en la N-630 (salida norte de Béjar) a las 20:30 dirección norte y a la 01:24 dirección sur.', source: 'registro', tags: ['vehiculo', 'matricula'] },
    F8_PRENSA: { text: 'Hemeroteca: lo publicado habla de «una pajarita de papel junto a cada víctima», de mayores «asfixiados en su cama» y de que «vivían solos». Ninguna noticia menciona el tipo de figura, el color del papel, nada escrito dentro ni la teleasistencia.', source: 'prensa', tags: ['prensa', 'pajarita'] },
    F8_PODCAST: { text: 'Pódcast «Sombras del Tormes», de Darío Velasco: el 21/9 fue el primero en unir la muerte de Anselmo a la de Pilar. El 2/10 publicó: «El próximo será pronto, y será en la sierra».', person: 'dario', source: 'prensa', tags: ['prensa', 'podcast'] },

    F8_ANT_DARIO: { text: 'Teléfono de Darío: antena de Linares de 21:25 a 00:48; antes y después, la ruta desde y hacia Salamanca.', time: '21:25', end: '00:48', person: 'dario', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F8_ANT_BENITO: { text: 'Teléfono de Benito: antena de Guijuelo de 20:55 a 01:02, sin interrupciones.', time: '20:55', end: '01:02', person: 'benito', place: 'guijuelo', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F8_ANT_FELISA: { text: 'Teléfono de Felisa: antena de Linares toda la tarde y la noche (vive enfrente de Eloísa).', time: '16:00', end: '02:00', person: 'felisa', place: 'felisa', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F8_ANT_LORENA: { text: 'Teléfono de Lorena: antena de Salamanca toda la tarde y la noche.', time: '16:00', end: '02:00', person: 'lorena', place: 'salamanca', source: 'antena', tags: ['ubicacion', 'telefono'] },

    S8_RUBEN_VISITAS: { kind: 'statement', text: 'Rubén declara que revisó los terminales de las tres víctimas en visitas programadas, como hace con unas cuarenta personas al mes.', person: 'ruben', source: 'declaración', tags: ['teleasistencia', 'visitas'] },
    S8_RUBEN_LLAVES: { kind: 'statement', text: 'Rubén explica que las llaves custodiadas se guardan en un armario con tarjeta y que solo se sacan cuando la central da un aviso.', person: 'ruben', source: 'declaración', tags: ['llave', 'acceso'] },
    S8_RUBEN_MODO: { kind: 'statement', text: 'Rubén explica que el modo prueba deja el terminal sin supervisión de la central y que solo se activa con el código personal de cada técnico.', person: 'ruben', source: 'declaración', tags: ['teleasistencia'] },
    S8_RUBEN_BOTAS: { kind: 'statement', text: 'Rubén declara que trabaja con las botas de seguridad de la empresa, de la talla 43.', person: 'ruben', source: 'declaración', tags: ['calzado'] },
    S8_RUBEN_PAPEL: { kind: 'statement', text: 'Rubén declara que no sabe hacer figuras de papel.', person: 'ruben', source: 'declaración', tags: ['pajarita'] },
    S8_GONZ_AGOSTO: { kind: 'statement', text: 'Gonzalo declara que vio a su tía por última vez en agosto, en las fiestas del pueblo.', person: 'gonzalo', source: 'declaración', tags: ['coartada'] },
    S8_GONZ_NOCHE: { kind: 'statement', text: 'Gonzalo declara que el domingo llegó a su piso de Salamanca a las siete y pico y que no volvió a salir.', time: '19:20', end: '02:00', person: 'gonzalo', place: 'salamanca', source: 'declaración', tags: ['coartada'] },
    S8_GONZ_LLAVE: { kind: 'statement', text: 'Gonzalo declara que tiene llave de la puerta de la calle y de la de la cocina desde siempre.', person: 'gonzalo', source: 'declaración', tags: ['llave', 'acceso'] },
    S8_GONZ_PAJARITA: { kind: 'statement', text: 'Gonzalo declara que sabe hacer pajaritas de papel «como todo el mundo, de pequeño».', person: 'gonzalo', source: 'declaración', tags: ['pajarita'] },
    S8_GONZ_TALLA: { kind: 'statement', text: 'Gonzalo declara que calza un 42 y que usa zapato de vestir.', person: 'gonzalo', source: 'declaración', tags: ['calzado'] },
    S8_GONZ_TARDE: { kind: 'statement', text: 'Gonzalo admite que fue el domingo por la tarde a pedirle dinero a su tía, que discutieron y que se volvió a Salamanca.', time: '17:40', end: '18:35', person: 'gonzalo', place: 'casa', source: 'declaración', tags: ['coartada', 'dinero'] },
    S8_NIEVES_USUARIOS: { kind: 'statement', text: 'Nieves declara que atendía a Anselmo, a Pilar y a Eloísa de lunes a viernes por la mañana, y que fue ella quien encontró a Anselmo y a Pilar.', person: 'nieves', source: 'declaración', tags: ['visitas', 'serie'] },
    S8_NIEVES_DOMINGO: { kind: 'statement', text: 'Nieves declara que el domingo no fue a casa de Eloísa porque los domingos no trabaja.', person: 'nieves', source: 'declaración', tags: ['coartada'] },
    S8_NIEVES_LLAVE: { kind: 'statement', text: 'Nieves declara que nunca ha tenido llave de la casa de Eloísa.', person: 'nieves', source: 'declaración', tags: ['llave', 'acceso'] },
    S8_NIEVES_NOCHE: { kind: 'statement', text: 'Nieves declara que el domingo por la noche estuvo en su casa de Guijuelo y se acostó pronto.', time: '20:00', end: '02:00', person: 'nieves', place: 'guijuelo', source: 'declaración', tags: ['coartada'] },
    S8_NIEVES_PASTILLAS: { kind: 'statement', text: 'Nieves declara que preparaba el pastillero de Eloísa y que por la noche le tocaba medio comprimido de lorazepam.', person: 'nieves', source: 'declaración', tags: ['medicacion'] },
    S8_NIEVES_ZUECOS: { kind: 'statement', text: 'Nieves declara que trabaja con zuecos sanitarios de la talla 39.', person: 'nieves', source: 'declaración', tags: ['calzado'] },
    S8_NIEVES_TARDE: { kind: 'statement', text: 'Nieves admite que el domingo por la tarde fue a casa de Eloísa a llevarle pan y ordenarle las pastillas, fuera de horario y sin apuntarlo.', time: '16:10', end: '16:40', person: 'nieves', place: 'casa', source: 'declaración', tags: ['visitas'] },
    S8_DARIO_VINCULO: { kind: 'statement', text: 'Darío declara que unió las muertes de Anselmo y Pilar porque una vecina de Guijuelo le contó que junto a Anselmo había una pajarita de papel.', person: 'dario', source: 'declaración', tags: ['prensa', 'serie'] },
    S8_DARIO_NOCHE: { kind: 'statement', text: 'Darío declara que el domingo por la noche estuvo en su casa de Salamanca editando el pódcast.', time: '21:00', end: '02:00', person: 'dario', place: 'salamanca', source: 'declaración', tags: ['coartada'] },
    S8_DARIO_FUENTES: { kind: 'statement', text: 'Darío dice que sus datos vienen de «gente de los pueblos y algún guardia jubilado», sin dar nombres.', person: 'dario', source: 'declaración', tags: ['prensa'] },
    S8_DARIO_POST: { kind: 'statement', text: 'Darío dice que «el próximo será en la sierra» era un gancho para el episodio.', person: 'dario', source: 'declaración', tags: ['prensa'] },
    S8_DARIO_FUI: { kind: 'statement', text: 'Darío admite que pasó la noche en Linares, convencido de que la siguiente muerte sería en la sierra: de 22:05 a 22:50 recorrió calles y el camino de las eras grabando sonido, y fumó junto a una tapia.', time: '22:05', end: '22:50', person: 'dario', place: 'eras', source: 'declaración', tags: ['coartada'] },
    S8_BENITO_TRABAJO: { kind: 'statement', text: 'Benito declara que trabaja en la chatarra y que no ha vuelto a hacer «revisiones del gas» desde su condena.', person: 'benito', source: 'declaración', tags: ['antecedentes'] },
    S8_BENITO_NOCHE: { kind: 'statement', text: 'Benito declara que el domingo por la noche estuvo solo en su casa de Béjar.', time: '20:00', end: '02:00', person: 'benito', place: 'bejar', source: 'declaración', tags: ['coartada'] },
    S8_BENITO_BOTAS: { kind: 'statement', text: 'Benito declara que usa botas de seguridad de la talla 43 para la chatarra.', person: 'benito', source: 'declaración', tags: ['calzado'] },
    S8_BENITO_TIMBA: { kind: 'statement', text: 'Benito admite que estuvo de 21:00 a 01:00 en Guijuelo, jugando a las cartas con dinero en la trastienda de un bar; lo ocultó porque está en libertad condicional.', time: '21:00', end: '01:00', person: 'benito', place: 'guijuelo', source: 'declaración', tags: ['coartada'] },
    S8_FELISA_HALLAZGO: { kind: 'statement', text: 'Felisa vio a las 09:00 la persiana de Eloísa bajada, abrió con su copia y la encontró en la cama con un papel doblado encima.', time: '09:10', person: 'felisa', place: 'casa', source: 'testigo', tags: ['testigo', 'hallazgo'] },
    S8_FELISA_TARDE: { kind: 'statement', text: 'Felisa vio a Nieves llegar con una barra de pan a las 16:10 e irse a las 16:40, y el coche de Gonzalo de 17:40 a 18:35. Oyó a Eloísa gritar: «¡No te doy ni un duro más!».', time: '16:10', end: '18:35', person: 'felisa', place: 'casa', source: 'testigo', tags: ['testigo', 'visitas'] },
    S8_FELISA_LLAVES: { kind: 'statement', text: 'Felisa dice que tenían llave ella, el sobrino y la empresa de teleasistencia, y que Eloísa le dio otra a Nieves «aunque no quería que se supiera».', person: 'felisa', source: 'testigo', tags: ['testigo', 'llave'] },
    S8_FELISA_TECNICO: { kind: 'statement', text: 'Felisa dice que el técnico de la teleasistencia fue a revisar el aparato el jueves 1/10 por la mañana.', person: 'felisa', source: 'testigo', tags: ['testigo', 'teleasistencia'] },
    S8_LORENA_NIEVES: { kind: 'statement', text: 'Lorena dice que Nieves iba a casa de su madre de lunes a viernes por la mañana y que su madre la adoraba.', person: 'lorena', source: 'declaración', tags: ['visitas'] },
    S8_LORENA_NOCHE: { kind: 'statement', text: 'Lorena declara que el domingo 4 por la noche estaba en su casa de Salamanca con su marido.', time: '20:00', end: '02:00', person: 'lorena', place: 'salamanca', source: 'declaración', tags: ['coartada'] },
    S8_LORENA_PODCAST: { kind: 'statement', text: 'Lorena dice que Darío Velasco se presentó dos veces en su puerta para grabarla y que la segunda le denunció.', person: 'lorena', source: 'declaración', tags: ['prensa'] }
  },

  /* Contradicciones comunes a todas las versiones (pistas falsas incluidas). */
  conflicts: [
    { id: 'C01', a: 'S8_NIEVES_DOMINGO', b: 'S8_FELISA_TARDE', type: 'Hecho distinto', severity: 'media', desc: 'Nieves dice que el domingo no fue a casa de Eloísa; Felisa la vio llegar a las 16:10 con una barra de pan.' },
    { id: 'C02', a: 'S8_NIEVES_LLAVE', b: 'S8_FELISA_LLAVES', type: 'Hecho distinto', severity: 'media', desc: 'Nieves dice que nunca tuvo llave; Felisa afirma que Eloísa le dio una a escondidas.' },
    { id: 'C03', a: 'S8_GONZ_AGOSTO', b: 'S8_FELISA_TARDE', type: 'Hecho distinto', severity: 'media', desc: 'Gonzalo dice que no veía a su tía desde agosto; Felisa vio su coche el domingo de 17:40 a 18:35 y oyó la discusión.' },
    { id: 'C04', a: 'S8_DARIO_NOCHE', b: 'F8_BAR_DARIO', type: 'Lugar distinto', severity: 'media', desc: 'Darío dice que pasó la noche en Salamanca; la cámara del bar de Linares le graba de 21:30 a 00:40, con una salida de 22:05 a 22:50.' },
    { id: 'C05', a: 'S8_BENITO_NOCHE', b: 'F8_LPR_OTROS', type: 'Lugar distinto', severity: 'media', desc: 'Benito dice que no salió de su casa de Béjar; su furgoneta sale de Béjar a las 20:30 y no vuelve hasta la 01:24.' }
  ],

  verdictOptions: {
    culpritLabel: 'Autoría de la muerte de Eloísa',
    culprits: [
      { id: 'ruben', label: 'Rubén Lozano Hierro' }, { id: 'gonzalo', label: 'Gonzalo Carrasco Merino' }, { id: 'nieves', label: 'Nieves Arroyo Sanz' },
      { id: 'dario', label: 'Darío Velasco Prieto' }, { id: 'benito', label: 'Benito Sastre Rollán' }, { id: 'felisa', label: 'Felisa Mangas Ortiz' },
      { id: 'lorena', label: 'Lorena Iglesias Vidal' }, { id: 'desconocido', label: 'Un autor en serie no identificado' },
      { id: 'insuficiente', label: 'Evidencia insuficiente para una atribución concluyente' }
    ],
    motives: [
      { id: 'm8_serie', label: 'Impulso de un autor en serie que elegía a mayores que vivían solos y a los que llegaba por su trabajo' },
      { id: 'm8_poder', label: 'Evitar que la víctima le quitara el poder notarial y cambiara el testamento' },
      { id: 'm8_robos', label: 'Tapar los robos de dinero a las víctimas antes de que lo denunciaran' },
      { id: 'm8_notoriedad', label: 'Notoriedad: alimentar la historia de un pódcast' },
      { id: 'm8_robo', label: 'Robar en la vivienda' },
      { id: 'm8_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me8_modo', label: 'Llave custodiada, terminal en modo prueba con un código técnico, sofocación con la almohada y la misma grulla firmada en las tres casas' },
      { id: 'me8_copia', label: 'Entrada por el corral con llave propia, estrangulación manual y una pajarita copiada de lo que contaba la prensa' },
      { id: 'me8_desenchufe', label: 'Sedación con su propia medicación, terminal desenchufado, sofocación con la almohada y una grulla firmada que imita la figura hallada junto a una muerte natural' },
      { id: 'me8_forzada', label: 'Entrada para robar; la víctima se despertó y fue asfixiada' },
      { id: 'me8_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento de la muerte',
    windows: [
      { id: 'w8_2300', label: 'Entre las 22:50 y las 23:50 del domingo' },
      { id: 'w8_tarde', label: 'Entre las 16:00 y las 19:00 del domingo' },
      { id: 'w8_mad', label: 'Entre la 01:00 y las 04:00 del lunes' },
      { id: 'w8_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F8_MESILLA', 'F8_REVISTA', 'F8_CUADERNO', 'F8_COLILLA'], label: 'mesilla, revista, cuaderno de visitas y colilla del camino' },
    movement: { ids: ['D8_LPR', 'D8_BAR', 'D8_CENTRAL'], label: 'lectores de matrícula, cámara del bar y registros de la teleasistencia' },
    usefulLab: ['E8_01:autopsia', 'E8_02:documentos', 'E8_02:adn', 'E8_07:comparativa', 'E8_10:toxicologia']
  },

  trialIntro: {},
  trial: {},

  /* ================= VERSIONES ================= */
  variants: {
    /* ---------- Versión A: un único autor en serie ---------- */
    ruben: {
      facts: {
        F8_PAJ3: { text: 'La figura es una grulla de papiroflexia de papel granate, colocada sobre el pecho con el pico hacia la cara.', person: 'eloisa', place: 'casa', source: 'escena', tags: ['pajarita', 'firma'] },
        F8_PAJ3_DOC: { pericia: { type: 'caligrafia', match: 'ruben', label: 'frase escrita dentro de la grulla' }, text: 'Documentoscopia: papel de papiroflexia granate de 15 × 15 cm, del mismo tipo que el de las grullas de Anselmo y Pilar. Dentro, a lápiz: «Ya descansas, Eloísa. 3». Es la misma letra de las grullas 1 y 2 y coincide con las muestras de Rubén Lozano (partes de revisión firmados).', source: 'laboratorio', tags: ['pajarita', 'firma', 'caligrafia'] },
        F8_PAJ3_ADN: { text: 'ADN de la figura: ningún perfil aprovechable. Se manipuló con guantes.', source: 'laboratorio', tags: ['adn', 'pajarita'] },
        F8_AUTOPSIA: { text: 'Autopsia de Eloísa: sofocación con un objeto blando. Petequias en las conjuntivas y erosiones en la mucosa del labio por presión; sin lesiones en el cuello ni de defensa. Lorazepam en sangre en dosis terapéutica, la de su medicación.', person: 'eloisa', source: 'laboratorio', tags: ['muerte', 'autopsia'] },
        F8_ALMOHADA: { text: 'Una de las dos almohadas está a los pies de la cama, con una mancha en la funda.', place: 'casa', source: 'escena', tags: ['almohada', 'arma'] },
        F8_ALMOHADA_LAB: { text: 'Biología: saliva y una pequeña mancha de sangre de Eloísa en la cara interna de la almohada caída, compatibles con haberla presionado contra su cara.', source: 'laboratorio', tags: ['almohada', 'arma'] },
        F8_VASO_LAB: { text: 'Toxicología del vaso de la mesilla: agua, sin sustancias añadidas.', source: 'laboratorio', tags: ['tox', 'medicacion'] },
        F8_TERMINAL: { text: 'El terminal de teleasistencia está enchufado y operativo, con la luz verde. En la pantalla, los últimos eventos: «Modo prueba 22:56» y «Fin modo prueba 23:48».', time: '22:56', end: '23:48', place: 'casa', source: 'escena', tags: ['teleasistencia'] },
        F8_REVISTA: { text: 'La revista de programación de la semana está entera, abierta por el domingo.', place: 'casa', source: 'escena', tags: ['revista'] },
        F8_CAJON: { text: 'En el cajón del aparador: la cartilla de ahorro, sin nada anómalo, y un sobre con 600 € en efectivo, intacto.', place: 'casa', source: 'escena', tags: ['dinero', 'documento'] },
        F8_CANCELA: { text: 'La cancela del corral tiene el cerrojo descorrido desde dentro. En el barro hay pisadas de una bota de suela gruesa que salen de la puerta de la cocina hacia el camino de las eras; ninguna entra.', place: 'casa', source: 'escena', tags: ['calzado', 'acceso'] },
        F8_CALZADO: { pericia: { type: 'calzado', match: 'bota_seguridad', label: 'pisadas del corral' }, text: 'Comparativa de calzado: bota de seguridad industrial de la talla 43, un modelo muy extendido entre técnicos y operarios.', source: 'laboratorio', tags: ['calzado'] },
        F8_RODADAS: { text: 'En el ensanche del camino de las eras, a 40 m de la cancela, hay rodadas recientes de un neumático ancho.', place: 'eras', source: 'escena', tags: ['vehiculo'] },
        F8_NEUMATICO: { pericia: { type: 'neumatico', match: 'todoterreno', label: 'rodadas del camino de las eras' }, text: 'Comparativa de neumáticos: todoterreno compacto (225/65 R17).', source: 'laboratorio', tags: ['vehiculo'] },
        F8_CONTENEDOR: { text: 'El contenedor de la esquina se vació el domingo a las 21:00. Desde entonces solo hay dos bolsas de basura doméstica de los vecinos; nada que llame la atención.', place: 'casa', source: 'escena', tags: ['basura'] },
        F8_CONTENEDOR_ADN: { text: 'ADN de lo hallado en el contenedor: ninguna muestra útil.', source: 'laboratorio', tags: ['adn', 'basura'] },
        F8_E1_HALLAZGO: { text: 'Expediente de Anselmo Rubio: hallado muerto en su cama el 25/8 a las 09:05 por Nieves Arroyo, su auxiliar de ayuda a domicilio. Puerta cerrada con llave, sin forzar.', person: 'anselmo', place: 'guijuelo', source: 'informe policial', tags: ['hallazgo', 'serie'] },
        F8_E1_AUTOPSIA: { text: 'Autopsia de Anselmo, revisada en septiembre: sofocación con un objeto blando. Petequias conjuntivales y erosiones en la mucosa del labio; sin lesiones en el cuello ni de defensa. En agosto se había atribuido a una causa natural.', person: 'anselmo', source: 'laboratorio', tags: ['muerte', 'autopsia', 'serie'] },
        F8_E1_FIGURA: { text: 'Sobre el pecho de Anselmo había una grulla de papiroflexia de papel granate de 15 × 15 cm. Dentro, a lápiz: «Ya descansas, Anselmo. 1». Ese detalle nunca se hizo público.', person: 'anselmo', source: 'laboratorio', tags: ['pajarita', 'firma', 'serie'] },
        F8_CEN_1: { text: 'Central, casa de Anselmo (Guijuelo), noche del 24 al 25/8: modo prueba activado con el código de técnico T-07 de 23:08 a 00:01. Ninguna pulsación del colgante.', person: 'anselmo', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_2: { text: 'Central, casa de Pilar (Fuenterroble), noche del 17/9: modo prueba activado con el código T-07 de 22:41 a 23:37. Ninguna pulsación del colgante.', person: 'pilar', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_3: { text: 'Central, casa de Eloísa, domingo 4/10: modo prueba activado con el código T-07 de 22:56 a 23:48. Mientras dura, la central no supervisa el domicilio.', time: '22:56', end: '23:48', person: 'eloisa', place: 'casa', source: 'registro', tags: ['teleasistencia'] },
        F8_LLAVES: { text: 'Armario de llaves custodiadas: la llave de Eloísa se retiró el domingo 4/10 a las 21:12 con la tarjeta de Rubén Lozano y se devolvió el lunes a las 07:58, sin ningún aviso de la central asociado. Lo mismo con la de Anselmo (24/8, de 21:30 a 07:50) y con la de Pilar (17/9, de 21:05 a 07:55).', time: '21:12', person: 'ruben', source: 'registro', tags: ['llave', 'acceso', 'serie'] },
        F8_CUAD_RUBEN: { text: 'Cuadrante de guardias: Rubén estuvo de guardia localizable las noches del 24/8, del 17/9 y del 4/10. Las tres las pidió él, cambiándolas con compañeros, y en ninguna de las tres hubo una avería atendida.', person: 'ruben', source: 'registro', tags: ['guardia', 'serie'] },
        F8_TEL_ELO_MSG: { text: 'Mensaje de Eloísa a Felisa (jueves 1/10, 12:30): «Ha venido el de la teleasistencia. Me ha preguntado mucho si duermo sola y a qué hora me acuesto. Qué chico tan pesado».', person: 'eloisa', source: 'mensaje', tags: ['mensaje', 'teleasistencia'] },
        F8_BANCO_ELO: { text: 'Cuentas de Eloísa: movimientos ordinarios (pensión, recibos y reintegros en la ventanilla de Linares). Saldo de 51.800 €. Nada anómalo.', person: 'eloisa', source: 'documento', tags: ['dinero'] },
        F8_BANCO_PILAR: { text: 'Cuentas de Pilar: movimientos ordinarios hasta su muerte.', person: 'pilar', source: 'documento', tags: ['dinero'] },
        F8_LPR_GONZALO: { text: 'Lector de la A-66 (salida sur de Salamanca): turismo de Gonzalo Carrasco a las 16:52 dirección sur y a las 19:12 dirección norte. Ninguna lectura más esa noche.', time: '16:52', end: '19:12', person: 'gonzalo', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_LPR_RUBEN: { text: 'Lector de la N-630 (salida norte de Béjar): todoterreno de Rubén Lozano a las 22:08 dirección norte y a las 00:24 dirección sur. La furgoneta de la empresa no se movió en toda la noche.', time: '22:08', end: '00:24', person: 'ruben', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_ANT_RUBEN: { text: 'Teléfono de Rubén: antena de Béjar hasta las 22:10; antena de Linares de 22:43 a 23:53; de nuevo Béjar desde las 00:20.', time: '22:43', end: '23:53', person: 'ruben', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_GONZALO: { text: 'Teléfono de Gonzalo: antena de Linares de 17:35 a 18:38; Salamanca desde las 19:20 y el resto de la noche.', time: '19:20', end: '02:00', person: 'gonzalo', place: 'salamanca', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_NIEVES: { text: 'Teléfono de Nieves: antena de Linares de 16:05 a 16:45; Guijuelo desde las 17:05 y el resto de la noche.', time: '17:05', end: '02:00', person: 'nieves', place: 'guijuelo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S8_RUBEN_NOCHE: { kind: 'statement', text: 'Rubén declara que pasó la noche de guardia en su casa de Béjar y que no hubo ningún aviso.', time: '21:00', end: '02:00', person: 'ruben', place: 'bejar', source: 'declaración', tags: ['coartada', 'guardia'] },
        S8_RUBEN_EXCUSA: { kind: 'statement', text: 'Rubén dice que sacó la llave de Eloísa «por si había un aviso esa noche», que no llegó a usarla y que la devolvió por la mañana.', person: 'ruben', source: 'declaración', tags: ['llave', 'coartada'] },
        S8_GONZ_PODER: { kind: 'statement', text: 'Gonzalo declara que tiene un poder notarial de su tía desde 2023 para gestiones y que casi nunca lo ha usado.', person: 'gonzalo', source: 'declaración', tags: ['dinero', 'poder'] },
        S8_NIEVES_ANSELMO: { kind: 'statement', text: 'Nieves declara que encontró a Anselmo el 25/8 a las nueve, en su visita: estaba en la cama, frío, con una figurita de papel sobre el pecho.', person: 'nieves', source: 'declaración', tags: ['hallazgo', 'serie'] },
        S8_DARIO_VIO: { kind: 'statement', text: 'Darío declara que hacia las 22:44 vio un todoterreno oscuro aparcar con las luces apagadas en el camino de las eras y bajar a un hombre con un chaleco de trabajo, que se fue hacia la calle de delante.', time: '22:44', person: 'dario', place: 'eras', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S8_FELISA_NOCHE: { kind: 'statement', text: 'Felisa oyó a las 22:55 abrir con llave, dos vueltas, la puerta de la calle de Eloísa. Pensó que era el sobrino. No oyó ningún coche por delante.', time: '22:55', person: 'felisa', place: 'casa', source: 'testigo', tags: ['testigo', 'llave'] },
        S8_FELISA_ELOISA: { kind: 'statement', text: 'Felisa dice que Eloísa le contó que el técnico de la teleasistencia le había hecho muchas preguntas: si dormía sola, a qué hora se acostaba.', person: 'felisa', source: 'testigo', tags: ['testigo', 'teleasistencia'] },
        S8_LORENA_MADRE: { kind: 'statement', text: 'Lorena dice que su madre no se quejaba de nada, ni de dinero ni de nadie.', person: 'lorena', source: 'declaración', tags: ['dinero'] },
        S8_LORENA_TECNICO: { kind: 'statement', text: 'Lorena dice que en la revisión del 9/9 el técnico de la teleasistencia le hizo a su madre una grulla de papel con el folleto del aparato «para que se riera»; ella la vio en la mesa.', person: 'lorena', source: 'declaración', tags: ['teleasistencia', 'pajarita'] }
      },
      evidence: {
        E8_02: { detail: 'Una grulla de papiroflexia de papel granate, con las alas abiertas y el pico hacia la cara de Eloísa.' },
        E8_03: { detail: 'Una almohada bajo la cabeza; la otra, a los pies de la cama, con una mancha en la funda.' },
        E8_04: { detail: 'Luz verde. En la pantalla, dos eventos de la noche: «Modo prueba» y «Fin modo prueba».' },
        E8_08: { detail: 'La revista de programación de la semana, entera, abierta por el domingo.' },
        E8_11: { detail: 'La cartilla de ahorro y un sobre con billetes.' },
        E8_07: { detail: 'Cerrojo descorrido. En el barro, pisadas de bota de suela gruesa que salen hacia el camino.' },
        E8_12: { detail: 'Además de las de tractor, unas rodadas anchas y recientes donde el camino se ensancha.' },
        E8_13: { detail: 'Dos bolsas de basura doméstica. Nada más.' }
      },
      answers: {
        ruben: {
          noche: { a: 'De guardia, en mi casa de Béjar. No hubo ni un aviso; me acosté a las doce.', type: 'mentira' },
          papel: { a: 'No. Nunca he tenido paciencia para esas cosas.', type: 'mentira' }
        },
        gonzalo: {
          noche: { a: 'En mi piso de Salamanca. Llegué a las siete y pico y no volví a salir.', type: 'verdad' },
          poder: { a: 'Sí, desde 2023, para gestiones del banco. Casi nunca lo he usado.', type: 'verdad' }
        },
        nieves: {
          noche: { a: 'En mi casa de Guijuelo. Cené y me acosté pronto; el lunes entro a las ocho.', type: 'verdad' },
          anselmo: { a: 'El martes 25, a las nueve, en mi visita. Estaba en la cama, frío, con una figurita de papel encima del pecho. Llamé al 112 temblando.', type: 'verdad' }
        },
        felisa: {
          noche: { a: 'A las once menos cinco oí abrir la puerta de Eloísa con llave, dos vueltas. Pensé que sería el sobrino, que tiene llave. Coche no oí ninguno por delante.' },
          eloisa: { a: 'Que el chico de la teleasistencia le había hecho muchas preguntas: si dormía sola, a qué hora se acostaba… Le pareció un pesado.' }
        },
        lorena: {
          madre: { a: 'No se quejaba de nada. Ni de dinero ni de nadie.' },
          tecnico: { a: 'Vino el 9 de septiembre. Le hizo a mi madre una grulla de papel con el folleto del aparato, para que se riera. Yo la vi en la mesa.' }
        }
      },
      confront: {
        ruben: {
          F8_LLAVES: { a: 'La saqué por si había un aviso esa noche. No llegué a usarla. La devolví por la mañana.', reveals: ['S8_RUBEN_EXCUSA'] },
          F8_CEN_3: { a: 'Alguien habrá usado mi código. En la oficina lo conoce más de uno.', reveals: [] },
          F8_CEN_1: { a: 'Ese código lo puede teclear cualquiera que lo sepa.', reveals: [] },
          F8_CEN_2: { a: 'Ya le he dicho que mi código no es ningún secreto.', reveals: [] },
          F8_LPR_RUBEN: { a: 'Salí a dar una vuelta con el coche. No podía dormir. No fui a ningún sitio.', reveals: [] },
          F8_CUAD_RUBEN: { a: 'Me cambio las guardias porque se pagan más. Como todos.', reveals: [] },
          S8_LORENA_TECNICO: { a: 'Una tontería para hacer reír a una señora. No sé hacerlas bien.', reveals: [] },
          F8_PAJ3_DOC: { a: '(Se queda callado, mirando la mesa.) Quiero un abogado.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'CA1', a: 'S8_RUBEN_NOCHE', b: 'F8_LLAVES', type: 'Hecho distinto', severity: 'alta', desc: 'Rubén dice que pasó la guardia en casa y sin avisos; con su tarjeta se sacó la llave de Eloísa a las 21:12 y se devolvió a las 07:58, sin ningún aviso asociado.' },
        { id: 'CA2', a: 'S8_RUBEN_NOCHE', b: 'F8_CEN_3', type: 'Lugar distinto', severity: 'alta', desc: 'Rubén dice que no salió de casa; su código T-07 puso el terminal de Eloísa en modo prueba de 22:56 a 23:48, en la hora de la muerte.' },
        { id: 'CA3', a: 'S8_RUBEN_NOCHE', b: 'F8_LPR_RUBEN', type: 'Lugar distinto', severity: 'alta', desc: 'Rubén dice que no salió de casa; su todoterreno sale de Béjar a las 22:08 y no vuelve hasta las 00:24.' },
        { id: 'CA4', a: 'S8_RUBEN_PAPEL', b: 'S8_LORENA_TECNICO', type: 'Hecho distinto', severity: 'alta', desc: 'Rubén dice que no sabe hacer figuras de papel; Lorena le vio plegar una grulla para su madre durante la revisión del 9/9.' },
        { id: 'CA5', a: 'S8_RUBEN_EXCUSA', b: 'F8_CEN_3', type: 'Hecho distinto', severity: 'alta', desc: 'Rubén dice que sacó la llave pero no la usó; esa noche su código se tecleó en el terminal que está dentro de la casa de Eloísa.' }
      ],
      truth: {
        culprit: 'ruben', motive: 'm8_serie', method: 'me8_modo', window: 'w8_2300', accomplices: [],
        partialMethods: {
          me8_desenchufe: 'Viste la sofocación y que la teleasistencia quedó anulada, pero no que se hizo con un código técnico ni que la firma era la misma en las tres casas.',
          me8_forzada: 'Viste cómo murió, pero no cómo entró el autor ni cómo anuló la teleasistencia.'
        },
        decisive: ['F8_CEN_1', 'F8_CEN_2', 'F8_CEN_3', 'F8_LLAVES', 'F8_CUAD_RUBEN', 'F8_PAJ3_DOC', 'F8_LPR_RUBEN', 'F8_E1_FIGURA', 'F8_E2_FIGURA', 'S8_LORENA_TECNICO', 'F8_CALZADO', 'F8_NEUMATICO', 'S8_FELISA_NOCHE', 'S8_DARIO_VIO', 'F8_ANT_RUBEN', 'F8_TEL_ELO_MSG', 'S8_RUBEN_MODO'],
        weak: ['F8_COLILLA_ADN', 'F8_PUERTA_POLVO', 'F8_TERMINAL_POLVO', 'S8_FELISA_TARDE', 'F8_BANCO_GONZALO', 'F8_TESTAMENTO', 'F8_E2_BENITO', 'F8_PODCAST', 'S8_NIEVES_USUARIOS', 'S8_BENITO_BOTAS'],
        keyConflicts: ['CA1', 'CA2', 'CA4'],
        narrative: [
          'Rubén Lozano, técnico de mantenimiento de la empresa de teleasistencia, mató a Anselmo Rubio, a Pilar Vidal y a Eloísa Carrasco. Elegía a personas mayores que vivían solas y a las que conocía por su trabajo: en cada revisión preguntaba si dormían solas y a qué hora se acostaban.',
          'Las tres noches pidió la guardia, sacó del armario de custodia la llave de la víctima con su propia tarjeta y, ya dentro, puso el terminal en modo prueba con su código T-07: durante casi una hora la central dejaba de vigilar la casa. Las asfixiaba con la almohada y dejaba sobre el pecho una grulla de papel granate con una frase a lápiz: «Ya descansas», el nombre y un número. La prensa solo supo de «una pajarita».',
          'El domingo 4 salió de Béjar a las 22:08 en su todoterreno, no en la furgoneta de la empresa. Lo dejó en el camino de las eras, donde le vio Darío, y a las 22:55 abrió la puerta de la calle con la llave custodiada: Felisa oyó las dos vueltas. Activó el modo prueba a las 22:56, asfixió a Eloísa y salió por el corral con sus botas de seguridad del 43. A las 23:48 desactivó el modo prueba y a las 00:24 volvía a pasar por Béjar. Por la mañana devolvió la llave.',
          'Nada de esto se ve en una sola muerte. El patrón aparece al cruzar, para las tres noches, los eventos de la central, el armario de llaves y el cuadrante de guardias. La letra de la grulla es la suya, y Lorena le vio plegar una para su madre.',
          'Gonzalo ocultó su visita de la tarde porque fue a pedir dinero; Nieves calló que iba los domingos y que tenía llave; Darío mintió sobre dónde estaba porque rondaba las casas grabando para su pódcast; Benito ocultó una partida de cartas que podía costarle la libertad condicional.'
        ]
      },
      trial: {
        ruben: [
          { id: 'O1', text: 'Mi cliente pasó la guardia en su casa de Béjar: esa noche no hubo ningún aviso.', accept: ['F8_LPR_RUBEN', 'F8_LLAVES', 'F8_CEN_3', 'F8_ANT_RUBEN', 'S8_FELISA_NOCHE'] },
          { id: 'O2', text: 'Mi cliente entró en las tres casas porque era su trabajo, de día y con parte firmado.', accept: ['F8_CEN_1', 'F8_CEN_2', 'F8_CEN_3', 'F8_LLAVES', 'F8_CUAD_RUBEN'] },
          { id: 'O3', text: 'Cualquiera que leyera la prensa pudo dejar esa figura de papel.', accept: ['F8_PAJ3_DOC', 'F8_E1_FIGURA', 'F8_E2_FIGURA', 'F8_PRENSA', 'S8_LORENA_TECNICO'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en casa de Eloísa esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién puso el terminal en modo prueba con el código T-07 en las tres casas.', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué las tres grullas tienen la misma letra y el mismo papel.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['ruben'],
        spatialBonus: ['F8_LPR_RUBEN', 'F8_RODADAS', 'F8_NEUMATICO'],
        temporalConflicts: ['CA2', 'CA5'],
        lateral: [
          { type: 'fact', id: 'S8_LORENA_TECNICO', pts: 25, yes: 'Preguntaste a la familia de otra víctima por el técnico: la grulla del folleto era un detalle clave.', no: 'No preguntaste a la familia de Pilar por la revisión del técnico.' },
          { type: 'conflict', id: 'CA2', pts: 30, yes: 'Cruzaste los eventos de la central con la versión del técnico.', no: 'No cruzaste los eventos de la central con la versión del técnico.' },
          { type: 'conflict', id: 'CA4', pts: 20 },
          { type: 'chosen', id: 'F8_LLAVES', pts: 25 }
        ]
      }
    },

    /* ---------- Versión B: el imitador ---------- */
    gonzalo: {
      facts: {
        F8_PAJ3: { text: 'La figura es una pajarita de papel clásica, de papel satinado impreso con letras y fotos, colocada sobre el pecho.', person: 'eloisa', place: 'casa', source: 'escena', tags: ['pajarita', 'firma'] },
        F8_PAJ3_DOC: { text: 'Documentoscopia: no es una grulla, sino una pajarita clásica plegada con una hoja de revista de programación de televisión (páginas 23 y 24), arrancada por la grapa. El interior está en blanco.', source: 'laboratorio', tags: ['pajarita', 'firma', 'revista'] },
        F8_PAJ3_ADN: { pericia: { type: 'adn', match: 'gonzalo', label: 'interior de los pliegues de la pajarita' }, text: 'ADN en el interior de los pliegues de la pajarita: perfil genético de Gonzalo Carrasco. Quien la plegó la manipuló por dentro y sin guantes.', person: 'gonzalo', source: 'laboratorio', tags: ['adn', 'pajarita'] },
        F8_AUTOPSIA: { text: 'Autopsia de Eloísa: asfixia por estrangulación manual. Hematomas de presión digital a ambos lados del cuello, fractura del asta del hioides y lesiones de defensa en los antebrazos. Lorazepam en sangre en dosis terapéutica, la de su medicación.', person: 'eloisa', source: 'laboratorio', tags: ['muerte', 'autopsia'] },
        F8_ALMOHADA: { text: 'Las dos almohadas están en su sitio, bajo la cabeza de Eloísa, sin marcas.', place: 'casa', source: 'escena', tags: ['almohada'] },
        F8_ALMOHADA_LAB: { text: 'Biología: ni saliva ni sangre en las almohadas. No se presionaron contra la cara.', source: 'laboratorio', tags: ['almohada'] },
        F8_VASO_LAB: { text: 'Toxicología del vaso de la mesilla: agua, sin sustancias añadidas.', source: 'laboratorio', tags: ['tox', 'medicacion'] },
        F8_TERMINAL: { text: 'El terminal de teleasistencia está enchufado y operativo, con la luz verde. En la pantalla, el último evento: «Test automático 20:00».', place: 'casa', source: 'escena', tags: ['teleasistencia'] },
        F8_REVISTA: { text: 'A la revista de programación de la semana le falta una hoja: la arrancaron por la grapa (páginas 23 y 24).', place: 'casa', source: 'escena', tags: ['revista'] },
        F8_CAJON: { text: 'En el cajón del aparador: la copia del poder notarial a favor de Gonzalo (2023), con «REVOCAR · martes 10:00» escrito a mano en la portada, y la cartilla de ahorro.', person: 'gonzalo', place: 'casa', source: 'escena', tags: ['poder', 'documento'] },
        F8_CANCELA: { text: 'La cancela del corral tiene el cerrojo descorrido. En el barro hay pisadas de un zapato de suela lisa que entran desde el camino de las eras hasta la puerta de la cocina y vuelven.', place: 'casa', source: 'escena', tags: ['calzado', 'acceso'] },
        F8_CALZADO: { pericia: { type: 'calzado', match: 'zapato', label: 'pisadas del corral' }, text: 'Comparativa de calzado: zapato de vestir de la talla 42, con suela de cuero lisa.', source: 'laboratorio', tags: ['calzado'] },
        F8_RODADAS: { text: 'Junto a la cancela, en el camino de las eras, hay rodadas recientes de un turismo que maniobró para dar la vuelta.', place: 'eras', source: 'escena', tags: ['vehiculo'] },
        F8_NEUMATICO: { pericia: { type: 'neumatico', match: 'turismo', label: 'rodadas del camino de las eras' }, text: 'Comparativa de neumáticos: turismo (205/55 R16).', source: 'laboratorio', tags: ['vehiculo'] },
        F8_CONTENEDOR: { text: 'El contenedor de la esquina se vació el domingo a las 21:00. Desde entonces solo hay dos bolsas de basura doméstica de los vecinos; nada que llame la atención.', place: 'casa', source: 'escena', tags: ['basura'] },
        F8_CONTENEDOR_ADN: { text: 'ADN de lo hallado en el contenedor: ninguna muestra útil.', source: 'laboratorio', tags: ['adn', 'basura'] },
        F8_E1_HALLAZGO: { text: 'Expediente de Anselmo Rubio: hallado muerto en su cama el 25/8 a las 09:05 por Nieves Arroyo, su auxiliar de ayuda a domicilio. Puerta cerrada con llave, sin forzar.', person: 'anselmo', place: 'guijuelo', source: 'informe policial', tags: ['hallazgo', 'serie'] },
        F8_E1_AUTOPSIA: { text: 'Autopsia de Anselmo, revisada en septiembre: sofocación con un objeto blando. Petequias conjuntivales y erosiones en la mucosa del labio; sin lesiones en el cuello ni de defensa. En agosto se había atribuido a una causa natural.', person: 'anselmo', source: 'laboratorio', tags: ['muerte', 'autopsia', 'serie'] },
        F8_E1_FIGURA: { text: 'Sobre el pecho de Anselmo había una grulla de papiroflexia de papel granate de 15 × 15 cm. Dentro, a lápiz: «Ya descansas, Anselmo. 1». Ese detalle nunca se hizo público.', person: 'anselmo', source: 'laboratorio', tags: ['pajarita', 'firma', 'serie'] },
        F8_CEN_1: { text: 'Central, casa de Anselmo (Guijuelo), noche del 24 al 25/8: pérdida de alimentación del terminal a las 23:15 (desenchufado); se reconecta a las 23:58. Ninguna pulsación del colgante.', person: 'anselmo', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_2: { text: 'Central, casa de Pilar (Fuenterroble), noche del 17/9: pérdida de alimentación del terminal a las 22:40; se reconecta a las 23:31. Ninguna pulsación del colgante.', person: 'pilar', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_3: { text: 'Central, casa de Eloísa, domingo 4/10: ninguna incidencia. El terminal estuvo conectado y supervisado toda la noche, y el colgante no se pulsó.', person: 'eloisa', source: 'registro', tags: ['teleasistencia'] },
        F8_LLAVES: { text: 'Armario de llaves custodiadas: las llaves de Anselmo, Pilar y Eloísa solo salieron en horario de trabajo, para las revisiones programadas (la de Eloísa, el 1/10 de 09:05 a 12:40, con la tarjeta de Rubén Lozano). Ninguna salió de noche.', person: 'ruben', source: 'registro', tags: ['llave', 'acceso'] },
        F8_CUAD_RUBEN: { text: 'Cuadrante de guardias: Rubén estuvo de guardia localizable el 4/10, pero no el 24/8 ni el 17/9. El 4/10 atendió una avería en Béjar, con parte firmado por el usuario, de 22:35 a 23:50.', person: 'ruben', source: 'registro', tags: ['guardia'] },
        F8_TEL_ELO_MSG: { text: 'Mensaje de Eloísa a Gonzalo (sábado 3/10, 13:20): «He visto lo que has hecho con el poder. El martes voy a la notaría a quitártelo y a cambiar el testamento. No vengas».', person: 'gonzalo', source: 'mensaje', tags: ['mensaje', 'poder', 'testamento'] },
        F8_BANCO_ELO: { text: 'Cuentas de Eloísa: con el poder notarial de 2023, Gonzalo se transfirió 41.000 € entre el 3 y el 25 de septiembre. El 2/10 Eloísa pidió en la sucursal el detalle de esas transferencias.', person: 'gonzalo', source: 'documento', tags: ['dinero', 'poder'] },
        F8_BANCO_PILAR: { text: 'Cuentas de Pilar: movimientos ordinarios hasta su muerte.', person: 'pilar', source: 'documento', tags: ['dinero'] },
        F8_LPR_GONZALO: { text: 'Lector de la A-66 (salida sur de Salamanca): turismo de Gonzalo Carrasco a las 16:52 dirección sur, a las 19:12 dirección norte, a las 22:26 dirección sur y a las 00:25 dirección norte.', time: '22:26', end: '00:25', person: 'gonzalo', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_LPR_RUBEN: { text: 'Lector de la N-630 (Béjar): la furgoneta de la empresa, conducida por Rubén Lozano, cruza la travesía de Béjar a las 22:28 hacia el barrio de la avería y a las 23:58 de vuelta. Su todoterreno no tiene lecturas.', time: '22:28', end: '23:58', person: 'ruben', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_ANT_RUBEN: { text: 'Teléfono de Rubén: antena de Béjar toda la noche; llamada de la central a las 22:21 por una avería.', time: '22:00', end: '02:00', person: 'ruben', place: 'bejar', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_GONZALO: { text: 'Teléfono de Gonzalo: antena de Linares de 17:35 a 18:38; Salamanca de 19:20 a 22:20; Linares de 23:05 a 23:48; Salamanca desde las 00:30.', time: '23:05', end: '23:48', person: 'gonzalo', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_NIEVES: { text: 'Teléfono de Nieves: antena de Linares de 16:05 a 16:45; Guijuelo desde las 17:05 y el resto de la noche.', time: '17:05', end: '02:00', person: 'nieves', place: 'guijuelo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S8_RUBEN_NOCHE: { kind: 'statement', text: 'Rubén declara que estuvo de guardia y que atendió una avería en Béjar de 22:35 a 23:50.', time: '22:35', end: '23:50', person: 'ruben', place: 'bejar', source: 'declaración', tags: ['coartada', 'guardia'] },
        S8_GONZ_PODER: { kind: 'statement', text: 'Gonzalo declara que tiene un poder notarial de su tía desde 2023 y que nunca lo ha usado.', person: 'gonzalo', source: 'declaración', tags: ['dinero', 'poder'] },
        S8_GONZ_VOLVI: { kind: 'statement', text: 'Gonzalo admite que volvió a Linares el domingo por la noche «para pedirle perdón», pero dice que no le abrió y que se fue sin entrar.', time: '23:05', end: '23:45', person: 'gonzalo', place: 'eras', source: 'declaración', tags: ['coartada'] },
        S8_NIEVES_ANSELMO: { kind: 'statement', text: 'Nieves declara que encontró a Anselmo el 25/8 a las nueve, en su visita: estaba en la cama, frío, con una figurita de papel sobre el pecho.', person: 'nieves', source: 'declaración', tags: ['hallazgo', 'serie'] },
        S8_DARIO_VIO: { kind: 'statement', text: 'Darío declara que en su paseo no vio a nadie: calles vacías y una tele encendida en una casa.', person: 'dario', source: 'testigo', tags: ['testigo'] },
        S8_FELISA_NOCHE: { kind: 'statement', text: 'Felisa oyó hacia las 23:10 un coche por el camino de las eras, detrás de la casa de Eloísa, y hacia las 23:45 el mismo motor alejándose.', time: '23:10', end: '23:45', person: 'felisa', place: 'eras', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S8_FELISA_ELOISA: { kind: 'statement', text: 'Felisa dice que Eloísa estaba muy disgustada con el sobrino «por unos papeles del banco» y que el martes iba a ir a la notaría.', person: 'felisa', source: 'testigo', tags: ['testigo', 'poder'] },
        S8_LORENA_MADRE: { kind: 'statement', text: 'Lorena dice que su madre no se quejaba de nada, ni de dinero ni de nadie.', person: 'lorena', source: 'declaración', tags: ['dinero'] },
        S8_LORENA_TECNICO: { kind: 'statement', text: 'Lorena dice que el técnico de la teleasistencia fue el 9/9, revisó el aparato en media hora y se marchó; muy correcto.', person: 'lorena', source: 'declaración', tags: ['teleasistencia'] }
      },
      evidence: {
        E8_02: { detail: 'Una pajarita de papel clásica, de papel satinado con letras y fotos impresas.' },
        E8_03: { detail: 'Las dos almohadas, en su sitio bajo la cabeza de Eloísa, lisas y sin manchas.' },
        E8_04: { detail: 'Luz verde. En la pantalla, solo el test automático de las 20:00.' },
        E8_08: { detail: 'Junto a la grapa central asoman los restos de una hoja arrancada.' },
        E8_11: { detail: 'Una copia de un poder notarial con algo escrito a mano en la portada, y la cartilla.' },
        E8_07: { detail: 'Cerrojo descorrido. En el barro, pisadas de suela lisa que entran desde el camino y vuelven.' },
        E8_12: { detail: 'Además de las de tractor, unas rodadas recientes junto a la cancela, con marcas de maniobra.' },
        E8_13: { detail: 'Dos bolsas de basura doméstica. Nada más.' }
      },
      answers: {
        ruben: {
          noche: { a: 'De guardia. A las diez y veinte me llamaron por una avería en Béjar y estuve allí hasta las doce menos diez. Hay parte firmado.', type: 'verdad' },
          papel: { a: 'No. Ni idea.', type: 'verdad' }
        },
        gonzalo: {
          noche: { a: 'En mi piso de Salamanca. Llegué a las siete y pico y no volví a salir.', type: 'mentira' },
          poder: { a: 'Sí, para gestiones. No lo he usado nunca.', type: 'mentira' }
        },
        nieves: {
          noche: { a: 'En mi casa de Guijuelo. Cené y me acosté pronto; el lunes entro a las ocho.', type: 'verdad' },
          anselmo: { a: 'El martes 25, a las nueve, en mi visita. Estaba en la cama, frío, con una figurita de papel encima del pecho. Llamé al 112 temblando.', type: 'verdad' }
        },
        felisa: {
          noche: { a: 'Hacia las once y diez oí un coche por el camino de las eras, por detrás. A las doce menos cuarto, el mismo motor yéndose. Por ahí de noche no pasa nadie.' },
          eloisa: { a: 'Que estaba muy disgustada con el sobrino por unos papeles del banco. Que el martes iba a ir a la notaría a Salamanca.' }
        },
        lorena: {
          madre: { a: 'No se quejaba de nada. Ni de dinero ni de nadie.' },
          tecnico: { a: 'Vino el 9, revisó el aparato en media hora y se fue. Muy correcto.' }
        }
      },
      confront: {
        gonzalo: {
          F8_LPR_GONZALO: { a: 'Vale, volví. Quería pedirle perdón. No me abrió y me fui sin entrar.', reveals: ['S8_GONZ_VOLVI'] },
          F8_ANT_GONZALO: { a: 'Volví a hablar con ella, sí. No me abrió. Me fui.', reveals: ['S8_GONZ_VOLVI'] },
          S8_FELISA_NOCHE: { a: 'Ese coche podía ser de cualquiera.', reveals: [] },
          F8_TEL_ELO_MSG: { a: 'Mi tía exageraba. Ese dinero era un préstamo; se lo iba a devolver.', reveals: [] },
          F8_BANCO_ELO: { a: 'Lo iba a devolver todo. Era algo temporal.', reveals: [] },
          F8_CAJON: { a: 'Eso no lo había visto nunca.', reveals: [] },
          F8_PAJ3_ADN: { a: '(Palidece.) Habré tocado esa revista por la tarde. No sé.', reveals: [] }
        },
        ruben: { F8_CUAD_RUBEN: { a: '¿Lo ve? Estaba en Béjar con una avería. Hay parte firmado.', reveals: [] } }
      },
      conflicts: [
        { id: 'CB1', a: 'S8_GONZ_NOCHE', b: 'F8_LPR_GONZALO', type: 'Lugar distinto', severity: 'alta', desc: 'Gonzalo dice que no salió de Salamanca por la noche; su coche sale hacia el sur a las 22:26 y vuelve a las 00:25.' },
        { id: 'CB2', a: 'S8_GONZ_NOCHE', b: 'F8_ANT_GONZALO', type: 'Lugar distinto', severity: 'alta', desc: 'Gonzalo dice que no salió de Salamanca; su teléfono está en la antena de Linares de 23:05 a 23:48.' },
        { id: 'CB3', a: 'S8_GONZ_PODER', b: 'F8_BANCO_ELO', type: 'Hecho distinto', severity: 'alta', desc: 'Gonzalo dice que nunca usó el poder; con él se transfirió 41.000 € de las cuentas de su tía en septiembre.' },
        { id: 'CB4', a: 'F8_PAJ3', b: 'F8_E2_FIGURA', type: 'Hecho distinto', severity: 'alta', desc: 'Sobre Eloísa hay una pajarita clásica de papel de revista, sin nada escrito; sobre Pilar había una grulla de papel granate con una frase a lápiz que nunca se publicó.' },
        { id: 'CB5', a: 'F8_AUTOPSIA', b: 'F8_E2_AUTOPSIA', type: 'Hecho distinto', severity: 'alta', desc: 'Eloísa murió estrangulada a mano, con lesiones de defensa; Pilar, por sofocación con la almohada y sin lesiones en el cuello.' }
      ],
      truth: {
        culprit: 'gonzalo', motive: 'm8_poder', method: 'me8_copia', window: 'w8_2300', accomplices: [],
        partialMethods: {
          me8_forzada: 'Viste que la muerte de Eloísa no encaja con las anteriores, pero no quién entró ni por qué imitó la firma.'
        },
        decisive: ['F8_PAJ3', 'F8_PAJ3_DOC', 'F8_PAJ3_ADN', 'F8_REVISTA', 'F8_AUTOPSIA', 'F8_ALMOHADA_LAB', 'F8_TERMINAL', 'F8_CEN_3', 'F8_E2_FIGURA', 'F8_E2_AUTOPSIA', 'F8_LPR_GONZALO', 'F8_ANT_GONZALO', 'F8_BANCO_ELO', 'F8_TEL_ELO_MSG', 'F8_CAJON', 'F8_CALZADO', 'S8_FELISA_NOCHE', 'F8_PRENSA'],
        weak: ['F8_CEN_VISITAS', 'F8_TERMINAL_POLVO', 'F8_COLILLA_ADN', 'F8_PUERTA_POLVO', 'S8_FELISA_TARDE', 'F8_E2_BENITO', 'F8_PODCAST', 'S8_NIEVES_USUARIOS', 'S8_RUBEN_VISITAS'],
        keyConflicts: ['CB3', 'CB4', 'CB5'],
        narrative: [
          'Gonzalo Carrasco mató a su tía Eloísa y disfrazó su muerte como la tercera de la serie. Con el poder notarial de 2023 se había transferido 41.000 € de sus cuentas para tapar sus deudas. El sábado ella le escribió que el martes iría a la notaría a quitarle el poder y a cambiar el testamento.',
          'El domingo por la tarde fue a pedirle que no lo hiciera y discutieron a gritos. A las 22:26 volvió a salir de Salamanca, dejó el coche en el camino de las eras a las 23:05 (Felisa lo oyó) y entró por el corral con sus zapatos de vestir y su llave de la cocina. La estranguló con las manos en la cama.',
          'Para que pareciera obra del asesino del que hablaba la prensa, arrancó una hoja de la revista de programación, plegó una pajarita como las de los periódicos y se la dejó sobre el pecho. No sabía lo que la Guardia Civil no había publicado: las figuras eran grullas de papel granate con una frase a lápiz, las víctimas morían por sofocación y el autor anulaba la teleasistencia. Esa noche el terminal estuvo vigilado y en silencio.',
          'A las 23:47 se marchó y a las 00:25 entraba en Salamanca. Su ADN está dentro de los pliegues de la pajarita. El autor de las muertes de Anselmo y Pilar sigue sin identificar: Rubén, con sus revisiones y sus huellas en el aparato, atendía esa noche una avería en Béjar.',
          'Nieves calló que iba los domingos y que tenía llave por miedo a perder el trabajo; Darío mintió sobre dónde estaba porque rondaba las casas grabando para su pódcast; Benito ocultó una partida de cartas que podía costarle la libertad condicional.'
        ]
      },
      trial: {
        gonzalo: [
          { id: 'O1', text: 'Eloísa es la tercera víctima de un asesino en serie: la misma firma, el mismo tipo de víctima.', accept: ['F8_PAJ3_DOC', 'F8_PAJ3', 'F8_AUTOPSIA', 'F8_CEN_3', 'F8_E2_FIGURA', 'F8_REVISTA'] },
          { id: 'O2', text: 'Mi cliente se volvió a Salamanca a las siete y no salió de casa.', accept: ['F8_LPR_GONZALO', 'F8_ANT_GONZALO', 'S8_FELISA_NOCHE', 'F8_CALZADO', 'F8_PAJ3_ADN'] },
          { id: 'O3', text: 'Mi cliente no tenía motivo: iba a heredarlo todo de todos modos.', accept: ['F8_TEL_ELO_MSG', 'F8_BANCO_ELO', 'F8_CAJON'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en casa de Eloísa esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica por qué la figura de esta escena no se parece a las anteriores.', accept: [] },
          { id: 'O3', text: 'La acusación no explica de quién es el ADN de los pliegues de la pajarita.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['gonzalo'],
        spatialBonus: ['F8_LPR_GONZALO', 'F8_RODADAS', 'F8_CALZADO'],
        temporalConflicts: ['CB1', 'CB2'],
        lateral: [
          { type: 'fact', id: 'F8_REVISTA', pts: 20, yes: 'Te fijaste en la hoja arrancada de la revista: de ahí salió el papel de la pajarita.', no: 'No examinaste la revista del salón.' },
          { type: 'conflict', id: 'CB4', pts: 30, yes: 'Comparaste la figura con la de un caso anterior y viste que no era la misma firma.', no: 'No comparaste la figura de esta escena con las de los casos anteriores.' },
          { type: 'conflict', id: 'CB5', pts: 25 },
          { type: 'chosen', id: 'F8_PAJ3_ADN', pts: 25 }
        ]
      }
    },

    /* ---------- Versión C: la serie fabricada ---------- */
    nieves: {
      facts: {
        F8_PAJ3: { text: 'La figura es una grulla de papiroflexia de papel granate, colocada sobre el pecho con el pico hacia la cara.', person: 'eloisa', place: 'casa', source: 'escena', tags: ['pajarita', 'firma'] },
        F8_PAJ3_DOC: { pericia: { type: 'caligrafia', match: 'nieves', label: 'frase escrita dentro de la grulla' }, text: 'Documentoscopia: papel de papiroflexia granate de 15 × 15 cm, igual que el de la grulla de Pilar. Dentro, a lápiz: «Ya descansas, Eloísa. 3». La letra es la de la grulla de Pilar y coincide con la de Nieves Arroyo en el cuaderno de visitas.', source: 'laboratorio', tags: ['pajarita', 'firma', 'caligrafia'] },
        F8_PAJ3_ADN: { text: 'ADN de la figura: ningún perfil aprovechable. Se manipuló con guantes.', source: 'laboratorio', tags: ['adn', 'pajarita'] },
        F8_AUTOPSIA: { text: 'Autopsia de Eloísa: sofocación con un objeto blando. Petequias en las conjuntivas y erosiones en la mucosa del labio; sin lesiones en el cuello ni de defensa. Lorazepam en sangre unas cuatro veces por encima de la dosis terapéutica: estaba profundamente sedada.', person: 'eloisa', source: 'laboratorio', tags: ['muerte', 'autopsia', 'tox'] },
        F8_ALMOHADA: { text: 'Una de las dos almohadas está a los pies de la cama, con una mancha en la funda.', place: 'casa', source: 'escena', tags: ['almohada', 'arma'] },
        F8_ALMOHADA_LAB: { text: 'Biología: saliva y una pequeña mancha de sangre de Eloísa en la cara interna de la almohada caída, compatibles con haberla presionado contra su cara.', source: 'laboratorio', tags: ['almohada', 'arma'] },
        F8_VASO_LAB: { text: 'Toxicología del vaso de la mesilla: restos de lorazepam disuelto, equivalentes a unos dos comprimidos enteros.', source: 'laboratorio', tags: ['tox', 'medicacion'] },
        F8_TERMINAL: { text: 'El terminal de teleasistencia está apagado: el cable de corriente está fuera de la toma, detrás del aparador. La pantalla no enciende.', place: 'casa', source: 'escena', tags: ['teleasistencia'] },
        F8_REVISTA: { text: 'La revista de programación de la semana está entera, abierta por el domingo.', place: 'casa', source: 'escena', tags: ['revista'] },
        F8_CAJON: { text: 'En el cajón del aparador: la cartilla de ahorro con siete reintegros de septiembre rodeados con bolígrafo y, al lado, escrito a mano: «Guijuelo ¿?».', person: 'eloisa', place: 'casa', source: 'escena', tags: ['dinero', 'documento'] },
        F8_CANCELA: { text: 'La cancela del corral tiene el cerrojo descorrido. En el barro hay pisadas pequeñas de un zueco que entran desde el camino de las eras hasta la puerta de la cocina y vuelven. Los zuecos de jardín de Eloísa están junto a esa puerta, secos y limpios.', place: 'casa', source: 'escena', tags: ['calzado', 'acceso'] },
        F8_CALZADO: { pericia: { type: 'calzado', match: 'zueco', label: 'pisadas del corral' }, text: 'Comparativa de calzado: zueco de la talla 39 con suela de goma. No son los zuecos de Eloísa, que están secos.', source: 'laboratorio', tags: ['calzado'] },
        F8_RODADAS: { text: 'Al principio del camino de las eras, a unos 120 m de la cancela, hay rodadas recientes de un neumático estrecho.', place: 'eras', source: 'escena', tags: ['vehiculo'] },
        F8_NEUMATICO: { pericia: { type: 'neumatico', match: 'clio', label: 'rodadas del camino de las eras' }, text: 'Comparativa de neumáticos: utilitario (185/65 R15).', source: 'laboratorio', tags: ['vehiculo'] },
        F8_CONTENEDOR: { text: 'El contenedor de la esquina se vació el domingo a las 21:00. Encima de las bolsas, sueltos, hay un par de guantes de nitrilo azules vueltos del revés.', place: 'casa', source: 'escena', tags: ['basura', 'guantes'] },
        F8_CONTENEDOR_ADN: { pericia: { type: 'adn', match: 'nieves', label: 'interior de los guantes de nitrilo' }, text: 'ADN en el interior de los guantes de nitrilo: perfil genético de Nieves Arroyo. Se tiraron después de las 21:00 del domingo.', person: 'nieves', source: 'laboratorio', tags: ['adn', 'guantes'] },
        F8_E1_HALLAZGO: { text: 'Expediente de Anselmo Rubio: hallado en el suelo de su dormitorio el 25/8 a las 07:20 por Nieves Arroyo, avisada por la central de teleasistencia. Los sanitarios certificaron la muerte a las 07:38.', person: 'anselmo', place: 'guijuelo', source: 'informe policial', tags: ['hallazgo', 'serie'] },
        F8_E1_AUTOPSIA: { text: 'Autopsia de Anselmo, revisada en septiembre: infarto agudo de miocardio con oclusión coronaria y una contusión en la frente por la caída. Ni signos de sofocación ni de violencia. La revisión confirma una muerte natural.', person: 'anselmo', source: 'laboratorio', tags: ['muerte', 'autopsia', 'serie'] },
        F8_E1_FIGURA: { text: 'En la mesilla de Anselmo había una grulla de papel azul, sin nada escrito. En el aparador, una caja con decenas de grullas iguales: Anselmo, maestro jubilado, las plegaba para el taller del hogar del jubilado.', person: 'anselmo', source: 'laboratorio', tags: ['pajarita', 'serie'] },
        F8_CEN_1: { text: 'Central, casa de Anselmo (Guijuelo), 25/8: a las 06:48 Anselmo pulsa el colgante y dice: «Me he caído, me duele mucho el pecho». La central avisa a emergencias y a la persona de contacto, Nieves Arroyo (06:51). Ninguna incidencia técnica esa noche.', person: 'anselmo', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_2: { text: 'Central, casa de Pilar (Fuenterroble), noche del 17/9: pérdida de alimentación del terminal a las 22:40; se reconecta a las 23:31. Ninguna pulsación del colgante.', person: 'pilar', source: 'registro', tags: ['teleasistencia', 'serie'] },
        F8_CEN_3: { text: 'Central, casa de Eloísa, domingo 4/10: pérdida de alimentación del terminal a las 22:52; sigue con batería hasta las 04:10. La central lo anota como «posible corte de luz» para revisarlo el lunes. El colgante no se pulsó.', time: '22:52', person: 'eloisa', place: 'casa', source: 'registro', tags: ['teleasistencia'] },
        F8_LLAVES: { text: 'Armario de llaves custodiadas: las llaves de Anselmo, Pilar y Eloísa solo salieron en horario de trabajo, para las revisiones programadas (la de Eloísa, el 1/10 de 09:05 a 12:40, con la tarjeta de Rubén Lozano). Ninguna salió de noche.', person: 'ruben', source: 'registro', tags: ['llave', 'acceso'] },
        F8_CUAD_RUBEN: { text: 'Cuadrante de guardias: Rubén estuvo de guardia localizable el 4/10, pero no el 24/8 ni el 17/9. El 4/10 atendió una avería en Béjar, con parte firmado por el usuario, de 22:35 a 23:50.', person: 'ruben', source: 'registro', tags: ['guardia'] },
        F8_TEL_ELO_MSG: { text: 'Mensaje de Eloísa a Felisa (sábado 3/10, 11:05): «Me faltan casi tres mil euros de la cartilla, sacados en Guijuelo. Ya sé quién ha sido. El lunes voy al cuartel».', person: 'eloisa', source: 'mensaje', tags: ['mensaje', 'dinero'] },
        F8_BANCO_ELO: { text: 'Cuentas de Eloísa: entre el 18/9 y el 2/10, siete reintegros de 400 € con su tarjeta en el cajero de Guijuelo, todos en días laborables entre las 12:10 y las 12:40. Eloísa no conducía y no iba a Guijuelo. El 2/10 pidió un extracto en la sucursal de Linares.', person: 'eloisa', source: 'documento', tags: ['dinero', 'robo'] },
        F8_BANCO_PILAR: { text: 'Cuentas de Pilar: entre el 10/8 y el 14/9, nueve reintegros de 500 € con su tarjeta en el cajero de Guijuelo, en días laborables hacia las 12:15. Pilar no salía de Fuenterroble.', person: 'pilar', source: 'documento', tags: ['dinero', 'robo'] },
        F8_LPR_GONZALO: { text: 'Lector de la A-66 (salida sur de Salamanca): turismo de Gonzalo Carrasco a las 16:52 dirección sur y a las 19:12 dirección norte. Ninguna lectura más esa noche.', time: '16:52', end: '19:12', person: 'gonzalo', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_LPR_RUBEN: { text: 'Lector de la N-630 (Béjar): la furgoneta de la empresa, conducida por Rubén Lozano, cruza la travesía de Béjar a las 22:28 hacia el barrio de la avería y a las 23:58 de vuelta. Su todoterreno no tiene lecturas.', time: '22:28', end: '23:58', person: 'ruben', source: 'registro', tags: ['vehiculo', 'matricula'] },
        F8_ANT_RUBEN: { text: 'Teléfono de Rubén: antena de Béjar toda la noche; llamada de la central a las 22:21 por una avería.', time: '22:00', end: '02:00', person: 'ruben', place: 'bejar', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_GONZALO: { text: 'Teléfono de Gonzalo: antena de Linares de 17:35 a 18:38; Salamanca desde las 19:20 y el resto de la noche.', time: '19:20', end: '02:00', person: 'gonzalo', place: 'salamanca', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F8_ANT_NIEVES: { text: 'Teléfono de Nieves: antena de Linares de 16:05 a 16:45; Guijuelo de 17:05 a 22:12; Linares de 22:38 a 23:34; Guijuelo desde las 23:58.', time: '22:38', end: '23:34', person: 'nieves', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S8_RUBEN_NOCHE: { kind: 'statement', text: 'Rubén declara que estuvo de guardia y que atendió una avería en Béjar de 22:35 a 23:50.', time: '22:35', end: '23:50', person: 'ruben', place: 'bejar', source: 'declaración', tags: ['coartada', 'guardia'] },
        S8_GONZ_PODER: { kind: 'statement', text: 'Gonzalo declara que tiene un poder notarial de su tía desde 2023 para gestiones y que casi nunca lo ha usado.', person: 'gonzalo', source: 'declaración', tags: ['dinero', 'poder'] },
        S8_NIEVES_ANSELMO: { kind: 'statement', text: 'Nieves declara que la central la llamó el 25/8 a las 06:51; llegó a las 07:20 y encontró a Anselmo en el suelo del dormitorio. En la mesilla había una grulla de papel azul: «las hacía él».', person: 'nieves', source: 'declaración', tags: ['hallazgo', 'serie', 'pajarita'] },
        S8_NIEVES_FUI: { kind: 'statement', text: 'Nieves admite que volvió a casa de Eloísa el domingo por la noche: dice que Eloísa la llamó asustada a las 22:15, que la encontró dormida y que se fue enseguida.', time: '22:15', person: 'nieves', place: 'casa', source: 'declaración', tags: ['coartada', 'llamada'] },
        S8_DARIO_VIO: { kind: 'statement', text: 'Darío declara que hacia las 22:42 vio a una mujer bajita, con un abrigo largo y un bolso grande, bajar de un coche pequeño al principio del camino de las eras y entrar en un corral. No le vio la cara.', time: '22:42', person: 'dario', place: 'eras', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S8_FELISA_NOCHE: { kind: 'statement', text: 'Felisa oyó chirriar la cancela del corral de Eloísa hacia las 22:50, «como cuando se abre del todo». No oyó ningún coche.', time: '22:50', person: 'felisa', place: 'casa', source: 'testigo', tags: ['testigo', 'acceso'] },
        S8_FELISA_ELOISA: { kind: 'statement', text: 'Felisa dice que el sábado Eloísa le contó que le faltaba dinero de la cartilla y que el lunes iba a ir al cuartel; no le dijo de quién sospechaba.', person: 'felisa', source: 'testigo', tags: ['testigo', 'dinero'] },
        S8_LORENA_MADRE: { kind: 'statement', text: 'Lorena dice que el 16/9 su madre le contó que le faltaba dinero de la cartilla y que «lo iba a hablar con la chica» antes de ir al banco.', person: 'lorena', source: 'declaración', tags: ['dinero'] },
        S8_LORENA_TECNICO: { kind: 'statement', text: 'Lorena dice que el técnico de la teleasistencia fue el 9/9, revisó el aparato en media hora y se marchó; muy correcto.', person: 'lorena', source: 'declaración', tags: ['teleasistencia'] }
      },
      evidence: {
        E8_02: { detail: 'Una grulla de papiroflexia de papel granate, con las alas abiertas y el pico hacia la cara de Eloísa.' },
        E8_03: { detail: 'Una almohada bajo la cabeza; la otra, a los pies de la cama, con una mancha en la funda.' },
        E8_04: { detail: 'La pantalla está apagada. El cable de corriente cuelga suelto detrás del aparador.' },
        E8_08: { detail: 'La revista de programación de la semana, entera, abierta por el domingo.' },
        E8_11: { detail: 'La cartilla de ahorro, con anotaciones a bolígrafo.' },
        E8_07: { detail: 'Cerrojo descorrido. En el barro, pisadas pequeñas de suela de goma que entran desde el camino y vuelven.' },
        E8_12: { detail: 'Además de las de tractor, unas rodadas estrechas y recientes al principio del camino.' },
        E8_13: { detail: 'Encima de las bolsas, un par de guantes azules de un solo uso.' }
      },
      answers: {
        ruben: {
          noche: { a: 'De guardia. A las diez y veinte me llamaron por una avería en Béjar y estuve allí hasta las doce menos diez. Hay parte firmado.', type: 'verdad' },
          papel: { a: 'No. Ni idea.', type: 'verdad' }
        },
        gonzalo: {
          noche: { a: 'En mi piso de Salamanca. Llegué a las siete y pico y no volví a salir.', type: 'verdad' },
          poder: { a: 'Sí, desde 2023, para gestiones del banco. Casi nunca lo he usado.', type: 'verdad' }
        },
        nieves: {
          noche: { a: 'En mi casa de Guijuelo. Cené y me acosté pronto; el lunes entro a las ocho.', type: 'mentira' },
          anselmo: { a: 'La central me llamó a las siete menos diez: había pulsado el colgante. Llegué a las siete y veinte y estaba en el suelo. En la mesilla tenía una grulla de papel azul; las hacía él, para el hogar del jubilado.', type: 'verdad' }
        },
        felisa: {
          noche: { a: 'Hacia las once menos diez chirrió la cancela del corral de Eloísa, como cuando se abre del todo. Coches no oí ninguno.' },
          eloisa: { a: 'El sábado me dijo que le faltaba dinero de la cartilla y que el lunes iba a ir al cuartel. No me quiso decir de quién sospechaba.' }
        },
        lorena: {
          madre: { a: 'El 16 me dijo que le faltaba dinero de la cartilla. Que lo iba a hablar con «la chica» antes de ir al banco. Al día siguiente…', type: 'verdad' },
          tecnico: { a: 'Vino el 9, revisó el aparato en media hora y se fue. Muy correcto.' }
        }
      },
      confront: {
        nieves: {
          F8_ANT_NIEVES: { a: 'Volví porque Eloísa me llamó asustada a las diez y cuarto. La encontré dormida y me fui enseguida.', reveals: ['S8_NIEVES_FUI'] },
          S8_FELISA_NOCHE: { a: 'Fui un momento, ¿vale? Eloísa me había llamado asustada. Estaba dormida y me fui.', reveals: ['S8_NIEVES_FUI'] },
          S8_DARIO_VIO: { a: 'Fui a verla porque me llamó a las diez y cuarto. Estaba dormida. Me fui.', reveals: ['S8_NIEVES_FUI'] },
          F8_CALZADO: { a: 'Zuecos del 39 los llevan todas las auxiliares de la comarca. Pero sí, pasé un momento: me había llamado.', reveals: ['S8_NIEVES_FUI'] },
          F8_BANCO_ELO: { a: 'Ella me daba la tarjeta para que le sacara dinero. Siempre lo ha hecho.', reveals: [] },
          F8_BANCO_PILAR: { a: 'Pilar también me pedía que le sacara dinero. Yo se lo daba todo.', reveals: [] },
          F8_CONTENEDOR_ADN: { a: 'Uso esos guantes todos los días. Cualquiera puede haberlos cogido.', reveals: [] },
          F8_VASO_LAB: { a: 'Yo le preparo medio comprimido. No sé de dónde ha salido eso.', reveals: [] },
          F8_E1_FIGURA: { a: 'Las hacía él. Lo sabía todo el mundo.', reveals: [] },
          F8_PAJ3_DOC: { a: '(Larga pausa.) No voy a decir nada más sin abogado.', reveals: [] }
        },
        ruben: { F8_CUAD_RUBEN: { a: '¿Lo ve? Estaba en Béjar con una avería. Hay parte firmado.', reveals: [] } }
      },
      conflicts: [
        { id: 'CC1', a: 'S8_NIEVES_NOCHE', b: 'F8_ANT_NIEVES', type: 'Lugar distinto', severity: 'alta', desc: 'Nieves dice que pasó la noche en Guijuelo; su teléfono está en la antena de Linares de 22:38 a 23:34.' },
        { id: 'CC2', a: 'S8_NIEVES_FUI', b: 'F8_TEL_ELO_LLAM', type: 'Hecho distinto', severity: 'alta', desc: 'Nieves dice que volvió porque Eloísa la llamó a las 22:15; el teléfono de Eloísa no tiene ninguna actividad después de las 21:40.' },
        { id: 'CC3', a: 'F8_E1_FIGURA', b: 'F8_E2_FIGURA', type: 'Hecho distinto', severity: 'alta', desc: 'La grulla de Anselmo es azul, sin nada escrito, y era suya; la de Pilar es granate y lleva una frase con el número «2», como si hubiera una primera.' },
        { id: 'CC4', a: 'F8_SERIE', b: 'F8_E1_AUTOPSIA', type: 'Hecho distinto', severity: 'alta', desc: 'La prensa atribuye la muerte de Anselmo al mismo autor; la autopsia revisada confirma que murió de un infarto.' },
        { id: 'CC5', a: 'S8_NIEVES_PASTILLAS', b: 'F8_VASO_LAB', type: 'Hecho distinto', severity: 'media', desc: 'Nieves dice que a Eloísa le tocaba medio comprimido por la noche; en el vaso había el equivalente a dos comprimidos disueltos.' }
      ],
      truth: {
        culprit: 'nieves', motive: 'm8_robos', method: 'me8_desenchufe', window: 'w8_2300', accomplices: [],
        partialMethods: {
          me8_modo: 'Viste la sofocación, la grulla firmada y que se anuló la teleasistencia, pero no cómo ni que la primera muerte fue natural.',
          me8_forzada: 'Viste cómo murió, pero no la sedación previa ni cómo se anuló la teleasistencia.'
        },
        decisive: ['F8_E1_AUTOPSIA', 'F8_E1_FIGURA', 'F8_CEN_1', 'F8_CEN_2', 'F8_CEN_3', 'F8_TERMINAL', 'F8_BANCO_ELO', 'F8_BANCO_PILAR', 'F8_TEL_ELO_MSG', 'F8_CAJON', 'S8_LORENA_MADRE', 'F8_PAJ3_DOC', 'F8_VASO_LAB', 'F8_AUTOPSIA', 'F8_CONTENEDOR_ADN', 'F8_CALZADO', 'F8_ANT_NIEVES', 'S8_FELISA_NOCHE', 'S8_DARIO_VIO', 'S8_NIEVES_ANSELMO'],
        weak: ['F8_CEN_VISITAS', 'F8_TERMINAL_POLVO', 'F8_COLILLA_ADN', 'F8_PUERTA_POLVO', 'F8_BANCO_GONZALO', 'F8_TESTAMENTO', 'F8_E2_BENITO', 'F8_PODCAST', 'S8_FELISA_TARDE', 'S8_RUBEN_VISITAS'],
        keyConflicts: ['CC2', 'CC3', 'CC4'],
        narrative: [
          'No hubo ningún asesino en serie. Anselmo Rubio murió de un infarto la madrugada del 25 de agosto: pulsó el colgante y, cuando llegó Nieves, avisada por la central, ya había muerto. La grulla azul de su mesilla era suya: las plegaba para el hogar del jubilado.',
          'Nieves Arroyo, su auxiliar de ayuda a domicilio, llevaba meses sacando dinero en el cajero de Guijuelo con las tarjetas de las personas que atendía. El 16 de septiembre Pilar Vidal le dijo que le faltaba dinero. La noche siguiente Nieves fue a su casa, desenchufó la teleasistencia, la asfixió con la almohada y le dejó sobre el pecho una grulla con una frase y un número, «2», para que pareciera la segunda víctima de quien había «matado» a Anselmo. La prensa y un pódcast hicieron el resto.',
          'Con Eloísa repitió el método. El sábado Eloísa escribió a Felisa que el lunes iría al cuartel. El domingo por la tarde, en una visita que nunca apuntó, Nieves vio la cartilla con los reintegros rodeados y le dejó en el vaso el equivalente a dos comprimidos de lorazepam. Volvió a las 22:38, dejó el coche al principio del camino de las eras (Darío la vio), entró por el corral con sus zuecos y la llave que Eloísa le había dado, desenchufó el terminal a las 22:52 y la asfixió. Al salir tiró los guantes al contenedor.',
          'La serie era una construcción. La clave está en la primera muerte (autopsia natural, grulla distinta y un colgante pulsado por la propia víctima) y en que las grullas 2 y 3 tienen la letra de Nieves. La central registra el mismo desenchufe en casa de Pilar y en la de Eloísa, y ningún código técnico.',
          'Rubén entró en las tres casas por su trabajo, pero la noche del 4 atendía una avería en Béjar. Gonzalo ocultó su visita de la tarde porque fue a pedir dinero; Darío mintió sobre dónde estaba porque rondaba las casas grabando para su pódcast; Benito ocultó una partida de cartas que podía costarle la libertad condicional.'
        ]
      },
      trial: {
        nieves: [
          { id: 'O1', text: 'Mi clienta encontró los cuerpos porque era su trabajo: la serie es obra de otra persona.', accept: ['F8_E1_AUTOPSIA', 'F8_E1_FIGURA', 'F8_CEN_1', 'F8_PAJ3_DOC'] },
          { id: 'O2', text: 'Mi clienta estaba en su casa de Guijuelo el domingo por la noche.', accept: ['F8_ANT_NIEVES', 'F8_CONTENEDOR_ADN', 'F8_CALZADO', 'S8_FELISA_NOCHE', 'S8_DARIO_VIO'] },
          { id: 'O3', text: 'No había ningún motivo: Eloísa y Pilar la adoraban.', accept: ['F8_BANCO_ELO', 'F8_BANCO_PILAR', 'F8_TEL_ELO_MSG', 'S8_LORENA_MADRE', 'F8_CAJON'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en casa de Eloísa esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién sacó dinero con las tarjetas de dos de las víctimas.', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué la figura de la primera muerte es distinta de las otras dos.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['nieves'],
        spatialBonus: ['F8_CONTENEDOR', 'F8_CALZADO', 'F8_RODADAS'],
        temporalConflicts: ['CC1', 'CC2'],
        lateral: [
          { type: 'fact', id: 'F8_E1_FIGURA', pts: 20, yes: 'Volviste a la primera muerte y viste que su figura no era como las demás.', no: 'No revisaste la figura de la primera muerte.' },
          { type: 'conflict', id: 'CC3', pts: 30, yes: 'Comparaste las figuras de las dos primeras muertes: la serie empezaba con una muerte natural.', no: 'No comparaste las figuras de las dos primeras muertes.' },
          { type: 'conflict', id: 'CC4', pts: 25 },
          { type: 'chosen', id: 'F8_BANCO_ELO', pts: 25 }
        ]
      }
    }
  }
});
