// data/aboutData.ts
import { CurrentActivity, Track } from '../types/about';

export const personalInfo = {
  location: "Durg, India",
  description: "Backend engineer, system designer, and open-source enthusiast building scalable solutions."
};

export const bioData = {
  paragraphs: [
    "I'm a B.Tech student at IIT Bhilai passionate about backend systems and infrastructure. I love building tools that solve real problems - from API gateways and service meshes to community platforms for my university.",
    "As Coordinator of OpenLake (our open-source club), I help fellow students contribute to meaningful projects. I've also worked with organizations like MOSIP and IIT Bombay, developing systems for digital identity and computational tools.",
    "When I'm not coding, you'll find me exploring new technologies, solving competitive programming problems, or thinking about how to make complex systems more elegant and efficient."
  ]
};

export const journeyData = {
  paragraphs: [
    "My journey began in 2023 with the start of my B.Tech at IIT Bhilai, where I explored programming and systems in depth.",
    "I went from experimenting with small utilities to building larger projects like AcadMap, Bhilaipedia, and Hermes, while also creating tools like a BitTorrent client and disk space visualizer.",
    "Along the way, I contributed to open-source at scale through MOSIP, worked with IIT Bombay, and took on the role of leading OpenLake to grow a culture of open-source on campus."
  ],
};



export const skillsData = [
  {
    title: "Backend Development",
    description: "Building scalable APIs, microservices, and distributed systems with modern tech stacks."
  },
  {
    title: "System Design",
    description: "Architecting robust systems with service meshes, API gateways, and monitoring solutions."
  },
  {
    title: "Open Source",
    description: "Contributing to community projects and leading open-source initiatives at university."
  },
  {
    title: "Research",
    description: "Working on ML-based database optimization and adaptive model selection for learned indexes."
  }
];

export const beyondCodeData = {
  content: "I believe great engineers are also great learners and community builders. I organize knowledge using Zettelkasten methods, compete in programming contests, and always look for opportunities to help fellow developers grow. I'm particularly interested in the intersection of systems engineering and machine learning."
};

export const getMockCurrentActivity = (): CurrentActivity => ({
  status: "researching",
  project: "MetaIndex",
  link: "https://github.com/amaydixit11/DSL501_ML_Project",
  language: "Python"
});

export const getMockCurrentTrack = (): Track => ({
  name: "Weightless",
  artist: "Marconi Union",
  album: "Ambient Soundscapes",
  isPlaying: true
});

export const achievementsData = [
  "Selected for MOSIP Internship",
  "Coordinator @ OpenLake",
  "Codeforces Rating: 1320"
];

export const learningData = ["Meta Learning", "Databases", "Rust", "Distributed Systems"];

export const quickLinksData = [
  {
    href: "https://github.com/amaydixit11",
    label: "GitHub Profile",
    icon: "github" as const,
    external: true
  },
  {
    href: "https://codeforces.com/profile/amaydixit11",
    label: "Codeforces",
    icon: "code" as const,
    external: true
  },
  {
    label: "Always up for coffee ☕",
    icon: "coffee" as const
  }
];