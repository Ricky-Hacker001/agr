import { useState } from 'react';
import { getApplications, saveApplications, type AdmissionApplication } from '../../data/adminStore';

const AdminApplications = () => {
  const [apps, setApps] = useState<AdmissionApplication[]>(getApplications());
  const [selected, setSelected] = useState<AdmissionApplication | null>(null);

  const unread = apps.filter(a => !a.read).length;

  const openApp = (app: AdmissionApplication) => {
    setSelected(app);
    if (!app.read) {
      const updated = apps.map(a => a.id === app.id ? { ...a, read: true } : a);
      saveApplications(updated);
      setApps(updated);
    }
  };

  const deleteApp = (id: string) => {
    if (!confirm('Delete this application?')) return;
    const updated = apps.filter(a => a.id !== id);
    saveApplications(updated);
    setApps(updated);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950 flex items-center gap-3">
            Admission Applications
            {unread > 0 && (
              <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full animate-pulse">
                {unread} New
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {apps.length} total · {unread} unread — applications submitted from the Admissions page
          </p>
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-20 text-center">
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-400 font-semibold">No applications yet</p>
          <p className="text-gray-300 text-sm mt-1">Applications submitted from the public Admissions page will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* List */}
          <div className="lg:col-span-1 space-y-2">
            {apps.map(app => (
              <button
                key={app.id}
                onClick={() => openApp(app)}
                className={`w-full text-left rounded-2xl p-4 border transition-all duration-150 ${
                  selected?.id === app.id
                    ? 'bg-blue-900 border-blue-900 text-white shadow-md'
                    : app.read
                    ? 'bg-white border-gray-100 hover:border-blue-200'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 mt-0.5">
                    {!app.read && selected?.id !== app.id && (
                      <span className="block w-2.5 h-2.5 bg-red-500 rounded-full mt-1" />
                    )}
                    {(app.read || selected?.id === app.id) && (
                      <span className="block w-2.5 h-2.5 bg-transparent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm truncate ${selected?.id === app.id ? 'text-white' : 'text-blue-950'}`}>
                      {app.studentName}
                    </p>
                    <p className={`text-xs truncate ${selected?.id === app.id ? 'text-blue-300' : 'text-gray-500'}`}>
                      {app.classApplying}
                    </p>
                    <p className={`text-[10px] mt-0.5 ${selected?.id === app.id ? 'text-blue-400' : 'text-gray-400'}`}>
                      {app.submittedAt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Detail view */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-blue-900 text-white px-6 py-5 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-blue-300 uppercase tracking-widest font-bold mb-1">Application Detail</p>
                    <h3 className="text-xl font-black">{selected.studentName}</h3>
                    <p className="text-blue-300 text-sm mt-0.5">Applied for: {selected.classApplying}</p>
                  </div>
                  <button onClick={() => deleteApp(selected.id)} className="bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 text-red-300 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
                    🗑️ Delete
                  </button>
                </div>
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Student Name', value: selected.studentName, icon: '👤' },
                    { label: 'Parent / Guardian', value: selected.parentName, icon: '👨‍👩‍👦' },
                    { label: 'Mobile Number', value: selected.contact, icon: '📞' },
                    { label: 'Class Applying For', value: selected.classApplying, icon: '🎓' },
                    { label: 'Submitted At', value: selected.submittedAt, icon: '🕐' },
                  ].map(f => (
                    <div key={f.label} className="bg-gray-50 rounded-xl p-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{f.icon} {f.label}</p>
                      <p className="text-blue-950 font-semibold text-sm">{f.value}</p>
                    </div>
                  ))}
                  <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">📍 Address</p>
                    <p className="text-blue-950 font-semibold text-sm leading-relaxed">{selected.address}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 h-full min-h-48 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <p className="text-4xl mb-2">👆</p>
                  <p className="text-sm font-semibold">Select an application to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;
