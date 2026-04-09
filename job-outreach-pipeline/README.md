# Job Outreach Intelligence Pipeline — Amay Dixit

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Selenium](https://img.shields.io/badge/Selenium-Automation-green)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-ML-orange)
![Pandas](https://img.shields.io/badge/Pandas-Data%20Processing-purple)
![OpenAI](https://img.shields.io/badge/OpenAI-LLM-black)
![Google Sheets API](https://img.shields.io/badge/Google%20Sheets-API-success)

An end-to-end automation system for sourcing, scoring, personalizing, and tracking job outreach — with continuous learning through reply classification.

Author: Amay Dixit  
GitHub: https://github.com/amaydixit11

---

## Overview

This project transforms cold outreach into a structured, measurable pipeline.

It automates:

- Job scraping  
- Opportunity scoring  
- Personalized email generation  
- Human approval workflow  
- Reply tracking  
- Response prediction using machine learning  

The system improves over time by learning which outreach strategies generate positive replies.

---

## System Architecture

```
Job Scraper (Selenium / Requests)  
        ↓  
Google Sheets (Central Data Store)  
        ↓  
Scoring Engine (Feature-Based Ranking)  
        ↓  
Email Generator (LLM)  
        ↓  
Human Review  
        ↓  
Send & Track  
        ↓  
Reply Classifier (Logistic Regression)  
```

---

## Tech Stack

### Language
- Python 3.10+

### Automation
- Selenium
- requests
- BeautifulSoup

### Data & Machine Learning
- pandas
- numpy
- scikit-learn (Logistic Regression)

### AI Integration
- OpenAI API (LLM-based email drafting)

### Cloud Integration
- Google Sheets API
- Google Drive API

### Dev Tools
- dotenv (.env management)
- Git

---

## Key Features

### 1. Job Scraping
Automated ingestion of job listings into a centralized Google Sheet.

### 2. Opportunity Scoring
Heuristic + feature-based ranking of opportunities before outreach.

### 3. Personalized Email Generation
Context-aware, structured email drafts generated using LLM prompts.

### 4. Human-in-the-Loop Approval
All emails require manual review before sending.

### 5. Reply Tracking
Systematic tracking of outreach outcomes.

### 6. Continuous Learning
A logistic regression classifier predicts reply probability and re-ranks future opportunities.

Mathematically:

```
P(Reply) = σ(wᵀx)
```

Where:
- x = email + opportunity features  
- w = learned weights  
- σ = sigmoid function  

---

## Installation

### Clone Repository

```bash
git clone https://github.com/amaydixit11/job-outreach-pipeline.git  
cd job-outreach-pipeline  
```

### Install Dependencies

```bash
pip install -r requirements.txt  
```

---

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```
OPENAI_API_KEY=your_key_here  
```

Never commit this file.

---

### Google Sheets API Setup

1. Go to https://console.cloud.google.com  
2. Create a new project  
3. Enable:
   - Google Sheets API  
   - Google Drive API  
4. Create a Service Account  
5. Download the JSON key  
6. Save it as:

```
credentials.json  
```

7. Share your Google Sheet with the service account email  
   (format: xxx @xxx.iam.gserviceaccount.com)

---

## Daily Workflow

Scrape New Opportunities:
```bash
python main.py scrape  
```

Generate Emails:
```bash
python main.py emails  
```

Review Drafts:
```bash
python main.py review  
```

Send Emails:
```bash
python main.py send  
```

Track Replies:
```bash
python main.py track  
```

---

## Security Practices

Ensure `.gitignore` includes:

```
.env  
credentials.json  
__pycache__/  
*.log  
```

Never commit API keys or credential files.

---

## Roadmap

- Embedding-based company alignment scoring  
- A/B testing framework for subject lines  
- Multi-armed bandit email optimization  
- Automated follow-up scheduling  
- CRM-style analytics dashboard  

---

## License

MIT License
