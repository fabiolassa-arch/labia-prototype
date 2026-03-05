/**
 * TutorialOverlay — Sistema de tutorial interativo com dicas (tooltips)
 * Guia novos usuários pelas telas principais com overlay animado,
 * spotlight nos elementos-chave e progresso entre passos.
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { X, ChevronRight, ChevronLeft, Lightbulb, Sparkles, GraduationCap } from "lucide-react";

/* ─── Tipos ─── */
export interface TutorialStep {
  /** Posição do tooltip: top, bottom, center */
  position: "top" | "bottom" | "center";
  /** Posição vertical do spotlight (% do container) */
  spotlightY?: number;
  /** Título da dica */
  title: string;
  /** Descrição da dica */
  description: string;
  /** Ícone emoji ou string */
  emoji?: string;
  /** Cor de destaque */
  color?: string;
}

interface TutorialContextType {
  startTutorial: (screenId: string, steps: TutorialStep[]) => void;
  isTutorialActive: boolean;
  completedTutorials: Set<string>;
  resetTutorials: () => void;
}

/* ─── Context ─── */
const TutorialContext = createContext<TutorialContextType>({
  startTutorial: () => {},
  isTutorialActive: false,
  completedTutorials: new Set(),
  resetTutorials: () => {},
});

export function useTutorial() {
  return useContext(TutorialContext);
}

/* ─── Provider ─── */
export function TutorialProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("labia-tutorials-completed");
      return saved ? new Set<string>(JSON.parse(saved) as string[]) : new Set<string>();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem("labia-tutorials-completed", JSON.stringify(Array.from(completedTutorials)));
  }, [completedTutorials]);

  const startTutorial = (screenId: string, tutorialSteps: TutorialStep[]) => {
    if (completedTutorials.has(screenId)) return;
    setActiveScreen(screenId);
    setSteps(tutorialSteps);
    setCurrentStep(0);
  };

  const closeTutorial = () => {
    if (activeScreen) {
      setCompletedTutorials((prev) => {
      const next = new Set<string>(Array.from(prev));
      next.add(activeScreen);
      return next;
    });
    }
    setActiveScreen(null);
    setSteps([]);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      closeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const resetTutorials = () => {
    setCompletedTutorials(new Set<string>());
    localStorage.removeItem("labia-tutorials-completed");
  };

  return (
    <TutorialContext.Provider
      value={{
        startTutorial,
        isTutorialActive: !!activeScreen,
        completedTutorials,
        resetTutorials,
      }}
    >
      {children}

      <AnimatePresence>
        {activeScreen && steps.length > 0 && (
          <TutorialOverlayUI
            steps={steps}
            currentStep={currentStep}
            screenId={activeScreen}
            onNext={nextStep}
            onPrev={prevStep}
            onClose={closeTutorial}
          />
        )}
      </AnimatePresence>
    </TutorialContext.Provider>
  );
}

/* ─── Overlay UI ─── */
function TutorialOverlayUI({
  steps,
  currentStep,
  screenId,
  onNext,
  onPrev,
  onClose,
}: {
  steps: TutorialStep[];
  currentStep: number;
  screenId: string;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}) {
  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;
  const isFirst = currentStep === 0;
  const color = step.color || "#F97316";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Overlay escuro */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />

      {/* Spotlight animado */}
      {step.spotlightY !== undefined && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 320,
            height: 80,
            top: `${step.spotlightY}%`,
            background: `radial-gradient(ellipse, ${color}15 0%, transparent 70%)`,
            border: `1px solid ${color}20`,
            borderRadius: "1.5rem",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          key={currentStep}
        />
      )}

      {/* Tooltip card */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[340px] max-w-[90vw]"
        style={{
          top: step.position === "top" ? "12%" : step.position === "center" ? "50%" : undefined,
          bottom: step.position === "bottom" ? "12%" : undefined,
          transform: step.position === "center" ? "translate(-50%, -50%)" : "translateX(-50%)",
        }}
        initial={{ opacity: 0, y: step.position === "top" ? -20 : 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.4, type: "spring", damping: 20 }}
        key={currentStep}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1e1e35 0%, #161628 100%)",
            border: `1px solid ${color}30`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${color}15`,
          }}
        >
          {/* Header com progresso */}
          <div
            className="px-5 pt-4 pb-3 flex items-center justify-between"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${color}20` }}
              >
                {currentStep === 0 ? (
                  <Lightbulb size={16} style={{ color }} />
                ) : isLast ? (
                  <GraduationCap size={16} style={{ color }} />
                ) : (
                  <Sparkles size={16} style={{ color }} />
                )}
              </div>
              <div>
                <p
                  className="text-white/40 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Tutorial — {screenId}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === currentStep ? 16 : 6,
                        background: i <= currentStep ? color : "rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={12} className="text-white/40" />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="px-5 py-4">
            {step.emoji && (
              <motion.div
                className="text-3xl mb-3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, delay: 0.15 }}
              >
                {step.emoji}
              </motion.div>
            )}
            <motion.h3
              className="text-white font-bold text-lg leading-tight mb-2"
              style={{ fontFamily: "Nunito, sans-serif" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              {step.title}
            </motion.h3>
            <motion.p
              className="text-white/55 text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {step.description}
            </motion.p>
          </div>

          {/* Footer com botões */}
          <div
            className="px-5 pb-4 pt-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {!isFirst && (
                <button
                  onClick={onPrev}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/50 text-xs font-semibold"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <ChevronLeft size={12} />
                  Anterior
                </button>
              )}
              <button
                onClick={onClose}
                className="text-white/30 text-xs hover:text-white/50 transition-colors px-2 py-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Pular tutorial
              </button>
            </div>
            <motion.button
              onClick={onNext}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-bold"
              style={{
                fontFamily: "Nunito, sans-serif",
                background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                boxShadow: `0 4px 15px ${color}40`,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isLast ? (
                <>
                  Concluir
                  <GraduationCap size={14} />
                </>
              ) : (
                <>
                  Próximo
                  <ChevronRight size={14} />
                </>
              )}
            </motion.button>
          </div>

          {/* Indicador de passo */}
          <div
            className="px-5 pb-3 text-center"
          >
            <span
              className="text-white/20 text-[10px] font-medium"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Passo {currentStep + 1} de {steps.length}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Dados dos tutoriais por tela ─── */
export const TUTORIAL_STEPS: Record<string, TutorialStep[]> = {
  Home: [
    {
      position: "center",
      title: "Bem-vindo ao LabIA!",
      description: "Este é o seu painel principal. Aqui você acompanha todo o seu progresso, missões ativas e conquistas. Vamos fazer um tour rápido!",
      emoji: "🚀",
      color: "#7C3AED",
    },
    {
      position: "top",
      spotlightY: 8,
      title: "Seu perfil e notificações",
      description: "Toque no seu avatar para acessar o perfil completo. O sininho mostra suas notificações — fique de olho nas novas conquistas!",
      emoji: "👤",
      color: "#F97316",
    },
    {
      position: "top",
      spotlightY: 22,
      title: "Sua jornada de aprendizado",
      description: "Acompanhe seu progresso geral aqui. A barra mostra quantas missões você já completou e quanto falta para terminar todas as trilhas.",
      emoji: "📊",
      color: "#10B981",
    },
    {
      position: "center",
      spotlightY: 38,
      title: "Missão em andamento",
      description: "Sua missão ativa aparece aqui com destaque. Toque em 'Continuar missão' para retomar de onde parou com o Tutor IA.",
      emoji: "🎯",
      color: "#F97316",
    },
    {
      position: "center",
      spotlightY: 58,
      title: "Suas trilhas de aprendizado",
      description: "São 4 trilhas progressivas: Entendendo a IA, Criando Prompts, Criando Soluções e Meu Primeiro App. Complete uma para desbloquear a próxima!",
      emoji: "📚",
      color: "#7C3AED",
    },
    {
      position: "bottom",
      spotlightY: 80,
      title: "Insígnias e conquistas",
      description: "Cada trilha concluída rende uma insígnia especial. Toque em qualquer uma para ver detalhes e compartilhar suas conquistas!",
      emoji: "🏆",
      color: "#FFD700",
    },
    {
      position: "bottom",
      spotlightY: 92,
      title: "Navegação principal",
      description: "Use a barra inferior para navegar entre Home, Trilhas, Chat IA e Portfólio. Explore todas as seções do app!",
      emoji: "🧭",
      color: "#F97316",
    },
  ],
  Trilhas: [
    {
      position: "center",
      title: "Suas trilhas de aprendizado",
      description: "Aqui estão todas as 4 trilhas do LabIA organizadas em um grid. Cada trilha tem missões únicas que vão te ensinar sobre IA de forma prática.",
      emoji: "🗺️",
      color: "#7C3AED",
    },
    {
      position: "center",
      spotlightY: 30,
      title: "Progresso de cada trilha",
      description: "Veja o status de cada trilha: concluída (verde), em progresso (com barra), ou bloqueada (cadeado). Complete as trilhas em ordem para desbloquear as próximas!",
      emoji: "📈",
      color: "#10B981",
    },
    {
      position: "bottom",
      title: "Toque para explorar",
      description: "Clique em qualquer trilha para ver suas missões, o que vai aprender e as recompensas. Comece pela 'Entendendo a IA' se ainda não começou!",
      emoji: "👆",
      color: "#F97316",
    },
  ],
  "Chat IA": [
    {
      position: "center",
      title: "Conheça o Tutor IA",
      description: "Este é o seu assistente pessoal de aprendizado! Ele vai te guiar pelas missões, responder dúvidas e dar feedback sobre suas respostas.",
      emoji: "🤖",
      color: "#7C3AED",
    },
    {
      position: "center",
      spotlightY: 50,
      title: "Conversa interativa",
      description: "Converse naturalmente com o Tutor IA. Ele faz perguntas, dá dicas e avalia suas respostas em tempo real. Quanto mais você interage, mais aprende!",
      emoji: "💬",
      color: "#F97316",
    },
    {
      position: "bottom",
      spotlightY: 75,
      title: "Avalie e entregue",
      description: "Ao final de cada missão, avalie a ajuda do Tutor com estrelas e toque em 'Entregar missão' para registrar sua conquista e ganhar XP!",
      emoji: "⭐",
      color: "#FFD700",
    },
  ],
  Perfil: [
    {
      position: "center",
      title: "Seu perfil completo",
      description: "Aqui você vê todas as suas estatísticas: XP total, missões concluídas, insígnias conquistadas e sequência de dias ativos.",
      emoji: "📋",
      color: "#7C3AED",
    },
    {
      position: "center",
      spotlightY: 45,
      title: "Insígnias e conquistas",
      description: "Suas insígnias ficam em destaque. Toque em qualquer uma para ver detalhes, mensagem motivacional e compartilhar nas redes sociais!",
      emoji: "🎖️",
      color: "#FFD700",
    },
    {
      position: "bottom",
      title: "Configurações e dados",
      description: "Acesse 'Meus Dados' para editar informações pessoais e alterar senha. Use as configurações para personalizar notificações, aparência e privacidade.",
      emoji: "⚙️",
      color: "#F97316",
    },
  ],
};
