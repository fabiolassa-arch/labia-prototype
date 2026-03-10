/**
 * HomeEM — Dashboard principal do aluno de Ensino Médio
 * Design: "ENEM Mission Control" — foco em preparação, rotina e progresso
 * Segue o mesmo padrão visual da Home principal (PhoneFrame, useLabiaTheme,
 * Nunito + Inter, animações Framer Motion, paleta roxo #7C3AED + laranja #F97316)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  Bell, ChevronRight, Flame, Trophy, Zap, Clock, Play,
  Brain, FileText, Target, TrendingUp, BookOpen, Calculator,
  FlaskConical, Globe, Star, Sparkles, Gift, X, CheckCircle2,
  Calendar, BarChart2, Lightbulb, Award, ArrowRight,
} from "lucide-react";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";
import ProgressBar from "@/components/ProgressBar";

/* ─────────────────────────────────────────────
   Dados estáticos de exemplo
───────────────────────────────────────────── */

const STUDENT = {
  name: "Lucas Oliveira",
  level: 3,
  levelName: "Estudante Avançado",
  xp: 1240,
  nextXP: 1500,
  streak: 7,
  examDate: "03 Nov 2025",
  daysToExam: 238,
};

const TODAY_CHALLENGE = {
  done: false,
  subject: "Matemática",
  topic: "Funções do 2º grau",
  xp: 30,
  color: "#7C3AED",
};

const ACTIVE_STUDY = {
  subject: "Redação ENEM",
  topic: "Proposta de intervenção — Saúde Mental",
  progress: 60,
  color: "#EF4444",
  path: "/redacao-enem",
};

const QUICK_ACCESS = [
  { label: "Tutor IA", icon: Brain, color: "#7C3AED", bg: "rgba(124,58,237,0.15)", path: "/tutor-ia", badge: "Online" },
  { label: "Desafio", icon: Zap, color: "#F97316", bg: "rgba(249,115,22,0.15)", path: "/desafio-do-dia", badge: "Novo" },
  { label: "Redação", icon: FileText, color: "#EF4444", bg: "rgba(239,68,68,0.15)", path: "/redacao-enem", badge: null },
  { label: "Plano", icon: Target, color: "#10B981", bg: "rgba(16,185,129,0.15)", path: "/plano-de-estudos", badge: null },
];

const SUBJECT_PROGRESS = [
  { label: "Matemática", icon: Calculator, color: "#7C3AED", progress: 72 },
  { label: "Português", icon: BookOpen, color: "#F97316", progress: 65 },
  { label: "Ciências", icon: FlaskConical, color: "#10B981", progress: 48 },
  { label: "Humanas", icon: Globe, color: "#3B82F6", progress: 55 },
  { label: "Redação", icon: FileText, color: "#EF4444", progress: 80 },
];

const WEEKLY_PLAN = [
  { day: "Seg", done: true, subject: "Mat", color: "#7C3AED" },
  { day: "Ter", done: true, subject: "Port", color: "#F97316" },
  { day: "Qua", done: true, subject: "Cien", color: "#10B981" },
  { day: "Qui", done: true, subject: "Red", color: "#EF4444" },
  { day: "Sex", done: false, subject: "Hum", color: "#3B82F6", today: true },
  { day: "Sáb", done: false, subject: "Mat", color: "#7C3AED" },
  { day: "Dom", done: false, subject: "Rev", color: "#F59E0B" },
];

const RECENT_ACHIEVEMENTS = [
  { title: "7 dias seguidos!", icon: Flame, color: "#F97316", xp: 100 },
  { title: "Mestre da Redação", icon: Award, color: "#7C3AED", xp: 80 },
  { title: "Desafiador", icon: Trophy, color: "#FFD700", xp: 150 },
];

const TIP_OF_DAY = "Na redação do ENEM, a proposta de intervenção deve conter: agente, ação, modo/meio, finalidade e detalhamento.";

/* ─────────────────────────────────────────────
   Componentes internos
───────────────────────────────────────────── */

function Header() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const levelPct = Math.round(((STUDENT.xp - 1000) / (STUDENT.nextXP - 1000)) * 100);

  return (
    <motion.div
      className="px-5 pt-5 pb-3"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-3">
        {/* Avatar + nome */}
        <div className="flex items-center gap-3">
          <button onClick={() => setLocation("/perfil")} className="relative group flex-shrink-0">
            <img
              src={IMAGES.avatarBoy}
              alt="Avatar"
              className="w-12 h-12 rounded-full object-cover shadow-lg group-hover:ring-2 group-hover:ring-[#7C3AED] transition-all"
            />
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full"
              style={{ border: `2px solid ${t.bg}` }}
            />
          </button>
          <div>
            <p className="text-[11px] font-medium" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Bom dia,
            </p>
            <p className="font-black text-base leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              {STUDENT.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Flame size={10} className="text-[#7C3AED]" />
              <span className="text-[10px] font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#7C3AED" }}>
                Nível {STUDENT.level} · {STUDENT.levelName}
              </span>
            </div>
          </div>
        </div>

        {/* Notificação + streak */}
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl"
            style={{ background: "rgba(249,115,22,0.15)" }}
          >
            <Flame size={13} className="text-[#F97316]" />
            <span className="text-[#F97316] text-xs font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
              {STUDENT.streak}
            </span>
          </div>
          <button
            onClick={() => setLocation("/notificacoes")}
            className="relative w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
          >
            <Bell size={17} style={{ color: t.textSecondary }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
          </button>
        </div>
      </div>

      {/* XP bar */}
      <div
        className="rounded-2xl p-3"
        style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
      >
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Zap size={12} className="text-[#7C3AED]" />
            <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Progresso XP
            </span>
          </div>
          <span className="text-xs font-black" style={{ fontFamily: "Nunito, sans-serif", color: "#7C3AED" }}>
            {STUDENT.xp} / {STUDENT.nextXP} XP
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7C3AED, #F97316)" }}
            initial={{ width: 0 }}
            animate={{ width: `${levelPct}%` }}
            transition={{ duration: 1, delay: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
            {levelPct}% para o Nível {STUDENT.level + 1}
          </span>
          <div className="flex items-center gap-1">
            <Calendar size={9} style={{ color: t.textMuted }} />
            <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              ENEM em {STUDENT.daysToExam} dias
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CountdownBanner() {
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4 relative overflow-hidden rounded-2xl p-4"
      style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Círculos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-15" style={{ background: "white", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full opacity-10" style={{ background: "white", transform: "translate(-30%, 30%)" }} />

      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles size={12} className="text-white/80" />
            <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
              Contagem regressiva
            </span>
          </div>
          <p className="text-white font-black text-xl leading-none" style={{ fontFamily: "Nunito, sans-serif" }}>
            {STUDENT.daysToExam} dias
          </p>
          <p className="text-white/80 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
            para o ENEM · {STUDENT.examDate}
          </p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <Trophy size={26} className="text-white" />
          </div>
          <span className="text-white/80 text-[9px] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
            Meta: Top 10%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function DailyChallengeBanner() {
  const [, setLocation] = useLocation();
  const [collected, setCollected] = useState(false);
  const t = useLabiaTheme();

  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div
        className="relative overflow-hidden rounded-2xl p-4"
        style={{
          background: t.cardBg,
          border: `1.5px solid ${collected ? "rgba(16,185,129,0.4)" : "rgba(249,115,22,0.3)"}`,
        }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ background: collected ? "#10B981" : "#F97316" }}
        />
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: collected ? "rgba(16,185,129,0.2)" : "rgba(249,115,22,0.2)" }}
            animate={collected ? {} : { rotate: [0, -8, 8, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {collected
              ? <CheckCircle2 size={22} className="text-[#10B981]" />
              : <Gift size={22} className="text-[#F97316]" />
            }
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                {collected ? "Desafio concluído!" : "Desafio do Dia"}
              </p>
              <span
                className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
                style={{
                  background: collected ? "rgba(16,185,129,0.2)" : "rgba(249,115,22,0.2)",
                  color: collected ? "#10B981" : "#F97316",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                +{TODAY_CHALLENGE.xp} XP
              </span>
            </div>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              {collected
                ? "Você ganhou +30 XP hoje. Volte amanhã!"
                : `${TODAY_CHALLENGE.subject} · ${TODAY_CHALLENGE.topic}`}
            </p>
          </div>
          {!collected && (
            <button
              onClick={() => setLocation("/desafio-do-dia")}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-white text-xs font-bold"
              style={{ background: "#F97316", fontFamily: "Nunito, sans-serif" }}
            >
              <Play size={11} fill="white" />
              Jogar
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function QuickAccess() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        Acesso rápido
      </p>
      <div className="grid grid-cols-4 gap-2">
        {QUICK_ACCESS.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              onClick={() => setLocation(item.path)}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl relative"
              style={{ background: item.bg, border: `1px solid ${item.color}25` }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {item.badge && (
                <span
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold text-white"
                  style={{ background: item.color, fontFamily: "Inter, sans-serif" }}
                >
                  {item.badge}
                </span>
              )}
              <Icon size={20} style={{ color: item.color }} />
              <span className="text-[10px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: item.color }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function ActiveStudy() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.28 }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        Em andamento
      </p>
      <div
        className="labia-card p-4 relative overflow-hidden"
        style={{ borderLeft: `4px solid ${ACTIVE_STUDY.color}` }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(90deg, ${ACTIVE_STUDY.color}08, transparent)` }} />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACTIVE_STUDY.color}20` }}>
            <FileText size={18} style={{ color: ACTIVE_STUDY.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              {ACTIVE_STUDY.subject}
            </p>
            <p className="text-xs mt-0.5 truncate" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              {ACTIVE_STUDY.topic}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <ProgressBar value={ACTIVE_STUDY.progress} className="flex-1" />
              <span className="text-xs font-bold flex-shrink-0" style={{ fontFamily: "Nunito, sans-serif", color: ACTIVE_STUDY.color }}>
                {ACTIVE_STUDY.progress}%
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setLocation(ACTIVE_STUDY.path)}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white font-bold text-sm"
          style={{ background: ACTIVE_STUDY.color, fontFamily: "Nunito, sans-serif" }}
        >
          <Play size={13} fill="white" />
          Continuar
        </button>
      </div>
    </motion.div>
  );
}

function WeeklyCalendar() {
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.33 }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
          Semana de estudos
        </p>
        <span className="text-[10px] font-bold" style={{ fontFamily: "Inter, sans-serif", color: "#10B981" }}>
          4/7 dias ✓
        </span>
      </div>
      <div className="labia-card p-3">
        <div className="grid grid-cols-7 gap-1">
          {WEEKLY_PLAN.map((d, i) => (
            <div key={d.day} className="flex flex-col items-center gap-1">
              <span className="text-[9px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                {d.day}
              </span>
              <motion.div
                className="w-8 h-8 rounded-xl flex items-center justify-center relative"
                style={{
                  background: d.done
                    ? `${d.color}25`
                    : d.today
                    ? `${d.color}15`
                    : t.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  border: d.today ? `2px solid ${d.color}` : "none",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                {d.done ? (
                  <CheckCircle2 size={14} style={{ color: d.color }} />
                ) : (
                  <span className="text-[8px] font-bold" style={{ fontFamily: "Inter, sans-serif", color: d.today ? d.color : t.textMuted }}>
                    {d.subject}
                  </span>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SubjectProgress() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.38 }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
          Progresso por matéria
        </p>
        <button
          onClick={() => setLocation("/progresso-em")}
          className="flex items-center gap-0.5 text-[10px] font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: "#7C3AED" }}
        >
          Ver tudo <ChevronRight size={11} />
        </button>
      </div>
      <div className="labia-card p-4 space-y-3">
        {SUBJECT_PROGRESS.map((subj, i) => {
          const Icon = subj.icon;
          return (
            <div key={subj.label} className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${subj.color}20` }}>
                <Icon size={13} style={{ color: subj.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                    {subj.label}
                  </span>
                  <span className="text-xs font-black" style={{ fontFamily: "Nunito, sans-serif", color: subj.color }}>
                    {subj.progress}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: subj.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${subj.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.07 }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function TipOfDay() {
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.43 }}
    >
      <div
        className="rounded-2xl p-4 relative overflow-hidden"
        style={{
          background: t.isDark ? "rgba(124,58,237,0.12)" : "rgba(124,58,237,0.06)",
          border: "1.5px solid rgba(124,58,237,0.25)",
        }}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(124,58,237,0.2)" }}>
            <Lightbulb size={17} className="text-[#7C3AED]" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold mb-1" style={{ fontFamily: "Nunito, sans-serif", color: "#7C3AED" }}>
              Dica do dia
            </p>
            <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              {TIP_OF_DAY}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function RecentAchievements() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.48 }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
          Conquistas recentes
        </p>
        <button
          onClick={() => setLocation("/progresso-em")}
          className="flex items-center gap-0.5 text-[10px] font-semibold"
          style={{ fontFamily: "Inter, sans-serif", color: "#7C3AED" }}
        >
          Ver todas <ChevronRight size={11} />
        </button>
      </div>
      <div className="flex gap-2">
        {RECENT_ACHIEVEMENTS.map((ach, i) => {
          const Icon = ach.icon;
          return (
            <motion.div
              key={ach.title}
              className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl"
              style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.07 }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${ach.color}20` }}>
                <Icon size={17} style={{ color: ach.color }} />
              </div>
              <p className="text-[9px] font-bold text-center leading-tight" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                {ach.title}
              </p>
              <span className="text-[9px] font-semibold" style={{ fontFamily: "Inter, sans-serif", color: ach.color }}>
                +{ach.xp} XP
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function StudyPlanCTA() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.53 }}
    >
      <button
        onClick={() => setLocation("/plano-de-estudos")}
        className="w-full flex items-center justify-between p-4 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))",
          border: "1.5px solid rgba(16,185,129,0.3)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(16,185,129,0.2)" }}>
            <Target size={19} className="text-[#10B981]" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Plano de Estudos
            </p>
            <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Semana personalizada com IA
            </p>
          </div>
        </div>
        <ArrowRight size={16} className="text-[#10B981]" />
      </button>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────── */

export default function HomeEM() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
        <Header />
        <CountdownBanner />
        <DailyChallengeBanner />
        <QuickAccess />
        <ActiveStudy />
        <WeeklyCalendar />
        <SubjectProgress />
        <TipOfDay />
        <RecentAchievements />
        <StudyPlanCTA />
        <div className="h-2" />
      </div>
      <BottomNavEM />
    </PhoneFrame>
  );
}
