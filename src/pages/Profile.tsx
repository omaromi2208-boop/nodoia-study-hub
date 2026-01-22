import { AppShell } from "@/components/nodoia/AppShell";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Novo",
    price: "4,99€/mes",
    perks: ["Resúmenes ilimitados", "Modo Examen", "Audiolibros"],
  },
  {
    name: "Apro",
    price: "9,99€/mes",
    perks: ["Todo en Novo", "Packs incluidos", "Prioridad en generación"],
  },
];

export default function Profile() {
  return (
    <AppShell title="Perfil">
      <h1 className="text-lg font-semibold">Perfil</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Aquí aparecen los planes de suscripción.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {plans.map((p) => (
          <section key={p.name} className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
            <div className="flex items-baseline justify-between gap-3">
              <div className="text-sm font-semibold">{p.name}</div>
              <div className="text-sm font-semibold">{p.price}</div>
            </div>
            <ul className="mt-3 space-y-2">
              {p.perks.map((perk) => (
                <li key={perk} className="rounded-xl border border-border/60 bg-background/20 px-3 py-2 text-sm">
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <Button variant="glass" size="sm">Detalles</Button>
              <Button variant="hero" size="sm">Elegir {p.name}</Button>
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
