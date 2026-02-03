import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: string;
  storageKey?: string;
}>;

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "neuroflow-theme",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
