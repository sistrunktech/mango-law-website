'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, X } from 'lucide-react';
import {
  createCheckpointAnnouncement,
  deleteCheckpointAnnouncement,
  getCheckpointAnnouncements,
  updateCheckpointAnnouncement,
  type CheckpointAnnouncement,
} from '../../lib/checkpointAnnouncementsService';

const emptyForm: Partial<CheckpointAnnouncement> = {
  title: '',
  status: 'pending_details',
  source_name: '',
  source_url: '',
  event_date: null,
  location_city: '',
  location_county: '',
  location_text: '',
  raw_text: '',
};

export default function CheckpointAnnouncementsManager() {
  const [announcements, setAnnouncements] = useState<CheckpointAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<CheckpointAnnouncement>>(emptyForm);

  const pendingCount = useMemo(
    () => announcements.filter((a) => a.status === 'pending_details').length,
    [announcements]
  );

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCheckpointAnnouncements();
      setAnnouncements(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load().catch((e) => console.error('Failed to load announcements:', e));
  }, []);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const startEdit = (a: CheckpointAnnouncement) => {
    setEditingId(a.id);
    setForm(a);
    setShowForm(true);
  };

  const cancel = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  };

  const save = async () => {
    if (!form.title || form.title.trim().length < 3) {
      alert('Title is required');
      return;
    }

    if (editingId) {
      await updateCheckpointAnnouncement(editingId, form);
    } else {
      await createCheckpointAnnouncement(form);
    }

    cancel();
    await load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await deleteCheckpointAnnouncement(id);
    await load();
  };

  return (
    <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-brand-black">Checkpoint Announcements</h2>
          <p className="mt-1 text-sm text-brand-black/60">
            Pending items show on the public page as “details to be announced”. ({pendingCount} pending)
          </p>
        </div>
        {!showForm && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-3 font-semibold text-white transition-all hover:bg-brand-gold hover:shadow-md"
          >
            <Plus className="h-5 w-5" />
            Add Announcement
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-brand-black/10 bg-brand-offWhite p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-semibold text-brand-black">
              {editingId ? 'Edit Announcement' : 'New Announcement'}
            </div>
            <button onClick={cancel} className="text-brand-black/60 hover:text-brand-black" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-brand-black">Title *</label>
              <input
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder='e.g., "Sobriety checkpoints planned night before Thanksgiving"'
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-brand-black">Status</label>
              <select
                value={form.status || 'pending_details'}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
              >
                <option value="pending_details">Pending details</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-brand-black">Event date</label>
              <input
                type="date"
                value={form.event_date ? String(form.event_date).slice(0, 10) : ''}
                onChange={(e) => setForm({ ...form, event_date: e.target.value || null })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-brand-black">County</label>
              <input
                value={form.location_county || ''}
                onChange={(e) => setForm({ ...form, location_county: e.target.value })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder="e.g., Franklin"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-brand-black">City</label>
              <input
                value={form.location_city || ''}
                onChange={(e) => setForm({ ...form, location_city: e.target.value })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder="e.g., Columbus"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-brand-black">Source URL</label>
              <input
                value={form.source_url || ''}
                onChange={(e) => setForm({ ...form, source_url: e.target.value })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-brand-black">Source name</label>
              <input
                value={form.source_name || ''}
                onChange={(e) => setForm({ ...form, source_name: e.target.value })}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder="e.g., FOX8 Cleveland"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-semibold text-brand-black">Notes / raw text</label>
              <textarea
                value={form.raw_text || ''}
                onChange={(e) => setForm({ ...form, raw_text: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-brand-black/20 bg-white px-4 py-2 focus:border-brand-mango focus:outline-none"
                placeholder="Paste the announcement excerpt here (optional)."
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              onClick={cancel}
              className="rounded-lg border border-brand-black/20 bg-white px-4 py-2 text-sm font-semibold text-brand-black hover:bg-brand-offWhite"
            >
              Cancel
            </button>
            <button
              onClick={() => save().catch((e) => alert(`Failed to save: ${e instanceof Error ? e.message : String(e)}`))}
              className="rounded-lg bg-brand-mango px-4 py-2 text-sm font-semibold text-white hover:bg-brand-gold"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-sm text-brand-black/60">Loading announcements…</div>
      ) : announcements.length === 0 ? (
        <div className="text-sm text-brand-black/60">No announcements yet.</div>
      ) : (
        <div className="divide-y divide-brand-black/10 overflow-hidden rounded-xl border border-brand-black/10">
          {announcements.slice(0, 30).map((a) => (
            <div key={a.id} className="flex flex-wrap items-center justify-between gap-3 bg-white px-4 py-3">
              <div className="min-w-[220px] flex-1">
                <div className="font-semibold text-brand-black">{a.title}</div>
                <div className="mt-1 text-xs text-brand-black/60">
                  {a.status}
                  {a.event_date ? ` • ${new Date(a.event_date).toLocaleDateString()}` : ''}
                  {a.location_county ? ` • ${a.location_county} County` : ''}
                  {a.location_city ? ` • ${a.location_city}` : ''}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startEdit(a)}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-black/10 bg-brand-offWhite px-3 py-2 text-sm font-semibold text-brand-black hover:bg-white"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => remove(a.id).catch((e) => alert(`Failed to delete: ${e instanceof Error ? e.message : String(e)}`))}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

