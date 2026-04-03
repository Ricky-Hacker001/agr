import { getAchievements, getGallery, getStudents, getApplications, getUnreadCount } from '../../data/adminStore';

const AdminDashboard = () => {
  const achievements = getAchievements();
  const gallery = getGallery();
  const students = getStudents();
  const applications = getApplications();
  const unread = getUnreadCount();

  const stats = [
    { label: 'New Applications', value: unread > 0 ? `${applications.length} (${unread} new)` : applications.length, icon: '📋', color: 'bg-red-50 border-red-200 text-red-700' },
    { label: 'Achievements', value: achievements.length, icon: '🏆', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
    { label: 'Gallery Images', value: gallery.length, icon: '🖼️', color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { label: 'Students', value: students.length, icon: '👨‍🎓', color: 'bg-green-50 border-green-200 text-green-700' },
  ];

  const modules = [
    { to: '/admin/applications', icon: '📋', title: 'Applications', desc: `View admission enquiries from parents${unread > 0 ? ` — ${unread} unread` : ''}`, color: 'hover:border-red-400' },
    { to: '/admin/achievements', icon: '🏆', title: 'Achievements', desc: 'Add, edit, delete school achievements and awards', color: 'hover:border-yellow-400' },
    { to: '/admin/gallery', icon: '🖼️', title: 'Gallery', desc: 'Upload and manage event photos and campus images', color: 'hover:border-blue-400' },
    { to: '/admin/marks', icon: '📝', title: 'Exam Marks', desc: 'Manage student marks by exam and subject', color: 'hover:border-green-400' },
    { to: '/admin/fees', icon: '💰', title: 'Fee Records', desc: 'Update and track student fee payment status', color: 'hover:border-purple-400' },
    { to: '/admin/popup-banner', icon: '📢', title: 'Popup Banner', desc: 'Upload and manage popup banner', color: 'hover:border-purple-400' },
  ];

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl font-black text-blue-950">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome, Administrator. Manage all school data from here.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.color}`}>
            <p className="text-3xl">{s.icon}</p>
            <p className="text-3xl font-black mt-2">{s.value}</p>
            <p className="text-xs font-semibold mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Manage Modules</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <a key={m.to} href={m.to} className={`bg-white rounded-2xl border-2 border-transparent p-6 shadow-sm hover:shadow-md transition-all duration-200 ${m.color} group`}>
              <p className="text-4xl mb-3">{m.icon}</p>
              <p className="text-lg font-black text-blue-950 group-hover:text-blue-700">{m.title}</p>
              <p className="text-gray-400 text-sm mt-1">{m.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
