
# Plan: Integración de React Flow Oficial

## Resumen
Reemplazar el canvas personalizado actual por React Flow, una librería profesional que ofrece un lienzo infinito con minimap, controles de zoom, mejor rendimiento y accesibilidad.

## Cambios principales

### 1. Instalar dependencia
Añadir `@xyflow/react` (la versión moderna de React Flow) al proyecto.

### 2. Crear nodo personalizado
Un nuevo componente `StudyNode.tsx` que renderiza cada concepto con:
- Icono según índice (Brain, BookOpen, etc.)
- Color de fondo según paleta existente (`--node-1` a `--node-7`)
- Label y resumen truncado
- Estilo glassmorphism coherente con el diseño actual
- Indicador visual cuando está activo/seleccionado

### 3. Reescribir NodeCanvas con React Flow
El nuevo `ReactFlowCanvas.tsx` incluirá:
- **Minimap** en la esquina inferior derecha (colapsable en mobile)
- **Controls** para zoom in/out, fit view y bloquear interacción
- **Fondo con patrón de puntos** (dots) estilo n8n
- **Edges curvados** (`smoothstep` o `bezier`) con gradiente indigo
- **Layout automático** circular/radial para los 7 nodos
- Soporte para arrastrar nodos y actualizar posiciones
- Sincronización con `activeNodeId` del contexto (resalta nodo activo durante TTS)

### 4. Estilos React Flow
Añadir CSS específico para React Flow que respete el tema claro/oscuro:
- Minimap con fondo semi-transparente
- Controles con estilo glass
- Nodos con sombras suaves y bordes redondeados (20px)

### 5. Actualizar MindMap.tsx
Integrar el nuevo canvas manteniendo el panel lateral de detalles del nodo seleccionado.

## Estructura de archivos

```text
src/
├── components/
│   └── neuroflow/
│       ├── ReactFlowCanvas.tsx  (nuevo - canvas principal)
│       ├── StudyNode.tsx        (nuevo - nodo personalizado)
│       └── StudyEdge.tsx        (nuevo - edge con gradiente)
├── index.css                    (actualizar con estilos React Flow)
```

## Detalles técnicos

### Dependencia
```json
"@xyflow/react": "^12.x"
```

### Conversión de datos
El contexto `StudySummary` se transforma a formato React Flow:
- `summary.nodes` → `Node[]` con posiciones en layout circular
- `summary.edges` → `Edge[]` con tipo `smoothstep`

### Props del canvas
```typescript
interface ReactFlowCanvasProps {
  summary: StudySummary;
  externalActiveId?: string | null;
  onNodeSelect?: (id: string) => void;
}
```

### Características incluidas
| Característica | Descripción |
|---------------|-------------|
| Minimap | Vista en miniatura del grafo completo |
| Controls | Botones zoom +/-, fit, lock |
| Pan & Zoom | Arrastrar canvas, scroll para zoom |
| Drag nodes | Mover nodos individualmente |
| Dot background | Patrón de puntos estilo pizarra |
| Curved edges | Conexiones suaves con gradiente |
| Theme support | Adapta colores a modo claro/oscuro |

## Beneficios
- **Rendimiento**: React Flow usa virtualización y optimiza re-renders
- **Accesibilidad**: Soporte de teclado nativo
- **Mobile**: Touch events optimizados
- **Extensibilidad**: Fácil añadir handles, tooltips, etc.
