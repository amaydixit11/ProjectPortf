#!/usr/bin/env python3
# =============================================================
# main.py — Amay's Job Outreach Pipeline Orchestrator
# =============================================================
#
# USAGE:
#   python main.py scrape      → Steps 1-3: Scrape, score, push to Sheets
#   python main.py emails      → Step 4: Generate emails for jobs with manager info
#   python main.py review      → Step 5: Interactive review of drafted emails
#   python main.py send        → Step 6: Mark approved emails as sent (manual send)
#   python main.py track       → Step 7: Mark replies, train classifier
#   python main.py setup       → First-time Google Sheets setup
#
# =============================================================

import sys
import json
from datetime import datetime

# --- Import pipeline modules ---
sys.path.insert(0, ".")
from scrapers.scraper import scrape_all_jobs
from scoring.scorer import score_and_rank_jobs
from sheets.sheets_manager import (
    setup_sheets, add_jobs_to_sheet,
    get_pending_jobs, update_job_email,
    mark_email_sent, mark_reply_received
)
from outreach.email_generator import generate_emails_for_pending_jobs
from tracker.reply_tracker import check_replies_interactive, EmailClassifier


def cmd_setup():
    """First-time setup — creates Google Sheet with all columns."""
    print("🚀 Setting up Amay's Job Pipeline...")
    url = setup_sheets()
    print(f"\n✅ Done! Open your sheet at: {url}")
    print("\nNext steps:")
    print("  1. Run: python main.py scrape")
    print("  2. Fill in 'Hiring Manager Name' and 'Hiring Manager Email' via Lusha")
    print("  3. Run: python main.py emails")


def cmd_scrape():
    """
    Steps 1-3: Scrape jobs → Score → Push to Sheets
    """
    print("=" * 60)
    print("🔍 STEP 1: Scraping jobs from LinkedIn, Internshala, Naukri")
    print("=" * 60)
    
    raw_jobs = scrape_all_jobs()
    
    if not raw_jobs:
        print("❌ No jobs scraped. Check your internet connection or try again.")
        return
    
    print("\n" + "=" * 60)
    print("📊 STEP 2: Scoring jobs (embedding similarity + heuristics)")
    print("=" * 60)
    
    # Load classifier if trained
    classifier = EmailClassifier()
    classifier.load()
    
    ranked_jobs = score_and_rank_jobs(raw_jobs)
    
    # Re-rank with classifier if available
    ranked_jobs = classifier.rerank_with_classifier(ranked_jobs)
    
    # Print top 10 preview
    print("\n🏆 Top 10 Jobs:")
    print(f"{'#':<4} {'Title':<35} {'Company':<25} {'Score':<8} {'Location'}")
    print("-" * 90)
    for i, job in enumerate(ranked_jobs[:10]):
        title = job.get("title", "")[:33]
        company = job.get("company", "")[:23]
        score = job.get("final_score", 0)
        location = job.get("location", "")[:20]
        print(f"{i+1:<4} {title:<35} {company:<25} {score:<8} {location}")
    
    print("\n" + "=" * 60)
    print("📋 STEP 3: Pushing to Google Sheets")
    print("=" * 60)
    
    sheet_url = add_jobs_to_sheet(ranked_jobs)
    
    print(f"\n✅ Pipeline complete!")
    print(f"📊 Sheet: {sheet_url}")
    print(f"\n⏭️  Next: Fill in 'Hiring Manager Email' via Lusha, then run:")
    print(f"   python main.py emails")


def cmd_emails():
    """
    Step 4: Generate LLM emails for jobs that have hiring manager info.
    """
    print("=" * 60)
    print("✉️  STEP 4: Generating emails for jobs with contact info")
    print("=" * 60)
    
    pending = get_pending_jobs()
    
    if not pending:
        print("⚠️  No jobs with PENDING status and a hiring manager email.")
        print("   → Open your Google Sheet and fill in 'Hiring Manager Email' for jobs you want to email")
        return
    
    print(f"Found {len(pending)} jobs ready for email generation")
    
    results = generate_emails_for_pending_jobs(pending)
    
    # Update sheet with generated emails
    from sheets.sheets_manager import update_job_email
    
    success = 0
    for result in results:
        if result["email"]["success"]:
            update_job_email(
                row_index=result["row_index"],
                subject=result["email"]["subject"],
                body=result["email"]["body"],
                status="DRAFTED"
            )
            success += 1
            print(f"  ✅ {result['company']} — email drafted")
        else:
            print(f"  ❌ {result['company']} — failed: {result['email'].get('error', 'unknown')}")
    
    print(f"\n✅ {success}/{len(results)} emails drafted in sheet")
    print(f"\n⏭️  Next: Review emails in sheet, change status to APPROVED, then run:")
    print(f"   python main.py send")


def cmd_review():
    """
    Step 5: Interactive CLI review of drafted emails.
    """
    print("=" * 60)
    print("👀 STEP 5: Review drafted emails")
    print("=" * 60)
    
    from sheets.sheets_manager import get_sheet_client, SPREADSHEET_NAME
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    records = jobs_ws.get_all_records()
    
    drafted = [
        {"row_index": i + 2, **r}
        for i, r in enumerate(records)
        if r.get("Email Status") == "DRAFTED"
    ]
    
    if not drafted:
        print("No emails in DRAFTED status.")
        return
    
    print(f"Found {len(drafted)} emails to review\n")
    
    for job in drafted:
        print("=" * 60)
        print(f"Company: {job.get('Company', '')}")
        print(f"Role:    {job.get('Title', '')}")
        print(f"To:      {job.get('Hiring Manager Name', '')} <{job.get('Hiring Manager Email', '')}>")
        print(f"\nSUBJECT: {job.get('Email Subject', '')}")
        print(f"\nBODY:\n{job.get('Email Body', '')}")
        print("\n[a] Approve  [e] Edit subject  [d] Discard  [s] Skip: ", end="")
        
        choice = input().strip().lower()
        
        from sheets.sheets_manager import update_job_email
        
        if choice == "a":
            update_job_email(job["row_index"], job["Email Subject"], job["Email Body"], "APPROVED")
            print("  ✅ APPROVED")
        elif choice == "e":
            print("New subject: ", end="")
            new_subject = input().strip()
            update_job_email(job["row_index"], new_subject, job["Email Body"], "APPROVED")
            print("  ✅ APPROVED with new subject")
        elif choice == "d":
            update_job_email(job["row_index"], "", "", "DISCARDED")
            print("  🗑️  DISCARDED")
        else:
            print("  ⏭️  Skipped")
    
    print(f"\n⏭️  Next: Run python main.py send")


def cmd_send():
    """
    Step 6: Shows APPROVED emails ready to send. You copy-paste and send manually.
    Marks them as SENT after confirmation.
    """
    print("=" * 60)
    print("📤 STEP 6: Send approved emails")
    print("=" * 60)
    
    from sheets.sheets_manager import get_sheet_client, SPREADSHEET_NAME
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    records = jobs_ws.get_all_records()
    
    approved = [
        {"row_index": i + 2, **r}
        for i, r in enumerate(records)
        if r.get("Email Status") == "APPROVED"
    ]
    
    if not approved:
        print("No emails with APPROVED status.")
        return
    
    print(f"{len(approved)} emails ready to send\n")
    
    for job in approved:
        print("=" * 60)
        print(f"TO:      {job.get('Hiring Manager Email', '')}")
        print(f"SUBJECT: {job.get('Email Subject', '')}")
        print(f"\n{job.get('Email Body', '')}")
        print("\n[Press Enter after sending, or 's' to skip]: ", end="")
        
        inp = input().strip().lower()
        if inp != "s":
            mark_email_sent(job["row_index"])
            print(f"  ✅ Marked as SENT — {job.get('Company', '')}")
        else:
            print("  ⏭️  Skipped")
    
    print(f"\n⏭️  Come back tomorrow and run: python main.py track")


def cmd_track():
    """
    Step 7: Mark replies, train classifier on accumulated data.
    """
    print("=" * 60)
    print("📬 STEP 7: Track replies + train classifier")
    print("=" * 60)
    
    from sheets.sheets_manager import get_sheet_client, SPREADSHEET_NAME
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    records = jobs_ws.get_all_records()
    
    sent_jobs = [
        {"row_index": i + 2, **r}
        for i, r in enumerate(records)
        if r.get("Email Status") == "SENT"
    ]
    
    if not sent_jobs:
        print("No emails marked as SENT yet.")
        return
    
    # Interactive reply marking
    updates = check_replies_interactive(sent_jobs)
    
    # Update sheet
    for update in updates:
        if update["has_reply"]:
            mark_reply_received(update["row_index"], update["label"])
    
    print(f"\n✅ Updated {len([u for u in updates if u['has_reply']])} reply statuses")
    
    # Try to train classifier
    all_records = jobs_ws.get_all_records()
    labeled = [r for r in all_records if r.get("Reply Label") in [0, 1, "0", "1"]]
    print(f"\n📊 Total labeled examples: {len(labeled)}")
    
    if len(labeled) >= 10:
        classifier = EmailClassifier()
        classifier.train(all_records)
        print("\n🎯 Classifier trained! It will re-rank jobs on your next scrape run.")
    else:
        remaining = 10 - len(labeled)
        print(f"⏳ Need {remaining} more labeled replies to train the classifier.")
        print(f"   Keep sending emails and checking back!")


# =============================================================
# ENTRY POINT
# =============================================================

COMMANDS = {
    "setup": cmd_setup,
    "scrape": cmd_scrape,
    "emails": cmd_emails,
    "review": cmd_review,
    "send": cmd_send,
    "track": cmd_track,
}

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in COMMANDS:
        print("Amay's Job Outreach Pipeline")
        print("=" * 40)
        print("Usage: python main.py <command>")
        print("\nCommands:")
        print("  setup   → First-time Google Sheets setup")
        print("  scrape  → Scrape jobs + score + push to Sheets")
        print("  emails  → Generate emails (after filling Lusha data)")
        print("  review  → Review drafted emails interactively")
        print("  send    → Show approved emails + mark as sent")
        print("  track   → Mark replies + train classifier")
        print("\nFull workflow:")
        print("  1. python main.py setup")
        print("  2. python main.py scrape")
        print("  3. [Fill Lusha data in Sheet]")
        print("  4. python main.py emails")
        print("  5. python main.py review")
        print("  6. python main.py send")
        print("  7. [Wait for replies]")
        print("  8. python main.py track")
        sys.exit(0)
    
    COMMANDS[sys.argv[1]]()
