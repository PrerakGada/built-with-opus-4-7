"use client";

import { useEffect, useState } from "react";

export type TocItem = { id: string; label: string };

export function DetailsToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => !!n);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-[12px] space-y-1">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono mb-2">
        On this page
      </div>
      {items.map((i, idx) => {
        const isActive = i.id === active;
        return (
          <a
            key={i.id}
            href={`#${i.id}`}
            className={
              "block pl-3 border-l py-1 transition font-mono tabular-nums " +
              (isActive
                ? "border-accent text-foreground"
                : "border-border text-muted hover:text-foreground hover:border-border-hover")
            }
          >
            <span className="opacity-50 mr-1.5">{String(idx + 1).padStart(2, "0")}</span>
            {i.label}
          </a>
        );
      })}
    </nav>
  );
}
