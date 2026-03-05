/**
 * Portfolio — Tela de Portfólio Digital do aluno
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  Brain, MessageSquare, Settings, Rocket, Lock, Plus,
  ChevronRight, Download, Star,
} from "lucide-react";
import { IMAGES, BADGES, USER_PROFILE } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import BadgeModal from "@/components/BadgeModal";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

export default function Portfolio() {
  const [, setLocation] = useLocation();
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div className="pt-6 pb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Meu Portfólio
            </h1>
            <Star size={18} className="text-[#F97316]" fill="#F97316" />
          </div>
          <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
            {USER_PROFILE.name} — Nível {USER_PROFILE.level}
          </p>
        </motion.div>

        {/* Badges section */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
            Insígnias Conquistadas
          </h2>
          <div className="flex items-center justify-between">
            {BADGES.map((badge, i) => {
              const Icon = ICON_MAP[badge.icon] || Brain;
              return (
                <motion.button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge.id)}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center relative"
                    style={{
                      background: badge.earned ? `${badge.color}25` : t.cardBg,
                      border: `2px solid ${badge.earned ? badge.color : t.cardBorder}`,
                      boxShadow: badge.earned ? `0 0 12px ${badge.color}40` : "none",
                    }}
                  >
                    <Icon size={22} style={{ color: badge.earned ? badge.color : t.textMuted }} />
                    {!badge.earned && !badge.progress && (
                      <Lock size={10} className="absolute bottom-0.5 right-0.5" style={{ color: t.textMuted }} />
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
                  <span className="text-center text-[9px] leading-tight max-w-[60px] font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", color: badge.earned ? t.textSecondary : t.textMuted }}>
                    {badge.label}
                  </span>
                  {badge.earned && (
                    <span className="text-[8px] text-[#10B981] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Concluído</span>
                  )}
                  {!badge.earned && badge.progress && (
                    <span className="text-[8px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: badge.color }}>
                      Em progresso: {badge.progress}%
                    </span>
                  )}
                  {!badge.earned && !badge.progress && (
                    <span className="text-[8px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Bloqueado</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* My Apps */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 className="font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
            Meus Apps
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="labia-card p-3.5">
              <img src={IMAGES.mathkidsIcon} alt="MathKids" className="w-12 h-12 rounded-xl object-cover mb-2" />
              <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>MathKids</p>
              <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                Criado em: 15/10/2023
              </p>
              <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/15 text-[#F97316]" style={{ fontFamily: "Inter, sans-serif" }}>
                Em desenvolvimento
              </span>
              <button onClick={() => setLocation("/builder")}
                className="flex items-center gap-1 mt-2 text-xs transition-colors"
                style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                Ver detalhes <ChevronRight size={12} />
              </button>
            </div>

            <button onClick={() => setLocation("/builder")}
              className="rounded-2xl p-3.5 flex flex-col items-center justify-center gap-2 transition-all"
              style={{
                border: `2px dashed ${t.isDark ? "rgba(249,115,22,0.4)" : "rgba(249,115,22,0.3)"}`,
                borderRadius: "1rem",
                minHeight: "140px",
              }}>
              <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                <Plus size={20} className="text-[#F97316]" />
              </div>
              <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                Criar novo app
              </span>
            </button>
          </div>
        </motion.div>

        {/* Missions completed */}
        <motion.div className="mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <h2 className="font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
            Missões Concluídas
          </h2>
          <p className="text-sm mb-2" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
            5 de 16 missões
          </p>
          <div className="flex gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="flex-1 h-3 rounded-sm"
                style={{
                  background: i < 5
                    ? ["#7C3AED", "#7C3AED", "#F97316", "#F97316", "#10B981"][i]
                    : t.toggleOff,
                }} />
            ))}
          </div>
        </motion.div>

        {/* Export button */}
        <motion.button
          onClick={() => toast.success("Portfólio exportado! (protótipo)")}
          className="w-full labia-btn-primary flex items-center justify-center gap-2 text-base py-4 mb-4"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          Exportar Portfólio
          <Download size={18} />
        </motion.button>

        <div className="h-4" />
      </div>
      <BottomNav />
      <BadgeModal badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </PhoneFrame>
  );
}
