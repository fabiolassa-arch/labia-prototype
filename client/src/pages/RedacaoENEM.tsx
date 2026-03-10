/**
 * RedacaoENEM — Tela de Redação ENEM
 * Permite escrever texto ou enviar foto da redação para análise.
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, PenLine, Camera, Upload, CheckCircle2,
  Star, Info, ChevronRight, FileText, Image as ImageIcon,
  Sparkles, BookOpen, X,
} from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";

const THEMES = [
  "Desafios para a valorização da saúde mental na sociedade brasileira",
  "O impacto da desinformação na democracia contemporânea",
  "Caminhos para a redução da desigualdade social no Brasil",
];

const COMPETENCIAS = [
  { id: 1, label: "Domínio da escrita formal", color: "#7C3AED" },
  { id: 2, label: "Compreensão do tema", color: "#F97316" },
  { id: 3, label: "Seleção de argumentos", color: "#10B981" },
  { id: 4, label: "Coesão e coerência", color: "#3B82F6" },
  { id: 5, label: "Proposta de intervenção", color: "#EF4444" },
];

type Mode = "select" | "write" | "photo" | "feedback";

interface FeedbackData {
  score: number;
  competencias: { id: number; score: number; comment: string }[];
  general: string;
}

const MOCK_FEEDBACK: FeedbackData = {
  score: 760,
  competencias: [
    { id: 1, score: 160, comment: "Boa adequação à norma culta, com poucos desvios gramaticais." },
    { id: 2, score: 160, comment: "Tema bem compreendido e desenvolvido de forma pertinente." },
    { id: 3, score: 160, comment: "Argumentos relevantes, mas poderiam ser mais aprofundados." },
    { id: 4, score: 120, comment: "Conectivos utilizados de forma adequada na maioria dos parágrafos." },
    { id: 5, score: 160, comment: "Proposta de intervenção completa com agente, ação e finalidade." },
  ],
  general:
    "Sua redação demonstra boa compreensão do tema e domínio da estrutura dissertativa. Para alcançar a nota máxima, aprofunde os argumentos e diversifique os conectivos.",
};

export default function RedacaoENEM() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const [mode, setMode] = useState<Mode>("select");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [text, setText] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const charCount = text.length;

  function handleAnalyze() {
    if (mode === "write" && text.trim().length < 50) {
      toast.error("Escreva pelo menos 50 caracteres para analisar.");
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setFeedback(MOCK_FEEDBACK);
      setMode("feedback");
      toast.success("Redação analisada com sucesso! 🎉");
    }, 2500);
  }

  function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPhotoPreview(ev.target?.result as string);
        toast.success("Foto carregada! Toque em 'Analisar' para continuar.");
      };
      reader.readAsDataURL(file);
    }
  }

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
              if (mode !== "select") {
                setMode("select");
                setFeedback(null);
              } else {
                setLocation("/ensino-medio");
              }
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: t.cardBg }}
          >
            <ArrowLeft size={18} style={{ color: t.textSecondary }} />
          </button>
          <div className="flex-1">
            <p className="font-black text-base" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Redação ENEM
            </p>
            <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              {mode === "select" && "Escolha como enviar"}
              {mode === "write" && "Escreva sua redação"}
              {mode === "photo" && "Envie a foto"}
              {mode === "feedback" && "Resultado da análise"}
            </p>
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", fontFamily: "Inter, sans-serif" }}
          >
            ENEM 2025
          </div>
        </div>
      </motion.div>

      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence mode="wait">
          {/* SELECT MODE */}
          {mode === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Theme selector */}
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                  Tema da redação
                </p>
                <div className="space-y-2">
                  {THEMES.map((theme, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTheme(i)}
                      className="w-full text-left p-4 rounded-2xl transition-all"
                      style={{
                        background: selectedTheme === i
                          ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(249,115,22,0.08))"
                          : t.cardBg,
                        border: `1.5px solid ${selectedTheme === i ? "#7C3AED" : t.cardBorder}`,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{
                            background: selectedTheme === i ? "#7C3AED" : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                            border: `2px solid ${selectedTheme === i ? "#7C3AED" : t.cardBorder}`,
                          }}
                        >
                          {selectedTheme === i && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <p className="text-sm leading-snug" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                          {theme}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Competencias info */}
              <div
                className="p-4 rounded-2xl mb-5"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-[#7C3AED]" />
                  <p className="text-xs font-bold text-[#7C3AED]" style={{ fontFamily: "Nunito, sans-serif" }}>
                    5 Competências avaliadas
                  </p>
                </div>
                <div className="space-y-1">
                  {COMPETENCIAS.map((c) => (
                    <div key={c.id} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
                      <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                        {c.id}. {c.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mode selection */}
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                Como deseja enviar?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={() => setMode("write")}
                  className="p-5 rounded-2xl flex flex-col items-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.06))",
                    border: "1.5px solid rgba(124,58,237,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(124,58,237,0.2)" }}>
                    <PenLine size={22} className="text-[#7C3AED]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#7C3AED]" style={{ fontFamily: "Nunito, sans-serif" }}>
                      Escrever
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                      Digite no app
                    </p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => setMode("photo")}
                  className="p-5 rounded-2xl flex flex-col items-center gap-3"
                  style={{
                    background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.06))",
                    border: "1.5px solid rgba(249,115,22,0.3)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.2)" }}>
                    <Camera size={22} className="text-[#F97316]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#F97316]" style={{ fontFamily: "Nunito, sans-serif" }}>
                      Foto
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                      Enviar imagem
                    </p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* WRITE MODE */}
          {mode === "write" && (
            <motion.div
              key="write"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {/* Theme display */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tema
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  {THEMES[selectedTheme]}
                </p>
              </div>

              {/* Text area */}
              <div className="mb-3">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escreva sua redação aqui. Lembre-se: introdução, desenvolvimento (2 parágrafos) e conclusão com proposta de intervenção..."
                  rows={14}
                  className="w-full p-4 rounded-2xl text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    border: `1.5px solid ${t.cardBorder}`,
                    color: t.textPrimary,
                    lineHeight: "1.8",
                  }}
                />
                <div className="flex items-center justify-between mt-2 px-1">
                  <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                    {wordCount} palavras · {charCount} caracteres
                  </span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: wordCount >= 150 ? "#10B981" : wordCount >= 80 ? "#F97316" : t.textMuted,
                    }}
                  >
                    {wordCount >= 150 ? "✓ Tamanho adequado" : wordCount >= 80 ? "Quase lá!" : "Mínimo: ~150 palavras"}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base"
                style={{
                  background: isAnalyzing
                    ? t.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                    : "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)",
                  fontFamily: "Nunito, sans-serif",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analisar Redação
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* PHOTO MODE */}
          {mode === "photo" && (
            <motion.div
              key="photo"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              {/* Theme display */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Tema
                </p>
                <p className="text-sm font-semibold leading-snug" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  {THEMES[selectedTheme]}
                </p>
              </div>

              {/* Photo upload area */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoSelect}
                className="hidden"
              />

              {photoPreview ? (
                <div className="mb-4 relative">
                  <img
                    src={photoPreview}
                    alt="Redação"
                    className="w-full rounded-2xl object-cover"
                    style={{ maxHeight: 300 }}
                  />
                  <button
                    onClick={() => setPhotoPreview(null)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)" }}
                  >
                    <X size={14} className="text-white" />
                  </button>
                </div>
              ) : (
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center gap-4 py-12 rounded-2xl mb-4"
                  style={{
                    background: t.isDark ? "rgba(249,115,22,0.06)" : "rgba(249,115,22,0.04)",
                    border: `2px dashed rgba(249,115,22,0.4)`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
                    <Camera size={28} className="text-[#F97316]" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#F97316]" style={{ fontFamily: "Nunito, sans-serif" }}>
                      Tirar foto ou escolher da galeria
                    </p>
                    <p className="text-xs mt-1" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                      JPG, PNG ou HEIC · Máx. 10MB
                    </p>
                  </div>
                </motion.button>
              )}

              {/* Tips */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
              >
                <p className="text-xs font-bold mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  Dicas para uma boa foto:
                </p>
                {["Boa iluminação, sem sombras", "Texto legível e centralizado", "Folha plana e sem dobras"].map((tip) => (
                  <div key={tip} className="flex items-center gap-2 mb-1">
                    <CheckCircle2 size={11} className="text-[#10B981] flex-shrink-0" />
                    <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                      {tip}
                    </p>
                  </div>
                ))}
              </div>

              <motion.button
                onClick={handleAnalyze}
                disabled={!photoPreview || isAnalyzing}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold text-base"
                style={{
                  background:
                    !photoPreview || isAnalyzing
                      ? t.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                      : "linear-gradient(135deg, #F97316 0%, #7C3AED 100%)",
                  fontFamily: "Nunito, sans-serif",
                  color: !photoPreview ? t.textMuted : "#fff",
                }}
                whileTap={photoPreview ? { scale: 0.98 } : {}}
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Analisando com IA...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analisar Redação
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* FEEDBACK MODE */}
          {mode === "feedback" && feedback && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Score */}
              <div
                className="p-5 rounded-2xl mb-5 text-center"
                style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(249,115,22,0.1))", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                  Pontuação estimada
                </p>
                <motion.p
                  className="text-5xl font-black"
                  style={{ fontFamily: "Nunito, sans-serif", color: "#7C3AED" }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {feedback.score}
                </motion.p>
                <p className="text-xs mt-1" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  de 1000 pontos
                </p>
                <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: t.isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #7C3AED, #F97316)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(feedback.score / 1000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>

              {/* Competencias */}
              <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                Por competência
              </p>
              <div className="space-y-3 mb-5">
                {feedback.competencias.map((comp) => {
                  const competencia = COMPETENCIAS.find((c) => c.id === comp.id)!;
                  return (
                    <div
                      key={comp.id}
                      className="p-4 rounded-2xl"
                      style={{ background: t.cardBg, border: `1px solid ${t.cardBorder}` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: competencia.color }} />
                          <p className="text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
                            C{comp.id}: {competencia.label}
                          </p>
                        </div>
                        <span className="text-sm font-black" style={{ fontFamily: "Nunito, sans-serif", color: competencia.color }}>
                          {comp.score}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full mb-2" style={{ background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: competencia.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(comp.score / 200) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * comp.id }}
                        />
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                        {comp.comment}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* General feedback */}
              <div
                className="p-4 rounded-2xl mb-5"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-[#10B981]" />
                  <p className="text-xs font-bold text-[#10B981]" style={{ fontFamily: "Nunito, sans-serif" }}>
                    Feedback geral da IA
                  </p>
                </div>
                <p className="text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                  {feedback.general}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => { setMode("select"); setFeedback(null); setText(""); setPhotoPreview(null); }}
                  className="py-3.5 rounded-2xl font-bold text-sm"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    background: t.cardBg,
                    border: `1.5px solid ${t.cardBorder}`,
                    color: t.textPrimary,
                  }}
                >
                  Nova redação
                </button>
                <button
                  onClick={() => { toast.success("Redação salva no portfólio!"); setLocation("/ensino-medio"); }}
                  className="py-3.5 rounded-2xl font-bold text-sm text-white"
                  style={{ fontFamily: "Nunito, sans-serif", background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
                >
                  Salvar resultado
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
