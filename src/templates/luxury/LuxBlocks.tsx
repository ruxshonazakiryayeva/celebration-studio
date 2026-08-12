import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { addWish, fetchWishes } from "@/lib/invites";
import type { Wish } from "@/lib/invite-types";

export function LuxReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

export function LuxCountdown({ date }: { date: string }) {
  const target = useMemo(() => new Date(date).getTime(), [date]);
  const [left, setLeft] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setLeft(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const s = Math.floor(left / 1000);
  const cells = [
    { v: Math.floor(s / 86400), l: "kun" },
    { v: Math.floor((s % 86400) / 3600), l: "soat" },
    { v: Math.floor((s % 3600) / 60), l: "daqiqa" },
    { v: s % 60, l: "soniya" },
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {cells.map((c) => (
        <div key={c.l} className="lux-tile">
          <span className="font-lux text-3xl sm:text-4xl" style={{ color: "var(--lux-gold)" }}>
            {String(c.v).padStart(2, "0")}
          </span>
          <span className="lux-tile-label">{c.l}</span>
        </div>
      ))}
    </div>
  );
}

export function LuxGift({ number, owner }: { number: string | null; owner: string | null }) {
  const [copied, setCopied] = useState(false);
  if (!number) return null;
  const pretty = number.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(number.replace(/\s+/g, ""));
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard bloklangan */ }
  };
  return (
    <div className="lux-frame relative overflow-hidden p-6 text-center">
      <p className="lux-eyebrow">Pul sovg'asi uchun</p>
      {owner ? <p className="font-lux mt-3 text-xl" style={{ color: "var(--lux-ivory)" }}>{owner}</p> : null}
      <p className="font-lux mt-2 text-2xl tracking-wider" style={{ color: "var(--lux-gold)" }}>{pretty}</p>
      <button className="lux-btn mt-5" onClick={copy}>{copied ? "Nusxalandi ✓" : "Kartani nusxalash"}</button>
    </div>
  );
}

export function LuxGallery({ urls }: { urls: string[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  if (!urls?.length) return null;
  const step = (d: number) => setIdx((p) => (p === null ? p : (p + d + urls.length) % urls.length));
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {urls.map((u, i) => (
          <motion.button key={i} className="lux-gallery-item" whileHover={{ scale: 1.03 }} onClick={() => setIdx(i)}>
            <img src={u} alt="" loading="lazy" />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {idx !== null && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIdx(null)}>
            <motion.img key={idx} src={urls[idx]} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="max-h-[85vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute left-3 top-1/2 -translate-y-1/2 text-3xl px-3" style={{ color: "var(--lux-gold)" }}
              onClick={(e) => { e.stopPropagation(); step(-1); }}>‹</button>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-3xl px-3" style={{ color: "var(--lux-gold)" }}
              onClick={(e) => { e.stopPropagation(); step(1); }}>›</button>
            <button className="absolute right-4 top-4 text-2xl" style={{ color: "var(--lux-ivory)" }}
              onClick={() => setIdx(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LuxMap({ name, url }: { name: string | null; url: string | null }) {
  if (!name && !url) return null;
  const q = encodeURIComponent(name || "Toshkent");
  return (
    <div className="lux-frame overflow-hidden">
      <iframe title="Xarita" src={`https://www.google.com/maps?q=${q}&output=embed`}
        className="h-64 w-full border-0" loading="lazy" />
      <div className="p-4 text-center">
        <a className="lux-link" href={url || `https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">
          Yo'nalish olish →
        </a>
      </div>
    </div>
  );
}

export function LuxWishes({ inviteId }: { inviteId: string }) {
  const [items, setItems] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  useEffect(() => { fetchWishes(inviteId).then(setItems).catch(() => {}); }, [inviteId]);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    await addWish(inviteId, name.trim(), msg.trim());
    setItems((p) => [{ id: crypto.randomUUID(), guest_name: name.trim(), message: msg.trim(), created_at: new Date().toISOString() }, ...p]);
    setName(""); setMsg(""); setSent(true); setTimeout(() => setSent(false), 2500);
  };
  return (
    <div>
      <form onSubmit={submit} className="lux-frame space-y-3 p-5">
        <input className="lux-input" placeholder="Ismingiz" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="lux-input" rows={3} placeholder="Tilagingiz..." value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className="lux-btn w-full" type="submit">{sent ? "Yuborildi ✓" : "Tilak qoldirish"}</button>
      </form>
      <div className="mt-6 space-y-4">
        {items.map((w) => (
          <div key={w.id} className="rounded-xl border p-4" style={{ borderColor: "var(--lux-line)", background: "var(--lux-surface)" }}>
            <p className="font-lux text-lg" style={{ color: "var(--lux-gold-soft)" }}>{w.guest_name}</p>
            <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--lux-ivory)" }}>{w.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LuxRsvp({ inviteId }: { inviteId: string }) {
  const [name, setName] = useState("");
  const [attend, setAttend] = useState<boolean | null>(null);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || attend === null) { setErr("Ismingizni va ishtirokni belgilang"); return; }
    const { error } = await supabase.from("rsvp_responses").insert({
      invite_id: inviteId, guest_name: name.trim(), will_attend: attend,
      adults_count: adults, kids_count: kids, allergies: note.trim() || null,
    });
    if (error) { setErr("Yuborilmadi — qayta urinib ko'ring"); return; }
    setDone(true);
  };

  if (done) return (
    <div className="lux-frame p-8 text-center">
      <p className="text-3xl" style={{ color: "var(--lux-gold)" }}>✓</p>
      <p className="font-lux mt-3 text-2xl">Rahmat, {name}!</p>
      <p className="mt-2 text-sm" style={{ color: "var(--lux-muted)" }}>Javobingiz qabul qilindi.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="lux-frame space-y-4 p-5">
      <input className="lux-input" placeholder="Ismingiz" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="lux-btn" style={attend === true ? {} : { opacity: 0.45 }} onClick={() => setAttend(true)}>Boraman ✓</button>
        <button type="button" className="lux-btn" style={attend === false ? {} : { opacity: 0.45 }} onClick={() => setAttend(false)}>Bora olmayman</button>
      </div>
      {attend === true && (
        <>
          <div className="flex items-center justify-between text-sm">
            <span>Kattalar</span>
            <span className="flex items-center gap-3">
              <button type="button" className="lux-step" onClick={() => setAdults(Math.max(1, adults - 1))}>−</button>
              {adults}
              <button type="button" className="lux-step" onClick={() => setAdults(Math.min(20, adults + 1))}>+</button>
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Bolalar</span>
            <span className="flex items-center gap-3">
              <button type="button" className="lux-step" onClick={() => setKids(Math.max(0, kids - 1))}>−</button>
              {kids}
              <button type="button" className="lux-step" onClick={() => setKids(Math.min(20, kids + 1))}>+</button>
            </span>
          </div>
          <input className="lux-input" placeholder="Allergiya / tilaklar (ixtiyoriy)" value={note} onChange={(e) => setNote(e.target.value)} />
        </>
      )}
      {err ? <p className="text-xs" style={{ color: "hsl(0 70% 65%)" }}>{err}</p> : null}
      <button className="lux-btn w-full" type="submit">Javobni yuborish</button>
    </form>
  );
}
