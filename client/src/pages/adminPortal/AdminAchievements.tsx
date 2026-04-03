import { useState, useRef, useEffect } from 'react';
import { type Achievement } from '../../data/adminStore';
import {
  fetchAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../services/achievementService';

const categories = ['academic', 'sports', 'cultural', 'faculty'] as const;
const categoryLabels: Record<string, string> = {
  academic: '📚 Academic',
  sports: '🏆 Sports',
  cultural: '🎭 Cultural',
  faculty: '👩‍🏫 Faculty',
};

const emptyForm = (): Partial<Achievement> => ({
  title: '',
  category: 'academic',
  description: '',
  year: new Date().getFullYear().toString(),
  studentName: '',
  award: '',
  photos: [],
});

const AdminAchievements = () => {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Achievement>>(emptyForm());
  const [isEditMode, setIsEditMode] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  // Load from API on mount
  useEffect(() => {
    fetchAchievements()
      .then(setItems)
      .catch(() => notify('❌ Failed to load achievements'))
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => { setEditing(emptyForm()); setIsEditMode(false); setShowForm(true); };
  const openEdit = (a: Achievement) => { setEditing({ ...a, photos: [...(a.photos ?? [])] }); setIsEditMode(true); setShowForm(true); };

  // Photo upload — up to 3 images, converted to base64
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const current = editing.photos ?? [];
    const slots = 3 - current.length;
    if (slots <= 0) return;
    files.slice(0, slots).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setEditing(p => ({ ...p, photos: [...(p.photos ?? []), reader.result as string] }));
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removePhoto = (idx: number) => {
    setEditing(p => ({ ...p, photos: (p.photos ?? []).filter((_, i) => i !== idx) }));
  };

  const save = async () => {
    if (!editing.title || !editing.description) return;
    try {
      if (isEditMode && editing.id) {
        const updated = await updateAchievement(editing.id, editing);
        setItems(prev => prev.map(a => a.id === editing.id ? updated : a));
        notify('✅ Achievement updated successfully');
      } else {
        const { id: _id, ...data } = editing as Achievement;
        const created = await createAchievement(data);
        setItems(prev => [created, ...prev]);
        notify('✅ Achievement added successfully');
      }
      setShowForm(false);
    } catch (err: unknown) {
      notify(`❌ ${err instanceof Error ? err.message : 'Save failed'}`);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      await deleteAchievement(id);
      setItems(prev => prev.filter(a => a.id !== id));
      notify('🗑️ Achievement deleted');
    } catch {
      notify('❌ Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Achievements</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {items.length} records · changes reflect on the public Achievements page
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all flex items-center gap-2"
        >
          + Add Achievement
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-blue-950">
                {isEditMode ? 'Edit Achievement' : 'New Achievement'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              {/* Category + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Category</label>
                  <select
                    value={editing.category}
                    onChange={e => setEditing(p => ({ ...p, category: e.target.value as Achievement['category'] }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Year</label>
                  <input
                    type="text"
                    value={editing.year ?? ''}
                    onChange={e => setEditing(p => ({ ...p, year: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="2025"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Title *</label>
                <input
                  type="text"
                  value={editing.title ?? ''}
                  onChange={e => setEditing(p => ({ ...p, title: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Achievement title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Description *</label>
                <textarea
                  rows={4}
                  value={editing.description ?? ''}
                  onChange={e => setEditing(p => ({ ...p, description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                  placeholder="Describe the achievement..."
                />
              </div>

              {/* Student + Award */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Student / Team</label>
                  <input type="text" value={editing.studentName ?? ''} onChange={e => setEditing(p => ({ ...p, studentName: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="Name (optional)" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Award / Level</label>
                  <input type="text" value={editing.award ?? ''} onChange={e => setEditing(p => ({ ...p, award: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="e.g. State Level" />
                </div>
              </div>

              {/* Photos */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Photos <span className="text-gray-300 font-normal">(optional · max 3)</span>
                </label>
                <div className="flex gap-3 flex-wrap">
                  {(editing.photos ?? []).map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                      <img src={src} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    </div>
                  ))}
                  {(editing.photos ?? []).length < 3 && (
                    <button type="button" onClick={() => fileRef.current?.click()} className="w-20 h-20 rounded-xl border-2 border-dashed border-blue-200 text-blue-400 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center gap-1">
                      <span className="text-2xl">📷</span>
                      <span className="text-[10px] font-bold">Add</span>
                    </button>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotos} />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={save} disabled={!editing.title || !editing.description} className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {isEditMode ? 'Update' : 'Add Achievement'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-3" />
          Loading achievements…
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-left">Award</th>
                  <th className="px-4 py-3 text-center">Photos</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-blue-950 max-w-xs">
                      <p className="truncate">{a.title}</p>
                      <p className="text-gray-400 text-xs truncate">{a.description.slice(0, 60)}…</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-semibold">{categoryLabels[a.category]}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{a.year}</td>
                    <td className="px-4 py-3 text-gray-500">{a.award ?? '—'}</td>
                    <td className="px-4 py-3 text-center">
                      {(a.photos ?? []).length > 0 ? (
                        <div className="flex gap-1 justify-center">
                          {(a.photos ?? []).slice(0, 3).map((src, i) => (
                            <img key={i} src={src} alt="" className="w-8 h-8 rounded-md object-cover border border-gray-200" />
                          ))}
                        </div>
                      ) : <span className="text-xs text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(a)} className="text-blue-600 hover:text-blue-900 text-xs font-bold px-2 py-1 rounded hover:bg-blue-50">Edit</button>
                        <button onClick={() => remove(a.id)} className="text-red-400 hover:text-red-600 text-xs font-bold px-2 py-1 rounded hover:bg-red-50">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAchievements;
