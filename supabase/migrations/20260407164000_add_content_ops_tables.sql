CREATE TABLE IF NOT EXISTS public.content_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, title text NOT NULL, primary_keyword text NOT NULL,
  supporting_keywords text[] DEFAULT '{}'::text[], search_intent text DEFAULT 'informational', target_url text NOT NULL,
  opportunity_type text NOT NULL DEFAULT 'support_cluster', priority text NOT NULL DEFAULT 'medium', status text NOT NULL DEFAULT 'idea', notes text,
  recommended_internal_links text[] DEFAULT '{}'::text[],
  source_label text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.content_briefs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), opportunity_id uuid NOT NULL REFERENCES public.content_opportunities(id) ON DELETE CASCADE,
  title text NOT NULL, proposed_slug text NOT NULL, content_type text NOT NULL DEFAULT 'blog_post', target_url text NOT NULL, angle text NOT NULL, primary_keyword text NOT NULL,
  supporting_keywords text[] DEFAULT '{}'::text[],
  internal_link_targets text[] DEFAULT '{}'::text[],
  source_requirements text[] DEFAULT '{}'::text[],
  cta text,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_content_opportunities_priority ON public.content_opportunities(priority, status);
CREATE INDEX IF NOT EXISTS idx_content_briefs_opportunity_id ON public.content_briefs(opportunity_id);
ALTER TABLE public.content_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_briefs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage content opportunities" ON public.content_opportunities;
CREATE POLICY "Admins can manage content opportunities"
  ON public.content_opportunities
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can manage content briefs" ON public.content_briefs;
CREATE POLICY "Admins can manage content briefs"
  ON public.content_briefs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
DROP TRIGGER IF EXISTS update_content_opportunities_updated_at ON public.content_opportunities;
CREATE TRIGGER update_content_opportunities_updated_at
  BEFORE UPDATE ON public.content_opportunities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_content_briefs_updated_at ON public.content_briefs;
CREATE TRIGGER update_content_briefs_updated_at
  BEFORE UPDATE ON public.content_briefs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
