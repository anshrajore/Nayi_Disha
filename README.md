# Nayi Disha – AI-Driven Automation of Blue-Collar Job Listings and Personalized Recommendations

## 🚀 Project Overview

**SmartBlueHire** (Project Title: *Nayi Disha*) is an AI-powered platform that automates the collection, categorization, and personalized recommendation of blue-collar job listings. The project addresses inefficiencies in current manual aggregation methods by implementing web crawlers, Natural Language Processing (NLP), and machine learning models to streamline job discovery for seekers while providing powerful dashboards for employers and administrators.

---

## 👥 Team Information

- **Team Name**: Dark Arcane  
- **Team Members**:  
  - Ansh Rajore  
  - Tanvi Diwakar    
- **Contact**:  
  - Email: anshrajore1266@gmail.com  
  - Phone: +91 9096946604

---

## 🧠 Abstract

The traditional process of collecting blue-collar job listings from platforms like NSDC and Skill India is labor-intensive and error-prone. It often results in delays and unstructured, impersonalized job data. Job seekers face overwhelming lists that lack filtering or relevance. 

**SmartBlueHire** introduces an end-to-end AI-powered job discovery platform. It automatically scrapes job data, processes and categorizes it using NLP models, and recommends jobs to users based on semantic similarity. It further provides actionable analytics to employers via dashboards.

---

## 🔍 Problem Statement

Current blue-collar job systems suffer from:
- Manual data ingestion leading to errors and delays
- Inconsistent job formats across platforms
- Lack of personalization for job seekers
- No real-time feedback or filtering mechanisms

### Goal:
Build an AI-powered platform that automates data ingestion, enables job categorization and clustering, and offers real-time, profile-based job recommendations.

---

## 🎯 Objectives

1. Develop a robust scraping engine to gather job listings from various sources.
2. Normalize and preprocess unstructured job data.
3. Classify job roles using NLP techniques.
4. Apply unsupervised learning for clustering based on salary and experience.
5. Implement a recommendation engine for personalized listings.
6. Add real-time filters and tagging mechanisms for users.
7. Design analytics dashboards for employers and administrators.

---

## 💡 Proposed Solution

SmartBlueHire delivers a comprehensive, automated solution for blue-collar job discovery.

### 🔑 Key Functionalities:
- **Automated Job Listing Ingestion**
- **Text Processing & Categorization**
- **Semantic Profile Matching & Personalization**
- **Admin & User Dashboards with Analytics**
- **Continuous Learning for Optimization**

---

## 🏗️ System Architecture

### 1. **Data Ingestion Layer**
- Web Crawlers (Scrapy/Selenium) scrape data from NSDC, Skill India
- ETL Engine cleans, deduplicates, and normalizes job entries
- Scheduler (e.g., Cron) for regular crawl execution

### 2. **NLP & Categorization Layer**
- Tokenization, parsing, skill/role extraction
- Clustering algorithms like K-Means or DBSCAN
- Sentence-BERT encodes profiles & job descriptions
- Cosine similarity for matching

### 3. **User Interaction Layer**
- **Job Seeker Portal**: personalized feeds, filters, profile builder
- **Employer/Admin Dashboard**: listing manager, analytics, fraud detection

### 4. **Database & Analytics**
- MongoDB / PostgreSQL for structured data
- Optional: Elasticsearch for fast filtering
- Analytics for tracking engagement and recommendations

---

## 🧰 Tech Stack

### 🔹 Frontend:
- **React.js** (or Vue.js)
- **Tailwind CSS**
- **shadcn-ui**

### 🔹 Backend:
- **Node.js** + Express.js or **Python** (Flask/FastAPI)

### 🔹 Web Scraping:
- **Python**: Scrapy, Selenium
- Optional: LayoutLM for intelligent block detection

### 🔹 NLP / AI / ML:
- **Transformers (HuggingFace)**: Sentence-BERT
- **scikit-learn**, **spaCy**, **NLTK**
- **Faiss** or **Annoy** for vector search

### 🔹 Database:
- **Supabase** (PostgreSQL-based)
- **MongoDB**

### 🔹 APIs (Optional Enhancements):
- **Google Cloud NLP API**: Entity detection, sentiment
- **Twilio** / **SendGrid**: SMS or email job alerts

---

## ⚙️ Implementation Pipeline

```plaintext
[1] Web Scraping Layer
 ├─ Crawl NSDC, Skill India (Scrapy/Selenium)
 ├─ ML-assisted block detection (HTML/LayoutLM)
 └─ Extract: title, description, salary, experience

[2] Preprocessing Layer
 ├─ Normalize salary units, clean job text
 └─ Handle missing/ambiguous values

[3] Job Role Classification (NLP)
 ├─ Input: title + description
 ├─ Model: Fine-tuned BERT
 └─ Output: e.g., "Electrician", "Plumber"

[4] Salary & Experience Clustering
 ├─ Input: salary, experience
 ├─ Clustering: KMeans / DBSCAN
 └─ Tags: entry-level, mid, senior

[5] Smart Filtering & Tagging
 ├─ Tag example: "Entry-level electrician under ₹20k"
 └─ Store structured data

[6] Output Delivery
 ├─ API via FastAPI
 ├─ Real-time frontend (React / Streamlit)
 └─ JSON / CSV / DB export options
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB or PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. Install frontend dependencies:
```sh
npm install
```

3. Install backend dependencies:
```sh
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend development server:
```sh
npm run dev
```

2. Start the backend server:
```sh
uvicorn app:app --reload
```

---

## 📦 Project Structure

```
/frontend        → React.js app (UI)
/backend         → FastAPI/Flask services
/scrapers        → Web scraping modules
/models          → NLP + clustering models
/database        → MongoDB/Postgres schema
/utils           → Helper functions & scripts
```

---

## 📈 Future Enhancements

- Multilingual support for job seekers  
- AI-driven resume parsing  
- Fraud detection with anomaly detection models  
- Employer verification badges  

---

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

> Built with 💡 by **Ansh Rajore** and team **Dark Arcane**

