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
} from "lucide-react";
import { useState } from "react";
import { MISSION_DETAILS, IMAGES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

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

          {/* Botão voltar à trilha */}
          <motion.div
            className="mx-5 mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <button
              onClick={() => setLocation(backRoute)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{
                fontFamily: "Nunito, sans-serif",
                background: `linear-gradient(135deg, ${mission.trackColor} 0%, ${mission.trackColor}CC 100%)`,
                boxShadow: `0 4px 20px ${mission.trackColor}40`,
              }}
            >
              <ArrowLeft size={16} />
              Voltar para {mission.trackTitle}
            </button>
          </motion.div>
        </div>
      </div>
    </PhoneFrame>
  );
}
