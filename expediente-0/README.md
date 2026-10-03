# EXPEDIENTE 0 — Investigación

Simulador de investigación criminal para dos investigadores (Omi y La Rebe). Aquí no se gana adivinando: se gana reconstruyendo.

## Cómo jugar

Abre `index.html` en el navegador (doble clic). No necesita instalación ni servidor. La partida se guarda sola en el navegador.

## Qué incluye esta versión

- **Centro de investigación**: perfil, rango, XP, reputación, dinero, energía, jornadas semanales con salario.
- **Academia** con 4 módulos evaluables, **Carrera**, **Cuaderno** por investigador, **Perfil** con 12 habilidades y **Ajustes** (6 temas, animaciones, tamaño, sonido, exportar/importar/borrar).
- **Caso EXP-001 «El Apartamento 17»**, jugable de principio a fin:
  - Escena interactiva sobre plano (14 elementos), laboratorio con costes, 7 solicitudes digitales y solicitudes judiciales limitadas.
  - 6 personas con interrogatorio, memoria de lo dicho, confrontación con pruebas y respuestas que pueden ser verdad, media verdad, mentira o creencia errónea.
  - Comparador de fuentes (solo diferencias objetivas), cronología visual con detección de solapamientos, hipótesis con teorías de Omi y La Rebe y confianza 0–100.
  - Consulta libre que solo responde con lo que consta; si no, «No consta en el expediente.».
  - Informe, veredicto (incluida la opción «evidencia insuficiente»), evaluación del razonamiento observado y juicio simulado.

## Arquitectura

```
index.html        shell de la aplicación
styles.css        estilos y temas
data/config.js    rangos, temas, jornada, habilidades
data/academy.js   módulos de la academia
data/case01.js    caso EXP-001: única fuente de verdad (hechos, personas, contradicciones, verdad interna)
js/state.js       estado, guardado, exportar/importar con validación
js/engine.js      motor: descubrimiento, consulta, comparador, cronología, evaluación
js/ui.js          render de pantallas
js/app.js         acciones del jugador y arranque
```

Para añadir un caso nuevo basta con crear otro `data/caseNN.js` con la misma estructura y enlazarlo en `index.html`; el motor no cambia.
