import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUnreadCount } from '../data/adminStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!sessionStorage.getItem('adminSession')) {
      navigate('/admin-login');
      return;
    }
    // Poll for new applications every 5 seconds
    const update = () => setUnread(getUnreadCount());
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminSession');
    navigate('/admin-login');
  };

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: '📊', end: true, badge: 0 },
    { to: '/admin/applications', label: 'Applications', icon: '📋', end: false, badge: unread },
    { to: '/admin/achievements', label: 'Achievements',  icon: '🏆', end: false, badge: 0 },
    { to: '/admin/leadership',   label: 'Leadership',    icon: '🎖️', end: false, badge: 0 },
    { to: '/admin/gallery',      label: 'Gallery',       icon: '🖼️', end: false, badge: 0 },
    { to: '/admin/marks', label: 'Exam Marks', icon: '📝', end: false, badge: 0 },
    { to: '/admin/fees', label: 'Fee Records', icon: '💰', end: false, badge: 0 },
    { to: '/admin/popup-banner', label: 'Popup Banner', icon: '📢', end: false, badge: 0 },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ── Sidebar ── */}
      <aside className="w-60 bg-blue-950 text-white flex flex-col fixed h-full">
        {/* Branding */}
        <div className="px-5 py-5 border-b border-blue-800 flex items-center gap-3">
          <img src="/assets/logo/logo.jpeg" alt="Logo" className="w-10 h-10 rounded-full border border-yellow-400 object-cover" />
          <div>
            <p className="text-yellow-400 font-black text-sm">ARG Academy</p>
            <p className="text-blue-400 text-[10px]">Admin Portal</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-blue-950'
                    : 'text-blue-200 hover:bg-blue-800 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              <span className="flex-1">{link.label}</span>
              {link.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-blue-800 space-y-2">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-blue-300 hover:bg-blue-800 text-sm transition-colors">
            <span>🌐</span> View Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-900/30 text-sm transition-colors">
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="ml-60 flex-1 p-6 overflow-y-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
