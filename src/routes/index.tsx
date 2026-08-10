import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, templates, type TemplateCategory } from "@/templates/registry";
import {
  MotifBalloon,
  MotifButterfly,
  MotifCake,
  MotifCandle,
  MotifChevronLine,
  MotifCloud,
  MotifConfettiLine,
  MotifCrest,
  MotifCrownLine,
  MotifDecoFan,
  MotifDecoLine,
  MotifFacet,
  MotifFan,
  MotifFlower,
  MotifLaurel,
  MotifMoon,
  MotifPearlLine,
  MotifRainbowLine,
  MotifRibbon,
  MotifRose,
  MotifSilkLine,
  MotifSprig,
  MotifStar,
  MotifStarline,
} from "@/components/motifs";
import { Reveal } from "@/components/invite/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital taklifnoma — 10 ta premium onlayn taklifnoma shabloni" },
      {
        name: "description",
        content:
          "Tug'ilgan kun taklifnomasini 5 daqiqada yarating: 10 ta premium shablon, shaxsiy havola, sanoq, manzil, dress-code va mehmonlar tilaklari.",
      },
      { property: "og:title", content: "Digital taklifnoma — premium tug'ilgan kun taklifnomalari" },
      {
        property: "og:description",
        content:
          "Bolalar, ayollar va yubiley uchun 10 ta nafis shablon. Shaxsiy havola va mehmonlar tabriklari bilan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const previewMotifs: Record<string, { hero: React.ReactNode; rule: React.ReactNode }> = {
  "nafis-oltin": {
    hero: <MotifLaurel className="mx-auto h-20 w-14" />,
    rule: <MotifRibbon className="mx-auto h-6 w-28" />,
  },
  "bahor-gullari": {
    hero: <MotifFlower className="mx-auto h-20 w-16" />,
    rule: <MotifSprig className="mx-auto h-5 w-24" />,
  },
  "yulduzli-tush": {
    hero: <MotifMoon className="mx-auto h-20 w-16" />,
    rule: <MotifStarline className="mx-auto h-5 w-24" />,
  },
  "kumush-tun": {
    hero: <MotifFacet className="mx-auto h-16 w-14" />,
    rule: <MotifChevronLine className="mx-auto h-5 w-24" />,
  },
  "shirin-bulut": {
    hero: <MotifBalloon className="mx-auto h-20 w-14" />,
    rule: <MotifRainbowLine className="mx-auto h-6 w-24" />,
  },
  karnaval: {
    hero: <MotifCake className="mx-auto h-20 w-16" />,
    rule: <MotifConfettiLine className="mx-auto h-5 w-24" />,
  },
  "marmar-atirgul": {
    hero: <MotifRose className="mx-auto h-20 w-16" />,
    rule: <MotifPearlLine className="mx-auto h-4 w-24" />,
  },
  "ipak-lavanda": {
    hero: <MotifFan className="mx-auto h-16 w-20" />,
    rule: <MotifSilkLine className="mx-auto h-5 w-24" />,
  },
  "zumrad-yubiley": {
    hero: <MotifCrest className="mx-auto h-20 w-16" />,
    rule: <MotifCrownLine className="mx-auto h-6 w-24" />,
  },
  "art-deko": {
    hero: <MotifDecoFan className="mx-auto h-16 w-20" />,
    rule: <MotifDecoLine className="mx-auto h-5 w-24" />,
  },
};

const features = [
  {
    t: "Jonli animatsiyalar",
    d: "Ochilish pardasi, chizilayotgan naqshlar va scroll bo'yicha yumshoq paydo bo'lish effektlari.",
  },
  {
    t: "Bayramgacha sanoq",
    d: "Har bir taklifnomada real vaqtli taymer — mehmonlar kunni unutmaydi.",
  },
  {
    t: "Mehmonlar tilaklari",
    d: "Tashrifni tasdiqlash va tabrik qoldirish — hammasi bitta sahifada.",
  },
  {
    t: "Musiqa va galereya",
    d: "Fon musiqasi, muqova rasmi va foto galereya bilan to'liq shaxsiylashtiring.",
  },
];

function Home() {
  const [active, setActive] = useState<TemplateCategory | "hammasi">("hammasi");
  const visible = active === "hammasi" ? templates : templates.filter((t) => t.category === active);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-xl tracking-wide text-foreground">
            Digital<span className="text-gilt"> taklifnoma</span>
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="#shablonlar"
              className="hidden text-[10px] tracking-editorial text-muted-foreground transition-colors hover:text-foreground sm:inline"
            >
              Shablonlar
            </a>
            <Link
              to="/my-invitations"
              className="text-[10px] tracking-editorial text-muted-foreground transition-colors hover:text-foreground"
            >
              Mening taklifnomalarim
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-16 text-center sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-grain opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gilt)_20%,transparent),transparent_70%)]" />
        <MotifStar className="pointer-events-none absolute left-[8%] top-14 h-5 w-5 text-gilt/60 twinkle" />
        <MotifStar className="pointer-events-none absolute right-[16%] top-44 h-4 w-4 text-gilt/50 twinkle" />
        <MotifButterfly className="pointer-events-none absolute right-[10%] top-24 h-12 w-14 text-gilt/40 float-slow" />
        <MotifCloud className="pointer-events-none absolute left-[6%] bottom-10 hidden h-12 w-20 text-gilt/25 float-slow sm:block" />
        <div className="relative mx-auto max-w-2xl">
          <MotifCandle className="mx-auto h-24 w-16 text-gilt draw-stroke" />
          <p className="mt-6 text-[10px] tracking-editorial text-gilt">
            Tug'ilgan kun taklifnomalari
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] text-foreground sm:text-6xl">
            Bayramingiz haqida
            <br />
            <span className="italic">chiroyli aytilgan taklif</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            10 ta premium shablon: bolalar bayrami, ayollar oqshomi va tantanali yubiley uchun.
            Ma'lumotlarni to'ldiring — shaxsiy havolangiz bir necha daqiqada tayyor.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#shablonlar"
              className="inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90"
            >
              Shablonni tanlash
            </a>
            <Link
              to="/my-invitations"
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-9 py-4 text-[11px] tracking-editorial text-foreground transition-colors hover:bg-secondary"
            >
              Taklifnomalarim
            </Link>
          </div>
          <MotifRibbon className="mx-auto mt-12 h-8 w-52 text-gilt" />
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-border bg-surface/60 px-6 py-14">
        <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-3">
          {[
            {
              n: "01",
              t: "Shablonni tanlang",
              d: "O'n nafis dizayn — har biri o'z rang palitrasi va motivlari bilan.",
            },
            { n: "02", t: "Ma'lumot kiriting", d: "Sana, manzil, matn, rasmlar va musiqa." },
            {
              n: "03",
              t: "Havolani yuboring",
              d: "Telegram yoki WhatsApp orqali mehmonlarga ulashing.",
            },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="text-center">
              <p className="font-display text-3xl text-gilt">{s.n}</p>
              <h3 className="mt-3 font-display text-xl text-foreground">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section id="shablonlar" className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[10px] tracking-editorial text-gilt">Katalog</p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              O'nta premium shablon
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Bayram turini tanlang — mos dizaynlarni ko'rsatamiz.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                className={`rounded-full border px-6 py-2.5 text-[10px] tracking-editorial transition-colors ${
                  active === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((t, i) => {
              const motifs = previewMotifs[t.id];
              return (
                <Reveal key={t.id} delay={i * 80}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card">
                    {/* Mini invitation mockup rendered with the template palette */}
                    <div
                      className={`${t.previewClass} relative overflow-hidden bg-background px-6 py-10 text-center text-foreground`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-grain opacity-30" />
                      <div className="relative">
                        <div className="text-motif transition-transform duration-500 group-hover:-translate-y-1">
                          {motifs?.hero}
                        </div>
                        <p className="mt-4 text-[9px] tracking-editorial text-motif">Taklifnoma</p>
                        <p className="mt-3 font-display text-3xl leading-none">Malika</p>
                        <p className="mt-2 font-display text-base text-motif">30 yosh</p>
                        <div className="mt-5 text-motif">{motifs?.rule}</div>
                        <p className="mt-4 text-[9px] tracking-editorial text-muted-foreground">
                          12 iyun · 18:00
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-display text-2xl text-foreground">{t.name}</h3>
                      <p className="mt-1 text-[10px] tracking-editorial text-gilt">{t.tagline}</p>
                      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {t.description}
                      </p>
                      <div className="mt-5 flex gap-2">
                        {t.palette.map((c) => (
                          <span
                            key={c}
                            className="h-6 w-6 rounded-full border border-border"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                      <Link
                        to="/create/$templateId"
                        params={{ templateId: t.id }}
                        className="mt-7 inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-3 text-[10px] tracking-editorial text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        Shu shablonni tanlash
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-surface/50 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] tracking-editorial text-gilt">Nega premium</p>
            <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
              Har bir tafsilot o'ylangan
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={i * 90}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <p className="font-display text-xl text-foreground">{f.t}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <Reveal className="mx-auto max-w-xl">
          <MotifStarline className="mx-auto h-6 w-32 text-gilt" />
          <h2 className="mt-6 font-display text-3xl text-foreground sm:text-4xl">
            Bayramingizni chiroyli boshlang
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Shablonni tanlang va bir necha daqiqada mehmonlarga havola yuboring.
          </p>
          <a
            href="#shablonlar"
            className="mt-9 inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90"
          >
            Boshlash
          </a>
        </Reveal>
      </section>

      <footer className="border-t border-border px-6 py-10 text-center">
        <MotifRibbon className="mx-auto h-7 w-40 text-gilt/70" />
        <p className="mt-4 text-[10px] tracking-editorial text-muted-foreground">
          Digital taklifnoma
        </p>
      </footer>
    </div>
  );
}
