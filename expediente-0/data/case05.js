/* EXPEDIENTE 0 — Caso EXP-005 «La tisana de las once».
 * Única fuente de verdad del caso. Envenenamiento con un glucósido cardíaco en una
 * casa-obrador familiar; la muerte pasa primero por natural. Dos versiones: cambia
 * la sustancia, la bebida que la llevó y quién la puso. Todo es ficticio. */
window.E0 = window.E0 || {};
E0.cases = E0.cases || [];

E0.cases.push({
  id: 'EXP-005',
  title: 'La tisana de las once',
  type: 'Envenenamiento',
  difficulty: 'Muy alta',
  minRank: 4,
  budget: 1500,
  location: 'Horno Saurí · C/ del Molí 12 · Alcoy (Alicante)',
  date: 'Noche del sábado 7 al domingo 8 de marzo de 2026',
  victim: {
    id: 'vicente',
    name: 'Vicente Saurí Llopis',
    age: 74,
    job: 'Fundador del Horno Saurí (obrador y tienda); viudo, vive encima del obrador'
  },
  deathWindow: 'Entre la 01:00 y las 05:00 (estimación preliminar en el lugar)',
  briefing: [
    'A las 07:40 del domingo 8 de marzo, Jordi Saurí sube a la vivienda que hay encima del horno familiar y encuentra muerto en la cama a su padre, Vicente, de 74 años. Vicente estaba enfermo del corazón y todos piensan en un infarto.',
    'La médica de guardia ve vómito en el baño y en el pasillo, y no firma el certificado de muerte natural. Un análisis rápido en el hospital da positivo para un fármaco del corazón que, según la familia, Vicente no tomaba.',
    'La noche anterior hubo cena en casa: el hijo, la nuera, la hija que vive en Valencia, el socio y el antiguo maestro panadero. La cuidadora se fue antes de cenar y dejó preparados la tisana de la noche y el pastillero.',
    'Un análisis rápido no es definitivo, y poder hacerlo no es haberlo hecho. Averigua qué entró en el cuerpo de Vicente, en qué bebida y quién estaba cerca en cada momento.'
  ],
  initialFacts: ['F5_HALLAZGO', 'F5_MEDICO', 'F5_CRIBADO', 'F5_VENTANA'],
  sceneSummary: 'Casa de dos plantas: abajo, la tienda, el obrador, el despacho y un patio con salida a un callejón; arriba, la vivienda de Vicente, a la que solo se llega por una escalera que sale del patio. Cámara en la tienda y alarma con sensores de movimiento por zonas.',

  mapScale: 0.05,
  places: {
    horno: { name: 'Horno Saurí · C/ del Molí 12 (obrador y vivienda)', x: 50, y: 50, kind: 'escena' },
    callejon: { name: 'Callejón trasero del horno', x: 53, y: 57, kind: 'calle' },
    ernesto: { name: 'Casa de Ernesto (pared con pared con el horno)', x: 45, y: 50, kind: 'domicilio' },
    partidor: { name: 'Farmacia del Partidor', x: 60, y: 40, kind: 'comercio' },
    batoy: { name: 'Batoy (domicilio de Jordi y Amparo)', x: 28, y: 82, kind: 'domicilio' },
    santarosa: { name: 'Santa Rosa (casa de Raúl Ferrándiz)', x: 72, y: 20, kind: 'domicilio' },
    zonanorte: { name: 'Zona Norte (domicilio de Rocío)', x: 38, y: 10, kind: 'domicilio' },
    cocentaina: { name: 'Cocentaina (domicilio de Bernat)', x: 94, y: 4, kind: 'domicilio', offmap: '≈ 8 km' },
    valencia: { name: 'Valencia (domicilio de Lidia)', x: 4, y: 4, kind: 'domicilio', offmap: '≈ 110 km' }
  },

  people: [
    {
      id: 'jordi', name: 'Jordi Saurí Pastor', initials: 'JS', age: 48,
      role: 'Hijo de Vicente', relation: 'Maestro panadero; lleva el obrador. Heredero y beneficiario del seguro de vida',
      hidden: { honestidad: 60, miedo: 55, manipulacion: 30, autocontrol: 40, confianza: 45 },
      questions: [
        { id: 'rel', q: '¿Cómo se llevaba con su padre?', a: 'Trabajo con él desde los dieciséis años. Discutíamos por el negocio, como cualquier padre con su hijo. Le quería.', type: 'verdad', reveals: [] },
        { id: 'cena', q: '¿Qué pasó en la cena?', a: 'Mi padre dijo que el lunes venía la gestoría a revisar las cuentas y que no pensaba vender el local. Yo quiero vender: el horno no da para dos familias. Discutimos, sí. Delante de todos.', type: 'verdad', reveals: ['S5_JOR_CENA'] },
        { id: 'noche', q: '¿Qué hizo después de cenar?', a: 'Bajamos al patio. Le serví a mi padre su herbero, como siempre. Luego fui con Ernesto al obrador a por la coca que había sobrado. Amparo y yo nos fuimos pasadas las once y conecté la alarma.', type: 'verdad', reveals: ['S5_JOR_PATIO'] },
        { id: 'copa', q: '¿Cuántas copas bebió su padre?', a: 'Yo le serví una. Cuando volví del obrador tenía otra delante, llena. Pensé que se la había servido él.', type: 'verdad', reveals: ['S5_JOR_COPA'] },
        { id: 'mensaje', q: '¿Supo algo de su padre durante la noche?', a: 'Nada. El mensaje lo vi a las seis y cuarto, al levantarme para el obrador. Si lo hubiera visto antes...', type: 'mentira', reveals: ['S5_JOR_MENSAJE'] },
        { id: 'dinero', q: '¿Tiene problemas de dinero?', requires: ['F5_FIN_SEGURO'], a: 'Tengo el préstamo de la tienda de Batoy, que cerré hace dos años. Y sé lo del seguro de vida, lo hizo cuando murió mi madre. No maté a mi padre por dinero.', type: 'media', reveals: [] }
      ],
      confront: {
        F5_TEL_MSG: { a: '(Tarda mucho en contestar.) Lo vi. A las doce menos cinco. Pensé que era una indigestión y que ya habíamos discutido bastante por un día. No subí. Eso no me lo voy a perdonar.', reveals: ['S5_JOR_ADMITE'] },
        F5_ANT_JORDI: { a: 'Vale. Lo leí esa misma noche. No fui. Ya está. ¿Qué quiere que le diga?', reveals: ['S5_JOR_ADMITE'] },
        F5_FIN_SEGURO: { a: 'Lo sé desde hace años. Mi hermana sabe que la casa es para ella. No hay ningún secreto.', reveals: [] },
        F5_MAIL_VALDEMAR: { a: '¿Bernat ya le había puesto fecha a la cadena? A mí me dijo que solo eran conversaciones.', reveals: [] },
        F5_BOTELLA_HUELLAS: { a: 'Claro que hay huellas mías. Le serví yo. Se lo he dicho.', reveals: [] },
        F5_COPA_HUELLAS: { a: 'Le serví la primera copa. Eso ya lo sabe.', reveals: [] },
        F5_FIN_TRANSF: { a: '¿Transferencias a Amparo? (Se queda en blanco.) Las cuentas las lleva ella. Pregúntele a ella.', reveals: [] }
      },
      confrontDefault: 'No sé qué quiere que le diga.'
    },
    {
      id: 'amparo', name: 'Amparo Gisbert Mas', initials: 'AG', age: 46,
      role: 'Nuera de Vicente', relation: 'Esposa de Jordi; lleva la contabilidad del horno y tiene poderes en la cuenta',
      hidden: { honestidad: 40, miedo: 55, manipulacion: 60, autocontrol: 75, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con Vicente?', a: 'Llevo las cuentas del horno desde hace doce años. Con mi suegro me llevaba bien. Era un hombre difícil, pero justo.', type: 'verdad', reveals: [] },
        { id: 'cena', q: '¿Qué pasó en la cena?', a: 'Vicente dijo que el lunes venía la gestoría y luego soltó que alguien de la casa le estaba robando. Fue muy desagradable. Nadie dijo nada.', type: 'verdad', reveals: ['S5_AMP_CENA'] },
        { id: 'cocina', q: '¿Dónde estuvo entre las 22:00 y las 22:30?', a: 'Subí a la cocina a hacer los cafés y luego los bajé al patio.', type: 'media', reveals: ['S5_AMP_COCINA'] },
        { id: 'termo', q: '¿Tocó el termo de la tisana?', a: 'No. Eso es cosa de Rocío y de Vicente.', type: 'media', reveals: ['S5_AMP_TERMO'] },
        { id: 'despacho', q: '¿Y después de los cafés?', a: 'Bajé al despacho a por una carpeta para preparar lo del lunes. Estuve sola, unos diez minutos, y volví al patio.', type: 'verdad', reveals: ['S5_AMP_DESPACHO'] },
        { id: 'vuelta', q: '¿Qué vio al volver al patio?', a: 'Vicente y Bernat estaban en la mesa. Vicente tenía otra copa de herbero. Al poco llegaron Jordi y Ernesto con la coca.', type: 'verdad', reveals: ['S5_AMP_VUELTA'] },
        { id: 'cuentas', q: '¿Hay algo raro en las cuentas del horno?', a: 'Nada que yo sepa. Vicente veía fantasmas.', type: 'mentira', reveals: ['S5_AMP_CUENTAS'] },
        { id: 'madre', q: '¿Alguien de su entorno toma digoxina?', requires: ['F5_CRIBADO'], a: 'Mi madre, por el corazón. Le recojo la medicación una vez al mes, siempre en la misma farmacia.', type: 'media', reveals: ['S5_AMP_MADRE'] }
      ],
      confront: {},
      confrontDefault: 'No veo qué tiene que ver eso conmigo.'
    },
    {
      id: 'lidia', name: 'Lidia Saurí Pastor', initials: 'LS', age: 44,
      role: 'Hija de Vicente', relation: 'Enfermera en un hospital de Valencia; vino a cenar',
      hidden: { honestidad: 65, miedo: 50, manipulacion: 30, autocontrol: 60, confianza: 55 },
      questions: [
        { id: 'rel', q: '¿Cómo era su relación con su padre?', a: 'Me fui a Valencia con veinte años. Le quería, pero con él había que medir cada palabra.', type: 'verdad', reveals: [] },
        { id: 'noche', q: '¿Dónde estuvo entre las 22:00 y las 22:30?', a: 'Salí a la calle a hablar por teléfono, un buen rato. Luego subí a por mi bolsa, me despedí y me fui sobre las diez y media.', type: 'verdad', reveals: ['S5_LID_CALLE'] },
        { id: 'despues', q: '¿Dónde pasó la noche?', a: 'En mi casa, en Valencia. Llegué pasada la medianoche. Por la mañana me llamó Jordi y volví corriendo.', type: 'mentira', reveals: ['S5_LID_VALENCIA'] },
        { id: 'llamada', q: 'Su padre la llamó a las 00:31. ¿Por qué no contestó?', requires: ['F5_TEL_LLAMADA', 'F5_ANT_LIDIA'], a: 'Estaba dormida, con el móvil en silencio. Lo vi por la mañana.', type: 'media', reveals: ['S5_LID_DORMIDA'] },
        { id: 'digoxina', q: '¿Tiene acceso a digoxina?', requires: ['F5_CRIBADO'], a: 'En el hospital, claro, como cualquier enfermera de planta. Pero está controlada: cada comprimido se registra. Compruébelo.', type: 'verdad', reveals: ['S5_LID_HOSPITAL'] },
        { id: 'salud', q: '¿Cómo estaba de salud su padre?', a: 'Del corazón, controlado. Bisoprolol, aspirina y el protector de estómago. Rocío le preparaba el pastillero y alguna vez se equivocaba.', type: 'verdad', reveals: [] },
        { id: 'ventana', q: '¿Vio algo que le llamara la atención durante la cena?', a: 'Hacia las diez menos veinte me levanté a contestar un mensaje junto a la ventana del comedor, la que da al patio. Vi a una mujer cruzar el patio hacia el obrador, con un bolso grande. Estaba oscuro y la vi de lado, desde arriba. Pensé que sería alguien de la casa y no dije nada.', type: 'verdad', reveals: ['S5_LID_VENTANA'] }
      ],
      confront: {
        F5_LPR_LIDIA: { a: '(Respira hondo.) Me quedé en Alcoy, en casa de Raúl, mi expareja. Estoy casada. No quería que esto saliera. Por eso no oí a mi padre.', reveals: ['S5_LID_RAUL'] },
        F5_ANT_LIDIA: { a: 'Ya lo ve. Estaba en Santa Rosa, con Raúl. No le dije nada porque estoy casada. No tiene nada que ver con mi padre.', reveals: ['S5_LID_RAUL'] },
        F5_TEL_LLAMADA: { a: 'Tenía el móvil en silencio. No sabe lo que daría por haberlo cogido.', reveals: [] },
        F5_CAM_LIDIA: { a: 'Ahí me tiene. En la acera, al teléfono.', reveals: [] },
        F5_FARM_LIDIA: { a: 'Se lo dije. Compruébenlo cuantas veces quieran.', reveals: [] }
      },
      confrontDefault: 'No sé nada de eso.'
    },
    {
      id: 'bernat', name: 'Bernat Climent Sanz', initials: 'BC', age: 58,
      role: 'Socio del horno (30 %)', relation: 'Distribuidor de harinas; amigo de Vicente desde hace treinta años',
      hidden: { honestidad: 35, miedo: 40, manipulacion: 75, autocontrol: 80, confianza: 60 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Vicente?', a: 'Soy socio del horno desde 2011, con un treinta por ciento, y le sirvo la harina. Éramos amigos antes que socios.', type: 'verdad', reveals: [] },
        { id: 'venta', q: '¿Qué sabe de la venta del local?', a: 'Una cadena de supermercados preguntó. Tanteos. No hay nada firmado. El que quería vender era Jordi.', type: 'mentira', reveals: ['S5_BER_NADA'] },
        { id: 'coche', q: '¿Por qué salió a su coche a las 21:50?', requires: ['F5_CAM_BERNAT_COCHE'], a: 'A por un puro. Me lo fumé en el patio con el café.', type: 'media', reveals: ['S5_BER_PURO'] },
        { id: 'patio', q: '¿Dónde estuvo entre las 22:30 y las 22:50?', a: 'Abajo, entre el patio y el resto de la planta, hasta que me fui.', type: 'media', reveals: ['S5_BER_PATIO'] },
        { id: 'copa', q: '¿Tocó la copa de Vicente?', a: 'No. Yo bebía whisky. Cada uno se servía lo suyo.', type: 'media', reveals: ['S5_BER_COPA'] },
        { id: 'llamada', q: '¿A quién llamó a las 22:58?', requires: ['F5_ANT_BERNAT'], a: 'A un cliente. Cosas de trabajo.', type: 'mentira', reveals: ['S5_BER_CLIENTE'] }
      ],
      confront: {
        F5_FIN_ARRAS: { a: 'Las arras eran una garantía para la cadena. Habría convencido a Vicente. O a Jordi.', reveals: ['S5_BER_ARRAS'] },
        F5_MAIL_VALDEMAR: { a: 'Les adelanté una fecha, sí. Así se negocia. Tenía las arras firmadas y sabía que al final Vicente cedería.', reveals: ['S5_BER_ARRAS'] },
        F5_ANT_BERNAT: { a: 'Llamé al director de expansión, sí. Para decirle que Vicente seguía sin querer vender. ¿Qué otra cosa iba a decirle?', reveals: ['S5_BER_LLAMADA'] },
        F5_TEL_MIERCOLES: { a: 'El miércoles fui a llevarle unas facturas. Entré por detrás porque la tienda estaba llena. Me abrió él.', reveals: [] }
      },
      confrontDefault: 'Eso no tiene nada que ver conmigo.'
    },
    {
      id: 'ernesto', name: 'Ernesto Moltó Ribera', initials: 'EM', age: 69,
      role: 'Antiguo maestro panadero', relation: 'Jubilado; vive en la casa de al lado, cuida el patio y los domingos ayuda en el obrador',
      hidden: { honestidad: 60, miedo: 65, manipulacion: 20, autocontrol: 45, confianza: 40 },
      questions: [
        { id: 'rel', q: '¿Qué relación tenía con Vicente?', a: 'Cuarenta años amasando a su lado. Ahora estoy jubilado, pero los domingos sigo bajando a echar una mano.', type: 'verdad', reveals: [] },
        { id: 'cena', q: '¿Qué recuerda de la cena?', a: 'A las nueve y media partí la coca en la cocina. El termo de Vicente ya estaba en la encimera, cerrado, como siempre. Vicente estaba de mal humor por lo de las cuentas.', type: 'verdad', reveals: ['S5_ERN_COCA'] },
        { id: 'patio', q: '¿Qué recuerda del patio?', a: 'Hice una foto a las diez y pico de Vicente con Jordi y Bernat y la mandé al grupo. Yo me lié unos cigarros. Y vi a Bernat con la botella en la mano, sirviendo.', type: 'creencia', reveals: ['S5_ERN_BOTELLA'] },
        { id: 'obrador', q: '¿Salió del patio en algún momento?', a: 'Fui con Jordi al obrador a por la coca que había sobrado. Ocho minutos, más o menos.', type: 'verdad', reveals: ['S5_ERN_OBRADOR'] },
        { id: 'salud', q: '¿Toma usted alguna medicación?', a: 'Nada. Estoy como un roble.', type: 'mentira', reveals: ['S5_ERN_SANO'] },
        { id: 'adelfas', q: '¿Quién cuida las adelfas del patio?', a: 'Yo. Las podé hace un mes. Nadie más las toca: la gente no sabe lo venenosas que son.', type: 'verdad', reveals: ['S5_ERN_PODA'] }
      ],
      confront: {
        F5_FARM_ERNESTO: { a: '(Se pone rojo.) Tomo digoxina desde hace dos años. Si Jordi se entera de que tengo el corazón mal, no me deja volver al obrador. Mis pastillas están en mi casa, todas.', reveals: ['S5_ERN_ADMITE'] },
        F5_TICKET: { a: 'Ese ticket es mío. Se me caería del bolsillo al sacar el tabaco en la cocina. Sí, tomo digoxina. No se lo diga a Jordi.', reveals: ['S5_ERN_ADMITE'] },
        F5_TEL_FOTO: { a: 'Esa foto la hice yo. Por eso no salgo.', reveals: [] }
      },
      confrontDefault: 'Yo de eso no entiendo.'
    },
    {
      id: 'rocio', name: 'Rocío Íñiguez Soler', initials: 'RÍ', age: 53,
      role: 'Cuidadora y asistenta', relation: 'Trabaja para Vicente desde 2022, de lunes a sábado hasta las 20:00',
      hidden: { honestidad: 55, miedo: 80, manipulacion: 15, autocontrol: 35, confianza: 45 },
      questions: [
        { id: 'rel', q: '¿Desde cuándo trabaja para Vicente?', a: 'Cuatro años. Le hago la casa y la comida, le preparo las pastillas y la tisana de la noche.', type: 'verdad', reveals: [] },
        { id: 'tarde', q: '¿Qué hizo el sábado por la tarde?', a: 'Preparé el pastillero de la semana a las siete y media y la tisana a las ocho menos cuarto. Dejé el termo en la encimera de la cocina, como siempre, y me fui a las ocho menos cinco.', type: 'verdad', reveals: ['S5_ROC_TERMO'] },
        { id: 'volvio', q: '¿Volvió a la casa esa noche?', a: 'No. Me fui a mi casa y no salí.', type: 'mentira', reveals: ['S5_ROC_NOVOLVIO'] },
        { id: 'pastillero', q: '¿Preparó bien el pastillero?', a: 'Como siempre. Llevo cuatro años haciéndolo. No me equivoco.', type: 'creencia', reveals: ['S5_ROC_PASTILLERO'] },
        { id: 'tisana', q: '¿Qué lleva la tisana?', a: 'Manzanilla con anís y una cucharada de miel. Se la toma entera en la cama, todas las noches, antes de dormir.', type: 'verdad', reveals: ['S5_ROC_TISANA'] }
      ],
      confront: {
        F5_AL_PATIO: { a: '(Se echa a llorar.) Volví a por mi sobre de la semana, que Vicente me lo deja en el obrador, y me llevé un táper de comida que sobraba. Amparo me tiene dicho que no me lleve nada. No subí arriba, se lo juro.', reveals: ['S5_ROC_VOLVIO'] },
        F5_POLVO_PUERTA: { a: 'Entré por la puerta del patio, sí. A por mi sobre. No subí a la casa.', reveals: ['S5_ROC_VOLVIO'] },
        F5_ANT_ROCIO: { a: 'Fui un momento a por mi sobre y un táper. Me daba miedo que me echaran.', reveals: ['S5_ROC_VOLVIO'] },
        S5_LID_VENTANA: { a: '(Baja la cabeza.) Era yo. Volví a por mi sobre y un táper, por el patio. No subí a la casa.', reveals: ['S5_ROC_VOLVIO'] },
        F5_PASTILLERO_TOX: { a: '¿Dos pastillas? (Se tapa la cara.) Me equivocaría con las prisas. Pero eso no mata a nadie, ¿verdad?', reveals: [] }
      },
      confrontDefault: 'Yo de eso no sé nada, de verdad.'
    }
  ],

  scene: {
    plans: [
      {
        id: 'vivienda', name: 'Vivienda (planta 1.ª)', legend: 'Vivienda de Vicente · la escalera baja directamente al patio',
        rooms: [
          { id: 'dormitorio', name: 'Dormitorio', x: 0, y: 0, w: 40, h: 55 },
          { id: 'bano', name: 'Baño', x: 40, y: 0, w: 20, h: 55 },
          { id: 'cocina', name: 'Cocina', x: 60, y: 0, w: 40, h: 50 },
          { id: 'salon', name: 'Salón comedor', x: 0, y: 55, w: 70, h: 45 },
          { id: 'escalera', name: 'Escalera al patio', x: 70, y: 50, w: 30, h: 50 }
        ],
        hotspots: [
          { ev: 'P01', x: 14, y: 22 }, { ev: 'P02', x: 32, y: 12 }, { ev: 'P03', x: 28, y: 40 },
          { ev: 'P04', x: 50, y: 28 }, { ev: 'P05', x: 70, y: 14 }, { ev: 'P06', x: 88, y: 38 }
        ]
      },
      {
        id: 'baja', name: 'Planta baja', legend: 'Tienda, pasillo, despacho, obrador y patio con salida al callejón',
        rooms: [
          { id: 'tienda', name: 'Tienda', x: 0, y: 0, w: 35, h: 40 },
          { id: 'despacho', name: 'Despacho', x: 0, y: 40, w: 35, h: 25 },
          { id: 'pasillo', name: 'Pasillo', x: 35, y: 0, w: 15, h: 65 },
          { id: 'obrador', name: 'Obrador', x: 50, y: 0, w: 50, h: 65 },
          { id: 'patio', name: 'Patio', x: 0, y: 65, w: 100, h: 35 }
        ],
        hotspots: [
          { ev: 'B08', x: 10, y: 12 }, { ev: 'B06', x: 10, y: 50 }, { ev: 'B07', x: 26, y: 57 },
          { ev: 'B01', x: 28, y: 78 }, { ev: 'B02', x: 38, y: 82 }, { ev: 'B04', x: 50, y: 76 },
          { ev: 'B03', x: 80, y: 74 }, { ev: 'B05', x: 94, y: 92 }
        ]
      }
    ]
  },

  evidence: [
    { id: 'P01', name: 'Cuerpo de la víctima', type: 'Forense', level: 1, custody: 'Cadáver trasladado al Instituto de Medicina Legal de Alicante', room: 'Dormitorio',
      public: 'Vicente yace en la cama, boca arriba, con el pijama puesto.',
      detail: 'Sin heridas ni signos de lucha. Restos de vómito en la comisura de los labios y en la almohada. Pupilas normales.',
      value: 'Causa de la muerte y sustancia implicada.', limits: 'Sin análisis no se puede distinguir un infarto de una arritmia provocada.',
      reveals: [],
      lab: {
        autopsia: { cost: 300, reveals: ['F5_AUTOPSIA', 'F5_AUTOPSIA_HORA'] },
        toxicologia: { cost: 280, label: 'Toxicología confirmatoria (cromatografía)', reveals: ['F5_TOX', 'F5_TOX_BISO'] }
      } },
    { id: 'P02', name: 'Termo de tisana', type: 'Objeto', level: 2, model: 'bottle', room: 'Dormitorio',
      public: 'Termo de acero sobre la mesilla de noche.',
      detail: 'Termo de medio litro, vacío salvo un poso oscuro en el fondo. Tapón de rosca puesto. Huele a manzanilla y anís.',
      value: 'Era lo último que bebía Vicente cada noche.', limits: 'Estuvo horas en la encimera de una cocina por la que pasó mucha gente.',
      reveals: ['F5_TERMO'],
      lab: {
        toxicologia: { cost: 180, label: 'Toxicología del poso', reveals: ['F5_TERMO_TOX'] },
        huellas: { cost: 120, reveals: ['F5_TERMO_HUELLAS'] }
      } },
    { id: 'P03', name: 'Teléfono de Vicente', type: 'Dispositivo', level: 2, room: 'Dormitorio',
      public: 'Teléfono móvil en el suelo, junto a la cama.',
      detail: 'Sin bloqueo. Batería casi agotada. La pantalla tiene restos secos de vómito.',
      value: 'Mensajes y llamadas de la noche.', limits: 'No dice cómo se encontraba más allá de lo que escribió.',
      reveals: [], unlocks: ['D5_TEL'] },
    { id: 'P04', name: 'Restos de vómito en el baño', type: 'Biológico', level: 2, model: 'trace', room: 'Baño',
      public: 'Baño de la vivienda.',
      detail: 'Restos de vómito en el inodoro, en el lavabo y en el suelo del pasillo. Nadie ha limpiado.',
      value: 'Contenido del estómago antes de la muerte.', limits: 'Mezcla todo lo que comió y bebió esa noche.',
      reveals: [],
      lab: { toxicologia: { cost: 160, label: 'Toxicología del vómito', reveals: ['F5_VOMITO_TOX'] } } },
    { id: 'P05', name: 'Pastillero semanal', type: 'Objeto', level: 3, model: 'jewelry', room: 'Cocina',
      public: 'Pastillero de plástico de siete días junto a la nevera.',
      detail: 'Siete días con cuatro tomas cada uno. Falta la toma del sábado por la noche; las del domingo siguen cerradas.',
      value: 'Permite comprobar la medicación que tomaba.', limits: 'Lo prepara una persona a mano cada semana.',
      reveals: ['F5_PASTILLERO'],
      lab: { toxicologia: { cost: 120, label: 'Análisis de los comprimidos', reveals: ['F5_PASTILLERO_TOX'] } } },
    { id: 'P06', name: 'Papelera de la cocina', type: 'Documento', level: 4, room: 'Cocina',
      public: 'Cubo de basura bajo el fregadero.',
      detail: 'Bolsitas de manzanilla usadas, servilletas, el papel de la coca y un ticket arrugado.',
      value: 'Restos de la preparación de la cena y la tisana.', limits: 'No dice quién tiró cada cosa.',
      reveals: [],
      forensic: { lupa: { reveals: ['F5_TICKET'] } } },
    { id: 'B01', name: 'Botella de herbero', type: 'Objeto', level: 2, room: 'Patio',
      public: 'Botella sin etiqueta en la mesa del patio.',
      detail: 'Herbero casero, tres cuartos llena, con tapón de corcho. Al lado, una botella de whisky casi vacía.',
      value: 'De aquí se sirvió el licor de Vicente.', limits: 'La sirvieron varias personas.',
      reveals: [],
      lab: {
        toxicologia: { cost: 150, reveals: ['F5_BOTELLA_TOX'] },
        huellas: { cost: 120, reveals: ['F5_BOTELLA_HUELLAS'] }
      } },
    { id: 'B02', name: 'Copa de herbero de Vicente', type: 'Objeto', level: 2, room: 'Patio',
      public: 'Copita de cristal tallado en la mesa del patio.',
      detail: 'Está en el sitio de Vicente, con un resto seco en el fondo. Las demás copas y tazas se recogieron antes de irse.',
      value: 'Lo último que bebió en el patio.', limits: 'Estuvo en la mesa toda la sobremesa, al alcance de cualquiera.',
      reveals: ['F5_COPA'],
      lab: {
        toxicologia: { cost: 160, label: 'Toxicología del resto seco', reveals: ['F5_COPA_TOX'] },
        huellas: { cost: 120, reveals: ['F5_COPA_HUELLAS'] }
      } },
    { id: 'B03', name: 'Adelfas del patio', type: 'Escena', level: 4, fixed: true, room: 'Patio',
      public: 'Dos adelfas grandes en macetones, con flor rosa.',
      detail: 'Arbustos de casi dos metros. Hay varias ramas cortadas.',
      value: 'Planta muy tóxica al alcance de cualquiera que pase por el patio.', limits: 'Que haya ramas cortadas no dice cuándo ni para qué.',
      reveals: ['F5_ADELFA'],
      forensic: { lupa: { reveals: ['F5_ADELFA_LUPA'] } } },
    { id: 'B04', name: 'Cenicero del patio', type: 'Objeto', level: 5, room: 'Patio',
      public: 'Cenicero de barro sobre la mesa del patio.',
      detail: 'Cenicero de barro con ceniza y colillas de la sobremesa.',
      value: 'Quién fumó qué en el patio.', limits: 'Pudo vaciarse antes de la cena.',
      reveals: ['F5_CENICERO'] },
    { id: 'B05', name: 'Puerta trasera del patio', type: 'Escena', level: 2, fixed: true, room: 'Patio',
      public: 'Puerta metálica que da al callejón.',
      detail: 'Se abre desde dentro sin llave y desde fuera con llave. El callejón no tiene cámara. El sensor de apertura está conectado a la alarma.',
      value: 'Única entrada a la casa que no ve la cámara.', limits: 'Tienen llave varias personas.',
      reveals: ['F5_PUERTA_PATIO'],
      forensic: { polvo: { reveals: ['F5_POLVO_PUERTA'] } } },
    { id: 'B06', name: 'Ordenador del despacho', type: 'Dispositivo', level: 2, room: 'Despacho',
      public: 'Ordenador de sobremesa en el despacho.',
      detail: 'El ordenador de la contabilidad. Tiene configurado el correo de Vicente.',
      value: 'Correos de los últimos días.', limits: 'Lo usan Vicente y Amparo.',
      reveals: [], unlocks: ['D5_CORREO'] },
    { id: 'B07', name: 'Carpeta de préstamos familiares', type: 'Documento', level: 3, room: 'Despacho',
      public: 'Archivador del despacho.',
      detail: 'Carpeta de cartón con la etiqueta «préstamos familiares», escrita a mano por Vicente.',
      value: 'Puede explicar movimientos de dinero dentro de la familia.', limits: 'Que no haya un papel no prueba que no existiera.',
      reveals: ['F5_CARPETA'] },
    { id: 'B08', name: 'Cámara de la tienda', type: 'Dispositivo', level: 2, fixed: true, room: 'Tienda',
      public: 'Cámara en el techo de la tienda y teclado de la alarma junto a la puerta.',
      detail: 'La cámara graba la puerta de la calle, la acera y el pasillo interior. La alarma registra el movimiento de cada zona aunque esté desconectada.',
      value: 'Quién entra, quién sale y qué zonas tienen actividad.', limits: 'No ve el patio, el callejón ni la planta de arriba.',
      reveals: ['F5_CAMARA_ESCENA'] }
  ],

  labKinds: { autopsia: 'Autopsia completa', toxicologia: 'Toxicología', huellas: 'Huellas dactilares' },

  digital: [
    { id: 'D5_TEL', name: 'Extracción del teléfono de Vicente', cost: 220, desc: 'Mensajes, llamadas y grupos de la última semana.', requires: 'P03',
      reveals: ['F5_TEL_MSG', 'F5_TEL_LLAMADA', 'F5_TEL_FOTO', 'F5_TEL_MIERCOLES'] },
    { id: 'D5_ALARMA', name: 'Registro de la alarma', cost: 120, desc: 'Aperturas de puertas y movimiento por zonas, de 19:00 a 08:00.',
      reveals: ['F5_AL_PATIO', 'F5_AL_ESCALERA', 'F5_AL_COCINA', 'F5_AL_BAJA', 'F5_AL_ARMADO'] },
    { id: 'D5_CAM', name: 'Grabación de la cámara de la tienda', cost: 100, desc: 'Puerta de la calle, acera y pasillo interior, de 19:00 a 08:00.',
      reveals: ['F5_CAM_ROCIO', 'F5_CAM_LLEGADAS', 'F5_CAM_BERNAT_COCHE', 'F5_CAM_LIDIA', 'F5_CAM_LIDIA_SALE', 'F5_CAM_PASILLO', 'F5_CAM_SALIDAS'] },
    { id: 'D5_FARMACIA', name: 'Receta electrónica y dispensaciones', cost: 140, desc: 'Fármacos cardíacos dispensados a las personas del expediente y a sus familiares a cargo.',
      reveals: ['F5_FARM_ERNESTO', 'F5_FARM_AMPARO', 'F5_FARM_LIDIA'] },
    { id: 'D5_HISTORIA', name: 'Historia clínica de Vicente', cost: 60, desc: 'Diagnósticos, tratamiento pautado y última revisión.',
      reveals: ['F5_HC_VICENTE'] },
    { id: 'D5_FIN', name: 'Datos financieros', cost: 150, desc: 'Cuentas del horno, seguros y operaciones de las personas del expediente.',
      reveals: ['F5_FIN_TRANSF', 'F5_FIN_ARRAS', 'F5_FIN_SEGURO'] },
    { id: 'D5_CORREO', name: 'Correo del ordenador del despacho', cost: 120, desc: 'Correos de Vicente de la última semana.', requires: 'B06',
      reveals: ['F5_MAIL_GESTORIA', 'F5_MAIL_VALDEMAR'] },
    { id: 'D5_LPR', name: 'Lectores de matrículas de Alcoy', cost: 90, desc: 'Entradas y salidas del municipio de los vehículos de las personas del expediente.',
      reveals: ['F5_LPR_LIDIA'] }
  ],

  judicial: {
    max: 2,
    desc: 'Antenas y llamadas de un teléfono entre las 20:00 y las 08:00. El juzgado autoriza dos solicitudes.',
    results: {
      jordi: ['F5_ANT_JORDI'], amparo: ['F5_ANT_AMPARO'], lidia: ['F5_ANT_LIDIA'],
      bernat: ['F5_ANT_BERNAT'], ernesto: ['F5_ANT_ERNESTO'], rocio: ['F5_ANT_ROCIO']
    }
  },

  facts: {
    /* ----- Iniciales ----- */
    F5_HALLAZGO: { text: 'Jordi encuentra a su padre muerto en la cama al subir a la vivienda.', time: '07:40', person: 'jordi', place: 'horno', source: 'informe policial', tags: ['hallazgo'] },
    F5_MEDICO: { text: 'La médica de guardia encuentra vómito en el baño y en el pasillo y no firma el certificado de muerte natural.', time: '08:10', place: 'horno', source: 'informe policial', tags: ['muerte'] },
    F5_CRIBADO: { text: 'Análisis rápido en el hospital (inmunoensayo): positivo para digoxina, un fármaco del corazón. La técnica también reacciona con sustancias de estructura parecida y necesita confirmación. Según su hijo, Vicente no tomaba digoxina.', person: 'vicente', source: 'informe forense', tags: ['tox', 'muerte'] },
    F5_VENTANA: { text: 'Estimación preliminar en el lugar: muerte entre la 01:00 y las 05:00.', time: '01:00', end: '05:00', person: 'vicente', source: 'informe forense', tags: ['muerte', 'hora'] },

    /* ----- Escena y laboratorio ----- */
    F5_AUTOPSIA: { text: 'Autopsia: sin lesiones ni infarto reciente. Cardiopatía antigua y estable. Signos de una arritmia grave tras horas de vómitos. En el estómago, líquido y restos de bizcocho.', person: 'vicente', source: 'laboratorio', tags: ['muerte', 'autopsia'] },
    F5_AUTOPSIA_HORA: { text: 'Autopsia: la muerte se produjo entre las 02:00 y las 04:00.', time: '02:00', end: '04:00', person: 'vicente', place: 'horno', source: 'informe forense', tags: ['muerte', 'hora'] },
    F5_TOX_BISO: { text: 'Toxicología: bisoprolol en sangre algo por encima de lo habitual. Por sí solo no explica la muerte.', person: 'vicente', source: 'laboratorio', tags: ['tox', 'medicacion'] },
    F5_TERMO: { text: 'En la mesilla, el termo de la tisana: vacío salvo un poso, con el tapón de rosca puesto.', place: 'horno', source: 'escena', tags: ['tox'] },
    F5_PASTILLERO: { text: 'Pastillero semanal: falta la toma del sábado por la noche; las del domingo siguen cerradas.', place: 'horno', source: 'escena', tags: ['medicacion', 'pastillas'] },
    F5_PASTILLERO_TOX: { text: 'Comprimidos del pastillero: todos son la medicación pautada de Vicente. En la toma del domingo por la mañana hay dos bisoprolol en lugar de uno: un error al prepararlo. No hay ningún comprimido extraño.', person: 'rocio', source: 'laboratorio', tags: ['medicacion', 'pastillas'] },
    F5_TICKET: { text: 'Lupa: el ticket es de la Farmacia del Partidor, del 2 de marzo a las 10:14: un envase de digoxina 0,25 mg.', place: 'partidor', source: 'documento', tags: ['tox', 'medicacion'] },
    F5_BOTELLA_TOX: { text: 'Herbero de la botella: anís, hierbas y alcohol. Ningún tóxico.', source: 'laboratorio', tags: ['botella', 'tox'] },
    F5_BOTELLA_HUELLAS: { prints: [{ at: 'Cuello de la botella', match: 'vicente' }, { at: 'Cuerpo de la botella', match: 'jordi' }], text: 'Huellas en la botella de herbero: de Vicente en el cuello y de Jordi en el cuerpo.', person: 'jordi', source: 'laboratorio', tags: ['botella', 'huella'] },
    F5_COPA: { text: 'En el sitio de Vicente queda su copita de herbero con un resto seco; las demás copas se recogieron.', place: 'horno', source: 'escena', tags: ['copa'] },
    F5_ADELFA: { text: 'En el patio hay dos adelfas grandes. Toda la planta es muy tóxica: sus sustancias actúan sobre el corazón y dan positivo en los análisis rápidos de digoxina.', place: 'horno', source: 'informe forense', tags: ['tox'] },
    F5_PUERTA_PATIO: { text: 'La puerta del patio se abre desde dentro sin llave y desde fuera con llave; el callejón no tiene cámara.', place: 'callejon', source: 'escena', tags: ['acceso', 'puerta'] },
    F5_POLVO_PUERTA: { prints: [{ at: 'Manilla exterior', match: 'rocio' }, { at: 'Manilla exterior (borde)', q: 'no_apta' }], text: 'Polvo revelador: en la manilla exterior de la puerta del patio, huellas recientes de Rocío Íñiguez y una parcial no apta.', person: 'rocio', place: 'callejon', source: 'laboratorio', tags: ['acceso', 'huella'] },
    F5_CAMARA_ESCENA: { text: 'La cámara de la tienda graba la puerta de la calle, la acera y el pasillo interior (obrador, despacho y salida al patio). La escalera de la vivienda sale del patio y es el único acceso a la planta de arriba. La alarma registra el movimiento de cada zona aunque esté desconectada.', place: 'horno', source: 'escena', tags: ['camara', 'acceso'] },

    /* ----- Teléfono de Vicente ----- */
    F5_TEL_MSG: { text: 'Mensaje de Vicente a Jordi: «Estoy vomitando, algo me ha sentado mal. No es nada, mañana te digo». Leído a las 23:54.', time: '23:52', person: 'jordi', place: 'horno', source: 'mensaje', tags: ['mensaje', 'telefono'] },
    F5_TEL_LLAMADA: { text: 'Llamada saliente de Vicente a Lidia, no contestada.', time: '00:31', person: 'lidia', place: 'horno', source: 'llamada', tags: ['llamada', 'telefono'] },
    F5_TEL_FOTO: { text: 'Grupo «Família Saurí»: Ernesto envía a las 22:13 una foto hecha a las 22:12 en el patio. Salen Vicente, Jordi y Bernat en la mesa. Nadie más.', time: '22:12', person: 'ernesto', place: 'horno', source: 'dispositivo', tags: ['mensaje'] },
    F5_TEL_MIERCOLES: { text: 'Miércoles 4, 17:02: Bernat escribe a Vicente: «Estoy en la puerta de atrás, ábreme, que traigo las facturas».', person: 'bernat', place: 'callejon', source: 'mensaje', tags: ['mensaje', 'acceso'] },

    /* ----- Alarma ----- */
    F5_AL_PATIO: { text: 'Alarma: la puerta del patio se abre a las 21:38 y se cierra a las 21:44. Obrador: movimiento de 21:39 a 21:42.', time: '21:38', end: '21:44', place: 'horno', source: 'registro', tags: ['acceso', 'puerta'] },
    F5_AL_ESCALERA: { text: 'Alarma, escalera de la vivienda: movimiento frecuente hasta las 20:46; ninguno entre las 20:46 y las 21:45; movimiento de 21:45 a 21:48 y después a las 22:05, 22:20, 22:22, 22:26, 22:37, 22:42 y 23:01. Salón comedor: movimiento de 22:22 a 22:25.', time: '21:45', end: '23:01', place: 'horno', source: 'registro', tags: ['acceso'] },
    F5_AL_COCINA: { text: 'Alarma, cocina de la vivienda: movimiento intermitente durante la cena; continuo de 22:06 a 22:19; ninguno entre las 22:19 y las 23:01.', time: '22:06', end: '22:19', place: 'horno', source: 'registro', tags: ['acceso'] },
    F5_AL_BAJA: { text: 'Alarma, planta baja: obrador con movimiento de 22:36 a 22:44; despacho con movimiento de 22:38 a 22:47.', time: '22:36', end: '22:47', place: 'horno', source: 'registro', tags: ['acceso'] },
    F5_AL_ARMADO: { text: 'Alarma conectada en modo noche con el código de Jordi. No se abre ninguna puerta hasta las 06:27, cuando la desconecta el mismo código.', time: '23:08', end: '06:27', person: 'jordi', place: 'horno', source: 'registro', tags: ['acceso'] },

    /* ----- Cámara de la tienda ----- */
    F5_CAM_ROCIO: { text: 'Cámara: Rocío sale por la puerta de la calle con su bolso.', time: '19:56', person: 'rocio', place: 'horno', source: 'cámara', tags: ['camara'] },
    F5_CAM_LLEGADAS: { text: 'Cámara: llegan Jordi y Amparo a las 20:20, Lidia a las 20:26, Ernesto a las 20:34 con una caja de pastelería y Bernat a las 20:41.', time: '20:20', end: '20:41', place: 'horno', source: 'cámara', tags: ['camara'] },
    F5_CAM_BERNAT_COCHE: { text: 'Cámara: Bernat cruza el pasillo, sale a la calle y va hacia su coche. Vuelve a las 21:54 con la mano derecha en el bolsillo de la chaqueta; no se ve qué lleva.', time: '21:50', end: '21:54', person: 'bernat', place: 'horno', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F5_CAM_LIDIA: { text: 'Cámara: Lidia está en la acera, frente a la tienda, hablando por teléfono todo el rato.', time: '22:03', end: '22:21', person: 'lidia', place: 'horno', source: 'cámara', tags: ['camara', 'llamada'] },
    F5_CAM_LIDIA_SALE: { text: 'Cámara: Lidia sale con su bolsa de viaje y se va en su coche.', time: '22:27', person: 'lidia', place: 'horno', source: 'cámara', tags: ['camara', 'vehiculo'] },
    F5_CAM_PASILLO: { text: 'Cámara, pasillo interior: a las 22:36 Jordi y Ernesto van hacia el obrador; a las 22:38 Amparo entra sola en el despacho; Jordi y Ernesto vuelven al patio a las 22:44 y Amparo a las 22:47. Entre las 22:30 y las 22:50 nadie más cruza el pasillo.', time: '22:36', end: '22:47', place: 'horno', source: 'cámara', tags: ['camara'] },
    F5_CAM_SALIDAS: { text: 'Cámara: salen Bernat a las 22:52, Ernesto a las 22:56 y Jordi y Amparo a las 23:09.', time: '22:52', end: '23:09', place: 'horno', source: 'cámara', tags: ['camara'] },

    /* ----- Farmacia, historia clínica, finanzas, correo, matrículas ----- */
    F5_FARM_ERNESTO: { text: 'Receta electrónica: a Ernesto Moltó se le dispensa digoxina 0,25 mg cada mes desde 2024. La última, el 2 de marzo a las 10:14 en la Farmacia del Partidor.', person: 'ernesto', place: 'partidor', source: 'registro', tags: ['tox', 'medicacion'] },
    F5_FARM_LIDIA: { text: 'Lidia Saurí no tiene dispensaciones de fármacos cardíacos. La farmacia de su hospital no registra descuadres de digoxina en su planta en el último trimestre.', person: 'lidia', source: 'registro', tags: ['tox', 'medicacion'] },
    F5_HC_VICENTE: { text: 'Historia clínica: cardiopatía antigua y estable, tratada con bisoprolol, aspirina y omeprazol (recoge la medicación Rocío). Nunca se le ha pautado digoxina. Revisión del 12 de febrero: buen estado.', person: 'vicente', source: 'documento', tags: ['medicacion'] },
    F5_FIN_TRANSF: { text: 'Cuentas del horno: 14 transferencias en un año a una cuenta de Amparo Gisbert, con el concepto «varios», por 38.400 € en total. Amparo tiene poderes en la cuenta del horno.', person: 'amparo', source: 'documento', tags: ['dinero'] },
    F5_FIN_ARRAS: { text: 'Bernat Climent cobró el 15 de enero 60.000 € de Supermercados Valdemar como arras por la compra del local del horno, firmadas «en nombre de la sociedad». Si la venta no se firma antes del 31 de marzo, tiene que devolver el doble.', person: 'bernat', source: 'documento', tags: ['dinero'] },
    F5_FIN_SEGURO: { text: 'Seguro de vida de Vicente (2009): 120.000 €, beneficiario Jordi. Jordi arrastra además un préstamo de 90.000 € de la tienda que cerró en 2024, con tres cuotas sin pagar.', person: 'jordi', source: 'documento', tags: ['dinero', 'seguro'] },
    F5_MAIL_GESTORIA: { text: 'Correo de Vicente a la gestoría (viernes 6, 18:02): «El lunes a primera hora quiero revisar todos los movimientos del último año. Hay transferencias que no entiendo. No comentéis nada a nadie de la familia».', person: 'vicente', source: 'documento', tags: ['correo', 'dinero'] },
    F5_MAIL_VALDEMAR: { text: 'Correo de Supermercados Valdemar a Vicente (jueves 5): «Según nos indica su socio, el señor Climent, la firma está prevista para el día 20». Respuesta de Vicente: «Nadie ha hablado conmigo. El local es mío y no se vende».', person: 'bernat', source: 'documento', tags: ['correo', 'dinero'] },
    F5_LPR_LIDIA: { text: 'Lectores de matrículas: el coche de Lidia entra en Alcoy a las 20:09 del sábado y no sale del municipio en toda la noche. El domingo a las 08:52 se lee en la avenida que baja al centro.', person: 'lidia', place: 'santarosa', source: 'registro', tags: ['vehiculo', 'ubicacion'] },

    /* ----- Registros con orden judicial (comunes) ----- */
    F5_REG_BATOY_BANCO: { text: 'Registro en Batoy: cartas del banco que reclaman las tres cuotas impagadas del préstamo de la tienda que Jordi cerró y un aviso de inclusión en un fichero de morosos.', person: 'jordi', place: 'batoy', source: 'registro', tags: ['dinero'] },
    F5_REG_ERN_DIGOXINA: { text: 'Registro en casa de Ernesto: en el armario de la cocina, la caja de digoxina del 2 de marzo, con los comprimidos que corresponden a una toma diaria desde ese día; no falta ninguno más. En el patio, su podadera grande de mango largo.', person: 'ernesto', place: 'ernesto', source: 'registro', tags: ['tox', 'medicacion'] },

    /* ----- Antenas (judicial) ----- */
    F5_ANT_JORDI: { text: 'Teléfono de Jordi: zona de C/ del Molí de 20:20 a 23:10; después, Batoy. Sesión de datos activa a las 23:54. Vuelve a la zona del Molí a las 06:25.', time: '23:10', end: '06:25', person: 'jordi', place: 'batoy', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F5_ANT_AMPARO: { text: 'Teléfono de Amparo: zona de C/ del Molí de 20:20 a 23:10; después, Batoy toda la noche. Sin llamadas.', time: '23:10', end: '08:00', person: 'amparo', place: 'batoy', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F5_ANT_LIDIA: { text: 'Teléfono de Lidia: llamada de 18 minutos a las 22:03 con un número a nombre de Raúl Ferrándiz. Desde las 22:35 y toda la noche, zona de Santa Rosa (Alcoy). A las 00:31, llamada entrante de Vicente no contestada.', time: '22:35', end: '08:00', person: 'lidia', place: 'santarosa', source: 'antena', tags: ['ubicacion', 'telefono', 'llamada'] },
    F5_ANT_BERNAT: { text: 'Teléfono de Bernat: zona de C/ del Molí hasta las 23:00. A las 22:58, llamada saliente de 4 minutos al director de expansión de Supermercados Valdemar. Desde las 23:15, Cocentaina.', time: '22:58', end: '23:15', person: 'bernat', place: 'cocentaina', source: 'antena', tags: ['ubicacion', 'telefono', 'llamada'] },
    F5_ANT_ERNESTO: { text: 'Teléfono de Ernesto: zona de C/ del Molí toda la noche. Sin llamadas.', time: '20:00', end: '08:00', person: 'ernesto', place: 'ernesto', source: 'antena', tags: ['ubicacion', 'telefono'] },
    F5_ANT_ROCIO: { text: 'Teléfono de Rocío: Zona Norte de Alcoy toda la noche, salvo de 21:33 a 21:49, cuando conecta en la zona de C/ del Molí.', time: '21:33', end: '21:49', person: 'rocio', place: 'callejon', source: 'antena', tags: ['ubicacion', 'telefono'] },

    /* ----- Declaraciones ----- */
    S5_JOR_CENA: { kind: 'statement', text: 'Jordi declara que en la cena discutió con su padre porque él quiere vender el local y su padre se negaba; su padre anunció la revisión de cuentas del lunes.', time: '20:45', end: '21:45', person: 'jordi', place: 'horno', source: 'declaración', tags: ['testigo', 'dinero'] },
    S5_JOR_PATIO: { kind: 'statement', text: 'Jordi declara que sirvió a su padre su herbero en el patio, que después fue con Ernesto al obrador a por la coca y que se fue con Amparo pasadas las once, tras conectar la alarma.', time: '22:20', end: '23:09', person: 'jordi', place: 'horno', source: 'declaración', tags: ['copa'] },
    S5_JOR_COPA: { kind: 'statement', text: 'Jordi declara que sirvió una sola copa a su padre y que, al volver del obrador, su padre tenía otra delante, llena.', time: '22:44', person: 'jordi', place: 'horno', source: 'declaración', tags: ['copa'] },
    S5_JOR_MENSAJE: { kind: 'statement', text: 'Jordi declara que no vio el mensaje de su padre hasta las 06:15 del domingo.', time: '06:15', person: 'jordi', place: 'batoy', source: 'declaración', tags: ['mensaje'] },
    S5_JOR_ADMITE: { kind: 'statement', text: 'Jordi admite que leyó el mensaje de su padre a las 23:54 y que decidió no ir.', time: '23:54', person: 'jordi', place: 'batoy', source: 'declaración', tags: ['mensaje'] },
    S5_AMP_CENA: { kind: 'statement', text: 'Amparo declara que en la cena Vicente anunció la revisión de cuentas y dijo que alguien de la casa le robaba.', time: '20:45', end: '21:45', person: 'amparo', place: 'horno', source: 'declaración', tags: ['testigo', 'dinero'] },
    S5_AMP_COCINA: { kind: 'statement', text: 'Amparo declara que hizo los cafés en la cocina de la vivienda entre las 22:05 y las 22:20.', time: '22:05', end: '22:20', person: 'amparo', place: 'horno', source: 'declaración', tags: ['coartada'] },
    S5_AMP_TERMO: { kind: 'statement', text: 'Amparo declara que no tocó el termo de la tisana.', person: 'amparo', source: 'declaración', tags: ['tox'] },
    S5_AMP_DESPACHO: { kind: 'statement', text: 'Amparo declara que estuvo sola en el despacho unos diez minutos y que luego volvió al patio.', time: '22:38', end: '22:47', person: 'amparo', place: 'horno', source: 'declaración', tags: ['coartada'] },
    S5_AMP_VUELTA: { kind: 'statement', text: 'Amparo declara que, al volver al patio a las 22:47, Vicente y Bernat estaban en la mesa y Vicente tenía otra copa de herbero.', time: '22:47', person: 'amparo', place: 'horno', source: 'testigo', tags: ['testigo', 'copa'] },
    S5_AMP_CUENTAS: { kind: 'statement', text: 'Amparo declara que en las cuentas del horno no hay nada raro.', person: 'amparo', source: 'declaración', tags: ['dinero'] },
    S5_AMP_MADRE: { kind: 'statement', text: 'Amparo declara que su madre toma digoxina y que ella le recoge la medicación una vez al mes, siempre en la misma farmacia.', person: 'amparo', source: 'declaración', tags: ['tox', 'medicacion'] },
    S5_LID_CALLE: { kind: 'statement', text: 'Lidia declara que salió a la calle a hablar por teléfono un buen rato, que luego subió a por su bolsa y que se fue sobre las 22:30.', time: '22:03', end: '22:27', person: 'lidia', place: 'horno', source: 'declaración', tags: ['coartada', 'llamada'] },
    S5_LID_VALENCIA: { kind: 'statement', text: 'Lidia declara que pasó la noche en su casa de Valencia y que volvió por la mañana tras la llamada de Jordi.', time: '00:00', end: '08:00', person: 'lidia', place: 'valencia', source: 'declaración', tags: ['coartada'] },
    S5_LID_DORMIDA: { kind: 'statement', text: 'Lidia declara que a las 00:31 estaba dormida con el móvil en silencio.', time: '00:31', person: 'lidia', source: 'declaración', tags: ['llamada'] },
    S5_LID_HOSPITAL: { kind: 'statement', text: 'Lidia declara que en el hospital tiene acceso a digoxina, pero que cada comprimido queda registrado.', person: 'lidia', source: 'declaración', tags: ['tox'] },
    S5_LID_VENTANA: { kind: 'statement', text: 'Lidia declara que hacia las 21:40, desde la ventana del comedor, vio a una mujer con un bolso grande cruzar el patio hacia el obrador; estaba oscuro y no la reconoció.', time: '21:40', person: 'lidia', place: 'horno', source: 'testigo', tags: ['testigo', 'acceso'] },
    S5_LID_RAUL: { kind: 'statement', text: 'Lidia admite que pasó la noche en Alcoy, en casa de su expareja, y que lo ocultó porque está casada.', time: '22:35', end: '08:00', person: 'lidia', place: 'santarosa', source: 'declaración', tags: ['coartada'] },
    S5_BER_NADA: { kind: 'statement', text: 'Bernat declara que con la cadena de supermercados solo hubo tanteos y que no hay nada firmado.', person: 'bernat', source: 'declaración', tags: ['dinero'] },
    S5_BER_PURO: { kind: 'statement', text: 'Bernat declara que a las 21:50 salió a su coche a por un puro y que se lo fumó en el patio con el café.', time: '21:50', end: '22:40', person: 'bernat', place: 'horno', source: 'declaración', tags: ['vehiculo'] },
    S5_BER_PATIO: { kind: 'statement', text: 'Bernat declara que entre las 22:30 y las 22:50 estuvo en la planta baja hasta que se fue.', time: '22:30', end: '22:50', person: 'bernat', place: 'horno', source: 'declaración', tags: ['coartada'] },
    S5_BER_COPA: { kind: 'statement', text: 'Bernat declara que no tocó la copa de Vicente: él bebía whisky y cada uno se servía lo suyo.', person: 'bernat', source: 'declaración', tags: ['copa'] },
    S5_BER_CLIENTE: { kind: 'statement', text: 'Bernat declara que la llamada de las 22:58 fue a un cliente.', time: '22:58', person: 'bernat', source: 'declaración', tags: ['llamada'] },
    S5_BER_ARRAS: { kind: 'statement', text: 'Bernat admite que cobró las arras de la cadena y que dio una fecha de firma sin el permiso de Vicente.', person: 'bernat', source: 'declaración', tags: ['dinero'] },
    S5_BER_LLAMADA: { kind: 'statement', text: 'Bernat admite que a las 22:58 llamó al director de expansión de Supermercados Valdemar.', time: '22:58', person: 'bernat', source: 'declaración', tags: ['llamada', 'dinero'] },
    S5_ERN_COCA: { kind: 'statement', text: 'Ernesto declara que a las 21:30 partió la coca en la cocina y que el termo ya estaba en la encimera, cerrado.', time: '21:30', person: 'ernesto', place: 'horno', source: 'testigo', tags: ['testigo'] },
    S5_ERN_BOTELLA: { kind: 'statement', text: 'Ernesto declara que hizo la foto del patio a las 22:12, que fumó tabaco de liar y que vio a Bernat con la botella en la mano, sirviendo.', time: '22:12', end: '22:30', person: 'ernesto', place: 'horno', source: 'testigo', tags: ['testigo', 'botella'] },
    S5_ERN_OBRADOR: { kind: 'statement', text: 'Ernesto declara que fue con Jordi al obrador a por la coca durante unos ocho minutos.', time: '22:36', end: '22:44', person: 'ernesto', place: 'horno', source: 'declaración', tags: ['coartada'] },
    S5_ERN_SANO: { kind: 'statement', text: 'Ernesto declara que no toma ninguna medicación.', person: 'ernesto', source: 'declaración', tags: ['medicacion'] },
    S5_ERN_PODA: { kind: 'statement', text: 'Ernesto declara que él cuida las adelfas, que las podó hace un mes y que nadie más las toca.', person: 'ernesto', source: 'declaración', tags: ['tox'] },
    S5_ERN_ADMITE: { kind: 'statement', text: 'Ernesto admite que toma digoxina desde hace dos años y que lo ocultaba para que Jordi no le apartara del obrador; el ticket de la papelera es suyo.', person: 'ernesto', source: 'declaración', tags: ['medicacion', 'tox'] },
    S5_ROC_TERMO: { kind: 'statement', text: 'Rocío declara que preparó el pastillero a las 19:30 y la tisana a las 19:45, que dejó el termo en la encimera de la cocina y que se fue a las 19:55.', time: '19:30', end: '19:55', person: 'rocio', place: 'horno', source: 'declaración', tags: ['tox'] },
    S5_ROC_NOVOLVIO: { kind: 'statement', text: 'Rocío declara que no volvió a la casa esa noche.', time: '19:56', end: '08:00', person: 'rocio', place: 'zonanorte', source: 'declaración', tags: ['coartada'] },
    S5_ROC_PASTILLERO: { kind: 'statement', text: 'Rocío declara que preparó el pastillero como siempre y que no se equivoca.', person: 'rocio', source: 'declaración', tags: ['pastillas'] },
    S5_ROC_TISANA: { kind: 'statement', text: 'Rocío declara que la tisana es manzanilla con anís y miel, y que Vicente se la bebía entera en la cama cada noche.', person: 'rocio', source: 'declaración', tags: ['tox'] },
    S5_ROC_VOLVIO: { kind: 'statement', text: 'Rocío admite que volvió por la puerta del patio a por su sobre semanal y un táper de comida, y dice que no subió a la vivienda.', time: '21:38', end: '21:44', person: 'rocio', place: 'horno', source: 'declaración', tags: ['acceso'] }
  },

  /* Contradicciones comunes a las dos versiones */
  conflicts: [
    { id: 'C01', a: 'S5_JOR_MENSAJE', b: 'F5_TEL_MSG', type: 'Hecho distinto', severity: 'media', desc: 'Jordi dice que vio el mensaje de su padre a las 06:15; el teléfono de Vicente lo marca como leído a las 23:54.' },
    { id: 'C02', a: 'S5_LID_VALENCIA', b: 'F5_LPR_LIDIA', type: 'Lugar distinto', severity: 'media', desc: 'Lidia dice que durmió en Valencia; su coche no salió de Alcoy en toda la noche.' },
    { id: 'C03', a: 'S5_ERN_SANO', b: 'F5_FARM_ERNESTO', type: 'Hecho distinto', severity: 'media', desc: 'Ernesto dice que no toma medicación; la receta electrónica le dispensa digoxina cada mes.' },
    { id: 'C04', a: 'S5_ROC_NOVOLVIO', b: 'F5_AL_PATIO', type: 'Hecho distinto', severity: 'media', desc: 'Rocío dice que no volvió; la puerta del patio se abre a las 21:38 y hay movimiento en el obrador.' },
    { id: 'C05', a: 'S5_BER_NADA', b: 'F5_FIN_ARRAS', type: 'Hecho distinto', severity: 'alta', desc: 'Bernat dice que no hay nada firmado con la cadena; cobró 60.000 € de arras en enero.' },
    { id: 'C06', a: 'S5_AMP_CUENTAS', b: 'F5_FIN_TRANSF', type: 'Hecho omitido', severity: 'alta', desc: 'Amparo dice que en las cuentas no hay nada raro; hay 14 transferencias a su cuenta por 38.400 €.' },
    { id: 'C07', a: 'S5_ROC_NOVOLVIO', b: 'S5_LID_VENTANA', type: 'Hecho distinto', severity: 'baja', desc: 'Rocío dice que no volvió a la casa; Lidia vio a una mujer con un bolso grande cruzar el patio hacia el obrador hacia las 21:40.' }
  ],

  /* Rueda de reconocimiento (común a las dos versiones: Rocío volvió en ambas) */
  lineups: [
    { id: 'L1', witness: 'lidia', saw: 'hacia las 21:40, desde la ventana del comedor, de noche y desde arriba, a una mujer con un bolso grande que cruzaba el patio hacia el obrador', target: 'rocio', quality: 0.55, requires: 'S5_LID_VENTANA' }
  ],

  verdictOptions: {
    motives: [
      { id: 'm5_desfalco', label: 'Evitar que la revisión de cuentas del lunes destapara un desfalco' },
      { id: 'm5_venta', label: 'Salvar la venta del local a la cadena de supermercados' },
      { id: 'm5_herencia', label: 'Cobrar la herencia y el seguro de vida' },
      { id: 'm5_rencor', label: 'Rencor o miedo a perder el trabajo' },
      { id: 'm5_desc', label: 'No determinable con lo disponible' }
    ],
    methods: [
      { id: 'me5_termo', label: 'Digoxina disuelta en el termo de tisana' },
      { id: 'me5_copa', label: 'Preparado de adelfa en la copa de herbero' },
      { id: 'me5_pastillero', label: 'Comprimidos cambiados en el pastillero' },
      { id: 'me5_coca', label: 'Tóxico en la coca del postre' },
      { id: 'me5_natural', label: 'Muerte natural o error de medicación, sin intervención de nadie' },
      { id: 'me5_desc', label: 'No determinable con lo disponible' }
    ],
    windowLabel: 'Momento en que se le dio el tóxico',
    windows: [
      { id: 'w5_cena', label: 'Durante la cena (20:45–21:45)' },
      { id: 'w5_cocina', label: 'Entre las 22:05 y las 22:20' },
      { id: 'w5_patio', label: 'Entre las 22:35 y las 22:50' },
      { id: 'w5_noche', label: 'Después de las 23:10' },
      { id: 'w5_nd', label: 'No determinable con lo disponible' }
    ]
  },

  evaluation: {
    subtle: { ids: ['F5_TICKET', 'F5_CENICERO', 'F5_ADELFA_LUPA', 'F5_CARPETA'], label: 'ticket de la papelera, cenicero, cortes de las adelfas y carpeta de préstamos' },
    movement: { ids: ['D5_ALARMA', 'D5_CAM', 'D5_LPR'], label: 'alarma por zonas, cámara de la tienda y lectores de matrículas' },
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
    /* ---------- Versión 1: la nuera, digoxina en el termo ---------- */
    amparo: {
      facts: {
        F5_TOX: { text: 'Toxicología confirmatoria (cromatografía): digoxina en sangre en concentración claramente tóxica. No hay oleandrina ni otras sustancias vegetales. Por la evolución, la ingesta fue varias horas antes de la muerte.', person: 'vicente', source: 'laboratorio', tags: ['tox', 'muerte'] },
        F5_TERMO_TOX: { text: 'Poso del termo: manzanilla, anís, miel y digoxina.', place: 'horno', source: 'laboratorio', tags: ['tox'] },
        F5_TERMO_HUELLAS: { prints: [{ at: 'Tapón', match: 'rocio' }, { at: 'Cuerpo del termo', match: 'vicente' }, { at: 'Rosca del tapón', match: 'amparo' }], text: 'Huellas en el termo: de Rocío en el tapón, de Vicente en el cuerpo y de Amparo Gisbert en la rosca del tapón, la parte que solo se toca al abrirlo.', person: 'amparo', source: 'laboratorio', tags: ['tox', 'huella'] },
        F5_VOMITO_TOX: { text: 'Vómito: manzanilla, licor anisado, bizcocho y digoxina.', person: 'vicente', source: 'laboratorio', tags: ['tox'] },
        F5_COPA_TOX: { text: 'Resto seco de la copa de Vicente: herbero (anís y hierbas). Ningún tóxico.', source: 'laboratorio', tags: ['copa', 'tox'] },
        F5_COPA_HUELLAS: { prints: [{ at: 'Pie de la copa', match: 'vicente' }, { at: 'Cáliz', match: 'jordi' }], text: 'Huellas en la copa de Vicente: suyas en el pie y de Jordi en el cáliz.', source: 'laboratorio', tags: ['copa', 'huella'] },
        F5_ADELFA_LUPA: { text: 'Lupa: los cortes de las ramas son antiguos, oscuros y cicatrizados: una poda de hace semanas. No hay cortes recientes.', place: 'horno', source: 'escena', tags: ['tox'] },
        F5_CENICERO: { text: 'Cenicero del patio: la colilla de un puro y varias colillas de tabaco de liar.', place: 'horno', source: 'escena', tags: ['testigo'] },
        F5_CARPETA: { text: 'La carpeta de «préstamos familiares» está vacía. No hay ningún documento que autorice préstamos a nadie.', place: 'horno', source: 'documento', tags: ['dinero'] },
        F5_FARM_AMPARO: { text: 'Receta electrónica de Encarna Mas, madre de Amparo: digoxina 0,25 mg. Amparo la recoge el 24 de febrero en la Farmacia Santa Rosa y otra vez el 3 de marzo en la Farmacia de Batoy, cuando a su madre le quedaban tres semanas de tratamiento.', person: 'amparo', source: 'registro', tags: ['tox', 'medicacion'] },
        S5_AMP_COCINA: { kind: 'statement', text: 'Amparo declara que hizo los cafés en la cocina entre las 22:05 y las 22:20 y que Lidia estuvo con ella todo el rato.', time: '22:05', end: '22:20', person: 'amparo', place: 'horno', source: 'declaración', tags: ['coartada'] },
        S5_BER_PATIO: { kind: 'statement', text: 'Bernat declara que entre las 22:30 y las 22:50 se quedó en el patio fumando un puro; Jordi y Ernesto fueron al obrador, Vicente subió al baño y él se quedó solo unos minutos.', time: '22:30', end: '22:50', person: 'bernat', place: 'horno', source: 'declaración', tags: ['coartada'] },
        S5_AMP_MOVIO: { kind: 'statement', text: 'Amparo admite que tocó el termo mientras hacía los cafés: dice que solo lo movió para hacer sitio y que no lo abrió.', time: '22:06', end: '22:19', person: 'amparo', place: 'horno', source: 'declaración', tags: ['tox'] },
        S5_AMP_CAJA: { kind: 'statement', text: 'Amparo admite que recogió una segunda caja de digoxina el 3 de marzo; dice que la anterior se cayó al fregadero.', person: 'amparo', source: 'declaración', tags: ['tox', 'medicacion'] },
        S5_AMP_PROVEEDOR: { kind: 'statement', text: 'Amparo declara que las transferencias a su cuenta eran pagos a proveedores que pasaban por ella.', person: 'amparo', source: 'declaración', tags: ['dinero'] },
        F5_REG_BATOY_CAJA: { text: 'Registro en Batoy: en el contenedor de papel del garaje, una caja de digoxina 0,25 mg vacía, con la etiqueta de dispensación de la Farmacia de Batoy del 3 de marzo y sin ningún blíster dentro. El tique de esa compra está en la guantera del coche de Amparo.', person: 'amparo', place: 'batoy', source: 'registro', tags: ['tox', 'medicacion'] },
        F5_REG_BATOY_LIBRETA: { text: 'Registro en Batoy: en un cajón del despacho de casa, una libreta con letra de Amparo con fechas e importes que coinciden con las 14 transferencias del horno, sin ningún concepto; en la última página, la suma: 38.400 €.', person: 'amparo', place: 'batoy', source: 'registro', tags: ['dinero'] },
        F5_REG_BER_ARRAS: { text: 'Registro en casa de Bernat: en el despacho, el contrato de arras con Supermercados Valdemar y un borrador de escritura con la fecha del día 20; en la guantera del coche, una caja de puros empezada.', person: 'bernat', place: 'cocentaina', source: 'registro', tags: ['dinero'] }
      },
      planted: [],
      searches: {
        amparo: { place: 'el domicilio de Jordi y Amparo en Batoy', facts: ['F5_REG_BATOY_CAJA', 'F5_REG_BATOY_LIBRETA', 'F5_REG_BATOY_BANCO'] },
        jordi: { place: 'el domicilio de Jordi y Amparo en Batoy', facts: ['F5_REG_BATOY_CAJA', 'F5_REG_BATOY_LIBRETA', 'F5_REG_BATOY_BANCO'] },
        bernat: { place: 'el domicilio de Bernat Climent en Cocentaina', facts: ['F5_REG_BER_ARRAS'] },
        ernesto: { place: 'la casa de Ernesto Moltó', facts: ['F5_REG_ERN_DIGOXINA'] }
      },
      answers: {
        amparo: {
          cocina: { a: 'Subí a la cocina a hacer los cafés. Lidia subió conmigo y estuvimos charlando todo el rato. Los bajamos juntas a las diez y veinte.', type: 'mentira' },
          termo: { type: 'mentira' },
          madre: { type: 'mentira' }
        },
        bernat: {
          patio: { a: 'En el patio, fumándome el puro. Jordi y Ernesto fueron al obrador y Vicente subió al baño. Me quedé solo un rato. Cuando bajó, se sirvió otra copa. A las once menos diez me fui.', type: 'verdad' },
          coche: { type: 'verdad' },
          copa: { type: 'verdad' }
        }
      },
      confront: {
        amparo: {
          F5_CAM_LIDIA: { a: 'Bueno, quizá Lidia salió un momento a llamar. Yo estaba con los cafés, no me fijé en cuánto tardaba.', reveals: [] },
          S5_LID_CALLE: { a: 'Se confundirá. Subió conmigo al principio, luego no sé.', reveals: [] },
          F5_TERMO_HUELLAS: { a: 'Lo moví para hacer sitio en la encimera, nada más. Ni lo abrí.', reveals: ['S5_AMP_MOVIO'] },
          F5_FARM_AMPARO: { a: 'La caja de mi madre se cayó al fregadero y se estropeó. Pedí otra. ¿Ahora eso es un delito?', reveals: ['S5_AMP_CAJA'] },
          F5_FIN_TRANSF: { a: 'Eran pagos a proveedores que pasaban por mi cuenta. Un lío contable. Lo aclararé con la gestoría.', reveals: ['S5_AMP_PROVEEDOR'] },
          F5_CARPETA: { a: 'Vicente lo tenía todo desordenado. Los papeles estarán en otro sitio.', reveals: [] },
          F5_MAIL_GESTORIA: { a: 'La gestoría lo habría aclarado todo. No había nada que esconder.', reveals: [] },
          F5_TEL_FOTO: { a: 'Yo estaba arriba con los cafés. Por eso no salgo.', reveals: [] },
          F5_TOX: { a: 'Mi madre no ha pisado nunca esta casa.', reveals: [] }
        },
        bernat: {
          F5_CAM_PASILLO: { a: 'Ya le dije que me quedé en el patio. Ahí lo tiene.', reveals: [] },
          F5_COPA_HUELLAS: { a: '¿Lo ve? Ni una huella mía en esa copa.', reveals: [] },
          F5_CENICERO: { a: 'Ahí tiene la colilla del puro.', reveals: [] }
        },
        ernesto: {
          F5_ADELFA_LUPA: { a: 'Esos cortes son míos, de la poda de febrero.', reveals: [] }
        },
        lidia: {
          S5_AMP_COCINA: { a: '¿Conmigo? No. Yo estaba en la calle, hablando por teléfono. No subí a la cocina hasta que fui a por la bolsa.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'A1', a: 'S5_AMP_COCINA', b: 'F5_CAM_LIDIA', type: 'Lugar distinto', severity: 'alta', desc: 'Amparo dice que Lidia estuvo con ella en la cocina de 22:05 a 22:20; la cámara muestra a Lidia en la acera, al teléfono, de 22:03 a 22:21.' },
        { id: 'A2', a: 'S5_AMP_TERMO', b: 'F5_TERMO_HUELLAS', type: 'Hecho distinto', severity: 'alta', desc: 'Amparo dice que no tocó el termo; sus huellas están en la rosca del tapón.' },
        { id: 'A3', a: 'S5_AMP_MADRE', b: 'F5_FARM_AMPARO', type: 'Hecho distinto', severity: 'alta', desc: 'Amparo dice que recoge la digoxina de su madre una vez al mes en la misma farmacia; el 3 de marzo retiró otra caja en una farmacia distinta.' },
        { id: 'A4', a: 'S5_AMP_COCINA', b: 'S5_LID_CALLE', type: 'Hecho distinto', severity: 'media', desc: 'Amparo dice que Lidia estuvo con ella en la cocina; Lidia dice que estaba en la calle hablando por teléfono.' }
      ],
      truth: {
        culprit: 'amparo',
        motive: 'm5_desfalco',
        method: 'me5_termo',
        window: 'w5_cocina',
        accomplices: [],
        partialMethods: {
          me5_copa: 'Viste que el tóxico llegó en una bebida, pero no en cuál ni qué sustancia era.',
          me5_pastillero: 'Identificaste un fármaco del corazón, pero no llegó por el pastillero.'
        },
        decisive: ['F5_TOX', 'F5_TERMO_TOX', 'F5_TERMO_HUELLAS', 'F5_AL_COCINA', 'F5_CAM_LIDIA', 'F5_TEL_FOTO', 'F5_FARM_AMPARO', 'F5_FIN_TRANSF', 'F5_CARPETA', 'F5_MAIL_GESTORIA', 'F5_COPA_TOX', 'F5_HC_VICENTE', 'S5_LID_CALLE', 'F5_AL_ESCALERA', 'S5_AMP_MOVIO'],
        weak: ['F5_TICKET', 'F5_FARM_ERNESTO', 'F5_TEL_MSG', 'F5_FIN_SEGURO', 'F5_FIN_ARRAS', 'F5_CAM_BERNAT_COCHE', 'F5_AL_PATIO', 'F5_PASTILLERO_TOX', 'F5_LPR_LIDIA', 'F5_ADELFA', 'F5_CRIBADO'],
        keyConflicts: ['A1', 'A2', 'A3', 'C06'],
        narrative: [
          'Amparo Gisbert llevaba las cuentas del horno y tenía poderes en la cuenta. En un año se transfirió 38.400 € con el concepto «varios». El viernes Vicente escribió a la gestoría que el lunes quería revisar todos los movimientos, y en la cena del sábado soltó delante de todos que alguien de la casa le robaba. La carpeta de «préstamos familiares» estaba vacía: nunca hubo autorización.',
          'Amparo recogía la digoxina de su madre. El 3 de marzo retiró una caja de más en otra farmacia. Después de cenar, cuando los demás bajaron al patio, subió a hacer los cafés: de 22:06 a 22:19 fue la única persona en la planta de arriba. El termo que Rocío había dejado preparado seguía en la encimera; lo abrió y disolvió los comprimidos en la tisana. Sus huellas quedaron en la rosca del tapón.',
          'Para cubrirse dijo que Lidia había estado con ella en la cocina, pero Lidia pasó esos minutos en la acera, hablando por teléfono con su expareja, como muestra la cámara. A las 23:01 Vicente subió con el termo y se lo bebió entero, como cada noche. A las 23:52 escribió a Jordi que estaba vomitando. Murió de una arritmia entre las 02:00 y las 04:00.',
          'El análisis rápido dio digoxina y apuntó a quien la tenía a mano: Ernesto la toma desde 2024, lo ocultaba para que no le apartaran del obrador y su ticket acabó en la papelera de la cocina. Rocío mintió sobre su vuelta de las 21:38 por miedo a perder el trabajo y se equivocó con el pastillero. Lidia ocultó con quién pasó la noche, Jordi leyó el mensaje de su padre y no subió, y Bernat ocultó las arras de la cadena. Nada de eso mató a Vicente: la copa del patio estaba limpia y el veneno iba en el termo.'
        ]
      },
      trial: {
        amparo: [
          { id: 'O1', text: 'Mi clienta no tocó el termo. Lo preparó la cuidadora, que además volvió a escondidas esa noche.', accept: ['F5_TERMO_HUELLAS', 'S5_AMP_MOVIO', 'F5_AL_ESCALERA'] },
          { id: 'O2', text: 'La digoxina la tenía cualquiera: el panadero la toma y su ticket estaba en la papelera.', accept: ['F5_FARM_AMPARO', 'F5_AL_COCINA', 'F5_CAM_LIDIA', 'F5_TEL_FOTO', 'S5_AMP_CAJA'] },
          { id: 'O3', text: 'Las transferencias eran pagos autorizados. No hay móvil.', accept: ['F5_CARPETA', 'F5_MAIL_GESTORIA', 'F5_FIN_TRANSF'] }
        ],
        generic: [
          { id: 'O1', text: 'La acusación no explica cómo llegó la digoxina al termo, que pasó horas en una cocina abierta a todos.', accept: [] },
          { id: 'O2', text: 'Nadie vio a la persona señalada junto al termo.', accept: [] },
          { id: 'O3', text: 'La acusación no explica por qué alguien quería ver muerto a Vicente antes del lunes.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['lidia', 'rocio'],
        spatialBonus: ['F5_AL_COCINA', 'F5_CAM_LIDIA'],
        temporalConflicts: ['A1'],
        lateral: [
          { type: 'fact', id: 'S5_LID_CALLE', pts: 25, yes: 'Preguntaste a Lidia dónde estaba mientras se hacían los cafés.', no: 'No comprobaste con Lidia la coartada que Amparo le atribuía.' },
          { type: 'conflict', id: 'A1', pts: 30, yes: 'Viste que Amparo estuvo sola en la cocina con el termo.', no: 'No contrastaste la cocina con la cámara de la acera.' },
          { type: 'conflict', id: 'A3', pts: 25 },
          { type: 'chosen', id: 'F5_TERMO_HUELLAS', pts: 20 }
        ],
        usefulLab: ['P01:toxicologia', 'P02:toxicologia', 'P02:huellas', 'P01:autopsia', 'B02:toxicologia']
      }
    },

    /* ---------- Versión 2: el socio, adelfa en la copa ---------- */
    bernat: {
      facts: {
        F5_TOX: { text: 'Toxicología confirmatoria (cromatografía): oleandrina, la sustancia tóxica de la adelfa, en sangre y en el estómago, en concentración tóxica. No hay digoxina: el positivo del análisis rápido fue una reacción cruzada con la oleandrina.', person: 'vicente', source: 'laboratorio', tags: ['tox', 'muerte'] },
        F5_TERMO_TOX: { text: 'Poso del termo: manzanilla, anís y miel. Ningún fármaco ni sustancia tóxica.', place: 'horno', source: 'laboratorio', tags: ['tox'] },
        F5_TERMO_HUELLAS: { prints: [{ at: 'Tapón', match: 'rocio' }, { at: 'Cuerpo del termo', match: 'vicente' }, { at: 'Rosca del tapón', q: 'no_apta' }], text: 'Huellas en el termo: de Rocío en el tapón y de Vicente en el cuerpo. En la rosca, una parcial emborronada, no apta para cotejo.', source: 'laboratorio', tags: ['tox', 'huella'] },
        F5_VOMITO_TOX: { text: 'Vómito: manzanilla, licor anisado, bizcocho, oleandrina y fragmentos microscópicos de hoja vegetal.', person: 'vicente', source: 'laboratorio', tags: ['tox'] },
        F5_COPA_TOX: { text: 'Resto seco de la copa de Vicente: herbero con oleandrina y fragmentos microscópicos de hoja de adelfa.', source: 'laboratorio', tags: ['copa', 'tox'] },
        F5_COPA_HUELLAS: { prints: [{ at: 'Pie de la copa', match: 'vicente' }, { at: 'Cáliz', match: 'jordi' }, { at: 'Borde del cáliz', match: 'bernat' }], text: 'Huellas en la copa de Vicente: suyas en el pie, de Jordi en el cáliz y de Bernat Climent en el borde.', person: 'bernat', source: 'laboratorio', tags: ['copa', 'huella'] },
        F5_ADELFA_LUPA: { text: 'Lupa: además de la poda antigua, dos ramas tienen cortes limpios de tijera, de hace pocos días, y les faltan las hojas jóvenes de la punta.', place: 'horno', source: 'escena', tags: ['tox'] },
        F5_CENICERO: { text: 'Cenicero del patio: varias colillas de tabaco de liar. Ningún resto de puro.', place: 'horno', source: 'escena', tags: ['testigo'] },
        F5_CARPETA: { text: 'La carpeta de «préstamos familiares» contiene un documento firmado por Vicente en 2025 que autoriza préstamos a Amparo para la residencia de su madre, hasta 40.000 €, a devolver cuando se venda un piso de la familia Gisbert.', person: 'amparo', place: 'horno', source: 'documento', tags: ['dinero'] },
        F5_FARM_AMPARO: { text: 'Receta electrónica de Encarna Mas, madre de Amparo: digoxina 0,25 mg. Amparo la recoge una vez al mes en la Farmacia Santa Rosa; la última, el 24 de febrero. Sin dispensaciones anticipadas.', person: 'amparo', source: 'registro', tags: ['tox', 'medicacion'] },
        S5_AMP_COCINA: { kind: 'statement', text: 'Amparo declara que hizo los cafés sola en la cocina entre las 22:05 y las 22:20.', time: '22:05', end: '22:20', person: 'amparo', place: 'horno', source: 'declaración', tags: ['coartada'] },
        S5_AMP_VUELTA: { kind: 'statement', text: 'Amparo declara que, al volver al patio a las 22:47, Vicente y Bernat estaban en la mesa, Vicente tenía otra copa de herbero y Bernat le dijo: «Te he puesto la penúltima».', time: '22:47', person: 'amparo', place: 'horno', source: 'testigo', tags: ['testigo', 'copa'] },
        S5_BER_PATIO: { kind: 'statement', text: 'Bernat declara que entre las 22:35 y las 22:45 estuvo en el despacho con Amparo mirando facturas de harina.', time: '22:35', end: '22:45', person: 'bernat', place: 'horno', source: 'declaración', tags: ['coartada'] },
        S5_BER_CORRIGE: { kind: 'statement', text: 'Bernat rectifica: dice que se confundió de hora y que en realidad estuvo en el patio.', person: 'bernat', place: 'horno', source: 'declaración', tags: ['coartada'] },
        S5_BER_ACERCO: { kind: 'statement', text: 'Bernat admite que tocó la copa de Vicente: dice que solo se la acercó cuando Vicente volvió del baño.', time: '22:42', person: 'bernat', place: 'horno', source: 'declaración', tags: ['copa'] },
        S5_BER_ABOGADO: { kind: 'statement', text: 'Bernat se niega a seguir declarando sin abogado al conocer el análisis de la copa.', person: 'bernat', source: 'declaración', tags: [] },
        S5_ERN_CORTES: { kind: 'statement', text: 'Ernesto declara que los cortes recientes de las adelfas no son suyos: él podó por abajo hace un mes.', person: 'ernesto', source: 'declaración', tags: ['tox'] },
        S5_AMP_PRESTAMOS: { kind: 'statement', text: 'Amparo admite que las transferencias eran préstamos de Vicente para la residencia de su madre y que lo ocultó por vergüenza; dice que hay un documento firmado en el despacho.', person: 'amparo', source: 'declaración', tags: ['dinero'] },
        F5_REG_BATOY_CAJA: { text: 'Registro en Batoy: en la casa no hay ninguna caja de digoxina. En el despacho, las facturas mensuales de la residencia de Encarna Mas desde 2025, que suman algo más de 38.000 €.', person: 'amparo', place: 'batoy', source: 'registro', tags: ['tox', 'dinero'] },
        F5_REG_BATOY_LIBRETA: { text: 'Registro en Batoy: en un cajón del despacho de casa, una libreta con letra de Amparo titulada «Préstamo de Vicente · residencia», con las 14 transferencias y la cuenta de lo que queda por devolver.', person: 'amparo', place: 'batoy', source: 'registro', tags: ['dinero'] },
        F5_REG_BER_FRASCO: { text: 'Registro en casa de Bernat: en el maletero de su coche, un frasco pequeño de cristal enjuagado, con un poso verdoso en el fondo. El laboratorio identifica oleandrina en el poso.', person: 'bernat', place: 'cocentaina', source: 'registro', tags: ['tox'] },
        F5_REG_BER_TIJERAS: { text: 'Registro en casa de Bernat: en el garaje, unas tijeras de podar finas con restos de savia seca en las hojas. En la casa y en el coche no hay puros, cortapuros ni ceniceros.', person: 'bernat', place: 'cocentaina', source: 'registro', tags: ['tox'] }
      },
      planted: [],
      searches: {
        bernat: { place: 'el domicilio de Bernat Climent en Cocentaina', facts: ['F5_REG_BER_FRASCO', 'F5_REG_BER_TIJERAS'] },
        amparo: { place: 'el domicilio de Jordi y Amparo en Batoy', facts: ['F5_REG_BATOY_CAJA', 'F5_REG_BATOY_LIBRETA', 'F5_REG_BATOY_BANCO'] },
        jordi: { place: 'el domicilio de Jordi y Amparo en Batoy', facts: ['F5_REG_BATOY_CAJA', 'F5_REG_BATOY_LIBRETA', 'F5_REG_BATOY_BANCO'] },
        ernesto: { place: 'la casa de Ernesto Moltó', facts: ['F5_REG_ERN_DIGOXINA'] }
      },
      answers: {
        amparo: {
          cocina: { a: 'Subí sola a la cocina a hacer los cafés. Tardé un poco porque la cafetera es pequeña. Los bajé al patio a las diez y veinte.', type: 'verdad' },
          termo: { type: 'verdad' },
          madre: { type: 'verdad' },
          vuelta: { a: 'Vicente y Bernat estaban solos en la mesa. Vicente tenía otra copa llena y Bernat le dijo: «Te he puesto la penúltima». Vicente se la bebió de un trago. Al poco llegaron Jordi y Ernesto.' }
        },
        bernat: {
          patio: { a: 'Fui al despacho con Amparo a ver unas facturas de harina. Volví al patio cuando bajó Vicente y a las once menos diez me fui.', type: 'mentira' },
          coche: { type: 'mentira' },
          copa: { type: 'mentira' }
        }
      },
      confront: {
        amparo: {
          F5_CAM_LIDIA: { a: 'Sí, Lidia estaba fuera, al teléfono. Ya le he dicho que hice los cafés sola.', reveals: [] },
          F5_FARM_AMPARO: { a: 'Una caja al mes, como siempre. Lo puede ver usted mismo.', reveals: [] },
          F5_FIN_TRANSF: { a: '(Baja la mirada.) Eran préstamos. Vicente me los dejaba para pagar la residencia de mi madre. Me daba vergüenza que lo supiera Jordi. Está todo firmado: hay un papel en la carpeta del despacho.', reveals: ['S5_AMP_PRESTAMOS'] },
          F5_CARPETA: { a: 'Ahí lo tiene. Firmado por él.', reveals: ['S5_AMP_PRESTAMOS'] },
          F5_MAIL_GESTORIA: { a: 'Se le olvidaba que me había prestado ese dinero. Últimamente se le olvidaban muchas cosas.', reveals: [] },
          S5_BER_PATIO: { a: '¿Conmigo? En el despacho estuve sola. Bernat no bajó.', reveals: [] }
        },
        bernat: {
          F5_CAM_PASILLO: { a: '(Silencio.) Me habré confundido de hora. Estuve en el patio.', reveals: ['S5_BER_CORRIGE'] },
          S5_AMP_DESPACHO: { a: 'Estará confundida. Entré un momento, nada más.', reveals: [] },
          F5_COPA_HUELLAS: { a: 'Le acerqué la copa cuando volvió del baño. Por educación. Nada más.', reveals: ['S5_BER_ACERCO'] },
          F5_CENICERO: { a: 'Me lo fumaría en la calle, yo qué sé.', reveals: [] },
          F5_ADELFA_LUPA: { a: '¿Adelfas? Pregúntele a Ernesto: él es el del jardín.', reveals: [] },
          F5_COPA_TOX: { a: '(Se recuesta en la silla.) No voy a decir nada más sin mi abogado.', reveals: ['S5_BER_ABOGADO'] },
          S5_AMP_VUELTA: { a: 'Es una forma de hablar. Se sirvió él.', reveals: [] }
        },
        ernesto: {
          F5_ADELFA_LUPA: { a: 'Esos cortes no son míos. Yo podé por abajo hace un mes. Eso es de estos días, y con tijera fina.', reveals: ['S5_ERN_CORTES'] }
        },
        lidia: {
          S5_AMP_COCINA: { a: 'Es verdad, ella subió sola. Yo estaba en la calle.', reveals: [] }
        }
      },
      conflicts: [
        { id: 'B1', a: 'S5_BER_PATIO', b: 'F5_CAM_PASILLO', type: 'Lugar distinto', severity: 'alta', desc: 'Bernat dice que estuvo en el despacho con Amparo; la cámara del pasillo muestra a Amparo entrando sola y a nadie más cruzando el pasillo entre las 22:30 y las 22:50.' },
        { id: 'B3', a: 'S5_BER_COPA', b: 'F5_COPA_HUELLAS', type: 'Hecho distinto', severity: 'alta', desc: 'Bernat dice que no tocó la copa de Vicente; sus huellas están en el borde.' },
        { id: 'B4', a: 'S5_BER_PURO', b: 'F5_CENICERO', type: 'Hecho distinto', severity: 'media', desc: 'Bernat dice que salió a por un puro y se lo fumó en el patio; en el cenicero no hay ningún resto de puro.' },
        { id: 'B5', a: 'S5_ERN_PODA', b: 'F5_ADELFA_LUPA', type: 'Hecho distinto', severity: 'media', desc: 'Ernesto dice que podó hace un mes y que nadie toca las adelfas; hay cortes de tijera de hace pocos días.' }
      ],
      truth: {
        culprit: 'bernat',
        motive: 'm5_venta',
        method: 'me5_copa',
        window: 'w5_patio',
        accomplices: [],
        partialMethods: {
          me5_termo: 'Viste que el tóxico llegó en una bebida, pero no en cuál ni qué sustancia era.'
        },
        decisive: ['F5_TOX', 'F5_COPA_TOX', 'F5_COPA_HUELLAS', 'F5_CAM_PASILLO', 'F5_AL_ESCALERA', 'F5_CAM_LIDIA_SALE', 'F5_CENICERO', 'F5_CAM_BERNAT_COCHE', 'F5_ADELFA_LUPA', 'F5_TEL_MIERCOLES', 'F5_FIN_ARRAS', 'F5_MAIL_VALDEMAR', 'F5_TERMO_TOX', 'S5_AMP_VUELTA', 'F5_ANT_BERNAT', 'F5_AL_BAJA'],
        weak: ['F5_TICKET', 'F5_FARM_ERNESTO', 'F5_CRIBADO', 'F5_TEL_MSG', 'F5_FIN_TRANSF', 'F5_FIN_SEGURO', 'F5_BOTELLA_HUELLAS', 'F5_AL_PATIO', 'F5_AL_COCINA', 'F5_PASTILLERO_TOX'],
        keyConflicts: ['B1', 'B3', 'B4', 'B5'],
        narrative: [
          'Bernat Climent había cobrado en enero 60.000 € de arras de Supermercados Valdemar por el local del horno, sin permiso de Vicente. Si la venta no se firmaba antes del 31 de marzo, tenía que devolver el doble. Vicente se enteró por un correo de la cadena y respondió que el local no se vendía. Jordi, el heredero, sí quería vender.',
          'El miércoles Bernat entró por la puerta de atrás con la excusa de unas facturas y cortó las hojas jóvenes de dos ramas de las adelfas. El sábado llevaba en el coche un preparado hecho con ellas: a las 21:50 salió a buscarlo y volvió con la mano en el bolsillo. Dijo que había ido a por un puro, pero en el cenicero no hay ningún resto de puro.',
          'Entre las 22:37 y las 22:42 se quedó solo en el patio: Jordi y Ernesto estaban en el obrador, Amparo en el despacho, Lidia se había ido a las 22:27 y Vicente había subido al baño. Bernat le rellenó la copa de herbero y echó el preparado; sus huellas quedaron en el borde. «Te he puesto la penúltima», le dijo cuando volvió, y Vicente se la bebió. A las 22:58, ya en el coche, llamó al director de expansión de la cadena.',
          'La oleandrina de la adelfa da positivo en los análisis rápidos de digoxina, y eso hizo sospechar de quien tomaba ese fármaco: Ernesto, que lo ocultaba. Para tapar su rato a solas en el patio, Bernat dijo que había estado con Amparo en el despacho, y la cámara del pasillo lo desmiente. Amparo ocultó por vergüenza los préstamos de Vicente para la residencia de su madre, que estaban firmados. Rocío ocultó su vuelta a por el sobre, Lidia su noche en Alcoy y Jordi que leyó el mensaje de las 23:52. El termo estaba limpio.'
        ]
      },
      trial: {
        bernat: [
          { id: 'O1', text: 'Mi cliente estaba en el despacho con la señora Gisbert mientras Vicente estaba en el baño.', accept: ['F5_CAM_PASILLO', 'S5_AMP_DESPACHO', 'S5_BER_CORRIGE'] },
          { id: 'O2', text: 'Fue un error del pastillero o la digoxina del panadero: el análisis del hospital dio digoxina.', accept: ['F5_TOX', 'F5_COPA_TOX', 'F5_PASTILLERO_TOX'] },
          { id: 'O3', text: 'Cualquiera pudo echar algo en esa copa: se la sirvió el hijo, que además no hizo caso del mensaje de su padre.', accept: ['F5_COPA_HUELLAS', 'S5_BER_ACERCO', 'S5_AMP_VUELTA', 'F5_BOTELLA_TOX'] }
        ],
        generic: [
          { id: 'O1', text: 'La acusación no explica de dónde salió la oleandrina ni quién preparó el veneno.', accept: [] },
          { id: 'O2', text: 'Nadie vio a la persona señalada tocar la copa de Vicente.', accept: [] },
          { id: 'O3', text: 'La acusación no explica qué ganaba la persona señalada con la muerte de Vicente.', accept: [] }
        ]
      },
      evaluation: {
        judicialRelevant: ['bernat', 'lidia'],
        spatialBonus: ['F5_CAM_PASILLO', 'F5_AL_ESCALERA'],
        temporalConflicts: ['B1'],
        lateral: [
          { type: 'fact', id: 'S5_AMP_VUELTA', pts: 25, yes: 'Preguntaste qué vio Amparo al volver al patio.', no: 'No preguntaste qué pasó en el patio al volver del despacho.' },
          { type: 'conflict', id: 'B1', pts: 30, yes: 'Viste que Bernat estuvo solo en el patio con la copa.', no: 'No contrastaste la coartada de Bernat con la cámara del pasillo.' },
          { type: 'conflict', id: 'B5', pts: 25 },
          { type: 'chosen', id: 'F5_CENICERO', pts: 20 }
        ],
        usefulLab: ['P01:toxicologia', 'B02:toxicologia', 'B02:huellas', 'P01:autopsia', 'P02:toxicologia']
      }
    }
  }
});
