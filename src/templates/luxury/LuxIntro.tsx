import { useState } from "react";
import { motion } from "framer-motion";

export function LuxIntro({ name }: { name: string }) {
  const [phase, setPhase] = useState<"closed" | "opening" | "gone">("closed");

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("gone"), 1150);
  };

  if (phase === "gone") return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: "var(--lux-bg)" }}>
      <motion.div
        className="lux-curtain absolute inset-y-0 left-0 w-1/2"
        style={{ borderRight: "1px solid var(--lux-line)" }}
        animate={phase === "opening" ? { x: "-101%" } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="lux-curtain absolute inset-y-0 right-0 w-1/2"
        style={{ borderLeft: "1px solid var(--lux-line)" }}
        animate={phase === "opening" ? { x: "101%" } : { x: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        animate={phase === "opening" ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="lux-eyebrow">Sizga taklifnoma</p>
        <h1 className="font-lux mt-5 text-5xl leading-tight sm:text-6xl">{name}</h1>
        <button className="lux-seal mt-12" onClick={open} aria-label="Taklifnomani ochish">✦</button>
        <p className="mt-6 text-xs tracking-[0.3em] uppercase" style={{ color: "var(--lux-muted)" }}>
          Muhrni oching
        </p>
      </motion.div>
    </div>
  );
}
