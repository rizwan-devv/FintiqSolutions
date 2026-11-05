/**
 * FintiQ Solutions — Client Company Profile (PowerPoint)
 * Brand: navy #102458 · teal #00B0A4 · deep #071530 (from logo / site)
 * Rebuild: node docs/build-fintiq-pptx.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PptxGenJS from "pptxgenjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const markPath = path.join(root, "public/brand/mark.png");
const outPath = path.join(__dirname, "FintiQ-Solutions-Company-Profile-v2.pptx");

const C = {
  navy: "102458",
  deep: "071530",
  mid: "0C6484",
  teal: "00B0A4",
  tealDeep: "087F78",
  mist: "5C6D86",
  line: "D5DEEA",
  paper: "F4F7FB",
  paper2: "EEF3F9",
  white: "FFFFFF",
  soft: "E8F7F5",
};

const FONT = "Calibri";
const W = 13.333;
const H = 7.5;

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "WIDE", width: W, height: H });
pptx.layout = "WIDE";
pptx.author = "FintiQ Solutions (Private) Limited";
pptx.title = "FintiQ Solutions — Company Profile";
pptx.subject = "Client company profile";
pptx.company = "FintiQ Solutions";

const hasMark = fs.existsSync(markPath);

function brandBar(slide, y = 0) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y,
    w: W,
    h: 0.08,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: y + 0.08,
    w: W,
    h: 0.045,
    fill: { color: C.mid },
    line: { color: C.mid },
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: y + 0.125,
    w: W,
    h: 0.045,
    fill: { color: C.teal },
    line: { color: C.teal },
  });
}

function cornerDecor(slide, tone = "light") {
  const ring = tone === "dark" ? "1A3A6E" : C.navy;
  const solid = tone === "dark" ? C.teal : C.navy;
  slide.addShape(pptx.shapes.OVAL, {
    x: -1.2,
    y: -1.2,
    w: 2.7,
    h: 2.7,
    fill: { color: solid },
    line: { color: solid },
  });
  for (const [dx, size, t] of [
    [-0.5, 2.25, 45],
    [-0.28, 2.75, 55],
    [-0.05, 3.25, 65],
  ]) {
    slide.addShape(pptx.shapes.OVAL, {
      x: dx,
      y: dx,
      w: size,
      h: size,
      fill: { type: "none" },
      line: { color: ring, width: 1.2, transparency: t },
    });
  }
  for (const [x, y, size, t] of [
    [11.15, 5.35, 2.55, 50],
    [10.95, 5.15, 3.05, 58],
    [10.75, 4.95, 3.55, 66],
  ]) {
    slide.addShape(pptx.shapes.OVAL, {
      x,
      y,
      w: size,
      h: size,
      fill: { type: "none" },
      line: { color: tone === "dark" ? C.teal : ring, width: 1.1, transparency: t },
    });
  }
}

function lightBg(slide) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.paper },
    line: { color: C.paper },
  });
  brandBar(slide);
  cornerDecor(slide, "light");
}

function darkBg(slide) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.deep },
    line: { color: C.deep },
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 0,
    w: W,
    h: H,
    fill: { color: C.navy, transparency: 35 },
    line: { color: C.navy, transparency: 100 },
  });
  brandBar(slide);
  cornerDecor(slide, "dark");
}

function footer(slide, page, total, dark = false) {
  const ink = dark ? "A8B8D0" : C.mist;
  const line = dark ? "1E3A5F" : C.line;
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.55,
    y: 6.92,
    w: 12.2,
    h: 0.012,
    fill: { color: dark ? C.teal : C.navy },
    line: { color: dark ? C.teal : C.navy },
  });
  slide.addText("FintiQ Solutions · Islamabad, Pakistan", {
    x: 0.55,
    y: 7.02,
    w: 4.5,
    h: 0.28,
    fontSize: 9,
    color: ink,
    fontFace: FONT,
  });
  slide.addText("CONFIDENTIAL — For intended recipients", {
    x: 4.5,
    y: 7.02,
    w: 4.3,
    h: 0.28,
    fontSize: 9,
    color: dark ? C.teal : "3A5A9A",
    fontFace: FONT,
    align: "center",
  });
  slide.addText(`fintiqsolutions.com  ·  ${page} / ${total}`, {
    x: 8.7,
    y: 7.02,
    w: 4.05,
    h: 0.28,
    fontSize: 9,
    color: ink,
    fontFace: FONT,
    align: "right",
  });
}

function sectionTitle(slide, text, dark = false) {
  slide.addText(text, {
    x: 0.85,
    y: 0.42,
    w: 11.6,
    h: 0.5,
    fontSize: 26,
    bold: true,
    color: dark ? C.white : C.navy,
    fontFace: FONT,
  });
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.85,
    y: 0.95,
    w: 1.15,
    h: 0.06,
    fill: { color: C.teal },
    line: { color: C.teal },
  });
}

function wordmark(slide, x, y, size = 28, align = "left") {
  slide.addText(
    [
      { text: "Finti", options: { color: C.navy, bold: true } },
      { text: "Q", options: { color: C.teal, bold: true } },
      { text: " Solutions", options: { color: C.navy, bold: true } },
    ],
    { x, y, w: 8, h: 0.55, fontSize: size, fontFace: FONT, align },
  );
}

function wordmarkLight(slide, x, y, size = 28, align = "left") {
  slide.addText(
    [
      { text: "Finti", options: { color: C.white, bold: true } },
      { text: "Q", options: { color: C.teal, bold: true } },
      { text: " Solutions", options: { color: C.white, bold: true } },
    ],
    { x, y, w: 10, h: 0.55, fontSize: size, fontFace: FONT, align },
  );
}

function card(slide, x, y, w, h, { fill = C.white, line = C.line, radius = 0.1 } = {}) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x,
    y,
    w,
    h,
    fill: { color: fill },
    line: { color: line, width: 1 },
    rectRadius: radius,
  });
}

function accentStripe(slide, x, y, h, color = C.teal) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x,
    y,
    w: 0.12,
    h,
    fill: { color },
    line: { color },
  });
}

const TOTAL = 16;

// ═══════════════════════════════════════════════════════════
// 1 — COVER
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  darkBg(s);
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 0,
    y: 5.85,
    w: W,
    h: 1.65,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  s.addText("COMPANY PROFILE", {
    x: 0.9,
    y: 1.35,
    w: 11.5,
    h: 0.4,
    fontSize: 14,
    bold: true,
    color: C.teal,
    fontFace: FONT,
    align: "center",
    charSpacing: 6,
  });
  if (hasMark) {
    s.addImage({ path: markPath, x: 5.75, y: 1.95, w: 1.85, h: 0.85 });
  }
  wordmarkLight(s, 1.5, 3.0, 40, "center");
  s.addText("Technology partner for regulated financial institutions", {
    x: 2,
    y: 3.7,
    w: 9.3,
    h: 0.35,
    fontSize: 14,
    color: "A8D4F0",
    fontFace: FONT,
    align: "center",
  });
  s.addText("Accelerate digital financial growth with secure fintech platforms.", {
    x: 1.5,
    y: 6.15,
    w: 10.3,
    h: 0.4,
    fontSize: 16,
    color: C.white,
    fontFace: FONT,
    align: "center",
  });
  s.addText("Islamabad, Pakistan  ·  fintiqsolutions.com  ·  Confidential", {
    x: 1.5,
    y: 6.65,
    w: 10.3,
    h: 0.3,
    fontSize: 11,
    color: "8AA0B8",
    fontFace: FONT,
    align: "center",
  });
}

// ═══════════════════════════════════════════════════════════
// 2 — AGENDA
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Agenda");
  const agenda = [
    ["01", "Who we are", "Mission, vision, and regulatory position"],
    ["02", "What we build", "Enterprise platforms, channels, and AI solutions"],
    ["03", "Selected projects", "Payment gateway, corporate banking, lending stack"],
    ["04", "How we deliver", "Engagement models, UAT, and support"],
    ["05", "Why FintiQ", "Differentiators and next step"],
  ];
  agenda.forEach((a, i) => {
    const y = 1.25 + i * 0.95;
    card(s, 0.9, y, 11.5, 0.82, { fill: i % 2 ? C.soft : C.white });
    s.addText(a[0], {
      x: 1.15,
      y: y + 0.2,
      w: 0.9,
      h: 0.4,
      fontSize: 20,
      bold: true,
      color: C.teal,
      fontFace: FONT,
    });
    s.addText(a[1], {
      x: 2.2,
      y: y + 0.12,
      w: 4.5,
      h: 0.35,
      fontSize: 16,
      bold: true,
      color: C.navy,
      fontFace: FONT,
    });
    s.addText(a[2], {
      x: 6.8,
      y: y + 0.2,
      w: 5.2,
      h: 0.4,
      fontSize: 13,
      color: C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 2, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 3 — ABOUT
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "About FintiQ Solutions");
  s.addText(
    "FintiQ Solutions (Private) Limited builds secure, scalable fintech platforms for banks, financial institutions, and fintech companies. We focus on structured architecture, secure integrations, and governance-aware delivery — so operators can run regulated journeys with confidence.",
    {
      x: 0.9,
      y: 1.2,
      w: 11.5,
      h: 1.0,
      fontSize: 15,
      color: C.navy,
      fontFace: FONT,
    },
  );
  card(s, 0.9, 2.4, 5.85, 3.7, { fill: C.navy, line: C.navy });
  s.addText("Our Mission", {
    x: 1.2,
    y: 2.65,
    w: 5.3,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: C.teal,
    fontFace: FONT,
  });
  s.addText(
    "Support financial institutions and fintech organisations with secure, modern, and scalable digital platforms that strengthen operational workflows and enable responsible financial innovation — aligned with real-world processes and long-term objectives.",
    {
      x: 1.2,
      y: 3.2,
      w: 5.3,
      h: 2.5,
      fontSize: 13,
      color: C.white,
      fontFace: FONT,
    },
  );
  card(s, 7.0, 2.4, 5.4, 3.7, { fill: C.white });
  s.addText("Our Vision", {
    x: 7.3,
    y: 2.65,
    w: 4.9,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: C.navy,
    fontFace: FONT,
  });
  s.addText(
    "Be a trusted fintech technology partner for organisations navigating digital financial transformation — delivering adaptable, integration-ready platforms that evolve with regulation, transaction growth, and market change.",
    {
      x: 7.3,
      y: 3.2,
      w: 4.9,
      h: 2.5,
      fontSize: 13,
      color: C.mist,
      fontFace: FONT,
    },
  );
  footer(s, 3, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 4 — REGULATORY POSITION
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "How we work with regulated institutions");
  card(s, 0.9, 1.25, 11.5, 1.5, { fill: C.soft, line: C.teal });
  s.addText(
    "We operate as a technology development partner. Licensed institutions remain the system of record for customer funds and for regulated decisions such as account opening and credit approval. FintiQ does not claim EMI, PSO, PSP, or banking licenses.",
    {
      x: 1.2,
      y: 1.5,
      w: 10.9,
      h: 1.05,
      fontSize: 14,
      color: C.navy,
      fontFace: FONT,
    },
  );
  const points = [
    ["Platforms", "Cards, corporate banking, gateway, cash, remittance, LOS, LMS"],
    ["Channels", "Agent, consumer, wallet, merchant, and corporate portals"],
    ["Delivery", "Brand, integrate, UAT with your operators, support after go-live"],
    ["AI", "Agentic delivery + optional ops copilots — humans own release"],
  ];
  points.forEach((p, i) => {
    const x = 0.9 + (i % 2) * 6.05;
    const y = 3.05 + Math.floor(i / 2) * 1.55;
    card(s, x, y, 5.8, 1.35);
    accentStripe(s, x, y, 1.35);
    s.addText(p[0], {
      x: x + 0.35,
      y: y + 0.25,
      w: 5.2,
      h: 0.35,
      fontSize: 15,
      bold: true,
      color: C.navy,
      fontFace: FONT,
    });
    s.addText(p[1], {
      x: x + 0.35,
      y: y + 0.65,
      w: 5.2,
      h: 0.5,
      fontSize: 12,
      color: C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 4, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 5 — PRODUCT PORTFOLIO
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Enterprise product portfolio");
  const products = [
    ["Card Payment System", "Issuance, authorization, limits, PIN, servicing"],
    ["Corporate Banking", "Portal, maker-checker, bulk payments"],
    ["Payment Gateway", "Checkout, merchants, settlement, disbursement"],
    ["Cash Management", "Positions, liquidity, controlled movement"],
    ["Remittance System", "Corridors, compliance, send/receive ops"],
    ["Loan Origination (LOS)", "Intake, assessment, decision, handoff"],
    ["Loan Management (LMS)", "Schedules, collections, book changes"],
  ];
  products.forEach((p, i) => {
    const topRow = i < 4;
    const xx = topRow ? 0.75 + i * 3.1 : 0.9 + (i - 4) * 4.0;
    const yy = topRow ? 1.25 : 3.9;
    const ww = topRow ? 2.95 : 3.8;
    card(s, xx, yy, ww, 2.2);
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xx + ww / 2 - 0.6,
      y: yy + 0.3,
      w: 1.2,
      h: 0.45,
      fill: { color: C.navy },
      line: { color: C.navy },
      rectRadius: 0.06,
    });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: xx + ww / 2 - 0.6,
      y: yy + 0.35,
      w: 1.2,
      h: 0.35,
      fontSize: 14,
      bold: true,
      color: C.teal,
      fontFace: FONT,
      align: "center",
    });
    s.addText(p[0], {
      x: xx + 0.2,
      y: yy + 0.95,
      w: ww - 0.4,
      h: 0.55,
      fontSize: 13,
      bold: true,
      color: C.navy,
      fontFace: FONT,
      align: "center",
    });
    s.addText(p[1], {
      x: xx + 0.2,
      y: yy + 1.5,
      w: ww - 0.4,
      h: 0.5,
      fontSize: 11,
      color: C.mist,
      fontFace: FONT,
      align: "center",
    });
  });
  footer(s, 5, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 6 — CHANNELS
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Channels on one operating model");
  s.addText(
    "Channels differ. The books, rails, and controls behind them should not. FintiQ places agent, consumer, wallet, merchant, and corporate journeys on shared platforms.",
    {
      x: 0.9,
      y: 1.2,
      w: 11.5,
      h: 0.7,
      fontSize: 14,
      color: C.mist,
      fontFace: FONT,
    },
  );
  const channels = [
    ["Agent Banking", "Cash-in/out, transfers, agent wallets"],
    ["Consumer Banking", "Retail accounts, payments, self-service"],
    ["Wallet Banking", "Balance, P2P, bills, top-up"],
    ["Merchant Portal", "Invoices, checkout, settlement"],
    ["Corporate Portal", "Approvals and business payments"],
  ];
  channels.forEach((c, i) => {
    const x = 0.75 + i * 2.45;
    card(s, x, 2.2, 2.3, 3.8, { fill: i % 2 ? C.navy : C.white, line: i % 2 ? C.navy : C.line });
    s.addText(String(i + 1).padStart(2, "0"), {
      x: x + 0.15,
      y: 2.5,
      w: 2.0,
      h: 0.4,
      fontSize: 18,
      bold: true,
      color: C.teal,
      fontFace: FONT,
      align: "center",
    });
    s.addText(c[0], {
      x: x + 0.15,
      y: 3.3,
      w: 2.0,
      h: 0.9,
      fontSize: 14,
      bold: true,
      color: i % 2 ? C.white : C.navy,
      fontFace: FONT,
      align: "center",
    });
    s.addText(c[1], {
      x: x + 0.15,
      y: 4.4,
      w: 2.0,
      h: 1.1,
      fontSize: 12,
      color: i % 2 ? "B8D4D0" : C.mist,
      fontFace: FONT,
      align: "center",
    });
  });
  footer(s, 6, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 7 — PROJECTS INTRO
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  darkBg(s);
  s.addText("SELECTED PROJECTS", {
    x: 0.9,
    y: 2.2,
    w: 11.5,
    h: 0.45,
    fontSize: 14,
    bold: true,
    color: C.teal,
    fontFace: FONT,
    align: "center",
    charSpacing: 4,
  });
  s.addText("What we ship for institutions", {
    x: 0.9,
    y: 2.85,
    w: 11.5,
    h: 0.7,
    fontSize: 32,
    bold: true,
    color: C.white,
    fontFace: FONT,
    align: "center",
  });
  s.addText(
    "Anonymous engagement summaries — problem, what shipped, and the outcome operators signed in UAT.\nClient names omitted. Licensed institutions keep funds and regulated decisions.",
    {
      x: 1.8,
      y: 3.8,
      w: 9.7,
      h: 1.2,
      fontSize: 14,
      color: "A8B8D0",
      fontFace: FONT,
      align: "center",
    },
  );
  footer(s, 7, TOTAL, true);
}

// ═══════════════════════════════════════════════════════════
// 8 — PROJECT: Payment Gateway
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Project 01 — Institutional payment gateway");
  s.addText("Domain: Payments  ·  Platforms: Payment Gateway + Merchant Portal", {
    x: 0.9,
    y: 1.15,
    w: 11.5,
    h: 0.3,
    fontSize: 12,
    color: C.tealDeep,
    fontFace: FONT,
  });
  const cols = [
    ["Challenge", "Collections, settlement, and merchant operations lived in separate tools. Finance could not close the merchant book from one desk."],
    ["What we shipped", "Payment gateway with merchant portal, hosted checkout, collection APIs, callbacks, and a settlement desk under institution branding."],
    ["Outcome", "Institution runs the merchant book. Platform runs the payment path. Ops signed invoice → checkout → callback → settlement in UAT."],
  ];
  cols.forEach((c, i) => {
    const x = 0.85 + i * 4.05;
    card(s, x, 1.65, 3.9, 4.4, { fill: i === 2 ? C.navy : C.white, line: i === 2 ? C.navy : C.line });
    s.addText(c[0], {
      x: x + 0.25,
      y: 1.95,
      w: 3.4,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: i === 2 ? C.teal : C.navy,
      fontFace: FONT,
    });
    s.addText(c[1], {
      x: x + 0.25,
      y: 2.55,
      w: 3.4,
      h: 3.1,
      fontSize: 13,
      color: i === 2 ? C.white : C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 8, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 9 — PROJECT: Corporate Banking
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Project 02 — Corporate banking portal");
  s.addText("Domain: Corporate  ·  Platforms: Corporate Banking + Corporate Portal", {
    x: 0.9,
    y: 1.15,
    w: 11.5,
    h: 0.3,
    fontSize: 12,
    color: C.tealDeep,
    fontFace: FONT,
  });
  const cols = [
    ["Challenge", "Business clients needed multi-user access, approval matrices, and bulk payments without branch friction. Core stayed the system of record."],
    ["What we shipped", "Branded corporate portal with maker-checker flows, beneficiaries, statements, and bulk/scheduled payments wired to the institution’s core."],
    ["Outcome", "Corporate ops signed a live payment journey in UAT. Approvals match the firm’s operating model; balances and postings remain with the core."],
  ];
  cols.forEach((c, i) => {
    const x = 0.85 + i * 4.05;
    card(s, x, 1.65, 3.9, 4.4, { fill: i === 1 ? C.navy : C.white, line: i === 1 ? C.navy : C.line });
    s.addText(c[0], {
      x: x + 0.25,
      y: 1.95,
      w: 3.4,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: i === 1 ? C.teal : C.navy,
      fontFace: FONT,
    });
    s.addText(c[1], {
      x: x + 0.25,
      y: 2.55,
      w: 3.4,
      h: 3.1,
      fontSize: 13,
      color: i === 1 ? C.white : C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 9, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 10 — PROJECT: Lending
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Project 03 — Lending stack (LOS → LMS)");
  s.addText("Domain: Lending  ·  Platforms: Loan Origination + Loan Management", {
    x: 0.9,
    y: 1.15,
    w: 11.5,
    h: 0.3,
    fontSize: 12,
    color: C.tealDeep,
    fontFace: FONT,
  });
  const cols = [
    ["Challenge", "Origination and servicing were split across spreadsheets and legacy screens. No single governed pipeline from application to repayment."],
    ["What we shipped", "LOS into LMS with shared operating model: intake, documents, assessment queue, decision, schedules, collections, and controlled book changes."],
    ["Outcome", "Application through repayment tracked in one pipeline. Lending ops UAT’d a full file and a repayment/arrears cycle with an audit trail."],
  ];
  cols.forEach((c, i) => {
    const x = 0.85 + i * 4.05;
    card(s, x, 1.65, 3.9, 4.4, { fill: i === 0 ? C.navy : C.white, line: i === 0 ? C.navy : C.line });
    s.addText(c[0], {
      x: x + 0.25,
      y: 1.95,
      w: 3.4,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: i === 0 ? C.teal : C.navy,
      fontFace: FONT,
    });
    s.addText(c[1], {
      x: x + 0.25,
      y: 2.55,
      w: 3.4,
      h: 3.1,
      fontSize: 13,
      color: i === 0 ? C.white : C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 10, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 11 — MORE CAPABILITY SNAPSHOTS
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Additional capability snapshots");
  s.addText("Representative delivery patterns across the rest of the portfolio.", {
    x: 0.9,
    y: 1.15,
    w: 11.5,
    h: 0.35,
    fontSize: 13,
    color: C.mist,
    fontFace: FONT,
  });
  const snaps = [
    ["Card Payment System", "Issue → authorize → service a live card in UAT", "Desk + cardholder APIs, limits, PIN, audit"],
    ["Cash Management", "Position → controlled payment → desk report", "Liquidity views, dual control, treasury close"],
    ["Remittance System", "Successful remittance + held compliance case", "Corridors, partner config, review queues"],
    ["Payments & Core Integration", "Success + failure path traced end-to-end", "Rails, core/wallet hosts, sandbox contracts"],
  ];
  snaps.forEach((sn, i) => {
    const y = 1.65 + i * 1.15;
    card(s, 0.9, y, 11.5, 1.0);
    accentStripe(s, 0.9, y, 1.0, C.teal);
    s.addText(sn[0], {
      x: 1.25,
      y: y + 0.15,
      w: 3.8,
      h: 0.35,
      fontSize: 14,
      bold: true,
      color: C.navy,
      fontFace: FONT,
    });
    s.addText(sn[1], {
      x: 5.2,
      y: y + 0.15,
      w: 6.8,
      h: 0.35,
      fontSize: 13,
      color: C.tealDeep,
      fontFace: FONT,
    });
    s.addText(sn[2], {
      x: 1.25,
      y: y + 0.52,
      w: 10.8,
      h: 0.35,
      fontSize: 12,
      color: C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 11, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 12 — SERVICES & ENGAGEMENTS
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Services & engagement models");
  const services = [
    ["Platform implementation", "Brand, configure, integrate, UAT, handover"],
    ["Payments & core integration", "Rails and core behind one channel contract"],
    ["Compliance engineering", "KYC queues, holds, audit evidence"],
    ["Resource augmentation", "Specialists and squads on your backlog"],
    ["Production support", "Releases, monitoring, named contact"],
  ];
  services.forEach((sv, i) => {
    const y = 1.2 + i * 0.72;
    card(s, 0.9, y, 6.3, 0.62, { fill: C.white });
    s.addText(sv[0], {
      x: 1.15,
      y: y + 0.08,
      w: 5.8,
      h: 0.22,
      fontSize: 13,
      bold: true,
      color: C.navy,
      fontFace: FONT,
    });
    s.addText(sv[1], {
      x: 1.15,
      y: y + 0.32,
      w: 5.8,
      h: 0.22,
      fontSize: 11,
      color: C.mist,
      fontFace: FONT,
    });
  });
  const engages = [
    ["One specialist", "Named engineer in your stand-up"],
    ["A squad", "Backend, frontend, mobile, QA"],
    ["Build, then stay", "Ship platform, keep people on roadmap"],
    ["Retainer", "Production fixes and small changes"],
  ];
  engages.forEach((e, i) => {
    const y = 1.2 + i * 1.15;
    card(s, 7.5, y, 5.0, 1.0, { fill: i % 2 ? C.navy : C.soft, line: i % 2 ? C.navy : C.line });
    s.addText(e[0], {
      x: 7.8,
      y: y + 0.18,
      w: 4.4,
      h: 0.3,
      fontSize: 14,
      bold: true,
      color: i % 2 ? C.teal : C.navy,
      fontFace: FONT,
    });
    s.addText(e[1], {
      x: 7.8,
      y: y + 0.52,
      w: 4.4,
      h: 0.3,
      fontSize: 12,
      color: i % 2 ? C.white : C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 12, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 13 — DELIVERY METHOD
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Delivery method");
  const steps = [
    ["01", "Discover", "Scope the platform, channel, and first UAT journey."],
    ["02", "Configure", "Brand, roles, products, rules, environments."],
    ["03", "Integrate", "Core, rails, identity — success and failure paths."],
    ["04", "UAT", "Operators sign a live payment, card, or loan path."],
    ["05", "Go-live", "Handover, runbooks, named support contact."],
    ["06", "Evolve", "Squad, retainer, or specialist on the roadmap."],
  ];
  steps.forEach((st, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.85 + col * 4.05;
    const y = 1.3 + row * 2.55;
    card(s, x, y, 3.85, 2.25, { fill: row === 0 ? C.navy : C.white, line: row === 0 ? C.navy : C.line });
    s.addText(st[0], {
      x: x + 0.25,
      y: y + 0.3,
      w: 3.3,
      h: 0.35,
      fontSize: 18,
      bold: true,
      color: C.teal,
      fontFace: FONT,
    });
    s.addText(st[1], {
      x: x + 0.25,
      y: y + 0.8,
      w: 3.3,
      h: 0.4,
      fontSize: 16,
      bold: true,
      color: row === 0 ? C.white : C.navy,
      fontFace: FONT,
    });
    s.addText(st[2], {
      x: x + 0.25,
      y: y + 1.35,
      w: 3.3,
      h: 0.65,
      fontSize: 12,
      color: row === 0 ? "B8D4D0" : C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 13, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 14 — AI + TECH
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "AI solutions & engineering strengths");
  card(s, 0.9, 1.25, 5.9, 4.85, { fill: C.navy, line: C.navy });
  s.addText("AI for systems", {
    x: 1.25,
    y: 1.55,
    w: 5.2,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: C.teal,
    fontFace: FONT,
  });
  s.addText(
    [
      { text: "Agentic AI in delivery — analysis, tests, docs", options: { bullet: true, breakLine: true } },
      { text: "Ops copilots for queues and reconciliation", options: { bullet: true, breakLine: true } },
      { text: "Smarter UAT cycles without skipping governance", options: { bullet: true, breakLine: true } },
      { text: "Humans remain accountable for release", options: { bullet: true, breakLine: true } },
      { text: "Licensed institution keeps regulated decisions", options: { bullet: true, breakLine: true } },
    ],
    {
      x: 1.25,
      y: 2.2,
      w: 5.2,
      h: 3.4,
      fontSize: 14,
      color: C.white,
      fontFace: FONT,
      paraSpacing: 8,
    },
  );
  card(s, 7.05, 1.25, 5.4, 4.85);
  s.addText("Capabilities we place", {
    x: 7.4,
    y: 1.55,
    w: 4.8,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: C.navy,
    fontFace: FONT,
  });
  const caps = [
    "Java & Spring Boot",
    "React portals",
    "Android agent & wallet apps",
    "Payment integration",
    "QA & UAT",
    "DevOps",
    "Banking business analysis",
    "AI-assisted delivery",
  ];
  s.addText(
    caps.map((c) => ({ text: c, options: { bullet: true, breakLine: true } })),
    {
      x: 7.4,
      y: 2.2,
      w: 4.8,
      h: 3.5,
      fontSize: 14,
      color: C.mist,
      fontFace: FONT,
      paraSpacing: 6,
    },
  );
  footer(s, 14, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 15 — WHY FINTIQ
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  lightBg(s);
  sectionTitle(s, "Why institutions choose FintiQ");
  const why = [
    ["01", "Technology partner, not a licensee claim", "Platforms for institutions that keep the license, ledger, and decision."],
    ["02", "Secure, scalable architecture", "Structured systems for payments, wallets, lending, and operations."],
    ["03", "Integration-ready", "APIs and channel layers that sit cleanly in front of banking infrastructure."],
    ["04", "Governance-aware delivery", "Clear milestones, UAT journeys, and audit trails operations can defend."],
    ["05", "Domain-ready people", "Engineers fluent in cards, payments, remittance, and lending from week one."],
    ["06", "Support after go-live", "Production cover, staying squad, or a specialist on your backlog."],
  ];
  why.forEach((w, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.85 + col * 6.15;
    const y = 1.25 + row * 1.7;
    card(s, x, y, 5.95, 1.5);
    s.addText(w[0], {
      x: x + 0.25,
      y: y + 0.25,
      w: 0.7,
      h: 0.35,
      fontSize: 16,
      bold: true,
      color: C.teal,
      fontFace: FONT,
    });
    s.addText(w[1], {
      x: x + 1.05,
      y: y + 0.25,
      w: 4.6,
      h: 0.35,
      fontSize: 14,
      bold: true,
      color: C.navy,
      fontFace: FONT,
    });
    s.addText(w[2], {
      x: x + 1.05,
      y: y + 0.75,
      w: 4.6,
      h: 0.55,
      fontSize: 12,
      color: C.mist,
      fontFace: FONT,
    });
  });
  footer(s, 15, TOTAL);
}

// ═══════════════════════════════════════════════════════════
// 16 — CONTACT / CLOSE
// ═══════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  darkBg(s);
  if (hasMark) {
    s.addImage({ path: markPath, x: 5.75, y: 1.15, w: 1.85, h: 0.85 });
  }
  wordmarkLight(s, 1.5, 2.2, 34, "center");
  s.addText("Let’s scope the platform — or the people — you need live.", {
    x: 1.8,
    y: 2.95,
    w: 9.7,
    h: 0.45,
    fontSize: 16,
    color: "A8D4F0",
    fontFace: FONT,
    align: "center",
  });
  card(s, 2.8, 3.65, 7.7, 2.35, { fill: C.navy, line: "1A3A6E" });
  s.addText("FintiQ Solutions (Private) Limited", {
    x: 3.1,
    y: 3.85,
    w: 7.1,
    h: 0.35,
    fontSize: 14,
    bold: true,
    color: C.teal,
    fontFace: FONT,
    align: "center",
  });
  s.addText(
    "House # 5, Street 7, Block C, Naval Anchorage, Islamabad\n\ninfo@fintiqsolutions.com    ·    support@fintiqsolutions.com\nhttps://fintiqsolutions.com",
    {
      x: 3.1,
      y: 4.3,
      w: 7.1,
      h: 1.4,
      fontSize: 13,
      color: C.white,
      fontFace: FONT,
      align: "center",
    },
  );
  s.addText("Thank you  ·  Confidential", {
    x: 1.5,
    y: 6.3,
    w: 10.3,
    h: 0.3,
    fontSize: 12,
    color: "8AA0B8",
    fontFace: FONT,
    align: "center",
  });
}

await pptx.writeFile({ fileName: outPath });
console.log("Wrote", outPath, `(${TOTAL} slides)`);
