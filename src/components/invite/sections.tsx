import { useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { addWish, fetchWishes } from "@/lib/invites";
import {
  buildAgenda,
  dressCodeLabel,
  formatUzDate,
  formatUzTime,
  parseSwatches,
  type Invite,
} from "@/lib/invite-types";
import { IconClock, IconEnvelope, IconPalette, IconPin } from "@/components/motifs";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-6 py-14 sm:py-20", className)}>
      <div className="mx-auto w-full max-w-xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[10px] tracking-editorial text-motif sm:text-[11px]">{children}</p>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-3 font-display text-3xl leading-tight text-foreground sm:text-4xl">
      {children}
    </h2>
  );
}

export function Divider({ motif }: { motif?: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4 px-6 text-motif">
      <span className="h-px w-16 bg-border sm:w-24" />
      <span className="opacity-90">{motif}</span>
      <span className="h-px w-16 bg-border sm:w-24" />
    </div>
  );
}

export function GreetingBlock({ invite }: { invite: Invite }) {
  if (!invite.message) return null;
  return (
    <Reveal>
      <p className="whitespace-pre-line text-center font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl">
        {invite.message}
      </p>
    </Reveal>
  );
}

export function ScheduleBlock({ invite }: { invite: Invite }) {
  const items = buildAgenda(invite.event_date);
  return (
    <>
      <Reveal className="text-center">
        <IconClock className="mx-auto h-11 w-11 text-motif" />
        <Eyebrow>Bayram tartibi</Eyebrow>
        <SectionHeading>Kun jadvali</SectionHeading>
      </Reveal>
      <ul className="mt-9 space-y-6">
        {items.map((item, i) => (
          <Reveal key={item.time} delay={i * 90}>
            <li className="flex items-baseline gap-5 border-b border-border pb-5">
              <span className="w-16 shrink-0 font-display text-2xl text-motif">{item.time}</span>
              <span className="text-sm leading-relaxed text-foreground/85">{item.title}</span>
            </li>
          </Reveal>
        ))}
      </ul>
    </>
  );
}

export function LocationBlock({ invite }: { invite: Invite }) {
  if (!invite.location_name && !invite.location_url) return null;
  return (
    <Reveal className="text-center">
      <IconPin className="mx-auto h-11 w-11 text-motif" />
      <Eyebrow>Manzil</Eyebrow>
      <SectionHeading>{invite.location_name ?? "Bayram joyi"}</SectionHeading>
      <p className="mt-4 text-sm text-muted-foreground">
        {formatUzDate(invite.event_date)}, soat {formatUzTime(invite.event_date)}
      </p>
      {invite.location_url ? (
        <a
          href={invite.location_url}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center justify-center rounded-full border border-motif px-8 py-3 text-[11px] tracking-editorial text-motif transition-colors hover:bg-motif hover:text-background"
        >
          Xaritada ko'rish
        </a>
      ) : null}
      {invite.phone ? (
        <p className="mt-6 text-sm text-muted-foreground">
          Savollar uchun:{" "}
          <a className="text-foreground underline underline-offset-4" href={`tel:${invite.phone}`}>
            {invite.phone}
          </a>
        </p>
      ) : null}
    </Reveal>
  );
}

export function DressCodeBlock({ invite }: { invite: Invite }) {
  const swatches = parseSwatches(invite.dress_code);
  const label = dressCodeLabel(invite.dress_code);
  if (!label && swatches.length === 0) return null;
  return (
    <Reveal className="text-center">
      <IconPalette className="mx-auto h-11 w-11 text-motif" />
      <Eyebrow>Dress-code</Eyebrow>
      <SectionHeading>Bayram ranglari</SectionHeading>
      {label ? (
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {label}
        </p>
      ) : null}
      {swatches.length > 0 ? (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {swatches.map((c) => (
            <span
              key={c}
              className="h-14 w-14 rounded-full border border-border shadow-soft"
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      ) : null}
    </Reveal>
  );
}

export function CoverBlock({ invite }: { invite: Invite }) {
  if (!invite.cover_image_url) return null;
  return (
    <Reveal>
      <figure className="overflow-hidden rounded-[2rem] border border-border shadow-card">
        <img
          src={invite.cover_image_url}
          alt={`${invite.name} — bayram fotosurati`}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
      </figure>
    </Reveal>
  );
}

export function GalleryBlock({ invite }: { invite: Invite }) {
  if (!invite.gallery_urls?.length) return null;
  return (
    <>
      <Reveal className="text-center">
        <Eyebrow>Xotiralar</Eyebrow>
        <SectionHeading>Foto galereya</SectionHeading>
      </Reveal>
      <div className="mt-9 grid grid-cols-2 gap-4">
        {invite.gallery_urls.map((url, i) => (
          <Reveal key={url} delay={i * 80}>
            <img
              src={url}
              alt={`${invite.name} galereya ${i + 1}`}
              loading="lazy"
              className="aspect-square w-full rounded-2xl border border-border object-cover shadow-soft"
            />
          </Reveal>
        ))}
      </div>
    </>
  );
}

export function WishesBlock({ invite }: { invite: Invite }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const wishes = useQuery({
    queryKey: ["wishes", invite.id],
    queryFn: () => fetchWishes(invite.id),
  });

  const mutation = useMutation({
    mutationFn: () => addWish(invite.id, name.trim(), message.trim()),
    onSuccess: () => {
      setName("");
      setMessage("");
      toast.success("Tabrigingiz uchun rahmat!");
      queryClient.invalidateQueries({ queryKey: ["wishes", invite.id] });
    },
    onError: () => toast.error("Yuborilmadi, qaytadan urinib ko'ring"),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Ismingizni kiriting");
      return;
    }
    if (message.trim().length < 2) {
      toast.error("Tabrik matnini kiriting");
      return;
    }
    if (message.trim().length > 400) {
      toast.error("Tabrik 400 belgidan oshmasin");
      return;
    }
    mutation.mutate();
  };


  return (
    <>
      <Reveal className="text-center">
        <IconEnvelope className="mx-auto h-11 w-11 text-motif" />
        <Eyebrow>Tashrifingizni tasdiqlang</Eyebrow>
        <SectionHeading>Tabrik va tilaklar</SectionHeading>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Iltimos, ismingizni yozib qoldiring — biz sizni kutamiz.
        </p>
      </Reveal>

      <Reveal className="mt-9">
        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card/70 p-6 shadow-soft"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            placeholder="Ismingiz"
            className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-motif"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={400}
            rows={3}
            placeholder="Qisqa tabrik yoki tilak..."
            className="w-full resize-none rounded-2xl border border-input bg-background px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-motif"
          />
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full rounded-full bg-primary px-6 py-3 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {mutation.isPending ? "Yuborilmoqda..." : "Tabrikni yuborish"}
          </button>
        </form>
      </Reveal>

      {wishes.data && wishes.data.length > 0 ? (
        <ul className="mt-9 space-y-4">
          {wishes.data.map((w) => (
            <li key={w.id} className="rounded-2xl border border-border bg-card/60 px-6 py-5">
              <p className="font-display text-xl text-foreground">{w.guest_name}</p>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {w.message}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export function FooterCredit() {
  return (
    <footer className="px-6 pb-12 pt-4 text-center">
      <p className="text-[10px] tracking-editorial text-muted-foreground">Digital taklifnoma</p>
    </footer>
  );
}
