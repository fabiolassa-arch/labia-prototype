/**
 * Ranking — Leaderboard de alunos
 * Design: Pódio 3D animado no topo + lista scrollável com destaque do usuário
 * Paleta: #1C1C2E (bg), dourado/prata/bronze para pódio, #7C3AED (roxo), #F97316 (laranja)
 * Fonte: Nunito (headings) + Inter (body)
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Trophy, Medal, TrendingUp, TrendingDown, Minus,
  Flame, Star, Zap, Crown, ChevronRight, Award, Target,
} from "lucide-react";
import { RANKING_PLAYERS, IMAGES, type RankingPlayer } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav from "@/components/BottomNav";

/* ─── Period filter tabs ─── */
const PERIODS = [
  { id: "week", label: "Semana" },
  { id: "month", label: "Mês" },
  { id: "all", label: "Geral" },
];

/* ─── Podium Component ─── */
function Podium({ players }: { players: RankingPlayer[] }) {
  const top3 = players.slice(0, 3);
  if (top3.length < 3) return null;

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd
  const heights = [100, 130, 80];
  const delays = [0.3, 0.1, 0.5];
  const medals = ["🥈", "🥇", "🥉"];
  const borderColors = ["#C0C0C0", "#FFD700", "#CD7F32"];
  const glowColors = ["rgba(192,192,192,0.3)", "rgba(255,215,0,0.4)", "rgba(205,127,50,0.2)"];
  const positions = [2, 1, 3];

  return (
    <motion.div
      className="flex items-end justify-center gap-3 px-6 pt-4 pb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {podiumOrder.map((player, i) => (
        <motion.div
          key={player.id}
          className="flex flex-col items-center flex-1"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delays[i], duration: 0.5, type: "spring", bounce: 0.3 }}
        >
          {/* Avatar */}
          <div className="relative mb-2">
            {positions[i] === 1 && (
              <motion.div
                className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: -10, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4, type: "spring" }}
              >
                <Crown size={20} className="text-[#FFD700]" fill="#FFD700" />
              </motion.div>
            )}
            <div
              className="rounded-full p-0.5"
              style={{
                background: `linear-gradient(135deg, ${borderColors[i]}, ${borderColors[i]}88)`,
                boxShadow: `0 0 20px ${glowColors[i]}`,
              }}
            >
              <img
                src={player.avatar || IMAGES.avatarBoy}
                alt={player.name}
                className="rounded-full object-cover bg-[#2a2a3e]"
                style={{ width: positions[i] === 1 ? 56 : 48, height: positions[i] === 1 ? 56 : 48 }}
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black"
              style={{
                background: borderColors[i],
                color: positions[i] === 3 ? "#fff" : "#1C1C2E",
                fontFamily: "Nunito, sans-serif",
                boxShadow: `0 2px 8px ${glowColors[i]}`,
              }}
            >
              {positions[i]}
            </div>
          </div>

          {/* Name */}
          <p
            className="text-white text-xs font-bold text-center leading-tight mb-0.5 max-w-[80px] truncate"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {player.name.split(" ")[0]}
          </p>

          {/* XP */}
          <div className="flex items-center gap-0.5 mb-2">
            <Zap size={9} className="text-[#F97316]" />
            <span
              className="text-[10px] font-bold text-[#F97316]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {player.xp.toLocaleString()} XP
            </span>
          </div>

          {/* Podium bar */}
          <motion.div
            className="w-full rounded-t-xl relative overflow-hidden"
            style={{
              background: `linear-gradient(to top, ${borderColors[i]}15, ${borderColors[i]}40)`,
              border: `1px solid ${borderColors[i]}40`,
              borderBottom: "none",
            }}
            initial={{ height: 0 }}
            animate={{ height: heights[i] }}
            transition={{ delay: delays[i] + 0.2, duration: 0.6, type: "spring", bounce: 0.2 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">{medals[i]}</span>
            </div>
            {/* Shimmer effect for 1st place */}
            {positions[i] === 1 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            )}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Current User Stats Banner ─── */
function UserStatsBanner({ player, position }: { player: RankingPlayer; position: number }) {
  return (
    <motion.div
      className="mx-4 mt-4 mb-3 rounded-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #7C3AED20, #F9731620)",
        border: "1px solid rgba(124,58,237,0.2)",
      }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={IMAGES.avatarBoy}
              alt="Você"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-[#7C3AED]"
            />
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center text-[10px] font-black text-white"
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {position}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
              Sua posição
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-[#F97316] text-xs font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                #{position} de {RANKING_PLAYERS.length}
              </span>
              {player.trend === "up" && (
                <span className="flex items-center gap-0.5 text-[#10B981] text-[10px] font-bold">
                  <TrendingUp size={10} /> +{player.trendPositions}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[#F97316] text-lg font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
              {player.xp.toLocaleString()}
            </p>
            <p className="text-white/40 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
              pontos XP
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between gap-2">
          {[
            { icon: Target, label: "Missões", value: player.missions, color: "#7C3AED" },
            { icon: Award, label: "Insígnias", value: player.badges, color: "#10B981" },
            { icon: Flame, label: "Sequência", value: `${player.streak}d`, color: "#EF4444" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: `${stat.color}10` }}
            >
              <stat.icon size={14} style={{ color: stat.color }} />
              <div>
                <p className="text-white text-xs font-bold" style={{ fontFamily: "Nunito, sans-serif" }}>
                  {stat.value}
                </p>
                <p className="text-white/30 text-[9px]" style={{ fontFamily: "Inter, sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Player Row ─── */
function PlayerRow({
  player,
  position,
  delay,
}: {
  player: RankingPlayer;
  position: number;
  delay: number;
}) {
  const TrendIcon = player.trend === "up" ? TrendingUp : player.trend === "down" ? TrendingDown : Minus;
  const trendColor = player.trend === "up" ? "#10B981" : player.trend === "down" ? "#EF4444" : "#6B7280";

  return (
    <motion.div
      className={`mx-4 mb-2 rounded-xl p-3 flex items-center gap-3 transition-all ${
        player.isCurrentUser
          ? "bg-[#7C3AED]/10 border border-[#7C3AED]/30"
          : "bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      {/* Position */}
      <div className="w-7 flex-shrink-0 text-center">
        <span
          className={`text-sm font-black ${player.isCurrentUser ? "text-[#7C3AED]" : "text-white/30"}`}
          style={{ fontFamily: "Nunito, sans-serif" }}
        >
          {position}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={player.isCurrentUser ? IMAGES.avatarBoy : player.avatar}
          alt={player.name}
          className={`w-10 h-10 rounded-full object-cover ${
            player.isCurrentUser ? "ring-2 ring-[#7C3AED]" : ""
          }`}
        />
        {player.streak >= 3 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Flame size={8} className="text-white" fill="white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p
            className={`text-sm font-bold truncate ${player.isCurrentUser ? "text-[#7C3AED]" : "text-white"}`}
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            {player.name}
            {player.isCurrentUser && (
              <span className="text-[10px] font-normal text-[#7C3AED]/60 ml-1">(você)</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-white/30 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
            Nv.{player.level} • {player.title}
          </span>
          {player.badges > 0 && (
            <div className="flex items-center gap-0.5">
              {Array.from({ length: Math.min(player.badges, 4) }).map((_, i) => (
                <Star key={i} size={8} className="text-[#F59E0B]" fill="#F59E0B" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* XP + Trend */}
      <div className="flex flex-col items-end flex-shrink-0">
        <div className="flex items-center gap-1">
          <Zap size={10} className="text-[#F97316]" />
          <span className="text-xs font-bold text-white" style={{ fontFamily: "Nunito, sans-serif" }}>
            {player.xp.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-0.5 mt-0.5">
          <TrendIcon size={9} style={{ color: trendColor }} />
          {player.trendPositions && player.trend !== "same" ? (
            <span className="text-[9px] font-bold" style={{ color: trendColor, fontFamily: "Inter, sans-serif" }}>
              {player.trend === "up" ? "+" : "-"}{player.trendPositions}
            </span>
          ) : (
            <span className="text-[9px] text-white/20" style={{ fontFamily: "Inter, sans-serif" }}>—</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Ranking Page ─── */
export default function Ranking() {
  const [, setLocation] = useLocation();
  const [activePeriod, setActivePeriod] = useState("week");

  const currentUser = RANKING_PLAYERS.find((p) => p.isCurrentUser);
  const currentUserPosition = RANKING_PLAYERS.findIndex((p) => p.isCurrentUser) + 1;

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 bg-[#1C1C2E]/95 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between px-5 pt-14 pb-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocation("/home")}
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <ArrowLeft size={18} className="text-white/70" />
              </button>
              <div>
                <h1
                  className="text-white text-lg font-black flex items-center gap-2"
                  style={{ fontFamily: "Nunito, sans-serif" }}
                >
                  <Trophy size={18} className="text-[#FFD700]" />
                  Ranking
                </h1>
              </div>
            </div>
          </div>

          {/* Period tabs */}
          <div className="flex items-center gap-2 px-5 pb-3">
            {PERIODS.map((period) => (
              <button
                key={period.id}
                onClick={() => setActivePeriod(period.id)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold text-center transition-all ${
                  activePeriod === period.id
                    ? "bg-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/30"
                    : "bg-white/5 text-white/30 hover:bg-white/10"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {period.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Podium */}
        <Podium players={RANKING_PLAYERS} />

        {/* Divider */}
        <div className="mx-5 my-2 h-px bg-white/5" />

        {/* Current user stats */}
        {currentUser && (
          <UserStatsBanner player={currentUser} position={currentUserPosition} />
        )}

        {/* Full list header */}
        <div className="flex items-center justify-between px-5 mb-2 mt-1">
          <p
            className="text-white/40 text-xs font-bold uppercase tracking-wider"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Classificação completa
          </p>
          <div className="flex items-center gap-1 text-white/20 text-[10px]" style={{ fontFamily: "Inter, sans-serif" }}>
            <Zap size={9} />
            Ordenado por XP
          </div>
        </div>

        {/* Player list (skip top 3 which are in podium) */}
        <div className="pb-4">
          {RANKING_PLAYERS.slice(3).map((player, i) => (
            <PlayerRow
              key={player.id}
              player={player}
              position={i + 4}
              delay={0.7 + i * 0.06}
            />
          ))}
        </div>

        {/* Motivation footer */}
        <motion.div
          className="mx-4 mb-6 p-4 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, #F9731615, #7C3AED15)",
            border: "1px solid rgba(249,115,22,0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-white/60 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Complete mais missões para ganhar XP e subir no ranking!
          </p>
          <button
            onClick={() => setLocation("/trilhas")}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F97316] text-white text-xs font-bold hover:bg-[#ea6c0a] transition-colors"
            style={{ fontFamily: "Nunito, sans-serif" }}
          >
            Continuar estudando
            <ChevronRight size={12} />
          </button>
        </motion.div>
      </div>
      <BottomNav />
    </PhoneFrame>
  );
}
