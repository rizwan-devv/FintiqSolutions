import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max = 400) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ message: "Send the form again." }, { status: 400 });
  }

  if (text(body.company_site)) {
    return NextResponse.json({
      message: "Thanks. We have the note.",
    });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 160);
  const organization = text(body.organization, 160);
  const phone = text(body.phone, 40);
  const message = text(body.message, 2000);
  const interest = text(body.interest, 40);

  if (name.length < 2) {
    return NextResponse.json({ message: "Add your name." }, { status: 400 });
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ message: "Add a work email." }, { status: 400 });
  }
  if (organization.length < 2 || phone.length < 6 || message.length < 8) {
    return NextResponse.json({ message: "Add your organization, phone, and a short note." }, { status: 400 });
  }
  if (!["platform", "resource-augmentation", "both"].includes(interest)) {
    return NextResponse.json({ message: "Choose what you want to talk about." }, { status: 400 });
  }

  return NextResponse.json({
    message:
      "Thanks. The form accepted your note. It will be emailed once the Fintiq inbox is connected.",
  });
}
