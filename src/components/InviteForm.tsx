import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { validateMediaFile } from "@/lib/invites";

export type InviteFormValues = {
  name: string;
  age: string;
  date: string;
  time: string;
  locationName: string;
  locationUrl: string;
  message: string;
  dressCode: string;
  phone: string;
  pin: string;
};

export type InviteFormFiles = {
  cover: File | null;
  gallery: File[];
  music: File | null;
};

const todayIso = new Date().toISOString().split("T")[0];

export const emptyFormValues: InviteFormValues = {
  name: "",
  age: "",
  date: todayIso,
  time: "18:00",
  locationName: "",
  locationUrl: "",
  message: "",
  dressCode: "",
  phone: "",
  pin: "",
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block space-y-1">
      <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/80">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-muted-foreground leading-relaxed">{hint}</span> : null}
    </div>
  );
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-amber-500/30 bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground/60 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-sm cursor-text";

/** Small local-file thumbnail preview with a remove button. Manages its own object URL lifecycle. */
function FileThumb({ file, onRemove }: { file: File; onRemove: () => void }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border">
      {url ? <img src={url} alt={file.name} className="h-full w-full object-cover" /> : null}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Rasmni olib tashlash"
        className="absolute right-1 top-1 rounded-full bg-foreground/70 p-1 text-background opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

export function FormBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card/60 p-6 shadow-soft sm:p-8">
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

export function InviteFormFields({
  values,
  setValues,
  files,
  setFiles,
  mode,
  existing,
}: {
  values: InviteFormValues;
  setValues: (v: InviteFormValues) => void;
  files: InviteFormFiles;
  setFiles: (f: InviteFormFiles) => void;
  mode: "create" | "edit";
  existing?: { cover?: string | null; gallery?: string[]; music?: string | null };
}) {
  const set = <K extends keyof InviteFormValues>(key: K, value: InviteFormValues[K]) =>
    setValues({ ...values, [key]: value });

  const pickFile = (
    kind: "cover" | "gallery" | "music",
    fileList: FileList | null,
    apply: (file: File) => void,
  ) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      validateMediaFile(file, kind);
      apply(file);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Fayl mos emas");
    }
  };

  return (
    <div className="space-y-6">
      <FormBlock title="Bayram egasi">
        <Field label="Ism">
          <input
            className={inputClass}
            value={values.name}
            maxLength={60}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Masalan: Malika"
          />
        </Field>
        <Field label="Yosh (majburiy emas)">
          <input
            className={inputClass}
            value={values.age}
            inputMode="numeric"
            maxLength={3}
            onChange={(e) => set("age", e.target.value.replace(/\D/g, ""))}
            placeholder="Masalan: 30"
          />
        </Field>
      </FormBlock>

      <FormBlock title="Vaqt va manzil">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Sana">
            <input
              type="date"
              className={inputClass}
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </Field>
          <Field label="Vaqt">
            <input
              type="time"
              className={inputClass}
              value={values.time}
              onChange={(e) => set("time", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Joy nomi">
          <input
            className={inputClass}
            value={values.locationName}
            maxLength={120}
            onChange={(e) => set("locationName", e.target.value)}
            placeholder="Masalan: “Nihol” restorani"
          />
        </Field>
        <Field label="Google Maps havolasi (majburiy emas)">
          <input
            className={inputClass}
            value={values.locationUrl}
            maxLength={500}
            onChange={(e) => set("locationUrl", e.target.value)}
            placeholder="https://maps.google.com/..."
          />
        </Field>
        <Field label="Telefon raqam (majburiy emas)">
          <input
            className={inputClass}
            value={values.phone}
            maxLength={30}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+998 90 123 45 67"
          />
        </Field>
      </FormBlock>

      <FormBlock title="Mehmonlarga murojaat">
        <Field label="Qisqa matn">
          <textarea
            className={cn(inputClass, "min-h-32 resize-y")}
            value={values.message}
            maxLength={800}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Aziz mehmonlar, bu quvonchli kunni biz bilan birga nishonlashingizni so'raymiz."
          />
        </Field>
        <Field
          label="Dress-code / ranglar (majburiy emas)"
          hint="Matn yozing yoki rang kodlarini qo'shing: “Pastel ohanglar #F0D7D3 #C9D8C4”"
        >
          <input
            className={inputClass}
            value={values.dressCode}
            maxLength={200}
            onChange={(e) => set("dressCode", e.target.value)}
            placeholder="Pastel ohanglar #F0D7D3 #C9D8C4"
          />
        </Field>
      </FormBlock>

      <FormBlock title="Media">
        <Field
          label="Muqova rasmi"
          hint={
            files.cover
              ? files.cover.name
              : existing?.cover
                ? "Hozirgi rasm saqlanadi (yangisini yuklasangiz almashadi)"
                : "JPG, PNG yoki WebP, 5MB gacha"
          }
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={inputClass}
            onChange={(e) => {
              pickFile("cover", e.target.files, (file) => setFiles({ ...files, cover: file }));
              e.target.value = "";
            }}
          />
          {files.cover ? (
            <div className="mt-3">
              <FileThumb file={files.cover} onRemove={() => setFiles({ ...files, cover: null })} />
            </div>
          ) : null}
        </Field>
        <Field
          label="Galereya (4 tagacha)"
          hint={
            files.gallery.length >= 4
              ? "4 tadan rasm tanlandi (chegara)"
              : existing?.gallery?.length && !files.gallery.length
                ? `Hozirda ${existing.gallery.length} ta rasm bor`
                : "Bir nechta rasmni bir necha martada ham qo'sha olasiz, har biri 5MB gacha"
          }
        >
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={files.gallery.length >= 4}
            className={cn(inputClass, files.gallery.length >= 4 && "opacity-50")}
            onChange={(e) => {
              const picked = Array.from(e.target.files ?? []);
              const room = Math.max(0, 4 - files.gallery.length);
              const valid: File[] = [];
              for (const file of picked) {
                try {
                  validateMediaFile(file, "gallery");
                  valid.push(file);
                } catch (err) {
                  toast.error(err instanceof Error ? err.message : "Fayl mos emas");
                }
              }
              if (valid.length > room) {
                toast.error("Jami 4 tagacha rasm tanlashingiz mumkin");
              }
              const accepted = valid.slice(0, room);
              if (accepted.length) setFiles({ ...files, gallery: [...files.gallery, ...accepted] });
              e.target.value = "";
            }}
          />
          {files.gallery.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {files.gallery.map((file, i) => (
                <FileThumb
                  key={`${file.name}-${file.lastModified}-${i}`}
                  file={file}
                  onRemove={() =>
                    setFiles({ ...files, gallery: files.gallery.filter((_, idx) => idx !== i) })
                  }
                />
              ))}
            </div>
          ) : null}
        </Field>
        <Field
          label="Fon musiqasi (majburiy emas)"
          hint={
            files.music
              ? files.music.name
              : existing?.music
                ? "Hozirgi musiqa saqlanadi"
                : "MP3, WAV yoki OGG, 15MB gacha"
          }
        >
          <input
            type="file"
            accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,.mp3,.wav,.ogg"
            className={inputClass}
            onChange={(e) => {
              pickFile("music", e.target.files, (file) => setFiles({ ...files, music: file }));
              e.target.value = "";
            }}
          />
        </Field>
      </FormBlock>

      {mode === "create" ? (
        <FormBlock title="Tahrirlash uchun PIN">
          <Field
            label="4 xonali PIN kod"
            hint="Keyinchalik taklifnomani tahrirlash uchun kerak bo'ladi."
          >
            <input
              className={inputClass}
              value={values.pin}
              inputMode="numeric"
              maxLength={4}
              onChange={(e) => set("pin", e.target.value.replace(/\D/g, ""))}
              placeholder="Masalan: 2481"
            />
          </Field>
        </FormBlock>
      ) : null}
    </div>
  );
}

export function useInviteForm(initial: InviteFormValues = emptyFormValues) {
  const [values, setValues] = useState<InviteFormValues>(initial);
  const [files, setFiles] = useState<InviteFormFiles>({ cover: null, gallery: [], music: null });
  return { values, setValues, files, setFiles };
}

export function validateForm(values: InviteFormValues, mode: "create" | "edit") {
  if (values.name.trim().length < 2) return "Bayram egasining ismini kiriting";
  if (!values.date) return "Bayram sanasini tanlang";
  if (!values.time) return "Bayram vaqtini tanlang";
  if (values.locationUrl && !/^https?:\/\//i.test(values.locationUrl.trim()))
    return "Xarita havolasi https:// bilan boshlanishi kerak";
  if (mode === "create" && !/^\d{4}$/.test(values.pin)) return "4 xonali PIN kod kiriting";
  return null;
}

export function toEventDateIso(values: InviteFormValues) {
  return new Date(`${values.date}T${values.time}:00`).toISOString();
}
