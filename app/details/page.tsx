import type { Metadata } from "next";
import Link from "next/link";
import { DetailsToc } from "@/components/DetailsToc";

export const metadata: Metadata = {
  title: "Details · Built with Opus 4.7",
  description:
    "Full schedule, rules, judging criteria, submission instructions, and prizes for the Built with Opus 4.7 Claude Code hackathon.",
};

const TOC = [
  { id: "discord", label: "Discord server" },
  { id: "schedule", label: "Schedule" },
  { id: "rules", label: "Rules" },
  { id: "problems", label: "Problem statements" },
  { id: "judging", label: "Judging" },
  { id: "submission", label: "Submission" },
  { id: "prizes", label: "Prizes" },
  { id: "questions", label: "Questions" },
];

type ScheduleItem = {
  t: string;
  label: string;
  pin?: boolean;
  link?: string;
  linkLabel?: string;
};
type ScheduleDay = { day: string; highlight?: string; items: ScheduleItem[] };

const SCHEDULE: ScheduleDay[] = [
  {
    day: "Tue · Apr 21",
    highlight: "Kickoff",
    items: [
      { t: "12:00 PM EST", label: "Virtual Kickoff — rules, prizes, judging, technical talks", pin: true },
      { t: "12:30 PM EST", label: "Hacking officially begins · team formation on Discord", pin: true },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
    ],
  },
  {
    day: "Wed · Apr 22",
    items: [
      {
        t: "12:00–1:00 PM EST",
        label: "Live Session 1 — AMA with Thariq Shihipar, MTS at Anthropic (Claude Code)",
        link: "https://x.com/trq212",
        linkLabel: "@trq212",
      },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
    ],
  },
  {
    day: "Thu · Apr 23",
    items: [
      { t: "All day", label: "Hacking continues" },
      {
        t: "11:00 AM–12:00 PM EST",
        label: "Live Session 2 — Claude Managed Agents with Michael Cohen, MTS at Claude Labs",
        link: "https://www.linkedin.com/in/michael-cohen1995/",
        linkLabel: "LinkedIn",
      },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
    ],
  },
  {
    day: "Fri · Apr 24",
    items: [
      {
        t: "12:00–1:00 PM EST",
        label:
          "Live Session 3 — Mike Brown, 1st-place winner of Built with Opus 4.6: insights, learnings, where is he now?",
      },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
    ],
  },
  {
    day: "Sat · Apr 25",
    items: [
      { t: "All day", label: "Hacking continues" },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
    ],
  },
  {
    day: "Sun · Apr 26",
    highlight: "Submissions due",
    items: [
      {
        t: "12:00–1:00 PM EST",
        label: "Live Session 4 — Michal Nedoszytko, 3rd-place winner of Built with Opus 4.6",
      },
      { t: "5:00–6:00 PM EST", label: "Anthropic office hours (#office-hours)" },
      { t: "8:00 PM EST", label: "Submissions due via the CV platform", pin: true },
    ],
  },
  {
    day: "Mon · Apr 27",
    items: [{ t: "All day", label: "First-round judging (asynchronous)" }],
  },
  {
    day: "Tue · Apr 28",
    highlight: "Winners",
    items: [
      { t: "12:00 PM EST", label: "Top 6 teams announced (#announcements) · Final-round judging", pin: true },
      { t: "12:45 PM EST", label: "Closing ceremony — Top 3 revealed", pin: true },
    ],
  },
];

const RULES = [
  {
    title: "Open source",
    body:
      "Everything shown in the demo must be fully open source: backend, frontend, models, and any other part, published under an approved OSS license.",
  },
  {
    title: "New work only",
    body: "Projects must be started from scratch during the hackathon. No previous work.",
  },
  {
    title: "Team size",
    body: "Up to 2 members per team.",
  },
  {
    title: "Banned projects",
    body:
      "Projects that violate legal, ethical, or platform policies — or use code, data, or assets you don't have rights to — are disqualified.",
  },
];

const JUDGING_CRITERIA = [
  {
    label: "Impact",
    pct: 30,
    body:
      "What's the real-world potential? Who benefits, and by how much? Could this actually become something people use?",
  },
  {
    label: "Demo",
    pct: 25,
    body: "Is it a working, impressive demo? Does it hold up live? Is it genuinely cool to watch?",
  },
  {
    label: "Opus 4.7 Use",
    pct: 25,
    body: "How creatively did this team use Opus 4.7? Did they go beyond a basic integration and surface capabilities that surprised even the judges?",
  },
  {
    label: "Depth & Execution",
    pct: 20,
    body:
      "Did the team push past their first idea? Is the engineering sound and thoughtfully refined? Does this feel like real craft, not a quick hack?",
  },
];

const PRIZES_MAIN = [
  { place: "1st", amount: "$50,000" },
  { place: "2nd", amount: "$30,000" },
  { place: "3rd", amount: "$10,000" },
];

const PRIZES_EXTRA = [
  {
    title: "Most Creative Opus 4.7 Exploration",
    amount: "$5,000",
    body:
      "For the project that treated Opus 4.7 as a creative medium, not just a tool — something with a voice, a point of view. Something expressive, playful, strange, or alive. The one that made us feel something.",
  },
  {
    title: "The “Keep Thinking” Prize",
    amount: "$5,000",
    body:
      "For the project that didn't stop at the first idea and landed somewhere nobody saw coming. A real-world problem nobody thought to point Claude at — one that changes how we think about where this technology belongs.",
  },
  {
    title: "Best use of Claude Managed Agents",
    amount: "$5,000",
    body:
      "For the team that leveraged the Claude platform best. The project that uses Managed Agents to hand off meaningful, long-running tasks — not just a demo, but something you'd actually ship.",
  },
];

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20">
      <div className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
        {eyebrow}
      </div>
      <h2 className="mt-1 text-3xl sm:text-4xl font-serif-hero italic">{title}</h2>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <main className="flex-1 relative z-10">
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="size-1.5 rounded-full bg-accent" />
            event details
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.05] tracking-tight">
            <span className="font-serif-hero italic">Built with Opus 4.7 ·</span>{" "}
            <span className="font-serif-hero text-accent">the full brief</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-text-soft leading-relaxed">
            Everything the organizers sent participants: schedule, rules,
            problem statements, judging criteria, submission instructions, and
            prizes — in one scrollable page. Sourced from the official
            &ldquo;Participant Resources&rdquo; doc in the Cerebral Valley event
            hub.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-[13px] font-mono">
            <a
              href="https://anthropic.com/discord"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent text-background
                         hover:opacity-90 transition px-4 py-2 font-semibold"
            >
              Join the Discord →
            </a>
            <a
              href="https://cerebralvalley.ai/built-with-4-7-hackathon-submissions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-surface ring-1 ring-border
                         hover:ring-border-hover hover:bg-surface-hover transition px-4 py-2 text-foreground"
            >
              Submit project ↗
            </a>
            <a
              href="https://cerebralvalley.ai/e/built-with-4-7-hackathon"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-surface ring-1 ring-border
                         hover:ring-border-hover hover:bg-surface-hover transition px-4 py-2 text-muted hover:text-foreground"
            >
              CV event page ↗
            </a>
          </div>

          {/* Key dates strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { t: "Kickoff", v: "Tue Apr 21 · 12 PM EST" },
              { t: "Submission deadline", v: "Sun Apr 26 · 8 PM EST" },
              { t: "Final judging", v: "Tue Apr 28 · 12 PM EST" },
              { t: "Closing ceremony", v: "Tue Apr 28 · 12:45 PM EST" },
            ].map((k) => (
              <div
                key={k.t}
                className="rounded-xl bg-surface ring-1 ring-border p-3"
              >
                <div className="text-[10px] uppercase tracking-wider text-muted font-mono">
                  {k.t}
                </div>
                <div className="mt-1 text-[13px] font-semibold tabular-nums">{k.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content + TOC */}
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
        <article className="space-y-14 min-w-0">
          {/* Discord */}
          <section className="space-y-4">
            <SectionHeading id="discord" eyebrow="01" title="Discord server" />
            <p className="text-[15px] text-text-soft leading-relaxed">
              Primary communication channel for the hackathon. A custom role
              gets assigned to your Discord handle so you can see the hackathon
              channels.
            </p>
            <div className="rounded-xl ring-1 ring-border bg-surface p-4 font-mono text-[13px]">
              <a href="https://anthropic.com/discord" target="_blank" rel="noreferrer" className="text-accent hover:underline">
                anthropic.com/discord →
              </a>
            </div>
          </section>

          {/* Schedule */}
          <section className="space-y-5">
            <SectionHeading id="schedule" eyebrow="02" title="Schedule" />
            <p className="text-[13px] font-mono text-muted">
              All times America/New_York (EST).
            </p>
            <ol className="relative border-l border-border ml-2 space-y-6">
              {SCHEDULE.map((d) => (
                <li key={d.day} className="pl-6 relative">
                  <span className="absolute -left-[7px] top-1 size-3 rounded-full bg-surface ring-2 ring-accent/60" />
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif-hero text-xl">{d.day}</h3>
                    {d.highlight && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent ring-1 ring-accent/30 rounded px-1.5 py-0.5">
                        {d.highlight}
                      </span>
                    )}
                  </div>
                  <ul className="mt-2 space-y-2">
                    {d.items.map((it, idx) => (
                      <li
                        key={idx}
                        className={
                          "rounded-lg ring-1 p-3 " +
                          (it.pin
                            ? "ring-accent/30 bg-accent-soft"
                            : "ring-border bg-surface")
                        }
                      >
                        <div className="text-[11px] font-mono text-muted">{it.t}</div>
                        <div className="mt-0.5 text-[14px] text-foreground leading-relaxed">
                          {it.label}
                          {it.link && (
                            <>
                              {" · "}
                              <a
                                href={it.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-accent hover:underline font-mono"
                              >
                                {it.linkLabel ?? "link"} ↗
                              </a>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          {/* Rules */}
          <section className="space-y-5">
            <SectionHeading id="rules" eyebrow="03" title="Rules" />
            <p className="text-[15px] text-text-soft leading-relaxed">
              Four rules. Break any and the team is out.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RULES.map((r) => (
                <div
                  key={r.title}
                  className="rounded-xl bg-surface ring-1 ring-border p-4"
                >
                  <h3 className="font-semibold text-[14px]">{r.title}</h3>
                  <p className="mt-1 text-[13px] text-text-soft leading-relaxed">
                    {r.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Problem Statements */}
          <section className="space-y-5">
            <SectionHeading id="problems" eyebrow="04" title="Problem statements" />
            <p className="text-[15px] text-text-soft leading-relaxed">
              Two framings the organizers suggested. Neither is required — just
              starting points if you&rsquo;re stuck.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface ring-1 ring-border p-5">
                <div className="text-[11px] uppercase tracking-[0.15em] text-accent font-mono">
                  01
                </div>
                <h3 className="mt-1 font-serif-hero text-2xl italic">Build from what you know</h3>
                <p className="mt-3 text-[13.5px] text-text-soft leading-relaxed">
                  Start from a real problem in a real place: your work, your
                  community, a field you&rsquo;re close to. The process that
                  takes weeks and should take hours. The thing someone you know
                  still does by hand. Domain expertise beats credentials — show
                  us the thing only you&rsquo;d know to build.
                </p>
                <p className="mt-3 text-[12px] font-mono text-muted leading-relaxed">
                  <em className="not-italic text-accent">Looks like:</em> the
                  process that takes weeks and should take hours. The decision
                  made on gut because the data&rsquo;s too scattered to use.
                </p>
              </div>
              <div className="rounded-2xl bg-surface ring-1 ring-border p-5">
                <div className="text-[11px] uppercase tracking-[0.15em] text-accent font-mono">
                  02
                </div>
                <h3 className="mt-1 font-serif-hero text-2xl italic">Build for what&rsquo;s next</h3>
                <p className="mt-3 text-[13.5px] text-text-soft leading-relaxed">
                  Start from something that doesn&rsquo;t exist yet: a new way
                  to work, learn, or make that only makes sense now that the
                  tools have changed. An interface without a name. A workflow
                  from a few years out. The best projects here are easier to
                  demo than explain.
                </p>
                <p className="mt-3 text-[12px] font-mono text-muted leading-relaxed">
                  <em className="not-italic text-accent">Looks like:</em> an
                  interface that doesn&rsquo;t have a name yet. A first draft
                  of how this will work in a few years when Claude is even
                  more capable.
                </p>
              </div>
            </div>
          </section>

          {/* Judging */}
          <section className="space-y-5">
            <SectionHeading id="judging" eyebrow="05" title="Judging" />
            <p className="text-[15px] text-text-soft leading-relaxed">
              Two stages. Async scoring first, then a live final round.
            </p>

            <div className="rounded-2xl bg-surface ring-1 ring-border p-5 space-y-4">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="font-serif-hero text-2xl italic">
                  Stage 1 · Asynchronous
                </h3>
                <span className="text-[12px] font-mono text-muted">Apr 26 – 27</span>
              </div>
              <p className="text-[13.5px] text-text-soft leading-relaxed">
                Judges independently review submitted projects via the judging
                platform. Each team uploads three things: a short demo video
                (3-min max), the open-source repo, and a 100–200-word written
                summary. Scores aggregate to pick the top six for live judging.
              </p>

              <div className="mt-2">
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono mb-3">
                  Criteria
                </div>
                <div className="space-y-3">
                  {JUDGING_CRITERIA.map((c) => (
                    <div key={c.label}>
                      <div className="flex items-baseline justify-between text-[13.5px]">
                        <span className="font-semibold">{c.label}</span>
                        <span className="font-mono tabular-nums text-accent">{c.pct}%</span>
                      </div>
                      <div className="mt-1.5 h-2 rounded-full bg-surface-2 overflow-hidden">
                        <div
                          className="h-full bg-accent/80 rounded-full"
                          style={{ width: `${c.pct}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-[12.5px] text-text-soft leading-relaxed">
                        {c.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-surface ring-1 ring-border p-5 space-y-3">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h3 className="font-serif-hero text-2xl italic">
                  Stage 2 · Final round live
                </h3>
                <span className="text-[12px] font-mono text-muted">Apr 28 · 12 PM EST</span>
              </div>
              <ul className="space-y-1.5 text-[13.5px] text-text-soft leading-relaxed list-disc pl-5">
                <li>
                  <strong>Pre-recorded demos</strong> play live (3 min per team).
                </li>
                <li>
                  Judges deliberate after all demos to pick 1st, 2nd, and 3rd
                  plus the extra prizes.
                </li>
                <li>
                  Winners announced at the <strong>closing ceremony at 12:45 PM EST</strong>.
                </li>
              </ul>
            </div>
          </section>

          {/* Submission */}
          <section className="space-y-5">
            <SectionHeading id="submission" eyebrow="06" title="Submission" />
            <div className="rounded-2xl ring-1 ring-accent/30 bg-accent-soft p-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-accent font-mono">
                Deadline
              </div>
              <div className="mt-1 font-serif-hero text-3xl italic">
                Apr 26 · 8 PM EST
              </div>
            </div>
            <div className="rounded-2xl bg-surface ring-1 ring-border p-5 space-y-4">
              <p className="text-[13.5px] text-text-soft leading-relaxed">
                Submit via the CV platform. Required:
              </p>
              <ul className="space-y-1.5 text-[13.5px] text-foreground leading-relaxed list-disc pl-5">
                <li>
                  <strong>3-minute demo video</strong> — YouTube, Loom, or
                  similar.
                </li>
                <li>
                  <strong>GitHub repository</strong> — or code link, fully OSS.
                </li>
                <li>
                  <strong>Written description / summary</strong>.
                </li>
              </ul>
              <p className="text-[12.5px] font-mono text-muted">
                Project must be built entirely during the hackathon. No
                pre-existing work.
              </p>
              <a
                href="https://cerebralvalley.ai/built-with-4-7-hackathon-submissions"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent text-background
                           hover:opacity-90 transition px-4 py-2 text-[13px] font-semibold"
              >
                Open submission page ↗
              </a>
            </div>
          </section>

          {/* Prizes */}
          <section className="space-y-5">
            <SectionHeading id="prizes" eyebrow="07" title="Prizes" />
            <p className="text-[15px] text-text-soft leading-relaxed">
              All paid out in Claude API credits.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {PRIZES_MAIN.map((p, i) => (
                <div
                  key={p.place}
                  className={
                    "rounded-2xl p-5 text-center " +
                    (i === 0
                      ? "bg-accent text-background ring-1 ring-accent"
                      : "bg-surface ring-1 ring-border")
                  }
                >
                  <div className={"text-[11px] uppercase tracking-wider font-mono " + (i === 0 ? "opacity-80" : "text-muted")}>
                    {p.place}
                  </div>
                  <div className="mt-2 font-serif-hero text-2xl sm:text-3xl">
                    {p.amount}
                  </div>
                  <div className={"mt-1 text-[11px] font-mono " + (i === 0 ? "opacity-80" : "text-muted")}>
                    API credits
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
                Special prizes · $5,000 each
              </div>
              {PRIZES_EXTRA.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl bg-surface ring-1 ring-border p-5"
                >
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-semibold text-[14.5px]">{p.title}</h3>
                    <span className="font-mono tabular-nums text-accent text-[13px]">{p.amount}</span>
                  </div>
                  <p className="mt-2 text-[13px] text-text-soft leading-relaxed">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Questions */}
          <section className="space-y-4">
            <SectionHeading id="questions" eyebrow="08" title="Questions" />
            <div className="rounded-2xl ring-1 ring-border bg-surface-2 p-5 text-[14px] text-text-soft leading-relaxed">
              Ping <code className="font-mono text-foreground">#questions</code> on Discord or reach out to moderators there. For build references — docs, courses, cookbooks —{" "}
              <Link href="/resources" className="text-accent hover:underline">
                head to Resources
              </Link>
              . To find collaborators, check the{" "}
              <Link href="/" className="text-accent hover:underline">
                participant directory
              </Link>
              .
            </div>
          </section>
        </article>

        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <DetailsToc items={TOC} />
          </div>
        </aside>
      </div>
    </main>
  );
}
