# SVJ Engineers and Consultants

Production-oriented Next.js website built from the supplied 34-page SVJ company profile.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Validate with `npm run lint`, `npm run typecheck`, and `npm run build`.

## Enquiry storage

Apply `supabase/migrations/001_initial.sql` in a Supabase project, then configure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. The service-role key is server-only and must never use the `NEXT_PUBLIC_` prefix. Without Supabase credentials, development submissions are appended to `data/inquiries.ndjson`; this fallback is not suitable for ephemeral serverless production filesystems.

## Email notifications

Set `RESEND_API_KEY`, `ENQUIRY_NOTIFICATION_EMAIL`, and a verified `ENQUIRY_FROM_EMAIL`. Database recording remains functional if email delivery is unavailable.

## Administration

Set a strong `ADMIN_PASSWORD` and random `ADMIN_SESSION_SECRET`, then visit `/admin/login`. The admin page is server-protected with an HTTP-only session cookie and is excluded from indexing. If these variables are absent, administration remains disabled.

## Analytics

Microsoft Clarity project `ymektsmzgh` is loaded asynchronously from the shared `<head>` in `src/app/layout.tsx` on every page. It does not require an environment variable or GA4 configuration.

Set `NEXT_PUBLIC_GA_ID` to enable GA4. The consultation flow emits a `consultation_completed` event only after a successful API response; phone and email links emit matching interaction events. Apply the organization's preferred consent policy before enabling analytics in production.

## Content and imagery

All 40 assignments from profile pages 10–14 are normalized in `src/data/projects.ts`. The Projects section is an image-free, expandable assignment register, with contribution, sector, status and text filters. Individual assignment notes are also image-free. Exact role wording distinguishes design, proof checking, pre-bid, post-bid, detailed engineering and project management. Reported values describe the wider project, not SVJ’s fees; status is explicitly attributed to the company profile. Image policy and provenance are documented under `research/`.

The supplied Pages photography document adds 14 optimized assets: project photography for seven existing assignments, a labelled Hero design rendering, and additional fieldwork views. The homepage scroll story, fieldwork gallery and expertise panels retain caption-matched imagery; the homepage hero uses the earlier AI-generated infrastructure visual. Photography is no longer displayed in the Projects register or assignment notes. Image viewers elsewhere support keyboard navigation and full-composition viewing. Source pages, crops and caption decisions are recorded in `research/pages-photography.md`; the typed registry is `src/data/project-photography.ts`.

## Deployment

Configured for Cloudflare Workers + OpenNext at `https://svjengrs.com`, with `www.svjengrs.com` redirecting to the main domain. See [the deployment checklist](DEPLOYMENT.md) for account authorization, database setup, runtime secrets, domain activation, and verification. This is a full-stack Worker, not a Cloudflare Pages static export.

Use `npm run build:cloudflare` to build, `npm run preview:cloudflare` to test locally in the Workers runtime, and `npm run deploy:cloudflare` to publish after completing the checklist. Production enquiry handling requires Supabase; local-file storage is deliberately disabled in production. No production credentials are stored in this repository.
