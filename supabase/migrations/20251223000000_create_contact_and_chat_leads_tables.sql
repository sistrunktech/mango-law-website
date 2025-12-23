create extension if not exists pgcrypto;

-- Contact form submissions
create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_leads_email_idx on public.contact_leads (email);
create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);

alter table public.contact_leads enable row level security;

drop policy if exists "Anyone can submit contact leads" on public.contact_leads;
create policy "Anyone can submit contact leads"
  on public.contact_leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can view contact leads" on public.contact_leads;
create policy "Authenticated users can view contact leads"
  on public.contact_leads for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update contact leads" on public.contact_leads;
create policy "Authenticated users can update contact leads"
  on public.contact_leads for update
  to authenticated
  using (true);

-- Chat intake submissions
create table if not exists public.chat_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  initial_message text not null,
  conversation_context text,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists chat_leads_email_idx on public.chat_leads (email);
create index if not exists chat_leads_created_at_idx on public.chat_leads (created_at desc);

alter table public.chat_leads enable row level security;

drop policy if exists "Anyone can submit chat leads" on public.chat_leads;
create policy "Anyone can submit chat leads"
  on public.chat_leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Authenticated users can view chat leads" on public.chat_leads;
create policy "Authenticated users can view chat leads"
  on public.chat_leads for select
  to authenticated
  using (true);

drop policy if exists "Authenticated users can update chat leads" on public.chat_leads;
create policy "Authenticated users can update chat leads"
  on public.chat_leads for update
  to authenticated
  using (true);
