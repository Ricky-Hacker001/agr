import { Link } from 'react-router-dom';

const HERO_BG = "/assets/images/hero section image.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Background image — much more visible now ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url('${HERO_BG}')` }}
      />

      {/* ── Light-touch gradient overlay — image stays visible ── */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(110deg, rgba(15,23,80,0.82) 0%, rgba(15,23,80,0.65) 50%, rgba(15,23,80,0.40) 100%)',
        }}
      />

      {/* ── Subtle dot texture ── */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      {/* ── Content ── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Heading + Stats + CTAs ── */}
          <div className="text-white space-y-8">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-yellow-400/25 border border-yellow-400/50 rounded-full px-4 py-1.5 text-yellow-300 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Est. 2002 · Annamalai Nagar, Chidambaram
            </span>

            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-5xl md:text-6xl font-black leading-[1.05]">
                Where
              </h2>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.05] text-yellow-400">
                Excellence
              </h2>
              <h2 className="text-5xl md:text-6xl font-black leading-[1.05] text-blue-300">
                Meets Character.
              </h2>
            </div>

            {/* Sub-heading */}
            <p className="text-blue-100/90 text-lg leading-relaxed max-w-lg">
              ARG Academy nurtures future leaders through world-class academics,
              championship sports, and holistic development — shaping
              confident, responsible citizens since 2002.
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              {[
                { number: '700+', label: 'Students' },
                { number: '22+', label: 'Years Legacy' },
                { number: '100%', label: 'Pass Record' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-yellow-400">{s.number}</p>
                  <p className="text-blue-300 text-xs font-semibold mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* ── Clean single CTA row ── */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2.5 bg-yellow-400 text-blue-950 px-7 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-yellow-500/30 hover:bg-yellow-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Apply for Admission
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-6 py-3.5 rounded-2xl font-semibold text-sm hover:bg-white/25 transition-all duration-200"
              >
                Learn More
              </Link>
            </div>

          </div>

          {/* ── RIGHT: Why Choose ARG — clean card ── */}
          <div className="space-y-4">

            {/* Catchphrases card */}
            <div className="bg-black/30 backdrop-blur-xl border border-white/15 rounded-3xl p-7 shadow-2xl">
              <p className="text-yellow-400 text-[11px] font-black uppercase tracking-[0.25em] mb-5">
                Why ARG Academy?
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🎯', head: 'Your child deserves the best', sub: 'We deliver excellence every single day.' },
                  { icon: '🏆', head: '22 years, 100% results', sub: "Not luck — it's our culture." },
                  { icon: '🌱', head: 'We build futures', sub: 'Not just teach subjects.' },
                  { icon: '❤️', head: 'Every child, known by name', sub: 'Never just a roll number.' },
                  { icon: '🚀', head: 'One school, one family — for life', sub: 'LKG to 12th Standard.' },
                ].map((item) => (
                  <div key={item.head} className="flex items-start gap-3.5">
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <p className="text-white font-bold text-sm">{item.head}</p>
                      <p className="text-blue-300/80 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrol nudge — text only, no duplicate button */}
            <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-blue-950 font-black text-base">Admissions Open Now!</p>
              <p className="text-blue-900/80 text-xs mt-1">
                LKG – 12th Std · Up to <strong>100%</strong> fee concession for rank holders & sports achievers
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 56L1440 56L1440 18C1200 56 960 0 720 18C480 36 240 0 0 18L0 56Z" fill="#f8fafc" />
        </svg>
      </div>

    </section>
  );
};

export default HeroSection;
