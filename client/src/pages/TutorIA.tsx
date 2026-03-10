/**
 * TutorIA — Tutor de IA para Ensino Médio
 * Permite ao aluno tirar dúvidas escolares com a IA.
 * Mantém o padrão visual do protótipo LabIA.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft, Send, Brain, Sparkles, BookOpen,
  Calculator, FlaskConical, Globe, Lightbulb, ChevronRight,
} from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNavEM from "@/components/BottomNavEM";

const SUBJECT_CHIPS = [
  { label: "Matemática", icon: Calculator, color: "#7C3AED" },
  { label: "Português", icon: BookOpen, color: "#F97316" },
  { label: "Ciências", icon: FlaskConical, color: "#10B981" },
  { label: "História", icon: Globe, color: "#3B82F6" },
];

const SUGGESTED_QUESTIONS = [
  "Como resolver equações de 2º grau?",
  "O que é função afim?",
  "Explique a Lei de Lavoisier",
  "Quais foram as causas da Revolução Francesa?",
  "Como identificar sujeito e predicado?",
];

interface Message {
  id: number;
  role: "user" | "tutor";
  text: string;
  subject?: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "tutor",
    text: "Olá! Sou o Tutor IA do EduIA 👋 Estou aqui para ajudar com suas dúvidas do Ensino Médio. Pode perguntar sobre Matemática, Português, Ciências, História e muito mais!",
  },
];

export default function TutorIA() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const TUTOR_RESPONSES: Record<string, string> = {
    default:
      "Ótima pergunta! Vou te explicar passo a passo. Primeiro, é importante entender o conceito base. Depois, vamos praticar com exemplos. Você quer que eu detalhe mais alguma parte?",
    matemática:
      "Em Matemática, o segredo é entender o raciocínio lógico por trás de cada operação. Vamos resolver juntos: identifique os dados, escolha a fórmula correta e aplique. Quer tentar um exercício prático?",
    português:
      "Na Língua Portuguesa, preste atenção na estrutura da frase. Identifique o sujeito (quem pratica a ação) e o predicado (o que é dito sobre o sujeito). Precisa de mais exemplos?",
    ciências:
      "As Ciências Naturais explicam o mundo ao nosso redor! Este conceito é fundamental para entender fenômenos do cotidiano. Quer que eu use uma analogia para facilitar o entendimento?",
    história:
      "A História nos ajuda a entender o presente! Este evento foi marcante porque mudou a sociedade de forma profunda. Vou contextualizar para você entender melhor o impacto.",
  };

  function sendMessage(text?: string) {
    const msg = text || inputText.trim();
    if (!msg) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: msg,
      subject: activeSubject || undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const lowerMsg = msg.toLowerCase();
      let response = TUTOR_RESPONSES.default;
      if (lowerMsg.includes("matemát") || lowerMsg.includes("equaç") || lowerMsg.includes("função")) {
        response = TUTOR_RESPONSES["matemática"];
      } else if (lowerMsg.includes("portugu") || lowerMsg.includes("sujeito") || lowerMsg.includes("redaç")) {
        response = TUTOR_RESPONSES["português"];
      } else if (lowerMsg.includes("ciênc") || lowerMsg.includes("química") || lowerMsg.includes("física") || lowerMsg.includes("biolog")) {
        response = TUTOR_RESPONSES["ciências"];
      } else if (lowerMsg.includes("histór") || lowerMsg.includes("revolução") || lowerMsg.includes("guerra")) {
        response = TUTOR_RESPONSES["história"];
      }

      const tutorMsg: Message = {
        id: Date.now() + 1,
        role: "tutor",
        text: response,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, tutorMsg]);
    }, 1500);
  }

  return (
    <PhoneFrame>
      {/* Header */}
      <motion.div
        className="sticky top-0 z-20 backdrop-blur-lg flex-shrink-0"
        style={{ background: t.headerBg }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 px-5 pt-14 pb-3">
          <button
            onClick={() => setLocation("/ensino-medio")}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: t.cardBg }}
          >
            <ArrowLeft size={18} style={{ color: t.textSecondary }} />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
            >
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                Tutor IA
              </p>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                  Online agora
                </span>
              </div>
            </div>
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-bold"
            style={{ background: "rgba(124,58,237,0.15)", color: "#7C3AED", fontFamily: "Inter, sans-serif" }}
          >
            Ensino Médio
          </div>
        </div>

        {/* Subject chips */}
        <div className="flex gap-2 px-5 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SUBJECT_CHIPS.map((chip) => {
            const Icon = chip.icon;
            const isActive = activeSubject === chip.label;
            return (
              <button
                key={chip.label}
                onClick={() => setActiveSubject(isActive ? null : chip.label)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 transition-all"
                style={{
                  fontFamily: "Inter, sans-serif",
                  background: isActive ? `${chip.color}20` : t.cardBg,
                  border: `1px solid ${isActive ? chip.color : t.cardBorder}`,
                  color: isActive ? chip.color : t.textSecondary,
                }}
              >
                <Icon size={11} />
                {chip.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "gap-2"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            {msg.role === "tutor" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
              >
                <Brain size={13} className="text-white" />
              </div>
            )}
            <div
              className="rounded-2xl px-4 py-3 max-w-[80%]"
              style={
                msg.role === "user"
                  ? { background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }
                  : {
                      background: t.isDark
                        ? "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(124,58,237,0.08) 100%)"
                        : "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.04) 100%)",
                      border: `1px solid ${t.isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.12)"}`,
                    }
              }
            >
              <p
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: msg.role === "user" ? "#FFFFFF" : t.textPrimary,
                }}
              >
                {msg.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)" }}
              >
                <Brain size={13} className="text-white" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-1"
                style={{
                  background: t.isDark ? "rgba(124,58,237,0.15)" : "rgba(124,58,237,0.08)",
                  border: `1px solid ${t.isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.12)"}`,
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested questions */}
        {messages.length === 1 && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs font-semibold mb-2 flex items-center gap-1" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              <Lightbulb size={11} />
              Perguntas sugeridas
            </p>
            <div className="flex flex-col gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between gap-2 transition-all hover:scale-[1.01]"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                    color: t.textSecondary,
                  }}
                >
                  <span>{q}</span>
                  <ChevronRight size={12} style={{ color: t.textMuted, flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 flex items-center gap-2 flex-shrink-0"
        style={{ borderTop: `1px solid ${t.divider}` }}
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder={activeSubject ? `Pergunte sobre ${activeSubject}...` : "Digite sua dúvida escolar..."}
            className="w-full rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7C3AED]/50"
            style={{
              fontFamily: "Inter, sans-serif",
              background: t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              color: t.inputText,
            }}
          />
        </div>
        <button
          onClick={() => sendMessage()}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: inputText.trim() ? "#7C3AED" : t.cardBg }}
        >
          <Send size={16} style={{ color: inputText.trim() ? "#fff" : t.textMuted }} />
        </button>
      </div>

      <BottomNavEM />
    </PhoneFrame>
  );
}
