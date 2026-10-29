/** CMS desk proof — Sign in, issuance queue, authorize & service. */

function Shell({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-[1.4rem] border border-navy/10 bg-white shadow-[0_16px_40px_rgb(16_36_88/0.12)]"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-navy/10 bg-[#f7f9fc] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: accent }} />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/55">
            CMS · {title}
          </p>
        </div>
        <p className="font-mono text-[10px] text-navy/35">Encrypted session</p>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function IssueQueue({ accent }: { accent: string }) {
  const rows = [
    { id: "CRD-2041", product: "Debit · Classic", status: "Pending approve", tone: "warn" },
    { id: "CRD-2040", product: "Prepaid · Virtual", status: "Generated", tone: "ok" },
    { id: "CRD-2038", product: "Debit · Gold", status: "In review", tone: "warn" },
  ];
  return (
    <Shell title="Issuance" accent={accent}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-lg text-navy">Issuance queue</p>
          <p className="mt-1 text-xs text-mist">Request → approve → generate</p>
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white"
          style={{ background: accent }}
        >
          3 open
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex items-center justify-between rounded-xl border border-navy/10 bg-[#fbfcfe] px-3 py-2.5"
          >
            <div>
              <p className="font-mono text-[11px] text-navy/50">{row.id}</p>
              <p className="text-sm font-medium text-navy">{row.product}</p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                row.tone === "ok" ? "bg-teal/15 text-signal-deep" : "bg-amber-100 text-amber-800"
              }`}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function AuthorizeService({ accent }: { accent: string }) {
  return (
    <Shell title="Authorize & service" accent={accent}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-navy/10 bg-[#0a1628] p-3 text-white">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Card</p>
          <p className="mt-1 font-display text-xl">•••• 4412</p>
          <p className="mt-1 text-xs text-white/55">Debit · Active</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-white/10 px-2 py-1 text-[10px]">Limit OK</span>
            <span className="rounded-md px-2 py-1 text-[10px] text-ink" style={{ background: accent }}>
              Auth path live
            </span>
          </div>
        </div>
        <div className="space-y-2">
          {[
            ["Block / unblock", "Ready"],
            ["PIN reset", "Checker"],
            ["Limit change", "Queued"],
          ].map(([label, state], index) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-xl border border-navy/10 px-3 py-2 text-sm"
              style={{ background: index === 0 ? `${accent}14` : "#fbfcfe" }}
            >
              <span className="text-navy">{label}</span>
              <span className="font-mono text-[10px] text-navy/45">{state}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-mist">
        Servicing stays on the CMS desk — cardholder app APIs stay separate from bureau files.
      </p>
    </Shell>
  );
}

export function CmsDeskGallery({ accent = "#C9A227" }: { accent?: string }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">01 · Sign in</p>
        {/* Login mock imported by parent for proof size; gallery focuses ops desks */}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
            02 · Issuance
          </p>
          <IssueQueue accent={accent} />
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
            03 · Authorize & service
          </p>
          <AuthorizeService accent={accent} />
        </div>
      </div>
    </div>
  );
}

export function CmsProofSuite({
  accent = "#C9A227",
  login,
}: {
  accent?: string;
  login: React.ReactNode;
}) {
  return (
    <div className="space-y-10">
      <div>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
          01 · Encrypted desk Sign-in
        </p>
        {login}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
            02 · Issuance queue
          </p>
          <IssueQueue accent={accent} />
        </div>
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-navy/45">
            03 · Authorize & service
          </p>
          <AuthorizeService accent={accent} />
        </div>
      </div>
    </div>
  );
}
