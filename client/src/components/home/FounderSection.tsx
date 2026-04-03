import useScrollAnimation from '../../hooks/useScrollAnimation';

const FounderSection = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left: Portrait */}
          <div className="flex justify-center lg:justify-end scroll-hidden-left">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-100 blur-xl opacity-70" />
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 flex flex-col items-center justify-center shadow-2xl overflow-hidden border-4 border-white">
                <div className="w-28 h-28 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center mb-4">
                  <span className="text-white text-4xl font-black">PA</span>
                </div>
                <p className="text-yellow-400 text-lg font-black">Prof. P. Adiyapatham</p>
                <p className="text-blue-200 text-xs mt-1">Founder</p>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-950/50 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-900 rounded-xl px-4 py-2 shadow-lg">
                <p className="text-xs font-black">Est. 2002</p>
              </div>
            </div>
          </div>

          {/* Right: Bio */}
          <div className="space-y-5 scroll-hidden-right">
            <div>
              <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.25em] mb-2">Meet Our Founder</p>
              <h2 className="text-3xl md:text-4xl font-black text-blue-950 leading-tight">
                Prof. P. Adiyapatham
              </h2>
              <p className="text-blue-600 font-semibold mt-1">Retired Professor, Annamalai University</p>
            </div>

            <div className="w-16 h-1 bg-yellow-400 rounded-full" />

            <p className="text-gray-600 leading-relaxed text-base">
              A visionary educator and retired professor from the prestigious Annamalai University,
              Prof. P. Adiyapatham founded ARG Academy in 2002 with a single, powerful dream —
              to provide world-class, affordable education to the children of Chidambaram and the
              surrounding regions.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              Drawing on decades of experience in higher education, he built this institution on
              the pillars of academic integrity, character development, and holistic growth.
              His philosophy: that every child, regardless of background, deserves access to
              excellence in education.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {[
                { label: 'Annamalai University', sub: 'Alma Mater' },
                { label: '22+ Years', sub: 'of Institution Building' },
                { label: '700+ Students', sub: 'Lives Impacted' },
              ].map((item) => (
                <div key={item.label} className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                  <p className="text-blue-900 font-bold text-sm">{item.label}</p>
                  <p className="text-blue-400 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
