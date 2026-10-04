/* EXPEDIENTE 0 — Caso EXP-002 «La desaparición del puente».
 * Única fuente de verdad del caso. Estructura causal distinta a EXP-001:
 * no hay homicidio; la clave es distinguir un montaje de una caída o un crimen. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-002',
  title: 'La desaparición del puente',
  type: 'Desaparición',
  difficulty: 'Alta',
  minRank: 1,
  budget: 1000,
  location: 'Puente del Azud (acceso a Riba-roja) · Valencia',
  date: 'Noche del viernes 9 al sábado 10 de octubre de 2026',
  victim: {
    id: 'irene',
    name: 'Irene Soler Navarro',
    age: 34,
    job: 'Ingeniera de control de calidad en Construcciones Levante Mar (CLM)'
  },
  victimLabel: 'Desaparecida',
  deathWindow: 'Último contacto confirmado: mensaje de voz a las 23:52. Coche hallado a las 02:10.',
  briefing: [
    'A las 01:55 del sábado 10 de octubre, un camionero avisa al 112 de un coche parado con los warnings en el Puente del Azud. A las 02:10 una patrulla encuentra el Renault Clio de Irene Soler: puerta del conductor entreabierta, llaves puestas, bolso en el asiento. Nadie dentro.',
    'Junto a la barandilla hay una zapatilla. Durante el fin de semana se rastrea el río sin resultados. A las 01:30 su marido recibió un mensaje desde la cuenta de Irene: «Lo siento. No me busquéis. Es mejor así.»',
    'Irene iba a declarar el lunes como testigo en una investigación de la Fiscalía sobre su empresa. Esa noche discutió con su marido y salió de casa en coche a las diez y cuarto.',
    'Un caso de desaparición no siempre termina en un culpable. Puede ser un accidente, un crimen o algo que nadie ha contado. Tu trabajo es determinar qué es compatible con los datos.'
  ],
  initialFacts: ['F2_AVISO', 'F2_HALLAZGO', 'F2_BUSQUEDA', 'F2_MENSAJE'],
  sceneSummary: 'Coche abandonado en el arcén del Puente del Azud con los warnings encendidos, a 8 km del domicilio de la desaparecida.',

  mapScale: 0.6,
  places: {
    paterna: { name: 'Paterna (domicilio de Irene y Álvaro)', x: 40, y: 45, kind: 'domicilio' },
    puente: { name: 'Puente del Azud', x: 28, y: 54, kind: 'escena' },
    gasolinera: { name: 'Gasolinera del acceso sur', x: 31, y: 58, kind: 'cámara' },
    peaje: { name: 'Peaje del Molinar (autopista)', x: 60, y: 24, kind: 'peaje' },
    elpuig: { name: 'Área de servicio de El Puig', x: 63, y: 16, kind: 'parking' },
    sagunto: { name: 'Sagunto (domicilio y taller de Hugo)', x: 70, y: 4, kind: 'domicilio' },
    valencia: { name: 'Centro de Valencia (restaurante)', x: 56, y: 60, kind: 'restaurante' },
    benimamet: { name: 'Burjassot / Benimàmet', x: 47, y: 47, kind: 'zona' },
    godella: { name: 'Godella (domicilio de Nuria)', x: 49, y: 38, kind: 'domicilio' },
    a3: { name: 'Autovía A-3 (altura de Chiva)', x: 6, y: 62, kind: 'carretera' }
  },

  /* ---------- PERSONAS ---------- */
  people: [
    {
      id: 'alvaro', name: 'Álvaro Pons Ferri', initials: 'AP', age: 37,
      role: 'Marido de Irene', relation: 'Casados desde 2020; profesor de secundaria',
      hidden: { honestidad: 55, miedo: 85, manipulacion: 20, autocontrol: 30, confianza: 35 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con Irene últimamente?', a: 'Tensa. Desde hace semanas no me contaba nada del trabajo. Estaba rara, dormía mal.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Qué hizo usted entre las 22:00 y las 02:00?', a: 'Discutimos, ella se fue sobre las diez y cuarto. Yo me quedé en casa y me acosté a las once.', type: 'mentira', reveals: ['S2_ALV_CASA'] },
        { id: 'ultimo', q: '¿Cuándo tuvo noticias de ella por última vez?', a: 'Me dejó un mensaje de voz antes de medianoche que no escuché hasta las dos. Y a la una y media llegó ese mensaje de despedida.', type: 'verdad', reveals: ['S2_ALV_BUZON'] },
        { id: 'discusion', q: '¿Por qué discutieron?', a: 'Porque no me contaba qué le pasaba. Le dije que si había otra persona prefería saberlo. Se puso a llorar y se fue.', type: 'verdad', reveals: [] },
        { id: 'vehiculo', q: '¿Qué vehículo tiene?', a: 'Un Toyota RAV4 negro.', type: 'verdad', reveals: [] },
        { id: 'seguro', q: '¿Sabe que es beneficiario de un seguro de vida de Irene?', requires: ['F2_FIN_SEGURO'], a: 'Lo contratamos los dos al comprar el piso. Ella también es beneficiaria del mío. No había pensado en eso ni un segundo.', type: 'verdad', reveals: [] },
        { id: 'pasaporte', q: '¿Dónde guardaba Irene su pasaporte?', requires: ['F2_PASAPORTE'], a: 'En la carpeta del dormitorio, con el mío. ¿No está? No lo sabía.', type: 'verdad', reveals: ['S2_ALV_PASAPORTE'] }
      ],
      confront: {
        F2_CV_2327: { a: 'Vale. Salí a buscarla. Di vueltas por Burjassot y Benimàmet, donde vive una amiga suya, y volví sobre la una. No lo dije porque sabía que iba a parecer lo que no es.', reveals: ['S2_ALV_SALIO'] },
        S2_CARMEN_SALIDAS: { a: 'Sí, salí. Fui a buscarla por Burjassot y Benimàmet. Volví sobre la una. Me dio miedo decirlo.', reveals: ['S2_ALV_SALIO'] },
        F2_TAB_PROG: { a: '¿Programado a las seis de la tarde? Eso fue antes de que discutiéramos... Entonces ya lo tenía decidido.', reveals: [] },
        F2_FIN_SEGURO: { a: 'Si cree que le hice algo por dinero, pida los datos de mi teléfono. No estuve en ese puente.', reveals: [] },
        F2_ANT_ALV: { a: '¿Lo ve? Estuve dando vueltas por Burjassot, como le dije.', reveals: [] },
        F2_PASAPORTE: { a: 'No sabía que no estaba. Eso no tiene sentido si se cayó del puente...', reveals: [] }
      },
      confrontDefault: 'No sé qué decirle. Solo quiero que la encuentren.'
    },
    {
      id: 'hugo', name: 'Hugo Soler Navarro', initials: 'HS', age: 31,
      role: 'Hermano de Irene', relation: 'Mecánico con taller propio en Sagunto',
      hidden: { honestidad: 30, miedo: 60, manipulacion: 45, autocontrol: 65, confianza: 20 },
      questions: [
        { id: 'rel', q: '¿Cómo es su relación con su hermana?', a: 'Es mi hermana mayor. Siempre me ha cuidado. Estamos muy unidos.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 02:00?', a: 'En casa, en Sagunto. Me acosté pronto; abro el taller a las ocho.', type: 'mentira', reveals: ['S2_HUGO_CASA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Irene por última vez?', a: 'Hará una semana. Por teléfono, nada especial.', type: 'mentira', reveals: ['S2_HUGO_ULTIMO'] },
        { id: 'problemas', q: '¿Sabe si Irene tenía problemas?', a: 'Algo del trabajo. No me contaba mucho.', type: 'media', reveals: [] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Una Ford Transit gris, la del taller.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F2_LL_2209: { a: 'Me llamó un minuto, sí. Para preguntarme por un ruido del coche. Se me olvidó.', reveals: ['S2_HUGO_RUIDO'] },
        F2_PJ_2344: { a: 'Tuve un servicio de grúa esa noche, por eso pasé el peaje. Trabajo es trabajo.', reveals: ['S2_HUGO_GRUA'] },
        F2_ANT_HUGO: { a: '(Silencio largo.) No voy a decir nada más sin un abogado.', reveals: ['S2_HUGO_SILENCIO'] },
        F2_FIN_HUGO: { a: 'Le presté dinero. Es mi hermana. ¿Desde cuándo eso es raro?', reveals: [] },
        F2_GS_0031: { a: 'En Valencia hay cientos de furgonetas grises.', reveals: [] },
        S2_CARMEN_MALETA: { a: 'Le llevé una maleta al taller para arreglarle la cremallera. ¿Qué tiene de malo?', reveals: [] },
        F2_NEUMATICO: { a: 'Medio parque de furgonetas lleva esa medida.', reveals: [] }
      },
      confrontDefault: 'No sé de qué me habla.'
    },
    {
      id: 'ricardo', name: 'Ricardo Albiol Sanz', initials: 'RA', age: 52,
      role: 'Director general de CLM', relation: 'Jefe de Irene; investigado por la Fiscalía',
      hidden: { honestidad: 50, miedo: 50, manipulacion: 70, autocontrol: 85, confianza: 25 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Irene?', a: 'Trabajaba en calidad desde 2019. Una buena profesional. Trato correcto.', type: 'media', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 02:00?', a: 'En una cena de empresa en un restaurante del centro hasta las doce y media. Luego, a casa, en Rocafort. Tengo el tique.', type: 'verdad', reveals: ['S2_RIC_CENA', 'F2_TICKET_RIC'] },
        { id: 'ultimo', q: '¿Cuándo habló con ella por última vez?', a: 'El miércoles, en la oficina. Hablamos de trabajo.', type: 'verdad', reveals: [] },
        { id: 'problemas', q: '¿Sabía que iba a declarar ante la Fiscalía?', a: 'Lo sabía toda la empresa. No tengo nada que esconder; mis abogados se ocupan de eso.', type: 'media', reveals: [] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Un BMW serie 5 azul oscuro.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F2_LAP_RICARDO: { a: 'Fue una frase desafortunada. Estaba nervioso. No es una amenaza: es un recordatorio de lealtad.', reveals: [] },
        F2_LAP_AMENAZA: { a: 'Yo no envío correos anónimos. Lo que tengo que decir lo digo con mi nombre.', reveals: [] },
        S2_NURIA_AMENAZAS: { a: 'Nuria nunca me ha soportado. Que demuestre lo que dice.', reveals: [] },
        F2_ANT_RIC: { a: 'Ahí lo tiene: en el centro y luego en casa.', reveals: [] }
      },
      confrontDefault: 'Eso tendrá que hablarlo con mis abogados.'
    },
    {
      id: 'nuria', name: 'Nuria Campos Roig', initials: 'NC', age: 35,
      role: 'Compañera y amiga', relation: 'Trabaja con Irene en CLM desde 2019',
      hidden: { honestidad: 85, miedo: 50, manipulacion: 10, autocontrol: 55, confianza: 70 },
      questions: [
        { id: 'rel', q: '¿Qué relación tiene con Irene?', a: 'Somos compañeras y amigas. Comemos juntas casi todos los días.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En casa, en Godella, con mi pareja.', type: 'verdad', reveals: ['S2_NURIA_CASA'] },
        { id: 'ultimo', q: '¿Cuándo la vio por última vez?', a: 'El jueves comimos juntas. Estaba muy nerviosa, no paraba de mirar el móvil.', type: 'verdad', reveals: [] },
        { id: 'problemas', q: '¿Sabe si Irene tenía problemas?', a: 'Recibía amenazas por lo de la Fiscalía. Tenía miedo de declarar. Ricardo la presionaba. Si le ha pasado algo, ha sido cosa de él o de su gente.', type: 'creencia', reveals: ['S2_NURIA_AMENAZAS'] },
        { id: 'raro', q: '¿Le dijo algo fuera de lo normal últimamente?', a: 'Me preguntó si desaparecer por voluntad propia era delito. Me reí; pensé que era una broma por el estrés.', type: 'verdad', reveals: ['S2_NURIA_PREGUNTA'] }
      ],
      confront: {
        F2_TIQUES: { a: '¿Una tarjeta de prepago? No me lo contó... Aunque me dijo que no se fiaba de su teléfono.', reveals: [] },
        F2_TAB_BUSQ: { a: 'Entonces no era una broma lo que me preguntó.', reveals: [] },
        F2_LAP_AMENAZA: { a: 'Ese es uno de los correos. Me lo enseñó. Había más.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'joaquin', name: 'Joaquín Bellver Gómez', initials: 'JB', age: 49,
      role: 'Camionero, testigo', relation: 'Avisó al 112 a las 01:55',
      hidden: { honestidad: 90, miedo: 20, manipulacion: 5, autocontrol: 70, confianza: 70 },
      questions: [
        { id: 'vio', q: '¿Qué vio en el puente?', a: 'Pasé sobre las doce y cuarenta en sentido contrario. Había un coche blanco con los warnings y, detrás, una furgoneta clara con las luces apagadas. Junto a la barandilla, un hombre con capucha. A las dos menos diez volví a pasar: solo quedaba el coche. Entonces llamé.', type: 'verdad', reveals: ['S2_JOAQ_0038', 'S2_JOAQ_0152'] },
        { id: 'hombre', q: '¿Está seguro de que era un hombre?', requires: ['S2_JOAQ_0038'], a: 'Llevaba capucha y era de noche. Por la ropa diría que un hombre... Seguro, seguro, no.', type: 'creencia', reveals: ['S2_JOAQ_DUDA'] },
        { id: 'noche', q: '¿Qué ruta hacía esa noche?', a: 'Valencia–Teruel y vuelta. Lo tiene todo en el tacógrafo.', type: 'verdad', reveals: ['F2_TACOGRAFO'] },
        { id: 'conoce', q: '¿Conoce a alguna de las personas del caso?', a: 'A nadie. Yo solo pasaba por allí.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F2_GS_0031: { a: 'Gris o clara... con las farolas de sodio todo parece del mismo color.', reveals: [] }
      },
      confrontDefault: 'De eso no sé nada.'
    },
    {
      id: 'carmen', name: 'Carmen Ortiz Llopis', initials: 'CO', age: 66,
      role: 'Vecina de enfrente', relation: 'Vive frente al domicilio de Irene y Álvaro',
      hidden: { honestidad: 90, miedo: 25, manipulacion: 10, autocontrol: 60, confianza: 65 },
      questions: [
        { id: 'oyo', q: '¿Vio u oyó algo esa noche?', a: 'Discutieron fuerte sobre las nueve y media. A las diez y cuarto ella salió en su coche. Y a las once y media, más o menos, él también salió en el suyo.', type: 'verdad', reveals: ['S2_CARMEN_DISC', 'S2_CARMEN_SALIDAS'] },
        { id: 'camara', q: '¿Tiene alguna cámara?', a: 'Una en la puerta, por los robos. Graba la calle. Pueden verla.', type: 'verdad', reveals: [] },
        { id: 'irene', q: '¿Notó algo raro en Irene estos días?', a: 'Estaba muy reservada. El miércoles por la mañana vino su hermano con la furgoneta y cargaron una maleta. Pensé que se iban de viaje.', type: 'verdad', reveals: ['S2_CARMEN_MALETA'] }
      ],
      confront: {},
      confrontDefault: 'Eso no lo sé, hija.'
    }
  ],

  /* ---------- ESCENA ---------- */
  scene: {
    plans: [
      {
        id: 'puente', name: 'Puente del Azud', legend: 'Tablero de 140 m · dos carriles · arcén este',
        rooms: [
          { id: 'acceso', name: 'Acceso sur', x: 0, y: 0, w: 18, h: 100 },
          { id: 'calzada', name: 'Calzada', x: 18, y: 0, w: 82, h: 58 },
          { id: 'arcen', name: 'Arcén', x: 18, y: 58, w: 82, h: 26 },
          { id: 'barandilla', name: 'Barandilla · río', x: 18, y: 84, w: 82, h: 16 }
        ],
        hotspots: [{ ev: 'P05', x: 38, y: 70 }, { ev: 'P01', x: 56, y: 70 }, { ev: 'P02', x: 64, y: 62 }, { ev: 'P03', x: 72, y: 90 }, { ev: 'P04', x: 86, y: 90 }]
      },
      {
        id: 'vivienda', name: 'Vivienda (Paterna)', legend: 'Piso de Irene y Álvaro · 2.º B',
        rooms: [
          { id: 'entrada', name: 'Entrada', x: 0, y: 55, w: 25, h: 45 },
          { id: 'salon', name: 'Salón', x: 25, y: 40, w: 45, h: 60 },
          { id: 'despacho', name: 'Despacho', x: 0, y: 0, w: 40, h: 55 },
          { id: 'dormitorio', name: 'Dormitorio', x: 40, y: 0, w: 60, h: 40 },
          { id: 'cocina', name: 'Cocina', x: 70, y: 40, w: 30, h: 60 }
        ],
        hotspots: [{ ev: 'V01', x: 12, y: 22 }, { ev: 'V04', x: 28, y: 18 }, { ev: 'V05', x: 20, y: 44 }, { ev: 'V02', x: 58, y: 18 }, { ev: 'V03', x: 86, y: 14 }, { ev: 'V06', x: 84, y: 70 }]
      },
      {
        /* Segunda escena: se abre al saber que Álvaro salió esa noche en su coche. */
        id: 'garaje', name: 'Garaje (Paterna)', legend: 'Sótano del edificio · plaza 14 y trastero de Irene y Álvaro', unlock: 'F2_CV_2327',
        rooms: [
          { id: 'rampa', name: 'Rampa', x: 0, y: 0, w: 20, h: 100 },
          { id: 'plazas', name: 'Plaza 14', x: 20, y: 0, w: 52, h: 100 },
          { id: 'trastero', name: 'Trastero', x: 72, y: 0, w: 28, h: 100 }
        ],
        hotspots: [{ ev: 'G01', x: 46, y: 50 }, { ev: 'G02', x: 86, y: 40 }]
      }
    ]
  },

  /* ---------- EVIDENCIAS ---------- */
  evidence: [
    { id: 'P01', name: 'Coche de Irene', type: 'Vehículo', level: 2, fixed: true, forensic: { luminol: { reveals: ['F2_LUMINOL_COCHE'] } }, room: 'Arcén',
      public: 'Renault Clio blanco parado en el arcén con los warnings encendidos.',
      detail: 'Llaves en el contacto, puerta del conductor entreabierta, depósito a tres cuartos. No hay signos de golpe ni de forcejeo en el habitáculo.',
      value: 'Indica cómo y cuándo se abandonó el vehículo.', limits: 'No dice quién lo dejó así ni por qué.',
      reveals: ['F2_COCHE'],
      lab: { huellas: { cost: 120, reveals: ['F2_COCHE_HUELLAS'] }, vehiculo: { cost: 150, reveals: ['F2_COCHE_MECANICA'] } } },
    { id: 'P02', name: 'Bolso en el asiento', type: 'Objeto', level: 2, room: 'Arcén',
      public: 'Un bolso en el asiento del copiloto.',
      detail: 'Cartera con DNI, tarjetas y 40 €; llaves de casa; un pintalabios. No hay teléfono.',
      value: 'Muestra qué llevaba encima.', limits: 'Lo ausente puede no haber estado nunca en el bolso.',
      reveals: ['F2_BOLSO'] },
    { id: 'P03', name: 'Zapatilla junto a la barandilla', type: 'Objeto', level: 5, forensic: { lupa: { reveals: ['F2_LUPA_ZAPATO'] } }, room: 'Barandilla',
      public: 'Una zapatilla deportiva al pie de la barandilla.',
      detail: 'Zapatilla izquierda, de pie y alineada con la barandilla. Los cordones siguen atados con doble nudo.',
      value: 'Sugiere a primera vista una caída al río.', limits: 'Una prenda no demuestra qué le ocurrió a su dueña.',
      reveals: ['F2_ZAPATO'],
      lab: { adn: { cost: 200, reveals: ['F2_ZAPATO_ADN'] } } },
    { id: 'P04', name: 'Barandilla', type: 'Escena', level: 3, fixed: true, forensic: { luminol: { reveals: ['F2_LUMINOL_BARANDILLA'] } }, room: 'Barandilla',
      public: 'Barandilla metálica de 1,20 m sobre el río.',
      detail: 'La barandilla tiene una película de polvo y hollín. No se aprecian roces, arrastres ni huellas de apoyo recientes.',
      value: 'Una caída o un salto suelen dejar marcas.', limits: 'La ausencia de marcas no es concluyente por sí sola.',
      reveals: ['F2_BARANDILLA'],
      lab: { fibras: { cost: 150, reveals: ['F2_BARANDILLA_FIBRAS'] } } },
    { id: 'P05', name: 'Marcas en el arcén', type: 'Escena', level: 3, fixed: true, room: 'Arcén',
      public: 'Barro en el arcén, unos metros por detrás del coche.',
      detail: 'A seis metros detrás del Clio, barro con la huella parcial de un neumático ancho, distinto de los del Clio.',
      value: 'Puede indicar que otro vehículo se detuvo allí.', limits: 'No se puede fechar con precisión.',
      reveals: ['F2_MARCAS'],
      lab: { comparativa: { cost: 180, label: 'Comparativa de neumático', reveals: ['F2_NEUMATICO'] } } },
    { id: 'V01', name: 'Tablet de Irene', type: 'Dispositivo', level: 2, room: 'Despacho',
      public: 'Una tablet sobre el escritorio del despacho.',
      detail: 'Tablet bloqueada, sincronizada con la cuenta de Irene. Requiere análisis forense.',
      value: 'Mensajes, historial y sincronización con el teléfono.', limits: 'Solo refleja lo que pasó por esa cuenta.',
      reveals: ['F2_TABLET_ESCENA'], unlocks: ['D2_TABLET'] },
    { id: 'V02', name: 'Carpeta de documentos', type: 'Documento', level: 2, forensic: { polvo: { reveals: ['F2_POLVO_CARPETA'] } }, room: 'Dormitorio',
      public: 'Carpeta de documentos en el cajón de la cómoda.',
      detail: 'Libro de familia, escrituras y el pasaporte de Álvaro. El pasaporte de Irene no está.',
      value: 'Indica qué documentos se llevó o no se llevó.', limits: 'Pudo guardarse en otro sitio.',
      reveals: ['F2_PASAPORTE'] },
    { id: 'V03', name: 'Armario de Irene', type: 'Escena', level: 3, fixed: true, room: 'Dormitorio',
      public: 'Armario empotrado del dormitorio.',
      detail: 'Hay perchas vacías juntas en el lado de Irene y falta la maleta pequeña del altillo: queda su marca en el polvo.',
      value: 'Puede indicar una salida preparada.', limits: 'No sabemos cuándo desapareció la maleta.',
      reveals: ['F2_ARMARIO'] },
    { id: 'V04', name: 'Portátil corporativo', type: 'Dispositivo', level: 2, room: 'Despacho',
      public: 'Portátil de la empresa CLM.',
      detail: 'Portátil corporativo cifrado. Requiere análisis forense con autorización.',
      value: 'Correo y documentos de trabajo.', limits: 'Contenido corporativo sujeto a autorización.',
      reveals: ['F2_PORTATIL_ESCENA'], unlocks: ['D2_LAPTOP'] },
    { id: 'V05', name: 'Papelera del despacho', type: 'Documento', level: 3, room: 'Despacho',
      public: 'Papelera bajo el escritorio.',
      detail: 'Tiques arrugados: retirada de 1.000 € en un cajero (jueves 8/10, 18:12) y compra de una tarjeta SIM de prepago en un estanco (jueves, 18:40).',
      value: 'Gastos recientes poco habituales.', limits: 'No dice para qué se usaron.',
      reveals: ['F2_TIQUES'] },
    { id: 'V06', name: 'Nota en la nevera', type: 'Documento', level: 4, room: 'Cocina',
      public: 'Una nota sujeta con un imán en la nevera.',
      detail: 'Letra de Irene: «Compra: leche, pan, café. Llamar a Hugo — viernes».',
      value: 'Puede indicar una cita o un recado.', limits: 'Una nota doméstica admite muchas lecturas.',
      reveals: ['F2_NOTA'],
      lab: { caligrafia: { cost: 120, label: 'Pericial caligráfica', reveals: ['F2_NOTA_CALIG'] } } },
    { id: 'G01', name: 'Coche de Álvaro (RAV4)', type: 'Vehículo', level: 2, fixed: true, room: 'Plaza 14',
      public: 'El Toyota RAV4 negro de Álvaro, aparcado en su plaza del garaje.',
      detail: 'Todoterreno negro aparcado en su plaza, con navegador integrado.',
      value: 'Puede indicar por dónde circuló esa noche.', limits: 'Un trayecto del navegador sitúa el coche, no a quien lo conducía.',
      reveals: ['F2_G_NAVEGADOR'],
      lab: { vehiculo: { cost: 150, label: 'Revisión del vehículo y de los bajos', reveals: ['F2_G_BAJOS'] } } },
    { id: 'G02', name: 'Bolsa de deporte del trastero', model: 'bag', type: 'Objeto', level: 3, room: 'Trastero',
      public: 'Una bolsa de deporte en el suelo del trastero.',
      detail: 'Bolsa de deporte de Álvaro con ropa y calzado.',
      value: 'Ropa y calzado usados recientemente.', limits: 'No dice cuándo se usaron.',
      reveals: ['F2_G_BOLSA'],
      lab: { comparativa: { cost: 180, label: 'Comparativa de suelos', reveals: ['F2_G_SUELO'] } } }
  ],

  labKinds: { huellas: 'Huellas dactilares', adn: 'ADN', fibras: 'Fibras', comparativa: 'Comparativa', vehiculo: 'Revisión mecánica', caligrafia: 'Pericial caligráfica' },

  /* ---------- DIGITAL ---------- */
  digital: [
    { id: 'D2_CAMVEC', name: 'Cámara doméstica de la vecina', cost: 60, desc: 'Cámara de la puerta de Carmen Ortiz, orientada a la calle del domicilio.',
      reveals: ['F2_CV_2214', 'F2_CV_2327', 'F2_CV_0112'] },
    { id: 'D2_PEAJE', name: 'Registro del peaje del Molinar', cost: 120, desc: 'Lectura de matrículas y pagos del pórtico de peaje de la autopista.',
      reveals: ['F2_PJ_2258', 'F2_PJ_2341', 'F2_PJ_2344'] },
    { id: 'D2_GASO', name: 'Cámara de la gasolinera del acceso sur', cost: 100, desc: 'Cámara exterior que cubre la carretera de entrada al puente.',
      reveals: ['F2_GS_0019', 'F2_GS_0031', 'F2_GS_0046'] },
    { id: 'D2_LLAM', name: 'Registro de llamadas de Irene (operadora)', cost: 200, desc: 'Llamadas y mensajes de la línea de Irene. El terminal no se ha encontrado.',
      reveals: ['F2_LL_2209', 'F2_LL_2352', 'F2_LL_0130', 'F2_LL_0134'] },
    { id: 'D2_AUDIO', name: 'Análisis del mensaje de voz', cost: 180, desc: 'Análisis acústico del mensaje de 41 s que Irene dejó a Álvaro.', requiresDigital: 'D2_LLAM',
      reveals: ['F2_AUDIO_VOZ', 'F2_AUDIO_FONDO'] },
    { id: 'D2_TABLET', name: 'Análisis forense de la tablet', cost: 250, desc: 'Mensajería, historial y sincronización.', requires: 'V01',
      reveals: ['F2_TAB_PROG', 'F2_TAB_BUSQ', 'F2_TAB_SYNC'] },
    { id: 'D2_LAPTOP', name: 'Análisis del portátil corporativo', cost: 250, desc: 'Correo y documentos con autorización judicial.', requires: 'V04',
      reveals: ['F2_LAP_CITACION', 'F2_LAP_AMENAZA', 'F2_LAP_RICARDO'] },
    { id: 'D2_FIN', name: 'Datos financieros', cost: 150, desc: 'Cuentas de Irene, seguros y movimientos recientes.',
      reveals: ['F2_FIN_EFECTIVO', 'F2_FIN_SEGURO', 'F2_FIN_HUGO', 'F2_FIN_RICARDO'] },
    { id: 'D2_VEH', name: 'Registro de vehículos', cost: 60, desc: 'Vehículos a nombre de las personas del expediente.',
      reveals: ['F2_VEH_IRENE', 'F2_VEH_ALV', 'F2_VEH_HUGO', 'F2_VEH_RIC', 'F2_VEH_NURIA'] }
  ],

  judicial: {
    max: 2,
    desc: 'Datos de antenas de un teléfono entre las 22:00 y las 02:00. El juzgado autoriza dos solicitudes en este expediente.',
    targets: [{ id: 'irene', name: 'Irene Soler (desaparecida)' }],
    results: {
      irene: ['F2_ANT_IRENE'], hugo: ['F2_ANT_HUGO'], alvaro: ['F2_ANT_ALV'], ricardo: ['F2_ANT_RIC'],
      nuria: ['F2_ANT_NURIA'], joaquin: ['F2_ANT_JOAQ'], carmen: ['F2_ANT_CARMEN']
    }
  },

  /* ---------- HECHOS ---------- */
  facts: {
    F2_LUMINOL_COCHE: { text: 'Luminol: ninguna reacción en el habitáculo ni en el maletero del Clio. No hay restos de sangre.', place: 'puente', source: 'laboratorio', tags: ['vehiculo', 'sangre'] },
    F2_LUMINOL_BARANDILLA: { text: 'Luminol: ninguna reacción en la barandilla ni en el pretil.', place: 'puente', source: 'laboratorio', tags: ['barandilla', 'sangre', 'rio'] },
    F2_POLVO_CARPETA: { prints: [{ at: 'Carpeta de documentos', match: 'irene' }], text: 'Polvo revelador: huellas recientes de Irene en la carpeta y en el compartimento donde se guardaba el pasaporte.', person: 'irene', source: 'laboratorio', tags: ['pasaporte', 'huella'] },
    F2_LUPA_ZAPATO: { text: 'Lupa: la suela de la zapatilla está limpia, sin restos del barro del arcén, y los cordones no tienen tierra: no parece haberse perdido caminando por allí.', source: 'escena', tags: ['zapato', 'rio'] },
    F2_AVISO: { text: 'Un camionero llama al 112: hay un coche parado con los warnings en el Puente del Azud.', time: '01:55', person: 'joaquin', place: 'puente', source: 'informe policial', tags: ['aviso', 'testigo'] },
    F2_HALLAZGO: { text: 'Una patrulla encuentra el Renault Clio de Irene en el arcén del puente, vacío, con la puerta del conductor entreabierta.', time: '02:10', place: 'puente', source: 'informe policial', tags: ['vehiculo', 'hallazgo'] },
    F2_BUSQUEDA: { text: 'El rastreo del río durante el sábado y el domingo no encuentra a Irene ni ningún objeto suyo.', source: 'informe policial', tags: ['rio', 'busqueda'] },
    F2_MENSAJE: { text: 'Álvaro recibe desde la cuenta de mensajería de Irene: «Lo siento. No me busquéis. Es mejor así.»', time: '01:30', person: 'alvaro', source: 'mensaje', tags: ['mensaje'] },

    F2_COCHE: { text: 'El Clio tiene las llaves puestas, el depósito a tres cuartos y ningún signo de golpe ni de forcejeo.', place: 'puente', source: 'escena', tags: ['vehiculo'] },
    F2_COCHE_HUELLAS: { prints: [{ at: 'Volante del Clio', match: 'irene' }, { at: 'Tirador exterior del copiloto', q: 'no_apta' }], text: 'Huellas en el volante y la palanca: solo de Irene. En el tirador exterior del copiloto, una parcial no apta para cotejo.', source: 'laboratorio', tags: ['vehiculo', 'huella'] },
    F2_COCHE_MECANICA: { text: 'Revisión mecánica del Clio: sin averías. Arranca y circula con normalidad.', source: 'laboratorio', tags: ['vehiculo'] },
    F2_BOLSO: { text: 'En el bolso: cartera con DNI, tarjetas y 40 €, y las llaves de casa. No hay teléfono.', place: 'puente', source: 'escena', tags: ['bolso', 'telefono'] },
    F2_ZAPATO: { text: 'Zapatilla izquierda de Irene al pie de la barandilla, de pie y alineada, con los cordones atados con doble nudo.', place: 'puente', source: 'escena', tags: ['zapato', 'rio'] },
    F2_ZAPATO_ADN: { pericia: { type: 'adn', match: 'irene', label: 'interior de la zapatilla' }, text: 'ADN del interior de la zapatilla: perfil de Irene Soler.', source: 'laboratorio', tags: ['zapato', 'adn'] },
    F2_BARANDILLA: { text: 'La barandilla conserva una película de polvo y hollín sin roces, arrastres ni huellas de apoyo recientes.', place: 'puente', source: 'escena', tags: ['rio', 'barandilla'] },
    F2_BARANDILLA_FIBRAS: { text: 'No hay fibras textiles en la barandilla ni en el pretil.', source: 'laboratorio', tags: ['fibra', 'barandilla'] },
    F2_MARCAS: { text: 'A seis metros detrás del Clio, huella parcial de un neumático ancho distinto de los del Clio.', place: 'puente', source: 'escena', tags: ['vehiculo', 'neumatico'] },
    F2_NEUMATICO: { pericia: { type: 'neumatico', match: 'furgoneta', label: 'marcas del arcén' }, text: 'El neumático es de medida 215/65 R16, habitual en furgonetas comerciales (Transit, Vito, Trafic…). Compatible con muchos modelos.', source: 'laboratorio', tags: ['vehiculo', 'neumatico', 'furgoneta'] },
    F2_TABLET_ESCENA: { text: 'La tablet de Irene está en el despacho, bloqueada y sincronizada con su cuenta.', source: 'escena', tags: ['tablet'] },
    F2_PASAPORTE: { text: 'En la carpeta de documentos del dormitorio está el pasaporte de Álvaro, pero no el de Irene.', place: 'paterna', source: 'escena', tags: ['pasaporte', 'documento'] },
    F2_ARMARIO: { text: 'En el armario de Irene hay perchas vacías juntas y falta la maleta pequeña del altillo.', place: 'paterna', source: 'escena', tags: ['maleta', 'ropa'] },
    F2_PORTATIL_ESCENA: { text: 'El portátil corporativo de CLM está en el despacho, cifrado.', source: 'escena', tags: ['portatil'] },
    F2_TIQUES: { text: 'Tiques en la papelera: retirada de 1.000 € (jueves 8/10, 18:12) y compra de una SIM de prepago en un estanco (jueves, 18:40).', source: 'documento', tags: ['dinero', 'sim', 'telefono'] },
    F2_NOTA_CALIG: { pericia: { type: 'caligrafia', match: 'irene', label: 'nota de la nevera' }, text: 'Pericial caligráfica: la nota de la nevera es de puño y letra de Irene.', person: 'irene', source: 'laboratorio', tags: ['nota', 'documento'] },
    F2_NOTA: { text: 'Nota en la nevera, de puño de Irene: «Compra: leche, pan, café. Llamar a Hugo — viernes».', person: 'hugo', source: 'documento', tags: ['nota'] },

    F2_CV_2214: { text: 'Cámara de la vecina: sale el Clio blanco de Irene.', time: '22:14', person: 'irene', place: 'paterna', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F2_CV_2327: { text: 'Cámara de la vecina: sale el RAV4 negro de Álvaro, con él al volante.', time: '23:27', person: 'alvaro', place: 'paterna', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F2_CV_0112: { text: 'Cámara de la vecina: vuelve el RAV4 negro de Álvaro.', time: '01:12', person: 'alvaro', place: 'paterna', source: 'cámara', tags: ['camara', 'vehiculo'] },

    F2_PJ_2258: { text: 'Peaje del Molinar: el Clio de Irene (5521 LDR) pasa en dirección norte. Pago con la tarjeta de Irene.', time: '22:58', person: 'irene', place: 'peaje', source: 'registro', tags: ['peaje', 'vehiculo', 'matricula'] },
    F2_PJ_2341: { text: 'Peaje del Molinar: el Clio de Irene pasa en dirección sur. Pago en efectivo.', time: '23:41', person: 'irene', place: 'peaje', source: 'registro', tags: ['peaje', 'vehiculo', 'matricula'] },
    F2_PJ_2344: { text: 'Peaje del Molinar: una Ford Transit gris (1187 KTV) pasa en dirección sur. Pago en efectivo.', time: '23:44', person: 'hugo', place: 'peaje', source: 'registro', tags: ['peaje', 'vehiculo', 'matricula', 'furgoneta'] },

    F2_GS_0019: { text: 'Cámara de la gasolinera: el Clio blanco pasa hacia el puente.', time: '00:19', person: 'irene', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F2_GS_0031: { text: 'Cámara de la gasolinera: una furgoneta comercial gris pasa hacia el puente. Matrícula no legible.', time: '00:31', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo', 'furgoneta'] },
    F2_GS_0046: { text: 'Cámara de la gasolinera: una furgoneta comercial gris vuelve del puente y toma el acceso a la autovía.', time: '00:46', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo', 'furgoneta'] },

    F2_LL_2209: { text: 'Línea de Irene: llamada saliente a Hugo Soler (1 min 2 s).', time: '22:09', person: 'hugo', source: 'llamada', tags: ['llamada'] },
    F2_LL_2352: { text: 'Línea de Irene: llamada a Álvaro que salta al buzón; deja un mensaje de voz de 41 s.', time: '23:52', person: 'irene', source: 'llamada', tags: ['llamada', 'audio'] },
    F2_LL_0130: { text: 'Línea de Irene: se envía el mensaje de despedida a Álvaro.', time: '01:30', person: 'irene', source: 'mensaje', tags: ['mensaje'] },
    F2_LL_0134: { text: 'Línea de Irene: último registro de red; el terminal se apaga.', time: '01:34', person: 'irene', source: 'registro', tags: ['telefono'] },
    F2_AUDIO_VOZ: { text: 'Voz de Irene en el mensaje: «Álvaro, no me esperes esta noche. Necesito pensar. No es culpa tuya.»', time: '23:52', person: 'irene', source: 'dispositivo', tags: ['audio'] },
    F2_AUDIO_FONDO: { text: 'Fondo del mensaje: intermitente de coche, un motor diésel al ralentí muy cerca y, al final, una voz masculina dice una palabra corta inaudible. No permite identificar al hablante.', time: '23:52', source: 'laboratorio', tags: ['audio'] },

    F2_TAB_PROG: { text: 'Tablet: el mensaje «Lo siento. No me busquéis. Es mejor así.» se redactó y programó el viernes 9/10 a las 18:02 para enviarse a las 01:30.', time: '18:02', person: 'irene', source: 'dispositivo', tags: ['mensaje', 'tablet'] },
    F2_TAB_BUSQ: { text: 'Historial de la tablet (semana anterior): «renovar pasaporte urgente», «vuelos Lisboa sin equipaje», «desaparecer adulto es delito».', person: 'irene', source: 'dispositivo', tags: ['tablet', 'pasaporte'] },
    F2_TAB_SYNC: { text: 'La tablet sincroniza con el teléfono de Irene: el mensaje programado salió desde el teléfono a las 01:30.', time: '01:30', person: 'irene', source: 'dispositivo', tags: ['tablet', 'mensaje', 'telefono'] },

    F2_LAP_CITACION: { text: 'Citación: Irene debía declarar como testigo el lunes 12/10 en la investigación de la Fiscalía sobre adjudicaciones de CLM.', person: 'irene', source: 'documento', tags: ['fiscalia', 'portatil'] },
    F2_LAP_AMENAZA: { text: 'Correo anónimo recibido el 05/10: «Piénsatelo bien antes del lunes. Sabemos dónde vives.»', person: 'irene', source: 'documento', tags: ['amenaza', 'portatil', 'correo'] },
    F2_LAP_RICARDO: { text: 'Correo de Ricardo Albiol a Irene (07/10): «Espero que el lunes recuerdes quién te ha dado de comer estos años.»', person: 'ricardo', source: 'documento', tags: ['amenaza', 'portatil', 'correo'] },

    F2_FIN_EFECTIVO: { text: 'Irene retiró 3.000 € en efectivo en tres cajeros distintos el 7 y el 8 de octubre.', person: 'irene', source: 'documento', tags: ['dinero'] },
    F2_FIN_SEGURO: { text: 'Seguro de vida de Irene: 200.000 €. Beneficiario: Álvaro Pons.', person: 'alvaro', source: 'documento', tags: ['dinero', 'seguro'] },
    F2_FIN_HUGO: { text: 'Transferencia de Hugo a Irene de 2.000 € el 01/10 con el concepto «lo hablado».', person: 'hugo', source: 'documento', tags: ['dinero', 'transferencia'] },
    F2_FIN_RICARDO: { text: 'La investigación de la Fiscalía afecta a adjudicaciones firmadas por Ricardo Albiol como director general.', person: 'ricardo', source: 'documento', tags: ['fiscalia'] },

    F2_VEH_IRENE: { text: 'Irene Soler: Renault Clio blanco, 5521 LDR.', person: 'irene', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F2_VEH_ALV: { text: 'Álvaro Pons: Toyota RAV4 negro, 2874 KBC.', person: 'alvaro', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F2_VEH_HUGO: { text: 'Hugo Soler (taller): Ford Transit gris, 1187 KTV.', person: 'hugo', source: 'vehículo', tags: ['vehiculo', 'matricula', 'furgoneta'] },
    F2_VEH_RIC: { text: 'Ricardo Albiol: BMW serie 5 azul oscuro, 0912 LGM.', person: 'ricardo', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F2_VEH_NURIA: { text: 'Nuria Campos: Seat Ibiza rojo, 6650 JWS.', person: 'nuria', source: 'vehículo', tags: ['vehiculo', 'matricula'] },

    F2_ANT_IRENE: { text: 'Antenas del teléfono de Irene: El Puig de 23:02 a 23:38; zona del puente de 00:15 a 00:47; autovía A-3 a la altura de Chiva a las 01:30; se apaga a las 01:34.', time: '01:30', end: '01:34', person: 'irene', place: 'a3', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_HUGO: { text: 'Antenas del teléfono de Hugo: El Puig de 23:05 a 23:40; zona del puente de 00:28 a 00:48; A-3 a la altura de Chiva a las 01:31; sin actividad hasta las 09:10, en Sagunto.', time: '00:28', end: '00:48', person: 'hugo', place: 'puente', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_ALV: { text: 'Antenas del teléfono de Álvaro: Paterna, Burjassot y Benimàmet entre las 23:30 y las 01:10. No conecta con la antena que cubre el puente.', time: '23:30', end: '01:10', person: 'alvaro', place: 'benimamet', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_RIC: { text: 'Antenas del teléfono de Ricardo: centro de Valencia hasta las 00:40; su domicilio en Rocafort desde las 00:55.', time: '22:00', end: '00:40', person: 'ricardo', place: 'valencia', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_NURIA: { text: 'Antenas del teléfono de Nuria: Godella toda la noche.', time: '22:00', end: '02:00', person: 'nuria', place: 'godella', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_JOAQ: { text: 'Antenas del teléfono de Joaquín: recorrido por la A-3 y la CV-50 compatible con su ruta; zona del puente a las 00:38 y a las 01:52.', time: '00:38', person: 'joaquin', place: 'puente', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_ANT_CARMEN: { text: 'Antenas del teléfono de Carmen: Paterna toda la noche.', time: '22:00', end: '02:00', person: 'carmen', place: 'paterna', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F2_TICKET_RIC: { text: 'Tique del restaurante del centro: pago de Ricardo Albiol.', time: '00:27', person: 'ricardo', place: 'valencia', source: 'documento', tags: ['ticket'] },
    F2_TACOGRAFO: { text: 'Tacógrafo del camión de Joaquín: ruta Valencia–Teruel y vuelta; paso por el puente a las 00:38 y a las 01:52.', time: '00:38', person: 'joaquin', place: 'puente', source: 'registro', tags: ['vehiculo'] },

    /* Declaraciones */
    S2_ALV_CASA: { kind: 'statement', text: 'Álvaro declara que se quedó en casa tras la discusión y se acostó a las 23:00.', time: '22:15', end: '02:00', person: 'alvaro', place: 'paterna', source: 'declaración', tags: ['coartada'] },
    S2_ALV_BUZON: { kind: 'statement', text: 'Álvaro declara que no escuchó el mensaje de voz de Irene hasta las 02:00.', person: 'alvaro', source: 'declaración', tags: ['audio'] },
    S2_ALV_SALIO: { kind: 'statement', text: 'Álvaro admite que salió a buscar a Irene por Burjassot y Benimàmet y volvió sobre la 01:00.', time: '23:27', end: '01:12', person: 'alvaro', place: 'benimamet', source: 'declaración', tags: ['coartada', 'vehiculo'] },
    S2_ALV_PASAPORTE: { kind: 'statement', text: 'Álvaro declara que el pasaporte de Irene siempre estaba en la carpeta del dormitorio.', person: 'alvaro', source: 'declaración', tags: ['pasaporte'] },
    S2_HUGO_CASA: { kind: 'statement', text: 'Hugo declara que pasó la noche en su casa de Sagunto.', time: '22:00', end: '02:00', person: 'hugo', place: 'sagunto', source: 'declaración', tags: ['coartada'] },
    S2_HUGO_ULTIMO: { kind: 'statement', text: 'Hugo declara que llevaba una semana sin hablar con su hermana.', person: 'hugo', source: 'declaración', tags: ['contacto', 'llamada'] },
    S2_HUGO_RUIDO: { kind: 'statement', text: 'Hugo dice que la llamada de las 22:09 fue para consultarle un ruido del coche.', time: '22:09', person: 'hugo', source: 'declaración', tags: ['llamada'] },
    S2_HUGO_GRUA: { kind: 'statement', text: 'Hugo dice que pasó el peaje por un servicio de grúa nocturno.', time: '23:44', person: 'hugo', place: 'peaje', source: 'declaración', tags: ['vehiculo'] },
    S2_HUGO_SILENCIO: { kind: 'statement', text: 'Hugo se niega a seguir declarando sin abogado.', person: 'hugo', source: 'declaración', tags: [] },
    S2_RIC_CENA: { kind: 'statement', text: 'Ricardo declara que estuvo en una cena del centro hasta las 00:30 y después fue a su casa de Rocafort.', time: '21:00', end: '00:30', person: 'ricardo', place: 'valencia', source: 'declaración', tags: ['coartada'] },
    S2_NURIA_CASA: { kind: 'statement', text: 'Nuria declara que pasó la noche en Godella con su pareja.', time: '21:00', end: '02:00', person: 'nuria', place: 'godella', source: 'declaración', tags: ['coartada'] },
    S2_NURIA_AMENAZAS: { kind: 'statement', text: 'Nuria declara que Irene recibía amenazas y cree que Ricardo o su entorno están detrás de la desaparición.', person: 'nuria', source: 'declaración', tags: ['amenaza'] },
    S2_NURIA_PREGUNTA: { kind: 'statement', text: 'Nuria declara que Irene le preguntó si desaparecer por voluntad propia era delito.', person: 'nuria', source: 'declaración', tags: ['desaparicion'] },
    S2_JOAQ_0038: { kind: 'statement', text: 'Joaquín vio en el puente el coche con warnings, una furgoneta clara detrás con las luces apagadas y "un hombre con capucha" junto a la barandilla.', time: '00:38', person: 'joaquin', place: 'puente', source: 'testigo', tags: ['testigo', 'furgoneta'] },
    S2_JOAQ_0152: { kind: 'statement', text: 'Joaquín vio solo el coche al volver a pasar y llamó al 112.', time: '01:52', person: 'joaquin', place: 'puente', source: 'testigo', tags: ['testigo'] },
    S2_JOAQ_DUDA: { kind: 'statement', text: 'Joaquín reconoce que no puede asegurar que la persona de la capucha fuera un hombre.', person: 'joaquin', source: 'testigo', tags: ['testigo'] },
    S2_CARMEN_DISC: { kind: 'statement', text: 'Carmen oyó una discusión fuerte en casa de Irene y Álvaro.', time: '21:30', person: 'carmen', place: 'paterna', source: 'testigo', tags: ['testigo', 'discusion'] },
    S2_CARMEN_SALIDAS: { kind: 'statement', text: 'Carmen vio salir a Irene en coche a las 22:15 y a Álvaro en el suyo hacia las 23:30.', time: '23:30', person: 'alvaro', place: 'paterna', source: 'testigo', tags: ['testigo', 'vehiculo'] },
    S2_CARMEN_MALETA: { kind: 'statement', text: 'Carmen vio el miércoles por la mañana a Hugo cargar una maleta en su furgoneta con Irene.', person: 'hugo', source: 'testigo', tags: ['testigo', 'maleta', 'furgoneta'] },

    /* Registros con orden judicial (comunes a todas las versiones) */
    F2_REG_RIC: { text: 'Registro del domicilio de Ricardo Albiol en Rocafort: en su despacho, una copia de la citación de Irene ante la Fiscalía con su domicilio subrayado, dentro de la documentación del procedimiento que le remitieron sus abogados como investigado.', person: 'ricardo', source: 'registro', tags: ['fiscalia', 'registro'] }
  },

  conflicts: [
    { id: 'C01', a: 'S2_ALV_CASA', b: 'F2_CV_2327', type: 'Hecho distinto', severity: 'alta', desc: 'Álvaro dice que se quedó en casa; la cámara de la vecina registra la salida de su coche a las 23:27 y su vuelta a la 01:12.' },
    { id: 'C02', a: 'S2_ALV_CASA', b: 'S2_CARMEN_SALIDAS', type: 'Hecho distinto', severity: 'media', desc: 'Álvaro dice que se quedó en casa; la vecina le vio salir en coche hacia las 23:30.' }
  ],

  verdictOptions: {
    culpritLabel: 'Explicación principal',
    culprits: [
      { id: 'voluntaria', label: 'Desaparición voluntaria con montaje; sin delito contra Irene' },
      { id: 'accidente', label: 'Caída accidental o salto al río' },
      { id: 'alvaro', label: 'Delito contra Irene cometido por Álvaro Pons' },
      { id: 'hugo', label: 'Delito contra Irene cometido por Hugo Soler' },
      { id: 'ricardo', label: 'Delito contra Irene cometido por Ricardo Albiol o su entorno' },
      { id: 'nuria', label: 'Delito contra Irene cometido por Nuria Campos' },
      { id: 'insuficiente', label: 'Evidencia insuficiente para una conclusión' }
    ],
    accompliceLabel: 'Personas que colaboraron',
    windowLabel: 'Momento en que Irene abandona el puente',
    motives: [
      { id: 'v_huida', label: 'Huir de las amenazas antes de declarar como testigo' },
      { id: 'v_seguro', label: 'Cobrar el seguro de vida' },
      { id: 'v_silenciar', label: 'Silenciar a una testigo incómoda' },
      { id: 'v_pareja', label: 'Conflicto de pareja' },
      { id: 'v_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me_montaje', label: 'Montaje de una caída en el puente y huida en otro vehículo' },
      { id: 'me_rio', label: 'Agresión y cuerpo arrojado al río' },
      { id: 'me_secuestro', label: 'Retención o secuestro por terceros' },
      { id: 'me_caida', label: 'Caída o salto al río sin intervención de nadie' },
      { id: 'me_desc', label: 'No determinable con lo disponible' }
    ],
    windows: [
      { id: 'w_antes', label: 'Antes de las 00:00 (nunca llegó al puente)' },
      { id: 'w_puente', label: 'Entre las 00:19 y las 00:46' },
      { id: 'w_tarde', label: 'Después de las 01:30' },
      { id: 'w_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F2_ZAPATO', 'F2_PASAPORTE', 'F2_ARMARIO', 'F2_TIQUES'], label: 'cordones atados, pasaporte, armario y papelera' },
    movement: { ids: ['D2_PEAJE', 'D2_GASO', 'D2_CAMVEC'], label: 'peaje, gasolinera y cámara vecinal' },
    judicialRelevant: ['irene', 'hugo'],
    spatialBonus: ['F2_ANT_IRENE'],
    temporalConflicts: ['C06', 'C07'],
    lateral: [
      { type: 'fact', id: 'S2_CARMEN_MALETA', pts: 25, yes: 'Preguntaste a la vecina por los días previos, no solo por la noche.', no: 'No exploraste los días previos a la desaparición.' },
      { type: 'conflict', id: 'C07', pts: 30, yes: 'Contrastaste la escena del puente con la ubicación posterior del teléfono.', no: 'No contrastaste la escena del puente con la ubicación del teléfono.' },
      { type: 'conflict', id: 'C06', pts: 25 },
      { type: 'chosen', id: 'F2_PASAPORTE', pts: 20 }
    ],
    usefulLab: ['P05:comparativa', 'P01:vehiculo', 'P04:fibras']
  },

  trial: {},
  trialIntro: {},

  /* ================= VERSIONES ================= */
  variants: {
    voluntaria: {
      facts: {
        F2_G_NAVEGADOR: { text: 'Navegador del RAV4 de Álvaro: el viernes, trayecto de 23:28 a 01:10 por Paterna, Burjassot y Benimàmet, con varias paradas cortas. No se acerca al puente.', time: '23:28', end: '01:10', person: 'alvaro', place: 'benimamet', source: 'dispositivo', tags: ['vehiculo', 'ubicacion'] },
        F2_G_BAJOS: { text: 'Revisión del RAV4: pasos de rueda y bajos con polvo urbano seco, sin barro. El kilometraje del viernes es compatible con un recorrido urbano corto.', person: 'alvaro', source: 'laboratorio', tags: ['vehiculo'] },
        F2_G_BOLSA: { text: 'En el trastero, la bolsa de deporte de Álvaro: una sudadera negra con capucha, ropa de correr y unas zapatillas con tierra seca en la suela.', person: 'alvaro', place: 'paterna', source: 'escena', tags: ['ropa', 'calzado'] },
        F2_G_SUELO: { text: 'Comparativa de suelos: la tierra de las zapatillas de Álvaro es de parque, con restos de corteza de pino; no coincide con la arcilla del arcén del puente.', person: 'alvaro', source: 'laboratorio', tags: ['calzado'] },
        F2_REG_HUGO_ZAPATILLA: { text: 'Registro del taller de Hugo en Sagunto: en la furgoneta Transit, bajo el asiento del copiloto, una zapatilla deportiva derecha de mujer, pareja de la que apareció junto a la barandilla del puente.', person: 'hugo', place: 'sagunto', source: 'registro', tags: ['zapato', 'furgoneta', 'registro'] },
        F2_REG_HUGO_NOTA: { text: 'Registro del taller de Hugo: en la oficina, una nota manuscrita de Irene: «Lisboa — miércoles. No llamar al número viejo».', person: 'hugo', place: 'sagunto', source: 'registro', tags: ['nota', 'registro'] },
        F2_REG_ALV_V: { text: 'Registro del domicilio de Álvaro: en la mesilla, la póliza del seguro de vida de Irene (200.000 €) con anotaciones a lápiz; en la misma carpeta está la póliza gemela de Álvaro, con Irene como beneficiaria.', person: 'alvaro', place: 'paterna', source: 'registro', tags: ['seguro', 'dinero', 'registro'] }
      },
      evidence: {
        G01: { detail: 'Todoterreno negro aparcado en su plaza; pasos de rueda secos. El navegador conserva el historial de trayectos del viernes.' },
        G02: { detail: 'Bolsa de deporte de Álvaro: una sudadera negra con capucha, ropa de correr y unas zapatillas con tierra seca en la suela.' }
      },
      planted: [
        { ev: 'P03', label: 'caída al río simulada', tells: ['F2_LUPA_ZAPATO', 'F2_BARANDILLA', 'F2_REG_HUGO_ZAPATILLA'] },
        { ev: 'V01', label: 'despedida programada para despistar', tells: ['F2_TAB_PROG'] }
      ],
      lineups: [
        { id: 'L1', witness: 'joaquin', saw: 'a la persona con capucha que estaba junto a la barandilla del puente hacia las 00:38, de noche, durante unos segundos y desde la cabina de su camión', target: 'irene', quality: 0.5, requires: 'S2_JOAQ_0038' }
      ],
      searches: {
        hugo: { place: 'el taller y la furgoneta de Hugo en Sagunto', facts: ['F2_REG_HUGO_ZAPATILLA', 'F2_REG_HUGO_NOTA'] },
        alvaro: { place: 'el domicilio de Álvaro en Paterna', facts: ['F2_REG_ALV_V'] },
        ricardo: { place: 'el domicilio de Ricardo Albiol en Rocafort', facts: ['F2_REG_RIC'] }
      },
      conflicts: [
    { id: 'C03', a: 'S2_HUGO_CASA', b: 'F2_PJ_2344', type: 'Lugar distinto', severity: 'alta', desc: 'Hugo dice que estuvo en Sagunto; la furgoneta de su taller pasa el peaje del Molinar a las 23:44, tres minutos después del coche de Irene.' },
    { id: 'C04', a: 'S2_HUGO_CASA', b: 'F2_ANT_HUGO', type: 'Lugar distinto', severity: 'alta', desc: 'Hugo dice que estuvo en Sagunto; su teléfono conecta en El Puig, en la zona del puente (00:28–00:48) y en la A-3 (01:31).' },
    { id: 'C05', a: 'S2_HUGO_ULTIMO', b: 'F2_LL_2209', type: 'Hecho omitido', severity: 'media', desc: 'Hugo dice llevar una semana sin hablar con Irene; ella le llamó a las 22:09 de esa noche.' },
    { id: 'C06', a: 'F2_TAB_PROG', b: 'S2_CARMEN_DISC', type: 'Secuencia incompatible', severity: 'alta', desc: 'El mensaje de despedida se programó a las 18:02, antes de la discusión de las 21:30.' },
    { id: 'C07', a: 'F2_ANT_IRENE', b: 'F2_ZAPATO', type: 'Lugar distinto', severity: 'alta', desc: 'La zapatilla junto a la barandilla sugiere una caída al río; el teléfono de Irene conecta en la A-3, a la altura de Chiva, a las 01:30.' },
    { id: 'C08', a: 'S2_HUGO_ULTIMO', b: 'S2_CARMEN_MALETA', type: 'Hecho omitido', severity: 'media', desc: 'Hugo dice no haber visto a su hermana en una semana; la vecina le sitúa con ella el miércoles cargando una maleta.' },
    { id: 'C09', a: 'S2_HUGO_GRUA', b: 'F2_ANT_HUGO', type: 'Secuencia incompatible', severity: 'media', desc: 'Hugo atribuye el paso por el peaje a un servicio de grúa; su teléfono va después a la zona del puente y a la A-3, y no vuelve a Sagunto hasta las 09:10.' }
      ],
      truth: {
    culprit: 'voluntaria',
    motive: 'v_huida',
    method: 'me_montaje',
    window: 'w_puente',
    accomplices: ['hugo'],
    partialMethods: { me_secuestro: 'Viste que otra persona y otro vehículo intervinieron, pero no que Irene participaba voluntariamente.' },
    decisive: ['F2_ANT_IRENE', 'F2_TAB_PROG', 'F2_PASAPORTE', 'F2_PJ_2344', 'F2_ANT_HUGO', 'F2_GS_0031', 'F2_GS_0046', 'S2_CARMEN_MALETA', 'F2_FIN_EFECTIVO', 'F2_TIQUES', 'F2_ARMARIO', 'S2_NURIA_PREGUNTA', 'F2_LAP_CITACION', 'F2_LAP_AMENAZA', 'F2_FIN_HUGO', 'F2_BARANDILLA', 'F2_TAB_BUSQ', 'F2_LL_2209'],
    weak: ['F2_FIN_SEGURO', 'F2_ZAPATO', 'S2_JOAQ_0038', 'F2_LAP_RICARDO', 'S2_NURIA_AMENAZAS', 'F2_CV_2327', 'F2_ZAPATO_ADN', 'F2_MENSAJE'],
    keyConflicts: ['C03', 'C04', 'C05', 'C06', 'C07', 'C08'],
    narrative: [
      'Irene Soler no cayó al río ni fue víctima de un crimen esa noche. Tras semanas de amenazas por su declaración ante la Fiscalía, decidió desaparecer y empezar de nuevo lejos. Lo preparó durante días: retiró 3.000 € en efectivo, compró una SIM de prepago, buscó vuelos a Lisboa y se llevó su pasaporte.',
      'El miércoles, su hermano Hugo se llevó en la furgoneta del taller una maleta con su ropa. El viernes a las 18:02, antes de la discusión con Álvaro, Irene programó en la tablet el mensaje de despedida para las 01:30.',
      'Tras la discusión llamó a Hugo para confirmar el plan (22:09), salió de casa (22:14) y pasó el peaje hacia el norte (22:58) para encontrarse con él en el área de servicio de El Puig. Volvieron hacia el sur por separado: el Clio a las 23:41 y la Transit a las 23:44. Desde un apartadero dejó el mensaje de voz a Álvaro (23:52); la voz masculina del fondo era Hugo.',
      'A las 00:19 llegó al puente y Hugo la siguió (00:31). Irene dejó el coche con los warnings, la puerta abierta, el bolso y una zapatilla colocada junto a la barandilla, sin desatar los cordones. La "persona con capucha" que vio Joaquín a las 00:38 era ella. A las 00:46 se fueron en la furgoneta hacia la A-3.',
      'A las 01:30 el mensaje programado salió desde su teléfono, ya en la A-3 a la altura de Chiva; lo apagó a las 01:34. Álvaro mintió sobre su salida por miedo: estuvo buscándola por Burjassot y Benimàmet. Ricardo tenía un móvil fuerte y una coartada sólida hasta las 00:40, pero no tuvo relación con la desaparición.'
    ]
  },
      trial: {
    voluntaria: [
      { id: 'O1', text: 'El coche abandonado, la zapatilla junto a la barandilla y el mensaje de despedida indican que Irene cayó o se arrojó al río.', accept: ['F2_ANT_IRENE', 'F2_TAB_PROG', 'F2_PASAPORTE', 'F2_BARANDILLA', 'F2_TAB_SYNC'] },
      { id: 'O2', text: 'El marido mintió sobre esa noche y es beneficiario de un seguro de 200.000 €. Debería ser el principal sospechoso.', accept: ['F2_ANT_ALV', 'F2_GS_0031', 'F2_GS_0046'] },
      { id: 'O3', text: 'Nadie pudo llevársela de allí: no hay ninguna prueba de otro vehículo en el puente.', accept: ['F2_PJ_2344', 'F2_GS_0031', 'F2_GS_0046', 'F2_ANT_HUGO', 'F2_NEUMATICO', 'S2_JOAQ_0038', 'F2_MARCAS'] }
    ],
    generic: [
      { id: 'O1', text: 'Ningún registro sitúa a la persona señalada con Irene después de las 22:14.', accept: [] },
      { id: 'O2', text: 'La acusación no explica por qué el teléfono de Irene estaba en la A-3 a las 01:30.', accept: [] },
      { id: 'O3', text: 'La acusación no explica por qué falta su pasaporte ni por qué el mensaje se programó a las 18:02.', accept: [] }
    ]
  },
      trialIntro: {
    voluntaria: 'Audiencia sobre la línea de investigación. La acusación particular, en nombre de la familia de Álvaro, sostiene que Irene fue víctima de un delito.'
  }
    },

    /* ---------- Versión 2: el marido ---------- */
    alvaro: {
      facts: {
        F2_ZAPATO: { text: 'Zapatilla izquierda de Irene al pie de la barandilla, volcada, con los cordones desatados y barro en la suela.', place: 'puente', source: 'escena', tags: ['zapato', 'rio'] },
        F2_LUPA_ZAPATO: { text: 'Lupa: barro del arcén en la suela y un roce reciente en la puntera, como de un arrastre.', source: 'escena', tags: ['zapato', 'rio'] },
        F2_BARANDILLA: { text: 'La película de polvo de la barandilla tiene roces recientes a la altura de la cintura; en el suelo, una uña postiza rota.', place: 'puente', source: 'escena', tags: ['rio', 'barandilla'] },
        F2_BARANDILLA_FIBRAS: { text: 'Fibras de forro polar negro enganchadas en una arista del pretil.', source: 'laboratorio', tags: ['fibra', 'barandilla'] },
        F2_LUMINOL_BARANDILLA: { text: 'Luminol: reacción débil en el pretil, a la altura de la cintura: restos de sangre.', place: 'puente', source: 'laboratorio', tags: ['barandilla', 'sangre', 'rio'] },
        F2_MARCAS: { text: 'A seis metros detrás del Clio, huella parcial de un neumático ancho de todoterreno, distinto de los del Clio.', place: 'puente', source: 'escena', tags: ['vehiculo', 'neumatico'] },
        F2_NEUMATICO: { pericia: { type: 'neumatico', match: 'todoterreno', label: 'marcas del arcén' }, text: 'El neumático es de medida 225/65 R17, habitual en todoterrenos compactos (RAV4, Tucson, Qashqai…). Compatible con muchos modelos.', source: 'laboratorio', tags: ['vehiculo', 'neumatico'] },
        F2_PASAPORTE: { text: 'En la carpeta de documentos del dormitorio están los pasaportes de Irene y de Álvaro.', place: 'paterna', source: 'escena', tags: ['pasaporte', 'documento'] },
        F2_POLVO_CARPETA: { prints: [{ at: 'Carpeta · cierre', match: 'irene' }, { at: 'Carpeta · solapa', match: 'alvaro' }], text: 'Polvo revelador: huellas de Irene y de Álvaro en la carpeta; el pasaporte de Irene sigue dentro.', source: 'laboratorio', tags: ['pasaporte', 'huella'] },
        F2_ARMARIO: { text: 'El armario de Irene está completo y la maleta pequeña sigue en el altillo.', place: 'paterna', source: 'escena', tags: ['maleta', 'ropa'] },
        F2_TIQUES: { text: 'Tiques en la papelera: la compra semanal del supermercado y una farmacia.', source: 'documento', tags: ['dinero'] },
        F2_FIN_EFECTIVO: { text: 'Cuentas de Irene: movimientos habituales, sin retiradas extraordinarias de efectivo.', person: 'irene', source: 'documento', tags: ['dinero'] },
        F2_FIN_HUGO: { text: 'No hay transferencias entre Hugo e Irene en los últimos meses.', person: 'hugo', source: 'documento', tags: ['dinero'] },
        F2_TAB_PROG: { text: 'Tablet: el mensaje «Lo siento. No me busquéis. Es mejor así.» se redactó y programó el viernes 9/10 a las 23:21 para enviarse a las 01:30.', time: '23:21', person: 'irene', place: 'paterna', source: 'dispositivo', tags: ['mensaje', 'tablet'] },
        F2_TAB_SYNC: { text: 'La tablet estaba en casa: el mensaje programado salió desde la tablet, no desde el teléfono. Además, la tablet tiene activa la ubicación compartida del teléfono de Irene y se consultó a las 00:12.', time: '00:12', place: 'paterna', source: 'dispositivo', tags: ['tablet', 'mensaje', 'ubicacion'] },
        F2_TAB_BUSQ: { text: 'Historial de la tablet (semana anterior), con la sesión de Irene: «abogado divorcio Valencia», «separación de bienes seguro de vida».', person: 'irene', source: 'dispositivo', tags: ['tablet', 'divorcio'] },
        F2_ANT_IRENE: { text: 'Antenas del teléfono de Irene: El Puig de 23:02 a 23:38; zona del puente de 00:15 a 00:41. Después, el teléfono deja de conectar.', time: '00:15', end: '00:41', person: 'irene', place: 'puente', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F2_ANT_HUGO: { text: 'Antenas del teléfono de Hugo: Sagunto toda la noche; llamadas sin respuesta a Irene a las 23:10 y a las 00:20.', time: '22:00', end: '02:00', person: 'hugo', place: 'sagunto', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F2_ANT_ALV: { text: 'Antenas del teléfono de Álvaro: Paterna de 23:30 a 00:20; zona del puente de 00:25 a 00:50; Paterna desde la 01:00. No conecta con Burjassot ni con Benimàmet.', time: '00:25', end: '00:50', person: 'alvaro', place: 'puente', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F2_LL_0130: { text: 'Cuenta de Irene: se envía el mensaje de despedida a Álvaro.', time: '01:30', person: 'irene', source: 'mensaje', tags: ['mensaje'] },
        F2_LL_0134: { text: 'Línea de Irene: último registro de red del teléfono.', time: '00:41', person: 'irene', source: 'registro', tags: ['telefono'] },
        F2_GS_0031: { text: 'Cámara de la gasolinera: un todoterreno oscuro pasa hacia el puente. Matrícula no legible.', time: '00:31', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F2_GS_0046: { text: 'Cámara de la gasolinera: el todoterreno oscuro vuelve del puente en dirección a Paterna.', time: '00:47', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F2_PJ_2344: { text: 'Peaje del Molinar: tras el Clio pasan un camión de reparto y dos turismos. Ningún vehículo de las personas del expediente.', time: '23:44', place: 'peaje', source: 'registro', tags: ['peaje', 'vehiculo'] },
        F2_AUDIO_FONDO: { text: 'Fondo del mensaje: el motor del propio coche y la radio a bajo volumen. No hay otras voces.', time: '23:52', source: 'laboratorio', tags: ['audio'] },
        S2_JOAQ_0038: { kind: 'statement', text: 'Joaquín vio en el puente el coche con warnings, un todoterreno oscuro detrás con las luces apagadas y un hombre con capucha junto a la barandilla.', time: '00:38', person: 'joaquin', place: 'puente', source: 'testigo', tags: ['testigo', 'vehiculo'] },
        S2_JOAQ_DUDA: { kind: 'statement', text: 'Joaquín está seguro de que la persona de la barandilla era un hombre corpulento.', person: 'joaquin', source: 'testigo', tags: ['testigo'] },
        S2_CARMEN_MALETA: { kind: 'statement', text: 'Carmen oyó el miércoles otra discusión fuerte: Álvaro gritaba que «no se iba a quedar sin nada».', person: 'alvaro', source: 'testigo', tags: ['testigo', 'discusion'] },
        S2_NURIA_PREGUNTA: { kind: 'statement', text: 'Nuria declara que Irene le dijo que quería separarse y que tenía miedo de cómo se lo tomaría Álvaro.', person: 'nuria', source: 'declaración', tags: ['divorcio'] },
        S2_HUGO_ULTIMO: { kind: 'statement', text: 'Hugo declara que Irene le llamó a las 22:09 llorando y que le dijo que fuera a su casa de Sagunto.', time: '22:09', person: 'hugo', source: 'declaración', tags: ['contacto', 'llamada'] },
        S2_HUGO_RUIDO: { kind: 'statement', text: 'Hugo dice que en la llamada de las 22:09 Irene lloraba y quería ir a su casa.', time: '22:09', person: 'hugo', source: 'declaración', tags: ['llamada'] },
        S2_HUGO_GRUA: { kind: 'statement', text: 'Hugo dice que esa noche no salió de Sagunto.', person: 'hugo', place: 'sagunto', source: 'declaración', tags: ['coartada'] },
        S2_HUGO_SILENCIO: { kind: 'statement', text: 'Hugo explica que llamó a Irene a las 23:10 y a las 00:20 porque no llegaba.', person: 'hugo', source: 'declaración', tags: ['llamada'] },
        F2_G_NAVEGADOR: { text: 'Navegador del RAV4 de Álvaro: el historial de trayectos se borró manualmente el sábado 10/10 por la mañana. No queda ningún recorrido del viernes.', person: 'alvaro', place: 'paterna', source: 'dispositivo', tags: ['vehiculo', 'ubicacion'] },
        F2_G_BAJOS: { text: 'Revisión del RAV4: barro arcilloso con restos de caña en los pasos de rueda y en el dibujo de los neumáticos. El kilometraje del viernes es compatible con un viaje de ida y vuelta al puente.', person: 'alvaro', source: 'laboratorio', tags: ['vehiculo', 'neumatico'] },
        F2_G_BOLSA: { text: 'En el trastero, la bolsa de deporte de Álvaro: una sudadera negra con capucha, todavía húmeda, y unas zapatillas con barro en la suela.', person: 'alvaro', place: 'paterna', source: 'escena', tags: ['ropa', 'calzado'] },
        F2_G_SUELO: { text: 'Comparativa de suelos: el barro de las zapatillas de Álvaro es arcilla con restos de caña, compatible con el arcén del puente. Es común en la ribera: no es exclusiva de ese punto.', person: 'alvaro', source: 'laboratorio', tags: ['calzado', 'rio'] },
        F2_REG_ALV_POLAR: { text: 'Registro del domicilio de Álvaro: en el tambor de la lavadora, un forro polar negro recién lavado, con un desgarro en el puño derecho del que faltan fibras.', person: 'alvaro', place: 'paterna', source: 'registro', tags: ['fibra', 'ropa', 'registro'] },
        F2_REG_ALV_CALCULOS: { text: 'Registro del domicilio de Álvaro: en el cajón de su mesilla, una hoja manuscrita con cálculos: «piso 50 % − hipoteca», «seguro: 200.000», «si se va, nada».', person: 'alvaro', place: 'paterna', source: 'registro', tags: ['seguro', 'dinero', 'divorcio', 'registro'] },
        F2_REG_HUGO_CAJA: { text: 'Registro del taller de Hugo en Sagunto: en un cajón, 1.800 € en efectivo y un cuaderno con reparaciones cobradas sin factura.', person: 'hugo', place: 'sagunto', source: 'registro', tags: ['dinero', 'registro'] }
      },
      planted: [
        { ev: 'V01', label: 'mensaje de despedida falsificado', tells: ['F2_TAB_PROG', 'F2_TAB_SYNC'] }
      ],
      lineups: [
        { id: 'L1', witness: 'joaquin', saw: 'a la persona con capucha que estaba junto a la barandilla del puente hacia las 00:38, de noche, durante unos segundos y desde la cabina de su camión', target: 'alvaro', quality: 0.5, requires: 'S2_JOAQ_0038' }
      ],
      searches: {
        alvaro: { place: 'el domicilio de Álvaro en Paterna', facts: ['F2_REG_ALV_POLAR', 'F2_REG_ALV_CALCULOS'] },
        hugo: { place: 'el taller y la furgoneta de Hugo en Sagunto', facts: ['F2_REG_HUGO_CAJA'] },
        ricardo: { place: 'el domicilio de Ricardo Albiol en Rocafort', facts: ['F2_REG_RIC'] }
      },
      evidence: {
        P03: { detail: 'Zapatilla izquierda, volcada junto a la barandilla, con los cordones desatados y barro en la suela.' },
        P04: { detail: 'La barandilla tiene roces recientes en la película de polvo, a la altura de la cintura. En el suelo hay una uña postiza rota.' },
        P05: { detail: 'A seis metros detrás del Clio, barro con la huella parcial de un neumático ancho, de dibujo de todoterreno.' },
        V02: { detail: 'Libro de familia, escrituras y los dos pasaportes, el de Álvaro y el de Irene.' },
        V03: { detail: 'Armario ordenado; la maleta pequeña sigue en el altillo.' },
        V05: { detail: 'Tiques arrugados: la compra semanal y una farmacia.' },
        G01: { detail: 'Todoterreno negro aparcado en su plaza, con barro seco en los pasos de rueda. El navegador no muestra trayectos recientes.' },
        G02: { detail: 'Bolsa de deporte de Álvaro: una sudadera negra con capucha, aún húmeda, y unas zapatillas con barro en la suela.' }
      },
      answers: {
        alvaro: { discusion: { type: 'mentira' } },
        hugo: {
          noche: { type: 'verdad' },
          ultimo: { a: 'El viernes a las diez me llamó llorando. Le dije que se viniera a casa. No llegó nunca.', type: 'verdad' },
          problemas: { a: 'Me dijo que quería dejar a Álvaro y que tenía miedo de decírselo.', type: 'verdad' }
        },
        joaquin: {
          vio: { a: 'Pasé sobre las doce y cuarenta en sentido contrario. Había un coche blanco con los warnings y, detrás, un todoterreno oscuro con las luces apagadas. Junto a la barandilla, un hombre con capucha. A las dos menos diez volví a pasar: solo quedaba el coche. Entonces llamé.' },
          hombre: { a: 'Era un hombre, de eso sí estoy seguro: grande, corpulento.', type: 'verdad' }
        },
        carmen: { irene: { a: 'Estaba muy reservada. El miércoles oí otra discusión fuerte; él gritaba que no se iba a quedar sin nada.' } },
        nuria: {
          raro: { a: 'Me dijo que quería separarse y que tenía miedo de cómo se lo tomaría Álvaro. Ya había mirado abogados.' },
          problemas: { a: 'Lo de la Fiscalía la tenía nerviosa, sí. Pero lo que más le preocupaba era Álvaro. Quería separarse.', type: 'verdad' }
        }
      },
      confront: {
        alvaro: {
          F2_ANT_ALV: { a: 'Pasaría cerca del puente buscándola. No la encontré.', reveals: [] },
          F2_TAB_PROG: { a: 'Yo no programé nada. La tablet es suya.', reveals: [] },
          F2_TAB_SYNC: { a: 'Miré dónde estaba porque estaba preocupado. ¿Eso es delito?', reveals: [] },
          F2_TAB_BUSQ: { a: '¿Divorcio? No sabía nada de eso.', reveals: [] },
          F2_GS_0031: { a: 'Hay miles de todoterrenos oscuros.', reveals: [] },
          F2_LUMINOL_BARANDILLA: { a: 'Se caería. Estaba muy mal.', reveals: [] },
          F2_PASAPORTE: { a: 'Ahí está, ¿lo ve? No se iba a ninguna parte.', reveals: [] }
        },
        hugo: {
          F2_LL_2209: { a: 'Me llamó llorando. Quería venirse a mi casa.', reveals: ['S2_HUGO_RUIDO'] },
          F2_PJ_2344: { a: 'Yo no pasé por ese peaje. No salí de Sagunto.', reveals: ['S2_HUGO_GRUA'] },
          F2_ANT_HUGO: { a: 'La llamé dos veces porque no llegaba. No contestó.', reveals: ['S2_HUGO_SILENCIO'] },
          F2_FIN_HUGO: { a: 'No le he dado dinero. ¿Por qué iba a hacerlo?', reveals: [] },
          S2_CARMEN_MALETA: { a: 'A mí no me contó lo de esa discusión, pero no me extraña.', reveals: [] },
          F2_GS_0031: { a: 'Yo tengo una furgoneta, no un todoterreno.', reveals: [] },
          F2_NEUMATICO: { a: 'Esa medida es de todoterreno, no de mi furgoneta.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'CV1', a: 'S2_ALV_SALIO', b: 'F2_ANT_ALV', type: 'Lugar distinto', severity: 'alta', desc: 'Álvaro dice que buscó a Irene por Burjassot y Benimàmet; su teléfono conecta con la antena del puente de 00:25 a 00:50 y nunca con esas zonas.' },
        { id: 'CV2', a: 'F2_TAB_PROG', b: 'F2_CV_2214', type: 'Secuencia incompatible', severity: 'alta', desc: 'El mensaje de despedida se programó en la tablet de casa a las 23:21; Irene se había ido a las 22:14.' },
        { id: 'CV3', a: 'F2_LL_0130', b: 'F2_LL_0134', type: 'Secuencia incompatible', severity: 'alta', desc: 'El mensaje de despedida se envía a las 01:30, pero el teléfono de Irene no tiene red desde las 00:41.' },
        { id: 'CV4', a: 'S2_ALV_BUZON', b: 'F2_TAB_SYNC', type: 'Hecho omitido', severity: 'media', desc: 'Álvaro no menciona que a las 00:12 consultó en la tablet la ubicación compartida del teléfono de Irene.' }
      ],
      truth: {
        culprit: 'alvaro', motive: 'v_pareja', method: 'me_rio', window: 'w_puente', accomplices: [],
        partialMethods: { me_caida: 'Viste la caída al río, pero no que alguien la provocó.' },
        decisive: ['F2_TAB_PROG', 'F2_CV_2214', 'F2_ANT_ALV', 'F2_GS_0031', 'F2_GS_0046', 'F2_NEUMATICO', 'F2_BARANDILLA', 'F2_LUMINOL_BARANDILLA', 'F2_LL_0134', 'F2_TAB_SYNC', 'F2_TAB_BUSQ', 'S2_CARMEN_MALETA', 'F2_CV_2327', 'F2_CV_0112', 'S2_JOAQ_0038', 'F2_BARANDILLA_FIBRAS', 'F2_PASAPORTE', 'S2_NURIA_PREGUNTA'],
        weak: ['F2_LAP_RICARDO', 'S2_NURIA_AMENAZAS', 'F2_PJ_2344', 'F2_LL_2209', 'F2_NOTA', 'F2_ZAPATO_ADN', 'F2_MENSAJE', 'F2_LAP_AMENAZA'],
        keyConflicts: ['CV1', 'CV2', 'CV3'],
        narrative: [
          'Álvaro Pons mató a su mujer. Irene quería separarse: había buscado abogados y se lo había contado a Nuria. El miércoles discutieron y Carmen le oyó gritar que "no se iba a quedar sin nada". Irene tenía un seguro de vida de 200.000 € a su nombre.',
          'El viernes, tras otra discusión, Irene llamó llorando a su hermano Hugo (22:09) y salió hacia Sagunto (22:14). En El Puig se lo pensó durante media hora y dio la vuelta (peaje sur a las 23:41). Le dejó a Álvaro un mensaje de voz desde el coche (23:52) y fue al puente, un sitio al que solía ir a pensar.',
          'En casa, Álvaro programó en la tablet de Irene, a las 23:21, el mensaje de despedida para la 01:30, y salió a las 23:27. A las 00:12 consultó en la tablet la ubicación compartida de su teléfono. Llegó al puente en su RAV4 (gasolinera, 00:31) y aparcó detrás del Clio con las luces apagadas.',
          'Discutieron junto a la barandilla. Hacia las 00:40 la empujó al río; la uña rota, los roces, las fibras de su forro polar y la sangre del pretil son de ese forcejeo. El teléfono cayó con ella y dejó de conectar a las 00:41. Joaquín pasó a las 00:38 y vio a un hombre corpulento con capucha. Álvaro volvió a casa a la 01:12; a la 01:30 la tablet envió sola el mensaje.',
          'Hugo dijo la verdad: estuvo en Sagunto esperándola. Ricardo tenía un móvil para silenciar a una testigo y envió un correo inquietante, pero estaba en el centro de Valencia. El cuerpo no ha aparecido todavía.'
        ]
      },
      trial: {
        alvaro: [
          { id: 'O1', text: 'Mi cliente estuvo buscando a su mujer por Burjassot y Benimàmet.', accept: ['F2_ANT_ALV', 'F2_GS_0031', 'F2_GS_0046', 'F2_NEUMATICO'] },
          { id: 'O2', text: 'Irene se quitó la vida: dejó un mensaje de despedida.', accept: ['F2_TAB_PROG', 'F2_LL_0134', 'F2_TAB_SYNC'] },
          { id: 'O3', text: 'No hay cuerpo ni ninguna señal de violencia.', accept: ['F2_LUMINOL_BARANDILLA', 'F2_BARANDILLA', 'F2_BARANDILLA_FIBRAS', 'S2_JOAQ_0038'] }
        ],
        generic: [
          { id: 'O1', text: 'Ningún registro sitúa a la persona señalada en el puente esa noche.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién programó el mensaje en la tablet de casa a las 23:21.', accept: [] },
          { id: 'O3', text: 'La acusación no explica qué todoterreno estuvo en el puente entre las 00:31 y las 00:47.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['alvaro', 'irene'],
        spatialBonus: ['F2_ANT_ALV', 'F2_GS_0031'],
        temporalConflicts: ['CV2', 'CV3'],
        lateral: [
          { type: 'fact', id: 'S2_CARMEN_MALETA', pts: 20, yes: 'Preguntaste a la vecina por los días previos, no solo por la noche.', no: 'No exploraste los días previos a la desaparición.' },
          { type: 'conflict', id: 'CV2', pts: 30, yes: 'Viste que el mensaje se programó cuando Irene ya no estaba en casa.', no: 'No comprobaste cuándo y dónde se programó el mensaje de despedida.' },
          { type: 'conflict', id: 'CV3', pts: 25 },
          { type: 'chosen', id: 'F2_TAB_SYNC', pts: 25 }
        ]
      }
    }
  }
});
