/**
 * PlanoDeEstudos — Diagnóstico simples e geração de plano semanal de estudos
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, ChevronRight, CheckCircle2, BookOpen, Calculator,
  FlaskConical, Globe, Clock, Sparkles, Calendar, Target,
  Brain, Zap, Star,
} from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";

type Step = "diagnostic" | "generating" | "plan";

interface DiagnosticData {
  weakSubjects: string[];
  studyHours: string;
  goal: string;
  examDate: string;
}

const SUBJECTS = [
  { id: "matematica", label: "Matemática", icon: Calculator, color: "#7C3AED" },
  { id: "portugues", label: "Português", icon: BookOpen, color: "#F97316" },
  { id: "ciencias", label: "Ciências da Natureza", icon: FlaskConical, color: "#10B981" },
  { id: "humanas", label: "Ciências Humanas", icon: Globe, color: "#3B82F6" },
  { id: "linguagens", label: "Linguagens", icon: Brain, color: "#EF4444" },
  { id: "redacao", label: "Redação", icon: BookOpen, color: "#F59E0B" },
];

const STUDY_HOURS = ["1-2h por dia", "2-3h por dia", "3-4h por dia", "4h+ por dia"];
const GOALS = ["Passar no ENEM", "Entrar na faculdade", "Melhorar notas", "Reforço escolar"];
const EXAM_DATES = ["Em 1 mês", "Em 3 meses", "Em 6 meses", "Em 1 ano"];

const WEEK_DAYS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

interface StudySession {
  subject: string;
  subjectColor: string;
  topic: string;
  duration: string;
  type: "teoria" | "exercícios" | "revisão";
}

const GENERATED_PLAN: Record<string, StudySession[]> = {
  Seg: [
    { subject: "Matemática", subjectColor: "#7C3AED", topic: "Funções do 2º grau", duration: "1h", type: "teoria" },
    { subject: "Redação", subjectColor: "#F59E0B", topic: "Estrutura dissertativa", duration: "45min", type: "teoria" },
  ],
  Ter: [
    { subject: "Português", subjectColor: "#F97316", topic: "Interpretação de texto", duration: "1h", type: "exercícios" },
    { subject: "Ciências", subjectColor: "#10B981", topic: "Leis de Newton", duration: "1h", type: "teoria" },
  ],
  Qua: [
    { subject: "Matemática", subjectColor: "#7C3AED", topic: "Exercícios: Funções", duration: "1h30", type: "exercícios" },
    { subject: "Humanas", subjectColor: "#3B82F6", topic: "Revolução Industrial", duration: "45min", type: "teoria" },
  ],
  Qui: [
    { subject: "Redação", subjectColor: "#F59E0B", topic: "Prática: escrever redação", duration: "1h30", type: "exercícios" },
    { subject: "Ciências", subjectColor: "#10B981", topic: "Exercícios: Física", duration: "1h", type: "exercícios" },
  ],
  Sex: [
    { subject: "Português", subjectColor: "#F97316", topic: "Gramática: concordância", duration: "1h", type: "teoria" },
    { subject: "Humanas", subjectColor: "#3B82F6", topic: "Revisão: História Geral", duration: "1h", type: "revisão" },
  ],
  Sáb: [
    { subject: "Simulado", subjectColor: "#7C3AED", topic: "Simulado completo ENEM", duration: "3h", type: "exercícios" },
  ],
  Dom: [
    { subject: "Revisão", subjectColor: "#10B981", topic: "Revisão da semana + descanso", duration: "1h", type: "revisão" },
  ],
};

export default function PlanoDeEstudos() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const [step, setStep] = useState<Step>("diagnostic");
  const [diagnostic, setDiagnostic] = useState<DiagnosticData>({
    weakSubjects: [],
    studyHours: "",
    goal: "",
    examDate: "",
  });
  const [activeDay, setActiveDay] = useState("Seg");
  const [diagnosticStep, setDiagnosticStep] = useState(0);

  function toggleSubject(id: string) {
    setDiagnostic((prev) => ({
      ...prev,
      weakSubjects: prev.weakSubjects.includes(id)
        ? prev.weakSubjects.filter((s) => s !== id)
        : [...prev.weakSubjects, id],
    }));
  }

  function generatePlan() {
    if (diagnostic.weakSubjects.length === 0) {
      toast.error("Selecione pelo menos uma matéria com dificuldade.");
      return;
    }
    if (!diagnostic.studyHours || !diagnostic.goal || !diagnostic.examDate) {
      toast.error("Preencha todas as informações.");
      return;
    }
    setStep("generating");
    setTimeout(() => {
      setStep("plan");
      toast.success("Plano de estudos gerado com sucesso! 🎉");
    }, 2500);
  }

  const typeColors: Record<string, string> = {
    teoria: "#3B82F6",
    exercícios: "#F97316",
    revisão: "#10B981",
  };

  return (
    <PhoneFrame>
      {/* Header */}
      <motion.div
        className="flex-shrink-0"
        style={{ background: t.headerBg }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 px-5 pt-14 pb-4">
          <button
            onClick={() => {
              if (step === "plan") setStep("diagnostic");
              else setLocation("/ensino-medio");
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.cardBg }}
          >
            <ArrowLeft size={18} style={{ color: t.textSecondary }} />
          </button>
          <div className="flex-1">
            <p className="font-black text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Plano de Estudos
            </p>
            <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              {step === "diagnostic" && "Diagnóstico personalizado"}
              {step === "generating" && "Gerando seu plano..."}
              {step === "plan" && "Seu plano semanal"}
            </p>
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(16,185,129,0.15)", color: "#10B981", fontFamily: "Inter, sans-serif" }}
          >
            IA Personalizada
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="wait">
          {/* DIAGNOSTIC STEP */}
          {step === "diagnostic" && (
            <motion.div
              key="diagnostic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Step 1: Weak subjects */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "#7C3AED" }}>
                    1
                  </div>
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                    Em quais matérias você tem mais dificuldade?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {SUBJECTS.map((subj) => {
                    const Icon = subj.icon;
                    const isSelected = diagnostic.weakSubjects.includes(subj.id);
                    return (
                      <motion.button
                        key={subj.id}
                        onClick={() => toggleSubject(subj.id)}
                        className="flex items-center gap-2 p-3 rounded-xl transition-all"
                        style={{
                          background: isSelected ? `${subj.color}15` : t.cardBg,
                          border: `1.5px solid ${isSelected ? subj.color : t.cardBorder}`,
                        }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Icon size={14} style={{ color: isSelected ? subj.color : t.textMuted }} />
                        <span
                          className="text-xs font-semibold text-left leading-tight"
                          style={{ fontFamily: "Inter, sans-serif", color: isSelected ? subj.color : t.textSecondary }}
                        >
                          {subj.label}
                        </span>
                        {isSelected && <CheckCircle2 size={12} style={{ color: subj.color, marginLeft: "auto", flexShrink: 0 }} />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Study hours */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "#F97316" }}>
                    2
                  </div>
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                    Quantas horas você pode estudar por dia?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {STUDY_HOURS.map((h) => (
                    <button
                      key={h}
                      onClick={() => setDiagnostic((prev) => ({ ...prev, studyHours: h }))}
                      className="flex items-center gap-2 p-3 rounded-xl transition-all"
                      style={{
                        background: diagnostic.studyHours === h ? "rgba(249,115,22,0.15)" : t.cardBg,
                        border: `1.5px solid ${diagnostic.studyHours === h ? "#F97316" : t.cardBorder}`,
                      }}
                    >
                      <Clock size={13} style={{ color: diagnostic.studyHours === h ? "#F97316" : t.textMuted }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ fontFamily: "Inter, sans-serif", color: diagnostic.studyHours === h ? "#F97316" : t.textSecondary }}
                      >
                        {h}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Goal */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "#10B981" }}>
                    3
                  </div>
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                    Qual é seu objetivo principal?
                  </p>
                </div>
                <div className="space-y-2">
                  {GOALS.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setDiagnostic((prev) => ({ ...prev, goal }))}
                      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                      style={{
                        background: diagnostic.goal === goal ? "rgba(16,185,129,0.12)" : t.cardBg,
                        border: `1.5px solid ${diagnostic.goal === goal ? "#10B981" : t.cardBorder}`,
                      }}
                    >
                      <Target size={14} style={{ color: diagnostic.goal === goal ? "#10B981" : t.textMuted }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ fontFamily: "Inter, sans-serif", color: diagnostic.goal === goal ? "#10B981" : t.textSecondary }}
                      >
                        {goal}
                      </span>
                      {diagnostic.goal === goal && <CheckCircle2 size={13} className="text-[#10B981] ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 4: Exam date */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white" style={{ background: "#3B82F6" }}>
                    4
                  </div>
                  <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                    Quando é sua prova ou vestibular?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {EXAM_DATES.map((date) => (
                    <button
                      key={date}
                      onClick={() => setDiagnostic((prev) => ({ ...prev, examDate: date }))}
                      className="flex items-center gap-2 p-3 rounded-xl transition-all"
                      style={{
                        background: diagnostic.examDate === date ? "rgba(59,130,246,0.15)" : t.cardBg,
                        border: `1.5px solid ${diagnostic.examDate === date ? "#3B82F6" : t.cardBorder}`,
                      }}
                    >
                      <Calendar size={13} style={{ color: diagnostic.examDate === date ? "#3B82F6" : t.textMuted }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ fontFamily: "Inter, sans-serif", color: diagnostic.examDate === date ? "#3B82F6" : t.textSecondary }}
                      >
                        {date}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={generatePlan}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base"
                style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)", fontFamily: "Nunito, sans-serif" }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={18} />
                Gerar Plano com IA
              </motion.button>
            </motion.div>
          )}

          {/* GENERATING STEP */}
          {step === "generating" && (
            <motion.div
              key="generating"
              className="flex flex-col items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(249,115,22,0.1))" }}
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain size={44} className="text-[#7C3AED]" />
              </motion.div>
              <p className="text-lg font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                Gerando seu plano...
              </p>
              <p className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                A IA está analisando seu diagnóstico e criando um plano personalizado
              </p>
              <div className="flex gap-2 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#7C3AED]"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.25 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* PLAN STEP */}
          {step === "plan" && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Summary */}
              <div
                className="p-4 rounded-2xl mb-5"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(249,115,22,0.08))", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-[#7C3AED]" />
                  <p className="text-sm font-black text-[#7C3AED]" style={{ fontFamily: "Nunito, sans-serif" }}>
                    Plano personalizado gerado!
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Matérias", value: diagnostic.weakSubjects.length.toString(), color: "#7C3AED" },
                    { label: "Por dia", value: diagnostic.studyHours.split(" ")[0], color: "#F97316" },
                    { label: "Objetivo", value: diagnostic.examDate.split(" ").slice(1).join(" "), color: "#10B981" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-base font-black" style={{ fontFamily: "Nunito, sans-serif", color: stat.color }}>
                        {stat.value}
                      </p>
                      <p className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day selector */}
              <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {WEEK_DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      background: activeDay === day ? "#7C3AED" : t.cardBg,
                      color: activeDay === day ? "#fff" : t.textMuted,
                      border: `1px solid ${activeDay === day ? "#7C3AED" : t.cardBorder}`,
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Sessions for active day */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-3 mb-5"
                >
                  {(GENERATED_PLAN[activeDay] || []).map((session, i) => (
                    <motion.div
                      key={i}
                      className="p-4 rounded-2xl"
                      style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${session.subjectColor}20` }}
                        >
                          <BookOpen size={16} style={{ color: session.subjectColor }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                              {session.subject}
                            </p>
                            <div className="flex items-center gap-1">
                              <Clock size={10} style={{ color: t.textMuted }} />
                              <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                                {session.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs mb-2" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                            {session.topic}
                          </p>
                          <div
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                            style={{ background: `${typeColors[session.type]}20`, color: typeColors[session.type] }}
                          >
                            {session.type}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Tips */}
              <div
                className="p-4 rounded-2xl mb-5"
                style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star size={13} className="text-[#F97316]" />
                  <p className="text-xs font-bold text-[#F97316]" style={{ fontFamily: "Nunito, sans-serif" }}>
                    Dica da IA para você
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  Mantenha a consistência! Estudar 1h por dia todos os dias é mais eficaz do que estudar 7h em um único dia. Use o Tutor IA para tirar dúvidas durante os estudos.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStep("diagnostic")}
                  className="py-3.5 rounded-2xl font-bold text-sm"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    background: t.cardBg,
                    border: `1.5px solid ${t.cardBorder}`,
                    color: t.textPrimary,
                  }}
                >
                  Refazer diagnóstico
                </button>
                <button
                  onClick={() => { toast.success("Plano salvo! Boa sorte nos estudos!"); setLocation("/ensino-medio"); }}
                  className="py-3.5 rounded-2xl font-bold text-sm text-white"
                  style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
                >
                  Salvar plano
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNavEM />
    </PhoneFrame>
  );
}
