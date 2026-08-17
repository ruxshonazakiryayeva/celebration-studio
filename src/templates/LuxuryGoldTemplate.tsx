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
import { MotifCandle, MotifLaurel, MotifRibbon } from "@/components/motifs";
import { formatUzDate, formatUzTime, formatUzWeekday, type TemplateComponentProps } from "@/lib/invite-types";
import { Sparkles, Heart } from "lucide-react";

export default function LuxuryGoldTemplate({ invite }: TemplateComponentProps) {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);

  return (
    <div className="tpl-gold min-h-screen bg-zinc-950 text-amber-50 relative overflow-hidden font-sans">
      {/* Interactive Envelope Overlay */}
      <EnvelopeOpening
        hostName={invite.name}
        sealText="OCHISH"
        styleVariant="gold"
        onOpen={() => setHasOpenedEnvelope(true)}
      />

      {/* Floating Music Player with Auto-Play */}
      <MusicToggle src={invite.music_url} autoPlay={hasOpenedEnvelope} />

      {/* Ambient Radial Lighting & Stars */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-amber-500/15 via-amber-600/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-radial from-amber-400/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Hero Header */}
      <header className="relative z-10 overflow-hidden px-6 pb-16 pt-24 text-center sm:pt-32">
        <div className="mx-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "5s" }} />
            <span>Tantanali Taklifnoma</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "5s" }} />
          </div>

          <MotifLaurel className="mx-auto h-28 w-20 text-amber-400 draw-stroke drop-shadow-md" />
          
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-amber-300/80 font-medium">
            Sizni qadrdonlar davrasiga taklif etamiz
          </p>

          <h1 className="mt-6 font-serif text-5xl sm:text-7xl leading-[1.05] tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent font-normal drop-shadow-lg">
            {invite.name}
          </h1>

          {invite.age ? (
            <p className="mt-4 font-serif text-2xl text-amber-300/90 sm:text-3xl">
              {invite.age} yoshlik tantanali yubiley
            </p>
          ) : null}

          {/* Date & Time Badge */}
          <div className="mt-10 inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 px-8 py-4 rounded-2xl border border-amber-400/30 bg-zinc-900/80 backdrop-blur-md shadow-2xl">
            <span className="font-serif text-lg text-amber-200">{formatUzDate(invite.event_date)}</span>
            <span className="hidden sm:inline-block h-4 w-px bg-amber-400/40" />
            <span className="text-sm font-semibold tracking-wider text-amber-300/90 uppercase">{formatUzTime(invite.event_date)} soatda</span>
            <span className="hidden sm:inline-block h-4 w-px bg-amber-400/40" />
            <span className="text-xs text-amber-400/70 font-medium uppercase tracking-widest">{formatUzWeekday(invite.event_date)}</span>
          </div>

          <MotifRibbon className="mx-auto mt-10 h-8 w-52 text-amber-400/80" />
        </div>
      </header>

      {/* Greeting Block */}
      <Section className="relative z-10 pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifCandle className="h-10 w-7 text-amber-400" />} />

      {/* Countdown Timer Section */}
      <Section className="relative z-10">
        <Reveal className="text-center">
          <Eyebrow>Tantanaga qadar</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Divider motif={<MotifLaurel className="h-12 w-9 text-amber-400" />} />

      {/* Agenda & Schedule Section */}
      <Section className="relative z-10">
        <ScheduleBlock invite={invite} />
      </Section>

      {/* Location Section */}
      <Section className="relative z-10 bg-zinc-900/60 rounded-3xl border border-amber-500/20 backdrop-blur-md my-8">
        <LocationBlock invite={invite} />
      </Section>

      {/* Dress Code Section */}
      <Section className="relative z-10">
        <DressCodeBlock invite={invite} />
      </Section>

      {/* Cover Image & Gallery */}
      <Section className="relative z-10 pt-0">
        <CoverBlock invite={invite} />
      </Section>

      <Section className="relative z-10 pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      {/* Interactive RSVP Section */}
      <Section className="relative z-10">
        <RsvpBlock hostName={invite.name} eventDate={invite.event_date} />
      </Section>

      {/* Bank Card / Monetary Gift Registry Section */}
      <Section className="relative z-10">
        <GiftRegistryBlock
          cardNumber={invite.gift_card_number}
          cardHolder={invite.gift_card_holder || invite.name}
          bankName={invite.gift_card_bank || "Uzcard / Humo"}
        />
      </Section>

      <Divider motif={<MotifRibbon className="h-7 w-32 text-amber-400" />} />

      {/* Wishes Section */}
      <Section className="relative z-10">
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
