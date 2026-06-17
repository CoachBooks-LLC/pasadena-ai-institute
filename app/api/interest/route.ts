import { NextRequest, NextResponse } from "next/server";
import {
  cleanFormString,
  createLead,
  MAX_RESUME_BYTES,
  notifyByEmail,
  safeFileName,
  saveLead,
  saveResume,
  validateApplication,
  type ApplicationInput,
} from "@/lib/applications";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";

  let input: ApplicationInput;

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    input = {
      name: cleanFormString(form.get("name")),
      email: cleanFormString(form.get("email")),
      company: cleanFormString(form.get("company")),
      linkedin: cleanFormString(form.get("linkedin")),
      ambition: cleanFormString(form.get("ambition")),
      experience: cleanFormString(form.get("experience")),
    };

    const file = form.get("resume");
    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > MAX_RESUME_BYTES) {
        return NextResponse.json(
          { error: "That resume is over 8 MB. Please attach a smaller file." },
          { status: 400 },
        );
      }
      input.resume = {
        buffer: Buffer.from(await file.arrayBuffer()),
        originalName: safeFileName(file.name || "resume"),
      };
    }
  } else {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }
    input = {
      name: typeof body.name === "string" ? body.name.trim() : "",
      email: typeof body.email === "string" ? body.email.trim() : "",
      company: typeof body.company === "string" ? body.company.trim() : "",
      linkedin: typeof body.linkedin === "string" ? body.linkedin.trim() : "",
      ambition: typeof body.ambition === "string" ? body.ambition.trim() : "",
      experience:
        typeof body.experience === "string" ? body.experience.trim() : "",
    };
  }

  const validationError = validateApplication(input);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  let savedResume: string | undefined;
  if (input.resume) {
    try {
      savedResume = await saveResume(input.resume);
    } catch (err) {
      console.error("[interest] could not save resume:", err);
    }
  }

  const lead = createLead(input, savedResume);
  let savedLead = false;
  try {
    await saveLead(lead);
    savedLead = true;
  } catch (err) {
    console.error("[interest] could not write leads file:", err);
  }

  const emailed = await notifyByEmail(
    lead,
    input.resume
      ? {
          filename: input.resume.originalName || "resume",
          base64: input.resume.buffer.toString("base64"),
        }
      : undefined,
  );

  if (!savedLead && !emailed) {
    return NextResponse.json(
      {
        error:
          "We couldn't save your application just now. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }

  if (!emailed) {
    console.log("[interest] New application:", JSON.stringify(lead, null, 2));
  }

  return NextResponse.json({
    ok: true,
    message:
      "Application received. We review on a rolling basis and you'll hear from us by Monday, June 29, either way.",
  });
}
