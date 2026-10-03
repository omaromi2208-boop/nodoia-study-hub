/* EXPEDIENTE 0 — Biblioteca jurídica.
 * Separa tres cosas: contenido educativo interno, fuentes oficiales y simulación del juego.
 * No reproduce artículos: remite al texto consolidado del BOE para comprobar la vigencia. */
window.E0 = window.E0 || {};

E0.legal = {
  disclaimer: 'Contenido orientativo con fines educativos. No sustituye el asesoramiento jurídico. Comprueba siempre la redacción vigente en el BOE: las normas se modifican.',
  official: [
    { name: 'Constitución Española (1978)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229', note: 'Derechos fundamentales; el artículo 24 recoge la tutela judicial efectiva y la presunción de inocencia.' },
    { name: 'Ley de Enjuiciamiento Criminal (Real Decreto de 14 de septiembre de 1882)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1882-6036', note: 'Regula el proceso penal: instrucción, diligencias de investigación, declaraciones y juicio.' },
    { name: 'Código Penal (Ley Orgánica 10/1995)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1995-25444', note: 'Define los delitos y las penas.' }
  ],
  internal: [
    { title: 'Persona de interés, investigada y acusada', text: 'En el lenguaje profesional conviene distinguir entre alguien que interesa a la investigación, alguien formalmente investigado y alguien acusado. El juego usa "persona de interés" para no prejuzgar.' },
    { title: 'Diligencias que requieren autorización judicial', text: 'Algunas medidas que afectan a derechos fundamentales, como acceder a datos de comunicaciones o al contenido de dispositivos, requieren autorización judicial. Por eso el juego limita las solicitudes de antenas y condiciona algunos análisis.' },
    { title: 'Cadena de custodia', text: 'Es la documentación continua de quién recoge, guarda, traslada y analiza cada indicio. Su objetivo es garantizar que lo analizado es lo que se recogió y que no ha sido alterado. Una cadena con lagunas debilita el valor de la prueba.' },
    { title: 'Prueba directa e indiciaria', text: 'Una prueba directa acredita el hecho por sí misma; la indiciaria permite inferirlo a partir de varios indicios. Para que la inferencia sea sólida, los indicios deben estar acreditados, ser varios, estar relacionados entre sí y no admitir una explicación alternativa razonable.' }
  ],
  simulation: 'Los expedientes del juego son ficticios. Los procedimientos aparecen simplificados para hacerlos jugables: plazos, costes y autorizaciones no reproducen la práctica real.'
};
