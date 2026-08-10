import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Elegant curtain intro shown once before the invitation is revealed. */
export function IntroVeil({
  title,
  subtitle,
  motif,
  className,
}: {
  title: string;
  subtitle: string;
  motif?: React.ReactNode;
  className?: string;
}) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setHidden(true), 2600);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-8 text-center",
        hidden && "pointer-events-none veil-out",
        className,
      )}
    >
      <div className="intro-fade text-[10px] tracking-editorial text-motif">{subtitle}</div>
      <div className="mt-6 h-px w-40 origin-left bg-motif/60 intro-line" />
      <h1 className="mt-6 font-display text-4xl text-foreground sm:text-5xl intro-fade">{title}</h1>
      <div className="mt-6 h-px w-40 origin-right bg-motif/60 intro-line" />
      {motif ? <div className="mt-8 text-motif float-slow">{motif}</div> : null}
    </div>
  );
}
