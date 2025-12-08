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
  BookOpen
} from 'lucide-react';
import BlogManager from '../components/admin/BlogManager';
import ContactManager from '../components/admin/ContactManager';
import CheckpointManager from '../components/admin/CheckpointManager';

type Tab = 'blog' | 'contacts' | 'checkpoints' | 'docs';

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
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
    { id: 'contacts' as Tab, label: 'Contact Leads', icon: Mail },
    { id: 'checkpoints' as Tab, label: 'DUI Checkpoints', icon: MapPin },
    { id: 'docs' as Tab, label: 'Documentation', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">ML</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Mango Law CMS</h1>
                <p className="text-xs text-slate-400">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => window.open('/docs/admin-guide', '_blank')}
                className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
                title="Help & Documentation"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline">Help</span>
              </button>

              <div className="flex items-center gap-3 px-3 py-2 bg-slate-700 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user.email?.[0].toUpperCase()}
                </div>
                <span className="text-sm text-slate-200 hidden sm:inline">{user.email}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-slate-400 hover:text-slate-200'
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
        {activeTab === 'contacts' && <ContactManager />}
        {activeTab === 'checkpoints' && <CheckpointManager />}
        {activeTab === 'docs' && <DocsViewer />}
      </main>
    </div>
  );
}

function DocsViewer() {
  return (
    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-4">Documentation</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-slate-300">
          Welcome to the Mango Law CMS documentation. Here you'll find guides and tutorials
          for managing your website content.
        </p>

        <div className="grid gap-4 mt-6">
          <a
            href="/docs/admin-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-slate-700 hover:bg-slate-600 rounded-lg transition no-underline"
          >
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              Complete Admin Guide
            </h3>
            <p className="text-slate-400 text-sm">
              Comprehensive guide covering all CMS features with screenshots and examples
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
