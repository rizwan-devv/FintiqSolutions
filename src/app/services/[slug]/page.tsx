import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/story/DetailView";
import { getProduct, getService, services } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return { title: "Service" };
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const links = service.products.flatMap((slug) => {
    const product = getProduct(slug);
    return product ? [{ href: `/products/${product.slug}`, label: product.name }] : [];
  });

  return (
    <DetailView
      eyebrow={service.eyebrow}
      title={service.name}
      lede={service.summary}
      audience={service.audience}
      outcome={service.outcome}
      blocks={service.capabilities}
      steps={service.journey}
      links={links}
    />
  );
}
