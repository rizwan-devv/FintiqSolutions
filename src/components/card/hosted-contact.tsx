import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessCard } from "@/components/card/BusinessCard";
import { cardCompany, getTeamMember } from "@/content/team";

export function hostedContactMetadata(slug: string): Metadata {
  const member = getTeamMember(slug);
  if (!member) return { title: "Not found", robots: { index: false, follow: false } };

  const title = `${member.fullName} | ${member.title} | FINTIQ Solutions`;
  const description = `${member.fullName}, ${member.title} at ${cardCompany.legalName}. ${cardCompany.tagline}`;
  const ogImage = member.photo || "/fintiq-logo-primary.svg";

  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${cardCompany.website.replace(/\/$/, "")}/${member.slug}`,
      siteName: cardCompany.brandName,
      type: "profile",
      images: [{ url: ogImage, alt: cardCompany.brandName }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function HostedContactPage({ slug }: { slug: string }) {
  const member = getTeamMember(slug);
  if (!member) notFound();
  return <BusinessCard member={member} />;
}
