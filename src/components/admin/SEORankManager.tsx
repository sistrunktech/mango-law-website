'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Tooltip from './Tooltip';

interface SEOKeyword {
  id: string;
  keyword: string;
  location_context: string;
  target_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface SEORanking {
  id: string;
  keyword_id: string;
  rank: number | null;
  is_local_pack: boolean;
  created_at: string;
}

interface KeywordStats extends SEOKeyword {
  currentRank: number | null;
  previousRank: number | null;
  isInLocalPack: boolean;
  lastChecked: string | null;
}

export default function SEORankManager() {
  const [keywords, setKeywords] = useState<KeywordStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKeyword, setNewEditForm] = useState({
    keyword: '',
    location_context: 'Delaware, Ohio, United States',
    target_url: 'https://mango.law'
  });

  useEffect(() => {
    loadKeywordData();
  }, []);

  const loadKeywordData = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      // Fetch keywords
      const { data: kws, error: kwsError } = await supabase
        .from('seo_keywords')
        .select('*')
        .order('keyword', { ascending: true });

      if (kwsError) throw kwsError;

      // Fetch latest 2 rankings for each keyword to show trend
      const { data: rankings, error: ranksError } = await supabase
        .from('seo_rankings')
        .select('*')
        .order('created_at', { ascending: false });

      if (ranksError) throw ranksError;

      const stats: KeywordStats[] = (kws || []).map(kw => {
        const kwRankings = (rankings || []).filter(r => r.keyword_id === kw.id);
        const current = kwRankings[0];
        const previous = kwRankings[1];

        return {
          ...kw,
          currentRank: current?.rank ?? null,
          previousRank: previous?.rank ?? null,
          isInLocalPack: current?.is_local_pack ?? false,
          lastChecked: current?.created_at ?? null
        };
      });

      setKeywords(stats);
    } catch (err) {
      console.error('Error loading SEO data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;

    try {
      const { error } = await supabase
        .from('seo_keywords')
        .insert([newKeyword]);

      if (error) throw error;

      setShowAddModal(false);
      setNewEditForm({
        keyword: '',
        location_context: 'Delaware, Ohio, United States',
        target_url: 'https://mango.law'
      });
      loadKeywordData();
    } catch (err) {
      alert(`Error adding keyword: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDeleteKeyword = async (id: string) => {
    if (!supabase || !confirm('Are you sure? This will delete all ranking history for this keyword.')) return;

    try {
      const { error } = await supabase
        .from('seo_keywords')
        .delete()
        .eq('id', id);

      if (error) throw error;
      loadKeywordData();
    } catch (err) {
      alert(`Error deleting keyword: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const triggerRankCheck = async () => {
    if (!supabase || checking) return;
    setChecking(true);
    try {
      const { data, error } = await supabase.functions.invoke('check-rankings');
      if (error) throw error;
      await loadKeywordData();
      alert('Rank check completed successfully!');
    } catch (err) {
      console.error('Error triggering rank check:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to trigger check'}`);
    } finally {
      setChecking(false);
    }
  };

  const getTrendIcon = (current: number | null, previous: number | null) => {
    if (current === null) return <Minus className="w-4 h-4 text-slate-500" />;
    if (previous === null) return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (current < previous) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current > previous) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-slate-500" />;
  };

  if (loading) {
    return <div className="text-white">Loading Search Intelligence...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Search Intelligence</h2>
          <p className="text-slate-400 mt-1">Track keyword rankings and local pack performance</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerRankCheck}
            disabled={checking}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
            {checking ? 'Checking...' : 'Check All Now'}
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition"
          >
            <Plus className="w-4 h-4" />
            Add Keyword
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 text-slate-400 mb-2 text-sm font-medium">
            <Target className="w-4 h-4 text-amber-500" />
            Total Keywords
          </div>
          <div className="text-2xl font-bold text-white">{keywords.length}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 text-slate-400 mb-2 text-sm font-medium">
            <MapPin className="w-4 h-4 text-blue-500" />
            In Local Pack
          </div>
          <div className="text-2xl font-bold text-white">
            {keywords.filter(k => k.isInLocalPack).length}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center gap-3 text-slate-400 mb-2 text-sm font-medium">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Top 10 Rankings
          </div>
          <div className="text-2xl font-bold text-white">
            {keywords.filter(k => k.currentRank !== null && k.currentRank <= 10).length}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Keyword / Context</th>
                <th className="px-6 py-4 font-medium">Current Rank</th>
                <th className="px-6 py-4 font-medium">Trend</th>
                <th className="px-6 py-4 font-medium">Local Pack</th>
                <th className="px-6 py-4 font-medium">Last Checked</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {keywords.map((kw) => (
                <tr key={kw.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{kw.keyword}</div>
                    <div className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {kw.location_context}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {kw.currentRank ? (
                      <span className={`text-lg font-bold ${kw.currentRank <= 3 ? 'text-amber-400' : kw.currentRank <= 10 ? 'text-white' : 'text-slate-300'}`}>
                        #{kw.currentRank}
                      </span>
                    ) : (
                      <span className="text-slate-500">100+</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(kw.currentRank, kw.previousRank)}
                      {kw.previousRank && kw.currentRank && kw.currentRank !== kw.previousRank && (
                        <span className="text-xs text-slate-500">
                          (was #{kw.previousRank})
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {kw.isInLocalPack ? (
                      <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-900/30 text-blue-300 text-xs font-semibold rounded-full border border-blue-700/30">
                        <MapPin className="w-3 h-3" />
                        MAP PACK
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {kw.lastChecked ? new Date(kw.lastChecked).toLocaleDateString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteKeyword(kw.id)}
                      className="p-2 text-slate-500 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                      title="Delete keyword"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {keywords.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <h3 className="text-slate-300 font-medium">No keywords tracked yet</h3>
                    <p className="text-slate-500 text-sm mt-1">Add your first keyword to start tracking rankings</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white">Add New Keyword</h3>
              <p className="text-slate-400 text-sm mt-1">Track rankings for a specific term and location</p>
            </div>
            <form onSubmit={handleAddKeyword} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Keyword</label>
                <input
                  required
                  type="text"
                  value={newKeyword.keyword}
                  onChange={(e) => setNewEditForm({ ...newKeyword, keyword: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="e.g. OVI lawyer Delaware OH"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Location Context</label>
                <input
                  required
                  type="text"
                  value={newKeyword.location_context}
                  onChange={(e) => setNewEditForm({ ...newKeyword, location_context: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="City, State, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Target URL</label>
                <input
                  required
                  type="url"
                  value={newKeyword.target_url}
                  onChange={(e) => setNewEditForm({ ...newKeyword, target_url: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black rounded-lg transition font-bold"
                >
                  Add Keyword
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
