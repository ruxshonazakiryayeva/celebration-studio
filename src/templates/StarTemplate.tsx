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
import { MotifMoon, MotifStar, MotifStarline } from "@/components/motifs";
import { formatUzDate, formatUzTime, formatUzWeekday, type TemplateComponentProps } from "@/lib/invite-types";

const stars = [
  { top: "8%", left: "12%", size: "h-5 w-5", delay: "0s" },
  { top: "18%", left: "78%", size: "h-7 w-7", delay: "1.1s" },
  { top: "34%", left: "8%", size: "h-4 w-4", delay: "2.2s" },
  { top: "6%", left: "56%", size: "h-3 w-3", delay: "0.6s" },
];

export default function StarTemplate({ invite }: TemplateComponentProps) {
  return (
    <div className="tpl-star min-h-screen bg-background text-foreground">
      <IntroVeil
        subtitle="Tug'ilgan kun taklifnomasi"
        title={invite.name}
        motif={<MotifMoon className="h-24 w-20 draw-stroke" />}
      />

      {invite.music_url ? <MusicToggle src={invite.music_url} /> : null}

      <header className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-0">
          {stars.map((s) => (
            <MotifStar
              key={`${s.top}-${s.left}`}
              className={`absolute ${s.size} text-motif/40 float-slow`}
              style={{ top: s.top, left: s.left, animationDelay: s.delay }}
            />
          ))}
        </div>
        <div className="relative mx-auto max-w-xl">
          <MotifMoon className="mx-auto h-32 w-24 text-motif draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-motif">Yulduzli tush bayrami</p>
          <h1 className="mt-5 font-display text-[3.1rem] leading-[0.98] text-foreground sm:text-6xl">
            {invite.name}
          </h1>
          {invite.age ? (
            <p className="mt-5 inline-flex items-center gap-3 rounded-full border border-motif/40 px-6 py-2 font-display text-xl text-motif">
              <MotifStar className="h-4 w-4" /> {invite.age} yosh
              <MotifStar className="h-4 w-4" />
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-center gap-2">
            <span className="font-display text-3xl text-foreground">
              {formatUzDate(invite.event_date)}
            </span>
            <span className="text-[10px] tracking-editorial text-muted-foreground">
              {formatUzWeekday(invite.event_date)} · soat {formatUzTime(invite.event_date)}
            </span>
          </div>
          <MotifStarline className="mx-auto mt-10 h-7 w-48 text-motif" />
        </div>
      </header>

      <Section className="pt-0">
        <GreetingBlock invite={invite} />
      </Section>

      <Section className="pt-4">
        <Reveal className="rounded-[2rem] border border-border bg-card/70 px-6 py-10 text-center shadow-soft">
          <Eyebrow>Sehr boshlanishiga</Eyebrow>
          <div className="mt-8">
            <Countdown date={invite.event_date} />
          </div>
        </Reveal>
      </Section>

      <Divider motif={<MotifStar className="h-6 w-6" />} />

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
        <CoverBlock invite={invite} />
      </Section>

      <Section className="pt-0">
        <GalleryBlock invite={invite} />
      </Section>

      <Divider motif={<MotifMoon className="h-12 w-10" />} />

      <Section>
        <WishesBlock invite={invite} />
      </Section>

      <FooterCredit />
    </div>
  );
}
