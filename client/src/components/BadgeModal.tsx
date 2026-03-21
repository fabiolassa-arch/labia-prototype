/**
 * BadgeModal — Modal de conquista/detalhe de insígnia
 * Versão aprimorada com animações de celebração para crianças:
 * - Explosão de confete ao abrir insígnias conquistadas
 * - Ícone com animação de "troféu caindo"
 * - Partículas orbitando o ícone
 * - Texto de parabéns com entrada animada
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
import { ConfettiEffect } from "./ConfettiEffect";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

interface BadgeModalProps {
  badgeId: number | null;
  onClose: () => void;
}

/* Partículas orbitando o ícone da insígnia */
function OrbitParticles({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            top: "50%",
            left: "50%",
            marginTop: -4,
            marginLeft: -4,
          }}
          animate={{
            x: Math.cos((i / 6) * Math.PI * 2) * 70,
            y: Math.sin((i / 6) * Math.PI * 2) * 70,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.15,
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
        />
      ))}
    </>
  );
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
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/72 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="relative w-[320px] max-h-[85vh] overflow-y-auto rounded-3xl"
            style={{
              background: t.isDark
                ? "linear-gradient(180deg, #1A1F2E 0%, #0D1117 100%)"
                : "linear-gradient(180deg, #FFFFFF 0%, #F3F2FA 100%)",
              border: `1px solid ${isEarned ? badge.color : t.cardBorder}40`,
              scrollbarWidth: "none",
            }}
            initial={{ opacity: 0, scale: 0.7, y: 40, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 30 }}
            transition={{ type: "spring", damping: 20, stiffness: 280 }}
          >
            {/* Confete para insígnias conquistadas */}
            {isEarned && <ConfettiEffect active={true} count={32} />}

            {/* Botão fechar */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: t.cardBg }}
              whileHover={{ scale: 1.15, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <X size={16} style={{ color: t.textSecondary }} />
            </motion.button>

            {/* Glow de fundo */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-52 rounded-full blur-3xl"
              style={{ background: isEarned ? badge.color : isInProgress ? badge.color : "#374151" }}
              animate={{ opacity: [0.15, 0.28, 0.15], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Ícone da insígnia */}
            <div className="relative pt-10 pb-4 flex flex-col items-center">
              <div className="relative">
                <OrbitParticles color={badge.color} active={isEarned} />

                <motion.div
                  className="relative"
                  initial={{ scale: 0, rotate: -30, y: -20 }}
                  animate={{ scale: 1, rotate: 0, y: 0 }}
                  transition={{ type: "spring", damping: 10, stiffness: 180, delay: 0.1 }}
                >
                  <div
                    className="w-28 h-28 rounded-full flex items-center justify-center"
                    style={{
                      background: isEarned
                        ? `conic-gradient(${badge.color}, ${badge.color}88, ${badge.color})`
                        : isInProgress
                        ? `conic-gradient(${badge.color} ${badge.progress}%, ${t.cardBorder} ${badge.progress}%)`
                        : t.cardBg,
                      padding: "3px",
                    }}
                  >
                    <motion.div
                      className="w-full h-full rounded-full flex items-center justify-center"
                      style={{
                        background: isEarned
                          ? `linear-gradient(135deg, ${badge.color}30, ${badge.color}15)`
                          : isInProgress
                          ? `linear-gradient(135deg, ${badge.color}20, ${badge.color}08)`
                          : t.cardBg,
                      }}
                      animate={isEarned ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isLocked ? (
                        <Lock size={36} style={{ color: t.textMuted }} />
                      ) : (
                        <motion.div
                          animate={isEarned ? { rotate: [0, -8, 8, 0] } : {}}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        >
                          <Icon size={36} style={{ color: isEarned ? badge.color : `${badge.color}99` }} />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>

                  {/* Badge de troféu / progresso */}
                  {isEarned && (
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: badge.color, boxShadow: `0 0 24px ${badge.color}70` }}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring", damping: 10 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      >
                        <Trophy size={16} className="text-white" />
                      </motion.div>
                    </motion.div>
                  )}

                  {isInProgress && (
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: t.isDark ? "#1A1F2E" : "#FFFFFF", border: `2px solid ${badge.color}` }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <span className="text-xs font-bold" style={{ color: badge.color, fontFamily: "Nunito, sans-serif" }}>
                        {badge.progress}%
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Nome da insígnia */}
              <motion.h2
                className="text-xl font-black mt-5 text-center px-6"
                style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                {badge.label}
              </motion.h2>

              <motion.p
                className="text-sm mt-1 text-center"
                style={{ fontFamily: "Inter, sans-serif", color: isEarned ? badge.color : t.textMuted }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Trilha: {badge.track}
              </motion.p>

              {/* Status badge */}
              <motion.div
                className="mt-3"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", damping: 12 }}
              >
                {isEarned && (
                  <motion.span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${badge.color}20`, color: badge.color, fontFamily: "Nunito, sans-serif" }}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Star size={12} fill={badge.color} />
                    Conquistada! 🎉
                  </motion.span>
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

            {/* Mensagem motivacional */}
            <motion.div
              className="px-6 pt-5 pb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3
                className="text-lg font-black text-center"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  color: isEarned ? badge.color : isInProgress ? badge.color : t.textSecondary,
                }}
              >
                {badge.motivationTitle}
              </h3>
              <p
                className="text-sm mt-3 text-center leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}
              >
                {badge.motivationMessage}
              </p>
            </motion.div>

            {/* Próximo passo */}
            <motion.div
              className="mx-6 mb-5 p-4 rounded-2xl"
              style={{
                background: isEarned
                  ? `linear-gradient(135deg, ${badge.color}12, ${badge.color}06)`
                  : isInProgress
                  ? `linear-gradient(135deg, ${badge.color}10, ${badge.color}05)`
                  : t.cardBg,
                border: `1px solid ${isEarned || isInProgress ? `${badge.color}20` : t.cardBorder}`,
              }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={14} style={{ color: isEarned || isInProgress ? badge.color : t.textMuted }} />
                </motion.div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif", color: isEarned || isInProgress ? badge.color : t.textMuted }}
                >
                  Próximo passo
                </p>
              </div>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                {badge.nextStep}
              </p>
            </motion.div>

            {/* Botão de ação */}
            <motion.div
              className="px-6 pb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => { onClose(); setLocation(badge.nextRoute); }}
                className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  background: isEarned
                    ? `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)`
                    : isInProgress
                    ? `linear-gradient(135deg, ${badge.color}, ${badge.color}cc)`
                    : t.cardBg,
                  color: isEarned || isInProgress ? "white" : t.textSecondary,
                  boxShadow: isEarned || isInProgress ? `0 4px 24px ${badge.color}35` : "none",
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {isEarned ? "Ir para próxima trilha" : isInProgress ? "Continuar trilha" : "Ver trilha"}
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
