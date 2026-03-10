/**
 * EnsinoMedio — Hub principal do módulo de Ensino Médio
 * Ponto de entrada com acesso às 5 telas novas.
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Brain, Zap, FileText, TrendingUp, BookOpen,
  Calculator, FlaskConical, Globe, Flame, Bell, Trophy,
  ChevronRight, Star, Clock, Target, Sparkles,
} from "lucide-react";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";
import ProgressBar from "@/components/ProgressBar";

const FEATURE_CARDS = [
  {
    id: "tutor",
    title: "Tutor IA",
    description: "Tire dúvidas escolares com a IA",
    icon: Brain,
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.08))",
    border: "rgba(124,58,237,0.3)",
    path: "/tutor-ia",
    badge: "Online",
    badgeColor: "#10B981",
  },
  {
    id: "desafio",
    title: "Desafio do Dia",
    description: "3 questões de Mat, Port e Atualidades",
    icon: Zap,
    color: "#F97316",
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.2), rgba(249,115,22,0.08))",
    border: "rgba(249,115,22,0.3)",
    path: "/desafio-do-dia",
    badge: "Novo",
    badgeColor: "#F97316",
  },
  {
    id: "redacao",
    title: "Redação ENEM",
    description: "Escreva ou envie foto da redação",
    icon: FileText,
    color: "#EF4444",
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.08))",
    border: "rgba(239,68,68,0.3)",
    path: "/redacao-enem",
    badge: "ENEM 2025",
    badgeColor: "#EF4444",
  },
  {
    id: "plano",
    title: "Plano de Estudos",
    description: "Diagnóstico + plano semanal personalizado",
    icon: Target,
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))",
    border: "rgba(16,185,129,0.3)",
    path: "/plano-de-estudos",
    badge: "IA",
    badgeColor: "#10B981",
  },
  {
    id: "progresso",
    title: "Meu Progresso",
    description: "Pontuação, conquistas e evolução",
    icon: TrendingUp,
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(59,130,246,0.08))",
    border: "rgba(59,130,246,0.3)",
    path: "/progresso-em",
    badge: "1240 XP",
    badgeColor: "#3B82F6",
  },
];

const QUICK_STATS = [
  { label: "Sequência", value: "7 dias", icon: Flame, color: "#F97316" },
  { label: "Desafios", value: "12/30", icon: Trophy, color: "#FFD700" },
  { label: "Nível", value: "3", icon: Star, color: "#7C3AED" },
];

const SUBJECTS_PREVIEW = [
  { label: "Matemática", icon: Calculator, color: "#7C3AED", progress: 72 },
  { label: "Português", icon: BookOpen, color: "#F97316", progress: 65 },
  { label: "Ciências", icon: FlaskConical, color: "#10B981", progress: 48 },
  { label: "Humanas", icon: Globe, color: "#3B82F6", progress: 55 },
];

export default function EnsinoMedio() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="flex items-center justify-between px-5 pt-5 pb-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setLocation("/home")} className="relative group">
              <img
                src={IMAGES.avatarBoy}
                alt="Avatar"
                className="w-11 h-11 rounded-full object-cover shadow-lg group-hover:ring-2 group-hover:ring-[#7C3AED] transition-all"
              />
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full"
                style={{ border: `2px solid ${t.bg}` }}
              />
            </button>
            <div>
              <p className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                Olá,
              </p>
              <p className="font-bold text-base leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                Lucas Oliveira
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <Flame size={10} className="text-[#7C3AED]" />
                <span className="text-[#7C3AED] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Ensino Médio · Nível 3
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/notificacoes")}
              className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
            >
              <Bell size={18} style={{ color: t.textSecondary }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
            </button>
          </div>
        </motion.div>

        {/* Banner */}
        <motion.div
          className="mx-5 mb-4 relative overflow-hidden rounded-2xl p-4"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "white", transform: "translate(30%, -30%)" }} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-white opacity-80" />
              <span className="text-white/80 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                Módulo Ensino Médio
              </span>
            </div>
            <p className="text-white font-black text-lg leading-tight mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
              Prepare-se para o ENEM!
            </p>
            <p className="text-white/80 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
              Tutor IA, desafios diários, redação e plano de estudos personalizado
            </p>
          </div>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          className="mx-5 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="grid grid-cols-3 gap-2">
            {QUICK_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl flex flex-col items-center gap-1"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                >
                  <Icon size={16} style={{ color: stat.color }} />
                  <p className="text-base font-black" style={{ fontFamily: "Nunito, sans-serif", color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-[9px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature cards */}
        <div className="mx-5 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
            Ferramentas de estudo
          </p>
          <div className="space-y-3">
            {FEATURE_CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.button
                  key={card.id}
                  onClick={() => setLocation(card.path)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all"
                  style={{ background: card.gradient, border: `1.5px solid ${card.border}` }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${card.color}25` }}
                  >
                    <Icon size={22} style={{ color: card.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                        {card.title}
                      </p>
                      <span
                        className="px-1.5 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0"
                        style={{ background: `${card.badgeColor}20`, color: card.badgeColor, fontFamily: "Inter, sans-serif" }}
                      >
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-xs leading-snug" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                      {card.description}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: card.color, flexShrink: 0 }} />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Subject progress preview */}
        <motion.div
          className="mx-5 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Progresso por matéria
            </p>
            <button
              onClick={() => setLocation("/progresso-em")}
              className="flex items-center gap-0.5 text-[#7C3AED] text-xs font-semibold"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Ver tudo <ChevronRight size={12} />
            </button>
          </div>
          <div className="labia-card p-4 space-y-3">
            {SUBJECTS_PREVIEW.map((subj) => {
              const Icon = subj.icon;
              return (
                <div key={subj.label} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${subj.color}20` }}
                  >
                    <Icon size={13} style={{ color: subj.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                        {subj.label}
                      </span>
                      <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: subj.color }}>
                        {subj.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: subj.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${subj.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Back to main app */}
        <motion.div
          className="mx-5 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={() => setLocation("/home")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold"
            style={{
              fontFamily: "Nunito, sans-serif",
              background: t.cardBg,
              border: `1.5px solid ${t.cardBorder}`,
              color: t.textSecondary,
            }}
          >
            <ArrowLeft size={14} />
            Voltar ao LabIA Principal
          </button>
        </motion.div>

        <div className="h-2" />
      </div>

      <BottomNavEM />
    </PhoneFrame>
  );
}
