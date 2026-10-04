/* EXPEDIENTE 0 — Caso EXP-006 «Ceniza en El Collet».
 * Única fuente de verdad del caso. Incendio de una nave de muebles con el vigilante
 * muerto dentro. Tres versiones: cambia dónde y cómo empezó el fuego, si el vigilante
 * estaba vivo cuando empezó y quién lo provocó. Todo es ficticio. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-006',
  title: 'Ceniza en El Collet',
  type: 'Incendio provocado con víctima',
  difficulty: 'Extrema',
  minRank: 5,
  budget: 1700,
  location: 'Muebles Ferrús · Polígono El Collet, parcela 14 · Onda (Castellón)',
  date: 'Noche del viernes 16 al sábado 17 de octubre de 2026',
  victim: {
    id: 'gabriel',
    name: 'Gabriel Rius Monfort',
    age: 61,
    job: 'Vigilante nocturno de Muebles Ferrús desde 2014'
  },
  deathWindow: 'Entre la 01:00 y las 03:30 (estimación preliminar en el lugar)',
  briefing: [
    'A las 02:52 del sábado 17 de octubre, un camionero avisa al 112 de que ve llamas en el polígono El Collet. Cuando llegan los bomberos, la nave A de Muebles Ferrús, el taller de la empresa, arde por completo.',
    'A las 05:40, con el fuego ya apagado, aparece dentro de la nave el cuerpo de Gabriel Rius, el vigilante de noche, junto a la puerta del despacho.',
    'La empresa está endeudada y amplió el seguro en julio. El vecino de la finca de al lado acaba de perder un pleito contra ella y esa noche quemó rastrojos junto a la valla. Un empleado tiene deudas de juego. La hermana del dueño quería vender. Todos tienen algo que callar.',
    'En un incendio el fuego borra y confunde. Que alguien tuviera motivos no prueba que lo hiciera. Averigua dónde empezó el fuego, con qué y a qué hora, y si Gabriel estaba vivo cuando empezó.'
  ],
  initialFacts: ['F6_AVISO', 'F6_BOMBEROS', 'F6_HALLAZGO', 'F6_VENTANA'],
  sceneSummary: 'Parcela vallada con dos naves: la A (taller, despacho y cabina de barnizado), calcinada, y la B (almacén), intacta. Caseta del vigilante junto a la verja, que tiene cámara. Detrás, un camino sin cámara y una valla con la finca del vecino.',

  mapScale: 0.04,
  places: {
    nave: { name: 'Muebles Ferrús · parcela 14, polígono El Collet', x: 50, y: 40, kind: 'escena' },
    finca: { name: 'Finca de Andrés Peñarroja (pared con pared con la parcela)', x: 58, y: 32, kind: 'domicilio' },
    camino: { name: 'Camino trasero de la parcela', x: 52, y: 30, kind: 'calle' },
    gasolinera: { name: 'Gasolinera de la CV-20', x: 30, y: 62, kind: 'comercio' },
    onda: { name: 'Onda (casco urbano)', x: 12, y: 86, kind: 'municipio' },
    vilareal: { name: 'Nave de alquiler · polígono de Vila-real', x: 92, y: 92, kind: 'nave', offmap: '≈ 15 km' },
    castellon: { name: 'Castellón de la Plana (oficina de Héctor)', x: 96, y: 96, kind: 'oficina', offmap: '≈ 20 km' }
  },

  people: [
    {
      id: 'salvador', name: 'Salvador Ferrús Vidal', initials: 'SF', age: 58,
      role: 'Dueño y gerente (60 %)', relation: 'Patrono de Gabriel; cerró la nave esa tarde',
      hidden: { honestidad: 40, miedo: 55, manipulacion: 65, autocontrol: 70, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Gabriel?', a: 'Doce años con nosotros. Era de la casa. No sé cómo se lo voy a explicar a Pilar.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'Cerré a las nueve menos diez, cené en Onda con mi mujer y unos amigos hasta casi la una y me fui a dormir.', type: 'verdad', reveals: ['S6_SAL_CENA'] },
        { id: 'llamada', q: '¿Le llamó o le escribió Gabriel esa noche?', a: 'No, nada.', type: 'verdad', reveals: ['S6_SAL_LLAMADA'] },
        { id: 'poliza', q: '¿Por qué amplió la póliza en julio?', a: 'Porque el agente me dijo que estábamos infraasegurados. Habíamos metido maquinaria nueva.', type: 'verdad', reveals: ['S6_SAL_POLIZA'] },
        { id: 'maquinas', q: '¿Faltaba algo en la nave antes del incendio?', a: 'No. Todo estaba en su sitio.', type: 'verdad', reveals: ['S6_SAL_TODO'] },
        { id: 'furgo', q: '¿Quién usa la furgoneta de la empresa?', a: 'Los repartidores, de día. Yo no la cojo desde hace meses.', type: 'verdad', reveals: ['S6_SAL_FURGO'] },
        { id: 'estufa', q: '¿Había algo enchufado en el despacho?', a: 'La estufa, con uno de esos enchufes que se manejan desde el móvil. La apago siempre al irme.', type: 'verdad', reveals: ['S6_SAL_ESTUFA'] },
        { id: 'gasoil', q: '¿Guarda combustible en algún sitio?', a: 'En el huerto de Betxí tengo un tractor pequeño y un depósito de gasóleo agrícola. En la nave, nada.', type: 'verdad', reveals: ['S6_SAL_GASOLEO'] },
        { id: 'detector', q: 'El detector de humo de la nave A estaba averiado desde el día 3.', requires: ['F6_CRA_AVERIA'], a: 'Llamé al técnico. Venía el lunes.', type: 'media', reveals: ['S6_SAL_TECNICO'] },
        { id: 'vecino', q: '¿Qué relación tenían con el vecino?', a: 'Mala. Nos ha denunciado siete veces por el serrín y el ruido. En agosto le dijo a Gabriel que un día la nave iba a arder.', type: 'verdad', reveals: ['S6_SAL_VECINO'] }
      ],
      confront: {
        F6_FIN_POLIZA: { a: 'Todo legal. Pregunte al agente.', reveals: [] },
        F6_FIN_SALVADOR: { a: 'Tengo deudas, como media empresa del polígono. Eso no me convierte en un pirómano.', reveals: [] },
        F6_CRA_AVERIA: { a: 'El técnico venía el lunes. Ya se lo he dicho.', reveals: [] },
        F6_VJ_INES: { a: '¿Mi hermana estuvo allí esa noche? No tenía ni idea.', reveals: [] }
      },
      confrontDefault: 'Eso no tiene nada que ver conmigo.'
    },
    {
      id: 'ines', name: 'Inés Ferrús Vidal', initials: 'IF', age: 54,
      role: 'Hermana de Salvador y socia (40 %)', relation: 'No trabaja en la empresa; quería venderla',
      hidden: { honestidad: 55, miedo: 50, manipulacion: 40, autocontrol: 65, confianza: 45 },
      questions: [
        { id: 'rel', q: '¿Qué papel tiene en la empresa?', a: 'Soy socia, pero hace años que no piso el taller. Mi hermano lo lleva a su manera.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En mi casa, en Onda, toda la noche.', type: 'mentira', reveals: ['S6_INE_CASA'] },
        { id: 'venta', q: '¿Qué opina de la oferta de la cooperativa?', a: 'Que había que aceptarla. Salvador decía que no. Ahora, con la nave quemada, a saber.', type: 'verdad', reveals: ['S6_INE_VENTA'] },
        { id: 'hermano', q: '¿Notó algo raro en su hermano estos días?', a: 'Estaba nervioso, como siempre que hay problemas de dinero.', type: 'verdad', reveals: [] },
        { id: 'gabriel', q: '¿Conocía bien a Gabriel?', a: 'Era un buen hombre. Siempre me echaba una mano con los muebles de mi madre, que guardamos en la nave B.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F6_VJ_INES: { a: 'Está bien. Fui a la nave B a por los muebles de mi madre: una cómoda y dos sillas. Gabriel me ayudó a cargarlos. A las once menos cinco me fui. No se lo dije porque no quería problemas con mi hermano.', reveals: ['S6_INE_MUEBLES'] },
        F6_LIBRO: { a: 'Sí, Gabriel lo apuntó todo. Fui a por los muebles de mi madre a la nave B y me fui antes de las once.', reveals: ['S6_INE_MUEBLES'] },
        F6_CRA_NAVEB: { a: 'Desconecté la alarma de la nave B con mi código, sí. Fui a por los muebles de mi madre.', reveals: ['S6_INE_MUEBLES'] },
        F6_GAS_INES: { a: 'Pasé por la gasolinera, sí. Iba a la nave B a por unos muebles.', reveals: ['S6_INE_MUEBLES'] },
        F6_FIN_INES: { a: 'La oferta seguía en pie. Mi hermano no quería ni oír hablar de ella.', reveals: [] }
      },
      confrontDefault: 'No sé de qué me habla.'
    },
    {
      id: 'andres', name: 'Andrés Peñarroja Gil', initials: 'AP', age: 67,
      role: 'Vecino de la finca de al lado', relation: 'Agricultor jubilado; en pleito con la empresa desde 2023',
      hidden: { honestidad: 45, miedo: 40, manipulacion: 35, autocontrol: 30, confianza: 35 },
      questions: [
        { id: 'rel', q: '¿Qué relación tiene con Muebles Ferrús?', a: 'Llevo cuarenta años en esa finca. Ellos llegaron después, con su serrín y sus máquinas.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Qué hizo esa noche?', a: 'Quemé unos rastrojos a las diez, con permiso. Gabriel vino a protestar, como siempre. Los apagué y a las once me acosté. Me despertaron las sirenas a las tres y diez.', type: 'verdad', reveals: ['S6_AND_DORMIA'] },
        { id: 'camara', q: '¿Tiene cámaras en la finca?', a: 'Una, apuntando a su extractor, para el juicio. Grabó toda la noche: ahí verán que yo no me moví.', type: 'verdad', reveals: ['S6_AND_CAMARA'] },
        { id: 'amenaza', q: '¿Dijo que la nave iba a arder?', a: 'Dije que un día aquello iba a arder, con tanto serrín y tanta chapuza. Era un aviso, no una amenaza.', type: 'media', reveals: ['S6_AND_AVISO'] },
        { id: 'gasoil', q: '¿Tiene combustible en la finca?', a: 'Gasóleo agrícola para el tractor, en un depósito del almacén. Como todo el mundo aquí.', type: 'verdad', reveals: ['S6_AND_GASOLEO'] },
        { id: 'juicio', q: '¿Cómo va el pleito con la empresa?', a: 'Lo perdí la semana pasada. Me condenaron en costas: seis mil euros por quejarme de que me ensucian la tierra.', type: 'verdad', reveals: ['S6_AND_SENTENCIA'] },
        { id: 'valla', q: '¿Usa el hueco de la valla?', a: 'Ese hueco lo hicieron los perros hace años. Yo no paso por ahí.', type: 'verdad', reveals: ['S6_AND_HUECO'] }
      ],
      confront: {
        F6_FIN_ANDRES: { a: 'Seis mil euros. ¿Usted sabe lo que es eso para un jubilado?', reveals: [] },
        F6_RASTROJOS: { a: 'Los apagué con la manguera antes de las once menos cuarto. Gabriel lo vio.', reveals: [] },
        F6_CV_RASTROJOS: { a: 'Ahí lo tiene: discutimos, apagué el fuego y me fui a dormir.', reveals: [] },
        S6_SAL_VECINO: { a: 'Lo dije, sí. Y mire.', reveals: [] }
      },
      confrontDefault: 'Eso pregúnteselo a ellos.'
    },
    {
      id: 'oscar', name: 'Óscar Llorens Badenes', initials: 'ÓL', age: 34,
      role: 'Oficial de carpintería', relation: 'Empleado desde 2020; lleva el inventario de herramientas',
      hidden: { honestidad: 45, miedo: 70, manipulacion: 50, autocontrol: 40, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Gabriel?', a: 'Buena. Llevo seis años en el taller. A veces, si llegaba pronto, le llevaba un café.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En casa, en Onda. Jugando a la consola en línea hasta las tantas.', type: 'verdad', reveals: ['S6_OSC_CASA'] },
        { id: 'llave', q: '¿Tiene llave de la nave?', a: 'De la puerta pequeña del taller, para abrir cuando llego antes. Nada más.', type: 'verdad', reveals: ['S6_OSC_LLAVE'] },
        { id: 'deudas', q: '¿Tiene deudas?', requires: ['F6_FIN_OSCAR'], a: 'Unos préstamos rápidos. Los estoy pagando.', type: 'media', reveals: ['S6_OSC_DEUDAS'] },
        { id: 'herramientas', q: '¿Faltaban herramientas en el taller?', a: 'Que yo sepa, no. El inventario de herramientas lo llevo yo y estaba bien.', type: 'verdad', reveals: ['S6_OSC_HERRAMIENTAS'] },
        { id: 'ventas', q: '¿Qué vende por internet?', requires: ['F6_FIN_VENTAS'], a: 'Cosas mías: una moto y una consola. Necesitaba el dinero.', type: 'verdad', reveals: ['S6_OSC_VENTAS'] },
        { id: 'cabina', q: '¿Qué había en la cabina de barnizado?', a: 'Latas de disolvente nitro, barnices y un bidón de veinticinco litros. Todo muy inflamable. Se lo dije cien veces a Salvador.', type: 'verdad', reveals: ['S6_OSC_CABINA'] }
      ],
      confront: {
        F6_FIN_OSCAR: { a: 'Lo de las apuestas ya lo estoy arreglando. No tiene nada que ver con esto.', reveals: [] }
      },
      confrontDefault: 'Yo no sé nada.'
    },
    {
      id: 'pilar', name: 'Pilar Monfort Ruiz', initials: 'PM', age: 59,
      role: 'Viuda de Gabriel', relation: 'Casada con él desde 1991; hablaban cada noche durante el turno',
      hidden: { honestidad: 80, miedo: 45, manipulacion: 10, autocontrol: 45, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Cuánto tiempo llevaban casados?', a: 'Treinta y cinco años. Me llamaba todas las noches desde la caseta.', type: 'verdad', reveals: [] },
        { id: 'llamada', q: '¿Habló con él esa noche?', a: 'A la una y diez, como siempre. Me dijo que todo estaba tranquilo y que el vecino había vuelto a quemar rastrojos.', type: 'verdad', reveals: ['S6_PIL_LLAMADA'] },
        { id: 'costumbre', q: '¿Gabriel dormía durante el turno?', a: 'Nunca. Era muy serio con su trabajo. Hacía la ronda cada hora y media.', type: 'verdad', reveals: ['S6_PIL_NODORMIA'] },
        { id: 'raro', q: '¿Le había contado algo raro del trabajo?', a: 'Que en la nave pasaban cosas raras últimamente, pero no quiso entrar en detalles.', type: 'verdad', reveals: ['S6_PIL_RARO'] },
        { id: 'enemigos', q: '¿Tenía Gabriel problemas con alguien?', a: 'Con el vecino discutía cada dos por tres por las quemas. Pero Gabriel no se peleaba con nadie.', type: 'verdad', reveals: ['S6_PIL_VECINO'] }
      ],
      confront: {
        F6_TG_PILAR: { a: 'Esa es nuestra llamada de cada noche. La última.', reveals: [] }
      },
      confrontDefault: 'Eso no lo sé.'
    },
    {
      id: 'hector', name: 'Héctor Aguiló Ten', initials: 'HA', age: 46,
      role: 'Agente de seguros', relation: 'Lleva los seguros de Muebles Ferrús desde 2015',
      hidden: { honestidad: 45, miedo: 60, manipulacion: 55, autocontrol: 60, confianza: 55 },
      questions: [
        { id: 'rel', q: '¿Desde cuándo trabaja con Muebles Ferrús?', a: 'Desde 2015. Nave, maquinaria, responsabilidad civil y el seguro de los empleados.', type: 'verdad', reveals: [] },
        { id: 'ampliacion', q: '¿Cómo se decidió ampliar la póliza?', a: 'Lo hablamos Salvador y yo en junio y se firmó en julio.', type: 'verdad', reveals: ['S6_HEC_AMPLIACION'] },
        { id: 'inspeccion', q: '¿Hizo la inspección de riesgos?', a: 'Sí, en persona, en julio. Extintores revisados y detección de humo en funcionamiento.', type: 'mentira', reveals: ['S6_HEC_INSPECCION'] },
        { id: 'maquinaria', q: '¿Qué maquinaria estaba asegurada?', a: 'Escuadradora, chapadora, el CNC y la línea de barnizado. Casi seiscientos mil euros en maquinaria.', type: 'verdad', reveals: ['S6_HEC_MAQUINARIA'] },
        { id: 'parte', q: '¿Salvador ha dado parte del siniestro?', a: 'El sábado a las nueve de la mañana. Muy rápido, la verdad.', type: 'verdad', reveals: ['S6_HEC_PARTE'] }
      ],
      confront: {
        F6_CRA_AVERIA: { a: 'Bueno... La inspección la hice con fotos que me mandó Salvador. Es habitual. No me busque un problema.', reveals: ['S6_HEC_FOTOS'] },
        F6_FIN_POLIZA: { a: 'Todo en regla. La firmó él.', reveals: [] }
      },
      confrontDefault: 'De eso no puedo opinar.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'naveA', name: 'Nave A (taller)', legend: 'Nave de 600 m² calcinada · pila de palés en el exterior de la pared trasera',
        rooms: [
          { id: 'despacho', name: 'Despacho', x: 0, y: 0, w: 28, h: 35 },
          { id: 'cabina', name: 'Cabina de barnizado', x: 0, y: 35, w: 28, h: 30 },
          { id: 'chapa', name: 'Almacén de chapa', x: 0, y: 65, w: 28, h: 20 },
          { id: 'taller', name: 'Taller', x: 28, y: 0, w: 72, h: 85 },
          { id: 'patiotrasero', name: 'Patio trasero', x: 0, y: 85, w: 100, h: 15 }
        ],
        hotspots: [
          { ev: 'N01', x: 14, y: 20 }, { ev: 'N02', x: 22, y: 28 }, { ev: 'N03', x: 6, y: 8 },
          { ev: 'N05', x: 14, y: 50 }, { ev: 'N04', x: 50, y: 30 }, { ev: 'N13', x: 76, y: 56 },
          { ev: 'N06', x: 40, y: 90 }, { ev: 'N07', x: 62, y: 93 }
        ]
      },
      {
        id: 'parcela', name: 'Parcela y lindero', legend: 'Verja con cámara, caseta, nave B, camino trasero y finca de Andrés',
        rooms: [
          { id: 'explanada', name: 'Explanada', x: 0, y: 0, w: 50, h: 45 },
          { id: 'caseta', name: 'Caseta del vigilante', x: 50, y: 0, w: 20, h: 25 },
          { id: 'naveB', name: 'Nave B', x: 70, y: 0, w: 30, h: 45 },
          { id: 'caminotrasero', name: 'Camino trasero', x: 0, y: 45, w: 100, h: 20 },
          { id: 'valla', name: 'Valla trasera', x: 0, y: 65, w: 100, h: 10 },
          { id: 'finca', name: 'Finca de Andrés', x: 0, y: 75, w: 100, h: 25 }
        ],
        hotspots: [
          { ev: 'N14', x: 20, y: 20 }, { ev: 'N08', x: 56, y: 10 }, { ev: 'N09', x: 64, y: 18 },
          { ev: 'N11', x: 40, y: 55 }, { ev: 'N10', x: 60, y: 70 }, { ev: 'N12', x: 50, y: 88 }
        ]
      }
    ]
  },

  evidence: [
    { id: 'N01', name: 'Cuerpo de la víctima', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal de Castellón', room: 'Despacho',
      public: 'Restos de Gabriel junto a la puerta que da del despacho al taller.',
      detail: 'Cuerpo muy carbonizado, boca abajo, con los brazos encogidos por el calor. Lleva puesto el uniforme. El estado del cuerpo no permite ver lesiones a simple vista.',
      value: 'Saber si respiraba cuando empezó el fuego y de qué murió.', limits: 'El fuego produce lesiones que pueden confundirse con golpes.',
      reveals: ['F6_CUERPO'],
      lab: { autopsia: { cost: 320, reveals: ['F6_AUTOPSIA', 'F6_COHB'] } } },
    { id: 'N02', name: 'Extintor caído', type: 'Objeto', level: 3, model: 'bottle', room: 'Despacho',
      public: 'Extintor ennegrecido en el suelo del despacho.',
      detail: 'Extintor de polvo de 6 kg caído a medio metro del cuerpo, ennegrecido por el fuego.',
      value: 'Puede indicar si Gabriel intentó apagar el fuego.', limits: 'Pudo caerse de su soporte con el calor.',
      reveals: ['F6_EXTINTOR'],
      forensic: { lupa: { reveals: ['F6_EXTINTOR_LUPA'] } } },
    { id: 'N03', name: 'Estufa y enchufe del despacho', type: 'Objeto', level: 3, model: 'marker', room: 'Despacho',
      public: 'Restos metálicos bajo la mesa del despacho.',
      detail: 'Restos de una estufa eléctrica de resistencias y, en la toma de la pared, un enchufe inteligente con wifi, fundido.',
      value: 'Un aparato eléctrico encendido puede iniciar un fuego.', limits: 'Todo lo que había en el despacho está quemado.',
      reveals: ['F6_ESTUFA'], unlocks: ['D6_ENCHUFE'],
      lab: { peritaje: { cost: 220, label: 'Peritaje eléctrico', reveals: ['F6_ESTUFA_PERITAJE'] } } },
    { id: 'N04', name: 'Muestras de escombro', type: 'Escena', level: 2, model: 'trace', room: 'Taller',
      public: 'Zonas marcadas por los bomberos con cinta y números.',
      detail: 'Los bomberos han señalado varias zonas de carbonización profunda en el taller, la cabina de barnizado, el almacén de chapa y el despacho. Se han tomado muestras de cada una.',
      value: 'Dónde empezó el fuego y si se usó algún líquido para avivarlo.', limits: 'El agua de la extinción arrastra y diluye restos.',
      reveals: [],
      lab: {
        cromatografia: { cost: 260, reveals: ['F6_ACELERANTE'] },
        peritaje: { cost: 300, label: 'Peritaje de origen y propagación', reveals: ['F6_ORIGEN'] }
      } },
    { id: 'N05', name: 'Bidón quemado', type: 'Objeto', level: 3, model: 'bottle', room: 'Cabina de barnizado',
      public: 'Bidón de plástico deformado en la cabina de barnizado.',
      detail: 'Bidón de plástico de 25 litros, fundido por la mitad, junto a las latas de disolvente de la cabina.',
      value: 'Qué líquido contenía.', limits: 'En la cabina siempre hay disolventes.',
      reveals: ['F6_BIDON'],
      lab: { cromatografia: { cost: 160, label: 'Cromatografía del contenido', reveals: ['F6_BIDON_TOX'] } } },
    { id: 'N06', name: 'Rejilla del extractor', type: 'Escena', level: 4, model: 'window', fixed: true, room: 'Patio trasero',
      public: 'Rejilla metálica en la pared trasera de la nave, a dos metros del suelo.',
      detail: 'Rejilla del extractor de serrín. Justo debajo estaba la pila de palés y retales. La pared está negra alrededor.',
      value: 'Por aquí el fuego pudo entrar o salir.', limits: 'El hollín por sí solo no dice en qué sentido pasó.',
      reveals: ['F6_EXTRACTOR'],
      forensic: { lupa: { reveals: ['F6_EXTRACTOR_LUPA'] } } },
    { id: 'N07', name: 'Pila de palés quemada', type: 'Escena', level: 3, model: 'shelf', fixed: true, room: 'Patio trasero',
      public: 'Restos de palés y retales apoyados en la pared trasera.',
      detail: 'Montón de palés y recortes de tablero, calcinado hasta la base, contra la pared trasera de la nave.',
      value: 'Combustible al aire libre pegado a la nave.', limits: 'Ardería igual si las llamas le llegaron desde dentro.',
      reveals: ['F6_PALES'],
      lab: { cromatografia: { cost: 160, label: 'Cromatografía de la base de la pila', reveals: ['F6_PALES_TOX'] } } },
    { id: 'N08', name: 'Libro de rondas', type: 'Documento', level: 2, room: 'Caseta del vigilante',
      public: 'Libreta sobre la mesa de la caseta.',
      detail: 'Libreta de anotaciones del turno, escrita a mano por Gabriel.',
      value: 'Lo que Gabriel vio y apuntó esa noche.', limits: 'Solo recoge lo que él quiso anotar.',
      reveals: ['F6_LIBRO'] },
    { id: 'N09', name: 'Teléfono de Gabriel', type: 'Dispositivo', level: 2, room: 'Caseta del vigilante',
      public: 'Teléfono móvil enchufado al cargador de la caseta.',
      detail: 'Teléfono intacto, enchufado al cargador junto a la ventana de la caseta. Sin bloqueo de pantalla.',
      value: 'Llamadas, mensajes y fotos de Gabriel.', limits: 'Si lo dejó en la caseta, no recoge lo que pasó lejos de ella.',
      reveals: [], unlocks: ['D6_TEL'],
      lab: { huellas: { cost: 100, reveals: ['F6_TEL_HUELLAS'] } } },
    { id: 'N10', name: 'Hueco de la valla trasera', type: 'Escena', level: 3, model: 'railing', fixed: true, room: 'Valla trasera',
      public: 'Valla metálica entre la parcela y la finca de Andrés.',
      detail: 'Valla de malla de alambre. A ras de suelo hay un hueco tapado con un palé.',
      value: 'Paso entre la finca y la parcela sin pasar por la verja.', limits: 'No dice quién lo usó ni cuándo.',
      reveals: ['F6_VALLA'],
      forensic: { lupa: { reveals: ['F6_VALLA_LUPA'] } } },
    { id: 'N11', name: 'Pisadas en el barro', type: 'Huella', level: 3, model: 'shoe', room: 'Camino trasero',
      public: 'Barro en el camino trasero, entre la valla y la nave.',
      detail: 'Pisadas en el barro del camino trasero, entre el hueco de la valla y la pared de la nave A. Muchas son de los bomberos.',
      value: 'Quién anduvo por la parte de atrás.', limits: 'Las pisadas de los bomberos tapan parte de las demás.',
      reveals: ['F6_HUELLAS_BARRO'],
      lab: { comparativa: { cost: 180, reveals: ['F6_CALZADO'] } } },
    { id: 'N12', name: 'Rastrojos quemados', type: 'Escena', level: 4, model: 'trace', fixed: true, room: 'Finca de Andrés',
      public: 'Montón de ceniza en la finca del vecino.',
      detail: 'Restos de una quema de rastrojos en la finca de Andrés, a seis metros de la valla. Fríos al tacto.',
      value: 'Un fuego al aire libre cerca de la nave la misma noche.', limits: 'Estar cerca no significa que causara el incendio.',
      reveals: ['F6_RASTROJOS'],
      lab: { peritaje: { cost: 140, label: 'Peritaje de la quema', reveals: ['F6_RASTROJOS_PERITAJE'] } } },
    { id: 'N13', name: 'Restos de maquinaria del taller', type: 'Escena', level: 3, model: 'shelf', fixed: true, room: 'Taller',
      public: 'Esqueletos metálicos de máquinas y estanterías.',
      detail: 'Restos calcinados de máquinas, bancos de trabajo y estanterías del taller.',
      value: 'Comprobar si todo lo asegurado estaba dentro al arder.', limits: 'Hace falta el inventario para saber qué falta.',
      reveals: [],
      lab: { peritaje: { cost: 240, label: 'Inventario pericial', reveals: ['F6_INVENTARIO'] } } },
    { id: 'N14', name: 'Cámara de la verja', type: 'Dispositivo', level: 2, fixed: true, room: 'Explanada',
      public: 'Cámara sobre la verja de entrada a la parcela.',
      detail: 'Graba la entrada principal: vehículos y personas que entran y salen por la verja.',
      value: 'Quién entró por delante.', limits: 'No ve el camino de atrás ni la valla con la finca.',
      reveals: ['F6_VERJA_ESCENA'] }
  ],

  labKinds: { autopsia: 'Autopsia completa', cromatografia: 'Cromatografía de acelerantes', peritaje: 'Peritaje de incendios', comparativa: 'Comparativa de calzado', huellas: 'Huellas dactilares' },

  digital: [
    { id: 'D6_VERJA', name: 'Grabación de la cámara de la verja', cost: 100, desc: 'Entradas y salidas por la verja, de 19:00 a 06:00.',
      reveals: ['F6_VJ_TARDE', 'F6_VJ_INES', 'F6_VJ_2340', 'F6_VJ_NOCHE'] },
    { id: 'D6_CRA', name: 'Central de alarmas y control de rondas', cost: 120, desc: 'Alarmas de las naves, averías y fichajes del vigilante en los puntos de control.',
      reveals: ['F6_CRA_NAVEB', 'F6_CRA_AVERIA', 'F6_RONDAS'] },
    { id: 'D6_TEL', name: 'Extracción del teléfono de Gabriel', cost: 200, desc: 'Llamadas, mensajes y fotos de las últimas semanas.', requires: 'N09',
      reveals: ['F6_TG_PILAR', 'F6_TG_CLAVE', 'F6_TG_FALTAS'] },
    { id: 'D6_ENCHUFE', name: 'Registro en la nube del enchufe inteligente', cost: 120, desc: 'Cuenta, programaciones y encendidos del enchufe del despacho.', requires: 'N03',
      reveals: ['F6_ENCHUFE_NUBE'] },
    { id: 'D6_GAS', name: 'Cámara de la gasolinera de la CV-20', cost: 90, desc: 'Surtidores y carretera hacia el polígono, jueves y viernes.',
      reveals: ['F6_GAS_PIZZA', 'F6_GAS_INES', 'F6_GAS_CAMION', 'F6_GAS_CLAVE'] },
    { id: 'D6_CAM_VECINO', name: 'Cámara de Andrés (aportada por él)', cost: 80, desc: 'La cámara que Andrés instaló apuntando al extractor y a la parte de atrás de la parcela.',
      reveals: ['F6_CV_RASTROJOS', 'F6_CV_CLAVE'] },
    { id: 'D6_FIN', name: 'Datos financieros', cost: 160, desc: 'Cuentas, seguros, sentencias y ventas en internet de las personas del expediente.',
      reveals: ['F6_FIN_SALVADOR', 'F6_FIN_POLIZA', 'F6_FIN_OSCAR', 'F6_FIN_VENTAS', 'F6_FIN_ANDRES', 'F6_FIN_INES'] },
    { id: 'D6_FURGO', name: 'GPS de la furgoneta de la empresa', cost: 90, desc: 'Recorridos del último mes.',
      reveals: ['F6_FURGO'] }
  ],

  judicial: {
    max: 2,
    desc: 'Antenas y llamadas de un teléfono entre las 20:00 y las 06:00. El juzgado autoriza dos solicitudes.',
    results: {
      salvador: ['F6_ANT_SALVADOR'], ines: ['F6_ANT_INES'], andres: ['F6_ANT_ANDRES'],
      oscar: ['F6_ANT_OSCAR'], pilar: ['F6_ANT_PILAR'], hector: ['F6_ANT_HECTOR']
    }
  },

  facts: {
    /* ----- Iniciales ----- */
    F6_AVISO: { text: 'Un camionero que circula por la CV-20 avisa al 112 de que ve llamas en el polígono El Collet.', time: '02:52', place: 'gasolinera', source: 'llamada', tags: ['llamada', 'testigo'] },
    F6_BOMBEROS: { text: 'Los bomberos entran por la verja y encuentran la nave A ardiendo por completo. El fuego queda controlado a las 04:30; la nave B no se quema.', time: '03:05', end: '04:30', place: 'nave', source: 'informe policial', tags: ['hallazgo'] },
    F6_HALLAZGO: { text: 'Aparece el cuerpo de Gabriel en el despacho de la nave A, junto a la puerta que da al taller.', time: '05:40', person: 'gabriel', place: 'nave', source: 'informe policial', tags: ['hallazgo', 'muerte'] },
    F6_VENTANA: { text: 'Estimación preliminar en el lugar: muerte entre la 01:00 y las 03:30. El estado del cuerpo no permite más precisión.', time: '01:00', end: '03:30', person: 'gabriel', source: 'informe forense', tags: ['muerte', 'hora'] },

    /* ----- Escena y laboratorio (comunes) ----- */
    F6_CUERPO: { text: 'El cuerpo de Gabriel está muy carbonizado, boca abajo, con el uniforme puesto. No se ven lesiones a simple vista.', person: 'gabriel', place: 'nave', source: 'escena', tags: ['muerte'] },
    F6_EXTINTOR: { text: 'Hay un extintor de polvo caído a medio metro del cuerpo.', place: 'nave', source: 'escena', tags: ['objeto'] },
    F6_EXTINTOR_LUPA: { text: 'Lupa: el extintor conserva el pasador de seguridad y el precinto: nadie lo usó.', place: 'nave', source: 'escena', tags: ['objeto'] },
    F6_ESTUFA: { text: 'En el despacho, restos de una estufa eléctrica y de un enchufe inteligente con wifi, fundido en la toma de la pared.', place: 'nave', source: 'escena', tags: ['objeto'] },
    F6_ESTUFA_PERITAJE: { text: 'Peritaje eléctrico: el enchufe inteligente estaba en posición de apagado y la estufa, de pie en su sitio. El daño le llega desde fuera del despacho: no es el origen del fuego.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
    F6_BIDON: { text: 'En la cabina de barnizado hay un bidón de plástico de 25 litros fundido por la mitad, junto a las latas de disolvente.', place: 'nave', source: 'escena', tags: ['objeto'] },
    F6_EXTRACTOR: { text: 'La rejilla del extractor de serrín está en la pared trasera, a dos metros del suelo; justo debajo estaba la pila de palés y retales.', place: 'nave', source: 'escena', tags: ['ventana'] },
    F6_EXTRACTOR_LUPA: { text: 'Lupa: la rejilla del extractor está deformada hacia fuera y el hollín sube por la pared exterior desde la rejilla: las llamas salieron de dentro.', place: 'nave', source: 'escena', tags: ['ventana'] },
    F6_PALES: { text: 'La pila de palés y retales apoyada en la pared trasera está calcinada hasta la base.', place: 'nave', source: 'escena', tags: ['objeto'] },
    F6_PALES_TOX: { text: 'Base de la pila de palés: madera y serrín, sin acelerantes. Ardió por las llamas que salían de la rejilla.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
    F6_LIBRO: { text: 'Libro de rondas: «21:00 inicio de turno. 22:15 el vecino quemando rastrojos junto a la valla; avisado. 22:30 viene Inés a la nave B, se va 22:55. 23:00 ronda sin novedad. 00:30 ronda sin novedad». No hay más anotaciones.', time: '21:00', end: '00:30', person: 'gabriel', place: 'nave', source: 'documento', tags: ['testigo'] },
    F6_TEL_HUELLAS: { prints: [{ at: 'Pantalla', match: 'gabriel' }, { at: 'Carcasa', match: 'gabriel' }], text: 'Huellas en el teléfono de Gabriel: solo suyas.', person: 'gabriel', source: 'laboratorio', tags: ['telefono', 'huella'] },
    F6_VALLA: { text: 'En la valla entre la parcela y la finca de Andrés hay un hueco a ras de suelo, tapado con un palé.', place: 'camino', source: 'escena', tags: ['acceso'] },
    F6_HUELLAS_BARRO: { text: 'Hay pisadas en el barro del camino trasero, entre el hueco de la valla y la pared de la nave A; muchas son de los bomberos.', place: 'camino', source: 'escena', tags: ['acceso'] },
    F6_RASTROJOS: { text: 'En la finca de Andrés, a seis metros de la valla, quedan los restos fríos de una quema de rastrojos.', person: 'andres', place: 'finca', source: 'escena', tags: ['objeto'] },
    F6_RASTROJOS_PERITAJE: { text: 'Peritaje: la quema de rastrojos se apagó horas antes del incendio y entre ella y la nave hay cuarenta metros de tierra húmeda. Ninguna pavesa explica el fuego.', place: 'finca', source: 'laboratorio', tags: ['objeto'] },
    F6_VERJA_ESCENA: { text: 'La cámara de la verja graba la entrada principal. El camino trasero y la valla con la finca de Andrés no tienen cámara.', place: 'nave', source: 'escena', tags: ['camara', 'acceso'] },

    /* ----- Registros comunes ----- */
    F6_VJ_TARDE: { text: 'Verja: a las 19:31 salen los coches de los empleados, entre ellos el de Óscar; a las 20:52 sale Salvador; a las 20:58 entra Gabriel.', time: '19:31', end: '20:58', place: 'nave', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F6_VJ_INES: { text: 'Verja: el coche de Inés Ferrús entra a las 22:26 y sale a las 22:55, con algo voluminoso en el maletero.', time: '22:26', end: '22:55', person: 'ines', place: 'nave', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F6_VJ_2340: { text: 'Verja: una furgoneta pequeña se para 40 segundos ante la verja, sin entrar, y se va. No se lee la matrícula.', time: '23:40', place: 'nave', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F6_VJ_NOCHE: { text: 'Verja: nadie entra ni sale entre las 22:55 y las 03:05, cuando llegan los bomberos.', time: '22:55', end: '03:05', place: 'nave', source: 'cámara', tags: ['camara', 'acceso'] },
    F6_CRA_NAVEB: { text: 'Central de alarmas: la nave B se desconecta a las 22:27 con el código de Inés Ferrús y se vuelve a conectar a las 22:53 con el mismo código.', time: '22:27', end: '22:53', person: 'ines', place: 'nave', source: 'registro', tags: ['acceso'] },
    F6_CRA_AVERIA: { text: 'Central de alarmas: el detector de humo de la nave A estuvo averiado del 2 de junio al 20 de agosto y vuelve a estarlo desde el 3 de octubre. El día 5 se avisó por correo a Salvador; no consta ninguna reparación. Con vigilante, la nave A no tiene alarma de intrusión conectada.', person: 'salvador', source: 'registro', tags: ['acceso'] },
    F6_TG_PILAR: { text: 'Teléfono de Gabriel: llamada a Pilar de 4 minutos.', time: '01:12', person: 'pilar', place: 'nave', source: 'llamada', tags: ['llamada'] },
    F6_ENCHUFE_NUBE: { text: 'Registro en la nube del enchufe «Estufa despacho», a nombre de Salvador Ferrús: ninguna programación. Último uso, encendido a mano el viernes a las 09:05 y apagado a las 13:40. Pierde la conexión durante el incendio.', person: 'salvador', source: 'dispositivo', tags: ['objeto'] },
    F6_GAS_PIZZA: { text: 'Gasolinera: una furgoneta de reparto de pizzas de Onda pasa hacia el polígono a las 23:36 y vuelve a las 23:44.', time: '23:36', end: '23:44', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F6_GAS_INES: { text: 'Gasolinera: el coche de Inés Ferrús pasa hacia el polígono a las 22:20 y vuelve a las 22:59.', time: '22:20', end: '22:59', person: 'ines', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F6_GAS_CAMION: { text: 'Gasolinera: un camión para en el arcén; el conductor baja, mira hacia el polígono y llama por teléfono.', time: '02:49', place: 'gasolinera', source: 'cámara', tags: ['camara', 'testigo'] },
    F6_CV_RASTROJOS: { text: 'Cámara de Andrés: de 22:10 a 22:41 Andrés quema rastrojos a unos metros de la valla. A las 22:16 Gabriel se acerca y discuten con gestos. A las 22:41 Andrés apaga el fuego con una manguera.', time: '22:10', end: '22:41', person: 'andres', place: 'finca', source: 'cámara', tags: ['camara', 'testigo'] },
    F6_FIN_SALVADOR: { text: 'Salvador Ferrús: préstamo de 300.000 € con tres cuotas sin pagar, un embargo de un proveedor de tableros y la cuenta de la empresa en números rojos.', person: 'salvador', source: 'documento', tags: ['dinero'] },
    F6_FIN_POLIZA: { text: 'Póliza de la nave ampliada en julio de 400.000 a 950.000 €, con la maquinaria asegurada a valor de nuevo. Beneficiaria: la sociedad (60 % Salvador, 40 % Inés).', person: 'salvador', source: 'documento', tags: ['dinero', 'seguro'] },
    F6_FIN_OSCAR: { text: 'Óscar Llorens: cinco préstamos rápidos y deudas con casas de apuestas en línea por unos 14.000 €.', person: 'oscar', source: 'documento', tags: ['dinero'] },
    F6_FIN_VENTAS: { text: 'Ventas en internet de Óscar Llorens: una moto y una consola en septiembre, por 1.900 €.', person: 'oscar', source: 'documento', tags: ['dinero'] },
    F6_FIN_ANDRES: { text: 'Andrés Peñarroja: sentencia del 9 de octubre que desestima su demanda contra Muebles Ferrús por el lindero y el serrín, con 6.000 € de costas.', person: 'andres', source: 'documento', tags: ['dinero'] },
    F6_FIN_INES: { text: 'Inés Ferrús: oferta firmada de una cooperativa de la comarca para comprar la empresa por 700.000 €; Salvador la rechazó en septiembre.', person: 'ines', source: 'documento', tags: ['dinero'] },
    F6_FURGO: { text: 'GPS de la furgoneta de la empresa: ningún movimiento fuera del horario de reparto en el último mes.', source: 'registro', tags: ['vehiculo'] },

    /* ----- Antenas (judicial) ----- */
    F6_ANT_SALVADOR: { text: 'Teléfono de Salvador: Onda centro de 21:20 a 00:50; domicilio desde la 01:00 toda la noche. Ninguna llamada hasta las 03:31, cuando le llama la Guardia Civil.', time: '21:20', end: '03:31', person: 'salvador', place: 'onda', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F6_ANT_INES: { text: 'Teléfono de Inés: zona del polígono de 22:18 a 23:00; Onda el resto de la noche.', time: '22:18', end: '23:00', person: 'ines', place: 'nave', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F6_ANT_ANDRES: { text: 'Teléfono de Andrés: zona del polígono toda la noche. Sin ninguna actividad entre las 23:05 y las 03:12, cuando llama a su hijo (5 minutos).', time: '23:05', end: '03:12', person: 'andres', place: 'finca', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F6_ANT_OSCAR: { text: 'Teléfono de Óscar: Onda toda la noche, con una sesión de datos continua de 22:30 a 03:05, compatible con jugar en línea.', time: '22:30', end: '03:05', person: 'oscar', place: 'onda', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F6_ANT_PILAR: { text: 'Teléfono de Pilar: Onda toda la noche. A la 01:12, llamada de Gabriel de 4 minutos.', time: '01:12', person: 'pilar', place: 'onda', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F6_ANT_HECTOR: { text: 'Teléfono de Héctor: Castellón toda la noche. Sin llamadas.', time: '20:00', end: '06:00', person: 'hector', place: 'castellon', source: 'antena', tags: ['ubicacion', 'telefono'] },

    /* ----- Declaraciones ----- */
    S6_SAL_CENA: { kind: 'statement', text: 'Salvador declara que cerró a las 20:50, que cenó en Onda con su mujer y unos amigos hasta casi la una y que se fue a dormir.', time: '21:20', end: '01:00', person: 'salvador', place: 'onda', source: 'declaración', tags: ['coartada'] },
    S6_SAL_LLAMADA: { kind: 'statement', text: 'Salvador declara que Gabriel no le llamó ni le escribió esa noche.', person: 'salvador', source: 'declaración', tags: ['llamada'] },
    S6_SAL_POLIZA: { kind: 'statement', text: 'Salvador declara que amplió la póliza porque el agente le dijo que estaban infraasegurados.', person: 'salvador', source: 'declaración', tags: ['seguro'] },
    S6_SAL_TODO: { kind: 'statement', text: 'Salvador declara que antes del incendio todo estaba en su sitio en la nave.', person: 'salvador', source: 'declaración', tags: ['objeto'] },
    S6_SAL_FURGO: { kind: 'statement', text: 'Salvador declara que no conduce la furgoneta de la empresa desde hace meses.', person: 'salvador', source: 'declaración', tags: ['vehiculo'] },
    S6_SAL_ESTUFA: { kind: 'statement', text: 'Salvador declara que la estufa del despacho va con un enchufe inteligente y que siempre la deja apagada al irse.', person: 'salvador', source: 'declaración', tags: ['objeto'] },
    S6_SAL_GASOLEO: { kind: 'statement', text: 'Salvador declara que tiene un tractor y un depósito de gasóleo agrícola en su huerto de Betxí, y nada en la nave.', person: 'salvador', source: 'declaración', tags: ['objeto'] },
    S6_SAL_TECNICO: { kind: 'statement', text: 'Salvador declara que había avisado al técnico del detector averiado y que iba a ir el lunes.', person: 'salvador', source: 'declaración', tags: ['acceso'] },
    S6_SAL_VECINO: { kind: 'statement', text: 'Salvador declara que el vecino les denunció siete veces y que en agosto le dijo a Gabriel que un día la nave iba a arder.', person: 'salvador', source: 'declaración', tags: ['testigo'] },
    S6_INE_CASA: { kind: 'statement', text: 'Inés declara que pasó toda la noche en su casa de Onda.', time: '20:00', end: '06:00', person: 'ines', place: 'onda', source: 'declaración', tags: ['coartada'] },
    S6_INE_VENTA: { kind: 'statement', text: 'Inés declara que quería aceptar la oferta de la cooperativa y que Salvador se negaba.', person: 'ines', source: 'declaración', tags: ['dinero'] },
    S6_INE_MUEBLES: { kind: 'statement', text: 'Inés admite que estuvo en la nave B de 22:26 a 22:55 recogiendo los muebles de su madre y que Gabriel le ayudó a cargarlos.', time: '22:26', end: '22:55', person: 'ines', place: 'nave', source: 'declaración', tags: ['coartada'] },
    S6_AND_DORMIA: { kind: 'statement', text: 'Andrés declara que se acostó a las once y que le despertaron las sirenas a las 03:10.', time: '23:00', end: '03:10', person: 'andres', place: 'finca', source: 'declaración', tags: ['coartada'] },
    S6_AND_CAMARA: { kind: 'statement', text: 'Andrés declara que su cámara grabó toda la noche sin cortes.', person: 'andres', place: 'finca', source: 'declaración', tags: ['camara'] },
    S6_AND_AVISO: { kind: 'statement', text: 'Andrés admite que dijo que un día la nave iba a arder, pero como advertencia por el serrín.', person: 'andres', source: 'declaración', tags: ['testigo'] },
    S6_AND_GASOLEO: { kind: 'statement', text: 'Andrés declara que tiene un depósito de gasóleo agrícola para su tractor.', person: 'andres', place: 'finca', source: 'declaración', tags: ['objeto'] },
    S6_AND_SENTENCIA: { kind: 'statement', text: 'Andrés declara que perdió el pleito la semana anterior y que le condenaron a pagar 6.000 € de costas.', person: 'andres', source: 'declaración', tags: ['dinero'] },
    S6_AND_HUECO: { kind: 'statement', text: 'Andrés declara que el hueco de la valla lo hicieron los perros hace años y que él no pasa por ahí.', person: 'andres', place: 'camino', source: 'declaración', tags: ['acceso'] },
    S6_OSC_CASA: { kind: 'statement', text: 'Óscar declara que pasó la noche en su casa de Onda jugando a la consola en línea.', time: '22:00', end: '03:00', person: 'oscar', place: 'onda', source: 'declaración', tags: ['coartada'] },
    S6_OSC_LLAVE: { kind: 'statement', text: 'Óscar declara que tiene llave de la puerta pequeña del taller para abrir por las mañanas.', person: 'oscar', source: 'declaración', tags: ['acceso'] },
    S6_OSC_DEUDAS: { kind: 'statement', text: 'Óscar admite que tiene préstamos rápidos y dice que los está pagando.', person: 'oscar', source: 'declaración', tags: ['dinero'] },
    S6_OSC_HERRAMIENTAS: { kind: 'statement', text: 'Óscar declara que lleva el inventario de herramientas y que no faltaba ninguna.', person: 'oscar', source: 'declaración', tags: ['objeto'] },
    S6_OSC_VENTAS: { kind: 'statement', text: 'Óscar declara que lo que vende por internet son cosas suyas.', person: 'oscar', source: 'declaración', tags: ['dinero'] },
    S6_OSC_CABINA: { kind: 'statement', text: 'Óscar declara que en la cabina de barnizado había disolvente nitro, barnices y un bidón de 25 litros, y que avisó muchas veces del riesgo.', person: 'oscar', place: 'nave', source: 'declaración', tags: ['objeto'] },
    S6_PIL_LLAMADA: { kind: 'statement', text: 'Pilar declara que Gabriel la llamó a la 01:12 y le dijo que todo estaba tranquilo y que el vecino había vuelto a quemar rastrojos.', time: '01:12', person: 'pilar', place: 'onda', source: 'testigo', tags: ['llamada', 'testigo'] },
    S6_PIL_NODORMIA: { kind: 'statement', text: 'Pilar declara que Gabriel nunca dormía en el turno y que hacía la ronda cada hora y media.', person: 'pilar', source: 'declaración', tags: ['testigo'] },
    S6_PIL_RARO: { kind: 'statement', text: 'Pilar declara que Gabriel le había contado que en la nave pasaban cosas raras.', person: 'pilar', source: 'testigo', tags: ['testigo'] },
    S6_PIL_VECINO: { kind: 'statement', text: 'Pilar declara que Gabriel discutía a menudo con el vecino por las quemas.', person: 'pilar', source: 'testigo', tags: ['testigo'] },
    S6_HEC_AMPLIACION: { kind: 'statement', text: 'Héctor declara que la ampliación de la póliza se habló con Salvador en junio y se firmó en julio.', person: 'hector', source: 'declaración', tags: ['seguro'] },
    S6_HEC_INSPECCION: { kind: 'statement', text: 'Héctor declara que hizo en persona la inspección de riesgos en julio y que la detección de humo funcionaba.', person: 'hector', source: 'declaración', tags: ['seguro'] },
    S6_HEC_MAQUINARIA: { kind: 'statement', text: 'Héctor declara que la maquinaria asegurada vale casi 600.000 €: escuadradora, chapadora, CNC y línea de barnizado.', person: 'hector', source: 'declaración', tags: ['seguro'] },
    S6_HEC_PARTE: { kind: 'statement', text: 'Héctor declara que Salvador dio parte del siniestro el sábado a las 09:00.', time: '09:00', person: 'hector', source: 'declaración', tags: ['seguro'] },
    S6_HEC_FOTOS: { kind: 'statement', text: 'Héctor admite que hizo la inspección con fotos que le mandó Salvador, sin visitar la nave.', person: 'hector', source: 'declaración', tags: ['seguro'] }
  },

  /* Contradicciones comunes a las tres versiones */
  conflicts: [
    { id: 'K01', a: 'S6_INE_CASA', b: 'F6_VJ_INES', type: 'Lugar distinto', severity: 'media', desc: 'Inés dice que pasó la noche en su casa; la cámara de la verja registra su coche dentro de la parcela de 22:26 a 22:55.' },
    { id: 'K02', a: 'S6_INE_CASA', b: 'F6_LIBRO', type: 'Lugar distinto', severity: 'baja', desc: 'Inés dice que no salió de casa; Gabriel anotó que fue a la nave B de 22:30 a 22:55.' },
    { id: 'K03', a: 'S6_HEC_INSPECCION', b: 'F6_CRA_AVERIA', type: 'Hecho distinto', severity: 'baja', desc: 'Héctor dice que en julio la detección de humo funcionaba; la central la registra averiada del 2 de junio al 20 de agosto.' }
  ],

  verdictOptions: {
    motives: [
      { id: 'm6_seguro', label: 'Cobrar el seguro y tapar las deudas' },
      { id: 'm6_venganza', label: 'Venganza por el pleito perdido con la empresa' },
      { id: 'm6_robo', label: 'Ocultar los robos en el taller' },
      { id: 'm6_venta', label: 'Forzar la venta de la empresa a la cooperativa' },
      { id: 'm6_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me6_temporizador', label: 'Estufa con enchufe programado y gasolina en el despacho, sin el autor presente' },
      { id: 'me6_exterior', label: 'Gasóleo en la pila de palés de la pared trasera; el fuego entró por el extractor' },
      { id: 'me6_golpe', label: 'Golpe mortal al vigilante y fuego con disolvente en dos puntos para ocultarlo' },
      { id: 'me6_accidente', label: 'Accidente: avería eléctrica o pavesas de la quema de rastrojos' },
      { id: 'me6_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento en que el autor actuó por primera vez',
    windows: [
      { id: 'w6_cierre', label: 'Entre las 20:30 y las 21:00' },
      { id: 'w6_0115', label: 'Entre la 01:15 y la 01:45' },
      { id: 'w6_0210', label: 'Entre las 02:10 y las 02:50' },
      { id: 'w6_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F6_VALLA_LUPA', 'F6_EXTINTOR_LUPA', 'F6_EXTRACTOR_LUPA', 'F6_TG_FALTAS'], label: 'hueco de la valla, extintor, rejilla del extractor y fotos del teléfono de Gabriel' },
    movement: { ids: ['D6_VERJA', 'D6_GAS', 'D6_FURGO', 'D6_CAM_VECINO'], label: 'verja, gasolinera, furgoneta y cámara del vecino' },
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
    /* ---------- Versión 1: el dueño, enchufe programado ---------- */
    salvador: {
      facts: {
        F6_AUTOPSIA: { text: 'Autopsia: hollín en la tráquea y los bronquios: respiraba cuando empezó el fuego. Sin lesiones previas; las fracturas del cráneo son por el calor. Bajo el cuerpo, restos de una manta de lana. Muerte entre las 02:35 y las 03:00.', time: '02:35', end: '03:00', person: 'gabriel', place: 'nave', source: 'laboratorio', tags: ['muerte', 'autopsia'] },
        F6_COHB: { text: 'Carboxihemoglobina en sangre del 61 %: murió por inhalar humo.', person: 'gabriel', source: 'laboratorio', tags: ['muerte'] },
        F6_ESTUFA_PERITAJE: { text: 'Peritaje eléctrico: el enchufe inteligente estaba en posición de encendido. La estufa estaba tumbada contra una caja de cartón y debajo hay restos de trapos y cartón con acelerante. El fuego nace aquí.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_ACELERANTE: { text: 'Cromatografía: gasolina sin plomo en las muestras del despacho y en un reguero que va del despacho a la cabina de barnizado.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_ORIGEN: { text: 'Peritaje de origen: un solo foco, bajo la mesa del despacho, junto a la estufa. Desde ahí el fuego siguió el reguero hasta la cabina y salió al exterior por la rejilla del extractor.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_BIDON_TOX: { text: 'Bidón de la cabina: restos de gasolina, no de disolvente. No es el bidón que se usa en la cabina.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_VALLA_LUPA: { text: 'Lupa: el hueco es antiguo, con los alambres oxidados y telarañas intactas entre el palé y la valla. Nadie ha pasado por ahí en días.', place: 'camino', source: 'escena', tags: ['acceso'] },
        F6_CALZADO: { text: 'Comparativa: en el camino solo hay pisadas de botas de bombero y, junto a la valla, unas antiguas de las botas de trabajo de Gabriel.', place: 'camino', source: 'laboratorio', tags: ['acceso'] },
        F6_INVENTARIO: { text: 'Inventario pericial: entre los restos no están la escuadradora ni la chapadora, aseguradas en 140.000 €: no queda de ellas ni un motor ni una pieza. El resto de máquinas y herramientas está calcinado en su sitio.', place: 'nave', source: 'laboratorio', tags: ['objeto', 'seguro'] },
        F6_RONDAS: { text: 'Control de rondas: Gabriel ficha a las 23:02 y a las 00:31 en los cuatro puntos; a las 02:02 en la nave B y a las 02:05 en el despacho de la nave A. Ningún fichaje después.', time: '23:02', end: '02:05', person: 'gabriel', place: 'nave', source: 'registro', tags: ['acceso'] },
        F6_TG_CLAVE: { text: 'Teléfono de Gabriel: ninguna actividad después de la llamada de la 01:12. Quedó cargando en la caseta.', time: '01:16', person: 'gabriel', place: 'nave', source: 'dispositivo', tags: ['telefono'] },
        F6_TG_FALTAS: { text: 'Fotos del teléfono de Gabriel (jueves 15, 07:52): el taller con dos huecos vacíos en el suelo, con las marcas de los anclajes, donde estaban la escuadradora y la chapadora.', person: 'gabriel', place: 'nave', source: 'dispositivo', tags: ['objeto'] },
        F6_ENCHUFE_NUBE: { text: 'Registro en la nube del enchufe «Estufa despacho», a nombre de Salvador Ferrús: el viernes a las 20:41, desde su móvil, se programa un encendido único a las 02:30. A las 02:30 el enchufe se enciende; a las 02:36 pierde la conexión.', time: '20:41', end: '02:36', person: 'salvador', place: 'nave', source: 'dispositivo', tags: ['objeto'] },
        F6_GAS_CLAVE: { text: 'Gasolinera, jueves 15 a las 18:42: Salvador Ferrús llena un bidón de 25 litros de gasolina sin plomo y paga en efectivo.', person: 'salvador', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F6_CV_CLAVE: { text: 'Cámara de Andrés: graba toda la noche sin cortes y nadie cruza la parte de atrás. A las 02:31 aparece un resplandor naranja en las ventanas del despacho de la nave A, desde dentro; a las 02:45 las llamas salen por la rejilla del extractor y prenden la pila de palés.', time: '02:31', end: '02:45', place: 'nave', source: 'cámara', tags: ['camara'] },
        F6_FURGO: { text: 'GPS de la furgoneta de la empresa: el miércoles 14, de 23:10 a 00:55, viaja a una nave de alquiler del polígono de Vila-real y se para 48 minutos. Esa noche la conduce la tarjeta de Salvador.', person: 'salvador', place: 'vilareal', source: 'registro', tags: ['vehiculo'] },
        S6_HEC_AMPLIACION: { kind: 'statement', text: 'Héctor declara que fue Salvador quien le pidió en junio ampliar la póliza y asegurar la maquinaria a valor de nuevo.', person: 'hector', source: 'declaración', tags: ['seguro'] },
        S6_PIL_RARO: { kind: 'statement', text: 'Pilar declara que el jueves Gabriel le contó que habían desaparecido las dos máquinas grandes, que Salvador le dijo que estaban en reparación y que él no vio salir ningún camión de día.', person: 'pilar', source: 'testigo', tags: ['testigo'] },
        S6_SAL_REPARAR: { kind: 'statement', text: 'Salvador admite que el miércoles se llevó dos máquinas en la furgoneta; dice que las llevó a reparar a casa de un amigo.', person: 'salvador', place: 'vilareal', source: 'declaración', tags: ['vehiculo'] },
        S6_SAL_ABOGADO: { kind: 'statement', text: 'Salvador dice que alguien pudo usar su cuenta del enchufe y se niega a seguir declarando sin abogado.', person: 'salvador', source: 'declaración', tags: [] },
        S6_SAL_TRACTOR: { kind: 'statement', text: 'Salvador declara que la gasolina del jueves era para el tractor de su huerto.', person: 'salvador', source: 'declaración', tags: ['objeto'] },
        S6_INE_AVISO: { kind: 'statement', text: 'Inés declara que el martes su hermano le dijo que no dejara nada de valor en la nave «por si acaso», y que por eso fue a por los muebles de su madre.', person: 'ines', source: 'declaración', tags: ['testigo'] },
        S6_OSC_MAQUINAS: { kind: 'statement', text: 'Óscar declara que la escuadradora y la chapadora no estaban desde el jueves y que Salvador dijo que estaban en reparación.', person: 'oscar', source: 'declaración', tags: ['objeto'] }
      },
      answers: {
        salvador: {
          poliza: { type: 'mentira' },
          maquinas: { type: 'mentira' },
          furgo: { type: 'mentira' },
          estufa: { type: 'mentira' }
        },
        ines: {
          hermano: { a: 'Muy raro. El martes me dijo que no dejara nada de valor en la nave, «por si acaso». No le di importancia. Por eso fui a por los muebles de mi madre.', reveals: ['S6_INE_AVISO'] }
        },
        oscar: {
          herramientas: { a: 'Las herramientas, bien. Las dos máquinas grandes, la escuadradora y la chapadora, no estaban desde el jueves. Salvador dijo que estaban en reparación.', reveals: ['S6_OSC_HERRAMIENTAS', 'S6_OSC_MAQUINAS'] }
        },
        pilar: {
          costumbre: { type: 'creencia' },
          raro: { a: 'Que el jueves habían desaparecido las dos máquinas grandes. Salvador le dijo que estaban en reparación, pero él no vio salir ningún camión de día.' }
        },
        hector: {
          ampliacion: { a: 'Me lo pidió Salvador en junio. Quería la maquinaria asegurada a valor de nuevo. Le dije que subiría mucho la prima y le dio igual.' }
        }
      },
      confront: {
        salvador: {
          F6_FURGO: { a: '(Largo silencio.) Llevé dos máquinas a reparar. A un amigo que tiene una nave. No tengo por qué darle más explicaciones.', reveals: ['S6_SAL_REPARAR'] },
          F6_ENCHUFE_NUBE: { a: 'Alguien pudo usar mi cuenta. (Se cruza de brazos.) A partir de aquí, hablo con mi abogado.', reveals: ['S6_SAL_ABOGADO'] },
          F6_GAS_CLAVE: { a: 'Gasolina para el tractor del huerto. ¿Qué tiene de raro?', reveals: ['S6_SAL_TRACTOR'] },
          F6_INVENTARIO: { a: 'Esas máquinas estaban en reparación. Ya se lo he dicho.', reveals: [] },
          S6_HEC_AMPLIACION: { a: 'El agente exagera. Lo hablamos los dos.', reveals: [] },
          S6_INE_AVISO: { a: 'Le dije que se llevara lo de mi madre porque pensaba vaciar la nave para vender género. Nada más.', reveals: [] }
        },
        oscar: {
          F6_INVENTARIO: { a: 'Ya se lo dije: las dos máquinas grandes faltaban desde el jueves.', reveals: [] }
        },
        andres: {
          F6_CV_CLAVE: { a: '¿Lo ve? El fuego empezó dentro. De mi finca no salió nadie.', reveals: [] },
          F6_ACELERANTE: { a: '¿Gasolina? Yo no tengo gasolina. Mi tractor es de gasóleo.', reveals: [] }
        },
        pilar: {
          F6_RONDAS: { a: '(Llora.) Si se quedó en el despacho sería por el frío. A mí nunca me lo dijo.', reveals: [] }
        },
        hector: {
          F6_INVENTARIO: { a: 'Si esas máquinas no están entre los restos, no se indemnizan. Reclamarlas sería un fraude.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'V1a', a: 'S6_SAL_FURGO', b: 'F6_FURGO', type: 'Hecho distinto', severity: 'alta', desc: 'Salvador dice que no conduce la furgoneta desde hace meses; el miércoles por la noche fue con ella a una nave de Vila-real con su tarjeta.' },
        { id: 'V1b', a: 'S6_SAL_ESTUFA', b: 'F6_ENCHUFE_NUBE', type: 'Secuencia incompatible', severity: 'alta', desc: 'Salvador dice que siempre deja la estufa apagada; a las 20:41, desde su móvil, programó el enchufe para encenderse a las 02:30.' },
        { id: 'V1c', a: 'S6_SAL_TODO', b: 'F6_INVENTARIO', type: 'Hecho distinto', severity: 'alta', desc: 'Salvador dice que todo estaba en su sitio; entre los restos faltan la escuadradora y la chapadora.' },
        { id: 'V1d', a: 'S6_SAL_TRACTOR', b: 'S6_SAL_GASOLEO', type: 'Hecho distinto', severity: 'media', desc: 'Salvador dice que la gasolina era para el tractor; antes declaró que su tractor funciona con gasóleo agrícola.' },
        { id: 'V1e', a: 'S6_SAL_POLIZA', b: 'S6_HEC_AMPLIACION', type: 'Hecho distinto', severity: 'media', desc: 'Salvador dice que la ampliación fue idea del agente; el agente dice que se la pidió Salvador.' },
        { id: 'V1f', a: 'S6_PIL_NODORMIA', b: 'F6_RONDAS', type: 'Hecho distinto', severity: 'baja', desc: 'Pilar dice que Gabriel nunca paraba en el turno; tras fichar en el despacho a las 02:05 no hay más fichajes.' }
      ],
      truth: {
        culprit: 'salvador',
        motive: 'm6_seguro',
        method: 'me6_temporizador',
        window: 'w6_cierre',
        accomplices: [],
        partialMethods: { me6_accidente: 'Viste que el fuego empezó en la estufa del despacho, pero no que alguien la programó.' },
        decisive: ['F6_ENCHUFE_NUBE', 'F6_ESTUFA_PERITAJE', 'F6_ORIGEN', 'F6_ACELERANTE', 'F6_GAS_CLAVE', 'F6_FURGO', 'F6_INVENTARIO', 'F6_FIN_POLIZA', 'F6_FIN_SALVADOR', 'F6_CRA_AVERIA', 'F6_CV_CLAVE', 'F6_RONDAS', 'F6_AUTOPSIA', 'F6_BIDON_TOX', 'F6_TG_FALTAS', 'S6_HEC_AMPLIACION'],
        weak: ['F6_RASTROJOS', 'S6_AND_AVISO', 'F6_VJ_INES', 'F6_VJ_2340', 'F6_FIN_OSCAR', 'F6_FIN_VENTAS', 'F6_FIN_ANDRES', 'F6_EXTINTOR', 'F6_HUELLAS_BARRO', 'F6_CALZADO', 'F6_CV_RASTROJOS'],
        keyConflicts: ['V1a', 'V1b', 'V1c', 'V1e'],
        narrative: [
          'Salvador Ferrús debía 300.000 € al banco, tenía un embargo y la empresa en números rojos. En junio pidió al agente ampliar la póliza hasta 950.000 €, con la maquinaria a valor de nuevo, y no reparó el detector de humo de la nave A, averiado desde el día 3. En septiembre rechazó vender a la cooperativa.',
          'El miércoles por la noche se llevó en la furgoneta la escuadradora y la chapadora a una nave de alquiler en Vila-real, para cobrarlas como quemadas. El jueves llenó un bidón de gasolina y pagó en efectivo. El viernes, antes de irse, empapó trapos y cartones bajo la mesa del despacho, hizo un reguero hasta la cabina de barnizado y tumbó la estufa contra ellos. A las 20:41 programó desde el móvil el enchufe para que se encendiera a las 02:30, salió a las 20:52 y se fue a cenar con amigos: tendría coartada.',
          'No sabía que Gabriel, las noches frías, se echaba un rato con una manta en el sofá del despacho después de la ronda de las dos. Fichó allí a las 02:05 y se quedó dormido. A las 02:30 la estufa se encendió; la cámara del vecino ve el resplandor dentro del despacho a las 02:31. Gabriel murió por el humo sin llegar a usar el extintor.',
          'Andrés había dicho que la nave iba a arder y esa noche quemó rastrojos, pero su cámara grabó sin cortes y la quema estaba apagada desde las 22:41. Inés mintió porque fue a llevarse los muebles de su madre, después de que su hermano le aconsejara no dejar nada de valor en la nave. Héctor mintió sobre una inspección que hizo con fotos. Óscar tenía deudas, pero pasó la noche en casa.'
        ]
      },
      trial: {
        salvador: [
          { id: 'O1', text: 'Mi cliente estaba cenando en Onda y después en su casa. No pudo prender fuego a las dos y media.', accept: ['F6_ENCHUFE_NUBE', 'F6_ESTUFA_PERITAJE', 'F6_ORIGEN'] },
          { id: 'O2', text: 'El fuego lo provocó el vecino, que había amenazado con quemar la nave y quemaba rastrojos esa noche.', accept: ['F6_CV_CLAVE', 'F6_RASTROJOS_PERITAJE', 'F6_EXTRACTOR_LUPA', 'F6_ORIGEN'] },
          { id: 'O3', text: 'Mi cliente no ganaba nada: el seguro solo paga lo que se quema.', accept: ['F6_INVENTARIO', 'F6_FURGO', 'F6_FIN_POLIZA', 'F6_GAS_CLAVE'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna cámara sitúa a la persona señalada en la nave cuando empezó el fuego.', accept: [] },
          { id: 'O2', text: 'La acusación no explica qué encendió el fuego dentro del despacho.', accept: [] },
          { id: 'O3', text: 'La acusación no explica dónde están las dos máquinas que faltan.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['salvador', 'andres'],
        spatialBonus: ['F6_FURGO', 'F6_ORIGEN'],
        temporalConflicts: ['V1b'],
        lateral: [
          { type: 'fact', id: 'S6_OSC_MAQUINAS', pts: 25, yes: 'Preguntaste al taller si faltaba algo antes del incendio.', no: 'No preguntaste a los empleados qué faltaba antes del fuego.' },
          { type: 'conflict', id: 'V1b', pts: 30, yes: 'Viste que el fuego estaba programado horas antes.', no: 'No contrastaste la estufa con el registro del enchufe.' },
          { type: 'conflict', id: 'V1c', pts: 25 },
          { type: 'chosen', id: 'F6_FURGO', pts: 20 }
        ],
        usefulLab: ['N03:peritaje', 'N04:cromatografia', 'N04:peritaje', 'N13:peritaje', 'N05:cromatografia']
      }
    },

    /* ---------- Versión 2: el vecino, fuego desde fuera ---------- */
    andres: {
      facts: {
        F6_AUTOPSIA: { text: 'Autopsia: hollín en la tráquea y los bronquios: respiraba cuando empezó el fuego. Sin lesiones previas; las fracturas del cráneo son por el calor. Restos de polvo de extintor en la ropa y las manos. Muerte entre las 02:45 y las 03:05.', time: '02:45', end: '03:05', person: 'gabriel', place: 'nave', source: 'laboratorio', tags: ['muerte', 'autopsia'] },
        F6_COHB: { text: 'Carboxihemoglobina en sangre del 55 %: murió por inhalar humo.', person: 'gabriel', source: 'laboratorio', tags: ['muerte'] },
        F6_EXTINTOR_LUPA: { text: 'Lupa: el extintor no tiene el pasador de seguridad, la palanca está apretada y está vacío. Hay polvo químico en el suelo alrededor del cuerpo.', place: 'nave', source: 'escena', tags: ['objeto'] },
        F6_EXTRACTOR_LUPA: { text: 'Lupa: la quemadura de la pared forma una V que nace en la base de la pila de palés, por fuera, y entra en la nave por la rejilla del extractor.', place: 'nave', source: 'escena', tags: ['ventana'] },
        F6_PALES_TOX: { text: 'Base de la pila de palés: restos de gasóleo con el colorante rojo del gasóleo agrícola.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_ACELERANTE: { text: 'Cromatografía: dentro de la nave solo hay restos de madera, serrín y barniz quemados. Ningún acelerante.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_BIDON_TOX: { text: 'Bidón de la cabina: restos de disolvente nitro, su contenido habitual. Estaba cerrado y en su sitio.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_ORIGEN: { text: 'Peritaje de origen: un solo foco, en el exterior, en la base de la pila de palés de la pared trasera. Las llamas entraron por la rejilla del extractor y prendieron el serrín del sistema de aspiración, dentro del taller.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_VALLA_LUPA: { text: 'Lupa: dos alambres del hueco están cortados hace poco, con el corte brillante y sin óxido. En el palé hay barro fresco y una brizna de paja.', place: 'camino', source: 'escena', tags: ['acceso'] },
        F6_CALZADO: { text: 'Comparativa: además de las de los bomberos, hay pisadas de botas de goma con suela de campo, talla 43, que van del hueco de la valla a la pared trasera y vuelven. El dibujo coincide con las botas que llevaba Andrés al día siguiente.', person: 'andres', place: 'camino', source: 'laboratorio', tags: ['acceso'] },
        F6_INVENTARIO: { text: 'Inventario pericial: todas las máquinas y herramientas del inventario aparecen calcinadas en su sitio.', place: 'nave', source: 'laboratorio', tags: ['objeto', 'seguro'] },
        F6_RONDAS: { text: 'Control de rondas: Gabriel ficha a las 23:02, a las 00:31 y de 02:02 a 02:08 en los cuatro puntos; el último fichaje es en la caseta. Ninguno después.', time: '23:02', end: '02:08', person: 'gabriel', place: 'nave', source: 'registro', tags: ['acceso'] },
        F6_TG_CLAVE: { text: 'Teléfono de Gabriel: llamada saliente a Salvador Ferrús de 9 segundos, sin respuesta. Es su última actividad.', time: '02:41', person: 'salvador', place: 'nave', source: 'llamada', tags: ['llamada', 'telefono'] },
        F6_TG_FALTAS: { text: 'Fotos del teléfono de Gabriel (10 de octubre): serrín acumulado al otro lado de la valla, en la finca de Andrés, y la manguera del extractor desenganchada.', person: 'gabriel', place: 'finca', source: 'dispositivo', tags: ['objeto'] },
        F6_GAS_CLAVE: { text: 'Gasolinera: ni el jueves ni el viernes por la noche pasa ningún otro vehículo de las personas del expediente.', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F6_CV_CLAVE: { text: 'Cámara de Andrés: la grabación se corta a las 02:13 por pérdida de alimentación y vuelve a las 02:51, con la pila de palés de la pared trasera ya ardiendo y las llamas entrando por la rejilla del extractor. Según la compañía eléctrica, esa noche no hubo ningún corte en la zona.', time: '02:13', end: '02:51', person: 'andres', place: 'finca', source: 'cámara', tags: ['camara'] },
        F6_ANT_SALVADOR: { text: 'Teléfono de Salvador: Onda centro de 21:20 a 00:50; domicilio desde la 01:00 toda la noche. A las 02:41, llamada entrante de Gabriel no contestada (9 segundos). A las 03:31 le llama la Guardia Civil.', time: '21:20', end: '03:31', person: 'salvador', place: 'onda', source: 'antena', tags: ['ubicacion', 'telefono', 'llamada'] },
        F6_ANT_ANDRES: { text: 'Teléfono de Andrés: zona del polígono toda la noche. Actividad de datos de 02:04 a 02:11. A las 02:57 llama a su hijo (3 minutos).', time: '02:04', end: '02:57', person: 'andres', place: 'finca', source: 'antena', tags: ['ubicacion', 'telefono', 'llamada'] },
        S6_HEC_AMPLIACION: { kind: 'statement', text: 'Héctor declara que fue él quien propuso a Salvador en junio ampliar la póliza porque estaban muy por debajo del valor real.', person: 'hector', source: 'declaración', tags: ['seguro'] },
        S6_PIL_RARO: { kind: 'statement', text: 'Pilar declara que Gabriel le había contado que el vecino rondaba la valla de noche y que estaba muy rabioso por el juicio.', person: 'pilar', source: 'testigo', tags: ['testigo'] },
        S6_SAL_ADMITE: { kind: 'statement', text: 'Salvador admite que vio la llamada perdida de Gabriel de las 02:41 y que lo ocultó por vergüenza de no haberla cogido.', time: '02:41', person: 'salvador', source: 'declaración', tags: ['llamada'] },
        S6_AND_LUZ: { kind: 'statement', text: 'Andrés dice que el corte de la grabación se debe a que se le fue la luz.', person: 'andres', place: 'finca', source: 'declaración', tags: ['camara'] },
        S6_AND_HIJO: { kind: 'statement', text: 'Andrés admite que llamó a su hijo a las 02:57; dice que vio el resplandor y se asustó.', time: '02:57', person: 'andres', place: 'finca', source: 'declaración', tags: ['llamada'] },
        S6_AND_ABOGADO: { kind: 'statement', text: 'Andrés se niega a seguir declarando sin abogado al conocer el análisis de la pila de palés.', person: 'andres', source: 'declaración', tags: [] }
      },
      answers: {
        salvador: {
          llamada: { type: 'mentira' }
        },
        andres: {
          noche: { type: 'mentira' },
          camara: { type: 'mentira' },
          valla: { type: 'mentira' }
        },
        pilar: {
          raro: { a: 'Que el vecino rondaba la valla de noche y que estaba muy rabioso con lo del juicio. Gabriel decía que un día iba a hacer una barbaridad.' }
        },
        hector: {
          ampliacion: { a: 'Se lo propuse yo. Estaban muy por debajo del valor real y, si pasaba algo, la empresa se hundía. Le costó aceptar la prima.' }
        }
      },
      confront: {
        salvador: {
          F6_TG_CLAVE: { a: '(Traga saliva.) Vi la llamada a las tres y media, cuando me llamó la Guardia Civil. Si lo hubiera cogido... No quería que se supiera.', reveals: ['S6_SAL_ADMITE'] },
          F6_ANT_SALVADOR: { a: 'Sí. Gabriel me llamó y no lo cogí. Tenía el móvil en silencio. No me lo voy a perdonar.', reveals: ['S6_SAL_ADMITE'] },
          F6_ACELERANTE: { a: 'Ni gasolina ni nada. ¿Lo ve? Dentro no había nada.', reveals: [] }
        },
        andres: {
          F6_CV_CLAVE: { a: 'Se me fue la luz. En el campo pasa mucho.', reveals: ['S6_AND_LUZ'] },
          F6_ANT_ANDRES: { a: 'Llamé a mi hijo al ver el resplandor. Me asusté, nada más.', reveals: ['S6_AND_HIJO'] },
          F6_CALZADO: { a: 'Todas las botas de campo son iguales.', reveals: [] },
          F6_PALES_TOX: { a: '(Se levanta de la silla.) No pienso decir nada más sin un abogado.', reveals: ['S6_AND_ABOGADO'] },
          F6_ACELERANTE: { a: 'Gasóleo agrícola tiene medio pueblo. El dueño también, para sus naranjos.', reveals: [] },
          F6_VALLA_LUPA: { a: 'Esos alambres los corta cualquiera con unos alicates.', reveals: [] }
        },
        hector: {
          S6_SAL_POLIZA: { a: 'Es verdad, fue idea mía. Salvador no quería subir la prima.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'V2a', a: 'S6_AND_CAMARA', b: 'F6_CV_CLAVE', type: 'Hecho distinto', severity: 'alta', desc: 'Andrés dice que su cámara grabó toda la noche; la grabación se corta de 02:13 a 02:51 y esa noche no hubo cortes de luz.' },
        { id: 'V2b', a: 'S6_AND_DORMIA', b: 'F6_ANT_ANDRES', type: 'Secuencia incompatible', severity: 'alta', desc: 'Andrés dice que dormía hasta que le despertaron las sirenas a las 03:10; su teléfono tiene actividad de 02:04 a 02:11 y llama a su hijo a las 02:57.' },
        { id: 'V2c', a: 'S6_AND_HUECO', b: 'F6_VALLA_LUPA', type: 'Hecho distinto', severity: 'media', desc: 'Andrés dice que nadie usa el hueco de la valla; tiene dos alambres recién cortados y barro fresco.' },
        { id: 'V2d', a: 'S6_SAL_LLAMADA', b: 'F6_TG_CLAVE', type: 'Hecho omitido', severity: 'media', desc: 'Salvador dice que Gabriel no le llamó; a las 02:41 Gabriel le llamó y no contestó.' },
        { id: 'V2e', a: 'S6_AND_HUECO', b: 'F6_CALZADO', type: 'Hecho distinto', severity: 'alta', desc: 'Andrés dice que no pasa por el hueco; hay pisadas de sus botas del hueco a la pared trasera, ida y vuelta.' }
      ],
      truth: {
        culprit: 'andres',
        motive: 'm6_venganza',
        method: 'me6_exterior',
        window: 'w6_0210',
        accomplices: [],
        partialMethods: { me6_accidente: 'Viste que el fuego empezó fuera, en la pila de palés, pero no que alguien lo provocó con gasóleo.' },
        decisive: ['F6_CV_CLAVE', 'F6_ANT_ANDRES', 'F6_VALLA_LUPA', 'F6_CALZADO', 'F6_PALES_TOX', 'F6_ACELERANTE', 'F6_ORIGEN', 'F6_EXTRACTOR_LUPA', 'F6_TG_CLAVE', 'F6_EXTINTOR_LUPA', 'F6_AUTOPSIA', 'F6_RONDAS', 'F6_ENCHUFE_NUBE', 'F6_FIN_ANDRES', 'F6_RASTROJOS_PERITAJE'],
        weak: ['F6_FIN_POLIZA', 'F6_FIN_SALVADOR', 'F6_RASTROJOS', 'F6_VJ_INES', 'F6_VJ_2340', 'F6_FIN_OSCAR', 'F6_CRA_AVERIA', 'F6_BIDON_TOX', 'F6_GAS_INES', 'S6_SAL_GASOLEO'],
        keyConflicts: ['V2a', 'V2b', 'V2c', 'V2e'],
        narrative: [
          'Andrés Peñarroja llevaba años en pleito con Muebles Ferrús por el serrín que el extractor echaba en su finca y por el lindero. El 9 de octubre perdió el juicio y le condenaron a pagar 6.000 € de costas. En agosto había dicho delante de Gabriel que un día la nave iba a arder.',
          'El viernes quemó rastrojos y volvió a discutir con Gabriel. A las 02:13 desenchufó su propia cámara, la que había puesto para el juicio. Cortó dos alambres para agrandar el hueco de la valla, cruzó con sus botas de goma, roció con el gasóleo agrícola de su tractor la base de la pila de palés de la pared trasera y le prendió fuego. Las llamas entraron por la rejilla del extractor y prendieron el serrín del taller. Volvió a casa y a las 02:51 enchufó otra vez la cámara.',
          'Gabriel había terminado la ronda de las dos en la caseta. Vio el resplandor, llamó a Salvador a las 02:41 sin respuesta, cogió un extintor y entró en la nave por el despacho. Lo vació contra el fuego, pero el humo le venció. A las 02:57 Andrés llamó a su hijo; después dijo que le habían despertado las sirenas.',
          'Salvador estaba endeudado, había ampliado el seguro y también tiene gasóleo agrícola, pero el enchufe del despacho no tenía ninguna programación, no faltaba nada en la nave y el fuego empezó fuera. Mintió sobre la llamada de Gabriel por vergüenza de no haberla cogido. Inés mintió por los muebles de su madre, y Héctor por una inspección hecha con fotos.'
        ]
      },
      trial: {
        andres: [
          { id: 'O1', text: 'La cámara de mi cliente se apagó por un corte de luz. Eso no prueba nada.', accept: ['F6_CV_CLAVE', 'F6_ANT_ANDRES', 'F6_VALLA_LUPA', 'F6_CALZADO'] },
          { id: 'O2', text: 'El gasóleo agrícola lo tiene medio pueblo, incluido el dueño de la empresa, que además cobraba el seguro.', accept: ['F6_ENCHUFE_NUBE', 'F6_INVENTARIO', 'F6_CALZADO', 'F6_VALLA_LUPA'] },
          { id: 'O3', text: 'Fue una pavesa de la quema de rastrojos: un accidente.', accept: ['F6_PALES_TOX', 'F6_RASTROJOS_PERITAJE', 'F6_ACELERANTE'] }
        ],
        generic: [
          { id: 'O1', text: 'Nadie vio a la persona señalada junto a la nave cuando empezó el fuego.', accept: [] },
          { id: 'O2', text: 'La acusación no explica con qué se prendió la pila de palés.', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué el vigilante estaba dentro de la nave.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['andres', 'salvador'],
        spatialBonus: ['F6_VALLA_LUPA', 'F6_CV_CLAVE'],
        temporalConflicts: ['V2a', 'V2b'],
        lateral: [
          { type: 'fact', id: 'S6_AND_HIJO', pts: 25, yes: 'Hiciste que Andrés explicara su llamada de las 02:57.', no: 'No llevaste a Andrés a explicar qué hacía despierto.' },
          { type: 'conflict', id: 'V2a', pts: 30, yes: 'Viste que la cámara del vecino se apagó justo cuando empezó el fuego.', no: 'No contrastaste la grabación del vecino con su declaración.' },
          { type: 'conflict', id: 'V2c', pts: 25 },
          { type: 'chosen', id: 'F6_PALES_TOX', pts: 20 }
        ],
        usefulLab: ['N07:cromatografia', 'N04:cromatografia', 'N04:peritaje', 'N11:comparativa', 'N01:autopsia']
      }
    },

    /* ---------- Versión 3: el empleado, muerte antes del fuego ---------- */
    oscar: {
      facts: {
        F6_AUTOPSIA: { text: 'Autopsia: no hay hollín en las vías respiratorias: ya no respiraba cuando empezó el fuego. Fractura hundida en la nuca, de borde recto y estrecho, compatible con un objeto metálico alargado; no es una fractura por calor. Muerte entre la 01:25 y las 02:00.', time: '01:25', end: '02:00', person: 'gabriel', place: 'nave', source: 'laboratorio', tags: ['muerte', 'autopsia', 'golpe'] },
        F6_COHB: { text: 'Carboxihemoglobina en sangre del 3 %: no llegó a inhalar humo.', person: 'gabriel', source: 'laboratorio', tags: ['muerte'] },
        F6_ACELERANTE: { text: 'Cromatografía: disolvente nitro, el mismo de las latas de la cabina, en dos zonas separadas (cabina de barnizado y almacén de chapa) y en el reguero que las une.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_ORIGEN: { text: 'Peritaje de origen: dos focos independientes dentro de la nave, en la cabina de barnizado y en el almacén de chapa, unidos por un reguero. Dos focos separados descartan un accidente.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_BIDON_TOX: { text: 'Bidón de la cabina: restos de disolvente nitro. Está tumbado, sin tapón, a tres metros de su sitio.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_VALLA_LUPA: { text: 'Lupa: el hueco es antiguo y los alambres están oxidados, pero las telarañas están rotas y el palé se ha movido hace poco. Hay marcas de arrastre hacia el camino.', place: 'camino', source: 'escena', tags: ['acceso'] },
        F6_CALZADO: { text: 'Comparativa: además de las de los bomberos, hay pisadas de zapatillas deportivas talla 42 que van y vienen entre el camino y el hueco de la valla varias veces, más hundidas a la vuelta, como si cargara peso. El dibujo coincide con unas zapatillas de Óscar.', person: 'oscar', place: 'camino', source: 'laboratorio', tags: ['acceso'] },
        F6_INVENTARIO: { text: 'Inventario pericial: las máquinas grandes están calcinadas en su sitio, pero faltan unas veinte herramientas eléctricas portátiles y cuatro rollos de chapa de roble: en su estantería no queda ni un resto metálico.', place: 'nave', source: 'laboratorio', tags: ['objeto'] },
        F6_RONDAS: { text: 'Control de rondas: Gabriel ficha a las 23:02 y a las 00:31 en los cuatro puntos, y a la 01:27 en la puerta de la nave A. Ningún fichaje después: la ronda de las dos no se hizo.', time: '23:02', end: '01:27', person: 'gabriel', place: 'nave', source: 'registro', tags: ['acceso'] },
        F6_TG_CLAVE: { text: 'Teléfono de Gabriel: mensaje a Salvador Ferrús: «Hay un coche sin luces en el camino de atrás. Voy a mirar». Leído a las 07:12.', time: '01:24', person: 'salvador', place: 'nave', source: 'mensaje', tags: ['mensaje', 'telefono'] },
        F6_TG_FALTAS: { text: 'Fotos del teléfono de Gabriel (12 de octubre): la estantería de herramientas eléctricas del taller con varios huecos, y una nota suya: «Faltan otra vez. Lunes a Salvador».', person: 'gabriel', place: 'nave', source: 'dispositivo', tags: ['objeto'] },
        F6_GAS_CLAVE: { text: 'Gasolinera: el coche de Óscar Llorens pasa hacia el polígono a la 01:09 y vuelve hacia Onda a las 02:44.', time: '01:09', end: '02:44', person: 'oscar', place: 'gasolinera', source: 'cámara', tags: ['camara', 'vehiculo'] },
        F6_CV_CLAVE: { text: 'Cámara de Andrés: a la 01:16 un coche sin luces se para en el camino de atrás; a la 01:19 una persona con capucha y mochila entra por el hueco de la valla hacia la nave A. A las 02:33 hay resplandor en dos ventanas distintas de la nave. A las 02:36 la persona sale cargada con dos bultos, vuelve una vez más y el coche se va sin luces a las 02:41.', time: '01:16', end: '02:41', place: 'camino', source: 'cámara', tags: ['camara'] },
        F6_FIN_VENTAS: { text: 'Ventas en internet de Óscar Llorens desde agosto: 23 herramientas eléctricas y rollos de chapa de roble, por 4.300 €. Varias son de los mismos modelos que las del taller.', person: 'oscar', source: 'documento', tags: ['dinero'] },
        F6_ANT_OSCAR: { text: 'Teléfono de Óscar: Onda hasta la 01:02; zona del polígono El Collet de 01:10 a 02:40; Onda desde las 02:50. Sin datos entre las 00:58 y las 03:10.', time: '01:10', end: '02:40', person: 'oscar', place: 'nave', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S6_SAL_LLAMADA: { kind: 'statement', text: 'Salvador declara que por la mañana vio un mensaje de Gabriel de la 01:24 sobre un coche en el camino de atrás.', person: 'salvador', source: 'declaración', tags: ['mensaje'] },
        S6_OSC_VENTAS: { kind: 'statement', text: 'Óscar declara que las herramientas que vende por internet son suyas, de antes de entrar en el taller.', person: 'oscar', source: 'declaración', tags: ['dinero'] },
        S6_HEC_AMPLIACION: { kind: 'statement', text: 'Héctor declara que fue él quien propuso a Salvador en junio ampliar la póliza porque estaban muy por debajo del valor real.', person: 'hector', source: 'declaración', tags: ['seguro'] },
        S6_PIL_RARO: { kind: 'statement', text: 'Pilar declara que Gabriel le había contado que faltaban herramientas y chapa en el taller y que sospechaba de alguien de dentro, sin decirle de quién.', person: 'pilar', source: 'testigo', tags: ['testigo'] },
        S6_OSC_ARDIENDO: { kind: 'statement', text: 'Óscar admite que fue a la nave de madrugada a por unas herramientas suyas, pero dice que cuando llegó ya estaba ardiendo y que huyó sin avisar por miedo.', time: '02:35', person: 'oscar', place: 'camino', source: 'declaración', tags: ['coartada'] },
        S6_OSC_ABOGADO: { kind: 'statement', text: 'Óscar se niega a seguir declarando sin abogado al conocer la autopsia.', person: 'oscar', source: 'declaración', tags: [] }
      },
      answers: {
        salvador: {
          llamada: { a: 'Un mensaje, sí. Lo vi por la mañana: que había un coche sin luces en el camino de atrás y que iba a mirar.' },
          maquinas: { type: 'creencia' }
        },
        oscar: {
          noche: { type: 'mentira' },
          herramientas: { type: 'mentira' },
          ventas: { a: 'Herramientas mías, de antes de entrar en el taller. Las tenía en el trastero.', type: 'mentira' }
        },
        pilar: {
          raro: { a: 'Que faltaban herramientas y chapa en el taller y que sospechaba de alguien de dentro. No me dijo quién; decía que primero quería estar seguro.' }
        },
        hector: {
          ampliacion: { a: 'Se lo propuse yo. Estaban muy por debajo del valor real y, si pasaba algo, la empresa se hundía. Le costó aceptar la prima.' }
        }
      },
      confront: {
        salvador: {
          F6_TG_CLAVE: { a: 'Lo leí a las siete y pico. Pensé que serían unos chavales.', reveals: [] },
          F6_INVENTARIO: { a: '¿Herramientas? No sabía nada. El inventario lo llevaba Óscar.', reveals: [] },
          F6_GAS_CLAVE: { a: '¿Óscar a esas horas por el polígono? No tengo ni idea de qué hacía.', reveals: [] }
        },
        oscar: {
          F6_GAS_CLAVE: { a: 'Iba a ver a un amigo. No le voy a decir quién.', reveals: [] },
          F6_ANT_OSCAR: { a: '(Se frota la cara.) Vale. Fui a por unas herramientas mías que tenía en el taller. Cuando llegué, la nave ya estaba ardiendo y me fui corriendo. No avisé por miedo.', reveals: ['S6_OSC_ARDIENDO'] },
          F6_CALZADO: { a: 'Zapatillas así tiene todo el mundo.', reveals: [] },
          F6_INVENTARIO: { a: 'Yo no he sacado nada del taller.', reveals: [] },
          F6_FIN_VENTAS: { a: 'Son herramientas mías. De antes.', reveals: [] },
          F6_TG_FALTAS: { a: 'Eso lo dejaría así cualquiera. En el taller entra mucha gente.', reveals: [] },
          F6_AUTOPSIA: { a: '(Se queda blanco.) No... Yo no... Quiero un abogado.', reveals: ['S6_OSC_ABOGADO'] }
        },
        andres: {
          F6_CV_CLAVE: { a: 'Ahí lo tiene: alguien entró por el hueco. Yo estaba durmiendo.', reveals: [] },
          F6_CALZADO: { a: 'Esas zapatillas no son mías. Yo voy siempre con botas.', reveals: [] }
        },
        pilar: {
          F6_AUTOPSIA: { a: '¿Muerto antes del fuego? ¿Me está diciendo que lo mataron?', reveals: [] }
        },
        hector: {
          S6_SAL_POLIZA: { a: 'Es verdad, fue idea mía. Salvador no quería subir la prima.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'V3a', a: 'S6_OSC_CASA', b: 'F6_GAS_CLAVE', type: 'Lugar distinto', severity: 'alta', desc: 'Óscar dice que pasó la noche en casa; su coche pasa hacia el polígono a la 01:09 y vuelve a las 02:44.' },
        { id: 'V3b', a: 'S6_OSC_CASA', b: 'F6_ANT_OSCAR', type: 'Lugar distinto', severity: 'alta', desc: 'Óscar dice que estuvo en casa jugando en línea; su teléfono está en el polígono de 01:10 a 02:40 y sin datos.' },
        { id: 'V3c', a: 'S6_OSC_ARDIENDO', b: 'F6_CV_CLAVE', type: 'Secuencia incompatible', severity: 'alta', desc: 'Óscar dice que llegó con la nave ya ardiendo; alguien entra por el hueco a la 01:19 y el resplandor no aparece hasta las 02:33.' },
        { id: 'V3d', a: 'S6_OSC_ARDIENDO', b: 'F6_AUTOPSIA', type: 'Secuencia incompatible', severity: 'alta', desc: 'Óscar dice que el fuego ya había empezado al llegar; Gabriel murió de un golpe entre la 01:25 y las 02:00, sin respirar humo.' },
        { id: 'V3e', a: 'S6_OSC_VENTAS', b: 'F6_INVENTARIO', type: 'Hecho distinto', severity: 'media', desc: 'Óscar dice que las herramientas que vende son suyas; del taller faltan unas veinte herramientas eléctricas y cuatro rollos de chapa, de los mismos modelos.' },
        { id: 'V3f', a: 'S6_OSC_HERRAMIENTAS', b: 'F6_TG_FALTAS', type: 'Hecho distinto', severity: 'media', desc: 'Óscar dice que no faltaba ninguna herramienta; Gabriel fotografió la estantería con huecos el 12 de octubre.' }
      ],
      truth: {
        culprit: 'oscar',
        motive: 'm6_robo',
        method: 'me6_golpe',
        window: 'w6_0115',
        accomplices: [],
        partialMethods: { me6_exterior: 'Viste que el fuego fue provocado, pero no dónde empezó ni que Gabriel ya estaba muerto.' },
        decisive: ['F6_AUTOPSIA', 'F6_COHB', 'F6_CV_CLAVE', 'F6_GAS_CLAVE', 'F6_ANT_OSCAR', 'F6_INVENTARIO', 'F6_FIN_VENTAS', 'F6_CALZADO', 'F6_ORIGEN', 'F6_ACELERANTE', 'F6_RONDAS', 'F6_TG_CLAVE', 'F6_VALLA_LUPA', 'F6_TG_FALTAS', 'F6_BIDON_TOX'],
        weak: ['F6_FIN_POLIZA', 'F6_FIN_SALVADOR', 'S6_AND_AVISO', 'F6_RASTROJOS', 'F6_VJ_2340', 'F6_VJ_INES', 'F6_CRA_AVERIA', 'F6_ENCHUFE_NUBE', 'F6_FIN_ANDRES'],
        keyConflicts: ['V3a', 'V3c', 'V3d', 'V3e'],
        narrative: [
          'Óscar Llorens debía unos 14.000 € en préstamos rápidos y apuestas. Desde agosto sacaba herramientas eléctricas y rollos de chapa del taller y los vendía por internet. Gabriel se había dado cuenta: el 12 de octubre fotografió la estantería con huecos y anotó que el lunes se lo diría a Salvador.',
          'El viernes, a la 01:09, Óscar fue hacia el polígono en su coche, apagó las luces y aparcó en el camino de atrás. Entró por el hueco de la valla y abrió la puerta pequeña del taller con su llave. Gabriel vio el coche, escribió a Salvador a la 01:24 y fue a mirar: fichó en la puerta de la nave A a la 01:27 y le sorprendió dentro. Óscar le golpeó en la nuca con un sargento de carpintero y le mató.',
          'Pasó una hora cargando herramientas y chapa en el coche. A las 02:30 roció con el disolvente de la cabina dos puntos distintos, la cabina y el almacén de chapa, y les prendió fuego para que pareciera un accidente y el cuerpo se calcinara. Se fue sin luces a las 02:41 y a las 02:44 pasó por la gasolinera camino de Onda. La autopsia lo desmonta: Gabriel no respiró humo, ya estaba muerto cuando empezó el fuego.',
          'Salvador tenía deudas, había ampliado el seguro y no reparó el detector, pero el enchufe del despacho no se programó y las máquinas grandes estaban en su sitio. Andrés había amenazado y quemó rastrojos, pero su propia cámara grabó al intruso. Inés mintió por los muebles de su madre, y Héctor por una inspección hecha con fotos.'
        ]
      },
      trial: {
        oscar: [
          { id: 'O1', text: 'Mi cliente llegó cuando la nave ya ardía y huyó asustado. Eso no es un delito de homicidio.', accept: ['F6_CV_CLAVE', 'F6_AUTOPSIA', 'F6_COHB'] },
          { id: 'O2', text: 'El vigilante murió por el humo, como en cualquier incendio.', accept: ['F6_AUTOPSIA', 'F6_COHB', 'F6_EXTINTOR_LUPA'] },
          { id: 'O3', text: 'Las herramientas que vende mi cliente son suyas. Nada las relaciona con el taller.', accept: ['F6_INVENTARIO', 'F6_FIN_VENTAS', 'F6_CALZADO', 'F6_TG_FALTAS'] }
        ],
        generic: [
          { id: 'O1', text: 'Nadie identifica a la persona que entró por el hueco de la valla.', accept: [] },
          { id: 'O2', text: 'La acusación no explica la fractura del cráneo ni la ausencia de hollín.', accept: [] },
          { id: 'O3', text: 'La acusación no explica qué se llevó el intruso de la nave.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['oscar', 'andres'],
        spatialBonus: ['F6_GAS_CLAVE', 'F6_CV_CLAVE'],
        temporalConflicts: ['V3c', 'V3d'],
        lateral: [
          { type: 'fact', id: 'S6_OSC_ARDIENDO', pts: 25, yes: 'Llevaste a Óscar a admitir que estuvo en la nave esa noche.', no: 'No llevaste a Óscar a explicar dónde estuvo de verdad.' },
          { type: 'conflict', id: 'V3d', pts: 30, yes: 'Viste que Gabriel ya estaba muerto cuando empezó el fuego.', no: 'No contrastaste la autopsia con la hora del incendio.' },
          { type: 'conflict', id: 'V3e', pts: 25 },
          { type: 'chosen', id: 'F6_COHB', pts: 20 }
        ],
        usefulLab: ['N01:autopsia', 'N13:peritaje', 'N11:comparativa', 'N04:peritaje', 'N04:cromatografia']
      }
    }
  }
});
