'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react';
import { getCheckpoints, createCheckpoint, updateCheckpoint, deleteCheckpoint, updateCheckpointStatuses } from '../lib/checkpointService';
import type { DUICheckpoint } from '../data/checkpoints';
import { ohioCounties, getStatusLabel, formatCheckpointDateRange } from '../data/checkpoints';
import GeocodingPreview from '../components/GeocodingPreview';
import ScraperLogsViewer from '../components/ScraperLogsViewer';
import AdminAuth from '../components/AdminAuth';
import CheckpointAnnouncementsManager from '../components/admin/CheckpointAnnouncementsManager';

import { SEO } from '../lib/seo';

export default function CheckpointAdminPage() {
  const [checkpoints, setCheckpoints] = useState<DUICheckpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isUpdatingStatuses, setIsUpdatingStatuses] = useState(false);
  const [formData, setFormData] = useState<Partial<DUICheckpoint>>({
    title: '',
    location_address: '',
    location_city: '',
    location_county: 'Delaware',
    latitude: null,
    longitude: null,
    start_date: '',
    end_date: '',
    status: 'upcoming',
    source_url: '',
    source_name: '',
    description: '',
    is_verified: false,
  });

  useEffect(() => {
    loadCheckpoints();
  }, []);

  const loadCheckpoints = async () => {
    try {
      setLoading(true);
      const data = await getCheckpoints();
      setCheckpoints(data);
    } catch (error) {
      console.error('Failed to load checkpoints:', error);
      alert('Failed to load checkpoints');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateCheckpoint(editingId, formData);
      } else {
        await createCheckpoint(formData);
      }
      resetForm();
      loadCheckpoints();
    } catch (error) {
      console.error('Failed to save checkpoint:', error);
      alert('Failed to save checkpoint');
    }
  };

  const handleEdit = (checkpoint: DUICheckpoint) => {
    setFormData(checkpoint);
    setEditingId(checkpoint.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this checkpoint?')) return;
    try {
      await deleteCheckpoint(id);
      loadCheckpoints();
    } catch (error) {
      console.error('Failed to delete checkpoint:', error);
      alert('Failed to delete checkpoint');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location_address: '',
      location_city: '',
      location_county: 'Delaware',
      latitude: null,
      longitude: null,
      start_date: '',
      end_date: '',
      status: 'upcoming',
      source_url: '',
      source_name: '',
      description: '',
      is_verified: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleUpdateStatuses = async () => {
    try {
      setIsUpdatingStatuses(true);
      await updateCheckpointStatuses();
      await loadCheckpoints();
      alert('Checkpoint statuses updated successfully');
    } catch (error) {
      console.error('Failed to update statuses:', error);
      alert('Failed to update checkpoint statuses');
    } finally {
      setIsUpdatingStatuses(false);
    }
  };

  return (
    <AdminAuth>
      <SEO title="Checkpoint Admin | Mango Law LLC" noindex={true} />
      <div className="min-h-screen bg-brand-offWhite py-12">
      <div className="container max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-black">Checkpoint Management</h1>
            <p className="mt-2 text-brand-black/70">Manage DUI checkpoint data and scraper activity</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleUpdateStatuses}
              disabled={isUpdatingStatuses}
              className="flex items-center gap-2 rounded-lg border border-brand-black/20 bg-white px-4 py-3 font-semibold text-brand-black transition-all hover:bg-brand-offWhite hover:shadow-md disabled:opacity-50"
              title="Manually update checkpoint statuses based on current time"
            >
              <RefreshCw className={`h-5 w-5 ${isUpdatingStatuses ? 'animate-spin' : ''}`} />
              Update Statuses
            </button>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 rounded-lg bg-brand-mango px-4 py-3 font-semibold text-white transition-all hover:bg-brand-gold hover:shadow-md"
              >
                <Plus className="h-5 w-5" />
                Add Checkpoint
              </button>
            )}
          </div>
        </div>

        <div className="mb-8">
          <ScraperLogsViewer />
        </div>

        <div className="mb-8">
          <CheckpointAnnouncementsManager />
        </div>

        {showForm && (
          <div className="mb-8 rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-brand-black">
                {editingId ? 'Edit Checkpoint' : 'New Checkpoint'}
              </h2>
              <button
                onClick={resetForm}
                className="text-brand-black/60 transition-colors hover:text-brand-black"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Status *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location_address}
                    onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location_city}
                    onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    County *
                  </label>
                  <select
                    required
                    value={formData.location_county}
                    onChange={(e) => setFormData({ ...formData, location_county: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  >
                    {ohioCounties.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Source Name
                  </label>
                  <input
                    type="text"
                    value={formData.source_name || ''}
                    onChange={(e) => setFormData({ ...formData, source_name: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Start Date *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.start_date ? new Date(formData.start_date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    End Date *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.end_date ? new Date(formData.end_date).toISOString().slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="0.0000001"
                    value={formData.latitude || ''}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-brand-black">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="0.0000001"
                    value={formData.longitude || ''}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                  />
                </div>
              </div>

              {formData.location_address && formData.location_city && (
                <GeocodingPreview
                  address={formData.location_address}
                  city={formData.location_city}
                  county={formData.location_county || 'Delaware'}
                  onCoordinatesFound={(lat, lng) => {
                    setFormData({ ...formData, latitude: lat, longitude: lng });
                  }}
                />
              )}

              <div>
                <label className="mb-1 block text-sm font-semibold text-brand-black">
                  Source URL
                </label>
                <input
                  type="url"
                  value={formData.source_url || ''}
                  onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
                  className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-brand-black">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-brand-black/20 px-4 py-2 focus:border-brand-mango focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={formData.is_verified || false}
                  onChange={(e) => setFormData({ ...formData, is_verified: e.target.checked })}
                  className="h-4 w-4 rounded border-brand-black/20 text-brand-mango focus:ring-brand-mango"
                />
                <label htmlFor="verified" className="text-sm font-semibold text-brand-black">
                  Verified
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-brand-mango px-6 py-3 font-semibold text-white transition-all hover:bg-brand-gold hover:shadow-md"
                >
                  <Save className="h-4 w-4" />
                  {editingId ? 'Update' : 'Create'} Checkpoint
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg border border-brand-black/20 px-6 py-3 font-semibold text-brand-black transition-all hover:bg-brand-offWhite"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-brand-black/10 bg-white p-12 text-center">
            <p className="text-brand-black/70">Loading checkpoints...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {checkpoints.map((checkpoint) => (
              <div
                key={checkpoint.id}
                className="flex items-start justify-between rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft"
              >
                <div className="flex-1">
                  <div className="mb-2 flex items-start gap-3">
                    <h3 className="text-lg font-bold text-brand-black">{checkpoint.title}</h3>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                      checkpoint.status === 'active' ? 'bg-red-100 text-red-700' :
                      checkpoint.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {getStatusLabel(checkpoint.status)}
                    </span>
                  </div>
                  <p className="text-sm text-brand-black/70">
                    {checkpoint.location_address}, {checkpoint.location_city}, {checkpoint.location_county} County
                  </p>
                  <p className="mt-1 text-sm text-brand-black/60">
                    {formatCheckpointDateRange(checkpoint.start_date, checkpoint.end_date)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(checkpoint)}
                    className="rounded-lg bg-brand-leaf/10 p-2 text-brand-leaf transition-all hover:bg-brand-leaf/20"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(checkpoint.id)}
                    className="rounded-lg bg-red-50 p-2 text-red-600 transition-all hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminAuth>
  );
}
