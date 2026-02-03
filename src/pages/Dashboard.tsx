import { AppShell } from "@/components/neuroflow/AppShell";
import { useStudy } from "@/context/StudyContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Network, GraduationCap, BookOpen, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { summary, pdfName } = useStudy();

  const stats = [
    { label: "Mapas creados", value: summary ? "1" : "0", icon: Network },
    { label: "Tiempo de estudio", value: "0h", icon: Clock },
    { label: "Exámenes completados", value: "0", icon: GraduationCap },
  ];

  return (
    <AppShell title="Dashboard">
      <div className="space-y-6">
        {/* Welcome section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-soft"
        >
          <h1 className="text-xl font-semibold tracking-tight">
            ¡Bienvenido a NeuroFlow!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tu asistente de estudio con inteligencia artificial
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="hero">
              <Link to="/nuevo-estudio">
                <Upload className="h-4 w-4" />
                Nuevo estudio
              </Link>
            </Button>
            {summary && (
              <Button asChild variant="outline">
                <Link to="/mapa-mental">
                  <Network className="h-4 w-4" />
                  Ver mi mapa
                </Link>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-4 shadow-soft"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
                  <stat.icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current document */}
        {summary ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <BookOpen className="h-6 w-6 text-brand" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold">{summary.title}</h3>
                <p className="text-sm text-muted-foreground truncate">{pdfName}</p>
                <p className="text-xs text-muted-foreground mt-1 font-edu line-clamp-2">
                  {summary.overview}
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/mapa-mental">Ver mapa</Link>
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 mx-auto mb-3">
              <TrendingUp className="h-7 w-7 text-brand" />
            </div>
            <h3 className="font-medium">Comienza tu viaje de aprendizaje</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sube tu primer documento para crear un mapa mental interactivo
            </p>
            <Button asChild variant="hero" className="mt-4">
              <Link to="/nuevo-estudio">
                <Upload className="h-4 w-4" />
                Subir PDF
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
