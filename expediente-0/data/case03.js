/* EXPEDIENTE 0 — Caso EXP-003 «Las cuatro llamadas».
 * Única fuente de verdad del caso. Estructura causal propia: muerte en una discusión
 * no planificada, simulación de robo y manipulación posterior del teléfono de la víctima. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-003',
  title: 'Las cuatro llamadas',
  type: 'Homicidio',
  difficulty: 'Muy alta',
  minRank: 2,
  budget: 1100,
  location: 'C/ de la Paz 9, 7.º A (Edificio Lonja) · Valencia',
  date: 'Noche del jueves 19 al viernes 20 de noviembre de 2026',
  victim: {
    id: 'tomas',
    name: 'Tomás Arnau Ribes',
    age: 63,
    job: 'Propietario de Gráficas Arnau (imprenta); viudo'
  },
  deathWindow: 'Entre las 21:30 y las 00:30 (estimación preliminar en el lugar)',
  briefing: [
    'A las 08:15 del viernes 20 de noviembre, Rosa Benlloch, asistenta de Tomás Arnau, lo encuentra muerto en el despacho de su piso. Tiene una herida en la sien y el cajón del escritorio está forzado.',
    'El teléfono de Tomás registra cuatro llamadas esa noche. La última es a las 23:14 y nadie la contesta.',
    'El edificio tiene cámara en el ascensor, pero no en la escalera. Hay un conserje, un vecino que fue socio de Tomás, un sobrino con deudas, una hija en Madrid y una copia de llave hecha hace diez días.',
    'Que alguien parezca vivo en un registro no significa que lo estuviera. Comprueba cada hora contra las demás fuentes.'
  ],
  initialFacts: ['F3_HALLAZGO', 'F3_VENTANA', 'F3_CUATRO'],
  sceneSummary: 'Piso en séptima planta con ascensor vigilado por cámara y escalera sin cámara. Puerta de resbalón sin forzar; cajón del escritorio forzado.',

  mapScale: 0.062,
  places: {
    p7: { name: 'Edificio Lonja · 7.º A (vivienda de Tomás)', x: 50, y: 36, kind: 'escena' },
    p6: { name: 'Edificio Lonja · 6.º A (vivienda de Sergio)', x: 50, y: 44, kind: 'domicilio' },
    porteria: { name: 'Edificio Lonja · portería', x: 50, y: 52, kind: 'portería' },
    barfrente: { name: 'Bar frente al edificio', x: 60, y: 54, kind: 'restaurante' },
    ruzafa: { name: 'Bar La Esquina (Ruzafa)', x: 62, y: 78, kind: 'restaurante' },
    benicalap: { name: 'Benicalap (domicilio de Rosa)', x: 30, y: 8, kind: 'domicilio' },
    madrid: { name: 'Madrid (domicilio de Clara)', x: 4, y: 96, kind: 'domicilio', offmap: '≈ 350 km' }
  },

  people: [
    {
      id: 'sergio', name: 'Sergio Montes Alcaraz', initials: 'SM', age: 58,
      role: 'Vecino del 6.º A', relation: 'Exsocio de Tomás en la imprenta; jugaban al ajedrez los jueves',
      hidden: { honestidad: 25, miedo: 75, manipulacion: 60, autocontrol: 55, confianza: 30 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Tomás?', a: 'Fuimos socios en la imprenta veinte años. Ahora solo vecinos. Jugábamos al ajedrez los jueves.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 00:00?', a: 'En casa. A las diez y veinte le llamé para decirle que esa noche no subía a jugar porque me dolía la cabeza. No subí. Me acosté pronto.', type: 'mentira', reveals: ['S3_SER_NOSUBE'] },
        { id: 'ultimo', q: '¿Cuándo habló con él por última vez?', a: 'En esa llamada de las diez y veinte. Doce segundos.', type: 'mentira', reveals: [] },
        { id: 'llave', q: '¿Tiene llave de la vivienda de Tomás?', a: '¿Llave de su casa? No. ¿Para qué iba a tenerla?', type: 'mentira', reveals: ['S3_SER_SINLLAVE'] },
        { id: 'deuda', q: '¿Tenía alguna deuda con Tomás?', requires: ['F3_PC_PAGARES', 'F3_PC_DEMANDA', 'F3_FIN_SERGIO', 'F3_WA_BORRADO', 'S3_ROSA_DEUDA'], a: 'Le debía dinero, sí, de cuando cerramos la sociedad. Lo íbamos a arreglar como amigos.', type: 'media', reveals: ['S3_SER_DEUDA'] },
        { id: 'ropa', q: '¿Qué llevaba puesto esa noche?', requires: ['F3_ASC_2309', 'F3_ASC_2324'], a: 'Un pijama. Ya le he dicho que estaba en la cama.', type: 'mentira', reveals: ['S3_SER_PIJAMA'] }
      ],
      confront: {
        F3_ASC_2226: { a: 'Vale, subí un momento para decírselo en persona. Estaba bien. Bajé por la escalera a las diez y media.', reveals: ['S3_SER_SUBIO'] },
        F3_ASC_2324: { a: 'Bajé a tirar la basura.', reveals: [] },
        S3_JUL_MONTES: { a: 'Bajé a tirar la basura. El conserje se confunde de ropa.', reveals: [] },
        F3_WA_BORRADO: { a: 'Yo no he tocado su teléfono.', reveals: [] },
        F3_PAGARES_TRITURADOS: { a: '(Se queda callado mucho rato.) Quiero un abogado.', reveals: ['S3_SER_ABOGADO'] },
        S3_ROSA_LLAVE: { a: 'Me la dio hace años. Ni me acordaba de que la tenía.', reveals: ['S3_SER_ADMITELLAVE'] },
        F3_GANCHO: { a: 'No sé nada de ganchos.', reveals: [] },
        F3_AJEDREZ_HUELLAS: { a: 'Jugábamos todas las semanas. Claro que hay huellas mías.', reveals: [] },
        F3_ASC_2309: { a: 'Ese no soy yo. No se le ve la cara.', reveals: [] },
        F3_PC_DEMANDA: { a: 'Siempre amenazaba con demandas. Nunca las presentaba.', reveals: [] }
      },
      confrontDefault: 'No sé qué tiene que ver eso conmigo.'
    },
    {
      id: 'marcos', name: 'Marcos Arnau Peris', initials: 'MA', age: 34,
      role: 'Sobrino de Tomás', relation: 'Heredero en el testamento vigente',
      hidden: { honestidad: 70, miedo: 55, manipulacion: 25, autocontrol: 40, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con su tío?', a: 'Me crió en parte cuando murió mi padre. Discutíamos por dinero, pero le quería.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 00:00?', a: 'En el bar La Esquina, en Ruzafa, con unos amigos, de diez a once y media.', type: 'media', reveals: ['S3_MAR_BAR'] },
        { id: 'ultimo', q: '¿Cuándo habló con él por última vez?', a: 'Le llamé a las nueve para pedirle un préstamo. Me dijo que no. Discutimos un poco.', type: 'verdad', reveals: [] },
        { id: 'llave', q: '¿Tiene llave del piso?', a: 'Sí, desde hace años. Hace diez días hice otra copia porque él me lo pidió, para Rosa.', type: 'verdad', reveals: ['S3_MAR_COPIA'] },
        { id: 'salio', q: '¿Salió del bar en algún momento?', requires: ['F3_BAR'], a: 'Salí a la terraza a hablar por teléfono con mi novia, media hora o así. No me moví de allí.', type: 'verdad', reveals: ['S3_MAR_TERRAZA'] }
      ],
      confront: {
        F3_PC_TESTAMENTO: { a: '¿Me quitaba la imprenta? No lo sabía. Me entero ahora.', reveals: [] },
        F3_CERR: { a: 'Ya se lo he dicho: la copia era para Rosa. Pregúntele a ella.', reveals: [] },
        F3_FIN_MARCOS: { a: 'Tengo deudas, sí. Por eso le pedí el préstamo. Eso no me convierte en nada.', reveals: [] },
        F3_ANT_MARCOS: { a: 'Ahí tiene la llamada con mi novia. Veintiséis minutos.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'clara', name: 'Clara Arnau Serra', initials: 'CA', age: 36,
      role: 'Hija de Tomás', relation: 'Vive y trabaja en Madrid desde 2018',
      hidden: { honestidad: 85, miedo: 30, manipulacion: 15, autocontrol: 60, confianza: 60 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con su padre?', a: 'Buena, aunque a distancia. Hablábamos casi cada noche.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo esa noche?', a: 'En casa, en Madrid. Hablé con él a las diez menos diez.', type: 'verdad', reveals: ['S3_CLA_MADRID'] },
        { id: 'ultimo', q: '¿De qué hablaron en esa llamada?', a: 'Estaba enfadado. Me dijo que iba a demandar a un vecino que le debía mucho dinero y que se le había acabado la paciencia.', type: 'verdad', reveals: ['S3_CLA_VECINO'] },
        { id: 'problemas', q: '¿Sabe a qué vecino se refería?', a: 'Se llevaba fatal con el conserje. Si dijo "un vecino", yo creo que hablaba de Julián; siempre se quejaba de él.', type: 'creencia', reveals: ['S3_CLA_JULIAN'] },
        { id: 'llave', q: '¿Tiene llave del piso?', a: 'Sí, pero estaba a 350 kilómetros.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F3_PC_TESTAMENTO: { a: 'Me lo había comentado. Lo de la fundación era una idea de hace meses.', reveals: [] },
        F3_PC_DEMANDA: { a: '¿Montes? Entonces el vecino era Sergio, no Julián... Yo había entendido otra cosa.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'rosa', name: 'Rosa Benlloch Mir', initials: 'RB', age: 59,
      role: 'Asistenta', relation: 'Trabajaba para Tomás desde 2014; encontró el cuerpo',
      hidden: { honestidad: 95, miedo: 40, manipulacion: 5, autocontrol: 50, confianza: 75 },
      questions: [
        { id: 'rel', q: '¿Desde cuándo trabaja para Tomás?', a: 'Doce años, tres mañanas a la semana.', type: 'verdad', reveals: [] },
        { id: 'hallazgo', q: '¿Cómo encontró el piso esta mañana?', a: 'Llegué a las ocho y diez. La puerta estaba cerrada, pero sin echar la llave. Le encontré en el despacho.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo anoche?', a: 'En mi casa, en Benicalap. Por la mañana vi una llamada perdida suya de las once y cuarto, con un mensaje en el buzón que no tenía nada: solo ruidos.', type: 'verdad', reveals: ['S3_ROSA_BUZON'] },
        { id: 'llave', q: '¿Quién tenía llave del piso?', a: 'Yo tengo una copia que me trajo Marcos hace unos días. Y el señor guardaba otra en un gancho de la entrada para el vecino de abajo, el señor Montes, por si pasaba algo. Esta mañana ese gancho estaba vacío.', type: 'verdad', reveals: ['S3_ROSA_LLAVE'] },
        { id: 'problemas', q: '¿Tenía Tomás problemas con alguien?', a: 'El señor Montes le debía dinero desde que cerraron la sociedad. Últimamente discutían. Y con el conserje, por tonterías de la comunidad.', type: 'verdad', reveals: ['S3_ROSA_DEUDA'] }
      ],
      confront: {
        F3_CERR: { a: 'Sí, esa es la copia que me trajo Marcos. La tengo aquí.', reveals: [] },
        F3_INTACTO: { a: 'Qué raro. Si fueran ladrones se habrían llevado el reloj, es de oro.', reveals: [] }
      },
      confrontDefault: 'De eso no sé nada.'
    },
    {
      id: 'julian', name: 'Julián Ortega Sanchis', initials: 'JO', age: 61,
      role: 'Conserje del edificio', relation: 'Conserje desde 2015; vive en el bajo',
      hidden: { honestidad: 50, miedo: 70, manipulacion: 20, autocontrol: 45, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Tomás?', a: 'Era un vecino exigente. Se quejaba de todo a la comunidad. Pero nada más.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 00:00?', a: 'En la portería hasta las once y media, sin moverme. Luego a mi vivienda, aquí abajo.', type: 'mentira', reveals: ['S3_JUL_PORTERIA'] },
        { id: 'vio', q: '¿Vio a alguien esa noche?', a: 'Al señor Montes, que bajó sobre las once y veinticinco. Me dijo que iba a dar una vuelta. Iba con una sudadera oscura.', type: 'verdad', reveals: ['S3_JUL_MONTES'] },
        { id: 'llaves', q: '¿Tiene llaves de las viviendas?', a: 'Un juego maestro en un cajetín cerrado de la portería. No falta ninguna.', type: 'verdad', reveals: [] },
        { id: 'camara', q: '¿Quién gestiona la cámara del ascensor?', a: 'Yo guardo las grabaciones. Se las doy sin problema.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F3_ASC_2241: { a: '...Salí veinte minutos al bar de enfrente. Si se entera la comunidad, me echan. No subí a ningún sitio.', reveals: ['S3_JUL_SALIO'] },
        F3_LIBRO: { a: 'Lo taché porque no hice la ronda. Me fui al bar de enfrente veinte minutos. No subí a ningún sitio.', reveals: ['S3_JUL_SALIO'] },
        F3_FIN_JULIAN: { a: 'Se quejaba de todo. Eso no es motivo para nada.', reveals: [] },
        S3_CLA_JULIAN: { a: '¿Yo, deberle dinero? No le debía nada. Que lo miren.', reveals: [] }
      },
      confrontDefault: 'Yo de eso no sé nada.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'vivienda', name: 'Vivienda 7.º A', legend: 'Planta 7.ª · 96 m² · puerta de resbalón',
        rooms: [
          { id: 'entrada', name: 'Entrada', x: 0, y: 60, w: 22, h: 40 },
          { id: 'salon', name: 'Salón', x: 22, y: 50, w: 46, h: 50 },
          { id: 'despacho', name: 'Despacho', x: 0, y: 0, w: 45, h: 60 },
          { id: 'dormitorio', name: 'Dormitorio', x: 45, y: 0, w: 55, h: 50 },
          { id: 'cocina', name: 'Cocina', x: 68, y: 50, w: 32, h: 50 }
        ],
        hotspots: [
          { ev: 'T08', x: 4, y: 80 }, { ev: 'T10', x: 14, y: 70 }, { ev: 'T01', x: 18, y: 36 },
          { ev: 'T02', x: 30, y: 18 }, { ev: 'T03', x: 38, y: 30 }, { ev: 'T05', x: 10, y: 14 },
          { ev: 'T06', x: 22, y: 8 }, { ev: 'T09', x: 40, y: 50 }, { ev: 'T07', x: 46, y: 76 },
          { ev: 'T04', x: 78, y: 22 }
        ]
      },
      {
        id: 'edificio', name: 'Zonas comunes', legend: 'Rellanos 6.º y 7.º, ascensor, escalera y portería',
        rooms: [
          { id: 'r7', name: 'Rellano 7.º', x: 0, y: 0, w: 60, h: 33 },
          { id: 'r6', name: 'Rellano 6.º', x: 0, y: 33, w: 60, h: 33 },
          { id: 'pb', name: 'Portería (planta baja)', x: 0, y: 66, w: 60, h: 34 },
          { id: 'asc', name: 'Ascensor', x: 60, y: 0, w: 18, h: 100 },
          { id: 'esc', name: 'Escalera', x: 78, y: 0, w: 22, h: 100 }
        ],
        hotspots: [{ ev: 'R01', x: 69, y: 50 }, { ev: 'R02', x: 89, y: 30 }, { ev: 'R04', x: 22, y: 50 }, { ev: 'R03', x: 28, y: 84 }]
      }
    ]
  },

  evidence: [
    { id: 'T01', name: 'Cuerpo de la víctima', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal', room: 'Despacho',
      public: 'Tomás yace en el suelo del despacho, junto al escritorio.',
      detail: 'Herida en la sien izquierda. Hematomas recientes en ambos antebrazos. Sin otras lesiones visibles.',
      value: 'Causa y mecanismo de la muerte.', limits: 'La hora en el lugar es solo orientativa.',
      reveals: ['F3_HERIDA'],
      lab: { autopsia: { cost: 300, reveals: ['F3_AUTOPSIA', 'F3_AUTOPSIA_HORA'] } } },
    { id: 'T02', name: 'Esquina del escritorio', type: 'Escena', level: 2, fixed: true, room: 'Despacho',
      public: 'Escritorio metálico con esquinas en ángulo.',
      detail: 'Restos de sangre y cabellos en la esquina delantera izquierda del escritorio.',
      value: 'Puede ser el punto de impacto.', limits: 'No dice cómo se produjo la caída.',
      reveals: ['F3_ESQUINA_ESCENA'],
      lab: { comparativa: { cost: 180, label: 'Comparativa lesión-superficie', reveals: ['F3_ESQUINA'] } } },
    { id: 'T03', name: 'Cajón forzado', type: 'Objeto', level: 3, forensic: { lupa: { reveals: ['F3_LUPA_CAJON'] } }, room: 'Despacho',
      public: 'El cajón superior del escritorio está abierto y dañado.',
      detail: 'Forzado con un abrecartas que sigue en el suelo. Carpetas revueltas. Queda una funda de plástico vacía rotulada a mano «PAGARÉS S.M.».',
      value: 'Indica qué buscaba quien lo forzó.', limits: 'No sabemos qué había dentro ni cuándo se vació.',
      reveals: ['F3_CAJON'],
      lab: { huellas: { cost: 120, label: 'Huellas en el abrecartas', reveals: ['F3_ABRECARTAS'] } } },
    { id: 'T04', name: 'Cartera y joyero', type: 'Objeto', level: 2, room: 'Dormitorio',
      public: 'Mesilla del dormitorio.',
      detail: 'La cartera de Tomás con 310 € y tarjetas, y un joyero con un reloj de oro, en su sitio.',
      value: 'Ayuda a valorar la hipótesis de robo.', limits: 'Un ladrón interrumpido podría no haber llegado.',
      reveals: ['F3_INTACTO'] },
    { id: 'T05', name: 'Teléfono de Tomás', type: 'Dispositivo', level: 2, forensic: { uv: { reveals: ['F3_UV_TEL'] } }, room: 'Despacho',
      public: 'Teléfono móvil sobre el escritorio.',
      detail: 'Teléfono sin bloqueo de pantalla. Muestra abierta la lista de llamadas recientes.',
      value: 'Llamadas, mensajes y manipulación posterior.', limits: 'No indica quién lo tuvo en la mano.',
      reveals: ['F3_TELEFONO_ESCENA'], unlocks: ['D3_PHONE'],
      lab: { huellas: { cost: 120, reveals: ['F3_TEL_HUELLAS'] } } },
    { id: 'T06', name: 'Ordenador del despacho', type: 'Dispositivo', level: 2, room: 'Despacho',
      public: 'Ordenador de sobremesa encendido.',
      detail: 'Sesión abierta. Requiere análisis forense para recuperar documentos y fechas.',
      value: 'Documentos recientes y su historial.', limits: '—',
      reveals: ['F3_PC_ESCENA'], unlocks: ['D3_PC'] },
    { id: 'T07', name: 'Tablero de ajedrez', type: 'Objeto', level: 5, room: 'Salón',
      public: 'Tablero de ajedrez en la mesa del salón.',
      detail: 'Una partida a medias. Dos tazas de café limpias en la cocina.',
      value: 'Puede indicar una visita.', limits: 'Las partidas eran semanales.',
      reveals: ['F3_AJEDREZ'],
      lab: { huellas: { cost: 120, reveals: ['F3_AJEDREZ_HUELLAS'] } } },
    { id: 'T08', name: 'Puerta de entrada', type: 'Escena', level: 2, fixed: true, forensic: { luminol: { reveals: ['F3_LUMINOL_POMO'] } }, room: 'Entrada',
      public: 'Puerta blindada de la vivienda.',
      detail: 'Cerradura de resbalón: se cierra sola al salir. Sin signos de forzamiento. La llave no estaba echada.',
      value: 'Indica cómo se salió del piso.', limits: 'Cualquiera que saliera la habría dejado igual.',
      reveals: ['F3_PUERTA'] },
    { id: 'T09', name: 'Papelera del despacho', type: 'Documento', level: 4, room: 'Despacho',
      public: 'Papelera junto al escritorio.',
      detail: 'Papel rasgado: fragmentos impresos de una demanda civil de reclamación de cantidad. Faltan los trozos con el nombre del demandado.',
      value: 'Puede indicar un conflicto económico.', limits: 'No sabemos quién la rompió ni cuándo.',
      reveals: ['F3_DEMANDA_ROTA'] },
    { id: 'T10', name: 'Ganchos de la entrada', type: 'Objeto', level: 1, room: 'Entrada',
      public: 'Ganchos para llaves junto a la puerta.',
      detail: 'En un gancho cuelgan las llaves de Tomás. A su lado, un gancho vacío con una etiqueta adhesiva: «Copia vecino».',
      value: 'Indica qué llaves había en la casa.', limits: 'No dice desde cuándo está vacío.',
      reveals: ['F3_GANCHO'] },
    { id: 'R01', name: 'Cámara del ascensor', type: 'Dispositivo', level: 2, fixed: true, room: 'Ascensor',
      public: 'Cámara interior del ascensor.',
      detail: 'Graba cada vez que se abren las puertas e indica la planta. Las grabaciones las custodia el conserje.',
      value: 'Quién sube y baja, y a qué planta.', limits: 'La escalera no tiene cámara.',
      reveals: ['F3_CAMARA_ESCENA'] },
    { id: 'R02', name: 'Escalera', type: 'Escena', level: 2, fixed: true, forensic: { polvo: { reveals: ['F3_POLVO_ESC'] } }, room: 'Escalera',
      public: 'Escalera comunitaria.',
      detail: 'Sin cámara. Las puertas de los rellanos se abren desde dentro sin llave. Del 6.º al 7.º hay 22 escalones.',
      value: 'Vía de movimiento entre plantas sin registro.', limits: '—',
      reveals: ['F3_ESCALERA'] },
    { id: 'R03', name: 'Libro de la portería', type: 'Documento', level: 4, room: 'Portería',
      public: 'Libro de incidencias sobre el mostrador.',
      detail: 'Entrada del jueves: «22:30–22:50 ronda de garaje», tachado; encima, «sin incidencias».',
      value: 'Registra la presencia del conserje.', limits: 'Lo escribe el propio conserje.',
      reveals: ['F3_LIBRO'] },
    { id: 'R04', name: 'Cuarto de basuras del 6.º', type: 'Documento', level: 3, room: 'Rellano 6.º',
      public: 'Cuarto de basuras de la sexta planta.',
      detail: 'Una bolsa con tiras de papel triturado, aún sin recoger.',
      value: 'Puede contener documentos destruidos.', limits: 'Lo usan las dos viviendas de la planta (la 6.º B está vacía, en venta).',
      reveals: ['F3_TRITURADO'],
      lab: { documentos: { cost: 250, reveals: ['F3_PAGARES_TRITURADOS'] } } }
  ],

  labKinds: { autopsia: 'Autopsia completa', comparativa: 'Comparativa', huellas: 'Huellas dactilares', documentos: 'Reconstrucción documental' },

  digital: [
    { id: 'D3_ASC', name: 'Grabaciones del ascensor', cost: 100, desc: 'Aperturas de puertas con planta y hora, de 21:00 a 09:00.',
      reveals: ['F3_ASC_2131', 'F3_ASC_2134', 'F3_ASC_2226', 'F3_ASC_2241', 'F3_ASC_2309', 'F3_ASC_2316', 'F3_ASC_2324', 'F3_ASC_NOSUBE', 'F3_ASC_ROSA'] },
    { id: 'D3_PHONE', name: 'Extracción del teléfono de Tomás', cost: 250, desc: 'Registro de llamadas, mensajería y copias de seguridad.', requires: 'T05',
      reveals: ['F3_LL1', 'F3_LL2', 'F3_LL3', 'F3_LL4', 'F3_WA_BORRADO'] },
    { id: 'D3_AUDIO', name: 'Análisis del buzón de voz', cost: 180, desc: 'Análisis acústico del mensaje de voz que deja la cuarta llamada.', requiresDigital: 'D3_PHONE',
      reveals: ['F3_AUDIO'] },
    { id: 'D3_PC', name: 'Análisis del ordenador', cost: 250, desc: 'Documentos recientes y fechas de modificación.', requires: 'T06',
      reveals: ['F3_PC_TESTAMENTO', 'F3_PC_DEMANDA', 'F3_PC_PAGARES'] },
    { id: 'D3_CERRAJERO', name: 'Registro de la cerrajería del barrio', cost: 80, desc: 'Copias de llaves realizadas en el último mes.',
      reveals: ['F3_CERR'] },
    { id: 'D3_BAR', name: 'Registros del bar La Esquina', cost: 60, desc: 'Cámara interior y pagos con tarjeta.',
      reveals: ['F3_BAR'] },
    { id: 'D3_FIN', name: 'Datos financieros', cost: 150, desc: 'Situación económica de las personas del expediente.',
      reveals: ['F3_FIN_MARCOS', 'F3_FIN_SERGIO', 'F3_FIN_CLARA', 'F3_FIN_JULIAN'] }
  ],

  judicial: {
    max: 2,
    desc: 'Datos de antenas y llamadas de un teléfono entre las 21:00 y las 01:00. El juzgado autoriza dos solicitudes.',
    results: {
      sergio: ['F3_ANT_SERGIO'], marcos: ['F3_ANT_MARCOS'], clara: ['F3_ANT_CLARA'],
      rosa: ['F3_ANT_ROSA'], julian: ['F3_ANT_JULIAN']
    }
  },

  facts: {
    F3_LUMINOL_POMO: { text: 'Luminol: reacción en el pomo interior de la puerta y en el marco: restos de sangre limpiados.', place: 'p7', source: 'laboratorio', tags: ['sangre', 'puerta', 'acceso'] },
    F3_UV_TEL: { text: 'Luz UV: marcas con textura de guante de látex sobre la pantalla del teléfono de Tomás.', source: 'laboratorio', tags: ['telefono', 'huella'] },
    F3_POLVO_ESC: { prints: [{ at: 'Pasamanos 6.º–7.º', match: 'sergio' }], text: 'Polvo revelador: huellas de Sergio Montes en el pasamanos entre el 6.º y el 7.º. Vive en el 6.º: puede ser un uso habitual.', person: 'sergio', source: 'laboratorio', tags: ['escalera', 'huella'] },
    F3_LUPA_CAJON: { text: 'Lupa: las marcas del abrecartas en el cajón son superficiales y hechas desde arriba; el pestillo está intacto: el cajón no estaba cerrado con llave cuando se "forzó".', source: 'escena', tags: ['cajon', 'robo'] },
    F3_HALLAZGO: { text: 'Rosa encuentra a Tomás muerto en el despacho al llegar a trabajar.', time: '08:15', person: 'rosa', place: 'p7', source: 'informe policial', tags: ['hallazgo'] },
    F3_VENTANA: { text: 'Estimación preliminar en el lugar: muerte entre las 21:30 y las 00:30.', time: '21:30', end: '00:30', person: 'tomas', source: 'informe forense', tags: ['muerte', 'hora'] },
    F3_CUATRO: { text: 'El teléfono de Tomás registra cuatro llamadas entre las 21:00 y las 23:30. La última, a las 23:14, nadie la contesta.', source: 'informe policial', tags: ['llamada'] },

    F3_HERIDA: { text: 'Herida en la sien izquierda y hematomas recientes en ambos antebrazos.', person: 'tomas', source: 'informe forense', tags: ['muerte', 'golpe'] },
    F3_AUTOPSIA: { text: 'Autopsia: la lesión mortal es compatible con un impacto contra una arista al caer. Los hematomas de los antebrazos son compatibles con un agarre o un empujón.', person: 'tomas', source: 'laboratorio', tags: ['muerte', 'golpe'] },
    F3_AUTOPSIA_HORA: { text: 'Autopsia: por el contenido gástrico (cena entregada a las 21:31), la muerte se produjo entre las 22:15 y las 22:50.', time: '22:15', end: '22:50', person: 'tomas', place: 'p7', source: 'informe forense', tags: ['muerte', 'hora'] },
    F3_ESQUINA_ESCENA: { text: 'Sangre y cabellos en la esquina delantera izquierda del escritorio.', source: 'escena', tags: ['golpe'] },
    F3_ESQUINA: { text: 'La sangre y los cabellos de la esquina son de Tomás; la altura y el ángulo son compatibles con una caída hacia atrás.', source: 'laboratorio', tags: ['golpe', 'muerte'] },
    F3_CAJON: { text: 'El cajón del escritorio fue forzado con un abrecartas; queda una funda vacía rotulada «PAGARÉS S.M.».', place: 'p7', source: 'escena', tags: ['cajon', 'documento', 'pagares'] },
    F3_ABRECARTAS: { text: 'El abrecartas no tiene huellas aprovechables: fue limpiado.', source: 'laboratorio', tags: ['huella', 'cajon'] },
    F3_INTACTO: { text: 'La cartera con 310 € y el reloj de oro del dormitorio están intactos.', place: 'p7', source: 'escena', tags: ['robo'] },
    F3_TELEFONO_ESCENA: { text: 'El teléfono de Tomás estaba sobre el escritorio con la lista de llamadas recientes abierta.', source: 'escena', tags: ['telefono', 'llamada'] },
    F3_TEL_HUELLAS: { prints: [{ at: 'Teléfono · carcasa', match: 'tomas' }, { at: 'Teléfono · pantalla', q: 'no_apta' }], text: 'Huellas en el teléfono: de Tomás y una parcial superpuesta, emborronada, no apta para cotejo.', source: 'laboratorio', tags: ['telefono', 'huella'] },
    F3_PC_ESCENA: { text: 'El ordenador del despacho estaba encendido con la sesión abierta.', source: 'escena', tags: ['ordenador'] },
    F3_AJEDREZ: { text: 'Partida de ajedrez a medias en el salón; dos tazas de café limpias en la cocina.', source: 'escena', tags: ['ajedrez'] },
    F3_AJEDREZ_HUELLAS: { prints: [{ at: 'Rey blanco', match: 'tomas' }, { at: 'Dama negra', match: 'sergio' }], text: 'Huellas de Tomás y de Sergio Montes en varias piezas del ajedrez.', person: 'sergio', source: 'laboratorio', tags: ['ajedrez', 'huella'] },
    F3_PUERTA: { text: 'Puerta de resbalón sin forzar: se cierra sola al salir. La llave no estaba echada.', source: 'escena', tags: ['acceso', 'puerta'] },
    F3_DEMANDA_ROTA: { text: 'En la papelera, fragmentos de una demanda de reclamación de cantidad; faltan los trozos con el nombre del demandado.', source: 'documento', tags: ['demanda', 'documento'] },
    F3_GANCHO: { text: 'Junto a las llaves de Tomás hay un gancho vacío con la etiqueta «Copia vecino».', place: 'p7', source: 'escena', tags: ['llave', 'acceso'] },
    F3_CAMARA_ESCENA: { text: 'El ascensor tiene cámara interior; la escalera no.', source: 'escena', tags: ['camara', 'ascensor'] },
    F3_ESCALERA: { text: 'La escalera no tiene cámara y las puertas de los rellanos se abren desde dentro sin llave.', source: 'escena', tags: ['escalera', 'acceso'] },
    F3_LIBRO: { text: 'Libro de la portería: «22:30–22:50 ronda de garaje» aparece tachado y sustituido por «sin incidencias».', person: 'julian', place: 'porteria', source: 'documento', tags: ['porteria'] },
    F3_TRITURADO: { text: 'En el cuarto de basuras del 6.º hay una bolsa con papel triturado.', place: 'p6', source: 'escena', tags: ['documento', 'basura'] },
    F3_PAGARES_TRITURADOS: { text: 'Reconstrucción parcial del papel triturado: tres pagarés firmados por Sergio Montes a favor de Tomás Arnau, vencidos, por 90.000 €.', person: 'sergio', place: 'p6', source: 'laboratorio', tags: ['pagares', 'documento', 'dinero'] },

    F3_ASC_2131: { text: 'Ascensor: un repartidor de comida sube de la planta baja al 7.º.', time: '21:31', place: 'p7', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_2134: { text: 'Ascensor: el repartidor baja del 7.º a la planta baja.', time: '21:34', place: 'porteria', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_2226: { text: 'Ascensor: Sergio Montes sube del 6.º al 7.º. Rostro visible; camisa clara.', time: '22:26', person: 'sergio', place: 'p7', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_2241: { text: 'Ascensor: abre en la planta baja sin nadie; al fondo se ve el mostrador de la portería vacío.', time: '22:41', person: 'julian', place: 'porteria', source: 'cámara', tags: ['camara', 'ascensor', 'porteria'] },
    F3_ASC_2309: { text: 'Ascensor: una persona con sudadera oscura y capucha sube del 6.º al 7.º, de espaldas a la cámara.', time: '23:09', place: 'p7', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_2316: { text: 'Ascensor: la misma persona baja del 7.º al 6.º.', time: '23:16', place: 'p6', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_2324: { text: 'Ascensor: Sergio Montes baja del 6.º a la planta baja. Rostro visible; sudadera oscura.', time: '23:24', person: 'sergio', place: 'porteria', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_NOSUBE: { text: 'Ascensor: aparte de los viajes anteriores, nadie sube al 7.º entre las 21:34 y las 08:10.', time: '21:34', end: '08:10', place: 'p7', source: 'cámara', tags: ['camara', 'ascensor'] },
    F3_ASC_ROSA: { text: 'Ascensor: Rosa sube de la planta baja al 7.º.', time: '08:10', person: 'rosa', place: 'p7', source: 'cámara', tags: ['camara', 'ascensor'] },

    F3_LL1: { text: 'Llamada 1: entrante de Marcos Arnau (3 min).', time: '21:05', person: 'marcos', source: 'llamada', tags: ['llamada'] },
    F3_LL2: { text: 'Llamada 2: saliente a Clara Arnau (7 min).', time: '21:52', person: 'clara', source: 'llamada', tags: ['llamada'] },
    F3_LL3: { text: 'Llamada 3: entrante de Sergio Montes (12 s).', time: '22:24', person: 'sergio', source: 'llamada', tags: ['llamada'] },
    F3_LL4: { text: 'Llamada 4: saliente desde el teléfono de Tomás a Rosa (41 s; salta el buzón de voz).', time: '23:14', person: 'tomas', place: 'p7', source: 'llamada', tags: ['llamada', 'audio'] },
    F3_WA_BORRADO: { text: 'Mensajería: el chat con Sergio Montes se eliminó a las 23:15. Copia recuperada: último mensaje de Tomás (19/11, 20:10): «Si el lunes no me pagas, presento la demanda. Se acabaron las prórrogas.»', time: '23:15', person: 'sergio', place: 'p7', source: 'dispositivo', tags: ['mensaje', 'telefono', 'dinero'] },
    F3_AUDIO: { text: 'Buzón de Rosa (41 s): sin voces. Pasos, un cajón que se abre y se cierra, una respiración cercana y, al final, el aviso sonoro de llegada del ascensor en el rellano.', time: '23:14', place: 'p7', source: 'laboratorio', tags: ['audio', 'ascensor'] },
    F3_PC_TESTAMENTO: { text: '«testamento_borrador_v3.docx», modificado a las 20:40: deja la imprenta a una fundación en lugar de a su sobrino Marcos, heredero en el testamento vigente.', time: '20:40', person: 'marcos', source: 'documento', tags: ['testamento', 'ordenador', 'herencia'] },
    F3_PC_DEMANDA: { text: '«demanda_montes.docx»: reclamación de 90.000 € contra Sergio Montes, con cita en el despacho del abogado el lunes 23/11.', person: 'sergio', source: 'documento', tags: ['demanda', 'ordenador', 'dinero'] },
    F3_PC_PAGARES: { text: 'Escaneo «pagares_SM.pdf»: tres pagarés firmados por Sergio Montes a favor de Tomás, vencidos, por 90.000 € en total.', person: 'sergio', source: 'documento', tags: ['pagares', 'ordenador', 'dinero'] },
    F3_CERR: { text: 'Cerrajería: hace 10 días se hizo una copia de la llave del 7.º A a nombre de Marcos Arnau.', person: 'marcos', source: 'registro', tags: ['llave', 'acceso'] },
    F3_BAR: { text: 'Bar La Esquina (Ruzafa, 1,6 km): Marcos paga con tarjeta a las 22:40. La cámara interior lo muestra de 22:05 a 22:20 y de 22:48 a 23:30; la terraza no tiene cámara.', time: '22:05', end: '23:30', person: 'marcos', place: 'ruzafa', source: 'cámara', tags: ['camara', 'coartada'] },
    F3_FIN_MARCOS: { text: 'Marcos tiene deudas por 40.000 € y pidió un préstamo a su tío esa semana.', person: 'marcos', source: 'documento', tags: ['dinero'] },
    F3_FIN_SERGIO: { text: 'Sergio Montes tiene las cuentas parcialmente embargadas y una deuda reconocida con Tomás Arnau.', person: 'sergio', source: 'documento', tags: ['dinero'] },
    F3_FIN_CLARA: { text: 'Clara Arnau: sin movimientos anómalos; nómina y domicilio en Madrid.', person: 'clara', source: 'documento', tags: ['dinero'] },
    F3_FIN_JULIAN: { text: 'Julián Ortega: sin relación económica con Tomás. Consta una queja de Tomás a la comunidad contra el conserje (octubre).', person: 'julian', source: 'documento', tags: ['dinero'] },

    F3_ANT_SERGIO: { text: 'Teléfono de Sergio: zona de C/ de la Paz toda la noche. Una llamada saliente a Tomás a las 22:24.', time: '21:00', end: '01:00', person: 'sergio', place: 'p6', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F3_ANT_MARCOS: { text: 'Teléfono de Marcos: zona de Ruzafa de 22:00 a 23:40; llamada de 26 min con su pareja a las 22:21. La zona de cobertura no excluye desplazamientos cortos.', time: '22:00', end: '23:40', person: 'marcos', place: 'ruzafa', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F3_ANT_CLARA: { text: 'Teléfono de Clara: Madrid (Chamberí) toda la noche.', time: '21:00', end: '01:00', person: 'clara', place: 'madrid', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F3_ANT_ROSA: { text: 'Teléfono de Rosa: Benicalap toda la noche.', time: '21:00', end: '01:00', person: 'rosa', place: 'benicalap', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F3_ANT_JULIAN: { text: 'Teléfono de Julián: zona de C/ de la Paz toda la noche.', time: '21:00', end: '01:00', person: 'julian', place: 'porteria', source: 'antena', tags: ['ubicacion', 'telefono'] },

    S3_SER_NOSUBE: { kind: 'statement', text: 'Sergio declara que no subió al 7.º esa noche y que se acostó pronto tras llamar a Tomás a las 22:24.', time: '22:24', end: '08:00', person: 'sergio', place: 'p6', source: 'declaración', tags: ['coartada'] },
    S3_SER_SINLLAVE: { kind: 'statement', text: 'Sergio declara que no tiene llave de la vivienda de Tomás.', person: 'sergio', source: 'declaración', tags: ['llave', 'acceso'] },
    S3_SER_DEUDA: { kind: 'statement', text: 'Sergio reconoce que debía dinero a Tomás desde que cerraron la sociedad.', person: 'sergio', source: 'declaración', tags: ['dinero'] },
    S3_SER_PIJAMA: { kind: 'statement', text: 'Sergio declara que esa noche estaba en pijama, en la cama.', time: '23:00', end: '08:00', person: 'sergio', place: 'p6', source: 'declaración', tags: ['ropa', 'coartada'] },
    S3_SER_SUBIO: { kind: 'statement', text: 'Sergio admite que subió al 7.º, que Tomás estaba bien y que bajó por la escalera a las 22:30.', time: '22:26', end: '22:30', person: 'sergio', place: 'p7', source: 'declaración', tags: ['visita'] },
    S3_SER_ABOGADO: { kind: 'statement', text: 'Sergio se niega a seguir declarando sin abogado al ver los pagarés reconstruidos.', person: 'sergio', source: 'declaración', tags: [] },
    S3_SER_ADMITELLAVE: { kind: 'statement', text: 'Sergio admite que Tomás le dio una llave hace años.', person: 'sergio', source: 'declaración', tags: ['llave'] },
    S3_MAR_BAR: { kind: 'statement', text: 'Marcos declara que estuvo en el bar La Esquina de 22:00 a 23:30.', time: '22:00', end: '23:30', person: 'marcos', place: 'ruzafa', source: 'declaración', tags: ['coartada'] },
    S3_MAR_COPIA: { kind: 'statement', text: 'Marcos declara que hizo una copia de la llave hace diez días, a petición de su tío, para Rosa.', person: 'marcos', source: 'declaración', tags: ['llave'] },
    S3_MAR_TERRAZA: { kind: 'statement', text: 'Marcos declara que pasó media hora en la terraza del bar hablando por teléfono con su pareja.', time: '22:20', end: '22:48', person: 'marcos', place: 'ruzafa', source: 'declaración', tags: ['coartada', 'llamada'] },
    S3_CLA_MADRID: { kind: 'statement', text: 'Clara declara que estaba en su casa de Madrid y habló con su padre a las 21:52.', time: '21:00', end: '01:00', person: 'clara', place: 'madrid', source: 'declaración', tags: ['coartada'] },
    S3_CLA_VECINO: { kind: 'statement', text: 'Clara declara que su padre le dijo que iba a demandar a "un vecino" que le debía mucho dinero.', time: '21:52', person: 'clara', source: 'declaración', tags: ['demanda', 'dinero'] },
    S3_CLA_JULIAN: { kind: 'statement', text: 'Clara cree que "el vecino" era el conserje, Julián.', person: 'clara', source: 'declaración', tags: ['demanda'] },
    S3_ROSA_BUZON: { kind: 'statement', text: 'Rosa declara que tenía una llamada perdida de Tomás de las 23:14 con un mensaje de voz sin palabras.', time: '23:14', person: 'rosa', source: 'declaración', tags: ['llamada', 'audio'] },
    S3_ROSA_LLAVE: { kind: 'statement', text: 'Rosa declara que Tomás guardaba una copia de la llave en un gancho de la entrada para el vecino de abajo, Sergio Montes, y que esa mañana el gancho estaba vacío.', person: 'rosa', source: 'declaración', tags: ['llave', 'acceso'] },
    S3_ROSA_DEUDA: { kind: 'statement', text: 'Rosa declara que Sergio Montes debía dinero a Tomás y que últimamente discutían.', person: 'rosa', source: 'declaración', tags: ['dinero'] },
    S3_JUL_PORTERIA: { kind: 'statement', text: 'Julián declara que estuvo en la portería sin moverse hasta las 23:30.', time: '21:00', end: '23:30', person: 'julian', place: 'porteria', source: 'declaración', tags: ['coartada'] },
    S3_JUL_MONTES: { kind: 'statement', text: 'Julián vio bajar a Sergio Montes hacia las 23:25 con una sudadera oscura; le dijo que iba a dar una vuelta.', time: '23:25', person: 'sergio', place: 'porteria', source: 'testigo', tags: ['testigo', 'ropa'] },
    S3_JUL_SALIO: { kind: 'statement', text: 'Julián admite que salió unos veinte minutos al bar de enfrente.', time: '22:30', end: '22:50', person: 'julian', place: 'barfrente', source: 'declaración', tags: ['coartada'] }
  },

  conflicts: [
    { id: 'C01', a: 'S3_SER_NOSUBE', b: 'F3_ASC_2226', type: 'Lugar distinto', severity: 'alta', desc: 'Sergio dice que no subió al 7.º; la cámara del ascensor le registra subiendo del 6.º al 7.º a las 22:26.' },
    { id: 'C02', a: 'S3_SER_SINLLAVE', b: 'S3_ROSA_LLAVE', type: 'Hecho distinto', severity: 'alta', desc: 'Sergio niega tener llave; Rosa afirma que Tomás guardaba una copia para él en un gancho que esa mañana estaba vacío.' },
    { id: 'C05', a: 'S3_JUL_PORTERIA', b: 'F3_ASC_2241', type: 'Lugar distinto', severity: 'media', desc: 'Julián dice que no se movió de la portería; a las 22:41 la cámara muestra el mostrador vacío.' },
    { id: 'C08', a: 'S3_JUL_PORTERIA', b: 'F3_LIBRO', type: 'Hecho distinto', severity: 'baja', desc: 'Julián dice que no se movió; en su libro aparece una ronda de 22:30 a 22:50, tachada.' },
    { id: 'C09', a: 'S3_MAR_BAR', b: 'F3_BAR', type: 'Hecho omitido', severity: 'media', desc: 'Marcos dice que estuvo en el bar de 22:00 a 23:30; la cámara interior no le muestra entre las 22:20 y las 22:48.' }
  ],

  verdictOptions: {
    motives: [
      { id: 'm3_deuda', label: 'Evitar la demanda por la deuda y recuperar los pagarés' },
      { id: 'm3_herencia', label: 'Asegurar la herencia antes del cambio de testamento' },
      { id: 'm3_robo', label: 'Robo' },
      { id: 'm3_rencor', label: 'Rencor por los conflictos de la comunidad' },
      { id: 'm3_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me3_empujon', label: 'Empujón en una discusión, golpe contra el escritorio y simulación de robo' },
      { id: 'me3_objeto', label: 'Golpe con un objeto contundente' },
      { id: 'me3_robo', label: 'Agresión durante un robo de un desconocido' },
      { id: 'me3_accidente', label: 'Caída accidental sin intervención de nadie' },
      { id: 'me3_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento de la agresión',
    windows: [
      { id: 'w3_2226', label: 'Entre las 22:26 y las 22:50' },
      { id: 'w3_2309', label: 'Entre las 23:09 y las 23:16 (la cuarta llamada)' },
      { id: 'w3_tarde', label: 'Después de las 23:30' },
      { id: 'w3_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F3_GANCHO', 'F3_INTACTO', 'F3_CAJON', 'F3_LIBRO'], label: 'gancho «Copia vecino», cartera intacta, funda de pagarés y libro de portería' },
    movement: { ids: ['D3_ASC', 'D3_BAR', 'D3_CERRAJERO'], label: 'ascensor, bar y cerrajería' },
    judicialRelevant: ['marcos'],
    spatialBonus: ['F3_ASC_2309', 'F3_ESCALERA'],
    temporalConflicts: ['C06', 'C07'],
    lateral: [
      { type: 'fact', id: 'S3_ROSA_LLAVE', pts: 25, yes: 'Preguntaste quién tenía llave además de la familia.', no: 'No exploraste quién más tenía llave.' },
      { type: 'conflict', id: 'C06', pts: 30, yes: 'Detectaste que la cuarta llamada es posterior a la muerte.', no: 'No contrastaste la cuarta llamada con la hora de la muerte.' },
      { type: 'conflict', id: 'C02', pts: 25 },
      { type: 'chosen', id: 'F3_GANCHO', pts: 20 }
    ],
    usefulLab: ['T01:autopsia', 'R04:documentos', 'T02:comparativa', 'T03:huellas']
  },

  trial: {},
  trialIntro: {},

  /* ================= VERSIONES ================= */
  variants: {
    sergio: {
      conflicts: [
    { id: 'C03', a: 'S3_SER_PIJAMA', b: 'F3_ASC_2324', type: 'Hecho distinto', severity: 'alta', desc: 'Sergio dice que estaba en pijama; a las 23:24 la cámara le muestra con sudadera oscura bajando a la portería.' },
    { id: 'C04', a: 'S3_SER_PIJAMA', b: 'S3_JUL_MONTES', type: 'Hecho distinto', severity: 'media', desc: 'Sergio dice que estaba en pijama; el conserje le vio bajar hacia las 23:25 con una sudadera oscura.' },
    { id: 'C06', a: 'F3_LL4', b: 'F3_AUTOPSIA_HORA', type: 'Secuencia incompatible', severity: 'alta', desc: 'La cuarta llamada sale del teléfono de Tomás a las 23:14; la autopsia sitúa la muerte entre las 22:15 y las 22:50.' },
    { id: 'C07', a: 'F3_WA_BORRADO', b: 'F3_AUTOPSIA_HORA', type: 'Secuencia incompatible', severity: 'alta', desc: 'El chat con Sergio se borra a las 23:15, después de la franja de muerte.' },
    { id: 'C10', a: 'S3_SER_SUBIO', b: 'F3_ASC_2309', type: 'Pendiente de vincular', severity: 'media', desc: 'Sergio dice que su única subida fue a las 22:26; a las 23:09 alguien con sudadera oscura sube del 6.º al 7.º (la 6.º B está vacía).' }
      ],
      truth: {
    culprit: 'sergio',
    motive: 'm3_deuda',
    method: 'me3_empujon',
    window: 'w3_2226',
    accomplices: [],
    partialMethods: { me3_objeto: 'Identificaste un golpe en la cabeza, pero no la caída tras el empujón ni la simulación de robo.' },
    decisive: ['F3_ASC_2226', 'F3_ASC_2309', 'F3_ASC_2316', 'F3_ASC_2324', 'F3_WA_BORRADO', 'F3_LL4', 'F3_AUDIO', 'F3_AUTOPSIA_HORA', 'F3_AUTOPSIA', 'S3_ROSA_LLAVE', 'F3_GANCHO', 'F3_PAGARES_TRITURADOS', 'F3_PC_PAGARES', 'F3_PC_DEMANDA', 'F3_INTACTO', 'F3_CAJON', 'F3_ASC_NOSUBE'],
    weak: ['F3_CERR', 'F3_AJEDREZ_HUELLAS', 'F3_PC_TESTAMENTO', 'S3_CLA_JULIAN', 'F3_FIN_MARCOS', 'F3_ASC_2241', 'F3_LIBRO', 'F3_DEMANDA_ROTA'],
    keyConflicts: ['C01', 'C02', 'C03', 'C06', 'C07'],
    narrative: [
      'Sergio Montes debía a Tomás 90.000 € en pagarés vencidos desde que cerraron la imprenta. Tomás le escribió a las 20:10 que el lunes presentaría la demanda, y a las 21:52 se lo contó a su hija sin decir el nombre: "un vecino". Clara creyó que hablaba del conserje.',
      'A las 22:24 Sergio llamó a Tomás ("subo un momento") y a las 22:26 subió en ascensor del 6.º al 7.º. Discutieron en el despacho. Sergio le agarró de los brazos y le empujó; Tomás cayó hacia atrás y se golpeó la sien contra la esquina del escritorio. Murió en pocos minutos, antes de las 22:50.',
      'Sergio sacó los pagarés del cajón, lo forzó con el abrecartas para simular un robo y se fue por la escalera, sin cámara. Se llevó la llave del gancho «Copia vecino», que Tomás le había dado años atrás.',
      'En su piso se dio cuenta de que el chat de WhatsApp le delataba. A las 23:09, con sudadera y capucha, volvió a subir en ascensor y entró con esa llave. Borró el chat a las 23:15 y, manipulando el teléfono con guantes, pulsó sin querer el contacto de Rosa en la lista de recientes: la cuarta llamada recogió sus pasos, el cajón y el aviso del ascensor. Bajó a las 23:16.',
      'Trituró los pagarés y los dejó en el cuarto de basuras de su planta. A las 23:24 bajó a la portería con la misma sudadera para dejarse ver por el conserje. Julián mintió sobre su salida al bar para no perder el empleo. Marcos tenía un móvil fuerte (el nuevo testamento) y una copia de llave reciente, pero era para Rosa, y estaba en la terraza del bar hablando con su pareja.'
    ]
  },
      trial: {
    sergio: [
      { id: 'O1', text: 'Mi cliente subió un momento y bajó por la escalera con Tomás vivo: a las 23:14 Tomás llamó a Rosa.', accept: ['F3_AUTOPSIA_HORA', 'F3_AUDIO', 'F3_WA_BORRADO'] },
      { id: 'O2', text: 'Cualquiera con llave pudo entrar: el sobrino se hizo una copia hace diez días.', accept: ['F3_ASC_2309', 'F3_ASC_NOSUBE', 'S3_ROSA_LLAVE', 'F3_GANCHO', 'S3_MAR_COPIA', 'F3_ASC_2316'] },
      { id: 'O3', text: 'Fue un robo: el cajón está forzado.', accept: ['F3_INTACTO', 'F3_PAGARES_TRITURADOS', 'F3_CAJON', 'F3_PC_PAGARES'] }
    ],
    generic: [
      { id: 'O1', text: 'Ninguna cámara sitúa a mi cliente en el 7.º durante la franja de la muerte.', accept: [] },
      { id: 'O2', text: 'La acusación no explica quién subió del 6.º al 7.º a las 23:09 ni quién borró el chat a las 23:15.', accept: [] },
      { id: 'O3', text: 'La acusación no explica la desaparición de los pagarés de Sergio Montes.', accept: [] }
    ]
  },
      trialIntro: {}
    },

    /* ---------- Versión 2: el sobrino ---------- */
    marcos: {
      facts: {
        F3_UV_TEL: { text: 'Luz UV: solo marcas de uso con los dedos sobre la pantalla; ninguna textura de guante.', source: 'laboratorio', tags: ['telefono', 'huella'] },
        F3_TEL_HUELLAS: { prints: [{ at: 'Teléfono · carcasa', match: 'tomas' }], text: 'Huellas en el teléfono: solo de Tomás.', source: 'laboratorio', tags: ['telefono', 'huella'] },
        F3_TELEFONO_ESCENA: { text: 'El teléfono de Tomás estaba sobre el escritorio, con una notificación de llamada perdida en la pantalla.', source: 'escena', tags: ['telefono', 'llamada'] },
        F3_POLVO_ESC: { prints: [{ at: 'Pasamanos 6.º–7.º', match: 'marcos' }], text: 'Polvo revelador: huellas recientes de Marcos Arnau en el pasamanos del tramo entre el 6.º y el 7.º, encima de la capa de polvo. Marcos no vive en el edificio.', person: 'marcos', source: 'laboratorio', tags: ['escalera', 'huella', 'acceso'] },
        F3_CAJON: { text: 'El cajón del escritorio fue forzado con un abrecartas; queda una funda vacía rotulada «TESTAMENTO 2026». La carpeta con los pagarés originales de S.M. sigue dentro.', place: 'p7', source: 'escena', tags: ['cajon', 'documento', 'testamento', 'pagares'] },
        F3_PAGARES_TRITURADOS: { text: 'Reconstrucción del papel triturado: folletos de propaganda y extractos bancarios antiguos de Sergio Montes. No hay ningún pagaré.', person: 'sergio', place: 'p6', source: 'laboratorio', tags: ['documento', 'basura'] },
        F3_ASC_2309: { text: 'Ascensor: Sergio Montes baja del 7.º al 6.º. Rostro visible; camisa clara.', time: '22:31', person: 'sergio', place: 'p6', source: 'cámara', tags: ['camara', 'ascensor'] },
        F3_ASC_2316: { text: 'Ascensor: ningún movimiento entre las 22:31 y las 23:24.', time: '22:31', end: '23:24', source: 'cámara', tags: ['camara', 'ascensor'] },
        F3_ASC_2324: { text: 'Ascensor: Sergio Montes baja del 6.º a la planta baja con camisa clara y una bolsa de basura; a las 23:27 vuelve a subir al 6.º.', time: '23:24', end: '23:27', person: 'sergio', place: 'porteria', source: 'cámara', tags: ['camara', 'ascensor', 'ropa'] },
        F3_LL4: { text: 'Llamada 4: entrante de Marcos Arnau, no contestada; deja un mensaje de voz de 19 s.', time: '23:14', person: 'marcos', source: 'llamada', tags: ['llamada', 'audio'] },
        F3_WA_BORRADO: { text: 'Mensajería: no se ha borrado ningún chat. Último mensaje de Tomás a Marcos (19/11, 20:45): «Mañana firmo el testamento nuevo. Lo siento, ya está decidido.» Marcos lo lee a las 20:46. En el chat con Sergio, a las 20:10: «Si el lunes no me pagas, presento la demanda.»', time: '20:45', person: 'marcos', source: 'dispositivo', tags: ['mensaje', 'telefono', 'testamento', 'herencia'] },
        F3_AUDIO: { text: 'Buzón de voz de Tomás (19 s): voz de Marcos: «Tío, perdona lo de antes. Llámame cuando puedas.» De fondo, música y conversaciones de bar.', time: '23:14', person: 'marcos', place: 'ruzafa', source: 'laboratorio', tags: ['audio', 'llamada'] },
        F3_PC_DEMANDA: { text: '«demanda_montes.docx»: reclamación de 90.000 € contra Sergio Montes, con cita en el despacho del abogado el lunes 23/11. Última modificación: el jueves a las 22:33, con la sesión de Tomás.', time: '22:33', person: 'tomas', place: 'p7', source: 'documento', tags: ['demanda', 'ordenador', 'dinero'] },
        F3_BAR: { text: 'Bar La Esquina (Ruzafa, 1,6 km): Marcos paga con tarjeta a las 22:58. La cámara interior lo muestra de 22:05 a 22:20 y de 22:48 a 23:30; la terraza no tiene cámara.', time: '22:05', end: '23:30', person: 'marcos', place: 'ruzafa', source: 'cámara', tags: ['camara', 'coartada'] },
        F3_ANT_MARCOS: { text: 'Teléfono de Marcos: zona de Ruzafa de 22:00 a 22:18; zona de C/ de la Paz de 22:27 a 22:42; de nuevo Ruzafa desde las 22:47. No hay llamadas entre las 21:05 y las 23:14, cuando llama a Tomás.', time: '22:27', end: '22:42', person: 'marcos', place: 'p7', source: 'antena', tags: ['ubicacion', 'telefono'] },
        S3_SER_PIJAMA: { kind: 'statement', text: 'Sergio declara que llevaba la misma camisa clara toda la noche y que bajó a tirar la basura antes de acostarse.', time: '23:24', end: '23:30', person: 'sergio', place: 'porteria', source: 'declaración', tags: ['ropa'] },
        S3_SER_SUBIO: { kind: 'statement', text: 'Sergio admite que subió al 7.º a pedir más plazo para pagar, que Tomás estaba vivo y que bajó en el ascensor a las 22:31.', time: '22:26', end: '22:31', person: 'sergio', place: 'p7', source: 'declaración', tags: ['visita'] },
        S3_JUL_MONTES: { kind: 'statement', text: 'Julián vio bajar a Sergio Montes hacia las 23:25 en camisa, con una bolsa de basura; la tiró al contenedor de la calle y volvió a subir.', time: '23:25', person: 'sergio', place: 'porteria', source: 'testigo', tags: ['testigo', 'ropa'] },
        S3_ROSA_BUZON: { kind: 'statement', text: 'Rosa declara que esa noche no recibió ninguna llamada de Tomás.', person: 'rosa', source: 'declaración', tags: ['llamada'] },
        S3_MAR_VUELTA: { kind: 'statement', text: 'Marcos admite que fue al edificio a pedir perdón a su tío, que llamó al portero automático, que nadie contestó y que volvió al bar sin entrar.', time: '22:27', end: '22:42', person: 'marcos', place: 'porteria', source: 'declaración', tags: ['coartada', 'acceso'] },
        S3_MAR_NOSABIA: { kind: 'statement', text: 'Marcos declara que no sabía que su tío iba a cambiar el testamento.', person: 'marcos', source: 'declaración', tags: ['testamento', 'herencia'] },
        S3_SER_ABOGADO: { kind: 'statement', text: 'Sergio se niega a hablar de sus deudas sin abogado.', person: 'sergio', source: 'declaración', tags: ['dinero'] },
        S3_MAR_ABOGADO: { kind: 'statement', text: 'Marcos se niega a seguir declarando sin abogado al ver las huellas de la escalera.', person: 'marcos', source: 'declaración', tags: [] }
      },
      evidence: {
        T03: { detail: 'Forzado con un abrecartas que sigue en el suelo. Carpetas revueltas. Queda una funda de plástico vacía rotulada a mano «TESTAMENTO 2026». La carpeta de pagarés de S.M. sigue dentro.' },
        T05: { detail: 'Teléfono sin bloqueo de pantalla. En la pantalla, una notificación de llamada perdida.' }
      },
      answers: {
        sergio: {
          ropa: { a: 'La camisa de por la tarde. Bajé un momento a tirar la basura y me acosté.', type: 'verdad' }
        },
        marcos: {
          noche: { type: 'mentira' },
          salio: { type: 'mentira' }
        },
        rosa: {
          noche: { a: 'En mi casa, en Benicalap. No supe nada de él hasta que llegué por la mañana.' }
        },
        julian: {
          vio: { a: 'Al señor Montes, que bajó sobre las once y veinticinco en camisa, con una bolsa de basura. La tiró al contenedor y volvió a subir.' }
        }
      },
      confront: {
        sergio: {
          F3_ASC_2226: { a: 'Vale, subí un momento a pedirle más tiempo para pagar. Me enseñó la demanda en la pantalla y me dijo que no. Estaba enfadado, pero bien. Bajé en el ascensor a las diez y media.', reveals: ['S3_SER_SUBIO'] },
          F3_ASC_2309: { a: 'Ahí me tiene, bajando. Cuando me fui, Tomás estaba vivo.', reveals: ['S3_SER_SUBIO'] },
          S3_JUL_MONTES: { a: 'Bajé la basura. Lo ha visto el conserje.', reveals: [] },
          F3_PAGARES_TRITURADOS: { a: 'Son papeles míos, extractos viejos. ¿Ahora es delito tirar papeles?', reveals: [] },
          F3_PC_DEMANDA: { a: 'Me la enseñó esa noche en la pantalla. Por eso me fui.', reveals: [] },
          F3_FIN_SERGIO: { a: 'Mis cuentas son cosa mía. De eso no hablo sin un abogado.', reveals: ['S3_SER_ABOGADO'] }
        },
        marcos: {
          F3_PC_TESTAMENTO: { a: '¿Me quitaba la imprenta? No sabía nada. Me entero ahora.', reveals: ['S3_MAR_NOSABIA'] },
          F3_ANT_MARCOS: { a: '...Vale. Fui a verle para pedirle perdón por lo de la llamada. Llamé al portero automático y no contestó nadie. Me volví al bar. No entré.', reveals: ['S3_MAR_VUELTA'] },
          F3_WA_BORRADO: { a: 'Ese mensaje... No sé. Lo vería tarde.', reveals: [] },
          F3_POLVO_ESC: { a: '(Se queda callado mucho rato.) Quiero hablar con un abogado.', reveals: ['S3_MAR_ABOGADO'] },
          F3_LL4: { a: 'Le llamé para hacer las paces. No lo cogió.', reveals: [] },
          F3_AUDIO: { a: 'Ahí lo tiene: le pedí perdón. ¿Haría eso alguien que...?', reveals: [] },
          F3_BAR: { a: 'Estaba en la terraza, ya se lo he dicho.', reveals: [] }
        },
        clara: {
          F3_PC_TESTAMENTO: { a: 'Me dijo que lo firmaba el viernes. Y que esa tarde se lo había escrito a Marcos.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'CM1', a: 'S3_MAR_TERRAZA', b: 'F3_ANT_MARCOS', type: 'Lugar distinto', severity: 'alta', desc: 'Marcos dice que pasó media hora en la terraza del bar hablando con su pareja; su teléfono no hace llamadas y conecta en la zona de C/ de la Paz de 22:27 a 22:42.' },
        { id: 'CM2', a: 'S3_MAR_NOSABIA', b: 'F3_WA_BORRADO', type: 'Hecho distinto', severity: 'alta', desc: 'Marcos dice que no sabía nada del testamento; a las 20:46 leyó el mensaje de su tío: «Mañana firmo el testamento nuevo».' },
        { id: 'CM3', a: 'S3_MAR_VUELTA', b: 'F3_POLVO_ESC', type: 'Hecho distinto', severity: 'alta', desc: 'Marcos dice que no entró en el edificio; hay huellas suyas recientes en el pasamanos de la escalera entre el 6.º y el 7.º.' }
      ],
      truth: {
        culprit: 'marcos', motive: 'm3_herencia', method: 'me3_empujon', window: 'w3_2226', accomplices: [],
        partialMethods: { me3_objeto: 'Identificaste un golpe en la cabeza, pero no la caída tras el empujón ni la simulación de robo.' },
        decisive: ['F3_ANT_MARCOS', 'F3_BAR', 'F3_POLVO_ESC', 'F3_WA_BORRADO', 'F3_PC_TESTAMENTO', 'F3_CAJON', 'F3_ASC_2309', 'F3_ASC_2316', 'F3_ASC_NOSUBE', 'F3_PC_DEMANDA', 'F3_AUTOPSIA_HORA', 'F3_AUTOPSIA', 'F3_LUPA_CAJON', 'F3_INTACTO', 'F3_ASC_2241', 'F3_ESCALERA', 'S3_MAR_VUELTA'],
        weak: ['F3_GANCHO', 'S3_ROSA_LLAVE', 'F3_AJEDREZ_HUELLAS', 'F3_PC_PAGARES', 'F3_FIN_SERGIO', 'F3_CERR', 'S3_CLA_JULIAN', 'F3_ASC_2226', 'F3_LL3', 'F3_TRITURADO', 'F3_DEMANDA_ROTA'],
        keyConflicts: ['CM1', 'CM2', 'CM3', 'C09'],
        narrative: [
          'Marcos Arnau era el heredero del testamento vigente y debía 40.000 €. A las 21:05 su tío le negó el préstamo, y a las 20:45 ya le había escrito que al día siguiente firmaba un testamento nuevo que dejaba la imprenta a una fundación.',
          'Sergio Montes llamó a las 22:24 y subió a las 22:26 a pedir más plazo para pagar. Tomás le enseñó la demanda en la pantalla y le echó. Sergio bajó en el ascensor a las 22:31 y Tomás siguió con la demanda: la guardó a las 22:33. Sergio mintió por miedo, por la deuda y por la discusión.',
          'Marcos salió del bar a las 22:20 por la terraza, sin cámara, y en pocos minutos llegó a C/ de la Paz. La portería estaba vacía: Julián se había ido al bar de enfrente. Entró con su llave de siempre y subió a pie por la escalera para no salir en la cámara del ascensor.',
          'Discutieron en el despacho por el testamento. Marcos le agarró de los brazos y le empujó; Tomás cayó hacia atrás y se golpeó la sien contra la esquina del escritorio. Marcos sacó del cajón el testamento nuevo, lo forzó para simular un robo, se limpió las manos en el pomo y bajó por la escalera, apoyándose en el pasamanos. A las 22:48 volvía a estar en el bar.',
          'A las 22:58 pagó con tarjeta y a las 23:14 llamó a su tío para dejarle un mensaje de perdón que le sirviera de coartada. El gancho «Copia vecino» llevaba años vacío porque la llave la tenía Sergio, y la bolsa que Sergio bajó a las 23:24 era solo basura.'
        ]
      },
      trial: {
        marcos: [
          { id: 'O1', text: 'Mi cliente estuvo toda la noche en Ruzafa: hay cámaras y un pago con tarjeta.', accept: ['F3_ANT_MARCOS', 'F3_BAR', 'F3_POLVO_ESC'] },
          { id: 'O2', text: 'Mi cliente ni siquiera sabía que su tío iba a cambiar el testamento.', accept: ['F3_WA_BORRADO', 'F3_CAJON'] },
          { id: 'O3', text: 'El vecino subió esa noche, le debía 90.000 € y mintió. El culpable es él.', accept: ['F3_ASC_2309', 'F3_PC_DEMANDA', 'F3_ASC_2316', 'F3_PAGARES_TRITURADOS'] }
        ],
        generic: [
          { id: 'O1', text: 'Ninguna cámara sitúa a la persona señalada en el 7.º durante la franja de la muerte.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién se llevó el testamento nuevo del cajón.', accept: [] },
          { id: 'O3', text: 'La acusación no explica las huellas recientes del pasamanos de la escalera.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['marcos'],
        spatialBonus: ['F3_ANT_MARCOS', 'F3_POLVO_ESC'],
        temporalConflicts: ['CM1'],
        lateral: [
          { type: 'fact', id: 'S3_MAR_VUELTA', pts: 25, yes: 'Hiciste que Marcos admitiera que estuvo en el edificio.', no: 'No llevaste a Marcos a explicar dónde estuvo de verdad.' },
          { type: 'conflict', id: 'CM2', pts: 30, yes: 'Viste que Marcos sabía lo del testamento nuevo.', no: 'No contrastaste lo que Marcos sabía del testamento.' },
          { type: 'conflict', id: 'CM1', pts: 25 },
          { type: 'chosen', id: 'F3_POLVO_ESC', pts: 20 }
        ]
      }
    }
  }
});
