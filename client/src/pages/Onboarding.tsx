/**
 * Onboarding — Tela de boas-vindas do Tutor IA
 * Versão aprimorada com animações para engajamento infantil:
 * - Tutor IA com animação de aceno e glow pulsante
 * - Bolha de fala com efeito de digitação (typewriter)
 * - Trilhas com entrada escalonada e hover interativo
 * - Partículas flutuantes no fundo
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Brain, MessageSquare, Rocket, Sparkles } from "lucide-react";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import { TutorSpeechBubble } from "@/components/TutorSpeechBubble";

const PREVIEW_TRACKS = [
  { icon: Brain, title: "Entendendo\na IA", color: "#7C3AED", emoji: "🧠" },
  { icon: MessageSquare, title: "Criando\nPrompts", color: "#F97316", emoji: "💬" },
  { icon: Rocket, title: "Meu Primeiro\nApp", color: "#10B981", emoji: "🚀" },
];

/* Partículas decorativas flutuantes */
function FloatingParticles() {
  const particles = [
    { x: "15%", y: "10%", size: 6, color: "#7C3AED", delay: 0 },
    { x: "80%", y: "15%", size: 4, color: "#F97316", delay: 0.5 },
    { x: "10%", y: "60%", size: 5, color: "#10B981", delay: 1 },
    { x: "85%", y: "55%", size: 7, color: "#FFD700", delay: 0.3 },
    { x: "50%", y: "5%", size: 4, color: "#EF4444", delay: 0.8 },
    { x: "25%", y: "80%", size: 5, color: "#3B82F6", delay: 1.2 },
    { x: "70%", y: "75%", size: 6, color: "#7C3AED", delay: 0.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: p.color, opacity: 0.4 }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.5 + i * 0.3,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [speechComplete, setSpeechComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useLabiaTheme();

  // Usar mounted para garantir que as animações iniciem após montagem
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSpeechComplete = () => {
    setSpeechComplete(true);
    setTimeout(() => setShowButton(true), 400);
  };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto flex flex-col relative" style={{ scrollbarWidth: "none" }}>
        <FloatingParticles />

        {/* Hero do Tutor IA */}
        <div className="flex flex-col items-center pt-8 pb-2 px-6 relative">
          {/* Glow de fundo */}
          <motion.div
            className="absolute w-56 h-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)", top: "0%" }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Avatar do tutor */}
          <motion.div
            className="relative w-44 h-44 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ type: "spring", damping: 14, stiffness: 160, delay: 0.1 }}
          >
            {/* Anel pulsante externo */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "3px solid rgba(124,58,237,0.4)" }}
              animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: "2px solid rgba(124,58,237,0.2)" }}
              animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />

            {/* Imagem do tutor com flutuação */}
            <motion.img
              src={IMAGES.tutorRobot}
              alt="Tutor IA"
              className="relative w-full h-full object-contain drop-shadow-2xl"
              animate={{
                y: [0, -6, 0],
                rotate: [0, -3, 3, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              }}
            />

            {/* Estrelinhas ao redor */}
            {[
              { emoji: "✨", top: "0%", left: "80%", delay: 0.5 },
              { emoji: "⭐", top: "20%", left: "-10%", delay: 1.2 },
              { emoji: "🌟", top: "5%", left: "50%", delay: 0.8 },
            ].map((star, i) => (
              <motion.span
                key={i}
                className="absolute text-sm"
                style={{ top: star.top, left: star.left }}
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              >
                {star.emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Nome do tutor */}
          <motion.div
            className="flex items-center gap-2 mb-1"
            initial={{ opacity: 0, y: 8 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: 0.4 }}
          >
            <span
              className="text-lg font-black"
              style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
            >
              Tutor IA
            </span>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Sparkles size={16} className="text-[#FFD700]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bolha de fala com typewriter */}
        <div className="mx-5 mb-5">
          <TutorSpeechBubble
            text="Olá, Lucas! Seja bem-vindo ao LabIA! Sou seu Tutor IA e vou te guiar nessa jornada incrível. Vamos aprender sobre IA juntos?"
            delay={0.6}
            showTypewriter
            onComplete={handleSpeechComplete}
          />
        </div>

        {/* Trilhas de preview */}
        <AnimatePresence>
          {speechComplete && (
            <motion.div
              className="px-5 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.p
                className="text-xs font-semibold uppercase tracking-wider mb-3 text-center"
                style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                O que você vai aprender 🎓
              </motion.p>
              <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
                {PREVIEW_TRACKS.map((track, i) => {
                  const Icon = track.icon;
                  return (
                    <motion.div
                      key={i}
                      className="flex-shrink-0 w-28 rounded-2xl p-4 flex flex-col items-center gap-2 text-center cursor-pointer"
                      style={{ background: `${track.color}20`, border: `2px solid ${track.color}40` }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.15, type: "spring", damping: 16 }}
                      whileHover={{ scale: 1.08, y: -4, boxShadow: `0 8px 24px ${track.color}30` }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${track.color}30` }}
                        animate={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      >
                        <Icon size={22} style={{ color: track.color }} />
                      </motion.div>
                      <motion.span
                        className="text-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      >
                        {track.emoji}
                      </motion.span>
                      <span
                        className="text-xs font-bold leading-tight whitespace-pre-line"
                        style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
                      >
                        {track.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1" />

        {/* Botão de início */}
        <AnimatePresence>
          {showButton && (
            <motion.div
              className="px-6 pb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
            >
              <motion.button
                onClick={() => setLocation("/home")}
                className="w-full text-base py-4 rounded-2xl text-white font-black flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
                  boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
                }}
                animate={{
                  boxShadow: [
                    "0 8px 32px rgba(124,58,237,0.4)",
                    "0 12px 40px rgba(124,58,237,0.6)",
                    "0 8px 32px rgba(124,58,237,0.4)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  🚀
                </motion.span>
                Começar minha jornada!
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles size={16} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}
