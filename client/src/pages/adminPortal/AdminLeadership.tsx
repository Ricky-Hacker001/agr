import { useState, useRef, useEffect } from 'react';
import { type Leader } from '../../data/adminStore';
import {
  fetchLeaders,
  createLeader,
  updateLeader,
  deleteLeader,
} from '../../services/leadershipService';

const roleColors = {
  SPL:  'bg-yellow-100 text-yellow-800 border-yellow-300',
  ASPL: 'bg-blue-100 text-blue-800 border-blue-300',
};

const emptyForm = (): Omit<Leader, 'id'> => ({
  name: '',
  role: 'SPL',
  class: '',
  photo: null,
  quote: '',
  year: '2024-25',
});

const AdminLeadership = () => {
  const [items, setItems] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Omit<Leader, 'id'> & { id?: string }>(emptyForm());
  const [isEditMode, setIsEditMode] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    fetchLeaders()
      .then(setItems)
      .catch(() => notify('❌ Failed to load leaders'))
      .finally(() => setLoading(false));
  }, []);

  const openNew = () => { setEditing(emptyForm()); setIsEditMode(false); setShowForm(true); };
  const openEdit = (l: Leader) => { setEditing({ ...l }); setIsEditMode(true); setShowForm(true); };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setEditing(p => ({ ...p, photo: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!editing.name.trim() || !editing.quote.trim()) return;
    try {
      if (isEditMode && editing.id) {
        const updated = await updateLeader(editing.id, editing);
        setItems(prev => prev.map(l => l.id === editing.id ? updated : l));
        notify('✅ Leader updated successfully');
      } else {
        const { id: _id, ...data } = editing as Leader;
        const created = await createLeader(data);
        setItems(prev => [created, ...prev]);
        notify('✅ Leader added successfully');
      }
      setShowForm(false);
    } catch (err: unknown) {
      notify(`❌ ${err instanceof Error ? err.message : 'Save failed'}`);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this leader record?')) return;
    try {
      await deleteLeader(id);
      setItems(prev => prev.filter(l => l.id !== id));
      notify('🗑️ Leader record deleted');
    } catch {
      notify('❌ Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">School Leadership</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage SPL &amp; ASPL — changes reflect on the public Academics page</p>
        </div>
        <button onClick={openNew} className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all flex items-center gap-2">
          + Add Leader
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-3" />
          Loading leaders…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map(l => (
            <div key={l.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200">
                {l.photo ? <img src={l.photo} alt={l.name} className="w-full h-full object-cover" /> : <span className="text-2xl">👤</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border ${roleColors[l.role]}`}>{l.role}</span>
                  <span className="text-xs text-gray-400">{l.year}</span>
                </div>
                <p className="font-black text-slate-800 mt-1 truncate">{l.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{l.class}</p>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 italic">"{l.quote}"</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => openEdit(l)} className="text-blue-600 hover:text-blue-900 text-xs font-bold px-2 py-1 rounded hover:bg-blue-50">Edit</button>
                  <button onClick={() => remove(l.id)} className="text-red-400 hover:text-red-600 text-xs font-bold px-2 py-1 rounded hover:bg-red-50">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-2 text-center py-16 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-4xl mb-2">🎖️</p>
              <p className="font-semibold">No leaders added yet.</p>
              <p className="text-sm">Click "+ Add Leader" to get started.</p>
            </div>
          )}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-blue-950">{isEditMode ? 'Edit Leader' : 'Add New Leader'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Photo <span className="text-gray-300 font-normal">(optional)</span></label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200 shrink-0">
                    {editing.photo ? <img src={editing.photo} alt="preview" className="w-full h-full object-cover" /> : <span className="text-3xl">👤</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">📷 Upload Photo</button>
                    {editing.photo && (
                      <button type="button" onClick={() => setEditing(p => ({ ...p, photo: null }))} className="px-4 py-2 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-200 hover:bg-red-100">Remove</button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Role *</label>
                  <select value={editing.role} onChange={e => setEditing(p => ({ ...p, role: e.target.value as Leader['role'] }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
                    <option value="SPL">SPL – School Pupil Leader</option>
                    <option value="ASPL">ASPL – Associate SPL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Academic Year *</label>
                  <input type="text" value={editing.year} onChange={e => setEditing(p => ({ ...p, year: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="2024-25" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name *</label>
                <input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="e.g. K. Aravind Kumar" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Class / Standard *</label>
                <input type="text" value={editing.class} onChange={e => setEditing(p => ({ ...p, class: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="e.g. 12th Standard – Science" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Inspiring Quote / Message *</label>
                <textarea rows={4} value={editing.quote} onChange={e => setEditing(p => ({ ...p, quote: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none" placeholder="Write an inspiring message..." />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={save} disabled={!editing.name.trim() || !editing.quote.trim()} className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                {isEditMode ? 'Update Leader' : 'Add Leader'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadership;
