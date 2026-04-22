"use client";

import { useState } from "react";
import type { Participant } from "@/lib/types";
import { initials } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const DIM: Record<Size, number> = { sm: 40, md: 56, lg: 96 };

export function Avatar({
  participant,
  size = "md",
  className = "",
}: {
  participant: Participant;
  size?: Size;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const d = DIM[size];
  const base =
    "rounded-2xl overflow-hidden bg-surface-2 ring-1 ring-border " +
    "flex items-center justify-center shrink-0 " +
    className;

  const src = !errored && participant.avatarUrl ? participant.avatarUrl : null;

  if (src) {
    return (
      <div className={base} style={{ width: d, height: d }}>
        {/* plain <img>: browser follows redirects (e.g. github.com/<user>.png → avatars CDN),
            no next/image remotePatterns gymnastics */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${participant.firstName} ${participant.lastName}`.trim() || participant.handle}
          width={d}
          height={d}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
          style={{ width: d, height: d, objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <div
      className={base + " font-mono tracking-wider text-muted select-none"}
      style={{ width: d, height: d, fontSize: d * 0.32 }}
    >
      {initials(participant)}
    </div>
  );
}
