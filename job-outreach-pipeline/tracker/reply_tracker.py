# =============================================================
# tracker/reply_tracker.py — Reply tracking + classifier training
# =============================================================

import json
import pickle
import os
from datetime import datetime
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import numpy as np


# =============================================================
# REPLY CHECKER (Manual prompt-based — no Gmail API needed)
# =============================================================

def check_replies_interactive(sent_jobs: list) -> list:
    """
    Interactive CLI to manually mark replies.
    Run this daily — takes 2 minutes.
    """
    print("\n📬 Reply Checker — Mark any replies you've received")
    print("=" * 50)
    
    updates = []
    
    for job in sent_jobs:
        company = job.get("Company", "Unknown")
        role = job.get("Title", "Unknown")
        sent_at = job.get("Sent At", "Unknown")
        
        print(f"\nCompany: {company}")
        print(f"Role:    {role}")
        print(f"Sent:    {sent_at}")
        print(f"Reply?  [y/n/skip]: ", end="")
        
        response = input().strip().lower()
        
        if response == "skip":
            continue
        elif response == "y":
            print(f"Label — [1] Positive (interested/task given)  [0] Negative (rejection): ", end="")
            label = int(input().strip())
            updates.append({
                "row_index": job.get("row_index"),
                "company": company,
                "label": label,
                "has_reply": True,
            })
            print(f"  ✅ Marked as {'POSITIVE' if label == 1 else 'NEGATIVE'}")
        elif response == "n":
            updates.append({
                "row_index": job.get("row_index"),
                "company": company,
                "label": -1,  # -1 = no reply yet
                "has_reply": False,
            })
    
    return updates


# =============================================================
# CLASSIFIER TRAINER
# =============================================================

class EmailClassifier:
    """
    Trains a classifier on your email reply data.
    Predicts: will this email get a positive reply?
    
    Starts being useful after ~20-30 labeled data points.
    """
    
    def __init__(self, model_path="email_classifier.pkl"):
        self.model_path = model_path
        self.vectorizer = TfidfVectorizer(max_features=500, ngram_range=(1, 2))
        self.model = LogisticRegression(class_weight="balanced", max_iter=1000)
        self.is_trained = False
    
    def _prepare_features(self, records: list) -> tuple:
        """Prepares text features and labels from sheet records."""
        X_texts = []
        y = []
        
        for r in records:
            label = r.get("Reply Label", "")
            if label not in [0, 1, "0", "1"]:
                continue
            
            # Combine email features into one text
            text = " ".join([
                str(r.get("Company", "")),
                str(r.get("Title", "")),
                str(r.get("Company Type", "")),
                str(r.get("Email Subject", "")),
                str(r.get("Email Body", ""))[:500],
                str(r.get("Green Flags", "")),
            ])
            
            X_texts.append(text)
            y.append(int(label))
        
        return X_texts, y
    
    def train(self, records: list):
        """Trains classifier on labeled data from sheet."""
        X_texts, y = self._prepare_features(records)
        
        if len(X_texts) < 10:
            print(f"  ⚠️ Only {len(X_texts)} labeled examples — need at least 10 to train")
            print(f"  Keep collecting replies and run again!")
            return False
        
        print(f"\n🤖 Training classifier on {len(X_texts)} examples...")
        print(f"  Positive replies: {sum(y)}, Negative: {len(y) - sum(y)}")
        
        X = self.vectorizer.fit_transform(X_texts)
        
        if len(X_texts) >= 20:
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            self.model.fit(X_train, y_train)
            y_pred = self.model.predict(X_test)
            print("\n  Classification Report:")
            print(classification_report(y_test, y_pred, target_names=["Negative", "Positive"]))
        else:
            self.model.fit(X, y)
            print("  ✅ Trained on all data (too few for train/test split)")
        
        # Save model
        with open(self.model_path, "wb") as f:
            pickle.dump({"vectorizer": self.vectorizer, "model": self.model}, f)
        
        self.is_trained = True
        print(f"  ✅ Model saved to {self.model_path}")
        return True
    
    def load(self):
        """Loads a previously trained model."""
        if os.path.exists(self.model_path):
            with open(self.model_path, "rb") as f:
                data = pickle.load(f)
            self.vectorizer = data["vectorizer"]
            self.model = data["model"]
            self.is_trained = True
            print(f"  ✅ Loaded classifier from {self.model_path}")
            return True
        return False
    
    def predict_proba(self, job: dict) -> float:
        """Predicts probability that emailing this job will get a positive reply."""
        if not self.is_trained:
            return 0.5  # Neutral if not trained yet
        
        text = " ".join([
            str(job.get("company", "")),
            str(job.get("title", "")),
            str(job.get("company_type", "")),
            str(job.get("green_flags", "")),
        ])
        
        X = self.vectorizer.transform([text])
        proba = self.model.predict_proba(X)[0][1]  # P(positive)
        return round(float(proba), 3)
    
    def rerank_with_classifier(self, jobs: list) -> list:
        """Re-ranks jobs using classifier predictions if model is trained."""
        if not self.is_trained:
            print("  ℹ️ Classifier not trained yet — using heuristic scores only")
            return jobs
        
        print("\n🤖 Re-ranking jobs with trained classifier...")
        for job in jobs:
            p = self.predict_proba(job)
            job["classifier_score"] = p
            # Blend: 60% existing score + 40% classifier
            job["final_score"] = round(job.get("final_score", 50) * 0.6 + p * 100 * 0.4, 1)
        
        return sorted(jobs, key=lambda x: x["final_score"], reverse=True)
