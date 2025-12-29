-- Seed initial SEO keywords for tracking
INSERT INTO public.seo_keywords (keyword, location_context)
VALUES 
  ('Criminal Defense Lawyer', 'Delaware, Ohio, United States'),
  ('OVI Attorney', 'Delaware, Ohio, United States'),
  ('DUI Lawyer', 'Delaware, Ohio, United States'),
  ('Criminal Defense Lawyer', 'Marysville, Ohio, United States'),
  ('OVI Attorney', 'Marysville, Ohio, United States'),
  ('Criminal Defense Lawyer', 'Mount Gilead, Ohio, United States'),
  ('Criminal Defense Lawyer', 'Marion, Ohio, United States')
ON CONFLICT DO NOTHING;
