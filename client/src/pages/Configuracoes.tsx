/**
 * Configurações — Gerenciamento de preferências do usuário
 * Design: Drawer-style com seções agrupadas, toggles interativos
 * Paleta: #1C1C2E (bg), #7C3AED (roxo), #F97316 (laranja), #10B981 (verde)
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
  MessageSquare, Award, Zap, Mail, ExternalLink, Heart,
} from "lucide-react";
import { IMAGES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

/* ─── Toggle Component ─── */
function Toggle({
  enabled,
  onToggle,
  color = "#10B981",
}: {
  enabled: boolean;
  onToggle: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
      style={{
        background: enabled ? color : "rgba(255,255,255,0.1)",
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
function SectionHeader({ icon: Icon, title, color }: { icon: any; title: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3 px-1">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${color}15` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <h2
        className="text-white font-bold text-sm uppercase tracking-wider"
        style={{ fontFamily: "Nunito, sans-serif" }}
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
}: {
  icon: any;
  label: string;
  description?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  iconColor?: string;
  isLast?: boolean;
}) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors ${
        onClick ? "cursor-pointer" : ""
      }`}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <Icon size={17} style={{ color: iconColor }} className="flex-shrink-0" />
      <div className="flex-1 text-left min-w-0">
        <p className="text-white text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          {label}
        </p>
        {description && (
          <p className="text-white/30 text-[11px] mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
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
}: {
  value: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 text-white/60 text-xs hover:bg-white/8 transition-all"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {selected?.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={12} />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 top-full mt-1 z-30 bg-[#2a2a3e] border border-white/10 rounded-xl overflow-hidden shadow-xl min-w-[140px]"
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
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-white/5 transition-colors"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: opt.id === value ? "#F97316" : "rgba(255,255,255,0.6)",
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

  // Notification settings
  const [notifMissoes, setNotifMissoes] = useState(true);
  const [notifConquistas, setNotifConquistas] = useState(true);
  const [notifLembretes, setNotifLembretes] = useState(true);
  const [notifSom, setNotifSom] = useState(false);
  const [notifEmail, setNotifEmail] = useState(false);

  // Appearance settings
  const [tema, setTema] = useState("escuro");
  const [idioma, setIdioma] = useState("pt-br");
  const [tamanhoFonte, setTamanhoFonte] = useState("medio");

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
          className="sticky top-0 z-20 bg-[#1C1C2E]/95 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 px-5 pt-14 pb-4">
            <button
              onClick={() => setLocation("/perfil")}
              className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <ArrowLeft size={18} className="text-white/70" />
            </button>
            <h1
              className="text-white text-lg font-black"
              style={{ fontFamily: "Nunito, sans-serif" }}
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
          <SectionHeader icon={Bell} title="Notificações" color="#F97316" />
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SettingRow
              icon={Zap}
              label="Missões e atividades"
              description="Avisos de novas missões e prazos"
              iconColor="#F97316"
            >
              <Toggle enabled={notifMissoes} onToggle={() => setNotifMissoes(!notifMissoes)} color="#F97316" />
            </SettingRow>
            <SettingRow
              icon={Award}
              label="Conquistas"
              description="Insígnias e marcos alcançados"
              iconColor="#10B981"
            >
              <Toggle enabled={notifConquistas} onToggle={() => setNotifConquistas(!notifConquistas)} color="#10B981" />
            </SettingRow>
            <SettingRow
              icon={Bell}
              label="Lembretes diários"
              description="Lembrete para estudar e coletar XP"
              iconColor="#7C3AED"
            >
              <Toggle enabled={notifLembretes} onToggle={() => setNotifLembretes(!notifLembretes)} color="#7C3AED" />
            </SettingRow>
            <SettingRow
              icon={notifSom ? Volume2 : VolumeX}
              label="Sons de notificação"
              description="Efeitos sonoros ao receber alertas"
              iconColor="#3B82F6"
            >
              <Toggle enabled={notifSom} onToggle={() => setNotifSom(!notifSom)} color="#3B82F6" />
            </SettingRow>
            <SettingRow
              icon={Mail}
              label="Notificações por e-mail"
              description="Resumo semanal de progresso"
              iconColor="#EC4899"
              isLast
            >
              <Toggle enabled={notifEmail} onToggle={() => setNotifEmail(!notifEmail)} color="#EC4899" />
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
          <SectionHeader icon={Palette} title="Aparência" color="#7C3AED" />
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SettingRow
              icon={tema === "escuro" ? Moon : Sun}
              label="Tema"
              description="Aparência visual do aplicativo"
              iconColor="#7C3AED"
            >
              <SelectOption value={tema} options={TEMAS} onChange={setTema} />
            </SettingRow>
            <SettingRow
              icon={Globe}
              label="Idioma"
              description="Idioma da interface"
              iconColor="#3B82F6"
            >
              <SelectOption value={idioma} options={IDIOMAS} onChange={setIdioma} />
            </SettingRow>
            <SettingRow
              icon={FileText}
              label="Tamanho da fonte"
              description="Ajuste a legibilidade"
              iconColor="#10B981"
              isLast
            >
              <SelectOption value={tamanhoFonte} options={FONTES} onChange={setTamanhoFonte} />
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
          <SectionHeader icon={Shield} title="Privacidade" color="#10B981" />
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SettingRow
              icon={Eye}
              label="Perfil público"
              description="Outros alunos podem ver seu perfil"
              iconColor="#10B981"
            >
              <Toggle enabled={perfilPublico} onToggle={() => setPerfilPublico(!perfilPublico)} color="#10B981" />
            </SettingRow>
            <SettingRow
              icon={Award}
              label="Aparecer no ranking"
              description="Mostrar seu nome na classificação"
              iconColor="#FFD700"
            >
              <Toggle enabled={mostrarRanking} onToggle={() => setMostrarRanking(!mostrarRanking)} color="#F59E0B" />
            </SettingRow>
            <SettingRow
              icon={MessageSquare}
              label="Compartilhar progresso"
              description="Permitir que amigos vejam seu avanço"
              iconColor="#7C3AED"
              isLast
            >
              <Toggle enabled={compartilharProgresso} onToggle={() => setCompartilharProgresso(!compartilharProgresso)} color="#7C3AED" />
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
          <SectionHeader icon={Lock} title="Conta" color="#EF4444" />
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SettingRow
              icon={Lock}
              label="Alterar senha"
              description="Atualize sua senha de acesso"
              iconColor="#F97316"
              onClick={() => {
                setLocation("/perfil");
                toast("Abra 'Meus Dados' no Perfil para alterar a senha");
              }}
            >
              <ChevronRight size={16} className="text-white/20" />
            </SettingRow>
            <SettingRow
              icon={Smartphone}
              label="Dispositivos conectados"
              description="1 dispositivo ativo"
              iconColor="#3B82F6"
              onClick={() => toast("Gerenciamento de dispositivos (protótipo)")}
            >
              <ChevronRight size={16} className="text-white/20" />
            </SettingRow>
            <SettingRow
              icon={Trash2}
              label="Excluir conta"
              description="Remover permanentemente seus dados"
              iconColor="#EF4444"
              onClick={() => toast.error("Tem certeza? Esta ação não pode ser desfeita.")}
              isLast
            >
              <ChevronRight size={16} className="text-white/20" />
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
          <SectionHeader icon={Info} title="Sobre" color="#3B82F6" />
          <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <SettingRow
              icon={Info}
              label="Versão do app"
              description="LabIA v1.0.0 (Protótipo)"
              iconColor="#3B82F6"
              isLast={false}
            >
              <span className="text-white/20 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                1.0.0
              </span>
            </SettingRow>
            <SettingRow
              icon={FileText}
              label="Termos de uso"
              iconColor="rgba(255,255,255,0.4)"
              onClick={() => toast("Termos de uso (protótipo)")}
            >
              <ExternalLink size={14} className="text-white/20" />
            </SettingRow>
            <SettingRow
              icon={Shield}
              label="Política de privacidade"
              iconColor="rgba(255,255,255,0.4)"
              onClick={() => toast("Política de privacidade (protótipo)")}
            >
              <ExternalLink size={14} className="text-white/20" />
            </SettingRow>
            <SettingRow
              icon={HelpCircle}
              label="Central de ajuda"
              iconColor="rgba(255,255,255,0.4)"
              onClick={() => toast("Central de ajuda (protótipo)")}
              isLast
            >
              <ExternalLink size={14} className="text-white/20" />
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
            <span className="text-white/15 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
              Feito com
            </span>
            <Heart size={9} className="text-[#EF4444]/40" fill="rgba(239,68,68,0.4)" />
            <span className="text-white/15 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
              pela equipe LabIA
            </span>
          </div>
          <p className="text-white/10 text-[9px]" style={{ fontFamily: "Inter, sans-serif" }}>
            © 2025 LabIA Edu. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
