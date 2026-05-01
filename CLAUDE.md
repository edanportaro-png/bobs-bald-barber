@AGENTS.md

# Bob's Bald Barber — Lead Intake App

A single-page lead capture form for Bob's Bald Barber. Collects name, email, and phone number, then emails the lead to the salon owner via Resend.

## Design Rules

### Visual Style
- Brand: Bold & confident
- Mode: Light
- Primary accent: #1A1A2E (deep navy)
- Secondary accent: #C41E3A (barber red)
- Background: #F8FAFC
- Body text: #1C1C1E

### Typography
- Display font: Plus Jakarta Sans
- Body font: DM Sans
- Heading sizes: Aggressive — H1 ~48px

### Spacing & Rhythm
- 8px base grid (use multiples: 4, 8, 12, 16, 24, 32, 48, 64)
- Card padding: 32px
- Vertical rhythm: 8px between related elements, 24px between sections

### Components
- Buttons: filled #1A1A2E with subtle shadow, rounded 8px
- Cards: white, 1px border #E2E8F0, rounded 12px, soft shadow
- Inputs: 1px border #E2E8F0, rounded 8px, 16px padding

### Hard Don'ts
- No Bootstrap or Material UI
- No stock photo placeholders
- No emoji as decorative bullets
- No gradient backgrounds
- No abstract decorative shapes

## Tech Stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Email: Resend
- Hosting: Vercel

## Environment Variables
- `RESEND_API_KEY` — Resend API key (full access)
- `OWNER_EMAIL` — edan@grpc.biz

## Key Files
- `app/page.tsx` — landing page with the lead form
- `app/api/submit-lead/route.ts` — API route that sends email via Resend
- `app/layout.tsx` — root layout, fonts loaded here
- `.env.local` — secrets (never commit)

## Workflow
- Enter Plan mode for any non-trivial task
- Read PRD.md — it is the source of truth
- Run /review before committing
- Use /commit for all commits
- Run lint and type-check after changes; fix before claiming done

## Definition of Done
1. Form loads at localhost:3000
2. Submitting sends an email to edan@grpc.biz
3. No console errors
4. /review passes
5. Deployed to Vercel with a working live URL
