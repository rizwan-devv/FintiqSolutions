export type TeamMember = {
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  email: string;
  /** Display form, e.g. +92 330 5474030 */
  mobileDisplay: string;
  /** E.164 without spaces, e.g. +923305474030 */
  mobileTel: string;
  /** Digits only for wa.me */
  whatsapp: string;
  /** Public path under /public, or empty */
  photo: string;
};

export const cardCompany = {
  legalName: "FINTIQ Solutions (Private) Limited",
  brandName: "FINTIQ Solutions",
  website: "https://fintiqsolutions.com/",
  websiteDisplay: "fintiqsolutions.com",
  email: "info@fintiqsolutions.com",
  tagline: "Financial technology, engineered with intelligence.",
  addressLine1: "House # 5, Street 7, Block C",
  addressLine2: "Naval Anchorage",
  city: "Islamabad",
  country: "Pakistan",
  /** Street/extended for vCard ADR */
  addressStreet: "House # 5, Street 7, Block C, Naval Anchorage",
  mapsQuery: "House 5 Street 7 Block C Naval Anchorage Islamabad",
} as const;

/**
 * Hosted contact cards. Add a person here, then add a thin page under
 * `src/app/(card)/<slug>/page.tsx` (same pattern as saad/murtaza).
 * vCards are served automatically via `/:slug.vcf` → `/api/vcard/:slug`.
 */
export const teamMembers: TeamMember[] = [
  {
    slug: "saad",
    firstName: "Saad Sarwar",
    lastName: "Mirza",
    fullName: "Saad Sarwar Mirza",
    title: "CEO, Co-Founder",
    email: "ssarwar@fintiqsolutions.com",
    mobileDisplay: "+92 330 5474030",
    mobileTel: "+923305474030",
    whatsapp: "923305474030",
    photo: "",
  },
  {
    slug: "murtaza",
    firstName: "Murtaza",
    lastName: "Malik",
    fullName: "Murtaza Malik",
    title: "CTO, Co-Founder",
    email: "mmalik@fintiqsolutions.com",
    mobileDisplay: "+92 336 6630008",
    mobileTel: "+923366630008",
    whatsapp: "923366630008",
    photo: "",
  },
];

const bySlug = Object.fromEntries(teamMembers.map((m) => [m.slug, m])) as Record<
  string,
  TeamMember
>;

export function getTeamMember(slug: string): TeamMember | undefined {
  return bySlug[slug];
}

export function getTeamSlugs(): string[] {
  return teamMembers.map((m) => m.slug);
}

export function isTeamSlug(slug: string): boolean {
  return slug in bySlug;
}

export function memberInitials(member: TeamMember): string {
  const parts = member.fullName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
