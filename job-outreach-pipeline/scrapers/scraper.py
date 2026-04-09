# =============================================================
# scrapers/scraper.py — Scrapes LinkedIn, Internshala, Naukri
# =============================================================

import requests
from bs4 import BeautifulSoup
import time
import random
import json
from datetime import datetime
from config import TARGET_ROLES, TARGET_KEYWORDS, JOBS_PER_SOURCE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
}


def _sleep():
    """Polite delay between requests."""
    time.sleep(random.uniform(2, 4))


# =============================================================
# INTERNSHALA SCRAPER (most reliable for Indian internships)
# =============================================================

def scrape_internshala(keywords=None, max_jobs=JOBS_PER_SOURCE):
    """Scrapes Internshala for ML/AI/Systems internships."""
    if keywords is None:
        keywords = ["machine-learning", "artificial-intelligence", "data-science",
                    "python", "backend", "software-development"]
    
    jobs = []
    
    for keyword in keywords[:4]:  # limit to 4 keywords
        url = f"https://internshala.com/internships/{keyword}-internship"
        
        try:
            print(f"  [Internshala] Scraping: {keyword}...")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
            
            # Each internship card
            cards = soup.select(".internship_meta") or soup.select(".individual_internship")
            
            for card in cards[:max_jobs // 4]:
                try:
                    # Title
                    title_el = card.select_one(".profile") or card.select_one("h3")
                    title = title_el.get_text(strip=True) if title_el else "N/A"
                    
                    # Company
                    company_el = card.select_one(".company_name") or card.select_one(".company-name")
                    company = company_el.get_text(strip=True) if company_el else "N/A"
                    
                    # Location
                    loc_el = card.select_one(".location_link") or card.select_one(".locations")
                    location = loc_el.get_text(strip=True) if loc_el else "N/A"
                    
                    # Stipend
                    stip_el = card.select_one(".stipend") or card.select_one(".salary")
                    stipend = stip_el.get_text(strip=True) if stip_el else "Not mentioned"
                    
                    # Duration
                    dur_el = card.select_one(".duration") or card.select_one(".internship-duration")
                    duration = dur_el.get_text(strip=True) if dur_el else "N/A"
                    
                    # Link
                    link_el = card.select_one("a[href]")
                    link = "https://internshala.com" + link_el["href"] if link_el and link_el.get("href", "").startswith("/") else ""
                    
                    if title != "N/A" and company != "N/A":
                        jobs.append({
                            "title": title,
                            "company": company,
                            "location": location,
                            "stipend": stipend,
                            "duration": duration,
                            "link": link,
                            "source": "Internshala",
                            "description": f"{title} at {company}. Location: {location}. Stipend: {stipend}.",
                            "scraped_at": datetime.now().isoformat(),
                        })
                except Exception as e:
                    continue
            
            _sleep()
            
        except Exception as e:
            print(f"  [Internshala] Failed for {keyword}: {e}")
            continue
    
    print(f"  [Internshala] Found {len(jobs)} jobs")
    return jobs


# =============================================================
# NAUKRI SCRAPER
# =============================================================

def scrape_naukri(keywords=None, max_jobs=JOBS_PER_SOURCE):
    """Scrapes Naukri for ML/AI/Systems internships."""
    if keywords is None:
        keywords = ["machine learning intern", "AI intern", "software engineer intern",
                    "backend intern", "data science intern", "systems engineer intern"]
    
    jobs = []
    
    for keyword in keywords[:4]:
        keyword_url = keyword.replace(" ", "-")
        url = f"https://www.naukri.com/{keyword_url}-jobs"
        
        try:
            print(f"  [Naukri] Scraping: {keyword}...")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
            
            # Job cards
            cards = soup.select(".jobTuple") or soup.select("[class*='jobTupleHeader']") or soup.select(".job-listings article")
            
            for card in cards[:max_jobs // 4]:
                try:
                    title_el = card.select_one(".title") or card.select_one("a.title")
                    title = title_el.get_text(strip=True) if title_el else "N/A"
                    
                    company_el = card.select_one(".companyInfo") or card.select_one(".company-name")
                    company = company_el.get_text(strip=True) if company_el else "N/A"
                    
                    loc_el = card.select_one(".location") or card.select_one("[class*='location']")
                    location = loc_el.get_text(strip=True) if loc_el else "N/A"
                    
                    exp_el = card.select_one(".experience") or card.select_one("[class*='experience']")
                    experience = exp_el.get_text(strip=True) if exp_el else "Fresher"
                    
                    link_el = card.select_one("a[href]")
                    link = link_el["href"] if link_el else ""
                    
                    salary_el = card.select_one(".salary") or card.select_one("[class*='salary']")
                    salary = salary_el.get_text(strip=True) if salary_el else "Not disclosed"
                    
                    if title != "N/A":
                        jobs.append({
                            "title": title,
                            "company": company,
                            "location": location,
                            "stipend": salary,
                            "duration": "N/A",
                            "link": link,
                            "source": "Naukri",
                            "description": f"{title} at {company}. Location: {location}. Experience: {experience}.",
                            "scraped_at": datetime.now().isoformat(),
                        })
                except Exception:
                    continue
            
            _sleep()
            
        except Exception as e:
            print(f"  [Naukri] Failed for {keyword}: {e}")
            continue
    
    print(f"  [Naukri] Found {len(jobs)} jobs")
    return jobs


# =============================================================
# LINKEDIN SCRAPER (public jobs page, no login needed)
# =============================================================

def scrape_linkedin(keywords=None, max_jobs=JOBS_PER_SOURCE):
    """Scrapes LinkedIn public jobs (no login)."""
    if keywords is None:
        keywords = ["Software Engineer Intern", "ML Engineer Intern India",
                    "Backend Engineer Intern", "Systems Intern"]
    
    jobs = []
    
    for keyword in keywords[:3]:
        keyword_enc = keyword.replace(" ", "%20")
        url = (
            f"https://www.linkedin.com/jobs/search?"
            f"keywords={keyword_enc}&location=India"
            f"&f_E=1&f_JT=I&sortBy=DD"  # Entry level, Internship, Date desc
        )
        
        try:
            print(f"  [LinkedIn] Scraping: {keyword}...")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
            
            cards = soup.select(".base-card") or soup.select(".jobs-search__results-list li")
            
            for card in cards[:max_jobs // 3]:
                try:
                    title_el = card.select_one(".base-search-card__title") or card.select_one("h3")
                    title = title_el.get_text(strip=True) if title_el else "N/A"
                    
                    company_el = card.select_one(".base-search-card__subtitle") or card.select_one("h4")
                    company = company_el.get_text(strip=True) if company_el else "N/A"
                    
                    loc_el = card.select_one(".job-search-card__location")
                    location = loc_el.get_text(strip=True) if loc_el else "N/A"
                    
                    link_el = card.select_one("a[href]")
                    link = link_el["href"].split("?")[0] if link_el else ""
                    
                    if title != "N/A":
                        jobs.append({
                            "title": title,
                            "company": company,
                            "location": location,
                            "stipend": "Not disclosed",
                            "duration": "N/A",
                            "link": link,
                            "source": "LinkedIn",
                            "description": f"{title} at {company}. Location: {location}.",
                            "scraped_at": datetime.now().isoformat(),
                        })
                except Exception:
                    continue
            
            _sleep()
            
        except Exception as e:
            print(f"  [LinkedIn] Failed for {keyword}: {e}")
            continue
    
    print(f"  [LinkedIn] Found {len(jobs)} jobs")
    return jobs


# =============================================================
# WELLFOUND (AngelList) SCRAPER
# =============================================================

def scrape_wellfound(keywords=None, max_jobs=JOBS_PER_SOURCE):
    """Scrapes Wellfound (AngelList) for startup internships."""
    if keywords is None:
        keywords = ["software-engineer", "machine-learning", "backend", "data-science"]
    
    jobs = []
    
    for keyword in keywords[:3]:
        url = f"https://wellfound.com/role/{keyword}/india"
        
        try:
            print(f"  [Wellfound] Scraping: {keyword}...")
            resp = requests.get(url, headers=HEADERS, timeout=15)
            soup = BeautifulSoup(resp.text, "html.parser")
            
            cards = soup.select(".startup-link") or soup.select("[class*='card']")
            
            for card in cards[:max_jobs // 3]:
                try:
                    title_el = card.select_one(".title") or card.select_one("h4") or card.select_one("h3")
                    title = title_el.get_text(strip=True) if title_el else "N/A"
                    
                    company_el = card.select_one(".company-name") or card.select_one(".startup-name")
                    company = company_el.get_text(strip=True) if company_el else "N/A"
                    
                    loc_el = card.select_one(".location") or card.select_one("[class*='location']")
                    location = loc_el.get_text(strip=True) if loc_el else "Remote"
                    
                    link_el = card.select_one("a[href]")
                    link = link_el["href"] if link_el and link_el["href"].startswith("http") else f"https://wellfound.com{link_el['href']}" if link_el else ""
                    
                    if title != "N/A" and title.lower() != "n/a":
                        jobs.append({
                            "title": title,
                            "company": company,
                            "location": location,
                            "stipend": "Not disclosed",
                            "duration": "N/A",
                            "link": link,
                            "source": "Wellfound",
                            "description": f"{title} at {company}. Location: {location}.",
                            "scraped_at": datetime.now().isoformat(),
                        })
                except Exception:
                    continue
            
            _sleep()
            
        except Exception as e:
            print(f"  [Wellfound] Failed for {keyword}: {e}")
            continue
    
    print(f"  [Wellfound] Found {len(jobs)} jobs")
    return jobs


# =============================================================
# MAIN SCRAPE FUNCTION
# =============================================================

def scrape_all_jobs():
    """Run all scrapers and return combined deduplicated list."""
    print("\n🔍 Starting job scraping...")
    
    all_jobs = []
    all_jobs.extend(scrape_internshala())
    all_jobs.extend(scrape_naukri())
    all_jobs.extend(scrape_linkedin())
    all_jobs.extend(scrape_wellfound())
    
    # Deduplicate by (title, company)
    seen = set()
    unique_jobs = []
    for job in all_jobs:
        key = (job["title"].lower().strip(), job["company"].lower().strip())
        if key not in seen:
            seen.add(key)
            unique_jobs.append(job)
    
    print(f"\n✅ Total unique jobs scraped: {len(unique_jobs)}")
    return unique_jobs
