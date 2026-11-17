import Image from "next/image";
import { getProductTheme } from "@/content/themes";
import { ProductMock } from "@/components/product/ProductMock";

export function ProductStage({
  slug,
  compact = false,
  tall = false,
  className = "",
}: {
  slug: string;
  compact?: boolean;
  tall?: boolean;
  className?: string;
}) {
  const theme = getProductTheme(slug);
  const light = theme.mode === "light";
  const mockHeight = compact
    ? "h-[13.5rem] min-h-[13.5rem]"
    : tall
      ? "h-[18rem] min-h-[18rem] md:h-[20rem] md:min-h-[20rem]"
      : "h-[16rem] min-h-[16rem]";

  return (
    <div
      className={`product-stage relative overflow-hidden ${compact ? "rounded-[1.4rem]" : "rounded-[1.8rem]"} ${className}`}
      style={{
        backgroundImage: light
          ? `linear-gradient(160deg, #eef5f7 0%, #f4f8fa 40%, #e8f4f3 100%), ${theme.glow}`
          : `${theme.glow}, linear-gradient(155deg, #071530 0%, #102458 50%, #0a4f5c 120%)`,
      }}
    >
      <div
        className={`product-stage-grid pointer-events-none absolute inset-0 ${light ? "opacity-25" : "opacity-35"}`}
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(16 36 88 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(16 36 88 / 0.06) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className={`relative ${compact ? "p-4" : tall ? "p-5 md:p-7" : "p-5 md:p-6"}`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/mark.png"
              alt=""
              width={20}
              height={15}
              className="h-auto w-auto object-contain opacity-90"
              aria-hidden
            />
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{
                color: light ? theme.ink : "#ffffff",
                background: light ? "rgb(16 36 88 / 0.08)" : "rgb(255 255 255 / 0.12)",
                border: `1px solid ${light ? "rgb(0 176 164 / 0.35)" : `${theme.accentSoft}55`}`,
              }}
            >
              {theme.label}
            </span>
          </div>
          <span className={`text-[9px] font-semibold ${light ? "text-navy/45" : "text-white/45"}`}>
            FintiQ Solutions
          </span>
        </div>
        <div className={`product-stage-mock flex w-full items-center justify-center ${mockHeight}`}>
          <ProductMock slug={slug} tone="theme" accent={theme.accent} />
        </div>
      </div>
    </div>
  );
}
