import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { extractPdfText } from "@/lib/pdf/extractPdfText";
import { useStudy, type StudySummary } from "@/context/StudyContext";
import { nodoiaAi } from "@/lib/nodoia/ai";
import { UploadProgress } from "@/components/neuroflow/UploadProgress";
import { Upload, FileText, Sparkles } from "lucide-react";
import { toast } from "sonner";

type Stage = "extracting" | "analyzing" | "generating" | "complete";

export default function NewStudy() {
  const { setPdf, setSummary } = useStudy();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stage, setStage] = useState<Stage>("extracting");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string>("");

  const onPickPdf = async (file: File) => {
    setIsProcessing(true);
    setFileName(file.name);
    setStage("extracting");
    setProgress(0);

    try {
      // Simulate extraction progress
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 5, 30));
      }, 100);

      const text = await extractPdfText(file);
      clearInterval(progressInterval);
      setProgress(35);

      setPdf({ name: file.name, text });

      // Analyzing stage
      setStage("analyzing");
      const analyzeInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 3, 65));
      }, 150);

      // Call AI
      setStage("generating");
      clearInterval(analyzeInterval);
      const generateInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 2, 95));
      }, 200);

      const result = await nodoiaAi<StudySummary>({ mode: "summary", text });
      clearInterval(generateInterval);

      setSummary(result);
      setProgress(100);
      setStage("complete");

      toast.success("¡Mapa generado con éxito!");

      // Auto-redirect after short delay
      setTimeout(() => {
        navigate("/mapa-mental");
      }, 1500);
    } catch (e) {
      setIsProcessing(false);
      toast.error(e instanceof Error ? e.message : "Error al procesar el PDF");
    }
  };

  return (
    <AppShell title="Nuevo Estudio">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Sube tu material de estudio</h1>
          <p className="text-muted-foreground">
            Carga un PDF y la IA creará automáticamente tu mapa mental
          </p>
        </div>

        {isProcessing ? (
          <UploadProgress stage={stage} progress={progress} fileName={fileName} />
        ) : (
          <div className="space-y-4">
            {/* Upload zone */}
            <label className="group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card p-12 transition-all hover:border-brand hover:bg-accent/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand-2/10 mb-4 group-hover:scale-105 transition-transform">
                <Upload className="h-8 w-8 text-brand" />
              </div>
              <p className="text-sm font-medium">Arrastra tu PDF aquí</p>
              <p className="text-xs text-muted-foreground mt-1">o haz clic para seleccionar</p>
              <input
                type="file"
                accept="application/pdf"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void onPickPdf(f);
                }}
              />
            </label>

            {/* Tips */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand" />
                Consejos para mejores resultados
              </h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/70" />
                  PDFs con texto seleccionable funcionan mejor que imágenes escaneadas
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/70" />
                  Máximo recomendado: 50 páginas para resultados óptimos
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 mt-0.5 text-muted-foreground/70" />
                  Contenido estructurado (capítulos, secciones) genera mejores mapas
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
