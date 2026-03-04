/**
 * Portfolio — Tela de Portfólio Digital do aluno
 * Design: Insígnias conquistadas, apps criados, missões concluídas,
 * botão "Exportar Portfólio"
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  Brain, MessageSquare, Settings, Rocket, Lock, Plus,
  ChevronRight, Download, Star,
} from "lucide-react";
import { IMAGES, BADGES, USER_PROFILE } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

export default function Portfolio() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="pt-6 pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-white text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
              Meu Portfólio
            </h1>
            <Star size={18} className="text-[#F97316]" fill="#F97316" />
          </div>
          <p className="text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {USER_PROFILE.name} — Nível {USER_PROFILE.level}
          </p>
        </motion.div>

        {/* Badges section */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>
            Insígnias Conquistadas
          </h2>
          <div className="flex items-center justify-between">
            {BADGES.map((badge, i) => {
              const Icon = ICON_MAP[badge.icon] || Brain;
              return (
                <motion.div
                  key={badge.id}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center relative"
                    style={{
                      background: badge.earned ? `${badge.color}25` : "rgba(255,255,255,0.05)",
                      border: `2px solid ${badge.earned ? badge.color : "rgba(255,255,255,0.1)"}`,
                      boxShadow: badge.earned ? `0 0 12px ${badge.color}40` : "none",
                    }}
                  >
                    <Icon size={22} style={{ color: badge.earned ? badge.color : "rgba(255,255,255,0.2)" }} />
                    {!badge.earned && !badge.progress && (
                      <Lock size={10} className="absolute bottom-0.5 right-0.5 text-white/30" />
                    )}
                    {!badge.earned && badge.progress && (
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="26" fill="none" stroke={badge.color} strokeWidth="2.5"
                          strokeDasharray={`${(badge.progress / 100) * 163.4} 163.4`}
                          strokeLinecap="round" opacity="0.7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-center text-[9px] leading-tight max-w-[60px] font-semibold"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: badge.earned ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {badge.label}
                  </span>
                  {badge.earned && (
                    <span className="text-[8px] text-[#10B981] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                      Concluído
                    </span>
                  )}
                  {!badge.earned && badge.progress && (
                    <span className="text-[8px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: badge.color }}>
                      Em progresso: {badge.progress}%
                    </span>
                  )}
                  {!badge.earned && !badge.progress && (
                    <span className="text-[8px] text-white/20 font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                      Bloqueado
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* My Apps */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-white font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>
            Meus Apps
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* MathKids card */}
            <div className="labia-card p-3.5">
              <img src={IMAGES.mathkidsIcon} alt="MathKids" className="w-12 h-12 rounded-xl object-cover mb-2" />
              <p className="text-white font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>MathKids</p>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                Criado em: 15/10/2023
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/15 text-[#F97316]" style={{ fontFamily: "Inter, sans-serif" }}>
                Em desenvolvimento
              </span>
              <button
                onClick={() => setLocation("/builder")}
                className="flex items-center gap-1 mt-2 text-white/50 text-xs hover:text-white/70 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Ver detalhes <ChevronRight size={12} />
              </button>
            </div>

            {/* Create new app card */}
            <button
              onClick={() => setLocation("/builder")}
              className="rounded-2xl p-3.5 flex flex-col items-center justify-center gap-2 transition-all hover:bg-white/5"
              style={{
                border: "2px dashed rgba(249,115,22,0.4)",
                borderRadius: "1rem",
                minHeight: "140px",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                <Plus size={20} className="text-[#F97316]" />
              </div>
              <span className="text-white/50 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                Criar novo app
              </span>
            </button>
          </div>
        </motion.div>

        {/* Missions completed */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-white font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>
            Missões Concluídas
          </h2>
          <p className="text-white/50 text-sm mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            5 de 16 missões
          </p>
          {/* Segmented progress bar */}
          <div className="flex gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 h-3 rounded-sm"
                style={{
                  background: i < 5
                    ? ["#7C3AED", "#7C3AED", "#F97316", "#F97316", "#10B981"][i]
                    : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Export button */}
        <motion.button
          onClick={() => toast.success("Portfólio exportado! (protótipo)")}
          className="w-full labia-btn-primary flex items-center justify-center gap-2 text-base py-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Exportar Portfólio
          <Download size={18} />
        </motion.button>

        <div className="h-4" />
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
