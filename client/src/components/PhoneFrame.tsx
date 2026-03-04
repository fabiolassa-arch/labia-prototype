/**
 * PhoneFrame — Container que simula um smartphone
 * Usado em todas as telas do protótipo para manter consistência visual.
 */
import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showStatusBar?: boolean;
  className?: string;
}

export default function PhoneFrame({ children, showStatusBar = true, className = "" }: PhoneFrameProps) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.18) 0%, #0f0f1a 60%)",
        minHeight: "100dvh",
      }}
    >
      <div className={`phone-frame ${className}`}>
        {showStatusBar && <StatusBar />}
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 pb-1 flex-shrink-0">
      <span className="text-white/50 text-xs font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
        9:41
      </span>
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[3, 4, 5, 5].map((h, i) => (
            <div key={i} className="w-0.5 rounded-full bg-white/50" style={{ height: h }} />
          ))}
        </div>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2.5C9.5 2.5 11.3 3.3 12.6 4.6L14 3.2C12.3 1.5 10 0.5 7.5 0.5C5 0.5 2.7 1.5 1 3.2L2.4 4.6C3.7 3.3 5.5 2.5 7.5 2.5Z" fill="rgba(255,255,255,0.5)" />
          <path d="M7.5 5.5C8.8 5.5 10 6 10.9 6.9L12.3 5.5C11 4.2 9.3 3.5 7.5 3.5C5.7 3.5 4 4.2 2.7 5.5L4.1 6.9C5 6 6.2 5.5 7.5 5.5Z" fill="rgba(255,255,255,0.5)" />
          <circle cx="7.5" cy="9.5" r="1.5" fill="rgba(255,255,255,0.5)" />
        </svg>
        <div className="flex items-center gap-0.5">
          <div className="w-5 h-2.5 rounded-sm border border-white/40 flex items-center px-0.5">
            <div className="w-3 h-1.5 rounded-xs bg-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
