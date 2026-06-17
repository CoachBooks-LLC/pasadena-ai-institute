# Launch Playbook — Pasadena AI Institute (hosted by Whistle Labs)

> The operator's manual. Start at the top, work down, check the boxes.
> This gets you from "today" to **first paid seat + first cohort run** — without guessing what's next.

---

## 1. Overview & the goal

**What we're launching:** the Pasadena AI Institute, hosted by Whistle Labs — a 2-day, in-person, hands-on AI conference in Pasadena, CA. Zero to one with AI. Two tracks: **Zero Experience** and **I Have an Idea**. $995 all-inclusive. First run: **Founding Cohort, Fall 2026, 24 seats.**

**Who it's for:** professionals, owners, and execs (roughly 35–60) across Pasadena, Greater LA, and SoCal. Non-technical welcome — no experience required.

**The funnel (memorize this):**

```
Website  →  Interest form  OR  Stripe checkout
              │                    │
        (form) email          (instant) paid
              │
        15-min Zoom call
              │
        Payment link
              │
        Attend  →  Testimonial / referral  →  next cohort
```

### "Done" is defined as two things:

- [ ] **First milestone — first seat sold.** One real person has paid $995 (live Stripe payment or a Stripe payment link), not a test.
- [ ] **Second milestone — first cohort run.** The 2-day Founding Cohort has been delivered end to end, and you've collected at least a few testimonials.

Everything below is the path between here and those two checkboxes. Phases run roughly in order, but Phase 1 (venue) and Phase 2 (selling) overlap — you can sell before the venue is locked, you just can't take many seats before you know the room exists.

**Realistic timeline (working backward from a Fall 2026 conference):**

- [ ] **Now → +2 weeks:** Phase 0 (go live) + start Phase 1 (venue calls)
- [ ] **+2 → +8 weeks:** Phase 1 done (venue booked) + Phase 2 in full swing (selling)
- [ ] **Through summer 2026:** keep selling toward 24 seats; minimum viable run is ~10–12 paid
- [ ] **~3 weeks out:** Phase 3 (prepare to deliver)
- [ ] **Conference dates (Fall 2026):** Phase 4 (run of show)
- [ ] **Week after:** Phase 5 (testimonials, referrals, announce next cohort)

---

## 2. Phase 0 — Go live (tech + ops setup)

The website is already built (Next.js, deploys on Vercel). You are **configuring and connecting** it, not building it. You do not need to write code. You're doing three things: (1) get a domain pointing at the site, (2) turn on payments (Stripe), (3) turn on lead emails (Resend). Then test the whole funnel once.

> **One concept to hold onto:** almost every "setting" in this app is an **environment variable** (an "env var") — a named value you paste into the Vercel dashboard. You change a value, redeploy, done. The site's master config lives in `lib/site.ts` (price, dates, cohort, contact email), and the live domain is controlled by the env var `NEXT_PUBLIC_SITE_URL`. **Swapping the domain is a single value** — you don't edit a dozen files.

### 2.1 — Buy the domain (GoDaddy)

- [x] Domain purchased on GoDaddy: **whistleworkshop.com** (already baked into `lib/site.ts` as the fallback).
- [ ] Decline the GoDaddy upsells (you don't need GoDaddy hosting, email, or "web security" — Vercel and Resend cover what you need).
- [ ] Turn on **domain privacy** (usually free) so your home address isn't public.
- [ ] Write the exact domain you bought here: `________________________`

### 2.2 — Connect the domain to Vercel

- [ ] Log into Vercel and open the project for this site.
- [ ] Go to **Project → Settings → Domains → Add**. Enter your purchased domain (and the `www.` version — Vercel will offer to redirect one to the other; let it).
- [ ] Vercel will show you DNS records to add. You'll typically get either:
  - An **A record** pointing the root domain (`@`) to a Vercel IP, **and/or**
  - A **CNAME record** pointing `www` to `cname.vercel-dns.com`.
- [ ] In a second tab, open **GoDaddy → My Products → your domain → DNS / Manage DNS**.
- [ ] Add exactly the records Vercel told you to add. Match them character for character. Delete GoDaddy's default "parked" / forwarding records if they conflict.
- [ ] Go back to Vercel and wait for each domain to flip to a green **"Valid Configuration."** This can take from a few minutes up to a few hours (DNS propagation). Don't panic if it's not instant.
- [ ] Confirm HTTPS works: visit `https://yourdomain.com` and look for the padlock. Vercel issues the SSL certificate automatically.

### 2.3 — Set the site URL env var

- [ ] In Vercel: **Settings → Environment Variables → Add New.**
- [ ] Add: **Key** = `NEXT_PUBLIC_SITE_URL`, **Value** = `https://yourdomain.com` (use the real domain, no trailing slash). Apply to **Production** (and Preview if offered).
- [ ] This is the single value that tells the site, emails, and Stripe redirect URLs what the live address is. (Code reference: `lib/site.ts` reads `process.env.NEXT_PUBLIC_SITE_URL`; checkout redirects use it for `success_url` / `cancel_url`.)
- [ ] After adding any env var, you must **redeploy** for it to take effect: **Deployments → latest → ⋯ → Redeploy.**

### 2.4 — Create Stripe & turn on checkout (test first, then live)

The checkout route builds the $995 charge inline — **you do not need to create a product in the Stripe dashboard.** You just need to give the site your Stripe secret key.

**Test mode first (free, safe, uses fake cards):**

- [ ] Create a Stripe account at stripe.com. Use a real business email.
- [ ] In the Stripe dashboard, make sure the **"Test mode"** toggle (top right) is **ON.**
- [ ] Go to **Developers → API keys.** Copy the **Secret key** — in test mode it starts with `sk_test_...`.
- [ ] In Vercel: add env var **Key** = `STRIPE_SECRET_KEY`, **Value** = the `sk_test_...` key. Redeploy.
- [ ] On the live site, click **"Reserve your seat — $995"** and complete checkout with Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC, any ZIP.
- [ ] Confirm you land on `/register?status=success` and the payment shows in your Stripe **test** dashboard.
- [ ] (Sanity check the off-state too: with no key set, the site shows a graceful "apply with the interest form and we'll send a payment link" message instead of breaking — that's by design.)

**Then switch to live (real money):**

- [ ] Complete Stripe's **business activation** (they'll ask for your legal name/business info and a bank account for payouts). You can't accept real cards until this is done.
- [ ] Flip the dashboard to **Test mode OFF (Live).**
- [ ] **Developers → API keys → reveal the live Secret key** (`sk_live_...`).
- [ ] In Vercel: update `STRIPE_SECRET_KEY` to the `sk_live_...` value. Redeploy.
- [ ] Do **one real $995 charge yourself** (your own card), confirm it lands, then **refund it** from the Stripe dashboard. Now you know live payments truly work.

### 2.5 — Turn on lead emails (Resend)

Right now the interest form **always saves leads to a file** (`data/leads.json`) so nothing is ever lost. But you want an **email alert the moment someone applies** so you can call them fast. That's Resend.

- [ ] Create an account at resend.com (free tier is plenty to start).
- [ ] **API Keys → Create API Key.** Copy it (starts with `re_...`).
- [ ] In Vercel, add these three env vars:
  - [ ] `RESEND_API_KEY` = your `re_...` key
  - [ ] `LEAD_NOTIFY_EMAIL` = **where lead alerts go** (your own inbox — e.g. your Gmail). This is where you'll find out someone applied.
  - [ ] `RESEND_FROM_EMAIL` = the **from** address on those alerts. To start, you can leave this unset (it falls back to `onboarding@resend.dev`). For a polished setup, verify your domain in Resend (add the DNS records Resend gives you to GoDaddy, same as you did for Vercel) and use `hello@yourdomain.com`.
- [ ] Redeploy.
- [ ] **Bonus (recommended): set up `hello@` so replies reach you.** Lead alert emails set reply-to as the applicant's address, but you also publish `hello@whistleworkshop.com` (in `lib/site.ts`) as your contact. Set up email forwarding for that address (GoDaddy email forwarding, or Resend/Google Workspace) so people emailing you actually reach you.

### 2.6 — End-to-end test (do this before telling anyone the site is live)

- [ ] **Interest form test:** open the live site, submit the interest form with your own name/email and a fake "goal." Confirm: (a) you see the on-screen thank-you, (b) you get a lead-alert email at `LEAD_NOTIFY_EMAIL`.
- [ ] **Checkout test:** complete a checkout (test card in test mode, or a real-then-refunded $995 in live mode). Confirm you land on the success page.
- [ ] **Mobile test:** open the site on your phone. Most of your audience will first see it on a phone. Check the form and the "Reserve your seat" button both work.
- [ ] **Read every page once** as if you were a 55-year-old business owner. Fix typos by editing `lib/content.ts` / `lib/site.ts` if needed (or hand to whoever maintains the site).
- [ ] **Update `lib/site.ts` cohort dates** once your venue dates are locked (Phase 1). Currently it says "Fall 2026" — make it the real two dates once you have them.

> **You are now LIVE.** The site can take applications and payments. Don't wait for "perfect" — go sell.

---

## 3. Phase 1 — Venue (find & book a 2-day room in Pasadena)

You need a room for **two consecutive days** that comfortably holds **24–30 people working on laptops**. The single biggest risk is **WiFi** — if the internet can't handle 30 people downloading tools and hitting AI APIs at once, Day 1 morning collapses. Treat WiFi as a hard requirement, not a nice-to-have.

### 3.1 — Venue categories to call (work the list top to bottom)

- [ ] **Hotels with meeting/conference rooms** — Pasadena has several (the area around the Convention Center, Old Pasadena, near the 210). Ask for the "sales" or "events" department. Pros: A/V and catering built in, parking, professional feel. Cons: priciest, may push food minimums.
- [ ] **Coworking spaces** — they rent event/training rooms by the day and are built for laptops + power + WiFi. Often the best price/fit for a hands-on tech workshop. Ask which locations have a room for ~24–30.
- [ ] **Business centers / executive suites** — companies that rent furnished training rooms and boardrooms by the day.
- [ ] **Pasadena Convention Center** — has smaller meeting rooms, not just the big halls. Worth a call for a comparison quote.
- [ ] **Libraries & community rooms** — Pasadena Central Library and city/community center rooms are cheap or free. Verify they allow a paid event, allow food, and have real WiFi + power. Often the catch is no/weak WiFi and no catering — confirm before getting excited.
- [ ] **Universities / continuing-ed spaces** — Pasadena has campuses with rentable classrooms/computer labs; good tables + power, ask about public rental and WiFi for guests.
- [ ] **Conference / event centers & nicer restaurants with private event rooms** — usable as a backstop, but check tables (not just dining seating) and power.

### 3.2 — What to ask on EVERY call (copy this into your notes)

- [ ] "Do you have a room that holds **24–30 people at tables** (not theater-style chairs) for **two consecutive days**?"
- [ ] "What are your available **two-day blocks in [your target months, Fall 2026]**?"
- [ ] "What's the **all-in cost** for both full days — room rental, plus any service fees, cleaning, or food/beverage minimums?"
- [ ] "**WiFi:** is there business-grade WiFi that can handle **30 people on laptops at once**? What's the bandwidth? Is there a guest network and password? Can we test it before we book?" (Critical.)
- [ ] "**Power:** is there a power outlet or power strip **at each seat**? Can we bring our own power strips/extension cords?"
- [ ] "**A/V:** is there a **projector or large screen** and a way to connect a laptop (HDMI/USB-C)? Microphone if the room is big? Is it included or extra?"
- [ ] "**Tables:** can the room be set **classroom or U-shape with tables** so everyone has space for a laptop and notes?"
- [ ] "**Catering:** can we bring in **lunch both days** / use outside caterers, or must we use yours? Any minimums? Is coffee/water available?"
- [ ] "**Parking:** is there free or affordable parking for ~25 people? Validation? Nearby lots/Metro?"
- [ ] "**Access:** what time can we get in to set up each morning, and how late can we stay? Is the room **the same room both days** (so we can leave things set up overnight)?"
- [ ] "**Deposit & cancellation:** what's the deposit, and what's your cancellation/reschedule policy?"
- [ ] "Is the space **quiet** — no loud event in the next room, no construction?"
- [ ] "Is it **ADA accessible**?"

### 3.3 — Venue comparison checklist (score each finalist)

For your top 2–3 options, fill this out and compare side by side:

| Question | Venue A | Venue B | Venue C |
|---|---|---|---|
| Holds 24–30 at tables? | | | |
| 2 consecutive days available (dates)? | | | |
| WiFi proven for 30 laptops? | | | |
| Power at every seat? | | | |
| Projector/screen + laptop connect? | | | |
| Lunch: in-house / outside allowed / minimum? | | | |
| Parking (free? cost? validation?) | | | |
| Same room both days / overnight storage? | | | |
| Setup access time each morning | | | |
| All-in cost (both days) | | | |
| Deposit & cancellation terms | | | |
| Overall vibe / professional feel | | | |

### 3.4 — Book it

- [ ] **Visit your top choice in person** before signing. Stand in the room. Test the WiFi on your phone. Look for outlets.
- [ ] Confirm the **two exact dates** (pick weekdays vs. weekend deliberately — your audience is working professionals; a Friday+Saturday or weekend often works best).
- [ ] Sign the contract, pay the deposit, get it **in writing** (dates, room, included A/V, food rules, access times).
- [ ] **Lock dates everywhere:** update `lib/site.ts` cohort season → the real dates, and update the website copy. Now you can sell with confidence.
- [ ] Add a calendar hold for setup morning + both event days.

---

## 4. Phase 2 — Fill the room (sign the first customers)

Your job now: **get the first 10 seats.** The first 10 are the hardest and come almost entirely from people who already trust you. Once you have ~10 paid and a couple of testimonials, momentum and referrals do more of the work toward 24.

> **Email templates live in `marketing/emails/`** — use them, don't reinvent:
> - `01-cold-outreach.md` — first personal touch to a local owner/org leader
> - `02-interest-followup.md` — sent the moment someone submits the interest form; books the 15-min Zoom
> - `03-post-zoom-payment.md` — sent same day after the call; recaps fit + sends the payment link

### 4.1 — The "first 10 seats" action plan

**Tier 1 — Warm network (start here, today):**

- [ ] Make a list of **30–50 people** you personally know who fit (or who lead orgs full of people who fit): business owners, execs, professionals 35–60 in Pasadena / Greater LA / SoCal.
- [ ] Email them **one at a time, personally** using `01-cold-outreach.md` (personalize the first line — it must be about *them*, not a blast).
- [ ] Ask each for one of two things: come yourself, **or** intro me to one person who'd love it. (Note the P.S. in the template — referrals are the multiplier.)
- [ ] Aim: from 30–50 warm emails, you should land your **first 3–6 seats** and several referrals.

**Tier 2 — Local organizations (parallel):**

- [ ] Contact local groups where your audience gathers: **Pasadena Chamber of Commerce, BNI chapters, Rotary, industry/professional associations, alumni groups, faith/community business groups, local meetups.**
- [ ] Offer two things: (a) seats for their members, (b) a **free 45-min "lunch-and-learn"** for their group (see 4.2). Use `01-cold-outreach.md`, swapping the P.S. to the "members/team" version.
- [ ] Ask chambers/groups to share the conference in their newsletter or member channel.

**Tier 3 — Local reach (ongoing):**

- [ ] Post personally on **LinkedIn** (your real voice, not an ad): what you're building and why, with a link. Repost as seats fill.
- [ ] Ask 3–5 friends to share that post.
- [ ] Consider a small, **geo-targeted** spend later — but only after warm + orgs are tapped. Word of mouth converts far better for a $995 in-person commitment.

### 4.2 — The free lunch-and-learn (your best top-of-funnel)

A 45-minute free session in front of the right room is the single highest-converting thing you can do.

- [ ] Book a free session with a chamber/Rotary/company team (lunch hour works great).
- [ ] Bring a laptop + projector. **Show, don't tell:** in ~20 minutes, live-build something tiny and real with AI (e.g., a simple tool or a working prototype from an idea someone in the room shouts out). The "wow" sells the conference.
- [ ] End with: "If you want to go from this little taste to actually building your own thing, that's exactly what the 2-day Founding Cohort is for." Then point them to the site / interest form.
- [ ] Capture interest in the room: have the **interest form open on your phone/a laptop**, or pass a simple sign-up sheet and enter them yourself. Don't let warm interest walk out un-captured.

### 4.3 — How the form + Zoom call closes deals

This is the core conversion loop. Make it fast — speed of follow-up is everything.

- [ ] **Application comes in** → you get the Resend alert at `LEAD_NOTIFY_EMAIL`.
- [ ] **Within hours (same day ideal):** reply with `02-interest-followup.md`. Offer 2–3 specific times + a scheduling link. Don't re-sell — they already raised their hand; just make booking easy.
- [ ] **Run the 15-min Zoom** using the script in Section 5. Goal of the call: understand their goal, confirm the right track, answer the price question honestly, and get a yes-in-principle.
- [ ] **Same day after the call:** send `03-post-zoom-payment.md` — recap what *they* said in their own words, keep ONE track block, drop in the payment link, and use honest seat-scarcity (only real numbers).
- [ ] **The payment link** can be your live Stripe "Reserve your seat" page, or a Stripe Payment Link you generate in the dashboard. Either is fine; the dashboard payment link is handy to paste directly into the email.
- [ ] **If no payment in 3–4 days:** one short, warm nudge. Then leave it — no pressure. A "not now" often becomes a "yes" for the next cohort.

### 4.4 — Track the pipeline

- [ ] Keep a simple sheet (or `data/leads.json` plus a spreadsheet): Name · Source · Track · Call booked? · Call done? · Paid? · Notes.
- [ ] Know your live count at all times: **how many of 24 are paid.** This number drives the scarcity line in your emails and your go/no-go call.
- [ ] **Go/no-go floor:** decide your minimum viable headcount (e.g. **10–12 paid**). If you're short a few weeks out, either push harder on referrals or, if needed, shift the date and tell everyone honestly. Don't run a near-empty room.

---

## 5. The Zoom sales-call script (15 minutes)

Warm, consultative, not pushy. You're a sharp friend helping them decide if this is right — not closing a sale. If it's genuinely not a fit, say so; that honesty is what earns the referral. Print this or keep it on a second screen.

### Opening (1 min) — set the tone

> "Hey [Name], thanks for jumping on. This'll be quick — I just want to hear what you're hoping to get out of this and make sure the Founding Cohort is actually the right fit for you. There's no hard pitch here. Sound good?"

- [ ] Smile, slow down, let them talk more than you.

### Discovery (5–6 min) — listen, take notes in their words

Ask these and shut up:

- [ ] **"What made you raise your hand — what's going on with AI for you right now?"** (Their pain / motivation.)
- [ ] **"When you picture getting this right, what does that look like? What would you love to walk out able to do?"** (Their outcome.)
- [ ] **"Where are you starting from — totally new to this, or do you already have an idea or a project in mind?"** (This tells you the **track**: Zero Experience vs. I Have an Idea.)
- [ ] If they have an idea: **"Tell me about it — what would the thing actually do?"** (You'll mirror this back later. Get specific.)
- [ ] **"What's gotten in the way so far — time, where to start, the jargon?"** (The objection, surfaced early.)

> Write down their exact phrases. You'll reuse them in the follow-up email and the close.

### Present the value (3–4 min) — tailored to what they just said

Don't recite features. Connect their goal to the room:

- [ ] **Mirror it back:** "So what I'm hearing is you want to [their words] — you're not looking for more videos, you want to actually [build it / get it to click]."
- [ ] **Position the format:** "That's exactly what this is built for. It's two full days, in person, in a small room here in Pasadena. We don't lecture at you — we sit with you until it clicks, and you leave having built something real."
- [ ] **Name their track:**
  - Zero Experience: "You'd be in the **Zero Experience** track — we start at absolute zero, set up the real tools (Claude, ChatGPT, Cursor) on your own laptop, and by the end of day two you've built something you can actually use."
  - I Have an Idea: "You'd be in the **I Have an Idea** track — we set up Cursor and Claude on your laptop and build alongside you, so you leave with a working prototype of [their idea] — not notes about one."
- [ ] **Name the tools plainly** (your audience trusts specifics): Claude, ChatGPT, Cursor, AI agents, "vibe coding," custom workflows.
- [ ] **What's included:** "It's $995, and that's everything — materials, lunch both days, all the software set up on your laptop, and the alumni community after."

### Handle price (1–2 min) — honest, calm, no flinch

If they hesitate on $995:

- [ ] **Don't discount. Reframe to value:** "Totally fair to ask. Think about what two days of getting this to actually click is worth to [their work / their idea] — most people leave having built the thing they've been putting off for a year. And it's all-inclusive — no upsells, no 'pro tier' later."
- [ ] **Use real scarcity, gently:** "It's a small room on purpose — 24 seats for the Founding Cohort, so everyone gets real attention. Founding pricing won't be lower again."
- [ ] **If it's a real budget no:** "No worries at all — I'd rather you come to the cohort that's right for you. Want me to keep you posted on the next one?" (Keep the relationship; ask for a referral.)

### The close (1 min) — assume the yes, make it easy

- [ ] **Ask directly but warmly:** "Honestly, from what you've told me, I think you'd get a lot out of this. Want me to save you a seat?"
- [ ] **If yes:** "Great — I'll send you the reserve link right after we hang up. Once you're in, I'll follow up with everything you need before the dates."
- [ ] **If "let me think":** "Of course. Can I ask — is it the timing, the money, or just wanting to sit with it?" (Surface the real reason, address it, agree on a follow-up day.)

### Next step (always)

- [ ] **Send `03-post-zoom-payment.md` the same day**, while it's warm: recap their goal in their words, keep their track block, paste the payment link, state real seats-remaining.
- [ ] Note their track + key quotes in your pipeline sheet (you'll want the quotes for testimonials and the prep email).

---

## 6. Phase 3 — Prepare to deliver (~3 weeks out → day before)

Goal: Day 1 morning runs like clockwork because everything boring is already handled.

### 6.1 — Software & accounts to pre-stage

The #1 Day-1 time sink is account creation and tool setup across a room of different laptops. Get ahead of it.

- [ ] Write a **one-page "before you come" setup sheet** and email it to every paid attendee a week out (see 6.5). Have them arrive with accounts already made where possible.
- [ ] Pre-decide and document the exact stack you'll set up live: **Claude, ChatGPT, Cursor**, plus any agent/workflow tools you'll demo.
- [ ] **Cursor:** know the install steps cold for both **Mac and Windows.** Have the installers downloadable / on a USB drive as a fallback for slow WiFi.
- [ ] **Claude & ChatGPT:** decide whether attendees use free or paid tiers and tell them in advance. If a tool needs a paid plan to do the workshop exercises, say so up front (it's $995 all-inclusive for the *event* — be clear about any personal subscriptions).
- [ ] **API keys / billing:** if any exercise needs an API key, decide how that's handled (shared workshop keys you provide and rotate, vs. attendees making their own). Don't discover this Day 1.
- [ ] **Test the full setup on a fresh Mac and a fresh Windows laptop yourself.** Time it. This is your reality check.

### 6.2 — Materials

- [ ] **Printed quick-start handout** per attendee: the setup steps, key shortcuts, where to get help, the day's agenda. Older professionals love a paper anchor.
- [ ] **Slides / walkthrough deck** for the taught portions (kept minimal — this is hands-on, not a lecture).
- [ ] **Cheat sheets:** common prompts, the "vibe coding" loop, how to talk to an agent.
- [ ] **Feedback form** (paper or a simple Google Form) for end of Day 2.
- [ ] **Branded touches** (optional but classy): use the brand palette (deep navy + amber on warm off-white), Fraunces for headers. Stickers/notebooks are a nice founding-cohort gift.

### 6.3 — Signage, name tags, room

- [ ] **Name tags** (pre-printed; include first name big + their track color so helpers can spot who's where).
- [ ] **Signage:** a sign at the building entrance and door ("Pasadena AI Institute → this way"), plus track signs if you split rooms/areas Day 1.
- [ ] **Table layout:** confirm classroom/U-shape, laptop space per seat, power strips at every seat (bring your own + extension cords + a power-strip count to match headcount).
- [ ] **Helper laptop + the projector cable** that matches the venue (HDMI and USB-C adapter — bring both).
- [ ] **Welcome slide** on screen as people walk in.

### 6.4 — Food & logistics

- [ ] **Order lunch both days** (per venue's catering rules from Phase 1). Confirm headcount + collect **dietary restrictions** in the prep email. Have **coffee + water + light snacks** available all day — caffeine keeps a learning room alive.
- [ ] Confirm **final headcount** with the venue and caterer a few days out.
- [ ] **Parking instructions** finalized (include in prep email).
- [ ] **Helpers/facilitators booked** (see Phase 4 — you want ~1 helper per 6–8 attendees).
- [ ] **Cash float / receipts / any walk-up handling** decided (most should be pre-paid; have a Stripe payment link ready for any day-of stragglers).

### 6.5 — Tech setup pre-flight (do the day before, in the actual room if you can)

- [ ] Get into the room, connect a laptop to the **projector** — confirm it works.
- [ ] **Stress-test WiFi:** connect several devices, open Cursor/Claude/ChatGPT, run a real exercise. If it chokes, you need a plan NOW (venue boost, a backup hotspot or two, or staggering downloads).
- [ ] Confirm **power at every seat** actually has power (outlets can be dead). Lay out and test power strips.
- [ ] Pre-download installers onto a **USB drive** as a WiFi-failure fallback.
- [ ] Have the **setup sheet, name tags, handouts, signage** all in a labeled box ready to go.

### 6.6 — What to send attendees beforehand (the prep email, ~1 week out)

- [ ] **Dates, address, start/end times, parking.**
- [ ] **What to bring:** their laptop + charger (Mac or Windows both fine), and confirm it's a personal laptop they can install software on (no locked-down work machines — flag this clearly).
- [ ] **Accounts to create in advance** (the setup sheet): which of Claude/ChatGPT/Cursor to sign up for, and any plan they need.
- [ ] **Their track** (confirm Zero Experience vs. I Have an Idea) and, for idea-folks, a nudge to come with their idea written in a sentence or two.
- [ ] **Dietary restrictions** request.
- [ ] **What to expect:** "two days, hands-on, small room, you'll build something real — come curious, no prep beyond the accounts."
- [ ] A warm "can't wait to have you" close, signed as Pasadena AI Institute, hosted by Whistle Labs.

---

## 7. Phase 4 — Run of show / facilitation guide

You have a **mixed-experience room.** The whole promise is "we stay until it clicks" — so the facilitation job is to keep the fast people engaged while no one slow gets left behind. That's done with **helpers, pacing, and the track split**, not by lecturing harder.

### 7.1 — Golden rules

- [ ] **Helpers work the room constantly.** ~1 helper per 6–8 people. Their job: roam, watch screens, jump in *before* someone gets stuck and quietly frustrated. The teacher teaches; helpers unstick.
- [ ] **Pace to the middle, catch the back.** Teach to roughly the 60th-percentile speed; helpers carry the people who fall behind so the room doesn't stall.
- [ ] **Checkpoints, not a firehose.** Work in 20–30 min blocks: short demo → everyone does it → "raise your hand if your screen looks like mine." Don't move on until the room is mostly there.
- [ ] **Color-coded name tags** (by track / by "I'm stuck") let helpers triage at a glance.
- [ ] **Normalize being stuck.** Say out loud, early: "Getting stuck is the work — that's what we're here for. Wave a helper over the second something's weird." Removes the shame that makes older professionals go quiet.
- [ ] **Protect the energy.** Breaks every ~60–75 min. Coffee flowing. Don't skip lunch to "catch up" — fried brains don't learn.

### 7.2 — Day 1 — Foundations, then the track split

- [ ] **Welcome + the promise (short):** why we're here, how the two days work, the "stay until it clicks" ethos. Keep it tight — they came to do, not listen.
- [ ] **Everyone together — setup (the riskiest hour):** get Claude / ChatGPT / Cursor working on every laptop. Helpers swarm. Use your USB fallback for slow connections. **Do not move on until every single person is set up** — this is the foundation for everything.
- [ ] **Everyone together — shared first win:** one small, guaranteed-to-work hands-on exercise so *everyone* gets an early "whoa, I did that." Confidence first.
- [ ] **The track split (after lunch / early afternoon):**
  - **Zero Experience track:** guided fundamentals — talking to AI well, the vibe-coding loop, building a first simple tool/workflow step by step. Heavy scaffolding, lots of helper support.
  - **I Have an Idea track:** less hand-holding, more "let's start shaping your actual prototype." Helpers help each person scope their idea down to something buildable in the time available.
- [ ] **End-of-Day-1 share:** quick go-around — one thing each person made or learned. Sets up Day 2 momentum. Tell them what's coming tomorrow (build time + showcase) so they leave excited.

### 7.3 — Day 2 — Build time + showcase

- [ ] **Quick recap + Day-2 goal:** "Today you build the thing you'll show at the end."
- [ ] **Deepen the toolkit (short):** agents, custom workflows — whatever each track needs to push their build further.
- [ ] **Long build block (the heart of Day 2):** sustained hands-on time. Both tracks build their real thing — a working tool/workflow (Zero Experience) or their prototype (I Have an Idea). Helpers in constant motion. This is where "something real" actually gets made — protect this time fiercely; resist over-teaching.
- [ ] **Build checkpoints:** mid-block, make sure everyone has *something* working, even if small. Help people scope down rather than abandon. Nobody should leave empty-handed.
- [ ] **Showcase (the payoff):** everyone demos what they built — 60–90 seconds each. This is the emotional peak and your **testimonial goldmine** (see Phase 5 — capture it live).
- [ ] **Close:** celebrate the room, point to the alumni community, tee up the testimonial ask and referral ask warmly.

### 7.4 — When someone falls behind

- [ ] Helper sits with them 1:1, gets them to a working state (even a simpler version), keeps them in the game.
- [ ] Never let the whole room wait on one person — that's exactly what helpers are for.
- [ ] If someone's clearly in the wrong track, quietly move them. No big deal made of it.
- [ ] Have a couple of **"if you finish early" stretch tasks** ready so fast finishers stay engaged instead of bored.

---

## 8. Phase 5 — After the conference

The room is hot with goodwill on Day 2. Don't waste it — this is where your *next* cohort, your testimonials, and your referrals come from.

### 8.1 — Collect testimonials (while it's warm)

- [ ] **Capture at the showcase, live:** with permission, **film 30–60 second clips** of people next to what they built — "what did you make / what surprised you?" These are your best marketing assets.
- [ ] **Day-2 feedback form** doubles as a written testimonial source (ask: "What would you tell a friend who's on the fence?" + permission to quote + name/title).
- [ ] **Within 2 days**, email a short thank-you with one specific ask: a sentence or two they'd be happy to have on the site, plus a star/LinkedIn rec if willing.
- [ ] Get **explicit permission** to use names, photos, quotes, and clips.

### 8.2 — Get referrals

- [ ] In the thank-you email and in person: "If you know one person who'd love this, an intro is the best gift you can give me." (Same muscle as the cold-outreach P.S.)
- [ ] Consider a simple **alumni referral perk** for the next cohort (e.g., a thank-you / small credit for an intro that converts).
- [ ] Ask happy attendees to **post their build on LinkedIn** and tag the Institute / Whistle Labs.

### 8.3 — Debrief & improve

- [ ] **Same-week team debrief** (you + helpers): what landed, what dragged, where people got stuck, what the WiFi/venue/food did. Write it down.
- [ ] Read **every feedback form.** Pull the top 3 things to change and the top 3 to keep.
- [ ] Update the prep sheet, the run-of-show, and the setup steps based on what actually happened. Your second cohort should be noticeably smoother.
- [ ] Note your real numbers: cost per attendee, time spent selling, conversion rate form→call→paid. This tells you whether/how to scale.

### 8.4 — Announce the next cohort

- [ ] Set the **next dates** (you'll have venue learnings + the alumni proof now).
- [ ] Update `lib/site.ts` (new cohort label/season/dates) and the site copy.
- [ ] Email the full pipeline (everyone who applied but didn't buy) with the new dates + fresh testimonials — many "not now" people are now "yes."
- [ ] Email **alumni** with the referral ask + the next dates.
- [ ] Post the testimonials/clips publicly. Social proof from cohort one is your strongest seller for cohort two.

### 8.5 — Nurture the alumni community

- [ ] Stand up the **alumni community** you promised in the price (e.g., a group chat, Slack/Discord, or a recurring meetup) — this is part of the $995 value, deliver it.
- [ ] Host a casual **alumni follow-up** (virtual office hours or a local meetup) a few weeks after — keeps builds alive, generates more testimonials and referrals, and makes the Institute feel like a community, not a one-off.
- [ ] Keep showing up locally (chambers, meetups) as "the Pasadena AI person." The flywheel is reputation + referrals.

---

## 9. Master pre-launch checklist

A single consolidated list. If everything here is checked, you're ready to sell *and* deliver.

### Go-live (tech)
- [ ] Domain purchased on GoDaddy (privacy on)
- [ ] DNS records added at GoDaddy, domain shows "Valid Configuration" in Vercel, HTTPS works
- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel + redeployed
- [ ] Stripe account created; tested with `sk_test_` + test card `4242…`
- [ ] Stripe business activated; `STRIPE_SECRET_KEY` switched to `sk_live_`; one real charge done + refunded
- [ ] Resend set up: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `RESEND_FROM_EMAIL`
- [ ] `hello@` contact email reaches your inbox (forwarding set up)
- [ ] End-to-end test passed: interest form → alert email; checkout → success page; mobile OK
- [ ] `lib/site.ts` reviewed (price, contact, cohort) and updated with real dates once venue booked

### Venue
- [ ] Categories called (hotels, coworking, business centers, convention center, libraries, universities)
- [ ] Comparison checklist filled for top 2–3
- [ ] WiFi proven for 30 laptops; power at every seat; projector confirmed; tables (not just chairs)
- [ ] Lunch/catering policy understood; parking sorted
- [ ] Visited in person; two consecutive dates locked; contract signed + deposit paid
- [ ] Dates updated on site

### Selling
- [ ] 30–50 warm contacts emailed personally (`01-cold-outreach.md`)
- [ ] Local orgs contacted (chamber, BNI, Rotary, associations)
- [ ] At least one free lunch-and-learn booked/run
- [ ] Interest-form → Zoom → payment loop tested with a real lead (`02` + `03` templates)
- [ ] Sales-call script ready/practiced
- [ ] Pipeline tracker live; current "paid of 24" count known
- [ ] **FIRST SEAT SOLD** ✅ (milestone 1)
- [ ] Go/no-go floor met (≥ minimum viable headcount)

### Deliver
- [ ] Setup sheet written; stack (Claude/ChatGPT/Cursor + agents) finalized; tested on fresh Mac + Windows
- [ ] Materials printed (handouts, cheat sheets, feedback form); name tags + signage made
- [ ] Lunch ordered both days; dietary needs collected; coffee/water/snacks; final headcount confirmed
- [ ] Helpers booked (~1 per 6–8 attendees)
- [ ] Prep email sent to attendees (~1 week out): dates, address, parking, laptop, accounts, track, dietary
- [ ] Day-before pre-flight done in the room: projector, WiFi stress test, power, USB fallback, box packed

### Run & after
- [ ] Run of show ready for both days (setup hour, shared first win, track split, build block, showcase)
- [ ] Testimonials/clips captured at the showcase (with permission)
- [ ] Thank-you + referral + feedback ask sent within 2 days
- [ ] Team debrief done; improvements written down
- [ ] Alumni community stood up; next cohort dates set + announced to pipeline and alumni
- [ ] **FIRST COHORT RUN** ✅ (milestone 2)

---

*Pasadena AI Institute, hosted by Whistle Labs · Go from zero to one with AI, in two days, in person, in Pasadena.*
