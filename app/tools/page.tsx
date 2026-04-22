import type { Metadata } from "next";
import { BrainstormApp } from "@/components/BrainstormApp";

export const metadata: Metadata = {
  title: "Tools · Built with Opus 4.7",
  description:
    "Browser-only Claude brainstorm app for picking a hackathon project. Paste your own API key — nothing is stored on the server.",
};

export default function ToolsPage() {
  return (
    <main className="flex-1 relative z-10">
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted font-mono">
            <span className="size-1.5 rounded-full bg-accent" />
            tiny client-only apps
          </div>
          <h1 className="mt-3 text-4xl sm:text-5xl leading-[1.05] tracking-tight font-serif-hero italic">
            <span className="text-accent not-italic">Tools</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-text-soft leading-relaxed">
            Small utilities that run entirely in your browser. First up: a
            brainstorm buddy for picking what to build. Paste your own Anthropic
            API key, chat with Claude about project ideas, get three concrete
            pitches back.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-8">
        <BrainstormApp />
      </section>
    </main>
  );
}
