/* EXPEDIENTE 0 — Caso EXP-007 «El autobús de las 19:15».
 * Desaparición de una menor de 14 años al salir del entrenamiento, un martes por la tarde.
 * Tres versiones: cambia con quién está, cómo salió del pabellón y por qué. En todas
 * aparece con vida. Personas, lugares concretos y hechos son ficticios.
 *
 * CASO CON VERSIONES: personas, escena, evidencias y solicitudes son comunes; cada partida
 * elige en secreto una versión, que sobrescribe hechos, detalles, respuestas,
 * contradicciones y verdad. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-007',
  title: 'El autobús de las 19:15',
  type: 'Desaparición de una menor',
  difficulty: 'Extrema',
  minRank: 5,
  budget: 1800,
  location: 'Pabellón municipal de Cuatrovientos y barrio de Flores del Sil · Ponferrada (León)',
  date: 'Tarde del martes 20 de octubre de 2026',
  victim: {
    id: 'nerea',
    name: 'Nerea Valcarce Prieto',
    age: 14,
    job: 'Estudiante de 3.º de ESO; juega al voleibol en un club del barrio'
  },
  victimLabel: 'Desaparecida',
  queryAliases: { nerea: ['menor', 'nina', 'desaparecida', 'hija'] },
  deathWindow: 'Última vez vista: 19:05, saliendo del pabellón. A las 20:22 su teléfono ya está apagado.',
  briefing: [
    'A las 21:05 del martes 20 de octubre, Begoña Prieto denuncia en la comisaría de Ponferrada que su hija Nerea, de 14 años, no ha vuelto del entrenamiento de voleibol. Cada martes coge el autobús de la línea 3 de las 19:15 y llega a casa a las 19:35.',
    'Dos compañeras la vieron salir del pabellón a las 19:05. A las 23:10 una patrulla encuentra su teléfono, apagado, en la papelera de la parada. Poco antes de medianoche aparece un sobre en el buzón de su casa.',
    'Los padres están separados y el jueves hay una vista en el juzgado: la madre quiere trasladarse con Nerea a Irlanda y el padre se opone. Hay un entrenador que no cuenta dónde estuvo, un vecino con antecedentes, una exjugadora a la que Nerea adora, una tía y el dueño de la tienda de videojuegos del barrio.',
    'Este expediente tiene varias versiones posibles: en cada partida, los hechos encajan con una explicación distinta. No te fíes de lo que recuerdes de otra partida. La prioridad es encontrarla: averigua con quién está, cómo salió y por qué.'
  ],
  initialFacts: ['F7_DENUNCIA', 'F7_SALIDA', 'F7_SIN_CONTACTO', 'F7_TEL_HALLAZGO'],
  sceneSummary: 'Dos escenarios: el piso de la madre en Flores del Sil (dormitorio de Nerea, salón, cocina y portal con los buzones) y el pabellón de Cuatrovientos, con su aparcamiento lateral y la parada de la línea 3 a 40 metros de la puerta.',

  mapScale: 0.05,
  places: {
    pabellon: { name: 'Pabellón municipal de Cuatrovientos', x: 20, y: 62, kind: 'escena' },
    parada: { name: 'Parada de la línea 3 junto al pabellón', x: 24, y: 67, kind: 'parada' },
    trasera: { name: 'Calle trasera del pabellón', x: 15, y: 56, kind: 'calle' },
    bar: { name: 'Bar Los Arcos (La Puebla)', x: 44, y: 58, kind: 'restaurante' },
    puebla: { name: 'Parada de la Avenida de la Puebla', x: 46, y: 51, kind: 'parada' },
    lazurtegui: { name: 'Plaza Lazúrtegui (piso compartido de Andrea)', x: 53, y: 46, kind: 'domicilio' },
    comisaria: { name: 'Comisaría de Ponferrada', x: 57, y: 56, kind: 'policía' },
    piso: { name: 'Piso de Begoña y Nerea (Flores del Sil)', x: 80, y: 40, kind: 'domicilio' },
    tienda: { name: 'Tienda de videojuegos de Víctor (Flores del Sil)', x: 84, y: 35, kind: 'comercio' },
    hospital: { name: 'Hospital (turno de Begoña)', x: 10, y: 22, kind: 'trabajo' },
    marisa: { name: 'Piso de Marisa (Compostilla)', x: 60, y: 16, kind: 'domicilio' },
    oscar: { name: 'Casa de Óscar (Fuentesnuevas)', x: 5, y: 34, kind: 'domicilio' },
    bembibre: { name: 'Bembibre (taller y casa de Ramón)', x: 97, y: 22, kind: 'domicilio', offmap: '≈ 15 km' },
    noceda: { name: 'Noceda del Bierzo (casa familiar de los Valcarce)', x: 96, y: 4, kind: 'domicilio', offmap: '≈ 24 km' },
    cacabelos: { name: 'Cacabelos', x: 2, y: 8, kind: 'municipio', offmap: '≈ 14 km' }
  },

  people: [
    {
      id: 'begona', name: 'Begoña Prieto Arias', initials: 'BP', age: 42,
      role: 'Madre de Nerea', relation: 'Enfermera; tiene la custodia desde la separación en 2022',
      hidden: { honestidad: 85, miedo: 85, manipulacion: 15, autocontrol: 40, confianza: 60 },
      questions: [
        { id: 'noche', q: '¿Qué pasó el martes por la tarde?', a: 'Salí del hospital a las ocho y llegué a casa a las ocho y veinte. Nerea no estaba. La llamé y tenía el teléfono apagado. Llamé al entrenador, a sus amigas… Nadie sabía nada. A las nueve fui a la comisaría.', type: 'verdad', reveals: ['S7_BEGO_NOCHE'] },
        { id: 'irlanda', q: '¿Qué pasa con el traslado a Irlanda?', a: 'Me han ofrecido trabajo en un hospital de Cork desde enero. Pedí permiso al juzgado para llevarme a Nerea. Ella no quería, pero lo iba aceptando. La vista es el jueves.', type: 'media', reveals: ['S7_BEGO_IRLANDA'] },
        { id: 'ramon', q: '¿Cómo es su relación con el padre de Nerea?', a: 'Mala desde lo de Irlanda. En septiembre me dijo que antes de dejar que me la llevara haría lo que hiciera falta.', type: 'verdad', reveals: ['S7_BEGO_AMENAZA'] },
        { id: 'acoso', q: '¿Tenía Nerea problemas en el instituto?', a: 'No, que yo sepa. Estaba más callada, pero pensé que era por lo de Irlanda.', type: 'creencia', reveals: ['S7_BEGO_ACOSO'] },
        { id: 'julian', q: '¿Quién encontró el sobre del buzón?', a: 'Julián, el vecino de enfrente. Llamó a mi puerta a las doce menos cuarto. Ese hombre tiene antecedentes, ¿sabe? Y alguna vez ha llevado a Nerea en su furgoneta.', type: 'verdad', reveals: ['S7_BEGO_JULIAN'] },
        { id: 'nota', q: '¿Es la letra de Nerea?', requires: ['F7_NOTA'], a: 'Se parece mucho… pero no lo sé. No estoy segura de nada.', type: 'verdad', reveals: ['S7_BEGO_NOTA'] },
        { id: 'andrea', q: '¿Con quién se llevaba bien Nerea en el equipo?', a: 'Con Andrea, la ayudante del entrenador. Tiene diecinueve años y fue capitana. Nerea la adora.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F7_TEL_ACOSO: { a: '(Se tapa la cara.) No sabía nada. ¿Por qué no me lo contó?', reveals: [] }
      },
      confrontDefault: 'No lo sé. Solo quiero que aparezca.'
    },
    {
      id: 'ramon', name: 'Ramón Valcarce Lago', initials: 'RV', age: 46,
      role: 'Padre de Nerea', relation: 'Mecánico en un taller de camiones de Bembibre; visitas en fines de semana alternos',
      hidden: { honestidad: 45, miedo: 60, manipulacion: 50, autocontrol: 55, confianza: 35 },
      questions: [
        { id: 'noche', q: '¿Dónde estuvo el martes por la tarde y por la noche?', a: 'En el taller, en Bembibre, hasta las ocho y media. Luego a casa, en Bembibre. Cené y me acosté.', type: 'verdad', reveals: ['S7_RAMON_NOCHE'] },
        { id: 'contacto', q: '¿Cuándo habló con Nerea por última vez?', a: 'El domingo, cuando la devolví a casa de su madre. Desde entonces, nada.', type: 'verdad', reveals: ['S7_RAMON_CONTACTO'] },
        { id: 'juicio', q: '¿Qué piensa del traslado a Irlanda?', a: 'Que me quieren quitar a mi hija. Me opongo, y lo voy a pelear en el juzgado, como se hace.', type: 'media', reveals: ['S7_RAMON_JUICIO'] },
        { id: 'noceda', q: '¿Tiene alguna otra vivienda?', a: 'La casa de mis padres, en Noceda del Bierzo. Está cerrada desde el verano.', type: 'verdad', reveals: ['S7_RAMON_NOCEDA'] },
        { id: 'taller', q: '¿Usa otro teléfono además del suyo?', a: 'El móvil de empresa del taller, para hablar con clientes.', type: 'verdad', reveals: ['S7_RAMON_TALLER'] },
        { id: 'vehiculo', q: '¿Qué vehículo usa?', a: 'Mi coche, un turismo azul. En el taller conduzco la grúa.', type: 'verdad', reveals: [] }
      ],
      confront: {
        S7_BEGO_AMENAZA: { a: 'Lo dije en caliente. Nunca le haría daño a mi hija.', reveals: [] }
      },
      confrontDefault: 'Yo lo único que quiero es que aparezca mi hija.'
    },
    {
      id: 'marisa', name: 'Marisa Valcarce Lago', initials: 'MV', age: 50,
      role: 'Tía paterna de Nerea', relation: 'Administrativa; vive sola en Ponferrada',
      hidden: { honestidad: 50, miedo: 65, manipulacion: 40, autocontrol: 60, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Qué relación tiene con Nerea?', a: 'La quiero como a una hija. No tengo hijos. Mi hermano está destrozado con lo de Irlanda.', type: 'verdad', reveals: ['S7_MARISA_NEREA'] },
        { id: 'noche', q: '¿Dónde estuvo el martes por la tarde y por la noche?', a: 'En mi piso de Compostilla, sola, viendo la tele. No salí.', type: 'verdad', reveals: ['S7_MARISA_NOCHE'] },
        { id: 'coche', q: '¿Qué coche tiene?', a: 'Un turismo gris.', type: 'verdad', reveals: [] },
        { id: 'fuma', q: '¿Fuma?', a: 'Sí, desde los dieciocho. Lo he dejado veinte veces.', type: 'verdad', reveals: ['S7_MARISA_FUMA'] },
        { id: 'noceda', q: '¿Ha ido últimamente a la casa de Noceda?', a: 'No, desde agosto no.', type: 'verdad', reveals: ['S7_MARISA_NOCEDA'] }
      ],
      confront: {},
      confrontDefault: 'Eso tendrá que preguntárselo a otro.'
    },
    {
      id: 'oscar', name: 'Óscar Méndez Ferreiro', initials: 'OM', age: 38,
      role: 'Entrenador del equipo de Nerea', relation: 'Entrena al equipo cadete desde hace dos temporadas',
      hidden: { honestidad: 40, miedo: 70, manipulacion: 45, autocontrol: 40, confianza: 35 },
      questions: [
        { id: 'rel', q: '¿Desde cuándo entrena a Nerea?', a: 'Dos temporadas. Es buena y muy responsable. Nunca falta.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Qué hizo al acabar el entrenamiento?', a: 'Recogí, cerré el pabellón a las siete y veinte y me fui directo a casa, a Fuentesnuevas.', type: 'mentira', reveals: ['S7_OSCAR_CASA'] },
        { id: 'vio', q: '¿Vio salir a Nerea?', a: 'Sí, salió de las primeras, con su mochila, hacia la parada. Como cada martes.', type: 'verdad', reveals: ['S7_OSCAR_VIO'] },
        { id: 'acoso', q: '¿Había problemas entre las chicas?', a: 'Algún pique en el vestuario. Nada serio.', type: 'media', reveals: ['S7_OSCAR_ACOSO'] },
        { id: 'fuma', q: '¿Fuma?', a: 'Algún cigarro, fuera del pabellón, al acabar.', type: 'verdad', reveals: ['S7_OSCAR_FUMA'] },
        { id: 'coche', q: '¿Qué coche tiene?', a: 'Un utilitario rojo.', type: 'verdad', reveals: [] },
        { id: 'andrea', q: '¿Quién le ayuda en los entrenamientos?', a: 'Andrea Soto, los martes. Fue capitana del equipo. Se fue andando, sobre las siete y veinte.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F7_BAR_OSCAR: { a: '(Baja la vista.) Vale. Estuve en Los Arcos, apostando. No lo dije porque le debo dinero al club y no quería que se supiera.', reveals: ['S7_OSCAR_BAR'] },
        F7_ANT_OSCAR: { a: 'Estuve en un bar del centro. No tiene nada que ver con Nerea.', reveals: ['S7_OSCAR_BAR'] },
        F7_FIN_OSCAR: { a: 'Tengo un problema con las apuestas. Lo estoy intentando arreglar.', reveals: [] }
      },
      confrontDefault: 'No sé qué quiere que le diga. Yo la vi irse a la parada.'
    },
    {
      id: 'julian', name: 'Julián Rodera Gómez', initials: 'JR', age: 58,
      role: 'Vecino del mismo rellano', relation: 'Albañil en paro; condenado en 2009 por lesiones',
      hidden: { honestidad: 55, miedo: 60, manipulacion: 25, autocontrol: 45, confianza: 30 },
      questions: [
        { id: 'rel', q: '¿Qué relación tiene con Nerea y su madre?', a: 'Vecinos de rellano desde hace ocho años. Buena gente. La cría es un sol.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo el martes por la tarde?', a: 'En casa, toda la tarde. Solo.', type: 'mentira', reveals: ['S7_JULIAN_CASA'] },
        { id: 'sobre', q: '¿Cómo encontró el sobre del buzón?', a: 'A las doce menos cuarto bajé la basura y vi un sobre asomando del buzón de Begoña. Subí y llamé a su puerta.', type: 'verdad', reveals: ['S7_JULIAN_SOBRE'] },
        { id: 'portal', q: '¿Vio a alguien en el portal esa noche?', a: 'No me fijé mucho.', type: 'verdad', reveals: ['S7_JULIAN_PORTAL'] },
        { id: 'antec', q: '¿Tiene antecedentes?', a: 'Me condenaron en 2009 por una pelea en un bar. Pagué. Desde entonces, nada.', type: 'verdad', reveals: ['S7_JULIAN_ANTEC'] },
        { id: 'llevar', q: '¿Ha llevado alguna vez a Nerea en su furgoneta?', a: 'Alguna vez la acerqué al pabellón cuando llovía. Con permiso de su madre, ¿eh?', type: 'verdad', reveals: ['S7_JULIAN_LLEVAR'] },
        { id: 'fuma', q: '¿Fuma?', a: 'Un paquete al día.', type: 'verdad', reveals: ['S7_JULIAN_FUMA'] }
      ],
      confront: {
        F7_CAM_FURGO: { a: '(Resopla.) Estaba haciendo una reforma en un piso detrás del pabellón. Sin factura. Cobro el paro, ¿entiende? Por eso no lo dije. A la niña no la vi.', reveals: ['S7_JULIAN_OBRA'] },
        F7_ANT_JULIAN: { a: 'Estaba trabajando en una obra por allí. Sin papeles. Eso es todo.', reveals: ['S7_JULIAN_OBRA'] },
        F7_FIN_JULIAN: { a: 'Sí, cobro el paro. Y hago alguna chapuza. Como medio barrio.', reveals: ['S7_JULIAN_OBRA'] }
      },
      confrontDefault: 'Yo no tengo nada que ver con lo de la cría.'
    },
    {
      id: 'andrea', name: 'Andrea Soto Rivas', initials: 'AS', age: 19,
      role: 'Ayudante del entrenador', relation: 'Excapitana del equipo; camarera; vive en un piso compartido',
      hidden: { honestidad: 60, miedo: 70, manipulacion: 30, autocontrol: 45, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Qué relación tienes con Nerea?', a: 'Fui capitana hasta el año pasado. Ahora ayudo a Óscar los martes. Nerea es como una hermana pequeña para mí.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Qué hiciste al acabar el entrenamiento?', a: 'Ayudé a Óscar a recoger, me fui andando sobre las siete y veinte y llegué a mi piso hacia las ocho menos cuarto. No volví a salir.', type: 'verdad', reveals: ['S7_ANDREA_NOCHE'] },
        { id: 'contacto', q: '¿Cuándo hablaste con Nerea fuera de los entrenamientos?', a: 'Hace semanas. Solo nos vemos en el pabellón.', type: 'verdad', reveals: ['S7_ANDREA_CONTACTO'] },
        { id: 'acoso', q: '¿Sabías si Nerea tenía problemas en el instituto?', a: 'Algo oí de un vídeo trucado que circulaba en su clase. Se lo comenté a Óscar.', type: 'verdad', reveals: ['S7_ANDREA_ACOSO'] },
        { id: 'piso', q: '¿Dónde vives?', a: 'En un piso compartido junto a la plaza Lazúrtegui.', type: 'verdad', reveals: ['S7_ANDREA_PISO'] },
        { id: 'taquilla', q: '¿Tocaste la taquilla de Nerea?', a: 'No. Cada jugadora tiene su candado.', type: 'verdad', reveals: ['S7_ANDREA_TAQUILLA'] }
      ],
      confront: {},
      confrontDefault: 'No sé nada más. De verdad.'
    },
    {
      id: 'victor', name: 'Víctor Arias Blanco', initials: 'VA', age: 34,
      role: 'Dueño de la tienda de videojuegos del barrio', relation: 'Organiza torneos los sábados; Nerea y sus amigas van a menudo',
      hidden: { honestidad: 35, miedo: 45, manipulacion: 70, autocontrol: 75, confianza: 55 },
      questions: [
        { id: 'rel', q: '¿De qué conoce a Nerea?', a: 'Viene con sus amigas a los torneos de los sábados. En septiembre le cambié la pantalla del móvil.', type: 'verdad', reveals: ['S7_VICTOR_NEREA'] },
        { id: 'noche', q: '¿Dónde estuvo el martes por la tarde y por la noche?', a: 'En la tienda hasta las ocho, que es cuando cierro. Luego subí a mi piso, que está encima. No salí.', type: 'verdad', reveals: ['S7_VICTOR_NOCHE'] },
        { id: 'juego', q: '¿Conoce la cuenta «dani_16»?', requires: ['F7_PC_JUEGO'], a: 'Ni idea. En ese juego hay millones de cuentas.', type: 'verdad', reveals: ['S7_VICTOR_DANI'] },
        { id: 'piso', q: '¿Tiene o alquila alguna otra vivienda?', a: 'No. Solo mi piso, encima de la tienda.', type: 'verdad', reveals: ['S7_VICTOR_PISO'] },
        { id: 'coche', q: '¿Qué coche tiene?', a: 'Un todoterreno compacto blanco.', type: 'verdad', reveals: [] }
      ],
      confront: {},
      confrontDefault: 'Mire, yo tengo una tienda. Por ahí pasa todo el barrio.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'casa', name: 'Piso de Begoña y portal', legend: 'Tercer piso en Flores del Sil · 85 m² · portal con buzones',
        rooms: [
          { id: 'dormitorio', name: 'Dormitorio de Nerea', x: 0, y: 0, w: 45, h: 50 },
          { id: 'salon', name: 'Salón', x: 45, y: 0, w: 55, h: 50 },
          { id: 'portal', name: 'Portal y buzones', x: 0, y: 50, w: 30, h: 50 },
          { id: 'recibidor', name: 'Recibidor', x: 30, y: 50, w: 30, h: 50 },
          { id: 'cocina', name: 'Cocina', x: 60, y: 50, w: 40, h: 50 }
        ],
        hotspots: [
          { ev: 'E7_01', x: 12, y: 14 }, { ev: 'E7_02', x: 30, y: 12 }, { ev: 'E7_03', x: 8, y: 38 },
          { ev: 'E7_04', x: 34, y: 36 }, { ev: 'E7_05', x: 70, y: 22 }, { ev: 'E7_06', x: 82, y: 76 },
          { ev: 'E7_07', x: 14, y: 78 }
        ]
      },
      {
        id: 'pabellon', name: 'Pabellón de Cuatrovientos', legend: 'Pista, vestuarios, entrada con cámara, aparcamiento lateral y parada de la línea 3',
        rooms: [
          { id: 'pista', name: 'Pista', x: 0, y: 0, w: 60, h: 55 },
          { id: 'vestuario', name: 'Vestuario y baños', x: 60, y: 0, w: 40, h: 35 },
          { id: 'entrada', name: 'Entrada del pabellón', x: 60, y: 35, w: 40, h: 20 },
          { id: 'aparcamiento', name: 'Aparcamiento lateral · plazas', x: 0, y: 55, w: 55, h: 45 },
          { id: 'parada', name: 'Parada de autobús y calzada', x: 55, y: 55, w: 45, h: 45 }
        ],
        hotspots: [
          { ev: 'E7_14', x: 30, y: 26 }, { ev: 'E7_08', x: 80, y: 16 }, { ev: 'E7_09', x: 82, y: 45 },
          { ev: 'E7_10', x: 18, y: 82 }, { ev: 'E7_11', x: 40, y: 68 }, { ev: 'E7_12', x: 68, y: 82 },
          { ev: 'E7_13', x: 88, y: 70 }
        ]
      }
    ]
  },

  evidence: [
    { id: 'E7_01', name: 'Portátil de Nerea', type: 'Dispositivo', level: 2, room: 'Dormitorio de Nerea',
      public: 'Portátil sobre el escritorio de Nerea.', detail: 'Encendido, con la sesión de un juego en línea abierta. Requiere análisis.',
      value: 'Conversaciones y búsquedas recientes.', limits: 'Un chat no dice quién hay al otro lado.',
      reveals: ['F7_PORTATIL'], unlocks: ['D7_PC'] },
    { id: 'E7_02', name: 'Cajón del escritorio', type: 'Objeto', level: 3, room: 'Dormitorio de Nerea',
      public: 'Cajón del escritorio, con apuntes y una hucha.', detail: 'Apuntes, una hucha de lata y papeles sueltos.',
      value: 'Qué se llevó y si lo preparó.', limits: 'Solo su madre sabe lo que había.',
      reveals: ['F7_CAJON'], forensic: { lupa: { reveals: ['F7_LUPA_CAJON'] } } },
    { id: 'E7_03', name: 'Armario de Nerea', type: 'Objeto', level: 3, fixed: true, room: 'Dormitorio de Nerea',
      public: 'Armario empotrado del dormitorio.', detail: 'Ropa doblada y colgada. Begoña revisa qué falta.',
      value: 'Si se fue preparada para varios días.', limits: 'La memoria de la madre puede fallar.',
      reveals: ['F7_ARMARIO'] },
    { id: 'E7_04', name: 'Diario de Nerea', type: 'Documento', level: 2, model: 'papers', room: 'Dormitorio de Nerea',
      public: 'Cuaderno con candado bajo la almohada.', detail: 'Diario escrito a mano desde el verano.',
      value: 'Qué le preocupaba.', limits: 'Un diario cuenta lo que siente, no lo que pasó.',
      reveals: ['F7_DIARIO', 'F7_DIARIO_CLAVE'] },
    { id: 'E7_05', name: 'Carpeta del juzgado', type: 'Documento', level: 2, room: 'Salón',
      public: 'Carpeta con documentos del procedimiento de familia.', detail: 'Demanda de traslado, escrito de oposición del padre e informe psicológico.',
      value: 'El conflicto entre los padres y lo que dijo Nerea.', limits: 'Un conflicto no prueba un delito.',
      reveals: ['F7_JUZGADO', 'F7_PSICO'] },
    { id: 'E7_06', name: 'Calendario de la cocina', type: 'Documento', level: 1, model: 'papers', room: 'Cocina',
      public: 'Calendario de pared con anotaciones.', detail: 'Horarios de Nerea, turnos de Begoña y una cita en el juzgado.',
      value: 'La rutina de Nerea.', limits: '—',
      reveals: ['F7_CALENDARIO'] },
    { id: 'E7_07', name: 'Nota hallada en el buzón', type: 'Documento', level: 2, room: 'Portal y buzones',
      public: 'Sobre blanco sin sello encontrado en el buzón de Begoña.', detail: 'Una hoja de cuaderno escrita a mano.',
      value: 'Quién la escribió y quién la dejó.', limits: 'Una letra se puede imitar.',
      reveals: ['F7_NOTA'], lab: {
        caligrafia: { cost: 200, label: 'Cotejo caligráfico de la nota', reveals: ['F7_NOTA_LETRA'] },
        huellas: { cost: 120, label: 'Huellas en la nota y el sobre', reveals: ['F7_NOTA_HUELLAS'] }
      } },
    { id: 'E7_08', name: 'Taquilla de Nerea', type: 'Objeto', level: 3, model: 'wardrobe', fixed: true, room: 'Vestuario y baños',
      public: 'Taquilla metálica con candado en el vestuario.', detail: 'Se abre con la llave que facilita el club.',
      value: 'Qué dejó y quién la abrió.', limits: '—',
      reveals: ['F7_TAQUILLA'], lab: { huellas: { cost: 120, label: 'Huellas en el interior de la taquilla', reveals: ['F7_TAQUILLA_HUELLAS'] } } },
    { id: 'E7_09', name: 'Cámara de la entrada del pabellón', type: 'Escena', level: 2, fixed: true, room: 'Entrada del pabellón',
      public: 'Cámara de seguridad sobre la puerta principal.', detail: 'Enfoca la puerta, la acera hasta la parada y el paso al aparcamiento lateral.',
      value: 'Cómo y hacia dónde salió.', limits: 'No cubre el interior del aparcamiento.',
      reveals: ['F7_CAM_POS'], unlocks: ['D7_CAM_PAB'] },
    { id: 'E7_10', name: 'Marcas de neumático en el aparcamiento', type: 'Huella', level: 3, fixed: true, room: 'Aparcamiento lateral · plazas',
      public: 'Tierra húmeda junto a la salida lateral del aparcamiento.', detail: 'Una rodada marcada, de arrancada brusca.',
      value: 'Qué vehículo salió deprisa.', limits: 'Por ese aparcamiento pasan muchos coches cada día.',
      reveals: ['F7_RODADAS'], lab: { comparativa: { cost: 160, label: 'Comparativa de neumáticos', reveals: ['F7_NEUMATICO'] } } },
    { id: 'E7_11', name: 'Colillas junto a la salida lateral', type: 'Biológico', level: 4, model: 'trace', room: 'Aparcamiento lateral · plazas',
      public: 'Restos en el suelo junto a la salida lateral.', detail: 'Tres colillas recientes de la misma marca.',
      value: 'Quién esperó allí.', limits: 'Esperar en un aparcamiento no es un delito.',
      reveals: ['F7_COLILLAS'], lab: { adn: { cost: 260, label: 'Perfil genético de las colillas', reveals: ['F7_ADN_COLILLAS'] } } },
    { id: 'E7_12', name: 'Teléfono de Nerea en la papelera', type: 'Dispositivo', level: 2, room: 'Parada de autobús y calzada',
      public: 'Teléfono hallado en la papelera de la parada.', detail: 'Apagado, con la funda del equipo. Requiere extracción.',
      value: 'Mensajes y última actividad.', limits: '—',
      reveals: ['F7_TEL_PAPELERA'], unlocks: ['D7_TEL'], forensic: { polvo: { reveals: ['F7_TEL_POLVO'] } } },
    { id: 'E7_13', name: 'Marquesina de la parada', type: 'Escena', level: 2, model: 'marker', fixed: true, room: 'Parada de autobús y calzada',
      public: 'Parada de la línea 3, a 40 metros de la puerta del pabellón.', detail: 'Marquesina con banco y papelera. El autobús de la línea 3 pasa a las 19:15.',
      value: 'Si cogió el autobús.', limits: 'Desde la parada no se ve el aparcamiento lateral.',
      reveals: ['F7_PARADA'], unlocks: ['D7_BUS'] },
    { id: 'E7_14', name: 'Hoja de asistencia del entrenamiento', type: 'Documento', level: 1, model: 'papers', room: 'Pista',
      public: 'Hoja de firmas sobre la mesa de la pista.', detail: 'Asistencia del martes, con horario y firmas.',
      value: 'Quién estuvo y hasta qué hora.', limits: '—',
      reveals: ['F7_ASISTENCIA'] }
  ],

  labKinds: { caligrafia: 'Cotejo caligráfico', huellas: 'Huellas dactilares', comparativa: 'Comparativa', adn: 'Análisis de ADN' },

  digital: [
    { id: 'D7_CAM_PAB', name: 'Grabación de la cámara del pabellón', cost: 100, desc: 'Puerta principal, acera y paso al aparcamiento lateral, de 17:00 a 20:00.', requires: 'E7_09',
      reveals: ['F7_CAM_SALIDA', 'F7_CAM_OSCAR', 'F7_CAM_ANDREA', 'F7_CAM_FURGO'] },
    { id: 'D7_BUS', name: 'Tarjeta de transporte y cámara del autobús', cost: 90, desc: 'Validaciones de la tarjeta de Nerea, GPS y cámara interior del autobús de la línea 3.', requires: 'E7_13',
      reveals: ['F7_BUS_NEREA', 'F7_BUS_GPS'] },
    { id: 'D7_TEL', name: 'Extracción del teléfono de Nerea', cost: 250, desc: 'Mensajes, llamadas y conversaciones borradas.', requires: 'E7_12',
      reveals: ['F7_TEL_CONTACTO', 'F7_TEL_ACOSO', 'F7_TEL_PADRE'] },
    { id: 'D7_PC', name: 'Análisis del portátil de Nerea', cost: 220, desc: 'Chats del juego en línea, navegación y documentos.', requires: 'E7_01',
      reveals: ['F7_PC_JUEGO', 'F7_PC_CHAT', 'F7_PC_BUSQUEDAS'] },
    { id: 'D7_JUEGO', name: 'Requerimiento a la plataforma del videojuego', cost: 150, desc: 'Titular, correo y conexiones de la cuenta con la que más hablaba Nerea.', requiresDigital: 'D7_PC',
      reveals: ['F7_JUEGO_TITULAR'] },
    { id: 'D7_BAR', name: 'Cámara del bar Los Arcos', cost: 70, desc: 'Cámara interior del bar, con máquina de apuestas deportivas.',
      reveals: ['F7_BAR_OSCAR'],
      video: { offset: 7, ref: { label: 'Un cliente paga con tarjeta en la barra', time: '20:41' }, range: ['19:20', '21:40'], subject: { pid: 'oscar', intervals: [['19:32', '20:02'], ['20:14', '21:20']] }, gates: ['F7_BAR_OSCAR'] } },
    { id: 'D7_VEH', name: 'Registro de vehículos', cost: 60, desc: 'Vehículos de las personas del expediente.',
      reveals: ['F7_VEH_BEGONA', 'F7_VEH_RAMON', 'F7_VEH_MARISA', 'F7_VEH_OSCAR', 'F7_VEH_JULIAN', 'F7_VEH_ANDREA', 'F7_VEH_VICTOR'] },
    { id: 'D7_FIN', name: 'Datos financieros, suministros y líneas', cost: 170, desc: 'Cuentas, compras con tarjeta, alquileres, contadores de luz, cajas registradoras y titulares de líneas.',
      reveals: ['F7_FIN_OSCAR', 'F7_FIN_JULIAN', 'F7_FIN_RAMON', 'F7_FIN_NOCEDA', 'F7_FIN_TIENDA', 'F7_FIN_CLAVE', 'F7_FIN_COMPRA'] }
  ],

  judicial: {
    max: 2,
    desc: 'Datos de antenas de un teléfono entre las 17:00 y las 01:00. Cada antena cubre un barrio o un pueblo; la de Cuatrovientos cubre el pabellón. El juzgado autoriza dos solicitudes.',
    targets: [{ id: 'nerea', name: 'Nerea Valcarce (desaparecida)' }],
    results: {
      begona: ['F7_ANT_BEGONA'], ramon: ['F7_ANT_RAMON'], marisa: ['F7_ANT_MARISA'], oscar: ['F7_ANT_OSCAR'],
      julian: ['F7_ANT_JULIAN'], andrea: ['F7_ANT_ANDREA'], victor: ['F7_ANT_VICTOR'], nerea: ['F7_ANT_NEREA']
    }
  },

  /* Hechos comunes a todas las versiones. Los que cambian están en `variants`. */
  facts: {
    F7_DENUNCIA: { text: 'Begoña Prieto denuncia en la comisaría la desaparición de su hija Nerea, de 14 años: no ha vuelto del entrenamiento de voleibol.', time: '21:05', person: 'begona', place: 'comisaria', source: 'denuncia', tags: ['aviso'] },
    F7_SALIDA: { text: 'Dos compañeras ven a Nerea salir por la puerta principal del pabellón con su mochila de deporte. Es la última vez que alguien del equipo la ve.', time: '19:05', person: 'nerea', place: 'pabellon', source: 'testigo', tags: ['testigo'] },
    F7_SIN_CONTACTO: { text: 'Begoña llega a casa a las 20:20 y Nerea no está. A las 20:22 la llama: el teléfono está apagado.', time: '20:22', person: 'begona', place: 'piso', source: 'llamada', tags: ['llamada'] },
    F7_TEL_HALLAZGO: { text: 'Una patrulla encuentra el teléfono de Nerea, apagado, en la papelera de la parada de la línea 3 junto al pabellón.', time: '23:10', person: 'nerea', place: 'parada', source: 'informe policial', tags: ['telefono', 'hallazgo'] },

    F7_PORTATIL: { text: 'El portátil de Nerea está en su escritorio, con la sesión de un juego en línea con chat abierta.', person: 'nerea', place: 'piso', source: 'escena', tags: ['portatil'] },
    F7_DIARIO: { text: 'Diario de Nerea: en septiembre escribe que en clase se ríen de ella y que circula un vídeo trucado con su cara.', person: 'nerea', source: 'documento', tags: ['documento', 'acoso'] },
    F7_JUZGADO: { text: 'Carpeta del juzgado: Begoña pidió en septiembre autorización para trasladarse con Nerea a Cork (Irlanda) en enero. Ramón se opone. La vista es el jueves 22 a las 10:00.', source: 'documento', tags: ['documento', 'custodia'] },
    F7_PSICO: { text: 'Informe de la psicóloga del juzgado (13/10): Nerea dice que no quiere dejar Ponferrada ni a su equipo, que no quiere elegir entre sus padres y que «en clase las cosas están mal».', person: 'nerea', source: 'documento', tags: ['documento', 'custodia'] },
    F7_CALENDARIO: { text: 'Calendario de la cocina: «Martes: vóley 17:30–19:00 · bus 19:15». «Jueves 22: JUZGADO 10:00». «Sábado 24: Nerea con papá».', source: 'documento', tags: ['documento', 'cita'] },
    F7_CAM_POS: { text: 'La cámara de la entrada enfoca la puerta principal, la acera hasta la parada y el paso al aparcamiento lateral. No cubre el interior del aparcamiento.', place: 'pabellon', source: 'escena', tags: ['camara'] },
    F7_RODADAS: { text: 'Junto a la salida lateral del aparcamiento, en la tierra húmeda, hay una rodada reciente de arrancada brusca.', place: 'pabellon', source: 'escena', tags: ['vehiculo'] },
    F7_COLILLAS: { text: 'Junto a la salida lateral del aparcamiento hay tres colillas recientes de la misma marca.', place: 'pabellon', source: 'escena', tags: ['adn'] },
    F7_TEL_PAPELERA: { text: 'El teléfono de Nerea estaba apagado en la papelera de la parada, encima de la basura del día, con la funda del equipo.', person: 'nerea', place: 'parada', source: 'escena', tags: ['telefono'] },
    F7_TEL_POLVO: { prints: [{ at: 'Pantalla del teléfono', match: 'nerea' }, { at: 'Carcasa trasera', q: 'no_apta' }], text: 'Polvo revelador: en la pantalla, una huella de Nerea; en la carcasa, una latente emborronada sin valor identificativo.', source: 'laboratorio', tags: ['huella', 'telefono'] },
    F7_PARADA: { text: 'La parada de la línea 3 está a 40 metros de la puerta del pabellón; la papelera, a un metro de la marquesina. Desde la parada no se ve el interior del aparcamiento lateral.', place: 'parada', source: 'escena', tags: ['parada'] },
    F7_ASISTENCIA: { text: 'Hoja de asistencia del martes: once jugadoras, Nerea entre ellas. Entrenamiento de 17:30 a 18:58. Firman el entrenador, Óscar Méndez, y la ayudante, Andrea Soto.', place: 'pabellon', source: 'documento', tags: ['documento'] },

    F7_CAM_OSCAR: { text: 'Cámara del pabellón: a las 19:21 Óscar cierra la puerta principal y sale del aparcamiento lateral en su utilitario rojo.', time: '19:21', person: 'oscar', place: 'pabellon', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F7_CAM_ANDREA: { text: 'Cámara del pabellón: a las 19:22 Andrea Soto se marcha a pie en dirección al centro.', time: '19:22', person: 'andrea', place: 'pabellon', source: 'cámara', tags: ['camara'] },
    F7_CAM_FURGO: { text: 'Cámara del pabellón: en el borde del plano, en la calle trasera, una furgoneta blanca está aparcada de 16:50 a 19:34. La matrícula es la de la furgoneta de Julián Rodera.', time: '16:50', end: '19:34', person: 'julian', place: 'trasera', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F7_BUS_GPS: { text: 'GPS del autobús de la línea 3: para en el pabellón de 19:15 a 19:16, en la Avenida de la Puebla a las 19:24, en la plaza Lazúrtegui a las 19:27 y en Flores del Sil a las 19:35.', time: '19:15', end: '19:35', place: 'parada', source: 'registro', tags: ['autobus'] },
    F7_TEL_ACOSO: { text: 'Teléfono de Nerea: en el grupo de su clase, desde septiembre, mensajes burlándose de ella y un vídeo manipulado con su cara que se reenvía una y otra vez. Nerea no contesta.', person: 'nerea', source: 'mensaje', tags: ['mensaje', 'acoso'] },
    F7_TEL_PADRE: { text: 'Teléfono de Nerea: el último mensaje de su padre en su número personal es del domingo 18 a las 20:31: «Te quiero, peque. Todo va a salir bien». No hay nada después.', person: 'ramon', source: 'mensaje', tags: ['mensaje'] },
    F7_PC_JUEGO: { text: 'Portátil: Nerea chatea casi a diario en el juego en línea con la cuenta «dani_16», que dice tener 16 años y vivir en Astorga.', person: 'nerea', source: 'dispositivo', tags: ['portatil', 'chat'] },
    F7_BAR_OSCAR: { text: 'Cámara interior del bar Los Arcos, sincronizada con un pago con tarjeta: Óscar entra a las 19:32, sale a la terraza de 20:02 a 20:14 y se va a las 21:20. Pasa casi todo el tiempo ante la máquina de apuestas deportivas.', time: '19:32', end: '21:20', person: 'oscar', place: 'bar', source: 'cámara', tags: ['camara', 'coartada'] },
    F7_VEH_BEGONA: { text: 'Begoña Prieto: utilitario verde, aparcado en el hospital durante su turno.', person: 'begona', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_RAMON: { text: 'Ramón Valcarce: turismo azul. En el taller conduce una grúa de la empresa.', person: 'ramon', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_MARISA: { text: 'Marisa Valcarce: turismo gris.', person: 'marisa', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_OSCAR: { text: 'Óscar Méndez: utilitario rojo.', person: 'oscar', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_JULIAN: { text: 'Julián Rodera: furgoneta blanca de trabajo.', person: 'julian', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_ANDREA: { text: 'Andrea Soto: ningún vehículo a su nombre.', person: 'andrea', source: 'vehículo', tags: ['vehiculo'] },
    F7_VEH_VICTOR: { text: 'Víctor Arias: todoterreno compacto blanco.', person: 'victor', source: 'vehículo', tags: ['vehiculo'] },
    F7_FIN_OSCAR: { text: 'Óscar Méndez debe 9.400 € a casas de apuestas en línea. El club le reclama 1.900 € de cuotas que cobró y no ingresó.', person: 'oscar', source: 'documento', tags: ['dinero', 'deuda'] },
    F7_FIN_JULIAN: { text: 'Julián Rodera cobra la prestación por desempleo desde marzo; no consta ninguna actividad dada de alta.', person: 'julian', source: 'documento', tags: ['dinero'] },
    F7_FIN_RAMON: { text: 'Ramón Valcarce paga la pensión de alimentos al día. En septiembre pagó 3.200 € a un abogado de familia por el procedimiento del traslado.', person: 'ramon', source: 'documento', tags: ['dinero', 'custodia'] },
    F7_ANT_BEGONA: { text: 'Teléfono de Begoña: antena del hospital hasta las 20:06; Flores del Sil desde las 20:18; centro (comisaría) de 20:58 a 22:30; Flores del Sil después.', time: '17:00', end: '01:00', person: 'begona', place: 'piso', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F7_ANT_OSCAR: { text: 'Teléfono de Óscar: antena de Cuatrovientos hasta las 19:24; antena del centro (La Puebla) de 19:30 a 21:25; Fuentesnuevas desde las 21:35.', time: '19:30', end: '21:25', person: 'oscar', place: 'bar', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F7_ANT_JULIAN: { text: 'Teléfono de Julián: antena de Cuatrovientos, que cubre el pabellón, de 16:45 a 19:38; Flores del Sil desde las 19:50.', time: '16:45', end: '19:38', person: 'julian', place: 'trasera', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F7_ANT_NEREA: { text: 'Teléfono de Nerea: antena de Cuatrovientos, que cubre el pabellón, desde las 17:18; último evento a las 19:09, cuando se apaga. No vuelve a conectarse.', time: '17:18', end: '19:09', person: 'nerea', place: 'pabellon', source: 'antena', tags: ['ubicacion', 'telefono'] },

    S7_BEGO_NOCHE: { kind: 'statement', text: 'Begoña declara que salió del hospital a las 20:00, llegó a casa a las 20:20 y, al no encontrar a Nerea, llamó a su teléfono, al entrenador y a sus amigas.', time: '20:00', end: '21:00', person: 'begona', place: 'piso', source: 'declaración', tags: ['coartada'] },
    S7_BEGO_IRLANDA: { kind: 'statement', text: 'Begoña declara que tiene una oferta de trabajo en Cork desde enero, que Nerea «no quería, pero lo iba aceptando» y que la vista es el jueves.', person: 'begona', source: 'declaración', tags: ['custodia'] },
    S7_BEGO_AMENAZA: { kind: 'statement', text: 'Begoña declara que Ramón le dijo en septiembre que, antes de dejar que se llevara a la niña, «haría lo que hiciera falta».', person: 'ramon', source: 'declaración', tags: ['amenaza', 'custodia'] },
    S7_BEGO_ACOSO: { kind: 'statement', text: 'Begoña cree que Nerea no tenía problemas en el instituto: la veía más callada y lo atribuía al traslado.', person: 'begona', source: 'declaración', tags: ['acoso'] },
    S7_BEGO_JULIAN: { kind: 'statement', text: 'Begoña declara que el vecino Julián, «que tiene antecedentes», la avisó a las 23:45 del sobre del buzón, y que alguna vez ha llevado a Nerea en su furgoneta.', person: 'julian', source: 'declaración', tags: ['vecino'] },
    S7_BEGO_NOTA: { kind: 'statement', text: 'Begoña declara que la letra de la nota «se parece mucho» a la de Nerea, pero que no está segura.', person: 'begona', source: 'declaración', tags: ['nota'] },
    S7_RAMON_NOCHE: { kind: 'statement', text: 'Ramón declara que trabajó en el taller de Bembibre hasta las 20:30 y que después fue a su casa de Bembibre y no salió.', time: '20:30', end: '08:00', person: 'ramon', place: 'bembibre', source: 'declaración', tags: ['coartada'] },
    S7_RAMON_CONTACTO: { kind: 'statement', text: 'Ramón declara que no habla con Nerea desde el domingo, cuando la devolvió a casa de su madre.', person: 'ramon', source: 'declaración', tags: ['mensaje'] },
    S7_RAMON_JUICIO: { kind: 'statement', text: 'Ramón declara que se opone al traslado a Irlanda «en el juzgado, como se hace».', person: 'ramon', source: 'declaración', tags: ['custodia'] },
    S7_RAMON_NOCEDA: { kind: 'statement', text: 'Ramón declara que la casa familiar de Noceda del Bierzo está cerrada desde el verano.', person: 'ramon', source: 'declaración', tags: ['noceda'] },
    S7_RAMON_TALLER: { kind: 'statement', text: 'Ramón declara que, además de su teléfono, usa el móvil de empresa del taller para hablar con clientes.', person: 'ramon', source: 'declaración', tags: ['telefono'] },
    S7_MARISA_NOCHE: { kind: 'statement', text: 'Marisa declara que pasó la tarde y la noche sola en su piso de Compostilla y que no salió.', time: '18:00', end: '08:00', person: 'marisa', place: 'marisa', source: 'declaración', tags: ['coartada'] },
    S7_MARISA_FUMA: { kind: 'statement', text: 'Marisa declara que fuma desde los dieciocho años.', person: 'marisa', source: 'declaración', tags: ['adn'] },
    S7_MARISA_NOCEDA: { kind: 'statement', text: 'Marisa declara que no va a la casa de Noceda desde agosto.', person: 'marisa', source: 'declaración', tags: ['noceda'] },
    S7_MARISA_NEREA: { kind: 'statement', text: 'Marisa declara que quiere a Nerea «como a una hija» y que su hermano está destrozado por el traslado.', person: 'marisa', source: 'declaración', tags: ['custodia'] },
    S7_OSCAR_CASA: { kind: 'statement', text: 'Óscar declara que cerró el pabellón a las 19:20 y se fue directo a su casa de Fuentesnuevas.', time: '19:20', end: '23:00', person: 'oscar', place: 'oscar', source: 'declaración', tags: ['coartada'] },
    S7_OSCAR_VIO: { kind: 'statement', text: 'Óscar declara que vio a Nerea salir con su mochila hacia la parada, como cada martes.', time: '19:05', person: 'oscar', place: 'pabellon', source: 'declaración', tags: ['testigo'] },
    S7_OSCAR_ACOSO: { kind: 'statement', text: 'Óscar declara que en el vestuario había «algún pique, nada serio».', person: 'oscar', source: 'declaración', tags: ['acoso'] },
    S7_OSCAR_FUMA: { kind: 'statement', text: 'Óscar declara que fuma algún cigarro fuera del pabellón al acabar los entrenamientos.', person: 'oscar', source: 'declaración', tags: ['adn'] },
    S7_OSCAR_BAR: { kind: 'statement', text: 'Óscar admite que pasó la tarde en el bar Los Arcos apostando y que lo ocultó porque debe dinero al club.', time: '19:32', end: '21:20', person: 'oscar', place: 'bar', source: 'declaración', tags: ['coartada', 'dinero'] },
    S7_JULIAN_CASA: { kind: 'statement', text: 'Julián declara que pasó toda la tarde en su casa, solo.', time: '16:00', end: '23:45', person: 'julian', place: 'piso', source: 'declaración', tags: ['coartada'] },
    S7_JULIAN_SOBRE: { kind: 'statement', text: 'Julián declara que a las 23:45, al bajar la basura, vio un sobre asomando del buzón de Begoña y la avisó.', time: '23:45', person: 'julian', place: 'piso', source: 'declaración', tags: ['nota'] },
    S7_JULIAN_ANTEC: { kind: 'statement', text: 'Julián declara que fue condenado en 2009 por lesiones en una pelea y que desde entonces no ha tenido problemas.', person: 'julian', source: 'declaración', tags: ['antecedentes'] },
    S7_JULIAN_LLEVAR: { kind: 'statement', text: 'Julián declara que alguna vez acercó a Nerea al pabellón en su furgoneta, cuando llovía, con permiso de su madre.', person: 'julian', source: 'declaración', tags: ['vehiculo'] },
    S7_JULIAN_FUMA: { kind: 'statement', text: 'Julián declara que fuma un paquete al día.', person: 'julian', source: 'declaración', tags: ['adn'] },
    S7_JULIAN_OBRA: { kind: 'statement', text: 'Julián admite que estaba haciendo una reforma sin factura en un piso de la calle trasera del pabellón mientras cobra el paro, y dice que no vio a Nerea.', time: '16:50', end: '19:34', person: 'julian', place: 'trasera', source: 'declaración', tags: ['coartada'] },
    S7_ANDREA_NOCHE: { kind: 'statement', text: 'Andrea declara que se fue a pie del pabellón hacia las 19:20, llegó a su piso hacia las 19:45 y no volvió a salir.', time: '19:45', end: '08:00', person: 'andrea', place: 'lazurtegui', source: 'declaración', tags: ['coartada'] },
    S7_ANDREA_CONTACTO: { kind: 'statement', text: 'Andrea declara que no habla con Nerea fuera del pabellón desde hace semanas.', person: 'andrea', source: 'declaración', tags: ['mensaje'] },
    S7_ANDREA_PISO: { kind: 'statement', text: 'Andrea declara que vive en un piso compartido junto a la plaza Lazúrtegui.', person: 'andrea', place: 'lazurtegui', source: 'declaración', tags: ['domicilio'] },
    S7_ANDREA_TAQUILLA: { kind: 'statement', text: 'Andrea declara que no ha tocado la taquilla de Nerea: cada jugadora tiene su candado.', person: 'andrea', source: 'declaración', tags: ['taquilla'] },
    S7_VICTOR_NOCHE: { kind: 'statement', text: 'Víctor declara que estuvo en la tienda hasta las 20:00, que después subió a su piso, encima de la tienda, y que no salió.', time: '19:00', end: '08:00', person: 'victor', place: 'tienda', source: 'declaración', tags: ['coartada'] },
    S7_VICTOR_NEREA: { kind: 'statement', text: 'Víctor declara que Nerea va con sus amigas a los torneos de los sábados y que en septiembre le cambió la pantalla del móvil.', person: 'victor', source: 'declaración', tags: ['tienda'] },
    S7_VICTOR_DANI: { kind: 'statement', text: 'Víctor declara que no sabe quién hay detrás de la cuenta «dani_16».', person: 'victor', source: 'declaración', tags: ['chat'] },
    S7_VICTOR_PISO: { kind: 'statement', text: 'Víctor declara que no tiene ni alquila más vivienda que su piso encima de la tienda.', person: 'victor', source: 'declaración', tags: ['domicilio'] }
  },

  /* Contradicciones comunes (pistas falsas incluidas). */
  conflicts: [
    { id: 'C01', a: 'S7_OSCAR_CASA', b: 'F7_BAR_OSCAR', type: 'Lugar distinto', severity: 'media', desc: 'Óscar dice que se fue directo a casa; la cámara del bar Los Arcos le muestra allí de 19:32 a 21:20.' },
    { id: 'C02', a: 'S7_JULIAN_CASA', b: 'F7_CAM_FURGO', type: 'Lugar distinto', severity: 'media', desc: 'Julián dice que pasó la tarde en casa; su furgoneta estuvo aparcada detrás del pabellón de 16:50 a 19:34.' },
    { id: 'C03', a: 'S7_JULIAN_CASA', b: 'F7_ANT_JULIAN', type: 'Lugar distinto', severity: 'media', desc: 'Julián dice que pasó la tarde en casa; su teléfono conecta con la antena del pabellón hasta las 19:38.' },
    { id: 'C04', a: 'S7_BEGO_ACOSO', b: 'F7_TEL_ACOSO', type: 'Hecho distinto', severity: 'baja', desc: 'Begoña cree que Nerea no tenía problemas en el instituto; el teléfono muestra burlas y un vídeo manipulado en el grupo de clase desde septiembre.' }
  ],

  verdictOptions: {
    culpritLabel: 'Explicación principal',
    culprits: [
      { id: 'ramon', label: 'La ocultó su padre, Ramón Valcarce Lago' },
      { id: 'marisa', label: 'La ocultó su tía, Marisa Valcarce Lago, por su cuenta' },
      { id: 'victor', label: 'La captó y la ocultó Víctor Arias Blanco' },
      { id: 'oscar', label: 'Delito contra Nerea cometido por Óscar Méndez Ferreiro' },
      { id: 'julian', label: 'Delito contra Nerea cometido por Julián Rodera Gómez' },
      { id: 'andrea', label: 'La retuvo Andrea Soto Rivas contra su voluntad' },
      { id: 'begona', label: 'La ocultó su madre, Begoña Prieto Arias' },
      { id: 'voluntaria', label: 'Se fue por voluntad propia y una persona de su entorno la acogió' },
      { id: 'desconocido', label: 'Rapto por un desconocido sin relación con ella' },
      { id: 'insuficiente', label: 'Evidencia insuficiente para una conclusión' }
    ],
    accompliceLabel: 'Personas que colaboraron',
    motives: [
      { id: 'm7_custodia', label: 'Impedir que la madre se la llevara al extranjero (conflicto de custodia)' },
      { id: 'm7_captacion', label: 'Un adulto la captó por internet para apartarla de su entorno' },
      { id: 'm7_acoso', label: 'Huir del acoso que sufría en el instituto' },
      { id: 'm7_dinero', label: 'Conseguir dinero de la familia' },
      { id: 'm7_venganza', label: 'Venganza contra la madre' },
      { id: 'm7_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me7_familiar', label: 'Recogida pactada en coche junto al pabellón y ocultación en una casa familiar' },
      { id: 'me7_cita', label: 'Cita concertada por internet, recogida en coche al bajar del autobús y ocultación en un piso' },
      { id: 'me7_propia', label: 'Salida por su cuenta en autobús y acogida en el piso de una persona de confianza' },
      { id: 'me7_rapto', label: 'Rapto por la fuerza en la calle' },
      { id: 'me7_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento en que Nerea desaparece',
    windows: [
      { id: 'w7_salida', label: 'Entre las 19:05 y las 19:30, al salir del entrenamiento' },
      { id: 'w7_antes', label: 'Antes de las 19:00, durante el entrenamiento' },
      { id: 'w7_noche', label: 'Después de las 21:00' },
      { id: 'w7_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F7_ARMARIO', 'F7_LUPA_CAJON', 'F7_TAQUILLA', 'F7_PARADA'], label: 'armario, cajón visto con lupa, taquilla y parada' },
    movement: { ids: ['D7_CAM_PAB', 'D7_BUS', 'D7_BAR'], label: 'cámara del pabellón, autobús y bar' },
    judicialRelevant: [],
    spatialBonus: [],
    temporalConflicts: [],
    lateral: [],
    usefulLab: []
  },

  trial: {},
  trialIntro: {},

  /* ================= VERSIONES ================= */
  variants: {
    /* ---------- Versión A: el padre y la tía (conflicto de custodia) ---------- */
    ramon: {
      facts: {
        F7_CAJON: { text: 'En el cajón, la hucha de Nerea sigue llena (unos 85 €, según su madre) y su DNI está en su sitio.', person: 'nerea', place: 'piso', source: 'escena', tags: ['dinero'] },
        F7_LUPA_CAJON: { text: 'Lupa: entre los apuntes, un pósit con la letra de Nerea: «Mar 19:10 — atrás — ¡sin móvil!».', person: 'nerea', source: 'escena', tags: ['nota'] },
        F7_ARMARIO: { text: 'Begoña revisa el armario: no falta ropa. Nerea se fue solo con lo que llevaba puesto y la mochila de deporte.', person: 'nerea', place: 'piso', source: 'escena', tags: ['ropa'] },
        F7_DIARIO_CLAVE: { text: 'Diario, domingo 18: «Papá dice que si me voy unos días con él, el juez tendrá que escucharme. No sé si está bien. No se lo puedo contar a mamá».', person: 'nerea', source: 'documento', tags: ['documento', 'custodia'] },
        F7_NOTA: { text: 'Nota del buzón, en una hoja de cuaderno: «Mamá: estoy bien. No quiero irme a Irlanda y nadie me escucha. Me voy unos días. No me busquéis. Nerea».', time: '23:45', person: 'nerea', place: 'piso', source: 'documento', tags: ['nota'] },
        F7_NOTA_LETRA: { pericia: { type: 'caligrafia', match: 'marisa', label: 'nota del buzón' }, text: 'Cotejo caligráfico: la nota imita la letra de Nerea, pero el trazo es lento y retocado, y los rasgos coinciden con las muestras de escritura de Marisa Valcarce.', source: 'laboratorio', tags: ['nota'] },
        F7_NOTA_HUELLAS: { prints: [{ at: 'Solapa del sobre', match: 'marisa' }, { at: 'Cara escrita de la nota', q: 'no_apta' }], text: 'Huellas: en la solapa del sobre, una huella de Marisa Valcarce; en la nota, una latente parcial sin valor identificativo.', source: 'laboratorio', tags: ['huella', 'nota'] },
        F7_TAQUILLA: { text: 'En la taquilla de Nerea quedan sus rodilleras y la ropa de entrenar. La mochila no está: se la llevó.', person: 'nerea', place: 'pabellon', source: 'escena', tags: ['taquilla'] },
        F7_TAQUILLA_HUELLAS: { prints: [{ at: 'Puerta interior de la taquilla', match: 'nerea' }], text: 'Huellas: en el interior de la taquilla solo hay huellas de Nerea.', source: 'laboratorio', tags: ['huella', 'taquilla'] },
        F7_NEUMATICO: { pericia: { type: 'neumatico', match: 'turismo', label: 'rodada de la salida lateral' }, text: 'Comparativa: la rodada es de un neumático de turismo (205/55 R16), un modelo muy común.', source: 'laboratorio', tags: ['vehiculo'] },
        F7_ADN_COLILLAS: { pericia: { type: 'adn', match: 'marisa', label: 'colillas de la salida lateral' }, text: 'ADN: las tres colillas de la salida lateral son de Marisa Valcarce.', person: 'marisa', place: 'pabellon', source: 'laboratorio', tags: ['adn'] },
        F7_CAM_SALIDA: { text: 'Cámara del pabellón: a las 19:05 Nerea sale con su mochila de deporte y va hacia la parada. A las 19:10 vuelve a pasar por la acera en sentido contrario y entra en el aparcamiento lateral. A las 19:12 sale del aparcamiento un turismo gris; no se lee la matrícula.', time: '19:05', end: '19:12', person: 'nerea', place: 'pabellon', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F7_BUS_NEREA: { text: 'La tarjeta de transporte de Nerea no registra ninguna validación el martes por la tarde, y la cámara interior del autobús de las 19:15 no la muestra.', time: '19:15', person: 'nerea', place: 'parada', source: 'registro', tags: ['autobus'] },
        F7_TEL_CONTACTO: { text: 'Teléfono de Nerea: se recupera una conversación borrada con un contacto guardado como «Taller». Lunes, 21:14: «Mañana a las 19:10, en el aparcamiento lateral, por detrás. La tía te espera en el coche gris. Apaga el móvil y déjalo en la papelera de la parada; ya tendrás otro». Nerea: «Vale. Pero solo unos días».', time: '21:14', person: 'nerea', source: 'mensaje', tags: ['mensaje'] },
        F7_PC_CHAT: { text: 'Chat del juego con «dani_16»: partidas, bromas y quejas sobre el instituto. Nada fuera de lo normal. La última conversación es del domingo.', person: 'nerea', source: 'dispositivo', tags: ['chat'] },
        F7_PC_BUSQUEDAS: { text: 'Búsquedas recientes en el portátil: «a qué edad puede un hijo decidir con quién vivir», «juicio custodia irse al extranjero hija no quiere».', person: 'nerea', source: 'dispositivo', tags: ['portatil', 'custodia'] },
        F7_JUEGO_TITULAR: { text: 'La plataforma informa: «dani_16» es la cuenta de un chico de 16 años de Astorga, con control parental de su madre. El martes estuvo conectado desde su casa de Astorga de 18:30 a 21:45.', source: 'registro', tags: ['chat'] },
        F7_FIN_NOCEDA: { text: 'El contador inteligente de la casa de Noceda del Bierzo, sin apenas consumo desde agosto, registra luz y calefacción desde las 20:05 del martes.', time: '20:05', place: 'noceda', source: 'registro', tags: ['noceda'] },
        F7_FIN_TIENDA: { text: 'Caja de la tienda de Víctor Arias: última venta a las 19:52; la alarma se conecta a las 20:03.', time: '19:52', end: '20:03', person: 'victor', place: 'tienda', source: 'registro', tags: ['tienda'] },
        F7_FIN_CLAVE: { text: 'La línea guardada como «Taller» en el teléfono de Nerea es el móvil de empresa del taller de Bembibre; el taller confirma que lo usa Ramón Valcarce.', person: 'ramon', source: 'registro', tags: ['telefono'] },
        F7_FIN_COMPRA: { text: 'Tarjeta de Marisa Valcarce: el martes a las 18:31 compra en un supermercado de Compostilla un pijama juvenil de la talla 14, un cepillo de dientes, champú y comida para varios días.', time: '18:31', person: 'marisa', place: 'marisa', source: 'documento', tags: ['dinero', 'compra'] },
        F7_ANT_RAMON: { text: 'Teléfono de Ramón: antena de Bembibre hasta las 20:38; antena de Noceda del Bierzo desde las 21:05 y toda la noche.', time: '21:05', end: '01:00', person: 'ramon', place: 'noceda', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_MARISA: { text: 'Teléfono de Marisa: antena de Cuatrovientos, que cubre el pabellón, de 18:50 a 19:14; Bembibre a las 19:36; Noceda del Bierzo de 19:58 a 23:05; Flores del Sil de 23:28 a 23:40; de nuevo Noceda desde las 00:20.', time: '18:50', end: '00:20', person: 'marisa', place: 'noceda', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_ANDREA: { text: 'Teléfono de Andrea: antena de Cuatrovientos hasta las 19:24; plaza Lazúrtegui desde las 19:44 y toda la noche.', time: '19:44', end: '01:00', person: 'andrea', place: 'lazurtegui', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_VICTOR: { text: 'Teléfono de Víctor: antena de Flores del Sil toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'victor', place: 'tienda', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S7_JULIAN_PORTAL: { kind: 'statement', text: 'Julián declara que hacia las 23:30 oyó la puerta del portal y vio de espaldas a una mujer con un abrigo largo que salía deprisa.', time: '23:30', person: 'julian', place: 'piso', source: 'testigo', tags: ['testigo', 'nota'] },
        S7_ANDREA_ACOSO: { kind: 'statement', text: 'Andrea declara que oyó hablar de un vídeo trucado de Nerea que circulaba en su clase y que se lo comentó a Óscar.', person: 'andrea', source: 'declaración', tags: ['acoso'] },
        S7_RAMON_ADMITE: { kind: 'statement', text: 'Ramón admite que Nerea está en la casa de Noceda desde el martes, que su hermana la recogió en el pabellón y que él fue después del trabajo. Dice que lo hizo «para que el juez la escuchara».', time: '21:05', person: 'ramon', place: 'noceda', source: 'declaración', tags: ['noceda', 'custodia'] },
        S7_MARISA_ADMITE: { kind: 'statement', text: 'Marisa admite que recogió a Nerea en el aparcamiento lateral a las 19:10, que la llevó a Noceda y que volvió por la noche a dejar en el buzón una nota que escribió ella imitando su letra.', time: '19:10', end: '23:40', person: 'marisa', place: 'pabellon', source: 'declaración', tags: ['noceda', 'nota'] }
      },
      evidence: {
        E7_02: { detail: 'La hucha de lata pesa: está llena. El DNI de Nerea está en el cajón, entre apuntes y pósits.' },
        E7_03: { detail: 'Ropa doblada y colgada. Begoña no echa nada en falta.' },
        E7_07: { detail: 'Una hoja de cuaderno escrita a mano y firmada «Nerea». El trazo es cuidadoso y algo lento.' },
        E7_08: { detail: 'Rodilleras y ropa de entrenar. No está la mochila.' }
      },
      answers: {
        ramon: { noche: { type: 'mentira' }, contacto: { type: 'mentira' }, noceda: { type: 'mentira' } },
        marisa: { noche: { type: 'mentira' }, noceda: { type: 'mentira' } },
        julian: { portal: { a: 'Hacia las once y media oí la puerta del portal. Me asomé a la mirilla y vi de espaldas a una mujer con un abrigo largo que salía deprisa. No le vi la cara.' } }
      },
      confront: {
        ramon: {
          F7_TEL_CONTACTO: { a: 'Ese móvil lo coge medio taller.', reveals: [] },
          F7_FIN_CLAVE: { a: 'Vale, le escribí yo. Quería verla antes del juicio. Nada más.', reveals: [] },
          F7_ANT_RAMON: { a: '(Se queda callado mucho rato.) Está en Noceda. Está bien. Solo quería que el juez la escuchara antes de que se la llevaran.', reveals: ['S7_RAMON_ADMITE'] },
          F7_FIN_NOCEDA: { a: 'Está en Noceda, conmigo. Está bien. Mi hermana la recogió. Yo solo quería que el juez la escuchara.', reveals: ['S7_RAMON_ADMITE'] },
          F7_NOTA_LETRA: { a: 'Mi hermana no ha escrito nada.', reveals: [] }
        },
        marisa: {
          F7_ANT_MARISA: { a: 'Salí a dar una vuelta en coche. Necesitaba despejarme.', reveals: [] },
          F7_FIN_COMPRA: { a: 'Eran cosas para mí.', reveals: [] },
          F7_ADN_COLILLAS: { a: '(Respira hondo.) Sí. La recogí yo. La llevé a Noceda. Ella quería venir… al principio.', reveals: ['S7_MARISA_ADMITE'] },
          F7_NOTA_LETRA: { a: 'La escribí yo. Para que Begoña no sufriera. Y la dejé en el buzón.', reveals: ['S7_MARISA_ADMITE'] }
        },
        victor: { F7_PC_JUEGO: { a: 'No sé quién es ese chico. Por la tienda pasan muchos críos.', reveals: [] } }
      },
      conflicts: [
        { id: 'CA1', a: 'S7_RAMON_CONTACTO', b: 'F7_TEL_CONTACTO', type: 'Hecho distinto', severity: 'alta', desc: 'Ramón dice que no habla con Nerea desde el domingo; el lunes a las 21:14 el contacto «Taller» la cita para el martes en el aparcamiento lateral.' },
        { id: 'CA2', a: 'S7_MARISA_NOCHE', b: 'F7_ANT_MARISA', type: 'Lugar distinto', severity: 'alta', desc: 'Marisa dice que no salió de casa; su teléfono está junto al pabellón de 18:50 a 19:14, en Noceda después y en Flores del Sil a las 23:30.' },
        { id: 'CA3', a: 'S7_RAMON_NOCHE', b: 'F7_ANT_RAMON', type: 'Lugar distinto', severity: 'alta', desc: 'Ramón dice que pasó la noche en su casa de Bembibre; su teléfono está en Noceda del Bierzo desde las 21:05.' },
        { id: 'CA4', a: 'S7_RAMON_NOCEDA', b: 'F7_FIN_NOCEDA', type: 'Hecho distinto', severity: 'alta', desc: 'Ramón dice que la casa de Noceda está cerrada desde el verano; el contador registra luz y calefacción desde las 20:05 del martes.' },
        { id: 'CA5', a: 'F7_NOTA', b: 'F7_NOTA_LETRA', type: 'Hecho distinto', severity: 'media', desc: 'La nota está firmada por Nerea; la pericial caligráfica la atribuye a Marisa Valcarce.' },
        { id: 'CA6', a: 'S7_MARISA_NOCHE', b: 'F7_ADN_COLILLAS', type: 'Lugar distinto', severity: 'media', desc: 'Marisa dice que no salió de casa; sus colillas están junto a la salida lateral del aparcamiento del pabellón.' }
      ],
      truth: {
        culprit: 'ramon', motive: 'm7_custodia', method: 'me7_familiar', window: 'w7_salida', accomplices: ['marisa'],
        partialMethods: { me7_cita: 'Viste que hubo una recogida en coche concertada de antemano, pero no que la organizó su propia familia ni adónde la llevaron.' },
        decisive: ['F7_TEL_CONTACTO', 'F7_FIN_CLAVE', 'F7_ANT_MARISA', 'F7_ANT_RAMON', 'F7_FIN_NOCEDA', 'F7_FIN_COMPRA', 'F7_NOTA_LETRA', 'F7_NOTA_HUELLAS', 'F7_CAM_SALIDA', 'F7_BUS_NEREA', 'F7_NEUMATICO', 'F7_ADN_COLILLAS', 'F7_LUPA_CAJON', 'F7_DIARIO_CLAVE', 'S7_JULIAN_PORTAL', 'F7_ARMARIO'],
        weak: ['F7_BAR_OSCAR', 'F7_CAM_FURGO', 'S7_JULIAN_ANTEC', 'F7_PC_JUEGO', 'F7_TEL_ACOSO', 'F7_FIN_OSCAR', 'S7_JULIAN_LLEVAR', 'F7_ANT_JULIAN', 'S7_BEGO_JULIAN'],
        keyConflicts: ['CA1', 'CA2', 'CA3', 'CA4'],
        narrative: [
          'Ramón Valcarce ocultó a su hija con la ayuda de su hermana Marisa. Temía perder la vista del jueves y que Begoña se llevara a Nerea a Irlanda en enero. El domingo convenció a la niña de que, si se iba con él unos días, «el juez tendría que escucharla». Nerea, asustada por el traslado, aceptó sin entender lo que suponía.',
          'El lunes a las 21:14 le escribió desde el móvil de empresa del taller, guardado como «Taller», para que nada quedara en su número personal: el martes a las 19:10, en el aparcamiento lateral, su tía la esperaría en un coche gris; tenía que apagar el teléfono y tirarlo en la papelera de la parada. Nerea lo apuntó en un pósit y borró la conversación.',
          'Marisa compró a las 18:31 un pijama, un cepillo de dientes y comida, y esperó desde las 18:50 en el aparcamiento lateral fumando. A las 19:05 Nerea salió hacia la parada, apagó el teléfono a las 19:09, lo tiró a la papelera y volvió hacia el aparcamiento. A las 19:12 el turismo gris arrancó de golpe. No hay ninguna validación de su tarjeta de autobús. A las 20:05 se encendieron la luz y la calefacción de la casa de Noceda. Ramón terminó en el taller a las 20:30 y a las 21:05 ya estaba allí.',
          'Para frenar la búsqueda, Marisa escribió una nota imitando la letra de Nerea, condujo hasta Flores del Sil y la dejó en el buzón hacia las 23:30; Julián la vio salir de espaldas. El miércoles Nerea pidió volver a casa y su padre le dijo que esperara «hasta después del juicio».',
          'Nerea apareció con vida el jueves 22 a las 06:50, cuando la Guardia Civil entró con orden judicial en la casa de Noceda: estaba ilesa, con su padre y su tía, y volvió con su madre tras pasar por el pediatra. Óscar mintió para ocultar sus apuestas, Julián para ocultar una obra sin factura mientras cobra el paro, y el acoso en clase era real, pero no fue la causa.'
        ]
      },
      trial: {
        ramon: [
          { id: 'O1', text: 'Mi cliente estaba trabajando en Bembibre y no habla con su hija desde el domingo.', accept: ['F7_TEL_CONTACTO', 'F7_FIN_CLAVE', 'F7_ANT_RAMON'] },
          { id: 'O2', text: 'La niña se fue sola: dejó una nota escrita de su puño y letra.', accept: ['F7_NOTA_LETRA', 'F7_NOTA_HUELLAS', 'F7_CAM_SALIDA', 'F7_BUS_NEREA'] },
          { id: 'O3', text: 'La casa de Noceda está cerrada desde el verano; nadie la llevó allí.', accept: ['F7_FIN_NOCEDA', 'F7_ANT_MARISA', 'F7_ANT_RAMON', 'S7_RAMON_ADMITE'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada junto al pabellón esa tarde.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién citó a la menor desde el contacto «Taller».', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué se encendió la casa de Noceda a las 20:05.', accept: [] }
        ]
      },
      trialIntro: { ramon: 'La defensa de Ramón Valcarce sostiene que la menor se marchó por su cuenta y que su cliente no sabía nada.' },
      evaluation: {
        judicialRelevant: ['marisa', 'ramon'],
        spatialBonus: ['F7_FIN_NOCEDA', 'F7_CAM_SALIDA'],
        temporalConflicts: ['CA2', 'CA3'],
        lateral: [
          { type: 'conflict', id: 'CA4', pts: 30, yes: 'Cruzaste el contador de la casa de Noceda con lo que decía el padre.', no: 'No contrastaste el consumo de la casa de Noceda con la versión del padre.' },
          { type: 'fact', id: 'F7_FIN_CLAVE', pts: 25, yes: 'Averiguaste quién usaba el contacto «Taller».', no: 'No averiguaste quién estaba detrás del contacto «Taller».' },
          { type: 'conflict', id: 'CA5', pts: 20 },
          { type: 'chosen', id: 'F7_NOTA_LETRA', pts: 25 }
        ],
        usefulLab: ['E7_07:caligrafia', 'E7_07:huellas', 'E7_10:comparativa', 'E7_11:adn']
      }
    },

    /* ---------- Versión B: un adulto que la captó por internet ---------- */
    victor: {
      facts: {
        F7_CAJON: { text: 'En el cajón, la hucha de Nerea sigue llena (unos 85 €, según su madre) y su DNI está en su sitio.', person: 'nerea', place: 'piso', source: 'escena', tags: ['dinero'] },
        F7_LUPA_CAJON: { text: 'Lupa: al fondo del cajón, el envoltorio vacío de una tarjeta SIM de prepago con la pegatina del precio de la tienda de videojuegos de Víctor Arias.', person: 'nerea', source: 'escena', tags: ['telefono', 'tienda'] },
        F7_ARMARIO: { text: 'Begoña revisa el armario: faltan una sudadera, unos vaqueros y ropa interior; lo que cabe en la mochila de deporte.', person: 'nerea', place: 'piso', source: 'escena', tags: ['ropa'] },
        F7_DIARIO_CLAVE: { text: 'Diario: varias entradas desde agosto sobre «D.»: «D. es el único que me entiende», «dice que no se lo cuente a nadie, que los mayores no lo entenderían», «el martes por fin nos vemos».', person: 'nerea', source: 'documento', tags: ['documento', 'chat'] },
        F7_NOTA: { text: 'Nota del buzón, en una hoja de cuaderno: «Mamá: estoy bien. Me voy unos días con alguien que me entiende. No me busquéis, por favor. Ne».', time: '23:45', person: 'nerea', place: 'piso', source: 'documento', tags: ['nota'] },
        F7_NOTA_LETRA: { pericia: { type: 'caligrafia', match: 'nerea', label: 'nota del buzón' }, text: 'Cotejo caligráfico: la nota es de puño y letra de Nerea; el trazo es irregular y lento, compatible con escribir al dictado o bajo tensión.', source: 'laboratorio', tags: ['nota'] },
        F7_NOTA_HUELLAS: { prints: [{ at: 'Cara escrita de la nota', match: 'nerea' }, { at: 'Solapa del sobre', q: 'no_apta' }], text: 'Huellas: en la nota, una huella de Nerea. En el sobre solo hay marcas de guante y una latente emborronada sin valor identificativo.', source: 'laboratorio', tags: ['huella', 'nota'] },
        F7_TAQUILLA: { text: 'En la taquilla de Nerea quedan sus rodilleras y la ropa de entrenar. La mochila no está: se la llevó.', person: 'nerea', place: 'pabellon', source: 'escena', tags: ['taquilla'] },
        F7_TAQUILLA_HUELLAS: { prints: [{ at: 'Puerta interior de la taquilla', match: 'nerea' }], text: 'Huellas: en el interior de la taquilla solo hay huellas de Nerea.', source: 'laboratorio', tags: ['huella', 'taquilla'] },
        F7_NEUMATICO: { pericia: { type: 'neumatico', match: 'furgoneta', label: 'rodada de la salida lateral' }, text: 'Comparativa: la rodada es de un neumático de furgoneta comercial (215/65 R16).', source: 'laboratorio', tags: ['vehiculo'] },
        F7_ADN_COLILLAS: { pericia: { type: 'adn', match: 'julian', label: 'colillas de la salida lateral' }, text: 'ADN: las tres colillas de la salida lateral son de Julián Rodera.', person: 'julian', place: 'pabellon', source: 'laboratorio', tags: ['adn'] },
        F7_CAM_SALIDA: { text: 'Cámara del pabellón: a las 19:05 Nerea sale con su mochila de deporte y va hacia la parada. Espera sola mirando el teléfono. A las 19:15 llega el autobús de la línea 3; cuando arranca, en la parada ya no hay nadie.', time: '19:05', end: '19:16', person: 'nerea', place: 'parada', source: 'cámara', tags: ['camara', 'autobus'] },
        F7_BUS_NEREA: { text: 'La tarjeta de Nerea valida a las 19:15 en la línea 3, en la parada del pabellón. La cámara interior la muestra sentada sola, con la mochila en las rodillas; baja a las 19:24 en la parada de la Avenida de la Puebla.', time: '19:15', end: '19:24', person: 'nerea', place: 'puebla', source: 'registro', tags: ['autobus', 'camara'] },
        F7_TEL_CONTACTO: { text: 'Teléfono de Nerea: ningún mensaje reciente con adultos ajenos a la familia. El chat del juego no se guarda en el teléfono. El martes a las 19:08 se conecta un minuto a la aplicación del juego y a las 19:09 se apaga.', time: '19:08', person: 'nerea', place: 'parada', source: 'dispositivo', tags: ['telefono'] },
        F7_PC_CHAT: { text: 'Chat del juego con «dani_16», desde agosto: se presenta como un chico de 16 años de Astorga, le pide que no se lo cuente a nadie y que borre las conversaciones. Lunes, 22:40: «Mañana coge el 3 de las 19:15 y bájate en la Avenida de la Puebla. Mi primo te recoge en un coche blanco y te lleva a un sitio donde nadie te va a obligar a irte a Irlanda. Apaga el móvil y tíralo antes de subir».', time: '22:40', person: 'nerea', source: 'dispositivo', tags: ['chat'] },
        F7_PC_BUSQUEDAS: { text: 'Búsquedas recientes en el portátil: «cómo apagar la ubicación del móvil», «autobús Astorga Ponferrada», «qué pasa si me voy de casa unos días».', person: 'nerea', source: 'dispositivo', tags: ['portatil'] },
        F7_JUEGO_TITULAR: { text: 'La plataforma informa: «dani_16» se creó en julio con un correo a nombre de Víctor Arias Blanco y se conecta casi siempre desde la línea de fibra de su tienda de Flores del Sil. La foto del perfil es una imagen copiada de internet.', person: 'victor', place: 'tienda', source: 'registro', tags: ['chat'] },
        F7_FIN_NOCEDA: { text: 'El contador inteligente de la casa de Noceda del Bierzo registra un consumo mínimo, sin cambios desde agosto.', place: 'noceda', source: 'registro', tags: ['noceda'] },
        F7_FIN_TIENDA: { text: 'Caja de la tienda de Víctor Arias: última venta a las 19:02; la alarma se conecta a las 19:06. El horario de la puerta dice «de 10 a 20 h».', time: '19:02', end: '19:06', person: 'victor', place: 'tienda', source: 'registro', tags: ['tienda'] },
        F7_FIN_CLAVE: { text: 'Víctor Arias paga desde el 1 de octubre el alquiler de un estudio en Cacabelos, con contrato a su nombre y seis meses abonados por adelantado.', person: 'victor', place: 'cacabelos', source: 'documento', tags: ['domicilio', 'dinero'] },
        F7_FIN_COMPRA: { text: 'Tarjeta de Víctor Arias: el lunes 19 a las 21:10 compra en un supermercado de Cacabelos comida para varios días, gel y un cepillo de dientes.', person: 'victor', place: 'cacabelos', source: 'documento', tags: ['dinero', 'compra'] },
        F7_ANT_RAMON: { text: 'Teléfono de Ramón: antena de Bembibre toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'ramon', place: 'bembibre', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_MARISA: { text: 'Teléfono de Marisa: antena de Compostilla toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'marisa', place: 'marisa', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_ANDREA: { text: 'Teléfono de Andrea: antena de Cuatrovientos hasta las 19:24; plaza Lazúrtegui desde las 19:44 y toda la noche.', time: '19:44', end: '01:00', person: 'andrea', place: 'lazurtegui', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_VICTOR: { text: 'Teléfono de Víctor: Flores del Sil hasta las 19:10; antena del centro (Avenida de la Puebla) de 19:18 a 19:34; Cacabelos de 19:55 a 22:50; Flores del Sil de 23:05 a 23:35; de nuevo Cacabelos desde las 00:10.', time: '19:18', end: '00:10', person: 'victor', place: 'cacabelos', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S7_JULIAN_PORTAL: { kind: 'statement', text: 'Julián declara que hacia las 23:20 vio por la mirilla a un hombre con capucha que salía del portal, de espaldas.', time: '23:20', person: 'julian', place: 'piso', source: 'testigo', tags: ['testigo', 'nota'] },
        S7_ANDREA_ACOSO: { kind: 'statement', text: 'Andrea declara que oyó hablar de un vídeo trucado de Nerea que circulaba en su clase y que se lo comentó a Óscar.', person: 'andrea', source: 'declaración', tags: ['acoso'] },
        S7_VICTOR_ADMITE: { kind: 'statement', text: 'Víctor admite que recogió a Nerea en la Avenida de la Puebla y la llevó a un estudio de Cacabelos «porque quería escapar de su casa», pero niega ser «dani_16».', time: '19:26', person: 'victor', place: 'cacabelos', source: 'declaración', tags: ['vehiculo'] }
      },
      evidence: {
        E7_02: { detail: 'La hucha de lata pesa: está llena. El DNI está en el cajón. Al fondo, entre papeles, hay un envoltorio pequeño de plástico.' },
        E7_03: { detail: 'Ropa doblada y colgada. Begoña echa en falta algunas prendas.' },
        E7_07: { detail: 'Una hoja de cuaderno escrita a mano y firmada «Ne». Las líneas se tuercen hacia abajo.' },
        E7_08: { detail: 'Rodilleras y ropa de entrenar. No está la mochila.' }
      },
      answers: {
        victor: { noche: { type: 'mentira' }, juego: { type: 'mentira' }, piso: { type: 'mentira' } },
        julian: { portal: { a: 'Sobre las once y veinte oí la puerta de la calle. Por la mirilla vi bajar a un hombre con capucha, de espaldas. Pensé que era un repartidor.' } }
      },
      confront: {
        victor: {
          F7_JUEGO_TITULAR: { a: 'Alguien habrá usado mi correo. Por la tienda entra mucha gente y la contraseña del wifi la sabe todo el barrio.', reveals: [] },
          F7_FIN_TIENDA: { a: 'Cerré un poco antes. ¿Y qué?', reveals: [] },
          F7_ANT_VICTOR: { a: '(Se recuesta.) Vale. La recogí en la Puebla y la llevé a Cacabelos. Ella quería escapar de su casa, yo solo la ayudé. Lo del chico ese no tiene nada que ver conmigo.', reveals: ['S7_VICTOR_ADMITE'] },
          F7_FIN_CLAVE: { a: 'Está en el estudio de Cacabelos. Ella me lo pidió. Quería irse de su casa.', reveals: ['S7_VICTOR_ADMITE'] },
          F7_LUPA_CAJON: { a: 'Vendo cientos de tarjetas como esa.', reveals: [] }
        },
        ramon: { F7_ANT_RAMON: { a: '¿Lo ve? En Bembibre, en mi casa. Mientras ustedes pierden el tiempo conmigo, mi hija está por ahí.', reveals: [] } },
        marisa: { F7_ANT_MARISA: { a: 'Ya le dije que no salí de casa.', reveals: [] } }
      },
      conflicts: [
        { id: 'CB1', a: 'S7_VICTOR_NOCHE', b: 'F7_ANT_VICTOR', type: 'Lugar distinto', severity: 'alta', desc: 'Víctor dice que no salió de la tienda ni de su piso; su teléfono está en la Avenida de la Puebla de 19:18 a 19:34 y en Cacabelos de 19:55 a 22:50.' },
        { id: 'CB2', a: 'S7_VICTOR_NOCHE', b: 'F7_FIN_TIENDA', type: 'Hora distinta', severity: 'alta', desc: 'Víctor dice que cerró a las 20:00; la última venta es de las 19:02 y la alarma se conecta a las 19:06.' },
        { id: 'CB3', a: 'S7_VICTOR_DANI', b: 'F7_JUEGO_TITULAR', type: 'Hecho distinto', severity: 'alta', desc: 'Víctor dice no saber quién es «dani_16»; la cuenta se creó con su correo y se conecta desde la fibra de su tienda.' },
        { id: 'CB4', a: 'S7_VICTOR_PISO', b: 'F7_FIN_CLAVE', type: 'Hecho distinto', severity: 'alta', desc: 'Víctor dice que no alquila ninguna otra vivienda; paga un estudio en Cacabelos desde el 1 de octubre.' },
        { id: 'CB5', a: 'F7_PC_JUEGO', b: 'F7_JUEGO_TITULAR', type: 'Hecho distinto', severity: 'alta', desc: '«dani_16» dice ser un chico de 16 años de Astorga; la cuenta pertenece a un adulto de Ponferrada y la foto es copiada.' },
        { id: 'CB6', a: 'S7_VICTOR_ADMITE', b: 'F7_JUEGO_TITULAR', type: 'Hecho distinto', severity: 'media', desc: 'Víctor admite la recogida pero niega ser «dani_16»; la plataforma vincula la cuenta a su correo y a su tienda.' }
      ],
      truth: {
        culprit: 'victor', motive: 'm7_captacion', method: 'me7_cita', window: 'w7_salida', accomplices: [],
        partialMethods: {
          me7_familiar: 'Viste que hubo una recogida en coche concertada de antemano, pero no quién estaba detrás.',
          me7_propia: 'Viste que tomó el autobús por su cuenta, pero no que alguien la esperaba al bajar.'
        },
        decisive: ['F7_JUEGO_TITULAR', 'F7_PC_CHAT', 'F7_ANT_VICTOR', 'F7_FIN_TIENDA', 'F7_FIN_CLAVE', 'F7_FIN_COMPRA', 'F7_BUS_NEREA', 'F7_CAM_SALIDA', 'F7_LUPA_CAJON', 'F7_DIARIO_CLAVE', 'F7_NOTA_LETRA', 'F7_PC_BUSQUEDAS', 'S7_JULIAN_PORTAL', 'F7_ARMARIO'],
        weak: ['F7_NEUMATICO', 'F7_ADN_COLILLAS', 'F7_CAM_FURGO', 'S7_JULIAN_ANTEC', 'S7_BEGO_AMENAZA', 'F7_TEL_ACOSO', 'F7_BAR_OSCAR', 'S7_JULIAN_LLEVAR', 'F7_FIN_RAMON'],
        keyConflicts: ['CB1', 'CB2', 'CB3', 'CB4'],
        narrative: [
          'Víctor Arias, dueño de la tienda de videojuegos del barrio, captó a Nerea a través del juego en línea. Desde agosto, con la cuenta «dani_16», se hacía pasar por un chico de 16 años de Astorga, le pedía que no se lo contara a nadie y que borrara las conversaciones. Se aprovechó de lo que ella le contaba: el traslado a Irlanda y lo mal que lo pasaba en clase. Le había regalado una tarjeta SIM de prepago de su tienda «para hablar con Dani», que ella no llegó a activar.',
          'El 1 de octubre alquiló un estudio en Cacabelos y el lunes compró allí comida para varios días. Esa noche, a las 22:40, «dani_16» le dio las instrucciones: coger el autobús de las 19:15, bajarse en la Avenida de la Puebla, donde «su primo» la recogería en un coche blanco, y apagar y tirar el teléfono antes de subir.',
          'El martes cerró la tienda a las 19:06, no a las 20:00. Nerea salió del pabellón a las 19:05, apagó el teléfono a las 19:09, lo tiró a la papelera y validó su tarjeta a las 19:15. Bajó a las 19:24 en la Avenida de la Puebla y Víctor la recogió con su todoterreno compacto blanco; a ella le dijo que «Dani» llegaría más tarde. A las 19:55 su teléfono ya estaba en Cacabelos.',
          'Allí le hizo escribir una nota para su madre. Volvió a Flores del Sil, la dejó con guantes en el buzón hacia las 23:20 (Julián vio salir a un hombre con capucha) y regresó a Cacabelos. Ante las antenas admitió la recogida, pero siguió negando ser «dani_16».',
          'Nerea apareció con vida el miércoles 21 a las 21:40, cuando la policía entró con orden judicial en el estudio de Cacabelos: estaba sola, ilesa y encerrada con llave. La atendió un equipo especializado y volvió con su madre. Las colillas y la furgoneta del aparcamiento eran de Julián, que trabajaba sin factura detrás del pabellón. Óscar ocultaba sus apuestas. El padre había amenazado con «hacer lo que hiciera falta», pero no salió de Bembibre.'
        ]
      },
      trial: {
        victor: [
          { id: 'O1', text: 'Mi cliente estuvo toda la tarde en su tienda y en su casa.', accept: ['F7_ANT_VICTOR', 'F7_FIN_TIENDA'] },
          { id: 'O2', text: 'Nada relaciona a mi cliente con la cuenta «dani_16».', accept: ['F7_JUEGO_TITULAR', 'F7_LUPA_CAJON'] },
          { id: 'O3', text: 'La menor cogió el autobús por su cuenta. Nadie la estaba esperando.', accept: ['F7_PC_CHAT', 'F7_BUS_NEREA', 'F7_FIN_CLAVE', 'F7_FIN_COMPRA'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en la Avenida de la Puebla a las 19:24.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién hay detrás de la cuenta «dani_16».', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué la menor bajó del autobús antes de su parada.', accept: [] }
        ]
      },
      trialIntro: { victor: 'La defensa de Víctor Arias sostiene que la menor quería irse de casa y que su cliente solo la llevó en coche.' },
      evaluation: {
        judicialRelevant: ['victor'],
        spatialBonus: ['F7_BUS_NEREA', 'F7_FIN_CLAVE'],
        temporalConflicts: ['CB1', 'CB2'],
        lateral: [
          { type: 'conflict', id: 'CB5', pts: 30, yes: 'Comprobaste quién había de verdad detrás de la cuenta del juego.', no: 'No comprobaste quién había detrás de «dani_16».' },
          { type: 'fact', id: 'F7_LUPA_CAJON', pts: 20, yes: 'Examinaste el cajón con lupa y encontraste el envoltorio de la SIM.', no: 'No examinaste de cerca el cajón de Nerea.' },
          { type: 'conflict', id: 'CB2', pts: 25 },
          { type: 'chosen', id: 'F7_BUS_NEREA', pts: 25 }
        ],
        usefulLab: ['E7_07:caligrafia', 'E7_07:huellas']
      }
    },

    /* ---------- Versión C: se fue por su cuenta y la acogió Andrea ---------- */
    voluntaria: {
      facts: {
        F7_CAJON: { text: 'En el cajón, la hucha de Nerea está vacía (su madre calcula que tenía unos 85 €) y su DNI no está.', person: 'nerea', place: 'piso', source: 'escena', tags: ['dinero'] },
        F7_LUPA_CAJON: { text: 'Lupa: dentro de la hucha vacía, una lista a mano con la letra de Nerea: «ropa 3 días, neceser, dinero, DNI. NO llevar el móvil».', person: 'nerea', source: 'escena', tags: ['nota'] },
        F7_ARMARIO: { text: 'Begoña revisa el armario: faltan ropa para varios días, el neceser y la bolsa de viaje grande del altillo.', person: 'nerea', place: 'piso', source: 'escena', tags: ['ropa'] },
        F7_DIARIO_CLAVE: { text: 'Diario, lunes 19: «Lo del vídeo ya lo ha visto todo el instituto. No puedo volver. Se lo he contado a A. y me ha dicho que me puedo quedar con ella unos días».', person: 'nerea', source: 'documento', tags: ['documento', 'acoso'] },
        F7_NOTA: { text: 'Nota del buzón, en una hoja de cuaderno: «Mamá: estoy bien y estoy con alguien de confianza. No puedo más con lo del instituto. Necesito unos días. No me busquéis. Ne».', time: '23:45', person: 'nerea', place: 'piso', source: 'documento', tags: ['nota'] },
        F7_NOTA_LETRA: { pericia: { type: 'caligrafia', match: 'nerea', label: 'nota del buzón' }, text: 'Cotejo caligráfico: la nota es de puño y letra de Nerea, con un trazo fluido y seguro.', source: 'laboratorio', tags: ['nota'] },
        F7_NOTA_HUELLAS: { prints: [{ at: 'Cara escrita de la nota', match: 'nerea' }, { at: 'Solapa del sobre', match: 'andrea' }], text: 'Huellas: en la nota, una huella de Nerea; en la solapa del sobre, una huella de Andrea Soto.', source: 'laboratorio', tags: ['huella', 'nota'] },
        F7_TAQUILLA: { text: 'En la taquilla de Nerea quedan sus rodilleras y la ropa de entrenar. En la balda, sobre el polvo, la marca limpia de un objeto pequeño que estuvo allí hasta hace muy poco.', person: 'nerea', place: 'pabellon', source: 'escena', tags: ['taquilla'] },
        F7_TAQUILLA_HUELLAS: { prints: [{ at: 'Puerta interior de la taquilla', match: 'nerea' }, { at: 'Balda de la taquilla', match: 'andrea' }], text: 'Huellas: en la puerta interior, huellas de Nerea; en la balda, una huella reciente de Andrea Soto.', source: 'laboratorio', tags: ['huella', 'taquilla'] },
        F7_NEUMATICO: { pericia: { type: 'neumatico', match: 'clio', label: 'rodada de la salida lateral' }, text: 'Comparativa: la rodada es de un neumático de utilitario (185/65 R15).', source: 'laboratorio', tags: ['vehiculo'] },
        F7_ADN_COLILLAS: { pericia: { type: 'adn', match: 'oscar', label: 'colillas de la salida lateral' }, text: 'ADN: las tres colillas de la salida lateral son de Óscar Méndez.', person: 'oscar', place: 'pabellon', source: 'laboratorio', tags: ['adn'] },
        F7_CAM_SALIDA: { text: 'Cámara del pabellón: a las 17:21 Nerea llega con su mochila de deporte y una bolsa de viaje grande. A las 19:04 sale con las dos y va hacia la parada. A las 19:15 llega el autobús de la línea 3; cuando arranca, la parada está vacía.', time: '19:04', end: '19:16', person: 'nerea', place: 'parada', source: 'cámara', tags: ['camara', 'autobus'] },
        F7_BUS_NEREA: { text: 'La tarjeta de Nerea valida a las 19:15 en la línea 3, en la parada del pabellón. La cámara interior la muestra sola, con la bolsa de viaje a sus pies; baja a las 19:27 en la plaza Lazúrtegui.', time: '19:15', end: '19:27', person: 'nerea', place: 'lazurtegui', source: 'registro', tags: ['autobus', 'camara'] },
        F7_TEL_CONTACTO: { text: 'Teléfono de Nerea: se recupera una conversación borrada con Andrea Soto. Lunes, 22:30, Andrea: «Mañana te dejo las llaves en la taquilla. Puedes quedarte un par de días, pero a tu madre le tienes que decir que estás bien». Nerea: «Le dejaré una nota. No le digas a nadie dónde estoy».', time: '22:30', person: 'andrea', source: 'mensaje', tags: ['mensaje'] },
        F7_PC_CHAT: { text: 'Chat del juego con «dani_16»: partidas y quejas sobre el instituto. Él le aconseja que se lo cuente a un adulto. La última conversación es del sábado.', person: 'nerea', source: 'dispositivo', tags: ['chat'] },
        F7_PC_BUSQUEDAS: { text: 'Búsquedas recientes en el portátil: «cómo denunciar un vídeo trucado», «me puedo ir a vivir con una amiga mayor de edad», «qué pasa si falto a clase una semana».', person: 'nerea', source: 'dispositivo', tags: ['portatil', 'acoso'] },
        F7_JUEGO_TITULAR: { text: 'La plataforma informa: «dani_16» es la cuenta de un chico de 16 años de Astorga, con control parental de su madre. El martes estuvo conectado desde su casa de Astorga de 18:30 a 21:45.', source: 'registro', tags: ['chat'] },
        F7_FIN_NOCEDA: { text: 'El contador inteligente de la casa de Noceda del Bierzo registra un consumo mínimo, sin cambios desde agosto.', place: 'noceda', source: 'registro', tags: ['noceda'] },
        F7_FIN_TIENDA: { text: 'Caja de la tienda de Víctor Arias: última venta a las 19:52; la alarma se conecta a las 20:03.', time: '19:52', end: '20:03', person: 'victor', place: 'tienda', source: 'registro', tags: ['tienda'] },
        F7_FIN_CLAVE: { text: 'Tarjeta de Andrea Soto: el martes a las 19:52 compra en el supermercado de su calle una cena para dos, un cepillo de dientes y gel.', time: '19:52', person: 'andrea', place: 'lazurtegui', source: 'documento', tags: ['dinero', 'compra'] },
        F7_FIN_COMPRA: { text: 'Cuenta juvenil de Nerea: retirada de 60 € en un cajero del centro el lunes 19 a las 17:40, la primera en meses.', time: '17:40', person: 'nerea', source: 'documento', tags: ['dinero'] },
        F7_ANT_RAMON: { text: 'Teléfono de Ramón: antena de Bembibre toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'ramon', place: 'bembibre', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_MARISA: { text: 'Teléfono de Marisa: antena de Compostilla toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'marisa', place: 'marisa', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_ANDREA: { text: 'Teléfono de Andrea: antena de Cuatrovientos hasta las 19:24; plaza Lazúrtegui de 19:44 a 22:48; Flores del Sil de 22:52 a 23:08; de nuevo Lazúrtegui desde las 23:15.', time: '22:52', end: '23:08', person: 'andrea', place: 'piso', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F7_ANT_VICTOR: { text: 'Teléfono de Víctor: antena de Flores del Sil toda la tarde y toda la noche.', time: '17:00', end: '01:00', person: 'victor', place: 'tienda', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S7_JULIAN_PORTAL: { kind: 'statement', text: 'Julián declara que hacia las 23:00 vio salir del portal a una chica joven con coleta, deprisa.', time: '23:00', person: 'julian', place: 'piso', source: 'testigo', tags: ['testigo', 'nota'] },
        S7_ANDREA_ACOSO: { kind: 'statement', text: 'Andrea declara que no sabe nada de problemas de Nerea en el instituto: «no me contaba sus cosas».', person: 'andrea', source: 'declaración', tags: ['acoso'] },
        S7_ANDREA_ADMITE: { kind: 'statement', text: 'Andrea admite que Nerea está en su piso desde el martes por la tarde: le dejó las llaves en la taquilla y llevó ella la nota al buzón. Dice que Nerea le suplicó que no lo contara.', time: '19:27', person: 'andrea', place: 'lazurtegui', source: 'declaración', tags: ['domicilio', 'nota'] }
      },
      evidence: {
        E7_02: { detail: 'La hucha de lata está abierta y vacía. No está el DNI. Dentro de la hucha hay un papel doblado.' },
        E7_03: { detail: 'Hay huecos en las baldas y perchas vacías. El altillo está abierto.' },
        E7_07: { detail: 'Una hoja de cuaderno escrita a mano y firmada «Ne». La letra es redonda y segura.' },
        E7_08: { detail: 'Rodilleras y ropa de entrenar. En la balda, una marca limpia en el polvo.' }
      },
      answers: {
        andrea: {
          noche: { type: 'mentira' }, contacto: { type: 'mentira' }, taquilla: { type: 'mentira' },
          acoso: { a: 'No sé nada de eso. Nerea no me contaba sus cosas.', type: 'mentira' }
        },
        julian: { portal: { a: 'Hacia las once vi salir del portal a una chica joven, con coleta, muy deprisa. No era de la escalera.' } }
      },
      confront: {
        andrea: {
          F7_TEL_CONTACTO: { a: '(Se echa a llorar.) Está en mi piso. Está bien. Le dejé las llaves en la taquilla. Me suplicó que no se lo dijera a nadie… Solo quería que estuviera a salvo.', reveals: ['S7_ANDREA_ADMITE'] },
          F7_NOTA_HUELLAS: { a: 'La nota la llevé yo. La escribió ella. Está en mi casa, está bien.', reveals: ['S7_ANDREA_ADMITE'] },
          F7_ANT_ANDREA: { a: 'Fui a dejar la nota. Nerea está en mi piso. No le ha pasado nada.', reveals: ['S7_ANDREA_ADMITE'] },
          F7_TAQUILLA_HUELLAS: { a: 'Soy la ayudante. A veces toco las taquillas.', reveals: [] },
          S7_JULIAN_PORTAL: { a: 'Chicas con coleta hay muchas.', reveals: [] }
        },
        oscar: {
          F7_ADN_COLILLAS: { a: 'Fumo fuera al acabar. Ya se lo dije.', reveals: [] },
          F7_NEUMATICO: { a: 'Salí con prisa, sí. Tenía que llegar a algo antes de las siete y media.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'CC1', a: 'S7_ANDREA_CONTACTO', b: 'F7_TEL_CONTACTO', type: 'Hecho distinto', severity: 'alta', desc: 'Andrea dice que no habla con Nerea fuera del pabellón desde hace semanas; el lunes a las 22:30 le ofreció quedarse en su casa y dejarle las llaves en la taquilla.' },
        { id: 'CC2', a: 'S7_ANDREA_NOCHE', b: 'F7_ANT_ANDREA', type: 'Lugar distinto', severity: 'alta', desc: 'Andrea dice que no volvió a salir de su piso; su teléfono está en Flores del Sil, donde vive Nerea, de 22:52 a 23:08.' },
        { id: 'CC3', a: 'S7_ANDREA_TAQUILLA', b: 'F7_TAQUILLA_HUELLAS', type: 'Hecho distinto', severity: 'alta', desc: 'Andrea dice que no ha tocado la taquilla de Nerea; hay una huella reciente suya en la balda.' },
        { id: 'CC4', a: 'S7_ANDREA_NOCHE', b: 'S7_JULIAN_PORTAL', type: 'Hecho distinto', severity: 'media', desc: 'Andrea dice que no salió de su piso; el vecino vio salir del portal de Nerea a una chica joven con coleta hacia las 23:00.' },
        { id: 'CC5', a: 'S7_ANDREA_ACOSO', b: 'F7_DIARIO_CLAVE', type: 'Hecho distinto', severity: 'media', desc: 'Andrea dice que Nerea no le contaba sus cosas; el diario dice que se lo contó todo a «A.» y que «A.» le ofreció quedarse con ella.' }
      ],
      truth: {
        culprit: 'voluntaria', motive: 'm7_acoso', method: 'me7_propia', window: 'w7_salida', accomplices: ['andrea'],
        partialMethods: { me7_cita: 'Viste que salió en autobús y que alguien la acogió, pero no que la iniciativa fue suya.' },
        decisive: ['F7_TEL_CONTACTO', 'F7_TAQUILLA_HUELLAS', 'F7_NOTA_HUELLAS', 'F7_NOTA_LETRA', 'F7_ANT_ANDREA', 'F7_BUS_NEREA', 'F7_CAM_SALIDA', 'F7_ARMARIO', 'F7_CAJON', 'F7_LUPA_CAJON', 'F7_DIARIO_CLAVE', 'F7_FIN_CLAVE', 'F7_FIN_COMPRA', 'F7_TEL_ACOSO', 'S7_JULIAN_PORTAL', 'F7_PC_BUSQUEDAS'],
        weak: ['F7_NEUMATICO', 'F7_ADN_COLILLAS', 'F7_BAR_OSCAR', 'S7_BEGO_AMENAZA', 'F7_CAM_FURGO', 'S7_JULIAN_ANTEC', 'F7_PC_JUEGO', 'F7_FIN_OSCAR', 'F7_FIN_RAMON'],
        keyConflicts: ['CC1', 'CC2', 'CC3'],
        narrative: [
          'Nerea se fue por su propia voluntad. Desde septiembre, un grupo de su clase se burlaba de ella y reenviaba un vídeo manipulado con su cara. No se lo contó a su madre, absorbida por el traslado a Irlanda; a la psicóloga del juzgado solo le dijo que «en clase las cosas estaban mal». El lunes por la noche, desesperada, se lo contó a Andrea Soto, la excapitana a la que adoraba.',
          'Andrea, con buena intención pero sin medir lo que hacía, le ofreció quedarse unos días en su piso y le pidió que avisara a su madre de que estaba bien. Nerea sacó 60 € del cajero esa tarde, vació su hucha, cogió su DNI e hizo una lista: «NO llevar el móvil». El martes llegó al pabellón con una bolsa de viaje. Durante el entrenamiento Andrea le dejó las llaves en la balda de la taquilla.',
          'A las 19:04 salió con las dos bolsas, apagó el teléfono a las 19:09 y lo tiró a la papelera, validó su tarjeta a las 19:15 y bajó a las 19:27 en la plaza Lazúrtegui. Entró en el piso con las llaves. Andrea llegó a las 19:44 y a las 19:52 compró una cena para dos y un cepillo de dientes.',
          'Esa noche, Andrea llevó al buzón la nota que había escrito Nerea: su teléfono estuvo en Flores del Sil de 22:52 a 23:08 y Julián vio salir del portal a una chica con coleta hacia las 23:00. Después negó haber hablado con Nerea y haber tocado su taquilla.',
          'Nerea apareció con vida el miércoles 21 a las 17:30, cuando la policía llegó al piso de Andrea: estaba bien y abrió ella misma la puerta. Volvió con su madre, el instituto abrió el protocolo de acoso y Andrea, mayor de edad, tendrá que responder ante el juzgado por ocultarla sin avisar a nadie. Óscar, con colillas y una rodada en el aparcamiento, mintió para ocultar sus apuestas; Julián, para ocultar una obra sin factura. «dani_16» era un chico de Astorga que le aconsejó pedir ayuda.'
        ]
      },
      trial: {
        voluntaria: [
          { id: 'O1', text: 'La menor fue retenida contra su voluntad por un adulto de su entorno.', accept: ['F7_ARMARIO', 'F7_CAJON', 'F7_LUPA_CAJON', 'F7_CAM_SALIDA', 'F7_DIARIO_CLAVE', 'F7_FIN_COMPRA'] },
          { id: 'O2', text: 'El entrenador mintió sobre dónde estuvo y sus colillas están en el aparcamiento.', accept: ['F7_BAR_OSCAR', 'S7_OSCAR_BAR', 'F7_ANT_OSCAR'] },
          { id: 'O3', text: 'Nadie de su entorno sabía dónde estaba.', accept: ['F7_TEL_CONTACTO', 'F7_TAQUILLA_HUELLAS', 'F7_NOTA_HUELLAS', 'F7_ANT_ANDREA'] }
        ],
        generic: [
          { id: 'O1', text: 'La acusación no explica por qué la menor salió del pabellón con una bolsa de viaje.', accept: [] },
          { id: 'O2', text: 'La acusación no explica cómo llegó la menor a la plaza Lazúrtegui.', accept: [] },
          { id: 'O3', text: 'La acusación no explica quién dejó la nota en el buzón.', accept: [] }
        ]
      },
      trialIntro: { voluntaria: 'Audiencia sobre la línea de investigación. La acusación particular, en nombre del padre, sostiene que Nerea fue sustraída por un adulto.' },
      evaluation: {
        judicialRelevant: ['andrea'],
        spatialBonus: ['F7_BUS_NEREA', 'F7_FIN_CLAVE'],
        temporalConflicts: ['CC2'],
        lateral: [
          { type: 'fact', id: 'F7_TAQUILLA_HUELLAS', pts: 25, yes: 'Analizaste la taquilla: alguien más la había abierto.', no: 'No analizaste las huellas de la taquilla.' },
          { type: 'conflict', id: 'CC4', pts: 25, yes: 'Relacionaste lo que vio el vecino con la ayudante del entrenador.', no: 'No relacionaste lo que vio el vecino en el portal.' },
          { type: 'conflict', id: 'CC1', pts: 25 },
          { type: 'chosen', id: 'F7_ARMARIO', pts: 25 }
        ],
        usefulLab: ['E7_07:huellas', 'E7_08:huellas', 'E7_07:caligrafia']
      }
    }
  }
});
