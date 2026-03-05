/**
 * PhoneFrame — Container que simula um smartphone
 * Usado em todas as telas do protótipo para manter consistência visual.
 * Suporta tema claro e escuro via CSS variables.
 */
import { ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface PhoneFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
}

export default function PhoneFrame({ children, showStatusBar = true, className = "" }: PhoneFrameProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: isDark
          ? "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, #0f0f1a 60%)"
          : "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.08) 0%, #EEEDF5 60%)",
        minHeight: "100dvh",
      }}
    >
      <div className={`phone-frame ${className}`}>
        {showStatusBar && <StatusBar isDark={isDark} />}
        {children}
      </div>
    </div>
  );
}

function StatusBar({ isDark }: { isDark: boolean }) {
  const iconColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)";
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
      <span
        className="text-xs font-semibold"
        style={{ fontFamily: "Inter, sans-serif", color: iconColor }}
      >
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[3, 4, 5, 5].map((h, i) => (
            <div key={i} className="w-0.5 rounded-full" style={{ height: h, background: iconColor }} />
          ))}
        </div>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill={iconColor} />
          <path d="M7.5 5.5C8.8 5.5 10 6 10.9 6.9L12.3 5.5C11 4.2 9.3 3.5 7.5 3.5C5.7 3.5 4 4.2 2.7 5.5L4.1 6.9C5 6 6.2 5.5 7.5 5.5Z" fill={iconColor} />
          <circle cx="7.5" cy="9.5" r="1.5" fill={iconColor} />
        </svg>
        <div className="flex items-center gap-0.5">
          <div
            className="w-5 h-2.5 rounded-sm flex items-center px-0.5"
            style={{ border: `1px solid ${iconColor}` }}
          >
            <div className="w-3 h-1.5 rounded-xs" style={{ background: iconColor }} />
          </div>
        </div>
      </div>
    </div>
  );
}
