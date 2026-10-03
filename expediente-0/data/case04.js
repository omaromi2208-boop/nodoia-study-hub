/* EXPEDIENTE 0 — Caso EXP-004 «La masía de los Ballester».
 * Triple homicidio con superviviente. Inspirado en patrones de casos documentados
 * (familia en vivienda aislada, superviviente, posible montaje de intrusos), con personas,
 * lugares y hechos completamente ficticios.
 *
 * CASO CON VERSIONES: la estructura (personas, escena, evidencias, solicitudes) es común y
 * cada partida elige en secreto una de tres soluciones. Las versiones solo sobrescriben
 * contenidos: hechos, detalles de evidencias, algunas respuestas, contradicciones y verdad. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-004',
  title: 'La masía de los Ballester',
  type: 'Homicidio múltiple',
  difficulty: 'Extrema',
  minRank: 3,
  budget: 1400,
  location: 'Masía Ballester, partida de El Pla · Vilallarga (Castellón)',
  date: 'Noche del sábado 7 al domingo 8 de noviembre de 2026',
  victim: {
    id: 'vicente',
    name: 'Vicente Ballester Gil',
    summary: 'Vicente Ballester Gil (68), Amparo Roig Peris (64) y su hijo Nicolás Ballester Roig (34)',
    age: 68,
    job: 'Familia propietaria de Cítricos Ballester SL'
  },
  victimLabel: 'Víctimas',
  extraPersons: [{ id: 'amparo', name: 'Amparo Roig Peris' }, { id: 'nicolas', name: 'Nicolás Ballester Roig' }],
  deathWindow: 'Entre la 01:30 y las 03:30 (estimación preliminar en el lugar)',
  briefing: [
    'A las 03:12 del domingo 8 de noviembre, Carla Ballester llama al 112 desde la masía familiar: «Han entrado, han matado a mis padres y a mi hermano». La Guardia Civil llega a las 03:31.',
    'Vicente Ballester está muerto en el salón; su mujer, Amparo, en su cama; su hijo Nicolás, en el pasillo. Los tres, por disparos de escopeta. Carla, de 31 años, está al pie de la escalera con una herida en la cabeza. La ventana de la cocina está rota y falta la escopeta del armero.',
    'La familia es propietaria de una empresa de cítricos. El lunes Vicente tenía cita en una notaría. Hay un hermano socio, un encargado despedido, un acreedor del hijo, la pareja de la superviviente, una hija mayor en Valencia y una vecina que oyó los disparos.',
    'Este expediente tiene varias versiones posibles: en cada partida, los hechos encajan con una solución distinta. No te fíes de lo que recuerdes de otra partida. Investiga.'
  ],
  initialFacts: ['F4_AVISO', 'F4_LLEGADA', 'F4_VENTANA_MUERTE'],
  sceneSummary: 'Masía aislada a 2 km del pueblo. Ventana de la cocina rota, armero abierto, tres víctimas en tres estancias y una superviviente herida al pie de la escalera.',

  mapScale: 0.083,
  places: {
    masia: { name: 'Masía Ballester', x: 40, y: 50, kind: 'escena' },
    rosario: { name: 'Masía de Rosario (vecina, 600 m)', x: 36, y: 45, kind: 'domicilio' },
    cruce: { name: 'Cruce del camino (400 m)', x: 44, y: 47, kind: 'carretera' },
    acequia: { name: 'Acequia del camino del pueblo', x: 50, y: 46, kind: 'zona' },
    pueblo: { name: 'Vilallarga (casa de Ernesto)', x: 62, y: 40, kind: 'domicilio' },
    bar: { name: 'Bar La Plaça (Vilallarga)', x: 64, y: 44, kind: 'restaurante' },
    damian: { name: 'Casa de Damián (afueras de Vilallarga)', x: 67, y: 33, kind: 'domicilio' },
    castellon: { name: 'Castellón (piso de Marc, hospital)', x: 96, y: 92, kind: 'domicilio', offmap: '≈ 28 km' },
    valencia: { name: 'Valencia (Teresa y Julio)', x: 4, y: 96, kind: 'domicilio', offmap: '≈ 90 km' }
  },

  people: [
    {
      id: 'carla', name: 'Carla Ballester Roig', initials: 'CB', age: 31,
      role: 'Hija; superviviente', relation: 'Vivía en la masía desde el verano',
      hidden: { honestidad: 50, miedo: 80, manipulacion: 50, autocontrol: 45, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Cómo era la convivencia con tus padres?', a: 'Volví a casa en verano, cuando cerré mi tienda. Como cualquier familia: discusiones, pero nos queríamos.', type: 'media', reveals: [] },
        { id: 'noche', q: '¿Qué ocurrió esa noche?', a: 'Cenamos y me acosté sobre las doce. Me despertó un ruido de cristales, bajé y alguien me golpeó por detrás. Cuando desperté, todo estaba en silencio. Subí, los vi y llamé al 112.', type: 'verdad', reveals: ['S4_CARLA_NOCHE'] },
        { id: 'vio', q: '¿Viste a los agresores?', a: 'Sombras. Dos o tres personas, creo, con capucha. No vi ninguna cara.', type: 'creencia', reveals: ['S4_CARLA_VIO'] },
        { id: 'llave', q: '¿Quién sabía dónde estaba la llave del armero?', a: 'Todos en casa: en el cajón de la cocina. Damián también lo sabía; trabajó aquí doce años.', type: 'verdad', reveals: ['S4_CARLA_LLAVE'] },
        { id: 'comb', q: '¿Quién conocía la combinación de la caja fuerte?', a: 'Mis padres, yo… y Marc. Se la di una vez para que guardara unas joyas mías.', type: 'verdad', reveals: ['S4_CARLA_COMB'] },
        { id: 'disparo', q: '¿Has disparado alguna vez una escopeta?', a: 'De pequeña, con mi padre, a latas. Hace muchos años.', type: 'verdad', reveals: ['S4_CARLA_DISPARO'] },
        { id: 'lunes', q: '¿Qué iba a hacer tu padre el lunes en la notaría?', requires: ['F4_AGENDA'], a: '—', type: 'verdad', reveals: ['S4_CARLA_LUNES'] }
      ],
      confront: {
        F4_FIN_CARLA: { a: 'Tengo deudas, sí. Como mucha gente. Eso no tiene nada que ver con esto.', reveals: [] },
        S4_ROSARIO_PERRO: { a: 'No sé por qué no ladró Lur. Yo estaba inconsciente.', reveals: [] },
        F4_MSG_JULIO: { a: 'Ese Julio llevaba semanas amenazando a mi hermano.', reveals: [] }
      },
      confrontDefault: 'No sé qué quiere que le diga. Acabo de perder a mi familia.'
    },
    {
      id: 'ernesto', name: 'Ernesto Ballester Gil', initials: 'EB', age: 60,
      role: 'Hermano de Vicente; socio', relation: 'Copropietario de la finca El Pla y socio de la empresa',
      hidden: { honestidad: 45, miedo: 55, manipulacion: 60, autocontrol: 75, confianza: 30 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con su hermano?', a: 'Treinta años de socios. Discutíamos, como todos los socios, pero era mi hermano.', type: 'media', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre la 01:00 y las 04:00?', a: 'En casa, en el pueblo. Vivo solo desde que enviudé. Me acosté pronto.', type: 'verdad', reveals: ['S4_ERNESTO_CASA'] },
        { id: 'finca', q: '¿Qué pasaba con la finca El Pla?', a: 'Vicente quería venderla a una cooperativa y yo no. Lo estábamos hablando, sin prisas.', type: 'media', reveals: ['S4_ERNESTO_FINCA'] },
        { id: 'botas', q: '¿Qué calzado usa en el campo?', a: 'Las botas de seguridad de la empresa, como todos. Un 43.', type: 'verdad', reveals: ['S4_ERNESTO_BOTAS'] },
        { id: 'vehiculo', q: '¿Qué vehículos usa?', a: 'Mi coche y el todoterreno de la empresa.', type: 'verdad', reveals: [] },
        { id: 'perro', q: '¿El perro de la masía le conoce?', a: 'Claro. Lur me conoce desde que era un cachorro.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F4_EPIS: { a: 'Esas botas las tiene media plantilla.', reveals: [] }
      },
      confrontDefault: 'No sé qué relación tiene eso conmigo.'
    },
    {
      id: 'marc', name: 'Marc Sanz Ortiz', initials: 'MS', age: 33,
      role: 'Pareja de Carla', relation: 'Monitor de gimnasio en Castellón',
      hidden: { honestidad: 40, miedo: 70, manipulacion: 45, autocontrol: 40, confianza: 30 },
      questions: [
        { id: 'rel', q: '¿Cómo era tu relación con la familia de Carla?', a: 'Salgo con Carla desde hace dos años. A sus padres no les caía bien; pensaban que no le convenía.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuviste entre la 01:00 y las 04:00?', a: 'En mi piso de Castellón. Vi una película y me dormí.', type: 'verdad', reveals: ['S4_MARC_CASTELLON'] },
        { id: 'vehiculo', q: '¿Qué vehículo tienes?', a: 'Una moto, una 125.', type: 'verdad', reveals: ['S4_MARC_MOTO'] },
        { id: 'comb', q: '¿Conocías la combinación de la caja fuerte?', a: 'No. ¿Por qué iba a saberla?', type: 'mentira', reveals: ['S4_MARC_COMB'] },
        { id: 'deudas', q: '¿Tienes deudas?', requires: ['F4_FIN_MARC'], a: 'Tengo un problema con las apuestas. Lo estoy arreglando.', type: 'verdad', reveals: [] },
        { id: 'talla', q: '¿Qué número calzas?', requires: ['F4_FIN_MARC', 'F4_CALZADO'], a: 'Un 44.', type: 'verdad', reveals: ['S4_MARC_TALLA'] }
      ],
      confront: {
        S4_CARLA_COMB: { a: 'Carla se confunde. Nunca he sabido esa combinación.', reveals: [] },
        F4_TEL_CARLA_MARC: { a: 'Hablábamos de su padre, que no la dejaba en paz con el dinero. Nada más.', reveals: [] }
      },
      confrontDefault: 'No sé de qué me habla.'
    },
    {
      id: 'damian', name: 'Damián Ortells Mas', initials: 'DO', age: 45,
      role: 'Exencargado de la finca', relation: 'Despedido por Vicente el 23 de octubre',
      hidden: { honestidad: 55, miedo: 50, manipulacion: 25, autocontrol: 35, confianza: 35 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con los Ballester?', a: 'Fui el encargado doce años. Vicente me echó el 23 de octubre por una tontería.', type: 'media', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En el bar de la plaza hasta la una y media. Luego a casa, solo.', type: 'verdad', reveals: ['S4_DAMIAN_NOCHE'] },
        { id: 'amenaza', q: '¿Amenazó a Vicente?', a: 'Nunca. Le dije cuatro cosas, pero nada más.', type: 'mentira', reveals: ['S4_DAMIAN_NOAMENAZA'] },
        { id: 'llave', q: '¿Sabía dónde estaba la llave del armero?', a: 'En el cajón de la cocina. Lo sabía todo el que trabajaba allí.', type: 'verdad', reveals: ['S4_DAMIAN_LLAVE'] },
        { id: 'botas', q: '¿Qué calzado usa?', a: 'Las botas de la empresa, un 43. Me las quedé al irme.', type: 'verdad', reveals: ['S4_DAMIAN_BOTAS'] },
        { id: 'perro', q: '¿El perro le conoce?', a: 'Lur me sigue a todas partes. Le daba de comer yo.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F4_BAR_AMENAZA: { a: 'Estaba bebido. Fue una forma de hablar. Yo no mato a nadie.', reveals: [] },
        F4_EPIS: { a: 'Las tienen todos los de la finca.', reveals: [] }
      },
      confrontDefault: 'De eso no sé nada.'
    },
    {
      id: 'julio', name: 'Julio Cantó Vera', initials: 'JC', age: 39,
      role: 'Exsocio de Nicolás', relation: 'Nicolás le debía 6.000 € por un bar que cerraron',
      hidden: { honestidad: 70, miedo: 40, manipulacion: 30, autocontrol: 50, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Nicolás?', a: 'Montamos un bar en Castellón. Cerró y me debe seis mil euros.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En Valencia, en casa de mi pareja. Estuvimos hablando por teléfono con mi hermano casi hasta las tres.', type: 'verdad', reveals: ['S4_JULIO_VALENCIA'] },
        { id: 'masia', q: '¿Conocía la masía?', a: 'Nunca he estado allí. Ni sé llegar.', type: 'verdad', reveals: [] },
        { id: 'amenaza', q: '¿Amenazó a Nicolás?', requires: ['F4_MSG_JULIO', 'F4_FIN_NICOLAS'], a: 'Le escribí cosas feas para que pagara. Eso no me convierte en un asesino.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F4_MSG_JULIO: { a: 'Era una forma de presionar. Mire dónde estaba yo esa noche.', reveals: [] },
        S4_ROSARIO_PERRO: { a: 'Yo a ese perro no lo he visto en mi vida.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'teresa', name: 'Teresa Ballester Roig', initials: 'TB', age: 36,
      role: 'Hija mayor', relation: 'Profesora; vive en Valencia con su familia',
      hidden: { honestidad: 90, miedo: 30, manipulacion: 10, autocontrol: 60, confianza: 70 },
      questions: [
        { id: 'rel', q: '¿Cómo era tu relación con tu familia?', a: 'Soy la mayor. Me fui a Valencia hace diez años. Hablaba con mi madre casi a diario.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuviste esa noche?', a: 'En Valencia, con mi marido y mis hijos.', type: 'verdad', reveals: ['S4_TERESA'] },
        { id: 'llamada', q: '¿Hablaste con tu familia esa noche?', a: 'Llamé a mi madre a las diez y cuarto. Me dijo que papá estaba muy tenso por lo del lunes y que había discutido por teléfono con alguien.', type: 'verdad', reveals: ['S4_TERESA_MADRE'] },
        { id: 'carla', q: '¿Cómo era la relación de Carla con vuestros padres?', a: 'Complicada desde lo de la tienda. Mi padre le prestó mucho dinero y lo perdió todo.', type: 'verdad', reveals: [] },
        { id: 'herencia', q: '¿Sabes algo de cambios en el testamento?', requires: ['F4_FIN_HERENCIA', 'F4_DOC_LUNES'], a: 'No. Mi padre no hablaba de esas cosas conmigo.', type: 'verdad', reveals: [] }
      ],
      confront: {},
      confrontDefault: 'No lo sé. Ojalá supiera algo que ayudara.'
    },
    {
      id: 'rosario', name: 'Rosario Llop Bel', initials: 'RL', age: 71,
      role: 'Vecina (masía a 600 m)', relation: 'Conoce a la familia desde hace cuarenta años',
      hidden: { honestidad: 95, miedo: 30, manipulacion: 5, autocontrol: 60, confianza: 70 },
      questions: [
        { id: 'oyo', q: '¿Qué oyó esa noche?', a: 'Me desvelé. Hacia las tres menos veinte oí cinco disparos seguidos, en menos de dos minutos. Luego, silencio. A las tres y media vi llegar las luces de la Guardia Civil.', type: 'verdad', reveals: ['S4_ROSARIO_DISPAROS'] },
        { id: 'perro', q: '¿Ladró el perro de los Ballester?', a: 'No. Y es raro: Lur ladra a cualquiera que no conozca, hasta al cartero nuevo.', type: 'verdad', reveals: ['S4_ROSARIO_PERRO'] },
        { id: 'motor', q: '¿Oyó algún vehículo?', a: '—', type: 'verdad', reveals: ['S4_ROSARIO_MOTOR'] },
        { id: 'luces', q: '¿Vio luces en la masía?', a: 'Se apagaron todas hacia las doce y media, menos la del porche.', type: 'verdad', reveals: ['S4_ROSARIO_LUCES'] }
      ],
      confront: {},
      confrontDefault: 'Eso no lo sé, hijo.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'casa', name: 'Masía · planta baja', legend: 'Vivienda de una planta con desván · 180 m²',
        rooms: [
          { id: 'cocina', name: 'Cocina', x: 0, y: 0, w: 30, h: 55 },
          { id: 'porche', name: 'Porche', x: 0, y: 55, w: 22, h: 45 },
          { id: 'salon', name: 'Salón', x: 22, y: 55, w: 48, h: 45 },
          { id: 'pasillo', name: 'Pasillo', x: 30, y: 35, w: 40, h: 20 },
          { id: 'dormitorio', name: 'Dormitorio principal', x: 30, y: 0, w: 35, h: 35 },
          { id: 'dormnico', name: 'Dormitorio de Nicolás', x: 65, y: 0, w: 35, h: 35 },
          { id: 'despacho', name: 'Despacho', x: 70, y: 35, w: 30, h: 65 }
        ],
        hotspots: [
          { ev: 'E4_04', x: 8, y: 20 }, { ev: 'E4_05', x: 10, y: 80 }, { ev: 'E4_14', x: 28, y: 68 },
          { ev: 'E4_01', x: 46, y: 82 }, { ev: 'E4_13', x: 58, y: 66 }, { ev: 'E4_10', x: 36, y: 92 },
          { ev: 'E4_02', x: 46, y: 16 }, { ev: 'E4_03', x: 66, y: 46 }, { ev: 'E4_09', x: 86, y: 16 },
          { ev: 'E4_08', x: 46, y: 44 }, { ev: 'E4_06', x: 90, y: 58 }, { ev: 'E4_07', x: 82, y: 86 }
        ]
      },
      {
        id: 'exterior', name: 'Exterior', legend: 'Patio, caseta del perro, huerto con depósito y camino de acceso',
        rooms: [
          { id: 'patio', name: 'Patio', x: 0, y: 0, w: 60, h: 55 },
          { id: 'caseta', name: 'Caseta del perro', x: 60, y: 0, w: 40, h: 30 },
          { id: 'huerto', name: 'Huerto y depósito', x: 60, y: 30, w: 40, h: 70 },
          { id: 'camino', name: 'Camino de acceso', x: 0, y: 55, w: 60, h: 45 }
        ],
        hotspots: [{ ev: 'E4_11', x: 78, y: 15 }, { ev: 'E4_15', x: 82, y: 62 }, { ev: 'E4_12', x: 30, y: 78 }]
      }
    ]
  },

  evidence: [
    { id: 'E4_01', name: 'Cuerpo de Vicente', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal', room: 'Salón',
      public: 'Vicente yace en el salón, junto a la chimenea.', detail: 'Dos heridas de escopeta en el tórax. Viste pijama y zapatillas; tiene una linterna en el suelo, a su lado.',
      value: 'Distancia, posición y orden de los disparos.', limits: 'La hora en el lugar es solo orientativa.',
      reveals: ['F4_VICENTE'], lab: { autopsia: { cost: 300, reveals: ['F4_AUTOPSIA_V', 'F4_AUTOPSIA_HORA'] } } },
    { id: 'E4_02', name: 'Cuerpo de Amparo', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal', room: 'Dormitorio principal',
      public: 'Amparo yace en su cama.', detail: 'Una herida de escopeta. Las sábanas están apenas revueltas.',
      value: 'Indica si estaba despierta.', limits: '—',
      reveals: ['F4_AMPARO'], lab: { autopsia: { cost: 250, reveals: ['F4_AUTOPSIA_A'] } } },
    { id: 'E4_03', name: 'Cuerpo de Nicolás', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal', room: 'Pasillo',
      public: 'Nicolás yace en el pasillo, ante la puerta de su dormitorio.', detail: 'Dos heridas de escopeta, una de ellas en la espalda.',
      value: 'Secuencia del ataque.', limits: '—',
      reveals: ['F4_NICOLAS'], lab: { autopsia: { cost: 250, reveals: ['F4_AUTOPSIA_N'] } } },
    { id: 'E4_04', name: 'Ventana de la cocina', type: 'Escena', level: 5, room: 'Cocina',
      public: 'La ventana de la cocina tiene el cristal roto.', detail: '—',
      value: 'Puede indicar por dónde se entró.', limits: 'Un cristal roto no prueba una entrada.',
      reveals: ['F4_CRISTALES'], lab: { comparativa: { cost: 180, label: 'Patrón de fractura del vidrio', reveals: ['F4_FRACTURA'] } } },
    { id: 'E4_05', name: 'Pisadas en el barro del porche', type: 'Huella', level: 3, fixed: true, room: 'Porche',
      public: 'Barro húmedo frente al porche y bajo la ventana de la cocina.', detail: '—',
      value: 'Quién pasó por allí.', limits: 'El calzado se comparte y se repite.',
      reveals: ['F4_HUELLAS_BARRO'], lab: { comparativa: { cost: 180, label: 'Comparativa de calzado', reveals: ['F4_CALZADO'] } } },
    { id: 'E4_06', name: 'Caja fuerte', type: 'Objeto', level: 3, fixed: true, room: 'Despacho',
      public: 'Caja fuerte empotrada en el despacho.', detail: '—',
      value: 'Puede indicar el móvil.', limits: 'Un robo puede ser real o simulado.',
      reveals: ['F4_CAJA'], lab: { huellas: { cost: 120, reveals: ['F4_CAJA_HUELLAS'] } } },
    { id: 'E4_07', name: 'Escritorio del despacho', type: 'Documento', level: 2, room: 'Despacho',
      public: 'Escritorio con papeles y una agenda.', detail: '—',
      value: 'Qué preocupaba a Vicente.', limits: 'Faltan papeles: no sabemos cuáles había.',
      reveals: ['F4_AGENDA', 'F4_DOC_LUNES'] },
    { id: 'E4_08', name: 'Armero del pasillo', type: 'Escena', level: 2, fixed: true, room: 'Pasillo',
      public: 'Armero metálico en el pasillo.', detail: 'Abierto con la llave puesta. Falta la escopeta del calibre 12 de Vicente; hay cartuchos por el suelo.',
      value: 'Origen del arma.', limits: 'La llave estaba al alcance de cualquiera que conociera la casa.',
      reveals: ['F4_ARMERO'] },
    { id: 'E4_09', name: 'Teléfono de Nicolás', type: 'Dispositivo', level: 2, room: 'Dormitorio de Nicolás',
      public: 'Teléfono en la mesilla de Nicolás.', detail: 'Bloqueado. Requiere extracción.',
      value: 'Mensajes y última actividad.', limits: '—',
      reveals: ['F4_TEL_NICO_ESCENA'], unlocks: ['D4_TEL_NICO'] },
    { id: 'E4_10', name: 'Teléfono de Carla', type: 'Dispositivo', level: 2, room: 'Salón',
      public: 'Teléfono de Carla en el suelo del salón.', detail: 'Con el que llamó al 112. Requiere extracción.',
      value: 'Actividad antes de la llamada.', limits: '—',
      reveals: ['F4_TEL_CARLA_ESCENA'], unlocks: ['D4_TEL_CARLA'] },
    { id: 'E4_11', name: 'Caseta del perro', type: 'Escena', level: 2, fixed: true, room: 'Caseta del perro',
      public: 'Caseta junto a la entrada.', detail: 'Un mastín atado con una cadena larga que llega hasta la puerta del porche. Está ileso y tranquilo.',
      value: 'Un perro reacciona a quien no conoce.', limits: 'No dice quién vino.',
      reveals: ['F4_PERRO'] },
    { id: 'E4_12', name: 'Camino de acceso', type: 'Escena', level: 3, fixed: true, room: 'Camino de acceso',
      public: 'Camino de tierra que une la masía con la carretera.', detail: '—',
      value: 'Vehículos que llegaron o se fueron.', limits: 'La lluvia del jueves dejó la tierra blanda: hay marcas de varios días.',
      reveals: ['F4_CAMINO'] },
    { id: 'E4_13', name: 'Vainas de cartucho', type: 'Balística', level: 2, forensic: { lupa: { reveals: ['F4_LUPA_VAINAS'] } }, room: 'Salón',
      public: 'Vainas de cartucho por el suelo.', detail: 'Siete vainas del calibre 12 entre el salón, el pasillo y el dormitorio principal.',
      value: 'Número de disparos y origen de la munición.', limits: '—',
      reveals: ['F4_VAINAS'], lab: { balistica: { cost: 150, reveals: ['F4_VAINAS_LAB'] } } },
    { id: 'E4_14', name: 'Pie de la escalera', type: 'Escena', level: 4, room: 'Salón',
      public: 'Zona donde se encontró a Carla, al pie de la escalera del desván.', detail: 'Mancha de sangre de Carla en el suelo y un candelabro de hierro caído a su lado.',
      value: 'Cómo se produjo la herida de la superviviente.', limits: '—',
      reveals: ['F4_ESCALERA_SANGRE'], lab: { huellas: { cost: 120, label: 'Huellas en el candelabro', reveals: ['F4_CANDELABRO'] } } },
    { id: 'E4_15', name: 'Depósito de agua', type: 'Escena', level: 3, fixed: true, room: 'Huerto',
      public: 'Depósito de agua de riego en el huerto, con tapa.', detail: '—',
      value: 'Un lugar donde ocultar algo.', limits: '—',
      reveals: ['F4_DEPOSITO'] }
  ],

  labKinds: { autopsia: 'Autopsia completa', comparativa: 'Comparativa', huellas: 'Huellas dactilares', balistica: 'Balística' },

  digital: [
    { id: 'D4_112', name: 'Grabación de la llamada al 112', cost: 80, desc: 'Audio íntegro de la llamada de Carla.', reveals: ['F4_112_AUDIO'] },
    { id: 'D4_HOSPITAL', name: 'Informe médico y prueba de residuos de Carla', cost: 150, desc: 'Parte de lesiones del hospital y prueba de residuos de disparo tomada a las 04:30.', reveals: ['F4_HERIDA_CARLA', 'F4_GSR'] },
    { id: 'D4_TEL_CARLA', name: 'Extracción del teléfono de Carla', cost: 250, desc: 'Actividad, llamadas y mensajes.', requires: 'E4_10', reveals: ['F4_TEL_CARLA_112', 'F4_TEL_CARLA_ACT', 'F4_TEL_CARLA_MARC'] },
    { id: 'D4_TEL_NICO', name: 'Extracción del teléfono de Nicolás', cost: 150, desc: 'Mensajes y última actividad.', requires: 'E4_09', reveals: ['F4_MSG_JULIO', 'F4_NICO_ULT'] },
    { id: 'D4_GPS', name: 'GPS de la flota de la empresa', cost: 120, desc: 'Posiciones del todoterreno y las furgonetas de Cítricos Ballester.', reveals: ['F4_GPS_TT'] },
    { id: 'D4_BAR', name: 'Cámara del Bar La Plaça', cost: 60, desc: 'Grabaciones del bar del pueblo.', reveals: ['F4_BAR_DAMIAN', 'F4_BAR_AMENAZA'] },
    { id: 'D4_FIN', name: 'Datos financieros', cost: 150, desc: 'Testamento vigente, cuentas de la empresa y situación de las personas del expediente.', reveals: ['F4_FIN_HERENCIA', 'F4_FIN_CARLA', 'F4_FIN_EMPRESA', 'F4_FIN_MARC', 'F4_FIN_NICOLAS'] },
    { id: 'D4_VEH', name: 'Registro de vehículos', cost: 60, desc: 'Vehículos de las personas del expediente.', reveals: ['F4_VEH_ERNESTO', 'F4_VEH_MARC', 'F4_VEH_DAMIAN', 'F4_VEH_JULIO', 'F4_VEH_TERESA', 'F4_VEH_CARLA'] },
    { id: 'D4_BATIDA', name: 'Batida de búsqueda del arma', cost: 100, desc: 'Búsqueda de la Guardia Civil con perros en un radio de 2 km.', reveals: ['F4_BATIDA'] },
    { id: 'D4_EPIS', name: 'Inventario de equipos de la empresa', cost: 40, desc: 'Entregas de botas y ropa de trabajo.', reveals: ['F4_EPIS'] }
  ],

  judicial: {
    max: 2,
    desc: 'Datos de antenas de un teléfono entre las 22:00 y las 04:00. La masía la cubre la antena de la carretera; el pueblo, la del pueblo. El juzgado autoriza dos solicitudes.',
    results: {
      carla: ['F4_ANT_CARLA'], ernesto: ['F4_ANT_ERNESTO'], marc: ['F4_ANT_MARC'], damian: ['F4_ANT_DAMIAN'],
      julio: ['F4_ANT_JULIO'], teresa: ['F4_ANT_TERESA'], rosario: ['F4_ANT_ROSARIO']
    }
  },

  /* Hechos comunes a todas las versiones. Los hechos que cambian están en `variants`. */
  facts: {
    F4_LUPA_VAINAS: { text: 'Lupa: la marca del percutor es idéntica en las siete vainas: todos los disparos salieron de la misma arma.', source: 'escena', tags: ['arma'] },
    F4_AVISO: { text: 'Carla llama al 112 desde la masía: «Han entrado, han matado a mis padres y a mi hermano».', time: '03:12', person: 'carla', place: 'masia', source: 'llamada', tags: ['llamada', 'aviso'] },
    F4_LLEGADA: { text: 'La patrulla encuentra tres cadáveres y a Carla con una herida en la cabeza al pie de la escalera.', time: '03:31', place: 'masia', source: 'informe policial', tags: ['hallazgo'] },
    F4_VENTANA_MUERTE: { text: 'Estimación preliminar en el lugar: las tres muertes entre la 01:30 y las 03:30.', time: '01:30', end: '03:30', person: 'vicente', source: 'informe forense', tags: ['muerte', 'hora'] },
    F4_VICENTE: { text: 'Vicente yace en el salón con dos heridas de escopeta en el tórax; viste pijama y tiene una linterna a su lado.', person: 'vicente', place: 'masia', source: 'escena', tags: ['muerte', 'arma'] },
    F4_AMPARO: { text: 'Amparo yace en su cama con una herida de escopeta; las sábanas apenas están revueltas.', person: 'amparo', place: 'masia', source: 'escena', tags: ['muerte', 'arma'] },
    F4_NICOLAS: { text: 'Nicolás yace en el pasillo, ante su dormitorio, con dos heridas de escopeta, una en la espalda.', person: 'nicolas', place: 'masia', source: 'escena', tags: ['muerte', 'arma'] },
    F4_AUTOPSIA_V: { text: 'Autopsia de Vicente: dos disparos a unos dos metros, de pie y de frente al tirador. Muerte inmediata.', person: 'vicente', source: 'laboratorio', tags: ['muerte', 'arma'] },
    F4_AUTOPSIA_A: { text: 'Autopsia de Amparo: un disparo a corta distancia mientras estaba tumbada; sin lesiones de defensa.', person: 'amparo', source: 'laboratorio', tags: ['muerte', 'arma'] },
    F4_AUTOPSIA_N: { text: 'Autopsia de Nicolás: dos disparos, uno por la espalda; se había levantado de la cama al oír los primeros.', person: 'nicolas', source: 'laboratorio', tags: ['muerte', 'arma'] },
    F4_AUTOPSIA_HORA: { text: 'Por temperatura y rigidez, las tres muertes se producen en un intervalo muy corto, compatible con las 02:30–03:00.', time: '02:30', end: '03:00', person: 'vicente', place: 'masia', source: 'informe forense', tags: ['muerte', 'hora'] },
    F4_ARMERO: { text: 'El armero del pasillo está abierto con la llave puesta; falta la escopeta del calibre 12 de Vicente. La llave se guardaba en un cajón de la cocina.', place: 'masia', source: 'escena', tags: ['arma', 'llave', 'acceso'] },
    F4_VAINAS: { text: 'Siete vainas del calibre 12 entre el salón, el pasillo y el dormitorio principal.', place: 'masia', source: 'escena', tags: ['arma'] },
    F4_VAINAS_LAB: { text: 'Las vainas son de la misma marca y lote que los cartuchos del armero de la casa.', source: 'laboratorio', tags: ['arma'] },
    F4_CAJA_HUELLAS: { text: 'En la caja fuerte solo hay huellas de Vicente; parte de la puerta se ha limpiado con un paño.', source: 'laboratorio', tags: ['huella', 'caja'] },
    F4_AGENDA: { text: 'Agenda de Vicente: lunes 9/11, 10:00 — notaría de Castellón.', person: 'vicente', source: 'documento', tags: ['documento', 'cita'] },
    F4_ESCALERA_SANGRE: { text: 'Al pie de la escalera hay una mancha de sangre de Carla y un candelabro de hierro caído.', person: 'carla', place: 'masia', source: 'escena', tags: ['golpe', 'arma'] },
    F4_PERRO: { text: 'El perro, un mastín atado con cadena larga hasta la puerta del porche, está ileso y tranquilo.', place: 'masia', source: 'escena', tags: ['perro'] },
    F4_TEL_NICO_ESCENA: { text: 'El teléfono de Nicolás estaba en su mesilla, bloqueado.', source: 'escena', tags: ['telefono'] },
    F4_TEL_CARLA_ESCENA: { text: 'El teléfono de Carla estaba en el suelo del salón.', source: 'escena', tags: ['telefono'] },
    F4_TEL_CARLA_112: { text: 'Teléfono de Carla: llamada al 112 a las 03:12 (2 min 40 s).', time: '03:12', person: 'carla', source: 'llamada', tags: ['llamada'] },
    F4_TEL_CARLA_MARC: { text: 'Mensaje de Carla a Marc el sábado a las 20:05: «Mi padre no va a dar su brazo a torcer».', time: '20:05', person: 'marc', source: 'mensaje', tags: ['mensaje'] },
    F4_112_AUDIO: { text: 'Grabación del 112: Carla, jadeando, dice que han entrado y han matado a su familia. Preguntada por los agresores: «Dos o tres, encapuchados».', time: '03:12', person: 'carla', source: 'llamada', tags: ['llamada', 'audio'] },
    F4_MSG_JULIO: { text: 'Mensaje de Julio a Nicolás (jueves): «O me pagas antes del lunes o voy a buscarte a tu casa».', person: 'julio', source: 'mensaje', tags: ['mensaje', 'amenaza', 'dinero'] },
    F4_NICO_ULT: { text: 'Última actividad del teléfono de Nicolás: 00:12.', time: '00:12', person: 'nicolas', place: 'masia', source: 'dispositivo', tags: ['telefono'] },
    F4_BAR_DAMIAN: { text: 'Cámara del Bar La Plaça: Damián bebe en la barra de 22:40 a 01:28 y se marcha solo, a pie.', time: '22:40', end: '01:28', person: 'damian', place: 'bar', source: 'cámara', tags: ['camara', 'coartada'] },
    F4_BAR_AMENAZA: { text: 'Grabación del 24/10 en el mismo bar: Damián grita a Vicente: «Os vais a acordar de esto».', person: 'damian', source: 'cámara', tags: ['camara', 'amenaza'] },
    F4_FIN_HERENCIA: { text: 'Testamento vigente (2019): Carla, Teresa y Nicolás heredan a partes iguales. La finca El Pla es copropiedad de Vicente y de su hermano Ernesto.', source: 'documento', tags: ['dinero', 'herencia', 'testamento'] },
    F4_FIN_CARLA: { text: 'Carla tiene deudas por 41.000 € tras el cierre de su tienda; su padre le prestó 30.000 € en 2025.', person: 'carla', source: 'documento', tags: ['dinero', 'deuda'] },
    F4_FIN_MARC: { text: 'Marc tiene deudas de apuestas en línea por 12.000 €. En agosto compró con tarjeta unas zapatillas de running de la talla 44.', person: 'marc', source: 'documento', tags: ['dinero', 'deuda'] },
    F4_FIN_NICOLAS: { text: 'Nicolás debía 6.000 € a Julio Cantó por el cierre del bar que compartían.', person: 'julio', source: 'documento', tags: ['dinero', 'deuda'] },
    F4_VEH_ERNESTO: { text: 'Ernesto Ballester: turismo gris y, como socio, uso de un todoterreno de la empresa.', person: 'ernesto', source: 'vehículo', tags: ['vehiculo'] },
    F4_VEH_MARC: { text: 'Marc Sanz: motocicleta de 125 cc (ITV pasada en agosto de 2026). Sin coche.', person: 'marc', source: 'vehículo', tags: ['vehiculo', 'moto'] },
    F4_VEH_DAMIAN: { text: 'Damián Ortells: furgoneta blanca.', person: 'damian', source: 'vehículo', tags: ['vehiculo'] },
    F4_VEH_JULIO: { text: 'Julio Cantó: turismo negro.', person: 'julio', source: 'vehículo', tags: ['vehiculo'] },
    F4_VEH_TERESA: { text: 'Teresa Ballester: turismo familiar.', person: 'teresa', source: 'vehículo', tags: ['vehiculo'] },
    F4_VEH_CARLA: { text: 'Carla Ballester: utilitario rojo, aparcado esa noche en la masía.', person: 'carla', source: 'vehículo', tags: ['vehiculo'] },
    F4_EPIS: { text: 'Inventario de la empresa: botas de seguridad de la talla 43 entregadas a Ernesto Ballester, Damián Ortells y dos peones más.', source: 'registro', tags: ['calzado'] },
    F4_ANT_CARLA: { text: 'Teléfono de Carla: antena de la carretera, que cubre la masía, toda la noche (vive allí).', time: '22:00', end: '03:30', person: 'carla', place: 'masia', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F4_ANT_DAMIAN: { text: 'Teléfono de Damián: antena del pueblo toda la noche. En las zonas intermedias, la antena del pueblo y la de la carretera pueden alternarse.', time: '22:00', end: '04:00', person: 'damian', place: 'damian', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F4_ANT_JULIO: { text: 'Teléfono de Julio: Valencia toda la noche; llamada con su hermano de 01:50 a 02:48 y uso de datos hasta las 03:10.', time: '01:50', end: '03:10', person: 'julio', place: 'valencia', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F4_ANT_TERESA: { text: 'Teléfono de Teresa: Valencia toda la noche.', time: '22:00', end: '04:00', person: 'teresa', place: 'valencia', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F4_ANT_ROSARIO: { text: 'Teléfono de Rosario: antena de la carretera toda la noche (vive a 600 m de la masía).', time: '22:00', end: '04:00', person: 'rosario', place: 'rosario', source: 'antena', tags: ['ubicacion', 'telefono'] },

    S4_CARLA_NOCHE: { kind: 'statement', text: 'Carla declara que la despertó un ruido de cristales, que al bajar la golpearon por detrás y que al despertar llamó al 112.', time: '02:30', end: '03:12', person: 'carla', place: 'masia', source: 'declaración', tags: ['coartada', 'golpe'] },
    S4_CARLA_VIO: { kind: 'statement', text: 'Carla declara que vio sombras de dos o tres personas encapuchadas, sin ver caras.', person: 'carla', source: 'declaración', tags: ['intrusos'] },
    S4_CARLA_LLAVE: { kind: 'statement', text: 'Carla declara que toda la familia y Damián sabían que la llave del armero estaba en el cajón de la cocina.', person: 'carla', source: 'declaración', tags: ['llave', 'arma'] },
    S4_CARLA_COMB: { kind: 'statement', text: 'Carla declara que la combinación de la caja la conocían sus padres, ella y Marc.', person: 'carla', source: 'declaración', tags: ['caja', 'acceso'] },
    S4_CARLA_DISPARO: { kind: 'statement', text: 'Carla declara que no dispara una escopeta desde que era niña.', person: 'carla', source: 'declaración', tags: ['arma'] },
    S4_ERNESTO_CASA: { kind: 'statement', text: 'Ernesto declara que pasó toda la noche en su casa del pueblo.', time: '22:00', end: '07:40', person: 'ernesto', place: 'pueblo', source: 'declaración', tags: ['coartada'] },
    S4_ERNESTO_FINCA: { kind: 'statement', text: 'Ernesto declara que la venta de El Pla "se estaba hablando, sin prisas".', person: 'ernesto', source: 'declaración', tags: ['finca', 'dinero'] },
    S4_ERNESTO_BOTAS: { kind: 'statement', text: 'Ernesto declara que usa las botas de seguridad de la empresa, talla 43.', person: 'ernesto', source: 'declaración', tags: ['calzado'] },
    S4_MARC_CASTELLON: { kind: 'statement', text: 'Marc declara que pasó la noche en su piso de Castellón.', time: '22:00', end: '08:00', person: 'marc', place: 'castellon', source: 'declaración', tags: ['coartada'] },
    S4_MARC_MOTO: { kind: 'statement', text: 'Marc declara que tiene una moto de 125 cc.', person: 'marc', source: 'declaración', tags: ['vehiculo', 'moto'] },
    S4_MARC_COMB: { kind: 'statement', text: 'Marc declara que nunca conoció la combinación de la caja fuerte.', person: 'marc', source: 'declaración', tags: ['caja'] },
    S4_MARC_TALLA: { kind: 'statement', text: 'Marc declara que calza un 44.', person: 'marc', source: 'declaración', tags: ['calzado'] },
    S4_DAMIAN_NOCHE: { kind: 'statement', text: 'Damián declara que estuvo en el bar hasta la 01:30 y luego en su casa, solo.', time: '01:30', end: '08:00', person: 'damian', place: 'damian', source: 'declaración', tags: ['coartada'] },
    S4_DAMIAN_NOAMENAZA: { kind: 'statement', text: 'Damián declara que nunca amenazó a Vicente.', person: 'damian', source: 'declaración', tags: ['amenaza'] },
    S4_DAMIAN_LLAVE: { kind: 'statement', text: 'Damián declara que sabía que la llave del armero estaba en el cajón de la cocina.', person: 'damian', source: 'declaración', tags: ['llave', 'arma'] },
    S4_DAMIAN_BOTAS: { kind: 'statement', text: 'Damián declara que conserva las botas de la empresa, talla 43.', person: 'damian', source: 'declaración', tags: ['calzado'] },
    S4_JULIO_VALENCIA: { kind: 'statement', text: 'Julio declara que estuvo en Valencia hablando por teléfono con su hermano casi hasta las tres.', time: '22:00', end: '03:00', person: 'julio', place: 'valencia', source: 'declaración', tags: ['coartada'] },
    S4_TERESA: { kind: 'statement', text: 'Teresa declara que estuvo en Valencia con su familia.', time: '22:00', end: '08:00', person: 'teresa', place: 'valencia', source: 'declaración', tags: ['coartada'] },
    S4_TERESA_MADRE: { kind: 'statement', text: 'Teresa declara que su madre le dijo a las 22:15 que Vicente estaba muy tenso por lo del lunes y que había discutido por teléfono con alguien.', time: '22:15', person: 'teresa', source: 'declaración', tags: ['llamada', 'cita'] },
    S4_ROSARIO_DISPAROS: { kind: 'statement', text: 'Rosario oyó cinco disparos seguidos hacia las 02:40, en menos de dos minutos.', time: '02:40', end: '02:42', person: 'rosario', place: 'masia', source: 'testigo', tags: ['testigo', 'disparos'] },
    S4_ROSARIO_PERRO: { kind: 'statement', text: 'Rosario afirma que el perro de los Ballester no ladró en toda la noche, y que ladra a cualquiera que no conozca.', person: 'rosario', source: 'testigo', tags: ['testigo', 'perro'] },
    S4_ROSARIO_LUCES: { kind: 'statement', text: 'Rosario vio apagarse las luces de la masía hacia las 00:30, salvo la del porche.', time: '00:30', person: 'rosario', place: 'masia', source: 'testigo', tags: ['testigo'] }
  },

  /* Contradicciones comunes a todas las versiones (pistas falsas incluidas). */
  conflicts: [
    { id: 'C01', a: 'S4_DAMIAN_NOAMENAZA', b: 'F4_BAR_AMENAZA', type: 'Hecho distinto', severity: 'media', desc: 'Damián niega haber amenazado a Vicente; una grabación del 24/10 le muestra gritándole «Os vais a acordar de esto».' },
    { id: 'C02', a: 'S4_MARC_COMB', b: 'S4_CARLA_COMB', type: 'Hecho distinto', severity: 'media', desc: 'Marc niega conocer la combinación de la caja; Carla afirma que se la dio.' },
    { id: 'C03', a: 'S4_CARLA_VIO', b: 'S4_ROSARIO_PERRO', type: 'Hecho distinto', severity: 'media', desc: 'Carla describe intrusos encapuchados; la vecina afirma que el perro, que ladra a cualquier desconocido, no ladró.' }
  ],

  verdictOptions: {
    culpritLabel: 'Autoría',
    culprits: [
      { id: 'carla', label: 'Carla Ballester Roig' }, { id: 'ernesto', label: 'Ernesto Ballester Gil' }, { id: 'marc', label: 'Marc Sanz Ortiz' },
      { id: 'damian', label: 'Damián Ortells Mas' }, { id: 'julio', label: 'Julio Cantó Vera' }, { id: 'teresa', label: 'Teresa Ballester Roig' },
      { id: 'rosario', label: 'Rosario Llop Bel' }, { id: 'desconocido', label: 'Intrusos desconocidos' },
      { id: 'insuficiente', label: 'Evidencia insuficiente para una atribución concluyente' }
    ],
    motives: [
      { id: 'm4_testamento', label: 'Evitar quedar desheredada y asegurar la herencia' },
      { id: 'm4_finca', label: 'Impedir la venta de la finca y que se descubriera un desfalco' },
      { id: 'm4_dinero', label: 'Robar el dinero de la caja fuerte para pagar deudas' },
      { id: 'm4_deuda_nico', label: 'Cobrar la deuda de Nicolás' },
      { id: 'm4_venganza', label: 'Venganza por el despido' },
      { id: 'm4_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me4_autolesion', label: 'Escopeta de la casa; la superviviente simula el ataque de intrusos y se autolesiona' },
      { id: 'me4_intruso_doc', label: 'Escopeta de la casa; el autor entra por la ventana, golpea a la superviviente y se lleva documentos' },
      { id: 'me4_intruso_dinero', label: 'Escopeta de la casa; el autor entra por la ventana, golpea a la superviviente y se lleva el dinero de la caja' },
      { id: 'me4_externa', label: 'Arma traída de fuera por un grupo de desconocidos' },
      { id: 'me4_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento de los disparos',
    windows: [
      { id: 'w4_0240', label: 'Entre las 02:35 y las 02:45' },
      { id: 'w4_antes', label: 'Antes de la 01:30' },
      { id: 'w4_0300', label: 'Entre las 03:00 y las 03:12' },
      { id: 'w4_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F4_CRISTALES', 'F4_PERRO', 'F4_HUELLAS_BARRO', 'F4_ESCALERA_SANGRE'], label: 'cristales, perro, barro del porche y pie de la escalera' },
    movement: { ids: ['D4_GPS', 'D4_BAR', 'D4_BATIDA'], label: 'GPS de la flota, bar y batida' },
    usefulLab: ['E4_04:comparativa', 'E4_05:comparativa', 'E4_14:huellas', 'E4_01:autopsia']
  },

  trialIntro: {},
  trial: {},

  /* ================= VERSIONES ================= */
  variants: {
    /* ---------- Versión A: la superviviente ---------- */
    carla: {
      facts: {
        F4_LUMINOL_CASA: { text: 'Luminol: rastro de gotas limpiadas desde el salón hasta el baño, y reacción en el lavabo y en una toalla húmeda: alguien se lavó sangre antes de la llamada.', place: 'masia', source: 'laboratorio', tags: ['sangre'] },
        F4_POLVO_ARMERO: { text: 'Polvo revelador: huellas de Carla en la puerta del armero y en la llave. Vive en la casa: su valor es limitado.', source: 'laboratorio', tags: ['arma', 'huella'] },
        F4_UV_CAJA: { text: 'Luz UV: residuo graso en cuatro teclas del teclado de la caja, compatible con un uso reciente con la mano desnuda.', source: 'laboratorio', tags: ['caja'] },
        F4_CRISTALES: { text: 'La mayoría de los cristales de la ventana de la cocina están fuera, en el patio. Dentro, sobre la encimera, apenas hay fragmentos.', place: 'masia', source: 'escena', tags: ['ventana', 'acceso'] },
        F4_FRACTURA: { text: 'El patrón de fractura del vidrio indica que el golpe se dio desde el interior de la cocina.', source: 'laboratorio', tags: ['ventana', 'acceso'] },
        F4_HUELLAS_BARRO: { text: 'En el barro del porche y bajo la ventana solo hay pisadas de calzado de la casa: zapatillas de estar por casa y las botas de Vicente.', place: 'masia', source: 'escena', tags: ['calzado', 'acceso'] },
        F4_CALZADO: { text: 'Comparativa de calzado: todas las pisadas corresponden a calzado de la familia. No hay huellas de calzado ajeno.', source: 'laboratorio', tags: ['calzado'] },
        F4_CAJA: { text: 'La caja fuerte está abierta con la combinación, sin forzar. Las joyas siguen dentro; según la libreta de Vicente faltan unos 3.000 € en efectivo.', place: 'masia', source: 'escena', tags: ['caja', 'dinero', 'robo'] },
        F4_DOC_LUNES: { text: 'En el escritorio, un borrador de testamento con la nota «lunes, notaría»: Vicente reduce la parte de Carla a la legítima y le descuenta los 30.000 € prestados.', person: 'carla', source: 'documento', tags: ['testamento', 'herencia', 'documento'] },
        F4_CANDELABRO: { text: 'En el candelabro hay sangre de Carla y solo huellas de Carla.', person: 'carla', source: 'laboratorio', tags: ['huella', 'golpe'] },
        F4_CAMINO: { text: 'En el camino de acceso solo hay rodadas del coche de Carla y del vehículo de la Guardia Civil.', place: 'masia', source: 'escena', tags: ['vehiculo'] },
        F4_DEPOSITO: { text: 'Dentro del depósito de agua del huerto aparece la escopeta de Vicente, envuelta en una toalla de baño de la casa.', place: 'masia', source: 'escena', tags: ['arma'] },
        F4_HERIDA_CARLA: { text: 'Informe médico de Carla: herida contusa superficial en la frente, sin fractura. Zona accesible a la propia mano; no se aprecian lesiones de defensa. Pérdida de conciencia poco probable.', person: 'carla', source: 'informe forense', tags: ['golpe'] },
        F4_GSR: { text: 'Prueba de residuos de disparo (04:30): partículas características en la mano derecha y en la manga del pijama de Carla. Los residuos también pueden transferirse al tocar un arma disparada.', person: 'carla', source: 'laboratorio', tags: ['arma', 'residuos'] },
        F4_TEL_CARLA_ACT: { text: 'Teléfono de Carla: desbloqueado a las 02:51; a las 02:58 se borra la conversación con Marc. Después, nada hasta la llamada al 112.', time: '02:51', end: '02:58', person: 'carla', place: 'masia', source: 'dispositivo', tags: ['telefono', 'mensaje'] },
        F4_GPS_TT: { text: 'GPS del todoterreno asignado a Ernesto: aparcado en su casa del pueblo de 21:50 a 07:40.', time: '21:50', end: '07:40', person: 'ernesto', place: 'pueblo', source: 'registro', tags: ['vehiculo', 'ubicacion'] },
        F4_FIN_EMPRESA: { text: 'Cuentas de Cítricos Ballester: en orden, sin movimientos extraordinarios en noviembre.', source: 'documento', tags: ['dinero', 'empresa'] },
        F4_BATIDA: { text: 'La batida en un radio de 2 km no encuentra el arma fuera de la finca.', source: 'informe policial', tags: ['arma'] },
        F4_ANT_ERNESTO: { text: 'Teléfono de Ernesto: antena del pueblo toda la noche, sin actividad entre las 23:30 y las 07:15.', time: '22:00', end: '07:15', person: 'ernesto', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F4_ANT_MARC: { text: 'Teléfono de Marc: Castellón toda la noche; uso de datos continuo hasta la 01:30.', time: '22:00', end: '04:00', person: 'marc', place: 'castellon', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S4_ROSARIO_MOTOR: { kind: 'statement', text: 'Rosario declara que no oyó ningún vehículo en toda la noche.', person: 'rosario', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S4_CARLA_LUNES: { kind: 'statement', text: 'Carla dice no saber qué iba a hacer su padre en la notaría: «cosas de la empresa».', person: 'carla', source: 'declaración', tags: ['cita'] },
        S4_CARLA_GSR: { kind: 'statement', text: 'Carla dice que al despertar quizá cogió la escopeta del suelo, pero que no lo recuerda bien.', person: 'carla', source: 'declaración', tags: ['arma', 'residuos'] }
      },
      evidence: {
        E4_14: { forensic: { luminol: { reveals: ['F4_LUMINOL_CASA'] } } },
        E4_08: { forensic: { polvo: { reveals: ['F4_POLVO_ARMERO'] } } },
        E4_04: { detail: 'Cristal roto. Casi todos los fragmentos están en el patio; en la encimera apenas hay unos pocos.' },
        E4_05: { detail: 'Pisadas de calzado de casa y de unas botas grandes, que salen del porche hacia el huerto y vuelven.' },
        E4_06: { detail: 'Abierta, sin forzar. Joyas dentro; no hay efectivo.', forensic: { uv: { reveals: ['F4_UV_CAJA'] } } },
        E4_07: { detail: 'Agenda abierta y un borrador de testamento con anotaciones a mano.' },
        E4_12: { detail: 'Rodadas de un utilitario y del coche patrulla.' },
        E4_15: { detail: 'Bajo la tapa, algo envuelto en una toalla de baño, hundido en el agua.' }
      },
      answers: {
        carla: {
          noche: { type: 'mentira' }, vio: { type: 'mentira' },
          lunes: { a: 'No lo sé. Cosas de la empresa, supongo.', type: 'mentira' }
        },
        rosario: { motor: { a: 'Ninguno en toda la noche. Esto es muy tranquilo: si pasa un coche por el camino, lo oigo.' } }
      },
      confront: {
        carla: {
          F4_GSR: { a: 'Al despertar… creo que cogí la escopeta del suelo. No me acuerdo bien. Estaba en shock.', reveals: ['S4_CARLA_GSR'] },
          F4_HERIDA_CARLA: { a: 'Caería de frente al desmayarme. No lo sé.', reveals: [] },
          F4_TEL_CARLA_ACT: { a: 'No recuerdo haber cogido el teléfono antes de llamar.', reveals: [] },
          F4_CRISTALES: { a: 'No sé cómo rompieron la ventana. Yo estaba arriba.', reveals: [] },
          F4_DOC_LUNES: { a: '(Se queda en silencio un largo rato.) No sabía que mi padre fuera a hacer eso.', reveals: [] },
          F4_DEPOSITO: { a: 'No tengo ni idea de cómo llegó eso ahí.', reveals: [] },
          F4_CANDELABRO: { a: 'Sería al caer, al agarrarme a algo.', reveals: [] }
        },
        ernesto: {
          F4_GPS_TT: { a: '¿Lo ve? El todoterreno no se movió del pueblo.', reveals: [] },
          F4_DOC_LUNES: { a: 'Si Vicente cambiaba su testamento, era asunto suyo.', reveals: [] }
        },
        marc: { F4_ANT_MARC: { a: 'Castellón. Ya se lo he dicho.', reveals: [] } }
      },
      conflicts: [
        { id: 'CA1', a: 'S4_CARLA_NOCHE', b: 'F4_HERIDA_CARLA', type: 'Hecho distinto', severity: 'alta', desc: 'Carla dice que la golpearon por detrás y quedó inconsciente; el informe médico describe una herida superficial en la frente, accesible a la propia mano.' },
        { id: 'CA2', a: 'S4_CARLA_NOCHE', b: 'F4_CRISTALES', type: 'Secuencia incompatible', severity: 'alta', desc: 'Carla habla de un ruido de cristales de alguien que entraba; casi todos los cristales cayeron hacia fuera, al patio.' },
        { id: 'CA3', a: 'S4_CARLA_NOCHE', b: 'F4_TEL_CARLA_ACT', type: 'Secuencia incompatible', severity: 'alta', desc: 'Carla dice que estuvo inconsciente hasta poco antes de llamar; su teléfono se desbloquea a las 02:51 y borra una conversación a las 02:58.' },
        { id: 'CA4', a: 'S4_CARLA_VIO', b: 'F4_HUELLAS_BARRO', type: 'Hecho distinto', severity: 'alta', desc: 'Carla describe dos o tres intrusos; en el barro bajo la ventana solo hay calzado de la familia.' },
        { id: 'CA5', a: 'S4_CARLA_DISPARO', b: 'F4_GSR', type: 'Hecho distinto', severity: 'media', desc: 'Carla dice que no dispara desde niña; la prueba encuentra residuos de disparo en su mano y su manga.' }
      ],
      truth: {
        culprit: 'carla', motive: 'm4_testamento', method: 'me4_autolesion', window: 'w4_0240', accomplices: [],
        partialMethods: {
          me4_intruso_dinero: 'Viste que hubo un montaje de robo, pero no quién lo hizo ni la autolesión.',
          me4_intruso_doc: 'Viste que hubo un montaje de robo, pero no quién lo hizo ni la autolesión.'
        },
        decisive: ['F4_HERIDA_CARLA', 'F4_GSR', 'F4_CRISTALES', 'F4_FRACTURA', 'F4_TEL_CARLA_ACT', 'F4_HUELLAS_BARRO', 'F4_CALZADO', 'F4_DEPOSITO', 'F4_DOC_LUNES', 'S4_ROSARIO_PERRO', 'S4_ROSARIO_MOTOR', 'F4_CANDELABRO', 'F4_CAMINO', 'F4_LUMINOL_CASA'],
        weak: ['F4_BAR_AMENAZA', 'F4_MSG_JULIO', 'F4_FIN_MARC', 'S4_CARLA_COMB', 'F4_EPIS', 'F4_FIN_NICOLAS', 'S4_MARC_COMB', 'F4_TEL_CARLA_MARC'],
        keyConflicts: ['CA1', 'CA2', 'CA3', 'CA4'],
        narrative: [
          'Carla Ballester mató a sus padres y a su hermano. Arruinada por el cierre de su tienda y con 41.000 € de deudas, descubrió que el lunes su padre iba a cambiar el testamento para dejarla en la legítima y descontarle los 30.000 € que le había prestado.',
          'Hacia las 02:38 cogió la llave del cajón de la cocina y la escopeta del armero. Disparó a su padre, que había bajado al salón con una linterna, a su madre en la cama y a su hermano cuando salía de su dormitorio. Rosario oyó los cinco disparos que mataron a los tres; las dos vainas restantes son de disparos al suelo y la pared para el montaje.',
          'Después montó un robo: rompió la ventana de la cocina desde dentro (los cristales cayeron al patio), abrió la caja con la combinación y se llevó 3.000 €, salió por el porche con las botas de su padre para esconder la escopeta envuelta en una toalla en el depósito del huerto y volvió.',
          'A las 02:51 desbloqueó el teléfono y a las 02:58 borró la conversación con Marc, en la que se había desahogado sobre el testamento. Se golpeó la frente con el candelabro y esperó. A las 03:12 llamó al 112 y habló de dos o tres encapuchados.',
          'El perro no ladró porque no entró nadie de fuera, y Rosario no oyó ningún vehículo. Marc mintió sobre la combinación por miedo a parecer sospechoso; Damián mintió sobre la amenaza del bar; Julio amenazó a Nicolás por la deuda, pero estaba en Valencia.'
        ]
      },
      trial: {
        carla: [
          { id: 'O1', text: 'Mi clienta fue atacada: tiene una herida en la cabeza y la ventana estaba rota.', accept: ['F4_HERIDA_CARLA', 'F4_FRACTURA', 'F4_CRISTALES', 'F4_CALZADO', 'F4_HUELLAS_BARRO'] },
          { id: 'O2', text: 'Los residuos de pólvora se explican porque cogió el arma del suelo al despertar.', accept: ['F4_DEPOSITO', 'F4_TEL_CARLA_ACT', 'F4_LUMINOL_CASA'] },
          { id: 'O3', text: 'Mi clienta no tenía ningún motivo para matar a su familia.', accept: ['F4_DOC_LUNES', 'F4_FIN_CARLA'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada dentro de la masía esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica por qué los cristales cayeron hacia fuera ni quién escondió el arma en el depósito.', accept: [] },
          { id: 'O3', text: 'La acusación no explica la actividad del teléfono de la superviviente a las 02:51.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['carla', 'marc'],
        spatialBonus: ['F4_DEPOSITO', 'F4_CAMINO'],
        temporalConflicts: ['CA3'],
        lateral: [
          { type: 'fact', id: 'S4_ROSARIO_PERRO', pts: 20, yes: 'Preguntaste por el perro: un detalle doméstico con mucho valor.', no: 'No preguntaste por la reacción del perro.' },
          { type: 'conflict', id: 'CA2', pts: 30, yes: 'Viste que la ventana se rompió desde dentro.', no: 'No contrastaste la ventana rota con el relato de la superviviente.' },
          { type: 'conflict', id: 'CA3', pts: 25 },
          { type: 'chosen', id: 'F4_DEPOSITO', pts: 25 }
        ]
      }
    },

    /* ---------- Versión B: el hermano ---------- */
    ernesto: {
      facts: {
        F4_LUMINOL_CASA: { text: 'Luminol: la reacción se limita a la zona de la herida de Carla y a un rastro de gotas que va del pasillo a la ventana de la cocina.', place: 'masia', source: 'laboratorio', tags: ['sangre'] },
        F4_POLVO_ARMERO: { text: 'Polvo revelador: marcas de guante de cuero de trabajo en la puerta del armero y en la llave; ninguna huella dactilar reciente.', source: 'laboratorio', tags: ['arma', 'huella'] },
        F4_UV_CAJA: { text: 'Luz UV: ningún residuo en el teclado de la caja: no se ha tocado recientemente.', source: 'laboratorio', tags: ['caja'] },
        F4_CRISTALES: { text: 'Los cristales de la ventana de la cocina están dentro, sobre la encimera y el suelo. En el alféizar exterior hay barro.', place: 'masia', source: 'escena', tags: ['ventana', 'acceso'] },
        F4_FRACTURA: { text: 'El patrón de fractura del vidrio indica un golpe desde el exterior con un objeto romo.', source: 'laboratorio', tags: ['ventana', 'acceso'] },
        F4_HUELLAS_BARRO: { text: 'En el barro del porche, además del calzado de la familia, hay pisadas de una bota de suela de seguridad que van y vuelven de la ventana de la cocina.', place: 'masia', source: 'escena', tags: ['calzado', 'acceso'] },
        F4_CALZADO: { text: 'Comparativa de calzado: bota de seguridad de la talla 43, de un modelo industrial muy extendido.', source: 'laboratorio', tags: ['calzado'] },
        F4_CAJA: { text: 'La caja fuerte está cerrada e intacta. En el escritorio falta la carpeta azul que, según el índice que queda, contenía «Compraventa El Pla» y «Auditoría proveedores».', place: 'masia', source: 'escena', tags: ['caja', 'documento', 'robo'] },
        F4_DOC_LUNES: { text: 'En el escritorio, la copia de un burofax de Ernesto (5/11) oponiéndose a la venta de El Pla, y una nota: «lunes: firma de la venta con la cooperativa».', person: 'ernesto', source: 'documento', tags: ['finca', 'documento'] },
        F4_CANDELABRO: { text: 'En el candelabro hay sangre de Carla; la base se ha limpiado y no hay huellas aprovechables.', source: 'laboratorio', tags: ['huella', 'golpe'] },
        F4_CAMINO: { text: 'A 400 m, en el cruce del camino, rodadas de neumático ancho de todoterreno y una mancha de aceite reciente.', place: 'cruce', source: 'escena', tags: ['vehiculo'] },
        F4_DEPOSITO: { text: 'El depósito de agua del huerto contiene agua limpia. Nada anómalo.', place: 'masia', source: 'escena', tags: ['arma'] },
        F4_HERIDA_CARLA: { text: 'Informe médico de Carla: herida contusa occipital con una pequeña fractura, por golpe desde atrás con un objeto romo. No compatible con autolesión. Pérdida de conciencia probable.', person: 'carla', source: 'informe forense', tags: ['golpe'] },
        F4_GSR: { text: 'Prueba de residuos de disparo (04:30): sin partículas características en las manos ni en la ropa de Carla.', person: 'carla', source: 'laboratorio', tags: ['arma', 'residuos'] },
        F4_TEL_CARLA_ACT: { text: 'Teléfono de Carla: sin actividad entre las 00:40 y la llamada al 112 de las 03:12.', time: '00:40', end: '03:12', person: 'carla', place: 'masia', source: 'dispositivo', tags: ['telefono'] },
        F4_GPS_TT: { text: 'GPS del todoterreno asignado a Ernesto: sale del pueblo a las 02:14; está parado de 02:21 a 02:59 en el cruce del camino de la masía, a 400 m; vuelve al pueblo a las 03:06.', time: '02:21', end: '02:59', person: 'ernesto', place: 'cruce', source: 'registro', tags: ['vehiculo', 'ubicacion'] },
        F4_FIN_EMPRESA: { text: 'Auditoría interna encargada por Vicente el 2/11: 64.000 € pagados a proveedores inexistentes con autorización de Ernesto.', person: 'ernesto', source: 'documento', tags: ['dinero', 'empresa'] },
        F4_BATIDA: { text: 'La batida encuentra la escopeta de Vicente en la acequia que va hacia el pueblo, a 900 m de la masía.', place: 'acequia', source: 'informe policial', tags: ['arma'] },
        F4_ANT_ERNESTO: { text: 'Teléfono de Ernesto: antena del pueblo hasta las 02:15; antena de la carretera, que cubre la masía, de 02:19 a 03:02; de nuevo el pueblo desde las 03:08.', time: '02:19', end: '03:02', person: 'ernesto', place: 'masia', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F4_ANT_MARC: { text: 'Teléfono de Marc: Castellón toda la noche; uso de datos continuo hasta la 01:30.', time: '22:00', end: '04:00', person: 'marc', place: 'castellon', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S4_ROSARIO_MOTOR: { kind: 'statement', text: 'Rosario oyó, antes de los disparos, un motor diésel grande que paró en el camino, y después lo oyó alejarse.', person: 'rosario', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S4_CARLA_LUNES: { kind: 'statement', text: 'Carla dice que su padre iba a firmar el lunes la venta de El Pla y que su tío Ernesto estaba furioso.', person: 'carla', source: 'declaración', tags: ['cita', 'finca'] },
        S4_ERNESTO_GPS: { kind: 'statement', text: 'Ernesto admite que fue en el todoterreno hacia la masía para hablar con Vicente, que vio las luces apagadas y que se volvió enseguida sin entrar.', time: '02:14', end: '02:25', person: 'ernesto', place: 'cruce', source: 'declaración', tags: ['coartada', 'vehiculo'] }
      },
      evidence: {
        E4_14: { forensic: { luminol: { reveals: ['F4_LUMINOL_CASA'] } } },
        E4_08: { forensic: { polvo: { reveals: ['F4_POLVO_ARMERO'] } } },
        E4_04: { detail: 'Cristal roto. Los fragmentos están dentro, sobre la encimera y el suelo; hay barro en el alféizar exterior.' },
        E4_05: { detail: 'Pisadas de calzado de casa y de una bota de suela gruesa que llegan hasta la ventana de la cocina y vuelven.' },
        E4_06: { detail: 'Cerrada e intacta. Sobre el escritorio cercano hay un índice de carpetas suelto.', forensic: { uv: { reveals: ['F4_UV_CAJA'] } } },
        E4_07: { detail: 'Agenda abierta, un índice de carpetas y la copia de un burofax.' },
        E4_12: { detail: 'Rodadas de un utilitario y del coche patrulla; más lejos, en el cruce, otras más anchas.' },
        E4_15: { detail: 'Agua limpia bajo la tapa.' }
      },
      answers: {
        ernesto: { noche: { type: 'mentira' }, finca: { type: 'mentira' } },
        carla: { lunes: { a: 'Iba a firmar la venta de El Pla con la cooperativa. Mi tío Ernesto estaba furioso; le mandó un burofax.' } },
        rosario: { motor: { a: 'Sí. Antes de los disparos, un motor gordo, diésel, como de todoterreno, que paró por el camino. Y después de los disparos, otra vez, alejándose.' } }
      },
      confront: {
        ernesto: {
          F4_GPS_TT: { a: '(Tarda en contestar.) Fui a hablar con Vicente esa noche. Vi las luces apagadas y me volví sin entrar. No lo dije porque sabía cómo sonaba.', reveals: ['S4_ERNESTO_GPS'] },
          F4_ANT_ERNESTO: { a: 'Fui hacia la masía a hablar con él, pero no entré. Me volví enseguida.', reveals: ['S4_ERNESTO_GPS'] },
          F4_FIN_EMPRESA: { a: 'Son errores contables. No le he robado nada a mi hermano.', reveals: [] },
          F4_DOC_LUNES: { a: 'El burofax es legal. Quería frenar una venta que nos arruinaba.', reveals: [] },
          F4_BATIDA: { a: 'Esa acequia cruza media comarca.', reveals: [] },
          F4_CALZADO: { a: 'Un 43 lo calza media plantilla. Pregunte a Damián.', reveals: [] }
        },
        carla: {
          F4_GSR: { a: 'Yo no toqué ningún arma.', reveals: [] },
          F4_HERIDA_CARLA: { a: 'Me golpearon por detrás. Ya se lo dije.', reveals: [] },
          F4_CRISTALES: { a: 'Entraron por ahí. Lo oí.', reveals: [] },
          F4_DOC_LUNES: { a: '¿Lo ve? La venta. Mi tío no quería.', reveals: [] }
        },
        marc: { F4_ANT_MARC: { a: 'Castellón. Ya se lo he dicho.', reveals: [] } }
      },
      conflicts: [
        { id: 'CB1', a: 'S4_ERNESTO_CASA', b: 'F4_GPS_TT', type: 'Lugar distinto', severity: 'alta', desc: 'Ernesto dice que no salió de su casa; el GPS sitúa el todoterreno parado de 02:21 a 02:59 en el cruce del camino de la masía.' },
        { id: 'CB2', a: 'S4_ERNESTO_CASA', b: 'F4_ANT_ERNESTO', type: 'Lugar distinto', severity: 'alta', desc: 'Ernesto dice que no salió de su casa; su teléfono conecta con la antena que cubre la masía de 02:19 a 03:02.' },
        { id: 'CB3', a: 'S4_ERNESTO_GPS', b: 'F4_GPS_TT', type: 'Duración distinta', severity: 'alta', desc: 'Ernesto dice que se volvió enseguida; el todoterreno estuvo parado 38 minutos en el cruce, durante los disparos.' },
        { id: 'CB4', a: 'S4_ERNESTO_FINCA', b: 'F4_DOC_LUNES', type: 'Hecho distinto', severity: 'media', desc: 'Ernesto dice que la venta se hablaba "sin prisas"; la firma estaba fijada para el lunes y él había enviado un burofax oponiéndose.' }
      ],
      truth: {
        culprit: 'ernesto', motive: 'm4_finca', method: 'me4_intruso_doc', window: 'w4_0240', accomplices: [],
        partialMethods: { me4_intruso_dinero: 'Viste la entrada desde fuera y el golpe a la superviviente, pero no lo que se llevó el autor.' },
        decisive: ['F4_GPS_TT', 'F4_ANT_ERNESTO', 'F4_FIN_EMPRESA', 'F4_DOC_LUNES', 'F4_CAJA', 'F4_BATIDA', 'F4_CAMINO', 'S4_ROSARIO_MOTOR', 'F4_HUELLAS_BARRO', 'F4_HERIDA_CARLA', 'F4_GSR', 'S4_ROSARIO_PERRO', 'F4_FRACTURA', 'F4_POLVO_ARMERO'],
        weak: ['F4_BAR_AMENAZA', 'F4_MSG_JULIO', 'F4_FIN_CARLA', 'F4_FIN_MARC', 'S4_CARLA_COMB', 'S4_MARC_COMB', 'F4_EPIS', 'F4_TEL_CARLA_MARC'],
        keyConflicts: ['CB1', 'CB2', 'CB3', 'CB4'],
        narrative: [
          'Ernesto Ballester mató a su hermano, a su cuñada y a su sobrino. Vicente había descubierto con una auditoría interna que Ernesto había desviado 64.000 € a proveedores inexistentes, y el lunes iba a firmar la venta de El Pla, la finca que compartían. Ernesto le había mandado un burofax para frenarla; Amparo le contó a Teresa que Vicente había discutido por teléfono con alguien esa noche.',
          'A las 02:14 Ernesto salió del pueblo con el todoterreno de la empresa y lo dejó en el cruce del camino, a 400 m, para que no se oyera llegar (Rosario oyó el motor). Fue andando, con sus botas de trabajo del 43, rompió la ventana de la cocina desde fuera y entró. Conocía la casa: cogió la llave del cajón y la escopeta del armero con guantes de trabajo. El perro no ladró: le conocía desde cachorro.',
          'Vicente bajó al salón con una linterna y Ernesto le disparó. Después mató a Amparo en la cama y a Nicolás en el pasillo. Carla bajó por la escalera y Ernesto la golpeó por detrás con el candelabro; ella no llegó a verle la cara, y en su confusión creyó ver a varias personas.',
          'Se llevó la carpeta azul con la auditoría y el contrato de compraventa, limpió el candelabro y volvió al todoterreno. De camino al pueblo tiró la escopeta a la acequia, a 900 m. A las 03:06 estaba en casa. Las dos vainas que no corresponden a heridas son de disparos que fallaron en el pasillo; Rosario, a 600 m, solo distinguió cinco. Ante el GPS, admitió que había ido "a hablar" y que se volvió sin entrar, pero el coche estuvo parado 38 minutos.',
          'Damián, con las mismas botas de la empresa y una amenaza grabada, era el sospechoso perfecto, pero se fue a su casa a la 01:28. Julio estaba en Valencia. Marc mintió sobre la combinación por miedo, sin relación con el crimen.'
        ]
      },
      trial: {
        ernesto: [
          { id: 'O1', text: 'Mi cliente estaba en su casa del pueblo esa noche.', accept: ['F4_GPS_TT', 'F4_ANT_ERNESTO', 'S4_ROSARIO_MOTOR', 'F4_CAMINO'] },
          { id: 'O2', text: 'Las botas del 43 las tiene media plantilla, incluido un encargado despedido que amenazó a la víctima.', accept: ['F4_GPS_TT', 'F4_BATIDA', 'F4_ANT_ERNESTO', 'F4_BAR_DAMIAN'] },
          { id: 'O3', text: 'No había ningún móvil: la venta de la finca se iba a hablar entre hermanos.', accept: ['F4_DOC_LUNES', 'F4_FIN_EMPRESA', 'F4_CAJA'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en la masía esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica qué vehículo estuvo parado 38 minutos en el cruce del camino.', accept: [] },
          { id: 'O3', text: 'La acusación no explica la desaparición de la carpeta de la auditoría.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['ernesto'],
        spatialBonus: ['F4_GPS_TT', 'F4_BATIDA', 'F4_CAMINO'],
        temporalConflicts: ['CB1', 'CB3'],
        lateral: [
          { type: 'fact', id: 'S4_ROSARIO_PERRO', pts: 20, yes: 'Preguntaste por el perro: un detalle doméstico con mucho valor.', no: 'No preguntaste por la reacción del perro.' },
          { type: 'conflict', id: 'CB3', pts: 30, yes: 'Mediste la duración real de la parada frente a la versión del sospechoso.', no: 'No contrastaste la duración de la parada del todoterreno con la versión del sospechoso.' },
          { type: 'conflict', id: 'CB4', pts: 25 },
          { type: 'chosen', id: 'F4_FIN_EMPRESA', pts: 25 }
        ]
      }
    },

    /* ---------- Versión C: la pareja ---------- */
    marc: {
      facts: {
        F4_LUMINOL_CASA: { text: 'Luminol: la reacción se limita a la zona de la herida de Carla y a un rastro de gotas que va del pasillo a la ventana de la cocina.', place: 'masia', source: 'laboratorio', tags: ['sangre'] },
        F4_POLVO_ARMERO: { text: 'Polvo revelador: la puerta del armero y la llave se han limpiado; no quedan huellas recientes.', source: 'laboratorio', tags: ['arma', 'huella'] },
        F4_UV_CAJA: { text: 'Luz UV: restos de polvo blanco de magnesio, el que se usa en los gimnasios, en cuatro teclas del teclado de la caja.', source: 'laboratorio', tags: ['caja'] },
        F4_CRISTALES: { text: 'Los cristales de la ventana de la cocina están dentro, sobre la encimera y el suelo. En el alféizar exterior hay barro con la marca de una suela de dibujo deportivo.', place: 'masia', source: 'escena', tags: ['ventana', 'acceso'] },
        F4_FRACTURA: { text: 'El patrón de fractura del vidrio indica un golpe desde el exterior con un objeto romo.', source: 'laboratorio', tags: ['ventana', 'acceso'] },
        F4_HUELLAS_BARRO: { text: 'En el barro del porche, además del calzado de la familia, hay pisadas de una zapatilla deportiva que van y vuelven de la ventana de la cocina.', place: 'masia', source: 'escena', tags: ['calzado', 'acceso'] },
        F4_CALZADO: { text: 'Comparativa de calzado: zapatilla de running de la talla 44, de un modelo de gran distribución.', source: 'laboratorio', tags: ['calzado'] },
        F4_CAJA: { text: 'La caja fuerte está abierta con la combinación, sin forzar. Las joyas siguen dentro; no queda efectivo. Según el recibo del banco, el viernes Vicente guardó 18.000 €.', place: 'masia', source: 'escena', tags: ['caja', 'dinero', 'robo'] },
        F4_DOC_LUNES: { text: 'En el escritorio, el recibo de una retirada de 18.000 € en efectivo (viernes 6/11) con la nota «pagar a la cuadrilla el lunes». La cita de la notaría es por la herencia de un primo.', source: 'documento', tags: ['dinero', 'documento'] },
        F4_CANDELABRO: { text: 'En el candelabro hay sangre de Carla; la base se ha limpiado y no hay huellas aprovechables.', source: 'laboratorio', tags: ['huella', 'golpe'] },
        F4_CAMINO: { text: 'A 300 m de la casa, junto al arcén del camino, la marca del caballete de una moto y una rodada estrecha en la tierra húmeda.', place: 'cruce', source: 'escena', tags: ['vehiculo', 'moto'] },
        F4_DEPOSITO: { text: 'El depósito de agua del huerto contiene agua limpia. Nada anómalo.', place: 'masia', source: 'escena', tags: ['arma'] },
        F4_HERIDA_CARLA: { text: 'Informe médico de Carla: herida contusa occipital con una pequeña fractura, por golpe desde atrás con un objeto romo. No compatible con autolesión. Pérdida de conciencia probable.', person: 'carla', source: 'informe forense', tags: ['golpe'] },
        F4_GSR: { text: 'Prueba de residuos de disparo (04:30): sin partículas características en las manos ni en la ropa de Carla.', person: 'carla', source: 'laboratorio', tags: ['arma', 'residuos'] },
        F4_TEL_CARLA_ACT: { text: 'Teléfono de Carla: sin actividad entre las 00:40 y la llamada al 112 de las 03:12.', time: '00:40', end: '03:12', person: 'carla', place: 'masia', source: 'dispositivo', tags: ['telefono'] },
        F4_GPS_TT: { text: 'GPS del todoterreno asignado a Ernesto: aparcado en su casa del pueblo de 21:50 a 07:40.', time: '21:50', end: '07:40', person: 'ernesto', place: 'pueblo', source: 'registro', tags: ['vehiculo', 'ubicacion'] },
        F4_FIN_EMPRESA: { text: 'Cuentas de la empresa en orden. El viernes 6/11 Vicente retiró 18.000 € en efectivo para pagar a la cuadrilla de recolección.', source: 'documento', tags: ['dinero', 'empresa'] },
        F4_BATIDA: { text: 'La batida no encuentra el arma en un radio de 2 km.', source: 'informe policial', tags: ['arma'] },
        F4_ANT_ERNESTO: { text: 'Teléfono de Ernesto: antena del pueblo toda la noche, sin actividad entre las 23:30 y las 07:15.', time: '22:00', end: '07:15', person: 'ernesto', place: 'pueblo', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F4_ANT_MARC: { text: 'Teléfono de Marc: Castellón hasta la 01:20; antena de la carretera de Vilallarga, que cubre la masía, de 02:05 a 03:02; de nuevo Castellón desde las 03:40.', time: '02:05', end: '03:02', person: 'marc', place: 'masia', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S4_ROSARIO_MOTOR: { kind: 'statement', text: 'Rosario oyó una moto alejarse por el camino hacia la carretera poco después de los disparos.', time: '02:45', person: 'rosario', source: 'testigo', tags: ['testigo', 'vehiculo', 'moto'] },
        S4_CARLA_LUNES: { kind: 'statement', text: 'Carla dice que el viernes su padre sacó dinero para pagar a la cuadrilla y lo guardó en la caja fuerte.', person: 'carla', source: 'declaración', tags: ['cita', 'dinero'] },
        S4_MARC_FUI: { kind: 'statement', text: 'Marc admite que fue a Vilallarga a ver a Carla a escondidas, pero dice que no entró y que volvió antes de la una.', time: '00:00', end: '01:00', person: 'marc', place: 'masia', source: 'declaración', tags: ['coartada', 'moto'] }
      },
      evidence: {
        E4_14: { forensic: { luminol: { reveals: ['F4_LUMINOL_CASA'] } } },
        E4_08: { forensic: { polvo: { reveals: ['F4_POLVO_ARMERO'] } } },
        E4_04: { detail: 'Cristal roto. Los fragmentos están dentro, sobre la encimera; en el barro del alféizar exterior se ve el dibujo de una suela.' },
        E4_05: { detail: 'Pisadas de calzado de casa y de una zapatilla deportiva que llegan hasta la ventana de la cocina y vuelven.' },
        E4_06: { detail: 'Abierta, sin forzar. Joyas dentro; ni un billete. En el escritorio hay un recibo bancario.', forensic: { uv: { reveals: ['F4_UV_CAJA'] } } },
        E4_07: { detail: 'Agenda abierta y un recibo bancario con una nota a mano.' },
        E4_12: { detail: 'Rodadas de un utilitario y del coche patrulla; más lejos, junto al arcén, una marca pequeña y profunda.' },
        E4_15: { detail: 'Agua limpia bajo la tapa.' }
      },
      answers: {
        marc: { noche: { type: 'mentira' } },
        carla: { lunes: { a: 'Creo que algo de una herencia de un primo. Y el viernes sacó dinero para pagar a la cuadrilla; lo guardó en la caja.' } },
        rosario: { motor: { a: 'Una moto. Poco después de los disparos, alejándose por el camino hacia la carretera. Las motos se oyen mucho de noche.' } }
      },
      confront: {
        marc: {
          F4_ANT_MARC: { a: 'Vale. Fui a Vilallarga a ver a Carla a escondidas de sus padres, pero no llegué a entrar. Me volví antes de la una.', reveals: ['S4_MARC_FUI'] },
          F4_CAMINO: { a: 'En el campo hay muchas motos.', reveals: [] },
          F4_CALZADO: { a: 'Esas zapatillas las venden en todas partes.', reveals: [] },
          F4_CAJA: { a: 'Yo no he tocado esa caja en mi vida.', reveals: [] },
          S4_ROSARIO_MOTOR: { a: 'Yo ya me había ido antes de la una.', reveals: [] }
        },
        carla: {
          F4_GSR: { a: 'Yo no toqué ningún arma.', reveals: [] },
          F4_HERIDA_CARLA: { a: 'Me golpearon por detrás. Ya se lo dije.', reveals: [] },
          F4_CRISTALES: { a: 'Entraron por ahí. Lo oí.', reveals: [] },
          F4_ANT_MARC: { a: '¿Marc estaba aquí esa noche? Me dijo que estaba en Castellón…', reveals: [] }
        },
        ernesto: { F4_GPS_TT: { a: '¿Lo ve? El todoterreno no se movió del pueblo.', reveals: [] } }
      },
      conflicts: [
        { id: 'CC1', a: 'S4_MARC_CASTELLON', b: 'F4_ANT_MARC', type: 'Lugar distinto', severity: 'alta', desc: 'Marc dice que estuvo en Castellón; su teléfono conecta con la antena que cubre la masía de 02:05 a 03:02.' },
        { id: 'CC2', a: 'S4_MARC_FUI', b: 'F4_ANT_MARC', type: 'Hora distinta', severity: 'alta', desc: 'Marc dice que se volvió antes de la una; su teléfono sigue en la zona de la masía hasta las 03:02.' },
        { id: 'CC3', a: 'S4_MARC_FUI', b: 'S4_ROSARIO_MOTOR', type: 'Hora distinta', severity: 'media', desc: 'Marc dice que se fue antes de la una; la vecina oyó una moto alejarse poco después de los disparos.' }
      ],
      truth: {
        culprit: 'marc', motive: 'm4_dinero', method: 'me4_intruso_dinero', window: 'w4_0240', accomplices: [],
        partialMethods: { me4_intruso_doc: 'Viste la entrada desde fuera y el golpe a la superviviente, pero no lo que se llevó el autor.' },
        decisive: ['F4_ANT_MARC', 'F4_CAJA', 'F4_FIN_EMPRESA', 'F4_DOC_LUNES', 'S4_CARLA_COMB', 'F4_CALZADO', 'F4_FIN_MARC', 'S4_MARC_TALLA', 'S4_ROSARIO_MOTOR', 'F4_CAMINO', 'F4_HERIDA_CARLA', 'F4_GSR', 'S4_ROSARIO_PERRO', 'F4_HUELLAS_BARRO', 'F4_UV_CAJA'],
        weak: ['F4_BAR_AMENAZA', 'F4_MSG_JULIO', 'F4_FIN_CARLA', 'F4_EPIS', 'F4_FIN_NICOLAS', 'F4_TEL_CARLA_MARC'],
        keyConflicts: ['CC1', 'CC2', 'C02'],
        narrative: [
          'Marc Sanz mató a la familia de su pareja para robar. Debía 12.000 € de apuestas en línea. Carla le había contado que su padre guardó el viernes 18.000 € en la caja fuerte para pagar a la cuadrilla, y meses atrás le había dado la combinación.',
          'Salió de Castellón en moto, la dejó a 300 m de la masía y siguió andando con sus zapatillas de running del 44. El perro le conocía y no ladró. Rompió la ventana de la cocina desde fuera, pensando que todos dormían, y abrió la caja con la combinación.',
          'Vicente le oyó y bajó con una linterna. Marc, que sabía por Carla dónde estaba la llave del armero, cogió la escopeta. Al ver a Vicente disparó, y luego mató a Amparo y a Nicolás para no dejar testigos. Carla bajó por la escalera y Marc la golpeó por detrás con el candelabro, con la capucha puesta; ella no lo reconoció.',
          'Se llevó los 18.000 € y la escopeta, limpió el candelabro y huyó en moto: Rosario la oyó alejarse poco después de los disparos. Su teléfono estuvo en la zona de la masía de 02:05 a 03:02. Dos de las siete vainas son de disparos que fallaron en el pasillo; desde 600 m, Rosario solo distinguió cinco. Ante las antenas, admitió que había ido "a ver a Carla" pero que se volvió antes de la una.',
          'Damián tenía una amenaza grabada y botas de la empresa, pero se fue a casa a la 01:28. Ernesto discutía por la finca, pero el GPS y su teléfono le sitúan en el pueblo. Julio estaba en Valencia.'
        ]
      },
      trial: {
        marc: [
          { id: 'O1', text: 'Mi cliente estaba en Castellón, a 28 km.', accept: ['F4_ANT_MARC', 'S4_ROSARIO_MOTOR', 'F4_CAMINO'] },
          { id: 'O2', text: 'Mi cliente no conocía la combinación de la caja fuerte.', accept: ['S4_CARLA_COMB', 'F4_CAJA', 'F4_UV_CAJA'] },
          { id: 'O3', text: 'No hay ninguna prueba física que relacione a mi cliente con la casa.', accept: ['F4_CALZADO', 'S4_MARC_TALLA', 'F4_FIN_MARC', 'F4_HUELLAS_BARRO'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna prueba sitúa a la persona acusada en la masía esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién abrió la caja con la combinación ni dónde están los 18.000 €.', accept: [] },
          { id: 'O3', text: 'La acusación no explica la moto que oyó la vecina después de los disparos.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['marc'],
        spatialBonus: ['F4_ANT_MARC', 'F4_CAMINO'],
        temporalConflicts: ['CC1', 'CC2'],
        lateral: [
          { type: 'fact', id: 'S4_ROSARIO_PERRO', pts: 20, yes: 'Preguntaste por el perro: un detalle doméstico con mucho valor.', no: 'No preguntaste por la reacción del perro.' },
          { type: 'conflict', id: 'C02', pts: 25, yes: 'Contrastaste quién conocía la combinación de la caja.', no: 'No contrastaste quién conocía la combinación de la caja.' },
          { type: 'conflict', id: 'CC2', pts: 30 },
          { type: 'chosen', id: 'F4_CALZADO', pts: 25 }
        ]
      }
    }
  }
});
