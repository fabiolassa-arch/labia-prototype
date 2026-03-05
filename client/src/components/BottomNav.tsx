/**
 * BottomNav — Navegação inferior do app
 * Fiel ao design do protótipo: Home, Trilhas, Chat IA, Portfólio
 * Suporta tema claro e escuro via CSS variables.
 */
import { motion } from "framer-motion";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BookOpen, label: "Trilhas", path: "/trilhas" },
  { icon: MessageSquare, label: "Chat IA", path: "/chat" },
  { icon: User, label: "Portfólio", path: "/portfolio" },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const inactiveColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";

  return (
    <div
      className="sticky bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 z-10 flex-shrink-0"
      style={{
        background: isDark
          ? "linear-gradient(to top, #1C1C2E 80%, transparent)"
          : "linear-gradient(to top, #F8F7FF 80%, transparent)",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.path || (location === "/" && item.path === "/home");
        return (
          <button
            key={item.path}
            onClick={() => setLocation(item.path)}
            className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all"
          >
            <div className="relative">
              <Icon
                size={20}
                style={{ color: isActive ? "#F97316" : inactiveColor }}
              />
              {isActive && (
                <motion.div
                  layoutId="nav-dot"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#F97316]"
                />
              )}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{
                fontFamily: "Inter, sans-serif",
                color: isActive ? "#F97316" : inactiveColor,
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
