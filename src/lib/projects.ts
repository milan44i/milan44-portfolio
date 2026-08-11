import type { StaticImageData } from "next/image";
import pinot from "@/images/projects/pinot.png";
import istok from "@/images/projects/istok.png";
import thyme from "@/images/projects/thyme.png";
import sentandrea from "@/images/projects/sentandrea.png";
import ambar from "@/images/projects/ambar.png";
import reka from "@/images/projects/reka.png";

// Copy + data for the Serbian client-facing /projects page.

export const projectsCopy = {
  title: "Sajtovi za restorane i male biznise",
  description:
    "Milan Stanković pravi sajtove za restorane i male biznise u Beogradu. Svaki dizajn nastaje iz priče lokala - bez šablona, jedan-od-jedan.",
  contactLabel: "Kontakt",
  hero: {
    eyebrow: "Milan Stanković · Beograd",
    title: "Nijedan od ovih sajtova ne liči na drugi.",
    lead: "Zato što nijedan nije šablon. Pravim sajtove za restorane i male biznise: dizajn svakog nastaje iz priče samog lokala - iz sale, jelovnika, imena i kraja u kom radi.",
    ctaPrimary: "Javite se",
    stats: [
      { big: "60+", small: "izgrađenih sajtova" },
      { big: "~0,6 MB", small: "prosečna težina stranice" },
      { big: "sr + en", small: "svaki sajt dvojezičan" },
      { big: "48 h", small: "rok za svaku izmenu" },
    ],
  },
  gallery: {
    eyebrow: "Izlog",
    title: "Šest sajtova, šest svetova",
    lead: "Izbor iz radionice. Svaki je dizajniran jedan-od-jedan, po meri lokala.",
  },
  base: {
    eyebrow: "Osnova",
    title: "Dizajn je različit, osnova je uvek ista",
    items: [
      {
        h: "Otvara se odmah",
        t: "Stranica od oko 0,6 MB učita se za sekund i na slabijoj mreži - niko ne odustane dok čeka.",
      },
      {
        h: "Jelovnik u tekstu, sr + en",
        t: "Google i AI asistenti ga čitaju, gost i stranac pretraže jelo po imenu. Slika jelovnika to ne može.",
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
  image: StaticImageData;
  alt: string;
};

export const projects: Project[] = [
  {
    slug: "pinot",
    name: "Pinot",
    place: "Novi Beograd",
    kind: "vinski bistro",
    story: "Trag vinske čaše iz logoa postao je motiv celog sajta - serifna elegancija za kartu koja se menja sa sezonom.",
    accent: "#8f2a3c",
    image: pinot,
    alt: "Sajt restorana Pinot - krem pozadina, serifni logotip i prsten od vina",
  },
  {
    slug: "istok",
    name: "Istok",
    place: "Dorćol",
    kind: "vijetnamska kuhinja",
    story: "Toplina lampiona i mrak sale, a Bib Gourmand priznanje u prvom planu.",
    accent: "#e8a04c",
    image: istok,
    alt: "Sajt restorana Istok - tamna sala sa lampionima i svetlim logotipom",
  },
  {
    slug: "thyme",
    name: "Thyme",
    place: "Zemun",
    kind: "street food",
    story: "Retro slab tipografija i pruge paviljona - glasan sajt za glasnu hranu.",
    accent: "#2a6e57",
    image: thyme,
    alt: "Sajt Thyme street food - zeleno-krem retro dizajn sa prugama",
  },
  {
    slug: "sentandrea",
    name: "Sent Andrea",
    place: "Zemunski kej",
    kind: "riblji restoran",
    story: "Plafon oslikan starom kartom sveta preslikan u salon starih moreplovaca.",
    accent: "#b98a4a",
    image: sentandrea,
    alt: "Sajt restorana Sent Andrea - topli salon sa oslikanim plafonom",
  },
  {
    slug: "ambar",
    name: "Ambar",
    place: "Beton hala",
    kind: "moderna balkanska kuhinja",
    story: "Krupna tipografija i narodni vez kao šav kroz stranicu - Balkan na moderan način.",
    accent: "#c4342d",
    image: ambar,
    alt: "Sajt restorana Ambar - industrijska sala sa muralom i krupnom tipografijom",
  },
  {
    slug: "reka",
    name: "Reka",
    place: "Zemun, kraj keja",
    kind: "kafana sa živom muzikom",
    story: "Sedam kućnih bendova i tri decenije provoda - sajt hvata noć, ne enterijer.",
    accent: "#d99a3f",
    image: reka,
    alt: "Sajt kafane Reka - noćna slika sa gostima koji igraju uz živu muziku",
  },
];
