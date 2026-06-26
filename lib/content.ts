/**
 * Shared content data: the two tracks, the agenda, outcomes, the
 * toolkit, and FAQs. Centralized so pages, infographics captions, and
 * marketing stay in sync.
 */

export type Track = {
  id: "zero" | "build";
  eyebrow: string;
  title: string;
  blurb: string;
  forYou: string[];
  outcomes: string[];
};

export const tracks: Track[] = [
  {
    id: "zero",
    eyebrow: "Track 1 · Start from scratch",
    title: "Zero Experience",
    blurb:
      "You've never really used AI, or you've poked at ChatGPT and want to actually get it. One day from \"what is this?\" to confident, daily AI user.",
    forYou: [
      "You've never used AI tools in your work (or barely have)",
      "You keep hearing \"AI\" everywhere and don't want to be left behind",
      "You're a professional, owner, or executive aged 35 to 60 who wants a clear, jargon-free on-ramp",
      "You learn best hands-on, in a room, with someone who'll answer your questions",
    ],
    outcomes: [
      "Set up and confidently use modern AI assistants (Claude, ChatGPT)",
      "Write prompts that get real, usable results, not generic fluff",
      "Understand AI agents, what they do, and where they help your work",
      "Build at least one practical AI workflow you'll use the next Monday",
      "Know exactly what's hype and what's genuinely useful for you",
    ],
  },
  {
    id: "build",
    eyebrow: "Track 2 · Zero to one",
    title: "I Have an Idea",
    blurb:
      "You have a company, product, or workflow you want to build. Tell us the idea, and we set up your tools and get you from zero to one, building for real.",
    forYou: [
      "You have an idea for an app, product, internal tool, or automation",
      "You want to stop waiting on a developer and start building it yourself",
      "You're curious about \"vibe coding\" and want a guided, hands-on start",
      "You want a working starting point and the skills to keep going",
    ],
    outcomes: [
      "Cursor + Claude installed and configured on your own machine",
      "Learn vibe coding: building software by describing what you want",
      "Go from idea to working prototype in a single day",
      "Set up custom AI workflows and agents tailored to your idea",
      "Leave with a project you can keep building and a path forward",
    ],
  },
];

export type AgendaItem = { time: string; title: string; detail: string };
export type AgendaDay = { day: string; theme: string; items: AgendaItem[] };

export const agenda: AgendaDay[] = [
  {
    day: "The Day",
    theme: "Impress before we teach. Build before you leave.",
    items: [
      {
        time: "9:00",
        title: "What AI can actually do: live demos",
        detail:
          "We start by showing you, not telling you. A few live demos of AI doing things that'll change how you think about your work and business.",
      },
      {
        time: "9:30",
        title: "The real state of AI",
        detail:
          "The grounded version: a clear, hype-free picture of what AI can and can't do today, and what it actually means for you.",
      },
      {
        time: "10:00",
        title: "Get set up",
        detail:
          "Everyone leaves the morning with the right accounts and tools installed and working: Claude, ChatGPT, and more.",
      },
      {
        time: "10:45",
        title: "Break",
        detail: "",
      },
      {
        time: "11:00",
        title: "Prompting that actually works",
        detail:
          "Hands-on practice. Learn to get useful, reliable results for real tasks from your own work.",
      },
      {
        time: "12:15",
        title: "Working lunch (included)",
        detail: "Networking with fellow Pasadena & LA professionals.",
      },
      {
        time: "1:15",
        title: "AI agents & automation",
        detail:
          "What agents are, how they go beyond chat, and how to automate the repetitive parts of your work or product.",
      },
      {
        time: "2:15",
        title: "Track split: choose your path",
        detail:
          "Track 1 goes deep on AI for your daily work. Track 2 scopes your idea and sets up Cursor + Claude to start building.",
      },
      {
        time: "2:30",
        title: "Build time with experts on call",
        detail:
          "Dedicated hands-on time. Our team works the room so you're never stuck.",
      },
      {
        time: "4:15",
        title: "Showcase & your path forward",
        detail:
          "Share what you built, get a personalized next-steps plan, and join the alumni community.",
      },
    ],
  },
];

export type Outcome = { title: string; detail: string };

export const outcomes: Outcome[] = [
  {
    title: "Confidently use AI every day",
    detail:
      "No more guessing. You'll have the tools set up and the skills to get real value daily.",
  },
  {
    title: "A workflow (or prototype) you built",
    detail:
      "You leave with something real: an AI workflow for your work, or a working prototype of your idea.",
  },
  {
    title: "Clarity on what matters",
    detail:
      "Cut through the noise. Know what's genuinely useful for you and what's just hype.",
  },
  {
    title: "A local community",
    detail:
      "Join a Pasadena-rooted network of professionals learning and building with AI, and keep the momentum going.",
  },
];

export const toolkit = [
  { name: "Claude", note: "Your AI thinking & building partner" },
  { name: "ChatGPT", note: "Everyday AI assistant" },
  { name: "Cursor", note: "AI-native code editor for builders" },
  { name: "AI Agents", note: "AI that does work, not just chats" },
  { name: "Vibe coding", note: "Build software by describing it" },
  { name: "Custom workflows", note: "Automate your real, repetitive tasks" },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do I need any experience with AI or coding?",
    a: "None at all. The whole point is to take you from zero to one. If you've never touched AI, you're exactly who this is for. If you already have an idea you want to build, we'll meet you there too.",
  },
  {
    q: "Who is this really for?",
    a: "Professionals, business owners, and executives, especially folks aged roughly 35 to 60, across Pasadena, Greater LA, and Southern California who want a clear, hands-on, in-person way to actually get AI. Whether you want to learn, or you have an idea to build, you'll fit right in.",
  },
  {
    q: "What will I actually walk away with?",
    a: "Real, working results. Either a set of AI tools and workflows installed and ready for your daily work, or a working prototype of your idea, plus the skills and a personalized plan to keep going.",
  },
  {
    q: "What's the difference between the two tracks?",
    a: "Track 1 (Zero Experience) is for getting confident and fluent with AI from scratch. Track 2 (I Have an Idea) is for people who want to build something: we set up Cursor and Claude and get you from idea to working prototype. You choose after lunch, and you can lean either way.",
  },
  {
    q: "When and where is it?",
    a: "The founding cohort runs July 11, 2026, in person in Pasadena, California. Applications are reviewed on a rolling basis; you'll hear from us in July. The workshop is in Pasadena, and we send the exact venue to applicants once they're accepted.",
  },
  {
    q: "How does the application work?",
    a: "Short and human, not a gauntlet. You share a link to your resume or LinkedIn and answer a couple of quick questions about what you want to build or learn. We read every application as it comes in and get back to you in July. If it's not this time, you can apply for the next cohort.",
  },
  {
    q: "How does a seat work?",
    a: "Applying costs nothing. We read every application, and if it's a fit, you reserve your seat to lock it in. A seat covers everything: one full day of hands-on instruction, all materials, working lunch included, the full software setup on your own machine, and the founding alumni community.",
  },
  {
    q: "Why only ten seats?",
    a: "It's the first time we're running this, and we want it to be exceptional. Ten people means our team can sit with each of you until it clicks, and the room stays full of people genuinely ready to build.",
  },
  {
    q: "Do I need to bring anything?",
    a: "Just your laptop and your curiosity. If you're on Track 2, bring your idea, even a rough one. We handle the rest, including getting all the software installed and configured for you.",
  },
  {
    q: "How big is the cohort?",
    a: "Ten people. Intentionally tiny so everyone gets real attention and our team can work the room throughout, so you're never stuck.",
  },
  {
    q: "What if I want to send my team?",
    a: "Great idea. We can tailor a private cohort to your team's goals down the line. Mention your team and what you're after in your application and we'll be in touch.",
  },
  {
    q: "Who's behind this?",
    a: "The Pasadena AI Workshop is hosted by Whistle Labs, a company that builds AI software and products. We do this work every day, and now we're teaching it, in person, in our own backyard.",
  },
];
