import { Montserrat, Source_Sans_3 } from "next/font/google";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-card-display",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-card-body",
});

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} font-[family-name:var(--font-card-body)]`}>
      {children}
    </div>
  );
}
