import { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { supabase, supabaseAnonKey, supabaseUrl } from '../lib/supabaseClient';

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
      const functionUrl = `${supabaseUrl}/functions/v1/checkpoint-scraper`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to trigger scraper');
      }

      const result = await response.json();
      alert(`Scraper completed!\n\nNew: ${result.stats.checkpointsNew}\nUpdated: ${result.stats.checkpointsUpdated}\nErrors: ${result.stats.errors.length}`);

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
          {logs.map((log) => (
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
                  {log.errors.length > 0 && (
                    <div>
                      <p className="font-semibold text-red-600">{log.errors.length}</p>
                      <p className="text-brand-black/60">Errors</p>
                    </div>
                  )}
                </div>
              </div>

              {log.errors.length > 0 && (
                <div className="mt-3 rounded border border-red-200 bg-red-50 p-2">
                  <p className="mb-1 text-xs font-semibold text-red-900">Errors:</p>
                  <ul className="space-y-1 text-xs text-red-800">
                    {log.errors.slice(0, 3).map((err, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{err.checkpoint}:</span> {err.error}
                      </li>
                    ))}
                    {log.errors.length > 3 && (
                      <li className="text-red-600">+{log.errors.length - 3} more errors</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
