import { ProjectsData } from "@/types/projects";

export const projectsData: ProjectsData = {
  projects: [
    {
      id: 1,
      name: "Meta-Learning Adaptive Indexes",
      description:
        "ML-based adaptive model selection for learned indexes to improve database query performance using meta-learning techniques.",
      longDescription:
        "Research project exploring how machine learning can optimize database index selection dynamically based on query patterns and data characteristics.",
      tags: ["Python", "Machine Learning", "Database Systems", "Research"],
      github: "https://github.com/amaydixit11/DSL501_ML_Project",
      demo: "https://github.com/amaydixit11/DSL501_ML_Project",
      status: "Course Work",
      type: "Research",
      startDate: "2024",
      category: "Web Applications",
    },
    {
      id: 2,
      name: "AcadMap",
      description:
        "Crowd-sourced course resource sharing platform for IIT Bhilai students.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      github: "https://github.com/amaydixit11/acadmap",
      demo: "https://github.com/amaydixit11/acadmap",
      status: "Live",
      type: "Community",
      category: "Web Applications",
    },
    {
      id: 3,
      name: "ChatViz",
      description:
        "Privacy-focused WhatsApp chat analyzer with visualization capabilities.",
      tags: ["Next.js", "FastAPI", "Firebase", "Python"],
      github: "https://github.com/amaydixit11/ChatViz",
      demo: "https://github.com/amaydixit11/ChatViz",
      status: "In Progress",
      type: "Analytics",
      category: "Web Applications",
    },
    {
      id: 4,
      name: "RateMyCourse",
      description:
        "Course review and rating platform for academic institutions.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      github: "https://github.com/amaydixit11/RateMyCourse",
      demo: "https://github.com/amaydixit11/RateMyCourse",
      status: "Complete",
      type: "Academic",
      category: "Web Applications",
    },
    {
      id: 5,
      name: "BitTorrent Client",
      description:
        "Custom BitTorrent client implementation for peer-to-peer file sharing.",
      tags: ["Go", "Networking", "P2P", "Protocols"],
      github: "https://github.com/amaydixit11/BitTorrentClient",
      demo: "https://github.com/amaydixit11/BitTorrentClient",
      status: "Complete",
      type: "Systems",
    },
    // {
    //   id: 6,
    //   name: "amdi FSV",
    //   description:
    //     "Disk space visualization tool built with Rust and Tauri for desktop.",
    //   tags: ["Rust", "Tauri", "Next.js", "Desktop"],
    //   github: "https://github.com/amaydixit11/amdiFSV",
    //   demo: "https://github.com/amaydixit11/amdiFSV",
    //   status: "Complete",
    //   type: "Desktop",
    // },
    {
      id: 8,
      name: "amdiGit",
      description:
        "Custom Git implementation from Scratch.",
      tags: ["Go", "Build-your-own", "Git"],
      github: "https://github.com/amaydixit11/amdiGit",
      demo: "https://github.com/amaydixit11/amdiGit",
      status: "In Development",
      type: "Tool",
    },
    {
      id: 9,
      name: "amdiDB",
      description:
        "Custom database system designed for lightweight, high-speed data storage and retrieval.",
      tags: ["Go", "Database", "Performance", "Backend"],
      github: "https://github.com/amaydixit11/amdidb",
      demo: "https://github.com/amaydixit11/amdidb",
      status: "In Development",
      type: "Database",
    },
    {
      id: 10,
      name: "Lifelog",
      description:
        "Personal journaling and activity tracking platform with insights and visualizations.",
      tags: ["Next.js", "React", "Analytics", "Visualization"],
      github: "https://github.com/amaydixit11/lifelog",
      demo: "https://github.com/amaydixit11/lifelog",
      status: "In Progress",
      type: "Personal",
    },
  ],
  stats: {
    totalProjects: 25,
    publicRepos: 20,
    contributions: 847,
    languages: 8,
  },
};
