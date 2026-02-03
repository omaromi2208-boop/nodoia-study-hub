import { PropsWithChildren, useEffect, useRef } from "react";
import { CollapsibleSidebar } from "@/components/neuroflow/CollapsibleSidebar";
import { ThemeToggle } from "@/components/nodoia/ThemeToggle";
import { FloatingPlayer } from "@/components/nodoia/FloatingPlayer";
import { AiTutorChat } from "@/components/neuroflow/AiTutorChat";
import { Brain } from "lucide-react";

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
    };

    const onMove = (ev: PointerEvent) => set(ev.clientX, ev.clientY);
    set(window.innerWidth * 0.5, window.innerHeight * 0.3);

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-background bg-neuro-glow">
      <CollapsibleSidebar />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between px-4 pl-16">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2">
              <Brain className="h-4 w-4 text-brand-foreground" />
            </div>
            <div className="leading-none">
              <div className="text-sm font-semibold tracking-tight">NeuroFlow</div>
              <div className="text-[11px] text-muted-foreground">{title}</div>
            </div>
          </div>

          <ThemeToggle />
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
