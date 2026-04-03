import { useParams, useNavigate } from 'react-router-dom';
import { getGallery } from '../data/adminStore';
import { Reveal } from '../components/Reveal';

const categoryLabels: Record<string, string> = {
  sports: '🏆 Sports',
  cultural: '🎭 Cultural',
  academic: '📚 Academic',
  general: '📷 General',
};

const GalleryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const all = getGallery();
  
  const item = all.find(g => g.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <p className="text-4xl mb-4">😢</p>
        <h2 className="text-2xl font-bold text-blue-950 mb-2">Event Not Found</h2>
        <p className="text-gray-500 mb-6">The gallery item you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/gallery')} className="bg-blue-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors">
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => navigate('/gallery')} className="text-blue-900 hover:text-blue-700 font-bold mb-6 flex items-center gap-2">
          ← Back to Gallery
        </button>

        <Reveal className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8">
          <div className="md:flex">
            {/* Image side */}
            <div className="md:w-1/3 bg-gray-100 aspect-square md:aspect-auto md:h-64 relative">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" 
                   onError={e => { (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23dbeafe" width="100" height="100"/><text x="50" y="55" text-anchor="middle" fill="%233b82f6" font-size="30">🖼️</text></svg>'; }}
              />
            </div>
            {/* Details side */}
            <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">{categoryLabels[item.category]}</span>
                <span className="text-gray-400 text-sm font-medium">{item.uploadedAt}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-4">{item.title}</h1>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                Explore the detailed information regarding this event in the attached document below.
              </p>
            </div>
          </div>
        </Reveal>

        {/* PDF Viewer */}
        {item.pdfUrl ? (
          <Reveal delay={150} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-12">
            <h2 className="text-lg font-bold text-blue-950 mb-4 flex items-center gap-2">
              📄 Event Details
            </h2>
            <div className="w-full h-[600px] md:h-[800px] rounded-xl overflow-hidden border border-gray-200">
              <iframe src={item.pdfUrl} className="w-full h-full" title="Event PDF Document"></iframe>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={150} className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed">
            <p className="text-3xl mb-3">🚫</p>
            <p className="font-medium">No detail document attached for this event.</p>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
