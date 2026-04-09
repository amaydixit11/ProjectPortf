# =============================================================
# config.py — Amay's Job Pipeline Configuration
# =============================================================

import os
from dotenv import load_dotenv
load_dotenv()

# --- YOUR PROFILE (used for embedding similarity) ---
PROFILE = """
Name: Amay Dixit
Education: IIT Bhilai, B.Tech Data Science & AI (Pre-final year, graduating 2027), CGPA 9.08
Skills: Go, Python, Rust, C/C++ — Systems programming, Distributed Systems (libp2p, CRDTs, P2P),
        Backend (Next.js, FastAPI, Node.js, gRPC, PostgreSQL, Supabase),
        AI/ML (LLMs, RAG, Meta-Learning, Vector DBs, Knowledge Graphs),
        DevOps (Docker, CI/CD, GitHub Actions), Database Internals (B+ Trees, query optimizers)
Projects: 
  - Kudos: Token-economy social platform with Go/Node.js microservices, gRPC, PostgreSQL, MLFQ-inspired feed algorithm
  - ACORDE: P2P distributed data sync engine using libp2p + CRDTs (G-Counters, LWW-Element Sets), XChaCha20-Poly1305 encryption
  - BitTorrent Client: From-scratch BitTorrent protocol in Go with DHT (Kademlia), choking/unchoking, rarest-first piece selection
  - GitIntel: LLM-powered GitHub intelligence (FastAPI, GraphQL, OpenAI) extracting architectural decisions from PR/issue threads
  - MetaIndex: ML-based adaptive database index selection using meta-learning, benchmarked against cost-based optimizers
  - RAGfolio: RAG system with advanced chunking, HNSW ANN search, context window management, grounded generation
  - B+ Tree: Production-grade B+ Tree in Go with node splitting, sibling borrowing, range scans, benchmarks
Interests: Distributed systems, database internals, multimodal AI, VLMs, cryptography, digital identity, P2P systems
Email: amayd@iitbhilai.ac.in
GitHub: github.com/amaydixit11
LinkedIn: linkedin.com/in/amay-dixit-462113284
Portfolio: amaydixit11.vercel.app
"""

# --- TARGET JOB CRITERIA ---
TARGET_ROLES = [
    "Software Engineer Intern",
    "Systems Engineer Intern",
    "Distributed Systems Intern",
    "Backend Engineer Intern",
    "ML Engineer Intern",
    "AI Engineer Intern",
    "Infrastructure Engineer Intern",
    "Database Engineer Intern",
    "Platform Engineer Intern",
    "Research Engineer Intern",
    "Founding Engineer Intern",
]

TARGET_KEYWORDS = [
    "distributed systems", "databases", "storage", "infrastructure",
    "backend systems", "microservices", "Go", "gRPC", "system design",
    "machine learning", "LLM", "RAG", "vector databases", "P2P",
    "CRDT", "consensus", "cryptography", "digital identity", "multimodal",
    "VLM", "computer vision", "systems programming", "database internals",
    "query optimization", "indexing", "data pipelines", "cloud infrastructure",
    "platform engineering", "developer tools", "open source"
]

# --- PREFERENCES (heuristic scoring weights) ---
PREFERENCES = {
    # Location
    "HARD_LOCATION_FILTER": ["remote", "india", "bangalore", "hyderabad", "work from home", "wfh", "hybrid"],
    
    # Stipend range (INR/month)
    "min_stipend": 10000,
    "max_stipend": 80000,  # anything above this is a bonus
    
    # Company stage (higher = better fit)
    "company_stage_scores": {
        "series_a": 10,
        "series_b": 9,
        "seed": 8,
        "pre_seed": 7,
        "series_c": 7,
        "bootstrapped": 6,
        "series_d": 5,
        "public": 4,
        "unknown": 5,
    },
    
    # Company type
    "company_type_scores": {
        "infra_startup": 10,
        "ai_startup": 10,
        "deeptech": 10,
        "fintech": 8,
        "saas": 7,
        "open_source": 9,
        "devtools": 9,
        "database_company": 10,
        "cloud_infra": 9,
        "edtech": 5,
        "ecommerce": 4,
        "it_services": 2,
        "unknown": 5,
    },
    
    # Good signals in job description
    "green_flags": [
        "mentorship", "mentor", "learning", "research", "publications",
        "flexible", "async", "ownership", "impact", "small team",
        "founding team", "equity", "ppo", "pre-placement offer",
        "open source", "contribute", "deep dive", "first principles",
        "systems thinking", "build from scratch", "greenfield",
        "distributed", "scale", "performance"
    ],
    
    # Bad signals
    "red_flags": [
        "unpaid", "no stipend", "rotational", "excel", "powerpoint",
        "data entry", "cold calling", "sales intern", "marketing intern",
        "frontend only", "wordpress", "content writing", "social media"
    ]
}


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
GOOGLE_SHEETS_CREDS_FILE = "credentials.json"  # OAuth2 creds for Sheets
SPREADSHEET_NAME = "Amay Job Pipeline"

JOBS_PER_SOURCE = 25       # how many jobs to scrape per platform
SIMILARITY_THRESHOLD = 0.35  # minimum cosine similarity to include a job
TOP_N_JOBS = 50             # final jobs to add to sheet
