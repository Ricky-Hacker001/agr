import { useState, useRef, useEffect } from 'react';
import { type GalleryImage } from '../../data/adminStore';
import {
  fetchGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from '../../services/galleryService';

const categoryOptions = ['sports', 'cultural', 'academic', 'general'] as const;
const categoryLabels: Record<string, string> = { sports: '🏆 Sports', cultural: '🎭 Cultural', academic: '📚 Academic', general: '📷 General' };

const emptyForm = (): Partial<GalleryImage> => ({ title: '', category: 'general', url: '', uploadedAt: new Date().toISOString().split('T')[0], pdfUrl: '' });

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<GalleryImage>>(emptyForm());
  const [isEditMode, setIsEditMode] = useState(false);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const notify = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const openNew = () => { setEditing(emptyForm()); setIsEditMode(false); setShowForm(true); };
  const openEdit = (g: GalleryImage) => { setEditing({ ...g }); setIsEditMode(true); setShowForm(true); };

  useEffect(() => {
    fetchGallery()
      .then(setItems)
      .catch(() => notify('❌ Failed to load gallery'))
      .finally(() => setLoading(false));
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setEditing(p => ({ ...p, url: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!editing.title || !editing.url) return;
    try {
      if (isEditMode && editing.id) {
        const updated = await updateGalleryItem(editing.id, editing);
        setItems(prev => prev.map(g => g.id === editing.id ? updated : g));
        notify('✅ Image updated');
      } else {
        const { id: _id, ...data } = editing as GalleryImage;
        const created = await createGalleryItem(data);
        setItems(prev => [created, ...prev]);
        notify('✅ Image added to gallery');
      }
      setShowForm(false);
    } catch (err: unknown) {
      notify(`❌ ${err instanceof Error ? err.message : 'Save failed'}`);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Remove this image from the gallery?')) return;
    try {
      await deleteGalleryItem(id);
      setItems(prev => prev.filter(g => g.id !== id));
      notify('🗑️ Image removed');
    } catch {
      notify('❌ Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      {toast && <div className="fixed top-4 right-4 bg-blue-900 text-white px-5 py-3 rounded-xl shadow-lg z-50 text-sm font-semibold">{toast}</div>}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-blue-950">Gallery</h1>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} images · visible on the public Gallery page</p>
        </div>
        <button onClick={openNew} className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-all">+ Upload Image</button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-black text-blue-950">{isEditMode ? 'Edit Image' : 'Upload Image'}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Title *</label>
                <input type="text" value={editing.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="e.g. Annual Sports Day 2025" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Category</label>
                  <select value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value as GalleryImage['category'] }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
                    {categoryOptions.map(c => <option key={c} value={c}>{categoryLabels[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Date</label>
                  <input type="date" value={editing.uploadedAt ?? ''} onChange={e => setEditing(p => ({ ...p, uploadedAt: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Upload Local Image</label>
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <button onClick={() => fileRef.current?.click()} className="w-full border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors text-center">📁 Click to select image…</button>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Or Paste Image URL *</label>
                <input type="url" value={editing.url?.startsWith('data:') ? '' : (editing.url ?? '')} onChange={e => setEditing(p => ({ ...p, url: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Event Details PDF URL (Optional)</label>
                <input type="url" value={editing.pdfUrl ?? ''} onChange={e => setEditing(p => ({ ...p, pdfUrl: e.target.value }))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" placeholder="https://example.com/details.pdf" />
              </div>
              {editing.url && (
                <div className="relative h-40 rounded-xl overflow-hidden bg-gray-100">
                  <img src={editing.url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancel</button>
              <button onClick={save} className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-800 transition-colors">
                {isEditMode ? 'Update' : 'Add to Gallery'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-900 rounded-full animate-spin mx-auto mb-3" />
          Loading gallery…
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(g => (
            <div key={g.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-shadow">
              <div className="relative h-36 bg-gray-100">
                <img src={g.url} alt={g.title} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23dbeafe" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%233b82f6" font-size="30">🖼️</text></svg>'; }} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => openEdit(g)} className="bg-white text-blue-900 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50">Edit</button>
                  <button onClick={() => remove(g.id)} className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-red-600">Delete</button>
                </div>
              </div>
              <div className="p-2.5 flex justify-between items-start">
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-blue-950 truncate">{g.title}</p>
                  <p className="text-[10px] text-gray-400">{categoryLabels[g.category]} · {g.uploadedAt}</p>
                </div>
                {g.pdfUrl && <span className="text-xs shrink-0 ml-1" title="Has PDF attached">📄</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
