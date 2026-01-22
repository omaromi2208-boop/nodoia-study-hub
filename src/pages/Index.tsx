import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/nodoia/ThemeToggle";
import { Brain, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-nodoia-veil">
      <div className="absolute inset-0 opacity-80 bg-nodoia-grid" />
      <div className="relative">
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/35 backdrop-blur-xl">
          <div className="container flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-brand/15 ring-1 ring-brand/25 shadow-elev">
                <Brain className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold tracking-wide">NodoIA</div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="container px-4 py-10">
          <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div className="animate-fade-up">
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Estudia con mapas visuales,
                <span className="text-brand"> estilo Canva</span>.
              </h1>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
                Sube un PDF y consigue un resumen premium en 7 nodos, un lienzo interactivo y un modo examen
                diseñado para ayudarte a mejorar.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="hero" className="rounded-[20px]">
                  <NavLink to="/dashboard">
                    <Sparkles className="h-4 w-4" /> Empezar ahora
                  </NavLink>
                </Button>
                <Button asChild variant="glass" className="rounded-[20px]">
                  <NavLink to="/marketplace">Ver packs</NavLink>
                </Button>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "7", v: "Nodos clave" },
                  { k: "1", v: "Lienzo" },
                  { k: "5", v: "Preguntas" },
                ].map((m) => (
                  <div
                    key={m.v}
                    className="rounded-[20px] border border-border/60 bg-surface/40 p-4 backdrop-blur-xl shadow-soft"
                  >
                    <div className="text-2xl font-semibold">{m.k}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up">
              <div className="rounded-[20px] border border-border/60 bg-surface/40 p-5 backdrop-blur-xl shadow-elev">
                <div className="text-sm font-semibold">Tu estudio, más claro</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Un resumen visual que puedes arrastrar, explorar y escuchar.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {[
                    { t: "Biología", c: "bg-node-3" },
                    { t: "Historia", c: "bg-node-4" },
                    { t: "Economía", c: "bg-node-2" },
                    { t: "Lengua", c: "bg-node-6" },
                  ].map((s) => (
                    <div
                      key={s.t}
                      className="rounded-[20px] border border-border/50 bg-background/25 p-3"
                    >
                      <div className={"h-10 w-10 rounded-2xl ring-1 ring-border/60 " + s.c} />
                      <div className="mt-3 text-sm font-semibold">{s.t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Packs + nodos</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
