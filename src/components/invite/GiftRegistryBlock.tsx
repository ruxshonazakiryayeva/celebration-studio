import { useState } from "react";
import { Copy, Check, CreditCard, Gift, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftRegistryBlockProps {
  cardNumber?: string | null;
  cardHolder?: string | null;
  bankName?: string | null;
}

export function GiftRegistryBlock({
  cardNumber = "8600 1234 5678 9012",
  cardHolder = "Celebration Host",
  bankName = "Uzcard / Humo",
}: GiftRegistryBlockProps) {
  const [copied, setCopied] = useState(false);

  if (!cardNumber) return null;

  const cleanCardNumber = cardNumber.replace(/\s+/g, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCardNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-card/90 via-card/70 to-card/90 p-6 sm:p-10 shadow-2xl backdrop-blur-md text-center">
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500 mb-2">
        <Gift className="w-4 h-4" />
        <span>Sovg'alar va Tilaklar</span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
        Hadya va Sovg'alar
      </h3>
      <p className="text-xs text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
        Eng katta sovg'angiz — bu bayramimizdagi ishtirokingizdir. Agar alohida tabriklamoqchi bo'lsangiz, quyidagi plastik karta raqamidan foydalanishingiz mumkin:
      </p>

      {/* Luxury Bank Card Visualization */}
      <div className="relative w-full max-w-sm mx-auto aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950 p-6 shadow-2xl border border-amber-400/40 text-left text-amber-100 flex flex-col justify-between overflow-hidden group">
        {/* Subtle Card Background Pattern */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-44 h-44 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-44 h-44 rounded-full bg-amber-300/10 blur-xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-200/80">
            {bankName}
          </span>
          <CreditCard className="w-7 h-7 text-amber-300/80" />
        </div>

        {/* Card Chip & Number */}
        <div className="z-10 my-auto">
          <div className="w-9 h-6 rounded-md bg-amber-300/30 border border-amber-200/50 mb-3 shadow-inner" />
          <p className="font-mono text-lg sm:text-xl font-bold tracking-[0.2em] text-white drop-shadow-md">
            {cardNumber}
          </p>
        </div>

        {/* Bottom Card Holder */}
        <div className="flex items-end justify-between z-10 pt-2">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-amber-200/60">Karta Egasi</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-100">{cardHolder}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-amber-950 text-[10px] font-bold uppercase tracking-wider shadow-md hover:bg-amber-300 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Nusxalandi" : "Nusxalash"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Pay Quick Action Links */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`https://payme.uz/fallback/pay?card=${cleanCardNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sky-500/40 bg-sky-500/10 text-sky-400 text-xs font-bold hover:bg-sky-500/20 transition-colors"
        >
          <span>Payme orqali</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
        <a
          href={`https://click.uz/uz`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-colors"
        >
          <span>Click.uz orqali</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
