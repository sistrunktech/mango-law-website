-- Create leads table for DUI checkpoint lead capture
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact info
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,

  -- Context
  lead_source text NOT NULL,
  checkpoint_id uuid REFERENCES dui_checkpoints(id) ON DELETE SET NULL,
  county text,
  urgency text,
  message text,

  -- Metadata
  user_agent text,
  ip_address text,
  referrer text,

  -- Status tracking
  status text DEFAULT 'new',
  assigned_to uuid,

  -- Timestamps
  created_at timestamptz DEFAULT now(),
  contacted_at timestamptz,

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  CONSTRAINT valid_urgency CHECK (urgency IN ('exploring', 'soon', 'urgent', 'emergency'))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(lead_source);

-- RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update leads"
  ON leads FOR UPDATE
  TO authenticated
  USING (true);
