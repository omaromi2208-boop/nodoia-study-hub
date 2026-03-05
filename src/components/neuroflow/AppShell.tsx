import { PropsWithChildren, useEffect, useRef } from "react";
import { CollapsibleSidebar } from "@/components/neuroflow/CollapsibleSidebar";
import { ThemeToggle } from "@/components/nodoia/ThemeToggle";
import { FloatingPlayer } from "@/components/nodoia/FloatingPlayer";
import { AiTutorChat } from "@/components/neuroflow/AiTutorChat";
import { PomodoroTimer } from "@/components/neuroflow/PomodoroTimer";

// Synaptic logo mark
function NeuroLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NeuroFlow logo">
      <circle cx="14" cy="14" r="3.5" fill="white" fillOpacity="0.95" />
      <circle cx="6" cy="8" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="22" cy="8" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="6" cy="20" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="22" cy="20" r="2.5" fill="white" fillOpacity="0.8" />
      <line x1="14" y1="14" x2="6" y2="8" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="22" y2="8" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="6" y2="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="22" y2="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="8" x2="22" y2="8" stroke="white" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
      <line x1="6" y1="20" x2="22" y2="20" stroke="white" strokeOpacity="0.35" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
    </svg>
  );
}

export function AppShell({ title, children }: PropsWithChildren<{ title: string }>) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = (x: number, y: number) => {
      const rect = el.getBoundingClientRect();
      const mx = ((x - rect.left) / rect.width) * 100;
      const my = ((y - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${mx.toFixed(2)}%`);
      el.style.setProperty("--my", `${my.toFixed(2)}%`);
      // Second glow offset
      el.style.setProperty("--mx2", `${(100 - mx).toFixed(2)}%`);
      el.style.setProperty("--my2", `${(100 - my * 0.4).toFixed(2)}%`);
    };

    const onMove = (ev: PointerEvent) => set(ev.clientX, ev.clientY);
    set(window.innerWidth * 0.3, window.innerHeight * 0.2);

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-background bg-neuro-glow">
      <CollapsibleSidebar />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between px-4 pl-16">
          <div className="flex items-center gap-3">
            {/* New synaptic logo */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-soft">
              <NeuroLogo />
            </div>
            <div className="leading-none">
              <div className="text-[15px] font-bold tracking-tight text-gradient">NeuroFlow</div>
              <div className="text-[10px] text-muted-foreground font-medium">{title}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PomodoroTimer />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container px-4 py-6">
        {children}
      </main>

      {/* Floating components */}
      <FloatingPlayer />
      <AiTutorChat />
    </div>
  );
}
