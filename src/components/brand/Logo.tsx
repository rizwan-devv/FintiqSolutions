import Image from "next/image";
import Link from "next/link";

export function Logo() {
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
        className="h-9 w-auto transition duration-200 group-hover:brightness-110 sm:h-11"
      />
      <span className="font-brand text-[1.2rem] font-bold leading-none tracking-[-0.035em] sm:text-[1.45rem]">
        <span className="brand-wordmark">Finti</span>
        <span className="brand-q">Q</span>
        <span className="brand-wordmark"> Solutions</span>
      </span>
    </Link>
  );
}
