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

const PopupBanner = () => {
  const [banner, setBanner] = useState<BannerData>(DEFAULT_BANNER);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if dismissed this session
    if (sessionStorage.getItem('arg_popup_dismissed') === 'true') {
      return;
    }

    const stored = localStorage.getItem('arg_popup_banner');
    const data: BannerData = stored ? JSON.parse(stored) : DEFAULT_BANNER;
    setBanner(data);

    if (data.enabled && data.imageUrl) {
      // Small delay so page loads first, then popup appears
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={close}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-[fadeIn_0.3s_ease]" />

      {/* Modal */}
      <div
        className="relative z-10 max-w-2xl w-full animate-[popIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute -top-4 -right-4 z-20 w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center shadow-2xl hover:bg-yellow-400 hover:scale-110 transition-all duration-200 font-black text-lg border-2 border-white"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Banner card */}
        <div className="rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.6)] border-4 border-white/20">
          {banner.linkUrl ? (
            <a href={banner.linkUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
              <img
                src={banner.imageUrl}
                alt={banner.altText}
                onLoad={() => setLoaded(true)}
                className={`w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            </a>
          ) : (
            <img
              src={banner.imageUrl}
              alt={banner.altText}
              onLoad={() => setLoaded(true)}
              className={`w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          {/* Loading skeleton */}
          {!loaded && (
            <div className="w-full h-80 bg-gradient-to-br from-blue-950 to-indigo-950 animate-pulse flex items-center justify-center">
              <div className="text-blue-400 text-sm font-medium animate-pulse">Loading...</div>
            </div>
          )}

          {/* Bottom bar */}
          <div className="bg-gradient-to-r from-blue-950 to-indigo-950 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-sm">✦</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest">ARG Academy</p>
            </div>
            <button
              onClick={close}
              className="text-xs text-blue-300 hover:text-white transition-colors font-medium"
            >
              Close ✕
            </button>
          </div>
        </div>

        {/* Don't show again */}
        <div className="text-center mt-4">
          <button
            onClick={() => {
              close();
              // Disable for this session only
              sessionStorage.setItem('arg_popup_dismissed', 'true');
            }}
            className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
          >
            Don't show again this session
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PopupBanner;