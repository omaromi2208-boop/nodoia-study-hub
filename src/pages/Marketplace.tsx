import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, Star, ShoppingBag, Crown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const categories = [
  { name: "Biología", icon: "🧬", count: 24 },
  { name: "Historia", icon: "📜", count: 18 },
  { name: "Matemáticas", icon: "📐", count: 32 },
  { name: "Física", icon: "⚛️", count: 21 },
  { name: "Química", icon: "🧪", count: 19 },
  { name: "Literatura", icon: "📚", count: 15 },
];

const featured = [
  {
    title: "Pack EBAU Biología Completo",
    author: "Prof. García",
    rating: 4.9,
    reviews: 128,
    price: "14,99€",
    badge: "Bestseller",
  },
  {
    title: "Historia de España - Selectividad",
    author: "Academia Top",
    rating: 4.8,
    reviews: 95,
    price: "12,99€",
  },
  {
    title: "Matemáticas II - Todos los temas",
    author: "MatesPro",
    rating: 4.7,
    reviews: 76,
    price: "16,99€",
    badge: "Nuevo",
  },
];

export default function Marketplace() {
  return (
    <AppShell title="Marketplace">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Descubre mapas mentales creados por profesores y estudiantes
          </p>
        </div>

        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por tema, asignatura o autor..."
            className="pl-10 rounded-xl"
          />
        </div>

        <section>
          <h2 className="font-semibold mb-4">Categorías</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-border bg-card hover:border-brand hover:bg-accent transition-all"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count} packs</span>
              </motion.button>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Destacados</h2>
            <Button variant="ghost" size="sm">
              Ver todos
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-4 shadow-soft hover:shadow-card transition-shadow"
              >
                {item.badge && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand mb-3">
                    {item.badge === "Bestseller" && <Crown className="h-3 w-3" />}
                    {item.badge}
                  </span>
                )}

                <h3 className="font-semibold line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.author}</p>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({item.reviews} reseñas)
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold">{item.price}</span>
                  <Button size="sm" variant="hero">
                    <ShoppingBag className="h-4 w-4" />
                    Comprar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl bg-gradient-to-r from-brand to-brand-2 p-6 text-center text-brand-foreground"
        >
          <h3 className="text-lg font-semibold">¿Eres profesor o creador?</h3>
          <p className="text-sm opacity-90 mt-1">
            Vende tus mapas mentales y gana dinero compartiendo tu conocimiento
          </p>
          <Button variant="secondary" className="mt-4">
            <Users className="h-4 w-4" />
            Convertirme en creador
          </Button>
        </motion.div>
      </div>
    </AppShell>
  );
}
