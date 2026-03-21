/**
 * ChatIA — Tela de conversa com o Tutor IA durante uma missão
 * Versão aprimorada com animações para engajamento infantil:
 * - Typing indicator animado antes de cada mensagem do tutor
 * - Efeito typewriter nas mensagens do tutor
 * - Avatar do tutor com pulso e reações
 * - Confete e estrelas ao entregar missão
 * - Feedback visual animado com estrelas
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Settings, Send, CheckCircle2, Star, Sparkles } from "lucide-react";
import { IMAGES } from "@/data";
import { useTutorial, TUTORIAL_STEPS } from "@/components/TutorialOverlay";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";
import { TypingIndicator } from "@/components/TypingIndicator";
import { TypewriterText } from "@/components/TypewriterText";
import { ConfettiEffect } from "@/components/ConfettiEffect";

/* ─── Tipos de mensagem ─── */
interface Message {
  id: number;
  type: "tutor" | "student";
  text: string;
  showRating?: boolean;
  rating?: number;
}

/* ─── Sequência de conversa do protótipo ─── */
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    type: "tutor",
    text: "Ótimo! Agora tente criar um prompt para pedir à IA que explique fotossíntese para uma criança de 8 anos. Lembre-se: contexto + objetivo + formato!",
  },
  {
    id: 2,
    type: "student",
    text: "Explique fotossíntese de forma simples para uma criança de 8 anos, usando uma analogia com algo do cotidiano.",
  },
  {
    id: 3,
    type: "tutor",
    text: "Excelente prompt! Você usou contexto, público-alvo e pediu um formato específico.",
    showRating: true,
    rating: 9,
  },
];

/* ─── Hook de animação de entrada via CSS ─── */
function useEntryAnimation(isNew?: boolean) {
  const [visible, setVisible] = useState(!isNew);
  useEffect(() => {
    if (isNew) {
      // Pequeno delay para garantir que o DOM foi montado
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(t);
    }
  }, [isNew]);
  return visible;
}

/* ─── Componente de mensagem do tutor ─── */
function TutorMessage({
  message,
  isNew,
}: {
  message: Message;
  isNew?: boolean;
}) {
  const t = useLabiaTheme();
  const visible = useEntryAnimation(isNew);

  return (
    <div
      className="flex gap-2 max-w-[88%]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Avatar com pulso */}
      <motion.div
        className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end"
        animate={isNew && visible ? { scale: [0.85, 1.1, 1] } : {}}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <img src={IMAGES.tutorRobot} alt="Tutor IA" className="w-full h-full object-cover" />
      </motion.div>

      <div
        className="rounded-2xl rounded-tl-md p-4 flex-1"
        style={{
          background: t.isDark
            ? "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.1) 100%)"
            : "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.05) 100%)",
          border: `1px solid ${t.isDark ? "rgba(124,58,237,0.2)" : "rgba(124,58,237,0.15)"}`,
        }}
      >
        {isNew ? (
          <TypewriterText
            text={message.text}
            speed={20}
            className="text-sm leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}
          />
        ) : (
          <p className="text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textPrimary }}>
            {message.text}
          </p>
        )}

        {/* Rating animado */}
        {message.showRating && message.rating !== undefined && (
          <div
            className="mt-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ease ${message.text.length * 0.02 + 0.3}s, transform 0.4s ease ${message.text.length * 0.02 + 0.3}s`,
            }}
          >
            <motion.p
              className="font-bold text-base mb-2"
              style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
              animate={isNew && visible ? { scale: [1, 1.15, 1] } : {}}
              transition={{ delay: message.text.length * 0.02 + 0.5, duration: 0.4 }}
            >
              Nota: {message.rating}/10! 🎉
            </motion.p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scale(1)" : "scale(0.5)",
                    transition: `opacity 0.3s ease ${message.text.length * 0.02 + 0.5 + s * 0.1}s, transform 0.3s ease ${message.text.length * 0.02 + 0.5 + s * 0.1}s`,
                  }}
                >
                  <Star
                    size={22}
                    fill={s <= Math.round((message.rating ?? 0) / 2) ? "#F97316" : "transparent"}
                    className="text-[#F97316]"
                  />
                </div>
              ))}
              <span
                className="text-[#F97316] text-sm font-bold ml-1"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-5px)",
                  transition: `opacity 0.3s ease ${message.text.length * 0.02 + 1.1}s, transform 0.3s ease ${message.text.length * 0.02 + 1.1}s`,
                }}
              >
                {message.rating}.0
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Componente de mensagem do aluno ─── */
function StudentMessage({ message, isNew }: { message: Message; isNew?: boolean }) {
  const visible = useEntryAnimation(isNew);
  return (
    <div
      className="flex justify-end"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) translateX(0)" : "translateY(12px) translateX(12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
    >
      <div
        className="rounded-2xl rounded-tr-md p-4 max-w-[85%]"
        style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}
      >
        <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          {message.text}
        </p>
      </div>
    </div>
  );
}

/* ─── Componente principal ─── */
export default function ChatIA() {
  const [, setLocation] = useLocation();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessageId, setNewMessageId] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [missionDelivered, setMissionDelivered] = useState(false);
  const [tutorPulse, setTutorPulse] = useState(false);
  const { startTutorial } = useTutorial();
  const t = useLabiaTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const messageQueue = useRef<Message[]>([...INITIAL_MESSAGES]);
  const isProcessing = useRef(false);

  /* Inicia tutorial após montagem */
  useEffect(() => {
    const timer = setTimeout(() => {
      startTutorial("Chat IA", TUTORIAL_STEPS["Chat IA"]);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  /* Exibe mensagens iniciais com atraso e typing indicator */
  useEffect(() => {
    const processNextMessage = () => {
      if (isProcessing.current || messageQueue.current.length === 0) return;
      isProcessing.current = true;

      const next = messageQueue.current.shift()!;

      if (next.type === "tutor") {
        setIsTyping(true);
        const typingDelay = 900 + next.text.length * 8;
        setTimeout(() => {
          setIsTyping(false);
          setTutorPulse(true);
          setNewMessageId(next.id);
          setMessages((prev) => [...prev, next]);
          setTimeout(() => setTutorPulse(false), 600);
          setTimeout(() => {
            isProcessing.current = false;
            processNextMessage();
          }, 600);
        }, typingDelay);
      } else {
        // Mensagem do aluno aparece com pequeno atraso
        setTimeout(() => {
          setNewMessageId(next.id);
          setMessages((prev) => [...prev, next]);
          setTimeout(() => {
            isProcessing.current = false;
            processNextMessage();
          }, 400);
        }, 500);
      }
    };

    processNextMessage();
  }, []);

  /* Scroll automático para o fim */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  /* Envio de mensagem do aluno no protótipo */
  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      type: "student",
      text: inputText.trim(),
    };
    setNewMessageId(newMsg.id);
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Simula resposta do tutor
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const reply: Message = {
          id: Date.now() + 1,
          type: "tutor",
          text: "Muito bom! Continue praticando assim. Cada prompt que você cria fica melhor que o anterior! 🚀",
        };
        setNewMessageId(reply.id);
        setMessages((prev) => [...prev, reply]);
      }, 1800);
    }, 600);
  };

  /* Entrega de missão com celebração */
  const handleDeliverMission = () => {
    setShowConfetti(true);
    setMissionDelivered(true);
    toast.success("🎉 Missão entregue com sucesso! +50 XP conquistados!", {
      duration: 3000,
    });
    setTimeout(() => setShowConfetti(false), 2000);
    setTimeout(() => setLocation("/home"), 2500);
  };

  const allMessagesShown = messages.length >= INITIAL_MESSAGES.length;

  return (
    <PhoneFrame>
      {/* Chat Header */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${t.divider}` }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.img
              src={IMAGES.tutorRobot}
              alt="Tutor IA"
              className="w-10 h-10 rounded-full object-cover"
              animate={tutorPulse ? { scale: [1, 1.2, 1], rotate: [0, -8, 8, 0] } : {}}
              transition={{ duration: 0.5, type: "spring" }}
            />
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full"
              style={{ border: `2px solid ${t.bg}` }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
              Tutor IA
            </p>
            <div className="flex items-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
              <span className="text-[#10B981] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                {isTyping ? "digitando..." : "online"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="px-3 py-1.5 rounded-full bg-[#F97316]/15 border border-[#F97316]/30"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-[#F97316] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Missão 2 — Prompt eficiente
            </span>
          </motion.div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: t.cardBg }}>
            <Settings size={14} style={{ color: t.textMuted }} />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((msg) =>
          msg.type === "tutor" ? (
            <TutorMessage key={msg.id} message={msg} isNew={msg.id === newMessageId} />
          ) : (
            <StudentMessage key={msg.id} message={msg} isNew={msg.id === newMessageId} />
          )
        )}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator visible={isTyping} />}
        </AnimatePresence>

        {/* Botão de entregar missão */}
        <AnimatePresence>
          {allMessagesShown && !isTyping && !missionDelivered && (
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", damping: 18, stiffness: 250, delay: 0.3 }}
            >
              <ConfettiEffect active={showConfetti} />
              <motion.button
                onClick={handleDeliverMission}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white font-bold text-base"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 6px 24px rgba(16,185,129,0.35)",
                }}
                animate={{
                  boxShadow: [
                    "0 6px 24px rgba(16,185,129,0.35)",
                    "0 8px 32px rgba(16,185,129,0.55)",
                    "0 6px 24px rgba(16,185,129,0.35)",
                  ],
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <CheckCircle2 size={20} />
                </motion.div>
                Entregar missão
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  <Sparkles size={16} />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback de missão entregue */}
        <AnimatePresence>
          {missionDelivered && (
            <motion.div
              className="flex flex-col items-center gap-2 py-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 12 }}
            >
              <motion.div
                className="text-5xl"
                animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.3, 1] }}
                transition={{ duration: 0.8 }}
              >
                🎉
              </motion.div>
              <p className="font-bold text-lg text-center" style={{ fontFamily: "Nunito, sans-serif", color: "#10B981" }}>
                Missão concluída!
              </p>
              <p className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                Redirecionando para o início...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <motion.div
        className="flex-shrink-0 px-4 py-3 flex items-center gap-2"
        style={{ borderTop: `1px solid ${t.divider}` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Digite sua resposta..."
          className="flex-1 rounded-2xl px-4 py-2.5 text-sm outline-none"
          style={{
            fontFamily: "Inter, sans-serif",
            background: t.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${t.divider}`,
            color: t.textPrimary,
          }}
        />
        <motion.button
          onClick={handleSend}
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Send size={16} className="text-white" style={{ marginLeft: 1 }} />
        </motion.button>
      </motion.div>
    </PhoneFrame>
  );
}
