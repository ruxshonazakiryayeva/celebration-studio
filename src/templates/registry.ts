import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import type { TemplateComponentProps } from "@/lib/invite-types";

export type TemplateCategory = "kattalar" | "bolalar" | "ayollar" | "yubiley";

export const categories: { id: TemplateCategory | "hammasi"; label: string }[] = [
  { id: "hammasi", label: "Hammasi" },
  { id: "bolalar", label: "Bolalar bayrami" },
  { id: "ayollar", label: "Ayollar va qizlar" },
  { id: "yubiley", label: "Yubiley" },
  { id: "kattalar", label: "Universal" },
];

export type TemplateMeta = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  eventType: "birthday";
  category: TemplateCategory;
  /** Preview swatches, ordered light → dark. */
  palette: string[];
  previewClass: string;
  Component: LazyExoticComponent<ComponentType<TemplateComponentProps>>;
};

export const templates: TemplateMeta[] = [
  {
    id: "luxury-gold",
    name: "Ultra Oltin Hashamat",
    tagline: "Eng sara nikoh va tantanali yubileylar uchun",
    description:
      "3D Konvert ochilishi, mum muhr animatsiyasi, qora baxmal va 24k oltin uchqunlari. Vinyl fon musiqasi va interaktiv RSVP bilan eng yuqori darajadagi shablon.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#18140D", "#2A2419", "#D4AF37", "#FBF5E6"],
    previewClass: "tpl-gold",
    Component: lazy(() => import("./LuxuryGoldTemplate")),
  },
  {
    id: "emerald-regal",
    name: "Qirollik Zumradi",
    tagline: "Nufuzli va shohona marosimlar uchun",
    description:
      "Chuqur zumrad va oltin yaproqlar (gold leafing) bilal bezatilgan shohona uslub. Konvert muhr ochilishi va navigatsiya xaritalari bilan mukammal.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#081814", "#0C221C", "#10B981", "#F59E0B"],
    previewClass: "tpl-emerald",
    Component: lazy(() => import("./EmeraldRegalTemplate")),
  },
  {
    id: "nafis-oltin",
    name: "Nafis oltin",
    tagline: "Yubiley va kattalar bayrami uchun",
    description:
      "Oltin, fil suyagi va to'q ko'k ranglar uyg'unligi. Nafis serif shrift va ingichka chiziqli tasvirlar — sham, dafna novdasi, lenta.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#F7F2E7", "#E4D3A8", "#C7A253", "#1E2A44"],
    previewClass: "tpl-gold",
    Component: lazy(() => import("./GoldTemplate")),
  },
  {
    id: "bahor-gullari",
    name: "Bahor gullari",
    tagline: "Nafis, universal tug'ilgan kun uchun",
    description:
      "Pudra pushti, mayin sage va krem ranglar. Qo'lda chizilgan gul va kapalak tasvirlari bilan bahorona kayfiyat.",
    eventType: "birthday",
    category: "kattalar",
    palette: ["#FBF6EF", "#F0D7D3", "#C9D8C4", "#6E8C6A"],
    previewClass: "tpl-floral",
    Component: lazy(() => import("./FloralTemplate")),
  },
  {
    id: "yulduzli-tush",
    name: "Yulduzli tush",
    tagline: "Bolalar bayrami uchun nafis yechim",
    description:
      "Lavanda, mayin ko'k va issiq krem ranglar. Yulduz va oy motivlari — bolalarcha, ammo mutlaqo did bilan.",
    eventType: "birthday",
    category: "bolalar",
    palette: ["#F6F2FB", "#DCD6F0", "#BFCDE8", "#5B4B8A"],
    previewClass: "tpl-star",
    Component: lazy(() => import("./StarTemplate")),
  },
  {
    id: "kumush-tun",
    name: "Kumush tun",
    tagline: "Zamonaviy, minimalist yubiley uchun",
    description:
      "Qora, kumush va oq ranglar uyg'unligi. Geometrik chiziqli motivlar va nafis metall yaltirash effekti — zamonaviy did egalari uchun.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#171717", "#2E2E33", "#C7C9CE", "#F2F2F0"],
    previewClass: "tpl-noir",
    Component: lazy(() => import("./NoirTemplate")),
  },
  {
    id: "shirin-bulut",
    name: "Shirin bulut",
    tagline: "Kichkintoylar bayrami uchun",
    description:
      "Mayin osmon ko'ki, bulut va shar motivlari. Suzib yuruvchi animatsiyalar bilan yumshoq, bolalarcha kayfiyat — 1–7 yosh uchun ideal.",
    eventType: "birthday",
    category: "bolalar",
    palette: ["#F2F8FD", "#D8E8F6", "#A9C8E8", "#3F5C86"],
    previewClass: "tpl-cloud",
    Component: lazy(() => import("./CloudTemplate")),
  },
  {
    id: "karnaval",
    name: "Karnaval",
    tagline: "Quvnoq bolalar ziyofati uchun",
    description:
      "Shaftoli, mint va konfetti ranglari. Bayroqchalar, tort va konfetti motivlari — quvnoq, ammo ortiqcha shovqinsiz bezak.",
    eventType: "birthday",
    category: "bolalar",
    palette: ["#FDF6EC", "#F7DCC3", "#CFE7D8", "#C4522F"],
    previewClass: "tpl-carnival",
    Component: lazy(() => import("./CarnivalTemplate")),
  },
  {
    id: "marmar-atirgul",
    name: "Marmar atirgul",
    tagline: "Ayollar bayrami uchun nafis klassika",
    description:
      "Marmar tekstura, rose-gold yaltirash va gulchambar. Italyan serif shrifti bilan tantanali va ayollarcha nafosat.",
    eventType: "birthday",
    category: "ayollar",
    palette: ["#FAF4F1", "#EEDDD5", "#D7A98C", "#5C3F36"],
    previewClass: "tpl-rose",
    Component: lazy(() => import("./RoseTemplate")),
  },
  {
    id: "ipak-lavanda",
    name: "Ipak lavanda",
    tagline: "Qizlar uchun yumshoq va zamonaviy",
    description:
      "Siyoh binafsha, lavanda novdalari va ipak chiziqlar. Yelpig'ich motivi va marvarid detallari bilan mayin, zamonaviy did.",
    eventType: "birthday",
    category: "ayollar",
    palette: ["#F8F2FA", "#E6D6EE", "#C3A0D4", "#5A3A6B"],
    previewClass: "tpl-silk",
    Component: lazy(() => import("./SilkTemplate")),
  },
  {
    id: "zumrad-yubiley",
    name: "Zumrad yubiley",
    tagline: "Erkaklar yubileyi uchun tantanali",
    description:
      "Chuqur zumrad fon va oltin detallar. Gerb, qadah va toj motivlari, metall yaltirash effekti bilan nufuzli ko'rinish.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#123028", "#1C4438", "#B9974F", "#EFE7D2"],
    previewClass: "tpl-emerald",
    Component: lazy(() => import("./EmeraldTemplate")),
  },
  {
    id: "art-deko",
    name: "Art-deko",
    tagline: "Kattalar yubileyi uchun retro-zamonaviy",
    description:
      "To'q ko'k fon, bronza geometriya va sunburst naqshlari. 1920-yillar art-deko ruhi — jiddiy va esda qolarli.",
    eventType: "birthday",
    category: "yubiley",
    palette: ["#1B2340", "#2A3559", "#B4874F", "#EFE6D6"],
    previewClass: "tpl-deco",
    Component: lazy(() => import("./DecoTemplate")),
  },
];

export function getTemplate(id: string) {
  return templates.find((t) => t.id === id);
}
