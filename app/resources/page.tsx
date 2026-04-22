import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources · Built with Opus 4.7",
  description:
    "Kickoff recording plus the official Anthropic-provided Quickstarts, docs, blogs, and courses for the Built with Opus 4.7 hackathon.",
};

type LinkItem = { href: string; title: string; note?: string };

const QUICKSTARTS: LinkItem[] = [
  { href: "https://code.claude.com/docs/en/quickstart", title: "Claude Code Quickstart" },
  { href: "https://platform.claude.com/docs/en/get-started", title: "Claude API Quickstart" },
  { href: "https://platform.claude.com/docs/en/about-claude/models/overview", title: "Claude Models Overview" },
];

const DOCS: LinkItem[] = [
  { href: "https://code.claude.com/docs", title: "Claude Code Docs" },
  { href: "https://platform.claude.com/docs/en/home", title: "Claude API Docs" },
  { href: "https://modelcontextprotocol.io/docs/getting-started/intro", title: "MCP Docs" },
  { href: "https://agentskills.io/home", title: "Agent Skills Docs" },
];

const MANAGED_AGENTS: LinkItem[] = [
  { href: "https://platform.claude.com/docs/en/managed-agents/overview", title: "Managed Agents — Docs" },
  { href: "https://www.youtube.com/watch?v=NLWiIj47IdI", title: "Overview video" },
  {
    href: "https://claude.com/blog/claude-managed-agents",
    title: "Get to production 10× faster",
    note: "blog",
  },
  {
    href: "https://www.anthropic.com/engineering/managed-agents",
    title: "Scaling Managed Agents: decoupling the brain from the hands",
    note: "blog",
  },
];

const BLOGS: LinkItem[] = [
  { href: "https://code.claude.com/docs/en/best-practices", title: "Claude Code Best Practices" },
  { href: "https://www.anthropic.com/engineering/building-effective-agents", title: "Building Effective Agents" },
  { href: "https://claude.com/blog/building-agents-with-the-claude-agent-sdk", title: "Building Agents with the Claude Agent SDK" },
  { href: "https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them", title: "Building multi-agent systems: when and how to use them" },
  { href: "https://claude.com/blog/best-practices-for-prompt-engineering", title: "Best practices for prompt engineering" },
  { href: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents", title: "Effective Context Engineering for AI Agents" },
  { href: "https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers", title: "Extending Claude's capabilities with skills and MCP servers" },
  { href: "https://claude.com/blog/skills-explained", title: "Skills explained: Skills vs prompts, Projects, MCP, subagents" },
  { href: "https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work", title: "Building agents with Skills: equipping agents for specialized work" },
  { href: "https://claude.com/blog/how-to-configure-hooks", title: "Claude Code power-user customization: how to configure hooks" },
];

const COURSES: LinkItem[] = [
  { href: "https://anthropic.skilljar.com/claude-code-in-action", title: "Claude Code in Action" },
  { href: "https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/", title: "Agent Skills with Anthropic (DeepLearning.AI)" },
  { href: "https://github.com/anthropics/courses", title: "Claude Code Courses — GitHub" },
];

const OTHER: LinkItem[] = [
  { href: "https://github.com/anthropics/claude-quickstarts", title: "Claude Quickstarts", note: "deployable starter apps using the Claude API" },
  { href: "https://claude.com/blog/complete-guide-to-building-skills-for-claude", title: "A Complete Guide to Building Skills for Claude", note: "eBook" },
  { href: "https://platform.claude.com/cookbook/", title: "Claude Cookbooks" },
  { href: "https://github.com/anthropics/claude-cookbooks", title: "Cookbooks — GitHub" },
  { href: "https://github.com/anthropics/skills", title: "Agent Skills — GitHub" },
];

const MENTOR_NOTES: LinkItem[] = [
  {
    href: "https://tolaniomitokun.github.io/opus47-mentor-guide/",
    title: "Stuck? Here's what I'd tell you if we hopped on a call.",
    note: "Tolani",
  },
];

function Card({ item }: { item: LinkItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl bg-surface ring-1 ring-border hover:ring-border-hover
                 hover:bg-surface-hover transition p-3.5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="font-medium text-[13.5px]">{item.title}</div>
        {item.note && (
          <span className="text-[10px] uppercase tracking-wider text-muted font-mono shrink-0">
            {item.note}
          </span>
        )}
      </div>
      <div className="mt-1 text-[11px] font-mono text-muted truncate">
        {new URL(item.href).host}
      </div>
    </a>
  );
}

function Group({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <section>
      <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono mb-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((i) => (
          <Card key={i.href} item={i} />
        ))}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <main className="flex-1 relative z-10">
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="size-1.5 rounded-full bg-accent" />
            kickoff · docs · references
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.05] tracking-tight font-serif-hero italic">
            <span className="text-accent not-italic">Resources</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-text-soft leading-relaxed">
            The kickoff recording and every official reference the organizers
            shared in the Participant Resources doc — quickstarts, docs, blog
            posts, courses, and deeper reading.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 space-y-12">
        {/* Kickoff */}
        <div>
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono mb-3">
            Kickoff recording
          </h2>
          <div className="rounded-2xl ring-1 ring-border overflow-hidden bg-surface-2">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://player.vimeo.com/video/1185231842?h=&title=0&byline=0&portrait=0"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Built with Opus 4.7 — Kickoff"
              />
            </div>
          </div>
          <div className="mt-3 rounded-xl ring-1 ring-border bg-surface p-4">
            <div className="text-[13px] text-text-soft leading-relaxed">
              Jason Bigman (Head of Community, Anthropic) · Boris Cherny (Head
              of Claude Code) · Ivan Porollo (Founder, Cerebral Valley). Covers
              rules, judging, and what to expect.
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[12px] font-mono">
              <span className="text-muted">password</span>
              <code className="rounded bg-surface-2 ring-1 ring-border px-2 py-0.5 text-foreground select-all">
                builtwithopus4.7
              </code>
              <a
                href="https://vimeo.com/1185231842?share=copy&fl=sv&fe=ci"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline ml-auto"
              >
                open on vimeo ↗
              </a>
            </div>
          </div>
        </div>

        <Group title="Quickstarts" items={QUICKSTARTS} />
        <Group title="Docs" items={DOCS} />
        <Group title="Claude Managed Agents" items={MANAGED_AGENTS} />
        <Group title="Blogs" items={BLOGS} />
        <Group title="Courses" items={COURSES} />
        <Group title="Other" items={OTHER} />
        <Group title="From the mentors" items={MENTOR_NOTES} />

        <div className="rounded-2xl ring-1 ring-border bg-surface-2 p-5 text-[13px] text-text-soft leading-relaxed">
          These are the resources the organizers explicitly listed in the
          Participant Resources doc. For rules, schedule, prizes, and judging,
          head to{" "}
          <a href="/details" className="text-accent hover:underline">
            Details
          </a>
          .
        </div>
      </section>
    </main>
  );
}
