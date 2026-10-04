# EXPEDIENTE 0 — Investigación

Simulador de investigación criminal con escenarios en 3D. Creas a tu investigador/a, eliges su especialidad y haces carrera resolviendo expedientes. Aquí no se gana adivinando: se gana reconstruyendo.

## Cómo jugar

Abre `index.html` en el navegador (doble clic). No necesita instalación ni servidor. La partida se guarda sola en el navegador y se puede exportar e importar como JSON.

## Contenido

- **Creación de personaje**: nombre propio y especialidad (Criminalística, Investigación digital, Jurídica o Análisis de conducta), cada una con ventajas reales en la partida.
- **Centro de investigación**: perfil, 7 rangos, XP, reputación, dinero, energía y jornadas semanales con salario.
- **Academia**: 12 módulos evaluables y una biblioteca jurídica que separa el contenido educativo interno, las fuentes oficiales (BOE) y la simulación del juego.
- **Carrera** con historial de intentos, **Cuaderno** con notas de cada investigador, **Perfil** con 12 habilidades y **Ajustes** (6 temas, animaciones, tamaño, sonido, exportar, importar y borrar).
- **Ocho expedientes jugables de principio a fin**, y todos tienen **varias soluciones posibles** (20 versiones en total). Cada partida elige una en secreto: las personas, la escena y las solicitudes son las mismas, pero cambian las pruebas clave, las declaraciones y quién lo hizo. Repetir un caso es jugar otro. Se desbloquean por rango:
  - **EXP-001 «El Apartamento 17»** (2 versiones): homicidio con una sedación previa, una salida por el garaje y una persona inocente muy sospechosa.
  - **EXP-002 «La desaparición del puente»** (2 versiones): coche abandonado, peaje, mensajes programados y un audio. Hay que decidir si fue un crimen, un accidente o algo distinto.
  - **EXP-003 «Las cuatro llamadas»** (2 versiones): cámara del ascensor, una escalera sin cámara, una llave que falta, un testamento a punto de cambiar y una cronología conflictiva.
  - **EXP-004 «La masía de los Ballester»** (dificultad extrema, 3 versiones): triple homicidio con una superviviente y siete sospechosos. Cambian los cristales, la herida, los residuos de disparo, el GPS, las antenas y lo que oyó la vecina. Inspirado en patrones de casos documentados, con nombres, lugares y hechos completamente ficticios.
  - **EXP-005 «La tisana de las once»** (2 versiones): envenenamiento tras una cena familiar en un horno. Un análisis rápido apunta a un fármaco, pero poder hacerlo no es haberlo hecho.
  - **EXP-006 «Ceniza en El Collet»** (dificultad extrema, 3 versiones): incendio de un taller con el vigilante muerto dentro. Seguro ampliado, un vecino con un pleito perdido y un empleado con deudas.
  - **EXP-007 «El autobús de las 19:15»** (dificultad extrema, 3 versiones): desaparece una chica de 14 años al salir del entrenamiento. Custodia en disputa, un adulto que la contactó por internet o una huida para escapar del acoso escolar. En todas las versiones aparece con vida.
  - **EXP-008 «La tercera pajarita»** (dificultad extrema, 3 versiones): tres personas mayores mueren en seis semanas y la prensa habla de un asesino en serie. Un solo autor, un imitador que solo sabe lo que publicaron los periódicos o una «serie» fabricada para tapar otro móvil.

### Presión y tiempo

- **El reloj corre**: cada diligencia consume horas del caso (examinar, media hora; un análisis, 6 h; una orden judicial, 12 h). A las 72 h las cámaras privadas sobrescriben sus grabaciones (recuperarlas cuesta el doble), a las 96 h falla la memoria de los testigos y a las 240 h el autor puede huir. Cerrar antes de 120 h tiene premio.
- **Prensa y jefe**: titulares que señalan a alguien sin mirar la solución y mensajes del jefe que aprietan. El veredicto avisa si te dejaste llevar por los titulares.
- **Modo pesadilla**: sin pericias ni cotejos automáticos, plazos a la mitad y sin poder repetir; la recompensa se multiplica por 1,5.
- **Casos encadenados**: un detalle se repite en los ocho expedientes. Con cinco pistas se abre en Carrera un expediente transversal.
- **Sonido ambiente** generado en el navegador: lluvia, fluorescente, respiración y latidos del interrogado según su tensión, pasos en el pasillo. Se silencia con el botón de la barra superior.

### Herramientas de cada expediente

| Herramienta | Qué hace |
|---|---|
| Escena | Vista 3D (girar, acercar, pulsar objetos e inspeccionarlos de cerca), recorrido en primera persona (WASD, flechas o botones táctiles; paredes con puertas y choque) o plano 2D, con varias zonas. Cada elemento se puede examinar, fotografiar, enviar al laboratorio, añadir al muro o convertir en pregunta. |
| Herramientas forenses | Luminol, luz UV, polvo revelador y lupa sobre cualquier objeto examinado, con efecto visual en 3D. El luminol y el polvo son limitados en cada expediente. |
| Laboratorio | Análisis con coste. Los resultados respetan los límites de cada técnica. |
| Mesa de revelado | Las huellas que salen de un análisis de laboratorio se revelan en una mesa 3D: luz rasante para encontrar el brillo de los residuos, polvo negro o de aluminio según la superficie y brocha; el exceso de polvo empasta las crestas. Se levantan con cinta. |
| Pericias | ADN (leer el electroferograma sin marcar tartamudeos), neumáticos y calzado (superponer la referencia sobre la impresión), balística (microscopio de comparación de vainas) y caligrafía (comparar letra a letra). Cada una tiene versión automática de pago. |
| Lofoscopia | Las huellas que salen del laboratorio o del polvo revelador quedan pendientes de cotejo. En el banco eliges una ficha y un dedo del fichero decadactilar, y marcas los puntos característicos (finales de cresta y bifurcaciones) en la latente y en la ficha. Con 12 coincidentes hay identificación; tres discrepancias descartan el dedo; una latente sin puntos suficientes se declara no apta. También hay un cotejo automático de pago. |
| Digital | Cámaras, registros, dispositivos, finanzas y vehículos. Los teléfonos y ordenadores extraídos se abren como un móvil o un escritorio (llamadas, mensajes, ubicación, archivos). Las grabaciones con el reloj desajustado se sincronizan buscando un hecho de hora conocida. Las solicitudes judiciales de antenas son limitadas. |
| Personas | Sala de interrogatorio en 3D: la persona se sienta frente a ti con una cara modelada (ojos con iris y párpados, ojeras, arrugas), habla, parpadea, te sigue con la mirada y reacciona a las confrontaciones según su carácter (sus gestos nunca delatan si miente). Con mucha tensión se le dilatan las pupilas, suda y se queda mirándote fijamente; la lámpara falla de vez en cuando. Botón «Escuchar» con la voz del navegador. Medidor de tensión: al límite la persona pide un abogado y corta la entrevista; se puede volver a citar con el abogado presente, sentado a su lado. La prueba que le enseñas se desliza sobre la mesa. Interrogatorio con memoria y confrontación con pruebas. Las respuestas pueden ser verdad, medias verdades, mentiras o creencias erróneas. |
| Pruebas plantadas | Cualquier evidencia examinada se puede señalar como posible montaje. Acertar, con la prueba que lo demuestra, suma puntos; señalar algo auténtico resta. |
| Rueda de reconocimiento | Eliges a quién pones junto a figurantes. El testigo acierta según lo bien que vio y el tiempo que ha pasado; a veces señala a otra persona parecida. Solo se puede hacer una vez. |
| Registro con orden judicial | El juez solo autoriza el registro de un domicilio con hechos objetivos y contradicciones que vinculen a la persona. |
| Segunda escena | A mitad del caso puede aparecer una escena nueva (un coche, un trastero…) al descubrir un hecho. |
| Reconstrucción | En el mapa propones los pasos de una persona; el juego comprueba si son físicamente posibles y si chocan con los registros, y los muestra en una maqueta 3D. |
| Comparador | Señala solo diferencias objetivas entre fuentes. Nunca dice quién miente. |
| Cronología | Línea temporal visual con detección de solapamientos. |
| Mapa | Lugares descubiertos, conexiones trazadas por el jugador y distancias aproximadas. Reproducción temporal: un deslizador de hora mueve a cada persona según los registros y muestra aparte dónde declara que estaba, con una línea roja cuando no coinciden. |
| Muro | Tablón de corcho con tarjetas de papel y chinchetas, foto de cada evidencia (sacada de su modelo 3D) y retrato de cada persona, hilos de colores por tipo de conexión y línea temporal con las tarjetas que tienen hora. |
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
data/case05.js     EXP-005
data/case06.js     EXP-006
data/case07.js     EXP-007
data/case08.js     EXP-008
js/state.js        estado, guardado, exportar/importar con validación
js/scene3d.js      escena 3D generada a partir de los planos del caso
js/face3d.js       cabeza humana procedural (cráneo, piel, ojos, párpados, cejas, labios)
js/room3d.js       sala de interrogatorio 3D y aspecto de cada persona
js/prints.js       huellas dactilares procedurales y cotejo punto a punto
js/lab3d.js        mesa de revelado de huellas en 3D
js/pericias.js     pericias jugables: ADN, neumáticos, calzado, balística y caligrafía
js/video.js        análisis y sincronización de vídeo de cámara
js/clock.js        reloj de la investigación, prensa y jefe
js/audio.js        sonido ambiente con Web Audio
js/recon3d.js      reconstrucción de movimientos y maqueta 3D
data/threads.js    hilo conductor entre expedientes
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

### Huellas

Un hecho que sale del laboratorio o de una herramienta forense puede declarar `prints: [{ at: 'lugar', match: 'idPersona' }, { at: 'lugar', q: 'no_apta' }]`. Ese hecho no entra en el expediente hasta que se cotejan todas sus latentes. Las huellas de cada persona se generan a partir de su identificador, así que siempre son las mismas.

### Pericias y vídeo

Un hecho que sale de un análisis de laboratorio puede declarar `pericia: { type: 'adn' | 'caligrafia', match: 'idPersona' }`, `pericia: { type: 'neumatico' | 'calzado', match: 'idReferencia' }` (referencias del catálogo de `js/pericias.js`) o `pericia: { type: 'balistica' }`. Una solicitud digital con grabación puede declarar `video: { offset, ref: { label, time }, range: [ini, fin], subject: { pid, intervals }, gates: [hechos] }`: esos hechos entran en el expediente cuando el jugador sincroniza la cámara.

### Montajes, ruedas, registros y segunda escena

En cada caso o versión: `planted: [{ ev, label, tells: [hechos] }]`, `lineups: [{ id, witness, saw, target, quality, requires }]` y `searches: { persona: { place, facts: [hechos] } }`. Un plano de escena con `unlock: 'HECHO'` solo aparece cuando se descubre ese hecho.
