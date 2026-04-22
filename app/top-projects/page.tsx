import Link from "next/link";
import type { Metadata } from "next";
import { topProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Top Projects · Built with Opus 4.7",
  description:
    "The most-starred public repos actually owned by participants of the Built with Opus 4.7 hackathon.",
};

function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return String(n);
}

export default function TopProjectsPage() {
  return (
    <main className="flex-1 relative z-10">
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="size-1.5 rounded-full bg-accent" />
            cross-participant leaderboard
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl leading-[1.05] tracking-tight font-serif-hero italic">
            Top <span className="text-accent">projects</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-text-soft leading-relaxed">
            The {topProjects.length} most-starred public repos actually owned by
            someone in this hackathon&rsquo;s participant list. External repos
            a participant contributed to (but doesn&rsquo;t own) are excluded —
            they&rsquo;d otherwise inflate the board with upstream star counts.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        <ol className="space-y-2">
          {topProjects.map((r, i) => (
            <li key={r.url ?? i}>
              <a
                href={r.url ?? "#"}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-start gap-4 rounded-xl bg-surface ring-1 ring-border
                           hover:ring-border-hover hover:bg-surface-hover transition px-4 py-3.5"
              >
                <div className="font-mono tabular-nums text-muted text-[13px] w-8 text-right pt-0.5 shrink-0">
                  {i + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-[14px] font-semibold truncate">
                      {r.name}
                    </span>
                    <Link
                      href={`/p/${encodeURIComponent(r.ownerHandle)}`}
                      className="text-[12px] text-muted hover:text-accent font-mono"
                    >
                      by {r.ownerName}
                    </Link>
                  </div>
                  {r.description && (
                    <p className="mt-1 text-[13px] text-text-soft line-clamp-2 leading-relaxed">
                      {r.description}
                    </p>
                  )}
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] font-mono text-muted">
                    {r.language && <span>{r.language}</span>}
                    {r.country && <span>{r.country}</span>}
                    <span>{fmt(r.forks)} forks</span>
                  </div>
                </div>

                <div className="text-right shrink-0 tabular-nums font-mono">
                  <div className="text-[18px] font-semibold text-accent">
                    ★ {fmt(r.stars)}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-border mt-8">
        <div className="mx-auto max-w-5xl px-6 py-6 text-[12px] text-muted font-mono">
          <Link href="/" className="hover:text-accent">← back to directory</Link>
        </div>
      </footer>
    </main>
  );
}
