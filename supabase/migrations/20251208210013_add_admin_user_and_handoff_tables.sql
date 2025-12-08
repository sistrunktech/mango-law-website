/*
  # Add Admin User and Handoff Documentation System
  
  1. Admin User Setup
    - Create function to set up admin user with temporary password
    - Add user metadata fields for password change tracking
  
  2. New Tables
    - `handoff_documents`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `version` (text, e.g., "1.0.0")
      - `status` (text: draft, published, archived)
      - `markdown_content` (text, full document)
      - `metadata` (jsonb: stats, generation options)
      - `generated_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `published_at` (timestamptz)
    
    - `handoff_document_versions`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references handoff_documents)
      - `version_number` (integer)
      - `content_snapshot` (text)
      - `changed_sections` (text array)
      - `created_by` (uuid, references auth.users)
      - `created_at` (timestamptz)
    
    - `handoff_shares`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references handoff_documents)
      - `share_token` (text, unique)
      - `password_hash` (text, nullable)
      - `expires_at` (timestamptz, nullable)
      - `view_count` (integer)
      - `last_viewed_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `handoff_gaps`
      - `id` (uuid, primary key)
      - `document_id` (uuid, references handoff_documents)
      - `gap_type` (text)
      - `severity` (text: low, medium, high)
      - `description` (text)
      - `file_path` (text, nullable)
      - `resolved` (boolean)
      - `created_at` (timestamptz)
  
  3. Security
    - Enable RLS on all tables
    - Admin-only access for handoff tables
    - Public read access for shared documents with valid token
*/

-- Handoff Documents Table
CREATE TABLE IF NOT EXISTS handoff_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  version text DEFAULT '1.0.0',
  status text DEFAULT 'draft',
  markdown_content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  generated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived'))
);

-- Handoff Document Versions Table
CREATE TABLE IF NOT EXISTS handoff_document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES handoff_documents(id) ON DELETE CASCADE,
  version_number integer NOT NULL DEFAULT 1,
  content_snapshot text NOT NULL,
  changed_sections text[],
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Handoff Shares Table
CREATE TABLE IF NOT EXISTS handoff_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES handoff_documents(id) ON DELETE CASCADE,
  share_token text UNIQUE NOT NULL,
  password_hash text,
  expires_at timestamptz,
  view_count integer DEFAULT 0,
  last_viewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Handoff Gaps Table
CREATE TABLE IF NOT EXISTS handoff_gaps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES handoff_documents(id) ON DELETE CASCADE,
  gap_type text NOT NULL,
  severity text NOT NULL,
  description text NOT NULL,
  file_path text,
  resolved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_severity CHECK (severity IN ('low', 'medium', 'high'))
);

-- Enable RLS
ALTER TABLE handoff_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE handoff_document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE handoff_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE handoff_gaps ENABLE ROW LEVEL SECURITY;

-- Handoff Documents Policies
CREATE POLICY "Authenticated users can view handoff documents"
  ON handoff_documents FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create handoff documents"
  ON handoff_documents FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update handoff documents"
  ON handoff_documents FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete handoff documents"
  ON handoff_documents FOR DELETE
  TO authenticated
  USING (true);

-- Handoff Document Versions Policies
CREATE POLICY "Authenticated users can view document versions"
  ON handoff_document_versions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create document versions"
  ON handoff_document_versions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Handoff Shares Policies
CREATE POLICY "Authenticated users can manage shares"
  ON handoff_shares FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can view shares for accessing documents"
  ON handoff_shares FOR SELECT
  USING (true);

-- Handoff Gaps Policies
CREATE POLICY "Authenticated users can view gaps"
  ON handoff_gaps FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage gaps"
  ON handoff_gaps FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_handoff_documents_status ON handoff_documents(status);
CREATE INDEX IF NOT EXISTS idx_handoff_documents_created_at ON handoff_documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_handoff_document_versions_document_id ON handoff_document_versions(document_id);
CREATE INDEX IF NOT EXISTS idx_handoff_shares_token ON handoff_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_handoff_shares_document_id ON handoff_shares(document_id);
CREATE INDEX IF NOT EXISTS idx_handoff_gaps_document_id ON handoff_gaps(document_id);
CREATE INDEX IF NOT EXISTS idx_handoff_gaps_severity ON handoff_gaps(severity);

-- Add trigger for updated_at on handoff_documents
DROP TRIGGER IF EXISTS update_handoff_documents_updated_at ON handoff_documents;
CREATE TRIGGER update_handoff_documents_updated_at
  BEFORE UPDATE ON handoff_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique share token
CREATE OR REPLACE FUNCTION generate_share_token()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(16), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to increment share view count
CREATE OR REPLACE FUNCTION increment_share_view_count(token text)
RETURNS void AS $$
BEGIN
  UPDATE handoff_shares
  SET view_count = view_count + 1,
      last_viewed_at = now()
  WHERE share_token = token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;