import { useEffect, useRef, useState } from "react";

export function LuxMusic({ src }: { src: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(src);
    a.loop = true;
    ref.current = a;
    const tryPlay = () => a.play().then(() => setPlaying(true)).catch(() => {});
    window.addEventListener("pointerdown", tryPlay, { once: true });
    return () => { window.removeEventListener("pointerdown", tryPlay); a.pause(); };
  }, [src]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  };

  return (
    <button className="lux-music" onClick={toggle} aria-label="Musiqa">
      <span className={playing ? "lux-disc spinning" : "lux-disc"}>♫</span>
    </button>
  );
}
