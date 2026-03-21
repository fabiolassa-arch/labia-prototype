/**
 * TutorialOverlay — Sistema de tutorial interativo com dicas (tooltips)
 * Versão aprimorada com animações para engajamento infantil:
 * - Mascote animado em cada passo
 * - Transições com bounce entre passos
 * - Partículas ao avançar
 * - Botão "Próximo" com pulso para chamar atenção
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { X, ChevronRight, ChevronLeft, GraduationCap, Sparkles } from "lucide-react";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

/* ─── Tipos ─── */
export interface TutorialStep {
  position: "top" | "bottom" | "center";
  spotlightY?: number;
  title: string;
  description: string;
  emoji?: string;
  color?: string;
}

interface TutorialContextType {
  startTutorial: (screenId: string, steps: TutorialStep[]) => void;
  isTutorialActive: boolean;
  completedTutorials: Set<string>;
  resetTutorials: () => void;
}

const TutorialContext = createContext<TutorialContextType>({
  startTutorial: () => {},
  isTutorialActive: false,
  completedTutorials: new Set(),
  resetTutorials: () => {},
});

export function useTutorial() {
  return useContext(TutorialContext);
}

export function TutorialProvider({ children }: { children: ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<string | null>(null);
  const [steps, setSteps] = useState<TutorialStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedTutorials, setCompletedTutorials] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("labia-tutorials-completed");
      return saved ? new Set<string>(JSON.parse(saved) as string[]) : new Set<string>();
    } catch { return new Set(); }
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
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
    else closeTutorial();
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const resetTutorials = () => {
    setCompletedTutorials(new Set<string>());
    localStorage.removeItem("labia-tutorials-completed");
  };

  return (
    <TutorialContext.Provider value={{ startTutorial, isTutorialActive: !!activeScreen, completedTutorials, resetTutorials }}>
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

/* ─── Partículas de avanço de passo ─── */
function StepParticles({ color, active }: { color: string; active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 6 + Math.random() * 6,
            height: 6 + Math.random() * 6,
            background: color,
            left: `${20 + Math.random() * 60}%`,
            top: "50%",
          }}
          initial={{ y: 0, opacity: 1, scale: 0 }}
          animate={{
            y: [0, -(40 + Math.random() * 60)],
            x: [(Math.random() - 0.5) * 80],
            opacity: [1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{ duration: 0.7 + Math.random() * 0.4, delay: i * 0.04 }}
        />
      ))}
    </div>
  );
}

/* ─── UI do overlay ─── */
function TutorialOverlayUI({
  steps, currentStep, screenId, onNext, onPrev, onClose,
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
  const t = useLabiaTheme();
  const [showParticles, setShowParticles] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const tooltipBg = t.isDark
    ? "linear-gradient(145deg, #1e1e35 0%, #161628 100%)"
    : "linear-gradient(145deg, #FFFFFF 0%, #F3F2FA 100%)";

  const handleNext = () => {
    setDirection(1);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 700);
    onNext();
  };

  const handlePrev = () => {
    setDirection(-1);
    onPrev();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Overlay escuro */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(3px)" }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Spotlight */}
      {step.spotlightY !== undefined && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 320,
            height: 80,
            top: `${step.spotlightY}%`,
            background: `radial-gradient(ellipse, ${color}18 0%, transparent 70%)`,
            border: `1px solid ${color}25`,
            borderRadius: "1.5rem",
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.4 }}
          key={`spotlight-${currentStep}`}
        />
      )}

      {/* Card do tutorial */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute left-1/2 -translate-x-1/2 w-[340px] max-w-[90vw]"
          style={{
            top: step.position === "top" ? "10%" : step.position === "center" ? "50%" : undefined,
            bottom: step.position === "bottom" ? "10%" : undefined,
            transform: step.position === "center" ? "translate(-50%, -50%)" : "translateX(-50%)",
          }}
          initial={{
            opacity: 0,
            y: direction > 0 ? 30 : -30,
            scale: 0.88,
            rotate: direction > 0 ? 2 : -2,
          }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{
            opacity: 0,
            y: direction > 0 ? -20 : 20,
            scale: 0.92,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
        >
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              background: tooltipBg,
              border: `1.5px solid ${color}35`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.55), 0 0 48px ${color}18`,
            }}
          >
            <StepParticles color={color} active={showParticles} />

            {/* Header */}
            <div
              className="px-5 pt-4 pb-3 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${t.divider}` }}
            >
              <div className="flex items-center gap-2">
                {/* Ícone do passo com animação */}
                <motion.div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}22` }}
                  animate={{ scale: [1, 1.12, 1], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                  key={currentStep}
                >
                  {isLast ? (
                    <GraduationCap size={18} style={{ color }} />
                  ) : (
                    <Sparkles size={18} style={{ color }} />
                  )}
                </motion.div>
                <div>
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}
                  >
                    Tutorial — {screenId}
                  </p>
                  {/* Indicadores de progresso */}
                  <div className="flex items-center gap-1 mt-0.5">
                    {steps.map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-1.5 rounded-full"
                        style={{ background: i <= currentStep ? color : t.divider }}
                        animate={{ width: i === currentStep ? 18 : 7 }}
                        transition={{ type: "spring", damping: 20 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <motion.button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: t.cardBg }}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", damping: 15 }}
              >
                <X size={12} style={{ color: t.textMuted }} />
              </motion.button>
            </div>

            {/* Conteúdo */}
            <div className="px-5 py-4">
              {step.emoji && (
                <motion.div
                  className="text-4xl mb-3"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.1 }}
                  key={`emoji-${currentStep}`}
                >
                  <motion.span
                    animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
                    transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    style={{ display: "inline-block" }}
                  >
                    {step.emoji}
                  </motion.span>
                </motion.div>
              )}

              <motion.h3
                className="font-black text-lg leading-tight mb-2"
                style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 }}
                key={`title-${currentStep}`}
              >
                {step.title}
              </motion.h3>

              <motion.p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                key={`desc-${currentStep}`}
              >
                {step.description}
              </motion.p>
            </div>

            {/* Rodapé com botões */}
            <div className="px-5 pb-4 pt-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {!isFirst && (
                  <motion.button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ fontFamily: "Inter, sans-serif", background: t.cardBg, color: t.textSecondary }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={12} />Anterior
                  </motion.button>
                )}
                <motion.button
                  onClick={onClose}
                  className="text-xs px-2 py-2"
                  style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}
                  whileHover={{ opacity: 0.7 }}
                >
                  Pular tutorial
                </motion.button>
              </div>

              {/* Botão Próximo com pulso */}
              <motion.button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-black"
                style={{
                  fontFamily: "Nunito, sans-serif",
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  boxShadow: `0 4px 18px ${color}45`,
                }}
                animate={{
                  boxShadow: [
                    `0 4px 18px ${color}45`,
                    `0 6px 28px ${color}70`,
                    `0 4px 18px ${color}45`,
                  ],
                  scale: [1, 1.03, 1],
                }}
                transition={{ duration: 1.8, repeat: Infinity }}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.94 }}
              >
                {isLast ? (
                  <>
                    Concluir
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <GraduationCap size={14} />
                    </motion.div>
                  </>
                ) : (
                  <>
                    Próximo
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <ChevronRight size={14} />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </div>

            {/* Contador de passos */}
            <div className="px-5 pb-4 text-center">
              <motion.span
                className="text-[10px] font-semibold px-3 py-1 rounded-full"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color,
                  background: `${color}15`,
                }}
                key={`counter-${currentStep}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Passo {currentStep + 1} de {steps.length}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Dados dos tutoriais ─── */
export const TUTORIAL_STEPS: Record<string, TutorialStep[]> = {
  Home: [
    { position: "center", title: "Bem-vindo ao LabIA!", description: "Este é o seu painel principal. Aqui você acompanha todo o seu progresso, missões ativas e conquistas. Vamos fazer um tour rápido!", emoji: "🚀", color: "#7C3AED" },
    { position: "top", spotlightY: 8, title: "Seu perfil e notificações", description: "Toque no seu avatar para acessar o perfil completo. O sininho mostra suas notificações — fique de olho nas novas conquistas!", emoji: "👤", color: "#F97316" },
    { position: "top", spotlightY: 22, title: "Sua jornada de aprendizado", description: "Acompanhe seu progresso geral aqui. A barra mostra quantas missões você já completou e quanto falta para terminar todas as trilhas.", emoji: "📊", color: "#10B981" },
    { position: "center", spotlightY: 38, title: "Missão em andamento", description: "Sua missão ativa aparece aqui com destaque. Toque em 'Continuar missão' para retomar de onde parou com o Tutor IA.", emoji: "🎯", color: "#F97316" },
    { position: "center", spotlightY: 58, title: "Suas trilhas de aprendizado", description: "São 4 trilhas progressivas: Entendendo a IA, Criando Prompts, Criando Soluções e Meu Primeiro App. Complete uma para desbloquear a próxima!", emoji: "📚", color: "#7C3AED" },
    { position: "bottom", spotlightY: 80, title: "Insígnias e conquistas", description: "Cada trilha concluída rende uma insígnia especial. Toque em qualquer uma para ver detalhes e compartilhar suas conquistas!", emoji: "🏆", color: "#FFD700" },
    { position: "bottom", spotlightY: 92, title: "Navegação principal", description: "Use a barra inferior para navegar entre Home, Trilhas, Chat IA e Portfólio. Explore todas as seções do app!", emoji: "🧭", color: "#F97316" },
  ],
  Trilhas: [
    { position: "center", title: "Suas trilhas de aprendizado", description: "Aqui estão todas as 4 trilhas do LabIA organizadas em um grid. Cada trilha tem missões únicas que vão te ensinar sobre IA de forma prática.", emoji: "🗺️", color: "#7C3AED" },
    { position: "center", spotlightY: 30, title: "Progresso de cada trilha", description: "Veja o status de cada trilha: concluída (verde), em progresso (com barra), ou bloqueada (cadeado). Complete as trilhas em ordem para desbloquear as próximas!", emoji: "📈", color: "#10B981" },
    { position: "bottom", title: "Toque para explorar", description: "Clique em qualquer trilha para ver suas missões, o que vai aprender e as recompensas. Comece pela 'Entendendo a IA' se ainda não começou!", emoji: "👆", color: "#F97316" },
  ],
  "Chat IA": [
    { position: "center", title: "Conheça o Tutor IA", description: "Este é o seu assistente pessoal de aprendizado! Ele vai te guiar pelas missões, responder dúvidas e dar feedback sobre suas respostas.", emoji: "🤖", color: "#7C3AED" },
    { position: "center", spotlightY: 50, title: "Conversa interativa", description: "Converse naturalmente com o Tutor IA. Ele faz perguntas, dá dicas e avalia suas respostas em tempo real. Quanto mais você interage, mais aprende!", emoji: "💬", color: "#F97316" },
    { position: "bottom", spotlightY: 75, title: "Avalie e entregue", description: "Ao final de cada missão, avalie a ajuda do Tutor com estrelas e toque em 'Entregar missão' para registrar sua conquista e ganhar XP!", emoji: "⭐", color: "#FFD700" },
  ],
  Perfil: [
    { position: "center", title: "Seu perfil completo", description: "Aqui você vê todas as suas estatísticas: XP total, missões concluídas, insígnias conquistadas e sequência de dias ativos.", emoji: "📋", color: "#7C3AED" },
    { position: "center", spotlightY: 45, title: "Insígnias e conquistas", description: "Suas insígnias ficam em destaque. Toque em qualquer uma para ver detalhes, mensagem motivacional e compartilhar nas redes sociais!", emoji: "🎖️", color: "#FFD700" },
    { position: "bottom", title: "Configurações e dados", description: "Acesse 'Meus Dados' para editar informações pessoais e alterar senha. Use as configurações para personalizar notificações, aparência e privacidade.", emoji: "⚙️", color: "#F97316" },
  ],
};
