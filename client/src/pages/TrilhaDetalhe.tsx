/**
 * TrilhaDetalhe — Detalhe da trilha "Criando Prompts"
 * Design: Banner gradiente, lista de missões com timeline vertical,
 * Todas as 4 missões concluídas e clicáveis para revisão
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, MessageSquare, CheckCircle2, ChevronRight, Trophy, Sparkles,
} from "lucide-react";
import { MISSIONS_CRIANDO_PROMPTS } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

export default function TrilhaDetalhe() {
  const [, setLocation] = useLocation();

  /* All missions treated as completed for prototype review */
  const missions = MISSIONS_CRIANDO_PROMPTS.map((m) => ({
    ...m,
    status: "completed" as const,
  }));

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

        {/* Banner */}
        <motion.div
          className="relative px-6 pt-16 pb-6 rounded-b-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #F97316 100%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-white/5" />

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                100% Concluída!
              </span>
              <Trophy size={16} className="text-[#F59E0B]" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
            Criando Prompts
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            4 missões • Todas concluídas
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Badge earned card */}
        <motion.div
          className="mx-6 mt-5 p-4 rounded-2xl border border-[#10B981]/20 bg-[#10B981]/8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <Trophy size={22} className="text-[#10B981]" />
            </div>
            <div className="flex-1">
              <p className="text-[#10B981] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                Insígnia Conquistada!
              </p>
              <p className="text-white text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
                Mestre dos Prompts
              </p>
            </div>
            <Sparkles size={18} className="text-[#F59E0B] animate-pulse" />
          </div>
        </motion.div>

        {/* Section title */}
        <div className="px-6 mt-6 mb-3">
          <h2 className="text-white text-base font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
            Missões da Trilha
          </h2>
          <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            Toque em uma missão para revisar a atividade
          </p>
        </div>

        {/* Missions timeline */}
        <div className="px-6 pb-6">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.id}
              className="flex gap-4 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              {/* Timeline line */}
              {i < missions.length - 1 && (
                <div
                  className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                  style={{ background: "#10B981" }}
                />
              )}

              {/* Status icon */}
              <div className="flex-shrink-0 mt-1 z-10">
                <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-[#10B981]" />
                </div>
              </div>

              {/* Content — all clickable */}
              <button
                className="flex-1 pb-8 text-left group"
                onClick={() => setLocation(`/missao/prompts/${mission.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white/30 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                        Missão {mission.id}
                      </span>
                    </div>
                    <h3
                      className="text-white font-bold text-base leading-tight group-hover:text-[#10B981] transition-colors"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {mission.title}
                    </h3>
                  </div>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-[#10B981] transition-colors flex-shrink-0 mt-2" />
                </div>
                <p
                  className="text-white/50 text-sm mt-1 leading-relaxed"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {mission.description}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#10B981]" style={{ fontFamily: "Inter, sans-serif" }}>
                    <CheckCircle2 size={11} /> Concluída
                  </span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/40 group-hover:bg-[#10B981]/10 group-hover:text-[#10B981] transition-colors"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Revisar
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA — Next trail */}
        <motion.div
          className="px-6 pb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => setLocation("/trilha-solucoes")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#F97316] to-[#F59E0B] active:scale-[0.98] transition-transform"
            style={{
              fontFamily: "Nunito, sans-serif",
              boxShadow: "0 4px 20px rgba(249,115,22,0.35)",
            }}
          >
            <Sparkles size={16} />
            Avançar para Criando Soluções
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
