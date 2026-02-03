import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Básico",
    price: "Gratis",
    description: "Perfecto para empezar",
    features: [
      "3 mapas mentales al mes",
      "Modo examen básico",
      "Soporte por email",
    ],
    cta: "Plan actual",
    current: true,
  },
  {
    name: "Pro",
    price: "9,99€",
    period: "/mes",
    description: "Para estudiantes serios",
    features: [
      "Mapas mentales ilimitados",
      "Tutor IA avanzado",
      "Modo gimnasio con audio",
      "Historial de exámenes",
      "Exportar a PDF",
      "Soporte prioritario",
    ],
    cta: "Upgrade a Pro",
    popular: true,
  },
  {
    name: "Team",
    price: "24,99€",
    period: "/mes",
    description: "Para grupos de estudio",
    features: [
      "Todo en Pro",
      "Hasta 5 miembros",
      "Mapas compartidos",
      "Estadísticas de equipo",
      "API access",
    ],
    cta: "Contactar ventas",
  },
];

export default function Subscription() {
  return (
    <AppShell title="Suscripción">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Elige tu plan</h1>
          <p className="text-muted-foreground">
            Desbloquea todo el potencial de NeuroFlow
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl border bg-card p-6 shadow-soft",
                plan.popular && "border-brand ring-2 ring-brand/20"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand to-brand-2 px-3 py-1 text-xs font-medium text-brand-foreground">
                    <Sparkles className="h-3 w-3" />
                    Popular
                  </span>
                </div>
              )}

              <div className="space-y-4">
                {/* Plan header */}
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {plan.name === "Pro" && <Crown className="h-4 w-4 text-brand" />}
                    {plan.name === "Team" && <Zap className="h-4 w-4 text-brand" />}
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 mt-0.5 text-brand shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={cn(
                    "w-full",
                    plan.popular
                      ? "bg-gradient-to-r from-brand to-brand-2 hover:opacity-90 text-brand-foreground"
                      : plan.current
                        ? "bg-muted text-muted-foreground cursor-default"
                        : ""
                  )}
                  variant={plan.current ? "secondary" : plan.popular ? "default" : "outline"}
                  disabled={plan.current}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="font-semibold mb-4">Preguntas frecuentes</h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div>
              <p className="font-medium">¿Puedo cancelar en cualquier momento?</p>
              <p className="text-muted-foreground mt-1">
                Sí, puedes cancelar tu suscripción cuando quieras sin penalización.
              </p>
            </div>
            <div>
              <p className="font-medium">¿Qué métodos de pago aceptan?</p>
              <p className="text-muted-foreground mt-1">
                Aceptamos tarjetas de crédito/débito y PayPal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
