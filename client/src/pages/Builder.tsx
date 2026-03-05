/**
 * Builder — Tela "Meu Primeiro App" (Wizard de criação)
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Rocket, CheckCircle2 } from "lucide-react";
import { BUILDER_STEPS, IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

export default function Builder() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [text, setText] = useState("Ajudar crianças a aprender tabuada de forma divertida");
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div className="px-5 pt-5 pb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 flex items-center justify-center">
              <Rocket size={16} className="text-[#7C3AED]" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                Meu Primeiro App
              </h1>
              <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                Etapa {currentStep + 1} de {BUILDER_STEPS.length} — {BUILDER_STEPS[currentStep]}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stepper */}
        <motion.div className="px-5 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between">
            {BUILDER_STEPS.map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    background: i < currentStep ? "#10B981" : i === currentStep ? "#F97316" : t.toggleOff,
                    color: i <= currentStep ? "white" : t.textMuted,
                    boxShadow: i === currentStep ? "0 0 12px rgba(249,115,22,0.4)" : "none",
                  }}
                >
                  {i < currentStep ? <CheckCircle2 size={16} /> : i + 1}
                </div>
                {i < BUILDER_STEPS.length - 1 && (
                  <div className="w-6 h-0.5 mx-0.5" style={{ background: i < currentStep ? "#10B981" : t.toggleOff }} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Question */}
        <motion.div className="px-5 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
            Qual é o objetivo do seu app?
          </h2>

          {/* Tip bubble */}
          <div className="rounded-xl p-3 mb-4"
            style={{
              background: t.isDark
                ? "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(124,58,237,0.1) 100%)"
                : "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.05) 100%)",
              border: `1px solid ${t.isDark ? "rgba(124,58,237,0.25)" : "rgba(124,58,237,0.15)"}`,
            }}>
            <p className="text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
              Pense: que problema seu app vai resolver? Seja específico!
            </p>
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div className="px-5 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 200))}
              placeholder="Ex: Ajudar crianças a aprender tabuada de forma divertida..."
              className="w-full h-32 bg-transparent rounded-2xl p-4 text-sm resize-none focus:outline-none focus:border-[#F97316]/50"
              style={{ fontFamily: "Inter, sans-serif", border: `1px solid ${t.inputBorder}`, color: t.inputText }}
            />
            <span className="absolute bottom-3 right-4 text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
              {text.length}/200
            </span>
          </div>
        </motion.div>

        {/* App Preview Card */}
        <motion.div className="px-5 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="labia-card p-4">
            <div className="flex items-start gap-3">
              <img src={IMAGES.mathkidsIcon} alt="MathKids" className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>MathKids</p>
                <div className="mt-2 space-y-1.5">
                  {["Nome do App", "Nome do Aluno", "Público-alvo", "Objetivo"].map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: i === 3 ? "#F97316" : t.textMuted }} />
                      <span className="text-xs" style={{
                        fontFamily: "Inter, sans-serif",
                        color: i === 3 ? "#F97316" : t.textMuted,
                        fontWeight: i === 3 ? 600 : 400,
                      }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom buttons */}
      <div className="px-5 py-4 flex gap-3 flex-shrink-0" style={{ borderTop: `1px solid ${t.divider}` }}>
        <button
          onClick={() => { if (currentStep > 0) { setCurrentStep(currentStep - 1); } else { setLocation("/home"); } }}
          className="flex-1 py-3 rounded-full font-bold text-sm transition-colors"
          style={{ fontFamily: "Nunito, sans-serif", border: `1px solid ${t.isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)"}`, color: t.textPrimary }}>
          Voltar
        </button>
        <button
          onClick={() => {
            if (currentStep < BUILDER_STEPS.length - 1) {
              setCurrentStep(currentStep + 1);
              toast(`Etapa ${currentStep + 2}: ${BUILDER_STEPS[currentStep + 1]}`);
            } else {
              toast.success("App estruturado com sucesso!");
              setTimeout(() => setLocation("/portfolio"), 1500);
            }
          }}
          className="flex-1 py-3 rounded-full bg-[#F97316] text-white font-bold text-sm hover:bg-[#ea6c0a] transition-colors"
          style={{ fontFamily: "Nunito, sans-serif" }}>
          Próxima etapa
        </button>
      </div>
    </PhoneFrame>
  );
}
