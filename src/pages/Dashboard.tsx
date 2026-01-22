import { useState } from "react";
import { AppShell } from "@/components/nodoia/AppShell";
import { Button } from "@/components/ui/button";
import { extractPdfText } from "@/lib/pdf/extractPdfText";
import { useStudy, type StudySummary } from "@/context/StudyContext";
import { nodoiaAi } from "@/lib/nodoia/ai";
import { NodeMap } from "@/components/nodoia/NodeMap";
import { FileUp, Sparkles } from "lucide-react";

export default function Dashboard() {
  const { pdfName, extractedText, summary, setPdf, setSummary } = useStudy();
  const [isParsing, setIsParsing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onPickPdf = async (file: File) => {
    setIsParsing(true);
    try {
      const text = await extractPdfText(file);
      setPdf({ name: file.name, text });
    } finally {
      setIsParsing(false);
    }
  };

  const onGenerate = async () => {
    if (!extractedText) return;
    setIsGenerating(true);
    setErrorMsg(null);
    try {
      const result = await nodoiaAi<StudySummary>({ mode: "summary", text: extractedText });
      setSummary(result);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "No se pudo generar el resumen.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AppShell title="Dashboard">
      <div className="grid gap-4">
        <section className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold">Sube tu PDF</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                NodoIA extrae el texto y genera un resumen en 7 nodos + mapa interactivo.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            <label className="group relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/20 px-4 py-4 transition-colors hover:bg-background/30">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent ring-1 ring-border/70">
                  <FileUp className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Seleccionar PDF</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {pdfName ? pdfName : "Máx. recomendado: 25 páginas para móvil"}
                  </div>
                </div>
              </div>
              <input
                type="file"
                accept="application/pdf"
                className="absolute inset-0 opacity-0"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onPickPdf(f);
                }}
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <div className="text-xs text-muted-foreground">
                {isParsing
                  ? "Extrayendo texto…"
                  : extractedText
                    ? `Texto listo (${extractedText.length.toLocaleString()} caracteres)`
                    : "Sin PDF cargado"}
              </div>
              <Button
                variant="hero"
                disabled={!extractedText || isParsing || isGenerating}
                onClick={() => void onGenerate()}
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Generando…" : "Generar resumen"}
              </Button>
            </div>
            {errorMsg ? (
              <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs">
                {errorMsg}
              </div>
            ) : null}
          </div>
        </section>

        {summary ? (
          <section className="animate-fade-up">
            <div className="mb-3">
              <div className="text-xs font-semibold tracking-wide text-muted-foreground">Resumen</div>
              <div className="text-lg font-semibold">{summary.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{summary.overview}</p>
            </div>
            <NodeMap summary={summary} />
          </section>
        ) : (
          <section className="rounded-2xl border border-border/70 bg-surface/40 p-4 backdrop-blur shadow-soft">
            <div className="text-sm font-semibold">Aún no hay resumen</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Sube un PDF y pulsa “Generar resumen”.
            </p>
          </section>
        )}
      </div>
    </AppShell>
  );
}
