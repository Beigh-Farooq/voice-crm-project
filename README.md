#  Voice CRM Assistant  
### Voice-first Progressive Web Application for CRM Data Capture

---

## Problem Statement

Sales representatives spend excessive time manually updating CRM systems after customer interactions, leading to productivity loss and delayed updates.

The objective of this project is to build a **voice-first Progressive Web Application (PWA)** where:
- Salesperson speaks interaction details in English
- System converts voice → text
- Extracts structured CRM data
- Generates clean JSON output
- Supports Human-in-the-Loop (HITL) verification
- Can be installed as an Android application (APK)
- **React Native is NOT used**

---

##  Key Requirements Covered

- React (Web)
- Progressive Web App (PWA)
- Mobile + Desktop browsers
- Voice recording
- Speech-to-Text (Whisper – Local)
- Structured JSON extraction
- Backend REST APIs
- Human-in-the-Loop (HITL)
- Evaluation dashboard (10–20 tests)
- CSV / Excel export
- Android APK via Trusted Web Activity (TWA)

---

## Architecture Overview

Frontend (React PWA)
↓ audio/webm
Backend (Django REST API)
↓ Whisper (Local)
Transcription Text
↓ NLP / Regex Extraction
Structured CRM JSON
↓
Evaluation Storage (HITL)
↓
Dashboard + CSV Export



---

## 📂 Project Structure

VOICE-CRM-PROJECT/
│
├── voice-crm-pwa/
│ ├── src/
│ │ ├── Components/
│ │ │ ├── VoiceRecorder.jsx
│ │ │ └── EvalDashboard.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── vite.config.js
│ └── package.json
│
├── voice_crm_backend/
│ ├── voice_crm_backend/
│ │ ├── settings.py
│ │ ├── urls.py
│ │ └── ...
│ ├── voice_api/
│ │ ├── models.py
│ │ ├── views.py
│ │ ├── urls.py
│ │ └── utils.py
│ ├── manage.py
│ ├── requirements.txt
│ └── venv/
│
└── README.md




---

# Frontend Setup (React + PWA)
cd voice-crm-pwa
npm install
npm run dev

# Backend Setup (Django + Whisper)
Prerequisites
Python 3.11

    # Virtual Environment
        cd voice_crm_backend
        py -3.11 -m venv venv
        venv\Scripts\activate
    # 
    pip install -r requirements.txt
    #
    python manage.py migrate
    python manage.py runserver

# APIs

    POST /api/stt/ → Speech to Text
    POST /api/extract/ → Text to JSON
    POST /api/voice-to-json/ → Voice to JSON
    GET /api/evals/ → Evaluation list
    POST /api/evals/{id}/toggle-verify/ → HITL verify
    GET /api/evals/export/ → CSV / Excel


# Human-in-the-Loop (HITL)
    Each AI output is stored
    Human can verify / unverify
    Verified data is trusted for training
    This satisfies:
    “Output generated should have HITL so internal team can verify it and use it to further train it.”

# Evaluation Dashboard

    Shows 10–20 test cases
    Displays transcription & verification status
    CSV export for Excel
    HITL toggle support
