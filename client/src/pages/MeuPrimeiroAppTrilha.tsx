/**
 * MeuPrimeiroAppTrilha — Detalhe da trilha "Meu Primeiro App"
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, Rocket, CheckCircle2, Lightbulb, Users, ListChecks,
  Layout, GitBranch, Sparkles, Trophy, Star, Eye,
} from "lucide-react";
import { MISSIONS_MEU_PRIMEIRO_APP } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

const MISSION_ICONS = [Lightbulb, Users, ListChecks, Layout, GitBranch];

export default function MeuPrimeiroAppTrilha() {
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
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 40%, #3B82F6 100%)" }}
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white rounded-2xl rotate-12" />
            <div className="absolute top-14 right-14 w-12 h-12 border-2 border-white rounded-xl -rotate-6" />
            <div className="absolute bottom-3 left-10 w-8 h-8 border border-white rounded-full" />
            <div className="absolute bottom-6 right-20 w-6 h-6 bg-white/20 rounded-full" />
          </div>
          <motion.div className="absolute top-14 right-5 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            style={{ background: "rgba(16,185,129,0.25)", color: "#34D399", border: "1px solid rgba(16,185,129,0.3)", fontFamily: "Nunito, sans-serif" }}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
            <Star size={10} fill="#34D399" />100% Concluída!
          </motion.div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Rocket size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>Meu Primeiro App</h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>5 missões • 100% concluído</p>
          <div className="mt-3 w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #34D399, #10B981)" }}
              initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 0.4, duration: 1 }} />
          </div>
        </motion.div>

        {/* Badge earned */}
        <motion.div className="mx-6 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="p-4 rounded-2xl flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(124,58,237,0.25)" }}>
            <motion.div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7C3AED, #3B82F6)", boxShadow: "0 0 20px rgba(124,58,237,0.4)" }}
              animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Rocket size={24} className="text-white" />
            </motion.div>
            <div>
              <p className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Insígnia conquistada</p>
              <p className="font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Jovem Desenvolvedor</p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Você criou seu primeiro app do zero!</p>
            </div>
          </div>
        </motion.div>

        {/* What you learned */}
        <motion.div className="mx-6 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-[#7C3AED]" />
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>O que você aprendeu</p>
          </div>
          <div className="rounded-2xl p-4" style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}>
            <div className="space-y-3">
              {["Transformar uma ideia em um projeto real", "Definir público-alvo com personas", "Priorizar funcionalidades com MVP", "Estruturar telas e hierarquia visual", "Criar fluxo de navegação completo"].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#10B981]" />
                  </div>
                  <p className="text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final result card */}
        <motion.div className="mx-6 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className="p-4 rounded-2xl flex items-center gap-4"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(52,211,153,0.08))", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.15))", border: "2px solid rgba(16,185,129,0.3)" }}>
              <Trophy size={22} className="text-[#10B981]" />
            </div>
            <div>
              <p className="text-[#10B981] text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Resultado entregue</p>
              <p className="font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>BiblioTrack — Seu primeiro app!</p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Ideia, personas, funcionalidades, telas e fluxo</p>
            </div>
          </div>
        </motion.div>

        {/* Missions timeline */}
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Missões</p>
            <span className="text-[#10B981] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>5/5</span>
          </div>

          {MISSIONS_MEU_PRIMEIRO_APP.map((mission, i) => {
            const MissionIcon = MISSION_ICONS[i] || Lightbulb;
            const scores = [10, 10, 9, 10, 10];
            const dates = ["07 Mar", "07 Mar", "08 Mar", "08 Mar", "09 Mar"];
            return (
              <motion.div key={mission.id} className="flex gap-4 relative cursor-pointer group"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }}
                onClick={() => setLocation(`/missao/meu-primeiro-app/${mission.id}`)}>
                {i < MISSIONS_MEU_PRIMEIRO_APP.length - 1 && (
                  <div className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]" style={{ background: "rgba(16,185,129,0.3)" }} />
                )}
                <div className="flex-shrink-0 mt-1 z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10B981" }}>
                    <CheckCircle2 size={14} className="text-[#10B981]" />
                  </div>
                </div>
                <div className="flex-1 pb-7">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-base leading-tight group-hover:text-[#A78BFA] transition-colors"
                      style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>{mission.title}</h3>
                    <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                      <Star size={11} fill="#F59E0B" className="text-[#F59E0B]" />
                      <span className="text-[#F59E0B] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>{scores[i]}/10</span>
                    </div>
                  </div>
                  <p className="text-sm mt-1 leading-relaxed line-clamp-2" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{mission.description}</p>
                  <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10B981", fontFamily: "Inter, sans-serif" }}>
                      <CheckCircle2 size={10} />Concluída
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(124,58,237,0.08)", color: "#A78BFA", fontFamily: "Inter, sans-serif" }}>
                      <MissionIcon size={10} />Missão {mission.id}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                      style={{ background: t.cardBg, color: t.textMuted, fontFamily: "Inter, sans-serif" }}>
                      <Eye size={10} />Revisar
                    </span>
                  </div>
                  <p className="text-xs mt-2" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>{dates[i]} 2026</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Celebration CTA */}
        <motion.div className="mx-6 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <div className="p-5 rounded-2xl text-center"
            style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))", border: "1px solid rgba(124,58,237,0.2)" }}>
            <motion.div className="text-3xl mb-2" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>🎉</motion.div>
            <p className="font-bold text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Parabéns, Jovem Desenvolvedor!</p>
            <p className="text-sm mt-1" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Você completou todas as 4 trilhas do LabIA e criou seu primeiro app do zero. O futuro é seu!
            </p>
          </div>
        </motion.div>

        <motion.div className="mx-6 mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <button onClick={() => setLocation("/trilhas")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #7C3AED, #6366F1)", color: "white" }}>
            <ArrowLeft size={16} />Voltar para Trilhas
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
