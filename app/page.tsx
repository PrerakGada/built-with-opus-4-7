import { Directory } from "@/components/Directory";
import { countries, participants, stats } from "@/lib/data";

export default function Home() {
  return (
    <main className="flex-1">
      <Directory participants={participants} countries={countries} stats={stats} />
      <footer className="border-t border-border mt-10">
        <div className="mx-auto max-w-[1480px] px-6 py-8 text-[12px] text-muted font-mono flex flex-wrap gap-x-6 gap-y-2 justify-between">
          <span>
            Unofficial · {stats.builders} builders · data as of Apr 22, 2026
          </span>
          <span>
            Built with{" "}
            <a
              href="https://www.anthropic.com/claude"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              Claude Opus 4.7
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}
