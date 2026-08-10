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
import { MotifBunting, MotifCake, MotifConfettiLine } from "@/components/motifs";
import {
  formatUzDate,
  formatUzTime,
  formatUzWeekday,
  type TemplateComponentProps,
} from "@/lib/invite-types";

export default function CarnivalTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-carnival min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifCake className="h-24 w-20 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-14 text-center">
        <MotifBunting className="mx-auto h-14 w-full max-w-md text-motif" />
        <div className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-52 max-w-2xl bg-grain opacity-40" />
        <div className="relative mx-auto mt-8 max-w-xl">
          <MotifCake className="mx-auto h-28 w-24 text-motif draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">Bayramga marhamat</p>
          <h1 className="mt-5 font-display text-[3.25rem] leading-[0.95] text-foreground sm:text-7xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-5 font-display text-3xl text-motif">{invite.age} yosh</p>
          ) : null}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-4 rounded-full border border-border bg-card/70 px-7 py-3 text-[11px] tracking-editorial text-foreground/75">
            <span>{formatUzDate(invite.event_date)}</span>
            <span className="h-3 w-px bg-border" />
            <span>{formatUzTime(invite.event_date)}</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{formatUzWeekday(invite.event_date)}</p>
          <MotifConfettiLine className="mx-auto mt-9 h-8 w-52 text-motif" />
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Divider motif={<MotifConfettiLine className="h-6 w-28" />} />

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

      <Divider motif={<MotifCake className="h-12 w-10" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
