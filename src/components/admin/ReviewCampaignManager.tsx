'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Users,
  Send,
  TrendingUp,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Search,
  Download
} from 'lucide-react';
import AccessibleTable, { Column } from '../AccessibleTable';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  case_type: string;
  service_date: string;
  review_request_status: string;
  review_request_sent_date: string | null;
  campaign_id: string | null;
  created_at: string;
}

interface Campaign {
  id: string;
  name: string;
  description: string;
  status: string;
  scheduled_date: string | null;
  total_sent: number;
  total_clicked: number;
  total_completed: number;
  total_declined: number;
  created_at: string;
}

export default function ReviewCampaignManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'campaigns' | 'clients'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clientsData, campaignsData] = await Promise.all([
        supabase?.from('clients').select('*').order('created_at', { ascending: false }),
        supabase?.from('review_campaigns').select('*').order('created_at', { ascending: false })
      ]);

      if (clientsData?.data) setClients(clientsData.data);
      if (campaignsData?.data) setCampaigns(campaignsData.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.case_type?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter = filterStatus === 'all' || client.review_request_status === filterStatus;

      return matchesSearch && matchesFilter;
    });
  }, [clients, searchTerm, filterStatus]);

  const clientTableColumns: Column<Client>[] = useMemo(() => [
    {
      key: 'name',
      label: 'Client',
      sortable: true,
      render: (_, row) => (
        <div>
          <div className="text-sm font-medium text-white">{row.name}</div>
          <div className="text-xs text-slate-400">{row.email}</div>
        </div>
      ),
    },
    {
      key: 'case_type',
      label: 'Case Type',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-300">{(value as string) || 'N/A'}</span>
      ),
    },
    {
      key: 'service_date',
      label: 'Service Date',
      sortable: true,
      render: (value) => (
        <span className="text-sm text-slate-300">
          {value ? new Date(value as string).toLocaleDateString() : 'N/A'}
        </span>
      ),
    },
    {
      key: 'review_request_status',
      label: 'Status',
      sortable: true,
      render: (value) => {
        const status = value as string;
        return (
          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'completed'
              ? 'bg-green-500/20 text-green-400'
              : status === 'sent'
              ? 'bg-blue-500/20 text-blue-400'
              : status === 'clicked'
              ? 'bg-purple-500/20 text-purple-400'
              : 'bg-slate-500/20 text-slate-400'
          }`}>
            {status.replace('_', ' ')}
          </span>
        );
      },
    },
    {
      key: 'id',
      label: 'Actions',
      sortable: false,
      render: () => (
        <button
          type="button"
          className="text-[#E8A33C] hover:text-[#FFB84D] text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C] rounded px-2 py-1"
          aria-label="Send review request"
        >
          Send Request
        </button>
      ),
    },
  ], []);

  const stats = {
    totalClients: clients.length,
    notSent: clients.filter(c => c.review_request_status === 'not_sent').length,
    sent: clients.filter(c => c.review_request_status === 'sent').length,
    completed: clients.filter(c => c.review_request_status === 'completed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-300">Loading review campaigns...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Review Request Campaigns</h2>
          <p className="text-slate-300 mt-1">
            Manage client review requests and track campaign performance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition shadow-lg">
          <Plus className="w-4 h-4" aria-hidden="true" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Total Clients</span>
            <Users className="w-5 h-5 text-[#E8A33C]" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalClients}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Pending Requests</span>
            <Calendar className="w-5 h-5 text-blue-400" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.notSent}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Sent</span>
            <Send className="w-5 h-5 text-purple-400" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.sent}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Completed</span>
            <TrendingUp className="w-5 h-5 text-green-400" aria-hidden="true" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.completed}</div>
          <div className="text-xs text-slate-400 mt-1">
            {stats.sent > 0 ? `${Math.round((stats.completed / stats.sent) * 100)}% conversion` : 'N/A'}
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10" role="tablist" aria-label="View options">
        <button
          role="tab"
          aria-selected={view === 'campaigns'}
          aria-controls="campaigns-panel"
          id="campaigns-tab"
          onClick={() => setView('campaigns')}
          className={`px-4 py-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C] ${
            view === 'campaigns'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Campaigns
        </button>
        <button
          role="tab"
          aria-selected={view === 'clients'}
          aria-controls="clients-panel"
          id="clients-tab"
          onClick={() => setView('clients')}
          className={`px-4 py-2 font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C] ${
            view === 'clients'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Clients
        </button>
      </div>

      {view === 'campaigns' ? (
        <div
          id="campaigns-panel"
          role="tabpanel"
          aria-labelledby="campaigns-tab"
          className="space-y-4"
        >
          {campaigns.length === 0 ? (
            <div className="bg-[#2F5F4F] rounded-lg p-12 text-center border border-white/10">
              <Send className="w-12 h-12 text-slate-500 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg font-semibold text-white mb-2">No Campaigns Yet</h3>
              <p className="text-slate-400 mb-4">
                Create your first review request campaign to start collecting reviews
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition">
                Create Campaign
              </button>
            </div>
          ) : (
            campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10 hover:border-[#E8A33C]/30 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{campaign.name}</h3>
                    <p className="text-sm text-slate-400">{campaign.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-slate-400 hover:text-white hover:bg-[#1B4332] rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C]"
                      aria-label={`Edit ${campaign.name}`}
                    >
                      <Edit2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <button
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      aria-label={`Delete ${campaign.name}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{campaign.total_sent}</div>
                    <div className="text-xs text-slate-400">Sent</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">{campaign.total_clicked}</div>
                    <div className="text-xs text-slate-400">Clicked</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">{campaign.total_completed}</div>
                    <div className="text-xs text-slate-400">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#E8A33C]">
                      {campaign.total_sent > 0
                        ? `${Math.round((campaign.total_completed / campaign.total_sent) * 100)}%`
                        : '0%'}
                    </div>
                    <div className="text-xs text-slate-400">Conversion</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div
          id="clients-panel"
          role="tabpanel"
          aria-labelledby="clients-tab"
          className="space-y-4"
        >
          <div className="flex gap-4">
            <div className="relative flex-1">
              <label htmlFor="client-search" className="sr-only">Search clients</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
              <input
                id="client-search"
                type="search"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2F5F4F] border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
              />
            </div>
            <div>
              <label htmlFor="status-filter" className="sr-only">Filter by status</label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-[#2F5F4F] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
              >
                <option value="all">All Statuses</option>
                <option value="not_sent">Not Sent</option>
                <option value="sent">Sent</option>
                <option value="clicked">Clicked</option>
                <option value="completed">Completed</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-[#2F5F4F] border border-white/10 rounded-lg text-white hover:bg-[#1B4332] transition flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C]"
              aria-label="Export client data"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Export
            </button>
          </div>

          <div className="bg-[#2F5F4F] rounded-lg border border-white/10 overflow-hidden">
            <AccessibleTable
              data={filteredClients}
              columns={clientTableColumns}
              caption="Client review request management table"
              showCaption={false}
              emptyMessage="No clients found matching your criteria"
              rowKeyField="id"
              variant="dark"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
