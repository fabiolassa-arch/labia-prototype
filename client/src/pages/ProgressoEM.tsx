/**
 * ProgressoEM — Tela de Progresso do Ensino Médio
 * Exibe pontuação, desafios concluídos e evolução do aluno.
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Trophy, Zap, Star, CheckCircle2, Target,
  TrendingUp, Calendar, BookOpen, Calculator, FlaskConical,
  Globe, Brain, Flame, Award, ChevronRight,
} from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";
import ProgressBar from "@/components/ProgressBar";

const STATS = {
  totalXP: 1240,
  level: 3,
  levelName: "Estudante Avançado",
  nextLevelXP: 1500,
  streak: 7,
  challengesDone: 12,
  challengesTotal: 30,
  essaysSubmitted: 4,
  tutorQuestions: 28,
  studyDaysThisMonth: 18,
};

const SUBJECT_PROGRESS = [
  { subject: "Matemática", icon: Calculator, color: "#7C3AED", progress: 72, xp: 380, sessions: 8 },
  { subject: "Português", icon: BookOpen, color: "#F97316", progress: 65, xp: 290, sessions: 6 },
  { subject: "Ciências", icon: FlaskConical, color: "#10B981", progress: 48, xp: 210, sessions: 4 },
  { subject: "Humanas", icon: Globe, color: "#3B82F6", progress: 55, xp: 240, sessions: 5 },
  { subject: "Redação", icon: Brain, color: "#EF4444", progress: 80, xp: 120, sessions: 4 },
];

const RECENT_ACHIEVEMENTS = [
  { id: 1, title: "7 dias seguidos!", icon: Flame, color: "#F97316", description: "Sequência de 7 dias de estudo", xp: 100, earned: true },
  { id: 2, title: "Mestre da Redação", icon: Award, color: "#7C3AED", description: "4 redações enviadas", xp: 80, earned: true },
  { id: 3, title: "Desafiador", icon: Trophy, color: "#FFD700", description: "10 desafios concluídos", xp: 150, earned: true },
  { id: 4, title: "Curioso Digital", icon: Brain, color: "#10B981", description: "25 perguntas ao Tutor IA", xp: 60, earned: true },
  { id: 5, title: "Maratonista", icon: Target, color: "#3B82F6", description: "30 dias de estudo no mês", xp: 200, earned: false },
  { id: 6, title: "Nota 1000", icon: Star, color: "#F59E0B", description: "Redação com nota máxima", xp: 300, earned: false },
];

const WEEKLY_DATA = [
  { day: "Seg", xp: 80, done: true },
  { day: "Ter", xp: 120, done: true },
  { day: "Qua", xp: 60, done: true },
  { day: "Qui", xp: 140, done: true },
  { day: "Sex", xp: 90, done: true },
  { day: "Sáb", xp: 200, done: true },
  { day: "Dom", xp: 40, done: false },
];

const maxXP = Math.max(...WEEKLY_DATA.map((d) => d.xp));

export default function ProgressoEM() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const [activeTab, setActiveTab] = useState<"geral" | "materias" | "conquistas">("geral");

  const levelProgress = ((STATS.totalXP - 1000) / (STATS.nextLevelXP - 1000)) * 100;

  return (
    <PhoneFrame>
      {/* Header */}
      <motion.div
        className="flex-shrink-0"
        style={{ background: t.headerBg }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 px-5 pt-14 pb-3">
          <button
            onClick={() => setLocation("/ensino-medio")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.cardBg }}
          >
            <ArrowLeft size={18} style={{ color: t.textSecondary }} />
          </button>
          <div className="flex-1">
            <p className="font-black text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Meu Progresso
            </p>
            <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              Ensino Médio · {STATS.levelName}
            </p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(249,115,22,0.15)" }}>
            <Zap size={12} className="text-[#F97316]" />
            <span className="text-xs font-black text-[#F97316]" style={{ fontFamily: "Nunito, sans-serif" }}>
              {STATS.totalXP} XP
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-5 pb-3">
          {(["geral", "materias", "conquistas"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all"
              style={{
                fontFamily: "Inter, sans-serif",
                background: activeTab === tab ? "#7C3AED" : t.cardBg,
                color: activeTab === tab ? "#fff" : t.textMuted,
                border: `1px solid ${activeTab === tab ? "#7C3AED" : t.cardBorder}`,
              }}
            >
              {tab === "materias" ? "Matérias" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {/* GERAL TAB */}
        {activeTab === "geral" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Level card */}
            <motion.div
              className="p-5 rounded-2xl mb-4"
              style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(249,115,22,0.1))", border: "1px solid rgba(124,58,237,0.25)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #F97316)" }}
                >
                  <span className="text-2xl font-black text-white" style={{ fontFamily: "Nunito, sans-serif" }}>
                    {STATS.level}
                  </span>
                </div>
                <div>
                  <p className="font-black text-lg" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                    Nível {STATS.level}
                  </p>
                  <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                    {STATS.levelName}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Flame size={11} className="text-[#F97316]" />
                    <span className="text-xs font-bold text-[#F97316]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {STATS.streak} dias seguidos!
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                    {STATS.totalXP} / {STATS.nextLevelXP} XP para Nível {STATS.level + 1}
                  </span>
                  <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: "#7C3AED" }}>
                    {Math.round(levelProgress)}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7C3AED, #F97316)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${levelProgress}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label: "Desafios concluídos", value: `${STATS.challengesDone}/${STATS.challengesTotal}`, icon: Trophy, color: "#FFD700" },
                { label: "Redações enviadas", value: STATS.essaysSubmitted.toString(), icon: BookOpen, color: "#7C3AED" },
                { label: "Perguntas ao Tutor", value: STATS.tutorQuestions.toString(), icon: Brain, color: "#10B981" },
                { label: "Dias estudados", value: `${STATS.studyDaysThisMonth}/30`, icon: Calendar, color: "#F97316" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    className="p-4 rounded-2xl"
                    style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                      style={{ background: `${stat.color}20` }}
                    >
                      <Icon size={16} style={{ color: stat.color }} />
                    </div>
                    <p className="text-xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] mt-0.5 leading-tight" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Weekly XP chart */}
            <motion.div
              className="p-4 rounded-2xl mb-4"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  XP esta semana
                </p>
                <div className="flex items-center gap-1">
                  <TrendingUp size={13} className="text-[#10B981]" />
                  <span className="text-xs font-bold text-[#10B981]" style={{ fontFamily: "Inter, sans-serif" }}>
                    +{WEEKLY_DATA.reduce((s, d) => s + d.xp, 0)} XP
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-24">
                {WEEKLY_DATA.map((day, i) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div
                      className="w-full rounded-t-lg"
                      style={{
                        height: `${(day.xp / maxXP) * 80}px`,
                        background: day.done
                          ? "linear-gradient(180deg, #7C3AED, #F97316)"
                          : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        minHeight: 4,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.xp / maxXP) * 80}px` }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.07 }}
                    />
                    <span className="text-[9px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MATERIAS TAB */}
        {activeTab === "materias" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pt-1">
            {SUBJECT_PROGRESS.map((subj, i) => {
              const Icon = subj.icon;
              return (
                <motion.div
                  key={subj.subject}
                  className="p-4 rounded-2xl"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${subj.color}20` }}
                    >
                      <Icon size={18} style={{ color: subj.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                          {subj.subject}
                        </p>
                        <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: subj.color }}>
                          {subj.progress}%
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                          {subj.xp} XP · {subj.sessions} sessões
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: subj.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${subj.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CONQUISTAS TAB */}
        {activeTab === "conquistas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-3 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                {RECENT_ACHIEVEMENTS.filter((a) => a.earned).length} de {RECENT_ACHIEVEMENTS.length} conquistas
              </p>
              <div className="flex items-center gap-1">
                <Zap size={11} className="text-[#F97316]" />
                <span className="text-xs font-bold text-[#F97316]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {RECENT_ACHIEVEMENTS.filter((a) => a.earned).reduce((s, a) => s + a.xp, 0)} XP total
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {RECENT_ACHIEVEMENTS.map((achievement, i) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    className="p-4 rounded-2xl flex flex-col items-center text-center gap-2"
                    style={{
                      background: achievement.earned
                        ? `${achievement.color}12`
                        : t.cardBg,
                      border: `1.5px solid ${achievement.earned ? achievement.color + "40" : t.cardBorder}`,
                      opacity: achievement.earned ? 1 : 0.5,
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: achievement.earned ? 1 : 0.5, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: achievement.earned ? `${achievement.color}25` : t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        boxShadow: achievement.earned ? `0 0 16px ${achievement.color}30` : "none",
                      }}
                    >
                      <Icon size={22} style={{ color: achievement.earned ? achievement.color : t.textMuted }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: achievement.earned ? t.textPrimary : t.textMuted }}>
                        {achievement.title}
                      </p>
                      <p className="text-[9px] mt-0.5 leading-tight" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                        {achievement.description}
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                      style={{ background: achievement.earned ? `${achievement.color}20` : t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
                    >
                      <Zap size={9} style={{ color: achievement.earned ? achievement.color : t.textMuted }} />
                      <span className="text-[9px] font-bold" style={{ fontFamily: "Inter, sans-serif", color: achievement.earned ? achievement.color : t.textMuted }}>
                        +{achievement.xp} XP
                      </span>
                    </div>
                    {!achievement.earned && (
                      <p className="text-[9px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                        Bloqueada
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNavEM />
    </PhoneFrame>
  );
}
