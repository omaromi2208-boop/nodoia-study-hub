import { useCallback, useEffect, useMemo, useState } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type { StudySummary } from "@/context/StudyContext";
import { StudyNode, type StudyNodeData } from "./StudyNode";
import { StudyEdge } from "./StudyEdge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const nodeTypes = { study: StudyNode };
const edgeTypes = { study: StudyEdge };

interface ReactFlowCanvasProps {
  summary: StudySummary;
  externalActiveId?: string | null;
  onNodeSelect?: (id: string) => void;
}

function generateCircularLayout(count: number, centerX = 400, centerY = 300, radius = 220) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * (radius * 0.8),
    };
  });
}

export function ReactFlowCanvas({
  summary,
  externalActiveId,
  onNodeSelect,
}: ReactFlowCanvasProps) {
  const isMobile = useIsMobile();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const initialNodes = useMemo(() => {
    const positions = generateCircularLayout(summary.nodes.length);
    return summary.nodes.map((node, index): Node<StudyNodeData> => ({
      id: node.id,
      type: "study",
      position: positions[index] ?? { x: 0, y: 0 },
      data: {
        label: node.label,
        summary: node.summary,
        index,
        isActive: false,
        isSelected: false,
      },
    }));
  }, [summary.nodes]);

  const initialEdges = useMemo(() => {
    return summary.edges.map((edge): Edge => ({
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      type: "study",
    }));
  }, [summary.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Sync external active node (TTS highlighting)
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isActive: node.id === externalActiveId,
        },
      }))
    );
  }, [externalActiveId, setNodes]);

  // Sync selected node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isSelected: node.id === selectedNodeId,
        },
      }))
    );
  }, [selectedNodeId, setNodes]);

  // Reset when summary changes
  useEffect(() => {
    const positions = generateCircularLayout(summary.nodes.length);
    setNodes(
      summary.nodes.map((node, index): Node<StudyNodeData> => ({
        id: node.id,
        type: "study",
        position: positions[index] ?? { x: 0, y: 0 },
        data: {
          label: node.label,
          summary: node.summary,
          index,
          isActive: node.id === externalActiveId,
          isSelected: node.id === selectedNodeId,
        },
      }))
    );
  }, [summary, setNodes, externalActiveId, selectedNodeId]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      onNodeSelect?.(node.id);
    },
    [onNodeSelect]
  );

  return (
    <div className="h-[500px] w-full rounded-2xl border border-border bg-card overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{ type: "study" }}
        proOptions={{ hideAttribution: true }}
        className="neuroflow-canvas"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          className="!bg-background"
          color="hsl(var(--border))"
        />
        <Controls
          showInteractive={false}
          className={cn(
            "!bg-card/80 !backdrop-blur-xl !border-border !rounded-xl !shadow-soft",
            "[&>button]:!bg-transparent [&>button]:!border-border/50",
            "[&>button]:hover:!bg-accent [&>button]:!rounded-lg",
            "[&>button>svg]:!fill-foreground"
          )}
        />
        {!isMobile && (
          <MiniMap
            nodeColor={(node) => {
              const data = node.data as StudyNodeData;
              const colors = [
                "hsl(239 84% 67%)",
                "hsl(263 70% 68%)",
                "hsl(199 89% 48%)",
                "hsl(142 76% 46%)",
                "hsl(38 92% 50%)",
                "hsl(0 84% 60%)",
                "hsl(328 85% 60%)",
              ];
              return colors[data.index % 7] ?? colors[0];
            }}
            maskColor="hsl(var(--background) / 0.8)"
            className={cn(
              "!bg-card/60 !backdrop-blur-xl !border-border !rounded-xl",
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
