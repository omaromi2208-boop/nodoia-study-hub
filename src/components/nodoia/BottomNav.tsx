import { NavLink } from "@/components/NavLink";
import { LayoutDashboard, ShoppingBag, Headphones, ClipboardList, User } from "lucide-react";

const base =
  "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] text-muted-foreground transition-colors";

const active = "bg-accent text-foreground";

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/35">
      <div className="container grid grid-cols-5 gap-2 px-3 py-2">
        <NavLink to="/dashboard" className={base} activeClassName={active}>
          <LayoutDashboard className="h-4 w-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/marketplace" className={base} activeClassName={active}>
          <ShoppingBag className="h-4 w-4" />
          <span>Packs</span>
        </NavLink>
        <NavLink to="/audiolibros" className={base} activeClassName={active}>
          <Headphones className="h-4 w-4" />
          <span>Audio</span>
        </NavLink>
        <NavLink to="/modo-examen" className={base} activeClassName={active}>
          <ClipboardList className="h-4 w-4" />
          <span>Examen</span>
        </NavLink>
        <NavLink to="/perfil" className={base} activeClassName={active}>
          <User className="h-4 w-4" />
          <span>Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}
