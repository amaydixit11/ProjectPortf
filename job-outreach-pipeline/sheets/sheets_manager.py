# =============================================================
# sheets/sheets_manager.py — Google Sheets integration
# =============================================================

import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
from config import GOOGLE_SHEETS_CREDS_FILE, SPREADSHEET_NAME

SCOPES = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# Column headers for the main jobs sheet
JOB_COLUMNS = [
    "ID", "Title", "Company", "Location", "Stipend", "Duration",
    "Source", "Link", "Company Type", "Similarity Score", "Heuristic Score",
    "Final Score", "Green Flags", "Red Flags",
    # Outreach columns (filled manually/later)
    "Hiring Manager Name", "Hiring Manager Email", "LinkedIn URL",
    # Email pipeline columns
    "Email Status",       # PENDING / DRAFTED / APPROVED / SENT / REPLIED / NO_REPLY
    "Email Subject",
    "Email Body",
    "Sent At",
    "Reply Received",     # YES / NO
    "Reply Label",        # 1 = positive, 0 = negative (for classifier)
    "Notes",
    "Scraped At",
]


def get_sheet_client():
    """Authenticates and returns gspread client."""
    creds = Credentials.from_service_account_file(GOOGLE_SHEETS_CREDS_FILE, scopes=SCOPES)
    return gspread.authorize(creds)


def get_or_create_spreadsheet(client):
    """Opens existing spreadsheet or creates a new one."""
    try:
        spreadsheet = client.open(SPREADSHEET_NAME)
        print(f"  ✅ Opened existing spreadsheet: {SPREADSHEET_NAME}")
    except gspread.SpreadsheetNotFound:
        spreadsheet = client.create(SPREADSHEET_NAME)
        print(f"  ✅ Created new spreadsheet: {SPREADSHEET_NAME}")
    return spreadsheet


def get_or_create_worksheet(spreadsheet, name: str, rows=200, cols=30):
    """Gets or creates a worksheet by name."""
    try:
        ws = spreadsheet.worksheet(name)
    except gspread.WorksheetNotFound:
        ws = spreadsheet.add_worksheet(title=name, rows=rows, cols=cols)
        print(f"  ✅ Created worksheet: {name}")
    return ws


def setup_sheets():
    """
    Sets up the full spreadsheet with all required sheets.
    Call this once on first run.
    """
    print("\n📋 Setting up Google Sheets...")
    client = get_sheet_client()
    spreadsheet = get_or_create_spreadsheet(client)
    
    # --- Sheet 1: Jobs Pipeline ---
    jobs_ws = get_or_create_worksheet(spreadsheet, "Jobs Pipeline")
    
    # Write headers if sheet is empty
    if jobs_ws.row_count == 0 or not jobs_ws.row_values(1):
        jobs_ws.append_row(JOB_COLUMNS)
        # Format header row (bold, freeze)
        jobs_ws.format("A1:Z1", {
            "textFormat": {"bold": True},
            "backgroundColor": {"red": 0.2, "green": 0.2, "blue": 0.4}
        })
        jobs_ws.freeze(rows=1)
        print("  ✅ Headers written to Jobs Pipeline sheet")
    
    # --- Sheet 2: Email Templates ---
    email_ws = get_or_create_worksheet(spreadsheet, "Email Templates")
    if not email_ws.row_values(1):
        email_ws.append_row(["Company", "Role", "Subject", "Body", "Version", "Created At"])
        email_ws.freeze(rows=1)
    
    # --- Sheet 3: Classifier Training Data ---
    classifier_ws = get_or_create_worksheet(spreadsheet, "Classifier Data")
    if not classifier_ws.row_values(1):
        classifier_ws.append_row([
            "Company", "Role", "Email Subject", "Email Body Preview",
            "Reply Received", "Label (1=positive, 0=negative)", "Notes"
        ])
        classifier_ws.freeze(rows=1)
    
    print(f"  ✅ Spreadsheet ready: {spreadsheet.url}")
    return spreadsheet


def get_existing_job_keys(jobs_ws) -> set:
    """Returns set of (title, company) already in sheet to avoid duplicates."""
    try:
        records = jobs_ws.get_all_records()
        return {(r.get("Title", "").lower(), r.get("Company", "").lower()) for r in records}
    except Exception:
        return set()


def add_jobs_to_sheet(jobs: list):
    """Adds scored jobs to the Google Sheet, skipping duplicates."""
    print("\n📋 Adding jobs to Google Sheets...")
    
    client = get_sheet_client()
    spreadsheet = get_or_create_spreadsheet(client)
    jobs_ws = get_or_create_worksheet(spreadsheet, "Jobs Pipeline")
    
    # Write headers if missing
    if not jobs_ws.row_values(1):
        jobs_ws.append_row(JOB_COLUMNS)
        jobs_ws.freeze(rows=1)
    
    # Get existing jobs to skip duplicates
    existing = get_existing_job_keys(jobs_ws)
    
    # Get current max ID
    records = jobs_ws.get_all_records()
    next_id = len(records) + 1
    
    new_rows = []
    skipped = 0
    
    for job in jobs:
        key = (job.get("title", "").lower(), job.get("company", "").lower())
        if key in existing:
            skipped += 1
            continue
        
        row = [
            next_id,
            job.get("title", ""),
            job.get("company", ""),
            job.get("location", ""),
            job.get("stipend", ""),
            job.get("duration", ""),
            job.get("source", ""),
            job.get("link", ""),
            job.get("company_type", ""),
            job.get("similarity_score", 0),
            job.get("heuristic_score", 0),
            job.get("final_score", 0),
            job.get("green_flags", ""),
            job.get("red_flags", ""),
            "",  # Hiring Manager Name — fill via Lusha
            "",  # Hiring Manager Email — fill via Lusha
            "",  # LinkedIn URL
            "PENDING",  # Email Status
            "",  # Email Subject
            "",  # Email Body
            "",  # Sent At
            "",  # Reply Received
            "",  # Reply Label
            "",  # Notes
            job.get("scraped_at", datetime.now().isoformat()),
        ]
        
        new_rows.append(row)
        existing.add(key)
        next_id += 1
    
    # Batch write (much faster than one-by-one)
    if new_rows:
        jobs_ws.append_rows(new_rows, value_input_option="USER_ENTERED")
        print(f"  ✅ Added {len(new_rows)} new jobs ({skipped} duplicates skipped)")
    else:
        print(f"  ℹ️ No new jobs to add ({skipped} duplicates skipped)")
    
    print(f"  📊 Sheet URL: {spreadsheet.url}")
    return spreadsheet.url


def get_pending_jobs() -> list:
    """Returns all jobs with status PENDING that have email filled in."""
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    records = jobs_ws.get_all_records()
    
    # Jobs that have a hiring manager email and are still PENDING
    return [
        {"row_index": i + 2, **r}  # +2 because sheet is 1-indexed and has header
        for i, r in enumerate(records)
        if r.get("Email Status") == "PENDING" and r.get("Hiring Manager Email", "").strip()
    ]


def update_job_email(row_index: int, subject: str, body: str, status: str = "DRAFTED"):
    """Updates the email columns for a specific job row."""
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    
    col_map = {h: i + 1 for i, h in enumerate(JOB_COLUMNS)}
    
    jobs_ws.update_cell(row_index, col_map["Email Subject"], subject)
    jobs_ws.update_cell(row_index, col_map["Email Body"], body)
    jobs_ws.update_cell(row_index, col_map["Email Status"], status)


def mark_email_sent(row_index: int):
    """Marks a job as SENT with timestamp."""
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    col_map = {h: i + 1 for i, h in enumerate(JOB_COLUMNS)}
    
    jobs_ws.update_cell(row_index, col_map["Email Status"], "SENT")
    jobs_ws.update_cell(row_index, col_map["Sent At"], datetime.now().isoformat())


def mark_reply_received(row_index: int, label: int):
    """
    Marks a reply received and sets label for classifier training.
    label: 1 = positive (interview/task offered), 0 = rejection/no interest
    """
    client = get_sheet_client()
    spreadsheet = client.open(SPREADSHEET_NAME)
    jobs_ws = spreadsheet.worksheet("Jobs Pipeline")
    col_map = {h: i + 1 for i, h in enumerate(JOB_COLUMNS)}
    
    jobs_ws.update_cell(row_index, col_map["Email Status"], "REPLIED")
    jobs_ws.update_cell(row_index, col_map["Reply Received"], "YES")
    jobs_ws.update_cell(row_index, col_map["Reply Label"], label)
