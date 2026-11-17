import Image from "next/image";

const mockSrc: Record<string, string> = {
  "card-management-system": "/products/mocks/cms.jpg",
  "corporate-banking": "/products/mocks/corporate.jpg",
  "payment-gateway": "/products/mocks/gateway.jpg",
  "cash-management-system": "/products/mocks/cash.jpg",
  "remittance-system": "/products/mocks/remittance.jpg",
  "loan-origination-system": "/products/mocks/los.jpg",
  "loan-management-system": "/products/mocks/lms.jpg",
};

const mockAlt: Record<string, string> = {
  "card-management-system": "FintiQ Card Management System desk",
  "corporate-banking": "FintiQ Corporate Banking Suite portal",
  "payment-gateway": "FintiQ Payment Gateway checkout and settlement",
  "cash-management-system": "FintiQ Cash Transfer Module treasury desk",
  "remittance-system": "FintiQ Remittance System corridor desk",
  "loan-origination-system": "FintiQ Loan Origination System",
  "loan-management-system": "FintiQ Loan Management System",
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
  const src = mockSrc[slug] ?? mockSrc["payment-gateway"];
  const alt = mockAlt[slug] ?? "FintiQ platform";
  const ring = accent ?? "#00B0A4";

  return (
    <div aria-hidden="true" className="w-full min-h-[11rem]">
      <div
        className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[1.1rem] border border-white/15 bg-[#0b1220] shadow-[0_28px_64px_rgb(0_0_0/0.5)]"
        style={{ boxShadow: `0 28px 64px rgb(0 0 0 / 0.5), 0 0 0 1px ${ring}33` }}
      >
        {/* Realistic window chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#0d1829] px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/35 px-2.5 py-1">
            <Image src="/brand/mark.png" alt="" width={14} height={10} className="shrink-0 object-contain opacity-90" />
            <span className="truncate font-mono text-[9px] text-white/55">
              app.fintiqsolutions.com/{slug.replace(/-/g, "/")}
            </span>
          </div>
          <span className="hidden shrink-0 rounded-full border border-[#00b0a4]/40 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#7be0d8] sm:inline">
            FintiQ
          </span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-[#071530]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover object-top"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#071530]/55 to-transparent" />
        </div>
      </div>
    </div>
  );
}
