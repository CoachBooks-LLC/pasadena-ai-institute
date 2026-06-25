/**
 * Pasadena AI Workshop — application logger (Google Apps Script web app)
 *
 * This receives a JSON POST from the website's /api/interest route and appends
 * a row to the applications spreadsheet. If a resume is included, it is saved to
 * a Drive folder and a link is written into the row.
 *
 * ── HOW TO DEPLOY ─────────────────────────────────────────────────────────────
 * 1. Open the sheet:
 *      https://docs.google.com/spreadsheets/d/1N-fGju6EKVHmV4Houh7xAXW_ZG3L2B0B2wVHsacAgNk/edit
 * 2. Extensions → Apps Script. Delete any boilerplate, paste this whole file.
 * 3. Change TOKEN below to a long random string (keep a copy — it becomes the
 *    SHEETS_WEBHOOK_SECRET env var in Vercel).
 * 4. Click Deploy → New deployment → type "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone
 *    Deploy, authorize when prompted (this is the one auth step), and copy the
 *    Web app URL (ends in /exec). That URL becomes SHEETS_WEBHOOK_URL in Vercel.
 * 5. To test from the editor: select the `selfTest` function and Run — a test
 *    row should appear in the sheet.
 * ──────────────────────────────────────────────────────────────────────────────
 */

// Replace with a long random string, then mirror it into SHEETS_WEBHOOK_SECRET.
var TOKEN = "REPLACE_WITH_A_LONG_RANDOM_STRING";

var SHEET_ID = "1N-fGju6EKVHmV4Houh7xAXW_ZG3L2B0B2wVHsacAgNk";
var RESUME_FOLDER_NAME = "Workshop Resumes";

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (TOKEN && data.secret !== TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var resumeLink = "";
    if (data.resumeBase64 && data.resumeName) {
      resumeLink = saveResume(data.resumeName, data.resumeBase64, data.name);
    }

    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    sheet.appendRow([
      data.receivedAt || new Date().toISOString(),
      data.name || "",
      data.email || "",
      data.company || "",
      data.linkedin || "",
      data.experience || "",
      data.ambition || "",
      resumeLink,
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function saveResume(name, base64, applicantName) {
  var folder = getResumeFolder();
  var bytes = Utilities.base64Decode(base64);
  var safeName = String(applicantName || "applicant").replace(/[^\w.-]+/g, "_");
  var blob = Utilities.newBlob(bytes, guessMime(name), safeName + "__" + name);
  var file = folder.createFile(blob);
  // Anyone with the sheet (and the link) can open the resume.
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file.getUrl();
}

function getResumeFolder() {
  var it = DriveApp.getFoldersByName(RESUME_FOLDER_NAME);
  return it.hasNext() ? it.next() : DriveApp.createFolder(RESUME_FOLDER_NAME);
}

function guessMime(name) {
  var lower = String(name).toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".doc")) return "application/msword";
  if (lower.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  return "application/octet-stream";
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

// Run this from the editor to confirm appendRow + auth work.
function selfTest() {
  doPost({
    postData: {
      contents: JSON.stringify({
        secret: TOKEN,
        receivedAt: new Date().toISOString(),
        name: "Test Applicant",
        email: "test@example.com",
        company: "Test Co",
        linkedin: "",
        experience: "Dabbled with ChatGPT a little",
        ambition: "Make sure the webhook works.",
        resumeName: "",
        resumeBase64: "",
      }),
    },
  });
}
