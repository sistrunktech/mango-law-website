'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Download, Link as LinkIcon, Github, Copy, Check, Lock, Calendar, Eye } from 'lucide-react';
import Tooltip from './Tooltip';
import { createShareLink, getDocumentShares, revokeShareLink } from '../../lib/handoff/shareUtils';
import { generatePDF, downloadPDF } from '../../lib/handoff/pdfGenerator';

interface Props {
  document: {
    id: string;
    title: string;
    version: string;
    markdown_content: string;
  };
  onClose: () => void;
}

type TabType = 'email' | 'pdf' | 'link' | 'github';

export default function HandoffShareModal({ document, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('link');
  const [copied, setCopied] = useState(false);
  const [shareLinks, setShareLinks] = useState<any[]>([]);
  const [generating, setGenerating] = useState(false);

  // Email tab state
  const [emailRecipients, setEmailRecipients] = useState('');
  const [emailSubject, setEmailSubject] = useState(`Website Handoff Documentation - ${document.title}`);
  const [emailMessage, setEmailMessage] = useState('');

  // PDF tab state
  const [pdfOptions, setPdfOptions] = useState({
    includeTableOfContents: true,
    includePageNumbers: true,
    includeHeader: true,
    includeFooter: true,
  });

  // Link tab state
  const [linkExpiry, setLinkExpiry] = useState('never');
  const [linkPassword, setLinkPassword] = useState('');
  const [linkPasswordEnabled, setLinkPasswordEnabled] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  // GitHub tab state
  const [githubPath, setGithubPath] = useState('docs/handoff/');
  const [githubFilename, setGithubFilename] = useState(`handoff-${Date.now()}.md`);
  const [githubCommit, setGithubCommit] = useState('Add website handoff documentation');
  const [githubBranch, setGithubBranch] = useState('main');

  useEffect(() => {
    loadShareLinks();
  }, []);

  const loadShareLinks = async () => {
    const links = await getDocumentShares(document.id);
    setShareLinks(links);
  };

  const handleCreateShareLink = async () => {
    setGenerating(true);
    try {
      const expiresInDays = linkExpiry === 'never' ? undefined :
                           linkExpiry === '7days' ? 7 :
                           linkExpiry === '30days' ? 30 : undefined;

      const link = await createShareLink({
        documentId: document.id,
        expiresInDays,
        password: linkPasswordEnabled ? linkPassword : undefined,
      });

      if (link) {
        setGeneratedLink(link.url);
        await loadShareLinks();
      }
    } catch (error) {
      console.error('Error creating share link:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const pdfBlob = await generatePDF(document.markdown_content, document.title, pdfOptions);
      const filename = `${document.title.replace(/\s+/g, '-').toLowerCase()}-v${document.version}.pdf`;
      downloadPDF(pdfBlob, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleRevokeLink = async (linkId: string) => {
    if (!confirm('Are you sure you want to revoke this share link?')) return;
    const success = await revokeShareLink(linkId);
    if (success) {
      await loadShareLinks();
      if (generatedLink && shareLinks.find(l => l.id === linkId)?.share_token === generatedLink) {
        setGeneratedLink('');
      }
    }
  };

  const tabs = [
    { id: 'link', label: 'Private Link', icon: LinkIcon },
    { id: 'pdf', label: 'Download PDF', icon: Download },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'github', label: 'Save to GitHub', icon: Github },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Share Document</h2>
            <p className="text-slate-400 text-sm mt-1">{document.title} v{document.version}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b border-slate-700">
          <div className="flex overflow-x-auto px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'link' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Create Private Share Link</h3>
                <p className="text-slate-400 mb-4">
                  Generate a unique URL that can be shared with anyone. The link can be password-protected
                  and set to expire after a certain time.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                    Link Expiration
                    <Tooltip content="Set when this link should stop working" />
                  </label>
                  <select
                    value={linkExpiry}
                    onChange={(e) => setLinkExpiry(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="never">Never expires</option>
                    <option value="7days">7 days</option>
                    <option value="30days">30 days</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                    <input
                      type="checkbox"
                      checked={linkPasswordEnabled}
                      onChange={(e) => setLinkPasswordEnabled(e.target.checked)}
                      className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    Password Protection
                    <Tooltip content="Require a password to view the document" />
                  </label>
                  {linkPasswordEnabled && (
                    <input
                      type="password"
                      value={linkPassword}
                      onChange={(e) => setLinkPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                    />
                  )}
                </div>
              </div>

              <button
                onClick={handleCreateShareLink}
                disabled={generating}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition disabled:opacity-50"
              >
                {generating ? 'Creating Link...' : 'Create Share Link'}
              </button>

              {generatedLink && (
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-200">Generated Link</span>
                    <button
                      onClick={() => handleCopyLink(generatedLink)}
                      className="flex items-center gap-2 px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white text-sm rounded transition"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-slate-800 rounded p-3 text-amber-400 text-sm break-all font-mono">
                    {generatedLink}
                  </div>
                </div>
              )}

              {shareLinks.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Active Share Links</h4>
                  <div className="space-y-2">
                    {shareLinks.map((link) => (
                      <div key={link.id} className="bg-slate-700/50 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              {link.password_hash && (
                                <Lock className="w-4 h-4 text-amber-400" />
                              )}
                              {link.expires_at && (
                                <span className="flex items-center gap-1 text-xs text-slate-400">
                                  <Calendar className="w-3 h-3" />
                                  Expires: {new Date(link.expires_at).toLocaleDateString()}
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-xs text-slate-400">
                                <Eye className="w-3 h-3" />
                                {link.view_count} views
                              </span>
                            </div>
                            <div className="text-sm text-slate-300 truncate font-mono">
                              {`${window.location.origin}/handoff/${link.share_token}`}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleCopyLink(`${window.location.origin}/handoff/${link.share_token}`)}
                              className="p-2 text-slate-400 hover:text-white hover:bg-slate-600 rounded transition"
                              title="Copy link"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRevokeLink(link.id)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-600 rounded transition"
                              title="Revoke link"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pdf' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Download as PDF</h3>
                <p className="text-slate-400 mb-4">
                  Generate a professionally formatted PDF with Mango Law branding.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                <h4 className="font-medium text-white">PDF Options</h4>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pdfOptions.includeTableOfContents}
                    onChange={(e) => setPdfOptions({ ...pdfOptions, includeTableOfContents: e.target.checked })}
                    className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-300">Include table of contents</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pdfOptions.includePageNumbers}
                    onChange={(e) => setPdfOptions({ ...pdfOptions, includePageNumbers: e.target.checked })}
                    className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-300">Include page numbers</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pdfOptions.includeHeader}
                    onChange={(e) => setPdfOptions({ ...pdfOptions, includeHeader: e.target.checked })}
                    className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-300">Include header with logo</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={pdfOptions.includeFooter}
                    onChange={(e) => setPdfOptions({ ...pdfOptions, includeFooter: e.target.checked })}
                    className="w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                  />
                  <span className="text-sm text-slate-300">Include footer</span>
                </label>
              </div>

              <button
                onClick={handleDownloadPDF}
                disabled={generating}
                className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                {generating ? 'Generating PDF...' : 'Download PDF'}
              </button>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Send via Email</h3>
                <p className="text-slate-400 mb-4">
                  Email the handoff document as a PDF attachment or shareable link.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Recipient Email(s)
                </label>
                <input
                  type="text"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                  placeholder="email@example.com, another@example.com"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-xs text-slate-400 mt-1">Separate multiple emails with commas</p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Message (Optional)
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  placeholder="Add a personal message..."
                />
              </div>

              <button
                disabled
                className="w-full px-6 py-3 bg-slate-600 text-slate-400 font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Email Feature Coming Soon
              </button>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Save to GitHub</h3>
                <p className="text-slate-400 mb-4">
                  Commit the handoff document directly to your GitHub repository.
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Repository Path
                </label>
                <input
                  type="text"
                  value={githubPath}
                  onChange={(e) => setGithubPath(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Filename
                </label>
                <input
                  type="text"
                  value={githubFilename}
                  onChange={(e) => setGithubFilename(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Commit Message
                </label>
                <input
                  type="text"
                  value={githubCommit}
                  onChange={(e) => setGithubCommit(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-200 mb-2 block">
                  Branch
                </label>
                <select
                  value={githubBranch}
                  onChange={(e) => setGithubBranch(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                >
                  <option value="main">main</option>
                  <option value="staging">staging</option>
                </select>
              </div>

              <button
                disabled
                className="w-full px-6 py-3 bg-slate-600 text-slate-400 font-semibold rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                GitHub Integration Coming Soon
              </button>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
