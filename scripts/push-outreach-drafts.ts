// Push scripts/outreach-drafts.json into Gmail Drafts for jakehofman008@gmail.com.
//
// One-time setup:
//   1. Google Cloud Console → Gmail API → OAuth Desktop client
//   2. Save JSON as scripts/gmail-credentials.json
//   3. bun scripts/push-outreach-drafts.ts
//
// First run opens browser OAuth; token saved to scripts/gmail-token.json.

import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import http from "http";
import { URL } from "url";

const DIR = path.join(import.meta.dir);
const CREDS_FILE = path.join(DIR, "gmail-credentials.json");
const TOKEN_FILE = path.join(DIR, "gmail-token.json");
const DRAFTS_FILE = path.join(DIR, "outreach-drafts.json");
const LOG_FILE = path.join(DIR, "outreach-loaded-log.json");
const SCOPES = ["https://www.googleapis.com/auth/gmail.compose"];

const DRY = process.argv.includes("--dry");

if (!existsSync(CREDS_FILE)) {
  console.error(`ERROR: ${CREDS_FILE} not found.`);
  process.exit(1);
}

const creds = JSON.parse(readFileSync(CREDS_FILE, "utf8"));
const { client_id, client_secret } = creds.installed || creds.web || {};
if (!client_id || !client_secret) {
  console.error("ERROR: credentials JSON missing client_id/client_secret.");
  process.exit(1);
}

async function authorize(): Promise<OAuth2Client> {
  const PORT = 53683;
  const REDIRECT = `http://127.0.0.1:${PORT}`;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, REDIRECT);

  if (existsSync(TOKEN_FILE)) {
    oAuth2Client.setCredentials(JSON.parse(readFileSync(TOKEN_FILE, "utf8")));
    return oAuth2Client;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.error("Opening browser for Google OAuth...");
  console.error(authUrl);
  try {
    const { spawn } = await import("child_process");
    spawn("open", [authUrl], { detached: true, stdio: "ignore" }).unref();
  } catch {}

  const code = await new Promise<string>((resolve, reject) => {
    const server = http.createServer((req, res) => {
      try {
        const u = new URL(req.url || "/", REDIRECT);
        const c = u.searchParams.get("code");
        if (c) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h2>Authorized — close this tab.</h2>");
          server.close();
          resolve(c);
        } else if (u.searchParams.get("error")) {
          res.writeHead(400);
          res.end("auth error");
          server.close();
          reject(new Error(String(u.searchParams.get("error"))));
        } else {
          res.writeHead(404);
          res.end();
        }
      } catch (e) {
        reject(e);
      }
    });
    server.listen(PORT);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  return oAuth2Client;
}

function buildRawMessage(to: string, subject: string, body: string): string {
  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
  ];
  const msg = headers.join("\r\n") + "\r\n\r\n" + body;
  return Buffer.from(msg, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

type Draft = {
  first_name: string;
  business: string;
  to: string;
  subject: string;
  body: string;
};

type LogEntry = { to: string; draft_id?: string; status: string; error?: string };

async function main() {
  const drafts: Draft[] = JSON.parse(readFileSync(DRAFTS_FILE, "utf8"));
  const log: LogEntry[] = existsSync(LOG_FILE) ? JSON.parse(readFileSync(LOG_FILE, "utf8")) : [];
  const done = new Set(log.filter((e) => e.status === "ok").map((e) => e.to.toLowerCase()));
  const pending = drafts.filter((d) => !done.has(d.to.toLowerCase()));

  console.error(`mode=${DRY ? "DRY" : "LIVE"}  done=${done.size}  pending=${pending.length}`);

  if (DRY) {
    for (const d of pending.slice(0, 5)) console.error(`  -> ${d.to} | ${d.subject}`);
    return;
  }

  const auth = await authorize();
  const gmail = google.gmail({ version: "v1", auth });

  let ok = 0;
  let fail = 0;
  for (let i = 0; i < pending.length; i++) {
    const d = pending[i]!;
    try {
      const res = await gmail.users.drafts.create({
        userId: "me",
        requestBody: { message: { raw: buildRawMessage(d.to, d.subject, d.body) } },
      });
      ok++;
      log.push({ to: d.to, draft_id: res.data.id ?? undefined, status: "ok" });
    } catch (e: any) {
      fail++;
      log.push({ to: d.to, status: "fail", error: String(e?.message || e) });
      process.stderr.write(`FAIL ${d.to}: ${String(e?.message || e).slice(0, 140)}\n`);
    }
    writeFileSync(LOG_FILE, JSON.stringify(log, null, 2));
    if ((i + 1) % 10 === 0 || i === pending.length - 1) {
      process.stderr.write(`pushed ${i + 1}/${pending.length} ok=${ok} fail=${fail}\n`);
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  console.error(`DONE ok=${ok} fail=${fail}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
