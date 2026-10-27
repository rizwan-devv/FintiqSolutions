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

  const others = insights.filter((item) => item.slug !== insight.slug);

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-deep">{insight.eyebrow}</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight">{insight.title}</h1>
      <p className="mt-6 text-lg leading-8 text-ink/75">{insight.summary}</p>
      <div className="mt-10 space-y-6">
        {insight.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="leading-8 text-ink/85">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-16 border-t border-navy/10 pt-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">More notes</p>
        <ul className="mt-4 space-y-3">
          {others.map((item) => (
            <li key={item.slug}>
              <Link href={`/insights/${item.slug}`} className="text-navy hover:text-signal-deep">
                {item.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/insights" className="text-sm font-semibold text-signal-deep">
              All insights
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
