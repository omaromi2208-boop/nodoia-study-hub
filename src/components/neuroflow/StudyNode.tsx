import { memo, useCallback, useRef, useState } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  Calendar,
  FlaskConical,
  Landmark,
  Microscope,
  Sigma,
  Play,
  Square,
  Lightbulb,
  Loader2,
} from "lucide-react";

export type StudyNodeData = {
  label: string;
  summary: string;
  index: number;
  isActive?: boolean;
  isSelected?: boolean;
  onExplainSimple?: (label: string, summary: string) => void;
};

// Each node gets a distinct color pair: [bg-light, bg-dark, text, border]
const nodeStyles = [
  { bg: "bg-[hsl(258_80%_62%)]", ring: "ring-[hsl(258_80%_62%/0.4)]", dot: "bg-[hsl(258_80%_62%)]" },
  { bg: "bg-[hsl(172_65%_42%)]", ring: "ring-[hsl(172_65%_42%/0.4)]", dot: "bg-[hsl(172_65%_42%)]" },
  { bg: "bg-[hsl(199_89%_48%)]", ring: "ring-[hsl(199_89%_48%/0.4)]", dot: "bg-[hsl(199_89%_48%)]" },
  { bg: "bg-[hsl(142_70%_46%)]", ring: "ring-[hsl(142_70%_46%/0.4)]", dot: "bg-[hsl(142_70%_46%)]" },
  { bg: "bg-[hsl(38_92%_52%)]",  ring: "ring-[hsl(38_92%_52%/0.4)]",  dot: "bg-[hsl(38_92%_52%)]"  },
  { bg: "bg-[hsl(0_80%_60%)]",   ring: "ring-[hsl(0_80%_60%/0.4)]",   dot: "bg-[hsl(0_80%_60%)]"   },
  { bg: "bg-[hsl(320_80%_60%)]", ring: "ring-[hsl(320_80%_60%/0.4)]", dot: "bg-[hsl(320_80%_60%)]" },
];

const iconByIndex = [Brain, BookOpen, Microscope, Landmark, Sigma, Calendar, FlaskConical];

// Category labels for each icon slot
const categoryLabel = [
  "Conceptos",
  "Teoría",
  "Ciencia",
  "Historia",
  "Matemáticas",
  "Fechas",
  "Lab",
];

function getBestSpanishVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  // Prefer Google Español, then Apple Lucía/Monica, then any es-ES
  const preferred = [
    (v: SpeechSynthesisVoice) => v.lang === "es-ES" && v.name.toLowerCase().includes("google"),
    (v: SpeechSynthesisVoice) => v.lang === "es-ES" && (v.name.includes("Lucía") || v.name.includes("Lucia") || v.name.includes("Monica")),
    (v: SpeechSynthesisVoice) => v.lang === "es-ES",
    (v: SpeechSynthesisVoice) => v.lang.startsWith("es"),
  ];
  for (const test of preferred) {
    const match = voices.find(test);
    if (match) return match;
  }
  return null;
}

function StudyNodeComponent({ data, selected }: NodeProps) {
  const nodeData = data as StudyNodeData;
  const Icon = iconByIndex[nodeData.index % 7] ?? Brain;
  const style = nodeStyles[nodeData.index % 7];
  const category = categoryLabel[nodeData.index % 7];
  const isHighlighted = nodeData.isActive || nodeData.isSelected || selected;

  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const toggleAudio = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const text = `${nodeData.label}. ${nodeData.summary}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "es-ES";
      utterance.rate = 0.90;
      utterance.pitch = 1.05;
      utterance.volume = 1;

      // Try to use best available Spanish voice
      const speak = () => {
        const voice = getBestSpanishVoice();
        if (voice) utterance.voice = voice;
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      };

      // Voices may not be loaded yet
      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = speak;
      } else {
        speak();
      }
    },
    [isPlaying, nodeData.label, nodeData.summary]
  );

  const handleExplainSimple = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!nodeData.onExplainSimple) return;
      setLoadingExplain(true);
      nodeData.onExplainSimple(nodeData.label, nodeData.summary);
      setTimeout(() => setLoadingExplain(false), 1500);
    },
    [nodeData]
  );

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !opacity-0"
      />
      <div
        className={cn(
          "w-[230px] rounded-2xl",
          "bg-card border border-border/70",
          "shadow-soft transition-all duration-200",
          "hover:shadow-elev hover:-translate-y-0.5",
          isHighlighted && [
            "border-primary/50 shadow-elev",
            "ring-2",
            style.ring,
          ],
          nodeData.isActive && "animate-pulse-soft"
        )}
      >
        {/* Color accent bar */}
        <div className={cn("h-1 rounded-t-2xl", style.bg)} />

        <div className="px-3.5 pt-3 pb-2.5">
          {/* Header row */}
          <div className="flex items-start gap-2.5">
            {/* Icon */}
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl mt-0.5",
                style.bg
              )}
            >
              <Icon className="h-4 w-4 text-white" />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-0.5">
                {category}
              </div>
              <div className="text-[13px] font-semibold text-foreground leading-tight line-clamp-2">
                {nodeData.label}
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
            {nodeData.summary}
          </p>

          {/* Action buttons */}
          <div className="mt-2.5 flex gap-1.5">
            {/* TTS Button */}
            <button
              onClick={toggleAudio}
              title={isPlaying ? "Detener audio" : "Escuchar en voz alta"}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-[11px] font-medium",
                "transition-all duration-150 border",
                isPlaying
                  ? "bg-primary/10 border-primary/40 text-primary"
                  : "bg-muted/60 border-border/60 text-muted-foreground hover:bg-accent hover:text-foreground hover:border-primary/30"
              )}
            >
              {isPlaying ? (
                <><Square className="h-3 w-3 fill-current" /> Detener</>
              ) : (
                <><Play className="h-3 w-3 fill-current" /> Escuchar</>
              )}
            </button>

            {/* Explain Simple Button */}
            {nodeData.onExplainSimple && (
              <button
                onClick={handleExplainSimple}
                title="Explicación ultra-simple con analogía"
                disabled={loadingExplain}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 rounded-xl py-1.5 text-[11px] font-medium",
                  "transition-all duration-150 border",
                  "bg-muted/60 border-border/60 text-muted-foreground",
                  "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700",
                  "dark:hover:bg-amber-900/20 dark:hover:border-amber-600 dark:hover:text-amber-400",
                  "disabled:opacity-60"
                )}
              >
                {loadingExplain ? (
                  <><Loader2 className="h-3 w-3 animate-spin" /> Cargando</>
                ) : (
                  <><Lightbulb className="h-3 w-3" /> Simple</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !opacity-0"
      />
    </>
  );
}

export const StudyNode = memo(StudyNodeComponent);
