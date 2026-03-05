import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORK_MINS = 25;
const BREAK_MINS = 5;

type Mode = "work" | "break";

export function PomodoroTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("work");
  const [seconds, setSeconds] = useState(WORK_MINS * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = mode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(mode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60);
  }, [mode]);

  const switchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setRunning(false);
    setSeconds(newMode === "work" ? WORK_MINS * 60 : BREAK_MINS * 60);
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            if (mode === "work") {
              setSessions((n) => n + 1);
              switchMode("break");
            } else {
              switchMode("work");
            }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, mode, switchMode]);

  // Ring stroke math for SVG circle (r=18, circumference ≈ 113)
  const circumference = 2 * Math.PI * 18;
  const strokeOffset = circumference * (1 - progress / 100);

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        title="Pomodoro timer"
        className={cn(
          "relative flex h-9 w-9 items-center justify-center rounded-xl transition-all",
          "border border-border/60 bg-surface/80 hover:bg-accent hover:border-border",
          "text-muted-foreground hover:text-foreground",
          running && "border-primary/50 bg-primary/5 text-primary animate-pulse-soft"
        )}
      >
        {/* Mini ring */}
        <svg className="absolute inset-0" width="36" height="36" viewBox="0 0 36 36">
          <circle
            cx="18" cy="18" r="15"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="2"
          />
          {running && (
            <circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="hsl(var(--brand))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s linear" }}
            />
          )}
        </svg>
        <Coffee className="h-4 w-4 relative z-10" />
      </button>

      {/* Popover panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className={cn(
            "absolute right-0 top-11 z-50 w-64 rounded-2xl border border-border bg-card shadow-card",
            "p-4 animate-fade-in"
          )}>
            {/* Mode tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-muted mb-4">
              {(["work", "break"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-medium transition-all",
                    mode === m
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {m === "work" ? "🎯 Estudio" : "☕ Descanso"}
                </button>
              ))}
            </div>

            {/* Timer ring */}
            <div className="flex justify-center mb-4">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle
                    cx="60" cy="60" r="50"
                    fill="none"
                    stroke={mode === "work" ? "hsl(var(--brand))" : "hsl(var(--brand-2))"}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 50}
                    strokeDashoffset={2 * Math.PI * 50 * (1 - progress / 100)}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold tabular-nums">
                    {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {mode === "work" ? "enfocado" : "descansando"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sessions */}
            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    i < (sessions % 4)
                      ? "bg-brand"
                      : "bg-muted"
                  )}
                />
              ))}
              <span className="ml-1 text-[10px] text-muted-foreground self-center">
                {sessions} sesiones
              </span>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                onClick={() => setRunning((r) => !r)}
                className={cn(
                  "flex-1",
                  mode === "work"
                    ? "bg-gradient-to-r from-brand to-brand-2 text-brand-foreground hover:opacity-90"
                    : "bg-gradient-to-r from-brand-2 to-brand text-brand-foreground hover:opacity-90"
                )}
                size="sm"
              >
                {running ? <><Pause className="h-3.5 w-3.5" /> Pausar</> : <><Play className="h-3.5 w-3.5" /> Iniciar</>}
              </Button>
              <Button
                onClick={reset}
                variant="outline"
                size="sm"
                className="w-9 px-0 rounded-xl"
                title="Reiniciar"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
