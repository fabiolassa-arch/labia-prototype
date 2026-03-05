/**
 * EsqueciSenha — Fluxo completo de recuperação de senha
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Mail, KeyRound, Lock, CheckCircle2,
  Eye, EyeOff, ShieldCheck, Sparkles, ArrowRight,
  RefreshCw, Timer,
} from "lucide-react";
import PhoneFrame from "@/components/PhoneFrame";
import { IMAGES } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";

/* ─── Step Indicator ─── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  const t = useLabiaTheme();
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: i + 1 === current ? 28 : 22,
              height: i + 1 === current ? 28 : 22,
              fontFamily: "Inter, sans-serif",
              background: i + 1 < current ? "#10B981" : i + 1 === current ? "linear-gradient(135deg, #7C3AED, #F97316)" : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              color: i + 1 <= current ? "white" : t.textMuted,
              border: i + 1 === current ? "2px solid rgba(255,255,255,0.2)" : "none",
            }}
            animate={{ scale: i + 1 === current ? [1, 1.08, 1] : 1 }}
            transition={{ duration: 1.5, repeat: i + 1 === current ? Infinity : 0, ease: "easeInOut" }}>
            {i + 1 < current ? <CheckCircle2 size={13} /> : i + 1}
          </motion.div>
          {i < total - 1 && (
            <div className="h-0.5 rounded-full transition-all duration-500"
              style={{ width: 24, background: i + 1 < current ? "#10B981" : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Password Strength ─── */
function PasswordStrength({ password }: { password: string }) {
  const t = useLabiaTheme();
  const getStrength = () => {
    let s = 0;
    if (password.length >= 6) s++;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = getStrength();
  const labels = ["", "Fraca", "Razoável", "Boa", "Forte", "Excelente"];
  const colors = ["", "#EF4444", "#F97316", "#EAB308", "#10B981", "#10B981"];
  if (!password) return null;
  return (
    <motion.div className="mt-2 px-1" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{ background: i <= strength ? colors[strength] : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }} />
        ))}
      </div>
      <p className="text-[10px] font-medium" style={{ color: colors[strength], fontFamily: "Inter, sans-serif" }}>{labels[strength]}</p>
    </motion.div>
  );
}

/* ─── Step 1: Inserir E-mail ─── */
function StepEmail({ email, setEmail, onNext }: { email: string; setEmail: (v: string) => void; onNext: () => void }) {
  const t = useLabiaTheme();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <motion.div key="step-email" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <motion.div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(249,115,22,0.1))", border: "1px solid rgba(124,58,237,0.2)" }}
        animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <Mail size={32} className="text-[#7C3AED]" />
      </motion.div>
      <h2 className="text-xl font-black text-center mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Esqueceu sua senha?</h2>
      <p className="text-sm text-center mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        Sem problemas! Digite o e-mail da sua conta e enviaremos um código de verificação.
      </p>
      <div className="relative mb-2">
        <div className="absolute left-4 top-1/2 -translate-y-1/2"><Mail size={16} style={{ color: t.textMuted }} /></div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="labia-input pl-11 w-full" autoFocus />
        {isValid && (
          <motion.div className="absolute right-4 top-1/2 -translate-y-1/2" initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <CheckCircle2 size={16} className="text-[#10B981]" />
          </motion.div>
        )}
      </div>
      <div className="flex items-start gap-3 p-3 rounded-xl mt-4 mb-6" style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)" }}>
        <ShieldCheck size={16} className="text-[#7C3AED] mt-0.5 flex-shrink-0" />
        <p className="text-[11px] leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
          O código será enviado para o e-mail cadastrado. Verifique também a pasta de spam.
        </p>
      </div>
      <button onClick={onNext} disabled={!isValid} className="labia-btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
        Enviar código<ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

/* ─── Step 2: Código de Verificação ─── */
function StepCode({ email, code, setCode, onNext, onBack }: { email: string; code: string[]; setCode: (v: string[]) => void; onNext: () => void; onBack: () => void }) {
  const t = useLabiaTheme();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [countdown, setCountdown] = useState(45);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) { const tm = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(tm); }
    else { setCanResend(true); }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code]; newCode[index] = value.slice(-1); setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) inputRefs.current[index - 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCode = [...code]; pasted.split("").forEach((char, i) => { if (i < 6) newCode[i] = char; }); setCode(newCode);
    const nextEmpty = newCode.findIndex((c) => !c); inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };
  const handleResend = () => { setCountdown(45); setCanResend(false); setCode(["", "", "", "", "", ""]); };
  const isComplete = code.every((c) => c !== "");

  return (
    <motion.div key="step-code" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <motion.div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.15), rgba(234,179,8,0.1))", border: "1px solid rgba(249,115,22,0.2)" }}
        animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
        <KeyRound size={32} className="text-[#F97316]" />
      </motion.div>
      <h2 className="text-xl font-black text-center mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Verifique seu e-mail</h2>
      <p className="text-sm text-center mb-1 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Enviamos um código de 6 dígitos para:</p>
      <p className="text-[#F97316] text-sm text-center font-semibold mb-6" style={{ fontFamily: "Inter, sans-serif" }}>{email}</p>
      <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
        {code.map((digit, i) => (
          <motion.input key={i} ref={(el) => { inputRefs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={digit}
            onChange={(e) => handleChange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)}
            className="w-11 h-13 text-center text-xl font-bold rounded-xl outline-none transition-all"
            style={{
              fontFamily: "Inter, sans-serif", color: t.textPrimary,
              background: digit ? "rgba(124,58,237,0.12)" : t.cardBg,
              border: digit ? "2px solid rgba(124,58,237,0.4)" : `1.5px solid ${t.inputBorder}`,
            }}
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.05 }} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 mb-6">
        {canResend ? (
          <button onClick={handleResend} className="flex items-center gap-1.5 text-[#F97316] text-sm font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
            <RefreshCw size={14} />Reenviar código
          </button>
        ) : (
          <div className="flex items-center gap-1.5 text-sm" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
            <Timer size={14} />Reenviar em {countdown}s
          </div>
        )}
      </div>
      <button onClick={onNext} disabled={!isComplete} className="labia-btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed mb-3">
        Verificar código<ArrowRight size={16} />
      </button>
      <button onClick={onBack} className="text-sm text-center transition-colors" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Alterar e-mail</button>
    </motion.div>
  );
}

/* ─── Step 3: Nova Senha ─── */
function StepNewPassword({ onNext }: { onNext: () => void }) {
  const t = useLabiaTheme();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const isValid = password.length >= 6 && password === confirm;
  const mismatch = confirm.length > 0 && password !== confirm;

  return (
    <motion.div key="step-password" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="flex flex-col">
      <motion.div className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(16,185,129,0.2)" }}
        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <Lock size={32} className="text-[#10B981]" />
      </motion.div>
      <h2 className="text-xl font-black text-center mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Crie uma nova senha</h2>
      <p className="text-sm text-center mb-6 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Escolha uma senha forte com pelo menos 6 caracteres.</p>
      <div className="flex flex-col gap-3 mb-2">
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2"><Lock size={16} style={{ color: t.textMuted }} /></div>
          <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nova senha" className="labia-input pl-11 pr-12 w-full" autoFocus />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }}>
            {showPass ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        <PasswordStrength password={password} />
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2"><ShieldCheck size={16} style={{ color: t.textMuted }} /></div>
          <input type={showConfirm ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirmar nova senha"
            className="labia-input pl-11 pr-12 w-full" style={{ borderColor: mismatch ? "#EF4444" : undefined }} />
          <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: t.textMuted }}>
            {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
        {mismatch && (
          <motion.p className="text-[#EF4444] text-[11px] px-1" style={{ fontFamily: "Inter, sans-serif" }} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>As senhas não coincidem</motion.p>
        )}
      </div>
      <div className="flex flex-col gap-1.5 p-3 rounded-xl mt-4 mb-6" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.1)" }}>
        <p className="text-[11px] font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>Dicas para uma senha forte:</p>
        {[
          { text: "Pelo menos 6 caracteres", ok: password.length >= 6 },
          { text: "Uma letra maiúscula", ok: /[A-Z]/.test(password) },
          { text: "Um número", ok: /[0-9]/.test(password) },
          { text: "Um caractere especial (!@#$)", ok: /[^A-Za-z0-9]/.test(password) },
        ].map((tip, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all"
              style={{ background: tip.ok ? "#10B981" : t.isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
              {tip.ok && <CheckCircle2 size={10} className="text-white" />}
            </div>
            <p className="text-[11px] transition-colors" style={{ color: tip.ok ? "rgba(16,185,129,0.8)" : t.textMuted, fontFamily: "Inter, sans-serif" }}>{tip.text}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} disabled={!isValid} className="labia-btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
        Redefinir senha<ArrowRight size={16} />
      </button>
    </motion.div>
  );
}

/* ─── Step 4: Confirmação ─── */
function StepSuccess({ onLogin }: { onLogin: () => void }) {
  const t = useLabiaTheme();
  return (
    <motion.div key="step-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center text-center">
      <motion.div className="relative w-24 h-24 mb-6" animate={{ y: [0, -8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))", border: "2px solid rgba(16,185,129,0.3)" }}>
          <CheckCircle2 size={44} className="text-[#10B981]" />
        </div>
        {[...Array(6)].map((_, i) => (
          <motion.div key={i} className="absolute"
            style={{ top: `${15 + Math.sin(i * 60 * Math.PI / 180) * 45}%`, left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 55}%` }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25, ease: "easeInOut" }}>
            <Sparkles size={10} className="text-[#F97316]" />
          </motion.div>
        ))}
      </motion.div>
      <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Senha redefinida!</h2>
      <p className="text-sm mb-2 leading-relaxed" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
        Sua senha foi alterada com sucesso. Agora você já pode acessar sua conta com a nova senha.
      </p>
      <motion.div className="w-full p-4 rounded-2xl my-5"
        style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05))", border: "1px solid rgba(16,185,129,0.15)" }}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center"><ShieldCheck size={18} className="text-[#10B981]" /></div>
          <div className="text-left">
            <p className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: t.textSecondary }}>Conta protegida</p>
            <p className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>Sua segurança é nossa prioridade</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          {["Senha atualizada com sucesso", "Sessões anteriores encerradas", "Notificação enviada ao seu e-mail"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 size={12} className="text-[#10B981] flex-shrink-0" />
              <p className="text-[11px]" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>{item}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <button onClick={onLogin} className="labia-btn-primary w-full py-3.5 text-sm flex items-center justify-center gap-2">
        Entrar na minha conta<ArrowRight size={16} />
      </button>
      <motion.div className="flex items-center gap-3 mt-5 p-3 rounded-xl w-full"
        style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.1)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <img src={IMAGES.tutorRobot} alt="Tutor IA" className="w-10 h-10 rounded-full" />
        <p className="text-[11px] leading-relaxed text-left" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
          Que bom que você voltou! Suas trilhas e conquistas estão te esperando. Bora continuar? 🚀
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function EsqueciSenha() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const t = useLabiaTheme();

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <motion.div className="sticky top-0 z-20 backdrop-blur-lg" style={{ background: t.headerBg }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 px-5 pt-14 pb-3">
            <button onClick={() => { if (step === 1) setLocation("/cadastro"); else if (step === 4) setLocation("/home"); else setStep(step - 1); }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: t.cardBg }}>
              <ArrowLeft size={18} style={{ color: t.textSecondary }} />
            </button>
            <div>
              <h1 className="text-lg font-black" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>Recuperar senha</h1>
              <p className="text-[10px]" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                {step === 1 && "Etapa 1 de 3 — Identificação"}
                {step === 2 && "Etapa 2 de 3 — Verificação"}
                {step === 3 && "Etapa 3 de 3 — Nova senha"}
                {step === 4 && "Concluído!"}
              </p>
            </div>
          </div>
        </motion.div>
        {step < 4 && <div className="px-5 mt-3"><StepIndicator current={step} total={3} /></div>}
        <div className="px-5 pb-8">
          <AnimatePresence mode="wait">
            {step === 1 && <StepEmail email={email} setEmail={setEmail} onNext={() => setStep(2)} />}
            {step === 2 && <StepCode email={email} code={code} setCode={setCode} onNext={() => setStep(3)} onBack={() => { setStep(1); setCode(["", "", "", "", "", ""]); }} />}
            {step === 3 && <StepNewPassword onNext={() => setStep(4)} />}
            {step === 4 && <StepSuccess onLogin={() => setLocation("/home")} />}
          </AnimatePresence>
        </div>
      </div>
    </PhoneFrame>
  );
}
