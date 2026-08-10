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
import { MotifButterfly, MotifFlower, MotifSprig } from "@/components/motifs";
import { formatUzDate, formatUzTime, formatUzWeekday, type TemplateComponentProps } from "@/lib/invite-types";

export default function FloralTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-floral min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifFlower className="h-24 w-20 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-14 pt-20 text-center sm:pt-24">
        <MotifButterfly className="pointer-events-none absolute left-4 top-12 h-14 w-16 text-motif/45 float-slow" />
        <MotifButterfly className="pointer-events-none absolute right-6 top-32 h-10 w-12 text-accent/60 float-slow" />
        <div className="relative mx-auto max-w-xl">
          <MotifFlower className="mx-auto h-32 w-24 text-motif draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">Bahorona tug'ilgan kun</p>
          <h1 className="mt-5 font-display text-[3rem] italic leading-[1] text-foreground sm:text-6xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-4 font-display text-2xl text-accent-foreground/80">
              {invite.age} yoshga to'ladi
            </p>
          ) : null}
          <div className="mt-8 inline-flex flex-col items-center rounded-3xl border border-border bg-card/70 px-8 py-5 shadow-soft">
            <span className="font-display text-2xl text-foreground">
              {formatUzDate(invite.event_date)}
            </span>
            <span className="mt-2 text-[10px] tracking-editorial text-muted-foreground">
              {formatUzWeekday(invite.event_date)} · {formatUzTime(invite.event_date)}
            </span>
          </div>
        </div>
      </header>

      <Section className="pt-6">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifSprig className="h-6 w-28" />} />

      <Section className="pt-0">
        <CoverBlock invite={invite} />
      </Section>

      <Section>
        <Reveal className="text-center">
          <Eyebrow>Bayramgacha qoldi</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Divider motif={<MotifFlower className="h-12 w-9" />} />

      <Section>
        <ScheduleBlock invite={invite} />
      </Section>

      <Section className="bg-surface/60">
        <LocationBlock invite={invite} />
      </Section>

      <Section>
        <DressCodeBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      <Divider motif={<MotifButterfly className="h-9 w-11" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
