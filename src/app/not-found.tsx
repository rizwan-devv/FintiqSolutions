import Link from "next/link";
import { buttonPrimary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-6 pt-24">
      <p className="font-mono text-[11px] uppercase text-signal-deep">404</p>
      <h1 className="mt-4 font-display text-6xl">That page is not on this site.</h1>
      <Link href="/" className={`${buttonPrimary} mt-8 w-fit`}>
        Back home
      </Link>
    </main>
  );
}
