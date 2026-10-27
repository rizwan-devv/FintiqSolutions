function Shell({
  kicker,
  children,
}: {
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-navy/10 bg-white text-navy shadow-[0_24px_60px_rgb(16_36_88/0.12)]">
      <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">{kicker}</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-signal" />
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function PayBridgeMock() {
  const rails = [
    ["JazzCash", "Live"],
    ["Easypaisa", "Ready"],
    ["PayFast", "Ready"],
  ] as const;

  return (
    <Shell kicker="Merchant · Invoice 1842">
      <p className="font-display text-4xl tracking-tight">PKR 240,000</p>
      <p className="mt-1 flex items-center gap-2 text-sm text-ink/60">
        <span className="live-dot inline-block size-2 shrink-0 rounded-full bg-signal-deep" aria-hidden="true" />
        Fee collection · ready for settlement
      </p>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-paper-deep">
        <div className="mock-bar h-full w-full rounded-full bg-signal-deep" />
      </div>
      <div className="mt-5 space-y-2">
        {rails.map(([name, state], index) => (
          <div
            key={name}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm ${
              index === 0 ? "bg-ink text-paper" : "bg-paper-deep"
            }`}
          >
            <span>{name}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">{state}</span>
          </div>
        ))}
      </div>
    </Shell>
  );
}

function OnboardingMock() {
  const steps = ["Entity", "Partners", "Documents", "Review"];
  return (
    <Shell kicker="Partnership · tracking FTQ-2041">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => (
          <li key={step} className="text-center">
            <span
              className={`mx-auto flex size-8 items-center justify-center rounded-full text-xs ${
                index < 3 ? "bg-ink text-paper" : "bg-signal text-ink"
              }`}
            >
              {index + 1}
            </span>
            <span className="mt-2 block text-[11px] text-ink/60">{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 space-y-2 text-sm">
        <div className="flex items-center justify-between rounded-xl bg-paper-deep px-3 py-3">
          <span>Partner · Ayesha</span>
          <span className="text-signal-deep">KYC complete</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-paper-deep px-3 py-3">
          <span>Partner · Hamza</span>
          <span className="text-ink/50">Invite sent</span>
        </div>
      </div>
    </Shell>
  );
}

function CardMock() {
  return (
    <Shell kicker="Card desk · debit">
      <div className="rounded-2xl bg-ink p-5 text-paper">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase text-signal-deep">Debit</span>
          <span className="size-7 rounded-md bg-signal/80" />
        </div>
        <p className="mt-8 font-mono text-lg tracking-[0.18em]">•••• 4412</p>
        <p className="mt-2 text-xs text-white/70">Active · limit available</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        {["Issue", "Limit", "PIN"].map((item) => (
          <div key={item} className="rounded-xl bg-paper-deep py-3">
            {item}
          </div>
        ))}
      </div>
    </Shell>
  );
}

function AgentMock() {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-white/15 bg-ink p-3 shadow-[0_30px_80px_rgb(0_0_0/0.35)]">
      <div className="rounded-[1.4rem] bg-paper p-4 text-ink">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">Agent wallet</p>
        <p className="mt-3 font-display text-4xl">82,400</p>
        <p className="text-sm text-ink/60">Available · PKR</p>
        <div className="mt-5 rounded-2xl bg-ink px-4 py-3 text-paper">
          <p className="text-xs text-white/70">IBFT</p>
          <p className="mt-1 text-sm">App → Fintiq API → Core</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="mock-bar h-full w-full bg-signal" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SwitchMock() {
  const nodes = ["App", "Switch", "Core"];
  return (
    <Shell kicker="Channel contract">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="contents">
            <div
              className={`rounded-2xl px-3 py-6 text-center text-sm ${
                node === "Switch" ? "bg-signal text-ink" : "bg-ink text-paper"
              }`}
            >
              {node}
            </div>
            {index < nodes.length - 1 ? (
              <span className="text-ink/30" aria-hidden="true">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-ink/60">The app integrates once. The core stays behind the switch.</p>
    </Shell>
  );
}

function BackOfficeMock() {
  const rows = [
    ["FTQ-2041", "Partnership", "In review"],
    ["FTQ-1988", "Sole prop", "Cleared"],
    ["TX-8831", "Callback", "Needs a person"],
  ] as const;

  return (
    <Shell kicker="Operations · today">
      <table className="w-full text-left text-sm">
        <thead className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">
          <tr>
            <th className="pb-2 font-normal">Case</th>
            <th className="pb-2 font-normal">Type</th>
            <th className="pb-2 font-normal">State</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-ink/10">
              {row.map((cell) => (
                <td key={cell} className="py-2.5">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}

const mocks: Record<string, () => React.ReactElement> = {
  paybridge: PayBridgeMock,
  "corporate-onboarding": OnboardingMock,
  "card-management": CardMock,
  "agent-banking": AgentMock,
  "core-switch": SwitchMock,
  "operations-back-office": BackOfficeMock,
};

export function ProductMock({ slug }: { slug: string }) {
  const Mock = mocks[slug];
  if (!Mock) return null;
  return (
    <div aria-hidden="true">
      <Mock />
    </div>
  );
}
