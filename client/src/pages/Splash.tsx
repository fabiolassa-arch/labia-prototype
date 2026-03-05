/**
 * Splash — Tela inicial de boas-vindas
 * Suporta tema claro e escuro via useLabiaTheme.
 * No modo escuro: overlay escuro sobre a imagem, logo branca, texto claro.
 * No modo claro: overlay claro/translúcido, logo colorida, texto escuro.
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

export default function Splash() {
  const [, setLocation] = useLocation();
  const t = useLabiaTheme();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: t.isDark
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, #0f0f1a 60%)"
          : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.08) 0%, #EEEDF5 60%)",
        minHeight: "100dvh",
      }}
    >
      <div className="phone-frame">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${IMAGES.splashBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Overlay adaptável ao tema */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: t.isDark
              ? "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.45) 100%)"
              : "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.55) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
          {/* Logo — usa versão branca no escuro, colorida no claro */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={t.isDark ? IMAGES.logoWhite : IMAGES.logo}
              alt="LabIA - Aprenda. Crie. Inove."
              className="w-80 h-auto"
              style={{
                filter: t.isDark
                  ? "drop-shadow(0 4px 20px rgba(0,0,0,0.4))"
                  : "drop-shadow(0 4px 20px rgba(124,58,237,0.25))",
              }}
            />
          </motion.div>
        </div>

        {/* Bottom buttons */}
        <motion.div
          className="relative z-10 px-8 pb-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => setLocation("/cadastro")}
            className="labia-btn-primary text-lg py-4"
          >
            Criar conta
          </button>
          <button
            onClick={() => setLocation("/login")}
            className="text-lg py-4 rounded-2xl font-bold transition-all active:scale-95"
            style={{
              fontFamily: "Nunito, sans-serif",
              background: t.isDark
                ? "rgba(255,255,255,0.12)"
                : "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: t.isDark
                ? "1.5px solid rgba(255,255,255,0.2)"
                : "1.5px solid rgba(124,58,237,0.25)",
              color: t.isDark ? "#FFFFFF" : "#1C1C2E",
              boxShadow: t.isDark
                ? "none"
                : "0 4px 16px rgba(124,58,237,0.1)",
            }}
          >
            Já tenho conta
          </button>
          <p
            className="text-xs text-center mt-2"
            style={{
              fontFamily: "Inter, sans-serif",
              color: t.isDark ? "rgba(255,255,255,0.4)" : "rgba(28,28,46,0.5)",
            }}
          >
            Alfabetização em Inteligência Artificial
          </p>
        </motion.div>
      </div>
    </div>
  );
}
