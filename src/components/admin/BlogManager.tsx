'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Edit2, Trash2, Eye, EyeOff, HelpCircle, Save, X, Lock, CheckCircle } from 'lucide-react';
import Tooltip from './Tooltip';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  published_date: string | null;
  status?: 'draft' | 'published' | 'finalized' | null;
  finalized_at?: string | null;
  finalized_by?: string | null;
  last_approved_at?: string | null;
  last_approved_by?: string | null;
  last_approved_note?: string | null;
  last_change_reason?: string | null;
  last_change_type?: 'minor' | 'major' | null;
  content_version?: number | null;
  category: string | null;
  tags: string[];
  featured_image?: string | null;
  meta_description?: string | null;
  created_at: string;
  updated_at: string;
}

interface BlogPostChangeRequest {
  id: string;
  blog_post_id: string | null;
  proposed_title: string | null;
  proposed_content: string | null;
  proposed_meta_description: string | null;
  proposed_featured_image: string | null;
  change_type: 'minor' | 'major';
  change_reason: string;
  created_by: string;
  created_at: string;
  status: 'open' | 'accepted' | 'rejected';
  reviewed_by: string | null;
  reviewed_at: string | null;
  approval_token: string | null;
}

export default function BlogManager() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [proposing, setProposing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({});
  const [creating, setCreating] = useState(false);
  const [changeType, setChangeType] = useState<'minor' | 'major'>('minor');
  const [changeReason, setChangeReason] = useState('');
  const [approvalToken, setApprovalToken] = useState('');
  const [adminRole, setAdminRole] = useState<string | null>(null);
  const [changeRequests, setChangeRequests] = useState<BlogPostChangeRequest[]>([]);
  const [baselinePost, setBaselinePost] = useState<BlogPost | null>(null);
  const [reviewingRequest, setReviewingRequest] = useState<BlogPostChangeRequest | null>(null);
  const [reviewApprovalToken, setReviewApprovalToken] = useState('');

  const loadPosts = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }, []);

  const loadAdminRole = useCallback(async () => {
    if (!supabase || !user?.email) return;
    const { data } = await supabase
      .from('admin_users')
      .select('role, is_active')
      .eq('email', user.email)
      .eq('is_active', true)
      .maybeSingle();
    setAdminRole(data?.role ?? null);
  }, [user?.email]);

  const loadChangeRequests = useCallback(async () => {
    if (!supabase || !user?.email) return;
    const { data } = await supabase
      .from('blog_post_change_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setChangeRequests(data as BlogPostChangeRequest[]);
  }, [user?.email]);

  useEffect(() => {
    loadPosts();
    if (user) {
      loadAdminRole();
      loadChangeRequests();
    }
  }, [loadPosts, loadAdminRole, loadChangeRequests, user]);

  const resolveStatus = (post: Partial<BlogPost>) => {
    if (post.status) return post.status;
    return post.published ? 'published' : 'draft';
  };

  const isPrivileged = adminRole === 'owner' || adminRole === 'super_admin';

  const statusMeta = (status: 'draft' | 'published' | 'finalized') => {
    if (status === 'finalized') {
      return { label: 'Finalized', className: 'bg-amber-600/20 text-amber-200', icon: Lock };
    }
    if (status === 'published') {
      return { label: 'Published', className: 'bg-green-600/20 text-green-200', icon: CheckCircle };
    }
    return { label: 'Draft', className: 'bg-slate-600/40 text-slate-200' };
  };

  const extractContentStats = (content: string) => {
    const internalLinks = (content.match(/\[[^\]]+\]\((\/[^)]+)\)/g) || []).length;
    const externalLinks = (content.match(/\[[^\]]+\]\((https?:\/\/[^)]+)\)/g) || []).length;
    const images = (content.match(/!\[[^\]]*\]\(([^)]+)\)/g) || []).length + (content.match(/<img\s/gi) || []).length;
    const visuals = (content.match(/\[VISUAL:[^\]]+\]/g) || []).length;
    const headings = (content.match(/^#{1,6}\s+/gm) || []).length;
    return { internalLinks, externalLinks, images, visuals, headings };
  };

  const getRegressionWarnings = (current: Partial<BlogPost>, baseline: BlogPost) => {
    const warnings: string[] = [];
    const currentStats = extractContentStats(current.content || '');
    const baselineStats = extractContentStats(baseline.content || '');

    if (currentStats.internalLinks < baselineStats.internalLinks) {
      warnings.push(`Internal links removed (${baselineStats.internalLinks} → ${currentStats.internalLinks})`);
    }
    if (currentStats.externalLinks < baselineStats.externalLinks) {
      warnings.push(`External links removed (${baselineStats.externalLinks} → ${currentStats.externalLinks})`);
    }
    if (currentStats.images + currentStats.visuals < baselineStats.images + baselineStats.visuals) {
      warnings.push('Images/visuals removed');
    }
    if (currentStats.headings < baselineStats.headings) {
      warnings.push(`Headings removed (${baselineStats.headings} → ${currentStats.headings})`);
    }
    if ((current.featured_image || '') !== (baseline.featured_image || '')) {
      warnings.push('Featured image changed');
    }
    if ((current.meta_description || '') !== (baseline.meta_description || '')) {
      warnings.push('Meta description changed');
    }

    return warnings;
  };

  const handleCreate = () => {
    setCreating(true);
    setEditing(null);
    setProposing(null);
    setBaselinePost(null);
    setChangeType('minor');
    setChangeReason('');
    setApprovalToken('');
    setEditForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      status: 'draft',
      category: '',
      tags: [],
      featured_image: '',
      meta_description: '',
    });
  };

  const handleEdit = (post: BlogPost) => {
    if (resolveStatus(post) === 'finalized' && !isPrivileged) {
      alert('This post is finalized. Submit a change request instead.');
      return;
    }
    setEditing(post.id);
    setProposing(null);
    setEditForm(post);
    setBaselinePost(post);
    setChangeType('minor');
    setChangeReason('');
    setApprovalToken('');
  };

  const handlePropose = (post: BlogPost) => {
    setProposing(post.id);
    setEditing(null);
    setCreating(false);
    setEditForm(post);
    setBaselinePost(post);
    setChangeType('minor');
    setChangeReason('');
    setApprovalToken('');
  };

  const handleSave = async () => {
    if (!supabase) return;
    const status = resolveStatus(editForm);
    const isFinalized = status === 'finalized';
    const requiresApproval = isFinalized || changeType === 'major';
    const requiresChangeReason = !creating && !proposing && ['published', 'finalized'].includes(status);
    let resolvedChangeReason = changeReason.trim();

    if (proposing) {
      if (!resolvedChangeReason) {
        alert('Please add a change reason before submitting.');
        return;
      }
      if (!changeType) {
        alert('Please choose a change type (minor/major).');
        return;
      }

      const { error } = await supabase
        .from('blog_post_change_requests')
        .insert([{
          blog_post_id: proposing,
          proposed_title: editForm.title || null,
          proposed_content: editForm.content || null,
          proposed_meta_description: editForm.meta_description || null,
          proposed_featured_image: editForm.featured_image || null,
          change_type: changeType,
          change_reason: resolvedChangeReason,
          created_by: user?.id,
        }]);

      if (!error) {
        setProposing(null);
        setEditForm({});
        setBaselinePost(null);
        setChangeReason('');
        setChangeType('minor');
        setApprovalToken('');
        loadChangeRequests();
      }
      return;
    }

    if (requiresChangeReason && !resolvedChangeReason) {
      alert('Please add a change reason for published or finalized content.');
      return;
    }

    if (creating) {
      const nextStatus = editForm.published ? 'published' : 'draft';
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...editForm,
          status: nextStatus,
          published_date: editForm.published ? new Date().toISOString() : null
        }]);

      if (!error) {
        setCreating(false);
        setEditForm({});
        loadPosts();
      }
    } else if (editing) {
      if (baselinePost && ['published', 'finalized'].includes(status)) {
        const regressions = getRegressionWarnings(editForm, baselinePost);
        if (regressions.length > 0) {
          const confirmText = prompt(
            `Potential regression detected:\\n- ${regressions.join('\\n- ')}\\n\\nType \"CONFIRM REGRESSION\" to proceed.`
          );
          if (confirmText !== 'CONFIRM REGRESSION') return;
          const regressionNote = `Regression warnings: ${regressions.join(' | ')}`;
          resolvedChangeReason = resolvedChangeReason
            ? `${resolvedChangeReason} | ${regressionNote}`
            : regressionNote;
        }
      }

      if (requiresApproval && !approvalToken.trim()) {
        alert('Approval token required for finalized or major changes.');
        return;
      }

      const now = new Date().toISOString();
      const updatePayload: Partial<BlogPost> = {
        ...editForm,
        status,
        published_date: editForm.published ? (editForm.published_date || now) : null,
        last_change_reason: resolvedChangeReason || null,
        last_change_type: changeType,
      };

      if (requiresApproval && approvalToken.trim()) {
        updatePayload.last_approved_note = approvalToken.trim();
        updatePayload.last_approved_at = now;
        updatePayload.last_approved_by = user?.id || null;
      }

      if (isFinalized) {
        updatePayload.finalized_at = editForm.finalized_at || now;
        updatePayload.finalized_by = editForm.finalized_by || user?.id || null;
      }

      const { error } = await supabase
        .from('blog_posts')
        .update(updatePayload)
        .eq('id', editing);

      if (!error) {
        setEditing(null);
        setEditForm({});
        setBaselinePost(null);
        setChangeReason('');
        setChangeType('minor');
        setApprovalToken('');
        loadPosts();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (!error) {
      loadPosts();
    }
  };

  const handleCancel = () => {
    setCreating(false);
    setEditing(null);
    setProposing(null);
    setEditForm({});
    setBaselinePost(null);
    setChangeReason('');
    setChangeType('minor');
    setApprovalToken('');
  };

  const togglePublished = async (post: BlogPost) => {
    if (!supabase) return;
    if (resolveStatus(post) === 'finalized') return;
    const nextPublished = !post.published;
    const nextStatus = nextPublished ? 'published' : 'draft';
    const { error } = await supabase
      .from('blog_posts')
      .update({
        published: nextPublished,
        status: nextStatus,
        published_date: nextPublished ? new Date().toISOString() : null
      })
      .eq('id', post.id);

    if (!error) {
      loadPosts();
    }
  };

  const handleFinalize = async (post: BlogPost) => {
    if (!supabase || !isPrivileged) return;
    const approval = prompt('Enter approval token to finalize this post:');
    if (!approval || !approval.trim()) return;
    const now = new Date().toISOString();
    const { error } = await supabase
      .from('blog_posts')
      .update({
        status: 'finalized',
        published: true,
        published_date: post.published_date || now,
        last_approved_note: approval.trim(),
        last_approved_at: now,
        last_approved_by: user?.id || null,
        last_change_reason: 'Finalize post',
        last_change_type: 'major',
      })
      .eq('id', post.id);

    if (!error) {
      loadPosts();
    }
  };

  const handleReview = (request: BlogPostChangeRequest) => {
    setReviewingRequest(request);
    setReviewApprovalToken('');
  };

  const handleReviewClose = () => {
    setReviewingRequest(null);
    setReviewApprovalToken('');
  };

  const handleReviewAccept = async () => {
    if (!supabase || !reviewingRequest || !isPrivileged) return;
    if (!reviewApprovalToken.trim()) {
      alert('Approval token required to accept this change request.');
      return;
    }

    const currentPost = posts.find((post) => post.id === reviewingRequest.blog_post_id);
    if (!currentPost) {
      alert('Unable to locate the current post.');
      return;
    }

    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from('blog_posts')
      .update({
        title: reviewingRequest.proposed_title ?? currentPost.title,
        content: reviewingRequest.proposed_content ?? currentPost.content,
        meta_description: reviewingRequest.proposed_meta_description ?? currentPost.meta_description,
        featured_image: reviewingRequest.proposed_featured_image ?? currentPost.featured_image,
        last_approved_note: reviewApprovalToken.trim(),
        last_approved_at: now,
        last_approved_by: user?.id || null,
        last_change_reason: reviewingRequest.change_reason,
        last_change_type: reviewingRequest.change_type,
      })
      .eq('id', currentPost.id);

    if (updateError) {
      alert('Unable to apply the approved changes.');
      return;
    }

    const { error: requestError } = await supabase
      .from('blog_post_change_requests')
      .update({
        status: 'accepted',
        reviewed_by: user?.id || null,
        reviewed_at: now,
        approval_token: reviewApprovalToken.trim(),
      })
      .eq('id', reviewingRequest.id);

    if (!requestError) {
      handleReviewClose();
      loadPosts();
      loadChangeRequests();
    }
  };

  const handleReviewReject = async () => {
    if (!supabase || !reviewingRequest || !isPrivileged) return;
    if (!confirm('Reject this change request?')) return;

    const { error } = await supabase
      .from('blog_post_change_requests')
      .update({
        status: 'rejected',
        reviewed_by: user?.id || null,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', reviewingRequest.id);

    if (!error) {
      handleReviewClose();
      loadChangeRequests();
    }
  };

  const postById = new Map(posts.map((post) => [post.id, post]));
  const openRequests = changeRequests.filter((request) => request.status === 'open');
  const reviewPost = reviewingRequest ? postById.get(reviewingRequest.blog_post_id || '') : null;

  if (loading) {
    return <div className="text-white">Loading blog posts...</div>;
  }

  if (creating || editing || proposing) {
    const currentStatus = resolveStatus(editForm);
    const isProposal = Boolean(proposing);
    const isFinalizedEdit = currentStatus === 'finalized';
    const showChangeDetails = isProposal || ['published', 'finalized'].includes(currentStatus);
    const requiresChangeReason = isProposal || ['published', 'finalized'].includes(currentStatus);
    const requiresApprovalToken = !isProposal && (isFinalizedEdit || changeType === 'major');

    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {creating ? 'Create New Post' : isProposal ? 'Propose Changes' : 'Edit Post'}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isProposal && (
          <div className="mb-6 rounded-lg border border-blue-500/40 bg-blue-500/10 p-4 text-sm text-blue-200">
            This proposal will be reviewed by an owner or super admin before any changes go live.
          </div>
        )}

        {!isProposal && isFinalizedEdit && (
          <div className="mb-6 rounded-lg border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-200">
            This post is finalized and protected. Changes require an approval token and will be logged.
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Title
              <Tooltip content="The main title of your blog post. Keep it clear and engaging." />
            </label>
            <input
              type="text"
              value={editForm.title || ''}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          {!isProposal && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                Slug
                <Tooltip content="URL-friendly version of the title (e.g., 'my-blog-post'). Used in the post's web address." />
              </label>
              <input
                type="text"
                value={editForm.slug || ''}
                onChange={(e) => setEditForm({ ...editForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="my-blog-post"
              />
            </div>
          )}

          {!isProposal && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                Excerpt
                <Tooltip content="A short summary (1-2 sentences) shown in post listings and previews." />
              </label>
              <textarea
                value={editForm.excerpt || ''}
                onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Brief summary of the post"
              />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Content
              <Tooltip content="The full blog post content. Supports Markdown formatting." />
            </label>
            <textarea
              value={editForm.content || ''}
              onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
              rows={12}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                Featured image URL
                <Tooltip content="Hero/featured image used for social sharing and listing cards." />
              </label>
              <input
                type="text"
                value={editForm.featured_image || ''}
                onChange={(e) => setEditForm({ ...editForm, featured_image: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="/images/blog/hero.png"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                Meta description
                <Tooltip content="SEO summary used in search results and previews." />
              </label>
              <textarea
                value={editForm.meta_description || ''}
                onChange={(e) => setEditForm({ ...editForm, meta_description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Concise SEO description of the post..."
              />
            </div>
          </div>

          {!isProposal && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                  Category
                  <Tooltip content="Organize posts by topic (e.g., 'Criminal Defense', 'DUI Law')." />
                </label>
                <input
                  type="text"
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Category"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                  Tags
                  <Tooltip content="Comma-separated tags for better organization (e.g., 'OVI, DUI, Defense')." />
                </label>
                <input
                  type="text"
                  value={editForm.tags?.join(', ') || ''}
                  onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map((t) => t.trim()) })}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
          )}

          {!isProposal && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={editForm.published || false}
                onChange={(e) => setEditForm({ ...editForm, published: e.target.checked })}
                disabled={isFinalizedEdit}
                className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500 disabled:opacity-50"
              />
              <label htmlFor="published" className="flex items-center gap-2 text-sm text-slate-200">
                Published
                <Tooltip content="Make this post visible on the public website. Uncheck to save as draft." />
              </label>
            </div>
          )}

          {showChangeDetails && (
            <div className="rounded-lg border border-slate-700 bg-slate-900/40 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                Change details
                {requiresChangeReason && <span className="text-amber-300">(required)</span>}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Change type
                  </label>
                  <select
                    value={changeType}
                    onChange={(e) => setChangeType(e.target.value as 'minor' | 'major')}
                    className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="minor">Minor</option>
                    <option value="major">Major</option>
                  </select>
                </div>

                {requiresApprovalToken && (
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Approval token
                    </label>
                    <input
                      type="text"
                      value={approvalToken}
                      onChange={(e) => setApprovalToken(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>"
                    />
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Change reason
                </label>
                <textarea
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Briefly describe what changed and why."
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
            >
              <Save className="w-4 h-4" />
              {isProposal ? 'Submit Request' : 'Save Post'}
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <p className="text-slate-400 mt-1">Manage your website's blog content</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Change requests</h3>
            <p className="text-sm text-slate-400">Proposed edits awaiting approval</p>
          </div>
          <span className="text-xs text-slate-400">Open: {openRequests.length}</span>
        </div>

        {changeRequests.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">No change requests yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {changeRequests.map((request) => {
              const post = postById.get(request.blog_post_id || '');
              const statusTone = request.status === 'open'
                ? 'bg-blue-500/10 text-blue-200'
                : request.status === 'accepted'
                  ? 'bg-green-500/10 text-green-200'
                  : 'bg-slate-700/50 text-slate-300';

              return (
                <div
                  key={request.id}
                  className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-slate-700 bg-slate-900/40 p-4"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-white">
                        {post?.title || 'Unknown post'}
                      </p>
                      <span className={`rounded px-2 py-0.5 text-xs font-medium ${statusTone}`}>
                        {request.status}
                      </span>
                      <span className="text-xs text-slate-400">{request.change_type} change</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{request.change_reason}</p>
                    <p className="mt-2 text-xs text-slate-500">
                      Submitted {new Date(request.created_at).toLocaleString()}
                    </p>
                  </div>

                  {isPrivileged && request.status === 'open' && (
                    <button
                      onClick={() => handleReview(request)}
                      className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 transition"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Review
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No blog posts yet</h3>
          <p className="text-slate-400 mb-4">Get started by creating your first blog post</p>
          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            <Plus className="w-4 h-4" />
            Create First Post
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => {
            const status = resolveStatus(post);
            const meta = statusMeta(status);
            const StatusIcon = meta.icon;
            const isFinalized = status === 'finalized';
            const canEdit = !isFinalized || isPrivileged;
            const showPropose = isFinalized && !isPrivileged;
            const showFinalize = isPrivileged && status === 'published';

            return (
              <div
                key={post.id}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                      <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${meta.className}`}>
                        {StatusIcon && <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />}
                        {meta.label}
                      </span>
                      {isFinalized && post.last_approved_at && (
                        <span className="text-xs text-amber-200/80">
                          Approved: {new Date(post.last_approved_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {post.excerpt && (
                      <p className="text-slate-400 text-sm mb-3">{post.excerpt}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span>Slug: {post.slug}</span>
                      {post.category && <span>Category: {post.category}</span>}
                      <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                      <span>Version: {post.content_version ?? 1}</span>
                      {isFinalized && post.finalized_at && (
                        <span>Finalized: {new Date(post.finalized_at).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {showPropose ? (
                      <button
                        onClick={() => handlePropose(post)}
                        className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 transition"
                      >
                        <HelpCircle className="w-4 h-4" />
                        Propose changes
                      </button>
                    ) : (
                      <>
                        {!isFinalized && (
                          <button
                            onClick={() => togglePublished(post)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                            title={post.published ? 'Unpublish' : 'Publish'}
                          >
                            {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        )}
                        {showFinalize && (
                          <button
                            onClick={() => handleFinalize(post)}
                            className="p-2 text-amber-300 hover:text-amber-200 hover:bg-slate-700 rounded-lg transition"
                            title="Finalize"
                          >
                            <Lock className="w-4 h-4" />
                          </button>
                        )}
                        {canEdit && (
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {!isFinalized && (
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {reviewingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div
            className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-heading"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 id="review-heading" className="text-xl font-semibold text-white">
                  Review change request
                </h3>
                <p className="text-sm text-slate-400">
                  {reviewPost?.title || 'Unknown post'} · {reviewingRequest.change_type} change
                </p>
              </div>
              <button
                onClick={handleReviewClose}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>

            {!reviewPost ? (
              <p className="mt-6 text-sm text-slate-400">Unable to load the current post content.</p>
            ) : (
              <>
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                  <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4">
                    <h4 className="text-sm font-semibold text-slate-200">Current</h4>
                    <div className="mt-3 space-y-3 text-sm text-slate-300">
                      <div>
                        <span className="text-xs uppercase text-slate-500">Title</span>
                        <p className="mt-1">{reviewPost.title}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-slate-500">Featured image</span>
                        <p className="mt-1">{reviewPost.featured_image || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-slate-500">Meta description</span>
                        <p className="mt-1">{reviewPost.meta_description || 'Not set'}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-slate-500">Content</span>
                        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900 p-3 text-xs text-slate-300 whitespace-pre-wrap">
                          {reviewPost.content || 'Not set'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-4">
                    <h4 className="text-sm font-semibold text-amber-200">Proposed</h4>
                    <div className="mt-3 space-y-3 text-sm text-slate-200">
                      <div>
                        <span className="text-xs uppercase text-amber-200/70">Title</span>
                        <p className="mt-1">{reviewingRequest.proposed_title || reviewPost.title}</p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-amber-200/70">Featured image</span>
                        <p className="mt-1">
                          {reviewingRequest.proposed_featured_image || reviewPost.featured_image || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-amber-200/70">Meta description</span>
                        <p className="mt-1">
                          {reviewingRequest.proposed_meta_description || reviewPost.meta_description || 'Not set'}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs uppercase text-amber-200/70">Content</span>
                        <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-amber-500/30 bg-slate-900 p-3 text-xs text-slate-200 whitespace-pre-wrap">
                          {reviewingRequest.proposed_content || reviewPost.content || 'Not set'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/60 p-4 text-sm text-slate-200">
                  <p className="text-xs uppercase text-slate-400">Change reason</p>
                  <p className="mt-2">{reviewingRequest.change_reason}</p>
                </div>

                {isPrivileged && (
                  <div className="mt-6">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Approval token (required)
                    </label>
                    <input
                      type="text"
                      value={reviewApprovalToken}
                      onChange={(e) => setReviewApprovalToken(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="APPROVED: <slug> -- <what changed> -- <minor|major> -- <timestamp>"
                    />
                  </div>
                )}

                {isPrivileged && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={handleReviewReject}
                      className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleReviewAccept}
                      className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 transition"
                    >
                      Accept changes
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FileText({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
