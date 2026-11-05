import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, "FintiQ-Solutions-Company-Profile.html");
const pdfPath = path.join(__dirname, "FintiQ-Solutions-Company-Profile.pdf");

async function main() {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Missing HTML at ${htmlPath}. Run build-company-profile.mjs first.`);
  }

  let puppeteer;
  try {
    const require = createRequire(import.meta.url);
    puppeteer = require("puppeteer");
  } catch {
    const { execSync } = await import("node:child_process");
    console.log("Installing puppeteer locally for PDF export...");
    execSync("npm install --no-save puppeteer", {
      cwd: path.resolve(__dirname, ".."),
      stdio: "inherit",
    });
    const require = createRequire(import.meta.url);
    puppeteer = require("puppeteer");
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });

  try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0", timeout: 120000 });
    await page.emulateMediaType("print");
    await page.pdf({
      path: pdfPath,
      landscape: true,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    console.log("Wrote", pdfPath);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
