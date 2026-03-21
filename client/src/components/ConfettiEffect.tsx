/**
 * ConfettiEffect — Explosão de partículas coloridas para celebrar conquistas
 * Usa Framer Motion para animar confetes e estrelas voando pela tela
 */
import { motion } from "framer-motion";
import { useMemo } from "react";

interface ConfettiEffectProps {
  active: boolean;
  count?: number;
}

const COLORS = ["#7C3AED", "#F97316", "#10B981", "#FFD700", "#EF4444", "#3B82F6", "#EC4899"];
const SHAPES = ["circle", "square", "star"];

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function StarShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function ConfettiEffect({ active, count = 28 }: ConfettiEffectProps) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: randomBetween(6, 14),
      x: randomBetween(-60, 60),
      y: randomBetween(-120, -30),
      rotation: randomBetween(-360, 360),
      delay: randomBetween(0, 0.4),
      duration: randomBetween(0.9, 1.6),
    })), [count]
  );

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: "50%", top: "50%" }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0 }}
          animate={{
            x: p.x * 3,
            y: p.y * 2,
            opacity: [1, 1, 0],
            rotate: p.rotation,
            scale: [0, 1.2, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          {p.shape === "star" ? (
            <StarShape color={p.color} size={p.size} />
          ) : p.shape === "square" ? (
            <div style={{ width: p.size, height: p.size, background: p.color, borderRadius: 2 }} />
          ) : (
            <div style={{ width: p.size, height: p.size, background: p.color, borderRadius: "50%" }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}
