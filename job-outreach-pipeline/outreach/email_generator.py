# =============================================================
# outreach/email_generator.py — LLM-powered cold email generator
# =============================================================

from openai import OpenAI
from config import OPENAI_API_KEY, PROFILE

client = OpenAI(api_key=OPENAI_API_KEY)

AMAY_BIO = """
Name: Amay Dixit
College: IIT Bhilai — B.Tech Data Science & AI (Pre-final year, graduating 2027), CGPA: 9.08/10

Key Projects:
  1. Kudos — Token-economy social platform with Go/Node.js microservices communicating over gRPC,
     backed by PostgreSQL. Implements MLFQ-inspired feed ranking algorithm. Progressive taxation on
     token accumulation. Next.js + Tailwind CSS frontend.
  2. ACORDE — P2P distributed data sync engine using libp2p (Kademlia DHT) + CRDTs (G-Counters,
     LWW-Element Sets) for mathematically-guaranteed conflict resolution. XChaCha20-Poly1305
     encryption. SQLite with WAL mode. Built for offline-first environments.
  3. BitTorrent Client — From-scratch BitTorrent protocol in Go. Full handshake flow, SHA-1 piece
     validation, choking/unchoking with optimistic unchoking, rarest-first piece selection, DHT
     via Kademlia protocol, concurrent piece downloading with endgame mode.
  4. GitIntel — LLM-powered GitHub intelligence (FastAPI, Python, GraphQL, OpenAI). Transforms
     messy PR/issue threads into structured engineering digests. D3.js decision dependency graphs.
  5. MetaIndex — ML-based adaptive database index selection using meta-learning. Benchmarked
     against traditional cost-based optimizers. Adapts to shifting query distributions.
  6. B+ Tree — Production-grade B+ Tree in Go with node splitting, sibling borrowing, doubly-linked
     leaf lists for O(n) range scans, configurable order, comprehensive benchmarks.

Skills: Go, Python, Rust, C/C++, Next.js, FastAPI, Node.js, gRPC, PostgreSQL, Supabase,
       Docker, CI/CD, libp2p, CRDTs, LLMs, RAG, Vector DBs, D3.js, TypeScript, Tailwind CSS

Interests: Distributed systems, database internals, multimodal AI, VLMs, cryptography, P2P systems
Email: amayd@iitbhilai.ac.in
GitHub: github.com/amaydixit11
LinkedIn: linkedin.com/in/amay-dixit-462113284
Portfolio: amaydixit11.vercel.app
Looking for: Internship with meaningful systems/infrastructure/AI work, remote/India preferred
"""


def research_company(company: str, role: str, job_description: str) -> str:
    """Uses LLM to research company and extract relevant talking points."""
    
    prompt = f"""You are helping craft a cold outreach email. Research the following company and role.

Company: {company}
Role: {role}
Job Description: {job_description}

Based on what you know about this company, provide:
1. What the company does (1-2 sentences, specific — not just their homepage blurb)
2. Their core technical challenge or product focus
3. How a systems/ML/backend intern could contribute meaningfully
4. Any recent notable work, product, paper, or achievement worth mentioning
5. The tone/culture (serious research, fast-paced startup, engineering-first, etc.)

Keep it factual and specific. If you don't know something, say "Unknown" rather than guessing.
Format as JSON: {{"what_they_do": "", "core_challenge": "", "intern_contribution": "", "notable_work": "", "culture": ""}}"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f'{{"what_they_do": "{company}", "core_challenge": "Unknown", "intern_contribution": "Systems/ML work", "notable_work": "Unknown", "culture": "Unknown"}}'


def generate_email(job: dict) -> dict:
    """
    Generates a deeply researched cold email for a job.
    Strategy: Propose a SMALL TASK/PROJECT instead of asking for an interview.
    This filters for companies that value work over credentials.
    """
    
    company = job.get("company", "")
    role = job.get("title", "")
    description = job.get("description", "")
    hiring_manager = job.get("Hiring Manager Name", "")
    
    # Step 1: Research the company
    print(f"  🔍 Researching {company}...")
    company_research = research_company(company, role, description)
    
    # Step 2: Generate the email
    prompt = f"""You are helping Amay Dixit write a cold outreach email for an internship.

AMAY'S PROFILE:
{AMAY_BIO}

TARGET COMPANY RESEARCH:
{company_research}

JOB: {role} at {company}
HIRING MANAGER: {hiring_manager if hiring_manager else "Hiring Team"}

STRICT EMAIL RULES:
1. DO NOT write a generic "I am a passionate student" email
2. DO reference something SPECIFIC about the company's actual work — a product feature, architecture decision, paper, or blog post. Never just "your company does great work"
3. DO NOT ask for an interview — instead, propose a SMALL TASK or project
   (e.g., "I'd love to spend a weekend building X for you as a trial")
   This signals confidence and filters for good mentors
4. Keep it under 200 words — busy people don't read long emails
5. Subject line must be specific and intriguing, not generic. Reference their actual work
6. Lead with VALUE and curiosity, not credentials
7. Mention ONE specific project of Amay's that's directly relevant to their work — be technical and concrete (what it does, what stack, what problem it solves)
8. End with a specific, low-friction ask
9. No em dashes. Use semicolons or periods instead.
10. No filler phrases: "I am passionate about", "I would love the opportunity", "As a quick introduction"

TONE: Confident, direct, curious. NOT desperate or sycophantic. Technical but readable.

Return JSON: {{"subject": "...", "body": "..."}}

The body should be plain text (no HTML), professional but human."""

    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # Use 4o for email quality — worth the cost
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.7,
        )
        
        import json
        result = json.loads(response.choices[0].message.content)
        
        return {
            "subject": result.get("subject", ""),
            "body": result.get("body", ""),
            "company_research": company_research,
            "success": True
        }
    
    except Exception as e:
        print(f"  ⚠️ Email generation failed for {company}: {e}")
        return {"subject": "", "body": "", "success": False, "error": str(e)}


def generate_emails_for_pending_jobs(pending_jobs: list) -> list:
    """Generates emails for all pending jobs that have hiring manager info."""
    
    print(f"\n✉️ Generating emails for {len(pending_jobs)} jobs...")
    results = []
    
    for job in pending_jobs:
        print(f"\n  → {job.get('Title', '')} at {job.get('Company', '')}")
        
        email = generate_email({
            "company": job.get("Company", ""),
            "title": job.get("Title", ""),
            "description": job.get("Notes", "") or job.get("Title", ""),
            "Hiring Manager Name": job.get("Hiring Manager Name", ""),
        })
        
        results.append({
            "row_index": job.get("row_index"),
            "company": job.get("Company"),
            "email": email,
        })
    
    return results
