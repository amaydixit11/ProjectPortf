// data/aboutData.ts
import { CurrentActivity, Track } from "../types/about";

export const personalInfo = {
  location: "Bhilai, India",
  description:
    "Building backend systems, distributed databases, and AI-powered tools. Pre-final year DSAI at IIT Bhilai with 9.08 CGPA. Led OpenLake (open-source society at IIT Bhilai) as Coordinator. Two competitive internship selections: MOSIP (digital identity) and FOSSEE/IIT Bombay.",
};

export const bioData = {
  paragraphs: [
    "I'm a pre-final year student in Data Science and AI at IIT Bhilai with a CGPA of 9.08. I focus on backend systems, distributed systems, and building tools that solve real problems. My work spans from implementing network protocols from scratch to building microservices platforms and LLM-powered analysis tools.",
    "As Coordinator of OpenLake — the open-source society at IIT Bhilai — I led the organization for a year, setting technical roadmaps for active projects, organizing workshops and hackathons, and mentoring juniors into productive contributors.",
    "I've completed two competitive internship selections: a double selection at MOSIP through C4GT (Sprint and DMP cohorts) where I worked on digital identity infrastructure implementing ISO/IEC 18013-5 mDoc format and W3C Verifiable Credentials, and a FOSSEE Summer Fellowship at IIT Bombay working on OSDAG.",
    "My current work includes Kudos (a token-economy social platform), ACORDE (a CRDT-based distributed data sync engine with libp2p), a from-scratch BitTorrent client in Go, and various AI/ML projects including GitIntel and RAGfolio.",
    "When I'm not coding, I'm probably analyzing data, gaming (Minecraft, Pokemon), or organizing my knowledge in Obsidian.",
  ],
};

export const journeyData = {
  paragraphs: [
    "I got into programming during 11th and 12th grade with Python, and the logical problem-solving clicked immediately. By the time I entered IIT Bhilai in 2023, I was hooked on competitive programming — grinding C/C++ on Codeforces.",
    "Second semester, I discovered web development and went from console applications to full-stack apps. The summer after first year covered a library automation internship at IBITF, exploring ElectronJS, picking up Flutter, and reading through OSTEP.",
    "Third semester, I learned Go and built AcadMap for our campus. Joining OpenLake opened my eyes to open-source culture. I studied Deep Learning, learned Docker, and started thinking about systems at scale.",
    "Fourth semester brought my first MOSIP selection through C4GT — enterprise development, Spring Boot, and production-grade systems. I was also named Coordinator of OpenLake and started building my BitTorrent client from scratch.",
    "Summer after second year, I interned at FOSSEE (IIT Bombay) while doing my second MOSIP selection. Built the BitTorrent client to completion, started reading about distributed systems, and wrote CI/CD templates for the organization.",
    "Now in my pre-final year at 9.08 CGPA, I'm focused on distributed systems and database internals. Kudos, ACORDE, GitIntel, B+ Tree, and RAG systems represent where I'm pushing myself, along with preparing for industry roles.",
  ],
};

export const skillsData = [
  {
    title: "Systems Programming",
    description:
      "Go, Rust, C/C++ — building protocols (BitTorrent), distributed systems (ACORDE with libp2p/CRDTs), and data structures (B+ Trees) from scratch.",
  },
  {
    title: "Backend Development",
    description:
      "Next.js, FastAPI, Node.js, NestJS — microservices with gRPC, REST APIs, PostgreSQL, and Supabase.",
  },
  {
    title: "Database Systems",
    description:
      "PostgreSQL, MongoDB, SQLite, Neo4j — schema design through building indexes and query optimizers from scratch.",
  },
  {
    title: "AI & Machine Learning",
    description:
      "LLMs, RAG pipelines, meta-learning, semantic search — practical ML with vector databases and knowledge graphs.",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "Docker, CI/CD pipelines, GitHub Actions — standardized templates across organization repositories.",
  },
  {
    title: "Open Source",
    description:
      "Led OpenLake (IIT Bhilai) as Coordinator. Technical roadmaps, workshops, mentoring, org-wide automation.",
  },
];

export const beyondCodeData = {
  content:
    "A data geek who can't resist analyzing patterns — whether it's personal activity tracking or game performance metrics. I organize everything in Obsidian with custom workflows. Outside of screens: Minecraft, Pokemon, coffee.",
};

export const getMockCurrentActivity = (): CurrentActivity => ({
  status: "building",
  project: "Kudos",
  link: "https://github.com/amaydixit11/Kudos",
  language: "Go + Next.js",
});

export const getMockCurrentTrack = (): Track => ({
  name: "Weightless",
  artist: "Marconi Union",
  album: "Ambient Soundscapes",
  isPlaying: true,
});

export const achievementsData = [
  "CGPA 9.08 @ IIT Bhilai (Data Science & AI)",
  "Coordinator @ OpenLake (1 year)",
  "Double Selection: MOSIP C4GT (Sprint + DMP)",
  "FOSSEE Summer Fellow @ IIT Bombay",
  "BitTorrent Client from scratch in Go",
  "ISO/IEC 18013-5 mDoc implementation at MOSIP",
];

export const learningData = [
  "Distributed Consensus",
  "Database Internals",
  "Rust Systems Programming",
  "Advanced RAG Systems",
];

export const quickLinksData = [
  {
    href: "https://github.com/amaydixit11",
    label: "GitHub Profile",
    icon: "github" as const,
    external: true,
  },
  {
    href: "https://codeforces.com/profile/amaydixit11",
    label: "Codeforces",
    icon: "code" as const,
    external: true,
  },
  {
    label: "Always up for coffee \u2615",
    icon: "coffee" as const,
  },
];
