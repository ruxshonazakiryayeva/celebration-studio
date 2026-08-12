import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MotifLaurel } from "@/components/motifs";
import {
  buildAgenda, dressCodeLabel, formatUzDate, formatUzTime, formatUzWeekday,
  parseSwatches, type TemplateComponentProps,
} from "@/lib/invite-types";
import "./luxury/luxury.css";
import { LuxIntro } from "./luxury/LuxIntro";
import { LuxMusic } from "./luxury/LuxMusic";
import { LuxCountdown, LuxGallery, LuxGift, LuxMap, LuxReveal, LuxRsvp, LuxWishes } from "./luxury/LuxBlocks";

function LuxParticles() {
  const parts = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    left: (i * 53) % 100, delay: (i * 0.7) % 6, dur: 9 + (i % 5) * 2, size: 3 + (i % 3) * 2,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {parts.map((p, i) => (
        <span key={i} className="lux-particle" style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s` }} />
      ))}
    </div>
  );
}

function Section({ children, eyebrow }: { children: React.ReactNode; eyebrow?: string }) {
  return (
    <section className="relative z-10 mx-auto max-w-2xl px-6 py-12">
      <LuxReveal>
        {eyebrow ? (
          <>
            <p className="lux-eyebrow text-center">{eyebrow}</p>
            <div className="lux-divider mt-4 mb-8"><span>✦</span></div>
          </>
        ) : null}
        {children}
      </LuxReveal>
    </section>
  );
}

export default function GoldTemplate({ invite }: TemplateComponentProps) {
  const { scrollY } = useScroll();
  const yOrn = useTransform(scrollY, [0, 500], [0, 90]);
  const yName = useTransform(scrollY, [0, 500], [0, 40]);
  const agenda = useMemo(() => buildAgenda(invite.event_date), [invite.event_date]);
  const swatches = parseSwatches(invite.dress_code);

  return (
    <div className="tpl-lux relative">
      <LuxIntro name={invite.name} />
      {invite.music_url ? <LuxMusic src={invite.music_url} /> : null}
      <LuxParticles />

      <header className="relative overflow-hidden px-6 pb-16 pt-24 text-center">
        <motion.div style={{ y: yOrn }} className="pointer-events-none absolute inset-x-4 top-8 flex justify-between opacity-50">
          <span style={{ color: "var(--lux-gold)", transform: "scaleX(-1)", display: "inline-block" }}><MotifLaurel className="h-40 w-28" /></span>
          <span style={{ color: "var(--lux-gold)", display: "inline-block" }}><MotifLaurel className="h-40 w-28" /></span>
        </motion.div>
        <motion.div style={{ y: yName }} className="relative mx-auto max-w-xl">
          <p className="lux-eyebrow">Taklifnoma</p>
          <h1 className="font-lux mt-6 text-6xl leading-[0.95] sm:text-7xl">{invite.name}</h1>
          {invite.age ? <p className="font-lux mt-4 text-2xl italic" style={{ color: "var(--lux-gold-soft)" }}>{invite.age} yoshlik yubiley</p> : null}
          <div className="lux-divider mt-10"><span>✦</span></div>
          <p className="mt-6 text-sm tracking-wide" style={{ color: "var(--lux-muted)" }}>
            {formatUzDate(invite.event_date)} • {formatUzTime(invite.event_date)} • {formatUzWeekday(invite.event_date)}
          </p>
        </motion.div>
      </header>

      {invite.message ? (
        <Section>
          <p className="font-lux text-center text-2xl italic leading-relaxed" style={{ color: "var(--lux-ivory)" }}>
            "{invite.message}"
          </p>
        </Section>
      ) : null}

      <Section eyebrow="Bayramgacha qoldi">
        <LuxCountdown date={invite.event_date} />
      </Section>

      <Section eyebrow="Bayram jadvali">
        <div className="space-y-4">
          {agenda.map((a) => (
            <div key={a.time} className="flex items-center gap-4">
              <span className="font-lux text-xl" style={{ color: "var(--lux-gold)" }}>{a.time}</span>
              <span className="h-px flex-1" style={{ background: "var(--lux-line)" }} />
              <span className="text-sm" style={{ color: "var(--lux-ivory)" }}>{a.title}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Manzil">
        {invite.location_name ? <p className="mb-5 text-center text-sm" style={{ color: "var(--lux-ivory)" }}>{invite.location_name}</p> : null}
        <LuxMap name={invite.location_name} url={invite.location_url} />
      </Section>

      {invite.dress_code ? (
        <Section eyebrow="Dress-kod">
          <p className="text-center text-sm" style={{ color: "var(--lux-ivory)" }}>{dressCodeLabel(invite.dress_code)}</p>
          {swatches.length ? (
            <div className="mt-4 flex justify-center gap-3">
              {swatches.map((c) => <span key={c} className="lux-swatch" style={{ background: c }} />)}
            </div>
          ) : null}
        </Section>
      ) : null}

      {invite.gallery_urls?.length ? (
        <Section eyebrow="Lahzalar"><LuxGallery urls={invite.gallery_urls} /></Section>
      ) : null}

      <Section eyebrow="Sovg'a"><LuxGift number={invite.card_number} owner={invite.card_owner} /></Section>

      <Section eyebrow="Ishtirokni tasdiqlang"><LuxRsvp inviteId={invite.id} /></Section>

      <Section eyebrow="Tilaklar"><LuxWishes inviteId={invite.id} /></Section>

      <footer className="relative z-10 pb-10 text-center text-[11px] tracking-[0.25em] uppercase" style={{ color: "var(--lux-muted)" }}>
        Webinvite ✦ taklifnoma
      </footer>
    </div>
  );
}
