-- Upgrade the SEO tracker from generic domain checks to URL-owned keyword tracking.

CREATE UNIQUE INDEX IF NOT EXISTS seo_keywords_tracking_key
  ON public.seo_keywords (lower(keyword), lower(coalesce(location_context, '')), lower(coalesce(target_url, '')));

-- Retire generic seed rows that only checked whether the domain ranked at all.
UPDATE public.seo_keywords
SET is_active = false,
    updated_at = now()
WHERE target_url = 'https://mango.law'
  AND (
    (keyword = 'Criminal Defense Lawyer' AND location_context IN (
      'Delaware, Ohio, United States',
      'Marysville, Ohio, United States',
      'Mount Gilead, Ohio, United States',
      'Marion, Ohio, United States'
    ))
    OR (keyword = 'OVI Attorney' AND location_context IN (
      'Delaware, Ohio, United States',
      'Marysville, Ohio, United States'
    ))
    OR (keyword = 'DUI Lawyer' AND location_context = 'Delaware, Ohio, United States')
  );

-- Core money-page and recovery keywords aligned to the current keyword-to-URL map.
INSERT INTO public.seo_keywords (keyword, location_context, target_url, is_active)
SELECT v.keyword, v.location_context, v.target_url, true
FROM (
  VALUES
    ('ovi attorney delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/ovi-dui-defense-delaware-oh'),
    ('dui lawyer delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/ovi-dui-defense-delaware-oh'),
    ('criminal defense attorney delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/criminal-defense-delaware-oh'),
    ('criminal defense lawyer delaware county ohio', 'Delaware, Ohio, United States', 'https://mango.law/criminal-defense-delaware-oh'),
    ('domestic violence lawyer delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/domestic-violence-lawyer-delaware-oh'),
    ('protection order lawyer delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/protection-order-lawyer-delaware-oh'),
    ('drug crime lawyer delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/drug-crime-lawyer-delaware-oh'),
    ('sex crime defense lawyer delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/sex-crime-defense-lawyer-delaware-oh'),
    ('white collar crimes attorney delaware ohio', 'Delaware, Ohio, United States', 'https://mango.law/white-collar-crimes-attorney-delaware-oh'),
    ('ovi checkpoint ohio tonight', 'Ohio, United States', 'https://mango.law/resources/dui-checkpoints'),
    ('dui checkpoint ohio today', 'Ohio, United States', 'https://mango.law/resources/dui-checkpoints'),
    ('dui checkpoints ohio laws', 'Ohio, United States', 'https://mango.law/ovi-checkpoints-ohio'),
    ('ovi charge meaning', 'Ohio, United States', 'https://mango.law/blog/understanding-ovi-dui-charges-ohio'),
    ('dui vs ovi', 'Ohio, United States', 'https://mango.law/blog/understanding-ovi-dui-charges-ohio'),
    ('ovi suspension', 'Ohio, United States', 'https://mango.law/blog/understanding-ovi-dui-charges-ohio'),
    ('what is ovi charge', 'Ohio, United States', 'https://mango.law/blog/understanding-ovi-dui-charges-ohio'),
    ('physical control charge ohio', 'Ohio, United States', 'https://mango.law/blog/understanding-ovi-dui-charges-ohio')
) AS v(keyword, location_context, target_url)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.seo_keywords existing
  WHERE lower(existing.keyword) = lower(v.keyword)
    AND lower(coalesce(existing.location_context, '')) = lower(v.location_context)
    AND lower(coalesce(existing.target_url, '')) = lower(v.target_url)
);
