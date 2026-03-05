/**
 * useLabiaTheme — Hook utilitário que retorna cores e estilos baseados no tema atual.
 * Centraliza a lógica de cores para evitar repetição em cada tela.
 */
import { useTheme } from "@/contexts/ThemeContext";

export function useLabiaTheme() {
  const { theme, preference, setPreference, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return {
    theme,
    preference,
    setPreference,
    toggleTheme,
    isDark,
    // Backgrounds
    bg: isDark ? "#1C1C2E" : "#F8F7FF",
    headerBg: isDark ? "rgba(28,28,46,0.95)" : "rgba(248,247,255,0.95)",
    cardBg: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    cardBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    sectionBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    sectionBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
    dropdownBg: isDark ? "#2a2a3e" : "#FFFFFF",
    dropdownBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    // Text
    textPrimary: isDark ? "#FFFFFF" : "#1C1C2E",
    textSecondary: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.55)",
    textMuted: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
    textInverse: isDark ? "#1C1C2E" : "#FFFFFF",
    // Inputs
    inputBg: isDark ? "transparent" : "rgba(0,0,0,0.03)",
    inputBorder: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)",
    inputText: isDark ? "#FFFFFF" : "#1C1C2E",
    inputPlaceholder: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)",
    // Misc
    hoverBg: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
    divider: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)",
    overlayBg: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.4)",
    toggleOff: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    // Brand colors (same in both themes)
    purple: "#7C3AED",
    orange: "#F97316",
    green: "#10B981",
    blue: "#3B82F6",
    red: "#EF4444",
    gold: "#FFD700",
  };
}
