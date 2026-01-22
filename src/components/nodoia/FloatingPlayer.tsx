import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useStudy } from "@/context/StudyContext";

function buildTtsText(summary: NonNullable<ReturnType<typeof useStudy>["summary"]>) {
  const nodes = summary.nodes
    .map((n, i) => {
      const bullets = n.bullets.map((b) => `- ${b}`).join("\n");
      return `Nodo ${i + 1}: ${n.label}. ${n.summary}\n${bullets}\nMnemotecnia: ${n.mnemonic}`;
    })
    .join("\n\n");
  return `${summary.title}\n\n${summary.overview}\n\n${nodes}`;
}

export function FloatingPlayer() {
  const { summary, isSpeaking, setIsSpeaking, setActiveNodeId } = useStudy();
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<number | null>(null);

  const text = useMemo(() => {
    if (!summary) return "";
    return buildTtsText(summary);
  }, [summary]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const stop = () => {
    window.speechSynthesis.cancel();
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
    setIsSpeaking(false);
    setActiveNodeId(null);
  };

  const speak = () => {
    if (!summary || !text) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 1;
    u.onend = () => stop();
    u.onerror = () => stop();

    setIsSpeaking(true);

    // Simple “sync”: cycle highlight across the 7 nodes while speaking.
    let i = 0;
    setActiveNodeId(summary.nodes[0]?.id ?? null);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      if (!summary.nodes.length) return;
      i = (i + 1) % summary.nodes.length;
      setActiveNodeId(summary.nodes[i]?.id ?? null);
    }, 2600);

    window.speechSynthesis.speak(u);
  };

  const pauseOrResume = () => {
    if (!isSpeaking) return;
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    else window.speechSynthesis.pause();
  };

  if (!summary) return null;

  return (
    <div className="fixed inset-x-0 bottom-2 z-50 px-3 md:bottom-4">
      <div
        className={cn(
          "mx-auto w-full max-w-3xl overflow-hidden rounded-[20px] border border-border/60",
          "bg-background/40 backdrop-blur-xl shadow-elev",
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/15 ring-1 ring-brand/25">
              <Volume2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{summary.title}</div>
              <div className="truncate text-xs text-muted-foreground">
                {isSpeaking ? "Reproduciendo…" : "Listo para escuchar"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="hero" size="sm" onClick={(e) => (e.preventDefault(), speak())} disabled={isSpeaking}>
              <Play className="h-4 w-4" />
              Play
            </Button>
            <Button
              variant="glass"
              size="sm"
              onClick={(e) => (e.preventDefault(), pauseOrResume())}
              disabled={!isSpeaking}
            >
              <Pause className="h-4 w-4" />
              Pausa
            </Button>
            <Button variant="soft" size="sm" onClick={(e) => (e.preventDefault(), stop())} disabled={!isSpeaking}>
              <Square className="h-4 w-4" />
              Stop
            </Button>
          </div>
        </button>

        {expanded ? (
          <div className="border-t border-border/60 px-4 py-3">
            <div className="text-xs text-muted-foreground">
              Consejo: mientras escuchas, el mapa resalta nodos automáticamente.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
