import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/story/DetailView";
import { ProductMock } from "@/components/product/ProductMock";
import { getProduct, getService, products } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.summary };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const links = product.services.flatMap((slug) => {
    const service = getService(slug);
    return service ? [{ href: `/services/${service.slug}`, label: service.name }] : [];
  });

  return (
    <DetailView
      eyebrow={product.eyebrow}
      title={product.name}
      lede={product.summary}
      audience={product.audience}
      outcome={product.outcome}
      blocks={product.capabilities}
      steps={product.journey}
      links={links}
    >
      <ProductMock slug={product.slug} />
    </DetailView>
  );
}
