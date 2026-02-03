import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/nodoia/ThemeToggle";
import { Brain, Sparkles, Network, GraduationCap, MessageCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Network,
    title: "Mapas Mentales con IA",
    desc: "Sube un PDF y genera automáticamente un mapa de conceptos interactivo",
  },
  {
    icon: GraduationCap,
    title: "Modo Examen Inteligente",
    desc: "Preguntas personalizadas con feedback motivador y progreso visual",
  },
  {
    icon: MessageCircle,
    title: "Tutor IA Integrado",
    desc: "Pregunta dudas sobre tu documento y recibe respuestas contextuales",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2">
              <Brain className="h-5 w-5 text-brand-foreground" />
            </div>
            <span className="text-lg font-semibold tracking-tight">NeuroFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="hero" size="sm">
              <NavLink to="/dashboard">Empezar</NavLink>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="container px-4 py-16 md:py-24">
        <section className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              <Sparkles className="h-3 w-3" />
              Potenciado por IA
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
              Estudia de forma
              <span className="bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent"> inteligente</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Transforma cualquier PDF en mapas mentales interactivos, exámenes personalizados y sesiones de estudio guiadas por inteligencia artificial.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <NavLink to="/dashboard">
                  <Sparkles className="h-4 w-4" />
                  Empezar gratis
                </NavLink>
              </Button>
              <Button asChild size="lg" variant="outline">
                <NavLink to="/marketplace">
                  Ver marketplace
                  <ArrowRight className="h-4 w-4" />
                </NavLink>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="mt-24 grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-card transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <f.icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 rounded-2xl bg-gradient-to-r from-brand to-brand-2 p-8 text-center text-brand-foreground"
        >
          <h2 className="text-2xl font-bold">Tu estudio, más eficiente</h2>
          <p className="mt-2 opacity-90">Todo lo que necesitas para dominar cualquier tema</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { value: "7", label: "Nodos por mapa" },
              { value: "5", label: "Preguntas por examen" },
              { value: "∞", label: "Preguntas al tutor" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="mt-1 text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl font-bold">¿Listo para empezar?</h2>
          <p className="mt-2 text-muted-foreground">
            Sube tu primer PDF y descubre una nueva forma de estudiar
          </p>
          <Button asChild size="lg" variant="hero" className="mt-6">
            <NavLink to="/nuevo-estudio">
              <Sparkles className="h-4 w-4" />
              Subir mi primer PDF
            </NavLink>
          </Button>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 NeuroFlow. Estudia con inteligencia.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
