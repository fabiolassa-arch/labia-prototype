/**
 * BadgeModal — Modal de conquista/detalhe de insígnia
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Brain, MessageSquare, Settings, Rocket,
  X, Sparkles, ArrowRight, Lock, Trophy, Star,
} from "lucide-react";
import { BADGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

interface BadgeModalProps {
  badgeId: number | null;
  onClose: () => void;
}

export default function BadgeModal({ badgeId, onClose }: BadgeModalProps) {
  const [, setLocation] = useLocation();
  const badge = BADGES.find((b) => b.id === badgeId);
  const t = useLabiaTheme();

  if (!badge) return null;

  const Icon = ICON_MAP[badge.icon] || Brain;
  const isEarned = badge.earned;
  const isInProgress = !badge.earned && (badge.progress ?? 0) > 0;
  const isLocked = !badge.earned && (badge.progress ?? 0) === 0;

  return (
    <AnimatePresence>
      {badgeId && (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

          <motion.div className="relative w-[320px] max-h-[85vh] overflow-y-auto rounded-3xl"
            style={{
              background: t.isDark ? "linear-gradient(180deg, #1A1F2E 0%, #0D1117 100%)" : "linear-gradient(180deg, #FFFFFF 0%, #F3F2FA 100%)",
              border: `1px solid ${isEarned ? badge.color : t.cardBorder}40`,
              scrollbarWidth: "none",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}>

            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: t.cardBg }}>
              <X size={16} style={{ color: t.textSecondary }} />
            </button>

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl opacity-20"
              style={{ background: isEarned ? badge.color : isInProgress ? badge.color : "#374151" }} />

            <div className="relative pt-10 pb-4 flex flex-col items-center">
              {isEarned && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full" style={{ background: badge.color }}
                      initial={{ opacity: 0, x: 0, y: 0 }}
                      animate={{ opacity: [0, 1, 0], x: [0, (Math.random() - 0.5) * 120], y: [0, (Math.random() - 0.5) * 120], scale: [0, 1.5, 0] }}
                      transition={{ duration: 2, delay: i * 0.15, repeat: Infinity, repeatDelay: 1 }} />
                  ))}
                </>
              )}

              <motion.div className="relative" initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}>
                <div className="w-28 h-28 rounded-full flex items-center justify-center"
                  style={{
                    background: isEarned
                      ? `conic-gradient(${badge.color}, ${badge.color}88, ${badge.color})`
                      : isInProgress
                      ? `conic-gradient(${badge.color} ${badge.progress}%, ${t.cardBorder} ${badge.progress}%)`
                      : t.cardBg,
                    padding: "3px",
                  }}>
                  <div className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: isEarned
                        ? `linear-gradient(135deg, ${badge.color}30, ${badge.color}15)`
                        : isInProgress
                        ? `linear-gradient(135deg, ${badge.color}20, ${badge.color}08)`
                        : t.cardBg,
                    }}>
                    {isLocked ? (
                      <Lock size={36} style={{ color: t.textMuted }} />
                    ) : (
                      <Icon size={36} style={{ color: isEarned ? badge.color : `${badge.color}99` }} />
                    )}
                  </div>
                </div>

                {isEarned && (
                  <motion.div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: badge.color, boxShadow: `0 0 20px ${badge.color}60` }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                    <Trophy size={16} className="text-white" />
                  </motion.div>
                )}

                {isInProgress && (
                  <motion.div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: t.isDark ? "#1A1F2E" : "#FFFFFF", border: `2px solid ${badge.color}` }}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                    <span className="text-xs font-bold" style={{ color: badge.color, fontFamily: "Nunito, sans-serif" }}>{badge.progress}%</span>
                  </motion.div>
                )}
              </motion.div>

              <motion.h2 className="text-xl font-black mt-5 text-center px-6"
                style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {badge.label}
              </motion.h2>

              <motion.p className="text-sm mt-1 text-center"
                style={{ fontFamily: "Inter, sans-serif", color: isEarned ? badge.color : t.textMuted }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                Trilha: {badge.track}
              </motion.p>

              <motion.div className="mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                {isEarned && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${badge.color}20`, color: badge.color, fontFamily: "Nunito, sans-serif" }}>
                    <Star size={12} fill={badge.color} />Conquistada!
                  </span>
                )}
                {isInProgress && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${badge.color}15`, color: badge.color, fontFamily: "Nunito, sans-serif" }}>
                    <Sparkles size={12} />Em progresso — {badge.progress}%
                  </span>
                )}
                {isLocked && (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: t.cardBg, color: t.textMuted, fontFamily: "Nunito, sans-serif" }}>
                    <Lock size={12} />Bloqueada
                  </span>
                )}
              </motion.div>
            </div>

            <div className="mx-6 h-px" style={{ background: t.divider }} />

            <motion.div className="px-6 pt-5 pb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h3 className="text-lg font-black text-center"
                style={{ fontFamily: "Nunito, sans-serif", color: isEarned ? badge.color : isInProgress ? badge.color : t.textSecondary }}>
                {badge.motivationTitle}
              </h3>
              <p className="text-sm mt-3 text-center leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                {badge.motivationMessage}
              </p>
            </motion.div>

            <motion.div className="mx-6 mb-5 p-4 rounded-2xl"
              style={{
                background: isEarned
                  ? `linear-gradient(135deg, ${badge.color}12, ${badge.color}06)`
                  : isInProgress
                  ? `linear-gradient(135deg, ${badge.color}10, ${badge.color}05)`
                  : t.cardBg,
                border: `1px solid ${isEarned || isInProgress ? `${badge.color}20` : t.cardBorder}`,
              }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight size={14} style={{ color: isEarned || isInProgress ? badge.color : t.textMuted }} />
                <p className="text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif", color: isEarned || isInProgress ? badge.color : t.textMuted }}>
                  Próximo passo
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                {badge.nextStep}
              </p>
            </motion.div>

            <motion.div className="px-6 pb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <button
                onClick={() => { onClose(); setLocation(badge.nextRoute); }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  background: isEarned
                    ? `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)`
                    : isInProgress
                    ? `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)`
                    : t.cardBg,
                  color: isEarned || isInProgress ? "white" : t.textSecondary,
                  boxShadow: isEarned || isInProgress ? `0 4px 20px ${badge.color}30` : "none",
                }}>
                {isEarned ? "Ir para próxima trilha" : isInProgress ? "Continuar trilha" : "Ver trilha"}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
