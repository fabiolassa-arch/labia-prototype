/**
 * BottomNav — Navegação inferior do app
 * Fiel ao design do protótipo: Home, Trilhas, Chat IA, Portfólio
 */
import { motion } from "framer-motion";
import { Home, BookOpen, MessageSquare, User } from "lucide-react";
import { useLocation } from "wouter";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BookOpen, label: "Trilhas", path: "/trilhas" },
  { icon: MessageSquare, label: "Chat IA", path: "/chat" },
  { icon: User, label: "Portfólio", path: "/portfolio" },
];

export default function BottomNav() {
  const [location, setLocation] = useLocation();

  return (
    <div
      className="sticky bottom-0 left-0 right-0 flex items-center justify-around px-2 py-3 z-10 flex-shrink-0"
      style={{
        background: "linear-gradient(to top, #1C1C2E 80%, transparent)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
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
                style={{ color: isActive ? "#F97316" : "rgba(255,255,255,0.35)" }}
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
                color: isActive ? "#F97316" : "rgba(255,255,255,0.35)",
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
