import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  FileText,
  Mail,
  MapPin,
  LogOut,
  Plus,
  HelpCircle,
  BookOpen,
  Star,
  Send,
  Users,
  Link2
} from 'lucide-react';
import BlogManager from '../components/admin/BlogManager';
import ContactManager from '../components/admin/ContactManager';
import CheckpointManager from '../components/admin/CheckpointManager';
import HandoffDocManager from '../components/admin/HandoffDocManager';
import ReviewCampaignManager from '../components/admin/ReviewCampaignManager';
import ReviewManager from '../components/admin/ReviewManager';
import SocialMediaManager from '../components/admin/SocialMediaManager';
import SEORankManager from '../components/admin/SEORankManager';

type Tab = 'blog' | 'contacts' | 'checkpoints' | 'docs' | 'campaigns' | 'reviews' | 'social' | 'seo';

import { SEO } from '../lib/seo';

export default function AdminDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('blog');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'blog' as Tab, label: 'Blog Posts', icon: FileText },
    { id: 'seo' as Tab, label: 'Search Intelligence', icon: Link2 },
    { id: 'social' as Tab, label: 'Social Media', icon: Send },
    { id: 'campaigns' as Tab, label: 'Review Campaigns', icon: Users },
    { id: 'reviews' as Tab, label: 'Google Reviews', icon: Star },
    { id: 'contacts' as Tab, label: 'Contact Leads', icon: Mail },
    { id: 'checkpoints' as Tab, label: 'DUI Checkpoints', icon: MapPin },
    { id: 'docs' as Tab, label: 'Handoff Docs', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <SEO title="Admin Dashboard | Mango Law LLC" noindex={true} />
      <header className="bg-[#1A1A1A] border-b border-[#2A2A2A] sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#E8A33C] to-[#FFB84D] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ML</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Mango Law CMS</h1>
                <p className="text-xs text-slate-400">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/admin/connections')}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-[#232323] rounded-lg transition"
                title="Connections & Integrations"
              >
                <Link2 className="w-5 h-5" />
                <span className="hidden sm:inline">Connections</span>
              </button>

              <button
                onClick={() => window.open('/docs/admin-guide', '_blank')}
                className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-[#232323] rounded-lg transition"
                title="Help & Documentation"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Help</span>
              </button>

              <div className="flex items-center gap-3 px-3 py-2 bg-[#232323] rounded-lg border border-[#2A2A2A]">
                <div className="w-8 h-8 bg-gradient-to-br from-[#E8A33C] to-[#FFB84D] rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-sm text-slate-300 hidden sm:inline">{user.email}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          <nav className="flex gap-1 -mb-px overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#E8A33C] border-b-2 border-[#E8A33C] bg-[#232323]/50'
                      : 'text-slate-400 hover:text-white hover:bg-[#232323]/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'seo' && <SEORankManager />}
        {activeTab === 'social' && <SocialMediaManager />}
        {activeTab === 'campaigns' && <ReviewCampaignManager />}
        {activeTab === 'reviews' && <ReviewManager />}
        {activeTab === 'contacts' && <ContactManager />}
        {activeTab === 'checkpoints' && <CheckpointManager />}
        {activeTab === 'docs' && <HandoffDocManager />}
      </main>
    </div>
  );
}
