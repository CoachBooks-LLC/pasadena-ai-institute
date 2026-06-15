import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Lead = {
  name: string;
  email: string;
  phone?: string;
  track?: string;
  experience?: string;
  goal?: string;
  receivedAt: string;
};

const TRACK_LABELS: Record<string, string> = {
  zero: "Zero experience — wants to learn AI",
  build: "Has an idea to build",
  team: "Interested in team seats",
  unsure: "Not sure yet",
};

function isEmail(v: unknown): v is string {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function saveLeadToFile(lead: Lead) {
  // Zero-config fallback: append to data/leads.json so submissions are never lost.
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "leads.json");
    await fs.mkdir(dir, { recursive: true });
    let existing: Lead[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      existing = [];
    }
    existing.push(lead);
    await fs.writeFile(file, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("[interest] could not write leads file:", err);
  }
}

async function notifyByEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !to) return false;

  const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const trackLabel = lead.track ? TRACK_LABELS[lead.track] ?? lead.track : "—";

  const text = [
    "New Pasadena AI Institute application",
    "",
    `Name:       ${lead.name}`,
    `Email:      ${lead.email}`,
    `Phone:      ${lead.phone || "—"}`,
    `Track:      ${trackLabel}`,
    `Experience: ${lead.experience || "—"}`,
    "",
    "Goal / message:",
    lead.goal || "—",
    "",
    `Received:   ${lead.receivedAt}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Pasadena AI Institute <${from}>`,
        to: [to],
        reply_to: lead.email,
        subject: `New application — ${lead.name} (${trackLabel})`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[interest] Resend error:", await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[interest] Resend request failed:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name) {
    return NextResponse.json(
      { error: "Please tell us your name." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const lead: Lead = {
    name,
    email,
    phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
    track: typeof body.track === "string" ? body.track : undefined,
    experience:
      typeof body.experience === "string" ? body.experience : undefined,
    goal: typeof body.goal === "string" ? body.goal.trim() : undefined,
    receivedAt: new Date().toISOString(),
  };

  await saveLeadToFile(lead);
  const emailed = await notifyByEmail(lead);

  if (!emailed) {
    // No email configured — log so the user can still see leads in dev.
    console.log("[interest] New application:", JSON.stringify(lead, null, 2));
  }

  return NextResponse.json({
    ok: true,
    message:
      "Thanks! We've got your application — we'll be in touch within 1–2 business days to set up a quick call.",
  });
}
