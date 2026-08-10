import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Copy, Send } from "lucide-react";
import {
  InviteFormFields,
  toEventDateIso,
  useInviteForm,
  validateForm,
} from "@/components/InviteForm";
import { getTemplate } from "@/templates/registry";
import { createInvite, generateSlug, uploadMedia } from "@/lib/invites";
import { MotifRibbon, MotifStarline } from "@/components/motifs";

export const Route = createFileRoute("/create/$templateId")({
  loader: ({ params }) => {
    const template = getTemplate(params.templateId);
    if (!template) throw notFound();
    return { name: template.name, tagline: template.tagline };
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.name} shabloni — taklifnoma yaratish`
      : "Taklifnoma yaratish";
    const description = loaderData
      ? `${loaderData.name}: ${loaderData.tagline}. Ma'lumotlarni to'ldiring va shaxsiy havolani oling.`
      : "Tug'ilgan kun taklifnomasini yarating.";
    return {
      meta: [
        { title: `${title} | Digital taklifnoma` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(loaderData ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="font-display text-3xl text-foreground">Shablon topilmadi</h1>
        <Link to="/" className="mt-6 inline-block text-sm text-gilt underline underline-offset-4">
          Katalogga qaytish
        </Link>
      </div>
    </div>
  ),
  component: CreatePage,
});

function CreatePage() {
  const { templateId } = Route.useParams();
  const template = getTemplate(templateId)!;
  const { values, setValues, files, setFiles } = useInviteForm();
  const [saving, setSaving] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm(values, "create");
    if (error) {
      toast.error(error);
      return;
    }
    setSaving(true);
    try {
      const newSlug = await generateSlug(values.name);
      const coverUrl = files.cover ? await uploadMedia(files.cover, newSlug, "cover") : null;
      const galleryUrls: string[] = [];
      for (const file of files.gallery.slice(0, 4)) {
        galleryUrls.push(await uploadMedia(file, newSlug, "gallery"));
      }
      const musicUrl = files.music ? await uploadMedia(files.music, newSlug, "music") : null;

      await createInvite({
        slug: newSlug,
        template_id: template.id,
        pin: values.pin,
        name: values.name.trim(),
        age: values.age ? Number(values.age) : null,
        event_date: toEventDateIso(values),
        location_name: values.locationName.trim() || null,
        location_url: values.locationUrl.trim() || null,
        dress_code: values.dressCode.trim() || null,
        cover_image_url: coverUrl,
        gallery_urls: galleryUrls,
        music_url: musicUrl,
        message: values.message.trim() || null,
        phone: values.phone.trim() || null,
      });
      setSlug(newSlug);
      window.scrollTo({ top: 0 });
    } catch (err) {
      console.error(err);
      toast.error("Saqlashda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setSaving(false);
    }
  };

  if (slug) return <SuccessScreen slug={slug} pin={values.pin} name={values.name} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-display text-lg text-foreground">
            Digital<span className="text-gilt"> taklifnoma</span>
          </Link>
          <span className="text-[10px] tracking-editorial text-muted-foreground">
            {template.name}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="text-center">
          <p className="text-[10px] tracking-editorial text-gilt">{template.tagline}</p>
          <h1 className="mt-4 font-display text-4xl text-foreground">Taklifnoma ma'lumotlari</h1>
          <MotifRibbon className="mx-auto mt-6 h-7 w-44 text-gilt" />
        </div>

        <form onSubmit={submit} className="mt-12">
          <InviteFormFields
            values={values}
            setValues={setValues}
            files={files}
            setFiles={setFiles}
            mode="create"
          />
          <button
            type="submit"
            disabled={saving}
            className="mt-8 w-full rounded-full bg-primary px-8 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Yaratilmoqda..." : "Taklifnomani yaratish"}
          </button>
        </form>
      </div>
    </div>
  );
}

function SuccessScreen({ slug, pin, name }: { slug: string; pin: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined" ? `${window.location.origin}/invite/${slug}` : `/invite/${slug}`;
  const shareText = `${name} — tug'ilgan kun taklifnomasi: ${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Havola nusxalandi");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Nusxalab bo'lmadi");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg text-center">
        <MotifStarline className="mx-auto h-8 w-40 text-gilt draw-stroke" />
        <p className="mt-6 text-[10px] tracking-editorial text-gilt">Tayyor</p>
        <h1 className="mt-4 font-display text-4xl text-foreground">Taklifnomangiz yaratildi</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Havolani mehmonlarga yuboring. PIN kodni saqlab qo'ying — u tahrirlash uchun kerak.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left shadow-soft">
          <p className="text-[10px] tracking-editorial text-muted-foreground">Shaxsiy havola</p>
          <p className="mt-2 break-all text-sm text-foreground">{url}</p>
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-surface p-5 text-left">
          <p className="text-[10px] tracking-editorial text-muted-foreground">Tahrirlash PIN kodi</p>
          <p className="mt-2 font-display text-3xl tracking-[0.3em] text-foreground">{pin}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-[11px] tracking-editorial text-primary-foreground transition-opacity hover:opacity-90"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            Havolani nusxalash
          </button>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(name + " — tug'ilgan kun taklifnomasi")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 text-[10px] tracking-editorial text-foreground transition-colors hover:bg-surface"
            >
              <Send className="h-3.5 w-3.5" /> Telegram
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-3.5 text-[10px] tracking-editorial text-foreground transition-colors hover:bg-surface"
            >
              WhatsApp
            </a>
          </div>
          <Link
            to="/invite/$slug"
            params={{ slug }}
            className="mt-2 text-sm text-gilt underline underline-offset-4"
          >
            Taklifnomani ko'rish
          </Link>
        </div>
      </div>
    </div>
  );
}
