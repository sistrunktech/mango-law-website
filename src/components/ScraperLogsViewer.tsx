'use client';

import { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { supabase, supabaseUrl } from '../lib/supabaseClient';

interface ScraperLog {
  id: string;
  scraper_name: string;
  status: 'success' | 'partial' | 'failed';
  started_at: string;
  completed_at: string | null;
  duration_ms: number | null;
  checkpoints_found: number;
  checkpoints_new: number;
  checkpoints_updated: number;
  errors: Array<{ checkpoint: string; error: string }>;
  metadata: any;
  created_at: string;
}

function getMetadataNumber(metadata: any, key: string): number {
  const value = metadata?.[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function getWarningSample(metadata: any): Array<{ checkpoint: string; error: string }> {
  return Array.isArray(metadata?.warnings_sample) ? metadata.warnings_sample : [];
}

export default function ScraperLogsViewer() {
  const [logs, setLogs] = useState<ScraperLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);

      if (!supabase) {
        console.error('Supabase client not initialized');
        return;
      }

      const { data, error } = await supabase
        .from('scraper_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Failed to load logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerScraper = async () => {
    if (!confirm('Trigger checkpoint scraper now? This will fetch the latest checkpoint data.')) {
      return;
    }

    setTriggering(true);
    try {
      if (!supabase) {
        throw new Error('Supabase client not initialized');
      }

      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const accessToken = sessionData.session?.access_token;
      if (!accessToken) {
        throw new Error('Admin session required to trigger scraper');
      }

      const functionUrl = `${supabaseUrl}/functions/v1/checkpoint-scraper`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trigger: 'manual' }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to trigger scraper');
      }

      const result = await response.json();
      alert(`Scraper completed with status: ${result.status || 'unknown'}\n\nNew: ${result.stats.checkpointsNew}\nUpdated: ${result.stats.checkpointsUpdated}\nWarnings: ${result.stats.warnings?.length || 0}\nErrors: ${result.stats.errors.length}`);

      setTimeout(() => {
        loadLogs();
      }, 1000);
    } catch (error) {
      console.error('Failed to trigger scraper:', error);
      alert('Failed to trigger scraper. Check console for details.');
    } finally {
      setTriggering(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'partial':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-brand-black/40" />;
    }
  };

  return (
    <div className="rounded-2xl border border-brand-black/10 bg-white p-6 shadow-soft">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-brand-leaf" />
          <div>
            <h2 className="text-xl font-bold text-brand-black">Scraper Activity</h2>
            <p className="text-sm text-brand-black/60">Recent checkpoint scraper runs</p>
            <p className="text-xs text-brand-black/50">
              Known dead RSS endpoints are skipped in source until verified replacements are added.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadLogs}
            disabled={loading}
            className="rounded-lg border border-brand-black/20 px-4 py-2 text-sm font-semibold text-brand-black transition-all hover:bg-brand-offWhite disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={triggerScraper}
            disabled={triggering}
            className="flex items-center gap-2 rounded-lg bg-brand-leaf px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-leaf/90 disabled:opacity-50"
          >
            {triggering ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Activity className="h-4 w-4" />
                Run Scraper
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-leaf" />
          <p className="mt-3 text-sm text-brand-black/60">Loading logs...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="py-12 text-center">
          <Activity className="mx-auto h-12 w-12 text-brand-black/20" />
          <p className="mt-3 text-sm text-brand-black/60">No scraper logs yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => {
            const warningsCount = getMetadataNumber(log.metadata, 'warnings_count');
            const rssFailed = getMetadataNumber(log.metadata, 'rss_sources_failed');
            const rssChecked = getMetadataNumber(log.metadata, 'rss_sources_checked');
            const withoutCoordinates = getMetadataNumber(log.metadata, 'checkpoints_without_coordinates');
            const health = typeof log.metadata?.health === 'string' ? log.metadata.health : null;
            const warningSample = getWarningSample(log.metadata);
            const errors = Array.isArray(log.errors) ? log.errors : [];

            return (
              <div
                key={log.id}
                className="rounded-lg border border-brand-black/10 bg-brand-offWhite p-4"
              >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {getStatusIcon(log.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-brand-black">
                        {log.scraper_name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          log.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : log.status === 'partial'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.status}
                      </span>
                      {health && (
                        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-brand-black/60">
                          {health}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-brand-black/60">
                      {new Date(log.started_at).toLocaleString()}
                      {log.duration_ms && ` • ${(log.duration_ms / 1000).toFixed(1)}s`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 text-right text-xs">
                  <div>
                    <p className="font-semibold text-brand-black">{log.checkpoints_found}</p>
                    <p className="text-brand-black/60">Found</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-600">{log.checkpoints_new}</p>
                    <p className="text-brand-black/60">New</p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-600">{log.checkpoints_updated}</p>
                    <p className="text-brand-black/60">Updated</p>
                  </div>
                  {errors.length > 0 && (
                    <div>
                      <p className="font-semibold text-red-600">{errors.length}</p>
                      <p className="text-brand-black/60">Errors</p>
                    </div>
                  )}
                  {warningsCount > 0 && (
                    <div>
                      <p className="font-semibold text-amber-600">{warningsCount}</p>
                      <p className="text-brand-black/60">Warnings</p>
                    </div>
                  )}
                </div>
              </div>

              {(rssChecked > 0 || withoutCoordinates > 0) && (
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-black/60">
                  {rssChecked > 0 && (
                    <span>RSS: {rssChecked - rssFailed}/{rssChecked} sources healthy</span>
                  )}
                  {withoutCoordinates > 0 && (
                    <span>{withoutCoordinates} saved without coordinates</span>
                  )}
                </div>
              )}

              {errors.length > 0 && (
                <div className="mt-3 rounded border border-red-200 bg-red-50 p-2">
                  <p className="mb-1 text-xs font-semibold text-red-900">Errors:</p>
                  <ul className="space-y-1 text-xs text-red-800">
                    {errors.slice(0, 3).map((err, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{err.checkpoint}:</span> {err.error}
                      </li>
                    ))}
                    {errors.length > 3 && (
                      <li className="text-red-600">+{errors.length - 3} more errors</li>
                    )}
                  </ul>
                </div>
              )}
              {warningSample.length > 0 && (
                <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-2">
                  <p className="mb-1 text-xs font-semibold text-amber-900">Warnings:</p>
                  <ul className="space-y-1 text-xs text-amber-800">
                    {warningSample.slice(0, 3).map((warning, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{warning.checkpoint}:</span> {warning.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
