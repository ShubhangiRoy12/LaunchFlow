import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

export type WebsiteAnalysis = {
  title: string;
  description: string;
  headings: string[];
  content: string;
  colors: string[];
  screenshot: string;
};

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  const targetUrl = normalizeUrl(url);
  const screenshotsDir = path.join(process.cwd(), "public", "screenshots");
  await mkdir(screenshotsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1200 },
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(targetUrl, { waitUntil: "networkidle", timeout: 45000 });

    const analysis = await page.evaluate(() => {
      const title = document.title || "";
      const description =
        document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ||
        document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ||
        "";

      const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((heading) => heading.textContent?.replace(/\s+/g, " ").trim() || "")
        .filter(Boolean)
        .slice(0, 20);

      const content = (document.body?.innerText || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 6000);

      const colors = Array.from(document.querySelectorAll("*"))
        .flatMap((element) => {
          const style = window.getComputedStyle(element);
          return [style.color, style.backgroundColor, style.borderColor];
        })
        .filter((color) => color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent")
        .slice(0, 250);

      const colorCounts = colors.reduce<Record<string, number>>((acc, color) => {
        acc[color] = (acc[color] || 0) + 1;
        return acc;
      }, {});

      const dominantColors = Object.entries(colorCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([color]) => color)
        .slice(0, 8);

      return { title, description, headings, content, colors: dominantColors };
    });

    const fileName = `${new URL(targetUrl).hostname.replace(/[^a-z0-9-]/gi, "-")}-${Date.now()}.png`;
    const filePath = path.join(screenshotsDir, fileName);
    await page.screenshot({ path: filePath, fullPage: true });

    return {
      ...analysis,
      screenshot: `/screenshots/${fileName}`,
    };
  } finally {
    await browser.close();
  }
}

function normalizeUrl(url: string) {
  const value = url.trim();
  if (!value) throw new Error("Website URL is required.");
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const parsed = new URL(withProtocol);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only http and https URLs are supported.");
  }
  return parsed.toString();
}
