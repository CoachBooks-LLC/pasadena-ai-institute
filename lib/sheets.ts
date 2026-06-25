import { EXPERIENCE_LABELS, type Lead } from "@/lib/applications";

// Appends a lead to the Google Sheet via a Google Apps Script web app.
//
// Setup is intentionally credential-light: instead of a service account, we POST
// JSON to an Apps Script "web app" URL that is bound to the spreadsheet. See
// scripts/apps-script-webhook.gs for the script to paste + deploy, and
// .env.example for the env vars.
//
//   SHEETS_WEBHOOK_URL    — the /exec URL from the deployed Apps Script web app
//   SHEETS_WEBHOOK_SECRET — shared token; must match TOKEN in the Apps Script
//
// Returns true if the row was appended, false otherwise. Never throws — the
// caller treats Sheets as best-effort (Resend email is the backup record).

type ResumePayload = {
  filename: string;
  base64: string;
};

export async function appendLeadToSheet(
  lead: Lead,
  resume?: ResumePayload,
): Promise<boolean> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) return false;

  const expLabel = lead.experience
    ? EXPERIENCE_LABELS[lead.experience] ?? lead.experience
    : "";

  const payload = {
    secret: process.env.SHEETS_WEBHOOK_SECRET || "",
    receivedAt: lead.receivedAt,
    name: lead.name,
    email: lead.email,
    company: lead.company || "",
    linkedin: lead.linkedin || "",
    experience: expLabel,
    ambition: lead.ambition || "",
    // If a resume is present, the Apps Script saves it to a Drive folder and
    // puts a link in the sheet. Otherwise the cell is left blank.
    resumeName: resume?.filename || "",
    resumeBase64: resume?.base64 || "",
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Apps Script /exec issues a 302 to script.googleusercontent.com; fetch
      // follows it by default, which is what we want.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[interest] Sheets webhook error:", res.status, await res.text());
      return false;
    }

    const body = await res.json().catch(() => ({}) as Record<string, unknown>);
    if (body && body.ok === false) {
      console.error("[interest] Sheets webhook rejected:", body);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[interest] Sheets webhook failed:", err);
    return false;
  }
}
