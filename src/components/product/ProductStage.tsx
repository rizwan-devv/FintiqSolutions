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
    ? "h-[12.5rem] min-h-[12.5rem]"
    : tall
      ? "h-[17.5rem] min-h-[17.5rem] md:h-[19.5rem] md:min-h-[19.5rem]"
      : "h-[15.5rem] min-h-[15.5rem]";

  return (
    <div
      className={`product-stage relative overflow-hidden ${compact ? "rounded-[1.4rem]" : "rounded-[1.8rem]"} ${className}`}
      style={{
        background: light
          ? "linear-gradient(165deg, #eef5f7 0%, #f7fafb 45%, #e7f3f2 100%)"
          : "linear-gradient(155deg, #050d1c 0%, #0a1a38 52%, #071a24 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full opacity-40 blur-3xl"
        style={{ background: `${theme.accent}55` }}
        aria-hidden
      />
      <div className={`relative ${compact ? "p-3.5" : tall ? "p-5 md:p-6" : "p-4 md:p-5"}`}>
        <div className="mb-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/brand/mark.png"
              alt=""
              width={18}
              height={14}
              className="h-auto w-auto object-contain opacity-90"
              aria-hidden
            />
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{
                color: light ? "#102458" : "#ffffff",
                background: light ? "rgb(16 36 88 / 0.07)" : "rgb(255 255 255 / 0.1)",
                border: `1px solid ${light ? "rgb(0 176 164 / 0.35)" : `${theme.accentSoft}55`}`,
              }}
            >
              {theme.label}
            </span>
          </div>
          <span className={`text-[9px] font-semibold tracking-wide ${light ? "text-navy/40" : "text-white/40"}`}>
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
