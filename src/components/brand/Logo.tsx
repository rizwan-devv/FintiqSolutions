import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <Image
        src="/brand/logo.png"
        alt="Fintiq Solutions"
        width={156}
        height={146}
        priority
        className="h-14 w-auto sm:h-16"
      />
    </Link>
  );
}
