import { useState, useCallback } from "react";
import { AppShell } from "@/components/neuroflow/AppShell";
import { useStudy } from "@/context/StudyContext";
import { ReactFlowCanvas } from "@/components/neuroflow/ReactFlowCanvas";
import { Button } from "@/components/ui/button";
import { Upload, Network, Lightbulb, BookOpen, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { nodoiaAi } from "@/lib/nodoia/ai";
import { useToast } from "@/hooks/use-toast";

const nodeColors = [
  "hsl(258 80% 62%)",
  "hsl(172 65% 42%)",
  "hsl(199 89% 48%)",
  "hsl(142 70% 46%)",
  "hsl(38 92% 52%)",
  "hsl(0 80% 60%)",
  "hsl(320 80% 60%)",
];

const nodeBgClass = [
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
  const [simpleExplanation, setSimpleExplanation] = useState<string | null>(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const { toast } = useToast();

  const selectedNode = summary?.nodes.find((n) => n.id === selectedNodeId) ?? summary?.nodes[0];
  const selectedIndex = summary?.nodes.findIndex((n) => n.id === selectedNode?.id) ?? 0;

  const handleExplainSimple = useCallback(
    async (label: string, nodeSummary: string) => {
      setSimpleExplanation(null);
      setLoadingExplain(true);
      try {
        const result = await nodoiaAi<{ explanation: string }>({
          mode: "explain_simple",
          text: `Concepto: "${label}"\nResumen: "${nodeSummary}"`,
        });
        setSimpleExplanation(result.explanation ?? String(result));
      } catch {
        toast({ title: "Error", description: "No se pudo generar la explicación.", variant: "destructive" });
      } finally {
        setLoadingExplain(false);
      }
    },
    [toast]
  );

  const handleNodeSelect = useCallback((id: string) => {
    setSelectedNodeId(id);
    setSimpleExplanation(null);
  }, []);

  return (
    <AppShell title="Mi Mapa Mental">
      {summary ? (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold tracking-tight truncate">{summary.title}</h1>
              <p className="text-sm text-muted-foreground mt-1 font-edu line-clamp-2">{summary.overview}</p>
            </div>
          </div>

          {/* Canvas + Details Panel */}
          <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
            {/* React Flow Canvas */}
            <ReactFlowCanvas
              summary={summary}
              externalActiveId={activeNodeId}
              onNodeSelect={handleNodeSelect}
              onExplainSimple={handleExplainSimple}
            />

            {/* Node Details Panel */}
            {selectedNode && (
              <div className="space-y-3 h-fit">
                {/* Node header */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn("h-3 w-3 rounded-full shrink-0", nodeBgClass[selectedIndex % 7])}
                    />
                    <div className="text-sm font-semibold truncate">{selectedNode.label}</div>
                  </div>
                  <p className="text-xs text-muted-foreground font-edu leading-relaxed">
                    {selectedNode.summary}
                  </p>
                </div>

                {/* Bullets */}
                {selectedNode.bullets?.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Puntos clave
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {selectedNode.bullets.map((b, i) => (
                        <li key={i} className="flex gap-2 items-start text-xs">
                          <span
                            className={cn("h-1.5 w-1.5 rounded-full mt-1.5 shrink-0", nodeBgClass[selectedIndex % 7])}
                          />
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mnemonic */}
                {selectedNode.mnemonic && (
                  <div className="rounded-2xl border border-border bg-accent/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-3.5 w-3.5 text-accent-foreground" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                        Mnemotecnia
                      </span>
                    </div>
                    <p className="text-xs text-foreground/80 font-edu italic">
                      {selectedNode.mnemonic}
                    </p>
                  </div>
                )}

              {/* Simple explanation */}
                {(loadingExplain || simpleExplanation) && (
                  <div className="rounded-2xl border border-primary/30 bg-accent/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-3.5 w-3.5 text-primary" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                        Explicación simple
                      </span>
                    </div>
                    {loadingExplain ? (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Generando explicación...
                      </div>
                    ) : (
                      <p className="text-xs text-foreground/80 font-edu leading-relaxed">
                        {simpleExplanation}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] font-mono border border-border">Scroll</kbd>
              zoom •
              <kbd className="px-1.5 py-0.5 rounded-md bg-muted text-[10px] font-mono border border-border">Drag</kbd>
              mover nodos • Haz clic en un nodo para ver detalles
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="relative mb-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-brand/15 to-brand-2/15 border border-border">
              <Network className="h-12 w-12 text-brand" />
            </div>
            <div className="absolute -top-2 -right-2 h-8 w-8 rounded-xl bg-gradient-to-br from-brand to-brand-2 flex items-center justify-center shadow-glow">
              <Sparkles className="h-4 w-4 text-brand-foreground" />
            </div>
          </div>
          <h2 className="text-xl font-bold">Aún no tienes un mapa mental</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm font-edu">
            Sube un PDF o texto para que la IA genere automáticamente tu mapa de conceptos interactivo con nodos arrastrables y tutor integrado
          </p>
          <Button asChild className="mt-6 bg-gradient-to-r from-brand to-brand-2 text-brand-foreground hover:opacity-90">
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
