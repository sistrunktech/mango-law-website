/*
  # Drop Unused Indexes and Fix Duplicate Policies

  1. Unused Indexes Cleanup
    - Dropping indexes that have not been used
    - This reduces storage overhead and improves write performance
    - Note: Some indexes may become useful as the application scales,
      but can be recreated if needed

  2. Policy Cleanup
    - Remove duplicate SELECT policy on review_platforms table

  3. Security Note
    - Leaked Password Protection must be enabled in Supabase Dashboard
      under Authentication > Settings > Security
*/

-- Drop unused indexes from blog_posts table
DROP INDEX IF EXISTS idx_blog_posts_slug;
DROP INDEX IF EXISTS idx_blog_posts_published;
DROP INDEX IF EXISTS idx_blog_posts_published_date;
DROP INDEX IF EXISTS idx_blog_posts_author_id;

-- Drop unused indexes from contact_submissions table
DROP INDEX IF EXISTS idx_contact_submissions_status;
DROP INDEX IF EXISTS idx_contact_submissions_assigned_to;

-- Drop unused indexes from dui_checkpoints table
DROP INDEX IF EXISTS idx_dui_checkpoints_duplicate_of;

-- Drop unused indexes from handoff_documents table
DROP INDEX IF EXISTS idx_handoff_documents_status;
DROP INDEX IF EXISTS idx_handoff_documents_generated_by;

-- Drop unused indexes from handoff_document_versions table
DROP INDEX IF EXISTS idx_handoff_document_versions_document_id;
DROP INDEX IF EXISTS idx_handoff_document_versions_created_by;

-- Drop unused indexes from reviews table
DROP INDEX IF EXISTS idx_reviews_invitation_id;

-- Drop unused indexes from checkpoint_duplicates table
DROP INDEX IF EXISTS idx_checkpoint_duplicates_checkpoint_id;
DROP INDEX IF EXISTS idx_checkpoint_duplicates_duplicate_of_id;

-- Drop unused indexes from handoff_shares table
DROP INDEX IF EXISTS idx_handoff_shares_token;
DROP INDEX IF EXISTS idx_handoff_shares_document_id;

-- Drop unused indexes from handoff_gaps table
DROP INDEX IF EXISTS idx_handoff_gaps_document_id;
DROP INDEX IF EXISTS idx_handoff_gaps_severity;

-- Drop unused indexes from clients table
DROP INDEX IF EXISTS idx_clients_email;
DROP INDEX IF EXISTS idx_clients_review_status;
DROP INDEX IF EXISTS idx_clients_campaign;
DROP INDEX IF EXISTS idx_clients_created_at;
DROP INDEX IF EXISTS idx_clients_created_by;

-- Drop unused indexes from review_campaigns table
DROP INDEX IF EXISTS idx_campaigns_status;
DROP INDEX IF EXISTS idx_campaigns_scheduled;
DROP INDEX IF EXISTS idx_review_campaigns_created_by;

-- Drop unused indexes from google_sheet_sync_log table
DROP INDEX IF EXISTS idx_sync_log_sheet;
DROP INDEX IF EXISTS idx_sync_log_status;

-- Drop unused indexes from review_responses table
DROP INDEX IF EXISTS idx_review_responses_review;
DROP INDEX IF EXISTS idx_review_responses_posted;
DROP INDEX IF EXISTS idx_review_responses_created_by;

-- Drop unused indexes from review_sync_log table
DROP INDEX IF EXISTS idx_review_sync_status;

-- Drop unused indexes from google_reviews table
DROP INDEX IF EXISTS idx_google_reviews_rating;
DROP INDEX IF EXISTS idx_google_reviews_date;
DROP INDEX IF EXISTS idx_google_reviews_responded;
DROP INDEX IF EXISTS idx_google_reviews_sentiment;
DROP INDEX IF EXISTS idx_google_reviews_client;
DROP INDEX IF EXISTS idx_google_reviews_responded_by;

-- Drop unused indexes from social_posts table
DROP INDEX IF EXISTS idx_social_posts_platform;
DROP INDEX IF EXISTS idx_social_posts_status;
DROP INDEX IF EXISTS idx_social_posts_approval;
DROP INDEX IF EXISTS idx_social_posts_scheduled;
DROP INDEX IF EXISTS idx_social_posts_blog;
DROP INDEX IF EXISTS idx_social_posts_approved_by;
DROP INDEX IF EXISTS idx_social_posts_created_by;

-- Drop unused indexes from ai_generations table
DROP INDEX IF EXISTS idx_ai_generations_type;
DROP INDEX IF EXISTS idx_ai_generations_related;
DROP INDEX IF EXISTS idx_ai_generations_created;
DROP INDEX IF EXISTS idx_ai_generations_created_by;

-- Drop unused indexes from blog_posts_cms table
DROP INDEX IF EXISTS idx_blog_posts_status;
DROP INDEX IF EXISTS idx_blog_posts_category;
DROP INDEX IF EXISTS idx_blog_posts_cms_author_id;
DROP INDEX IF EXISTS idx_blog_posts_cms_created_by;

-- Drop unused indexes from content_feedback table
DROP INDEX IF EXISTS idx_content_feedback_type;
DROP INDEX IF EXISTS idx_content_feedback_content_id;
DROP INDEX IF EXISTS idx_content_feedback_rating;
DROP INDEX IF EXISTS idx_content_feedback_created;
DROP INDEX IF EXISTS idx_content_feedback_created_by;

-- Drop unused indexes from ai_learning_metrics table
DROP INDEX IF EXISTS idx_learning_metrics_date;
DROP INDEX IF EXISTS idx_learning_metrics_type;

-- Drop unused indexes from ai_preferences table
DROP INDEX IF EXISTS idx_ai_preferences_type;
DROP INDEX IF EXISTS idx_ai_preferences_content_type;
DROP INDEX IF EXISTS idx_ai_preferences_active;
DROP INDEX IF EXISTS idx_ai_preferences_confidence;

-- Drop unused indexes from auto_pilot_settings table
DROP INDEX IF EXISTS idx_auto_pilot_content_type;
DROP INDEX IF EXISTS idx_auto_pilot_enabled;

-- Drop unused indexes from google_integrations table
DROP INDEX IF EXISTS idx_google_integrations_type;
DROP INDEX IF EXISTS idx_google_integrations_active;

-- Drop unused indexes from review_platforms table
DROP INDEX IF EXISTS idx_review_platforms_active;
DROP INDEX IF EXISTS idx_review_platforms_priority;

-- Drop unused indexes from ai_model_config table
DROP INDEX IF EXISTS idx_ai_model_config_use_case;
DROP INDEX IF EXISTS idx_ai_model_config_active;

-- Drop unused indexes from admin_users table
DROP INDEX IF EXISTS idx_admin_users_email;
DROP INDEX IF EXISTS idx_admin_users_role;
DROP INDEX IF EXISTS idx_admin_users_is_active;

-- Drop unused indexes from admin_activity_log table
DROP INDEX IF EXISTS idx_activity_log_user_email;
DROP INDEX IF EXISTS idx_activity_log_created_at;

-- Drop unused indexes from allowed_domains table
DROP INDEX IF EXISTS idx_allowed_domains_domain;

-- Fix duplicate permissive policies on review_platforms
DROP POLICY IF EXISTS "Anyone can view active review platforms" ON review_platforms;
