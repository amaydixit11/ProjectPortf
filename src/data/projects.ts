import { ProjectsData } from "@/types/projects";

export const projectsData: ProjectsData = {
  projects: [
    {
      id: 1,
      name: "Kudos",
      description:
        "Token-based social platform replacing likes with a scarce token economy to incentivize quality content.",
      longDescription:
        "A microservices-based social platform that replaces traditional engagement metrics with a limited, transferable token supply. Features an MLFQ scheduling-inspired feed algorithm, progressive taxation on token accumulation, and economic incentives for genuine content curation. Built with Next.js frontend, Go/Node.js microservices, PostgreSQL, and gRPC inter-service communication.",
      tags: ["Next.js", "Go", "Node.js", "PostgreSQL", "gRPC", "Microservices", "Tailwind CSS"],
      github: "https://github.com/amaydixit11/Kudos",
      demo: "https://github.com/amaydixit11/Kudos",
      status: "In Development",
      type: "Full Stack",
      startDate: "2025",
      category: "Social Media",
      highlights: [
        "Token economy with progressive taxation",
        "MLFQ-inspired feed ranking algorithm",
        "Microservices architecture with gRPC",
        "Scarce-signal engagement model",
      ],
    },
    {
      id: 2,
      name: "ACORDE",
      description:
        "Local-first peer-to-peer data sync engine with CRDTs and end-to-end encryption.",
      longDescription:
        "Always-Available Conflict-free Offline-first Replicated Distributed Data Synchronization Engine. Built with Go and libp2p, uses CRDTs for automatic conflict resolution in distributed environments. Features XChaCha20-Poly1305 content encryption, SQLite for local persistence, and robust peer discovery. Designed for offline-first apps needing reliable sync without centralized coordination.",
      tags: ["Go", "SQLite", "libp2p", "CRDT", "Cryptography", "Distributed Systems"],
      github: "https://github.com/amaydixit11/acorde",
      demo: "https://github.com/amaydixit11/acorde",
      status: "Beta",
      type: "Systems",
      startDate: "2025",
      category: "Distributed Systems",
      highlights: [
        "CRDT-based conflict resolution",
        "XChaCha20-Poly1305 encryption",
        "libp2p peer-to-peer networking",
        "Offline-first architecture",
      ],
    },
    {
      id: 3,
      name: "BitTorrent Client",
      description:
        "Custom BitTorrent protocol client built from scratch in Go with P2P file sharing.",
      longDescription:
        "From-scratch implementation of the BitTorrent protocol in Go, handling metadata exchange, peer handshaking, piece selection, choking/unchoking strategies, and tracker communication. Implements BitTorrent Enhancement Proposals (BEPs), DHT for decentralized peer discovery, and selective piece downloading for optimal throughput.",
      tags: ["Go", "Networking", "P2P", "BEP", "DHT", "Protocols"],
      github: "https://github.com/amaydixit11/BitTorrentClient",
      demo: "https://github.com/amaydixit11/BitTorrentClient",
      status: "Complete",
      type: "Systems",
      startDate: "2025",
      category: "Distributed Systems",
      highlights: [
        "Full BEP protocol implementation",
        "Custom choking/unchoking algorithms",
        "DHT-based decentralized peer discovery",
        "Concurrent piece downloading",
      ],
    },
    {
      id: 4,
      name: "GitIntel",
      description:
        "Context-aware GitHub intelligence engine that extracts hidden decisions from issues and PRs using LLMs.",
      longDescription:
        "Transforms messy GitHub discussion threads into structured, developer-ready digests. Uses GraphQL to extract issues, PRs, and reviews across a repository, then applies LLM analysis to identify key architectural decisions, rejected alternatives, and constraints buried in comment threads. Features D3.js visualizations for dependency graphs and decision timelines.",
      tags: ["FastAPI", "Python", "GraphQL", "OpenAI", "D3.js", "LLM"],
      github: "https://github.com/amaydixit11/GitIntel",
      demo: "https://gitintel.vercel.app",
      status: "Beta",
      type: "DevTools",
      startDate: "2025",
      category: "AI & ML",
      highlights: [
        "LLM-powered GitHub thread analysis",
        "GraphQL-based repository introspection",
        "D3.js decision dependency graphs",
        "Structured digest generation",
      ],
    },
    {
      id: 5,
      name: "AcadMap",
      description:
        "Crowd-sourced course resource platform for IIT Bhilai students with Next.js and Supabase.",
      longDescription:
        "Community platform where IIT Bhilai students share course materials, past papers, lab notes, and study resources. Features course-based organization, upvote/downvote quality ranking, and role-based access control. Built with Next.js 15 App Router, TypeScript, Supabase backend, and Tailwind CSS with shadcn/ui components.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui"],
      github: "https://github.com/amaydixit11/acadmap",
      demo: "https://acadmap.vercel.app",
      status: "Live",
      type: "Full Stack",
      startDate: "2024",
      category: "Web Applications",
      highlights: [
        "Used by IIT Bhilai student community",
        "Course-based resource organization",
        "Role-based access control",
        "Quality ranking system",
      ],
    },
    {
      id: 6,
      name: "MetaIndex",
      description:
        "ML-based adaptive index selection using meta-learning to optimize database query performance.",
      longDescription:
        "Research project on how machine learning can dynamically optimize database index selection based on query patterns and data characteristics. Uses meta-learning to predict optimal index configurations for given workloads, adapting to changing query distributions. Evaluated on standard database benchmarks against traditional cost-based optimizer approaches.",
      tags: ["Python", "Machine Learning", "Database Systems", "Meta-Learning", "Research"],
      github: "https://github.com/amaydixit11/DSL501_ML_Project",
      demo: "https://github.com/amaydixit11/DSL501_ML_Project",
      status: "Research",
      type: "Research",
      startDate: "2025",
      category: "AI & ML",
      highlights: [
        "Meta-learning for index selection",
        "Adaptive workload-aware optimization",
        "Benchmark evaluation on standard datasets",
        "Comparison with traditional cost-based optimizers",
      ],
    },
    {
      id: 7,
      name: "HalfLife",
      description:
        "Personal knowledge management system with Obsidian integration and automated workflows.",
      longDescription:
        "Comprehensive knowledge management system built around Obsidian with automated workflows, custom skills management, journal auto-population, and bulk tagging. Integrates with WhatsApp analysis pipelines, conversation data, and system-level file scanning for a unified knowledge graph. Includes semantic search via vector embeddings.",
      tags: ["Python", "Obsidian", "Automation", "Knowledge Management", "Vector Search"],
      github: "https://github.com/amaydixit11/HalfLife",
      demo: "https://github.com/amaydixit11/HalfLife",
      status: "Active",
      type: "Tool",
      startDate: "2025",
      category: "Productivity",
      highlights: [
        "Obsidian vault automation",
        "Custom skill-based workflows",
        "Journal auto-population",
        "Semantic search with vector embeddings",
      ],
    },
    {
      id: 8,
      name: "RAGfolio",
      description:
        "Retrieval-Augmented Generation system for intelligent document querying and knowledge extraction.",
      longDescription:
        "RAG system enabling intelligent document processing and querying. Combines vector embeddings, semantic search, and LLM generation to answer questions from personal document collections. Features document chunking strategies, embedding optimization, context window management, and retrieval pipeline tuning for grounded responses.",
      tags: ["Python", "RAG", "LLM", "Vector DB", "Embeddings"],
      github: "https://github.com/amaydixit11/RAGfolio",
      demo: "https://github.com/amaydixit11/RAGfolio",
      status: "Active",
      type: "Research",
      startDate: "2025",
      category: "AI & ML",
      highlights: [
        "Advanced chunking and embedding strategies",
        "Context-aware retrieval pipeline",
        "Grounded LLM generation",
        "Document processing automation",
      ],
    },
    {
      id: 9,
      name: "Relix",
      description:
        "Distributed systems project for reliable, efficient data processing with fault tolerance.",
      longDescription:
        "Systems project exploring reliable data processing patterns for distributed environments. Focuses on building robust data pipelines with fault tolerance, efficient resource utilization, and predictable performance under varying loads. Custom scheduling algorithms and resource allocation strategies.",
      tags: ["Go", "Distributed Systems", "Data Processing", "Fault Tolerance"],
      github: "https://github.com/amaydixit11/Relix",
      demo: "https://github.com/amaydixit11/Relix",
      status: "Active",
      type: "Systems",
      startDate: "2025",
      category: "Distributed Systems",
      highlights: [
        "Fault-tolerant data processing",
        "Custom scheduling algorithms",
        "Resource-efficient design",
        "Predictable performance under load",
      ],
    },
    {
      id: 10,
      name: "B+ Tree Implementation",
      description:
        "Production-grade B+ Tree from scratch with insert, delete, search, and range queries.",
      longDescription:
        "Complete B+ Tree implementation covering all fundamental database index operations: insertion with node splitting, deletion with sibling borrowing and merging, point queries, and range scans. Proper balancing, leaf-level linked lists for efficient range queries, and configurable order parameter. Comprehensive test coverage and performance benchmarks.",
      tags: ["Go", "Data Structures", "Databases", "Algorithms"],
      github: "https://github.com/amaydixit11/bplus-tree",
      demo: "https://github.com/amaydixit11/bplus-tree",
      status: "Complete",
      type: "Systems",
      startDate: "2025",
      category: "Database Internals",
      highlights: [
        "Node splitting and sibling borrowing",
        "Leaf-level linked list for range queries",
        "Configurable tree order",
        "Comprehensive tests and benchmarks",
      ],
    },
    {
      id: 11,
      name: "Pokedle",
      description:
        "Pokemon-themed daily guessing game with animated reveals and streak tracking.",
      longDescription:
        "Daily Pokemon guessing game where players identify a random Pokemon through progressive hints. Features animated reveals, streak tracking, shareable results in Wordle-style emoji grids, and a curated Pokemon database. Responsive design optimized for mobile.",
      tags: ["React", "TypeScript", "Game", "CSS Animations"],
      github: "https://github.com/amaydixit11/pokedle",
      demo: "https://pokedle.vercel.app",
      status: "Live",
      type: "Game",
      startDate: "2024",
      category: "Web Applications",
      highlights: [
        "Daily rotating Pokemon challenges",
        "Animated reveal sequences",
        "Streak tracking system",
        "Mobile-optimized responsive design",
      ],
    },
  ],
  stats: {
    totalProjects: 11,
    publicRepos: 23,
    contributions: 1200,
    languages: 9,
  },
};
