#!/usr/bin/env python3
"""Create Gmail drafts for Pasadena AI Workshop outreach.

First-time setup:
  1. In Google Cloud Console, create OAuth Desktop credentials for Gmail API.
  2. Save the JSON as scripts/gmail-oauth-client.json (gitignored).
  3. Run: python3 scripts/gmail_create_drafts.py --auth
  4. Then: python3 scripts/gmail_create_drafts.py --remaining

Uses token saved to scripts/gmail-token.json after first browser login.
"""

from __future__ import annotations

import argparse
import base64
import json
import random
from email.mime.text import MIMEText
from pathlib import Path

import openpyxl
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

SCOPES = ["https://www.googleapis.com/auth/gmail.compose"]
ROOT = Path(__file__).resolve().parent
CLIENT_SECRETS = ROOT / "gmail-oauth-client.json"
TOKEN_PATH = ROOT / "gmail-token.json"
SPREADSHEET = Path("/Users/hofman/Downloads/whistle_workshop_outreach_list.xlsx")
REMAINING_PATH = ROOT / "outreach_remaining.json"

SUBJECT_A = "You've used ChatGPT. You're still missing the good part."
SUBJECT_B = "Learn to automate your work with AI, here in Pasadena"

TEMPLATE = """Hi {first},

This is going to sound like every other AI email in your inbox. Give me one paragraph to prove it isn't.

I'm Jake, an undergrad at Stanford. Along with my partners from Claremont McKenna & Harvey Mudd, we've already built and shipped a real AI product, a compliance tool now used by college athletic programs to do what used to take staff hours in seconds. I'm in college, I should probably be at the beach this summer. Instead, I'm teaching people the part of AI nobody explains.

Be honest, you've used ChatGPT, maybe Claude. You can write an email, summarize a doc, ask a question. Nice. But nobody's shown you the next part, where AI stops being a chatbot and starts doing real work for you. Cursor. Automations. Agents. Building tools just by describing what you want. Whatever it is that eats your Tuesday afternoons, there's probably an AI that can handle it while you get coffee.

That next step is almost impossible to learn from a video, so we built the opposite: one day, in person, in Pasadena, hands-on, until it clicks. You leave with the tools installed, working and a real workflow you built yourself.

Ten seats, this July. I'd love to save you one.

Apply here: whistleworkshop.com/register

Best,
Jake Hofman
Pasadena AI Workshop"""

ALREADY_DRAFTED = {
    e.lower()
    for e in [
        "info@asquaredbookkeepers.com",
        "angel@zhencpa.tax",
        "john.syroka@bbsi.com",
        "bill@elitefsi.com",
        "raymond.ng@hrblock.com",
        "kim@kimberlycovey.com",
        "danak@labusinessmgmt.com",
        "sandimejia@sbcglobal.net",
        "info@pieincaccounting.com",
        "chris@pacificgroupla.com",
        "tim.guerrero@peakforward360.com",
        "rob@rabcopayroll.com",
        "roberthalltaxes@roberthalltaxes.com",
        "jws@skeehanco.com",
        "info@stanislawskiandcompany.com",
        "milo@vanirmgmt.com",
        "katrina.franklin@claconnect.com",
        "corcorankathleen2@gmail.com",
        "info@npocpas.com",
        "Cathy@Safemoneylady.com",
        "mj@advisorferrera.com",
        "shanefoley@financialguide.com",
        "lwong@cliffordswan.com",
        "howard.raff@lpl.com",
        "brianlee@financialguide.com",
        "info@pasadenaprivate.com",
        "INChaudhry@gmail.com",
        "kevin@scoutfi.com",
        "info@sfgrpc.com",
        "dmedina@stewfi.com",
        "harrison.gulla@wedbush.com",
        "rita@mammaritamoney.com",
        "sandra@loanpartner.us",
        "kat@wefundla.net",
        "admin@azadianlawgroup.com",
        "jlee@changleelaw.com",
        "Eric@EJOlsonLaw.com",
        "karen@erinjoycelaw.com",
        "intakes@fgfirm.law",
        "art@gharibianlaw.com",
        "Cindy@HacklerFlynnLaw.com",
        "gpak@hahnlawyers.com",
        "info@jciplawyers.com",
        "mrojas@lagerlof.com",
        "jackie@luch.com",
        "RMcDonald@stonercarlson.com",
        "rwm@rwmedina.com",
        "manukyanlawfirm@gmail.com",
        "steve@plgvisa.com",
        "firm@romerolaw.com",
        "ruben@vardanyanlawfirm.com",
        "ctusan@ctusanlaw.com",
    ]
}


def load_contacts() -> list[dict]:
    wb = openpyxl.load_workbook(SPREADSHEET)
    ws = wb.active
    contacts = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        first_name, email = row[0], row[3]
        if email and "@" in str(email):
            contacts.append(
                {
                    "first": str(first_name).strip(),
                    "email": str(email).strip(),
                }
            )
    random.seed(42)
    subjects = [SUBJECT_A, SUBJECT_B]
    indices = [0] * (len(contacts) // 2) + [1] * (len(contacts) - len(contacts) // 2)
    random.shuffle(indices)
    for contact, idx in zip(contacts, indices):
        contact["subject"] = subjects[idx]
    return contacts


def get_service():
    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CLIENT_SECRETS.exists():
                raise SystemExit(
                    f"Missing {CLIENT_SECRETS}. Download OAuth desktop credentials from Google Cloud Console."
                )
            flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRETS), SCOPES)
            creds = flow.run_local_server(port=0)
        TOKEN_PATH.write_text(creds.to_json())
    return build("gmail", "v1", credentials=creds)


def create_draft(service, contact: dict) -> str:
    message = MIMEText(TEMPLATE.format(first=contact["first"]), "plain", "utf-8")
    message["to"] = contact["email"]
    message["subject"] = contact["subject"]
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode("utf-8")
    draft = (
        service.users()
        .drafts()
        .create(userId="me", body={"message": {"raw": raw}})
        .execute()
    )
    return draft["id"]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--auth", action="store_true", help="Run OAuth login only")
    parser.add_argument("--remaining", action="store_true", help="Create drafts for remaining contacts")
    parser.add_argument("--all", action="store_true", help="Create drafts for all contacts")
    parser.add_argument("--export-remaining", action="store_true", help="Write outreach_remaining.json")
    args = parser.parse_args()

    contacts = load_contacts()

    if args.export_remaining:
        remaining = [c for c in contacts if c["email"].lower() not in ALREADY_DRAFTED]
        REMAINING_PATH.write_text(json.dumps(remaining, indent=2) + "\n")
        print(f"Exported {len(remaining)} remaining contacts to {REMAINING_PATH}")
        return 0

    if args.auth:
        get_service()
        print(f"Authenticated. Token saved to {TOKEN_PATH}")
        return 0

    if not (args.remaining or args.all):
        parser.print_help()
        return 1

    targets = contacts if args.all else [c for c in contacts if c["email"].lower() not in ALREADY_DRAFTED]
    service = get_service()
    created = 0
    for contact in targets:
        draft_id = create_draft(service, contact)
        created += 1
        print(f"[{created}/{len(targets)}] {contact['email']} -> draft {draft_id}")
    print(f"Done. Created {created} drafts in jakehofman008@gmail.com.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
