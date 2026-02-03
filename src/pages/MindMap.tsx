import { AppShell } from "@/components/neuroflow/AppShell";
import { useStudy } from "@/context/StudyContext";
import { NodeCanvas } from "@/components/nodoia/NodeCanvas";
import { Button } from "@/components/ui/button";
import { Upload, Network } from "lucide-react";
import { Link } from "react-router-dom";

export default function MindMap() {
  const { summary, activeNodeId } = useStudy();

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

          {/* Canvas */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
            <NodeCanvas summary={summary} externalActiveId={activeNodeId} />
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
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand-2/10 mb-6">
            <Network className="h-10 w-10 text-brand" />
          </div>
          <h2 className="text-lg font-semibold">Aún no tienes un mapa mental</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Sube un PDF o texto para que la IA genere automáticamente tu mapa de conceptos interactivo
          </p>
          <Button asChild className="mt-6 bg-gradient-to-r from-brand to-brand-2 hover:opacity-90">
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
