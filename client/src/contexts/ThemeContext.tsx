import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemePreference = "light" | "dark" | "auto";

interface ThemeContextType {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

function getSystemTheme(): Theme {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

function resolveTheme(pref: ThemePreference): Theme {
  if (pref === "auto") return getSystemTheme();
  return pref;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  switchable = false,
}: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme-preference");
      if (stored === "light" || stored === "dark" || stored === "auto") return stored;
      // Fallback to old "theme" key
      const oldStored = localStorage.getItem("theme");
      if (oldStored === "light" || oldStored === "dark") return oldStored;
    }
    return defaultTheme;
  });

  const [theme, setTheme] = useState<Theme>(() => resolveTheme(preference));

  const setPreference = (pref: ThemePreference) => {
    setPreferenceState(pref);
    setTheme(resolveTheme(pref));
    if (switchable) {
      localStorage.setItem("theme-preference", pref);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [theme]);

  // Listen for system theme changes when preference is "auto"
  useEffect(() => {
    if (preference !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [preference]);

  const toggleTheme = switchable
    ? () => {
        const next = theme === "light" ? "dark" : "light";
        setPreference(next);
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
