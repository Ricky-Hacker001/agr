import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { parentLogin } from '../../services/authService';

const ParentLogin = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 🔥 API call (session handled inside authService)
      await parentLogin(mobile.trim(), password);

      // ✅ Redirect after login
      navigate('/parent-dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center px-4">

      {/* BG decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <img
                src="/assets/logo/logo.jpeg"
                alt="ARG Academy Logo"
                className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover shadow-lg"
              />
            </div>
            <h1 className="text-2xl font-black text-white">Parent Login</h1>
            <p className="text-blue-300 text-sm mt-1">ARG Academy – Academic Portal</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleLogin} className="space-y-5">

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Registered Mobile Number
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all disabled:opacity-70"
              >
                {loading ? 'Signing in…' : 'Sign In →'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-4 text-xs text-blue-800">
              <p className="font-bold mb-2">🔑 Demo Credentials</p>
              <p>9876543210 / demo123</p>
              <p>9123456789 / demo456</p>
            </div>

            {/* Back */}
            <div className="mt-5 text-center">
              <Link to="/" className="text-xs text-gray-400 hover:text-blue-900">
                ← Back to Homepage
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;