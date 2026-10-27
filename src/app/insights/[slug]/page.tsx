import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return { title: "Insight" };
  return { title: insight.title, description: insight.summary };
}

export default async function InsightPage({ params }: Props) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 pb-20 pt-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">{insight.eyebrow}</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">{insight.title}</h1>
      <p className="mt-5 text-lg leading-8 text-ink/75">{insight.summary}</p>
      <div className="mt-8 space-y-5">
        {insight.paragraphs.slice(0, 2).map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-8 text-ink/85">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-12 border-t border-navy/10 pt-8">
        <Link href="/work" className="text-sm font-semibold text-signal-deep">
          ← Back to work
        </Link>
      </div>
    </main>
  );
}
