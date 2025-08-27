'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/libs/auth';

export default function LoginPage() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading indicator
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      const success = await login(email, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-center text-sm text-red-400">{error}</p>}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="username">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="username"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading} // Disable input when loading
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-700 p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading} // Disable input when loading
            />
          </div>
          <button
            className="w-full rounded-lg bg-blue-600 p-3 text-base font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
