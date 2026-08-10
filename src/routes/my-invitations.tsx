import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  InviteFormFields,
  toEventDateIso,
  validateForm,
  type InviteFormFiles,
  type InviteFormValues,
} from "@/components/InviteForm";
import { unlockInvite, updateInvite, uploadMedia } from "@/lib/invites";
import { formatUzTime, type Invite } from "@/lib/invite-types";
import { getTemplate } from "@/templates/registry";
import { MotifSprig } from "@/components/motifs";

export const Route = createFileRoute("/my-invitations")({
  head: () => ({
    meta: [
      { title: "Mening taklifnomalarim — tahrirlash | Digital taklifnoma" },
      {
        name: "description",
        content:
          "Havola va 4 xonali PIN kod yordamida taklifnomangizni oching va ma'lumotlarni yangilang.",
      },
      { property: "og:title", content: "Mening taklifnomalarim" },
      {
        property: "og:description",
        content: "Havola va PIN kod bilan taklifnomani tahrirlang.",
      },
    ],
  }),
  component: MyInvitations,
});

function inviteToValues(invite: Invite): InviteFormValues {
  const d = new Date(invite.event_date);
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return {
    name: invite.name,
    age: invite.age ? String(invite.age) : "",
    date,
    time: formatUzTime(invite.event_date),
    locationName: invite.location_name ?? "",
    locationUrl: invite.location_url ?? "",
    message: invite.message ?? "",
    dressCode: invite.dress_code ?? "",
    phone: invite.phone ?? "",
    pin: "",
  };
}

function MyInvitations() {
  const [slugInput, setSlugInput] = useState("");
  const [pin, setPin] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [invite, setInvite] = useState<Invite | null>(null);
  const [values, setValues] = useState<InviteFormValues | null>(null);
  const [files, setFiles] = useState<InviteFormFiles>({ cover: null, gallery: [], music: null });
  const [saving, setSaving] = useState(false);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slugInput.trim()) {
      toast.error("Taklifnoma havolasini kiriting");
      return;
    }
    if (!/^\d{4}$/.test(pin)) {
      toast.error("4 xonali PIN kod kiriting");
      return;
    }
    setUnlocking(true);
    try {
      const found = await unlockInvite(slugInput, pin);
      setInvite(found);
      setValues(inviteToValues(found));
      toast.success("Taklifnoma ochildi");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ochib bo'lmadi");
    } finally {
      setUnlocking(false);
    }
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invite || !values) return;
    const error = validateForm(values, "edit");
    if (error) {
      toast.error(error);
      return;
    }
    setSaving(true);
    try {
      const coverUrl = files.cover
        ? await uploadMedia(files.cover, invite.slug, "cover")
        : invite.cover_image_url;
      let galleryUrls = invite.gallery_urls ?? [];
      if (files.gallery.length) {
        galleryUrls = [];
        for (const file of files.gallery.slice(0, 4)) {
          galleryUrls.push(await uploadMedia(file, invite.slug, "gallery"));
        }
      }
      const musicUrl = files.music
        ? await uploadMedia(files.music, invite.slug, "music")
        : invite.music_url;

      await updateInvite(invite.id, {
        name: values.name.trim(),
        age: values.age ? Number(values.age) : null,
        event_date: toEventDateIso(values),
        location_name: values.locationName.trim() || null,
        location_url: values.locationUrl.trim() || null,
        dress_code: values.dressCode.trim() || null,
        message: values.message.trim() || null,
        phone: values.phone.trim() || null,
        cover_image_url: coverUrl,
        gallery_urls: galleryUrls,
        music_url: musicUrl,
      });
      setFiles({ cover: null, gallery: [], music: null });
      toast.success("O'zgarishlar saqlandi");
    } catch (err) {
      console.error(err);
      toast.error("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg text-foreground">
            Digital<span className="text-gilt"> taklifnoma</span>
          </Link>
          <span className="text-[10px] tracking-editorial text-muted-foreground">
            Tahrirlash
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <p className="text-[10px] tracking-editorial text-gilt">Mening taklifnomalarim</p>
          <h1 className="mt-4 font-display text-4xl text-foreground">Taklifnomani tahrirlash</h1>
          <MotifSprig className="mx-auto mt-6 h-6 w-36 text-gilt" />
        </div>

        {!invite || !values ? (
          <form
            onSubmit={unlock}
            className="mx-auto mt-12 max-w-md space-y-5 rounded-3xl border border-border bg-card/60 p-7 shadow-soft"
          >
            <label className="block">
              <span className="text-[10px] tracking-editorial text-muted-foreground">
                Havola yoki slug
              </span>
              <input
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                placeholder="malika-a7k2p yoki to'liq havola"
                className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="text-[10px] tracking-editorial text-muted-foreground">PIN kod</span>
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                inputMode="numeric"
                maxLength={4}
                placeholder="4 xonali kod"
                className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm tracking-[0.3em] text-foreground outline-none focus:border-accent"
              />
            </label>
            <button
              type="submit"
              disabled={unlocking}
              className="w-full rounded-full bg-primary px-8 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {unlocking ? "Ochilmoqda..." : "Ochish"}
            </button>
          </form>
        ) : (
          <form onSubmit={save} className="mt-12">
            <div className="mb-6 rounded-2xl border border-border bg-surface px-6 py-5 text-sm">
              <p className="text-[10px] tracking-editorial text-muted-foreground">Shablon</p>
              <p className="mt-1 font-display text-xl text-foreground">
                {getTemplate(invite.template_id)?.name ?? invite.template_id}
              </p>
              <Link
                to="/invite/$slug"
                params={{ slug: invite.slug }}
                className="mt-3 inline-block text-xs text-gilt underline underline-offset-4"
              >
                /invite/{invite.slug}
              </Link>
            </div>

            <InviteFormFields
              values={values}
              setValues={setValues}
              files={files}
              setFiles={setFiles}
              mode="edit"
              existing={{
                cover: invite.cover_image_url,
                gallery: invite.gallery_urls,
                music: invite.music_url,
              }}
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-full bg-primary px-8 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {saving ? "Saqlanmoqda..." : "O'zgarishlarni saqlash"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setInvite(null);
                  setValues(null);
                  setPin("");
                }}
                className="rounded-full border border-foreground/20 px-8 py-4 text-[11px] tracking-editorial text-foreground transition-colors hover:bg-surface"
              >
                Chiqish
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
