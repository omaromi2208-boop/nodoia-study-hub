import { PropsWithChildren, useEffect, useRef } from "react";
import { SidebarNav } from "@/components/nodoia/SidebarNav";
import { BottomNav } from "@/components/nodoia/BottomNav";
import { ThemeToggle } from "@/components/nodoia/ThemeToggle";
import { FloatingPlayer } from "@/components/nodoia/FloatingPlayer";

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
    // Default center-ish
    set(window.innerWidth * 0.55, window.innerHeight * 0.25);

    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="min-h-screen bg-background bg-nodoia-veil">
      <div className="absolute inset-0 opacity-80 bg-nodoia-grid" />
      <div className="relative">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/35 backdrop-blur-xl supports-[backdrop-filter]:bg-background/35">
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-2xl bg-brand/15 ring-1 ring-brand/25 shadow-elev" />
              <div className="leading-none">
                <div className="text-sm font-semibold tracking-wide">NodoIA</div>
                <div className="text-[11px] text-muted-foreground">{title}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="container grid grid-cols-1 gap-5 px-4 pb-28 pt-5 md:grid-cols-[260px_1fr] md:pb-10">
          <aside className="hidden md:block">
            <SidebarNav />
          </aside>
          <main className="min-w-0">{children}</main>
        </div>

        <FloatingPlayer />

        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
