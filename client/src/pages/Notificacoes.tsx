/**
 * Notificacoes — Tela de notificações do aluno
 * Design: Lista agrupada por "Novas" e "Anteriores", com ícones coloridos,
 * badges de tipo, ações contextuais e swipe-to-dismiss visual
 * Paleta: #1C1C2E (bg), cores por tipo de notificação
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Trophy, Clock, Star, Unlock, Flame, Users, Sparkles,
  Bell, BellOff, Check, CheckCheck, ChevronRight, Trash2, Settings,
} from "lucide-react";
import { NOTIFICATIONS, type Notification } from "@/data";
import PhoneFrame from "@/components/PhoneFrame";

const ICON_MAP: Record<string, any> = {
  Trophy, Clock, Star, Unlock, Flame, Users, Sparkles,
};

const TYPE_LABELS: Record<string, string> = {
  conquista: "Conquista",
  lembrete: "Lembrete",
  sistema: "Sistema",
  social: "Social",
};

const TYPE_BG: Record<string, string> = {
  conquista: "bg-[#10B981]/15 text-[#10B981]",
  lembrete: "bg-[#F97316]/15 text-[#F97316]",
  sistema: "bg-[#7C3AED]/15 text-[#7C3AED]",
  social: "bg-[#06B6D4]/15 text-[#06B6D4]",
};

function NotificationCard({
  notif,
  onRead,
  onDelete,
  delay = 0,
}: {
  notif: Notification;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
  delay?: number;
}) {
  const [, setLocation] = useLocation();
  const Icon = ICON_MAP[notif.icon] || Bell;

  return (
    <motion.div
      className={`relative mx-4 mb-3 rounded-2xl overflow-hidden transition-all ${
        notif.read ? "bg-white/[0.03]" : "bg-white/[0.07]"
      }`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
      transition={{ delay, duration: 0.3 }}
      layout
    >
      {/* Unread indicator */}
      {!notif.read && (
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: notif.color }} />
      )}

      <div className="p-4 pl-5">
        {/* Top row: icon + title + time */}
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${notif.color}20` }}
          >
            <Icon size={18} style={{ color: notif.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${TYPE_BG[notif.type]}`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {TYPE_LABELS[notif.type]}
              </span>
              <span className="text-white/25 text-[10px] ml-auto flex-shrink-0" style={{ fontFamily: "Inter, sans-serif" }}>
                {notif.time}
              </span>
            </div>

            <h3
              className={`text-sm font-bold leading-tight mb-1 ${notif.read ? "text-white/50" : "text-white"}`}
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {notif.title}
              {!notif.read && (
                <span className="inline-block w-1.5 h-1.5 rounded-full ml-1.5 align-middle" style={{ background: notif.color }} />
              )}
            </h3>

            <p
              className={`text-xs leading-relaxed ${notif.read ? "text-white/30" : "text-white/55"}`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {notif.message}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2 mt-3">
              {notif.action && notif.actionRoute && (
                <button
                  onClick={() => setLocation(notif.actionRoute!)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-95"
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    background: `${notif.color}20`,
                    color: notif.color,
                    border: `1px solid ${notif.color}30`,
                  }}
                >
                  {notif.action}
                  <ChevronRight size={12} />
                </button>
              )}

              <div className="flex items-center gap-1 ml-auto">
                {!notif.read && (
                  <button
                    onClick={() => onRead(notif.id)}
                    className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                    title="Marcar como lida"
                  >
                    <Check size={12} className="text-white/30" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(notif.id)}
                  className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center hover:bg-red-500/20 transition-colors group"
                  title="Remover"
                >
                  <Trash2 size={12} className="text-white/30 group-hover:text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center px-8 py-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <BellOff size={32} className="text-white/15" />
      </div>
      <h3 className="text-white/40 text-base font-bold mb-1" style={{ fontFamily: "Nunito, sans-serif" }}>
        Tudo em dia!
      </h3>
      <p className="text-white/25 text-sm text-center" style={{ fontFamily: "Inter, sans-serif" }}>
        Você não tem notificações no momento. Continue estudando para receber novidades!
      </p>
    </motion.div>
  );
}

export default function Notificacoes() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);
  const unreadCount = unread.length;

  const handleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div
          className="sticky top-0 z-20 bg-[#1C1C2E]/95 backdrop-blur-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between px-5 pt-14 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocation("/home")}
                className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <ArrowLeft size={18} className="text-white/70" />
              </button>
              <div>
                <h1 className="text-white text-lg font-black" style={{ fontFamily: "Nunito, sans-serif" }}>
                  Notificações
                </h1>
                {unreadCount > 0 && (
                  <p className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
                    {unreadCount} {unreadCount === 1 ? "nova" : "novas"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleReadAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] text-xs font-bold hover:bg-[#7C3AED]/25 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <CheckCheck size={13} />
                  Ler tudo
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center hover:bg-red-500/15 transition-colors group"
                  title="Limpar tudo"
                >
                  <Trash2 size={14} className="text-white/30 group-hover:text-red-400" />
                </button>
              )}
            </div>
          </div>

          {/* Filter tabs */}
          <FilterTabs
            notifications={notifications}
            onFilter={(filtered) => {/* future: filter by type */}}
          />
        </motion.div>

        {/* Content */}
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="pt-3 pb-8">
            {/* Novas */}
            {unread.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 px-5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-white/50 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                    Novas ({unread.length})
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <AnimatePresence>
                  {unread.map((notif, i) => (
                    <NotificationCard
                      key={notif.id}
                      notif={notif}
                      onRead={handleRead}
                      onDelete={handleDelete}
                      delay={i * 0.08}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Anteriores */}
            {read.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-5 mb-3">
                  <span className="text-white/30 text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                    Anteriores ({read.length})
                  </span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <AnimatePresence>
                  {read.map((notif, i) => (
                    <NotificationCard
                      key={notif.id}
                      notif={notif}
                      onRead={handleRead}
                      onDelete={handleDelete}
                      delay={i * 0.05}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

/* ─── Filter Tabs (visual only for prototype) ─── */
function FilterTabs({
  notifications,
  onFilter,
}: {
  notifications: Notification[];
  onFilter: (filtered: Notification[]) => void;
}) {
  const [active, setActive] = useState("todas");

  const tabs = [
    { id: "todas", label: "Todas", count: notifications.length },
    { id: "conquista", label: "Conquistas", count: notifications.filter((n) => n.type === "conquista").length },
    { id: "lembrete", label: "Lembretes", count: notifications.filter((n) => n.type === "lembrete").length },
    { id: "sistema", label: "Sistema", count: notifications.filter((n) => n.type === "sistema").length },
  ];

  return (
    <div className="flex items-center gap-2 px-5 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            active === tab.id
              ? "bg-white/12 text-white"
              : "bg-white/4 text-white/30 hover:bg-white/8 hover:text-white/50"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {tab.label}
          {tab.count > 0 && (
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                active === tab.id ? "bg-white/15 text-white" : "bg-white/5 text-white/25"
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
