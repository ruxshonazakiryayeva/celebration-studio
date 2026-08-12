import { supabase } from "@/integrations/supabase/client";
import type { Invite, Wish } from "./invite-types";

const BUCKET = "invite-media";
const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_AUDIO_BYTES = 15 * 1024 * 1024; // 15 MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/x-m4a",
  "audio/mp4",
];

function humanSize(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}

/**
 * Validates a file before it's uploaded to Supabase Storage. Throws with a
 * user-facing Uzbek message on failure. This is a client-side guard against
 * accidental huge/wrong-type uploads — it is not a substitute for a
 * bucket-level MIME/size policy on the server, but there is currently no
 * such policy configured, so this is the only line of defense.
 */
export function validateMediaFile(file: File, kind: "cover" | "gallery" | "music") {
  if (kind === "music") {
    if (file.size > MAX_AUDIO_BYTES) {
      throw new Error(`Musiqa fayli ${humanSize(MAX_AUDIO_BYTES)} dan katta bo'lmasligi kerak`);
    }
    if (file.type && !ALLOWED_AUDIO_TYPES.includes(file.type)) {
      throw new Error("Faqat MP3, WAV yoki OGG formatidagi audio fayl yuklang");
    }
    return;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Rasm ${humanSize(MAX_IMAGE_BYTES)} dan katta bo'lmasligi kerak`);
  }
  if (file.type && !ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Faqat JPG, PNG yoki WebP formatidagi rasm yuklang");
  }
}

const translit: Record<string, string> = {
  ʻ: "",
  "'": "",
  "’": "",
  ў: "o",
  қ: "q",
  ғ: "g",
  ҳ: "h",
};

export function slugify(input: string) {
  return input
    .toLowerCase()
    .split("")
    .map((c) => translit[c] ?? c)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 28);
}

export function randomSuffix(len = 5) {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function generateSlug(name: string) {
  const base = slugify(name) || "taklifnoma";
  for (let i = 0; i < 6; i++) {
    const candidate = `${base}-${randomSuffix()}`;
    const { data } = await supabase
      .from("invites")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data) return candidate;
  }
  return `${base}-${randomSuffix(8)}`;
}

export async function uploadMedia(file: File, slug: string, kind: string): Promise<string> {
  validateMediaFile(file, kind === "cover" || kind === "gallery" ? kind : "music");
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
  const path = `${slug}/${kind}-${Date.now()}-${randomSuffix(4)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, TEN_YEARS);
  if (signError || !data) throw signError ?? new Error("URL yaratilmadi");
  return data.signedUrl;
}

export type InvitePayload = {
  template_id: string;
  pin: string;
  name: string;
  age: number | null;
  event_date: string;
  location_name: string | null;
  location_url: string | null;
  dress_code: string | null;
  cover_image_url: string | null;
  gallery_urls: string[];
  music_url: string | null;
  message: string | null;
  phone: string | null;
};

export async function createInvite(payload: InvitePayload & { slug: string }) {
  const { data, error } = await supabase
    .from("invites")
    .insert({ ...payload, event_type: "birthday" })
    .select("slug")
    .single();
  if (error) throw error;
  return data;
}

export async function fetchInvite(slug: string): Promise<Invite | null> {
  const { data, error } = await supabase
    .from("invites")
    .select(
      "id, slug, template_id, event_type, name, age, event_date, location_name, location_url, dress_code, cover_image_url, gallery_urls, music_url, message, phone, is_active, card_number, card_owner",
    )

    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Invite | null) ?? null;
}

export async function unlockInvite(slugInput: string, pin: string): Promise<Invite> {
  const slug = slugInput
    .trim()
    .replace(/^.*\/invite\//, "")
    .replace(/\/+$/, "");
  const { data: ok, error } = await supabase.rpc("verify_invite_pin", {
    p_slug: slug,
    p_pin: pin.trim(),
  });
  if (error) throw error;
  if (!ok) throw new Error("Havola yoki PIN kod noto'g'ri");
  const invite = await fetchInvite(slug);
  if (!invite) throw new Error("Bu havola bo'yicha taklifnoma topilmadi");
  return invite;
}

export async function updateInvite(id: string, patch: Partial<InvitePayload>) {
  const { error } = await supabase.from("invites").update(patch).eq("id", id);
  if (error) throw error;
}

export async function fetchWishes(inviteId: string): Promise<Wish[]> {
  const { data, error } = await supabase
    .from("wishes")
    .select("id, guest_name, message, created_at")
    .eq("invite_id", inviteId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Wish[]) ?? [];
}

export async function addWish(inviteId: string, guestName: string, message: string) {
  const { error } = await supabase
    .from("wishes")
    .insert({ invite_id: inviteId, guest_name: guestName, message });
  if (error) throw error;
}
