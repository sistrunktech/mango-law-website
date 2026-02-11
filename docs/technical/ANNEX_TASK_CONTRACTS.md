# Annex: Task Contracts

This annex defines the required interfaces for agent tasking and approvals.

## 1) Type Definitions

```ts
export type TaskType =
  | 'seo_sprint'
  | 'blog_draft'
  | 'blog_finalize'
  | 'structured_data_update'
  | 'image_generation'
  | 'review_response_draft'
  | 'directory_evaluation';

export type SourceTierRule = {
  tier: 'tier_1' | 'tier_2' | 'tier_3';
  rule: string;
};

export interface TaskBrief {
  task_id: string;
  task_type: TaskType;
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
  source_register: Array<{ source: string; tier: 'tier_1' | 'tier_2' | 'tier_3'; used_for: string }>;
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
```

## 2) Required Fields by Task Type

- `seo_sprint`: `TaskBrief`, `EvidenceBundle`, `PublishDecision`
- `blog_draft`: `TaskBrief`, `EvidenceBundle`
- `blog_finalize`: `TaskBrief`, `EvidenceBundle`, `ApprovalTokenRecord`, `PublishDecision`
- `structured_data_update`: `TaskBrief`, `EvidenceBundle`, `PublishDecision`
- `image_generation`: `TaskBrief`, `EvidenceBundle`, `PublishDecision`
- `review_response_draft`: `TaskBrief`, `EvidenceBundle`, `PublishDecision` (human approval required before use)
- `directory_evaluation`: `TaskBrief`, `DirectoryTestCase`, `EvidenceBundle`, `PublishDecision`

## 3) Approval Token Format

Format remains compatible with current workflow:

`APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>`

Additional record requirements:

- approver role
- path scope
- expiration (optional but recommended for high-risk edits)

## 4) Default Constraints

- no drift from protected firm facts
- no unsourced numeric claims in public trust surfaces
- no schema placeholders
- no publish on missing evidence bundle
