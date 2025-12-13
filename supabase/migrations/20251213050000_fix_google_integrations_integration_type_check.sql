/*
  Fix google_integrations.integration_type constraint drift

  The original table CHECK constraint only allowed:
    business_profile, sheets, calendar, oauth

  The current Google connectors use:
    business_profile, analytics, search_console, tag_manager

  This migration expands the allowed values so OAuth callback can persist
  connection rows and the /admin/connections UI can show a persistent status.
*/

ALTER TABLE public.google_integrations
  DROP CONSTRAINT IF EXISTS google_integrations_integration_type_check;

ALTER TABLE public.google_integrations
  ADD CONSTRAINT google_integrations_integration_type_check
  CHECK (
    integration_type IN (
      'business_profile',
      'analytics',
      'search_console',
      'tag_manager',
      'sheets',
      'calendar',
      'oauth'
    )
  );

