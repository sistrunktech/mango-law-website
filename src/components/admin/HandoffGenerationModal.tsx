import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { X, FileText, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Tooltip from './Tooltip';
import { generateHandoffDocument, GenerationOptions } from '../../lib/handoff/documentGenerator';
import { detectGaps } from '../../lib/handoff/gapDetector';

interface Props {
  onClose: () => void;
  onComplete: () => void;
}

export default function HandoffGenerationModal({ onClose, onComplete }: Props) {
  const [step, setStep] = useState<'options' | 'settings' | 'gaps' | 'generating' | 'complete'>('options');
  const [options, setOptions] = useState<GenerationOptions>({
    includeTechnicalArchitecture: true,
    includeCMSGuide: true,
    includeDatabaseDocs: true,
    includeAPIReference: true,
    includeDeploymentGuide: true,
    includeCustomFeatures: true,
    includeScreenshots: false,
    includeAnalytics: false,
  });
  const [title, setTitle] = useState('Mango Law Website Handoff');
  const [version, setVersion] = useState('1.0.0');
  const [customNotes, setCustomNotes] = useState('');
  const [gapSummary, setGapSummary] = useState<{ high: number; medium: number; low: number; total: number } | null>(null);
  const [generationProgress, setGenerationProgress] = useState('');
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (step === 'options') {
      setStep('settings');
    } else if (step === 'settings') {
      // Analyze gaps
      setGenerationProgress('Analyzing codebase for gaps...');
      const analysis = await detectGaps();
      setGapSummary(analysis.summary);
      setStep('gaps');
    } else if (step === 'gaps') {
      await generateDocument();
    }
  };

  const generateDocument = async () => {
    setStep('generating');
    setError('');

    try {
      // Update progress
      setGenerationProgress('Scanning codebase files...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setGenerationProgress('Analyzing database schema...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setGenerationProgress('Reading documentation...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setGenerationProgress('Detecting gaps...');
      const gapAnalysis = await detectGaps();

      setGenerationProgress('Generating markdown content...');
      const document = await generateHandoffDocument(
        title,
        version,
        { ...options, customNotes }
      );

      setGenerationProgress('Saving to database...');
      if (!supabase) throw new Error('Database not available');

      const { error: dbError } = await supabase
        .from('handoff_documents')
        .insert({
          title,
          version,
          status: 'draft',
          markdown_content: document.content,
          metadata: {
            wordCount: document.wordCount,
            sections: document.sections,
            gapCount: gapAnalysis.summary.total,
            generationOptions: options,
          },
        });

      if (dbError) throw dbError;

      // Save gaps
      const { data: docData } = await supabase
        .from('handoff_documents')
        .select('id')
        .eq('title', title)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (docData && gapAnalysis.gaps.length > 0) {
        const gapRecords = gapAnalysis.gaps.map(gap => ({
          document_id: docData.id,
          gap_type: gap.type,
          severity: gap.severity,
          description: gap.description,
          file_path: gap.filePath,
        }));

        await supabase
          .from('handoff_gaps')
          .insert(gapRecords);
      }

      setGenerationProgress('Complete!');
      setStep('complete');
      setTimeout(() => {
        onComplete();
      }, 1500);

    } catch (err) {
      console.error('Error generating document:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate document');
      setStep('options');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Generate Handoff Document</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {step === 'generating' && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Generating Document</h3>
              <p className="text-slate-400">{generationProgress}</p>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Document Generated!</h3>
              <p className="text-slate-400">Your handoff document has been created successfully.</p>
            </div>
          )}

          {step === 'options' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">What would you like to include?</h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeTechnicalArchitecture}
                      onChange={(e) => setOptions({ ...options, includeTechnicalArchitecture: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Technical Architecture</span>
                        <Tooltip content="Includes technology stack, file structure, and routes" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Complete technical overview of the website architecture
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeCMSGuide}
                      onChange={(e) => setOptions({ ...options, includeCMSGuide: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">CMS Guide</span>
                        <Tooltip content="Admin dashboard usage instructions for non-technical users" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Step-by-step guide for managing content via admin panel
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeDatabaseDocs}
                      onChange={(e) => setOptions({ ...options, includeDatabaseDocs: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Database Documentation</span>
                        <Tooltip content="Complete database schema with table descriptions" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Database tables, relationships, and security policies
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeAPIReference}
                      onChange={(e) => setOptions({ ...options, includeAPIReference: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">API Reference</span>
                        <Tooltip content="Documentation for all Edge Functions and API endpoints" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Complete API and Edge Functions reference
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeDeploymentGuide}
                      onChange={(e) => setOptions({ ...options, includeDeploymentGuide: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Deployment Guide</span>
                        <Tooltip content="Hosting configuration and deployment procedures" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Deployment process and hosting setup instructions
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeCustomFeatures}
                      onChange={(e) => setOptions({ ...options, includeCustomFeatures: e.target.checked })}
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Custom Features</span>
                        <Tooltip content="Detailed documentation of unique features and functionality" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Documentation of custom-built features and components
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition cursor-pointer opacity-50">
                    <input
                      type="checkbox"
                      checked={options.includeAnalytics}
                      onChange={(e) => setOptions({ ...options, includeAnalytics: e.target.checked })}
                      disabled
                      className="mt-1 w-4 h-4 text-amber-600 bg-slate-700 border-slate-600 rounded focus:ring-amber-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">Analytics Data</span>
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">Coming Soon</span>
                        <Tooltip content="Website performance and traffic analytics (future feature)" />
                      </div>
                      <p className="text-sm text-slate-400 mt-1">
                        Traffic statistics and performance metrics
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
                  <AlertCircle className="w-5 h-5" />
                  <p>{error}</p>
                </div>
              )}
            </div>
          )}

          {step === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                  Document Title
                  <Tooltip content="The main title of your handoff document" />
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  placeholder="Mango Law Website Handoff"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                  Version Number
                  <Tooltip content="Semantic version number (e.g., 1.0.0, 1.2.5)" />
                </label>
                <input
                  type="text"
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  placeholder="1.0.0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200 mb-2">
                  Custom Notes (Optional)
                  <Tooltip content="Additional information to include in the handoff document" />
                </label>
                <textarea
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500"
                  placeholder="Add any additional notes or special instructions..."
                />
              </div>
            </div>
          )}

          {step === 'gaps' && gapSummary && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Documentation Gaps Detected</h3>
                <p className="text-slate-400 mb-4">
                  Our analysis found {gapSummary.total} areas that could be improved or require attention.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-red-400">{gapSummary.high}</div>
                  <div className="text-sm text-slate-400 mt-1">High Priority</div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-yellow-400">{gapSummary.medium}</div>
                  <div className="text-sm text-slate-400 mt-1">Medium Priority</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-400">{gapSummary.low}</div>
                  <div className="text-sm text-slate-400 mt-1">Low Priority</div>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  All detected gaps will be included in the handoff document with detailed descriptions
                  and recommendations for resolution.
                </p>
              </div>
            </div>
          )}
        </div>

        {(step === 'options' || step === 'settings' || step === 'gaps') && (
          <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 px-6 py-4 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-700 transition"
            >
              {step === 'gaps' ? 'Generate Document' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
