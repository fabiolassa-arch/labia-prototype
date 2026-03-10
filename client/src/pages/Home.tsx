/**
 * Home — Dashboard principal do aluno
 * Design: "Friendly Mission Control"
 * Suporta tema claro e escuro via useLabiaTheme
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  Brain, MessageSquare, Settings, Rocket, Bell, ChevronRight,
  Star, Lock, CheckCircle2, Zap, Clock, Play, Flame, Trophy,
  Gift, Sparkles, X,
} from "lucide-react";
import { IMAGES, TRACKS, BADGES } from "@/data";
import { useTutorial, TUTORIAL_STEPS } from "@/components/TutorialOverlay";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import ProgressBar from "@/components/ProgressBar";
import BadgeModal from "@/components/BadgeModal";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

function Header() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="flex items-center justify-between px-5 pt-5 pb-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3">
        <button onClick={() => setLocation("/perfil")} className="relative group">
          <img src={IMAGES.avatarBoy} alt="Avatar" className="w-11 h-11 rounded-full object-cover shadow-lg group-hover:ring-2 group-hover:ring-[#F97316] transition-all" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full" style={{ border: `2px solid ${t.bg}` }} />
        </button>
        <div>
          <p className="text-xs font-medium" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Olá,</p>
          <p className="font-bold text-base leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Lucas Oliveira</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Flame size={10} className="text-[#F97316]" />
            <span className="text-[#F97316] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Nível 2 — Explorador</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => setLocation("/notificacoes")}
        className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors"
        style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
      >
        <Bell size={18} style={{ color: t.textSecondary }} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
      </button>
    </motion.div>
  );
}

function DailyRewardReminder() {
  const [, setLocation] = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const t = useLabiaTheme();

  if (dismissed) return null;

  return (
    <motion.div
      className="mx-5 mt-2 relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #F97316 0%, #F59E0B 60%, #EF4444 100%)", opacity: t.isDark ? 0.15 : 0.1 }} />
      <div className="absolute inset-0" style={{ border: "1px solid rgba(249,115,22,0.25)", borderRadius: "1rem" }} />
      <motion.div className="absolute top-2 right-12 w-1 h-1 rounded-full bg-[#F59E0B]" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      <motion.div className="absolute bottom-3 right-20 w-0.5 h-0.5 rounded-full bg-[#F97316]" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }} />
      <div className="relative p-3.5 flex items-center gap-3">
        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #F97316, #F59E0B)" }}
          animate={{ rotate: [0, -5, 5, -3, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
        >
          <Gift size={18} className="text-white" />
        </motion.div>
        <button onClick={() => setLocation("/ranking")} className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold truncate" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Recompensa disponível!</p>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Sparkles size={12} className="text-[#F59E0B]" />
            </motion.div>
          </div>
          <p className="text-[11px] mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
            Colete <span className="text-[#F97316] font-bold">+30 XP</span> do dia 4 — toque para coletar
          </p>
        </button>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button onClick={() => setLocation("/ranking")} className="w-8 h-8 rounded-full bg-[#F97316]/20 flex items-center justify-center hover:bg-[#F97316]/30 transition-colors">
            <ChevronRight size={14} className="text-[#F97316]" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setDismissed(true); }} className="w-6 h-6 rounded-full flex items-center justify-center transition-colors" style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
            <X size={10} style={{ color: t.textMuted }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function JourneyProgress() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div className="mx-5 mt-2 labia-card p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#F97316]" />
          <span className="text-sm font-semibold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Sua jornada</span>
        </div>
        <span className="text-[#F97316] text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>35%</span>
      </div>
      <ProgressBar value={35} />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>5 de 16 missões concluídas</span>
        <div className="flex items-center gap-1">
          <Clock size={10} style={{ color: t.textMuted }} />
          <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>~3h de aprendizado</span>
        </div>
      </div>
      <button
        onClick={() => setLocation("/ranking")}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/20 hover:bg-[#7C3AED]/25 transition-colors"
      >
        <Trophy size={13} className="text-[#FFD700]" />
        <span className="text-[#7C3AED] text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>#4 no Ranking</span>
        <ChevronRight size={12} className="text-[#7C3AED]/60" />
      </button>
    </motion.div>
  );
}

function ActiveMission() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div className="mx-5 mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
      <p className="text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        Missão em andamento
      </p>
      <div className="labia-card p-4 border-l-4 border-[#F97316] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/8 to-transparent pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} className="text-[#F97316]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Missão 2 — Estruture um prompt eficiente
            </p>
            <p className="text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Trilha: Criando Prompts</p>
            <div className="flex items-center gap-2 mt-2">
              <ProgressBar value={60} className="flex-1" />
              <span className="text-[#F97316] text-xs font-bold flex-shrink-0" style={{ fontFamily: "Nunito, sans-serif" }}>60%</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setLocation("/chat")}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#ea6c0a] transition-colors text-white font-bold text-sm"
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          <Play size={14} fill="white" />
          Continuar missão
        </button>
      </div>
    </motion.div>
  );
}

function TrackCard({ track, index }: { track: typeof TRACKS[0]; index: number }) {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const Icon = ICON_MAP[track.icon] || Brain;
  return (
    <motion.button
      className="labia-card p-3.5 text-left transition-all active:scale-95 relative overflow-hidden"
      style={{ borderColor: track.locked ? undefined : `${track.color}30` }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
      onClick={() => {
        const routeMap: Record<number, string> = { 1: "/trilha-entendendo-ia", 2: "/trilha-detalhe", 3: "/trilha-solucoes", 4: "/trilha-meu-app" };
        setLocation(routeMap[track.id] || "/trilha-detalhe");
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ background: track.locked ? (t.isDark ? "#374151" : "#D1D5DB") : `linear-gradient(90deg, ${track.color}, ${track.color}88)` }} />
      <div className="flex items-start justify-between mt-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: track.locked ? (t.isDark ? "#374151" : "#E5E7EB") : `${track.color}25` }}>
          {track.locked ? <Lock size={15} style={{ color: t.textMuted }} /> : <Icon size={15} style={{ color: track.color }} />}
        </div>
        {track.progress === 100 && <CheckCircle2 size={16} className="text-[#10B981]" />}
        {track.locked && <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Bloqueada</span>}
      </div>
      <p className="text-sm mt-2 leading-tight font-bold" style={{ fontFamily: "Nunito, sans-serif", color: track.locked ? t.textMuted : t.textPrimary }}>
        {track.title}
      </p>
      <p className="text-[10px] mt-0.5 leading-tight" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        {track.description}
      </p>
      {!track.locked && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>{track.done}/{track.missions} missões</span>
            <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: track.progress === 100 ? "#10B981" : track.color }}>{track.progress}%</span>
          </div>
          <ProgressBar value={track.progress} />
        </div>
      )}
      {track.progress === 100 && (
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#10B98120", color: "#10B981", fontFamily: "Inter, sans-serif" }}>
          <Star size={9} fill="#10B981" />
          {track.badge}
        </div>
      )}
    </motion.button>
  );
}

function EnsinoMedioBanner() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <motion.div
      className="mx-5 mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
    >
      <motion.button
        onClick={() => setLocation("/ensino-medio")}
        className="w-full relative overflow-hidden rounded-2xl p-4 text-left"
        style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-15" style={{ background: "white", transform: "translate(30%, -30%)" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Novo</span>
              <span className="w-1 h-1 rounded-full bg-white/50" />
              <span className="text-white/80 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>Módulo disponível</span>
            </div>
            <p className="text-white font-black text-base leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>
              Ensino Médio
            </p>
            <p className="text-white/75 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              Tutor IA · Desafios · Redação ENEM
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
              <ChevronRight size={18} className="text-white" />
            </div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}

function TracksSection() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  return (
    <div className="mx-5 mt-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Suas trilhas</p>
        <button onClick={() => setLocation("/trilhas")} className="flex items-center gap-0.5 text-[#7C3AED] text-xs font-semibold hover:text-[#9f6ef5] transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
          Ver todas <ChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {TRACKS.map((track, i) => <TrackCard key={track.id} track={track} index={i} />)}
      </div>
    </div>
  );
}

function BadgesSection({ onBadgeClick }: { onBadgeClick: (id: number) => void }) {
  const t = useLabiaTheme();
  return (
    <motion.div className="mx-5 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Minhas insígnias</p>
      </div>
      <div className="labia-card p-4">
        <div className="flex items-center justify-between">
          {BADGES.map((badge, i) => {
            const Icon = ICON_MAP[badge.icon] || Brain;
            return (
              <motion.button key={badge.id} onClick={() => onBadgeClick(badge.id)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.65 + i * 0.07 }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative" style={{ background: badge.earned ? `${badge.color}25` : (t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"), border: `2px solid ${badge.earned ? badge.color : (t.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}`, boxShadow: badge.earned ? `0 0 12px ${badge.color}40` : "none" }}>
                  <Icon size={20} style={{ color: badge.earned ? badge.color : t.textMuted }} />
                  {!badge.earned && badge.progress && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="22" fill="none" stroke={badge.color} strokeWidth="2.5" strokeDasharray={`${(badge.progress / 100) * 138.2} 138.2`} strokeLinecap="round" opacity="0.7" />
                    </svg>
                  )}
                  {!badge.earned && !badge.progress && <Lock size={10} className="absolute bottom-0.5 right-0.5" style={{ color: t.textMuted }} />}
                </div>
                <span className="text-center text-[9px] leading-tight max-w-[52px]" style={{ fontFamily: "Inter, sans-serif", color: badge.earned ? t.textSecondary : t.textMuted }}>
                  {badge.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const { startTutorial } = useTutorial();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTutorial("Home", TUTORIAL_STEPS.Home);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
        <Header />
        <DailyRewardReminder />
        <JourneyProgress />
        <ActiveMission />
        <TracksSection />
        <EnsinoMedioBanner />
        <BadgesSection onBadgeClick={(id) => setSelectedBadge(id)} />
        <div className="h-4" />
      </div>
      <BottomNav />
      <BadgeModal badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </PhoneFrame>
  );
}
