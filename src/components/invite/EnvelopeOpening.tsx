import { useState, useEffect } from "react";
import { Sparkles, MailOpen, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnvelopeOpeningProps {
  guestName?: string;
  hostName: string;
  sealText?: string;
  styleVariant?: "gold" | "rose" | "emerald" | "classic" | string;
  onOpen?: () => void;
}

export function EnvelopeOpening({
  guestName,
  hostName,
  sealText = "Ochish",
  styleVariant = "gold",
  onOpen,
}: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpen) onOpen();

    // After animation finishes, remove from DOM pointer flow
    setTimeout(() => {
      setIsRemoved(true);
    }, 1200);
  };

  if (isRemoved) return null;

  // Variant themes
  const variantStyles = {
    gold: {
      bg: "from-zinc-950 via-neutral-900 to-amber-950",
      envelopeBg: "bg-gradient-to-b from-[#2A2419] to-[#18140D] border-amber-500/30",
      sealBg: "bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 border-amber-200/50 shadow-amber-500/30",
      sealText: "text-amber-950 font-serif",
      accentText: "text-amber-300",
      buttonBg: "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 hover:shadow-amber-500/40",
    },
    rose: {
      bg: "from-rose-950 via-slate-900 to-pink-950",
      envelopeBg: "bg-gradient-to-b from-[#2C1D24] to-[#1A1016] border-rose-400/30",
      sealBg: "bg-gradient-to-br from-rose-300 via-rose-500 to-pink-700 border-rose-200/50 shadow-rose-500/30",
      sealText: "text-rose-950 font-serif",
      accentText: "text-rose-300",
      buttonBg: "bg-gradient-to-r from-rose-300 via-rose-400 to-pink-500 text-rose-950 hover:shadow-rose-500/40",
    },
    emerald: {
      bg: "from-emerald-950 via-zinc-900 to-teal-950",
      envelopeBg: "bg-gradient-to-b from-[#132A22] to-[#0A1A14] border-emerald-500/30",
      sealBg: "bg-gradient-to-br from-emerald-400 via-teal-600 to-emerald-800 border-emerald-200/50 shadow-emerald-500/30",
      sealText: "text-emerald-950 font-serif",
      accentText: "text-emerald-300",
      buttonBg: "bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-emerald-950 hover:shadow-emerald-500/40",
    },
    classic: {
      bg: "from-slate-950 via-slate-900 to-zinc-950",
      envelopeBg: "bg-gradient-to-b from-slate-900 to-zinc-900 border-slate-700",
      sealBg: "bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-red-400/40 shadow-red-600/40",
      sealText: "text-amber-100 font-serif",
      accentText: "text-slate-300",
      buttonBg: "bg-gradient-to-r from-amber-300 to-amber-500 text-zinc-950 hover:shadow-amber-500/40",
    },
  };

  const theme = variantStyles[styleVariant as keyof typeof variantStyles] || variantStyles.gold;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b px-4 transition-all duration-1000",
        theme.bg,
        isOpen ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      )}
    >
      {/* Background Sparkles & Ambient Light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md flex flex-col items-center text-center z-10">
        {/* Guest Greeting Header */}
        <div className="mb-6 space-y-2 animate-fade-in">
          {guestName && (
            <p className="text-xs uppercase tracking-[0.25em] text-white/70">
              Hurmatli <span className={cn("font-semibold", theme.accentText)}>{guestName}</span>, siz taklif etildingiz
            </p>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
            {hostName}
          </h2>
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/60 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span>Raqamli Taklifnoma</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
        </div>

        {/* 3D Envelope Body */}
        <div
          onClick={handleOpen}
          className={cn(
            "relative w-full aspect-[4/3] rounded-2xl border shadow-2xl backdrop-blur-md cursor-pointer group transition-all duration-700 hover:scale-[1.02]",
            theme.envelopeBg,
            isOpen && "rotate-x-180"
          )}
          style={{ perspective: "1000px" }}
        >
          {/* Top Flap Triangular SVG */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <svg
              className="absolute top-0 left-0 w-full h-1/2 text-white/5 drop-shadow-md transition-transform duration-700"
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 100,0 50,50" fill="currentColor" />
            </svg>
            <svg
              className="absolute bottom-0 left-0 w-full h-2/3 text-black/20"
              viewBox="0 0 100 66"
              preserveAspectRatio="none"
            >
              <polygon points="0,66 100,66 50,0" fill="currentColor" />
            </svg>
          </div>

          {/* Envelope Card Inside Preview */}
          <div className="absolute inset-4 rounded-xl bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center text-center shadow-inner">
            <MailOpen className={cn("w-10 h-10 mb-2 transition-transform group-hover:scale-110", theme.accentText)} />
            <p className="font-serif text-lg text-white font-medium">Tantanali Marosim</p>
            <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">Ochish uchun muhrni bosing</p>
          </div>

          {/* Wax Seal Center Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className={cn(
                "relative w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 active:scale-95",
                theme.sealBg
              )}
            >
              <span className={cn("text-xs font-bold uppercase tracking-wider", theme.sealText)}>
                {sealText}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-100/80 mt-0.5 animate-pulse" />
              {/* Outer Golden Ring Effect */}
              <div className="absolute -inset-1.5 rounded-full border border-amber-400/30 animate-ping pointer-events-none" style={{ animationDuration: "3s" }} />
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleOpen}
          className={cn(
            "mt-8 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95",
            theme.buttonBg
          )}
        >
          <MailOpen className="w-4 h-4" />
          <span>Taklifnomani ko'rish</span>
        </button>
        <p className="text-[10px] text-white/40 mt-3 flex items-center gap-1.5">
          <Music className="w-3 h-3 text-amber-400/70" /> Fon musiqasi bilan ochiladi
        </p>
      </div>
    </div>
  );
}
