// utils/highlightText.tsx
import React from "react";

const highlights: Record<string, string> = {
  backend: "text-[var(--color-primary)] font-semibold",
  infrastructure: "text-[var(--color-secondary)] font-semibold",
  "open-source": "text-[var(--color-purple)] font-semibold",
  API: "text-[var(--color-orange)] font-semibold",
  "service mesh": "text-[var(--color-accent)] font-semibold",
  "IIT Bhilai": "text-[var(--color-primary)] font-semibold",
  MOSIP: "text-[var(--color-secondary)] font-semibold",
  "IIT Bombay": "text-[var(--color-purple)] font-semibold",
};

export function highlightText(text: string) {
  const regex = new RegExp(
    `\\b(${Object.keys(highlights).join("|")})\\b`,
    "gi"
  );

  const parts = text.split(regex);

  return parts.map((part, i) => {
    const key = Object.keys(highlights).find(
      (k) => k.toLowerCase() === part.toLowerCase()
    );
    return key ? (
      <span key={i} className={highlights[key]}>
        {part}
      </span>
    ) : (
      part
    );
  });
}
