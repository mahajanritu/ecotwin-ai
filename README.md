# 🌍 EcoTwin AI — Meet Your Future Climate Self

> An AI-powered carbon footprint platform that gives every user a **Digital Climate Twin** — a real-time prediction of who they'll become if they keep their current habits, vs. who they could become with greener choices.

Built with **Next.js 14, TypeScript, Tailwind CSS, Framer Motion, MongoDB Atlas, and Google Gemini** — 100% free-tier, deployable at zero cost.

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **AI Climate Twin** | 3 future scenarios — Current, Improved, Net Zero — with CO₂, money, and tree savings |
| 2 | **AI Receipt Scanner** | Upload bills/receipts → OCR + AI estimates carbon impact |
| 3 | **Carbon Calculator** | Multi-step assessment across transport, food, home, shopping |
| 4 | **AI Lifestyle Simulator** | Real-time sliders predict CO₂/cost impact instantly |
| 5 | **Carbon Heatmap** | Visual ranking of your biggest emission sources |
| 6 | **Sustainability Coach** | AI chat + daily/weekly/monthly action plans |
| 7 | **Eco Avatar / Ecosystem** | Virtual forest/river/wildlife that reflects your habits |
| 8 | **Gamification Engine** | XP, levels, badges, streaks |
| 9 | **Community Challenges** | No Car Week, Plastic Free July, etc. |
| 10 | **Leaderboard** | City / Country / Global rankings |
| 11 | **Learning Hub** | Climate education modules (extendable) |
| 12 | **Dashboard** | Trends, achievements, impact metrics |
| 13 | **Impact Visualizer** | CO₂ → trees, km driven, flights, coal burned |
| 14 | **Environmental Insights** | Live AQI + weather via free APIs |

---

## 🏗️ Tech Stack (100% Free Tier)

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Charts | Recharts |
| State | Zustand |
| Auth | NextAuth.js + Google OAuth |
| Database | MongoDB Atlas (Free M0 cluster) |
| AI | Google Gemini API (free tier) |
| OCR | Tesseract.js / Hugging Face (free) |
| Weather/AQI | OpenWeather + OpenAQ (free) |
| Hosting | Vercel (frontend+API) — free Hobby tier |

---

## 📂 Folder Structure

```
ecotwin-ai/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout
│   │   ├── dashboard/page.tsx     # User dashboard
│   │   ├── calculator/page.tsx    # Carbon calculator
│   │   ├── twin/page.tsx          # AI Climate Twin
│   │   ├── coach/page.tsx         # AI Sustainability Coach
│   │   ├── community/page.tsx     # Leaderboard + Challenges
│   │   └── api/                   # API routes (serverless functions)
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── carbon/calculate/route.ts
│   │       ├── twin/generate/route.ts
│   │       ├── coach/chat/route.ts
│   │       ├── receipt/scan/route.ts
│   │       ├── community/leaderboard/route.ts
│   │       ├── community/challenges/route.ts
│   │       └── environment/insights/route.ts
│   ├── components/
│   │   ├── layout/                # Navbar, Footer
│   │   └── features/              # Feature components
│   ├── lib/                       # Utilities, carbon engine, Gemini, MongoDB
│   ├── models/                    # Mongoose schemas
│   ├── store/                     # Zustand global state
│   ├── styles/                    # Global CSS
│   └── types/                     # TypeScript types
├── scripts/seed.js                # Demo data seeder
├── public/                        # Static assets
├── .env.example                   # Environment variable template
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## 🚀 Setup & Run Locally (Step by Step)

### Prerequisites
- **Node.js 18+** installed ([download here](https://nodejs.org))
- A code editor (VS Code recommended)
- Git installed

### 1. Extract / Clone the project

```bash
cd ecotwin-ai
```

### 2. Install dependencies

```bash
npm install
```

> This installs Next.js, React, Tailwind, Framer Motion, Mongoose, NextAuth, Recharts, and all other packages.

### 3. Configure environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the values (see [Getting Free API Keys](#-getting-free-api-keys-5-minutes) below). **For a quick local run**, you can leave most fields blank — the app gracefully falls back to demo data and mock AI responses when keys are missing.

Minimum required for a fully working local demo:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=any-random-string-for-dev
```

### 4. Run the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser. 🎉

The app will run fully — calculator, AI Twin, simulator, gamification, community pages all work with smart fallbacks even without MongoDB/Gemini configured.

### 5. (Optional) Connect MongoDB Atlas for persistence

See [MongoDB Setup](#mongodb-atlas-free-setup) below, then add `MONGODB_URI` to `.env.local` and run:

```bash
npm run seed   # populates demo leaderboard + challenges
```

### 6. Build for production

```bash
npm run build
npm run start
```

---

## 🔑 Getting Free API Keys (5 minutes)

### MongoDB Atlas (Free M0 Cluster)
1. Go to [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account → Create a **Shared/Free (M0)** cluster
3. Database Access → Add a user with password
4. Network Access → Add IP `0.0.0.0/0` (allow from anywhere, for dev)
5. Click **Connect** → "Drivers" → copy the connection string
6. Paste into `.env.local` as `MONGODB_URI`, replacing `<password>` with your DB user's password

### Google OAuth (Free)
1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → APIs & Services → Credentials
3. Create **OAuth Client ID** (type: Web application)
4. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Copy Client ID & Secret into `.env.local`

### Google Gemini API (Free Tier)
1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Click **Create API Key** (free, generous quota)
3. Paste into `.env.local` as `GEMINI_API_KEY`

### OpenWeather (Free Tier)
1. Sign up at [openweathermap.org/api](https://openweathermap.org/api)
2. Generate a free API key
3. Paste into `.env.local` as `OPENWEATHER_API_KEY`

### Cloudinary (Free Tier, optional — for image uploads)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Dashboard → copy Cloud Name, API Key, API Secret

---

## 🗄️ MongoDB Atlas — Free Setup (Detailed)

1. **Sign up**: [mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. **Build a Database** → choose **M0 Free** tier → pick a cloud provider/region close to you
3. **Create cluster** (takes ~3 minutes to provision)
4. **Database Access**: Create a username/password (save these!)
5. **Network Access**: Add IP Address → `0.0.0.0/0` (for development; restrict in production)
6. **Connect** → Drivers → Node.js → copy connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/ecotwin?retryWrites=true&w=majority
   ```
7. Replace `<username>` and `<password>`, paste into `.env.local` → `MONGODB_URI`
8. Run `npm run seed` to populate demo leaderboard data

---

## 🌐 Deployment Guide (100% Free)

### Deploy to Vercel (Recommended — Frontend + API Routes)

1. **Push your code to GitHub** (see [Git/GitHub Setup](#-gitgithub-setup) below)
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
3. Click **New Project** → Import your `ecotwin-ai` repository
4. Vercel auto-detects Next.js — no config needed
5. Add **Environment Variables** (same as your `.env.local`):
   - `NEXTAUTH_URL` → `https://your-project.vercel.app`
   - `NEXTAUTH_SECRET`
   - `MONGODB_URI`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - `GEMINI_API_KEY`
   - `OPENWEATHER_API_KEY`
6. Click **Deploy** 🚀
7. After deploy, update your Google OAuth redirect URI to:
   `https://your-project.vercel.app/api/auth/callback/google`

### Alternative: Render (Free Tier)

1. Go to [render.com](https://render.com) → New → Web Service
2. Connect your GitHub repo
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add the same environment variables as above
6. Deploy

---

## 🔧 Git / GitHub Setup

If you haven't initialized git yet:

```bash
cd ecotwin-ai
git init
git add .
git commit -m "Initial commit: EcoTwin AI platform"
```

### Create a new GitHub repository

1. Go to [github.com/new](https://github.com/new)
2. Name it `ecotwin-ai` (or anything you like)
3. **Do NOT** initialize with README/gitignore (we already have them)
4. Click **Create repository**

### Push your code

```bash
git remote add origin https://github.com/<your-username>/ecotwin-ai.git
git branch -M main
git push -u origin main
```

### Future updates

```bash
git add .
git commit -m "Describe your changes"
git push
```

> ⚠️ **Never commit `.env.local`** — it's already in `.gitignore`. Only commit `.env.example`.

---

## 🧪 Running in VS Code (Step by Step)

1. Open VS Code → **File → Open Folder** → select `ecotwin-ai`
2. Open the integrated terminal: **Terminal → New Terminal** (or `` Ctrl+` ``)
3. Run:
   ```bash
   npm install
   ```
4. Create `.env.local` (copy from `.env.example` using the Explorer panel, or run `cp .env.example .env.local` in the terminal)
5. Run:
   ```bash
   npm run dev
   ```
6. Hold `Ctrl` (or `Cmd` on Mac) and click the `http://localhost:3000` link in the terminal output — it opens in your browser
7. Edit any file in `src/` — the browser hot-reloads automatically

**Recommended VS Code Extensions:**
- ESLint
- Tailwind CSS IntelliSense
- Prettier
- ES7+ React/Redux/React-Native snippets

---

## 🏆 Hackathon Presentation Points

1. **The Core Hook**: Instead of a boring dashboard, users get a **Digital Climate Twin** — a tangible, emotional "future self" they can compare against.
2. **Real AI, Not Gimmicks**: Gemini powers the coach, twin narratives, and action plans — all on the free tier.
3. **Gamification That Works**: XP, streaks, ecosystems, and leaderboards drive daily return visits — critical for real-world behavior change.
4. **Zero-Cost Architecture**: Every single service used has a generous free tier — this can scale to thousands of users at $0/month.
5. **Production-Grade UI**: Glassmorphism, dark mode, smooth Framer Motion animations — feels like a funded startup, not a hackathon prototype.
6. **Real-World Data**: OpenWeather + OpenAQ integration ties personal action to local environmental conditions.

## 🎬 Judge Demo Flow (Suggested 3-Minute Walkthrough)

1. **Landing page** (20s) — Hero with animated Earth, live stats, feature grid
2. **Calculator** (40s) — Walk through the 4-step assessment, show instant EcoScore
3. **AI Climate Twin** (60s) — The "wow" moment: Current vs Net Zero comparison, then drag the Lifestyle Simulator sliders live
4. **Eco Avatar** (20s) — Show the living ecosystem visualization
5. **AI Coach** (30s) — Type a question, show Gemini-powered response + action plans
6. **Community** (30s) — Leaderboard, challenges, receipt scanner demo

---

## 🗺️ Future Roadmap

- [ ] Mobile app (React Native) sharing the same API
- [ ] Real Tesseract.js / Hugging Face OCR integration for receipts
- [ ] Push notifications for streaks and challenges
- [ ] Carbon offset marketplace integration (verified, free-tier partners)
- [ ] Multi-language support (Hindi, Spanish, etc.)
- [ ] Team/Organization dashboards for companies & schools
- [ ] Integration with smart home devices (energy monitors)
- [ ] Public API for third-party developers

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 🙌 Credits

Built with ❤️ for the planet using Next.js, Tailwind CSS, Framer Motion, MongoDB Atlas, and Google Gemini.
