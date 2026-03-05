/**
 * Perfil — Tela de perfil do aluno
 * Design: Header gradiente com avatar, dados pessoais editáveis,
 * alterar senha, grid de stats, insígnias, configurações, botão sair
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  CheckCircle2, Rocket, BookOpen, Clock, ChevronRight, ChevronLeft,
  User, Bell, Shield, LogOut, Pencil, Eye, EyeOff, Lock, Mail, Save, X,
  Brain, MessageSquare, Settings,
} from "lucide-react";
import { IMAGES, USER_PROFILE, BADGES } from "@/data";
import { useTutorial, TUTORIAL_STEPS } from "@/components/TutorialOverlay";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import BadgeModal from "@/components/BadgeModal";

const BADGE_ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

const STATS = [
  { label: "Missões Concluídas", value: USER_PROFILE.missionsCompleted, icon: CheckCircle2, color: "#10B981" },
  { label: "App Criado", value: USER_PROFILE.appsCreated, icon: Rocket, color: "#F97316" },
  { label: "Trilhas Iniciadas", value: USER_PROFILE.tracksStarted, icon: BookOpen, color: "#7C3AED" },
  { label: "Horas de Aprendizado", value: `${USER_PROFILE.hoursLearning}h`, icon: Clock, color: "#3B82F6" },
];

const SETTINGS_ITEMS = [
  { icon: User, label: "Faixa etária" },
  { icon: Bell, label: "Notificações" },
  { icon: Shield, label: "Privacidade" },
];

/** Modal/Drawer de Dados Pessoais + Alterar Senha */
function DadosPessoaisDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useLabiaTheme();
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [nome, setNome] = useState(USER_PROFILE.name);
  const [email, setEmail] = useState("lucas.oliveira@email.com");
  const [faixaEtaria, setFaixaEtaria] = useState<"6-10" | "11-14">("11-14");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col"
          style={{ background: t.bg }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ background: t.cardBg }}>
              <ChevronLeft size={18} style={{ color: t.textPrimary }} />
            </button>
            <h1 className="text-lg font-bold flex-1" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Meus Dados
            </h1>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pt-5 pb-6" style={{ scrollbarWidth: "none" }}>
            {/* Avatar + Nome */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-3">
                <img
                  src={IMAGES.avatarBoy}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-3 border-[#F97316]/40"
                />
                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#F97316] flex items-center justify-center shadow-lg">
                  <Pencil size={12} className="text-white" />
                </button>
              </div>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                Toque para alterar a foto
              </p>
            </div>

            {/* Campos de dados pessoais */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  Nome completo
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#F97316]/50 focus:outline-none focus:ring-1 focus:ring-[#F97316]/30 transition-all"
                    style={{ fontFamily: "Inter, sans-serif", background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  E-mail
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#F97316]/50 focus:outline-none focus:ring-1 focus:ring-[#F97316]/30 transition-all"
                    style={{ fontFamily: "Inter, sans-serif", background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  Faixa etária
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setFaixaEtaria("6-10")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: faixaEtaria === "6-10" ? "linear-gradient(135deg, #F97316, #F59E0B)" : t.cardBg,
                      color: faixaEtaria === "6-10" ? "white" : t.textMuted,
                      border: faixaEtaria === "6-10" ? "none" : `1px solid ${t.cardBorder}`,
                    }}
                  >
                    6 a 10 anos
                  </button>
                  <button
                    onClick={() => setFaixaEtaria("11-14")}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: faixaEtaria === "11-14" ? "linear-gradient(135deg, #F97316, #F59E0B)" : t.cardBg,
                      color: faixaEtaria === "11-14" ? "white" : t.textMuted,
                      border: faixaEtaria === "11-14" ? "none" : `1px solid ${t.cardBorder}`,
                    }}
                  >
                    11 a 14 anos
                  </button>
                </div>
              </div>
            </div>

            {/* Salvar dados */}
            <button
              onClick={() => { toast.success("Dados atualizados com sucesso!"); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm mb-6"
              style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #F97316, #F59E0B)" }}
            >
              <Save size={16} />
              Salvar alterações
            </button>

            {/* Divider */}
            <div className="w-full h-px mb-6" style={{ background: t.divider }} />

            {/* Alterar Senha */}
            <button
              onClick={() => setShowPasswordSection(!showPasswordSection)}
              className="w-full flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-[#F97316]" />
                <span className="font-bold text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  Alterar senha
                </span>
              </div>
              <motion.div animate={{ rotate: showPasswordSection ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronRight size={18} style={{ color: t.textMuted }} />
              </motion.div>
            </button>

            <AnimatePresence>
              {showPasswordSection && (
                <motion.div
                  className="space-y-4 mb-6"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Senha atual</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
                      <input type={showCurrentPw ? "text" : "password"} placeholder="Digite sua senha atual"
                        className="w-full rounded-xl py-3 pl-10 pr-11 text-sm focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                        style={{ fontFamily: "Inter, sans-serif", background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }} />
                      <button onClick={() => setShowCurrentPw(!showCurrentPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: t.textMuted }}>
                        {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Nova senha</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
                      <input type={showNewPw ? "text" : "password"} placeholder="Mínimo 8 caracteres"
                        className="w-full rounded-xl py-3 pl-10 pr-11 text-sm focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                        style={{ fontFamily: "Inter, sans-serif", background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }} />
                      <button onClick={() => setShowNewPw(!showNewPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: t.textMuted }}>
                        {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      <div className="flex-1 h-1 rounded-full bg-[#10B981]" />
                      <div className="flex-1 h-1 rounded-full bg-[#10B981]" />
                      <div className="flex-1 h-1 rounded-full bg-[#F59E0B]" />
                      <div className="flex-1 h-1 rounded-full" style={{ background: t.toggleOff }} />
                    </div>
                    <p className="text-[#F59E0B] text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Força: Média</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Confirmar nova senha</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }} />
                      <input type={showConfirmPw ? "text" : "password"} placeholder="Repita a nova senha"
                        className="w-full rounded-xl py-3 pl-10 pr-11 text-sm focus:border-[#7C3AED]/50 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/30 transition-all"
                        style={{ fontFamily: "Inter, sans-serif", background: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }} />
                      <button onClick={() => setShowConfirmPw(!showConfirmPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: t.textMuted }}>
                        {showConfirmPw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => { toast.success("Senha alterada com sucesso!"); setShowPasswordSection(false); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm"
                    style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
                  >
                    <Lock size={16} />
                    Alterar senha
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Perfil() {
  const [, setLocation] = useLocation();
  const [showDados, setShowDados] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const { startTutorial } = useTutorial();
  const t = useLabiaTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      startTutorial("Perfil", TUTORIAL_STEPS.Perfil);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PhoneFrame>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex-1 h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {/* Header with gradient - mantém gradiente de identidade visual */}
          <motion.div
            className="relative px-6 pt-8 pb-6"
            style={{ background: "linear-gradient(135deg, #F97316 0%, #7C3AED 100%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button onClick={() => setLocation("/home")} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <ChevronLeft size={16} className="text-white" />
            </button>
            <button onClick={() => setShowDados(true)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Pencil size={14} className="text-white" />
            </button>
            <div className="flex flex-col items-center">
              <button onClick={() => setShowDados(true)} className="relative mb-3 group">
                <img src={IMAGES.avatarBoy} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-3 border-white/30 group-hover:border-white/60 transition-all" />
                <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                  <Pencil size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
              <h1 className="text-white text-xl font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>{USER_PROFILE.name}</h1>
              <p className="text-white/80 text-sm mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>Nível {USER_PROFILE.level} — {USER_PROFILE.title}</p>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div className="px-5 -mt-4 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="labia-card p-3.5 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-2xl font-bold leading-none" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>{stat.value}</p>
                      <p className="text-xs mt-1" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{stat.label}</p>
                    </div>
                    <Icon size={20} style={{ color: stat.color }} />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Meus Dados button */}
          <motion.div className="px-5 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <button onClick={() => setShowDados(true)} className="w-full labia-card p-4 flex items-center justify-between transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 flex items-center justify-center">
                  <User size={18} className="text-[#F97316]" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Meus Dados</p>
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Editar perfil e alterar senha</p>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: t.textMuted }} />
            </button>
          </motion.div>

          {/* Badges */}
          <motion.div className="px-5 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Minhas Insígnias</h2>
            <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {BADGES.map((badge, i) => {
                const Icon = BADGE_ICON_MAP[badge.icon] || Brain;
                return (
                  <motion.button key={badge.id} onClick={() => setSelectedBadge(badge.id)}
                    className="flex-shrink-0 w-20 flex flex-col items-center gap-1.5"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + i * 0.08 }} whileTap={{ scale: 0.9 }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{
                        background: badge.earned ? `${badge.color}25` : t.cardBg,
                        border: `2px solid ${badge.earned ? badge.color : t.cardBorder}`,
                        boxShadow: badge.earned ? `0 0 16px ${badge.color}30` : "none",
                      }}>
                      {badge.earned ? <Icon size={22} style={{ color: badge.color }} /> : <Lock size={18} style={{ color: t.textMuted }} />}
                    </div>
                    <span className="text-center text-[10px] font-bold leading-tight"
                      style={{ color: badge.earned ? badge.color : t.textMuted, fontFamily: "Inter, sans-serif" }}>
                      {badge.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div className="px-5 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="font-bold text-base mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Configurações</h2>
            <div className="labia-card overflow-hidden">
              {SETTINGS_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button key={i} onClick={() => setLocation("/configuracoes")}
                    className="w-full flex items-center justify-between px-4 py-3.5 transition-colors"
                    style={{ borderBottom: i < SETTINGS_ITEMS.length - 1 ? `1px solid ${t.divider}` : "none" }}>
                    <div className="flex items-center gap-3">
                      <Icon size={18} style={{ color: t.textSecondary }} />
                      <span className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>{item.label}</span>
                    </div>
                    <ChevronRight size={16} style={{ color: t.textMuted }} />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Logout */}
          <motion.div className="px-5 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <button onClick={() => { toast("Saindo da conta..."); setTimeout(() => setLocation("/"), 1000); }}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={16} />
              <span className="text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>Sair da conta</span>
            </button>
          </motion.div>

          <div className="h-4" />
        </div>

        <DadosPessoaisDrawer open={showDados} onClose={() => setShowDados(false)} />
      </div>
      <BottomNav />
      <BadgeModal badgeId={selectedBadge} onClose={() => setSelectedBadge(null)} />
    </PhoneFrame>
  );
}
