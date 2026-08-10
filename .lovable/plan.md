# Taklifnoma Savat — premium daraja (v2)

Ish "taklifnoma-savat" loyihasida bajariladi — bu reja o'sha loyihada amalga oshiriladi.

## Maqsad
- Shablonlar soni: 4 → 10 ta
- Har bir shablon pro/elegant darajada bezatiladi
- Bosh sahifa (landing) sotuvchi va nafis ko'rinishga keltiriladi

## 1. Dizayn poydevori (barcha shablonlar uchun umumiy)
- `src/styles.css` ichida har bir shablon uchun alohida token to'plami (`.tpl-*`): fon, matn, aksent, motif, surface, chiziq va soya.
- 3 ta yangi shrift juftligi (display serif / editorial sans / script aksent) — `__root.tsx` ichida `<link>` orqali yuklanadi.
- Umumiy premium effektlar: nozik grain tekstura, oltin-folga gradient matn, marmar va akvarel fon qatlamlari, ingichka ramka bezaklari.
- Motion tizimi: IntroVeil ochilishi, scroll-reveal (bosqichma-bosqich), qopqoq rasmida parallaks, countdown raqamlari almashinuvi, motif chiziqlarining "draw" animatsiyasi. `prefers-reduced-motion` hurmat qilinadi.

## 2. Umumiy bloklarni yangilash
`src/components/invite/sections.tsx` va `motifs.tsx`:
- Har bir blok (Cover, Greeting, Schedule, Location, DressCode, Gallery, Wishes) uchun 2-3 ta ko'rinish varianti — shablon o'ziga mosini tanlaydi.
- Galereya: mozaik/masonry va lightbox.
- Tadbir dasturi: vertikal timeline, nafis vaqt tipografikasi.
- Manzil: xarita tugmasi bilan nozik kartochka.
- Tilaklar: chiroyli forma + kartochkalar oqimi.
- Yangi SVG motiflar to'plami (~15 ta): gul, kapalak, sharlar, tort, yulduz, marmar tomir, botanik shox, art-deco geometriya, mis chiziqlar.

## 3. 10 ta shablon
Mavjud 4 tasi qayta bezatiladi: Nafis oltin, Bahor gullari, Yulduzli tush, Kumush tun.

Yangi 6 ta:
- Bolalar: "Shirin sharlar" (pastel karamel, sharlar, konfetti), "O'rmon do'stlari" (akvarel hayvonlar, mayin yashil)
- Ayollar/qizlar: "Marmar & pushti oltin", "Botanika akvarel"
- Erkaklar/yubiley: "Emerald & oltin" (art-deco), "To'q ko'k & mis" (klassik editorial)

Har biri: o'z palitrasi, shrift juftligi, motiv to'plami, hero kompozitsiyasi va bo'lim ritmi — bir-biriga o'xshamaydi.

## 4. Katalog va bosh sahifa
- Landing: nafis hero, "qanday ishlaydi" 3 qadam, jonli shablon galereyasi, misol taklifnomalar, savol-javob, CTA.
- Katalog: filtr (bolalar / ayollar / yubiley / minimal), har bir kartochkada real mini-preview (demo ma'lumot bilan), hover animatsiya.
- Har bir shablon uchun to'liq ekranli demo ko'rish rejimi.
- SEO: har bir sahifada o'zining `head()` meta ma'lumotlari.

## Texnik eslatmalar
- `src/templates/registry.ts` kengaytiriladi: `category`, `fontPair`, `demoInvite` maydonlari; komponentlar lazy yuklanadi.
- `Invite` ma'lumot sxemasi o'zgarmaydi — faqat prezentatsiya qatlami.
- Editor (`create.$templateId.tsx`) mantiqiga tegilmaydi, yangi shablonlar avtomatik ro'yxatga tushadi.

## Bosqichlar
1. Dizayn tokenlari, shriftlar, motion tizimi, motiv kutubxonasi
2. Umumiy bloklar + mavjud 4 shablonni premium darajaga chiqarish
3. 6 ta yangi shablon
4. Landing va katalog