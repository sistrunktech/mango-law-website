CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_leads_email_idx ON public.contact_leads (email);
CREATE INDEX IF NOT EXISTS contact_leads_created_at_idx ON public.contact_leads (created_at DESC);

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;
