/**
 * Home — Dashboard principal do aluno
 * Design: "Friendly Mission Control"
 * Paleta: #1C1C2E (bg), #7C3AED (roxo), #F97316 (laranja), #10B981 (verde)
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  Brain, MessageSquare, Settings, Rocket, Bell, ChevronRight,
  Star, Lock, CheckCircle2, Zap, Clock, Play, Flame,
} from "lucide-react";
import { IMAGES, TRACKS, BADGES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import ProgressBar from "@/components/ProgressBar";
import BadgeModal from "@/components/BadgeModal";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

function Header() {
  const [, setLocation] = useLocation();
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
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] rounded-full border-2 border-[#1C1C2E]" />
        </button>
        <div>
          <p className="text-white/60 text-xs font-medium" style={{ fontFamily: "Inter, sans-serif" }}>Olá,</p>
          <p className="text-white font-bold text-base leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>Lucas Oliveira</p>
          <div className="flex items-center gap-1 mt-0.5">
            <Flame size={10} className="text-[#F97316]" />
            <span className="text-[#F97316] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Nível 2 — Explorador</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => toast("Você tem 2 novas notificações!")}
        className="relative w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
      >
        <Bell size={18} className="text-white/70" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
      </button>
    </motion.div>
  );
}

function JourneyProgress() {
  return (
    <motion.div
      className="mx-5 mt-2 labia-card p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-[#F97316]" />
          <span className="text-white text-sm font-semibold" style={{ fontFamily: "Nunito, sans-serif" }}>Sua jornada</span>
        </div>
        <span className="text-[#F97316] text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>35%</span>
      </div>
      <ProgressBar value={35} />
      <div className="flex items-center justify-between mt-2">
        <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>5 de 16 missões concluídas</span>
        <div className="flex items-center gap-1">
          <Clock size={10} className="text-white/40" />
          <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>~3h de aprendizado</span>
        </div>
      </div>
    </motion.div>
  );
}

function ActiveMission() {
  const [, setLocation] = useLocation();
  return (
    <motion.div
      className="mx-5 mt-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 px-1" style={{ fontFamily: "Inter, sans-serif" }}>
        Missão em andamento
      </p>
      <div className="labia-card p-4 border-l-4 border-[#F97316] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/8 to-transparent pointer-events-none" />
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F97316]/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare size={18} className="text-[#F97316]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>
              Missão 2 — Estruture um prompt eficiente
            </p>
            <p className="text-white/50 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Trilha: Criando Prompts</p>
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
  const Icon = ICON_MAP[track.icon] || Brain;
  return (
    <motion.button
      className="labia-card p-3.5 text-left hover:border-white/20 transition-all active:scale-95 relative overflow-hidden"
      style={{ borderColor: track.locked ? undefined : `${track.color}30` }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
      onClick={() => {
        const routeMap: Record<number, string> = {
          1: "/trilha-detalhe",
          2: "/trilha-detalhe",
          3: "/trilha-solucoes",
          4: "/trilha-meu-app",
        };
        setLocation(routeMap[track.id] || "/trilha-detalhe");
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl" style={{ background: track.locked ? "#374151" : `linear-gradient(90deg, ${track.color}, ${track.color}88)` }} />
      <div className="flex items-start justify-between mt-1">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: track.locked ? "#374151" : `${track.color}25` }}>
          {track.locked ? <Lock size={15} className="text-white/30" /> : <Icon size={15} style={{ color: track.color }} />}
        </div>
        {track.progress === 100 && <CheckCircle2 size={16} className="text-[#10B981]" />}
        {track.locked && <span className="text-white/25 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>Bloqueada</span>}
      </div>
      <p className="text-sm mt-2 leading-tight font-bold" style={{ fontFamily: "Nunito, sans-serif", color: track.locked ? "rgba(255,255,255,0.3)" : "white" }}>
        {track.title}
      </p>
      <p className="text-xs mt-0.5 leading-tight" style={{ fontFamily: "Inter, sans-serif", color: track.locked ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)" }}>
        {track.description}
      </p>
      {!track.locked && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>{track.done}/{track.missions} missões</span>
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

function TracksSection() {
  const [, setLocation] = useLocation();
  return (
    <div className="mx-5 mt-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Suas trilhas</p>
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
  return (
    <motion.div className="mx-5 mt-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Minhas insígnias</p>
      </div>
      <div className="labia-card p-4">
        <div className="flex items-center justify-between">
          {BADGES.map((badge, i) => {
            const Icon = ICON_MAP[badge.icon] || Brain;
            return (
              <motion.button key={badge.id} onClick={() => onBadgeClick(badge.id)} whileTap={{ scale: 0.9 }} className="flex flex-col items-center gap-1.5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.65 + i * 0.07 }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center relative" style={{ background: badge.earned ? `${badge.color}25` : "rgba(255,255,255,0.05)", border: `2px solid ${badge.earned ? badge.color : "rgba(255,255,255,0.1)"}`, boxShadow: badge.earned ? `0 0 12px ${badge.color}40` : "none" }}>
                  <Icon size={20} style={{ color: badge.earned ? badge.color : "rgba(255,255,255,0.2)" }} />
                  {!badge.earned && badge.progress && (
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                      <circle cx="24" cy="24" r="22" fill="none" stroke={badge.color} strokeWidth="2.5" strokeDasharray={`${(badge.progress / 100) * 138.2} 138.2`} strokeLinecap="round" opacity="0.7" />
                    </svg>
                  )}
                  {!badge.earned && !badge.progress && <Lock size={10} className="absolute bottom-0.5 right-0.5 text-white/30" />}
                </div>
                <span className="text-center text-[9px] leading-tight max-w-[52px]" style={{ fontFamily: "Inter, sans-serif", color: badge.earned ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)" }}>
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
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
        <Header />
        <JourneyProgress />
        <ActiveMission />
        <TracksSection />
        <BadgesSection onBadgeClick={(id) => setSelectedBadge(id)} />
        <div className="h-4" />
      </div>
      <BottomNav />
      <BadgeModal badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </PhoneFrame>
  );
}
