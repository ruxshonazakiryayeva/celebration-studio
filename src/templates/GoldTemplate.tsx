import { Countdown } from "@/components/invite/Countdown";
import { IntroVeil } from "@/components/invite/IntroVeil";
import { MusicToggle } from "@/components/invite/MusicToggle";
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

export default function GoldTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-gold min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifCandle className="h-24 w-16 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      {/* Hero */}
      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-40 max-w-3xl bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gilt)_22%,transparent),transparent_70%)]" />
        <div className="relative mx-auto max-w-xl">
          <MotifLaurel className="mx-auto h-28 w-20 text-motif draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">
            Sizni bayramga taklif qilamiz
          </p>
          <h1 className="mt-6 font-display text-[3.25rem] leading-[0.95] text-foreground sm:text-7xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-5 font-display text-2xl text-motif sm:text-3xl">
              {invite.age} yoshlik yubiley
            </p>
          ) : null}
          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] tracking-editorial text-foreground/70">
            <span>{formatUzDate(invite.event_date)}</span>
            <span className="h-3 w-px bg-border" />
            <span>{formatUzTime(invite.event_date)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{formatUzWeekday(invite.event_date)}</p>
          <MotifRibbon className="mx-auto mt-10 h-8 w-52 text-motif" />
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifCandle className="h-10 w-7" />} />

      <Section>
        <Reveal className="text-center">
          <Eyebrow>Bayramgacha</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Divider motif={<MotifLaurel className="h-12 w-9" />} />

      <Section>
        <ScheduleBlock invite={invite} />
      </Section>

      <Section className="bg-surface/70">
        <LocationBlock invite={invite} />
      </Section>

      <Section>
        <DressCodeBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <CoverBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      <Divider motif={<MotifRibbon className="h-7 w-32" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
