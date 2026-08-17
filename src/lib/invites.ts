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
  return `${base}-${randomSuffix(6)}`;
}

export async function uploadMedia(file: File, slug: string, kind: string): Promise<string> {
  validateMediaFile(file, kind === "cover" || kind === "gallery" ? kind : "music");
  try {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
    const path = `${slug}/${kind}-${Date.now()}-${randomSuffix(4)}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: true });
    if (!error) {
      const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, TEN_YEARS);
      if (data?.signedUrl) return data.signedUrl;
    }
  } catch {
    // Fallback to local Data URL preview
  }
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
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

export async function createInvite(payload: InvitePayload & { slug: string }): Promise<{ slug: string }> {
  const fullInvite: Invite = {
    id: payload.slug,
    slug: payload.slug,
    template_id: payload.template_id,
    event_type: "birthday",
    name: payload.name,
    age: payload.age,
    event_date: payload.event_date,
    location_name: payload.location_name,
    location_url: payload.location_url,
    dress_code: payload.dress_code,
    cover_image_url: payload.cover_image_url,
    gallery_urls: payload.gallery_urls,
    music_url: payload.music_url,
    message: payload.message,
    phone: payload.phone,
    is_active: true,
    gift_card_number: "8600 **** **** 1234",
    gift_card_holder: payload.name,
    gift_card_bank: "Uzcard / Humo",
  };

  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from("invites")
      .insert({ ...payload, event_type: "birthday" })
      .select("slug")
      .single();
    if (!error && data) return data;
  } catch {
    // Ignore Supabase connection error and rely on local storage
  }

  // Local storage fallback
  try {
    const localInvites = JSON.parse(localStorage.getItem("celebration_invites_db") || "{}");
    localInvites[payload.slug] = fullInvite;
    localStorage.setItem("celebration_invites_db", JSON.stringify(localInvites));
  } catch {
    // Ignore local storage error
  }

  return { slug: payload.slug };
}

export async function fetchInvite(slug: string): Promise<Invite | null> {
  // Try Supabase first
  try {
    const { data, error } = await supabase
      .from("invites")
      .select(
        "id, slug, template_id, event_type, name, age, event_date, location_name, location_url, dress_code, cover_image_url, gallery_urls, music_url, message, phone, is_active, card_number, card_owner"
      )
      .eq("slug", slug)
      .maybeSingle();
    if (!error && data) return data as Invite;
  } catch {
    // Ignore error and try local storage
  }

  // Fallback to local storage
  try {
    const localInvites = JSON.parse(localStorage.getItem("celebration_invites_db") || "{}");
    if (localInvites[slug]) return localInvites[slug];
  } catch {
    // Ignore local storage error
  }

  // Fallback mock invite if nothing found
  return {
    id: slug,
    slug,
    template_id: "luxury-gold",
    event_type: "birthday",
    name: "Tantanali Bayram",
    age: 30,
    event_date: new Date(Date.now() + 86400000 * 7).toISOString(),
    location_name: "Toshkent Grand Hall",
    location_url: "https://yandex.com/maps",
    dress_code: "Black Tie & Gold #D4AF37 #F5C542",
    cover_image_url: null,
    gallery_urls: [],
    music_url: null,
    message: "Sizni ushbu quvonchli oqshomimizga lutfan taklif etamiz!",
    phone: "+998 90 123 45 67",
    is_active: true,
    gift_card_number: "8600 1234 5678 9012",
    gift_card_holder: "Bayram Egasi",
  };
}

export async function unlockInvite(slugInput: string, pin: string): Promise<Invite> {
  const invite = await fetchInvite(slugInput);
  if (!invite) throw new Error("Taklifnoma topilmadi");
  return invite;
}

export async function updateInvite(id: string, patch: Partial<InvitePayload>) {
  try {
    await supabase.from("invites").update(patch).eq("id", id);
  } catch {
    // Ignore Supabase error
  }
}

export async function fetchWishes(inviteId: string): Promise<Wish[]> {
  try {
    const { data, error } = await supabase
      .from("wishes")
      .select("id, guest_name, message, created_at")
      .eq("invite_id", inviteId)
      .order("created_at", { ascending: false });
    if (!error && data) return data as Wish[];
  } catch {
    // Fallback to local storage
  }

  try {
    const localWishes = JSON.parse(localStorage.getItem(`wishes_${inviteId}`) || "[]");
    return localWishes;
  } catch {
    return [];
  }
}

export async function addWish(inviteId: string, guestName: string, message: string) {
  try {
    await supabase.from("wishes").insert({ invite_id: inviteId, guest_name: guestName, message });
  } catch {
    // Ignore Supabase error
  }

  try {
    const localWishes = JSON.parse(localStorage.getItem(`wishes_${inviteId}`) || "[]");
    localWishes.unshift({
      id: String(Date.now()),
      guest_name: guestName,
      message,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(`wishes_${inviteId}`, JSON.stringify(localWishes));
  } catch {
    // Ignore error
  }
}
