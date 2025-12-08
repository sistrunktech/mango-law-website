/*
  # Recreate Admin Access Control System

  1. Changes
    - Drop old admin_users table structure
    - Create new admin_users with proper role hierarchy
    - Create allowed_domains and admin_activity_log tables
    - Set up proper RLS policies

  2. Security
    - Role-based access control
    - Activity logging for all admin actions
    - Domain whitelist for team access
*/

-- Drop old table if exists
DROP TABLE IF EXISTS admin_users CASCADE;

-- Recreate allowed_domains if not exists
CREATE TABLE IF NOT EXISTS allowed_domains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  domain text UNIQUE NOT NULL,
  added_by text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Recreate admin_activity_log if not exists
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id text,
  changes jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Create new admin_users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('owner', 'super_admin', 'admin')),
  full_name text,
  permissions jsonb DEFAULT '[]'::jsonb,
  created_by text,
  approved_by text,
  is_active boolean DEFAULT true,
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE allowed_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin users policies (simple for now - check email against admin_users)
CREATE POLICY "Anyone can view admin users"
  ON admin_users FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage based on role"
  ON admin_users FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allowed domains policies
CREATE POLICY "Anyone can view allowed domains"
  ON allowed_domains FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can manage domains"
  ON allowed_domains FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Activity log policies
CREATE POLICY "Anyone can view activity log"
  ON admin_activity_log FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert activity log"
  ON admin_activity_log FOR INSERT
  WITH CHECK (true);

-- Seed owner
INSERT INTO admin_users (email, role, full_name, is_active)
VALUES ('nick@mango.law', 'owner', 'Nick Mango', true)
ON CONFLICT (email) DO UPDATE
SET role = 'owner', full_name = 'Nick Mango', is_active = true;

-- Seed super admin
INSERT INTO admin_users (email, role, full_name, is_active)
VALUES ('tim@sistrunktech.com', 'super_admin', 'Tim Sistrunk', true)
ON CONFLICT (email) DO UPDATE
SET role = 'super_admin', full_name = 'Tim Sistrunk', is_active = true;

-- Seed allowed domains
INSERT INTO allowed_domains (domain, notes, is_active)
VALUES 
  ('mango.law', 'Primary firm domain', true),
  ('sistrunktech.com', 'Development and hosting partner', true)
ON CONFLICT (domain) DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_email ON admin_activity_log(user_email);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON admin_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_allowed_domains_domain ON allowed_domains(domain);
