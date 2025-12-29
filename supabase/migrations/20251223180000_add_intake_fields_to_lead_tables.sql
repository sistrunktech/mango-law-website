-- Add structured intake fields to support better routing and resource recommendations

alter table public.leads
  add column if not exists case_type text,
  add column if not exists how_found text,
  add column if not exists how_found_detail text;

alter table public.contact_leads
  add column if not exists case_type text,
  add column if not exists county text,
  add column if not exists urgency text,
  add column if not exists how_found text,
  add column if not exists how_found_detail text;

alter table public.chat_leads
  add column if not exists case_type text,
  add column if not exists county text,
  add column if not exists urgency text,
  add column if not exists how_found text,
  add column if not exists how_found_detail text;
