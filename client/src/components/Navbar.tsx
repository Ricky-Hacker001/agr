import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavbarProps {
  isHome: boolean;
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Academics', to: '/academics' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'Gallery', to: '/gallery' },
];

const Navbar = ({ isHome }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 shadow-md ${isHome ? 'bg-blue-900' : 'bg-white border-b border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/assets/logo/logo.jpeg"
              alt="ARG Academy Logo"
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 shadow-md transition-transform duration-300 group-hover:scale-110"
            />
            <div>
              <p className={`font-black text-sm leading-tight ${isHome ? 'text-yellow-300' : 'text-blue-900'}`}>
                ARG Academy
              </p>
              <p className={`text-[10px] leading-tight ${isHome ? 'text-blue-300' : 'text-gray-400'}`}>
                Matric Hr. Sec. School
              </p>
            </div>
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isHome
                      ? isActive
                        ? 'bg-white text-blue-900'
                        : 'text-blue-100 hover:bg-white/20 hover:text-white'
                      : isActive
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/parent-login"
              className={`ml-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-sm hover:scale-105 ${
                isHome
                  ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                  : 'bg-blue-900 text-white hover:bg-blue-800'
              }`}
            >
              Parent Login
            </Link>

            <Link
              to="/admin-login"
              className={`ml-1 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200 hover:scale-105 border ${
                isHome
                  ? 'text-blue-300 border-blue-700 hover:bg-white/10 hover:text-white'
                  : 'text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-600'
              }`}
            >
              Admin
            </Link>
          </div>

          {/* ── Mobile Hamburger ─────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${isHome ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ────────────────────────────────────── */}
      {menuOpen && (
        <div className={`md:hidden px-4 pb-4 ${isHome ? 'bg-blue-900' : 'bg-white border-t border-gray-100'}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-4 py-2.5 my-1 rounded-lg text-sm font-semibold transition-all ${
                  isHome
                    ? isActive ? 'bg-white text-blue-900' : 'text-blue-100 hover:bg-white/20'
                    : isActive ? 'bg-blue-900 text-white' : 'text-gray-600 hover:bg-blue-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/parent-login" onClick={() => setMenuOpen(false)}
            className={`block w-full text-center mt-2 px-4 py-2.5 rounded-lg text-sm font-bold ${isHome ? 'bg-yellow-400 text-blue-900' : 'bg-blue-900 text-white'}`}>
            Parent Login
          </Link>
          <Link to="/admin-login" onClick={() => setMenuOpen(false)}
            className={`block w-full text-center mt-1 px-4 py-2.5 rounded-lg text-xs font-semibold border ${isHome ? 'text-blue-300 border-blue-700' : 'text-gray-400 border-gray-200'}`}>
            Admin Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
