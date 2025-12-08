import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Calendar,
  Plus,
  Sparkles,
  Send,
  CheckCircle,
  Clock,
  Edit3,
  Trash2,
  Facebook,
  Linkedin,
  Instagram,
  Globe
} from 'lucide-react';

interface SocialPost {
  id: string;
  platform: string;
  content: string;
  original_ai_content: string | null;
  scheduled_date: string | null;
  published_date: string | null;
  status: string;
  approval_status: string;
  hashtags: string[] | null;
  edit_percentage: number | null;
  confidence_score: number | null;
  auto_approved: boolean;
  blog_post_id: string | null;
  created_at: string;
}

const platformIcons = {
  google_business: Globe,
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
};

const platformColors = {
  google_business: 'text-blue-500',
  facebook: 'text-blue-600',
  linkedin: 'text-blue-700',
  instagram: 'text-pink-500',
};

export default function SocialMediaManager() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'calendar' | 'pending' | 'published'>('pending');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        ?.from('social_posts')
        .select('*')
        .order('created_at', { ascending: false }) || {};

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    try {
      await supabase
        ?.from('social_posts')
        .update({
          approval_status: 'approved',
          status: 'scheduled'
        })
        .eq('id', postId);

      loadPosts();
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await supabase
        ?.from('social_posts')
        .update({
          approval_status: 'rejected',
          status: 'draft'
        })
        .eq('id', postId);

      loadPosts();
    } catch (error) {
      console.error('Error rejecting post:', error);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (view === 'pending') return post.approval_status === 'pending';
    if (view === 'published') return post.status === 'published';
    return true;
  });

  const stats = {
    pending: posts.filter(p => p.approval_status === 'pending').length,
    approved: posts.filter(p => p.approval_status === 'approved').length,
    published: posts.filter(p => p.status === 'published').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-300">Loading social media posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Social Media Management</h2>
          <p className="text-slate-300 mt-1">
            Manage content across Google Business Profile, Facebook, LinkedIn, and Instagram
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition shadow-lg">
          <Plus className="w-4 h-4" />
          Create Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Pending Review</span>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.pending}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Scheduled</span>
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.scheduled}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Approved</span>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.approved}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Published</span>
            <Send className="w-5 h-5 text-[#E8A33C]" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.published}</div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setView('pending')}
          className={`px-4 py-2 font-medium transition ${
            view === 'pending'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Pending Review ({stats.pending})
        </button>
        <button
          onClick={() => setView('calendar')}
          className={`px-4 py-2 font-medium transition ${
            view === 'calendar'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Calendar
        </button>
        <button
          onClick={() => setView('published')}
          className={`px-4 py-2 font-medium transition ${
            view === 'published'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Published
        </button>
      </div>

      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-[#2F5F4F] rounded-lg p-12 text-center border border-white/10">
            <Send className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              {view === 'pending' && 'No Posts Pending Review'}
              {view === 'published' && 'No Published Posts Yet'}
              {view === 'calendar' && 'No Scheduled Posts'}
            </h3>
            <p className="text-slate-400 mb-4">
              {view === 'pending'
                ? 'AI-generated posts will appear here for your review and approval'
                : 'Create your first social media post or enable auto-conversion from blog posts'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const PlatformIcon = platformIcons[post.platform as keyof typeof platformIcons] || Globe;
            const platformColor = platformColors[post.platform as keyof typeof platformColors] || 'text-slate-400';

            return (
              <div
                key={post.id}
                className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10 hover:border-[#E8A33C]/30 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#1B4332] rounded-lg flex items-center justify-center">
                      <PlatformIcon className={`w-6 h-6 ${platformColor}`} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-white capitalize">
                            {post.platform.replace('_', ' ')}
                          </span>
                          {post.auto_approved && (
                            <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Auto-approved
                            </span>
                          )}
                          {post.blog_post_id && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                              From Blog
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400">
                          Created {new Date(post.created_at).toLocaleDateString()}
                          {post.scheduled_date && (
                            <> • Scheduled for {new Date(post.scheduled_date).toLocaleString()}</>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {view === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedPost(post);
                                setEditContent(post.content);
                              }}
                              className="p-2 text-slate-400 hover:text-white hover:bg-[#1B4332] rounded transition"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleReject(post.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#1B4332] rounded-lg p-4 mb-4">
                      <p className="text-slate-300 whitespace-pre-wrap">{post.content}</p>
                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.hashtags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-[#2F5F4F] text-[#E8A33C] text-xs font-medium rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {post.confidence_score && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-400">AI Confidence Score</span>
                          <span className="text-white font-medium">
                            {Math.round(post.confidence_score * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-[#1B4332] rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] h-2 rounded-full transition-all"
                            style={{ width: `${post.confidence_score * 100}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {view === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(post.id)}
                          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve & Schedule
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPost(post);
                            setEditContent(post.content);
                          }}
                          className="px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#0F2920] transition"
                        >
                          Edit First
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#2F5F4F] rounded-xl p-6 max-w-2xl w-full border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Edit {selectedPost.platform.replace('_', ' ')} Post
            </h3>

            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-60 px-4 py-3 bg-[#1B4332] border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A33C] resize-none mb-4"
              placeholder="Write your post content..."
            />

            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setEditContent('');
                }}
                className="px-4 py-2 text-slate-300 hover:text-white transition"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#0F2920] transition"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => {
                    handleApprove(selectedPost.id);
                    setSelectedPost(null);
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve & Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
