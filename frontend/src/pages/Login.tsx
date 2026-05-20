import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      await login({ email, password });
    } catch (err) {
      // Error is handled in context
    }
  };

  const inputClasses = "w-full px-4 py-2.5 text-sm bg-white/50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600";

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#09090b] transition-colors duration-300">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-[120px] pointer-events-none"></div>
      
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-600 dark:bg-white flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <span className="text-white dark:text-zinc-950 font-bold text-xl">SL</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Welcome back
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Enter your credentials to access your workspace
          </p>
        </div>

        <div className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-zinc-800/80 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50/80 dark:bg-rose-500/10 border border-rose-200/50 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm backdrop-blur-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClasses}
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-zinc-400 mb-1.5 ml-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-zinc-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 dark:text-white hover:underline font-medium transition-colors">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;