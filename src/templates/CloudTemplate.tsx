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
import { MotifBalloon, MotifCloud, MotifRainbowLine } from "@/components/motifs";
import {
  formatUzDate,
  formatUzTime,
  formatUzWeekday,
  type TemplateComponentProps,
} from "@/lib/invite-types";

export default function CloudTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-cloud min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifCloud className="h-16 w-28 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--motif)_16%,transparent),transparent_65%)]" />
        <MotifCloud className="pointer-events-none absolute -left-6 top-10 h-16 w-28 text-motif/30 float-slow" />
        <MotifCloud className="pointer-events-none absolute -right-8 top-32 h-14 w-24 text-motif/25 float-slow" />
        <div className="relative mx-auto max-w-xl">
          <MotifBalloon className="mx-auto h-32 w-20 text-motif sway" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">Bizni quvontirgani keling</p>
          <h1 className="mt-5 font-display text-[3.25rem] leading-[0.95] text-foreground sm:text-7xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-5 inline-flex items-center rounded-full border border-motif/40 px-6 py-2 font-display text-2xl text-motif">
              {invite.age} yosh
            </p>
          ) : null}
          <div className="mt-8 flex items-center justify-center gap-4 text-[11px] tracking-editorial text-foreground/70">
            <span>{formatUzDate(invite.event_date)}</span>
            <span className="h-3 w-px bg-border" />
            <span>{formatUzTime(invite.event_date)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{formatUzWeekday(invite.event_date)}</p>
          <MotifRainbowLine className="mx-auto mt-10 h-9 w-56 text-motif" />
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifCloud className="h-7 w-12" />} />

      <Section>
        <Reveal className="text-center">
          <Eyebrow>Bayramgacha</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Section className="bg-surface/70">
        <ScheduleBlock invite={invite} />
      </Section>

      <Section>
        <LocationBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <DressCodeBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <CoverBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      <Divider motif={<MotifBalloon className="h-12 w-8" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
