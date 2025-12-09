import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowLeft,
  Link2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface GoogleIntegration {
  id: string;
  integration_type: string;
  is_active: boolean;
  account_id: string | null;
  location_id: string | null;
  last_synced_at: string | null;
  token_expires_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

const INTEGRATION_INFO = {
  business_profile: {
    name: 'Google Business Profile',
    description: 'Sync reviews and respond to customers',
    icon: '🏢',
    features: ['Review sync', 'AI-powered responses', 'Sentiment analysis'],
  },
  analytics: {
    name: 'Google Analytics',
    description: 'Track website traffic and conversions',
    icon: '📊',
    features: ['Traffic reports', 'Conversion tracking', 'User behavior'],
  },
  search_console: {
    name: 'Google Search Console',
    description: 'Monitor search performance and indexing',
    icon: '🔍',
    features: ['Search queries', 'Indexing status', 'Core Web Vitals'],
  },
  tag_manager: {
    name: 'Google Tag Manager',
    description: 'Manage tracking tags and pixels',
    icon: '🏷️',
    features: ['Tag deployment', 'Event tracking', 'Container management'],
  },
};

type IntegrationType = keyof typeof INTEGRATION_INFO;

export default function ConnectionsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [integrations, setIntegrations] = useState<GoogleIntegration[]>([]);
  const [loadingIntegrations, setLoadingIntegrations] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    loadIntegrations();
  }, []);

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success) {
      setMessage({ type: 'success', text: `Successfully connected ${success.replace('_', ' ')}!` });
      loadIntegrations();
    } else if (error) {
      setMessage({ type: 'error', text: `Connection failed: ${error.replace(/_/g, ' ')}` });
    }

    if (success || error) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const loadIntegrations = async () => {
    if (!supabase) return;

    try {
      setLoadingIntegrations(true);
      const { data, error } = await supabase
        .from('google_integrations')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setIntegrations(data || []);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    } finally {
      setLoadingIntegrations(false);
    }
  };

  const handleConnect = async (integrationType: IntegrationType) => {
    if (!supabase) return;

    try {
      setConnecting(integrationType);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-oauth-connect`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ integrationType }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate OAuth URL');
      }

      const { authUrl } = await response.json();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Connect error:', error);
      setMessage({ type: 'error', text: 'Failed to initiate connection. Please try again.' });
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = async (integrationId: string) => {
    if (!supabase) return;

    if (!confirm('Are you sure you want to disconnect this integration?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('google_integrations')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', integrationId);

      if (error) throw error;
      setMessage({ type: 'success', text: 'Integration disconnected successfully.' });
      loadIntegrations();
    } catch (error) {
      console.error('Disconnect error:', error);
      setMessage({ type: 'error', text: 'Failed to disconnect integration.' });
    }
  };

  const handleSync = async (integrationType: string) => {
    if (!supabase) return;

    try {
      setConnecting(integrationType);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-google-reviews`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Sync failed');
      }

      setMessage({ type: 'success', text: `Synced ${result.totalReviews} reviews (${result.newReviews} new, ${result.updatedReviews} updated)` });
      loadIntegrations();
    } catch (error) {
      console.error('Sync error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Sync failed' });
    } finally {
      setConnecting(null);
    }
  };

  const getIntegration = (type: IntegrationType): GoogleIntegration | undefined => {
    return integrations.find(i => i.integration_type === type && i.is_active);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  if (loading || loadingIntegrations) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <header className="bg-[#1A1A1A] border-b border-[#2A2A2A] sticky top-0 z-50 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-[#E8A33C]" />
              <h1 className="text-lg font-semibold text-white">Connections</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-900/30 border border-green-700 text-green-300'
                : 'bg-red-900/30 border border-red-700 text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Google Integrations</h2>
          <p className="text-slate-400">
            Connect your Google accounts to enable review syncing, analytics, and more.
          </p>
        </div>

        <div className="grid gap-6">
          {(Object.keys(INTEGRATION_INFO) as IntegrationType[]).map((type) => {
            const info = INTEGRATION_INFO[type];
            const integration = getIntegration(type);
            const isConnected = !!integration;
            const isLoading = connecting === type;

            return (
              <div
                key={type}
                className={`bg-[#1A1A1A] rounded-xl border ${
                  isConnected ? 'border-green-700/50' : 'border-[#2A2A2A]'
                } overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{info.icon}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{info.name}</h3>
                          {isConnected ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-900/30 text-green-400 text-xs font-medium rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Connected
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-800 text-slate-400 text-xs font-medium rounded-full">
                              <XCircle className="w-3 h-3" />
                              Not Connected
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{info.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {info.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-[#232323] text-slate-300 text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {isConnected ? (
                        <>
                          {type === 'business_profile' && (
                            <button
                              onClick={() => handleSync(type)}
                              disabled={isLoading}
                              className="flex items-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition disabled:opacity-50"
                            >
                              {isLoading ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                              ) : (
                                <RefreshCw className="w-4 h-4" />
                              )}
                              Sync Now
                            </button>
                          )}
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-medium rounded-lg transition"
                          >
                            <XCircle className="w-4 h-4" />
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(type)}
                          disabled={isLoading}
                          className="flex items-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition disabled:opacity-50"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                          Connect
                        </button>
                      )}
                    </div>
                  </div>

                  {isConnected && (
                    <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                        {integration.location_id && (
                          <div>
                            <span className="text-slate-500">Location ID</span>
                            <p className="text-slate-300 font-mono text-xs truncate">
                              {integration.location_id}
                            </p>
                          </div>
                        )}
                        <div>
                          <span className="text-slate-500">Last Synced</span>
                          <p className="text-slate-300 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(integration.last_synced_at)}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Connected</span>
                          <p className="text-slate-300">
                            {formatDate(integration.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Need Help?</h3>
          <p className="text-sm text-slate-500">
            To set up Google integrations, you need to configure your Google OAuth credentials.
            Contact your administrator if you need assistance with the initial setup.
          </p>
        </div>
      </main>
    </div>
  );
}
