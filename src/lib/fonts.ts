import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

// Shared between both root layouts ((en) and (sr)).
// latin-ext covers Serbian Latin diacritics (č ć š ž đ) on /projects.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontClassNames = `${bricolage.variable} ${hanken.variable} ${jetbrains.variable}`;
