/**
 * CriandoSolucoes — Detalhe da trilha "Criando Soluções"
 * Design: Banner gradiente verde-teal, timeline de missões bloqueadas,
 * visual consistente com TrilhaDetalhe mas com identidade própria
 * Cor principal: #10B981 (verde/teal)
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, Settings, Lock, Lightbulb, Puzzle, Layers, Target,
  AlertCircle, Sparkles,
} from "lucide-react";
import { MISSIONS_CRIANDO_SOLUCOES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import ProgressBar from "@/components/ProgressBar";

const MISSION_ICONS = [Target, Lightbulb, Layers, Puzzle];

export default function CriandoSolucoes() {
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
            background: "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-12 right-12 w-16 h-16 border-2 border-white rounded-full" />
            <div className="absolute bottom-2 left-8 w-10 h-10 border border-white rounded-lg rotate-45" />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Settings size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
            Criando Soluções
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            4 missões • 0% concluído
          </p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white/60" style={{ width: "0%" }} />
            </div>
          </div>
        </motion.div>

        {/* Locked notice */}
        <motion.div
          className="mx-6 mt-5 p-4 rounded-2xl flex items-start gap-3"
          style={{
            background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.05))",
            border: "1px solid rgba(245,158,11,0.2)",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertCircle size={16} className="text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-[#F59E0B] text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
              Trilha bloqueada
            </p>
            <p className="text-white/50 text-xs mt-0.5 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Complete a trilha <strong className="text-[#F97316]">"Criando Prompts"</strong> para desbloquear esta trilha.
            </p>
          </div>
        </motion.div>

        {/* What you'll learn */}
        <motion.div
          className="mx-6 mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#10B981]" />
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
              O que você vai aprender
            </p>
          </div>
          <div className="labia-card p-4">
            <div className="space-y-3">
              {[
                "Identificar problemas reais do cotidiano",
                "Usar IA para gerar ideias criativas",
                "Estruturar soluções de forma organizada",
                "Pensar como um criador de produto digital",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  </div>
                  <p className="text-white/70 text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Badge reward */}
        <motion.div
          className="mx-6 mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="labia-card p-4 flex items-center gap-4" style={{ border: "1px solid rgba(16,185,129,0.15)" }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(16,185,129,0.12)",
                border: "2px dashed rgba(16,185,129,0.3)",
              }}
            >
              <Settings size={22} className="text-[#10B981]/50" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                Recompensa
              </p>
              <p className="text-white font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>
                Insígnia "Criador de Soluções"
              </p>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Conquiste ao completar todas as missões
              </p>
            </div>
          </div>
        </motion.div>

        {/* Missions timeline */}
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
              Missões
            </p>
            <span className="text-white/25 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              0/4
            </span>
          </div>

          {MISSIONS_CRIANDO_SOLUCOES.map((mission, i) => {
            const MissionIcon = MISSION_ICONS[i] || Target;
            return (
              <motion.div
                key={mission.id}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {/* Timeline line */}
                {i < MISSIONS_CRIANDO_SOLUCOES.length - 1 && (
                  <div
                    className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}

                {/* Status icon */}
                <div className="flex-shrink-0 mt-1 z-10">
                  <div className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Lock size={13} className="text-white/25" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-7 opacity-50">
                  <div className="flex items-start gap-2">
                    <div>
                      <h3
                        className="text-white font-bold text-base leading-tight"
                        style={{ fontFamily: "Nunito, sans-serif" }}
                      >
                        {mission.title}
                      </h3>
                      <p
                        className="text-white/40 text-sm mt-1 leading-relaxed"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {mission.description}
                      </p>
                    </div>
                  </div>

                  {/* Mission icon tag */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.25)",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <Lock size={10} />
                      Bloqueada
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{
                        background: "rgba(16,185,129,0.08)",
                        color: "rgba(16,185,129,0.35)",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <MissionIcon size={10} />
                      Missão {mission.id}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to go back to Criando Prompts */}
        <motion.div
          className="mx-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => setLocation("/trilha-detalhe")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{
              fontFamily: "Nunito, sans-serif",
              background: "linear-gradient(135deg, #F97316, #F59E0B)",
              color: "white",
            }}
          >
            <ArrowLeft size={16} />
            Voltar para "Criando Prompts"
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
