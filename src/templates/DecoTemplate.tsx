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
import { MotifDecoFan, MotifDecoLine, MotifSunburst } from "@/components/motifs";
import {
  formatUzDate,
  formatUzTime,
  formatUzWeekday,
  type TemplateComponentProps,
} from "@/lib/invite-types";

export default function DecoTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-deco min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Yubiley taklifnomasi"
        title={invite.name}
        motif={<MotifDecoFan className="h-20 w-26 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <MotifSunburst className="pointer-events-none absolute left-1/2 top-6 h-80 w-80 -translate-x-1/2 text-motif/15" />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
        <div className="relative mx-auto max-w-xl">
          <div className="mx-auto max-w-md border border-motif/40 px-8 py-12">
            <MotifDecoFan className="mx-auto h-20 w-24 text-motif draw-stroke" />
            <p className="mt-6 text-[10px] tracking-editorial text-motif">Tantanali oqshom</p>
            <h1 className="mt-5 font-display text-[3rem] uppercase leading-[0.95] tracking-[0.06em] text-foreground sm:text-6xl">
              {invite.name}
            </h1>
            {invite.age ? (
              <p className="mt-5 font-display text-3xl text-motif">{invite.age}</p>
            ) : null}
            <MotifDecoLine className="mx-auto mt-7 h-7 w-48 text-motif" />
            <div className="mt-6 flex items-center justify-center gap-4 text-[11px] tracking-editorial text-foreground/75">
              <span>{formatUzDate(invite.event_date)}</span>
              <span className="h-3 w-px bg-border" />
              <span>{formatUzTime(invite.event_date)}</span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {formatUzWeekday(invite.event_date)}
            </p>
          </div>
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifDecoLine className="h-6 w-28" />} />

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

      <Divider motif={<MotifDecoFan className="h-10 w-14" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
