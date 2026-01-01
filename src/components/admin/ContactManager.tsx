'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Phone, Calendar, AlertCircle, CheckCircle, Clock, Trash2 } from 'lucide-react';
import Tooltip from './Tooltip';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  case_type: string | null;
  urgency: string;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  new: 'bg-blue-600',
  contacted: 'bg-yellow-600',
  qualified: 'bg-green-600',
  closed: 'bg-slate-600',
};

const urgencyColors = {
  low: 'text-slate-400',
  normal: 'text-blue-400',
  high: 'text-orange-400',
  urgent: 'text-red-400',
};

export default function ContactManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);

    if (!error) {
      loadSubmissions();
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from('contact_submissions')
      .update({ notes })
      .eq('id', id);

    if (!error) {
      loadSubmissions();
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      setSelectedId(null);
      loadSubmissions();
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const selected = selectedId ? submissions.find(s => s.id === selectedId) : null;

  if (loading) {
    return <div className="text-white">Loading contact submissions...</div>;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Contact Leads</h2>
            <p className="text-slate-400 mt-1">Manage incoming contact form submissions</p>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No contact submissions</h3>
            <p className="text-slate-400">Contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredSubmissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedId(sub.id)}
                className={`w-full text-left bg-slate-800 rounded-xl p-4 border transition ${
                  selectedId === sub.id
                    ? 'border-amber-500 ring-2 ring-amber-500/20'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{sub.name}</h3>
                      <span className={`px-2 py-0.5 ${statusColors[sub.status as keyof typeof statusColors]} text-white text-xs font-medium rounded`}>
                        {sub.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {sub.email}
                      </span>
                      {sub.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {sub.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-slate-300 line-clamp-2">{sub.message}</p>
                {sub.case_type && (
                  <span className="inline-block mt-2 px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                    {sub.case_type}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-1">
        {selected ? (
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 sticky top-24">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Lead Details</h3>
              <button
                onClick={() => deleteSubmission(selected.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-1">
                  Status
                  <Tooltip content="Track the current stage of this lead in your workflow" />
                </label>
                <select
                  value={selected.status}
                  onChange={(e) => updateStatus(selected.id, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-medium text-white mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <a href={`mailto:${selected.email}`} className="hover:text-amber-400 transition">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone className="w-4 h-4 text-slate-500" />
                      <a href={`tel:${selected.phone}`} className="hover:text-amber-400 transition">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    {new Date(selected.created_at).toLocaleString()}
                  </div>
                </div>
              </div>

              {selected.case_type && (
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="font-medium text-white mb-2">Case Type</h4>
                  <span className="inline-block px-3 py-1 bg-slate-700 text-slate-200 text-sm rounded-lg">
                    {selected.case_type}
                  </span>
                </div>
              )}

              <div className="pt-4 border-t border-slate-700">
                <h4 className="font-medium text-white mb-2">Message</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selected.message}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  Internal Notes
                  <Tooltip content="Add private notes about this lead. Not visible to the client." />
                </label>
                <textarea
                  value={selected.notes || ''}
                  onChange={(e) => updateNotes(selected.id, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-amber-500"
                  placeholder="Add notes about this lead..."
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
            <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">Select a lead to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
