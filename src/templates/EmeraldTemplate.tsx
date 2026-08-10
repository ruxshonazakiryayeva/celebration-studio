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
import { MotifCrest, MotifCrownLine, MotifGoblet } from "@/components/motifs";
import {
  formatUzDate,
  formatUzTime,
  formatUzWeekday,
  type TemplateComponentProps,
} from "@/lib/invite-types";

export default function EmeraldTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-emerald min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Yubiley taklifnomasi"
        title={invite.name}
        motif={<MotifCrest className="h-24 w-20 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-56 max-w-3xl bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gilt)_18%,transparent),transparent_70%)]" />
        <div className="relative mx-auto max-w-xl">
          <MotifCrest className="mx-auto h-28 w-24 text-motif draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">
            Sharafli yubileyga taklifnoma
          </p>
          <h1 className="mt-5 font-display text-[3.25rem] leading-[0.95] text-shimmer sm:text-7xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-6 inline-flex items-center gap-4 border-y border-motif/40 px-8 py-3 font-display text-3xl text-motif">
              {invite.age} yosh
            </p>
          ) : null}
          <MotifCrownLine className="mx-auto mt-8 h-9 w-56 text-motif" />
          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] tracking-editorial text-foreground/75">
            <span>{formatUzDate(invite.event_date)}</span>
            <span className="h-3 w-px bg-border" />
            <span>{formatUzTime(invite.event_date)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{formatUzWeekday(invite.event_date)}</p>
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifGoblet className="h-12 w-8" />} />

      <Section>
        <Reveal className="text-center">
          <Eyebrow>Bayramgacha</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Section className="bg-surface/80">
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

      <Divider motif={<MotifCrownLine className="h-7 w-32" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
