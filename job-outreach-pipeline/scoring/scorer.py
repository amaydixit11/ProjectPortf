# =============================================================
# scoring/scorer.py — LLM Validation Agent + Embedding + Heuristics
# =============================================================
from dotenv import load_dotenv
load_dotenv()

import re
import json
import time
from openai import OpenAI
from config import PROFILE, PREFERENCES, OPENAI_API_KEY, SIMILARITY_THRESHOLD, TOP_N_JOBS

client = OpenAI(api_key=OPENAI_API_KEY)


# =============================================================
# STAGE 1 — LLM VALIDATION AGENT
# =============================================================

VALIDATION_PROMPT = """
You are a job screening agent for Amay Dixit, a pre-final year IIT Bhilai student
(B.Tech Data Science & AI, CGPA 9.08). He is looking for internships.

HARD REQUIREMENTS — reject immediately if ANY violated:
1. Location must be Remote, WFH, India-based, or major tech hubs (Bangalore, Hyderabad, Mumbai, Delhi-NCR, Pune)
   - "Pan India", "Anywhere in India", "WFH" = PASS
   - "Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune" = PASS
   - Explicit "On-site only" outside India = REJECT
   - "Hybrid" is acceptable if primary location is India
2. Must be open to undergrad/fresher (pre-final year = 3rd year)
   - "Masters required", "PhD", "3+ years experience" = REJECT
   - "Fresher", "0-1 year", "students welcome", "internship" = PASS
3. Must involve actual technical work (engineering, systems, ML, backend, infra)
   - "Data entry", "Excel", "PowerPoint", "Sales", "Marketing", "Content writing" = REJECT
4. Must be paid — unpaid or performance-only = REJECT

SOFT CHECKS (note but don't auto-reject):
- Stipend amount
- Mentorship signals (small team, founding engineer, direct mentor)
- Tech stack relevance: Go, Python, Rust, C/C++, gRPC, PostgreSQL, Next.js, Docker, Kubernetes,
  libp2p, CRDT, distributed systems, databases, ML, LLM, RAG, vector DBs

JOB:
Title: {title}
Company: {company}
Location: {location}
Stipend: {stipend}
Description: {description}

Reason through each hard requirement, then give verdict.

Return ONLY valid JSON:
{{
  "verdict": "PASS" or "REJECT",
  "rejection_reason": "specific reason if REJECT, else null",
  "location_confirmed": "remote/india/hybrid or REJECTED",
  "eligibility_confirmed": true or false,
  "is_real_technical_work": true or false,
  "is_paid": true or false,
  "extracted_stipend": "exact amount or unknown",
  "mentorship_signals": ["list"] or [],
  "relevant_tech": ["tech"] or [],
  "reasoning": "2-3 sentence explanation"
}}
"""


def validate_job_with_llm(job: dict) -> dict:
    prompt = VALIDATION_PROMPT.format(
        title=job.get("title", ""),
        company=job.get("company", ""),
        location=job.get("location", ""),
        stipend=job.get("stipend", "not mentioned"),
        description=job.get("description", "")[:2000],
    )

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0,
        )

        result = json.loads(response.choices[0].message.content)

        job["llm_verdict"] = result.get("verdict", "REJECT")
        job["rejection_reason"] = result.get("rejection_reason", "")
        job["location_confirmed"] = result.get("location_confirmed", "")
        job["eligibility_confirmed"] = result.get("eligibility_confirmed", False)
        job["is_real_technical_work"] = result.get("is_real_technical_work", False)
        job["is_paid"] = result.get("is_paid", False)
        job["extracted_stipend"] = result.get("extracted_stipend", "unknown")
        job["mentorship_signals"] = result.get("mentorship_signals", [])
        job["relevant_tech"] = result.get("relevant_tech", [])
        job["llm_reasoning"] = result.get("reasoning", "")

        if job["extracted_stipend"] != "unknown" and job.get("stipend") in ["Not mentioned", "Not disclosed", ""]:
            job["stipend"] = job["extracted_stipend"]

    except Exception as e:
        print(f"    Warning: Validation failed for {job.get('title', '?')}: {e}")
        job["llm_verdict"] = "REJECT"
        job["rejection_reason"] = f"Validation error: {e}"

    return job


def run_validation_agent(jobs: list) -> tuple:
    print(f"\nLLM Validation Agent — checking {len(jobs)} jobs...")
    print("   Reasoning about location, eligibility, role quality, pay...\n")

    passed = []
    rejected = []

    for i, job in enumerate(jobs):
        title = job.get("title", "?")[:40]
        company = job.get("company", "?")[:25]
        print(f"  [{i+1}/{len(jobs)}] {title} @ {company}", end=" ... ")

        job = validate_job_with_llm(job)

        if job["llm_verdict"] == "PASS":
            print(f"PASS  ({job.get('location_confirmed', '')})")
            passed.append(job)
        else:
            reason = job.get("rejection_reason", "unknown")[:60]
            print(f"REJECT — {reason}")
            rejected.append(job)

        time.sleep(0.3)

    print(f"\nValidation Results:")
    print(f"   Passed:   {len(passed)}")
    print(f"   Rejected: {len(rejected)}")

    if rejected:
        print(f"\n   Rejection breakdown:")
        reason_counts = {}
        for job in rejected:
            reason = job.get("rejection_reason", "unknown").lower()
            if "location" in reason or "bangalore" in reason or "delhi" in reason or "pune" in reason or "mumbai" in reason:
                key = "Wrong location"
            elif "master" in reason or "phd" in reason or "experience" in reason:
                key = "Masters/PhD/exp required"
            elif "unpaid" in reason or "paid" in reason:
                key = "Unpaid"
            elif "data entry" in reason or "excel" in reason or "sales" in reason or "marketing" in reason or "content" in reason:
                key = "Not real technical work"
            else:
                key = "Other"
            reason_counts[key] = reason_counts.get(key, 0) + 1

        for reason, count in sorted(reason_counts.items(), key=lambda x: -x[1]):
            print(f"     - {reason}: {count}")

    return passed, rejected


# =============================================================
# STAGE 2 — EMBEDDING SIMILARITY
# =============================================================

def get_embedding(text: str) -> list:
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=text[:8000]
    )
    return response.data[0].embedding


def cosine_similarity(a: list, b: list) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = sum(x ** 2 for x in a) ** 0.5
    mag_b = sum(x ** 2 for x in b) ** 0.5
    if mag_a == 0 or mag_b == 0:
        return 0.0
    return dot / (mag_a * mag_b)


def compute_similarity_scores(jobs: list) -> list:
    print(f"\nEmbedding similarity on {len(jobs)} validated jobs...")

    profile_embedding = get_embedding(PROFILE)
    print("  Profile embedded")

    scored_jobs = []
    for i, job in enumerate(jobs):
        try:
            job_text = " ".join([
                job.get("title", ""),
                job.get("company", ""),
                job.get("description", ""),
                " ".join(job.get("relevant_tech", [])),
                " ".join(job.get("mentorship_signals", [])),
            ])
            job_embedding = get_embedding(job_text)
            similarity = cosine_similarity(profile_embedding, job_embedding)
            job["similarity_score"] = round(similarity, 4)

            if similarity >= SIMILARITY_THRESHOLD:
                scored_jobs.append(job)
            else:
                print(f"  Below threshold ({similarity:.3f}): {job.get('title', '?')[:40]}")

        except Exception as e:
            print(f"  Embedding failed for {job.get('title', '?')}: {e}")
            job["similarity_score"] = 0.0

    print(f"  {len(scored_jobs)} jobs passed similarity threshold ({SIMILARITY_THRESHOLD})")
    return scored_jobs


# =============================================================
# STAGE 3 — HEURISTIC SCORING
# =============================================================

def _parse_stipend(stipend_str: str) -> float:
    if not stipend_str or str(stipend_str).lower() in ["not disclosed", "not mentioned", "n/a", "", "unknown"]:
        return 0
    cleaned = str(stipend_str).lower().replace("₹", "").replace("inr", "").replace(",", "").strip()
    range_match = re.findall(r'\d+', cleaned)
    if len(range_match) >= 2:
        return (float(range_match[0]) + float(range_match[1])) / 2
    elif len(range_match) == 1:
        val = float(range_match[0])
        if "k" in cleaned:
            val *= 1000
        return val
    return 0


def _score_location(job: dict) -> int:
    confirmed = job.get("location_confirmed", "").lower()
    if any(x in confirmed for x in ["remote", "wfh", "work from home"]):
        return 10
    if any(x in confirmed for x in ["india", "bangalore", "hyderabad", "mumbai", "delhi", "pune"]):
        return 9
    if "hybrid" in confirmed:
        return 8
    loc = job.get("location", "").lower()
    if any(x in loc for x in ["remote", "wfh", "india"]):
        return 9
    if any(x in loc for x in ["bangalore", "hyderabad", "mumbai", "delhi", "pune"]):
        return 8
    return 3


def _score_stipend(job: dict) -> int:
    stipend_str = job.get("extracted_stipend", "") or job.get("stipend", "")
    amount = _parse_stipend(str(stipend_str))
    if amount == 0:
        return 4
    if amount < PREFERENCES["min_stipend"]:
        return 1
    if amount <= 15000:
        return 6
    if amount <= 30000:
        return 8
    if amount <= 60000:
        return 9
    return 10


def _score_company_type(title: str, description: str) -> tuple:
    text = (title + " " + description).lower()
    if any(w in text for w in ["distributed systems", "database", "storage", "infra", "cloud native", "kubernetes"]):
        return PREFERENCES["company_type_scores"]["infra_startup"], "Infrastructure"
    if any(w in text for w in ["ai", "llm", "generative", "ml", "machine learning", "deep learning"]):
        return PREFERENCES["company_type_scores"]["ai_startup"], "AI Startup"
    if any(w in text for w in ["deep tech", "deeptech", "robotics", "biotech"]):
        return PREFERENCES["company_type_scores"]["deeptech"], "DeepTech"
    if any(w in text for w in ["developer tools", "devtools", "api", "platform", "saas", "b2b"]):
        return PREFERENCES["company_type_scores"]["devtools"], "DevTools/SaaS"
    if any(w in text for w in ["open source", "oss", "community"]):
        return PREFERENCES["company_type_scores"]["open_source"], "Open Source"
    if any(w in text for w in ["fintech", "trading", "quant", "finance", "banking"]):
        return PREFERENCES["company_type_scores"]["fintech"], "Fintech"
    if any(w in text for w in ["edtech", "education", "learning"]):
        return PREFERENCES["company_type_scores"]["edtech"], "EdTech"
    if any(w in text for w in ["ecommerce", "e-commerce", "retail"]):
        return PREFERENCES["company_type_scores"]["ecommerce"], "E-Commerce"
    if any(w in text for w in ["tcs", "infosys", "wipro", "hcl", "tech mahindra"]):
        return PREFERENCES["company_type_scores"]["it_services"], "IT Services"
    return PREFERENCES["company_type_scores"]["unknown"], "Unknown"


def _score_mentorship(job: dict) -> int:
    signals = job.get("mentorship_signals", [])
    if len(signals) >= 3:
        return 10
    if len(signals) >= 1:
        return 7
    desc = job.get("description", "").lower()
    green = [f for f in PREFERENCES["green_flags"] if f in desc]
    red = [f for f in PREFERENCES["red_flags"] if f in desc]
    return min(10, max(0, 5 + len(green) - len(red) * 2))


def compute_heuristic_score(job: dict) -> dict:
    sim_score = job.get("similarity_score", 0) * 10
    loc_score = _score_location(job)
    stip_score = _score_stipend(job)
    company_score, company_type = _score_company_type(job.get("title", ""), job.get("description", ""))
    mentorship_score = _score_mentorship(job)

    total = (
        sim_score        * 0.35 +
        loc_score        * 0.20 +
        stip_score       * 0.15 +
        company_score    * 0.15 +
        mentorship_score * 0.15
    ) * 10

    job["heuristic_score"] = round(total, 1)
    job["location_score"] = loc_score
    job["stipend_score"] = stip_score
    job["company_type"] = company_type
    job["company_score"] = company_score
    job["mentorship_score"] = mentorship_score
    job["green_flags"] = ", ".join(job.get("mentorship_signals", []))
    job["red_flags"] = job.get("rejection_reason", "")

    return job


# =============================================================
# MAIN PIPELINE
# =============================================================

def score_and_rank_jobs(jobs: list) -> list:
    # Stage 1 — LLM Validation (hard filter)
    passed_jobs, rejected_jobs = run_validation_agent(jobs)

    if not passed_jobs:
        print("\nNo jobs passed validation.")
        return []

    # Stage 2 — Embedding similarity
    similarity_filtered = compute_similarity_scores(passed_jobs)

    if not similarity_filtered:
        print("\nNo jobs passed similarity threshold. Try lowering SIMILARITY_THRESHOLD in config.py")
        return []

    # Stage 3 — Heuristic scoring
    print("\n  Applying heuristic scores...")
    scored = [compute_heuristic_score(job) for job in similarity_filtered]

    for job in scored:
        job["final_score"] = round(
            job["heuristic_score"] * 0.6 + job["similarity_score"] * 100 * 0.4, 1
        )

    ranked = sorted(scored, key=lambda x: x["final_score"], reverse=True)[:TOP_N_JOBS]

    print(f"\n✅ Final ranking: {len(ranked)} jobs ready")
    return ranked
