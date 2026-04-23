"use client";

import { useMemo, useState } from "react";
import type { CohortStats, CountryCount, Participant } from "@/lib/types";
import { ByTheNumbers } from "./ByTheNumbers";
import { ParticipantCard } from "./ParticipantCard";
import { WorldMap } from "./WorldMap";

type Filter = "all" | "participants";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "participants", label: "Participants only" },
];

type SortKey = "score" | "stars" | "contribs" | "prs" | "followers" | "name";

const SORTS: { key: SortKey; label: string; cmp: (a: Participant, b: Participant) => number }[] = [
  // Score sort — hidden for now per community feedback (scores are still
  // computed in the data, just not surfaced in the UI).
  // { key: "score", label: "Score", cmp: (a, b) => b.score - a.score },
  {
    key: "contribs",
    label: "Contribs (1y)",
    cmp: (a, b) =>
      (b.github?.contributionsLastYear ?? 0) - (a.github?.contributionsLastYear ?? 0),
  },
  {
    key: "stars",
    label: "Stars",
    cmp: (a, b) => (b.github?.totalStars ?? 0) - (a.github?.totalStars ?? 0),
  },
  {
    key: "prs",
    label: "PRs (1y)",
    cmp: (a, b) => (b.github?.totalPRs ?? 0) - (a.github?.totalPRs ?? 0),
  },
  {
    key: "followers",
    label: "Followers",
    cmp: (a, b) => (b.github?.followers ?? 0) - (a.github?.followers ?? 0),
  },
  {
    key: "name",
    label: "Name (A→Z)",
    cmp: (a, b) =>
      (a.firstName || a.handle).localeCompare(b.firstName || b.handle, undefined, {
        sensitivity: "base",
      }),
  },
];

export function Directory({
  participants,
  countries,
  stats,
}: {
  participants: Participant[];
  countries: CountryCount[];
  stats: CohortStats;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [country, setCountry] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("contribs");

  const roleGroups = useMemo(() => {
    const judges = participants.filter((p) => p.role === "judge");
    const mentors = participants.filter((p) => p.role === "mentor");
    const people = participants.filter((p) => p.role === "participant");
    return { judges, mentors, people };
  }, [participants]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cmp = SORTS.find((s) => s.key === sort)?.cmp ?? SORTS[0].cmp;

    // "All": mentors (pinned top) + participants in the same grid.
    // "Participants only": just the 497 builders.
    const base =
      filter === "all"
        ? [...roleGroups.mentors, ...roleGroups.people]
        : roleGroups.people;

    const out = base.filter((p) => {
      if (country && p.country !== country) return false;
      if (!q) return true;
      const hay = [
        p.firstName,
        p.lastName,
        p.handle,
        p.description,
        p.location,
        p.country,
        p.city,
        p.socials.github,
        p.socials.linkedin,
        p.socials.x,
        p.github?.bio,
        p.github?.company,
        p.github?.location,
      ]
        .filter(Boolean)
        .join(" \n ")
        .toLowerCase();
      return q.split(/\s+/).every((token) => hay.includes(token));
    });
    // Keep mentors pinned to the top even when sorting changes (unless user is searching).
    return [...out].sort((a, b) => {
      if (!q) {
        if (a.role === "mentor" && b.role !== "mentor") return -1;
        if (b.role === "mentor" && a.role !== "mentor") return 1;
      }
      return cmp(a, b);
    });
  }, [roleGroups.people, roleGroups.mentors, query, filter, country, sort]);

  const topCountries = countries.slice(0, 14);

  return (
    <div className="relative z-10">
      {/* Compact hero — 2-col on lg, world map on right */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1480px] px-6 py-8 sm:py-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8 lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Apr 21 – 27, 2026 · Remote · Cerebral Valley × Anthropic
            </div>

            <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.05] tracking-tight">
              <span className="font-serif-hero italic">Built with</span>{" "}
              <span className="font-serif-hero text-accent">Opus 4.7</span>
            </h1>
            <p className="mt-3 text-[15px] text-text-soft leading-relaxed max-w-xl">
              Unofficial directory of {roleGroups.people.length} builders across
              {" "}{countries.length}{" "}countries — sort, filter, search,
              reach out. Judges &amp; community mentors are listed at the top.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[12px] font-mono text-muted tabular-nums">
              <span>
                <span className="text-foreground">{roleGroups.people.length}</span> builders
              </span>
              <span className="text-border">·</span>
              <span>
                <span className="text-foreground">{stats.withGithub}</span> github
              </span>
              <span className="text-border">·</span>
              <span>
                <span className="text-foreground">{countries.length}</span> countries
              </span>
              {(roleGroups.mentors.length > 0 || roleGroups.judges.length > 0) && (
                <>
                  <span className="text-border">·</span>
                  <span>
                    <span className="text-foreground">
                      {roleGroups.mentors.length + roleGroups.judges.length}
                    </span>{" "}
                    mentors &amp; judges
                  </span>
                </>
              )}
            </div>

            {/* "how the score works" formula panel — hidden for now per community feedback.
            <details className="mt-4 text-[11px] font-mono text-muted group max-w-md">
              <summary className="cursor-pointer hover:text-foreground select-none list-none flex items-center gap-1">
                <span className="transition group-open:rotate-90 inline-block">›</span>
                <span>how the score works</span>
              </summary>
              <pre className="mt-2 text-[10.5px] leading-5 text-foreground whitespace-pre-wrap bg-surface ring-1 ring-border rounded-lg p-3">
{`raw = 18·log₁₀(1+followers)
    + 22·log₁₀(1+total_stars_top10)
    + 12·log₁₀(1+public_repos)
    + 18·log₁₀(1+contribs_last_year)
    + 10·log₁₀(1+prs_last_year)
    +  5·log₁₀(1+reviews_last_year)
    + 10·min(years_on_github, 10)/10
score = min(100, 100 × raw / p99(raw))`}
              </pre>
            </details>
            */}
          </div>

          <WorldMap countries={countries} />
        </div>
      </section>

      <ByTheNumbers stats={stats} />

      {/* Sticky controls (sits under the nav) */}
      <div className="sticky top-14 z-20 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
        <div className="mx-auto max-w-[1480px] px-6 py-3 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 items-stretch">
            {/* Filter pills — left of search */}
            <div className="inline-flex shrink-0 rounded-xl bg-surface ring-1 ring-border p-0.5 text-[12px]">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={
                    "px-3 py-1.5 rounded-lg transition whitespace-nowrap " +
                    (filter === f.key
                      ? "bg-accent-soft text-foreground ring-1 ring-accent/40"
                      : "text-muted hover:text-foreground")
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 relative min-w-0">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${roleGroups.people.length} builders by name, bio, company, handle, location…`}
                className="w-full rounded-xl bg-surface ring-1 ring-border focus:ring-accent/60
                           focus:bg-surface-hover transition outline-none px-4 py-2.5 text-[14px]
                           placeholder:text-muted"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground text-xs px-2 py-1"
                  aria-label="Clear"
                >
                  clear
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="shrink-0 rounded-xl bg-surface ring-1 ring-border hover:ring-border-hover
                         text-[13px] px-3 py-2.5 outline-none focus:ring-accent/60 cursor-pointer"
              aria-label="Sort by"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  Sort · {s.label}
                </option>
              ))}
            </select>
          </div>

          <div className="no-scrollbar flex gap-1 overflow-x-auto -mx-6 px-6 py-1">
            <button
              onClick={() => setCountry(null)}
              className={
                "whitespace-nowrap text-[11px] font-mono px-2.5 py-1 rounded-md ring-1 transition " +
                (country === null
                  ? "bg-accent-soft text-foreground ring-accent/40"
                  : "bg-surface text-muted hover:text-foreground ring-border hover:ring-border-hover")
              }
            >
              🌍 everywhere
            </button>
            {topCountries.map((c) => (
              <button
                key={c.name}
                onClick={() => setCountry(c.name)}
                className={
                  "whitespace-nowrap text-[11px] font-mono px-2.5 py-1 rounded-md ring-1 transition " +
                  (country === c.name
                    ? "bg-accent-soft text-foreground ring-accent/40"
                    : "bg-surface text-muted hover:text-foreground ring-border hover:ring-border-hover")
                }
              >
                {c.name} <span className="opacity-60">{c.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Judges — separate section (gold) */}
      {roleGroups.judges.length > 0 && (
        <section className="mx-auto max-w-[1480px] px-6 pt-8">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#f59e0b]" />
              Judges
            </h2>
            <span className="text-[11px] font-mono text-muted">
              {roleGroups.judges.length} {roleGroups.judges.length === 1 ? "person" : "people"}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {roleGroups.judges.map((p) => (
              <ParticipantCard key={p.userId} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* Grid — mentors are pinned to the top of this grid when filter = "all" */}
      <section className="mx-auto max-w-[1480px] px-6 py-8">
        <div className="flex items-center justify-between mb-4 text-[12px] font-mono text-muted">
          <span>
            {filtered.length} match{filtered.length !== 1 && "es"}
            {query && <> for &ldquo;{query}&rdquo;</>}
            {country && <> · in {country}</>}
            <> · sorted by {SORTS.find((s) => s.key === sort)?.label}</>
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <p className="text-lg">No one matches that.</p>
            <button
              onClick={() => {
                setQuery("");
                setFilter("all");
                setCountry(null);
              }}
              className="mt-3 text-accent hover:underline"
            >
              reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
            {filtered.map((p) => (
              <ParticipantCard key={p.userId} p={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
