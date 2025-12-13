import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { supabase, supabaseProjectRef } from '../lib/supabaseClient';
import MangoIcon from '../components/MangoIcon';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('Authentication service is not configured');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      setSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2F5F4F] to-[#1B4332] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-4">
              Check Your Email
            </h1>

            <p className="text-slate-200 text-center mb-6">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>

            <div className="bg-[#E8A33C]/10 border border-[#E8A33C]/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-[#FFB84D]">
                <strong>Next Steps:</strong>
              </p>
              <ol className="text-sm text-slate-200 mt-2 space-y-1 list-decimal list-inside">
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the reset link in the email</li>
                <li>Enter your new password</li>
              </ol>
              <p className="mt-3 text-xs text-slate-300">
                If no email arrives within a couple minutes, your admin user may not exist in this auth backend (
                <span className="font-mono text-slate-100">{supabaseProjectRef ?? 'unconfigured'}</span>). Create/invite
                the user in Supabase Dashboard → Authentication → Users.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSent(false)}
                className="w-full px-4 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition border border-white/20"
              >
                Send Another Email
              </button>

              <Link
                to="/admin/login"
                className="block w-full px-4 py-3 text-center text-slate-300 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4 inline mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332] via-[#2F5F4F] to-[#1B4332] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MangoIcon className="w-16 h-16 text-[#E8A33C]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-slate-200">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A33C] focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <Link
                to="/admin/login"
                className="text-slate-200 hover:text-white transition text-sm inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-slate-300">
          <p>Only admin users can reset their password</p>
          <p className="mt-2 text-xs text-slate-400">
            Auth backend: <span className="font-mono text-slate-200">{supabaseProjectRef ?? 'unconfigured'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
