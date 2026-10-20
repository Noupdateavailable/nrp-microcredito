-- Applied to project nrp-microcredito on 2026-10-20. Kept here as the source of truth.
create type public.loan_product as enum ('business', 'salary', 'emergency');
create type public.income_band as enum ('lt10k', '10to25k', '25to50k', 'gt50k');
create type public.application_status as enum ('new', 'reviewing', 'approved', 'rejected');

create table public.loan_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 3 and 120),
  phone text not null check (phone ~ '^\+2588[2-7][0-9]{7}$'),
  email text check (email is null or char_length(email) <= 160),
  city text not null check (char_length(city) between 2 and 80),
  occupation text not null check (char_length(occupation) between 2 and 120),
  monthly_income public.income_band not null,
  product public.loan_product not null,
  amount_mzn integer not null check (amount_mzn between 1000 and 500000),
  term_months smallint not null check (term_months between 1 and 24),
  purpose text not null check (char_length(purpose) between 10 and 1000),
  locale text not null default 'pt' check (locale in ('pt', 'en')),
  status public.application_status not null default 'new'
);

create index loan_applications_created_at_idx on public.loan_applications (created_at desc);
create index loan_applications_status_idx on public.loan_applications (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger loan_applications_set_updated_at
before update on public.loan_applications
for each row execute function public.set_updated_at();

alter table public.loan_applications enable row level security;

revoke all on public.loan_applications from anon, authenticated;
grant insert on public.loan_applications to anon, authenticated;
grant select on public.loan_applications to authenticated;
grant update (status) on public.loan_applications to authenticated;

create policy "Public can submit applications"
on public.loan_applications for insert
to anon, authenticated
with check (status = 'new');

create policy "Admins can read applications"
on public.loan_applications for select
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Admins can update applications"
on public.loan_applications for update
to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
