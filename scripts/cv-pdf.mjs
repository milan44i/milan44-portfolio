// Prints cv/cv.html to A4. The layout is a fixed-height page with
// overflow:hidden, so "1 page" is guaranteed and therefore proves nothing on its
// own: content past the bottom is silently CLIPPED. This checks for that too.
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "cv", "cv.html");
const out = process.argv[2] ?? path.join(root, "public", "Milan-Stankovic-CV.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto("file://" + src, { waitUntil: "networkidle" });

const check = await page.evaluate(() => {
  const b = document.body;
  const last = document.querySelector(".statusline");
  const fonts = [...document.querySelectorAll("h1, .mono, p")].map((el) => getComputedStyle(el).fontFamily);
  return {
    clipped: b.scrollHeight > b.clientHeight + 1,
    scrollH: b.scrollHeight,
    clientH: b.clientHeight,
    lastVisible: last ? last.getBoundingClientRect().bottom <= b.clientHeight + 1 : null,
    fonts: [...new Set(fonts)],
  };
});

await fs.mkdir(path.dirname(out), { recursive: true });
await page.pdf({ path: out, format: "A4", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
await browser.close();

const bytes = await fs.readFile(out);
const doc = await PDFDocument.load(bytes);
const { width, height } = doc.getPage(0).getSize();
const report = {
  out,
  pages: doc.getPageCount(),
  mm: [Math.round((width / 72) * 25.4), Math.round((height / 72) * 25.4)],
  kb: Math.round(bytes.length / 1024),
  ...check,
};
console.log(JSON.stringify(report, null, 1));
if (report.pages !== 1) { console.error("FAIL: not one page"); process.exit(1); }
if (report.clipped) { console.error("FAIL: content is clipped past the page"); process.exit(1); }
