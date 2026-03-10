/**
 * DesafioDoDia — Desafio diário com 3 perguntas (Matemática, Português, Atualidades)
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, Calculator, BookOpen, Globe, CheckCircle2,
  XCircle, Trophy, Zap, ChevronRight, Star, Clock,
} from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";

interface Question {
  id: number;
  subject: "Matemática" | "Português" | "Atualidades";
  subjectColor: string;
  subjectIcon: any;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  xp: number;
}

const DAILY_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: "Matemática",
    subjectColor: "#7C3AED",
    subjectIcon: Calculator,
    question: "Qual é o valor de x na equação 2x² - 8 = 0?",
    options: ["x = ±1", "x = ±2", "x = ±4", "x = ±8"],
    correct: 1,
    explanation: "2x² = 8 → x² = 4 → x = ±√4 = ±2. Portanto, x = ±2.",
    xp: 30,
  },
  {
    id: 2,
    subject: "Português",
    subjectColor: "#F97316",
    subjectIcon: BookOpen,
    question: "Em qual das alternativas há uso correto da crase?",
    options: [
      "Vou à escola amanhã.",
      "Ela foi à pé ao mercado.",
      "Entreguei o livro à ele.",
      "Refiro-me à um problema.",
    ],
    correct: 0,
    explanation: "A crase ocorre antes de palavras femininas que admitem artigo 'a'. 'Escola' é feminina e aceita artigo, portanto 'à escola' está correto.",
    xp: 30,
  },
  {
    id: 3,
    subject: "Atualidades",
    subjectColor: "#10B981",
    subjectIcon: Globe,
    question: "Qual tecnologia é base dos modelos de linguagem como ChatGPT?",
    options: [
      "Redes Neurais Convolucionais",
      "Algoritmos Genéticos",
      "Transformers e Atenção",
      "Árvores de Decisão",
    ],
    correct: 2,
    explanation: "Os LLMs (Large Language Models) como o ChatGPT são baseados na arquitetura Transformer, que usa mecanismos de atenção para processar linguagem.",
    xp: 40,
  },
];

type AnswerState = Record<number, { selected: number; correct: boolean }>;

export default function DesafioDoDia() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<AnswerState>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = DAILY_QUESTIONS[currentQ];
  const isAnswered = currentQ in answers;
  const totalXP = Object.values(answers).reduce((sum, a) => sum + (a.correct ? DAILY_QUESTIONS.find((q) => q.id === currentQ + 1)?.xp || 30 : 0), 0);
  const correctCount = Object.values(answers).filter((a) => a.correct).length;

  function handleSelect(optionIndex: number) {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === question.correct;
    setAnswers((prev) => ({ ...prev, [currentQ]: { selected: optionIndex, correct: isCorrect } }));
    setShowExplanation(true);
    if (isCorrect) {
      toast.success(`+${question.xp} XP! Resposta correta! 🎉`);
    } else {
      toast.error("Não foi dessa vez! Veja a explicação.");
    }
  }

  function handleNext() {
    if (currentQ < DAILY_QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  }

  const SubjectIcon = question.subjectIcon;

  if (finished) {
    const totalEarnedXP = Object.entries(answers).reduce((sum, [idx, a]) => {
      return sum + (a.correct ? DAILY_QUESTIONS[Number(idx)].xp : 0);
    }, 0);

    return (
      <PhoneFrame>
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          <motion.div
            className="flex flex-col items-center justify-center px-6 pt-20 pb-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
              style={{ background: "linear-gradient(135deg, #7C3AED20, #F9731620)" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy size={44} className="text-[#FFD700]" />
            </motion.div>

            <h1 className="text-2xl font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Desafio Concluído!
            </h1>
            <p className="text-sm mb-6" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Você completou o Desafio do Dia de hoje
            </p>

            <div className="grid grid-cols-3 gap-3 w-full mb-6">
              {[
                { label: "Acertos", value: `${correctCount}/3`, color: "#10B981" },
                { label: "XP Ganho", value: `+${totalEarnedXP}`, color: "#F97316" },
                { label: "Precisão", value: `${Math.round((correctCount / 3) * 100)}%`, color: "#7C3AED" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-2xl text-center"
                  style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                >
                  <p className="text-xl font-black" style={{ fontFamily: "Nunito, sans-serif", color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Per-question results */}
            <div className="w-full space-y-2 mb-6">
              {DAILY_QUESTIONS.map((q, i) => {
                const ans = answers[i];
                const Icon = q.subjectIcon;
                return (
                  <div
                    key={q.id}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${q.subjectColor}20` }}
                    >
                      <Icon size={14} style={{ color: q.subjectColor }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                        {q.subject}
                      </p>
                    </div>
                    {ans?.correct ? (
                      <CheckCircle2 size={18} className="text-[#10B981]" />
                    ) : (
                      <XCircle size={18} className="text-[#EF4444]" />
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setLocation("/ensino-medio")}
              className="w-full py-4 rounded-2xl text-white font-bold text-base"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)", fontFamily: "Nunito, sans-serif" }}
            >
              Voltar ao Início
            </button>
          </motion.div>
        </div>
        <BottomNavEM />
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      {/* Header */}
      <motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between px-5 pt-14 pb-3">
          <button
            onClick={() => setLocation("/ensino-medio")}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.cardBg }}
          >
            <ArrowLeft size={18} style={{ color: t.textSecondary }} />
          </button>
          <div className="text-center">
            <p className="font-black text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Desafio do Dia
            </p>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Clock size={10} style={{ color: t.textMuted }} />
              <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                Renova em 23h
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(249,115,22,0.15)" }}>
            <Zap size={12} className="text-[#F97316]" />
            <span className="text-xs font-bold text-[#F97316]" style={{ fontFamily: "Nunito, sans-serif" }}>
              {Object.entries(answers).reduce((sum, [idx, a]) => sum + (a.correct ? DAILY_QUESTIONS[Number(idx)].xp : 0), 0)} XP
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              Questão {currentQ + 1} de {DAILY_QUESTIONS.length}
            </span>
            <div className="flex gap-1.5">
              {DAILY_QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === currentQ ? 24 : 8,
                    background:
                      i < currentQ
                        ? answers[i]?.correct
                          ? "#10B981"
                          : "#EF4444"
                        : i === currentQ
                        ? "#7C3AED"
                        : t.isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Subject badge */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: `${question.subjectColor}20` }}
              >
                <SubjectIcon size={13} style={{ color: question.subjectColor }} />
                <span
                  className="text-xs font-bold"
                  style={{ fontFamily: "Inter, sans-serif", color: question.subjectColor }}
                >
                  {question.subject}
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(249,115,22,0.1)" }}>
                <Star size={10} className="text-[#F97316]" />
                <span className="text-[10px] font-bold text-[#F97316]" style={{ fontFamily: "Inter, sans-serif" }}>
                  +{question.xp} XP
                </span>
              </div>
            </div>

            {/* Question */}
            <div
              className="p-4 rounded-2xl mb-5"
              style={{
                background: t.isDark
                  ? `linear-gradient(135deg, ${question.subjectColor}15, ${question.subjectColor}08)`
                  : `linear-gradient(135deg, ${question.subjectColor}08, ${question.subjectColor}04)`,
                border: `1px solid ${question.subjectColor}25`,
              }}
            >
              <p className="text-base font-bold leading-snug" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                {question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-4">
              {question.options.map((option, i) => {
                const isSelected = answers[currentQ]?.selected === i;
                const isCorrect = i === question.correct;
                const showResult = isAnswered;

                let bg = t.cardBg;
                let border = t.cardBorder;
                let textColor = t.textPrimary;

                if (showResult) {
                  if (isCorrect) {
                    bg = "rgba(16,185,129,0.12)";
                    border = "#10B981";
                    textColor = "#10B981";
                  } else if (isSelected && !isCorrect) {
                    bg = "rgba(239,68,68,0.12)";
                    border = "#EF4444";
                    textColor = "#EF4444";
                  }
                } else if (selectedOption === i) {
                  bg = "rgba(124,58,237,0.12)";
                  border = "#7C3AED";
                }

                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={isAnswered}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all"
                    style={{ background: bg, border: `1.5px solid ${border}` }}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        background: showResult
                          ? isCorrect
                            ? "#10B981"
                            : isSelected
                            ? "#EF4444"
                            : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                          : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        color: showResult && (isCorrect || isSelected) ? "#fff" : t.textMuted,
                      }}
                    >
                      {showResult && isCorrect ? (
                        <CheckCircle2 size={14} />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle size={14} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ fontFamily: "Inter, sans-serif", color: textColor }}
                    >
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  className="p-4 rounded-2xl mb-4"
                  style={{
                    background: answers[currentQ]?.correct ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                    border: `1px solid ${answers[currentQ]?.correct ? "#10B98140" : "#EF444440"}`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p
                    className="text-xs font-bold mb-1"
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      color: answers[currentQ]?.correct ? "#10B981" : "#EF4444",
                    }}
                  >
                    {answers[currentQ]?.correct ? "✓ Correto!" : "✗ Incorreto"}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {isAnswered && (
              <motion.button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base"
                style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)", fontFamily: "Nunito, sans-serif" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {currentQ < DAILY_QUESTIONS.length - 1 ? (
                  <>
                    Próxima questão
                    <ChevronRight size={18} />
                  </>
                ) : (
                  <>
                    Ver resultado
                    <Trophy size={18} />
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNavEM />
    </PhoneFrame>
  );
}
