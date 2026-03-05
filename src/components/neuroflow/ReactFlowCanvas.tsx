import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type Node,
  type Edge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Download, Maximize2 } from "lucide-react";

import type { StudySummary } from "@/context/StudyContext";
import { StudyNode, type StudyNodeData } from "./StudyNode";
import { StudyEdge } from "./StudyEdge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nodeTypes = { study: StudyNode };
const edgeTypes = { study: StudyEdge };

interface ReactFlowCanvasProps {
  summary: StudySummary;
  externalActiveId?: string | null;
  onNodeSelect?: (id: string) => void;
  onExplainSimple?: (label: string, summary: string) => void;
}

function getStorageKey(title: string) {
  return `neuroflow_positions_v2_${title.slice(0, 40)}`;
}

function generateCircularLayout(count: number, centerX = 420, centerY = 300, radius = 240) {
  if (count === 1) return [{ x: centerX, y: centerY }];
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * (radius * 0.75),
    };
  });
}

function savePositions(key: string, nodes: Node[]) {
  const positions: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n) => { positions[n.id] = n.position; });
  localStorage.setItem(key, JSON.stringify(positions));
}

function loadPositions(key: string): Record<string, { x: number; y: number }> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Node colors synced with index.css --node-* tokens
const nodeColorMap = [
  "hsl(258 80% 62%)",
  "hsl(172 65% 42%)",
  "hsl(199 89% 48%)",
  "hsl(142 70% 46%)",
  "hsl(38 92% 52%)",
  "hsl(0 80% 60%)",
  "hsl(320 80% 60%)",
];

function CanvasInner({
  summary,
  externalActiveId,
  onNodeSelect,
  onExplainSimple,
}: ReactFlowCanvasProps) {
  const isMobile = useIsMobile();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const { getNodes, fitView } = useReactFlow();
  const storageKey = useMemo(() => getStorageKey(summary.title), [summary.title]);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildNode = useCallback(
    (node: StudySummary["nodes"][number], index: number, pos: { x: number; y: number }): Node<StudyNodeData> => ({
      id: node.id,
      type: "study",
      position: pos,
      data: {
        label: node.label,
        summary: node.summary,
        index,
        isActive: false,
        isSelected: false,
        onExplainSimple,
      },
    }),
    [onExplainSimple]
  );

  const initialNodes = useMemo(() => {
    const saved = loadPositions(storageKey);
    const positions = generateCircularLayout(summary.nodes.length);
    return summary.nodes.map((node, index) =>
      buildNode(node, index, saved?.[node.id] ?? positions[index] ?? { x: 0, y: 0 })
    );
  }, [summary.nodes, storageKey, buildNode]);

  const initialEdges = useMemo((): Edge[] =>
    summary.edges.map((edge) => ({
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      type: "study",
    })),
    [summary.edges]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      onNodesChange(changes);
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        savePositions(storageKey, getNodes());
      }, 600);
    },
    [onNodesChange, storageKey, getNodes]
  );

  // Sync active (TTS)
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, isActive: n.id === externalActiveId } }))
    );
  }, [externalActiveId, setNodes]);

  // Sync selected
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, isSelected: n.id === selectedNodeId } }))
    );
  }, [selectedNodeId, setNodes]);

  // Reset when summary changes
  useEffect(() => {
    const saved = loadPositions(storageKey);
    const positions = generateCircularLayout(summary.nodes.length);
    setNodes(
      summary.nodes.map((node, index) =>
        buildNode(node, index, saved?.[node.id] ?? positions[index] ?? { x: 0, y: 0 })
      )
    );
  }, [summary, setNodes, buildNode, storageKey]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      onNodeSelect?.(node.id);
    },
    [onNodeSelect]
  );

  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    const el = canvasRef.current?.querySelector(".react-flow__viewport") as HTMLElement | null;
    if (!el) return;
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, { quality: 0.95, pixelRatio: 2 });
      const a = document.createElement("a");
      a.download = `${summary.title.slice(0, 30)}-mapa.png`;
      a.href = dataUrl;
      a.click();
    } catch { /* ignore */ }
  }, [summary.title]);

  const handleFitView = useCallback(() => fitView({ padding: 0.3, duration: 400 }), [fitView]);

  return (
    <div
      ref={canvasRef}
      className="relative h-[500px] md:h-[600px] w-full rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Toolbar */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        <Button
          size="sm"
          variant="outline"
          onClick={handleFitView}
          title="Centrar mapa"
          className="h-8 w-8 px-0 rounded-xl bg-card/80 backdrop-blur-sm border-border/60 shadow-soft hover:bg-accent"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleExport}
          className="h-8 rounded-xl bg-card/80 backdrop-blur-sm border-border/60 text-xs gap-1.5 shadow-soft hover:bg-accent"
        >
          <Download className="h-3.5 w-3.5" />
          Exportar
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.35 }}
        minZoom={0.25}
        maxZoom={2.5}
        defaultEdgeOptions={{ type: "study" }}
        proOptions={{ hideAttribution: true }}
        className="neuroflow-canvas"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1.2}
          className="!bg-background"
          color="hsl(var(--border))"
        />
        <Controls
          showInteractive={false}
          className={cn(
            "!bg-card/90 !backdrop-blur-xl !border-border/60 !rounded-2xl !shadow-soft !overflow-hidden",
            "[&>button]:!bg-transparent [&>button]:!border-b [&>button]:!border-border/40",
            "[&>button:last-child]:!border-0",
            "[&>button]:hover:!bg-accent [&>button]:!rounded-none",
            "[&>button>svg]:!fill-foreground"
          )}
        />
        {!isMobile && (
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as StudyNodeData;
              return nodeColorMap[data.index % 7] ?? nodeColorMap[0];
            }}
            maskColor="hsl(var(--background) / 0.85)"
            className={cn(
              "!bg-card/70 !backdrop-blur-xl !border-border/60 !rounded-2xl",
              "!shadow-soft !overflow-hidden"
            )}
            pannable
            zoomable
          />
        )}
      </ReactFlow>
    </div>
  );
}

export function ReactFlowCanvas(props: ReactFlowCanvasProps) {
  return (
    <ReactFlowProvider>
      <CanvasInner {...props} />
    </ReactFlowProvider>
  );
}
