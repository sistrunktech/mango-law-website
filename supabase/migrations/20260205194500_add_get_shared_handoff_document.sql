CREATE OR REPLACE FUNCTION public.get_shared_handoff_document(
  p_share_token text,
  p_password text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  title text,
  version text,
  status text,
  markdown_content text,
  metadata jsonb,
  created_at timestamptz,
  updated_at timestamptz,
  published_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  share_row record;
BEGIN
  SELECT *
  INTO share_row
  FROM public.handoff_shares
  WHERE share_token = p_share_token;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Invalid share link';
  END IF;

  IF share_row.expires_at IS NOT NULL AND share_row.expires_at < now() THEN
    RAISE EXCEPTION 'Share link has expired';
  END IF;

  IF share_row.password_hash IS NOT NULL THEN
    IF p_password IS NULL OR length(trim(p_password)) = 0 THEN
      RAISE EXCEPTION 'Password required';
    END IF;

    IF encode(convert_to(p_password, 'utf8'), 'base64') <> share_row.password_hash THEN
      RAISE EXCEPTION 'Incorrect password';
    END IF;
  END IF;

  UPDATE public.handoff_shares
  SET view_count = COALESCE(view_count, 0) + 1,
      last_viewed_at = now()
  WHERE id = share_row.id;

  RETURN QUERY
  SELECT
    d.id,
    d.title,
    d.version,
    d.status,
    d.markdown_content,
    d.metadata,
    d.created_at,
    d.updated_at,
    d.published_at
  FROM public.handoff_documents d
  WHERE d.id = share_row.document_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.get_shared_handoff_document(text, text) TO anon, authenticated;
