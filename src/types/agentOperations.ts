export type AgentTaskType =
  | 'seo_sprint'
  | 'blog_draft'
  | 'blog_finalize'
  | 'structured_data_update'
  | 'image_generation'
  | 'review_response_draft'
  | 'directory_evaluation';

export type SourceTier = 'tier_1' | 'tier_2' | 'tier_3';

export interface SourceTierRule {
  tier: SourceTier;
  rule: string;
}

export interface TaskBrief {
  task_id: string;
  task_type: AgentTaskType;
  objective: string;
  inputs_required: string[];
  source_tier_rules: SourceTierRule[];
  constraints: string[];
  acceptance_gates: string[];
  owner_role: 'owner' | 'super_admin' | 'seo_ops' | 'content_ops' | 'agent';
  due_at: string;
}

export interface EvidenceBundle {
  task_id: string;
  verification_timestamp: string;
  artifacts: string[];
  source_register: Array<{ source: string; tier: SourceTier; used_for: string }>;
  before_after_summary: string;
  risk_flags: string[];
  rollback_plan: string;
}

export interface ApprovalTokenRecord {
  token_text: string;
  approver_role: 'owner' | 'super_admin';
  approved_scope_paths: string[];
  change_type: 'minor' | 'major';
  expires_at: string | null;
}

export interface PublishDecision {
  status: 'approved' | 'blocked' | 'needs_revision';
  blocking_reasons: string[];
  required_remediations: string[];
  reviewer_role: 'owner' | 'super_admin' | 'seo_ops' | 'content_ops';
  approved_at: string | null;
}

export interface DirectoryTestCase {
  platform: string;
  cost_cap_monthly: number;
  test_window_days: number;
  attribution_method: string;
  max_signed_client_cpa: number;
  go_criteria: string[];
  no_go_criteria: string[];
}
