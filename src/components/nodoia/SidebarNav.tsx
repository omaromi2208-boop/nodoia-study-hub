import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, ShoppingBag, Headphones, ClipboardList, User } from "lucide-react";

const itemBase =
  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";

const itemActive = "bg-accent text-foreground";

export function SidebarNav() {
  return (
    <nav className="rounded-xl border border-border/70 bg-surface/60 p-2 backdrop-blur shadow-soft">
      <div className="px-3 pb-2 pt-2 text-xs font-semibold tracking-wide text-muted-foreground">
        Secciones
      </div>
      <div className="space-y-1">
        <NavLink to="/dashboard" className={itemBase} activeClassName={itemActive}>
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </NavLink>
        <NavLink to="/marketplace" className={itemBase} activeClassName={itemActive}>
          <ShoppingBag className="h-4 w-4" /> Marketplace
        </NavLink>
        <NavLink to="/audiolibros" className={itemBase} activeClassName={itemActive}>
          <Headphones className="h-4 w-4" /> Audiolibros
        </NavLink>
        <NavLink to="/modo-examen" className={itemBase} activeClassName={itemActive}>
          <ClipboardList className="h-4 w-4" /> Modo Examen
        </NavLink>
        <NavLink to="/perfil" className={itemBase} activeClassName={itemActive}>
          <User className="h-4 w-4" /> Perfil
        </NavLink>
      </div>
    </nav>
  );
}
