/**
 * BottomNavEM — Navegação inferior para o módulo de Ensino Médio
 * Itens: Home EM, Tutor IA, Desafio, Redação, Progresso
 * Mantém o mesmo estilo visual do BottomNav original.
 */
import { motion } from "framer-motion";
import { Home, Brain, Zap, FileText, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_ITEMS = [
  { icon: Home, label: "Início", path: "/home-em" },
  { icon: Brain, label: "Tutor IA", path: "/tutor-ia" },
  { icon: Zap, label: "Desafio", path: "/desafio-do-dia" },
  { icon: FileText, label: "Redação", path: "/redacao-enem" },
  { icon: TrendingUp, label: "Progresso", path: "/progresso-em" },
];

export default function BottomNavEM() {
  const [location, setLocation] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const inactiveColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";

  return (
    <div
      className="sticky bottom-0 left-0 right-0 flex items-center justify-around px-1 py-2 z-10 flex-shrink-0"
      style={{
        background: isDark
          ? "linear-gradient(to top, #1C1C2E 80%, transparent)"
          : "linear-gradient(to top, #F8F7FF 80%, transparent)",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path;
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all"
          >
            <div className="relative">
              <Icon
                size={19}
                style={{ color: isActive ? "#7C3AED" : inactiveColor }}
              />
              {isActive && (
                <motion.div
                  layoutId="nav-dot-em"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7C3AED]"
                />
              )}
            </div>
            <span
              className="text-[9px] font-semibold"
              style={{
                fontFamily: "Inter, sans-serif",
                color: isActive ? "#7C3AED" : inactiveColor,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
