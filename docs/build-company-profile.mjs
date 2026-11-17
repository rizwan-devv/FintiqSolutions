import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mark = fs.readFileSync(path.join(__dirname, "../public/brand/mark.png")).toString("base64");
const markSrc = `data:image/png;base64,${mark}`;

const TOTAL = 10;
const pad = (n) => String(n).padStart(2, "0");
const footer = (n, section) => {
  const pct = Math.round((n / TOTAL) * 100);
  return `
    <div class="footer">
      <div class="foot-addr">FintiQ Solutions (Private) Limited · House # 5, Street 7, Block C, Naval Anchorage, Islamabad</div>
      <div class="center">CONFIDENTIAL</div>
      <div class="right"><span class="pg">${pad(n)} / ${pad(TOTAL)}</span> · ${section}</div>
    </div>
    <div class="progress" aria-hidden="true"><span style="width:${pct}%"></span></div>`;
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>FintiQ Solutions — Company Profile</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
  :root {
    --navy: #0a1c33;
    --deep: #050f1c;
    --steel: #152a45;
    --accent: #1e4d6b;
    --accent-soft: #8fa9bc;
    --gold: #b8954a;
    --gold-soft: #d4b56a;
    --ink: #121c2b;
    --mist: #5a6878;
    --line: #d9e0e8;
    --paper: #f5f7fa;
    --white: #ffffff;
    --panel: #0c223c;
    --grad: linear-gradient(145deg, #050f1c 0%, #0a1c33 48%, #132a46 100%);
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    font-family: "DM Sans", "Segoe UI", sans-serif;
    background: #1a2332;
    color: var(--ink);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .toolbar {
    position: sticky; top: 0; z-index: 30;
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 16px; background: var(--deep); color: #fff; font-size: 13px;
  }
  .toolbar button {
    border: 0; border-radius: 2px; padding: 8px 16px; font-weight: 700;
    background: var(--gold); color: var(--deep); cursor: pointer;
  }
  .slide {
    width: 297mm;
    height: 210mm;
    margin: 8mm auto;
    background: var(--paper);
    position: relative;
    overflow: hidden;
    box-shadow: 0 16px 40px rgba(6,21,37,.28);
    page-break-after: always;
  }
  .slide:last-of-type { page-break-after: auto; }
  .slide.dark { background: var(--deep); color: #fff; }
  .slide.dark .footer {
    border-top-color: rgba(255,255,255,.12);
    color: rgba(255,255,255,.5);
  }
  .slide.dark .footer .center { color: rgba(255,255,255,.65); }
  .slide.dark .footer .right { color: var(--gold-soft); }
  .slide.dark .footer .pg { color: #fff; }
  .slide.band .band-head {
    margin: -13mm -17mm 4.5mm -19mm;
    padding: 8mm 17mm 5.5mm 19mm;
    background: var(--panel); color: #fff;
  }
  .slide.band .band-head .kicker { color: var(--gold-soft); margin-bottom: 2mm; }
  .slide.band .band-head .title { color: #fff; margin-bottom: 0; }
  .slide.band .band-head .title .accent { color: var(--gold-soft); }
  .slide.band .band-head .lead { color: rgba(255,255,255,.68); margin: 2.5mm 0 0; }

  .atm { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .atm .rule {
    position: absolute; left: 0; top: 0; bottom: 0; width: 3mm;
    background: var(--navy);
  }
  .atm .rule::after {
    content: ""; position: absolute; left: 3mm; top: 0; width: 1.1mm; height: 100%;
    background: var(--gold);
  }
  .atm .hair {
    position: absolute; right: 14mm; top: 12mm; width: 42mm; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(184,149,74,.35), transparent);
  }

  .content {
    position: relative; z-index: 2;
    height: 100%;
    padding: 13mm 17mm 10mm 19mm;
    display: flex; flex-direction: column;
  }
  .footer {
    margin-top: auto;
    display: grid; grid-template-columns: 1.65fr .5fr .85fr; gap: 6px;
    align-items: end;
    padding-top: 2.5mm;
    border-top: 1px solid var(--line);
    font-size: 6.5pt; color: var(--mist); font-weight: 500;
  }
  .footer .center {
    text-align: center; color: var(--navy); font-weight: 700;
    letter-spacing: .14em; font-size: 6.5pt;
  }
  .footer .right { text-align: right; color: var(--navy); font-weight: 600; }
  .footer .pg {
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700; letter-spacing: .04em;
    color: var(--navy);
  }
  .progress {
    position: absolute; left: 19mm; right: 17mm; bottom: 5.5mm; z-index: 3;
    height: 1.2px; background: rgba(11,31,58,.1);
  }
  .progress span {
    display: block; height: 100%; background: var(--gold);
  }
  .slide.dark .progress { background: rgba(255,255,255,.12); left: 22mm; right: 20mm; bottom: 7mm; }

  .kicker {
    display: inline-flex; align-items: center; gap: 2.5mm;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 7pt; font-weight: 600; letter-spacing: .22em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 2mm;
  }
  .kicker::before {
    content: ""; width: 7mm; height: 1.4px; background: var(--gold);
  }
  .slide.dark .kicker { color: var(--gold-soft); }

  h1.title {
    margin: 0 0 2.5mm;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 25pt; letter-spacing: -.025em; color: var(--navy); font-weight: 700;
    line-height: 1.08;
  }
  h1.title .accent { color: var(--gold); }
  .slide.dark h1.title { color: #fff; }
  .lead {
    margin: 0 0 3.5mm; max-width: 240mm;
    font-size: 10pt; line-height: 1.5; color: var(--mist); font-weight: 500;
  }
  .slide.dark .lead { color: rgba(255,255,255,.7); }
  p { margin: 0 0 3mm; line-height: 1.55; color: var(--ink); font-size: 10.5pt; }
  .subhead {
    margin: 0 0 3mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 12pt; font-weight: 700; color: var(--navy);
  }
  ul.plain { margin: 2mm 0 0; padding-left: 5mm; }
  ul.plain li { margin: 0 0 2.2mm; font-size: 10.5pt; line-height: 1.45; color: var(--ink); }

  .chip-row { display: flex; flex-wrap: wrap; gap: 2mm; margin-top: 3mm; }
  .chip {
    display: inline-flex; align-items: center;
    padding: 1.3mm 2.8mm; border-radius: 2px;
    font-size: 7.5pt; font-weight: 600;
    background: rgba(184,149,74,.1); color: var(--navy);
    border: 1px solid rgba(184,149,74,.28);
  }

  .panel {
    border-radius: 2px;
    padding: 5mm 5.5mm;
    background: var(--white);
    border: 1px solid var(--line);
  }
  .panel.navy {
    background: var(--panel); border: 0; color: #fff;
  }
  .panel.navy p, .panel.navy li { color: rgba(255,255,255,.88); }

  .two-col { display: grid; grid-template-columns: 1.2fr .8fr; gap: 7mm; flex: 1; min-height: 0; }
  .two-col.eq { grid-template-columns: 1fr 1fr; }

  .services { margin: 0; padding: 0; list-style: none; }
  .services li {
    list-style: none; margin: 0 0 3.2mm; padding: 0;
    display: grid; grid-template-columns: 8mm 1fr; gap: 3mm; align-items: start;
  }
  .services .ico {
    width: 6.5mm; height: 6.5mm; border-radius: 2px;
    background: var(--navy); color: var(--gold-soft);
    display: grid; place-items: center;
    font-family: "IBM Plex Sans", sans-serif;
    font-size: 8pt; font-weight: 700; margin-top: .4mm;
  }
  .services strong {
    display: block; color: var(--navy); font-size: 10.5pt; margin-bottom: .6mm;
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700;
  }
  .services span { display: block; color: var(--mist); font-size: 8.8pt; line-height: 1.42; }

  .feature-box h3 {
    margin: 0 0 2.5mm; color: var(--navy);
    font-family: "IBM Plex Sans", sans-serif; font-size: 13pt; font-weight: 700;
  }
  .feature-box .panel.navy { min-height: 105mm; }
  .feature-box ul { margin: 0; padding-left: 5mm; }
  .feature-box li { margin: 0 0 2.8mm; font-size: 9.5pt; line-height: 1.4; }

  /* Cover */
  .cover-bg {
    position: absolute; inset: 0; z-index: 0;
    background: var(--grad);
  }
  .cover-bg::before {
    content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4mm;
    background: var(--gold);
  }
  .cover-bg::after {
    content: "";
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 40% 35% at 88% 18%, rgba(184,149,74,.12), transparent 55%),
      linear-gradient(180deg, transparent 55%, rgba(0,0,0,.22) 100%);
  }
  .cover-content {
    position: relative; z-index: 2; height: 100%;
    padding: 16mm 20mm 14mm 22mm;
    display: flex; flex-direction: column; color: #fff;
  }
  .cover-top {
    display: flex; justify-content: space-between; align-items: center;
  }
  .brand-lockup { display: flex; align-items: center; gap: 4mm; }
  .brand-lockup img { height: 13mm; width: auto; }
  .brand-lockup .name {
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 15pt;
    letter-spacing: -.01em; line-height: 1;
  }
  .brand-lockup .name .q { color: var(--gold-soft); }
  .brand-lockup .sub {
    margin-top: 1.2mm; font-size: 7pt; letter-spacing: .2em; text-transform: uppercase;
    color: rgba(255,255,255,.5); font-weight: 600;
  }
  .cover-pill {
    padding: 2mm 4mm; border-radius: 2px;
    border: 1px solid rgba(184,149,74,.4);
    background: rgba(184,149,74,.08);
    font-size: 7.5pt; font-weight: 600; letter-spacing: .14em; text-transform: uppercase;
    color: var(--gold-soft);
  }
  .cover-hero {
    flex: 1; display: flex; flex-direction: column; justify-content: center;
    max-width: 215mm; padding-top: 2mm;
  }
  .cover-hero h1 {
    margin: 0 0 4mm;
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700;
    font-size: 38pt; line-height: 1.02; letter-spacing: -.03em; color: #fff;
  }
  .cover-hero h1 span { display: block; }
  .cover-hero h1 .line2 { color: var(--gold-soft); }
  .cover-hero .tag {
    margin: 0; max-width: 175mm;
    font-size: 12pt; font-weight: 500; line-height: 1.45;
    color: rgba(255,255,255,.75);
  }
  .cover-hero .tag em {
    font-style: normal; color: #fff; font-weight: 600;
  }
  .cover-strip {
    display: flex; flex-wrap: wrap; gap: 2mm; margin-top: 7mm;
  }
  .cover-strip span {
    padding: 1.6mm 3.2mm; border-radius: 2px;
    border: 1px solid rgba(255,255,255,.16);
    background: rgba(255,255,255,.05);
    font-size: 7.5pt; font-weight: 600; letter-spacing: .06em;
    text-transform: uppercase; color: rgba(255,255,255,.82);
  }
  .cover-meta {
    display: flex; gap: 10mm; align-items: center;
    padding-top: 4mm; border-top: 1px solid rgba(255,255,255,.12);
    font-size: 8.5pt; color: rgba(255,255,255,.5); font-weight: 500;
  }
  .cover-meta strong { color: var(--gold-soft); font-weight: 700; }

  /* About */
  .split-about {
    display: grid; grid-template-columns: 1.25fr .75fr; gap: 7mm; flex: 1; align-items: stretch;
  }
  .mission {
    margin-top: 5mm; padding: 5mm 5.5mm; border-radius: 2px;
    background: var(--panel); color: #fff;
  }
  .mission .label {
    font-family: "IBM Plex Sans", sans-serif; font-size: 10pt; font-weight: 700;
    color: var(--gold); margin-bottom: 2mm; letter-spacing: .06em; text-transform: uppercase;
  }
  .mission p { margin: 0; color: rgba(255,255,255,.9); font-size: 10pt; }
  .focus-box {
    margin-top: 4mm; padding: 4mm 5mm; border-radius: 2px;
    background: var(--white); border: 1px solid var(--line);
    border-left: 3.5px solid var(--gold);
  }
  .focus-box p { margin: 0 0 1mm; font-size: 9.5pt; color: var(--mist); }
  .focus-box strong { color: var(--navy); }
  .vision {
    border-radius: 2px; padding: 6mm 5.5mm;
    background: var(--navy); color: #fff;
    display: flex; flex-direction: column; justify-content: space-between;
    min-height: 100%;
  }
  .vision h3 {
    margin: 0 0 3mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 13pt; font-weight: 700; color: var(--gold);
  }
  .vision p { margin: 0; color: rgba(255,255,255,.88); font-size: 10pt; line-height: 1.55; }
  .vision .mark { margin-top: auto; padding-top: 8mm; opacity: .9; }
  .vision .mark img { height: 10mm; width: auto; }

  /* Platform groups */
  .plat-groups {
    display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 4mm; flex: 1; min-height: 0;
  }
  .plat-group {
    display: flex; flex-direction: column; gap: 2.5mm; min-height: 0;
  }
  .plat-group .g-label {
    font-family: "IBM Plex Sans", sans-serif; font-size: 7.5pt; font-weight: 700;
    letter-spacing: .16em; text-transform: uppercase; color: var(--gold);
    padding-bottom: 1.5mm; border-bottom: 1.5px solid rgba(184,149,74,.35);
  }
  .plat-card {
    background: var(--white); border: 1px solid var(--line); border-radius: 2px;
    padding: 3.2mm 3.5mm; flex: 1;
  }
  .plat-card.featured {
    background: var(--panel); border: 0; color: #fff;
  }
  .plat-card .code {
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 7.5pt;
    letter-spacing: .1em; text-transform: uppercase; color: var(--gold); margin-bottom: 1mm;
  }
  .plat-card.featured .code { color: var(--gold-soft); }
  .plat-card h3 {
    margin: 0 0 1.2mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 10pt; font-weight: 700; color: var(--navy);
  }
  .plat-card.featured h3 { color: #fff; }
  .plat-card p { margin: 0; font-size: 8pt; line-height: 1.35; color: var(--mist); }
  .plat-card.featured p { color: rgba(255,255,255,.78); }
  .plat-card ul { margin: 1.2mm 0 0; padding-left: 3.5mm; }
  .plat-card li { margin: 0 0 .8mm; font-size: 7.5pt; line-height: 1.3; color: var(--mist); }
  .plat-card.featured li { color: rgba(255,255,255,.78); }

  .app-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin-top: 2.5mm;
  }
  .app-tile {
    border-radius: 2px; padding: 3mm 3.2mm; background: var(--white); border: 1px solid var(--line);
    border-top: 2.5px solid var(--navy);
  }
  .app-tile .ico-line {
    display: flex; align-items: center; gap: 2mm; margin-bottom: 1.5mm;
  }
  .app-tile .glyph {
    width: 6mm; height: 6mm; border-radius: 2px;
    background: rgba(10,28,51,.06); color: var(--navy);
    display: grid; place-items: center;
    font-family: "IBM Plex Sans", sans-serif; font-size: 7pt; font-weight: 700;
  }
  .app-tile h3 {
    margin: 0; font-family: "IBM Plex Sans", sans-serif;
    font-size: 9.5pt; font-weight: 700; color: var(--navy);
  }
  .app-tile p { margin: 0; font-size: 7.6pt; color: var(--mist); line-height: 1.32; }
  .app-tile.span-all { grid-column: 1 / -1; border-top-color: var(--teal); }
  .app-tile .os {
    margin-top: 1.4mm; font-size: 6.5pt; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: var(--gold);
  }

  /* Tech — five capability boxes */
  .tech-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 2.8mm; flex: 1;
  }
  .tech-col {
    border-radius: 2px; padding: 3.5mm 3mm;
    background: var(--white); border: 1px solid var(--line);
    border-top: 2.5px solid var(--navy);
  }
  .tech-col.dark {
    background: var(--panel); border: 0; border-top: 2.5px solid var(--gold-soft); color: #fff;
  }
  .tech-col h3 {
    margin: 0 0 2.2mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 9pt; font-weight: 700; color: var(--navy);
    padding-bottom: 1.6mm; border-bottom: 1.5px solid var(--gold);
    line-height: 1.25;
  }
  .tech-col.dark h3 { color: #fff; border-bottom-color: var(--gold-soft); }
  .tech-col ul { margin: 0; padding: 0; list-style: none; }
  .tech-col li {
    margin: 0 0 1.6mm; font-size: 7.6pt; color: var(--ink); font-weight: 500;
    padding-left: 3mm; position: relative; line-height: 1.3;
  }
  .tech-col li::before {
    content: ""; position: absolute; left: 0; top: 1.8mm;
    width: 1.4mm; height: 1.4mm; border-radius: 50%; background: var(--gold);
  }
  .tech-col.dark li { color: rgba(255,255,255,.88); }
  .tech-col.dark li::before { background: var(--gold-soft); }
  .tech-note {
    margin-top: 3mm; padding: 2.8mm 4mm; border-radius: 2px;
    background: rgba(184,149,74,.08); border-left: 3px solid var(--gold);
    font-size: 8.5pt; color: var(--navy); line-height: 1.4;
  }
  .audience-strip {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5mm; margin-top: 4mm;
  }
  .audience-strip .audience-card { padding: 2.8mm 3mm; }
  .audience-strip .audience-card h3 { font-size: 9pt; margin-bottom: 1mm; }
  .audience-strip .audience-card p { font-size: 7.2pt; }

  .check-list { margin: 3mm 0 0; padding: 0; list-style: none; }
  .check-list li {
    display: grid; grid-template-columns: 6.5mm 1fr; gap: 2.5mm; align-items: start;
    margin: 0 0 3mm; font-size: 11pt; font-weight: 600; color: var(--navy);
  }
  .check-list .tick {
    width: 5.5mm; height: 5.5mm; border-radius: 2px;
    background: var(--navy); color: var(--gold-soft);
    display: grid; place-items: center; font-size: 7pt; font-weight: 700;
    margin-top: .8mm;
  }

  .build-grid {
    display: grid; grid-template-columns: 1.1fr .9fr; gap: 6mm; flex: 1; min-height: 0;
  }

  .proof-metrics {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 3.5mm; margin: 1mm 0 4mm;
  }
  .metric {
    border-radius: 2px; padding: 4mm 3.5mm;
    background: var(--white); border: 1px solid var(--line);
  }
  .metric.hot { background: var(--panel); border: 0; color: #fff; }
  .metric .num {
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 24pt;
    letter-spacing: -.03em; color: var(--navy); line-height: 1;
  }
  .metric.hot .num { color: var(--gold-soft); }
  .metric h3 {
    margin: 2mm 0 1mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 10pt; font-weight: 700; color: var(--navy);
  }
  .metric.hot h3 { color: #fff; }
  .metric p { margin: 0; font-size: 8pt; color: var(--mist); }
  .metric.hot p { color: rgba(255,255,255,.7); }
  .proof-outcomes {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; flex: 1;
  }
  .outcome {
    border-radius: 2px; padding: 4mm;
    background: var(--white); border: 1px solid var(--line);
    border-top: 3px solid var(--gold);
  }
  .outcome h3 {
    margin: 0 0 1.5mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 11pt; font-weight: 700; color: var(--navy);
  }
  .outcome p { margin: 0; font-size: 8.5pt; color: var(--mist); line-height: 1.4; }

  .client-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 3.5mm; margin: 0 0 3.5mm;
  }
  .client-card {
    background: var(--white); border: 1px solid var(--line); border-radius: 2px;
    padding: 0; overflow: hidden; display: flex; flex-direction: column; min-height: 34mm;
  }
  .client-logo-well {
    height: 16mm; margin: 0; padding: 2.5mm 3mm;
    display: grid; place-items: center;
    background: linear-gradient(180deg, #071422 0%, #0a1c33 100%);
    border-bottom: 1px solid rgba(184,149,74,.35);
  }
  .client-logo-well img {
    max-height: 11mm; max-width: 92%; width: auto; height: auto;
    object-fit: contain; display: block;
  }
  .client-body { padding: 2.5mm 3mm 3mm; flex: 1; }
  .client-card h3 {
    margin: 0 0 1mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 9.5pt; font-weight: 700; color: var(--navy);
  }
  .client-card .role {
    margin: 0 0 1.2mm; font-size: 6.8pt; letter-spacing: .12em; text-transform: uppercase;
    color: var(--gold); font-weight: 700;
  }
  .client-card p { margin: 0; font-size: 7.4pt; color: var(--mist); line-height: 1.35; }
  .sector-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin: 0 0 3.5mm;
  }
  .sector-card {
    background: var(--white); border: 1px solid var(--line); border-radius: 2px;
    padding: 3mm; border-top: 3px solid var(--gold);
  }
  .sector-card h3 {
    margin: 0 0 1.2mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 10pt; font-weight: 700; color: var(--navy);
  }
  .sector-card p { margin: 0; font-size: 7.5pt; color: var(--mist); line-height: 1.35; }
  .audience-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 3mm;
  }
  .audience-card {
    background: var(--panel); color: #fff; border-radius: 2px; padding: 3.5mm 4mm;
  }
  .audience-card h3 {
    margin: 0 0 1.5mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 10pt; font-weight: 700; color: var(--gold-soft);
  }
  .audience-card p { margin: 0; font-size: 8pt; color: rgba(255,255,255,.78); line-height: 1.4; }

  .timeline {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
    position: relative; margin: 1mm 0 5mm;
  }
  .timeline::before {
    content: ""; position: absolute; left: 8%; right: 8%; top: 6.5mm;
    height: 2px; background: linear-gradient(90deg, var(--navy), var(--gold));
    z-index: 0;
  }
  .t-step { position: relative; z-index: 1; padding: 0 3mm; text-align: center; }
  .t-step .dot {
    width: 13mm; height: 13mm; margin: 0 auto 3mm;
    border-radius: 50%;
    background: var(--navy); color: var(--gold-soft);
    display: grid; place-items: center;
    font-family: "IBM Plex Sans", sans-serif; font-weight: 700; font-size: 11pt;
    box-shadow: 0 0 0 3px var(--paper);
  }
  .t-step strong {
    display: block; font-family: "IBM Plex Sans", sans-serif;
    font-size: 10pt; font-weight: 700; color: var(--navy); margin-bottom: 1.2mm;
  }
  .t-step span {
    display: block; font-size: 8pt; line-height: 1.35; color: var(--mist); font-weight: 500;
  }
  .engage-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; }
  .engage {
    border-radius: 2px; padding: 3.5mm 3mm;
    background: var(--panel); color: #fff; min-height: 26mm;
  }
  .engage .label {
    font-size: 7pt; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5mm;
  }
  .engage p { margin: 0; font-size: 9pt; font-weight: 600; color: rgba(255,255,255,.9); line-height: 1.35; }

  .quote-bar {
    margin: 0 0 3.5mm; padding: 3.5mm 4.5mm; border-radius: 2px;
    background: rgba(184,149,74,.08); border-left: 3.5px solid var(--gold);
    font-family: "IBM Plex Sans", sans-serif; font-size: 12.5pt; font-weight: 700;
    color: var(--navy);
  }

  .contact-grid {
    display: grid; grid-template-columns: 1.1fr .9fr; gap: 5mm; margin-top: 2mm; flex: 1;
  }
  .contact-card {
    border-radius: 2px; padding: 5.5mm;
    background: var(--white); border: 1px solid var(--line);
  }
  .contact-card.navy { background: var(--panel); border: 0; color: #fff; }
  .contact-card h3 {
    margin: 0 0 2.5mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 11pt; font-weight: 700; color: var(--gold);
  }
  .contact-card.navy h3 { color: var(--gold); }
  .contact-card p { margin: 0 0 1.5mm; font-size: 10.5pt; color: var(--mist); }
  .contact-card.navy p { color: rgba(255,255,255,.8); }
  .contact-card strong { color: var(--ink); font-weight: 700; }
  .contact-card.navy strong { color: #fff; }
  .big-mail {
    margin-top: 3mm; font-family: "IBM Plex Sans", sans-serif;
    font-size: 14pt; font-weight: 700; color: var(--navy);
  }
  .contact-card.navy .big-mail { color: var(--gold-soft); }

  .thanks-wrap {
    flex: 1; display: flex; flex-direction: column;
    align-items: flex-start; justify-content: center; gap: 5mm;
  }
  .thanks-wrap h1 {
    margin: 0; font-family: "IBM Plex Sans", sans-serif; font-weight: 700;
    font-size: 48pt; letter-spacing: -.03em; line-height: .95; color: #fff;
  }
  .thanks-wrap h1 span { color: var(--gold-soft); }
  .thanks-wrap p {
    margin: 0; font-size: 12pt; color: rgba(255,255,255,.68); font-weight: 500;
    max-width: 160mm;
  }

  @media print {
    body { background: #fff; }
    .toolbar { display: none !important; }
    .slide { margin: 0; box-shadow: none; page-break-after: always; }
    .slide:last-of-type { page-break-after: auto; }
  }
  @page { size: A4 landscape; margin: 0; }
</style>
</head>
<body>
<div class="toolbar no-print">
  <div><strong>FintiQ Solutions</strong> — Company Profile</div>
  <button type="button" onclick="window.print()">Print / Save PDF</button>
</div>

<!-- 1 COVER -->
<section class="slide dark">
  <div class="cover-bg"></div>
  <div class="cover-content">
    <div class="cover-top">
      <div class="brand-lockup">
        <img src="${markSrc}" alt="FintiQ" />
        <div>
          <div class="name">Finti<span class="q">Q</span> Solutions</div>
          <div class="sub">Fintech Technology Partner</div>
        </div>
      </div>
      <div class="cover-pill">Company Profile 2026</div>
    </div>
    <div class="cover-hero">
      <h1><span>Secure integrated</span><span class="line2">systems that earn trust.</span></h1>
      <p class="tag">Fintech platforms for retail, corporate, agent, and merchant channels — delivered as a <em>technology partner</em> to banks, PSOs/PSPs, and digital institutions.</p>
      <div class="cover-strip">
        <span>Retail</span><span>Corporate Suite</span><span>Agent</span><span>Merchant</span>
        <span>Call Center</span><span>Web Apps</span><span>Cards</span><span>Gateway</span><span>Wallet</span><span>LOS / LMS</span><span>Android · iOS</span>
      </div>
    </div>
    <div class="cover-meta">
      <div><strong>Role</strong> · Technology partner</div>
      <div><strong>Focus</strong> · Banks · PSO / PSP · Digital</div>
      <div><strong>01 / ${pad(TOTAL)}</strong> · Cover</div>
    </div>
  </div>
</section>

<!-- 2 ABOUT -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">Who we are</div>
    <h1 class="title">About <span class="accent">FintiQ</span></h1>
    <div class="split-about">
      <div>
        <p class="lead" style="margin-bottom:0">
          FintiQ Solutions builds <strong>secure, integrated fintech systems</strong> for banks, PSOs/PSPs,
          and digital institutions. Open APIs, structured architecture, and UAT-led delivery — so operators
          run live journeys with audit trails they can defend.
        </p>
        <div class="mission">
          <div class="label">Our Mission</div>
          <p>
            Deliver Corporate Banking Suite, cards, payments, wallets, lending, and channel apps across
            retail, corporate, agent, and merchant — as a technology partner, never as the licensed authority.
          </p>
        </div>
        <div class="focus-box">
          <p><strong>Engagement focus</strong></p>
          <p>Platform implementation · Core &amp; rail integrations · Compliance engineering · Squads · Production support</p>
          <p>info@fintiqsolutions.com · support@fintiqsolutions.com</p>
        </div>
      </div>
      <aside class="vision">
        <div>
          <h3>Our Vision</h3>
          <p>
            Be the trusted technology partner for institutions modernising payments, Corporate Banking Suite,
            and digital channels — platforms that scale with regulation and transaction growth.
          </p>
        </div>
        <div class="mark"><img src="${markSrc}" alt="" /></div>
      </aside>
    </div>
    <p class="subhead" style="margin:3.5mm 0 2mm">Who we serve</p>
    <div class="audience-strip">
      <div class="audience-card">
        <h3>SBP-licensed banks</h3>
        <p>Conventional, Islamic, and digital banks needing platforms — not a license claim.</p>
      </div>
      <div class="audience-card">
        <h3>PSO / PSP</h3>
        <p>Payment operators and PSPs for collections, disbursement, and merchant rails.</p>
      </div>
      <div class="audience-card">
        <h3>Financial &amp; adjacent</h3>
        <p>Core financial products plus governed ops / agent layers on one model.</p>
      </div>
      <div class="audience-card">
        <h3>Non-bank digital</h3>
        <p>Wallet and fintech programmes needing audit-ready web, Android, and iOS apps.</p>
      </div>
    </div>
    ${footer(2, "About")}
  </div>
</section>

<!-- 3 CORE SERVICES -->
<section class="slide band">
  <div class="atm"><div class="rule"></div></div>
  <div class="content">
    <div class="band-head">
      <div class="kicker">What we deliver</div>
      <h1 class="title">Core <span class="accent">Services</span></h1>
      <p class="lead">
        Platform rollout, core &amp; rail integrations, compliance engineering, squads, and production support
        for regulated institutions.
      </p>
    </div>
    <div class="two-col">
      <div>
        <ul class="services">
          <li>
            <span class="ico">1</span>
            <div>
              <strong>Platform Implementation</strong>
              <span>Brand and deploy Corporate Banking Suite (cash transfer as a module), cards, payments, wallets, lending, and channel apps — then pass UAT on a live journey.</span>
            </div>
          </li>
          <li>
            <span class="ico">2</span>
            <div>
              <strong>Payments &amp; Core Integration</strong>
              <span>Wire rails and core banking behind documented APIs — test and production parity.</span>
            </div>
          </li>
          <li>
            <span class="ico">3</span>
            <div>
              <strong>Compliance &amp; KYC Engineering</strong>
              <span>KYC queues, biometrics, maker-checker, and audit trails operations can defend.</span>
            </div>
          </li>
          <li>
            <span class="ico">4</span>
            <div>
              <strong>Resource Augmentation</strong>
              <span>Domain-ready engineers — specialist, squad, build-then-stay, or retainer.</span>
            </div>
          </li>
          <li>
            <span class="ico">5</span>
            <div>
              <strong>Production Support</strong>
              <span>Controlled releases, monitoring, and a named contact after go-live.</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="feature-box">
        <h3>Engagement standards</h3>
        <div class="panel navy">
          <ul>
            <li>UAT on live financial journeys</li>
            <li>Open API &amp; core banking integrations</li>
            <li>Audit-ready maker-checker workflows</li>
            <li>Consumer, agent &amp; merchant apps (Android · iOS)</li>
            <li>Human-controlled releases</li>
            <li>Clear milestones and handover</li>
          </ul>
        </div>
      </div>
    </div>
    ${footer(3, "Services")}
  </div>
</section>

<!-- 4 PLATFORMS -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">Product catalogue</div>
    <h1 class="title">Financial &amp; non-financial <span class="accent">platforms</span></h1>
    <p class="lead" style="margin-bottom:2.5mm; font-size:9.5pt">
      Suites and modules under one operating model. Cash transfer is not sold alone — it ships inside the
      <strong>Corporate Banking Suite</strong>.
    </p>
    <div class="plat-groups">
      <div class="plat-group">
        <div class="g-label">Corporate Banking Suite · Cards</div>
        <div class="plat-card featured">
          <div class="code">Corporate Suite</div>
          <h3>Corporate Banking Suite</h3>
          <p>Portal, bulk onboarding, single/bulk payments, COC, maker-checker — with <strong>cash transfer / treasury</strong> as a suite module, not a separate sale.</p>
        </div>
        <div class="plat-card">
          <div class="code">Cards</div>
          <h3>Card Management System</h3>
          <p>Issuance, authorization, limits, PIN, and servicing — branch, digital, and agent-linked card paths on one control plane.</p>
        </div>
        <div class="plat-card">
          <div class="code">Instant Debit</div>
          <h3>Instant Debit Card Module</h3>
          <p>Near-real-time debit issuance wired into CMS and branch or digital channels.</p>
        </div>
      </div>
      <div class="plat-group">
        <div class="g-label">Payments · Wallet · Lending</div>
        <div class="plat-card">
          <div class="code">Wallet</div>
          <h3>Wallet System &amp; Controller</h3>
          <p>Ledger, top-up, P2P, merchant pay, plus controller for limits and programme ops.</p>
        </div>
        <div class="plat-card">
          <div class="code">Payments</div>
          <h3>Payment Gateway</h3>
          <p>Collections, checkout, status APIs, and settlement desk on one model.</p>
        </div>
        <div class="plat-card">
          <div class="code">Lending</div>
          <h3>LOS / LMS</h3>
          <p>Consumer, agent, and corporate lending — origination through book servicing on one model.</p>
        </div>
      </div>
      <div class="plat-group">
        <div class="g-label">Internet · Web · Identity</div>
        <div class="plat-card featured">
          <div class="code">Internet Banking</div>
          <h3>Internet Banking</h3>
          <p>Full retail web self-service — accounts, transfers, cards, statements, and controls on core with test/live parity.</p>
        </div>
        <div class="plat-card featured">
          <div class="code">Web Apps</div>
          <h3>Web Banking &amp; Portals</h3>
          <p>Institutional web apps — corporate desk, CMS, agent/merchant portals, and documented Open APIs for channels.</p>
        </div>
        <div class="plat-card">
          <div class="code">Identity</div>
          <h3>KYC Module / SDK</h3>
          <p>OCR, facial liveness, fingerprint, and selfie comparison for onboarding apps — biometric paths that build operator trust.</p>
        </div>
      </div>
    </div>
    ${footer(4, "Platforms")}
  </div>
</section>

<!-- 5 CHANNELS & APPS -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">Sectors &amp; applications</div>
    <h1 class="title">Four sectors. <span class="accent">Channel apps.</span></h1>
    <p class="lead" style="margin-bottom:2mm; font-size:9.5pt">
      Retail, corporate, agent, and merchant — on shared platforms so books, rails, and controls stay consistent.
      Mobile apps ship for <strong>consumer, merchant, and agent</strong> on <strong>Android and iOS</strong>,
      with <strong>call center</strong> as the assisted desk channel on the same journeys.
    </p>
    <div class="sector-row">
      <div class="sector-card">
        <h3>Retail</h3>
        <p>Mobile banking, internet banking, cards, and self-service journeys for end customers.</p>
      </div>
      <div class="sector-card">
        <h3>Corporate</h3>
        <p>Corporate Banking Suite — portal, approvals, bulk ops, with cash transfer as a suite module.</p>
      </div>
      <div class="sector-card">
        <h3>Agent</h3>
        <p>Agent banking — onboarding, cash-in/out, float &amp; limits, commissions, audit-ready field journeys.</p>
      </div>
      <div class="sector-card">
        <h3>Merchant</h3>
        <p>Merchant apps and portals for onboarding, collections, and settlement visibility.</p>
      </div>
    </div>
    <div class="app-row">
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">MB</span><h3>Consumer Mobile</h3></div>
        <p>Retail mobile banking — accounts, transfers, cards, self-service on core.</p>
        <div class="os">Android · iOS</div>
      </div>
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">IB</span><h3>Internet Banking</h3></div>
        <p>Retail web self-service — accounts, transfers, statements, payments, card controls on core.</p>
        <div class="os">Web · Core-integrated</div>
      </div>
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">WA</span><h3>Web Apps &amp; Portals</h3></div>
        <p>Institutional web apps — corporate suite, CMS desk, agent/merchant portals, Open APIs.</p>
        <div class="os">Web · Ops portals</div>
      </div>
    </div>
    <div class="app-row">
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">AG</span><h3>Agent Banking</h3></div>
        <p>Agent banking app — onboarding, cash-in/out, float &amp; limits, commissions, settlement visibility, audit trails.</p>
        <div class="os">Android · iOS</div>
      </div>
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">MR</span><h3>Merchant Application</h3></div>
        <p>Merchant mobile and portal — onboarding, collections, settlement on the gateway.</p>
        <div class="os">Android · iOS · Portal</div>
      </div>
      <div class="app-tile">
        <div class="ico-line"><span class="glyph">CP</span><h3>Corporate Suite Portal</h3></div>
        <p>Corporate Banking Suite desk — onboarding, bulk ops, approvals, cash-transfer module.</p>
        <div class="os">Web · Maker-checker</div>
      </div>
    </div>
    <div class="app-row">
      <div class="app-tile span-all">
        <div class="ico-line"><span class="glyph">CC</span><h3>Call Center Solutions</h3></div>
        <p>
          Assisted banking desk — IVR, agent desktop, and CRM-aligned queues integrated to core and channel
          journeys so the call center sees the same balances, statuses, and audit trail as retail and agent apps.
        </p>
        <div class="os">IVR · Agent desktop · CRM · Core-linked</div>
      </div>
    </div>
    ${footer(5, "Channels")}
  </div>
</section>

<!-- 6 TECH STACK -->
<section class="slide band">
  <div class="atm"><div class="rule"></div></div>
  <div class="content">
    <div class="band-head">
      <div class="kicker">Engineering</div>
      <h1 class="title">Technology <span class="accent">stack</span></h1>
      <p class="lead">
        Stack-flexible delivery for regulated estates — we adopt the institution’s preferred runtimes where they fit,
        without locking the programme to a single vendor stack.
      </p>
    </div>
    <div class="tech-grid">
      <div class="tech-col dark">
        <h3>Backend &amp; APIs</h3>
        <ul>
          <li>Java / Spring Boot</li>
          <li>.NET · C#</li>
          <li>Python · Django</li>
          <li>Kotlin services</li>
          <li>REST / Open APIs</li>
          <li>Core &amp; rail adapters</li>
        </ul>
      </div>
      <div class="tech-col">
        <h3>Frontend &amp; Web</h3>
        <ul>
          <li>React · TypeScript</li>
          <li>Next.js portals</li>
          <li>Modern SPA desks</li>
          <li>Internet banking UI</li>
          <li>Ops &amp; CMS portals</li>
          <li>Accessible web apps</li>
        </ul>
      </div>
      <div class="tech-col">
        <h3>Mobile</h3>
        <ul>
          <li>Native Android (Kotlin)</li>
          <li>Native iOS (Swift)</li>
          <li>Consumer banking apps</li>
          <li>Agent &amp; merchant apps</li>
          <li>KYC / biometric SDK</li>
          <li>Secure device patterns</li>
        </ul>
      </div>
      <div class="tech-col dark">
        <h3>Cloud &amp; DevOps</h3>
        <ul>
          <li>AWS cloud delivery</li>
          <li>Docker · Kubernetes</li>
          <li>CI/CD pipelines</li>
          <li>GitHub / GitLab / Azure DevOps</li>
          <li>Env parity (dev · UAT · prod)</li>
          <li>Localization (Urdu · EN · PK)</li>
        </ul>
      </div>
      <div class="tech-col">
        <h3>Data &amp; Observability</h3>
        <ul>
          <li>Oracle Database</li>
          <li>PostgreSQL · MySQL</li>
          <li>Apache Kafka</li>
          <li>ELK — Elasticsearch</li>
          <li>Logstash · Kibana</li>
          <li>Audit trails · monitoring</li>
        </ul>
      </div>
    </div>
    <div class="tech-note">
      Clear service boundaries, documented contracts, and human-controlled releases. AI assists analysis and
      testing only — release accountability stays with the delivery team. Stack choices follow the bank’s
      standards and integration constraints — not a single locked toolkit.
    </div>
    ${footer(6, "Technology")}
  </div>
</section>

<!-- 7 HOW WE BUILD -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">How we build</div>
    <h1 class="title">Fintech platform <span class="accent">development</span></h1>
    <p class="lead" style="margin-bottom:3mm; font-size:10pt">
      Secure, scalable fintech platforms for regulated environments. Technology partner only — we do not
      provide licensed financial services.
    </p>
    <div class="build-grid">
      <div>
        <ul class="check-list" style="margin-top:0">
          <li><span class="tick">✓</span><span>Structured fintech platform architecture</span></li>
          <li><span class="tick">✓</span><span>Open APIs and banking / rail integrations</span></li>
          <li><span class="tick">✓</span><span>Governance-aware, UAT-led delivery</span></li>
          <li><span class="tick">✓</span><span>Clear milestones and handover</span></li>
        </ul>
        <div class="chip-row">
          <span class="chip">Corporate Suite</span>
          <span class="chip">Cards</span>
          <span class="chip">Wallet</span>
          <span class="chip">Gateway</span>
          <span class="chip">LOS / LMS</span>
          <span class="chip">Consumer apps</span>
          <span class="chip">Internet · Web</span>
          <span class="chip">Agent · Merchant</span>
          <span class="chip">Call Center</span>
        </div>
      </div>
      <div class="panel navy">
        <p class="subhead" style="color:var(--gold); margin-bottom:3mm">Capability coverage</p>
        <ul style="margin:0; padding-left:5mm">
          <li style="margin:0 0 2.5mm; font-size:9.5pt">Corporate Banking Suite (cash transfer as a module)</li>
          <li style="margin:0 0 2.5mm; font-size:9.5pt">CMS + instant debit card issuance</li>
          <li style="margin:0 0 2.5mm; font-size:9.5pt">Wallet programmes and digital banking APIs</li>
          <li style="margin:0 0 2.5mm; font-size:9.5pt">Payment gateway · internet / web banking · consumer / agent / merchant apps</li>
          <li style="margin:0 0 2.5mm; font-size:9.5pt">Agent banking · call center (IVR, desktop, CRM queues)</li>
          <li style="margin:0 0 2.5mm; font-size:9.5pt">LOS / LMS — consumer, agent &amp; corporate lending</li>
          <li style="margin:0; font-size:9.5pt">KYC SDK: OCR, liveness, fingerprint, selfie match</li>
        </ul>
      </div>
    </div>
    ${footer(7, "Build")}
  </div>
</section>

<!-- 8 DELIVERY -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">Delivery model</div>
    <h1 class="title">How we <span class="accent">deliver</span></h1>
    <p class="lead" style="margin-bottom:3.5mm">Faster delivery. Clear time. Cover after go-live.</p>
    <div class="timeline">
      <div class="t-step">
        <div class="dot">1</div>
        <strong>Domain-ready week one</strong>
        <span>Payments, cards, wallets, Corporate Suite, lending — already shipped. Short ramp.</span>
      </div>
      <div class="t-step">
        <div class="dot">2</div>
        <strong>Accelerated build</strong>
        <span>AI assists analysis and testing where useful — humans own every release.</span>
      </div>
      <div class="t-step">
        <div class="dot">3</div>
        <strong>UAT sets the clock</strong>
        <span>Done = a live journey signed by your operators on real financial flows.</span>
      </div>
      <div class="t-step">
        <div class="dot">4</div>
        <strong>Support after go-live</strong>
        <span>Production cover, a staying squad, or a specialist on your backlog.</span>
      </div>
    </div>
    <div class="engage-row">
      <div class="engage"><div class="label">Embed</div><p>One specialist in your stand-up</p></div>
      <div class="engage"><div class="label">Squad</div><p>Full delivery on one backlog</p></div>
      <div class="engage"><div class="label">Build + stay</div><p>Ship the platform, keep the roadmap</p></div>
      <div class="engage"><div class="label">Retainer</div><p>Production fixes and changes</p></div>
    </div>
    ${footer(8, "Delivery")}
  </div>
</section>

<!-- 9 WHY -->
<section class="slide">
  <div class="atm"><div class="rule"></div><div class="hair"></div></div>
  <div class="content">
    <div class="kicker">Differentiation</div>
    <h1 class="title">Why <span class="accent">FintiQ</span></h1>
    <div class="quote-bar">Secure integrated systems. Technology partner — not a licensee claim.</div>
    <p class="lead" style="margin-bottom:3.5mm; font-size:10pt">
      Platforms that earn trust — without confusing technology delivery with licensed financial authority.
    </p>
    <div class="two-col">
      <ul class="plain" style="font-size:10.5pt; margin:0">
        <li><strong>You keep the license and the ledger</strong> — we deliver platforms and channels.</li>
        <li><strong>Full stack</strong> — Corporate Banking Suite, cards, wallet, gateway, LOS/LMS, web &amp; mobile apps.</li>
        <li><strong>Open APIs</strong> — documented contracts for partners and internal channels.</li>
        <li><strong>Governance-aware delivery</strong> — UAT, milestones, and audit trails.</li>
      </ul>
      <div class="panel navy">
        <p class="subhead" style="color:var(--gold)">Regulatory position</p>
        <p style="margin:0; font-size:9.5pt; line-height:1.5">
          Technology development partner only. Licensed institutions remain the system of record for funds
          and regulated decisions. This profile does not claim banking, PSO, or PSP licenses.
        </p>
      </div>
    </div>
    ${footer(9, "Why FintiQ")}
  </div>
</section>

<!-- 10 CONTACT / CLOSE -->
<section class="slide dark">
  <div class="cover-bg"></div>
  <div class="cover-content">
    <div class="cover-top">
      <div class="brand-lockup">
        <img src="${markSrc}" alt="FintiQ" />
        <div>
          <div class="name">Finti<span class="q">Q</span> Solutions</div>
          <div class="sub">Fintech Technology Partner</div>
        </div>
      </div>
      <div class="cover-pill">${pad(TOTAL)} / ${pad(TOTAL)}</div>
    </div>
    <div class="thanks-wrap">
      <h1>Let's talk.</h1>
      <p>Tell us what you need live — Corporate Banking Suite, internet / web banking, retail / agent / merchant apps, cards, gateway, or lending. Platform, people, or both.</p>
      <div style="margin-top:2mm">
        <p style="margin:0 0 0.8mm; font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:rgba(0,176,164,.9)">Email</p>
        <p style="margin:0 0 1mm; font-size:14pt; font-weight:700; color:#fff">info@fintiqsolutions.com</p>
        <p style="margin:0; font-size:11pt; color:rgba(255,255,255,.65)">support@fintiqsolutions.com</p>
        <p style="margin:3.5mm 0 0.8mm; font-size:8pt; letter-spacing:.14em; text-transform:uppercase; color:rgba(0,176,164,.9)">Website</p>
        <p style="margin:0; font-size:12pt; font-weight:700; color:#fff">www.fintiqsolutions.com</p>
        <p style="margin:3.5mm 0 0; font-size:10.5pt; color:rgba(255,255,255,.78); font-weight:600">FintiQ Solutions (Private) Limited</p>
        <p style="margin:1mm 0 0; font-size:10pt; color:rgba(255,255,255,.55)">House # 5, Street 7, Block C, Naval Anchorage, Islamabad, Pakistan</p>
        <p style="margin:1.5mm 0 0; font-size:9.5pt; color:rgba(255,255,255,.45)">Reply within 1 business day</p>
      </div>
    </div>
    <div class="cover-meta">
      <div><strong>CONFIDENTIAL</strong></div>
      <div>Technology partner only</div>
      <div>© 2026 FintiQ Solutions</div>
    </div>
  </div>
</section>
</body>
</html>
`;

const outHtml = path.join(__dirname, "FintiQ-Solutions-Company-Profile.html");
fs.writeFileSync(outHtml, html, "utf8");
console.log("Wrote", outHtml);
