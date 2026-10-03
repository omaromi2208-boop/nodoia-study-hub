# EXPEDIENTE 0 — Investigación

Simulador de investigación criminal con escenarios en 3D. Creas a tu investigador/a, eliges su especialidad y haces carrera resolviendo expedientes. Aquí no se gana adivinando: se gana reconstruyendo.

## Cómo jugar

Abre `index.html` en el navegador (doble clic). No necesita instalación ni servidor. La partida se guarda sola en el navegador y se puede exportar e importar como JSON.

## Contenido

- **Creación de personaje**: nombre propio y especialidad (Criminalística, Investigación digital, Jurídica o Análisis de conducta), cada una con ventajas reales en la partida.
- **Centro de investigación**: perfil, 7 rangos, XP, reputación, dinero, energía y jornadas semanales con salario.
- **Academia**: 12 módulos evaluables y una biblioteca jurídica que separa el contenido educativo interno, las fuentes oficiales (BOE) y la simulación del juego.
- **Carrera** con historial de intentos, **Cuaderno** con notas de cada investigador, **Perfil** con 12 habilidades y **Ajustes** (6 temas, animaciones, tamaño, sonido, exportar, importar y borrar).
- **Cuatro expedientes jugables de principio a fin**, y todos tienen **varias soluciones posibles** (9 versiones en total). Cada partida elige una en secreto: las personas, la escena y las solicitudes son las mismas, pero cambian las pruebas clave, las declaraciones y quién lo hizo. Repetir un caso es jugar otro. Se desbloquean por rango:
  - **EXP-001 «El Apartamento 17»** (2 versiones): homicidio con una sedación previa, una salida por el garaje y una persona inocente muy sospechosa.
  - **EXP-002 «La desaparición del puente»** (2 versiones): coche abandonado, peaje, mensajes programados y un audio. Hay que decidir si fue un crimen, un accidente o algo distinto.
  - **EXP-003 «Las cuatro llamadas»** (2 versiones): cámara del ascensor, una escalera sin cámara, una llave que falta, un testamento a punto de cambiar y una cronología conflictiva.
  - **EXP-004 «La masía de los Ballester»** (dificultad extrema, 3 versiones): triple homicidio con una superviviente y siete sospechosos. Cambian los cristales, la herida, los residuos de disparo, el GPS, las antenas y lo que oyó la vecina. Inspirado en patrones de casos documentados, con nombres, lugares y hechos completamente ficticios.

### Herramientas de cada expediente

| Herramienta | Qué hace |
|---|---|
| Escena | Vista 3D (girar, acercar, pulsar objetos e inspeccionarlos de cerca) o plano 2D, con varias zonas. Cada elemento se puede examinar, fotografiar, enviar al laboratorio, añadir al muro o convertir en pregunta. |
| Herramientas forenses | Luminol, luz UV, polvo revelador y lupa sobre cualquier objeto examinado, con efecto visual en 3D. El luminol y el polvo son limitados en cada expediente. |
| Laboratorio | Análisis con coste. Los resultados respetan los límites de cada técnica. |
| Digital | Cámaras, registros, dispositivos, finanzas y vehículos. Las solicitudes judiciales de antenas son limitadas. |
| Personas | Sala de interrogatorio en 3D: la persona se sienta frente a ti, habla, parpadea y reacciona a las confrontaciones según su carácter (sus gestos nunca delatan si miente). Botón «Escuchar» con la voz del navegador. Interrogatorio con memoria y confrontación con pruebas. Las respuestas pueden ser verdad, medias verdades, mentiras o creencias erróneas. |
| Comparador | Señala solo diferencias objetivas entre fuentes. Nunca dice quién miente. |
| Cronología | Línea temporal visual con detección de solapamientos. |
| Mapa | Lugares descubiertos, conexiones trazadas por el jugador y distancias aproximadas. |
| Muro | Tarjetas que se arrastran, con conexiones etiquetadas que se guardan. |
| Hipótesis | Tus teorías, aviso de teorías en conflicto y confianza de 0 a 100. |
| Consulta | Preguntas libres. Si el dato no consta, responde «No consta en el expediente.». |
| Informe | Informe de 13 apartados compuesto con el material propio del jugador. |
| Custodia | Trazabilidad de cada indicio: identificación, recogida, almacenamiento, transferencia, análisis, resultado y documentación. |
| Veredicto | Evaluación de la conclusión (señalar a quien no fue nunca aprueba), el móvil, el método, la cronología, las pruebas, las contradicciones y los cómplices. Incluye un perfil de razonamiento observado y un juicio simulado. |

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
data/case04.js     EXP-004
js/state.js        estado, guardado, exportar/importar con validación
js/scene3d.js      escena 3D generada a partir de los planos del caso
js/room3d.js       sala de interrogatorio 3D y aspecto de cada persona
js/engine.js       motor genérico: consulta, comparador, cronología, mapa, custodia, evaluación
js/ui.js           render de pantallas
js/app.js          acciones del jugador, muro (arrastre) y arranque
vendor/three.min.js  Three.js r128 (licencia MIT, ver vendor/THREE-LICENSE.txt)
```

El 3D se construye solo a partir de `scene.plans`: suelos, paredes, mobiliario según el nombre de cada estancia y un modelo por evidencia (se deduce del nombre o se fija con el campo `model`). Si el navegador no admite WebGL, el juego muestra el plano 2D.

## Añadir un caso

Crea `data/caseNN.js` con la misma estructura y enlázalo en `index.html`; el motor no cambia. La estructura incluye:

- `people`: preguntas, confrontaciones y rasgos ocultos de cada persona.
- `scene.plans`: planos y puntos interactivos.
- `evidence` y `digital`.
- `facts`: los hechos, con hora, persona, lugar y fuente.
- `conflicts`: las contradicciones objetivas.
- `verdictOptions`, `truth`, `evaluation` y `trial`.

Por ejemplo, `verdictOptions.culprits` permite conclusiones que no son una persona, como «desaparición voluntaria».

### Casos con varias soluciones

Añade `variants: { idVersion: { facts, evidence, answers, confront, conflicts, truth, trial, evaluation } }`. Todas las versiones comparten personas, escena, evidencias y solicitudes, así que el jugador no puede distinguirlas por la interfaz. Cada versión sobrescribe solo lo que cambia. Al abrir el caso se elige una versión al azar, distinta de la última jugada. `data/case04.js` es el ejemplo más completo. En los casos 1 a 3, la primera versión guarda la verdad original y las contradicciones que solo existen en ella.

### Herramientas forenses

Cada evidencia puede declarar `forensic: { luminol | uv | polvo | lupa: { reveals: [...] } }`. Si una herramienta no tiene resultado definido, el juego responde «sin hallazgos», sin dar pistas.
