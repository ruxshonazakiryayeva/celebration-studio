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
import { MotifPearlLine, MotifRose, MotifWreath } from "@/components/motifs";
import {
  formatUzDate,
  formatUzTime,
  formatUzWeekday,
  type TemplateComponentProps,
} from "@/lib/invite-types";

export default function RoseTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-rose min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifRose className="h-24 w-18 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-foil opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
        <div className="relative mx-auto max-w-xl">
          <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
            <MotifWreath className="absolute inset-0 h-44 w-44 text-motif/70 draw-stroke" />
            <MotifRose className="h-20 w-16 text-motif" />
          </div>
          <p className="mt-6 text-[10px] tracking-editorial text-motif">
            Nafis oqshomga taklif qilamiz
          </p>
          <h1 className="mt-5 font-display text-[3.25rem] italic leading-[0.95] text-foreground sm:text-7xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-5 font-display text-2xl text-motif sm:text-3xl">{invite.age} yosh</p>
          ) : null}
          <MotifPearlLine className="mx-auto mt-8 h-6 w-52 text-motif" />
          <div className="mt-6 flex items-center justify-center gap-4 text-[11px] tracking-editorial text-foreground/70">
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

      <Divider motif={<MotifRose className="h-12 w-9" />} />

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

      <Divider motif={<MotifPearlLine className="h-5 w-32" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
