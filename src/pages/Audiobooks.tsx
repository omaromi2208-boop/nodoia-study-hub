import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/nodoia/AppShell";
import { Button } from "@/components/ui/button";
import { useStudy } from "@/context/StudyContext";
import { Pause, Play, Square } from "lucide-react";

export default function Audiobooks() {
  const { summary } = useStudy();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const text = useMemo(() => {
    if (!summary) return "";
    const nodes = summary.nodes
      .map((n, i) => {
        const bullets = n.bullets.map((b) => `- ${b}`).join("\n");
        return `Nodo ${i + 1}: ${n.label}. ${n.summary}\n${bullets}\nMnemotecnia: ${n.mnemonic}`;
      })
      .join("\n\n");
    return `${summary.title}\n\n${summary.overview}\n\n${nodes}`;
  }, [summary]);

  useEffect(() => {
    const onEnd = () => setIsSpeaking(false);
    window.speechSynthesis?.addEventListener?.("end", onEnd);
    return () => window.speechSynthesis?.removeEventListener?.("end", onEnd);
  }, []);

  const speak = () => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 1;
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const pauseOrResume = () => {
    if (!isSpeaking) return;
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    else window.speechSynthesis.pause();
  };

  return (
    <AppShell title="Audiolibros">
      <h1 className="text-lg font-semibold">Audiolibros</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Escucha el resumen con voz (TTS del dispositivo).
      </p>

      <div className="mt-4 rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
        {!summary ? (
          <div className="text-sm text-muted-foreground">
            Primero genera un resumen en el Dashboard.
          </div>
        ) : (
          <>
            <div className="text-sm font-semibold">{summary.title}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="hero" onClick={speak} disabled={isSpeaking}>
                <Play className="h-4 w-4" /> Reproducir
              </Button>
              <Button variant="glass" onClick={pauseOrResume} disabled={!isSpeaking}>
                <Pause className="h-4 w-4" /> Pausa/Continuar
              </Button>
              <Button variant="soft" onClick={stop} disabled={!isSpeaking}>
                <Square className="h-4 w-4" /> Detener
              </Button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Nota: la calidad y voces dependen del móvil/navegador.
            </p>
          </>
        )}
      </div>
    </AppShell>
  );
}
