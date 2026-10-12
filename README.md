# NextOmni Life: The Intelligent Operating System for Human Flourishing

[![Version](https://img.shields.io/badge/version-2.0.0-emerald.svg)](package.json)
[![CI Pipeline](https://github.com/ezralai/nextomni-life/actions/workflows/ci.yml/badge.svg)](https://github.com/ezralai/nextomni-life/actions/workflows/ci.yml)
[![Architecture](https://img.shields.io/badge/architecture-Decoupled%20Monorepo-indigo.svg)](package.json)
[![Frontend](https://img.shields.io/badge/frontend-Next.js%2015%20%7C%20React%2019-cyan.svg)](apps/web)
[![AI Engine](https://img.shields.io/badge/ai--microservice-FastAPI%20Python%203.14-amber.svg)](apps/ai-engine)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **"NextOmni Life"** is an award-winning, holistic **Personal Life Operating System (LifeOS)** engineered to balance productivity, mental wellness, cognitive focus, circadian chronobiology, and long-term goal execution.

---

## 🌟 The 5 Core Pillars of NextOmni Life

```
+-----------------------------------------------------------------------------+
|                          NEXTOMNI LIFE (LifeOS)                              |
+-----------------------------------------------------------------------------+
|  Pillar 1: Atomic Habits & 365-Day Heatmap (Behavioral Engineering)        |
|  Pillar 2: Deep Work & Focus Engine (Web Audio Ambient Synthesizer)         |
|  Pillar 3: Circadian Rhythm & Energy Optimization (Chronotype Readiness)    |
|  Pillar 4: Reflective Journaling & Mind Gym (AI Sentiment & Private Vault)  |
|  Pillar 5: Life OKRs & Vision Matrix (5 Dimensions & Progress Gauges)       |
+-----------------------------------------------------------------------------+
```

### 1. Atomic Habits & Streak Heatmap (Behavioral Engineering)
- **Flexible Habit Matrix:** Support for daily, weekdays, or custom days with micro-cues and target durations.
- **GitHub-Style Contribution Heatmap:** 365-day SVG habit density grid with 5-tier intensity color mapping.
- **Milestone Rewards:** Real-time celebratory particle bursts and visual reinforcement for 7-day, 30-day, and 100-day streaks.

### 2. Deep Work & Focus Flow Engine (Cal Newport Methodology)
- **Multi-Mode Focus Engine:** Pomodoro Classic (25/5), Ultradian Flow (52/17), and open-ended Flow State stopwatch.
- **Zero-Asset Web Audio Synthesizer:** Pure procedural ambient sound generation (40Hz Gamma binaural beats, pink rain, deep white noise, cafe murmur) requiring zero external audio assets.
- **Distraction Shield & Telemetry Session Log:** Completed focus hours logged against active tasks with friction reflections.

### 3. Circadian Rhythm & Energy Optimization
- **Daily Chronotype Tracker:** Morning sunlight exposure tracker (Huberman protocol) and energy peak forecasting (morning peak, afternoon dip, evening rebound).
- **Sleep & Recovery Log:** Sleep duration, 1-5 star sleep quality rating, and computed Morning Readiness Score.
- **Wind-Down Prompts:** Afternoon caffeine cutoff reminders (14:00) and evening screen wind-down rituals.

### 4. Reflective Journaling & Mind Gym (AI Sentiment Analysis)
- **Daily Micro-Debriefs:** AM Intentions (top 3 needle-movers) and PM Gratitude (wins + cognitive reframing).
- **AI Sentiment & Pattern Extraction:** Automated synthesis via Google Gemini / local fallback highlighting weekly emotional resilience, mood trends, and stressors.
- **Private Vault:** End-to-end encrypted reflection storage with client-side masking.

### 5. Life OKRs & Vision Architecture
- **Hierarchical Goals:** Multi-year Life Visions $\rightarrow$ Annual Objectives $\rightarrow$ Quarterly Key Results $\rightarrow$ Daily Action Items.
- **Progress Gauges:** Dynamic circular SVG completion rings across 5 life dimensions (Health, Career, Finances, Relationships, Learning).

---

## 🏛 System Architecture & Tech Stack

```
c:\ezra-projects\NextOmni Life/
├── apps/
│   ├── web/                    # Next.js 15 App Router Frontend, PWA, Tailwind CSS
│   │   ├── public/             # PWA manifest.json, icons, metadata
│   │   └── src/
│   │       ├── app/            # Next.js App Router (/(dashboard)/life, /study, etc.)
│   │       ├── components/     # LifeOS components (Habits, Focus, Circadian, OKRs)
│   │       └── lib/            # Web Audio Synthesizer, API client, offline store
│   └── ai-engine/              # FastAPI Python Microservice (Port 8000)
│       ├── routers/            # /api/v1/life, /tips, /statements, /digest
│       └── services/           # Gemini AI service with deterministic fallback
├── packages/
│   ├── database/               # Prisma ORM schema & client with expanded Life models
│   └── types/                  # Cross-monorepo TypeScript interfaces
└── scripts/
    └── dev.ps1                 # Local multi-service concurrent dev orchestrator
```

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Lucide Icons.
- **Design Aesthetic:** Deep Obsidian (`#080c14`), Dark Slate Glass (`#121827`), Electric Emerald (`#10b981`), Neural Violet (`#8b5cf6`), Warm Amber (`#f59e0b`).
- **AI Microservice:** FastAPI Python (Uvicorn, Google GenAI SDK, fallback heuristics).
- **Persistence:** Prisma ORM with PostgreSQL / SQLite compatibility.
- **Offline & PWA:** Standalone PWA manifest, localStorage caching, and background sync.

---

## 🚀 Rapid Development Runbook

### Prerequisites
- Node.js >= 18 (Tested on Node v24)
- Python >= 3.10 (Tested on Python 3.14)
- PowerShell (Windows)

### 1. Boot Local Development (One Command)
Run the automated orchestrator from the monorepo root:
```powershell
powershell -ExecutionPolicy Bypass -File ./scripts/dev.ps1
```
This concurrently initializes:
- **NextOmni Life Web (PWA)**: [http://localhost:3000/life](http://localhost:3000/life)
- **FastAPI AI Compute Engine**: [http://localhost:8000](http://localhost:8000) (Interactive Swagger Docs at [http://localhost:8000/docs](http://localhost:8000/docs))

### 2. Standalone Service Commands
```powershell
# Web Application Only
npm run dev:web

# FastAPI AI Engine Only
npm run dev:ai

# Run Automated Test Suite
npm run test
```

---

## 🔄 CI/CD Automation & Deployment

This monorepo utilizes an automated GitHub Actions CI/CD matrix ([`.github/workflows/`](.github/workflows/)):

### 1. Continuous Integration (`ci.yml`)
- **Database Schema Audit:** Validates Prisma schema integrity (`prisma validate`) and generates client artifacts.
- **Web App Quality Gate:** Executes TypeScript type checking (`npm run lint`) and production bundle compilation (`next build`).
- **AI Microservice Quality Gate:** Runs Python 3.11 & 3.12 test matrix executing unit tests for dynamic prompts and weekly debrief syntheses.
- **Docker Smoke Tests:** Builds multi-stage production container images with caching to guarantee deployability.

### 2. Continuous Delivery (`cd.yml`)
- Automatically packages and publishes multi-architecture OCI container images to **GitHub Container Registry (GHCR)**:
  - `ghcr.io/ezralai/nextomni-life/web:latest`
  - `ghcr.io/ezralai/nextomni-life/ai-engine:latest`

### 3. Docker Compose Orchestration
Run the entire production-grade stack locally using Docker:
```bash
docker compose up -d --build
```
- **Web App (PWA):** http://localhost:3000
- **FastAPI Neural Engine:** http://localhost:8000
- **PostgreSQL Database:** localhost:5432

---

## 🔒 Security & Privacy Vault
User external AI keys (Google Gemini, OpenRouter) are handled with isolated memory execution without leakage into application telemetry. Private reflections can be locked behind a client-side hashed vault.

---

## 📄 License
Licensed under the [MIT License](LICENSE).
