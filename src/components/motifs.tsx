import type { SVGProps } from "react";

type MotifProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---------- Nafis oltin: candle, laurel, ribbon ---------- */

export function MotifCandle({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 200" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M60 18c8 9 12 15 12 21a12 12 0 0 1-24 0c0-6 4-12 12-21Z" />
        <path d="M60 46v14" />
        <rect x="44" y="60" width="32" height="96" rx="6" />
        <path d="M48 74c6 4 12 4 18 0M48 92c6 4 12 4 18 0M48 110c6 4 12 4 18 0" opacity=".5" />
        <path d="M32 156h56l-6 14H38l-6-14Z" />
        <path d="M26 178h68" />
      </g>
    </svg>
  );
}

export function MotifLaurel({ className, ...props }: MotifProps) {
  const leaf = (i: number, dir: 1 | -1) => (
    <path
      key={`${dir}-${i}`}
      d={`M60 ${168 - i * 17} C ${60 + dir * 22} ${162 - i * 17}, ${60 + dir * 26} ${150 - i * 17}, 60 ${146 - i * 17}`}
    />
  );
  return (
    <svg viewBox="0 0 120 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M60 178C36 150 34 108 60 74" />
        <path d="M60 178C84 150 86 108 60 74" />
        {[0, 1, 2, 3, 4, 5].map((i) => leaf(i, 1))}
        {[0, 1, 2, 3, 4, 5].map((i) => leaf(i, -1))}
        <circle cx="60" cy="58" r="7" />
        <path d="M60 51V38M60 65v8M53 58h-9M67 58h9" opacity=".7" />
      </g>
    </svg>
  );
}

export function MotifRibbon({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 30h58" />
        <path d="M138 30h58" />
        <path d="M100 30c-14-16-30-18-34-8s10 16 34 8Z" />
        <path d="M100 30c14-16 30-18 34-8s-10 16-34 8Z" />
        <path d="M100 30c-6 10-12 14-18 16M100 30c6 10 12 14 18 16" />
        <circle cx="100" cy="29" r="2.6" />
      </g>
    </svg>
  );
}

/* ---------- Bahor gullari: florals, butterfly, sprig ---------- */

export function MotifFlower({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 140 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx="70"
            cy="46"
            rx="11"
            ry="24"
            transform={`rotate(${deg} 70 70)`}
            style={{ transformOrigin: "70px 70px" }}
          />
        ))}
        <circle cx="70" cy="70" r="8" />
        <path d="M70 78c2 40-4 70-6 104" />
        <path d="M64 130c-16-4-24-16-24-28 14 0 24 10 24 28Z" />
        <path d="M66 158c16-4 26-16 26-28-14 0-26 10-26 28Z" />
      </g>
    </svg>
  );
}

export function MotifButterfly({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M60 30v44" />
        <path d="M58 30c-6-18-24-26-36-18s-6 30 12 36c10 3 18 4 24 6" />
        <path d="M62 30c6-18 24-26 36-18s6 30-12 36c-10 3-18 4-24 6" />
        <path d="M58 74c-10 8-24 8-30-2 8-6 20-8 30-6" />
        <path d="M62 74c10 8 24 8 30-2-8-6-20-8-30-6" />
        <path d="M58 28c-4-8-8-12-14-14M62 28c4-8 8-12 14-14" />
      </g>
    </svg>
  );
}

export function MotifSprig({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 46" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M6 23h64M130 23h64" />
        <path d="M100 6c-8 6-10 14-8 20 8 0 12-8 8-20Z" />
        <path d="M100 40c8-6 10-14 8-20-8 0-12 8-8 20Z" />
        <path d="M86 23c-6-6-14-7-20-4 4 7 12 9 20 4Z" />
        <path d="M114 23c6 6 14 7 20 4-4-7-12-9-20-4Z" />
        <circle cx="100" cy="23" r="2.4" />
      </g>
    </svg>
  );
}

/* ---------- Yulduzli tush: moon, stars, cloud ---------- */

export function MotifMoon({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 140 180" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M92 28a56 56 0 1 0 0 104 46 46 0 0 1 0-104Z" />
        <path d="M40 148c8 6 16 8 26 8" opacity=".6" />
        <path d="M28 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" />
        <path d="M118 150l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" />
        <path d="M112 18l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" opacity=".8" />
      </g>
    </svg>
  );
}

export function MotifStar({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M30 6l6 17 18 7-18 7-6 17-6-17-18-7 18-7 6-17Z" />
      </g>
    </svg>
  );
}

export function MotifStarline({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 44" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M6 22h68M126 22h68" />
        <path d="M100 6l4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" />
        <circle cx="82" cy="22" r="1.8" />
        <circle cx="118" cy="22" r="1.8" />
      </g>
    </svg>
  );
}

/* ---------- Kumush tun: facet, arc, chevron (minimalist geometric) ---------- */

export function MotifFacet({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M20 40 60 12 100 40 88 96 32 96Z" />
        <path d="M20 40h80" />
        <path d="M60 12v28M40 40l-8 56M80 40l8 56M60 40 32 96M60 40l28 56" opacity=".55" />
      </g>
    </svg>
  );
}

export function MotifArc({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 80" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M6 74c0-38 33-68 74-68s74 30 74 68" />
        <circle cx="80" cy="6" r="2.4" />
        <circle cx="14" cy="74" r="1.6" opacity=".6" />
        <circle cx="146" cy="74" r="1.6" opacity=".6" />
      </g>
    </svg>
  );
}

export function MotifChevronLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 20h64" />
        <path d="M132 20h64" />
        <path d="M84 6l16 14-16 14" />
        <path d="M116 6l-16 14 16 14" opacity=".55" />
      </g>
    </svg>
  );
}

/* ---------- Shared small icons (line-art, no emoji) ---------- */

export function IconClock({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <circle cx="24" cy="26" r="16" />
        <path d="M24 17v9l7 5" />
        <path d="M14 8l-5 4M34 8l5 4" />
      </g>
    </svg>
  );
}

export function IconPin({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M24 42c9-11 14-18 14-24a14 14 0 0 0-28 0c0 6 5 13 14 24Z" />
        <circle cx="24" cy="18" r="5" />
      </g>
    </svg>
  );
}

export function IconPalette({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M24 6c10 0 18 7 18 16 0 6-5 8-9 8h-4c-3 0-5 2-5 4 0 3 2 4 2 6 0 1-1 2-3 2C13 42 6 34 6 24 6 14 14 6 24 6Z" />
        <circle cx="17" cy="18" r="2.2" />
        <circle cx="26" cy="14" r="2.2" />
        <circle cx="33" cy="21" r="2.2" />
      </g>
    </svg>
  );
}

export function IconEnvelope({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <rect x="6" y="12" width="36" height="24" rx="3" />
        <path d="M6 15l18 13 18-13" />
      </g>
    </svg>
  );
}

export function IconNote({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M18 34V12l16-4v22" />
        <circle cx="13" cy="34" r="5" />
        <circle cx="29" cy="30" r="5" />
      </g>
    </svg>
  );
}

/* ---------- Shirin bulut: bulut, shar, kamalak ---------- */

export function MotifCloud({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M38 74c-15 0-26-10-26-22s11-22 25-21c5-15 19-25 35-25 19 0 34 13 37 30 13 1 23 11 23 23 0 8-6 15-15 15Z" />
        <path d="M52 86c6 4 14 4 20 0M92 88c5 3 12 3 17 0" opacity=".55" />
      </g>
    </svg>
  );
}

export function MotifBalloon({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <ellipse cx="60" cy="60" rx="34" ry="42" />
        <path d="M54 100l6 10 6-10" />
        <path d="M60 110c10 16-10 26 0 42s-6 22 0 32" />
        <path d="M44 40c2-10 8-16 16-18" opacity=".55" />
      </g>
    </svg>
  );
}

export function MotifRainbowLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 46" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 34h58M138 34h58" />
        <path d="M74 34a26 26 0 0 1 52 0" />
        <path d="M82 34a18 18 0 0 1 36 0" opacity=".6" />
        <path d="M90 34a10 10 0 0 1 20 0" opacity=".4" />
      </g>
    </svg>
  );
}

/* ---------- Karnaval: konfetti, bayroqcha, tort ---------- */

export function MotifCake({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 140 180" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M70 20c5 6 8 10 8 14a8 8 0 0 1-16 0c0-4 3-8 8-14Z" />
        <path d="M70 42v16" />
        <path d="M30 92c0-10 18-16 40-16s40 6 40 16v18H30Z" />
        <path d="M22 118c0-8 22-14 48-14s48 6 48 14v34H22Z" />
        <path d="M22 132c10 8 20 8 30 0s20 8 30 0 20 8 36 0" opacity=".5" />
        <path d="M14 158h112" />
      </g>
    </svg>
  );
}

export function MotifBunting({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 60" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 12c40 22 152 22 192 0" />
        <path d="M34 20l10 20 10-24" />
        <path d="M70 28l10 22 10-24" />
        <path d="M108 30l10 22 10-24" />
        <path d="M146 24l10 21 10-24" />
      </g>
    </svg>
  );
}

export function MotifConfettiLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M6 20h62M132 20h62" />
        <path d="M84 10l4 8M100 6v10M116 10l-4 8" />
        <circle cx="90" cy="28" r="2.2" />
        <circle cx="110" cy="28" r="2.2" />
        <circle cx="100" cy="32" r="1.8" opacity=".6" />
      </g>
    </svg>
  );
}

/* ---------- Marmar atirgul: atirgul, gulchambar, tomchi ---------- */

export function MotifRose({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 140 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <circle cx="70" cy="56" r="30" />
        <path d="M70 40a16 16 0 1 0 12 26" />
        <path d="M70 48a9 9 0 1 0 7 15" opacity=".7" />
        <path d="M46 66c-6 12-2 24 8 30M94 66c6 12 2 24-8 30" opacity=".6" />
        <path d="M70 88v70" />
        <path d="M66 120c-16-2-24-12-24-24 14-2 24 8 24 24Z" />
        <path d="M74 146c16-2 26-12 26-24-14-2-26 8-26 24Z" />
      </g>
    </svg>
  );
}

export function MotifWreath({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <circle cx="80" cy="80" r="54" opacity=".35" />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const x = 80 + Math.cos(a) * 54;
          const y = 80 + Math.sin(a) * 54;
          return (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="9"
              ry="4.5"
              transform={`rotate(${(a * 180) / Math.PI} ${x} ${y})`}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function MotifPearlLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 15h60M136 15h60" />
        <circle cx="78" cy="15" r="3" />
        <circle cx="92" cy="15" r="4.5" />
        <circle cx="108" cy="15" r="4.5" />
        <circle cx="122" cy="15" r="3" />
      </g>
    </svg>
  );
}

/* ---------- Ipak lavanda: yelpig'ich, lavanda novdasi, marvarid tomchi ---------- */

export function MotifFan({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M80 124 20 44a74 74 0 0 1 120 0Z" />
        <path d="M80 124V32M80 124 44 54M80 124l36-70M80 124 30 66M80 124l50-58" opacity=".5" />
        <circle cx="80" cy="124" r="4" />
      </g>
    </svg>
  );
}

export function MotifLavender({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M60 176V56" />
        {Array.from({ length: 8 }).map((_, i) => (
          <g key={i}>
            <ellipse cx={52} cy={54 + i * 12} rx="7" ry="4" transform={`rotate(-30 52 ${54 + i * 12})`} />
            <ellipse cx={68} cy={54 + i * 12} rx="7" ry="4" transform={`rotate(30 68 ${54 + i * 12})`} />
          </g>
        ))}
        <ellipse cx="60" cy="42" rx="6" ry="12" />
        <path d="M60 140c-14-2-20-10-20-20 12-2 20 6 20 20Z" opacity=".7" />
      </g>
    </svg>
  );
}

export function MotifSilkLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 36" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 18c24-14 44 14 68 0s44-14 68 0 32 6 56-4" opacity=".8" />
        <circle cx="100" cy="14" r="2.4" />
      </g>
    </svg>
  );
}

/* ---------- Zumrad yubiley: qadah, gerb, dafna toji ---------- */

export function MotifGoblet({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 120 190" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M30 26h60c0 34-12 54-30 58C42 80 30 60 30 26Z" />
        <path d="M32 44h56" opacity=".5" />
        <path d="M60 84v58" />
        <path d="M32 164c0-12 12-22 28-22s28 10 28 22Z" />
        <path d="M24 172h72" />
      </g>
    </svg>
  );
}

export function MotifCrest({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 140 180" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M70 12 128 34v56c0 40-26 62-58 76-32-14-58-36-58-76V34Z" />
        <path d="M70 30 112 46v44c0 30-20 47-42 58-22-11-42-28-42-58V46Z" opacity=".45" />
        <path d="M70 62v46M50 84h40" />
      </g>
    </svg>
  );
}

export function MotifCrownLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 44" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 26h62M134 26h62" />
        <path d="M78 32 74 10l12 10 14-14 14 14 12-10-4 22Z" />
        <path d="M78 36h44" />
      </g>
    </svg>
  );
}

/* ---------- Art-deko: veer, sunburst, geometrik chegara ---------- */

export function MotifDecoFan({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M80 112a56 56 0 0 1 0-104 56 56 0 0 1 0 104Z" opacity=".35" />
        <path d="M80 112V8" />
        <path d="M80 112a56 56 0 0 0 40-96M80 112a56 56 0 0 1-40-96" />
        <path d="M80 112a34 34 0 0 0 34-34M80 112a34 34 0 0 1-34-34" opacity=".6" />
        <circle cx="80" cy="112" r="3.6" />
      </g>
    </svg>
  );
}

export function MotifSunburst({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <circle cx="80" cy="80" r="26" />
        {Array.from({ length: 20 }).map((_, i) => {
          const a = (i / 20) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={80 + Math.cos(a) * 34}
              y1={80 + Math.sin(a) * 34}
              x2={80 + Math.cos(a) * (i % 2 ? 52 : 66)}
              y2={80 + Math.sin(a) * (i % 2 ? 52 : 66)}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function MotifDecoLine({ className, ...props }: MotifProps) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true" {...props}>
      <g {...base}>
        <path d="M4 20h60M136 20h60" />
        <path d="M72 20 88 6l12 14-12 14Z" />
        <path d="M128 20 112 6l-12 14 12 14Z" />
        <circle cx="100" cy="20" r="2.6" />
      </g>
    </svg>
  );
}
