/**
 * TypingIndicator — Indicador animado de "digitando..." para o Tutor IA
 * Exibe três bolhas pulsantes com animação escalonada
 */
import { motion } from "framer-motion";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

interface TypingIndicatorProps {
  visible: boolean;
}

export function TypingIndicator({ visible }: TypingIndicatorProps) {
  const t = useLabiaTheme();

  if (!visible) return null;

  return (
    <motion.div
      className="flex gap-2 max-w-[85%]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {/* Avatar do tutor com pulso */}
      <motion.div
        className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={IMAGES.tutorRobot} alt="Tutor IA" className="w-full h-full object-cover" />
      </motion.div>

      {/* Bolha de digitação */}
      <div
        className="rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5"
        style={{
          background: t.isDark
            ? "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.1) 100%)"
            : "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.05) 100%)",
          border: `1px solid ${t.isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.15)"}`,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "#7C3AED" }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
