import type { Socials as S } from "@/lib/types";

const GITHUB = "https://github.com/";
const LINKEDIN = "https://www.linkedin.com/in/";
const X = "https://x.com/";
const CV = "https://cerebralvalley.ai/";

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.1c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.49 5.93.43.37.82 1.1.82 2.22v3.3c0 .32.22.69.83.57A12 12 0 0 0 12 0Z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.04c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77A1.74 1.74 0 0 0 0 1.72v20.56C0 23.24.8 24 1.77 24h20.45A1.75 1.75 0 0 0 24 22.28V1.72A1.75 1.75 0 0 0 22.22 0Z" />
    </svg>
  );
}

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2H21.5l-7.4 8.46L22.5 22h-6.88l-5.38-6.62L4.1 22H.84l7.92-9.04L.5 2h7.06l4.86 6.03L18.24 2Zm-1.2 18h1.82L7.04 4H5.1l11.94 16Z" />
    </svg>
  );
}

function IconCV(props: React.SVGProps<SVGSVGElement>) {
  // Stylized heart-mark (matches Cerebral Valley's little "AI" heart)
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 21s-7.5-4.6-9.6-9.1C.9 8.6 2.7 5 6.1 5c2 0 3.3 1 4 2.4h.1C10.9 6 12.2 5 14.2 5c3.4 0 5.2 3.6 3.6 6.9C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

function IconGlobe(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

function Pill({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 hover:bg-surface-hover
                 ring-1 ring-border hover:ring-border-hover transition
                 px-2.5 py-1 text-[11px] leading-none text-muted hover:text-foreground"
    >
      {children}
    </a>
  );
}

export function Socials({ s, compact = false }: { s: S; compact?: boolean }) {
  const items: { href: string; label: string; node: React.ReactNode }[] = [];

  if (s.github) {
    items.push({
      href: GITHUB + s.github,
      label: "GitHub",
      node: (
        <>
          <IconGithub className="h-3.5 w-3.5" />
          {!compact && <span className="font-mono">{s.github}</span>}
        </>
      ),
    });
  }
  if (s.linkedin) {
    items.push({
      href: LINKEDIN + s.linkedin,
      label: "LinkedIn",
      node: (
        <>
          <IconLinkedIn className="h-3.5 w-3.5" />
          {!compact && <span>LinkedIn</span>}
        </>
      ),
    });
  }
  if (s.x) {
    items.push({
      href: X + s.x,
      label: "X",
      node: (
        <>
          <IconX className="h-3.5 w-3.5" />
          {!compact && <span className="font-mono">@{s.x}</span>}
        </>
      ),
    });
  }
  if (s.site) {
    items.push({
      href: s.site,
      label: "Website",
      node: (
        <>
          <IconGlobe className="h-3.5 w-3.5" />
          {!compact && <span>Website</span>}
        </>
      ),
    });
  }
  if (s.cv) {
    items.push({
      href: CV + s.cv,
      label: "Cerebral Valley profile",
      node: (
        <>
          <IconCV className="h-3.5 w-3.5 text-[#e1597c]" />
          {!compact && <span>CV Profile</span>}
        </>
      ),
    });
  }

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <Pill key={it.href} href={it.href} label={it.label}>
          {it.node}
        </Pill>
      ))}
    </div>
  );
}
