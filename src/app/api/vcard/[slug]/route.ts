import { NextResponse } from "next/server";
import { getTeamMember, getTeamSlugs } from "@/content/team";
import { buildVCard } from "@/lib/vcard";

type Context = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getTeamSlugs().map((slug) => ({ slug }));
}

export async function GET(_request: Request, context: Context) {
  const { slug } = await context.params;
  const member = getTeamMember(slug);
  if (!member) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = buildVCard(member);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${member.slug}.vcf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
