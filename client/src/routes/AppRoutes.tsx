import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Academics from '../pages/Academics';
import Achievements from '../pages/Achievements';
import Admissions from '../pages/Admissions';
import Gallery from '../pages/Gallery';
import GalleryDetail from '../pages/GalleryDetail';
import ParentLogin from '../pages/parentPortal/Login';
import ParentDashboard from '../pages/parentPortal/Dashboard';
import AdminLogin from '../pages/adminPortal/AdminLogin';
import AdminDashboard from '../pages/adminPortal/AdminDashboard';
import AdminAchievements from '../pages/adminPortal/AdminAchievements';
import AdminGallery from '../pages/adminPortal/AdminGallery';
import AdminMarks from '../pages/adminPortal/AdminMarks';
import AdminFees from '../pages/adminPortal/AdminFees';
import AdminApplications from '../pages/adminPortal/AdminApplications';
import AdminLeadership from '../pages/adminPortal/AdminLeadership';
import BannerAdmin from '../pages/adminPortal/BannerAdmin';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ── Public pages — with Navbar + Footer ── */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:id" element={<GalleryDetail />} />
      </Route>

      {/* ── Parent Portal — standalone ── */}
      <Route path="/parent-login" element={<ParentLogin />} />
      <Route path="/parent-dashboard" element={<ParentDashboard />} />

      {/* ── Admin Portal — standalone login, then sidebar layout ── */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="marks" element={<AdminMarks />} />
        <Route path="fees" element={<AdminFees />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="popup-banner" element={<BannerAdmin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
