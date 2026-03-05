/**
 * CriandoSolucoes — Detalhe da trilha "Criando Soluções"
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, Settings, CheckCircle2, Target, Lightbulb, Layers, Puzzle,
  Sparkles, Trophy, ChevronRight, Star,
} from "lucide-react";
import { MISSIONS_CRIANDO_SOLUCOES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

const MISSION_ICONS = [Target, Lightbulb, Layers, Puzzle];
const SCORES = [10, 10, 9, 10];
const DATES = ["05 Mar", "05 Mar", "06 Mar", "06 Mar"];

export default function CriandoSolucoes() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <motion.button onClick={() => setLocation("/trilhas")}
          className="absolute top-12 left-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <ArrowLeft size={20} className="text-white" />
        </motion.button>

        {/* Banner */}
        <motion.div className="relative px-6 pt-16 pb-6 rounded-b-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)" }}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-white rounded-full" />
            <div className="absolute top-12 right-12 w-16 h-16 border-2 border-white rounded-full" />
            <div className="absolute bottom-2 left-8 w-10 h-10 border border-white rounded-lg rotate-45" />
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Settings size={24} className="text-white" />
            </div>
            <motion.span className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "rgba(255,255,255,0.25)", color: "white", fontFamily: "Nunito, sans-serif" }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
              100% Concluída!
            </motion.span>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>Criando Soluções</h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>4 missões • 100% concluído</p>
          <div className="mt-3 w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div className="h-full rounded-full bg-white/80" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.4, duration: 0.8 }} />
          </div>
        </motion.div>

        {/* Badge earned */}
        <motion.div className="mx-6 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="p-4 flex items-center gap-4 rounded-2xl" style={{ background: t.cardBg, border: "1px solid rgba(16,185,129,0.25)" }}>
            <motion.div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.15))", border: "2px solid rgba(16,185,129,0.4)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(16,185,129,0)", "0 0 0 8px rgba(16,185,129,0.15)", "0 0 0 0 rgba(16,185,129,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}>
              <Settings size={22} className="text-[#10B981]" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <Trophy size={12} className="text-[#F59E0B]" />
                <p className="text-[#F59E0B] text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Insígnia Conquistada</p>
              </div>
              <p className="font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Criador de Soluções</p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Parabéns! Você completou todas as missões</p>
            </div>
          </div>
        </motion.div>

        {/* What you learned */}
        <motion.div className="mx-6 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#10B981]" />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>O que você aprendeu</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="space-y-3">
              {["Identificar problemas reais do cotidiano", "Usar IA para gerar ideias criativas", "Estruturar soluções de forma organizada", "Pensar como um criador de produto digital"].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#10B981]" />
                  </div>
                  <p className="text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Missions timeline */}
        <div className="px-6 pt-5 pb-4">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Missões</p>
            <span className="text-[#10B981] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>4/4 ✓</span>
          </div>

          {MISSIONS_CRIANDO_SOLUCOES.map((mission, i) => {
            const MissionIcon = MISSION_ICONS[i] || Target;
            const score = SCORES[i];
            const date = DATES[i];
            return (
              <motion.div key={mission.id} className="flex gap-4 relative cursor-pointer group"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }}
                onClick={() => setLocation(`/missao/solucoes/${mission.id}`)}>
                {i < MISSIONS_CRIANDO_SOLUCOES.length - 1 && (
                  <div className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]" style={{ background: "rgba(16,185,129,0.3)" }} />
                )}
                <div className="flex-shrink-0 mt-1 z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)", border: "2px solid #10B981" }}>
                    <CheckCircle2 size={14} className="text-[#10B981]" />
                  </div>
                </div>
                <div className="flex-1 pb-7">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-base leading-tight group-hover:text-[#10B981] transition-colors"
                        style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>{mission.title}</h3>
                      <p className="text-sm mt-1 leading-relaxed line-clamp-2" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>{mission.description}</p>
                    </div>
                    <ChevronRight size={16} className="group-hover:text-[#10B981] transition-colors flex-shrink-0 mt-1" style={{ color: t.textMuted }} />
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontFamily: "Inter, sans-serif" }}>
                      <CheckCircle2 size={10} />Concluída
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(16,185,129,0.08)", color: "rgba(16,185,129,0.7)", fontFamily: "Inter, sans-serif" }}>
                      <MissionIcon size={10} />Missão {mission.id}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(245,158,11,0.1)", color: "#F59E0B", fontFamily: "Inter, sans-serif" }}>
                      <Star size={10} />{score}/10
                    </span>
                    <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>{date}</span>
                  </div>
                  <motion.button className="mt-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all hover:brightness-110"
                    style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", fontFamily: "Nunito, sans-serif", border: "1px solid rgba(16,185,129,0.2)" }}
                    whileTap={{ scale: 0.95 }}>
                    Revisar atividade →
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="mx-6 mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <button onClick={() => setLocation("/trilha-meu-app")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #7C3AED, #6D28D9)", color: "white" }}>
            Próxima trilha: "Meu Primeiro App"
            <ChevronRight size={16} />
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
