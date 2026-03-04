/**
 * Cadastro — Tela de criação de conta
 * Design: Fundo escuro com partículas, login social, formulário com campos,
 * seleção de faixa etária, botão cadastrar
 */
import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { IMAGES } from "@/data";
import { toast } from "sonner";
import PhoneFrame from "@/components/PhoneFrame";

export default function Cadastro() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [faixaEtaria, setFaixaEtaria] = useState<"6-10" | "11-14">("11-14");

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto px-6 pb-6" style={{ scrollbarWidth: "none" }}>
        {/* Logo */}
        <motion.div
          className="flex items-center justify-center gap-2 pt-4 pb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={IMAGES.logoWhite}
            alt="LabIA"
            className="h-10 w-auto"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-white text-2xl font-bold text-center mb-5"
          style={{ fontFamily: "Nunito, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Criar conta
        </motion.h1>

        {/* Social buttons */}
        <motion.div
          className="flex flex-col gap-2.5 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            onClick={() => toast("Login com Google (protótipo)")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white text-gray-800 font-semibold text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar com Google
          </button>
          <button
            onClick={() => toast("Login com Apple (protótipo)")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-black text-white font-semibold text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg width="16" height="18" viewBox="0 0 16 20" fill="white">
              <path d="M13.5 10.2c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8C3.8 5 2.1 6 1.2 7.6c-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.5-.9 1.7 0 2.1.9 3.5.8 1.5 0 2.3-1.3 3.2-2.7 1-1.5 1.4-3 1.4-3.1-.1 0-2.7-1-2.7-4.1zM11 3.7c.7-.9 1.2-2.2 1.1-3.4-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.2 1.2.1 2.3-.6 3-1.4z"/>
            </svg>
            Continuar com Apple
          </button>
          <button
            onClick={() => toast("Login com Facebook (protótipo)")}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-[#1877F2] text-white font-semibold text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuar com Facebook
          </button>
        </motion.div>

        {/* Separator */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            ou cadastre-se com e-mail
          </span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* Form fields */}
        <motion.div
          className="flex flex-col gap-3 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <input type="text" placeholder="Nome completo" className="labia-input" />
          <input type="email" placeholder="E-mail" className="labia-input" />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className="labia-input pr-12"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          <input type="password" placeholder="Confirmar senha" className="labia-input" />
        </motion.div>

        {/* Faixa etária */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/70 text-sm font-medium mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
            Faixa etária
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setFaixaEtaria("6-10")}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                faixaEtaria === "6-10"
                  ? "bg-[#F97316] text-white"
                  : "border border-white/20 text-white/60"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              6 a 10 anos
            </button>
            <button
              onClick={() => setFaixaEtaria("11-14")}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                faixaEtaria === "11-14"
                  ? "bg-[#F97316] text-white"
                  : "border border-white/20 text-white/60"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              11 a 14 anos
            </button>
          </div>
        </motion.div>

        {/* Cadastrar button */}
        <motion.button
          onClick={() => setLocation("/onboarding")}
          className="labia-btn-primary w-full text-base py-4 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Cadastrar
        </motion.button>

        {/* Login link */}
        <p className="text-center text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
          Já tenho conta?{" "}
          <button onClick={() => setLocation("/home")} className="text-[#F97316] font-semibold underline">
            Entrar
          </button>
        </p>
      </div>
    </PhoneFrame>
  );
}
