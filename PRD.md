# PRD — Bob's Bald Barber Lead Intake

## Overview
A single-page lead capture app for Bob's Bald Barber. Prospective clients land on the page, fill in their name, email, and phone number, and submit. The salon owner receives an email notification for each new lead instantly.

## Problem Statement
Bob's Bald Barber has no way to capture leads online. Potential clients who find the business have nowhere to express interest — they either call or leave. This app gives them a frictionless way to raise their hand, and gives the owner an instant notification so no lead goes cold.

## Goals
- Provide a professional-looking lead intake page for the salon
- Capture name, email, and phone number from each visitor
- Deliver an instant email notification to the owner for every submission
- Publish to a live URL via Vercel

## Non-Goals
- No CRM or lead database (leads go to email only, for now)
- No appointment booking
- No payment processing
- No admin dashboard

## Users
**Primary:** Prospective salon clients who want to get in touch or book a visit.
**Secondary:** The salon owner (Bob), who receives lead emails in their inbox.

## Core Features

### Lead Intake Form
A clean, single-page form with three fields: full name, email address, and phone number. A submit button sends the data. On success, the user sees a confirmation message. On failure, they see a clear error message.

### Email Notification
Each form submission triggers an email to `edan@grpc.biz` via Resend. The email includes the lead's name, email, and phone number in a readable format.

### Confirmation State
After a successful submission, the form is replaced with a thank-you message so the user knows their info was received.

## Success Metrics
- Page loads in under 2 seconds
- Form submits successfully and owner receives email within 30 seconds
- Zero console errors in production
- Live URL accessible from any device

## Tech Stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Email: Resend
- Hosting: Vercel
- Repo: GitHub (edanportaro-png/bobs-bald-barber)

## Open Questions
- None — all decisions made, ready to build.
