import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {/* School name header — only visible on the homepage */}
      {isHome && (
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-4">
          <div className="flex items-center justify-center gap-4">
            <img
              src="/assets/logo/logo.jpeg"
              alt="ARG Academy Logo"
              className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 shadow-lg"
            />
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-black tracking-wide">
                  ARG Academy
                </h1>
                <p className="text-sm text-blue-200 font-medium">
                  Matric Higher Secondary School
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-300 mt-0.5">
                  Annamalai Nagar, Chidambaram
                </p>
              </div>
          </div>
        </div>
      )}

      <Navbar isHome={isHome} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
