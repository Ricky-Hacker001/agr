import { useState } from 'react';
import { getLeaders, type Leader } from '../data/adminStore';
import { Reveal } from '../components/Reveal';

// ── Scroll Animation Hook ─────────────────────────────────────────────────────
// Now importing from shared Reveal component.

// ── Data ──────────────────────────────────────────────────────────────────────
const classes = [
  { range: 'LKG – UKG', label: 'Pre-Primary', icon: '🌱', color: 'from-pink-400 to-rose-400', desc: 'Play-based learning with a focus on language, numbers, creativity, and social skills. Building the joyful foundation.' },
  { range: '1st – 5th', label: 'Primary', icon: '📖', color: 'from-sky-400 to-blue-500', desc: 'Core literacy & numeracy, Tamil & English, Environmental Science, and value education in a nurturing classroom.' },
  { range: '6th – 8th', label: 'Middle School', icon: '🔬', color: 'from-violet-500 to-purple-600', desc: 'Introduction to Science labs, Social Studies, and a deeper dive into Mathematics. First competitive exams prepare students well.' },
  { range: '9th – 10th', label: 'Secondary (SSLC)', icon: '🎯', color: 'from-emerald-500 to-teal-600', desc: '22 consecutive years of 100% pass in Tamil Nadu 10th Board. Structured revision, test series, and personalised coaching.' },
  { range: '11th – 12th', label: 'Higher Secondary', icon: '🚀', color: 'from-orange-500 to-amber-500', desc: 'Science & Arts streams. Expert faculty, full lab access, and intensive board preparation. 100% pass every year.' },
];

const subjects = [
  { icon: '🗣️', name: 'Tamil & English',    desc: 'Language fluency and literature appreciation from the ground up.' },
  { icon: '➕', name: 'Mathematics',         desc: 'Conceptual clarity with regular practice and problem-solving competitions.' },
  { icon: '🔬', name: 'Science',             desc: 'Hands-on lab sessions in Biology, Physics, and Chemistry.' },
  { icon: '🌍', name: 'Social Science',      desc: 'History, Geography, Civics — understanding the world around us.' },
  { icon: '💻', name: 'Computer Science',    desc: 'Coding basics, digital literacy, and modern tech skills.' },
  { icon: '🎨', name: 'Arts & Craft',        desc: 'Creative expression fostered in every student from an early age.' },
  { icon: '⚽', name: 'Physical Education', desc: 'NSNIS-certified coaches in Taekwondo, Kho-Kho, Netball, and more.' },
  { icon: '🎵', name: 'Music & Culture',    desc: 'Hindi Prachar Sabha exams, stage performances, and cultural fests.' },
];

const methods = [
  { icon: '🧪', title: 'Lab-First Learning',    desc: 'Science concepts aren\'t just read — they\'re experienced in our equipped labs.' },
  { icon: '📊', title: 'Exam Preparedness',      desc: 'Quarterly tests, mock boards, and individual performance tracking built in.' },
  { icon: '🤝', title: 'Personalised Attention', desc: 'Small batch sizes ensure every child is seen, heard, and supported by teachers.' },
  { icon: '🏅', title: 'Merit Recognition',      desc: 'Toppers receive fee concessions and awards — excellence is always rewarded.' },
  { icon: '👨‍👩‍👧', title: 'Parent Connect',        desc: 'Regular parent–teacher meetings keep families informed and involved.' },
  { icon: '🌐', title: 'Holistic Growth',        desc: 'Beyond marks — sports, arts, and values make our students complete human beings.' },
];

const results = [
  { label: '10th Pass Rate',  value: '100%', sub: '22 Consecutive Years',  color: 'from-blue-600 to-indigo-600' },
  { label: '12th Pass Rate',  value: '100%', sub: 'Every Academic Year',    color: 'from-emerald-600 to-teal-600' },
  { label: 'Merit Students',  value: '40+',  sub: 'Distinction Holders / Year', color: 'from-purple-600 to-pink-600' },
  { label: 'Fee Concessions', value: '100%', sub: 'For Rank Holders',       color: 'from-orange-500 to-amber-500' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
// ── Leader Card ─────────────────────────────────────────────────────────────────
const ROLE_CFG = {
  SPL:  { label: 'School Pupil Leader',       badge: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '🎖️', gradient: 'from-yellow-500 to-amber-500' },
  ASPL: { label: 'Associate School Pupil Leader', badge: 'bg-blue-100 text-blue-800 border-blue-300',   icon: '🏅', gradient: 'from-blue-500 to-indigo-600' },
};

const LEADERSHIP_QUALITIES = [
  { icon: '🤝', text: 'Empathy &amp; Respect' },
  { icon: '💪', text: 'Discipline &amp; Integrity' },
  { icon: '💡', text: 'Initiative &amp; Vision' },
  { icon: '🌟', text: 'Inspire &amp; Motivate' },
];

const LeaderCard = ({ l }: { l: Leader }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = ROLE_CFG[l.role];
  return (
    <div
      className={`bg-white rounded-3xl border shadow-sm transition-all duration-500 overflow-hidden cursor-pointer
        ${expanded ? 'border-indigo-200 shadow-2xl ring-2 ring-indigo-100' : 'border-slate-100 hover:shadow-lg hover:-translate-y-1'}`}
      onClick={() => setExpanded(e => !e)}
    >
      {/* Top gradient strip */}
      <div className={`h-1.5 bg-gradient-to-r ${cfg.gradient}`} />

      {/* Card header — always visible */}
      <div className="p-6 flex items-center gap-5">
        {/* Avatar */}
        <div className={`w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 bg-gradient-to-br from-slate-100 to-slate-200
          ${expanded ? 'border-indigo-300' : 'border-slate-200'} transition-colors`}>
          {l.photo
            ? <img src={l.photo} alt={l.name} className="w-full h-full object-cover" />
            : <div className="w-full h-full flex items-center justify-center text-3xl">{cfg.icon}</div>
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${cfg.badge}`}>{l.role}</span>
            <span className="text-[10px] text-gray-400 font-semibold">{l.year}</span>
          </div>
          <p className="font-black text-slate-800 text-base truncate">{l.name}</p>
          <p className="text-xs text-gray-500">{l.class}</p>
        </div>

        {/* Chevron */}
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Expandable content */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: expanded ? '480px' : '0px', opacity: expanded ? 1 : 0 }}
      >
        <div className="px-6 pb-6 flex flex-col gap-4">
          <div className={`h-px bg-gradient-to-r ${cfg.gradient} opacity-30`} />

          {/* Photo (large) if available */}
          {l.photo && (
            <div className="rounded-2xl overflow-hidden" style={{ height: '200px' }}>
              <img src={l.photo} alt={l.name} className="w-full h-full object-cover object-top" />
            </div>
          )}

          {/* Quote */}
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1.5">{cfg.label} says</p>
            <p className="text-slate-700 text-sm leading-relaxed italic">"{l.quote}"</p>
          </div>

          {/* Leadership qualities */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Why Leadership Matters</p>
            <div className="grid grid-cols-2 gap-2">
              {LEADERSHIP_QUALITIES.map(q => (
                <div key={q.text} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 rounded-xl p-2 border border-slate-100">
                  <span>{q.icon}</span>
                  <span dangerouslySetInnerHTML={{ __html: q.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────────────────
const Academics = () => {
  const leaders = getLeaders();
  return (
    <div className="min-h-screen bg-slate-50">

    {/* ── Hero ── */}
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.18)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(16,185,129,0.12)_0%,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 md:pb-32 text-center">
        <span className="inline-block bg-emerald-400/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          Academics at ARG Academy
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
          Where Knowledge Meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-400">
            Purpose
          </span>
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          ARG Academy offers a <strong className="text-white">comprehensive, Tamil Nadu board–aligned curriculum</strong> from LKG
          to Class 12 — designed to build not just toppers, but thinkers, athletes, and leaders.
        </p>

      </div>
    </section>

    {/* Wave */}
    <div className="-mt-1">
      <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 64L720 0L1440 64H0Z" fill="rgb(248 250 252)" />
      </svg>
    </div>

    {/* ── Board Results Proof ── */}
    <section className="max-w-6xl mx-auto px-4 py-12">
      <Reveal className="text-center mb-10">
        <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Academic Results</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800">Proof of Excellence</h2>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">Our numbers speak louder than any promise.</p>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((r, i) => (
          <Reveal key={r.label} delay={i * 100}>
            <div className={`bg-gradient-to-br ${r.color} text-white rounded-3xl p-6 text-center shadow-lg`}>
              <p className="text-4xl md:text-5xl font-black">{r.value}</p>
              <p className="font-bold text-sm mt-1 text-white/90">{r.label}</p>
              <p className="text-xs text-white/70 mt-0.5">{r.sub}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* ── Classes / Levels ── */}
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-12">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">From Nursery to Higher Secondary</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800">All Classes Under One Roof</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
            A continuous learning journey — your child grows with the same trusted school from LKG to Class 12.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div className="group bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-r ${c.color} p-5 flex items-center gap-3`}>
                  <span className="text-4xl">{c.icon}</span>
                  <div>
                    <p className="text-white font-black text-lg leading-tight">{c.label}</p>
                    <p className="text-white/75 text-xs font-semibold">Classes {c.range}</p>
                  </div>
                </div>
                <div className="p-5 flex-1">
                  <p className="text-slate-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Subjects ── */}
    <section className="max-w-6xl mx-auto px-4 py-16">
      <Reveal className="text-center mb-12">
        <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">What We Teach</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800">Subjects &amp; Curriculum</h2>
        <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
          Tamil Nadu State Board syllabus enriched with co-curricular depth — ensuring every child excels inside and outside the classroom.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {subjects.map((s, i) => (
          <Reveal key={s.name} delay={i * 70}>
            <div className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 text-center">
              <span className="text-4xl block mb-3">{s.icon}</span>
              <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{s.name}</p>
              <p className="text-slate-500 text-xs mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* ── Teaching Methodology ── */}
    <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Reveal className="text-center mb-12">
          <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Our Approach</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800">How We Make Learning Stick</h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
            Methods that go beyond textbooks — building confident, curious, capable students.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div className="bg-white rounded-3xl p-6 border border-indigo-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex gap-4">
                <span className="text-3xl mt-1 shrink-0">{m.icon}</span>
                <div>
                  <p className="font-black text-slate-800 text-base">{m.title}</p>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── Faculty Highlight ── */}
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-[2rem] overflow-hidden grid md:grid-cols-2 gap-0">
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">Our Educators</p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
            Teachers Who Are <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">Champions Themselves</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Our Physical Education faculty includes a <strong className="text-white">national-level athlete</strong> and
            NSNIS-certified coaches. Academic teachers are experienced board-exam specialists who bring
            dedication and passion to every lesson — and our District Best Teacher Award proves it.
          </p>
          <ul className="space-y-2">
            {['B.Ed / M.Ed Qualified Faculty', 'NSNIS-Certified Sports Coaches', 'District Best Teacher Award Winner', 'Regular Training & Upskilling'].map(f => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gradient-to-br from-indigo-800/50 to-purple-900/50 p-10 md:p-14 flex flex-col justify-center gap-5">
          {[
            { icon: '🏅', stat: 'District Best Teacher', sub: 'Award — 2024' },
            { icon: '🎽', stat: 'NSNIS-Certified Coaches', sub: 'For Taekwondo, Kho-Kho & Netball' },
            { icon: '📋', stat: '20+ Years Avg Experience', sub: 'Across our core academic staff' },
          ].map(f => (
            <div key={f.stat} className="flex items-center gap-4 bg-white/10 rounded-2xl p-4 border border-white/10">
              <span className="text-4xl">{f.icon}</span>
              <div>
                <p className="text-white font-black text-base">{f.stat}</p>
                <p className="text-indigo-300 text-xs font-medium">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ── Leadership Section ── */}
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Student Leadership</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">SPL &amp; ASPL — The Voice of Our School</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto text-sm">
              Our elected School Pupil Leaders embody the values ARG Academy stands for —
              discipline, empathy, and the courage to lead by example.
            </p>
            <p className="text-indigo-400 text-xs mt-2 font-medium animate-pulse">
              👆 Tap a card to read their message &amp; learn more
            </p>
          </Reveal>
          {leaders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-4xl mb-3">🎖️</p>
              <p className="font-semibold">Leadership details will be updated soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {leaders.map((l, i) => (
                <Reveal key={l.id} delay={i * 120}>
                  <LeaderCard l={l} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default Academics;
