/**
 * TutorSpeechBubble — Bolha de fala animada do Tutor IA
 * Inclui avatar animado, cauda de fala e efeito de digitação
 * Ideal para o Onboarding e telas de boas-vindas
 */
import { motion } from "framer-motion";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import { TypewriterText } from "./TypewriterText";

interface TutorSpeechBubbleProps {
  text: string;
  delay?: number;
  showTypewriter?: boolean;
  onComplete?: () => void;
}

export function TutorSpeechBubble({
  text,
  delay = 0.3,
  showTypewriter = true,
  onComplete,
}: TutorSpeechBubbleProps) {
  const t = useLabiaTheme();

  return (
    <motion.div
      className="flex items-end gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", damping: 18 }}
    >
      {/* Avatar do tutor com animação de aceno */}
      <motion.div
        className="relative flex-shrink-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.1, type: "spring", damping: 18, stiffness: 200 }}
      >
        {/* Glow pulsante ao redor do avatar */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(124,58,237,0.3)", filter: "blur(8px)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={IMAGES.tutorRobot}
          alt="Tutor IA"
          className="relative w-14 h-14 rounded-full object-cover"
          style={{ border: "2px solid rgba(124,58,237,0.5)" }}
        />
        {/* Indicador online */}
        <motion.div
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#10B981]"
          style={{ border: `2px solid ${t.bg}` }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>

      {/* Bolha de fala */}
      <motion.div
        className="relative flex-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + 0.2, type: "spring", damping: 20 }}
      >
        {/* Cauda da bolha */}
        <div
          className="absolute -left-2 bottom-4 w-0 h-0"
          style={{
            borderTop: "8px solid transparent",
            borderBottom: "8px solid transparent",
            borderRight: `10px solid ${t.isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.12)"}`,
          }}
        />

        <div
          className="rounded-2xl rounded-bl-sm p-4"
          style={{
            background: t.isDark
              ? "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.12) 100%)"
              : "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.06) 100%)",
            border: `1.5px solid ${t.isDark ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.2)"}`,
            boxShadow: "0 4px 20px rgba(124,58,237,0.12)",
          }}
        >
          {/* Rótulo do tutor */}
          <motion.div
            className="flex items-center gap-1.5 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "Inter, sans-serif",
                background: "rgba(124,58,237,0.15)",
                color: "#7C3AED",
              }}
            >
              Tutor IA
            </span>
            {/* Estrelinhas decorativas */}
            {["✨", "🤖"].map((emoji, i) => (
              <motion.span
                key={i}
                className="text-xs"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Texto com efeito de digitação */}
          {showTypewriter ? (
            <TypewriterText
              text={text}
              speed={25}
              delay={(delay + 0.4) * 1000}
              className="text-base leading-relaxed"
              style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
              onComplete={onComplete}
            />
          ) : (
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
            >
              {text}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
