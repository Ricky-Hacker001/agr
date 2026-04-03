import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type GalleryImage } from '../data/adminStore';
import { fetchGallery } from '../services/galleryService';

const categoryLabels: Record<string, string> = {
  sports: '🏆 Sports',
  cultural: '🎭 Cultural',
  academic: '📚 Academic',
  general: '📷 General',
};

const Gallery = () => {
  const navigate = useNavigate();
  const [all, setAll] = useState<GalleryImage[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchGallery().then(setAll).catch(console.error);
    setIsLoaded(true);
  }, []);

  const filtered = filter === 'all' ? all : all.filter(g => g.category === filter);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-blue-950 text-white py-16 md:py-24">
        {/* Decorative background blur */}
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[150%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Visual Stories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Gallery</span>
          </h1>
          <p className="text-blue-200/80 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Explore the vibrant moments of learning, sportsmanship, and community that define life at ARG Academy.
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]" onClick={() => setLightbox(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md"></div>
          
          <div className="relative max-w-5xl w-full z-10 flex flex-col items-center justify-center scale-95 opacity-0 animate-[scaleUp_0.4s_ease-out_0.1s_forwards]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute -top-12 right-0 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 transition-all rounded-full w-10 h-10 flex items-center justify-center text-xl backdrop-blur-sm">✕</button>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10 group">
              <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[75vh] object-contain bg-black" />
              
              {/* Event PDF Link Overlay (if exists) */}
              {lightbox.pdfUrl && (
                <button 
                  onClick={() => navigate(`/gallery/${lightbox.id}`)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-900 px-4 py-2 rounded-full font-bold text-sm shadow-xl hover:bg-white hover:scale-105 transition-all flex items-center gap-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 -translate-y-4 duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  View Full Details
                </button>
              )}
            </div>

            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-1">{lightbox.title}</h3>
              <p className="text-sm font-medium text-white/60">
                <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 mr-2">{categoryLabels[lightbox.category]}</span>
                {lightbox.uploadedAt}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Dynamic Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {['all', 'sports', 'cultural', 'academic', 'general'].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                filter === cat 
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/25 scale-105' 
                  : 'bg-white text-gray-500 shadow-sm border border-gray-100 hover:border-blue-200 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md'
              }`}
            >
              {cat === 'all' ? '✨ All Exhibits' : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Masonry Grid Setup */}
        {filtered.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filtered.map((g, index) => (
              <div 
                key={g.id} 
                className="relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-500" 
                onClick={() => g.pdfUrl ? navigate(`/gallery/${g.id}`) : setLightbox(g)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-gray-100">
                  <img src={g.url} alt={g.title} className="w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f8fafc" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%2394a3b8" font-size="20">🖼️</text></svg>'; }} 
                  />
                  
                  {/* Subtle Top Gradient for icon visibility */}
                  {g.pdfUrl && (
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}

                  {/* Gradient Overlay bottom to top */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 translate-y-4 group-hover:translate-y-0">
                    <p className="text-white text-lg font-bold leading-tight mb-1">{g.title}</p>
                    <p className="text-blue-200 text-xs font-semibold">{categoryLabels[g.category]}</p>
                  </div>
                </div>

                {/* PDF Badge Indicator Tooltip-style */}
                {g.pdfUrl && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-900 p-2 rounded-full shadow-lg z-10 group-hover:scale-110 transition-transform duration-300" title="Event Document Attached">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No moments captured yet</h3>
            <p className="text-gray-500 max-w-sm mx-auto">Please check back later or try selecting a different category from the filters above.</p>
          </div>
        )}
      </div>

      {/* Tailwind keyframes injection for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
