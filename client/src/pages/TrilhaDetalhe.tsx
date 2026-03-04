/**
 * TrilhaDetalhe — Detalhe da trilha "Criando Prompts"
 * Design: Banner gradiente, lista de missões com timeline vertical,
 * status (concluída, ativa, bloqueada)
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft, MessageSquare, CheckCircle2, Lock, Circle, ChevronRight } from "lucide-react";
import { MISSIONS_CRIANDO_PROMPTS } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

export default function TrilhaDetalhe() {
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

        {/* Banner */}
        <motion.div
          className="relative px-6 pt-16 pb-6 rounded-b-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #F59E0B 50%, #F97316 100%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
            Criando Prompts
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            4 missões • 60% concluído
          </p>
        </motion.div>

        {/* Missions timeline */}
        <div className="px-6 py-6">
          {MISSIONS_CRIANDO_PROMPTS.map((mission, i) => (
            <motion.div
              key={mission.id}
              className="flex gap-4 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              {/* Timeline line */}
              {i < MISSIONS_CRIANDO_PROMPTS.length - 1 && (
                <div
                  className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                  style={{
                    background: mission.status === "completed"
                      ? "#10B981"
                      : mission.status === "active"
                      ? "linear-gradient(to bottom, #F97316, rgba(255,255,255,0.1))"
                      : "rgba(255,255,255,0.1)",
                  }}
                />
              )}

              {/* Status icon */}
              <div className="flex-shrink-0 mt-1 z-10">
                {mission.status === "completed" && (
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-[#10B981]" />
                  </div>
                )}
                {mission.status === "active" && (
                  <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center shadow-lg shadow-[#F97316]/30">
                    <Circle size={12} fill="white" className="text-white" />
                  </div>
                )}
                {mission.status === "locked" && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Lock size={14} className="text-white/30" />
                  </div>
                )}
              </div>

              {/* Content */}
              {mission.status === "completed" ? (
                <button
                  className="flex-1 pb-8 text-left group"
                  onClick={() => setLocation(`/missao/prompts/${mission.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <h3
                      className="text-white font-bold text-base leading-tight group-hover:text-[#10B981] transition-colors"
                      style={{ fontFamily: "Nunito, sans-serif" }}
                    >
                      {mission.title}
                    </h3>
                    <ChevronRight size={16} className="text-white/20 group-hover:text-[#10B981] transition-colors flex-shrink-0 mt-0.5" />
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
              ) : (
                <div className={`flex-1 pb-8 ${mission.status === "locked" ? "opacity-50" : ""}`}>
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
                  <div className="mt-2">
                    {mission.status === "active" && (
                      <button
                        onClick={() => setLocation("/chat")}
                        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold bg-[#F97316] text-white hover:bg-[#ea6c0a] transition-colors"
                        style={{ fontFamily: "Nunito, sans-serif" }}
                      >
                        Continuar
                      </button>
                    )}
                    {mission.status === "locked" && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                        Bloqueada
                      </span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}
