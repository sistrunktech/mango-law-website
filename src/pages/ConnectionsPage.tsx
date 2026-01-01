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
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Copy,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { supabase, supabaseUrl } from '../lib/supabaseClient';

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

type IntegrationStatus = 'not_connected' | 'needs_setup' | 'healthy' | 'error';

type AccessCheckState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; checkedAt: string; data: Record<string, unknown> }
  | { status: 'error'; checkedAt: string; message: string };

const ACCESS_ROLE_COPY: Record<IntegrationType, { product: string; role: string; link: string }> = {
  business_profile: {
    product: 'Google Business Profile',
    role: 'Manager',
    link: 'https://business.google.com/',
  },
  analytics: {
    product: 'Google Analytics (GA4)',
    role: 'Viewer (minimum) or Editor (recommended)',
    link: 'https://analytics.google.com/',
  },
  search_console: {
    product: 'Google Search Console',
    role: 'Full user',
    link: 'https://search.google.com/search-console',
  },
  tag_manager: {
    product: 'Google Tag Manager',
    role: 'Read (minimum) or Publish (recommended)',
    link: 'https://tagmanager.google.com/',
  },
};

const NAMING_RECOMMENDATIONS: Record<IntegrationType, { title: string; lines: string[] }> = {
  business_profile: {
    title: 'Recommended naming',
    lines: [
      'Account: Mango Law LLC',
      'Location: Mango Law LLC — Delaware, OH',
      'Website: https://mango.law',
    ],
  },
  analytics: {
    title: 'Recommended naming',
    lines: [
      'Account: Mango Law',
      'GA4 Property: Mango Law | Website | Prod',
      'Web Data Stream: mango.law | Web | Prod',
      'Key events (GA4): page_view, cta_click, lead_submitted',
    ],
  },
  search_console: {
    title: 'Recommended naming',
    lines: [
      'Preferred: Domain property (DNS): sc-domain:mango.law',
      'Fallback: URL-prefix property: https://mango.law/',
    ],
  },
  tag_manager: {
    title: 'Recommended naming',
    lines: [
      'Account: Mango Law',
      'Container: Mango Law | mango.law | Web | Prod',
      'Workspace: Main',
      'Tags: GA4 | Config | mango.law | Prod; GA4 | Event | page_view; GA4 | Event | cta_click; GA4 | Event | lead_submitted',
      'Triggers: Event | mango_page_view; Event | cta_click; Event | lead_submitted; (optional) Click | Phone | tel:',
    ],
  },
};

function getIntegrationStatus(type: IntegrationType, integration?: GoogleIntegration): IntegrationStatus {
  if (!integration || !integration.is_active) return 'not_connected';

  const tokenExpiresAt = integration.token_expires_at ? new Date(integration.token_expires_at) : null;
  if (tokenExpiresAt && tokenExpiresAt.getTime() <= Date.now()) return 'error';

  if (type === 'business_profile') {
    if (!integration.location_id) return 'needs_setup';
    return 'healthy';
  }

  const metadata = integration.metadata || {};
  const hasKnownId =
    Boolean((metadata as any).propertyId) ||
    Boolean((metadata as any).siteUrl) ||
    Boolean((metadata as any).containerId);

  return hasKnownId ? 'healthy' : 'needs_setup';
}

function statusPill(status: IntegrationStatus) {
  switch (status) {
    case 'healthy':
      return { label: 'Connected (healthy)', icon: ShieldCheck, className: 'bg-green-900/30 text-green-300' };
    case 'needs_setup':
      return { label: 'Connected (needs setup)', icon: AlertCircle, className: 'bg-amber-900/30 text-amber-300' };
    case 'error':
      return { label: 'Error (reconnect)', icon: ShieldAlert, className: 'bg-red-900/30 text-red-300' };
    case 'not_connected':
    default:
      return { label: 'Not connected', icon: XCircle, className: 'bg-slate-800 text-slate-400' };
  }
}

function supportsAccountSelection(type: IntegrationType) {
  return type === 'business_profile' || type === 'analytics' || type === 'tag_manager';
}

type ResourceSelectionStateV2 = { accountValue: string; resourceValue: string; saving: boolean };

function getCurrentResourceValue(type: IntegrationType, integration?: GoogleIntegration): string {
  if (!integration) return '';
  if (type === 'business_profile') return integration.location_id || '';
  const metadata = integration.metadata || {};
  if (type === 'search_console') return String((metadata as any).siteUrl ?? '');
  if (type === 'analytics') return String((metadata as any).propertyId ?? '');
  if (type === 'tag_manager') return String((metadata as any).containerId ?? '');
  return '';
}

function getCurrentAccountValue(type: IntegrationType, integration?: GoogleIntegration): string {
  if (!integration) return '';
  if (!supportsAccountSelection(type)) return '';
  return integration.account_id || '';
}

function extractAccountOptions(type: IntegrationType, accessData: any): Array<{ value: string; label: string }> {
  if (!supportsAccountSelection(type) || !accessData) return [];

  if (type === 'analytics') {
    const accounts: any[] = accessData?.accounts?.all ?? accessData?.accounts?.sample ?? [];
    return accounts
      .map((a) => ({
        value: String(a?.name ?? ''),
        label: String(a?.displayName ?? a?.name ?? ''),
      }))
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  if (type === 'tag_manager') {
    const accounts: any[] = accessData?.accounts?.all ?? accessData?.accounts?.sample ?? [];
    return accounts
      .map((a) => ({
        value: String(a?.accountId ?? ''),
        label: String(a?.name ?? a?.accountName ?? a?.accountId ?? ''),
      }))
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  if (type === 'business_profile') {
    const accounts: any[] = accessData?.accounts?.all ?? accessData?.accounts?.sample ?? [];
    return accounts
      .map((a) => ({
        value: String(a?.name ?? ''),
        label: String(a?.accountName ?? a?.name ?? ''),
      }))
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  return [];
}

function extractResourceOptions(
  type: IntegrationType,
  accessData: any,
  accountValue?: string,
): Array<{ value: string; label: string }> {
  if (!accessData) return [];

  if (type === 'search_console') {
    const sites: any[] = accessData?.sites?.all ?? accessData?.sites?.sample ?? [];
    return sites
      .map((s) => ({ value: String(s?.siteUrl ?? ''), label: String(s?.siteUrl ?? '') }))
      .filter((o) => Boolean(o.value));
  }

  if (type === 'analytics') {
    const allProps: any[] = accessData?.properties?.all ?? accessData?.properties?.sample ?? [];
    const properties = accountValue ? allProps.filter((p) => String(p?.parent ?? '') === accountValue) : allProps;
    return properties
      .map((p) => {
        const value = String(p?.name ?? '');
        const displayName = String(p?.displayName ?? p?.name ?? '');
        const parent = String(p?.parent ?? '');
        const parentSuffix = parent ? ` (${parent})` : '';
        return { value, label: `${displayName}${accountValue ? '' : parentSuffix}` };
      })
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  if (type === 'tag_manager') {
    const allContainers: any[] = accessData?.containers?.all ?? accessData?.containers?.sample ?? [];
    const containers = accountValue ? allContainers.filter((c) => String(c?.accountId ?? '') === accountValue) : allContainers;
    return containers
      .map((c) => {
        const value = String(c?.containerId ?? '');
        const name = String(c?.name ?? c?.publicId ?? c?.containerId ?? '');
        const accountName = String(c?.accountName ?? c?.accountId ?? '');
        const accountLabel = accountValue ? '' : accountName ? ` (${accountName})` : '';
        return { value, label: `${name}${accountLabel}` };
      })
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  if (type === 'business_profile') {
    const allLocations: any[] = accessData?.locations?.all ?? accessData?.locations?.sample ?? [];
    const locations = accountValue ? allLocations.filter((l) => String(l?.accountName ?? '') === accountValue) : allLocations;
    return locations
      .map((l) => ({
        value: String(l?.name ?? ''),
        label: String(l?.title ?? l?.storefrontAddress?.addressLines?.join(', ') ?? l?.name ?? ''),
      }))
      .filter((o) => Boolean(o.value))
      .sort((a, b) => a.label.localeCompare(b.label));
  }

  return [];
}

function inferPreferredResource(type: IntegrationType, options: Array<{ value: string; label: string }>): string {
  if (options.length === 0) return '';

  if (type === 'search_console') {
    const domain = options.find((o) => o.value === 'sc-domain:mango.law');
    if (domain) return domain.value;
    const prefix = options.find((o) => o.value === 'https://mango.law/');
    if (prefix) return prefix.value;
  }

  // Prefer obvious Mango Law matches when possible.
  const mango = options.find((o) => /mango/i.test(o.label) || /mango/i.test(o.value));
  if (mango) return mango.value;

  return options[0].value;
}

import { SEO } from '../lib/seo';

export default function ConnectionsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [integrations, setIntegrations] = useState<GoogleIntegration[]>([]);
  const [loadingIntegrations, setLoadingIntegrations] = useState(true);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [guideOpen, setGuideOpen] = useState<Record<IntegrationType, boolean>>({
    business_profile: false,
    analytics: false,
    search_console: false,
    tag_manager: false,
  });
  const [accessChecks, setAccessChecks] = useState<Record<IntegrationType, AccessCheckState>>({
    business_profile: { status: 'idle' },
    analytics: { status: 'idle' },
    search_console: { status: 'idle' },
    tag_manager: { status: 'idle' },
  });
  const [resourceSelections, setResourceSelections] = useState<Record<IntegrationType, ResourceSelectionStateV2>>({
    business_profile: { accountValue: '', resourceValue: '', saving: false },
    analytics: { accountValue: '', resourceValue: '', saving: false },
    search_console: { accountValue: '', resourceValue: '', saving: false },
    tag_manager: { accountValue: '', resourceValue: '', saving: false },
  });

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

      const { data, error } = await supabase.functions.invoke('google-oauth-connect', {
        body: { integrationType },
      });

      if (error) throw error;
      const authUrl = data?.authUrl as string | undefined;
      if (!authUrl) throw new Error('Failed to generate OAuth URL');

      window.location.href = authUrl;
    } catch (error) {
      console.error('Connect error:', error);
      setMessage({ type: 'error', text: 'Failed to initiate connection. Please try again.' });
    } finally {
      setConnecting(null);
    }
  };

  const handleCheckAccess = async (integrationType: IntegrationType) => {
    if (!supabase) return;

    try {
      setAccessChecks((prev) => ({ ...prev, [integrationType]: { status: 'loading' } }));

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const checkedAt = new Date().toISOString();

      const { data: result, error } = await supabase.functions.invoke('google-access-check', {
        body: { integrationType },
      });

      if (error) {
        const errorMessage = error.message || 'Access check failed';
        setAccessChecks((prev) => ({
          ...prev,
          [integrationType]: { status: 'error', checkedAt, message: errorMessage },
        }));
        return;
      }

      setAccessChecks((prev) => ({
        ...prev,
        [integrationType]: { status: 'success', checkedAt, data: result },
      }));

      // Prime selection UI with an existing saved selection, or a sensible default.
      const integration = getIntegration(integrationType);
      const existingResource = getCurrentResourceValue(integrationType, integration);
      const existingAccount = getCurrentAccountValue(integrationType, integration);
      const accountOptions = extractAccountOptions(integrationType, result);
      const preferredAccount =
        (existingAccount && accountOptions.some((o) => o.value === existingAccount) ? existingAccount : '') ||
        accountOptions.find((o) => /mango/i.test(o.label) || /mango/i.test(o.value))?.value ||
        accountOptions[0]?.value ||
        '';

      const resourceOptions = extractResourceOptions(integrationType, result, preferredAccount);
      const preferredResource =
        (existingResource && resourceOptions.some((o) => o.value === existingResource) ? existingResource : '') ||
        inferPreferredResource(integrationType, resourceOptions);
      
      setResourceSelections((prev) => ({
        ...prev,
        [integrationType]: {
          ...prev[integrationType],
          accountValue: preferredAccount,
          resourceValue: preferredResource || '',
        },
      }));

      // Auto-save if we found a high-confidence match and no resource was previously saved
      const currentIntegration = integration;
      if (currentIntegration && !existingResource && preferredResource && /mango/i.test(preferredResource)) {
        console.log(`Auto-persisting inferred resource for ${integrationType}: ${preferredResource}`);
        
        const selection = { accountValue: preferredAccount, resourceValue: preferredResource };
        const integrationId = currentIntegration.id;

        if (integrationType === 'business_profile') {
          await supabase
            .from('google_integrations')
            .update({ 
              account_id: selection.accountValue || null, 
              location_id: selection.resourceValue, 
              updated_at: new Date().toISOString() 
            })
            .eq('id', integrationId);
        } else {
          const existingMeta = currentIntegration.metadata || {};
          const nextMeta = { ...existingMeta } as Record<string, unknown>;
          if (integrationType === 'search_console') nextMeta.siteUrl = selection.resourceValue;
          if (integrationType === 'analytics') nextMeta.propertyId = selection.resourceValue;
          if (integrationType === 'tag_manager') nextMeta.containerId = selection.resourceValue;

          await supabase
            .from('google_integrations')
            .update({ 
              account_id: supportsAccountSelection(integrationType) ? (selection.accountValue || null) : currentIntegration.account_id, 
              metadata: nextMeta, 
              updated_at: new Date().toISOString() 
            })
            .eq('id', integrationId);
        }
        await loadIntegrations();
      }
    } catch (error) {
      console.error('Access check error:', error);
      const checkedAt = new Date().toISOString();
      setAccessChecks((prev) => ({
        ...prev,
        [integrationType]: { status: 'error', checkedAt, message: 'Access check failed' },
      }));
    }
  };

  const handleSaveSelectedResource = async (integrationType: IntegrationType) => {
    if (!supabase) return;

    const integration = getIntegration(integrationType);
    if (!integration) return;

    const selection = resourceSelections[integrationType];
    const accountValue = (selection?.accountValue || '').trim();
    const resourceValue = (selection?.resourceValue || '').trim();

    if (!resourceValue) {
      setMessage({ type: 'error', text: 'Select a resource first, then click Save.' });
      setTimeout(() => setMessage(null), 3500);
      return;
    }

    try {
      setResourceSelections((prev) => ({ ...prev, [integrationType]: { ...prev[integrationType], saving: true } }));

      if (integrationType === 'business_profile') {
        const { error } = await supabase
          .from('google_integrations')
          .update({ account_id: accountValue || null, location_id: resourceValue, updated_at: new Date().toISOString() })
          .eq('id', integration.id);
        if (error) throw error;
      } else {
        const existingMeta = integration.metadata || {};
        const nextMeta = { ...existingMeta } as Record<string, unknown>;
        if (integrationType === 'search_console') nextMeta.siteUrl = resourceValue;
        if (integrationType === 'analytics') nextMeta.propertyId = resourceValue;
        if (integrationType === 'tag_manager') nextMeta.containerId = resourceValue;

        const { error } = await supabase
          .from('google_integrations')
          .update({ account_id: supportsAccountSelection(integrationType) ? (accountValue || null) : integration.account_id, metadata: nextMeta, updated_at: new Date().toISOString() })
          .eq('id', integration.id);
        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'Saved selection. Re-check status if needed.' });
      setTimeout(() => setMessage(null), 2500);
      await loadIntegrations();
    } catch (e) {
      console.error('Failed to save selection:', e);
      setMessage({ type: 'error', text: 'Failed to save selection. Check RLS/admin permissions.' });
      setTimeout(() => setMessage(null), 3500);
    } finally {
      setResourceSelections((prev) => ({ ...prev, [integrationType]: { ...prev[integrationType], saving: false } }));
    }
  };

  const handleCopyAccessEmail = async (integrationType: IntegrationType) => {
    const { product, role } = ACCESS_ROLE_COPY[integrationType];
    const body = [
      `Hi — can you please grant access for Mango Law’s ${product}?`,
      '',
      `Domain: mango.law`,
      `Requested role: ${role}`,
      '',
      `Access needed for: connection + verification (no billing changes).`,
      '',
      `Thanks!`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(body);
      setMessage({ type: 'success', text: 'Copied access request email to clipboard.' });
      setTimeout(() => setMessage(null), 2500);
    } catch {
      setMessage({ type: 'error', text: 'Failed to copy. Your browser may block clipboard access.' });
      setTimeout(() => setMessage(null), 3500);
    }
  };

  const handleCopyNaming = async (integrationType: IntegrationType) => {
    const rec = NAMING_RECOMMENDATIONS[integrationType];
    const body = [`${rec.title} (${integrationType})`, ...rec.lines].join('\n');
    try {
      await navigator.clipboard.writeText(body);
      setMessage({ type: 'success', text: 'Copied naming recommendations to clipboard.' });
      setTimeout(() => setMessage(null), 2500);
    } catch {
      setMessage({ type: 'error', text: 'Failed to copy. Your browser may block clipboard access.' });
      setTimeout(() => setMessage(null), 3500);
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
        `${supabaseUrl}/functions/v1/sync-google-reviews`,
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
      <SEO title="Google Connections | Mango Law LLC" noindex={true} />
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
          <p className="mt-2 text-xs text-slate-500">
            Supabase project: <span className="font-mono text-slate-300">{supabaseUrl}</span>
          </p>
        </div>

        <div className="grid gap-6">
          {(Object.keys(INTEGRATION_INFO) as IntegrationType[]).map((type) => {
            const info = INTEGRATION_INFO[type];
            const integration = getIntegration(type);
            const status = getIntegrationStatus(type, integration);
            const isConnected = status !== 'not_connected';
            const isLoading = connecting === type;
            const pill = statusPill(status);
            const PillIcon = pill.icon;
            const accessCheck = accessChecks[type];
            const selection = resourceSelections[type];
            const accountOptions =
              isConnected && accessCheck.status === 'success'
                ? extractAccountOptions(type, accessCheck.data)
                : [];
            const selectionOptions =
              isConnected && accessCheck.status === 'success'
                ? extractResourceOptions(type, accessCheck.data, selection.accountValue || undefined)
                : [];

            return (
              <div
                key={type}
                className={`bg-[#1A1A1A] rounded-xl border ${
                  status === 'healthy'
                    ? 'border-green-700/40'
                    : status === 'needs_setup'
                    ? 'border-amber-700/40'
                    : status === 'error'
                    ? 'border-red-700/40'
                    : 'border-[#2A2A2A]'
                } overflow-hidden`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{info.icon}</div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{info.name}</h3>
                          <span className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${pill.className}`}>
                            <PillIcon className="w-3 h-3" />
                            {pill.label}
                          </span>
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

                    <div className="flex flex-col gap-2 min-w-[170px]">
                      {status === 'not_connected' && (
                        <button
                          onClick={() => handleConnect(type)}
                          disabled={isLoading}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition disabled:opacity-50"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <ExternalLink className="w-4 h-4" />
                          )}
                          Connect
                        </button>
                      )}

                      {status === 'error' && (
                        <button
                          onClick={() => handleConnect(type)}
                          disabled={isLoading}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition disabled:opacity-50"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                          Reconnect
                        </button>
                      )}

                      {status === 'needs_setup' && (
                        <button
                          onClick={() => setGuideOpen((prev) => ({ ...prev, [type]: !prev[type] }))}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#232323] hover:bg-[#2A2A2A] text-white font-medium rounded-lg transition"
                        >
                          {guideOpen[type] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          Setup guide
                        </button>
                      )}

                      {status === 'healthy' && type === 'business_profile' && (
                        <button
                          onClick={() => handleSync(type)}
                          disabled={isLoading}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#E8A33C] hover:bg-[#d4922e] text-black font-medium rounded-lg transition disabled:opacity-50"
                        >
                          {isLoading ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                          Sync reviews
                        </button>
                      )}

                      {isConnected && (
                        <button
                          onClick={() => handleCheckAccess(type)}
                          disabled={accessCheck.status === 'loading'}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#232323] hover:bg-[#2A2A2A] text-white font-medium rounded-lg transition disabled:opacity-50"
                        >
                          {accessCheck.status === 'loading' ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                          Check status
                        </button>
                      )}

                      {isConnected && integration && (
                        <button
                          onClick={() => handleDisconnect(integration.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/35 text-red-300 font-medium rounded-lg transition"
                        >
                          <XCircle className="w-4 h-4" />
                          Disconnect
                        </button>
                      )}
                    </div>
                  </div>

                  {integration && (
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

                  {isConnected && guideOpen[type] && (
                    <div className="mt-4 p-4 bg-[#151515] border border-[#2A2A2A] rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-semibold text-white">Setup guide</h4>
                          <p className="text-sm text-slate-400 mt-1">
                            “Connect” stores access. “Check status” loads the Google resources this connection can see. Select the correct account/resource for <span className="text-slate-200">mango.law</span> and click Save.
                          </p>
                        </div>
                        <button
                          onClick={() => setGuideOpen((prev) => ({ ...prev, [type]: false }))}
                          className="text-slate-400 hover:text-white transition"
                          aria-label="Close setup guide"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <a
                          className="inline-flex items-center gap-2 px-3 py-2 bg-[#232323] hover:bg-[#2A2A2A] text-white rounded-lg text-sm transition"
                          href={ACCESS_ROLE_COPY[type].link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open {ACCESS_ROLE_COPY[type].product}
                        </a>
                        <button
                          onClick={() => handleCopyAccessEmail(type)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-[#232323] hover:bg-[#2A2A2A] text-white rounded-lg text-sm transition"
                        >
                          <Copy className="w-4 h-4" />
                          Copy access request
                        </button>
                        <button
                          onClick={() => handleCopyNaming(type)}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-[#232323] hover:bg-[#2A2A2A] text-white rounded-lg text-sm transition"
                        >
                          <Copy className="w-4 h-4" />
                          Copy naming
                        </button>
                      </div>

                      <div className="mt-3 text-sm text-slate-300">
                        <div className="font-medium text-slate-200">Common issues + fixes</div>
                        <ul className="mt-2 space-y-1 list-disc pl-5">
                          <li>Wrong account/resource selected (use the Account/Resource dropdowns under “Latest status check”, then Save).</li>
                          <li>Wrong signed-in Google user during OAuth (Reconnect, choose the correct Google user, then re-run “Check status”).</li>
                          <li>Insufficient permissions (request role: {ACCESS_ROLE_COPY[type].role}).</li>
                          <li>Resource not created yet in Google (create it, then re-run “Check status”).</li>
                        </ul>
                      </div>

                      <div className="mt-4 text-sm text-slate-300">
                        <div className="font-medium text-slate-200">{NAMING_RECOMMENDATIONS[type].title}</div>
                        <ul className="mt-2 space-y-1 list-disc pl-5">
                          {NAMING_RECOMMENDATIONS[type].lines.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {isConnected && accessCheck.status === 'success' && (
                    <div className="mt-4 p-4 bg-[#151515] border border-[#2A2A2A] rounded-lg">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-sm font-semibold text-white">Latest status check</h4>
                        <span className="text-xs text-slate-500">{formatDate(accessCheck.checkedAt)}</span>
                      </div>
                      <div className="mt-3 rounded-lg border border-[#2A2A2A] bg-black/20 p-3 relative z-10">
                        <div className="flex flex-wrap items-end justify-between gap-3">
                          <div className="min-w-[240px] flex-1">
                            <div className="text-xs font-semibold text-slate-300">Select resource (required for “healthy”)</div>
                            {supportsAccountSelection(type) && accountOptions.length > 0 ? (
                              <div className="mt-2">
                                <div className="text-[11px] font-semibold text-slate-400">Account</div>
                                <select
                                  value={selection.accountValue}
                                  onChange={(e) => {
                                    const nextAccount = e.target.value;
                                    const nextResourceOptions = extractResourceOptions(type, accessCheck.data, nextAccount);
                                    const nextResource = inferPreferredResource(type, nextResourceOptions);
                                    setResourceSelections((prev) => ({
                                      ...prev,
                                      [type]: { ...prev[type], accountValue: nextAccount, resourceValue: nextResource },
                                    }));
                                  }}
                                  className="mt-2 w-full cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C]/40 pointer-events-auto"
                                >
                                  <option value="">Choose…</option>
                                  {accountOptions.map((o) => (
                                    <option key={o.value} value={o.value}>
                                      {o.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            ) : null}

                            <div className="mt-3">
                              <div className="text-[11px] font-semibold text-slate-400">Resource</div>
                              <select
                                value={selection.resourceValue}
                                onChange={(e) =>
                                  setResourceSelections((prev) => ({
                                    ...prev,
                                    [type]: { ...prev[type], resourceValue: e.target.value },
                                  }))
                                }
                                className="mt-2 w-full cursor-pointer rounded-lg border border-[#2A2A2A] bg-[#0F0F0F] px-3 py-2 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8A33C]/40 disabled:cursor-not-allowed disabled:opacity-60 pointer-events-auto"
                                disabled={selectionOptions.length === 0}
                              >
                                <option value="">
                                  {selectionOptions.length === 0 ? 'No resources found — check permissions' : 'Choose…'}
                                </option>
                                {selectionOptions.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mt-2 text-xs text-slate-500">
                              Saved selection:{' '}
                              <span className="font-mono text-slate-300">{getCurrentResourceValue(type, integration) || '—'}</span>
                            </div>
                            {selectionOptions.length === 0 ? (
                              <div className="mt-2 text-xs text-slate-400">
                                If you have access but no resources appear, reconnect using the correct Google user and ensure the requested role is granted, then re-run “Check status”.
                              </div>
                            ) : null}
                          </div>

                          <button
                            onClick={() => handleSaveSelectedResource(type)}
                            disabled={!selection.resourceValue || selection.saving}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#232323] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2A2A2A] disabled:opacity-50"
                          >
                            {selection.saving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Link2 className="h-4 w-4" />}
                            Save
                          </button>
                        </div>
                      </div>
                      <details className="mt-3 rounded-lg border border-[#2A2A2A] bg-black/20 p-3">
                        <summary className="cursor-pointer select-none text-xs font-semibold text-slate-300">
                          Debug payload
                        </summary>
                        <pre className="mt-3 text-xs text-slate-300 overflow-auto max-h-56 bg-black/25 p-3 rounded">
                          {JSON.stringify(accessCheck.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}

                  {isConnected && accessCheck.status === 'error' && (
                    <div className="mt-4 p-4 bg-[#151515] border border-[#2A2A2A] rounded-lg">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-sm font-semibold text-white">Latest status check</h4>
                        <span className="text-xs text-slate-500">{formatDate(accessCheck.checkedAt)}</span>
                      </div>
                      <p className="mt-2 text-sm text-red-300">{accessCheck.message}</p>
                      <div className="mt-3 text-sm text-slate-400">
                        If access is missing, use “Copy access request”, grant permissions, then re-run “Check status”.
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
            “Connect” stores access. “Check status” loads accounts/resources and enables selection. If you have multiple Google accounts, choose the correct one in the Account dropdown, then choose the resource and click Save.
            Re-run “Check status” after changing permissions or creating a missing Google resource.
          </p>
        </div>
      </main>
    </div>
  );
}
