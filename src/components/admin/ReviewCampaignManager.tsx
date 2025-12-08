import { useState, useEffect } from 'react';
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
  Filter,
  Download
} from 'lucide-react';

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

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.case_type?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || client.review_request_status === filterStatus;

    return matchesSearch && matchesFilter;
  });

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
          <Plus className="w-4 h-4" />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Total Clients</span>
            <Users className="w-5 h-5 text-[#E8A33C]" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalClients}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Pending Requests</span>
            <Calendar className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.notSent}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Sent</span>
            <Send className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.sent}</div>
        </div>

        <div className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 text-sm">Completed</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.completed}</div>
          <div className="text-xs text-slate-400 mt-1">
            {stats.sent > 0 ? `${Math.round((stats.completed / stats.sent) * 100)}% conversion` : 'N/A'}
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setView('campaigns')}
          className={`px-4 py-2 font-medium transition ${
            view === 'campaigns'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Campaigns
        </button>
        <button
          onClick={() => setView('clients')}
          className={`px-4 py-2 font-medium transition ${
            view === 'clients'
              ? 'text-[#E8A33C] border-b-2 border-[#E8A33C]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Clients
        </button>
      </div>

      {view === 'campaigns' ? (
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <div className="bg-[#2F5F4F] rounded-lg p-12 text-center border border-white/10">
              <Send className="w-12 h-12 text-slate-500 mx-auto mb-4" />
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
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-[#1B4332] rounded transition">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition">
                      <Trash2 className="w-4 h-4" />
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
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#2F5F4F] border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
              />
            </div>
            <select
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
            <button className="px-4 py-2 bg-[#2F5F4F] border border-white/10 rounded-lg text-white hover:bg-[#1B4332] transition flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="bg-[#2F5F4F] rounded-lg border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1B4332]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Case Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Service Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-[#1B4332]/50 transition">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-white">{client.name}</div>
                      <div className="text-xs text-slate-400">{client.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{client.case_type || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {client.service_date ? new Date(client.service_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        client.review_request_status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : client.review_request_status === 'sent'
                          ? 'bg-blue-500/20 text-blue-400'
                          : client.review_request_status === 'clicked'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {client.review_request_status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[#E8A33C] hover:text-[#FFB84D] text-sm font-medium">
                        Send Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
