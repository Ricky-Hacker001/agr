import { useState, useEffect } from 'react';
import { type Achievement } from '../data/adminStore';
import { Reveal, useScrollReveal } from '../components/Reveal';
import { fetchAchievements } from '../services/achievementService';

// ── Category Config ───────────────────────────────────────────────────────────
const CATS = [
  { key: 'all',      label: '🌟 All',       color: 'from-indigo-600 to-purple-600',  border: 'border-indigo-200', badge: 'bg-indigo-50 text-indigo-700',   accent: '#6366f1' },
  { key: 'academic', label: '📚 Academic',  color: 'from-blue-600 to-cyan-600',      border: 'border-blue-200',   badge: 'bg-blue-50 text-blue-700',       accent: '#2563eb' },
  { key: 'sports',   label: '🏆 Sports',    color: 'from-emerald-600 to-teal-600',   border: 'border-emerald-200',badge: 'bg-emerald-50 text-emerald-700', accent: '#059669' },
  { key: 'cultural', label: '🎭 Cultural',  color: 'from-purple-600 to-pink-600',    border: 'border-purple-200', badge: 'bg-purple-50 text-purple-700',   accent: '#9333ea' },
  { key: 'faculty',  label: '👩‍🏫 Faculty', color: 'from-orange-500 to-red-500',     border: 'border-orange-200', badge: 'bg-orange-50 text-orange-700',   accent: '#ea580c' },
];
const catConfig = (key: string) => CATS.find(c => c.key === key) ?? CATS[1];

// ── Per-achievement curated photo sets ────────────────────────────────────────
// Each set has 3 high-quality Unsplash images relevant to the achievement theme.
const ACHIEVEMENT_PHOTOS: Record<string, string[]> = {
  // Academic
  a1: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',   // graduation caps
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80',       // student studying
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',   // classroom boards
  ],
  a2: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',   // class room
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',   // student writing exam
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',   // books & study
  ],
  // Sports
  a3: [
    'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80',      // taekwondo kick
    'https://images.unsplash.com/photo-1564460549828-5b5e9a89c5e4?w=600&q=80',   // martial arts belt
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',   // sports trophy
  ],
  a4: [
    'https://images.unsplash.com/photo-1567880905822-56f8e06fe630?w=600&q=80',   // team sport run
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',      // school sports day
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80',   // team celebration
  ],
  a5: [
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80',   // netball game
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',      // basketball/netball court
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',   // team sport
  ],
  // Cultural
  a6: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',   // cultural programme
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&q=80',   // language learning
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80',   // school event
  ],
  // Faculty
  a7: [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',      // teacher in class
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',   // coach training
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',   // award trophy
  ],
};

// Fallback photos by category
const CATEGORY_PHOTOS: Record<string, string[]> = {
  academic: [
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
    'https://images.unsplash.com/photo-1638397249761-1568e6bd0f41?w=600&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
  ],
  cultural: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
  ],
  faculty: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=80',
    'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',
  ],
};

// Admin-uploaded photos take first priority; then curated Unsplash per-achievement; then category fallback
const getPhotos = (a: Achievement): string[] => {
  if (a.photos && a.photos.length > 0) return a.photos;
  return ACHIEVEMENT_PHOTOS[a.id] ?? CATEGORY_PHOTOS[a.category] ?? CATEGORY_PHOTOS.academic;
};

// ── Stats Banner ──────────────────────────────────────────────────────────────
const stats = [
  { value: '22+',   label: 'Years of Excellence', icon: '🏫' },
  { value: '100%',  label: 'Board Pass Rate',      icon: '✅' },
  { value: '50+',   label: 'Awards & Honours',     icon: '🥇' },
  { value: '1000+', label: 'Proud Alumni',          icon: '🎓' },
];

// ── Achievement Card (expandable) ─────────────────────────────────────────────
const AchievementCard = ({ a, delay }: { a: Achievement; delay: number }) => {
  const { ref, visible } = useScrollReveal();
  const [expanded, setExpanded] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const cfg = catConfig(a.category);
  const photos = getPhotos(a);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, ['--tw-ring-color' as string]: cfg.accent + '55' } as React.CSSProperties}
      className={`relative bg-white rounded-3xl border ${cfg.border} shadow-sm
        transition-all duration-500 overflow-hidden flex flex-col
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${expanded ? 'shadow-2xl ring-2 ring-offset-2' : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'}
      `}
      onClick={() => !expanded && setExpanded(true)}
    >
      {/* Coloured top bar */}
      <div className={`h-1.5 bg-gradient-to-r ${cfg.color} shrink-0`} />

      {/* ── Card body (always visible) ── */}
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${cfg.badge}`}>
            {cfg.label}
          </span>
          <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
            {a.year}
          </span>
        </div>

        <div>
          <h3 className={`font-black text-slate-800 text-lg leading-snug transition-colors ${!expanded ? 'group-hover:text-indigo-700' : ''}`}>
            {a.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{a.description}</p>
        </div>

        {(a.studentName || a.award) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            {a.studentName && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-full">
                👤 {a.studentName}
              </span>
            )}
            {a.award && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-800 font-semibold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                🏅 {a.award}
              </span>
            )}
          </div>
        )}

        {/* Tap to expand hint */}
        {!expanded && (
          <button
            className={`mt-1 flex items-center gap-1.5 text-xs font-bold self-start px-3 py-1.5 rounded-full transition-all
              ${cfg.badge} opacity-80 hover:opacity-100`}
            onClick={e => { e.stopPropagation(); setExpanded(true); }}
          >
            <span>📸 View Photos</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Expandable Photo Gallery ── */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight: expanded ? '420px' : '0px', opacity: expanded ? 1 : 0 }}
      >
        <div className="px-6 pb-6 flex flex-col gap-3">
          {/* Divider */}
          <div className={`h-px bg-gradient-to-r ${cfg.color} opacity-30`} />

          {/* Main photo */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-100" style={{ height: '220px' }}>
            <img
              key={activePhoto}
              src={photos[activePhoto]}
              alt={`${a.title} photo ${activePhoto + 1}`}
              className="w-full h-full object-cover transition-all duration-500 animate-fadeIn"
              style={{ animation: 'fadeIn 0.4s ease' }}
              onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80'; }}
            />
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cfg.color} opacity-10 pointer-events-none`} />

            {/* Photo nav arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); setActivePhoto(p => (p - 1 + photos.length) % photos.length); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 rounded-full p-1.5 shadow-md transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={e => { e.stopPropagation(); setActivePhoto(p => (p + 1) % photos.length); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-700 rounded-full p-1.5 shadow-md transition-all hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Photo counter badge */}
            <span className="absolute bottom-2 right-2 bg-black/50 text-white text-xs font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
              {activePhoto + 1} / {photos.length}
            </span>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2">
            {photos.map((src, i) => (
              <button
                key={i}
                onClick={e => { e.stopPropagation(); setActivePhoto(i); }}
                className={`flex-1 rounded-xl overflow-hidden transition-all duration-200 border-2
                  ${i === activePhoto ? 'border-indigo-400 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-90'}`}
                style={{ height: '56px' }}
              >
                <img
                  src={src}
                  alt={`thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80'; }}
                />
              </button>
            ))}
          </div>

          {/* Collapse button */}
          <button
            onClick={e => { e.stopPropagation(); setExpanded(false); setActivePhoto(0); }}
            className="self-center flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 font-semibold mt-1 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            Collapse
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const Achievements = () => {
  const [all, setAll] = useState<Achievement[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAchievements().then(setAll).catch(console.error);
  }, []);

  const filtered = filter === 'all' ? all : all.filter(a => a.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-10 text-center">
          <span className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Our Pride &amp; Glory
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            22 Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Excellence</span>
          </h1>
          <p className="text-blue-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every trophy, medal, and milestone earned by our students is proof that ARG Academy
            doesn't just teach — it <span className="text-white font-semibold">transforms lives</span>.
          </p>
          <p className="text-indigo-300 text-sm mt-4 animate-pulse">
            🖱️ Tap any card to explore photos of the achievement
          </p>
        </div>

        {/* Stats row */}
        <div className="relative max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
          {stats.map(s => (
            <div key={s.label} className="text-center py-8 px-4">
              <p className="text-4xl md:text-5xl font-black text-white">{s.icon} {s.value}</p>
              <p className="text-blue-300 text-xs font-semibold mt-1 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wave */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48L1440 0V48H0Z" fill="rgb(248 250 252)" />
        </svg>
      </div>

      {/* ── Filter Tabs ── */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap gap-2 items-center">
          {CATS.map(c => (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold capitalize transition-all duration-200 border
                ${filter === c.key
                  ? `bg-gradient-to-r ${c.color} text-white shadow-lg border-transparent scale-105`
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
            >
              {c.label}
            </button>
          ))}
          <span className="ml-auto text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
            {filtered.length} record{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-6xl mb-4">🏆</p>
            <p className="font-bold text-lg">No achievements in this category yet.</p>
            <p className="text-sm mt-1">Check back soon — our students are always winning!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <AchievementCard a={a} delay={0} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* ── Trust Banner ── */}
      <section className="bg-gradient-to-r from-indigo-900 to-blue-800 text-white mt-12">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3">For Every Parent</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Your Child's Future Is Our Mission
          </h2>
          <p className="text-blue-200 text-base max-w-2xl mx-auto leading-relaxed">
            For over two decades, ARG Academy has maintained a <strong className="text-white">100% board pass record</strong>.
            Our students win at nationals, represent Tamil Nadu, and walk out ready for life.
            When you choose ARG Academy, you choose a proven path.
          </p>
        </div>
      </section>

      {/* Fade-in keyframe for photo transition */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.04); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease; }
      `}</style>
    </div>
  );
};

export default Achievements;
