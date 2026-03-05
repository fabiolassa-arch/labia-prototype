/**
 * MissaoConteudo — Tela de revisão de atividade de uma missão concluída
 * Design: Header com cor da trilha, seções de objetivo, desafio, resposta do aluno,
 * feedback do tutor IA, nota, dicas e tags
 */
import { motion } from "framer-motion";
import { useLocation, useParams } from "wouter";
import {
  ArrowLeft, Target, Lightbulb, MessageCircle, Star, CheckCircle2,
  BookOpen, Sparkles, ChevronDown, ChevronUp, Clock, Tag,
  Share2, X, Copy, Check, ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { MISSION_DETAILS, IMAGES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

/* ─── Share Modal ─── */
function ShareModal({
  open,
  onClose,
  mission,
}: {
  open: boolean;
  onClose: () => void;
  mission: { title: string; trackTitle: string; score: number; maxScore: number };
}) {
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  const shareText = `Concluí a missão "${mission.title}" na trilha ${mission.trackTitle} com nota ${mission.score}/${mission.maxScore} no LabIA! 🚀🎓 #LabIA #InteligênciaArtificial #Educação`;
  const shareUrl = "https://labia.app";
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  const socials = [
    {
      name: "WhatsApp",
      color: "#25D366",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      name: "X (Twitter)",
      color: "#000000",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      color: "#1877F2",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    },
    {
      name: "LinkedIn",
      color: "#0A66C2",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <motion.div
        className="relative w-full max-w-[400px] bg-[#1A1A2E] rounded-t-3xl px-5 pt-5 pb-8 z-10"
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white text-lg font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
              Compartilhar Conquista
            </h3>
            <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
              Mostre seu progresso para o mundo!
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X size={16} className="text-white/60" />
          </button>
        </div>

        {/* Preview card */}
        <div className="rounded-2xl p-4 mb-5 border border-white/10 bg-gradient-to-br from-[#8B5CF6]/15 to-[#06B6D4]/15">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/20 flex items-center justify-center">
              <span className="text-[#10B981] text-lg font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
                {mission.score}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-bold leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>
                {mission.title}
              </p>
              <p className="text-white/40 text-xs mt-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                {mission.trackTitle} • Nota {mission.score}/{mission.maxScore}
              </p>
            </div>
            <span className="text-2xl">🏆</span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {socials.map((social) => (
            <button
              key={social.name}
              onClick={() => window.open(social.url, "_blank", "width=600,height=400")}
              className="flex flex-col items-center gap-2 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 group-active:scale-95"
                style={{ background: `${social.color}25`, border: `1px solid ${social.color}40` }}
              >
                <div style={{ color: social.color }}>{social.icon}</div>
              </div>
              <span className="text-white/50 text-[10px] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                {social.name}
              </span>
            </button>
          ))}
        </div>

        {/* Copy link */}
        <button
          onClick={handleCopy}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 bg-white/8 border border-white/10 transition-all hover:bg-white/12 active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check size={16} className="text-[#10B981]" />
              <span className="text-[#10B981] text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
                Copiado!
              </span>
            </>
          ) : (
            <>
              <Copy size={16} className="text-white/60" />
              <span className="text-white/60 text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
                Copiar texto
              </span>
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}

function ScoreRing({ score, maxScore, color }: { score: number; maxScore: number; color: string }) {
  const pct = (score / maxScore) * 100;
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" className="rotate-[-90deg]">
        <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        <motion.circle
          cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white text-xl font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
          {score}
        </span>
        <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
          /{maxScore}
        </span>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  iconColor,
  title,
  children,
  delay = 0,
  collapsible = false,
  defaultOpen = true,
}: {
  icon: any;
  iconColor: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      className="mx-5 mb-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <button
        className={`flex items-center gap-2 mb-2 w-full text-left ${collapsible ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => collapsible && setOpen(!open)}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${iconColor}20` }}
        >
          <Icon size={14} style={{ color: iconColor }} />
        </div>
        <h3 className="text-white text-sm font-bold flex-1" style={{ fontFamily: "Nunito, sans-serif" }}>
          {title}
        </h3>
        {collapsible && (
          open ? <ChevronUp size={16} className="text-white/30" /> : <ChevronDown size={16} className="text-white/30" />
        )}
      </button>
      {open && children}
    </motion.div>
  );
}

export default function MissaoConteudo() {
  const params = useParams<{ trilha: string; id: string }>();
  const [, setLocation] = useLocation();

  const missionId = `${params.trilha}-${params.id}`;
  const mission = MISSION_DETAILS.find((m) => m.id === missionId);

  if (!mission) {
    return (
      <PhoneFrame>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-8">
            <BookOpen size={48} className="text-white/20 mx-auto mb-4" />
            <p className="text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Missão não encontrada
            </p>
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-2 rounded-xl bg-white/10 text-white text-sm font-semibold"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Voltar
            </button>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const [shareOpen, setShareOpen] = useState(false);

  const backRoute = mission.trackSlug === "entendendo-ia"
    ? "/trilha-entendendo-ia"
    : mission.trackSlug === "criando-prompts"
    ? "/trilha-detalhe"
    : "/trilhas";

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="relative px-5 pt-14 pb-5 rounded-b-3xl overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${mission.trackColor} 0%, ${mission.trackColor}CC 50%, ${mission.trackColor}99 100%)`,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Back button */}
          <motion.button
            onClick={() => setLocation(backRoute)}
            className="absolute top-12 left-4 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ArrowLeft size={20} className="text-white" />
          </motion.button>

          {/* Mission info */}
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Missão {mission.missionNumber}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#10B981]/20 text-[#10B981]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCircle2 size={10} /> Concluída
                </span>
              </div>
              <h1
                className="text-white text-xl font-black leading-tight"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                {mission.title}
              </h1>
              <p className="text-white/60 text-xs mt-1.5 flex items-center gap-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                <BookOpen size={11} /> {mission.trackTitle}
                <span className="text-white/30">•</span>
                <Clock size={11} /> {mission.completedAt}
              </p>
            </div>

            {/* Score ring */}
            <ScoreRing score={mission.score} maxScore={mission.maxScore} color="#10B981" />
          </div>
        </motion.div>

        {/* Content sections */}
        <div className="pt-5 pb-8">
          {/* Objetivo */}
          <Section icon={Target} iconColor="#06B6D4" title="Objetivo da Missão" delay={0.2}>
            <div className="rounded-xl p-3.5 bg-[#06B6D4]/8 border border-[#06B6D4]/15">
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {mission.objective}
              </p>
            </div>
          </Section>

          {/* Desafio */}
          <Section icon={Sparkles} iconColor="#F59E0B" title="Desafio Proposto" delay={0.3}>
            <div className="rounded-xl p-3.5 bg-[#F59E0B]/8 border border-[#F59E0B]/15">
              <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {mission.challenge}
              </p>
            </div>
          </Section>

          {/* Resposta do aluno */}
          <Section icon={MessageCircle} iconColor="#8B5CF6" title="Sua Resposta" delay={0.4}>
            <div className="rounded-xl p-3.5 bg-[#8B5CF6]/8 border border-[#8B5CF6]/15 relative">
              <div className="flex items-center gap-2 mb-2.5">
                <img
                  src={IMAGES.avatarBoy}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-white/60 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Lucas Oliveira
                </span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {mission.studentAnswer}
              </p>
            </div>
          </Section>

          {/* Feedback do tutor */}
          <Section icon={Star} iconColor="#10B981" title="Feedback do Tutor IA" delay={0.5}>
            <div className="rounded-xl p-3.5 bg-[#10B981]/8 border border-[#10B981]/15 relative">
              <div className="flex items-center gap-2 mb-2.5">
                <img
                  src={IMAGES.tutorRobot}
                  alt="Tutor IA"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-[#10B981] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tutor IA
                </span>
                <div className="flex items-center gap-0.5 ml-auto">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={10}
                      className={i < Math.round(mission.score / 2) ? "text-[#F59E0B]" : "text-white/15"}
                      fill={i < Math.round(mission.score / 2) ? "#F59E0B" : "transparent"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {mission.tutorFeedback}
              </p>
            </div>
          </Section>

          {/* Dicas */}
          <Section icon={Lightbulb} iconColor="#F59E0B" title="Dicas para Lembrar" delay={0.6} collapsible defaultOpen={false}>
            <div className="space-y-2">
              {mission.tips.map((tip, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl p-3 bg-[#F59E0B]/8 border border-[#F59E0B]/10"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <Lightbulb size={14} className="text-[#F59E0B] flex-shrink-0 mt-0.5" />
                  <p className="text-white/70 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {tip}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Tags */}
          <motion.div
            className="mx-5 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Tag size={13} className="text-white/30" />
              <span className="text-white/30 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                Temas abordados
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mission.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-white/50 border border-white/8"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Botão compartilhar */}
          <motion.div
            className="mx-5 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setShareOpen(true)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] active:scale-[0.98] transition-transform"
              style={{
                fontFamily: "Nunito, sans-serif",
                boxShadow: "0 4px 20px rgba(139,92,246,0.35)",
              }}
            >
              <Share2 size={16} />
              Compartilhar Conquista
            </button>
          </motion.div>

          {/* Botão voltar à trilha */}
          <motion.div
            className="mx-5 mt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={() => setLocation(backRoute)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white/70 flex items-center justify-center gap-2 bg-white/8 border border-white/10 hover:bg-white/12 transition-colors"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              <ArrowLeft size={16} />
              Voltar para {mission.trackTitle}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        mission={{
          title: mission.title,
          trackTitle: mission.trackTitle,
          score: mission.score,
          maxScore: mission.maxScore,
        }}
      />
    </PhoneFrame>
  );
}
