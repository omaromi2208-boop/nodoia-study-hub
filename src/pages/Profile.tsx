import { AppShell } from "@/components/neuroflow/AppShell";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Mail, Bell, Shield, LogOut, Crown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export default function Profile() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell title="Perfil">
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-soft"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2">
              <User className="h-8 w-8 text-brand-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Usuario Invitado</h2>
              <p className="text-sm text-muted-foreground">Plan Básico</p>
            </div>
          </div>

          <Button className="mt-4 w-full" variant="hero">
            <Crown className="h-4 w-4" />
            Upgrade a Pro
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Preferencias</h3>
          </div>

          <div className="divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {theme === "dark" ? (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">Modo oscuro</p>
                  <p className="text-xs text-muted-foreground">
                    Cambia entre tema claro y oscuro
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Notificaciones</p>
                  <p className="text-xs text-muted-foreground">
                    Recibe actualizaciones de tus estudios
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Resumen semanal</p>
                  <p className="text-xs text-muted-foreground">
                    Email con tu progreso de estudio
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
        >
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Cuenta</h3>
          </div>

          <div className="divide-y divide-border">
            <button className="flex items-center gap-3 p-4 w-full text-left hover:bg-accent transition-colors">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Privacidad</p>
                <p className="text-xs text-muted-foreground">
                  Gestiona tus datos y privacidad
                </p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 w-full text-left hover:bg-accent transition-colors text-destructive">
              <LogOut className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Cerrar sesión</p>
                <p className="text-xs text-destructive/70">
                  Salir de la aplicación
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
