import { useState, useEffect } from 'react';
import { Lock, AlertCircle } from 'lucide-react';

interface AdminAuthProps {
  children: React.ReactNode;
}

const ADMIN_PASSWORD = 'mango2024admin';
const AUTH_KEY = 'mango_admin_auth';
const AUTH_EXPIRY_HOURS = 24;

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        const { timestamp } = JSON.parse(stored);
        const hoursSince = (Date.now() - timestamp) / (1000 * 60 * 60);

        if (hoursSince < AUTH_EXPIRY_HOURS) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setIsChecking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_PASSWORD) {
      const authData = {
        timestamp: Date.now(),
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-offWhite to-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-mango/20 border-t-brand-mango"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-offWhite to-white px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-brand-black/10 bg-white p-8 shadow-xl">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-mango/10">
                <Lock className="h-8 w-8 text-brand-mango" />
              </div>
            </div>

            <h1 className="mb-2 text-center text-2xl font-bold text-brand-black">
              Admin Access Required
            </h1>
            <p className="mb-6 text-center text-sm text-brand-black/60">
              Please enter the admin password to continue
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-brand-black">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-brand-black/20 px-4 py-3 text-brand-black transition-colors focus:border-brand-mango focus:outline-none focus:ring-2 focus:ring-brand-mango/20"
                  placeholder="Enter admin password"
                  autoFocus
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-brand-mango px-6 py-3 font-semibold text-white transition-all hover:bg-brand-leaf hover:shadow-lg"
              >
                Sign In
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-brand-black/40">
              Session expires after 24 hours of inactivity
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed right-4 top-4 z-50">
        <button
          onClick={handleLogout}
          className="rounded-lg border border-brand-black/10 bg-white px-4 py-2 text-sm font-semibold text-brand-black shadow-lg transition-all hover:bg-red-50 hover:text-red-600"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}
