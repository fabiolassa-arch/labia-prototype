/**
 * Trilhas — Tela de Trilhas de Aprendizado
 * Design: Grid 2x2 de cards de trilhas com progresso, badges e status
 */
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { toast } from "sonner";
import { Brain, MessageSquare, Settings, Rocket, Lock, Star, CheckCircle2 } from "lucide-react";
import { TRACKS } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";
import ProgressBar from "@/components/ProgressBar";

const ICON_MAP: Record<string, any> = { Brain, MessageSquare, Settings, Rocket };

function TrackCardLarge({ track, index }: { track: typeof TRACKS[0]; index: number }) {
  const [, setLocation] = useLocation();
  const Icon = ICON_MAP[track.icon] || Brain;

  return (
    <motion.button
      className="rounded-2xl p-4 text-left relative overflow-hidden transition-all active:scale-95"
      style={{
        background: track.locked
          ? "rgba(107,114,128,0.15)"
          : `linear-gradient(135deg, ${track.color}30 0%, ${track.color}10 100%)`,
        border: `1px solid ${track.locked ? "rgba(107,114,128,0.2)" : `${track.color}40`}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
      onClick={() => {
        if (track.locked) {
          toast(`Complete a trilha anterior para desbloquear "${track.title}"`);
        } else {
          setLocation("/trilha-detalhe");
        }
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
        style={{
          background: track.locked ? "#374151" : `${track.color}35`,
        }}
      >
        {track.locked ? (
          <Lock size={24} className="text-white/30" />
        ) : (
          <Icon size={24} style={{ color: track.color }} />
        )}
      </div>

      {/* Title */}
      <p
        className="font-bold text-base leading-tight mb-1"
        style={{
          fontFamily: "Nunito, sans-serif",
          color: track.locked ? "rgba(255,255,255,0.3)" : "white",
        }}
      >
        {track.title}
      </p>
      <p
        className="text-xs leading-tight mb-3"
        style={{
          fontFamily: "Inter, sans-serif",
          color: track.locked ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.5)",
        }}
      >
        {track.description}
      </p>

      {/* Progress */}
      {!track.locked && (
        <>
          <div className="flex items-center justify-between mb-1">
            {track.progress === 100 ? (
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-[#10B981]" />
                <span className="text-[#10B981] text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>100%</span>
              </div>
            ) : (
              <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>em progresso</span>
            )}
            {track.progress < 100 && (
              <span className="text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif", color: track.color }}>{track.progress}%</span>
            )}
          </div>
          <ProgressBar value={track.progress} />
          {track.progress === 100 && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#10B98120", color: "#10B981", fontFamily: "Inter, sans-serif" }}>
              <Star size={9} fill="#10B981" />
              {track.badge}
            </div>
          )}
        </>
      )}

      {track.locked && (
        <span className="text-white/25 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>bloqueado • 0%</span>
      )}
    </motion.button>
  );
}

export default function Trilhas() {
  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="px-5 pt-6 pb-4 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-white text-2xl font-black leading-tight" style={{ fontFamily: "Nunito, sans-serif" }}>
            Trilhas de<br />Aprendizado
          </h1>
          <div className="w-10 h-10 rounded-full bg-[#7C3AED]/20 flex items-center justify-center">
            <Rocket size={20} className="text-[#7C3AED]" />
          </div>
        </motion.div>

        {/* Grid */}
        <div className="px-5 grid grid-cols-2 gap-3">
          {TRACKS.map((track, i) => (
            <TrackCardLarge key={track.id} track={track} index={i} />
          ))}
        </div>

        <div className="h-4" />
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
