import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Avatar } from "@/components/Avatar";
import { Socials } from "@/components/Socials";
import { findByHandle, participants } from "@/lib/data";
import type { Repo, ScoreComponents } from "@/lib/types";
import { bestLocation, fullName } from "@/lib/types";

export function generateStaticParams() {
  return participants.map((p) => ({ handle: p.handle }));
}

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { handle } = await props.params;
  const p = findByHandle(handle);
  if (!p) return { title: "Not found" };
  const name = fullName(p);
  const desc = p.description || `Participant in Built with Opus 4.7`;
  return {
    title: `${name} · Built with Opus 4.7`,
    description: desc.slice(0, 180),
  };
}

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return String(n);
}

function RepoCard({ r }: { r: Repo }) {
  if (!r.name) return null;
  return (
    <a
      href={r.url ?? "#"}
      target="_blank"
      rel="noreferrer noopener"
      className="block rounded-xl bg-surface ring-1 ring-border hover:ring-border-hover
                 hover:bg-surface-hover transition p-3.5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-mono text-[13px] truncate">{r.name}</div>
        <div className="flex items-center gap-2 text-[11px] text-muted shrink-0 tabular-nums">
          {r.language && <span>{r.language}</span>}
          <span>★ {fmt(r.stars)}</span>
        </div>
      </div>
      {r.description && (
        <p className="mt-1.5 text-[12px] text-text-soft line-clamp-2 leading-relaxed">
          {r.description}
        </p>
      )}
    </a>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted font-mono">
        {label}
      </div>
      <div className="mt-0.5 text-[18px] font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function ScoreBreakdown({ c, score }: { c: ScoreComponents; score: number }) {
  const rows: { label: string; value: number; note: string }[] = [
    { label: "Followers", value: c.followers, note: "18·log₁₀(1+followers)" },
    { label: "Stars (top 10 repos)", value: c.stars, note: "22·log₁₀(1+stars)" },
    { label: "Public repos", value: c.repos, note: "12·log₁₀(1+repos)" },
    { label: "Contributions (1y)", value: c.contribs, note: "18·log₁₀(1+contribs)" },
    { label: "PRs (1y)", value: c.prs, note: "10·log₁₀(1+prs)" },
    { label: "Reviews (1y)", value: c.reviews, note: "5·log₁₀(1+reviews)" },
    { label: "Tenure", value: c.tenure, note: "10·min(years,10)/10" },
  ];
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="rounded-2xl bg-surface ring-1 ring-border p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
          Score breakdown
        </h3>
        <div className="font-mono tabular-nums text-[22px] font-semibold text-accent">
          {score}
          <span className="text-[13px] text-muted">/100</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div>
              <div className="flex items-center justify-between text-[12px]">
                <span>{r.label}</span>
                <span className="font-mono tabular-nums text-muted">+{r.value.toFixed(1)}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-accent/70 rounded-full"
                  style={{ width: `${(r.value / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] font-mono text-muted leading-relaxed">
        raw = {c.raw.toFixed(1)} · normalised to 100 using the 99th-percentile raw across the cohort.
      </p>
    </div>
  );
}

export default async function Page(props: Props) {
  const { handle } = await props.params;
  const p = findByHandle(handle);
  if (!p) notFound();

  const loc = bestLocation(p);
  const gh = p.github;
  const repos = (gh?.pinnedRepos?.length ? gh.pinnedRepos : gh?.topRepos) ?? [];

  return (
    <main className="flex-1 relative z-10">
      <div className="mx-auto max-w-4xl px-6 pt-5 text-[12px] font-mono">
        <Link href="/" className="text-muted hover:text-foreground">
          ← directory
        </Link>
      </div>

      <article className="mx-auto max-w-4xl px-6 py-8">
        <header className="flex flex-col sm:flex-row sm:items-start gap-5">
          <Avatar participant={p} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif-hero text-4xl sm:text-5xl leading-tight">
                {fullName(p)}
              </h1>
              {p.isOrganization && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent ring-1 ring-accent/30 rounded px-1.5 py-0.5">
                  Organization
                </span>
              )}
              {p.role === "mentor" && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#ff3b61] ring-1 ring-[#ff3b61]/40 rounded px-1.5 py-0.5">
                  Mentor
                </span>
              )}
              {p.role === "judge" && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#c2720a] ring-1 ring-[#f59e0b]/50 rounded px-1.5 py-0.5">
                  Judge
                </span>
              )}
            </div>
            <div className="mt-1 text-[13px] font-mono text-muted">
              @{p.handle}
              {loc && <> · {loc}</>}
              {gh?.company && <> · {gh.company}</>}
            </div>
            {p.description && (
              <p className="mt-4 text-[15px] leading-relaxed text-text-soft max-w-2xl">
                {p.description}
              </p>
            )}
            <div className="mt-5">
              <Socials s={p.socials} />
            </div>
          </div>
        </header>

        {gh && (
          <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
                  GitHub · @{p.socials.github}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 rounded-2xl bg-surface ring-1 ring-border p-5">
                <Stat label="Followers" value={fmt(gh.followers)} />
                <Stat label="Total stars" value={fmt(gh.totalStars)} />
                <Stat label="Contribs (1y)" value={fmt(gh.contributionsLastYear)} />
                <Stat label="PRs (1y)" value={fmt(gh.totalPRs)} />
              </div>

              {repos.length > 0 && (
                <>
                  <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono mb-3">
                    {gh.pinnedRepos?.length ? "Pinned" : "Top repos"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {repos.map((r, i) => (
                      <RepoCard key={(r.name || "") + i} r={r} />
                    ))}
                  </div>
                </>
              )}

              {gh.createdAt && (
                <div className="mt-6 text-[11px] font-mono text-muted">
                  Joined GitHub · {new Date(gh.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                  {gh.hireable && <> · open to work</>}
                </div>
              )}
            </div>

            {p.scoreComponents && p.role === "participant" && (
              <aside className="lg:w-[320px] lg:sticky lg:top-20">
                <ScoreBreakdown c={p.scoreComponents} score={p.score} />
              </aside>
            )}
          </section>
        )}

        {!gh && (
          <p className="mt-10 text-[14px] text-muted">
            No GitHub data — this builder didn&rsquo;t list a handle (or the handle couldn&rsquo;t be resolved).
          </p>
        )}
      </article>
    </main>
  );
}
