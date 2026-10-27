import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/motion/BackToTop";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { company } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const brand = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Secure fintech platforms for cards, corporate banking, payments, cash, remittance, and lending — plus AI solutions for regulated institutions.";

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: company.brandName,
    template: `%s · ${company.brandName}`,
  },
  description,
  applicationName: company.brandName,
  keywords: [
    "fintech platforms",
    "payment gateway",
    "card payment system",
    "corporate banking",
    "loan origination",
    "remittance",
    "AI for banking systems",
    "Pakistan fintech",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: company.siteUrl,
    siteName: company.brandName,
    title: company.brandName,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: company.brandName,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${brand.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper-deep text-navy">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-signal focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <SmoothScroll>
          <Header />
          <div id="content">{children}</div>
          <Footer />
          <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
