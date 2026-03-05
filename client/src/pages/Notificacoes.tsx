/**
 * Notificacoes — Tela de notificações do aluno
 * Suporta tema claro e escuro via useLabiaTheme
 */
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLocation } from "wouter";
import {
  ArrowLeft, Trophy, Clock, Star, Unlock, Flame, Users, Sparkles,
  Bell, BellOff, Check, CheckCheck, ChevronRight, Trash2,
} from "lucide-react";
import { NOTIFICATIONS, type Notification } from "@/data";
import { useLabiaTheme } from "@/hooks/useLabiaTheme";
import PhoneFrame from "@/components/PhoneFrame";

const ICON_MAP: Record<string, any> = { Trophy, Clock, Star, Unlock, Flame, Users, Sparkles };

const TYPE_LABELS: Record<string, string> = {
  conquista: "Conquista", lembrete: "Lembrete", sistema: "Sistema", social: "Social",
};

const TYPE_BG: Record<string, string> = {
  conquista: "bg-[#10B981]/15 text-[#10B981]",
  lembrete: "bg-[#F97316]/15 text-[#F97316]",
  sistema: "bg-[#7C3AED]/15 text-[#7C3AED]",
  social: "bg-[#06B6D4]/15 text-[#06B6D4]",
};

function NotificationCard({
  notif, onRead, onDelete, delay = 0,
}: {
  notif: Notification; onRead: (id: number) => void; onDelete: (id: number) => void; delay?: number;
}) {
  const [, setLocation] = useLocation();
  const Icon = ICON_MAP[notif.icon] || Bell;
  const t = useLabiaTheme();

  return (
    <motion.div
      className="relative mx-4 mb-3 rounded-2xl overflow-hidden transition-all"
      style={{
        background: notif.read
          ? (t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)")
          : (t.isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"),
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
      transition={{ delay, duration: 0.3 }}
      layout
    >
      {!notif.read && (
        <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: notif.color }} />
      )}

      <div className="p-4 pl-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: `${notif.color}20` }}>
            <Icon size={18} style={{ color: notif.color }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${TYPE_BG[notif.type]}`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {TYPE_LABELS[notif.type]}
              </span>
              <span className="text-[10px] ml-auto flex-shrink-0" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                {notif.time}
              </span>
            </div>

            <h3 className="text-sm font-bold leading-tight mb-1"
              style={{ fontFamily: "Nunito, sans-serif", color: notif.read ? t.textSecondary : t.textPrimary }}>
              {notif.title}
              {!notif.read && (
                <span className="inline-block w-1.5 h-1.5 rounded-full ml-1.5 align-middle" style={{ background: notif.color }} />
              )}
            </h3>

            <p className="text-xs leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif", color: notif.read ? t.textMuted : t.textSecondary }}>
              {notif.message}
            </p>

            <div className="flex items-center gap-2 mt-3">
              {notif.action && notif.actionRoute && (
                <button onClick={() => setLocation(notif.actionRoute!)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-95"
                  style={{ fontFamily: "Nunito, sans-serif", background: `${notif.color}20`, color: notif.color, border: `1px solid ${notif.color}30` }}>
                  {notif.action}
                  <ChevronRight size={12} />
                </button>
              )}

              <div className="flex items-center gap-1 ml-auto">
                {!notif.read && (
                  <button onClick={() => onRead(notif.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: t.cardBg }}
                    title="Marcar como lida">
                    <Check size={12} style={{ color: t.textMuted }} />
                  </button>
                )}
                <button onClick={() => onDelete(notif.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors group"
                  style={{ background: t.cardBg }}
                  title="Remover">
                  <Trash2 size={12} className="group-hover:text-red-400" style={{ color: t.textMuted }} />
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
  const t = useLabiaTheme();
  return (
    <motion.div className="flex-1 flex flex-col items-center justify-center px-8 py-16"
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: t.cardBg }}>
        <BellOff size={32} style={{ color: t.textMuted }} />
      </div>
      <h3 className="text-base font-bold mb-1" style={{ fontFamily: "Nunito, sans-serif", color: t.textMuted }}>
        Tudo em dia!
      </h3>
      <p className="text-sm text-center" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
        Você não tem notificações no momento. Continue estudando para receber novidades!
      </p>
    </motion.div>
  );
}

function FilterTabs({ notifications }: { notifications: Notification[] }) {
  const [active, setActive] = useState("todas");
  const t = useLabiaTheme();

  const tabs = [
    { id: "todas", label: "Todas", count: notifications.length },
    { id: "conquista", label: "Conquistas", count: notifications.filter((n) => n.type === "conquista").length },
    { id: "lembrete", label: "Lembretes", count: notifications.filter((n) => n.type === "lembrete").length },
    { id: "sistema", label: "Sistema", count: notifications.filter((n) => n.type === "sistema").length },
  ];

  return (
    <div className="flex items-center gap-2 px-5 pb-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => setActive(tab.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all"
          style={{
            fontFamily: "Inter, sans-serif",
            background: active === tab.id
              ? (t.isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)")
              : (t.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"),
            color: active === tab.id ? t.textPrimary : t.textMuted,
          }}>
          {tab.label}
          {tab.count > 0 && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold"
              style={{
                background: active === tab.id
                  ? (t.isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)")
                  : (t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"),
                color: active === tab.id ? t.textPrimary : t.textMuted,
              }}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default function Notificacoes() {
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const t = useLabiaTheme();

  const unread = notifications.filter((n) => !n.read);
  const read = notifications.filter((n) => n.read);
  const unreadCount = unread.length;

  const handleRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };
  const handleReadAll = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const handleDelete = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };
  const handleClearAll = () => { setNotifications([]); };

  return (
    <PhoneFrame>
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header */}
        <motion.div className="sticky top-0 z-20 backdrop-blur-lg"
          style={{ background: t.isDark ? "rgba(28,28,46,0.95)" : "rgba(248,247,255,0.95)" }}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between px-5 pt-14 pb-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setLocation("/home")}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: t.cardBg }}>
                <ArrowLeft size={18} style={{ color: t.textSecondary }} />
              </button>
              <div>
                <h1 className="text-lg font-black" style={{ fontFamily: "Nunito, sans-serif", color: t.textPrimary }}>
                  Notificações
                </h1>
                {unreadCount > 0 && (
                  <p className="text-xs" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                    {unreadCount} {unreadCount === 1 ? "nova" : "novas"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button onClick={handleReadAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7C3AED]/15 text-[#7C3AED] text-xs font-bold hover:bg-[#7C3AED]/25 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <CheckCheck size={13} />
                  Ler tudo
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={handleClearAll}
                  className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-red-500/15 transition-colors group"
                  style={{ background: t.cardBg }}
                  title="Limpar tudo">
                  <Trash2 size={14} className="group-hover:text-red-400" style={{ color: t.textMuted }} />
                </button>
              )}
            </div>
          </div>

          <FilterTabs notifications={notifications} />
        </motion.div>

        {/* Content */}
        {notifications.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="pt-3 pb-8">
            {unread.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 px-5 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textSecondary }}>
                    Novas ({unread.length})
                  </span>
                  <div className="flex-1 h-px" style={{ background: t.divider }} />
                </div>
                <AnimatePresence>
                  {unread.map((notif, i) => (
                    <NotificationCard key={notif.id} notif={notif} onRead={handleRead} onDelete={handleDelete} delay={i * 0.08} />
                  ))}
                </AnimatePresence>
              </div>
            )}

            {read.length > 0 && (
              <div>
                <div className="flex items-center gap-2 px-5 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif", color: t.textMuted }}>
                    Anteriores ({read.length})
                  </span>
                  <div className="flex-1 h-px" style={{ background: t.divider }} />
                </div>
                <AnimatePresence>
                  {read.map((notif, i) => (
                    <NotificationCard key={notif.id} notif={notif} onRead={handleRead} onDelete={handleDelete} delay={i * 0.05} />
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
