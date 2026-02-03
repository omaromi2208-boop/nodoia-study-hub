import { motion } from "framer-motion";
import { FileText, Sparkles, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Stage = "extracting" | "analyzing" | "generating" | "complete";

type UploadProgressProps = {
  stage: Stage;
  progress: number;
  fileName?: string;
};

const stageInfo: Record<Stage, { label: string; icon: React.ElementType }> = {
  extracting: { label: "Extrayendo texto del PDF...", icon: FileText },
  analyzing: { label: "Analizando contenido con IA...", icon: Sparkles },
  generating: { label: "Generando mapa de nodos...", icon: Sparkles },
  complete: { label: "¡Mapa generado con éxito!", icon: CheckCircle2 },
};

export function UploadProgress({ stage, progress, fileName }: UploadProgressProps) {
  const info = stageInfo[stage];
  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={stage === "complete" ? { scale: [1, 1.1, 1] } : { rotate: stage !== "extracting" ? 360 : 0 }}
            transition={
              stage === "complete"
                ? { duration: 0.3 }
                : { repeat: Infinity, duration: 2, ease: "linear" }
            }
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-2xl",
              stage === "complete"
                ? "bg-green-500/10"
                : "bg-gradient-to-br from-brand/10 to-brand-2/10"
            )}
          >
            <Icon
              className={cn(
                "h-8 w-8",
                stage === "complete" ? "text-green-500" : "text-brand"
              )}
            />
          </motion.div>
        </div>

        {/* File name */}
        {fileName && (
          <p className="text-center text-xs text-muted-foreground mb-2 truncate">
            {fileName}
          </p>
        )}

        {/* Stage label */}
        <p className="text-center text-sm font-medium mb-4">{info.label}</p>

        {/* Progress bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-center text-xs text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}
