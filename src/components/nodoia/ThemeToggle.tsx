import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = (theme ?? "dark") === "dark";

  return (
    <Button
      type="button"
      size="icon"
      variant="glass"
      aria-label={isDark ? "Activar modo claro" : "Activar modo noche"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-2xl"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
