import { useEffect, useRef, useState } from "react";
import { Disc, Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

// High quality romantic royalty-free wedding music track fallback
export const DEFAULT_MUSIC_TRACKS = [
  { id: "romantic-piano", label: "Nafis Fortepiano", url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3" },
  { id: "soft-waltz", label: "Romantik Valz", url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3" },
  { id: "oriental-instrumental", label: "Sharqona Instrumental", url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8728a38.mp3" },
];

export function MusicToggle({
  src,
  autoPlay = false,
}: {
  src?: string | null;
  autoPlay?: boolean;
}) {
  const audioSrc = src && src.trim() ? src : DEFAULT_MUSIC_TRACKS[0].url;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (autoPlay) {
      startPlayback();
    }
  }, [autoPlay]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await startPlayback();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onEnded={() => setPlaying(false)}
      />
      
      {/* Floating Vinyl Audio Disc Button */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Musiqani to'xtatish" : "Musiqani yoqish"}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2.5 p-2.5 pr-4 rounded-full border border-amber-400/40 bg-zinc-950/85 text-amber-300 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group",
          playing && "ring-2 ring-amber-400/50 shadow-amber-500/20"
        )}
      >
        {/* Spinning Vinyl Disc */}
        <div className="relative flex items-center justify-center">
          <Disc
            className={cn(
              "h-7 w-7 text-amber-400 transition-transform duration-700",
              playing ? "animate-spin" : "opacity-70"
            )}
            style={{ animationDuration: "3s" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {playing ? (
              <Volume2 className="h-3.5 h-3.5 text-zinc-950 fill-amber-400" />
            ) : (
              <VolumeX className="h-3.5 h-3.5 text-amber-300/80" />
            )}
          </div>
        </div>

        {/* Audio Equalizer Bars & Text */}
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200">
            {playing ? "Fon musiqasi" : "Musiqani yoqish"}
          </span>
          {playing ? (
            <div className="flex items-end gap-0.5 h-3 mt-0.5">
              <span className="w-0.5 h-full bg-amber-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
              <span className="w-0.5 h-2.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
              <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: "0.1s" }} />
            </div>
          ) : (
            <span className="text-[9px] text-white/50">Tugmani bosing</span>
          )}
        </div>
      </button>
    </>
  );
}
