/* EXPEDIENTE 0 — Caso EXP-001 «El Apartamento 17».
 * Única fuente de verdad del caso: la UI, el motor de consulta y la evaluación leen de aquí.
 * Los campos `hidden` y `truth` nunca se muestran durante la investigación. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-001',
  title: 'El Apartamento 17',
  type: 'Homicidio',
  difficulty: 'Alta',
  location: 'C/ del Almendro 22, 3.º, puerta 17 · Valencia',
  date: 'Noche del sábado 14 al domingo 15 de marzo de 2026',
  minRank: 0,
  budget: 900,
  victim: {
    id: 'daniel',
    name: 'Daniel Ferrer Sanz',
    age: 41,
    job: 'Socio fundador de Ferrer & Molina Consultores (desarrollo de software)'
  },
  deathWindow: 'Entre las 23:00 del 14/03 y la 01:00 del 15/03 (estimación preliminar en el lugar)',
  briefing: [
    'A las 08:40 del domingo 15 de marzo, Lucía Ferrer entra con su propia llave en el piso de su hermano, Daniel Ferrer, con quien había quedado para desayunar. Lo encuentra sin vida en el salón y llama al 112.',
    'La puerta no está forzada. Una ventana del salón está entreabierta. Hay una copa de vino en la mesa, un portátil y un teléfono en el estudio.',
    'Daniel atravesaba problemas económicos: su consultora acumulaba deudas y él había pedido una auditoría externa. Tenía relación reciente con un socio, una expareja, una hermana, un vecino de rellano, una asesora financiera y el propietario del piso.',
    'Tu objetivo no es adivinar un nombre. Es reconstruir qué ocurrió, cuándo, cómo y por qué, con pruebas que puedas defender.'
  ],
  initialFacts: ['F_HALLAZGO', 'F_VENTANA_MUERTE', 'F_PUERTA'],

  mapScale: 0.147,
  places: {
    almendro: { name: 'C/ del Almendro 22 (vivienda de Daniel)', x: 52, y: 46, kind: 'escena' },
    benimaclet: { name: 'Benimaclet (domicilio de Javier)', x: 70, y: 22, kind: 'domicilio' },
    ruzafa: { name: 'Ruzafa (domicilio y oficina de Elena)', x: 50, y: 70, kind: 'domicilio' },
    campanar: { name: 'Campanar (domicilio de Marta)', x: 24, y: 30, kind: 'domicilio' },
    burjassot: { name: 'Burjassot (restaurante)', x: 22, y: 8, kind: 'restaurante' },
    puerto: { name: 'Gasolinera Av. del Puerto', x: 88, y: 62, kind: 'gasolinera' },
    patraix: { name: 'Patraix (domicilio de Ramón)', x: 30, y: 78, kind: 'domicilio' }
  },

  /* ---------- PERSONAS ---------- */
  people: [
    {
      id: 'javier', name: 'Javier Molina', initials: 'JM', age: 44,
      role: 'Socio de la víctima', relation: 'Cofundador de la consultora (2017)',
      hidden: { honestidad: 50, miedo: 80, manipulacion: 30, autocontrol: 35, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Fundamos la consultora juntos en 2017. Últimamente las cosas iban mal, no lo voy a negar.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'En casa, en Benimaclet, desde las diez y media. Solo.', type: 'mentira', reveals: ['S_JAV_CASA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Daniel por última vez?', a: 'El viernes, en la oficina. Discutimos de números, como siempre.', type: 'mentira', reveals: ['S_JAV_ULTIMO'] },
        { id: 'acceso', q: '¿Tiene llaves de la vivienda o acceso al garaje?', a: 'No. Nunca he tenido llaves de su casa.', type: 'verdad', reveals: ['S_JAV_LLAVES'] },
        { id: 'problemas', q: '¿Sabe si Daniel tenía problemas con alguien?', a: 'Quería disolver la empresa y meter una auditoría. Eso nos hundía a los dos. ¿Problemas personales con alguien? No que yo sepa.', type: 'media', reveals: [] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Un Seat León negro.', type: 'verdad', reveals: [] },
        { id: 'vio', q: '¿Qué vio dentro del piso cuando estuvo allí?', requires: ['S_JAV_VISITA'], a: 'En la mesa baja había dos copas de vino, las dos servidas. Y en el perchero, un abrigo gris de mujer. Pensé que tenía compañía y que por eso quería que me fuera rápido.', type: 'verdad', reveals: ['S_JAV_DOSCOPAS'] },
        { id: 'despues', q: '¿Qué hizo después de salir del portal?', requires: ['S_JAV_VISITA'], a: 'Cogí el coche, que estaba aparcado en la calle, y fui a echar gasolina a la avenida del Puerto. Pagué con tarjeta, tengo el ticket. Luego a casa.', type: 'verdad', reveals: ['S_JAV_DESPUES', 'F_TICKET_JAV'] }
      ],
      confront: {
        F_PORTAL_JAV_IN: { a: '(Silencio largo.) Vale. Fui. Le llamé desde abajo a las once y pico, subí, discutimos por la disolución y me fui sobre las once y media. Cuando me fui estaba perfectamente. No lo dije porque sabía cómo iba a sonar.', reveals: ['S_JAV_VISITA'] },
        F_PORTAL_JAV_OUT: { a: 'Sí, ese soy yo saliendo. Ya ve que no estuve ni un cuarto de hora.', reveals: ['S_JAV_VISITA'] },
        F_TEL_2312: { a: 'Le llamé, sí... Estaba abajo. Subí a hablar con él. Discutimos y me fui sobre las once y media. Estaba vivo, se lo juro.', reveals: ['S_JAV_VISITA'] },
        F_ANT_JAV: { a: 'De acuerdo. Estuve en su calle. Subí, hablamos a gritos y me fui antes de las once y media.', reveals: ['S_JAV_VISITA'] },
        F_MANILLA_JAVIER: { a: 'He estado en ese piso muchas veces por trabajo. Una huella en una puerta no significa nada.', reveals: [], afterFact: 'S_JAV_VISITA', afterVisit: 'Claro que hay huellas mías: le acabo de decir que estuve allí esa noche.' },
        F_FIN_SEGURO_SOCIO: { a: '¿Cree que mataría a mi amigo por un seguro? ...Sí, sabía que seguía en vigor. Lo contratamos los dos. Eso no me convierte en nada.', reveals: [] },
        F_TEL_2158: { a: 'Yo llevo las cuentas de la empresa, sí. Pero la empresa está en rojo porque no entra trabajo, no porque yo robe. Su dinero personal lo llevaba una asesora externa; eso yo no lo tocaba.', reveals: ['S_JAV_GESTORA'] },
        S_ANDRES_GOLPE: { a: 'A las doce menos cuarto yo ya no estaba allí. Me fui antes de las once y media.', reveals: [] },
        F_FIN_EMPRESA: { a: 'Las deudas son reales. Por eso fui a hablar con él: si disolvía, perdíamos todo.', reveals: [] }
      },
      confrontDefault: 'No sé qué quiere que le diga sobre eso.'
    },
    {
      id: 'elena', name: 'Elena Vidal', initials: 'EV', age: 39,
      role: 'Asesora financiera de la víctima', relation: 'Gestionaba parte de sus ahorros desde 2022',
      hidden: { honestidad: 15, miedo: 45, manipulacion: 85, autocontrol: 90, confianza: 20 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Era cliente mío desde 2022. Le gestionaba parte de sus ahorros. Una relación estrictamente profesional.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'En casa, en Ruzafa. Cené sola y me acosté pronto, sobre las once.', type: 'mentira', reveals: ['S_ELENA_CASA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Daniel por última vez?', a: 'Me llamó sobre las siete y media. Quedamos el lunes en mi oficina para revisar la cartera. Nada más.', type: 'mentira', reveals: ['S_ELENA_ULTIMO'] },
        { id: 'acceso', q: '¿Ha estado alguna vez en su vivienda?', a: 'Nunca. Nos veíamos siempre en mi oficina.', type: 'mentira', reveals: ['S_ELENA_NUNCA'] },
        { id: 'problemas', q: '¿Sabe si Daniel tenía problemas con alguien?', a: 'Estaba muy agobiado con la empresa y con su socio. Me dijo que su socio le debía muchas explicaciones.', type: 'mentira', reveals: ['S_ELENA_SOCIO'] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Un Audi A3 gris.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F_TEL_2246: { a: 'Ah, sí. Le llamé para confirmar lo del lunes. Fueron segundos, por eso no lo mencioné.', reveals: ['S_ELENA_2246'] },
        F_ANT_ELENA: { a: 'Las antenas cubren zonas enormes. Mi teléfono puede haber enganchado cualquier antena. No entiendo de técnica.', reveals: [] },
        F_FIN_EV: { a: 'Esas transferencias son aportaciones a un vehículo de inversión. Está todo documentado. Daniel no entendía bien la estructura del fondo.', reveals: [] },
        F_PC_EXCEL: { a: 'Una hoja de cálculo hecha por un cliente nervioso no es una auditoría. Las aportaciones están documentadas.', reveals: [] },
        F_PC_CAL: { a: 'No sé con quién quedaría a esa hora. Conmigo había quedado el lunes.', reveals: [] },
        F_PC_BORRADOR: { a: '(Tarda en responder.) Si pensaba denunciar a alguien, no era a mí. Pregunte a su socio.', reveals: [] },
        F_CALLE_0002: { a: 'Hay miles de coches oscuros en Valencia.', reveals: [] },
        F_VEH_ELENA: { a: 'Sí, ese es mi coche. ¿Y?', reveals: [] },
        F_GAR_2247: { a: 'No sé nada del garaje de ese edificio.', reveals: [] },
        S_JAV_DOSCOPAS: { a: 'Eso lo dice el socio, que es precisamente quien tiene motivos para mentir.', reveals: [] },
        S_RAMON_MUJER: { a: 'Daniel tendría muchas visitas. Yo no era una de ellas.', reveals: [] },
        F_GAR_0002: { a: 'No sé de qué me habla.', reveals: [] }
      },
      confrontDefault: 'No veo qué relación tiene eso conmigo.'
    },
    {
      id: 'marta', name: 'Marta Ruiz', initials: 'MR', age: 38,
      role: 'Expareja de la víctima', relation: 'Seis años de relación; separados hace año y medio',
      hidden: { honestidad: 60, miedo: 55, manipulacion: 25, autocontrol: 50, confianza: 45 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Estuvimos juntos seis años. Lo dejamos hace año y medio. Seguimos con un préstamo a medias del piso que compartíamos.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'En casa, en Campanar, viendo una serie. Sola.', type: 'verdad', reveals: ['S_MARTA_CASA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Daniel por última vez?', a: 'Hace más de una semana que no hablo con él.', type: 'mentira', reveals: ['S_MARTA_ULTIMO'] },
        { id: 'acceso', q: '¿Tiene llaves de la vivienda?', a: 'Se las devolví cuando lo dejamos. Las metió en un cajón del recibidor delante de mí.', type: 'verdad', reveals: ['S_MARTA_LLAVES'] },
        { id: 'problemas', q: '¿Sabe si Daniel tenía problemas con alguien?', a: 'Daniel tenía problemas con todo el mundo por el dinero. Conmigo también.', type: 'media', reveals: [] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Un Fiat 500 blanco.', type: 'verdad', reveals: [] },
        { id: 'medicacion', q: '¿Toma alguna medicación para dormir?', requires: ['F_AUTOPSIA_TOX', 'F_COPA_ZOLPIDEM'], a: 'Sí, zolpidem, desde hace años. ¿Por qué me pregunta eso?', type: 'verdad', reveals: ['S_MARTA_ZOLPIDEM'] }
      ],
      confront: {
        F_TEL_1303: { a: 'Vale, discutimos el jueves por mensajes. Lo de "me las vas a pagar" era por el dinero del préstamo. Me dio vergüenza decírselo.', reveals: ['S_MARTA_ADMITE'] },
        F_CABELLO_SIN_RAIZ: { a: 'He estado en ese piso alguna vez para hablar del préstamo, hace meses. No sé de quién será ese pelo.', reveals: [] },
        F_FIN_PRESTAMO: { a: 'Me debe veinticuatro mil euros. Ahora no los voy a ver nunca. ¿Le parece que su muerte me beneficia?', reveals: [] },
        F_LLAVE_M: { a: '¿Lo ve? Esas son mis llaves. Se las devolví.', reveals: [] },
        S_MARTA_ZOLPIDEM: { a: 'Lo toma media España. Yo no le di nada a nadie.', reveals: [] },
        F_ANT_MARTA: { a: 'Estuve en casa. Es lo que le he dicho.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'lucia', name: 'Lucía Ferrer', initials: 'LF', age: 36,
      role: 'Hermana de la víctima', relation: 'Única hermana; encontró el cuerpo',
      hidden: { honestidad: 90, miedo: 40, manipulacion: 10, autocontrol: 40, confianza: 70 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Es mi hermano. Mi único hermano. Hablábamos casi todos los días.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'Cené con unas amigas en Burjassot hasta pasadas las doce. Pagué yo, tengo el ticket.', type: 'verdad', reveals: ['S_LUCIA_CENA', 'F_TICKET_LUCIA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Daniel por última vez?', a: 'Me llamó sobre las diez menos veinte. Estaba nervioso. Luego me mandó un mensaje.', type: 'verdad', reveals: [] },
        { id: 'acceso', q: '¿Tiene llaves de la vivienda?', a: 'Sí, desde que se mudó. Por eso pude entrar esta mañana.', type: 'verdad', reveals: [] },
        { id: 'problemas', q: '¿Sabe si Daniel tenía problemas con alguien?', a: 'Me dijo por teléfono que alguien que le llevaba el dinero le estaba mintiendo y que el lunes lo iba a arreglar. Tiene que ser Javier: él lleva las cuentas de la empresa.', type: 'creencia', reveals: ['S_LUCIA_DINERO'] },
        { id: 'hallazgo', q: '¿Cómo encontró la puerta esta mañana?', a: 'Cerrada, pero sin echar la llave. Me extrañó: Daniel siempre echaba la llave, incluso estando dentro.', type: 'verdad', reveals: ['S_LUCIA_LLAVE'] }
      ],
      confront: {
        F_FIN_SEGURO_VIDA: { a: 'No sabía que yo era la beneficiaria. ¿De verdad cree que yo...? Estaba cenando a veinte kilómetros.', reveals: [] },
        F_TEL_2158: { a: '¿Lo ve? "Quien lleva el dinero". Es Javier.', reveals: [] },
        S_JAV_GESTORA: { a: '¿Una asesora? Me habló alguna vez de una tal Elena. Yo pensaba que era algo de la empresa.', reveals: ['S_LUCIA_ELENA'] },
        F_FIN_EV: { a: '¿Una gestora? Me habló alguna vez de una tal Elena. Yo pensaba que era algo de la empresa.', reveals: ['S_LUCIA_ELENA'] }
      },
      confrontDefault: 'No sé qué decirle. Yo solo quiero saber qué le pasó.'
    },
    {
      id: 'andres', name: 'Andrés Pastor', initials: 'AP', age: 67,
      role: 'Vecino de rellano (puerta 18)', relation: 'Vecino desde 2024',
      hidden: { honestidad: 95, miedo: 30, manipulacion: 5, autocontrol: 70, confianza: 75 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Vecino de rellano. Buenos días, buenas tardes. Un chico educado.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'En casa. Estaba viendo una película en la tele.', type: 'verdad', reveals: [] },
        { id: 'oyo', q: '¿Oyó algo esa noche?', a: 'Una discusión fuerte de dos hombres, entre las once y veinte y las once y media, más o menos. Luego un golpe seco, como algo pesado que cae: eso fue cuando terminaba la película, a las doce menos cuarto. Y poco antes de las doce, la puerta de la escalera del garaje, que chirría.', type: 'verdad', reveals: ['S_ANDRES_DISCUSION', 'S_ANDRES_GOLPE', 'S_ANDRES_GARAJE'] },
        { id: 'quien', q: '¿Pudo ver quién estaba en el piso?', requires: ['S_ANDRES_DISCUSION'], a: 'No lo vi. Pero sería el mismo de la discusión: no oí a nadie más ni oí la puerta cerrarse entre medias.', type: 'creencia', reveals: ['S_ANDRES_MISMO'] },
        { id: 'acceso', q: '¿Tiene llaves de alguna vivienda o del garaje?', a: 'Solo de la mía y de mi plaza de garaje.', type: 'verdad', reveals: [] },
        { id: 'problemas', q: '¿Sabe si Daniel tenía problemas con alguien?', a: 'Sé que debía el alquiler: el dueño se quejaba en la escalera.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F_PORTAL_JAV_OUT: { a: '¿Salió a las once y media? Pues yo no oí la puerta... Con la tele alta, igual no la oí. No le sabría decir.', reveals: ['S_ANDRES_DUDA'] },
        F_GAR_0002: { a: 'Eso cuadra con la puerta de la escalera del garaje que le digo: chirría siempre.', reveals: [] }
      },
      confrontDefault: 'De eso no sé nada, lo siento.'
    },
    {
      id: 'ramon', name: 'Ramón Gil', initials: 'RG', age: 63,
      role: 'Propietario del piso', relation: 'Arrendador desde 2024',
      hidden: { honestidad: 75, miedo: 35, manipulacion: 20, autocontrol: 60, confianza: 50 },
      questions: [
        { id: 'rel', q: '¿Cuál era su relación con Daniel?', a: 'Le alquilo el piso desde 2024. Me debía dos meses.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y la 01:00?', a: 'A las nueve estuve en el edificio arreglando la caldera del 12. Me fui sobre las diez menos veinte. Luego a casa, en Patraix.', type: 'verdad', reveals: ['S_RAMON_CALDERA'] },
        { id: 'ultimo', q: '¿Cuándo habló con Daniel por última vez?', a: 'Esa misma noche, en el rellano, al llegar. Le recordé lo del alquiler. Me dijo que el lunes me pagaba, que iba a recuperar un dinero.', type: 'verdad', reveals: ['S_RAMON_RELLANO'] },
        { id: 'acceso', q: '¿Tiene llaves de la vivienda?', a: 'Tengo copia de todas mis viviendas en un armario de casa. No las he tocado.', type: 'verdad', reveals: [] },
        { id: 'problemas', q: '¿Sabe si Daniel recibía visitas?', a: 'Últimamente venía una mujer, de unos cuarenta, con traje y maletín. La he visto dos o tres veces entrar en coche al garaje; él le abría desde el interfono. Un coche oscuro; de marcas no entiendo.', type: 'verdad', reveals: ['S_RAMON_MUJER'] },
        { id: 'vehiculo', q: '¿Qué vehículo conduce?', a: 'Una Berlingo blanca, de trabajo.', type: 'verdad', reveals: [] }
      ],
      confront: {
        F_FIN_ALQUILER: { a: 'Me debía dinero, sí. ¿Y? Un muerto no me paga.', reveals: [] },
        F_PORTAL_RAMON_IN: { a: 'Ya se lo he dicho: vine por la caldera del 12. Pregunte a los del 12.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    }
  ],

  /* ---------- ESCENA (plano) ---------- */
  scene: {
    plans: [
      {
        id: 'vivienda', name: 'Vivienda 17', legend: 'Planta 3.ª · vivienda 17 · 78 m²',
        rooms: [
          { id: 'cocina', name: 'Cocina', x: 0, y: 0, w: 30, h: 42 },
          { id: 'recibidor', name: 'Recibidor', x: 0, y: 42, w: 30, h: 58 },
          { id: 'salon', name: 'Salón', x: 30, y: 0, w: 42, h: 100 },
          { id: 'estudio', name: 'Estudio', x: 72, y: 0, w: 28, h: 62 },
          { id: 'bano', name: 'Baño', x: 72, y: 62, w: 28, h: 38 }
        ],
        hotspots: [
          { ev: 'E09', x: 3, y: 66 }, { ev: 'E07', x: 14, y: 56 }, { ev: 'E13', x: 18, y: 86 },
          { ev: 'E03', x: 14, y: 20 }, { ev: 'E08', x: 44, y: 9 }, { ev: 'E12', x: 66, y: 22 },
          { ev: 'E02', x: 42, y: 46 }, { ev: 'E04', x: 50, y: 40 }, { ev: 'E11', x: 62, y: 52 },
          { ev: 'E01', x: 48, y: 70 }, { ev: 'E10', x: 58, y: 80 }, { ev: 'E05', x: 82, y: 22 },
          { ev: 'E06', x: 90, y: 40 }
        ]
      },
      {
        id: 'garaje', name: 'Sótano −1', legend: 'Garaje comunitario · 24 plazas · rampa a la calle',
        rooms: [
          { id: 'rampa', name: 'Rampa', x: 0, y: 0, w: 22, h: 100 },
          { id: 'plazas', name: 'Plazas 1–24', x: 22, y: 0, w: 58, h: 100 },
          { id: 'escalera', name: 'Escalera', x: 80, y: 0, w: 20, h: 45 },
          { id: 'trasteros', name: 'Trasteros', x: 80, y: 45, w: 20, h: 55 }
        ],
        hotspots: [{ ev: 'E14', x: 56, y: 62 }]
      }
    ]
  },
  sceneSummary: 'Vivienda en tercer piso con acceso por portal y por garaje comunitario. La puerta no presenta signos de forzamiento y estaba cerrada sin echar la llave.',

  /* ---------- EVIDENCIAS ---------- */
  evidence: [
    { id: 'E01', name: 'Cuerpo de la víctima', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal', room: 'Salón',
      public: 'Daniel Ferrer yace en el suelo del salón, junto al sofá.',
      detail: 'Herida contusa única en la región parieto-occipital izquierda. No se aprecian heridas de defensa ni desorden alrededor.',
      value: 'Determina causa y forma probable de la muerte.', limits: 'La estimación de la hora en el lugar es amplia.',
      reveals: ['F_HERIDA'],
      lab: { autopsia: { cost: 300, reveals: ['F_AUTOPSIA_TOX', 'F_AUTOPSIA_HORA'] }, adn: { cost: 200, label: 'ADN bajo las uñas', reveals: ['F_UNAS'] } } },
    { id: 'E02', name: 'Copa en la mesa del salón', type: 'Objeto', level: 2, room: 'Salón',
      public: 'Una copa de vino tinto sobre la mesa baja.',
      detail: 'Copa con restos de vino en el fondo. Es la única copa sobre la mesa.',
      value: 'Puede contener restos de sustancias y huellas.', limits: 'Una copa no indica cuántas personas bebieron.',
      reveals: ['F_UNA_COPA'],
      lab: { huellas: { cost: 120, reveals: ['F_COPA_HUELLAS'] }, toxicologia: { cost: 200, reveals: ['F_COPA_ZOLPIDEM'] }, adn: { cost: 200, reveals: ['F_COPA_ADN'] } } },
    { id: 'E03', name: 'Copa en el escurridor', type: 'Objeto', level: 3, forensic: { uv: { reveals: ['F_UV_COPA'] } }, room: 'Cocina',
      public: 'Escurridor junto al fregadero.',
      detail: 'Una copa idéntica a la del salón, boca abajo en el escurridor, junto a un único plato. El resto de la vajilla está guardada en los armarios.',
      value: 'Puede indicar consumo reciente por otra persona.', limits: 'Pudo lavarse en cualquier momento del día.',
      reveals: ['F_COPA_ESCURRIDOR'],
      lab: { huellas: { cost: 120, reveals: ['F_ESCURRIDOR_LIMPIA'] }, adn: { cost: 200, reveals: ['F_ESCURRIDOR_ADN'] } } },
    { id: 'E04', name: 'Botella de vino', type: 'Objeto', level: 3, room: 'Salón',
      public: 'Botella de tinto abierta en la mesa baja.',
      detail: 'Botella de tinto de Utiel-Requena, a dos tercios. Tapón de corcho en la mesa.',
      value: 'Puede conservar huellas de quien sirvió.', limits: 'Puede haber pasado por varias manos antes de esa noche.',
      reveals: [],
      lab: { huellas: { cost: 120, reveals: ['F_BOTELLA_SIN_HUELLAS'] }, toxicologia: { cost: 200, reveals: ['F_BOTELLA_TOX'] } } },
    { id: 'E05', name: 'Portátil', type: 'Dispositivo', level: 2, forensic: { polvo: { reveals: ['F_POLVO_TECLADO'] } }, room: 'Estudio',
      public: 'Portátil sobre el escritorio del estudio.',
      detail: 'Portátil abierto, en suspensión. Al tocar el ratón pide contraseña. Requiere análisis forense digital.',
      value: 'Archivos, calendario, correo y registros del sistema.', limits: 'El reloj del sistema puede estar desajustado (se comprobará).',
      reveals: ['F_PORTATIL_ESCENA'], unlocks: ['D_LAPTOP'],
      lab: { huellas: { cost: 120, reveals: ['F_PC_HUELLAS'] } } },
    { id: 'E06', name: 'Teléfono de la víctima', type: 'Dispositivo', level: 2, room: 'Estudio',
      public: 'Teléfono móvil sobre el escritorio.',
      detail: 'Teléfono bloqueado, con 14 % de batería. Requiere extracción forense.',
      value: 'Llamadas, mensajes y actividad.', limits: 'Solo muestra la actividad de este dispositivo.',
      reveals: ['F_TELEFONO_ESCENA'], unlocks: ['D_PHONE'],
      lab: { huellas: { cost: 120, reveals: ['F_TEL_HUELLAS'] } } },
    { id: 'E07', name: 'Llavero del recibidor', type: 'Objeto', level: 1, forensic: { lupa: { reveals: ['F_LUPA_ANILLA'] } }, room: 'Recibidor',
      public: 'Un llavero colgado de un gancho junto a la puerta.',
      detail: 'El llavero tiene la llave del portal, la llave de la vivienda y una anilla pequeña abierta, vacía.',
      value: 'Indica qué llaves usaba la víctima a diario.', limits: 'La anilla pudo estar vacía desde hace tiempo.',
      reveals: ['F_ANILLA_VACIA'] },
    { id: 'E08', name: 'Estantería del salón', type: 'Escena', level: 3, fixed: true, room: 'Salón',
      public: 'Estantería con libros y objetos decorativos.',
      detail: 'Un sujetalibros de bronce en forma de ancla (1,1 kg) sostiene una fila de libros. En el otro extremo los libros están caídos y en el polvo del estante se ve la marca rectangular de un objeto que ya no está.',
      value: 'Puede relacionarse con el objeto lesivo.', limits: 'No se ha encontrado el objeto que falta.',
      reveals: ['F_SUJETALIBROS_FALTA'],
      lab: { comparativa: { cost: 180, label: 'Comparativa lesión-objeto', reveals: ['F_HERIDA_COMPATIBLE'] }, huellas: { cost: 120, reveals: ['F_SUJ_HUELLAS'] } } },
    { id: 'E09', name: 'Manilla interior de la puerta', type: 'Huella', level: 5, custody: 'Huella revelada con polvo y levantada con lámina adhesiva', forensic: { luminol: { reveals: ['F_LUMINOL_PUERTA'] } }, room: 'Recibidor',
      public: 'Manilla interior de la puerta de entrada.',
      detail: 'Manilla metálica. Se aprecian restos de huellas latentes.',
      value: 'Puede identificar a quien abrió desde dentro.', limits: 'Las huellas no se pueden fechar.',
      reveals: [],
      lab: { huellas: { cost: 120, reveals: ['F_MANILLA_JAVIER'] } } },
    { id: 'E10', name: 'Fibras en el jersey', type: 'Fibra', level: 3, room: 'Salón',
      public: 'El jersey que viste la víctima.',
      detail: 'Fibras grises adheridas al hombro izquierdo del jersey.',
      value: 'Pueden indicar contacto con una prenda.', limits: 'Las fibras comunes rara vez individualizan.',
      reveals: ['F_FIBRAS_ESCENA'],
      lab: { fibras: { cost: 150, reveals: ['F_FIBRAS_COMUN'] } } },
    { id: 'E11', name: 'Cabello en el sofá', type: 'Biológica', level: 4, room: 'Salón',
      public: 'Sofá de tres plazas con cojines revueltos.',
      detail: 'Un cabello largo castaño claro entre los cojines.',
      value: 'Puede indicar presencia de otra persona.', limits: 'Pudo quedar allí días o semanas antes.',
      reveals: ['F_CABELLO_ESCENA'],
      lab: { adn: { cost: 250, reveals: ['F_CABELLO_SIN_RAIZ'] } } },
    { id: 'E12', name: 'Ventana entreabierta', type: 'Escena', level: 5, fixed: true, room: 'Salón',
      public: 'Ventana del salón abierta unos 10 cm.',
      detail: 'Tercer piso, sin balcón. El polvo del alféizar exterior está intacto, no hay marcas en el marco y la fachada no ofrece puntos de apoyo.',
      value: 'Descarta o confirma una vía de entrada.', limits: '—',
      reveals: ['F_VENTANA'] },
    { id: 'E13', name: 'Cajón del recibidor', type: 'Objeto', level: 3, room: 'Recibidor',
      public: 'Mueble con cajones en el recibidor.',
      detail: 'Dentro del cajón: una llave del portal y una de la vivienda unidas por una etiqueta escrita a mano con la letra «M».',
      value: 'Indica quién tenía o tuvo llaves.', limits: 'No prueba que no existan copias.',
      reveals: ['F_LLAVE_M'] },
    { id: 'E14', name: 'Plaza de garaje 17', type: 'Vehículo', level: 2, fixed: true, room: 'Sótano',
      public: 'Plaza de garaje asignada a la vivienda 17.',
      detail: 'El coche de Daniel, un Toyota Corolla blanco, está aparcado en su plaza. El capó está frío y no hay nada anómalo en el interior.',
      value: 'Indica si la víctima usó su vehículo.', limits: '—',
      reveals: ['F_COCHE_DANIEL'] }
  ],

  labKinds: {
    huellas: 'Huellas dactilares', adn: 'ADN', toxicologia: 'Toxicología', fibras: 'Fibras',
    autopsia: 'Autopsia completa', comparativa: 'Comparativa lesión-objeto'
  },

  /* ---------- SOLICITUDES DIGITALES ---------- */
  digital: [
    { id: 'D_PORTAL', name: 'Cámara del portal', cost: 80, desc: 'Grabación de la entrada peatonal del edificio, 18:00–09:00.',
      reveals: ['F_PORTAL_RAMON_IN', 'F_PORTAL_RAMON_OUT', 'F_PORTAL_JAV_IN', 'F_PORTAL_JAV_OUT', 'F_PORTAL_NADA', 'F_PORTAL_LUCIA'] },
    { id: 'D_CALLE', name: 'Cámara de tráfico de la calle', cost: 120, desc: 'Cámara municipal orientada a la calzada, frente al edificio. Cubre la rampa del garaje.',
      reveals: ['F_CALLE_2246', 'F_CALLE_2334', 'F_CALLE_0002'] },
    { id: 'D_GARAJE', name: 'Registro de accesos del garaje', cost: 100, desc: 'Registro electrónico de la puerta vehicular de la comunidad.',
      reveals: ['F_GAR_1910', 'F_GAR_2247', 'F_GAR_0002', 'F_GAR_TARJETAS'] },
    { id: 'D_PHONE', name: 'Extracción del teléfono de Daniel', cost: 250, desc: 'Llamadas, mensajes y actividad del terminal.', requires: 'E06',
      reveals: ['F_TEL_1931', 'F_TEL_2140', 'F_TEL_2158', 'F_TEL_2246', 'F_TEL_2312', 'F_TEL_1303'] },
    { id: 'D_LAPTOP', name: 'Análisis forense del portátil', cost: 250, desc: 'Archivos, calendario, correo y registro del sistema.', requires: 'E05',
      reveals: ['F_PC_2012', 'F_PC_EXCEL', 'F_PC_CAL', 'F_PC_BORRADOR', 'F_PC_2352'] },
    { id: 'D_FIN', name: 'Datos financieros', cost: 150, desc: 'Cuentas de Daniel y de la consultora, seguros y deudas.',
      reveals: ['F_FIN_EV', 'F_FIN_EMPRESA', 'F_FIN_SEGURO_SOCIO', 'F_FIN_SEGURO_VIDA', 'F_FIN_PRESTAMO', 'F_FIN_ALQUILER'] },
    { id: 'D_VEH', name: 'Registro de vehículos', cost: 60, desc: 'Vehículos a nombre de las personas del expediente.',
      reveals: ['F_VEH_JAV', 'F_VEH_ELENA', 'F_VEH_MARTA', 'F_VEH_RAMON', 'F_VEH_LUCIA', 'F_VEH_DANIEL'] }
  ],

  /* Solicitud judicial de antenas: limitada, obliga a priorizar. */
  judicial: {
    max: 2,
    desc: 'Datos de antenas del teléfono de una persona entre las 22:00 y la 01:00. El juzgado autoriza un máximo de dos solicitudes en este expediente.',
    results: {
      javier: ['F_ANT_JAV'], elena: ['F_ANT_ELENA'], marta: ['F_ANT_MARTA'],
      lucia: ['F_ANT_LUCIA'], ramon: ['F_ANT_RAMON'], andres: ['F_ANT_ANDRES']
    }
  },

  /* ---------- HECHOS ----------
   * kind: record (fuente objetiva) | statement (declaración)
   * time/end en HH:MM; las horas < 12 se interpretan como madrugada del día siguiente. */
  facts: {
    F_LUMINOL_PUERTA: { text: 'Luminol: gotas limpiadas en el suelo del recibidor, desde el salón hacia la puerta de salida.', place: 'almendro', source: 'laboratorio', tags: ['sangre', 'acceso', 'puerta'] },
    F_POLVO_TECLADO: { text: 'Polvo revelador: el teclado y el panel táctil del portátil se limpiaron con un paño; no hay huellas en las teclas de uso diario.', source: 'laboratorio', tags: ['portatil', 'huella'] },
    F_UV_COPA: { text: 'Luz UV: residuo graso en el borde de la copa del escurridor, compatible con pintalabios, que el lavado no eliminó del todo.', source: 'laboratorio', tags: ['copa', 'vino'] },
    F_LUPA_ANILLA: { text: 'Lupa: la anilla vacía del llavero tiene el muelle abierto y arañazos recientes, como si se hubiera sacado algo hace poco.', source: 'escena', tags: ['llave', 'garaje', 'acceso'] },
    F_HALLAZGO: { text: 'Lucía Ferrer encuentra el cuerpo al entrar con su llave y llama al 112.', time: '08:40', person: 'lucia', place: 'almendro', source: 'informe policial', tags: ['hallazgo', 'acceso'] },
    F_VENTANA_MUERTE: { text: 'Estimación forense preliminar en el lugar: muerte entre las 23:00 y la 01:00.', time: '23:00', end: '01:00', person: 'daniel', source: 'informe forense', tags: ['muerte', 'hora'] },
    F_PUERTA: { text: 'La puerta de la vivienda no presenta signos de forzamiento. Estaba cerrada, sin echar la llave.', source: 'escena', tags: ['acceso', 'puerta'] },

    F_HERIDA: { text: 'Herida contusa única en la cabeza, producida por un objeto pesado con arista. Sin heridas de defensa.', source: 'informe forense', person: 'daniel', tags: ['arma', 'golpe', 'muerte'] },
    F_AUTOPSIA_TOX: { text: 'Autopsia: zolpidem (hipnótico) en sangre en concentración compatible con sedación intensa. Alcohol: 0,6 g/L.', source: 'laboratorio', person: 'daniel', tags: ['tox', 'muerte'] },
    F_AUTOPSIA_HORA: { text: 'Autopsia: el contenido gástrico y la evolución térmica acotan la muerte entre las 23:15 y las 00:15.', time: '23:15', end: '00:15', person: 'daniel', place: 'almendro', source: 'informe forense', tags: ['muerte', 'hora'] },
    F_UNAS: { text: 'Bajo las uñas de la víctima no hay ADN ajeno.', source: 'laboratorio', tags: ['adn'] },
    F_UNA_COPA: { text: 'Sobre la mesa del salón hay una sola copa.', source: 'escena', tags: ['copa', 'vino'] },
    F_COPA_HUELLAS: { text: 'Huellas en la copa del salón: solo de Daniel Ferrer.', source: 'laboratorio', tags: ['copa', 'huella'] },
    F_COPA_ZOLPIDEM: { text: 'Los restos de vino de la copa del salón contienen zolpidem disuelto.', source: 'laboratorio', tags: ['copa', 'tox', 'vino'] },
    F_COPA_ADN: { text: 'ADN en el borde de la copa del salón: perfil de Daniel Ferrer.', source: 'laboratorio', tags: ['copa', 'adn'] },
    F_COPA_ESCURRIDOR: { text: 'En el escurridor hay una copa idéntica a la del salón, junto a un único plato; el resto de la vajilla está guardada.', source: 'escena', tags: ['copa', 'vino', 'cocina'] },
    F_ESCURRIDOR_LIMPIA: { text: 'La copa del escurridor no tiene huellas aprovechables: fue lavada con detergente.', source: 'laboratorio', tags: ['copa', 'huella'] },
    F_ESCURRIDOR_ADN: { text: 'La copa del escurridor no conserva perfil genético.', source: 'laboratorio', tags: ['copa', 'adn'] },
    F_BOTELLA_SIN_HUELLAS: { text: 'La botella no tiene ninguna huella, ni siquiera de Daniel. Presenta marcas de frotado compatibles con limpieza con una tela.', source: 'laboratorio', tags: ['vino', 'huella', 'botella'] },
    F_BOTELLA_TOX: { text: 'El vino que queda en la botella no contiene sustancias ajenas.', source: 'laboratorio', tags: ['vino', 'tox', 'botella'] },
    F_PORTATIL_ESCENA: { text: 'El portátil estaba en suspensión y pide contraseña al reactivarlo.', source: 'escena', tags: ['portatil'] },
    F_PC_HUELLAS: { text: 'Huellas en el portátil: de Daniel y una parcial emborronada no apta para cotejo.', source: 'laboratorio', tags: ['portatil', 'huella'] },
    F_TELEFONO_ESCENA: { text: 'El teléfono de Daniel estaba en el escritorio, bloqueado, con 14 % de batería.', source: 'escena', tags: ['telefono'] },
    F_TEL_HUELLAS: { text: 'Huellas en el teléfono: solo de Daniel.', source: 'laboratorio', tags: ['telefono', 'huella'] },
    F_ANILLA_VACIA: { text: 'El llavero de Daniel tiene la llave del portal, la de la vivienda y una anilla pequeña abierta y vacía.', source: 'escena', tags: ['acceso', 'llave', 'garaje'] },
    F_SUJETALIBROS_FALTA: { text: 'En la estantería falta uno de los dos sujetalibros de bronce: queda la marca en el polvo. El conservado pesa 1,1 kg.', source: 'escena', tags: ['arma'] },
    F_HERIDA_COMPATIBLE: { text: 'La arista y el peso del sujetalibros conservado son compatibles con la herida. No permite afirmar que el arma fuera su pareja.', source: 'laboratorio', tags: ['arma', 'golpe'] },
    F_SUJ_HUELLAS: { text: 'Huellas en el sujetalibros conservado: solo de Daniel, antiguas y superpuestas.', source: 'laboratorio', tags: ['arma', 'huella'] },
    F_MANILLA_JAVIER: { text: 'Huella parcial en la manilla interior: coincide con Javier Molina (14 puntos característicos). La huella no se puede fechar.', source: 'laboratorio', person: 'javier', tags: ['huella', 'acceso', 'puerta'] },
    F_FIBRAS_ESCENA: { text: 'Fibras grises adheridas al hombro izquierdo del jersey de la víctima.', source: 'escena', tags: ['fibra'] },
    F_FIBRAS_COMUN: { text: 'Las fibras son de lana gris teñida industrialmente, material muy común en abrigos. Valor de asociación limitado.', source: 'laboratorio', tags: ['fibra'] },
    F_CABELLO_ESCENA: { text: 'Cabello largo castaño claro entre los cojines del sofá.', source: 'escena', tags: ['adn', 'cabello'] },
    F_CABELLO_SIN_RAIZ: { text: 'El cabello no tiene raíz: no permite obtener ADN nuclear ni individualizar a nadie.', source: 'laboratorio', tags: ['adn', 'cabello'] },
    F_VENTANA: { text: 'Ventana del salón (tercer piso, sin balcón): polvo del alféizar intacto, sin marcas en el marco, fachada sin apoyos.', source: 'escena', tags: ['ventana', 'acceso'] },
    F_LLAVE_M: { text: 'En el cajón del recibidor hay un juego de llaves (portal y vivienda) con una etiqueta «M».', source: 'escena', tags: ['llave', 'acceso'] },
    F_COCHE_DANIEL: { text: 'A la mañana siguiente, el coche de Daniel (Toyota Corolla blanco) sigue en su plaza 17, con el capó frío.', time: '09:30', person: 'daniel', place: 'almendro', source: 'escena', tags: ['vehiculo', 'garaje'] },

    F_PORTAL_RAMON_IN: { text: 'Cámara del portal: entra un hombre de unos sesenta años con caja de herramientas (identificable: Ramón Gil).', time: '20:58', person: 'ramon', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
    F_PORTAL_RAMON_OUT: { text: 'Cámara del portal: sale Ramón Gil.', time: '21:41', person: 'ramon', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
    F_PORTAL_JAV_IN: { text: 'Cámara del portal: entra un hombre con abrigo oscuro. Rostro identificable: Javier Molina.', time: '23:18', person: 'javier', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
    F_PORTAL_JAV_OUT: { text: 'Cámara del portal: sale Javier Molina, con paso rápido.', time: '23:31', person: 'javier', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
    F_PORTAL_NADA: { text: 'Cámara del portal: entre las 23:31 y las 08:36 nadie entra ni sale por el portal.', time: '23:31', end: '08:36', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
    F_PORTAL_LUCIA: { text: 'Cámara del portal: entra Lucía Ferrer.', time: '08:36', person: 'lucia', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },

    F_CALLE_2246: { text: 'Cámara de calle: un turismo compacto oscuro se detiene ante la rampa del garaje; a las 22:47 entra. La matrícula no se lee por el reflejo de los faros.', time: '22:46', end: '22:47', place: 'almendro', source: 'cámara', tags: ['camara', 'vehiculo', 'garaje'] },
    F_CALLE_2334: { text: 'Cámara de calle: un turismo compacto oscuro sale de un aparcamiento en la calzada, a 30 m del portal. Matrícula parcial: 2?9? H??.', time: '23:34', place: 'almendro', source: 'cámara', tags: ['camara', 'vehiculo', 'matricula'] },
    F_CALLE_0002: { text: 'Cámara de calle: un turismo compacto oscuro sale por la rampa del garaje. Matrícula parcial: 4?17 K??.', time: '00:02', place: 'almendro', source: 'cámara', tags: ['camara', 'vehiculo', 'garaje', 'matricula'] },

    F_GAR_1910: { text: 'Garaje: entrada vehicular con la tarjeta de la vivienda 17.', time: '19:10', place: 'almendro', source: 'registro', tags: ['garaje', 'acceso', 'vehiculo'] },
    F_GAR_2247: { text: 'Garaje: apertura de la puerta vehicular desde el interfono de la vivienda 17.', time: '22:47', place: 'almendro', source: 'registro', tags: ['garaje', 'acceso', 'vehiculo'] },
    F_GAR_0002: { text: 'Garaje: salida vehicular con la tarjeta asignada a la vivienda 17.', time: '00:02', place: 'almendro', source: 'registro', tags: ['garaje', 'acceso', 'vehiculo'] },
    F_GAR_TARJETAS: { text: 'La vivienda 17 tiene una única tarjeta de garaje registrada.', source: 'registro', tags: ['garaje', 'acceso', 'llave'] },

    F_TEL_1931: { text: 'Teléfono de Daniel: llamada saliente a Elena Vidal (3 min 12 s).', time: '19:31', person: 'elena', source: 'llamada', tags: ['llamada'] },
    F_TEL_2140: { text: 'Teléfono de Daniel: llamada entrante de Lucía Ferrer (12 min).', time: '21:40', person: 'lucia', source: 'llamada', tags: ['llamada'] },
    F_TEL_2158: { text: 'WhatsApp de Daniel a Lucía: «Mañana te cuento. Quien lleva el dinero me ha estado mintiendo.»', time: '21:58', person: 'lucia', source: 'mensaje', tags: ['mensaje', 'dinero'] },
    F_TEL_2246: { text: 'Teléfono de Daniel: llamada entrante de Elena Vidal (38 s).', time: '22:46', person: 'elena', source: 'llamada', tags: ['llamada'] },
    F_TEL_2312: { text: 'Teléfono de Daniel: llamada entrante de Javier Molina (1 min 5 s).', time: '23:12', person: 'javier', source: 'llamada', tags: ['llamada'] },
    F_TEL_1303: { text: 'Mensajes del jueves 12/03 entre Daniel y Marta Ruiz: discusión por el préstamo. Marta escribe: «Me las vas a pagar, de una forma u otra.»', date: 'Jueves 12/03, 18:20', person: 'marta', source: 'mensaje', tags: ['mensaje', 'dinero', 'prestamo'] },

    F_PC_2012: { text: 'Portátil: última modificación de «auditoria_inversiones.xlsx» por el usuario.', time: '20:12', person: 'daniel', source: 'dispositivo', tags: ['portatil', 'archivo', 'dinero'] },
    F_PC_EXCEL: { text: 'Contenido recuperado de «auditoria_inversiones.xlsx»: 11 transferencias de 2025 por 182.000 € a «EV Gestión Patrimonial SL», con la nota «no aparecen en los extractos del fondo».', source: 'dispositivo', tags: ['portatil', 'archivo', 'dinero'] },
    F_PC_CAL: { text: 'Calendario del portátil: sábado 14/03, 22:45 — «Revisión cartera». Sin más datos.', time: '22:45', person: 'daniel', source: 'dispositivo', tags: ['portatil', 'cita'] },
    F_PC_BORRADOR: { text: 'Borrador de correo (no enviado) a un despacho de abogados: «El lunes quiero presentar la denuncia. Tengo pruebas de que la gestora ha desviado el dinero.»', time: '20:30', person: 'daniel', source: 'documento', tags: ['portatil', 'dinero', 'correo'] },
    F_PC_2352: { text: 'Registro del sistema del portátil: se elimina «auditoria_inversiones.xlsx» y se vacía el historial del navegador. La sesión estaba abierta, sin contraseña. El reloj del sistema está sincronizado.', time: '23:52', place: 'almendro', source: 'dispositivo', tags: ['portatil', 'archivo'] },

    F_FIN_EV: { text: 'Cuentas de Daniel: 182.000 € transferidos en 2025 a «EV Gestión Patrimonial SL», sociedad administrada por Elena Vidal.', person: 'elena', source: 'documento', tags: ['dinero', 'transferencia'] },
    F_FIN_EMPRESA: { text: 'La consultora debe 96.000 € y tiene dos nóminas pendientes. Daniel había pedido una auditoría externa y la disolución de la sociedad.', person: 'javier', source: 'documento', tags: ['dinero', 'empresa'] },
    F_FIN_SEGURO_SOCIO: { text: 'Seguro de «persona clave»: si Daniel fallece, la consultora cobra 300.000 €. Javier Molina posee el 50 % de la empresa.', person: 'javier', source: 'documento', tags: ['dinero', 'seguro'] },
    F_FIN_SEGURO_VIDA: { text: 'Seguro de vida de Daniel: 120.000 €. Beneficiaria: Lucía Ferrer.', person: 'lucia', source: 'documento', tags: ['dinero', 'seguro'] },
    F_FIN_PRESTAMO: { text: 'Préstamo pendiente entre Daniel y Marta Ruiz: 24.000 € del piso que compartieron.', person: 'marta', source: 'documento', tags: ['dinero', 'prestamo'] },
    F_FIN_ALQUILER: { text: 'Daniel debía dos meses de alquiler al propietario, Ramón Gil.', person: 'ramon', source: 'documento', tags: ['dinero', 'alquiler'] },

    F_VEH_JAV: { text: 'Javier Molina: Seat León negro, matrícula 2290 HBT.', person: 'javier', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F_VEH_ELENA: { text: 'Elena Vidal: Audi A3 gris oscuro, matrícula 4417 KLM.', person: 'elena', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F_VEH_MARTA: { text: 'Marta Ruiz: Fiat 500 blanco, matrícula 7731 JPD.', person: 'marta', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F_VEH_RAMON: { text: 'Ramón Gil: Citroën Berlingo blanca, matrícula 5108 GZS.', person: 'ramon', source: 'vehículo', tags: ['vehiculo', 'matricula'] },
    F_VEH_LUCIA: { text: 'Lucía Ferrer: sin vehículos a su nombre.', person: 'lucia', source: 'vehículo', tags: ['vehiculo'] },
    F_VEH_DANIEL: { text: 'Daniel Ferrer: Toyota Corolla blanco, matrícula 3362 LBN.', person: 'daniel', source: 'vehículo', tags: ['vehiculo', 'matricula'] },

    F_ANT_JAV: { text: 'Antenas del teléfono de Javier: zona de C/ del Almendro de 23:10 a 23:33; Av. del Puerto a las 23:47; Benimaclet a las 00:20.', time: '23:10', end: '23:33', person: 'javier', place: 'almendro', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F_ANT_ELENA: { text: 'Antenas del teléfono de Elena: zona de C/ del Almendro de 22:41 a 00:04; Ruzafa a las 00:19.', time: '22:41', end: '00:04', person: 'elena', place: 'almendro', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F_ANT_MARTA: { text: 'Antenas del teléfono de Marta: zona de su domicilio (Campanar) de 21:00 a 01:00. Sitúa el teléfono, no a la persona.', time: '21:00', end: '01:00', person: 'marta', place: 'campanar', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F_ANT_LUCIA: { text: 'Antenas del teléfono de Lucía: zona de Burjassot de 20:30 a 00:40.', time: '20:30', end: '00:40', person: 'lucia', place: 'burjassot', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F_ANT_RAMON: { text: 'Antenas del teléfono de Ramón: C/ del Almendro de 20:50 a 21:45; Patraix de 22:05 a 01:00.', time: '22:05', end: '01:00', person: 'ramon', place: 'patraix', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F_ANT_ANDRES: { text: 'Antenas del teléfono de Andrés: zona de C/ del Almendro toda la noche (vive en el edificio).', time: '22:00', end: '01:00', person: 'andres', place: 'almendro', source: 'antena', tags: ['ubicacion', 'telefono'] },

    F_TICKET_JAV: { text: 'Ticket de la gasolinera de la Av. del Puerto (5,8 km de C/ del Almendro): pago con la tarjeta de Javier Molina.', time: '23:49', person: 'javier', place: 'puerto', source: 'documento', tags: ['ticket', 'ubicacion'] },
    F_TICKET_LUCIA: { text: 'Ticket de un restaurante de Burjassot: pago con la tarjeta de Lucía Ferrer.', time: '23:58', person: 'lucia', place: 'burjassot', source: 'documento', tags: ['ticket', 'ubicacion'] },

    /* Declaraciones */
    S_JAV_CASA: { kind: 'statement', text: 'Javier declara que estuvo en su casa de Benimaclet, solo, desde las 22:30.', time: '22:30', end: '01:00', person: 'javier', place: 'benimaclet', source: 'declaración', tags: ['coartada', 'ubicacion'] },
    S_JAV_ULTIMO: { kind: 'statement', text: 'Javier declara que su último contacto con Daniel fue el viernes en la oficina.', person: 'javier', source: 'declaración', tags: ['llamada', 'contacto'] },
    S_JAV_LLAVES: { kind: 'statement', text: 'Javier declara que nunca ha tenido llaves de la vivienda.', person: 'javier', source: 'declaración', tags: ['acceso', 'llave'] },
    S_JAV_VISITA: { kind: 'statement', text: 'Javier admite que subió al piso tras llamar a Daniel, discutieron por la disolución y se marchó sobre las 23:30. Afirma que Daniel estaba bien.', time: '23:15', end: '23:30', person: 'javier', place: 'almendro', source: 'declaración', tags: ['visita', 'coartada'] },
    S_JAV_DOSCOPAS: { kind: 'statement', text: 'Javier declara que, durante su visita, había dos copas servidas en la mesa y un abrigo gris de mujer en el perchero.', time: '23:20', person: 'javier', place: 'almendro', source: 'declaración', tags: ['copa', 'vino', 'visita'] },
    S_JAV_DESPUES: { kind: 'statement', text: 'Javier declara que tras salir fue en su coche a repostar a la Av. del Puerto y después a casa.', time: '23:34', end: '23:50', person: 'javier', source: 'declaración', tags: ['coartada', 'vehiculo'] },
    S_JAV_GESTORA: { kind: 'statement', text: 'Javier declara que el patrimonio personal de Daniel lo gestionaba una asesora externa, no él.', person: 'javier', source: 'declaración', tags: ['dinero'] },

    S_ELENA_CASA: { kind: 'statement', text: 'Elena declara que estuvo en su casa de Ruzafa toda la noche y se acostó sobre las 23:00.', time: '21:30', end: '01:00', person: 'elena', place: 'ruzafa', source: 'declaración', tags: ['coartada', 'ubicacion'] },
    S_ELENA_ULTIMO: { kind: 'statement', text: 'Elena declara que su último contacto fue la llamada de las 19:30 y que la revisión de la cartera estaba fijada para el lunes.', time: '19:30', person: 'elena', source: 'declaración', tags: ['llamada', 'contacto', 'cita'] },
    S_ELENA_NUNCA: { kind: 'statement', text: 'Elena declara que nunca ha estado en la vivienda de Daniel.', person: 'elena', source: 'declaración', tags: ['acceso'] },
    S_ELENA_SOCIO: { kind: 'statement', text: 'Elena declara que Daniel estaba agobiado por su socio, que "le debía explicaciones".', person: 'elena', source: 'declaración', tags: ['dinero', 'empresa'] },
    S_ELENA_2246: { kind: 'statement', text: 'Elena reconoce la llamada de las 22:46: dice que fue para confirmar la cita del lunes.', time: '22:46', person: 'elena', source: 'declaración', tags: ['llamada'] },

    S_MARTA_CASA: { kind: 'statement', text: 'Marta declara que estuvo sola en su casa de Campanar viendo una serie.', time: '21:00', end: '01:00', person: 'marta', place: 'campanar', source: 'declaración', tags: ['coartada', 'ubicacion'] },
    S_MARTA_ULTIMO: { kind: 'statement', text: 'Marta declara que llevaba más de una semana sin hablar con Daniel.', person: 'marta', source: 'declaración', tags: ['contacto', 'mensaje'] },
    S_MARTA_LLAVES: { kind: 'statement', text: 'Marta declara que devolvió sus llaves y que Daniel las guardó en un cajón del recibidor.', person: 'marta', source: 'declaración', tags: ['acceso', 'llave'] },
    S_MARTA_ZOLPIDEM: { kind: 'statement', text: 'Marta reconoce que toma zolpidem para dormir desde hace años.', person: 'marta', source: 'declaración', tags: ['tox'] },
    S_MARTA_ADMITE: { kind: 'statement', text: 'Marta admite la discusión por mensajes del jueves y dice que su frase se refería al préstamo.', person: 'marta', source: 'declaración', tags: ['mensaje', 'dinero'] },

    S_LUCIA_CENA: { kind: 'statement', text: 'Lucía declara que cenó con amigas en Burjassot hasta pasadas las doce.', time: '21:30', end: '00:10', person: 'lucia', place: 'burjassot', source: 'declaración', tags: ['coartada', 'ubicacion'] },
    S_LUCIA_DINERO: { kind: 'statement', text: 'Lucía declara que Daniel le dijo que "quien le llevaba el dinero" le mentía, y cree que se refería a Javier.', person: 'lucia', source: 'declaración', tags: ['dinero'] },
    S_LUCIA_LLAVE: { kind: 'statement', text: 'Lucía declara que Daniel siempre echaba la llave, incluso estando dentro.', person: 'lucia', source: 'declaración', tags: ['acceso', 'puerta'] },
    S_LUCIA_ELENA: { kind: 'statement', text: 'Lucía recuerda que Daniel le habló de una asesora llamada Elena.', person: 'lucia', source: 'declaración', tags: ['dinero'] },

    S_ANDRES_DISCUSION: { kind: 'statement', text: 'Andrés oyó una discusión fuerte de dos hombres en el piso 17.', time: '23:20', end: '23:30', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'discusion'] },
    S_ANDRES_GOLPE: { kind: 'statement', text: 'Andrés oyó un golpe seco, "como algo pesado que cae", cuando terminaba su película.', time: '23:45', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'golpe'] },
    S_ANDRES_GARAJE: { kind: 'statement', text: 'Andrés oyó chirriar la puerta de la escalera del garaje poco antes de las doce.', time: '23:58', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'garaje'] },
    S_ANDRES_MISMO: { kind: 'statement', text: 'Andrés cree que el hombre de la discusión seguía en el piso cuando sonó el golpe, porque no oyó la puerta.', time: '23:45', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'golpe', 'discusion'] },
    S_ANDRES_DUDA: { kind: 'statement', text: 'Andrés reconoce que, con la televisión alta, pudo no oír la puerta.', person: 'andres', source: 'testigo', tags: ['testigo'] },

    S_RAMON_CALDERA: { kind: 'statement', text: 'Ramón declara que estuvo en el edificio arreglando la caldera del 12 entre las 21:00 y las 21:40 y luego fue a Patraix.', time: '21:00', end: '21:40', person: 'ramon', place: 'almendro', source: 'declaración', tags: ['coartada'] },
    S_RAMON_RELLANO: { kind: 'statement', text: 'Ramón declara que Daniel le dijo esa noche que el lunes le pagaría porque iba a "recuperar un dinero".', time: '21:00', person: 'ramon', place: 'almendro', source: 'declaración', tags: ['dinero'] },
    S_RAMON_MUJER: { kind: 'statement', text: 'Ramón declara que en las últimas semanas una mujer de unos cuarenta, con traje y maletín, entraba en coche oscuro al garaje; Daniel le abría desde el interfono.', person: 'ramon', source: 'declaración', tags: ['garaje', 'vehiculo', 'visita'] }
  },

  /* ---------- CONTRADICCIONES OBJETIVAS ----------
   * Solo describen la diferencia. Nunca dicen quién miente ni por qué. */
  conflicts: [
    { id: 'C01', a: 'S_JAV_CASA', b: 'F_PORTAL_JAV_IN', type: 'Lugar distinto', severity: 'alta', desc: 'La declaración sitúa a Javier en Benimaclet desde las 22:30; la cámara lo registra entrando en C/ del Almendro a las 23:18.' },
    { id: 'C02', a: 'S_JAV_CASA', b: 'F_ANT_JAV', type: 'Lugar distinto', severity: 'alta', desc: 'La declaración sitúa a Javier en Benimaclet; su teléfono conecta con la antena de C/ del Almendro entre las 23:10 y las 23:33.' },
    { id: 'C03', a: 'S_JAV_ULTIMO', b: 'F_TEL_2312', type: 'Hecho omitido', severity: 'media', desc: 'La declaración no menciona la llamada de Javier a Daniel a las 23:12.' },
    { id: 'C08', a: 'S_MARTA_ULTIMO', b: 'F_TEL_1303', type: 'Hecho omitido', severity: 'baja', desc: 'Marta dice llevar más de una semana sin hablar con Daniel; hay mensajes entre ambos del jueves 12/03.' },
    { id: 'C11', a: 'S_LUCIA_LLAVE', b: 'F_PUERTA', type: 'Hábito distinto', severity: 'media', desc: 'Lucía afirma que Daniel siempre echaba la llave; la puerta se encontró cerrada sin llave.' }
  ],

  /* ---------- VEREDICTO ---------- */
  verdictOptions: {
    motives: [
      { id: 'm_fraude', label: 'Evitar la denuncia por un desvío de dinero' },
      { id: 'm_seguro_emp', label: 'Cobrar el seguro de persona clave / evitar la disolución de la empresa' },
      { id: 'm_herencia', label: 'Cobrar el seguro de vida personal' },
      { id: 'm_prestamo', label: 'Deuda del préstamo / resentimiento personal' },
      { id: 'm_alquiler', label: 'Deuda del alquiler' },
      { id: 'm_desconocido', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me_sed_golpe', label: 'Sedación con zolpidem en el vino y golpe con objeto contundente' },
      { id: 'me_golpe', label: 'Golpe con objeto contundente durante una discusión' },
      { id: 'me_veneno', label: 'Envenenamiento como causa directa' },
      { id: 'me_caida', label: 'Caída accidental tras consumir sedantes' },
      { id: 'me_desconocido', label: 'No determinable con lo disponible' }
    ],
    windows: [
      { id: 'w_visita', label: 'Entre las 23:15 y las 23:35' },
      { id: 'w_despues', label: 'Entre las 23:35 y las 00:00' },
      { id: 'w_madrugada', label: 'Después de las 00:00' },
      { id: 'w_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F_ANILLA_VACIA', 'F_COCHE_DANIEL', 'F_COPA_ESCURRIDOR', 'F_BOTELLA_SIN_HUELLAS'], label: 'llavero, plaza de garaje, escurridor y botella limpia' },
    movement: { ids: ['D_GARAJE', 'D_CALLE', 'D_VEH'], label: 'garaje, calle y vehículos' },
    judicialRelevant: ['elena', 'javier'],
    spatialBonus: ['F_TICKET_JAV'],
    temporalConflicts: ['C09', 'C10'],
    lateral: [
      { type: 'fact', id: 'S_JAV_DOSCOPAS', pts: 30, yes: 'Preguntaste qué vio el último visitante conocido.', no: 'No obtuviste lo que vio el último visitante conocido.' },
      { type: 'conflict', id: 'C10', pts: 30, yes: 'Relacionaste la tarjeta del garaje con el coche de la víctima.', no: 'No relacionaste la salida del garaje con el coche de la víctima.' },
      { type: 'conflict', id: 'C07', pts: 20 },
      { type: 'chosen', id: 'F_ANILLA_VACIA', pts: 20 }
    ],
    usefulLab: ['E01:autopsia', 'E02:toxicologia', 'E03:huellas', 'E04:huellas', 'E08:comparativa', 'E09:huellas']
  },

  /* ---------- JUICIO SIMULADO (por versión) ---------- */
  trial: {},
  trialIntro: {},

  /* ================= VERSIONES ================= */
  variants: {
    elena: {
      conflicts: [
    { id: 'C04', a: 'S_ELENA_CASA', b: 'F_ANT_ELENA', type: 'Lugar distinto', severity: 'alta', desc: 'La declaración sitúa a Elena en Ruzafa toda la noche; su teléfono conecta con la antena de C/ del Almendro entre las 22:41 y las 00:04.' },
    { id: 'C05', a: 'S_ELENA_ULTIMO', b: 'F_TEL_2246', type: 'Hecho omitido', severity: 'alta', desc: 'La declaración sitúa el último contacto a las 19:30; el teléfono de Daniel registra una llamada de Elena a las 22:46.' },
    { id: 'C06', a: 'S_ELENA_ULTIMO', b: 'F_PC_CAL', type: 'Fecha distinta', severity: 'media', desc: 'La declaración fija la revisión de la cartera el lunes; el calendario de Daniel la recoge el sábado 14 a las 22:45.' },
    { id: 'C07', a: 'S_JAV_DOSCOPAS', b: 'F_UNA_COPA', type: 'Hecho distinto', severity: 'alta', desc: 'Javier describe dos copas servidas a las 23:20; en la inspección de la mañana solo hay una copa en la mesa.' },
    { id: 'C09', a: 'S_ANDRES_MISMO', b: 'F_PORTAL_JAV_OUT', type: 'Secuencia incompatible', severity: 'alta', desc: 'El testigo cree que el hombre de la discusión seguía en el piso a las 23:45; la cámara registra la salida de Javier a las 23:31.' },
    { id: 'C10', a: 'F_GAR_0002', b: 'F_COCHE_DANIEL', type: 'Secuencia incompatible', severity: 'alta', desc: 'A las 00:02 sale un vehículo con la única tarjeta de la vivienda 17, pero el coche de Daniel sigue en su plaza por la mañana.' },
    { id: 'C12', a: 'S_ELENA_NUNCA', b: 'F_GAR_2247', type: 'Pendiente de vincular', severity: 'baja', desc: 'Elena niega haber estado en la vivienda; a las 22:47 alguien abre la puerta del garaje desde el interfono de la 17 a un vehículo. El registro no identifica el vehículo.' }
      ],
      truth: {
    culprit: 'elena',
    motive: 'm_fraude',
    method: 'me_sed_golpe',
    window: 'w_despues',
    accomplices: [],
    partialMethods: { me_golpe: 'Identificaste el golpe, pero no la sedación previa.' },
    decisive: ['F_GAR_0002', 'F_PC_2352', 'F_TEL_2246', 'F_ANT_ELENA', 'S_JAV_DOSCOPAS', 'F_PC_EXCEL', 'F_FIN_EV', 'F_COCHE_DANIEL', 'F_ANILLA_VACIA', 'F_PORTAL_JAV_OUT', 'F_COPA_ZOLPIDEM', 'F_PC_BORRADOR', 'F_CALLE_0002', 'F_GAR_2247'],
    weak: ['F_MANILLA_JAVIER', 'F_FIBRAS_COMUN', 'F_CABELLO_SIN_RAIZ', 'S_MARTA_ZOLPIDEM', 'F_FIN_SEGURO_SOCIO', 'S_ANDRES_MISMO', 'S_LUCIA_DINERO', 'F_FIN_SEGURO_VIDA', 'F_TEL_1303'],
    keyConflicts: ['C04', 'C05', 'C06', 'C07', 'C09', 'C10'],
    narrative: [
      'Elena Vidal había desviado 182.000 € de los ahorros de Daniel a su propia sociedad. Daniel lo descubrió, documentó las transferencias en una hoja de cálculo (20:12) y preparó una denuncia para el lunes.',
      'A las 19:31 Daniel llamó a Elena y le pidió explicaciones esa misma noche. Ella llegó a las 22:46, le llamó desde la rampa y Daniel le abrió el garaje desde el interfono (22:47). Por eso no aparece en la cámara del portal.',
      'Mientras tomaban vino, Elena disolvió zolpidem en la copa de Daniel. A las 23:12 llamó Javier; Daniel le pidió a Elena que esperara en el estudio. Javier subió, vio dos copas y un abrigo gris de mujer, discutió con Daniel y se fue a las 23:31. Andrés oyó la discusión y nunca oyó salir a Javier.',
      'Con Daniel ya sedado, Elena le golpeó hacia las 23:41 con el sujetalibros de bronce (el golpe que oyó Andrés). Lavó su copa, limpió la botella, borró la hoja de cálculo y el historial del portátil (23:52) y se llevó la tarjeta del garaje del llavero.',
      'Bajó por la escalera del garaje (23:58) y salió con su Audi gris oscuro usando la tarjeta de la vivienda 17 a las 00:02. Su teléfono deja la zona a las 00:04. Se llevó el sujetalibros, que no ha aparecido.',
      'Javier mintió sobre su visita por miedo, no por culpa: a las 23:49 pagaba en una gasolinera a 5,8 km. Marta mintió por vergüenza sobre una discusión. Lucía creía, sin mala fe, que "quien llevaba el dinero" era Javier.'
    ]
  },
      trial: {
    elena: [
      { id: 'O1', text: 'Ningún testigo ni cámara del portal sitúa a mi clienta en el edificio esa noche.', accept: ['F_ANT_ELENA', 'F_TEL_2246', 'F_GAR_2247', 'F_CALLE_2246', 'S_JAV_DOSCOPAS', 'S_RAMON_MUJER'] },
      { id: 'O2', text: 'El último visitante conocido fue Javier Molina: discutió con la víctima, mintió sobre su visita y su huella está en la puerta.', accept: ['F_PORTAL_JAV_OUT', 'F_TICKET_JAV', 'F_PC_2352', 'F_GAR_0002', 'S_ANDRES_DUDA', 'F_ANT_JAV'] },
      { id: 'O3', text: 'No hay móvil: las transferencias son inversiones legítimas y documentadas.', accept: ['F_PC_EXCEL', 'F_PC_BORRADOR', 'F_TEL_2158', 'F_FIN_EV'] }
    ],
    javier: [
      { id: 'O1', text: 'Mi cliente salió del portal a las 23:31 y a las 23:49 pagaba en una gasolinera a 5,8 km.', accept: [] },
      { id: 'O2', text: '¿Quién borró el portátil a las 23:52 y quién salió del garaje con la tarjeta de la víctima a las 00:02?', accept: [] },
      { id: 'O3', text: 'Una huella que no se puede fechar no prueba nada sobre el momento del crimen.', accept: [] }
    ],
    generic: [
      { id: 'O1', text: 'Ningún registro objetivo sitúa a mi cliente en C/ del Almendro durante la ventana de muerte.', accept: [] },
      { id: 'O2', text: 'La acusación no explica la actividad del portátil a las 23:52 ni la salida del garaje a las 00:02.', accept: [] },
      { id: 'O3', text: 'El móvil atribuido no está respaldado por ninguna prueba directa.', accept: [] }
    ]
  },
      trialIntro: {}
    },

    /* ---------- Versión 2: el socio ---------- */
    javier: {
      facts: {
        F_ANILLA_VACIA: { text: 'El llavero de Daniel tiene la llave del portal, la de la vivienda y la tarjeta del garaje.', source: 'escena', tags: ['acceso', 'llave', 'garaje'] },
        F_LUPA_ANILLA: { text: 'Lupa: la anilla del llavero sujeta la tarjeta del garaje; no hay marcas anómalas.', source: 'escena', tags: ['llave', 'garaje', 'acceso'] },
        F_AUTOPSIA_TOX: { text: 'Autopsia: alcohol en sangre de 0,6 g/L. No se detectan otras sustancias.', source: 'laboratorio', person: 'daniel', tags: ['tox', 'muerte'] },
        F_COPA_ZOLPIDEM: { text: 'Los restos de vino de la copa del salón no contienen sustancias ajenas.', source: 'laboratorio', tags: ['copa', 'tox', 'vino'] },
        F_BOTELLA_SIN_HUELLAS: { text: 'En la botella hay huellas de Daniel y de Elena Vidal.', source: 'laboratorio', tags: ['vino', 'huella', 'botella'] },
        F_PORTAL_JAV_OUT: { text: 'Cámara del portal: sale Javier Molina con una bolsa de deporte, con paso rápido.', time: '23:58', person: 'javier', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
        F_PORTAL_NADA: { text: 'Cámara del portal: entre las 23:58 y las 08:36 nadie entra ni sale por el portal.', time: '23:58', end: '08:36', place: 'almendro', source: 'cámara', tags: ['camara', 'portal'] },
        F_CALLE_2334: { text: 'Cámara de calle: un turismo compacto oscuro sale de un aparcamiento en la calzada, a 30 m del portal. Matrícula parcial: 2?9? H??.', time: '00:01', place: 'almendro', source: 'cámara', tags: ['camara', 'vehiculo', 'matricula'] },
        F_CALLE_0002: { text: 'Cámara de calle: un turismo compacto oscuro sale por la rampa del garaje. Matrícula parcial: 4?17 K??.', time: '23:06', place: 'almendro', source: 'cámara', tags: ['camara', 'vehiculo', 'garaje', 'matricula'] },
        F_GAR_0002: { text: 'Garaje: apertura de la puerta vehicular desde el interfono de la vivienda 17 para una salida.', time: '23:06', place: 'almendro', source: 'registro', tags: ['garaje', 'acceso', 'vehiculo'] },
        F_PC_2012: { text: 'Portátil: última modificación de «auditoria_empresa.xlsx» por el usuario.', time: '20:12', person: 'daniel', source: 'dispositivo', tags: ['portatil', 'archivo', 'dinero'] },
        F_PC_EXCEL: { text: 'Contenido recuperado de «auditoria_empresa.xlsx»: 23 pagos de la consultora entre 2024 y 2026, por 141.000 €, a «JM Servicios Técnicos SL», con la nota «la sociedad es de Javier: no hay ningún servicio».', person: 'javier', source: 'dispositivo', tags: ['portatil', 'archivo', 'dinero'] },
        F_PC_BORRADOR: { text: 'Borrador de correo (no enviado) a un despacho de abogados: «El lunes quiero presentar la denuncia. Tengo pruebas de que mi socio ha desviado dinero de la empresa.»', time: '20:30', person: 'daniel', source: 'documento', tags: ['portatil', 'dinero', 'correo'] },
        F_PC_2352: { text: 'Registro del sistema del portátil: se elimina «auditoria_empresa.xlsx» y se vacía el historial del navegador. La sesión estaba abierta, sin contraseña. El reloj del sistema está sincronizado.', time: '23:52', place: 'almendro', source: 'dispositivo', tags: ['portatil', 'archivo'] },
        F_FIN_EV: { text: 'Cuentas de Daniel: 182.000 € invertidos en 2025 a través de «EV Gestión Patrimonial SL», la sociedad de Elena Vidal. Los extractos del fondo cuadran con las aportaciones.', person: 'elena', source: 'documento', tags: ['dinero', 'transferencia'] },
        F_FIN_EMPRESA: { text: 'La consultora debe 96.000 € y tiene dos nóminas pendientes. Daniel había pedido una auditoría externa y la disolución, tras detectar pagos a «JM Servicios Técnicos SL», administrada por Javier Molina.', person: 'javier', source: 'documento', tags: ['dinero', 'empresa'] },
        F_ANT_JAV: { text: 'Antenas del teléfono de Javier: zona de C/ del Almendro de 23:10 a 00:00; Av. del Puerto a las 00:17; Benimaclet a las 00:40.', time: '23:10', end: '00:00', person: 'javier', place: 'almendro', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F_ANT_ELENA: { text: 'Antenas del teléfono de Elena: zona de C/ del Almendro de 22:41 a 23:09; Ruzafa desde las 23:24.', time: '22:41', end: '23:09', person: 'elena', place: 'almendro', source: 'antena', tags: ['ubicacion', 'telefono'] },
        F_TICKET_JAV: { text: 'Ticket de la gasolinera de la Av. del Puerto (5,8 km de C/ del Almendro): pago con la tarjeta de Javier Molina.', time: '00:19', person: 'javier', place: 'puerto', source: 'documento', tags: ['ticket', 'ubicacion'] },
        S_JAV_DOSCOPAS: { kind: 'statement', text: 'Javier declara que, durante su visita, Daniel estaba solo, con una copa de vino.', time: '23:20', person: 'javier', place: 'almendro', source: 'declaración', tags: ['copa', 'vino', 'visita'] },
        S_ELENA_CASA: { kind: 'statement', text: 'Elena declara que estuvo en casa de Daniel de 22:45 a 23:05 revisando su cartera y que después volvió a Ruzafa.', time: '22:45', end: '23:05', person: 'elena', place: 'almendro', source: 'declaración', tags: ['coartada', 'ubicacion'] },
        S_ELENA_ULTIMO: { kind: 'statement', text: 'Elena declara que se despidió de Daniel a las 23:05 y que estaba bien, aunque preocupado por la empresa.', time: '23:05', person: 'elena', source: 'declaración', tags: ['contacto', 'cita'] },
        S_ELENA_NUNCA: { kind: 'statement', text: 'Elena declara que esa noche estuvo en la vivienda: Daniel le abrió el garaje desde el interfono.', person: 'elena', source: 'declaración', tags: ['acceso', 'garaje'] },
        S_ELENA_2246: { kind: 'statement', text: 'Elena confirma la llamada de las 22:46: avisaba de que estaba ante la rampa del garaje.', time: '22:46', person: 'elena', source: 'declaración', tags: ['llamada'] },
        S_ANDRES_DISCUSION: { kind: 'statement', text: 'Andrés oyó una discusión fuerte de dos hombres en el piso 17.', time: '23:20', end: '23:40', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'discusion'] },
        S_ANDRES_GARAJE: { kind: 'statement', text: 'Andrés oyó un portazo en la puerta del piso 17 poco antes de las doce.', time: '23:57', person: 'andres', place: 'almendro', source: 'testigo', tags: ['testigo', 'puerta'] },
        S_ANDRES_DUDA: { kind: 'statement', text: 'Andrés dice que una salida a las 23:58 cuadra con el portazo que oyó.', person: 'andres', source: 'testigo', tags: ['testigo'] }
      },
      evidence: {
        E07: { detail: 'El llavero tiene la llave del portal, la llave de la vivienda y una tarjeta de garaje.' }
      },
      answers: {
        javier: {
          vio: { a: 'Daniel estaba solo, con una copa de vino. Nada raro. Estaba muy alterado con lo de la auditoría.', type: 'verdad' },
          despues: { type: 'mentira' }
        },
        elena: {
          noche: { a: 'Estuve con Daniel de once menos cuarto a once y cinco revisando la cartera, en su casa. Luego volví a Ruzafa.', type: 'verdad' },
          ultimo: { a: 'Me fui de su casa a las once y cinco. Estaba bien, aunque muy preocupado por su empresa.', type: 'verdad' },
          acceso: { a: 'Esa noche estuve allí, sí. Él me abrió el garaje desde el interfono, como otras veces.', type: 'verdad' },
          problemas: { type: 'verdad' }
        },
        andres: {
          oyo: { a: 'Una discusión fuerte de dos hombres, desde las once y veinte hasta pasadas las once y media. Luego un golpe seco, como algo pesado que cae: eso fue cuando terminaba la película, a las doce menos cuarto. Y poco antes de las doce, un portazo en la puerta del 17.' },
          quien: { type: 'verdad' }
        },
        lucia: { problemas: { type: 'verdad' } }
      },
      confront: {
        javier: {
          F_PORTAL_JAV_IN: { a: '(Silencio largo.) Vale. Fui. Le llamé desde abajo, subí, discutimos por la disolución y me fui sobre las once y media. Cuando me fui estaba perfectamente.', reveals: ['S_JAV_VISITA'] },
          F_PORTAL_JAV_OUT: { a: 'Esa hora estará mal. Yo me fui sobre las once y media.', reveals: ['S_JAV_VISITA'] },
          F_TICKET_JAV: { a: 'Daría vueltas con el coche antes de repostar. No me acuerdo.', reveals: [] },
          F_PC_EXCEL: { a: 'Esos pagos son servicios reales. Daniel no entendía cómo funcionaba la empresa.', reveals: [] },
          F_PC_BORRADOR: { a: 'Daniel siempre amenazaba con abogados.', reveals: [] }
        },
        elena: {
          F_TEL_2246: { a: 'Le avisé de que estaba abajo, ante la rampa. Ya le he dicho que fui.', reveals: ['S_ELENA_2246'] },
          F_ANT_ELENA: { a: 'Ahí lo tiene: llegué antes de las once y me fui a las once y cinco.', reveals: [] },
          F_FIN_EV: { a: 'Son aportaciones a un fondo y cuadran con los extractos. Puede comprobarlo.', reveals: [] },
          S_JAV_DOSCOPAS: { a: 'Cuando yo me fui, Daniel estaba solo. Lo que pasara después, no lo sé.', reveals: [] }
        },
        andres: {
          F_PORTAL_JAV_OUT: { a: '¿Salió a las doce menos dos? Pues eso cuadra con el portazo que oí.', reveals: ['S_ANDRES_DUDA'] }
        }
      },
      conflicts: [
        { id: 'CJ1', a: 'S_JAV_VISITA', b: 'F_PORTAL_JAV_OUT', type: 'Hora distinta', severity: 'alta', desc: 'Javier dice que se fue sobre las 23:30; la cámara del portal registra su salida a las 23:58.' },
        { id: 'CJ2', a: 'S_JAV_DESPUES', b: 'F_TICKET_JAV', type: 'Hora distinta', severity: 'alta', desc: 'Javier dice que repostó nada más salir, hacia las 23:35; el ticket de la gasolinera es de las 00:19.' },
        { id: 'CJ3', a: 'S_JAV_VISITA', b: 'F_ANT_JAV', type: 'Hora distinta', severity: 'media', desc: 'Javier dice que se fue sobre las 23:30; su teléfono sigue en la zona de C/ del Almendro hasta las 00:00.' }
      ],
      truth: {
        culprit: 'javier', motive: 'm_fraude', method: 'me_golpe', window: 'w_despues', accomplices: [],
        partialMethods: { me_sed_golpe: 'Identificaste el golpe, pero no hubo sedación.' },
        decisive: ['F_PORTAL_JAV_OUT', 'F_TICKET_JAV', 'F_ANT_JAV', 'F_PC_EXCEL', 'F_PC_BORRADOR', 'F_FIN_EMPRESA', 'F_PC_2352', 'F_GAR_0002', 'F_ANT_ELENA', 'F_LUMINOL_PUERTA', 'S_ANDRES_GARAJE', 'F_CALLE_2334', 'F_AUTOPSIA_HORA', 'F_HERIDA_COMPATIBLE'],
        weak: ['F_FIBRAS_COMUN', 'F_CABELLO_SIN_RAIZ', 'S_MARTA_ZOLPIDEM', 'F_FIN_SEGURO_VIDA', 'F_TEL_1303', 'F_FIN_EV', 'F_UV_COPA', 'F_BOTELLA_SIN_HUELLAS', 'F_TEL_2246'],
        keyConflicts: ['CJ1', 'CJ2', 'C01'],
        narrative: [
          'Javier Molina mató a su socio. Desde 2024 había desviado 141.000 € de la consultora a «JM Servicios Técnicos SL», una sociedad suya sin actividad. Daniel lo descubrió, lo documentó en una hoja de cálculo (20:12) y preparó una denuncia para el lunes. Lucía tenía razón sin saberlo: «quien lleva el dinero» era Javier.',
          'Esa noche Daniel recibió a su asesora, Elena Vidal, para revisar su cartera. Llegó por el garaje (22:47) y se fue a las 23:06, también por el garaje, abierto desde el interfono. Sus inversiones eran legítimas.',
          'A las 23:12 Javier llamó desde la calle y subió. La discusión que oyó Andrés fue entre los dos. Hacia las 23:41 Javier golpeó a Daniel con el sujetalibros de bronce; no hubo sedación. Borró la hoja de cálculo y el historial (23:52), metió el sujetalibros en su bolsa de deporte y salió dando un portazo a las 23:58.',
          'Arrancó el coche a las 00:01 y repostó en la Av. del Puerto a las 00:19, no "nada más salir". Al ser confrontado con la cámara del portal, admitió la visita pero adelantó su salida a las 23:30: la cámara, sus antenas y el ticket lo desmienten.',
          'Elena no mintió esta vez. Marta ocultó la discusión del jueves por vergüenza, y su medicación para dormir no tuvo nada que ver.'
        ]
      },
      trial: {
        javier: [
          { id: 'O1', text: 'Mi cliente se marchó sobre las 23:30, antes de la hora del golpe.', accept: ['F_PORTAL_JAV_OUT', 'F_ANT_JAV', 'F_TICKET_JAV', 'S_ANDRES_GARAJE'] },
          { id: 'O2', text: 'La asesora estuvo esa noche en el piso y nadie la vio salir.', accept: ['F_GAR_0002', 'F_ANT_ELENA', 'F_CALLE_0002'] },
          { id: 'O3', text: 'No hay móvil: las cuentas de la empresa estaban mal por la crisis.', accept: ['F_PC_EXCEL', 'F_PC_BORRADOR', 'F_FIN_EMPRESA'] }
        ],
        generic: [
          { id: 'O1', text: 'Ningún registro sitúa a la persona acusada en el piso a la hora del golpe.', accept: [] },
          { id: 'O2', text: 'La acusación no explica quién salió del portal a las 23:58 con una bolsa de deporte.', accept: [] },
          { id: 'O3', text: 'La acusación no explica a quién señalaba la hoja de cálculo borrada a las 23:52.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['javier', 'elena'],
        spatialBonus: ['F_TICKET_JAV', 'F_CALLE_2334'],
        temporalConflicts: ['CJ1', 'CJ2'],
        lateral: [
          { type: 'fact', id: 'S_LUCIA_DINERO', pts: 20, yes: 'Escuchaste a la hermana sobre "quien lleva el dinero".', no: 'No exploraste qué sabía la familia del dinero.' },
          { type: 'conflict', id: 'CJ1', pts: 30, yes: 'Contrastaste la hora de salida declarada con la cámara.', no: 'No contrastaste la hora de salida declarada con la cámara.' },
          { type: 'conflict', id: 'CJ2', pts: 25 },
          { type: 'chosen', id: 'F_TICKET_JAV', pts: 25 }
        ]
      }
    }
  }
});
