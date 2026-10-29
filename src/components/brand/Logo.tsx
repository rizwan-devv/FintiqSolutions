import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  compact?: boolean;
  /** Light wordmark for dark / transparent headers. */
  light?: boolean;
};

export function Logo({ compact = false, light = false }: LogoProps) {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-2.5 sm:gap-3"
      aria-label="FintiQ Solutions home"
    >
      <Image
        src="/brand/mark.png"
        alt=""
        width={88}
        height={40}
        priority
        className={`w-auto transition-[height,filter] duration-300 group-hover:brightness-110 ${
          compact ? "h-7 sm:h-8" : "h-9 sm:h-11"
        } ${light ? "brightness-0 invert" : ""}`}
      />
      <span
        className={`font-brand font-bold leading-none tracking-[-0.035em] transition-[font-size,color] duration-300 ${
          compact ? "text-[1.05rem] sm:text-[1.2rem]" : "text-[1.2rem] sm:text-[1.45rem]"
        } ${light ? "text-white" : ""}`}
      >
        <span className={light ? "text-white" : "brand-wordmark"}>Finti</span>
        <span className={light ? "text-teal" : "brand-q"}>Q</span>
        <span className={light ? "text-white/90" : "brand-wordmark"}> Solutions</span>
      </span>
    </Link>
  );
}
