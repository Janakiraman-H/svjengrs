create extension if not exists "pgcrypto";
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  name text not null, company text not null, email text not null, phone text,
  subject text, message text not null, source_page text, status text not null default 'new',
  utm_source text, utm_medium text, utm_campaign text
);
create table if not exists public.consultation_bookings (
  id uuid primary key, created_at timestamptz not null default now(),
  name text not null, company text not null, email text not null, phone text,
  consultation_type text not null, project_location text not null, project_value text,
  project_stage text not null, message text not null, source_page text, status text not null default 'new'
);
alter table public.inquiries enable row level security;
alter table public.consultation_bookings enable row level security;
-- Browser clients receive no direct access. The server uses the Supabase service-role key.
