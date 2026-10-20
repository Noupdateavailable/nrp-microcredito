# NRP Microcrédito — website

Bilingual (PT/EN) site for NRP Microcrédito with an online credit application and a staff area to review requests.

**Stack:** Next.js 16 (App Router, Cache Components) · Tailwind CSS 4 · Supabase (Postgres + Auth) · Vercel

## Run locally

```bash
cp .env.example .env   # fill in the Supabase URL and publishable key
npm install
npm run dev            # http://localhost:3000 → redirects to /pt or /en
```

## Structure

| Path | What it is |
| --- | --- |
| `src/app/[lang]/page.tsx` | Home: hero, products, how it works, about, contact |
| `src/app/[lang]/apply/` | Credit application form + server action |
| `src/app/[lang]/admin/` | Staff login and application list with status updates |
| `src/i18n/dictionaries/` | All site text (`pt.json`, `en.json`) |
| `src/config/site.ts` | Phone, WhatsApp, email, address, opening hours |
| `src/lib/loan-schema.ts` | Shared validation rules |
| `supabase/migrations/` | Database schema and access rules (RLS) |

## Security model

- Visitors can **only insert** applications (status forced to `new`); they cannot read any.
- Only signed-in users with `app_metadata.role = "admin"` can read applications and change their `status` (column-level grant).
- The browser only ever sees the Supabase **publishable** key. No secret/service-role key is used by the app.

## Adding a staff member

1. Supabase dashboard → Authentication → Users → **Add user** (email + password, auto-confirm).
2. SQL editor:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'staff@example.com';
```

3. The person signs in at `/pt/admin/login`. (If already signed in, sign out and back in to refresh the role.)

Also turn **off** public sign-ups (Authentication → Sign In / Providers → "Allow new users to sign up").
