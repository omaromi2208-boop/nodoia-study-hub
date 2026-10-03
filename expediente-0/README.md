# EXPEDIENTE 0 — Investigación

Simulador de investigación criminal para dos investigadores (Omi y La Rebe). Aquí no se gana adivinando: se gana reconstruyendo.

## Cómo jugar

Abre `index.html` en el navegador (doble clic). No necesita instalación ni servidor. La partida se guarda sola en el navegador y se puede exportar e importar como JSON.

## Contenido

- **Centro de investigación**: perfil, 7 rangos, XP, reputación, dinero, energía y jornadas semanales con salario.
- **Academia**: 12 módulos evaluables y una biblioteca jurídica que separa el contenido educativo interno, las fuentes oficiales (BOE) y la simulación del juego.
- **Carrera** con historial de intentos, **Cuaderno** con notas de cada investigador, **Perfil** con 12 habilidades y **Ajustes** (6 temas, animaciones, tamaño, sonido, exportar, importar y borrar).
- **Tres expedientes jugables de principio a fin**, cada uno con su propia verdad interna. Se desbloquean por rango:
  - **EXP-001 «El Apartamento 17»**: homicidio con una sedación previa, una huida por el garaje y un inocente muy sospechoso.
  - **EXP-002 «La desaparición del puente»**: coche abandonado, peaje, mensajes programados y un audio. Hay que decidir si fue un crimen, un accidente o algo distinto.
  - **EXP-003 «Las cuatro llamadas»**: cámara del ascensor, una llave que falta, un teléfono manipulado después de la muerte y una cronología conflictiva.

### Herramientas de cada expediente

| Herramienta | Qué hace |
|---|---|
| Escena | Planos con varias zonas. Cada elemento se puede examinar, fotografiar, enviar al laboratorio, añadir al muro o convertir en pregunta. |
| Laboratorio | Análisis con coste. Los resultados respetan los límites de cada técnica. |
| Digital | Cámaras, registros, dispositivos, finanzas y vehículos. Las solicitudes judiciales de antenas son limitadas. |
| Personas | Interrogatorio con memoria y confrontación con pruebas. Las respuestas pueden ser verdad, medias verdades, mentiras o creencias erróneas. |
| Comparador | Señala solo diferencias objetivas entre fuentes. Nunca dice quién miente. |
| Cronología | Línea temporal visual con detección de solapamientos. |
| Mapa | Lugares descubiertos, conexiones trazadas por el jugador y distancias aproximadas. |
| Muro | Tarjetas que se arrastran, con conexiones etiquetadas que se guardan. |
| Hipótesis | Teorías de Omi y de La Rebe, aviso de teorías en conflicto y confianza de 0 a 100. |
| Consulta | Preguntas libres. Si el dato no consta, responde «No consta en el expediente.». |
| Informe | Informe de 13 apartados compuesto con el material propio del jugador. |
| Custodia | Trazabilidad de cada indicio: identificación, recogida, almacenamiento, transferencia, análisis, resultado y documentación. |
| Veredicto | Evaluación de la conclusión, el móvil, el método, la cronología, las pruebas, las contradicciones y los cómplices. Incluye un perfil de razonamiento observado y un juicio simulado. |

## Arquitectura

```
index.html         shell de la aplicación
styles.css         estilos y temas
data/config.js     rangos, temas, jornada, habilidades
data/academy.js    módulos de la academia
data/legal.js      biblioteca jurídica (fuentes BOE)
data/case01.js     EXP-001 · única fuente de verdad del caso
data/case02.js     EXP-002
data/case03.js     EXP-003
js/state.js        estado, guardado, exportar/importar con validación
js/engine.js       motor genérico: consulta, comparador, cronología, mapa, custodia, evaluación
js/ui.js           render de pantallas
js/app.js          acciones del jugador, muro (arrastre) y arranque
```

## Añadir un caso

Crea `data/caseNN.js` con la misma estructura y enlázalo en `index.html`; el motor no cambia. La estructura incluye:

- `people`: preguntas, confrontaciones y rasgos ocultos de cada persona.
- `scene.plans`: planos y puntos interactivos.
- `evidence` y `digital`.
- `facts`: los hechos, con hora, persona, lugar y fuente.
- `conflicts`: las contradicciones objetivas.
- `verdictOptions`, `truth`, `evaluation` y `trial`.

Por ejemplo, `verdictOptions.culprits` permite conclusiones que no son una persona, como «desaparición voluntaria».
