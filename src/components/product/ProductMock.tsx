import type { ReactElement } from "react";
import { CmsLoginMock } from "@/components/product/CmsLoginMock";

type MockProps = {
  tone?: "light" | "theme";
  accent?: string;
};

/** CMS desk login — Card Management System */
function CardPaymentMock({ accent = "#C9A227" }: MockProps) {
  return (
    <div className="mx-auto w-full max-w-[340px]">
      <CmsLoginMock accent={accent} size="compact" />
    </div>
  );
}

/** Dark ops console with side rail */
function CorporateMock({ accent = "#4F7CFF" }: MockProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1224] text-white shadow-[0_24px_50px_rgb(0_0_0/0.4)]">
      <div className="grid grid-cols-[2.2rem_1fr]">
        <div className="flex flex-col items-center gap-2 border-r border-white/10 bg-black/30 py-3">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-2 rounded-full"
              style={{ background: i === 0 ? accent : "rgb(255 255 255 / 0.2)" }}
            />
          ))}
        </div>
        <div className="p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">Corporate desk</p>
          <p className="mt-1 font-display text-2xl tracking-tight">PKR 1.2M</p>
          <p className="text-[11px] text-white/55">Bulk payment · checker</p>
          <div className="mt-3 space-y-1.5">
            {[
              ["Maker", "Done"],
              ["Checker", "Live"],
              ["Core", "…"],
            ].map(([label, state], index) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[11px]"
                style={{ background: index === 1 ? `${accent}33` : "rgb(255 255 255 / 0.06)" }}
              >
                <span>{label}</span>
                <span style={{ color: index < 2 ? accent : "rgb(255 255 255 / 0.35)" }}>{state}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Glass checkout ticket */
function GatewayMock({ accent = "#00B0A4" }: MockProps) {
  return (
    <div className="relative mx-auto w-full max-w-[220px]">
      <div
        className="rounded-[1.4rem] border border-white/20 p-4 text-white shadow-[0_20px_40px_rgb(0_0_0/0.35)] backdrop-blur-md"
        style={{
          background: `linear-gradient(160deg, rgb(255 255 255 / 0.14), rgb(0 176 164 / 0.12) 60%, rgb(8 18 40 / 0.55))`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">Checkout</span>
          <span className="live-dot size-2 rounded-full" style={{ background: accent }} />
        </div>
        <p className="mt-3 font-display text-3xl tracking-tight">240k</p>
        <p className="text-xs text-white/65">PKR · invoice 1842</p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/15">
          <div className="mock-bar h-full w-full rounded-full" style={{ background: accent }} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-1.5">
          {["Pay", "API", "Settle", "Payout"].map((item) => (
            <span
              key={item}
              className="rounded-lg border border-white/15 bg-black/25 py-2 text-center text-[10px] font-semibold"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div
        className="mx-auto h-2 w-2/3 rounded-b-xl opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
      />
    </div>
  );
}

/** Vertical bar chart board */
function CashMock({ accent = "#2EE6C5" }: MockProps) {
  const bars = [72, 48, 88, 36, 64, 52];
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#041820] p-4 text-white shadow-[0_24px_50px_rgb(0_0_0/0.4)]">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">Treasury</p>
          <p className="mt-1 font-display text-2xl">48.6M</p>
        </div>
        <span className="rounded-full px-2 py-1 text-[9px] font-semibold text-ink" style={{ background: accent }}>
          Live
        </span>
      </div>
      <div className="mt-4 flex h-24 items-end gap-1.5">
        {bars.map((height, index) => (
          <div key={index} className="flex-1 rounded-t-md bg-white/10">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${height}%`,
                background: `linear-gradient(180deg, ${accent}, ${accent}55)`,
                marginTop: `${100 - height}%`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-white/50">
        <span>Operating</span>
        <span>Sweep</span>
        <span>Pending</span>
      </div>
    </div>
  );
}

/** Radial corridor ring */
function RemittanceMock({ accent = "#6EC8FF" }: MockProps) {
  const steps = ["Send", "Screen", "Route", "Paid"];
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[210px] items-center justify-center">
      <div
        className="absolute inset-3 rounded-full border border-dashed opacity-50"
        style={{ borderColor: accent }}
      />
      <div className="absolute inset-8 rounded-full border border-white/15" />
      <div className="relative z-10 rounded-full bg-[#061018]/90 px-5 py-4 text-center text-white shadow-[0_0_40px_rgb(110_200_255/0.25)]">
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">Corridor</p>
        <p className="mt-1 font-display text-lg">Live</p>
        <p className="mt-1 text-[10px]" style={{ color: accent }}>
          Compliance clear
        </p>
      </div>
      {steps.map((step, index) => {
        const angle = -90 + index * 90;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * 42;
        const y = 50 + Math.sin(rad) * 42;
        return (
          <span
            key={step}
            className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-[8px] font-semibold text-ink"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: index === 3 ? accent : "rgb(255 255 255 / 0.92)",
            }}
          >
            {index + 1}
          </span>
        );
      })}
    </div>
  );
}

/** Stacked document / pipeline */
function LosMock({ accent = "#9AD0FF" }: MockProps) {
  return (
    <div className="relative mx-auto w-full max-w-[210px] pt-3">
      <div className="absolute left-3 right-3 top-0 h-3 rounded-t-xl bg-white/20" />
      <div className="absolute left-1.5 right-1.5 top-1.5 h-3 rounded-t-xl bg-white/30" />
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#101a2e] p-4 text-white shadow-[0_24px_50px_rgb(0_0_0/0.4)]">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg text-xs font-bold text-ink" style={{ background: accent }}>
            LN
          </span>
          <div>
            <p className="text-sm font-semibold">Personal loan</p>
            <p className="text-[10px] text-white/50">File 2041</p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["Intake", 100],
            ["Documents", 100],
            ["Credit", 55],
          ].map(([label, pct]) => (
            <div key={String(label)}>
              <div className="mb-1 flex justify-between text-[10px] text-white/60">
                <span>{label}</span>
                <span>{pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Phone-style servicing app */
function LmsMock({ accent = "#C4B5FD" }: MockProps) {
  return (
    <div className="mx-auto w-full max-w-[150px] rounded-[1.8rem] border border-white/20 bg-[#12081f] p-2 shadow-[0_30px_60px_rgb(0_0_0/0.45)]">
      <div className="rounded-[1.4rem] bg-gradient-to-b from-[#2a2148] to-[#12081f] p-3 text-white">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25" />
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">Next due</p>
        <p className="mt-1 font-display text-2xl">18,400</p>
        <p className="text-[10px] text-white/55">PKR · in 6 days</p>
        <div className="relative mx-auto mt-4 size-20">
          <svg viewBox="0 0 36 36" className="size-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" />
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
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">14/24</span>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/50">Installments received</p>
      </div>
    </div>
  );
}

const mocks: Record<string, (props: MockProps) => ReactElement> = {
  "card-payment-system": CardPaymentMock,
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
  const Mock = mocks[slug] ?? GatewayMock;
  return (
    <div aria-hidden="true" className="min-h-[11rem]">
      <Mock tone={tone} accent={accent} />
    </div>
  );
}
