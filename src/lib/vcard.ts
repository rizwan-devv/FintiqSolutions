import { cardCompany, type TeamMember } from "@/content/team";

/** Escape text values for vCard 3.0. */
export function escapeVCardValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Build a vCard 3.0 document with CRLF line endings. */
export function buildVCard(member: TeamMember): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCardValue(member.lastName)};${escapeVCardValue(member.firstName)};;;`,
    `FN:${escapeVCardValue(member.fullName)}`,
    `ORG:${escapeVCardValue(cardCompany.legalName)}`,
    `TITLE:${escapeVCardValue(member.title)}`,
    `TEL;TYPE=CELL:${escapeVCardValue(member.mobileTel)}`,
    `EMAIL;TYPE=WORK:${escapeVCardValue(member.email)}`,
    `URL:${escapeVCardValue(cardCompany.website)}`,
    `ADR;TYPE=WORK:;;${escapeVCardValue(cardCompany.addressStreet)};${escapeVCardValue(cardCompany.city)};;;${escapeVCardValue(cardCompany.country)}`,
    "END:VCARD",
  ];
  return `${lines.join("\r\n")}\r\n`;
}
