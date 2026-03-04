/**
 * EntendendoIA — Detalhe da trilha "Entendendo a IA"
 * Design: Banner gradiente roxo/teal, todas as 4 missões concluídas (100%),
 * visual de conquista total com insígnia "Explorador de IA" e confetti
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, Brain, CheckCircle2, Trophy, Sparkles, Star, PartyPopper,
} from "lucide-react";
import { MISSIONS_ENTENDENDO_IA } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

export default function EntendendoIA() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Back button */}
        <motion.button
          onClick={() => setLocation("/trilhas")}
          className="absolute top-12 left-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowLeft size={20} className="text-white" />
        </motion.button>

        {/* Banner — Trilha Concluída */}
        <motion.div
          className="relative px-6 pt-16 pb-8 rounded-b-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #7C3AED 0%, #06B6D4 50%, #10B981 100%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Floating sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-4, 4, -4],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Sparkles size={10 + (i % 3) * 4} className="text-white/40" />
            </motion.div>
          ))}

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <Trophy size={14} className="text-yellow-300" />
              <span className="text-white text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                100% Concluída!
              </span>
            </motion.div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
            Entendendo a IA
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            4 missões • Todas concluídas
          </p>

          {/* Progress bar — full */}
          <div className="mt-4 h-2.5 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #10B981, #34D399)" }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Conquista card */}
        <motion.div
          className="mx-5 -mt-3 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(124,58,237,0.15) 100%)",
              border: "1px solid rgba(16,185,129,0.3)",
            }}
          >
            <motion.div
              className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3"
              style={{
                background: "rgba(16,185,129,0.2)",
                border: "2px solid #10B981",
                boxShadow: "0 0 24px rgba(16,185,129,0.3)",
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <PartyPopper size={28} className="text-[#10B981]" />
            </motion.div>
            <h3 className="text-[#10B981] text-lg font-black mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
              Insígnia Conquistada!
            </h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 mb-2">
              <Star size={12} className="text-[#10B981]" fill="#10B981" />
              <span className="text-[#10B981] text-sm font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                Explorador de IA
              </span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Você completou todas as missões e agora entende como a Inteligência Artificial funciona!
            </p>
          </div>
        </motion.div>

        {/* Section title */}
        <motion.div
          className="px-6 pt-6 pb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-white font-bold text-base" style={{ fontFamily: "Nunito, sans-serif" }}>
            Missões Concluídas
          </h2>
          <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            Todas as 4 missões foram finalizadas com sucesso
          </p>
        </motion.div>

        {/* Missions timeline — all completed */}
        <div className="px-6 pt-2 pb-6">
          {MISSIONS_ENTENDENDO_IA.map((mission, i) => (
            <motion.div
              key={mission.id}
              className="flex gap-4 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
            >
              {/* Timeline line */}
              {i < MISSIONS_ENTENDENDO_IA.length - 1 && (
                <div
                  className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                  style={{ background: "#10B981" }}
                />
              )}

              {/* Status icon — all completed */}
              <div className="flex-shrink-0 mt-1 z-10">
                <motion.div
                  className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, type: "spring" }}
                >
                  <CheckCircle2 size={20} className="text-[#10B981]" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <h3
                  className="text-white font-bold text-base leading-tight"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  {mission.title}
                </h3>
                <p
                  className="text-white/50 text-sm mt-1 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {mission.description}
                </p>

                {/* Completed badge */}
                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <CheckCircle2 size={11} /> Concluída
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA — Próxima trilha */}
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => setLocation("/trilha-detalhe")}
            className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2"
            style={{
              fontFamily: "Nunito, sans-serif",
              background: "linear-gradient(135deg, #F97316 0%, #F59E0B 100%)",
              boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
            }}
          >
            Ir para "Criando Prompts"
            <Sparkles size={18} />
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
