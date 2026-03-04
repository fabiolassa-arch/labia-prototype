/**
 * MeuPrimeiroAppTrilha — Detalhe da trilha "Meu Primeiro App"
 * Design: Banner gradiente roxo-azul, timeline de missões bloqueadas,
 * visual consistente com as outras trilhas mas com identidade própria
 * Cor principal: #7C3AED → #3B82F6 (roxo para azul)
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft, Rocket, Lock, Lightbulb, Users, ListChecks,
  Layout, GitBranch, AlertCircle, Sparkles, Trophy,
} from "lucide-react";
import { MISSIONS_MEU_PRIMEIRO_APP } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

const MISSION_ICONS = [Lightbulb, Users, ListChecks, Layout, GitBranch];

export default function MeuPrimeiroAppTrilha() {
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
            background: "linear-gradient(135deg, #7C3AED 0%, #6366F1 40%, #3B82F6 100%)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white rounded-2xl rotate-12" />
            <div className="absolute top-14 right-14 w-12 h-12 border-2 border-white rounded-xl -rotate-6" />
            <div className="absolute bottom-3 left-10 w-8 h-8 border border-white rounded-full" />
            <div className="absolute bottom-6 right-20 w-6 h-6 bg-white/20 rounded-full" />
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Rocket size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
            Meu Primeiro App
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
            5 missões • 0% concluído
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
              Complete a trilha <strong className="text-[#10B981]">"Criando Soluções"</strong> para desbloquear esta trilha.
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
            <Sparkles size={14} className="text-[#7C3AED]" />
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
              O que você vai aprender
            </p>
          </div>
          <div className="labia-card p-4">
            <div className="space-y-3">
              {[
                "Transformar uma ideia em um projeto real",
                "Definir público-alvo e objetivo do app",
                "Planejar funcionalidades essenciais",
                "Estruturar telas e fluxo de navegação",
                "Criar o documento completo do seu app",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#7C3AED]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                  </div>
                  <p className="text-white/70 text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final result card */}
        <motion.div
          className="mx-6 mt-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div
            className="p-4 rounded-2xl flex items-center gap-4"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08))",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(59,130,246,0.15))",
                border: "2px dashed rgba(124,58,237,0.3)",
              }}
            >
              <Trophy size={22} className="text-[#7C3AED]/50" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                Resultado final
              </p>
              <p className="text-white font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>
                Estrutura completa do seu app
              </p>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Documento exportável com todas as definições
              </p>
            </div>
          </div>
        </motion.div>

        {/* Badge reward */}
        <motion.div
          className="mx-6 mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="labia-card p-4 flex items-center gap-4" style={{ border: "1px solid rgba(124,58,237,0.15)" }}>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "2px dashed rgba(124,58,237,0.3)",
              }}
            >
              <Rocket size={22} className="text-[#7C3AED]/50" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                Recompensa
              </p>
              <p className="text-white font-bold text-sm mt-0.5" style={{ fontFamily: "Nunito, sans-serif" }}>
                Insígnia "Jovem Desenvolvedor"
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
              0/5
            </span>
          </div>

          {MISSIONS_MEU_PRIMEIRO_APP.map((mission, i) => {
            const MissionIcon = MISSION_ICONS[i] || Lightbulb;
            return (
              <motion.div
                key={mission.id}
                className="flex gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
              >
                {/* Timeline line */}
                {i < MISSIONS_MEU_PRIMEIRO_APP.length - 1 && (
                  <div
                    className="absolute left-[15px] top-[36px] w-0.5 h-[calc(100%-8px)]"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}

                {/* Status icon */}
                <div className="flex-shrink-0 mt-1 z-10">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Lock size={13} className="text-white/25" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-7 opacity-50">
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

                  {/* Mission tags */}
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
                        background: "rgba(124,58,237,0.08)",
                        color: "rgba(124,58,237,0.4)",
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

        {/* CTA to go back to Criando Soluções */}
        <motion.div
          className="mx-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            onClick={() => setLocation("/trilha-solucoes")}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
            style={{
              fontFamily: "Nunito, sans-serif",
              background: "linear-gradient(135deg, #7C3AED, #6366F1)",
              color: "white",
            }}
          >
            <ArrowLeft size={16} />
            Voltar para "Criando Soluções"
          </button>
        </motion.div>
      </div>
    </PhoneFrame>
  );
}
