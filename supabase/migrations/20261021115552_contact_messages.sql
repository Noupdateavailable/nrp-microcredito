-- Messages from the "Fale connosco" form: people leave their details and how they want to be contacted.
create type public.contact_channel as enum ('call', 'whatsapp', 'sms', 'email');

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null check (char_length(first_name) between 1 and 80),
  last_name text not null check (char_length(last_name) between 1 and 80),
  company text check (company is null or char_length(company) <= 120),
  email text check (email is null or char_length(email) <= 160),
  phone text not null check (phone ~ '^\+2588[2-7][0-9]{7}$'),
  channel public.contact_channel not null default 'call',
  locale text not null default 'pt' check (locale in ('pt', 'en')),
  -- Someone who asks to be contacted by email must leave an email address.
  constraint contact_messages_email_channel check (channel <> 'email' or email is not null)
);

create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

alter table public.contact_messages enable row level security;

revoke all on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select on public.contact_messages to authenticated;

-- Anyone may send a message; nobody outside the staff can read them.
create policy "Public can send contact messages"
on public.contact_messages for insert
to anon, authenticated
with check (true);

create policy "Admins can read contact messages"
on public.contact_messages for select
to authenticated
using (((select auth.jwt()) -> 'app_metadata' ->> 'role') = 'admin');
