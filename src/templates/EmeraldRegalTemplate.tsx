import { useState } from "react";
import { EnvelopeOpening } from "@/components/invite/EnvelopeOpening";
import { MusicToggle } from "@/components/invite/MusicToggle";
import { Countdown } from "@/components/invite/Countdown";
import { RsvpBlock } from "@/components/invite/RsvpBlock";
import { GiftRegistryBlock } from "@/components/invite/GiftRegistryBlock";
import { Reveal } from "@/components/invite/Reveal";
import {
  CoverBlock,
  Divider,
  DressCodeBlock,
  Eyebrow,
  FooterCredit,
  GalleryBlock,
  GreetingBlock,
  LocationBlock,
  ScheduleBlock,
  Section,
  WishesBlock,
} from "@/components/invite/sections";
import { MotifLaurel, MotifRibbon, MotifCrest, MotifCrownLine } from "@/components/motifs";
import { formatUzDate, formatUzTime, formatUzWeekday, type TemplateComponentProps } from "@/lib/invite-types";
import { Sparkles, Gem } from "lucide-react";

export default function EmeraldRegalTemplate({ invite }: TemplateComponentProps) {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);

  return (
    <div className="tpl-emerald min-h-screen bg-[#081814] text-emerald-50 relative overflow-hidden font-sans">
      {/* Interactive Envelope Overlay */}
      <EnvelopeOpening
        hostName={invite.name}
        sealText="OCHISH"
        styleVariant="emerald"
        onOpen={() => setHasOpenedEnvelope(true)}
      />

      {/* Floating Music Player */}
      <MusicToggle src={invite.music_url} autoPlay={hasOpenedEnvelope} />

      {/* Deep Emerald & Gold Glow Effect */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-emerald-500/20 via-teal-900/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-radial from-amber-400/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Corner Ornaments */}
      <div className="pointer-events-none fixed inset-4 z-20 border border-emerald-400/20 rounded-3xl" />
      <div className="pointer-events-none absolute top-6 left-6 text-emerald-400/50 z-20">
        <svg width="40" height="40" viewBox="0 0 80 80" fill="none"><path d="M4 4 L4 40 M4 4 L40 4" stroke="currentColor" strokeWidth="2" /><circle cx="4" cy="4" r="3" fill="currentColor" /></svg>
      </div>
      <div className="pointer-events-none absolute top-6 right-6 text-emerald-400/50 z-20">
        <svg width="40" height="40" viewBox="0 0 80 80" fill="none"><path d="M76 4 L76 40 M76 4 L40 4" stroke="currentColor" strokeWidth="2" /><circle cx="76" cy="4" r="3" fill="currentColor" /></svg>
      </div>

      {/* Header */}
      <header className="relative z-10 overflow-hidden px-6 pb-16 pt-24 text-center sm:pt-32">
        <div className="mx-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-400/40 bg-emerald-950/80 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300 mb-6 shadow-gold-glow">
            <Gem className="w-4 h-4 text-amber-400" />
            <span>Qirollik Taklifnomasi</span>
            <Gem className="w-4 h-4 text-amber-400" />
          </div>

          <MotifCrest className="mx-auto h-24 w-20 text-amber-400 drop-shadow-lg" />
          
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-amber-300/90 font-marcellus font-semibold">
            Shohana marosimga marhamat qiling
          </p>

          <h1 className="mt-4 font-great-vibes text-6xl sm:text-8xl leading-tight tracking-wide text-gradient-gold drop-shadow-2xl">
            {invite.name}
          </h1>

          {invite.age ? (
            <p className="mt-2 font-cormorant text-2xl text-amber-300/90 sm:text-3xl italic">
              {invite.age} yoshlik tantana
            </p>
          ) : null}

          {/* Date Badge */}
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-8 py-4 rounded-2xl border border-emerald-500/30 bg-[#0C221C]/90 backdrop-blur-md shadow-2xl">
            <span className="font-serif text-lg text-emerald-200">{formatUzDate(invite.event_date)}</span>
            <span className="hidden sm:inline-block h-4 w-px bg-emerald-500/40" />
            <span className="text-sm font-semibold tracking-wider text-amber-300/90 uppercase">{formatUzTime(invite.event_date)} soatda</span>
            <span className="hidden sm:inline-block h-4 w-px bg-emerald-500/40" />
            <span className="text-xs text-emerald-400/70 font-medium uppercase tracking-widest">{formatUzWeekday(invite.event_date)}</span>
          </div>

          <MotifRibbon className="mx-auto mt-10 h-8 w-52 text-emerald-400/80" />
        </div>
      </header>

      {/* Main Sections */}
      <Section className="relative z-10 pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifCrownLine className="h-10 w-8 text-amber-400" />} />

      <Section className="relative z-10">
        <Reveal className="text-center">
          <Eyebrow>Tantanagacha qolgan vaqt</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Divider motif={<MotifLaurel className="h-12 w-9 text-emerald-400" />} />

      <Section className="relative z-10">
        <ScheduleBlock invite={invite} />
      </Section>

      <Section className="relative z-10 bg-[#0C221C]/70 rounded-3xl border border-emerald-500/30 backdrop-blur-md my-8">
        <LocationBlock invite={invite} />
      </Section>

      <Section className="relative z-10">
        <DressCodeBlock invite={invite} />
      </Section>

      <Section className="relative z-10 pt-0">
        <CoverBlock invite={invite} />
      </Section>

      <Section className="relative z-10 pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      {/* RSVP & Gift Registry */}
      <Section className="relative z-10">
        <RsvpBlock hostName={invite.name} eventDate={invite.event_date} />
      </Section>

      <Section className="relative z-10">
        <GiftRegistryBlock
          cardNumber={invite.gift_card_number}
          cardHolder={invite.gift_card_holder || invite.name}
          bankName={invite.gift_card_bank || "Uzcard / Humo"}
        />
      </Section>

      <Divider motif={<MotifRibbon className="h-7 w-32 text-emerald-400" />} />

      <Section className="relative z-10">
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
