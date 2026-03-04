/**
 * Perfil — Tela de perfil do aluno
 * Design: Header gradiente com avatar, grid de stats, insígnias,
 * configurações, botão sair
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  CheckCircle2, Rocket, BookOpen, Clock, ChevronRight,
  User, Bell, Shield, LogOut, Pencil,
} from "lucide-react";
import { IMAGES, USER_PROFILE } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

const STATS = [
  { label: "Missões Concluídas", value: USER_PROFILE.missionsCompleted, icon: CheckCircle2, color: "#10B981" },
  { label: "App Criado", value: USER_PROFILE.appsCreated, icon: Rocket, color: "#F97316" },
  { label: "Trilhas Iniciadas", value: USER_PROFILE.tracksStarted, icon: BookOpen, color: "#7C3AED" },
  { label: "Horas de Aprendizado", value: `${USER_PROFILE.hoursLearning}h`, icon: Clock, color: "#3B82F6" },
];

const BADGE_IMAGES = [
  { label: "Prompt Master", color: "#7C3AED", bg: "#7C3AED30" },
  { label: "AI Explorer", color: "#10B981", bg: "#10B98130" },
  { label: "Code Builder", color: "#F97316", bg: "#F9731630" },
  { label: "Creator", color: "#EC4899", bg: "#EC489930" },
];

const SETTINGS_ITEMS = [
  { icon: User, label: "Faixa etária" },
  { icon: Bell, label: "Notificações" },
  { icon: Shield, label: "Privacidade" },
];

export default function Perfil() {
  const [, setLocation] = useLocation();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header with gradient */}
        <motion.div
          className="relative px-6 pt-8 pb-6"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #7C3AED 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Edit button */}
          <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Pencil size={14} className="text-white" />
          </button>

          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <img
                src={IMAGES.avatarBoy}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-3 border-white/30"
              />
            </div>
            <h1 className="text-white text-xl font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
              {USER_PROFILE.name}
            </h1>
            <p className="text-white/80 text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              Nível {USER_PROFILE.level} — {USER_PROFILE.title}
            </p>
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          className="px-5 -mt-4 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="labia-card p-3.5 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-white text-2xl font-bold leading-none" style={{ fontFamily: "Nunito, sans-serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-white/50 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                      {stat.label}
                    </p>
                  </div>
                  <Icon size={20} style={{ color: stat.color }} />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          className="px-5 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>
            Minhas Insígnias
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {BADGE_IMAGES.map((badge, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: badge.bg,
                  border: `2px solid ${badge.color}`,
                  boxShadow: `0 0 12px ${badge.color}30`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.08 }}
              >
                <span className="text-center text-[9px] font-bold leading-tight px-1" style={{ color: badge.color, fontFamily: "Inter, sans-serif" }}>
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          className="px-5 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif" }}>
            Configurações
          </h2>
          <div className="labia-card overflow-hidden">
            {SETTINGS_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => toast(`${item.label} (protótipo)`)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors"
                  style={{ borderBottom: i < SETTINGS_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-white/50" />
                    <span className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30" />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          className="px-5 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <button
            onClick={() => {
              toast("Saindo da conta...");
              setTimeout(() => setLocation("/"), 1000);
            }}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={16} />
            <span className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Sair da conta</span>
          </button>
        </motion.div>

        <div className="h-4" />
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
