/**
 * Configurações — Gerenciamento de preferências do usuário
 * Design: Drawer-style com seções agrupadas, toggles interativos
 * Suporta tema claro e escuro via useLabiaTheme
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, Bell, BellOff, Moon, Sun, Globe, Shield, Eye,
  Trash2, HelpCircle, Info, ChevronRight, ChevronDown, Check,
  Smartphone, Volume2, VolumeX, Palette, Lock, FileText,
  MessageSquare, Award, Zap, Mail, ExternalLink, Heart, GraduationCap,
} from "lucide-react";
import { IMAGES } from "@/data";
import { useTutorial } from "@/components/TutorialOverlay";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

/* ─── Toggle Component ─── */
function Toggle({
  enabled,
  onToggle,
  color = "#10B981",
  t,
}: {
  enabled: boolean;
  onToggle: () => void;
  color?: string;
  t: ReturnType<typeof useLabiaTheme>;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
      style={{
        background: enabled ? color : t.toggleOff,
        boxShadow: enabled ? `0 0 12px ${color}40` : "none",
      }}
    >
      <motion.div
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md"
        animate={{ left: enabled ? 22 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

/* ─── Section Header ─── */
function SectionHeader({ icon: Icon, title, color, t }: { icon: any; title: string; color: string; t: ReturnType<typeof useLabiaTheme> }) {
  return (
    <div className="flex items-center gap-2.5 mb-3 px-1">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <h2
        className="font-bold text-sm uppercase tracking-wider"
        style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
      >
        {title}
      </h2>
    </div>
  );
}

/* ─── Setting Row ─── */
function SettingRow({
  icon: Icon,
  label,
  description,
  children,
  onClick,
  iconColor = "rgba(255,255,255,0.5)",
  isLast = false,
  t,
}: {
  icon: any;
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  iconColor?: string;
  isLast?: boolean;
  t: ReturnType<typeof useLabiaTheme>;
}) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors ${
        onClick ? "cursor-pointer" : ""
      }`}
      style={{
        borderBottom: isLast ? "none" : `1px solid ${t.divider}`,
      }}
    >
      <Icon size={17} style={{ color: iconColor }} className="flex-shrink-0" />
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
          {label}
        </p>
        {description && (
          <p className="text-[11px] mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
            {description}
          </p>
        )}
      </div>
      {children}
    </Wrapper>
  );
}

/* ─── Select Dropdown ─── */
function SelectOption({
  value,
  options,
  onChange,
  t,
}: {
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
  t: ReturnType<typeof useLabiaTheme>;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
        style={{
          fontFamily: "Inter, sans-serif",
          background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          border: `1px solid ${t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          color: t.textSecondary,
        }}
      >
        {selected?.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-1 z-30 rounded-xl overflow-hidden shadow-xl min-w-[140px]"
            style={{
              background: t.dropdownBg,
              border: `1px solid ${t.dropdownBorder}`,
            }}
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: opt.id === value ? "#F97316" : t.textSecondary,
                }}
              >
                {opt.label}
                {opt.id === value && <Check size={12} className="text-[#F97316]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Configuracoes() {
  const [, setLocation] = useLocation();
  const { resetTutorials } = useTutorial();
  const t = useLabiaTheme();

  // Notification settings
  const [notifMissoes, setNotifMissoes] = useState(true);
  const [notifConquistas, setNotifConquistas] = useState(true);
  const [notifLembretes, setNotifLembretes] = useState(true);
  const [notifSom, setNotifSom] = useState(false);
  const [notifEmail, setNotifEmail] = useState(false);

  // Appearance settings
  const prefMap: Record<string, string> = { dark: "escuro", light: "claro", auto: "auto" };
  const prefMapReverse: Record<string, string> = { escuro: "dark", claro: "light", auto: "auto" };
  const [idioma, setIdioma] = useState("pt-br");
  const [tamanhoFonte, setTamanhoFonte] = useState("medio");

  const tema = prefMap[t.preference] || "escuro";
  const handleTemaChange = (id: string) => {
    const pref = prefMapReverse[id] as "light" | "dark" | "auto";
    t.setPreference(pref);
  };

  // Privacy settings
  const [perfilPublico, setPerfilPublico] = useState(true);
  const [mostrarRanking, setMostrarRanking] = useState(true);
  const [compartilharProgresso, setCompartilharProgresso] = useState(false);

  const TEMAS = [
    { id: "escuro", label: "Escuro" },
    { id: "claro", label: "Claro" },
    { id: "auto", label: "Automático" },
  ];

  const IDIOMAS = [
    { id: "pt-br", label: "Português (BR)" },
    { id: "en", label: "English" },
    { id: "es", label: "Español" },
  ];

  const FONTES = [
    { id: "pequeno", label: "Pequeno" },
    { id: "medio", label: "Médio" },
    { id: "grande", label: "Grande" },
  ];

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 backdrop-blur-lg"
          style={{ background: t.headerBg }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 px-5 pt-14 pb-4">
            <button
              onClick={() => setLocation("/perfil")}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}
            >
              <ArrowLeft size={18} style={{ color: t.textSecondary }} />
            </button>
            <h1
              className="text-lg font-black"
              style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
            >
              Configurações
            </h1>
          </div>
        </motion.div>

        {/* ─── Notificações ─── */}
        <motion.div
          className="mx-4 mt-3 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <SectionHeader icon={Bell} title="Notificações" color="#F97316" t={t} />
          <div className="rounded-2xl overflow-hidden" style={{ background: t.sectionBg, border: `1px solid ${t.sectionBorder}` }}>
            <SettingRow icon={Zap} label="Missões e atividades" description="Avisos de novas missões e prazos" iconColor="#F97316" t={t}>
              <Toggle enabled={notifMissoes} onToggle={() => setNotifMissoes(!notifMissoes)} color="#F97316" t={t} />
            </SettingRow>
            <SettingRow icon={Award} label="Conquistas" description="Insígnias e marcos alcançados" iconColor="#10B981" t={t}>
              <Toggle enabled={notifConquistas} onToggle={() => setNotifConquistas(!notifConquistas)} color="#10B981" t={t} />
            </SettingRow>
            <SettingRow icon={Bell} label="Lembretes diários" description="Lembrete para estudar e coletar XP" iconColor="#7C3AED" t={t}>
              <Toggle enabled={notifLembretes} onToggle={() => setNotifLembretes(!notifLembretes)} color="#7C3AED" t={t} />
            </SettingRow>
            <SettingRow icon={notifSom ? Volume2 : VolumeX} label="Sons de notificação" description="Efeitos sonoros ao receber alertas" iconColor="#3B82F6" t={t}>
              <Toggle enabled={notifSom} onToggle={() => setNotifSom(!notifSom)} color="#3B82F6" t={t} />
            </SettingRow>
            <SettingRow icon={Mail} label="Notificações por e-mail" description="Resumo semanal de progresso" iconColor="#EC4899" isLast t={t}>
              <Toggle enabled={notifEmail} onToggle={() => setNotifEmail(!notifEmail)} color="#EC4899" t={t} />
            </SettingRow>
          </div>
        </motion.div>

        {/* ─── Aparência ─── */}
        <motion.div
          className="mx-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SectionHeader icon={Palette} title="Aparência" color="#7C3AED" t={t} />
          <div className="rounded-2xl overflow-hidden" style={{ background: t.sectionBg, border: `1px solid ${t.sectionBorder}` }}>
            <SettingRow icon={tema === "escuro" ? Moon : Sun} label="Tema" description="Aparência visual do aplicativo" iconColor="#7C3AED" t={t}>
              <SelectOption value={tema} options={TEMAS} onChange={handleTemaChange} t={t} />
            </SettingRow>
            <SettingRow icon={Globe} label="Idioma" description="Idioma da interface" iconColor="#3B82F6" t={t}>
              <SelectOption value={idioma} options={IDIOMAS} onChange={setIdioma} t={t} />
            </SettingRow>
            <SettingRow icon={FileText} label="Tamanho da fonte" description="Ajuste a legibilidade" iconColor="#10B981" isLast t={t}>
              <SelectOption value={tamanhoFonte} options={FONTES} onChange={setTamanhoFonte} t={t} />
            </SettingRow>
          </div>
        </motion.div>

        {/* ─── Privacidade ─── */}
        <motion.div
          className="mx-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <SectionHeader icon={Shield} title="Privacidade" color="#10B981" t={t} />
          <div className="rounded-2xl overflow-hidden" style={{ background: t.sectionBg, border: `1px solid ${t.sectionBorder}` }}>
            <SettingRow icon={Eye} label="Perfil público" description="Outros alunos podem ver seu perfil" iconColor="#10B981" t={t}>
              <Toggle enabled={perfilPublico} onToggle={() => setPerfilPublico(!perfilPublico)} color="#10B981" t={t} />
            </SettingRow>
            <SettingRow icon={Award} label="Aparecer no ranking" description="Mostrar seu nome na classificação" iconColor="#FFD700" t={t}>
              <Toggle enabled={mostrarRanking} onToggle={() => setMostrarRanking(!mostrarRanking)} color="#F59E0B" t={t} />
            </SettingRow>
            <SettingRow icon={MessageSquare} label="Compartilhar progresso" description="Permitir que amigos vejam seu avanço" iconColor="#7C3AED" isLast t={t}>
              <Toggle enabled={compartilharProgresso} onToggle={() => setCompartilharProgresso(!compartilharProgresso)} color="#7C3AED" t={t} />
            </SettingRow>
          </div>
        </motion.div>

        {/* ─── Conta ─── */}
        <motion.div
          className="mx-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SectionHeader icon={Lock} title="Conta" color="#EF4444" t={t} />
          <div className="rounded-2xl overflow-hidden" style={{ background: t.sectionBg, border: `1px solid ${t.sectionBorder}` }}>
            <SettingRow icon={Lock} label="Alterar senha" description="Atualize sua senha de acesso" iconColor="#F97316" onClick={() => { setLocation("/perfil"); toast("Abra 'Meus Dados' no Perfil para alterar a senha"); }} t={t}>
              <ChevronRight size={16} style={{ color: t.textMuted }} />
            </SettingRow>
            <SettingRow icon={Smartphone} label="Dispositivos conectados" description="1 dispositivo ativo" iconColor="#3B82F6" onClick={() => toast("Gerenciamento de dispositivos (protótipo)")} t={t}>
              <ChevronRight size={16} style={{ color: t.textMuted }} />
            </SettingRow>
            <SettingRow icon={Trash2} label="Excluir conta" description="Remover permanentemente seus dados" iconColor="#EF4444" onClick={() => toast.error("Tem certeza? Esta ação não pode ser desfeita.")} isLast t={t}>
              <ChevronRight size={16} style={{ color: t.textMuted }} />
            </SettingRow>
          </div>
        </motion.div>

        {/* ─── Sobre ─── */}
        <motion.div
          className="mx-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <SectionHeader icon={Info} title="Sobre" color="#3B82F6" t={t} />
          <div className="rounded-2xl overflow-hidden" style={{ background: t.sectionBg, border: `1px solid ${t.sectionBorder}` }}>
            <SettingRow icon={Info} label="Versão do app" description="LabIA v1.0.0 (Protótipo)" iconColor="#3B82F6" t={t}>
              <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>1.0.0</span>
            </SettingRow>
            <SettingRow icon={FileText} label="Termos de uso" iconColor={t.textSecondary} onClick={() => setLocation("/termos-de-uso")} t={t}>
              <ExternalLink size={14} style={{ color: t.textMuted }} />
            </SettingRow>
            <SettingRow icon={Shield} label="Política de privacidade" iconColor={t.textSecondary} onClick={() => setLocation("/politica-privacidade")} t={t}>
              <ExternalLink size={14} style={{ color: t.textMuted }} />
            </SettingRow>
            <SettingRow icon={HelpCircle} label="Central de ajuda" iconColor={t.textSecondary} onClick={() => setLocation("/ajuda")} t={t}>
              <ExternalLink size={14} style={{ color: t.textMuted }} />
            </SettingRow>
            <SettingRow icon={GraduationCap} label="Rever tutoriais" description="Reexibir dicas interativas nas telas" iconColor="#7C3AED" onClick={() => { resetTutorials(); toast.success("Tutoriais resetados! Visite as telas para revê-los."); }} isLast t={t}>
              <ChevronRight size={14} style={{ color: t.textMuted }} />
            </SettingRow>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="px-4 pb-6 pt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Feito com</span>
            <Heart size={9} style={{ color: "#EF4444", opacity: 0.5 }} fill="rgba(239,68,68,0.4)" />
            <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>pela equipe LabIA</span>
          </div>
          <p className="text-[9px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted, opacity: 0.6 }}>
            © 2025 LabIA Edu. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
