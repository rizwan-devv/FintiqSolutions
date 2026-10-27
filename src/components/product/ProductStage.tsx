import { getProductTheme } from "@/content/themes";
import { ProductMock } from "@/components/product/ProductMock";

export function ProductStage({
  slug,
  compact = false,
  className = "",
}: {
  slug: string;
  compact?: boolean;
  className?: string;
}) {
  const theme = getProductTheme(slug);
  const light = theme.mode === "light";

  return (
    <div
      className={`product-stage relative overflow-hidden ${compact ? "rounded-[1.4rem]" : "rounded-[1.8rem]"} ${className}`}
      style={{ backgroundImage: `${theme.glow}, ${theme.panel}` }}
    >
      <div
        className={`product-stage-grid pointer-events-none absolute inset-0 ${light ? "opacity-30" : "opacity-40"}`}
        aria-hidden="true"
        style={
          light
            ? {
                backgroundImage:
                  "linear-gradient(to right, rgb(16 36 88 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgb(16 36 88 / 0.06) 1px, transparent 1px)",
              }
            : undefined
        }
      />
      <div className={`relative ${compact ? "p-4" : "p-5 md:p-6"}`}>
        <div className="mb-3 flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{
              color: light ? theme.ink : "#ffffff",
              background: light ? "rgb(16 36 88 / 0.08)" : "rgb(255 255 255 / 0.12)",
              border: `1px solid ${light ? "rgb(16 36 88 / 0.14)" : `${theme.accentSoft}55`}`,
            }}
          >
            {theme.label}
          </span>
          <span className="size-2 rounded-full" style={{ background: theme.accent }} aria-hidden="true" />
        </div>
        <div className="product-stage-mock flex min-h-[12rem] items-center justify-center">
          <ProductMock slug={slug} tone="theme" accent={theme.accent} />
        </div>
      </div>
    </div>
  );
}
