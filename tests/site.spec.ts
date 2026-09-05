import { expect, test, type Page } from "@playwright/test";

const routes = ["/", "/work/pipeline", "/work/gamescore", "/work/lotusflare", "/resume", "/projects"];

// The Vercel analytics scripts only exist on Vercel; locally they 404.
const isLocalOnlyNoise = (text: string) => /_vercel\//.test(text) || /404 \(Not Found\)/.test(text);

async function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && !isLocalOnlyNoise(m.text()) && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));
  return errors;
}

for (const route of routes) {
  test(`${route} renders with its own metadata and no console errors`, async ({ page, baseURL }) => {
    const errors = await collectConsoleErrors(page);
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main#main")).toHaveCount(1);
    expect(await page.title()).toContain("Milan Stanković");

    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", `https://milan44.dev${route === "/" ? "" : route}`);

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(ogImage).toContain(`https://milan44.dev${route === "/" ? "" : route}/opengraph-image`);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

    // the card itself must render (fonts are read from disk at request time)
    const card = await page.request.get(ogImage!.replace("https://milan44.dev", baseURL!));
    expect(card.status()).toBe(200);
    expect(card.headers()["content-type"]).toBe("image/png");

    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(300);
    expect(errors).toEqual([]);
  });

  test(`${route} has no horizontal overflow at 320 px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test("unknown routes get the branded 404", async ({ page }) => {
  const response = await page.goto("/work/nope");
  expect(response?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("That page is not here.");
  await expect(page.getByRole("link", { name: "Resume" }).first()).toBeVisible();
});

test("legacy paths redirect", async ({ request }) => {
  for (const [from, to] of [
    ["/work", "/#work"],
    ["/index", "/"],
  ]) {
    const response = await request.get(from, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(to);
  }
});

test("security headers are set", async ({ request }) => {
  const headers = (await request.get("/")).headers();
  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["strict-transport-security"]).toContain("includeSubDomains");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});

test("skip link is the first tab stop and lands in main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest("#main")))).toBe(true);
});

test("hero copy is visible without JavaScript and under reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const h1 = page.locator("h1");
  await expect(h1).toBeVisible();
  expect(await h1.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
  await context.close();
});

test.describe("mobile", () => {
  test.skip(({ isMobile }) => !isMobile, "touch layout only");

  test("every link and button is at least 44 px", async ({ page }) => {
    await page.goto("/");
    const small = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>("a, button")]
        .filter((el) => {
          const box = el.getBoundingClientRect();
          if (!box.width || !box.height) return false;
          // .hit widens the tap area with a pseudo-element without moving the visible text
          const hit = el.classList.contains("hit") ? getComputedStyle(el, "::before") : null;
          const height = hit ? Math.max(box.height, parseFloat(hit.height)) : box.height;
          const width = hit ? Math.max(box.width, parseFloat(hit.width)) : box.width;
          return height < 44 || width < 44;
        })
        .map((el) => (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 40)),
    );
    expect(small).toEqual([]);
  });

  test("menu takes focus on open and gives it back on Escape", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest("#mobile-menu")))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });
});
