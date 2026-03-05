import { useState } from "react";
import { NavLink } from "react-router-dom";
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

function SidebarLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="3.5" fill="white" fillOpacity="0.95" />
      <circle cx="6" cy="8" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="22" cy="8" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="6" cy="20" r="2.5" fill="white" fillOpacity="0.8" />
      <circle cx="22" cy="20" r="2.5" fill="white" fillOpacity="0.8" />
      <line x1="14" y1="14" x2="6" y2="8" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="22" y2="8" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="6" y2="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="14" x2="22" y2="20" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6" y1="8" x2="22" y2="8" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
      <line x1="6" y1="20" x2="22" y2="20" stroke="white" strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 3" />
    </svg>
  );
}

export function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-[13px] left-4 z-50 h-9 w-9 rounded-xl bg-surface/80 backdrop-blur-sm shadow-soft border border-border/50 hover:bg-accent"
      >
        <Menu className="h-4.5 w-4.5" />
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-sidebar border-r border-sidebar-border shadow-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-2 shadow-soft">
                  <SidebarLogo />
                </div>
                <div className="leading-none">
                  <h1 className="text-base font-bold tracking-tight text-gradient">NeuroFlow</h1>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Estudia más inteligente</p>
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
            <nav className="p-3 space-y-0.5 mt-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium",
                      "transition-all duration-200",
                      isActive
                        ? "bg-brand/10 text-brand font-semibold border border-brand/20"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-brand/15" : "bg-transparent"
                      )}>
                        <item.icon className={cn("h-4 w-4", isActive ? "text-brand" : "text-muted-foreground")} />
                      </div>
                      {item.label}
                      {isActive && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand" />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Footer upgrade card */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
              <div className="rounded-2xl bg-gradient-to-br from-brand/10 via-brand/5 to-brand-2/10 p-4 border border-brand/15">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-4 w-4 text-brand" />
                  <p className="text-xs font-semibold text-foreground">Plan Básico</p>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3">
                  3 documentos restantes este mes
                </p>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-brand to-brand-2 hover:opacity-90 text-brand-foreground font-semibold"
                >
                  Subir a Pro ✨
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
