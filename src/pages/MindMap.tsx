import { useState } from "react";
import { AppShell } from "@/components/neuroflow/AppShell";
import { useStudy } from "@/context/StudyContext";
import { ReactFlowCanvas } from "@/components/neuroflow/ReactFlowCanvas";
import { Button } from "@/components/ui/button";
import { Upload, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const nodeColorClass = [
  "bg-node-1",
  "bg-node-2",
  "bg-node-3",
  "bg-node-4",
  "bg-node-5",
  "bg-node-6",
  "bg-node-7",
];

export default function MindMap() {
  const { summary, activeNodeId } = useStudy();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const selectedNode = summary?.nodes.find((n) => n.id === selectedNodeId) ?? summary?.nodes[0];

  return (
    <AppShell title="Mi Mapa Mental">
      {summary ? (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{summary.title}</h1>
              <p className="text-sm text-muted-foreground mt-1 font-edu">{summary.overview}</p>
            </div>
          </div>

          {/* Canvas + Details Panel */}
          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            {/* React Flow Canvas */}
            <ReactFlowCanvas
              summary={summary}
              externalActiveId={activeNodeId}
              onNodeSelect={setSelectedNodeId}
            />

            {/* Node Details Panel */}
            <div className="rounded-2xl border border-border bg-card p-4 shadow-soft h-fit">
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "h-10 w-10 shrink-0 rounded-xl ring-1 ring-border/70",
                    nodeColorClass[
                      Math.max(0, summary.nodes.findIndex((n) => n.id === selectedNode?.id))
                    ] ?? "bg-node-1"
                  )}
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">{selectedNode?.label}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedNode?.summary}</p>
                </div>
              </div>

              <ul className="mt-4 space-y-2">
                {selectedNode?.bullets?.map((b, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-border/50 bg-muted/30 px-3 py-2 text-sm"
                  >
                    {b}
                  </li>
                ))}
              </ul>

              {selectedNode?.mnemonic && (
                <div className="mt-4 rounded-xl border border-border/50 bg-accent/30 px-3 py-2">
                  <div className="text-xs font-semibold text-muted-foreground">Mnemotecnia</div>
                  <div className="text-sm">{selectedNode.mnemonic}</div>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Scroll</kbd>
              para zoom •
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono">Arrastrar</kbd>
              para mover
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/30 mb-6">
            <Network className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Aún no tienes un mapa mental</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Sube un PDF o texto para que la IA genere automáticamente tu mapa de conceptos interactivo
          </p>
          <Button asChild className="mt-6 bg-gradient-to-r from-primary to-accent-foreground hover:opacity-90">
            <Link to="/nuevo-estudio">
              <Upload className="h-4 w-4 mr-2" />
              Subir documento
            </Link>
          </Button>
        </div>
      )}
    </AppShell>
  );
}
