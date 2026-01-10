'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, FileText, Edit2, Share2, Download, Trash2, Eye, Calendar, AlertCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import HandoffGenerationModal from './HandoffGenerationModal';
import HandoffShareModal from './HandoffShareModal';

interface HandoffDocument {
  id: string;
  title: string;
  version: string;
  status: string;
  markdown_content: string;
  metadata: {
    wordCount?: number;
    sections?: string[];
    gapCount?: number;
  };
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export default function HandoffDocManager() {
  const [documents, setDocuments] = useState<HandoffDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerationModal, setShowGenerationModal] = useState(false);
  const [shareDocument, setShareDocument] = useState<HandoffDocument | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    if (!supabase) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('handoff_documents')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!supabase) return;
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) return;

    const { error } = await supabase
      .from('handoff_documents')
      .delete()
      .eq('id', id);

    if (!error) {
      loadDocuments();
    }
  };

  const handleDownload = (doc: HandoffDocument) => {
    const blob = new Blob([doc.markdown_content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '-').toLowerCase()}-v${doc.version}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.version.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="text-white">Loading handoff documents...</div>;
  }

  if (showGenerationModal) {
    return (
      <HandoffGenerationModal
        onClose={() => setShowGenerationModal(false)}
        onComplete={() => {
          setShowGenerationModal(false);
          loadDocuments();
        }}
      />
    );
  }

  if (shareDocument) {
    return (
      <HandoffShareModal
        document={shareDocument}
        onClose={() => setShareDocument(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Handoff Documentation</h2>
          <p className="text-slate-400 mt-1">Generate and manage comprehensive website handoff documents</p>
        </div>
        <button
          onClick={() => setShowGenerationModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          Generate New Document
        </button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents..."
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No handoff documents yet</h3>
          <p className="text-slate-400 mb-4">
            Generate your first comprehensive website handoff document
          </p>
          <button
            onClick={() => setShowGenerationModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            <Plus className="w-4 h-4" />
            Generate First Document
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      doc.status === 'published' ? 'bg-green-600 text-white' :
                      doc.status === 'draft' ? 'bg-blue-600 text-white' :
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {doc.status}
                    </span>
                    <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
                      v{doc.version}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                    {doc.metadata.wordCount && (
                      <span>{doc.metadata.wordCount.toLocaleString()} words</span>
                    )}
                    {doc.metadata.sections && (
                      <span>{doc.metadata.sections.length} sections</span>
                    )}
                    {doc.metadata.gapCount !== undefined && (
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {doc.metadata.gapCount} gaps detected
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Last updated: {new Date(doc.updated_at).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Tooltip content="View document">
                    <button
                      onClick={() => window.open(`/handoff-preview/${doc.id}`, '_blank')}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Share document">
                    <button
                      onClick={() => setShareDocument(doc)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-slate-700 rounded-lg transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Download markdown">
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2 text-green-400 hover:text-green-300 hover:bg-slate-700 rounded-lg transition"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete document">
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-3">About Handoff Documentation</h3>
        <p className="text-slate-400 mb-4">
          The handoff documentation system automatically analyzes your codebase, detects gaps, and generates
          comprehensive documentation that makes client transitions seamless. Each document can be shared
          via email, private link, PDF download, or saved to your GitHub repository.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Professional Presentation</h4>
            <p className="text-slate-400">
              Publication-ready documents with branded styling and comprehensive technical details
            </p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Time Savings</h4>
            <p className="text-slate-400">
              Generate in 10-15 minutes what would take 8-12 hours to create manually
            </p>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Client Confidence</h4>
            <p className="text-slate-400">
              Demonstrate transparency and thoroughness with detailed technical handoffs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
