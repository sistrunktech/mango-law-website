import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Eye, EyeOff, HelpCircle, Save, X } from 'lucide-react';
import Tooltip from './Tooltip';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  published_date: string | null;
  category: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({});
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
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
  };

  const handleCreate = () => {
    setCreating(true);
    setEditForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      category: '',
      tags: [],
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditing(post.id);
    setEditForm(post);
  };

  const handleSave = async () => {
    if (!supabase) return;
    if (creating) {
      const { error } = await supabase
        .from('blog_posts')
        .insert([{
          ...editForm,
          published_date: editForm.published ? new Date().toISOString() : null
        }]);

      if (!error) {
        setCreating(false);
        setEditForm({});
        loadPosts();
      }
    } else if (editing) {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          ...editForm,
          published_date: editForm.published ? (editForm.published_date || new Date().toISOString()) : null
        })
        .eq('id', editing);

      if (!error) {
        setEditing(null);
        setEditForm({});
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
    setEditForm({});
  };

  const togglePublished = async (post: BlogPost) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('blog_posts')
      .update({
        published: !post.published,
        published_date: !post.published ? new Date().toISOString() : null
      })
      .eq('id', post.id);

    if (!error) {
      loadPosts();
    }
  };

  if (loading) {
    return <div className="text-white">Loading blog posts...</div>;
  }

  if (creating || editing) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {creating ? 'Create New Post' : 'Edit Post'}
          </h2>
          <button
            onClick={handleCancel}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

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
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value.split(',').map(t => t.trim()) })}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={editForm.published || false}
              onChange={(e) => setEditForm({ ...editForm, published: e.target.checked })}
              className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
            />
            <label htmlFor="published" className="flex items-center gap-2 text-sm text-slate-200">
              Published
              <Tooltip content="Make this post visible on the public website. Uncheck to save as draft." />
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
            >
              <Save className="w-4 h-4" />
              Save Post
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
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    {post.published ? (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-600 text-slate-300 text-xs font-medium rounded">
                        Draft
                      </span>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="text-slate-400 text-sm mb-3">{post.excerpt}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Slug: {post.slug}</span>
                    {post.category && <span>Category: {post.category}</span>}
                    <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => togglePublished(post)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
