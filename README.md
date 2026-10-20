# NRP Microcrédito — website

Public site, online credit application and staff area for NRP Microcrédito (Mozambique).

- **Stack:** Next.js 16 (App Router, Cache Components), Tailwind CSS 4, Supabase, Vercel
- **Languages:** Portuguese (`/pt`, default) and English (`/en`)
- **Pages:** home, `/[lang]/apply` (application form), `/[lang]/staff` (staff area)

## Run locally

```bash
cp .env.example .env.local   # fill in the two Supabase values
npm install
npm run dev                  # http://localhost:3000
```

## Deploy (Vercel)

1. Import this repo in Vercel (framework: Next.js, no build settings to change).
2. Add the environment variables from `.env.example` for Production and Preview.
3. Optional: `NEXT_PUBLIC_SITE_URL=https://your-domain` once a custom domain is attached.

## Security model

- The app uses only the Supabase **publishable** key. No service-role key anywhere.
- `loan_applications` has row-level security:
  - visitors can only **insert**, and only with `status = 'new'`; they can never read;
  - staff are Supabase Auth users with `app_metadata.role = "admin"`; they can read and
    change `status` only.
- Schema and policies live in `supabase/migrations/`.

## Staff accounts

Create the user in Supabase → Authentication → Users, then give them the admin role:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'staff@example.com';
```

Then turn off public sign-ups (Authentication → Sign In / Providers → "Allow new users to sign up").

## Content to confirm with NRP

Search the code for `TODO(NRP)`: contact details and hours (`src/config/site.ts`), the
48-hour response promise, the required-documents list, and the logo.
