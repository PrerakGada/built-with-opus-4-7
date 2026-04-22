import type { CohortStats } from "@/lib/types";

function fmtCompact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(/\.0$/, "") + "k";
  return String(n);
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-surface ring-1 ring-border p-4">
      <div className="font-serif-hero text-accent text-3xl sm:text-4xl leading-none tabular-nums">
        {value}
      </div>
      <div className="mt-2 text-[11px] text-muted leading-snug">{label}</div>
    </div>
  );
}

export function ByTheNumbers({ stats }: { stats: CohortStats }) {
  return (
    <section className="mx-auto max-w-[1480px] px-6 pb-6">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono mb-3">
        <span className="size-1.5 rounded-full bg-accent" />
        by the numbers
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <Stat value={String(stats.builders)} label="Builders approved" />
        <Stat value={String(stats.countries)} label="Countries represented" />
        <Stat value={String(stats.withGithub)} label="Have a GitHub handle" />
        <Stat value={fmtCompact(stats.totalContribsLastYear)} label="GitHub contributions, last year" />
        <Stat value={fmtCompact(stats.totalStarsShipped)} label="Stars across top-10 repos" />
        <Stat value={fmtCompact(stats.totalPublicRepos)} label="Public repos (all-time)" />
        <Stat value={fmtCompact(stats.totalPRsLastYear)} label="Pull requests, last year" />
      </div>
    </section>
  );
}
