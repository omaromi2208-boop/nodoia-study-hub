/* EXPEDIENTE 0 — hilo conductor entre expedientes (todo ficticio).
 * Un detalle discreto se repite en los movimientos de dinero de cada caso. No cambia
 * ninguna solución: es una trama de fondo que se descubre al reunir varias pistas. */
window.E0 = window.E0 || {};
E0.threads = {
  name: 'Albarrán Gestión, S. L.',
  unlockAt: 5,
  items: {
    'EXP-001': { fact: 'F_FIN_EMPRESA', text: 'Entre los pagos de la empresa aparece una «asesoría de riesgos» de 1.200 € a Albarrán Gestión, S. L. Nadie en la empresa sabe explicar qué servicio prestaba.' },
    'EXP-002': { fact: 'F2_FIN_SEGURO', text: 'El seguro de vida se contrató a través de un intermediario: Albarrán Gestión, S. L., que cobró una comisión inusualmente alta.' },
    'EXP-003': { fact: 'F3_FIN_SERGIO', text: 'El embargo de las cuentas de Sergio Montes lo tramitó una gestoría de cobros: Albarrán Gestión, S. L. En su expediente figura una ficha con datos de Tomás Arnau.' },
    'EXP-004': { fact: 'F4_FIN_HERENCIA', text: 'Una tasación de la finca, encargada meses antes de los hechos, está firmada por Albarrán Gestión, S. L. Nadie de la familia recuerda haberla pedido.' },
    'EXP-005': { fact: 'F5_FIN_SEGURO', text: 'El seguro de decesos del fundador lo gestiona Albarrán Gestión, S. L., que llamó a la familia dos veces la semana anterior a la cena.' },
    'EXP-006': { fact: 'F6_FIN_POLIZA', text: 'La ampliación de la póliza la tramitó una correduría subcontratada: Albarrán Gestión, S. L. El agente asegura no conocerla.' },
    'EXP-007': { fact: 'F7_FIN_RAMON', text: 'El préstamo que Ramón pidió para el taller se lo ofreció por teléfono Albarrán Gestión, S. L., que tenía sus datos sin que él los hubiera dado.' },
    'EXP-008': { fact: 'F8_BANCO_GONZALO', text: 'En los movimientos aparece un pago a Albarrán Gestión, S. L. por un «informe de patrimonio» de la tía, encargado semanas antes de la muerte.' }
  },
  dossier: [
    'Albarrán Gestión, S. L. es una sociedad con domicilio en un piso vacío de Valencia y una sola administradora, que nunca ha comparecido. Factura «asesorías», «tasaciones» e «informes de patrimonio».',
    'En los ocho expedientes aparece en el momento en que alguien necesitaba saber cuánto tenía otra persona, qué seguros la cubrían o cuánto debía. Vendía esa información a quien pagara.',
    'Ninguno de sus clientes está acusado de nada por haberla contratado. Pero varias de las personas que cometieron los hechos de estos expedientes conocían, gracias a ella, datos que no deberían haber tenido.'
  ],
  question: {
    q: '¿Qué une los ocho expedientes?',
    options: [
      { id: 'autor', label: 'Una misma persona cometió todos los crímenes.' },
      { id: 'datos', label: 'Una sociedad que vendía información financiera y de seguros de personas vulnerables.', ok: true },
      { id: 'prensa', label: 'Un periodista que inventaba sospechosos para vender más.' },
      { id: 'azar', label: 'Nada: es una casualidad sin importancia.' }
    ],
    right: 'Correcto. La Fiscalía abre una investigación contra Albarrán Gestión por revelación de secretos y estafa. Tu nombre figura en el informe que la origina.',
    wrong: 'No encaja con lo que muestran los ocho movimientos. Vuelve a leer las pistas.'
  }
};
