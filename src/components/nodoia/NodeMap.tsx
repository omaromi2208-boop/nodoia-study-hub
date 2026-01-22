import { useMemo, useState } from "react";
import type { StudySummary } from "@/context/StudyContext";
import { cn } from "@/lib/utils";

const nodeColorClass = [
  "bg-node-1",
  "bg-node-2",
  "bg-node-3",
  "bg-node-4",
  "bg-node-5",
  "bg-node-6",
  "bg-node-7",
];

export function NodeMap({ summary }: { summary: StudySummary }) {
  const [selectedId, setSelectedId] = useState<string>(summary.nodes[0]?.id ?? "");
  const selected = summary.nodes.find((n) => n.id === selectedId) ?? summary.nodes[0];

  const positions = useMemo(() => {
    const cx = 160;
    const cy = 140;
    const r = 92;
    return summary.nodes.map((n, i) => {
      const a = (Math.PI * 2 * i) / summary.nodes.length - Math.PI / 2;
      return { id: n.id, x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
    });
  }, [summary.nodes]);

  const posById = useMemo(() => {
    const m = new Map<string, { x: number; y: number }>();
    positions.forEach((p) => m.set(p.id, { x: p.x, y: p.y }));
    return m;
  }, [positions]);

  return (
    <section className="grid gap-3 md:grid-cols-[360px_1fr]">
      <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
        <div className="text-sm font-semibold">Mapa de Nodos</div>
        <p className="mt-1 text-xs text-muted-foreground">
          Toca un nodo para ver su resumen y puntos clave.
        </p>

        <div className="mt-4 flex justify-center">
          <svg width="320" height="280" viewBox="0 0 320 280" className="max-w-full">
            {summary.edges.map((e, idx) => {
              const a = posById.get(e.from);
              const b = posById.get(e.to);
              if (!a || !b) return null;
              return (
                <g key={idx} opacity={0.75}>
                  <line
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke="hsl(var(--border))"
                    strokeWidth={2}
                  />
                </g>
              );
            })}

            {positions.map((p, idx) => {
              const isSel = p.id === selectedId;
              return (
                <g key={p.id}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSel ? 18 : 14}
                    fill={`hsl(var(--node-${idx + 1}))`}
                    opacity={isSel ? 0.95 : 0.8}
                    onClick={() => setSelectedId(p.id)}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 backdrop-blur shadow-soft">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 h-9 w-9 shrink-0 rounded-xl ring-1 ring-border/70",
              nodeColorClass[Math.max(0, summary.nodes.findIndex((n) => n.id === selected?.id))] ??
                "bg-node-1",
            )}
          />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{selected?.label}</div>
            <p className="mt-1 text-xs text-muted-foreground">{selected?.summary}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {selected?.bullets?.map((b, i) => (
            <li key={i} className="rounded-xl border border-border/60 bg-background/20 px-3 py-2 text-sm">
              {b}
            </li>
          ))}
        </ul>

        {selected?.mnemonic ? (
          <div className="mt-4 rounded-xl border border-border/60 bg-background/20 px-3 py-2">
            <div className="text-xs font-semibold text-muted-foreground">Mnemotecnia</div>
            <div className="text-sm">{selected.mnemonic}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
