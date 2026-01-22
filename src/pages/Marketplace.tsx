import { AppShell } from "@/components/nodoia/AppShell";
import { Button } from "@/components/ui/button";

const packs = [
  { title: "Historia EBAU", desc: "Esquemas + test + fechas clave", price: "9,90€" },
  { title: "Biología", desc: "Procesos, dibujos guía y términos", price: "8,90€" },
  { title: "Economía", desc: "Modelos y ejercicios tipo", price: "7,90€" },
];

export default function Marketplace() {
  return (
    <AppShell title="Marketplace">
      <h1 className="text-lg font-semibold">Marketplace</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Packs de estudio (solo contenido, sin suscripciones aquí).
      </p>

      <div className="mt-4 grid gap-3">
        {packs.map((p) => (
          <article
            key={p.title}
            className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{p.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.desc}</div>
              </div>
              <div className="text-sm font-semibold">{p.price}</div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="glass" size="sm">Ver temario</Button>
              <Button variant="hero" size="sm">Comprar</Button>
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
