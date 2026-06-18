<div align="center">

<img src="https://img.shields.io/badge/EcoTwin-AI-4ADE80?style=for-the-badge&logo=leaf&logoColor=white" alt="EcoTwin AI" height="40"/>

# 🌍 EcoTwin AI
### *Meet Your Future Climate Self*

> **The world's first AI-powered Digital Climate Twin platform** — predicting your environmental future and showing you exactly how to change it.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq_AI-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

<br/>

**[🚀 Live Demo](https://ecotwin-ai.vercel.app)** · **[📹 Demo Video](#)** · **[📊 Presentation](#)**

<br/>

<img src="https://img.shields.io/badge/🌱_Free_Forever-4ADE80?style=flat-square&labelColor=0a0f0d" />
<img src="https://img.shields.io/badge/🤖_AI_Powered-4ADE80?style=flat-square&labelColor=0a0f0d" />
<img src="https://img.shields.io/badge/🌍_Open_Source-4ADE80?style=flat-square&labelColor=0a0f0d" />
<img src="https://img.shields.io/badge/⚡_Production_Ready-4ADE80?style=flat-square&labelColor=0a0f0d" />

</div>

---

## 🎯 The Problem

> **Climate change is abstract. Personal action feels impossible.**

- 73% of people want to reduce their carbon footprint but don't know where to start
- Existing tools show numbers — not stories, not futures, not hope
- Generic advice doesn't drive real behavior change
- People can't connect today's habits to tomorrow's planet

---

## 💡 Our Solution — The AI Climate Twin

Instead of showing users a boring dashboard of numbers, **EcoTwin AI creates a Digital Climate Twin** — a real-time AI simulation of who you'll become based on your current choices, and who you *could* become if you made smarter ones.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   😐 Current You          🌟 Net Zero You                   │
│   ─────────────           ──────────────                    │
│   6.4t CO₂/yr    →→→→→   1.8t CO₂/yr                      │
│   EcoScore: 42            EcoScore: 91                      │
│   Cost: ₹4.8L/10yr        Cost: ₹1.4L/10yr                 │
│   24 trees needed         3 trees needed                    │
│                                                             │
│              AI-calculated in real time                     │
└─────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI Climate Twin
Generate 3 future scenarios — **Current**, **Improved**, and **Net Zero** — with real CO₂, money, and tree savings calculated using IPCC emission factors.

### 📊 Carbon Calculator
Multi-step assessment across **transport, food, home energy, and shopping** — powered by real EPA/IPCC emission data.

### 🎛️ AI Lifestyle Simulator
Move sliders in real time. **Watch your CO₂, costs, and eco-score change instantly** — powered by live carbon calculations.

### 🤖 AI Sustainability Coach
**Groq-powered LLM chatbot** (Llama 3.3) that answers your exact sustainability questions — not generic advice.

### 📸 AI Receipt Scanner
Upload any bill or receipt — **Gemini Vision AI** reads it and instantly estimates carbon impact.

</td>
<td width="50%">

### 🗺️ Carbon Heatmap
Visual breakdown of your **highest to lowest emission categories** — know exactly where to act first.

### 🌳 Living Eco Avatar
A virtual forest/ecosystem that **grows with your good habits** and shrinks with bad ones — emotional engagement at its best.

### 🏆 Gamification Engine
**XP, levels, badges, streaks, and challenges** — from Eco Starter to Earth Hero. Sustainability made addictive.

### 👥 Community Challenges
**No Car Week, Plastic Free July, Energy Save Month** — join thousands in collective climate action.

### 🌐 Global Leaderboard
Compete with friends, your city, country, and the world. **Anonymous participation** always supported.

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     EcoTwin AI Platform                    │
├─────────────────────┬──────────────────────────────────────┤
│   Frontend          │   Backend                            │
│   ─────────         │   ───────                            │
│   Next.js 14        │   Next.js API Routes                 │
│   TypeScript        │   NextAuth.js                        │
│   Tailwind CSS      │   MongoDB Atlas                      │
│   Framer Motion     │   Mongoose ODM                       │
│   Recharts          │                                      │
│   Zustand           │   AI/ML Services                     │
│                     │   ──────────────                     │
│                     │   Groq (Llama 3.3) — AI Coach        │
│                     │   Gemini Vision — Receipt OCR        │
│                     │   Custom Carbon Engine               │
│                     │   IPCC Emission Factors              │
├─────────────────────┴──────────────────────────────────────┤
│   Infrastructure (100% Free Tier)                          │
│   Vercel (Frontend + API) · MongoDB Atlas M0               │
│   Google OAuth · OpenWeather · OpenAQ                      │
└────────────────────────────────────────────────────────────┘
```

---

## 🧮 Carbon Calculation Engine

Our proprietary carbon engine uses **real IPCC & EPA emission factors**:

| Source | Factor | Basis |
|--------|--------|-------|
| Car | 0.21 kg CO₂/km | EPA 2023 |
| Flight (long-haul) | 900 kg CO₂/flight | IPCC AR6 |
| India Grid Electricity | 0.82 kg CO₂/kWh | CEA 2023 |
| Beef diet | 3.3t CO₂/year | FAO 2023 |
| Vegan diet | 1.5t CO₂/year | FAO 2023 |
| Fast fashion | 0.8t CO₂/year | UNEP 2023 |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/ecotwin-ai.git
cd ecotwin-ai
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any-random-string

# MongoDB Atlas (Free) — mongodb.com/atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecotwin

# Google OAuth (Free) — console.cloud.google.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Groq AI (Free) — console.groq.com
GROQ_API_KEY=gsk_...

# Gemini Vision (Free) — aistudio.google.com
GEMINI_API_KEY=AIzaSy...
```

### 3. Seed Database & Run

```bash
npm run seed    # Add demo leaderboard data
npm run dev     # Start development server
```

Open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📁 Project Structure

```
ecotwin-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── dashboard/               # User dashboard (real data)
│   │   ├── calculator/              # 4-step carbon calculator
│   │   ├── twin/                    # AI Climate Twin
│   │   ├── coach/                   # AI Chat Coach
│   │   ├── community/               # Leaderboard + Challenges
│   │   ├── auth/signin/             # Sign in (Email + Google)
│   │   ├── auth/signup/             # Create account
│   │   └── api/
│   │       ├── carbon/calculate/    # Carbon footprint engine
│   │       ├── carbon/profile/      # User profile API
│   │       ├── twin/generate/       # Climate Twin generation
│   │       ├── coach/chat/          # Groq AI chat
│   │       ├── receipt/scan/        # Gemini Vision OCR
│   │       ├── community/           # Leaderboard + Challenges
│   │       └── environment/         # Weather + AQI (free APIs)
│   ├── components/
│   │   ├── layout/                  # Navbar, Footer, UserMenu
│   │   └── features/                # All feature components
│   ├── lib/
│   │   ├── carbon.ts                # IPCC/EPA emission engine
│   │   ├── gemini.ts                # Gemini AI helper
│   │   ├── mongodb.ts               # DB connection
│   │   └── auth.ts                  # NextAuth config
│   ├── models/                      # MongoDB schemas
│   ├── hooks/                       # Custom React hooks
│   ├── store/                       # Zustand global state
│   └── types/                       # TypeScript definitions
├── scripts/
│   └── seed.js                      # Demo data seeder
└── public/
```

---

## 🌐 Deployment

### Deploy to Vercel (Free)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy EcoTwin AI"
git push

# 2. Import on Vercel
# Go to vercel.com → New Project → Import your repo
# Add all environment variables from .env.local
# Click Deploy
```

### Post-deploy: Update OAuth Redirect URI

In Google Cloud Console, add:
```
https://your-project.vercel.app/api/auth/callback/google
```

---

## 🎯 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/carbon/calculate` | POST | Calculate carbon footprint |
| `/api/carbon/profile` | GET | Get user's saved profile |
| `/api/twin/generate` | POST | Generate AI Climate Twin |
| `/api/coach/chat` | POST | Groq AI sustainability coach |
| `/api/receipt/scan` | POST | Gemini Vision receipt OCR |
| `/api/community/leaderboard` | GET | Global/city/country rankings |
| `/api/community/challenges` | GET/POST | Challenges + join |
| `/api/environment/insights` | GET | Live AQI + weather |
| `/api/auth/signup` | POST | Create email account |

---

## 🏆 Hackathon Highlights

| Category | Our Approach |
|----------|-------------|
| **Innovation** | First platform with a real Digital Climate Twin — not a dashboard, a simulation of your future self |
| **AI Usage** | Groq LLM (real-time chat), Gemini Vision (receipt OCR), Custom carbon ML engine |
| **Sustainability Impact** | Direct behavior change through emotional storytelling + gamification |
| **Technical Complexity** | Full-stack Next.js, MongoDB, NextAuth, 9 API routes, real emission factor database |
| **Scalability** | 100% free-tier deployable, serverless, MongoDB Atlas scales to millions |
| **User Engagement** | XP, badges, streaks, leaderboard, community challenges — proven engagement loops |
| **Real-world Adoption** | Calculator works without login, progressive enhancement, mobile-first |

---

## 📊 Impact Metrics

```
One user switching from:
  High-meat diet → Vegetarian     = -0.8t CO₂/year
  Car → Public transport (daily)  = -1.5t CO₂/year  
  1 less long-haul flight         = -0.9t CO₂/year
  Fast fashion → Second-hand      = -0.6t CO₂/year
  ──────────────────────────────────────────────────
  Total potential saving          = -3.8t CO₂/year
  = 72% footprint reduction
  = Equivalent to planting 181 trees
  = ₹28,500 saved per year
```

---

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Real Tesseract.js OCR integration
- [ ] Carbon offset marketplace
- [ ] Team/Organization dashboards
- [ ] Smart home device integration
- [ ] Multi-language (Hindi, Spanish, etc.)
- [ ] Public API for third-party developers
- [ ] ML-powered personalized recommendations

---

## 👥 Team

Built with ❤️ for the planet at **[Hackathon Name]**

---

## 📜 License

MIT License — free to use, modify, and distribute.

```
Copyright (c) 2025 EcoTwin AI
```

---

<div align="center">

**⭐ Star this repo if EcoTwin AI inspired you to think about your carbon footprint!**

<br/>

Made with 🌱 for a greener tomorrow

**[🚀 Live Demo](https://ecotwin-ai.vercel.app)** · **[🐛 Report Bug](https://github.com/yourusername/ecotwin-ai/issues)** · **[💡 Request Feature](https://github.com/yourusername/ecotwin-ai/issues)**

</div>
