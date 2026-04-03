import { useEffect, useState } from 'react';

interface BannerData {
  enabled: boolean;
  imageUrl: string;
  linkUrl: string;
  altText: string;
}

const DEFAULT_BANNER: BannerData = {
  enabled: true,
  imageUrl: '/assets/images/Banners/Banner.jpeg',
  linkUrl: '',
  altText: 'ARG Academy Announcement',
};

const BannerAdmin = () => {
  const [banner, setBanner] = useState<BannerData>(DEFAULT_BANNER);
  const [saved, setSaved] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('arg_popup_banner');
    if (stored) setBanner(JSON.parse(stored));
  }, []);

  const handleChange = (field: keyof BannerData, value: string | boolean) => {
    setSaved(false);
    setBanner((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('arg_popup_banner', JSON.stringify(banner));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    localStorage.removeItem('arg_popup_banner');
    setBanner(DEFAULT_BANNER);
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-blue-600 text-xs font-black uppercase tracking-[0.25em] mb-1">Admin Panel</p>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Popup Banner Settings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure the announcement banner that appears when visitors open the website.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Enable / Disable toggle */}
          <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-800">Banner Status</p>
              <p className="text-xs text-slate-400 mt-0.5">Turn the popup on or off for all visitors</p>
            </div>
            <button
              onClick={() => handleChange('enabled', !banner.enabled)}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
                banner.enabled ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                  banner.enabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="px-8 py-6 space-y-6">

            {/* Image URL */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                Banner Image URL <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={banner.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://example.com/banner.jpg"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Paste a direct image URL or use a local path (e.g. <code className="bg-slate-200 px-1 py-0.5 rounded">/assets/images/Banners/Banner.jpeg</code>)
              </p>
            </div>

            {/* Link URL */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                Click Link URL <span className="text-slate-400 font-medium normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={banner.linkUrl}
                onChange={(e) => handleChange('linkUrl', e.target.value)}
                placeholder="https://argacademy.in/admissions"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Where to send visitors when they click the banner. Leave blank for no link.
              </p>
            </div>

            {/* Alt text */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">
                Alt Text / Description
              </label>
              <input
                type="text"
                value={banner.altText}
                onChange={(e) => handleChange('altText', e.target.value)}
                placeholder="ARG Academy Admissions Open 2025"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50"
              />
            </div>

            {/* Image Preview */}
            {banner.imageUrl && (
              <div>
                <p className="text-xs font-black text-slate-700 uppercase tracking-widest mb-2">Preview</p>
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <img
                    src={banner.imageUrl}
                    alt={banner.altText}
                    className="w-full object-cover max-h-64"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="bg-gradient-to-r from-blue-950 to-indigo-950 px-4 py-2 flex items-center justify-between">
                    <p className="text-white text-xs font-bold">ARG Academy</p>
                    <p className="text-blue-300 text-xs">Close ✕</p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              className="bg-blue-950 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-900 transition-all shadow hover:scale-105 active:scale-95"
            >
              {saved ? '✅ Saved!' : '💾 Save Changes'}
            </button>
            <button
              onClick={() => setPreviewOpen(true)}
              disabled={!banner.imageUrl}
              className="bg-yellow-400 text-blue-950 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-300 transition-all shadow hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              👁 Preview Popup
            </button>
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-red-500 text-sm font-medium transition-colors ml-auto"
            >
              Reset to default
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Changes are saved to browser storage and take effect immediately on the website.
        </p>
      </div>

      {/* Live preview modal */}
      {previewOpen && banner.imageUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="relative z-10 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-2xl hover:bg-yellow-400 hover:scale-110 transition-all font-black text-lg border-2 border-white"
            >
              ✕
            </button>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img src={banner.imageUrl} alt={banner.altText} className="w-full object-cover" />
              <div className="bg-gradient-to-r from-blue-950 to-indigo-950 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">✦</span>
                  <p className="text-white text-xs font-bold uppercase tracking-widest">ARG Academy</p>
                </div>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="text-xs text-blue-300 hover:text-white transition-colors font-medium"
                >
                  Close ✕
                </button>
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-xs text-white/40">This is a preview — click outside to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerAdmin;