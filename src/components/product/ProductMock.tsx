import Image from "next/image";
import type { ReactElement, ReactNode } from "react";

type MockProps = {
  tone?: "light" | "theme";
  accent?: string;
};

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 ${compact ? "" : ""}`}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={compact ? 18 : 22}
        height={compact ? 14 : 16}
        className="h-auto w-auto object-contain"
        aria-hidden
      />
      <span className={`font-display font-bold tracking-tight text-white ${compact ? "text-[10px]" : "text-xs"}`}>
        Finti<span className="text-[#00d4c6]">Q</span>
      </span>
    </div>
  );
}

function MockShell({
  accent,
  product,
  eyebrow,
  children,
}: {
  accent: string;
  product: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[1.35rem] border border-white/12 shadow-[0_28px_56px_rgb(0_0_0/0.45)]">
      <div
        className="flex items-center justify-between px-3.5 py-2.5"
        style={{
          background: `linear-gradient(105deg, #071530 0%, #102458 48%, #0c6484 88%, ${accent} 140%)`,
        }}
      >
        <BrandMark compact />
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/90"
          style={{ background: "rgb(255 255 255 / 0.12)", border: `1px solid ${accent}66` }}
        >
          {eyebrow}
        </span>
      </div>
      <div className="bg-[#0a1628] px-3.5 pb-3.5 pt-3 text-white">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-[#7be0d8]">{product}</p>
        {children}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
          <span className="text-[8px] font-medium text-white/40">FintiQ Solutions · Technology partner</span>
          <span className="size-1.5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    </div>
  );
}

/** CMS — card control plane */
function CardPaymentMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <MockShell accent={accent} product="Card Management System" eyebrow="CMS">
      <div className="mt-2.5 grid grid-cols-[1.1fr_0.9fr] gap-2.5">
        <div
          className="relative overflow-hidden rounded-xl p-3"
          style={{
            background: `linear-gradient(145deg, #102458 0%, #0c6484 55%, ${accent} 120%)`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/70">Debit</span>
            <span className="rounded bg-white/15 px-1.5 py-0.5 text-[7px] font-semibold">VISA</span>
          </div>
          <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-white/90">•••• 4821</p>
          <p className="mt-2 text-[9px] font-semibold text-white/80">INSTITUTION CARD</p>
          <div className="mt-3 h-1 w-10 rounded-full bg-white/35" />
        </div>
        <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-2.5">
          <p className="text-[9px] font-semibold text-white/85">Desk ops</p>
          {[
            ["Issue", "Live"],
            ["PIN set", "OK"],
            ["Limit", "PKR 250k"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[8px]">
              <span className="text-white/50">{k}</span>
              <span style={{ color: accent }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/** Corporate Banking Suite */
function CorporateMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <MockShell accent={accent} product="Corporate Banking Suite" eyebrow="Suite">
      <p className="mt-1 font-display text-2xl tracking-tight">PKR 1.24M</p>
      <p className="text-[10px] text-white/55">Bulk payment · maker-checker</p>
      <div className="mt-3 space-y-1.5">
        {[
          ["Maker submitted", "Done", true],
          ["Checker approval", "Live", true],
          ["Cash module", "Ready", false],
          ["Core posting", "Queued", false],
        ].map(([label, state, hot]) => (
          <div
            key={String(label)}
            className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px]"
            style={{ background: hot ? `${accent}28` : "rgb(255 255 255 / 0.05)" }}
          >
            <span className="text-white/80">{label}</span>
            <span className="font-semibold" style={{ color: hot ? accent : "rgb(255 255 255 / 0.4)" }}>
              {state}
            </span>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/** Payment Gateway */
function GatewayMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <MockShell accent={accent} product="Payment Gateway" eyebrow="Gateway">
      <div className="mt-2 rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">Checkout session</span>
          <span className="flex items-center gap-1 text-[8px] font-semibold" style={{ color: accent }}>
            <span className="size-1.5 animate-pulse rounded-full" style={{ background: accent }} />
            Live
          </span>
        </div>
        <p className="mt-2 font-display text-3xl tracking-tight">240,000</p>
        <p className="text-[10px] text-white/55">PKR · invoice #1842</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[72%] rounded-full" style={{ background: `linear-gradient(90deg, ${accent}, #7be0d8)` }} />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {["Pay", "API", "Callback", "Settle"].map((item) => (
            <span
              key={item}
              className="rounded-md border border-white/12 bg-black/25 py-1.5 text-center text-[8px] font-semibold text-white/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/** Cash / treasury module */
function CashMock({ accent = "#00B0A4" }: MockProps) {
  const bars = [62, 44, 86, 38, 70, 55, 78];
  return (
    <MockShell accent={accent} product="Cash Transfer Module" eyebrow="Treasury">
      <div className="mt-1 flex items-end justify-between">
        <div>
          <p className="font-display text-2xl tracking-tight">48.6M</p>
          <p className="text-[9px] text-white/50">PKR · consolidated</p>
        </div>
        <span className="rounded-full px-2 py-1 text-[8px] font-bold text-[#071530]" style={{ background: accent }}>
          Suite module
        </span>
      </div>
      <div className="mt-3 flex h-20 items-end gap-1">
        {bars.map((height, index) => (
          <div key={index} className="relative flex-1 overflow-hidden rounded-t-md bg-white/8" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 w-full rounded-t-md"
              style={{
                height: `${height}%`,
                background: `linear-gradient(180deg, ${accent}, ${accent}44)`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[8px] text-white/45">
        <span>Operating</span>
        <span>Sweep</span>
        <span>Pending</span>
      </div>
    </MockShell>
  );
}

/** Remittance */
function RemittanceMock({ accent = "#00B0A4" }: MockProps) {
  const steps = [
    { label: "Send", done: true },
    { label: "Screen", done: true },
    { label: "Route", done: true },
    { label: "Paid", done: false },
  ];
  return (
    <MockShell accent={accent} product="Remittance System" eyebrow="Corridor">
      <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
        <div className="flex items-center justify-between text-[9px]">
          <span className="text-white/55">PK → AE</span>
          <span className="font-semibold" style={{ color: accent }}>
            Compliance clear
          </span>
        </div>
        <p className="mt-2 font-display text-xl">AED 2,450</p>
        <div className="mt-3 flex items-center justify-between gap-1">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-1 flex-col items-center gap-1">
              <span
                className="flex size-6 items-center justify-center rounded-full text-[8px] font-bold"
                style={{
                  background: step.done ? accent : "rgb(255 255 255 / 0.1)",
                  color: step.done ? "#071530" : "rgb(255 255 255 / 0.5)",
                }}
              >
                {i + 1}
              </span>
              <span className="text-[7px] text-white/50">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/** LOS */
function LosMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <MockShell accent={accent} product="Loan Origination" eyebrow="LOS">
      <div className="mt-2 flex items-center gap-2.5">
        <span
          className="flex size-9 items-center justify-center rounded-lg text-[10px] font-bold text-[#071530]"
          style={{ background: accent }}
        >
          LN
        </span>
        <div>
          <p className="text-[12px] font-semibold">Personal loan</p>
          <p className="text-[9px] text-white/45">Application · File 2041</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {[
          ["Intake", 100],
          ["Documents", 100],
          ["Credit review", 58],
        ].map(([label, pct]) => (
          <div key={String(label)}>
            <div className="mb-1 flex justify-between text-[9px] text-white/55">
              <span>{label}</span>
              <span>{pct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent }} />
            </div>
          </div>
        ))}
      </div>
    </MockShell>
  );
}

/** LMS */
function LmsMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <MockShell accent={accent} product="Loan Management" eyebrow="LMS">
      <div className="mt-2 grid grid-cols-[1fr_auto] gap-3">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/45">Next due</p>
          <p className="mt-1 font-display text-2xl tracking-tight">18,400</p>
          <p className="text-[9px] text-white/50">PKR · in 6 days</p>
          <p className="mt-2 text-[9px] font-semibold" style={{ color: accent }}>
            14 of 24 installments
          </p>
        </div>
        <div className="relative size-[4.5rem]">
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.1)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke={accent}
              strokeWidth="3"
              strokeDasharray="70 100"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">58%</span>
        </div>
      </div>
    </MockShell>
  );
}

const mocks: Record<string, (props: MockProps) => ReactElement> = {
  "card-management-system": CardPaymentMock,
  "corporate-banking": CorporateMock,
  "payment-gateway": GatewayMock,
  "cash-management-system": CashMock,
  "remittance-system": RemittanceMock,
  "loan-origination-system": LosMock,
  "loan-management-system": LmsMock,
};

export function ProductMock({
  slug,
  tone = "light",
  accent,
}: {
  slug: string;
  tone?: "light" | "theme";
  accent?: string;
}) {
  void tone;
  const Mock = mocks[slug] ?? GatewayMock;
  return (
    <div aria-hidden="true" className="min-h-[11rem] w-full">
      <Mock accent={accent} />
    </div>
  );
}
