import { useEffect, useMemo, useRef, useState } from "react";
import type { StudySummary } from "@/context/StudyContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Brain,
  Calendar,
  FlaskConical,
  Landmark,
  Microscope,
  Sigma,
} from "lucide-react";

type Pos = { x: number; y: number };

const nodeColorClass = [
  "bg-node-1",
  "bg-node-2",
  "bg-node-3",
  "bg-node-4",
  "bg-node-5",
  "bg-node-6",
  "bg-node-7",
];

const iconByIndex = [Brain, BookOpen, Microscope, Landmark, Sigma, Calendar, FlaskConical];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function NodeCanvas({ summary, externalActiveId }: { summary: StudySummary; externalActiveId?: string | null }) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [selectedId, setSelectedId] = useState<string>(summary.nodes[0]?.id ?? "");
  const selected = summary.nodes.find((n) => n.id === selectedId) ?? summary.nodes[0];

  // Viewport transform
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Pos>({ x: 0, y: 0 });

  const basePos = useMemo(() => {
    // A “Canva-ish” loose layout: center + orbit + slight jitter
    const cx = 520;
    const cy = 360;
    const r = 240;
    return new Map(
      summary.nodes.map((n, i) => {
        const a = (Math.PI * 2 * i) / summary.nodes.length - Math.PI / 2;
        const jitter = ((i % 2) * 2 - 1) * 26;
        return [
          n.id,
          {
            x: cx + Math.cos(a) * r + jitter,
            y: cy + Math.sin(a) * (r * 0.78) - jitter,
          },
        ] as const;
      }),
    );
  }, [summary.nodes]);

  const [pos, setPos] = useState<Record<string, Pos>>(() => {
    const o: Record<string, Pos> = {};
    basePos.forEach((p, id) => (o[id] = p));
    return o;
  });

  useEffect(() => {
    // reset positions when summary changes
    const o: Record<string, Pos> = {};
    basePos.forEach((p, id) => (o[id] = p));
    setPos(o);
    setSelectedId(summary.nodes[0]?.id ?? "");
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, [basePos, summary.nodes]);

  useEffect(() => {
    if (externalActiveId) setSelectedId(externalActiveId);
  }, [externalActiveId]);

  // Pan
  const panning = useRef<null | { start: Pos; startOffset: Pos }>(null);
  const onStagePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    // only pan when clicking the stage background
    if (e.target !== e.currentTarget) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    panning.current = {
      start: { x: e.clientX, y: e.clientY },
      startOffset: offset,
    };
  };
  const onStagePointerMove = (e: React.PointerEvent) => {
    if (!panning.current) return;
    const dx = e.clientX - panning.current.start.x;
    const dy = e.clientY - panning.current.start.y;
    setOffset({ x: panning.current.startOffset.x + dx, y: panning.current.startOffset.y + dy });
  };
  const onStagePointerUp = () => {
    panning.current = null;
  };

  // Zoom (wheel)
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const next = clamp(scale + (e.deltaY > 0 ? -0.08 : 0.08), 0.7, 1.7);
    setScale(next);
  };

  // Drag nodes
  const dragging = useRef<null | { id: string; start: Pos; startPos: Pos }>(null);
  const onNodeDown = (id: string) => (e: React.PointerEvent) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setSelectedId(id);
    dragging.current = {
      id,
      start: { x: e.clientX, y: e.clientY },
      startPos: pos[id] ?? { x: 0, y: 0 },
    };
  };
  const onNodeMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const { id, start, startPos } = dragging.current;
    const dx = (e.clientX - start.x) / scale;
    const dy = (e.clientY - start.y) / scale;
    setPos((p) => ({ ...p, [id]: { x: startPos.x + dx, y: startPos.y + dy } }));
  };
  const onNodeUp = () => {
    dragging.current = null;
  };

  const edges = useMemo(() => {
    return summary.edges
      .map((e) => {
        const a = pos[e.from];
        const b = pos[e.to];
        if (!a || !b) return null;
        // cubic bezier for elegant curved connections
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const c1 = { x: mx, y: a.y };
        const c2 = { x: mx, y: b.y };
        const d = `M ${a.x} ${a.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${b.x} ${b.y}`;
        return { key: `${e.from}-${e.to}`, d };
      })
      .filter(Boolean) as Array<{ key: string; d: string }>;
  }, [pos, summary.edges]);

  return (
    <section className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[20px] border border-border/60 bg-surface/40 backdrop-blur-xl shadow-soft">
        <div className="flex items-center justify-between gap-3 px-4 pt-4">
          <div>
            <div className="text-sm font-semibold">Lienzo de conceptos</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Arrastra nodos, haz zoom con trackpad/rueda y desplaza la pizarra.
            </p>
          </div>
          <div className="text-xs text-muted-foreground">Zoom: {(scale * 100).toFixed(0)}%</div>
        </div>

        <div
          ref={stageRef}
          className="relative mt-4 h-[440px] w-full touch-none overflow-hidden rounded-[20px] border border-border/50 bg-background/20"
          onPointerDown={onStagePointerDown}
          onPointerMove={onStagePointerMove}
          onPointerUp={onStagePointerUp}
          onPointerCancel={onStagePointerUp}
          onWheel={onWheel}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "0 0",
            }}
            onPointerMove={onNodeMove}
            onPointerUp={onNodeUp}
            onPointerCancel={onNodeUp}
          >
            <svg
              width={1040}
              height={720}
              viewBox="0 0 1040 720"
              className="absolute left-0 top-0"
            >
              <defs>
                <linearGradient id="edgeGlow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="hsl(var(--brand))" stopOpacity="0.55" />
                  <stop offset="1" stopColor="hsl(var(--brand-2))" stopOpacity="0.35" />
                </linearGradient>
              </defs>
              {edges.map((e) => (
                <path
                  key={e.key}
                  d={e.d}
                  fill="none"
                  stroke="url(#edgeGlow)"
                  strokeWidth={3}
                  strokeLinecap="round"
                  opacity={0.55}
                />
              ))}
            </svg>

            {summary.nodes.map((n, idx) => {
              const p = pos[n.id] ?? { x: 0, y: 0 };
              const Icon = iconByIndex[idx] ?? Brain;
              const isSel = n.id === selectedId;
              return (
                <button
                  key={n.id}
                  type="button"
                  onPointerDown={onNodeDown(n.id)}
                  onClick={() => setSelectedId(n.id)}
                  className={cn(
                    "absolute -translate-x-1/2 -translate-y-1/2",
                    "w-[220px] rounded-[20px] border border-border/60 bg-background/35 backdrop-blur-xl",
                    "px-3 py-3 text-left shadow-soft transition-transform",
                    isSel && "ring-1 ring-brand/40 shadow-elev",
                  )}
                  style={{ left: p.x, top: p.y }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ring-1 ring-border/60",
                        nodeColorClass[idx] ?? "bg-node-1",
                      )}
                    >
                      <Icon className="h-5 w-5 text-background" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{n.label}</div>
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{n.summary}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-[20px] border border-border/60 bg-surface/40 p-4 backdrop-blur-xl shadow-soft">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 h-10 w-10 shrink-0 rounded-2xl ring-1 ring-border/70",
              nodeColorClass[Math.max(0, summary.nodes.findIndex((n) => n.id === selected?.id))] ?? "bg-node-1",
            )}
          />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{selected?.label}</div>
            <p className="mt-1 text-xs text-muted-foreground">{selected?.summary}</p>
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {selected?.bullets?.map((b, i) => (
            <li key={i} className="rounded-[20px] border border-border/50 bg-background/25 px-3 py-2 text-sm">
              {b}
            </li>
          ))}
        </ul>

        {selected?.mnemonic ? (
          <div className="mt-4 rounded-[20px] border border-border/50 bg-background/25 px-3 py-2">
            <div className="text-xs font-semibold text-muted-foreground">Mnemotecnia</div>
            <div className="text-sm">{selected.mnemonic}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
