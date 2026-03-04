/**
 * Splash — Tela inicial de boas-vindas
 * Design: Gradiente roxo-rosa-laranja com partículas, logo LabIA,
 * botões "Criar conta" e "Já tenho conta"
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Rocket } from "lucide-react";
import { IMAGES } from "@/data";

export default function Splash() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, #0f0f1a 60%)",
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
        {/* Overlay for readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-2xl labia-gradient flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30">
              <Rocket size={40} className="text-white" />
            </div>
            <h1
              className="text-5xl font-black text-white tracking-tight"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Lab<span className="labia-gradient-text">IA</span>
            </h1>
            <p
              className="text-white/90 text-lg font-semibold mt-2 tracking-wide"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              Aprenda. Crie. Inove.
            </p>
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
            onClick={() => setLocation("/home")}
            className="labia-btn-secondary text-lg py-4"
          >
            Já tenho conta
          </button>
          <p className="text-white/40 text-xs text-center mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
            Alfabetização em Inteligência Artificial
          </p>
        </motion.div>
      </div>
    </div>
  );
}
