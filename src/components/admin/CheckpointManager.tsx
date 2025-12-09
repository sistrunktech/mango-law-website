import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { MapPin, Plus, Edit2, Trash2, Eye, Calendar, Search } from 'lucide-react';
import Tooltip from './Tooltip';

interface Checkpoint {
  id: string;
  title: string;
  location_address: string;
  location_city: string;
  location_county: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  status: string;
  source_name: string;
  source_url: string | null;
  is_verified: boolean;
  created_at: string;
}

export default function CheckpointManager() {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editing, setEditing] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Checkpoint>>({});
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadCheckpoints();
  }, []);

  const loadCheckpoints = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('dui_checkpoints')
      .select('*')
      .order('start_date', { ascending: false });

    if (!error && data) {
      setCheckpoints(data);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setCreating(true);
    setEditForm({
      title: '',
      location_address: '',
      location_city: '',
      location_county: '',
      latitude: 0,
      longitude: 0,
      start_date: '',
      end_date: '',
      status: 'upcoming',
      source_name: '',
      is_verified: false,
    });
  };

  const handleEdit = (checkpoint: Checkpoint) => {
    setEditing(checkpoint.id);
    setEditForm(checkpoint);
  };

  const handleSave = async () => {
    if (!supabase) return;

    // Validate required fields
    if (!editForm.source_url || editForm.source_url.trim() === '') {
      alert('Source URL is required. Please provide a link to the official announcement.');
      return;
    }

    if (!editForm.title || !editForm.location_city || !editForm.start_date) {
      alert('Please fill in all required fields (Title, City, Start Date, and Source URL).');
      return;
    }

    if (creating) {
      const { error } = await supabase
        .from('dui_checkpoints')
        .insert([editForm]);

      if (!error) {
        setCreating(false);
        setEditForm({});
        loadCheckpoints();
      } else {
        alert(`Error saving checkpoint: ${error.message}`);
      }
    } else if (editing) {
      const { error } = await supabase
        .from('dui_checkpoints')
        .update(editForm)
        .eq('id', editing);

      if (!error) {
        setEditing(null);
        setEditForm({});
        loadCheckpoints();
      } else {
        alert(`Error updating checkpoint: ${error.message}`);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this checkpoint?')) return;

    const { error } = await supabase
      .from('dui_checkpoints')
      .delete()
      .eq('id', id);

    if (!error) {
      loadCheckpoints();
    }
  };

  const handleCancel = () => {
    setCreating(false);
    setEditing(null);
    setEditForm({});
  };

  const filteredCheckpoints = checkpoints.filter((cp) => {
    const matchesSearch =
      cp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cp.location_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cp.location_address.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || cp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="text-white">Loading checkpoints...</div>;
  }

  if (creating || editing) {
    return (
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">
            {creating ? 'Create New Checkpoint' : 'Edit Checkpoint'}
          </h2>
        </div>

        {creating && (
          <div className="mb-6 p-4 bg-amber-900/30 border border-amber-600/50 rounded-lg">
            <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Important: Only Add Verified Checkpoints
            </h3>
            <p className="text-amber-200/90 text-sm mb-3">
              Only add checkpoints that are publicly announced by official sources. Do not create fake or speculative checkpoint data.
            </p>
            <div className="text-xs text-amber-200/80 space-y-1">
              <p className="font-medium">Trusted Sources:</p>
              <ul className="list-disc list-inside ml-2 space-y-0.5">
                <li>Official police department press releases and websites</li>
                <li>Local news media reports</li>
                <li>OVICheckpoint.com and similar verified tracking sites</li>
                <li>Government social media accounts</li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Title
              <Tooltip content="A brief, descriptive name for this checkpoint" />
            </label>
            <input
              type="text"
              value={editForm.title || ''}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., I-71 Northbound Checkpoint"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Location Address
              <Tooltip content="The specific street address or intersection" />
            </label>
            <input
              type="text"
              value={editForm.location_address || ''}
              onChange={(e) => setEditForm({ ...editForm, location_address: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., I-71 at Exit 161"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">City</label>
            <input
              type="text"
              value={editForm.location_city || ''}
              onChange={(e) => setEditForm({ ...editForm, location_city: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="Columbus"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">County</label>
            <input
              type="text"
              value={editForm.location_county || ''}
              onChange={(e) => setEditForm({ ...editForm, location_county: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="Franklin"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Latitude
              <Tooltip content="Decimal latitude coordinate (e.g., 39.9612)" />
            </label>
            <input
              type="number"
              step="0.000001"
              value={editForm.latitude || ''}
              onChange={(e) => setEditForm({ ...editForm, latitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="39.9612"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Longitude
              <Tooltip content="Decimal longitude coordinate (e.g., -82.9988)" />
            </label>
            <input
              type="number"
              step="0.000001"
              value={editForm.longitude || ''}
              onChange={(e) => setEditForm({ ...editForm, longitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="-82.9988"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">Start Date & Time</label>
            <input
              type="datetime-local"
              value={editForm.start_date ? new Date(editForm.start_date).toISOString().slice(0, 16) : ''}
              onChange={(e) => setEditForm({ ...editForm, start_date: new Date(e.target.value).toISOString() })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">End Date & Time</label>
            <input
              type="datetime-local"
              value={editForm.end_date ? new Date(editForm.end_date).toISOString().slice(0, 16) : ''}
              onChange={(e) => setEditForm({ ...editForm, end_date: new Date(e.target.value).toISOString() })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">Status</label>
            <select
              value={editForm.status || 'upcoming'}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-200 mb-2 block">Source Name</label>
            <input
              type="text"
              value={editForm.source_name || ''}
              onChange={(e) => setEditForm({ ...editForm, source_name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="e.g., Columbus Police Department"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
              Source URL <span className="text-red-400">*</span>
              <Tooltip content="Required: Link to the official announcement or news article about this checkpoint" />
            </label>
            <input
              type="url"
              value={editForm.source_url || ''}
              onChange={(e) => setEditForm({ ...editForm, source_url: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
              placeholder="https://... (Required)"
              required
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="verified"
              checked={editForm.is_verified || false}
              onChange={(e) => setEditForm({ ...editForm, is_verified: e.target.checked })}
              className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
            />
            <label htmlFor="verified" className="flex items-center gap-2 text-sm text-slate-200">
              Verified
              <Tooltip content="Mark this checkpoint as verified by an official source" />
            </label>
          </div>

          <div className="md:col-span-2 flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
            >
              Save Checkpoint
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
          <h2 className="text-2xl font-bold text-white">DUI Checkpoints</h2>
          <p className="text-slate-400 mt-1">Manage checkpoint locations and schedules</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Checkpoint
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search checkpoints..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredCheckpoints.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
          <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No checkpoints found</h3>
          <p className="text-slate-400">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCheckpoints.map((cp) => (
            <div
              key={cp.id}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{cp.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      cp.status === 'upcoming' ? 'bg-blue-600 text-white' :
                      cp.status === 'active' ? 'bg-green-600 text-white' :
                      cp.status === 'completed' ? 'bg-slate-600 text-slate-300' :
                      'bg-red-600 text-white'
                    }`}>
                      {cp.status}
                    </span>
                    {cp.is_verified && (
                      <span className="px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 mb-2">{cp.location_address}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{cp.location_city}, {cp.location_county} County</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(cp.start_date).toLocaleString()}
                    </span>
                    <span>Source: {cp.source_name}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(cp)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cp.id)}
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

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <p className="text-sm text-slate-400">
          <strong className="text-slate-300">Total:</strong> {filteredCheckpoints.length} checkpoints
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </p>
      </div>
    </div>
  );
}
