import { useState } from "react";
import { CheckCircle2, UserCheck, Users, XCircle, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

interface RsvpBlockProps {
  inviteId?: string;
  hostName: string;
  eventDate: string;
}

export function RsvpBlock({ hostName, eventDate }: RsvpBlockProps) {
  const [attendance, setAttendance] = useState<"yes" | "family" | "no">("yes");
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setSubmitted(true);

    // Save locally so the guest response persists
    try {
      const existing = JSON.parse(localStorage.getItem("celebration_rsvps") || "[]");
      existing.push({
        hostName,
        guestName,
        attendance,
        guestCount,
        note,
        date: new Date().toISOString(),
      });
      localStorage.setItem("celebration_rsvps", JSON.stringify(existing));
    } catch {
      // Ignore localstorage errors
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-amber-500/30 bg-card/95 p-6 sm:p-10 shadow-2xl backdrop-blur-md text-center">
      <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500 mb-2">
        <HeartHandshake className="w-4 h-4" />
        <span>Tashrifingizni Tasdiqlang</span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-3">
        Bayramimizda qatnashasizmi?
      </h3>
      <p className="text-xs text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
        Tashrifingiz biz uchun juda qadrli. Iltimos, joylarni to'g'ri rejalashtirishimiz uchun javobingizni qoldiring.
      </p>

      {submitted ? (
        <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center animate-fade-in">
          <CheckCircle2 className="w-12 h-12 text-amber-500 mx-auto mb-3 animate-bounce" />
          <h4 className="font-serif text-xl text-foreground font-semibold">Tashakkur, {guestName}!</h4>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Javobingiz qabul qilindi. {hostName} sizni intiqlik bilan kutadi!
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-amber-500 underline hover:text-amber-400"
          >
            Javobni o'zgartirish
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Attendance Radio Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setAttendance("yes")}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer",
                attendance === "yes"
                  ? "border-amber-500 bg-amber-500/15 text-foreground ring-2 ring-amber-500/30 shadow-lg"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-amber-500/40"
              )}
            >
              <UserCheck className={cn("w-6 h-6 mb-2", attendance === "yes" ? "text-amber-500" : "text-muted-foreground")} />
              <span className="text-xs font-semibold">Ha, boraman</span>
              <span className="text-[10px] opacity-70 mt-0.5">Yolg'iz kelaman</span>
            </button>

            <button
              type="button"
              onClick={() => setAttendance("family")}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer",
                attendance === "family"
                  ? "border-amber-500 bg-amber-500/15 text-foreground ring-2 ring-amber-500/30 shadow-lg"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-amber-500/40"
              )}
            >
              <Users className={cn("w-6 h-6 mb-2", attendance === "family" ? "text-amber-500" : "text-muted-foreground")} />
              <span className="text-xs font-semibold">Oilamiz bilan</span>
              <span className="text-[10px] opacity-70 mt-0.5">Birga kelamiz</span>
            </button>

            <button
              type="button"
              onClick={() => setAttendance("no")}
              className={cn(
                "flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer",
                attendance === "no"
                  ? "border-rose-500 bg-rose-500/15 text-foreground ring-2 ring-rose-500/30 shadow-lg"
                  : "border-border/60 bg-surface/50 text-muted-foreground hover:border-rose-500/40"
              )}
            >
              <XCircle className={cn("w-6 h-6 mb-2", attendance === "no" ? "text-rose-500" : "text-muted-foreground")} />
              <span className="text-xs font-semibold">Borolmayman</span>
              <span className="text-[10px] opacity-70 mt-0.5">Afsus, borolmayman</span>
            </button>
          </div>

          {/* Guest Details Input */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Ism va familiyangiz *
              </label>
              <input
                type="text"
                required
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Masalan: Sardor va Malika Rahimovlar"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {attendance !== "no" && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Necha kishi bo'lib kelasiz?
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={cn(
                        "flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all",
                        guestCount === num
                          ? "border-amber-500 bg-amber-500/20 text-amber-500"
                          : "border-border bg-background text-muted-foreground hover:border-amber-500/40"
                      )}
                    >
                      {num === 4 ? "4+ kishi" : `${num} kishi`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                Tashakkur yoki tilaklaringiz
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ezg'u tilaklaringizni yozing..."
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-amber-950 text-xs font-bold uppercase tracking-widest shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-95 transition-all duration-300"
          >
            Tashrifni Tasdiqlash
          </button>
        </form>
      )}
    </div>
  );
}
