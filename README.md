# Pulse

Personal, read-only news aggregator. Mobile-first feed with AI daily digests and RSS blog posts.

## Stack

- Next.js 14 (App Router) + Tailwind CSS
- Supabase (PostgreSQL)
- Google Gemini 2.5 Flash (with Google Search grounding)
- RSS feeds via `rss-parser`
- GitHub Actions cron (7:00 AM IST)
- Vercel Hobby deployment

## Setup

### 1. Install dependencies

```bash
cd pulse
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/001_init.sql` then `002_summary_and_push.sql` (adds `summary` column) in the SQL editor.
3. Copy your project URL, anon key, and service role key.

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Where to get it |
|---|---|
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API (keep secret) |
| `CRON_SECRET` | Any random string you choose |

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Seed data (manual)

Trigger fetch endpoints locally:

```bash
curl -X POST http://localhost:3000/api/fetch-news -H "x-cron-secret: YOUR_CRON_SECRET"
curl -X POST http://localhost:3000/api/fetch-blogs -H "x-cron-secret: YOUR_CRON_SECRET"
```

### 6. Deploy to Vercel

1. Push to GitHub.
2. Import repo at [vercel.com](https://vercel.com).
3. Add all env variables from `.env.local`.
4. Deploy.

### 7. GitHub Actions cron

In your GitHub repo → **Settings → Secrets and variables → Actions**, add:

| Secret | Value |
|---|---|
| `CRON_SECRET` | Same value as in Vercel env |
| `VERCEL_APP_URL` | `https://your-app.vercel.app` (no trailing slash) |

Manual trigger: **Actions → Daily Feed Fetch → Run workflow**.

## Add to home screen

- **iPhone**: Safari → Share → Add to Home Screen
- **Android**: Chrome → menu → Add to Home Screen

## Project structure

```
pulse/
├── app/
│   ├── page.tsx                 # Feed homepage
│   ├── post/[id]/page.tsx       # Post detail
│   └── api/
│       ├── fetch-news/          # Category A (Gemini)
│       ├── fetch-blogs/         # Category B (RSS)
│       └── posts/               # GET feed + single post
├── components/
├── lib/
├── supabase/migrations/
└── .github/workflows/
```
