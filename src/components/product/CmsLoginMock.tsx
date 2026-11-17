import Image from "next/image";

/** Card Management System — branded desk login (compact stage + full proof). */

export function CmsLoginMock({
  accent = "#00B0A4",
  size = "compact",
}: {
  accent?: string;
  size?: "compact" | "proof";
}) {
  const proof = size === "proof";

  return (
    <div
      className={`overflow-hidden border border-navy/10 bg-white shadow-[0_24px_60px_rgb(16_36_88/0.18)] ${
        proof ? "rounded-[1.5rem]" : "rounded-2xl"
      }`}
      aria-hidden="true"
    >
      <div className={`grid ${proof ? "min-h-[22rem] md:grid-cols-2 md:min-h-[26rem]" : "grid-cols-2 min-h-[12.5rem]"}`}>
        <div
          className={`relative flex flex-col overflow-hidden text-white ${proof ? "p-8 md:p-10" : "p-3.5"}`}
          style={{
            background: `
              radial-gradient(circle at 20% 15%, rgb(0 212 198 / 0.18), transparent 40%),
              radial-gradient(ellipse at 80% 100%, rgb(0 176 164 / 0.35), transparent 55%),
              linear-gradient(165deg, #071530 0%, #102458 48%, #0c6484 100%)
            `,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage: "radial-gradient(rgb(255 255 255 / 0.22) 1px, transparent 1px)",
              backgroundSize: proof ? "18px 18px" : "12px 12px",
            }}
          />

          <div className={`relative flex items-center gap-2 ${proof ? "gap-3" : ""}`}>
            <Image
              src="/brand/mark.png"
              alt=""
              width={proof ? 36 : 22}
              height={proof ? 28 : 16}
              className="h-auto w-auto object-contain"
            />
            <span className={`font-display font-bold tracking-tight ${proof ? "text-lg" : "text-[11px]"}`}>
              Finti<span style={{ color: accent }}>Q</span>
            </span>
          </div>

          <div className={`relative mt-auto ${proof ? "pb-2 pt-16" : "pt-6"}`}>
            <p
              className={`font-mono uppercase tracking-[0.16em] text-[#7be0d8] ${
                proof ? "text-xs" : "text-[7px]"
              }`}
            >
              CMS desk
            </p>
            <p className={`mt-1 font-display font-bold leading-tight tracking-tight ${proof ? "text-3xl md:text-4xl" : "text-[13px]"}`}>
              Card Management
              <br />
              System
            </p>
            <p className={`mt-2 text-white/70 ${proof ? "max-w-xs text-sm leading-6" : "text-[8px] leading-3.5"}`}>
              Secure access for card operations — FintiQ Solutions
            </p>
          </div>

          <p className={`relative mt-auto pt-4 text-white/40 ${proof ? "text-xs" : "text-[7px]"}`}>
            Technology partner · Authorized personnel only
          </p>
        </div>

        <div className={`flex flex-col justify-center bg-white ${proof ? "p-8 md:p-10" : "p-3"}`}>
          <p className={`font-display font-bold text-navy ${proof ? "text-3xl" : "text-sm"}`}>Sign in</p>
          <p className={`mt-1 flex items-center gap-1.5 text-mist ${proof ? "text-sm" : "text-[8px]"}`}>
            <svg viewBox="0 0 16 16" className={proof ? "size-3.5" : "size-2.5"} fill="currentColor" aria-hidden="true">
              <path d="M8 1a3 3 0 0 0-3 3v2H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1V4a3 3 0 0 0-3-3Zm1 5V4a1 1 0 1 0-2 0v2h2Z" />
            </svg>
            Encrypted session
          </p>

          <div className={proof ? "mt-8 space-y-5" : "mt-3 space-y-2"}>
            <label className="block">
              <span className={`font-medium text-navy/70 ${proof ? "text-sm" : "text-[8px]"}`}>Login ID</span>
              <span
                className={`mt-1 flex items-center rounded-md border bg-white text-navy ${
                  proof ? "h-11 px-3 text-sm" : "h-6 px-1.5 text-[9px]"
                }`}
                style={{ borderColor: accent }}
              >
                ops.cms
                <span
                  className={`ml-px inline-block animate-pulse ${proof ? "h-4 w-px" : "h-2.5 w-px"}`}
                  style={{ background: accent }}
                />
              </span>
            </label>
            <label className="block">
              <span className={`font-medium text-navy/70 ${proof ? "text-sm" : "text-[8px]"}`}>Password</span>
              <span
                className={`mt-1 flex items-center justify-between rounded-md border border-navy/15 bg-white ${
                  proof ? "h-11 px-3" : "h-6 px-1.5"
                }`}
              >
                <span className={`tracking-widest text-navy/40 ${proof ? "text-sm" : "text-[9px]"}`}>••••••••</span>
                <svg viewBox="0 0 20 20" className={`text-navy/35 ${proof ? "size-4" : "size-2.5"}`} fill="currentColor" aria-hidden="true">
                  <path d="M10 4C5 4 1.7 7.1 1 10c.7 2.9 4 6 9 6s8.3-3.1 9-6c-.7-2.9-4-6-9-6Zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                </svg>
              </span>
            </label>
            <label className={`flex items-center gap-1.5 text-navy/55 ${proof ? "gap-2 text-sm" : "text-[8px]"}`}>
              <span className={`rounded border border-navy/25 ${proof ? "size-4" : "size-2.5"}`} />
              Remember Login ID
            </label>
          </div>

          <div
            className={`mt-auto flex items-center justify-center rounded-md font-semibold text-white ${
              proof ? "mt-8 h-12 text-base" : "mt-3 h-7 text-[10px]"
            }`}
            style={{ background: `linear-gradient(105deg, #102458, ${accent})` }}
          >
            Sign in
          </div>
        </div>
      </div>
    </div>
  );
}
