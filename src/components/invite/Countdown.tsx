import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    done: ms === 0,
  };
}

/** A single countdown digit group that subtly fades/lifts whenever its value changes. */
function CountdownCell({ value, label }: { value: number; label: string }) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="min-w-14 text-center">
      <div className="relative h-[1em] overflow-hidden font-display text-4xl leading-none text-foreground sm:text-5xl">
        <span key={padded} className="count-tick block">
          {padded}
        </span>
      </div>
      <div className="mt-2 text-[10px] tracking-editorial text-muted-foreground">{label}</div>
    </div>
  );
}

export function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells = [
    { value: t.days, label: "kun" },
    { value: t.hours, label: "soat" },
    { value: t.minutes, label: "daqiqa" },
    { value: t.seconds, label: "soniya" },
  ];

  if (t.done) {
    return <p className="font-display text-2xl text-foreground">Bayram bugun boshlanadi!</p>;
  }

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-9">
      {cells.map((c) => (
        <CountdownCell key={c.label} value={c.value} label={c.label} />
      ))}
    </div>
  );
}
