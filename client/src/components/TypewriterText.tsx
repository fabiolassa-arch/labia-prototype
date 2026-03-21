/**
 * TypewriterText — Texto com efeito de digitação progressiva (typewriter)
 * Ideal para mensagens do Tutor IA, tornando a experiência mais viva para crianças
 */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms por caractere
  delay?: number; // ms antes de começar
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
  /** Se true, renderiza como JSX com suporte a <strong> */
  richText?: boolean;
}

export function TypewriterText({
  text,
  speed = 22,
  delay = 0,
  className,
  style,
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setStarted(false);
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span className={className} style={style}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-4 ml-0.5 rounded-full align-middle"
          style={{ background: "#7C3AED", verticalAlign: "middle" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  );
}
