import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  Network,
  GraduationCap,
  ShoppingBag,
  Crown,
  Menu,
  X,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/nuevo-estudio", icon: Upload, label: "Nuevo Estudio" },
  { to: "/mapa-mental", icon: Network, label: "Mi Mapa Mental" },
  { to: "/modo-examen", icon: GraduationCap, label: "Modo Examen" },
  { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { to: "/suscripcion", icon: Crown, label: "Suscripción" },
];

export function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button - always visible */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 h-10 w-10 rounded-xl bg-surface/80 backdrop-blur-sm shadow-soft border border-border/50 hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-soft">
                  <Brain className="h-5 w-5 text-brand-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight">NeuroFlow</h1>
                  <p className="text-xs text-muted-foreground">Aprende con IA</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg hover:bg-sidebar-accent"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                    "text-sidebar-foreground/70 transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  activeClassName="bg-sidebar-primary/10 text-sidebar-primary hover:bg-sidebar-primary/15"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
              <div className="rounded-xl bg-gradient-to-r from-brand/10 to-brand-2/10 p-4">
                <p className="text-xs font-medium text-foreground">Plan Básico</p>
                <p className="text-xs text-muted-foreground mt-1">
                  3 mapas restantes este mes
                </p>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-gradient-to-r from-brand to-brand-2 hover:opacity-90 text-brand-foreground"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade a Pro
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
