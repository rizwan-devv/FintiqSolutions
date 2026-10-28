import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailView } from "@/components/story/DetailView";
import { CmsLoginMock } from "@/components/product/CmsLoginMock";
import { ProductStage } from "@/components/product/ProductStage";
import { getProduct, getService, products } from "@/content/site";
import { getProductTheme } from "@/content/themes";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.summary,
    openGraph: {
      title: `${product.name} · FintiQ Solutions`,
      description: product.promise,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const links = product.services.flatMap((slug) => {
    const service = getService(slug);
    return service ? [{ href: `/services/${service.slug}`, label: service.name }] : [];
  });

  const theme = getProductTheme(product.slug);
  const proof =
    product.slug === "card-payment-system"
      ? {
          eyebrow: "Proof · Desk access",
          title: "Card Management System login",
          body: "Operators reach issuance and servicing through an encrypted CMS session — branded for the institution, locked to authorized personnel.",
          node: <CmsLoginMock accent={theme.accent} size="proof" />,
        }
      : undefined;

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
      themeSlug={product.slug}
      architecture={product.architecture}
      uat={product.uat}
      proof={proof}
    >
      <ProductStage slug={product.slug} />
    </DetailView>
  );
}
