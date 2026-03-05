/**
 * NotFound — Página 404
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

export default function NotFound() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <motion.div className="relative mb-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="absolute inset-0 rounded-full animate-pulse" style={{ background: "rgba(239,68,68,0.15)" }} />
          <AlertCircle className="relative h-16 w-16 text-red-500" />
        </motion.div>
        <motion.h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          404
        </motion.h1>
        <motion.h2 className="text-xl font-semibold mb-4" style={{ fontFamily: "Nunito, sans-serif", color: t.textSecondary }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Página não encontrada
        </motion.h2>
        <motion.p className="text-sm mb-8 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          Desculpe, a página que você procura não existe ou foi movida.
        </motion.p>
        <motion.button onClick={() => setLocation("/")}
          className="labia-btn-primary px-6 py-3 text-sm flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Home className="w-4 h-4" />Voltar ao início
        </motion.button>
      </div>
    </PhoneFrame>
  );
}
