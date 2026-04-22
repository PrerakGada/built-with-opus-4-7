import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center relative z-10">
      <div className="text-center px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted font-mono">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">No one here.</h1>
        <p className="mt-3 text-muted">That handle isn&rsquo;t in the directory.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-surface ring-1 ring-border hover:ring-[#39393f] px-4 py-2 text-[13px]"
        >
          ← directory
        </Link>
      </div>
    </main>
  );
}
