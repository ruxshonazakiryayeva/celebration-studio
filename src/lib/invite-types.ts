export type Invite = {
  id: string;
  slug: string;
  template_id: string;
  event_type: string;
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
  is_active: boolean;
};

export type Wish = {
  id: string;
  guest_name: string;
  message: string;
  created_at: string;
};

export type TemplateComponentProps = {
  invite: Invite;
};

export const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

export const UZ_WEEKDAYS = [
  "yakshanba",
  "dushanba",
  "seshanba",
  "chorshanba",
  "payshanba",
  "juma",
  "shanba",
];

export function formatUzDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()} ${UZ_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatUzWeekday(iso: string) {
  return UZ_WEEKDAYS[new Date(iso).getDay()] ?? "";
}

export function formatUzTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export type AgendaItem = { time: string; title: string };

/** Default birthday agenda derived from the event start time. */
export function buildAgenda(iso: string): AgendaItem[] {
  const start = new Date(iso).getTime();
  const at = (minutes: number) => formatUzTime(new Date(start + minutes * 60000).toISOString());
  return [
    { time: at(0), title: "Mehmonlar yig'ilishi va fotosessiya" },
    { time: at(40), title: "Tabriklar va ochilish so'zi" },
    { time: at(90), title: "Ziyofat, musiqa va o'yinlar" },
    { time: at(160), title: "Tort marosimi va shirinliklar" },
  ];
}

/** Pulls hex swatches out of a free-form dress-code text. */
export function parseSwatches(text: string | null): string[] {
  if (!text) return [];
  return (text.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g) ?? []).slice(0, 6);
}

export function dressCodeLabel(text: string | null): string {
  if (!text) return "";
  return text
    .replace(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/[,;]\s*$/, "")
    .trim();
}
