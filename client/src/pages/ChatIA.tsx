/**
 * ChatIA — Tela de conversa com o Tutor IA durante uma missão
 * Design: Header com avatar do tutor, badge da missão, mensagens estilizadas,
 * rating com estrelas, botão "Entregar missão", input de texto
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Settings, Send, CheckCircle2, Star } from "lucide-react";
import { IMAGES } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

export default function ChatIA() {
  const [, setLocation] = useLocation();
  const [inputText, setInputText] = useState("");

  return (
    <PhoneFrame>
      {/* Chat Header */}
      <motion.div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={IMAGES.tutorRobot} alt="Tutor IA" className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#1C1C2E]" />
          </div>
          <div>
            <p className="text-white font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif" }}>Tutor IA</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="text-[#10B981] text-xs" style={{ fontFamily: "Inter, sans-serif" }}>online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-[#F97316]/15 border border-[#F97316]/30">
            <span className="text-[#F97316] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              Missão 2 — Prompt eficiente
            </span>
          </div>
          <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <Settings size={14} className="text-white/40" />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: "none" }}>
        {/* Tutor message 1 */}
        <motion.div
          className="flex gap-2 max-w-[85%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="rounded-2xl rounded-tl-md p-4"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Ótimo! Agora tente criar um prompt para pedir à IA que explique <strong>fotossíntese</strong> para uma criança de 8 anos. Lembre-se: contexto + objetivo + formato!
            </p>
          </div>
        </motion.div>

        {/* Student message */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="rounded-2xl rounded-tr-md p-4 max-w-[85%]"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)",
            }}
          >
            <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              Explique <strong>fotossíntese</strong> de forma simples para uma criança de 8 anos, usando uma analogia com algo do cotidiano.
            </p>
          </div>
        </motion.div>

        {/* Tutor message 2 - with rating */}
        <motion.div
          className="flex gap-2 max-w-[85%]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div
            className="rounded-2xl rounded-tl-md p-4"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <p className="text-white text-sm leading-relaxed mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
              Excelente prompt! Você usou contexto, público-alvo e pediu um formato específico.
            </p>
            <p className="text-white font-bold text-base mb-2" style={{ fontFamily: "Nunito, sans-serif" }}>
              Nota: 9/10!
            </p>
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((s) => (
                <Star key={s} size={20} fill="#F97316" className="text-[#F97316]" />
              ))}
              <Star size={20} fill="#F97316" className="text-[#F97316]" style={{ clipPath: "inset(0 50% 0 0)" }} />
              <span className="text-[#F97316] text-sm font-bold ml-1" style={{ fontFamily: "Nunito, sans-serif" }}>9.0</span>
            </div>
          </div>
        </motion.div>

        {/* Deliver mission button */}
        <motion.button
          onClick={() => {
            toast.success("Missão entregue com sucesso!");
            setTimeout(() => setLocation("/home"), 1500);
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#10B981] hover:bg-[#0d9668] transition-colors text-white font-bold text-base"
          style={{ fontFamily: "Nunito, sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <CheckCircle2 size={18} />
          Entregar missão
        </motion.button>
      </div>

      {/* Input area */}
      <div
        className="px-4 py-3 flex items-center gap-2 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full bg-white/8 rounded-full px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#F97316]/50"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
        <button
          onClick={() => {
            if (inputText.trim()) {
              toast("Mensagem enviada (protótipo)");
              setInputText("");
            }
          }}
          className="w-10 h-10 rounded-full bg-[#F97316] flex items-center justify-center flex-shrink-0 hover:bg-[#ea6c0a] transition-colors"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </PhoneFrame>
  );
}
