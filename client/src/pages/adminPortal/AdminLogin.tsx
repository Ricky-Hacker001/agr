import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../../services/authService';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const session = await adminLogin(username, password);
      sessionStorage.setItem('adminToken', session.token);
      sessionStorage.setItem('adminSession', JSON.stringify({ username: session.username, role: session.role }));
      navigate('/admin');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-950 to-indigo-900 px-8 py-7 text-center">
            <div className="flex justify-center mb-3">
              <img src="/assets/logo/logo.jpeg" alt="ARG Academy" className="w-14 h-14 rounded-full border-2 border-yellow-400 object-cover shadow-lg" />
            </div>
            <h1 className="text-xl font-black text-white">Admin Login</h1>
            <p className="text-blue-300 text-xs mt-1">ARG Academy – Administration Portal</p>
          </div>

          <div className="px-8 py-7">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-xl">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all hover:scale-[1.01] disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Signing in…</>
                ) : 'Sign In →'}
              </button>
            </form>

            <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
              <p className="font-bold mb-1">🔑 Demo Credentials</p>
              <p>Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono">admin</code></p>
              <p className="mt-0.5">Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono">admin@ARG2025</code></p>
            </div>

            <div className="mt-4 text-center">
              <Link to="/" className="text-xs text-gray-400 hover:text-blue-900 transition-colors">← Back to Website</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
