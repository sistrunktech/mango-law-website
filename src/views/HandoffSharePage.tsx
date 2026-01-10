'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { validateShareToken } from '../lib/handoff/shareUtils';
import { Lock, FileText, Calendar, AlertTriangle, Printer, Download, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generatePDF, downloadPDF } from '../lib/handoff/pdfGenerator';

import { SEO } from '../lib/seo';

export default function HandoffSharePage() {
  const params = useParams<{ token: string | string[] }>();
  const token = params?.token;
  const tokenValue = Array.isArray(token) ? token[0] : token;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [password, setPassword] = useState('');
  const [validating, setValidating] = useState(false);
  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    if (tokenValue) {
      validateAndLoadDocument(tokenValue);
    }
  }, [tokenValue]);

  const validateAndLoadDocument = async (shareToken: string, pwd?: string) => {
    setLoading(true);
    setError('');

    try {
      // Validate the share token
      const validation = await validateShareToken(shareToken, pwd);

      if (!validation.valid) {
        if (validation.error === 'Password required') {
          setPasswordRequired(true);
          setLoading(false);
          return;
        }
        setError(validation.error || 'Invalid share link');
        setLoading(false);
        return;
      }

      // Load the document
      if (!supabase) throw new Error('Database not available');

      const { data, error: docError } = await supabase
        .from('handoff_documents')
        .select('*')
        .eq('id', validation.documentId)
        .single();

      if (docError) throw docError;

      setDocument(data);
      setPasswordRequired(false);
    } catch (err) {
      console.error('Error loading document:', err);
      setError('Failed to load document');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidating(true);
    if (tokenValue) {
      await validateAndLoadDocument(tokenValue, password);
    }
    setValidating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!document) return;
    const pdfBlob = await generatePDF(document.markdown_content, document.title, {
      includeTableOfContents: true,
      includePageNumbers: true,
      includeHeader: true,
      includeFooter: true,
    });
    downloadPDF(pdfBlob, `${document.title.replace(/\s+/g, '-').toLowerCase()}-v${document.version}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Document</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (passwordRequired) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-800 rounded-xl border border-slate-700 p-8">
          <div className="text-center mb-6">
            <Lock className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Password Required</h2>
            <p className="text-slate-400">This document is password-protected</p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={validating}
              className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition disabled:opacity-50"
            >
              {validating ? 'Validating...' : 'Unlock Document'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!document) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO title={`${document.title} | Mango Law Shared Document`} noindex={true} />
      <div className="print:hidden sticky top-0 bg-slate-800 border-b border-slate-700 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-amber-500" />
              <div>
                <h1 className="text-lg font-bold text-white">{document.title}</h1>
                <p className="text-xs text-slate-400">Version {document.version}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="print:hidden bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-1">Viewing Shared Document</h3>
            <p className="text-sm text-blue-700">
              This document has been shared with you. You can print or download it for your records.
            </p>
          </div>
        </div>

        <article className="prose prose-lg max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {document.markdown_content}
          </ReactMarkdown>
        </article>

        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Generated: {new Date(document.created_at).toLocaleDateString()}</span>
          </div>
          <p>© {new Date().getFullYear()} Mango Law LLC. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://mango.law" className="text-amber-600 hover:text-amber-700">
              Visit mango.law
            </a>
          </p>
        </footer>
      </main>

      <style>{`
        @media print {
          @page {
            margin: 1in;
          }

          body {
            background: white;
          }

          .prose {
            max-width: 100% !important;
            font-size: 11pt;
          }

          .prose h1 {
            font-size: 24pt;
            page-break-after: avoid;
          }

          .prose h2 {
            font-size: 18pt;
            page-break-after: avoid;
            margin-top: 1.5em;
          }

          .prose h3 {
            font-size: 14pt;
            page-break-after: avoid;
          }

          .prose pre,
          .prose table {
            page-break-inside: avoid;
          }

          .prose a {
            color: #000;
            text-decoration: none;
          }

          .prose a::after {
            content: " (" attr(href) ")";
            font-size: 0.8em;
            color: #666;
          }
        }
      `}</style>
    </div>
  );
}
