'use client';

import { useEffect, useMemo, useState, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  FileText,
  HelpCircle,
  Link2,
  LogOut,
  Mail,
  MapPin,
  Send,
  Star,
  Users,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import BlogManager from '../components/admin/BlogManager';
import ContactManager from '../components/admin/ContactManager';
import CheckpointManager from '../components/admin/CheckpointManager';
import HandoffDocManager from '../components/admin/HandoffDocManager';
import ReviewCampaignManager from '../components/admin/ReviewCampaignManager';
import ReviewManager from '../components/admin/ReviewManager';
import SocialMediaManager from '../components/admin/SocialMediaManager';
import SEORankManager from '../components/admin/SEORankManager';

import { SEO } from '../lib/seo';

type Tab = 'blog' | 'contacts' | 'checkpoints' | 'docs' | 'campaigns' | 'reviews' | 'social' | 'seo';

const tabMeta: Record<
  Tab,
  {
    label: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    group: 'daily' | 'growth' | 'ops';
  }
> = {
  contacts: {
    label: 'New Leads',
    description: 'Review new intake, update status, and follow up quickly.',
    icon: Mail,
    group: 'daily',
  },
  blog: {
    label: 'Publishing',
    description: 'Draft, revise, and publish articles and content updates.',
    icon: FileText,
    group: 'daily',
  },
  campaigns: {
    label: 'Review Campaigns',
    description: 'Manage outreach and monitor invitation activity.',
    icon: Users,
    group: 'daily',
  },
  reviews: {
    label: 'Google Reviews',
    description: 'Monitor incoming reviews and prepare responses.',
    icon: Star,
    group: 'daily',
  },
  seo: {
    label: 'Search Visibility',
    description: 'Track rankings, indexing, and the search execution queue.',
    icon: Link2,
    group: 'growth',
  },
  social: {
    label: 'Social Posts',
    description: 'Plan and manage social promotion tied to new content.',
    icon: Send,
    group: 'growth',
  },
  checkpoints: {
    label: 'Checkpoint Data',
    description: 'Review announced checkpoint records and supporting inputs.',
    icon: MapPin,
    group: 'growth',
  },
  docs: {
    label: 'Handoff Docs',
    description: 'Generate, review, and share client-facing documents.',
    icon: BookOpen,
    group: 'ops',
  },
};

const tabGroups = [
  { key: 'daily' as const, label: 'Daily work' },
  { key: 'growth' as const, label: 'Growth & reporting' },
  { key: 'ops' as const, label: 'Operations' },
];

const quickActionTabs: Tab[] = ['contacts', 'blog', 'seo', 'campaigns'];

export default function AdminDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('contacts');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [loading, router, user]);

  const activeTabMeta = useMemo(() => tabMeta[activeTab], [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <SEO title="Admin Dashboard | Mango Law LLC" noindex={true} />

      <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#101010]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8A33C] to-[#FFB84D] text-lg font-bold text-white shadow-lg">
                ML
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E8A33C]">
                  Mango Law Admin
                </p>
                <h1 className="mt-1 text-2xl font-bold text-white">Daily publishing, leads, and search operations</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  Use this dashboard for the work that changes the live site and the client-facing reporting first. Configuration and docs stay in secondary actions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => router.push('/admin/connections')}
                className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-[#E8A33C]/30 hover:text-white"
              >
                <Link2 className="h-4 w-4" />
                Connections
              </button>
              <button
                onClick={() => window.open('/docs/admin-guide', '_blank')}
                className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-[#E8A33C]/30 hover:text-white"
              >
                <HelpCircle className="h-4 w-4" />
                Guide
              </button>
              <div className="inline-flex items-center gap-3 rounded-full border border-[#2A2A2A] bg-[#1A1A1A] px-3 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E8A33C] to-[#FFB84D] text-sm font-semibold text-white">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="hidden text-sm text-slate-300 sm:inline">{user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {quickActionTabs.map((tab) => {
              const meta = tabMeta[tab];
              const Icon = meta.icon;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-[1.25rem] border p-4 text-left transition ${
                    activeTab === tab
                      ? 'border-[#E8A33C]/40 bg-[#2A2418] shadow-lg'
                      : 'border-[#2A2A2A] bg-[#171717] hover:border-[#E8A33C]/20 hover:bg-[#1D1D1D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8A33C]/12 text-[#E8A33C]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{meta.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">{meta.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 space-y-4">
            {tabGroups.map((group) => (
              <div key={group.key}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(tabMeta) as Tab[])
                    .filter((tab) => tabMeta[tab].group === group.key)
                    .map((tab) => {
                      const meta = tabMeta[tab];
                      const Icon = meta.icon;

                      return (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                            activeTab === tab
                              ? 'border-[#E8A33C]/40 bg-[#E8A33C]/10 text-[#F3C26E]'
                              : 'border-[#2A2A2A] bg-[#171717] text-slate-300 hover:border-[#E8A33C]/20 hover:text-white'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {meta.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-[1.5rem] border border-[#2A2A2A] bg-[#171717] px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A33C]">
            Active workspace
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">{activeTabMeta.label}</h2>
          <p className="mt-1 text-sm text-slate-400">{activeTabMeta.description}</p>
        </div>

        {activeTab === 'contacts' && <ContactManager />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'campaigns' && <ReviewCampaignManager />}
        {activeTab === 'reviews' && <ReviewManager />}
        {activeTab === 'seo' && <SEORankManager />}
        {activeTab === 'social' && <SocialMediaManager />}
        {activeTab === 'checkpoints' && <CheckpointManager />}
        {activeTab === 'docs' && <HandoffDocManager />}
      </main>
    </div>
  );
}
