/**
 * Onboarding — Tela de boas-vindas do Tutor IA
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Brain, MessageSquare, Rocket } from "lucide-react";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

const PREVIEW_TRACKS = [
  { icon: Brain, title: "Entendendo\na IA", color: "#7C3AED" },
  { icon: MessageSquare, title: "Criando\nPrompts", color: "#F97316" },
  { icon: Rocket, title: "Meu Primeiro\nApp", color: "#7C3AED" },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto flex flex-col" style={{ scrollbarWidth: "none" }}>
        <motion.div className="flex flex-col items-center pt-6 pb-4 px-6"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div className="relative w-48 h-48 mb-4">
            <div className="absolute inset-0 rounded-full bg-[#7C3AED]/20 blur-3xl" />
            <img src={IMAGES.tutorRobot} alt="Tutor IA" className="relative w-full h-full object-contain drop-shadow-2xl" />
          </div>
        </motion.div>

        <motion.div className="mx-6 mb-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="rounded-2xl p-5"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0.1) 100%)", border: "1px solid rgba(124,58,237,0.3)" }}>
            <p className="text-base leading-relaxed" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Olá, Lucas! Seja bem-vindo ao LabIA! Sou seu Tutor IA e vou te guiar nessa jornada incrível. Vamos aprender sobre IA juntos?
            </p>
          </div>
        </motion.div>

        <motion.div className="px-6 mb-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {PREVIEW_TRACKS.map((track, i) => {
              const Icon = track.icon;
              return (
                <motion.div key={i} className="flex-shrink-0 w-28 rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                  style={{ background: `${track.color}20`, border: `2px solid ${track.color}40` }}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${track.color}30` }}>
                    <Icon size={22} style={{ color: track.color }} />
                  </div>
                  <span className="text-xs font-bold leading-tight whitespace-pre-line" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>{track.title}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <div className="flex-1" />

        <motion.div className="px-6 pb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <button onClick={() => setLocation("/home")} className="labia-btn-primary w-full text-base py-4">Começar minha jornada!</button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
