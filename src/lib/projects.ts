import type { StaticImageData } from "next/image";
import pinot from "@/images/projects/pinot.png";
import neos from "@/images/projects/neos.png";
import thyme from "@/images/projects/thyme.png";
import hans from "@/images/projects/hans.png";
import dixieland from "@/images/projects/dixieland.png";
import brunello from "@/images/projects/brunello.png";

// Copy + data for the Serbian client-facing /projects page.

export const projectsCopy = {
  title: "Sajtovi za restorane i male biznise",
  description:
    "Milan Stanković pravi sajtove za restorane i male biznise u Beogradu. Svaki dizajn nastaje iz priče lokala - bez šablona, jedan-od-jedan.",
  contactLabel: "Kontakt",
  hero: {
    eyebrow: "Milan Stanković · Beograd",
    title: "Nijedan od ovih sajtova ne liči na drugi.",
    lead: "Zato što nijedan nije šablon. Pravim sajtove za restorane i male biznise: dizajn svakog nastaje iz priče samog lokala - iz sale, jelovnika, imena i kraja u kom radi. Novi sajt je gotov za 48 sati.",
    ctaPrimary: "Javite se",
    stats: [
      { big: "200+", small: "izgrađenih sajtova" },
      // Measured 2026-09-05 across 5 deployed sites (transferSize, full page load):
      // 546 / 562 / 825 / 257 / 436 kB, average 525 kB. "~0,5 MB" is the measured
      // figure; the previous "~0,6 MB" had nothing behind it.
      { big: "~0,5 MB", small: "prosečna težina stranice" },
      { big: "sr + en", small: "svaki sajt dvojezičan" },
      { big: "48 h", small: "rok za svaku izmenu" },
    ],
  },
  gallery: {
    eyebrow: "Izlog",
    title: "Šest sajtova, šest svetova",
    lead: "Izbor iz radionice. Svaki je dizajniran jedan-od-jedan, po meri lokala.",
  },
  search: {
    eyebrow: "Google + AI",
    title: "Kad neko pita gde da jede, sajt je u igri",
    lead: "Ovo gost ne vidi, a odlučuje ko će vas naći: svaki sajt je optimizovan da ga čitaju i pretraživači i AI asistenti.",
    items: [
      {
        tech: "Schema.org + sitemap",
        plain: "Kad neko ukuca „restoran u vašem kraju“, Google vas prikaže - sa radnim vremenom, jelovnikom i ocenama.",
      },
      {
        tech: "llms.txt",
        plain: "Kad gost pita ChatGPT ili Google AI gde da večera, vaš sajt je čitljiv i restoran može biti preporučen.",
      },
      {
        tech: "Jelovnik u tekstu",
        plain: "Svako jelo pretraživo po imenu. Slika jelovnika je za pretragu nevidljiva - tekst nije.",
      },
    ],
  },
  base: {
    eyebrow: "Osnova",
    title: "Dizajn je različit, osnova je uvek ista",
    items: [
      {
        h: "Otvara se odmah",
        t: "Stranica od oko 0,5 MB učita se za sekund i na slabijoj mreži - niko ne odustane dok čeka.",
      },
      {
        h: "Dvojezičan od prvog dana",
        t: "Srpski i engleski u paru - i stranac pronađe jelo i naruči bez pomoći.",
      },
      {
        h: "Rezervacije stižu vama",
        t: "Upit sa sajta ide direktno na vaš mejl, ne u DM koji se izgubi.",
      },
      {
        h: "Domen na vaše ime",
        t: "Od prvog dana glasi na vas. Ako jednom odete, sajt i domen nosite sa sobom.",
      },
      {
        h: "Izmene u roku od 48 h",
        t: "Nova cena, jelo ili radno vreme - pošaljete poruku, ja odradim. Bez doplata.",
      },
      {
        h: "Bez ugovora",
        t: "Mesec za mesec. Otkažete kad god poželite, bez raskida i penala.",
      },
    ],
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Imate lokal? Javite se.",
    note: "Obično odgovorim u toku dana.",
    studio: "Sajtove radim kroz",
    studioName: "Potpis Studio",
    studioHref: "https://potpisstudio.rs",
    phone: "065 317 8640",
    phoneHref: "tel:+381653178640",
    techProfile: "Tehnički profil (EN)",
  },
} as const;

export type Project = {
  slug: string;
  name: string;
  place: string;
  kind: string;
  story: string;
  accent: string;
  // The deployed demo. null means the demo has been taken down (the design work
  // stays in the gallery; it just cannot be captioned "live").
  liveUrl: string | null;
  image: StaticImageData;
  alt: string;
  // The English /work/pipeline strip reuses these cards; a screen reader there must not get Serbian.
  altEn: string;
};

export const projects: Project[] = [
  {
    slug: "pinot",
    name: "Pinot",
    place: "Novi Beograd",
    kind: "vinski bistro",
    story: "Trag vinske čaše iz logoa postao je motiv celog sajta - serifna elegancija za kartu koja se menja sa sezonom.",
    accent: "#8f2a3c",
    liveUrl: "https://restoran-pinot.pages.dev",
    image: pinot,
    alt: "Sajt restorana Pinot - krem pozadina, serifni logotip i prsten od vina",
    altEn: "Pinot restaurant website - cream background, serif logotype and a wine ring",
  },
  {
    slug: "neos",
    name: "Neos Beauty",
    place: "Beograd na vodi",
    kind: "beauty salon",
    story: "Zlatni talas iz logoa i salon u luku: laserska epilacija, body program i masaže, sa cenovnikom na dohvat ruke.",
    accent: "#c9ae82",
    liveUrl: "https://neosbeauty.rs",
    image: neos,
    alt: "Sajt salona Neos Beauty: tamnozelena pozadina, zlatni talas i recepcija salona u luku",
    altEn: "Neos Beauty salon website: dark green background, a gold wave and the salon reception in an arch",
  },
  {
    slug: "thyme",
    name: "Thyme",
    place: "Zemun",
    kind: "street food",
    story: "Retro slab tipografija i pruge paviljona - glasan sajt za glasnu hranu.",
    accent: "#2a6e57",
    liveUrl: null, // removed from the live strip on the captain's call 2026-09-05
    image: thyme,
    alt: "Sajt Thyme street food - zeleno-krem retro dizajn sa prugama",
    altEn: "Thyme street food website - green and cream retro design with stripes",
  },
  {
    slug: "hans",
    name: "Powerhouse Club Hans",
    place: "Zaječar",
    kind: "teretana i personalni treninzi",
    story: "Disciplina, rad, rezultati: crno-crveni sajt sa forumom, YouTube kanalom i zakazivanjem personalnog treninga.",
    accent: "#e31e24",
    liveUrl: "https://nenadmihajlovic.rs",
    image: hans,
    alt: "Sajt Powerhouse Club Hans: crna pozadina, crveno-beli natpis i bodibilder u prvom planu",
    altEn: "Powerhouse Club Hans website: black background, red and white lettering and a bodybuilder up front",
  },
  {
    slug: "dixieland",
    name: "Belgrade Dixieland Orchestra",
    place: "Beograd",
    kind: "džez orkestar",
    story: "Crvena zavesa i reflektori za jedini tradicionalni džez orkestar na Balkanu, na sceni od 2001: šest albuma, rajder i kontakt za nastupe.",
    accent: "#b21934",
    // Switch to https://www.belgradedixielandorchestra.com once the domain is connected.
    liveUrl: "https://belgrade-dixieland-2.pages.dev",
    image: dixieland,
    alt: "Sajt Belgrade Dixieland Orchestra: orkestar na sceni između crvenih zavesa i natpis u ramu od sijalica",
    altEn: "Belgrade Dixieland Orchestra website: the band on stage between red curtains and a marquee-lit title",
  },
  {
    slug: "brunello",
    name: "Brunello",
    place: "Dedinje",
    kind: "restoran i vinoteka",
    story: "Police s vinom od poda do plafona, a ispod njih se ruča - sajt vodi od flaše ka stolu.",
    accent: "#c8a24a",
    liveUrl: "https://brunello-wine-dine.restorani.pages.dev",
    image: brunello,
    alt: "Sajt restorana Brunello - vinoteka sa policama do plafona i topao šank",
    altEn: "Brunello restaurant website - wine shop with floor-to-ceiling shelves and a warm bar",
  },
];
