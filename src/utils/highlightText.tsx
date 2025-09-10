// utils/highlightText.tsx
import React from "react";

const highlights: Record<string, string> = {
  "backend": "text-[var(--color-primary)] font-semibold",
  "NextJS": "text-[var(--color-primary)] font-semibold",
  "NestJS": "text-[var(--color-primary)] font-semibold",
  "Django": "text-[var(--color-primary)] font-semibold",
  "Flask": "text-[var(--color-primary)] font-semibold",
  "FastAPI": "text-[var(--color-primary)] font-semibold",
  "Spring Boot": "text-[var(--color-primary)] font-semibold",
  "ElectronJS": "text-[var(--color-primary)] font-semibold",
  "MERN": "text-[var(--color-primary)] font-semibold",
  "React": "text-[var(--color-primary)] font-semibold",
  "Node.js": "text-[var(--color-primary)] font-semibold",
  "Express": "text-[var(--color-primary)] font-semibold",
  "MongoDB": "text-[var(--color-primary)] font-semibold",
  "Golang": "text-[var(--color-primary)] font-semibold",
  "Go": "text-[var(--color-primary)] font-semibold",

  "IIT Bhilai": "text-[var(--color-secondary)] font-semibold",
  "IIT Bombay": "text-[var(--color-secondary)] font-semibold",
  "OpenLake": "text-[var(--color-secondary)] font-semibold",
  "MOSIP": "text-[var(--color-secondary)] font-semibold",
  "FOSSEE": "text-[var(--color-secondary)] font-semibold",
  "OSDAG": "text-[var(--color-secondary)] font-semibold",
  "C4GT": "text-[var(--color-secondary)] font-semibold",
  "Open Source": "text-[var(--color-secondary)] font-semibold",
  "IBITF": "text-[var(--color-secondary)] font-semibold",

  "Machine Learning": "text-[var(--color-purple)] font-semibold",
  "Deep Learning": "text-[var(--color-purple)] font-semibold",
  "ML": "text-[var(--color-purple)] font-semibold",
  "Meta Learning": "text-[var(--color-purple)] font-semibold",
  "AcadMap": "text-[var(--color-purple)] font-semibold",
  "Rate My Course": "text-[var(--color-purple)] font-semibold",
  "BitTorrent Client": "text-[var(--color-purple)] font-semibold",
  "BitTorrent": "text-[var(--color-purple)] font-semibold",
  "Spotify analysis": "text-[var(--color-purple)] font-semibold",
  "Reddit analysis": "text-[var(--color-purple)] font-semibold",
  "library automation": "text-[var(--color-purple)] font-semibold",
  "Learned Index": "text-[var(--color-purple)] font-semibold",
  "Adaptive Learned Index": "text-[var(--color-purple)] font-semibold",
  "MetaIndex": "text-[var(--color-purple)] font-semibold",

  "Operating Systems": "text-[var(--color-orange)] font-semibold",
  "DevOps": "text-[var(--color-orange)] font-semibold",
  "OSTEP": "text-[var(--color-orange)] font-semibold",
  "Docker": "text-[var(--color-orange)] font-semibold",
  "distributed systems": "text-[var(--color-orange)] font-semibold",
  "database": "text-[var(--color-orange)] font-semibold",
  "databases": "text-[var(--color-orange)] font-semibold",
  "low-level systems": "text-[var(--color-orange)] font-semibold",
  "C": "text-[var(--color-orange)] font-semibold",
  "Rust": "text-[var(--color-orange)] font-semibold",

  "low-level design": "text-[var(--color-accent)] font-semibold",
  "system design": "text-[var(--color-accent)] font-semibold",

  "Python": "text-[var(--color-primary)] font-semibold",
  "JavaScript": "text-[var(--color-primary)] font-semibold",
  "HTML": "text-[var(--color-primary)] font-semibold",
  "CSS": "text-[var(--color-primary)] font-semibold",
  "Flutter": "text-[var(--color-primary)] font-semibold",
  "Java": "text-[var(--color-primary)] font-semibold",

  "open-source": "text-[var(--color-purple)] font-semibold",
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
