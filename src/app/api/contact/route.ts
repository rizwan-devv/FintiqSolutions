import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const inbox = process.env.CONTACT_INBOX || "info@fintiqsolutions.com";
const rateWindowMs = 60_000;
const rateMax = 8;
const hits = new Map<string, { count: number; reset: number }>();

function text(value: unknown, max = 400) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function allowRequest(key: string) {
  const now = Date.now();
  const current = hits.get(key);
  if (!current || now > current.reset) {
    hits.set(key, { count: 1, reset: now + rateWindowMs });
    return true;
  }
  if (current.count >= rateMax) return false;
  current.count += 1;
  return true;
}

async function deliverMail(payload: Record<string, string>) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: inbox,
        subject: `[FintiQ] ${payload.interest} — ${payload.organization}`,
        ...payload,
      }),
    });
    if (!response.ok) {
      throw new Error(`Webhook failed (${response.status})`);
    }
    return "sent";
  }
  return "accepted";
}

export async function POST(request: Request) {
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json({ message: "Too many notes. Try again in a minute." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ message: "Send the form again." }, { status: 400 });
  }

  if (text(body.company_site)) {
    return NextResponse.json({
      message: "Thanks. We have the note.",
      status: "accepted",
    });
  }

  const name = text(body.name, 120);
  const email = text(body.email, 160);
  const organization = text(body.organization, 160);
  const phone = text(body.phone, 40);
  const message = text(body.message, 2000);
  const interest = text(body.interest, 40);
  const platform = text(body.platform, 80);
  const role = text(body.role, 80);
  const seniority = text(body.seniority, 80);
  const count = text(body.count, 20);
  const start = text(body.start, 80);

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

  const payload = {
    name,
    email,
    organization,
    phone,
    message,
    interest,
    platform,
    role,
    seniority,
    count,
    start,
    receivedAt: new Date().toISOString(),
  };

  try {
    const status = await deliverMail(payload);
    if (status === "sent") {
      return NextResponse.json({
        status: "sent",
        message: "Thanks. Your note reached the FintiQ desk. We will reply shortly.",
      });
    }
    return NextResponse.json({
      status: "accepted",
      message:
        "Thanks. Your note is accepted. Until inbox delivery is connected, email us directly if you need a same-day reply.",
      mailto: inbox,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message: "We could not deliver the note just now. Email us directly and we will pick it up.",
        mailto: inbox,
      },
      { status: 502 },
    );
  }
}
