import { useState } from 'react';
import { addApplication } from '../data/adminStore';
import { Reveal } from '../components/Reveal';

// ── Static data ───────────────────────────────────────────────────────────────
const ALL_CLASSES = [
  'LKG', 'UKG',
  '1st Standard', '2nd Standard', '3rd Standard', '4th Standard',
  '5th Standard', '6th Standard', '7th Standard', '8th Standard',
  '9th Standard', '10th Standard',
  '11th – Computer Science', '11th – Commerce Computer',
  '11th – Pure Science', '11th – Maths Biology',
  '12th – Computer Science', '12th – Commerce Computer',
  '12th – Pure Science', '12th – Maths Biology',
];

const CLASS_LEVELS = [
  { range: 'LKG – UKG', label: 'Pre-Primary', color: 'bg-pink-50 border-pink-200 text-pink-700', cls: ['LKG', 'UKG'] },
  { range: '1st – 5th', label: 'Primary', color: 'bg-sky-50 border-sky-200 text-sky-700', cls: ['1st', '2nd', '3rd', '4th', '5th'] },
  { range: '6th – 8th', label: 'Middle', color: 'bg-violet-50 border-violet-200 text-violet-700', cls: ['6th', '7th', '8th'] },
  { range: '9th – 10th', label: 'Secondary', color: 'bg-emerald-50 border-emerald-200 text-emerald-700', cls: ['9th', '10th'] },
  { range: '11th – 12th', label: 'Higher Sec.', color: 'bg-amber-50 border-amber-200 text-amber-700', cls: ['11th', '12th'] },
];

const COURSES = [
  { icon: '⚗️', title: 'Pure Science', desc: 'Physics, Chemistry, Botany & Zoology — the backbone of engineering and research.', tag: 'Engineering / Research', color: 'from-blue-600 to-cyan-600' },
  { icon: '🧬', title: 'Maths Biology ', desc: 'Physics, Chemistry, Maths & Biology — gateway to medicine and life sciences.', tag: 'Medicine / Pharmacy', color: 'from-emerald-600 to-teal-600' },
  { icon: '💻', title: 'Computer Science', desc: 'Programming fundamentals, software tools, and IT skills for the digital age.', tag: 'IT / Software', color: 'from-indigo-600 to-purple-600' },
  { icon: '📊', title: 'Commerce Computer', desc: 'Accountancy, business studies, and economics for future entrepreneurs.', tag: 'Business / Finance', color: 'from-orange-500 to-amber-500' },
];

const WHY_US = [
  { icon: '✅', stat: '100%', label: 'Board Pass Rate', sub: '22 years in a row' },
  { icon: '🏆', stat: '50+', label: 'Awards & Medals', sub: 'District, State & National' },
  { icon: '👩‍🏫', stat: '20+', label: 'Years Avg Faculty Exp.', sub: 'Dedicated & certified' },
  { icon: '🎽', stat: 'NSNIS', label: 'Certified Coaches', sub: 'Sports excellence' },
];

const METHODOLOGY = [
  {
    grade: 'LKG – UKG',
    label: 'Pre-Primary',
    icon: '🌳',
    color: 'from-pink-500 to-rose-400',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    tag: 'Play-Based Learning',
    desc: 'Young children learn best through sensory play and exploration. Our KG classrooms extend outdoors — story time under trees, sand-pit numeracy, and colour-based alphabet games make learning feel like pure joy.',
    points: ['Playground & outdoor learning activities', 'Rhymes, storytelling & role play', 'Colour, shape & number games', 'Social skills through group play'],
  },
  {
    grade: '1st – 5th Standard',
    label: 'Primary',
    icon: '🎨',
    color: 'from-sky-500 to-blue-500',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    tag: 'Activity-Based Learning',
    desc: 'At the primary level, textbook lessons come alive through hands-on activities, craft projects, and interactive group tasks. Students build foundational literacy & numeracy through doing, not just reading.',
    points: ['Activity kits & craft-based lessons', 'Group projects & team tasks', 'Visual aids & chart-based learning', 'Regular oral reading & writing practice'],
  },
  {
    grade: '6th – 8th Standard',
    label: 'Middle School',
    icon: '🔬',
    color: 'from-violet-600 to-purple-500',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    tag: 'Concept-Driven Learning',
    desc: 'Middle school is where curiosity deepens. Students move from memorisation to understanding — first science lab sessions, map-based geography, and algebraic thinking foster independent reasoning.',
    points: ['First introductory science lab sessions', 'Map work, timeline projects & debates', 'Problem-solving focused Mathematics', 'Subject-specific workbooks & practice sheets'],
  },
  {
    grade: '9th – 10th Standard',
    label: 'SSLC',
    icon: '🎯',
    color: 'from-emerald-600 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    tag: 'Board Exam Focused',
    desc: 'Preparation for the Tamil Nadu 10th Board is structured and intensive. Regular tests, chapter-wise revisions, and one-on-one doubt sessions form the backbone of our 100% pass-rate legacy.',
    points: ['Monthly tests + quarterly mock boards', 'Chapter-wise revision with answer writing practice', 'Individual rank & performance tracking', 'Special coaching for weak subjects'],
  },
  {
    grade: '11th – 12th Standard',
    label: 'Higher Secondary',
    icon: '🚀',
    color: 'from-orange-500 to-amber-400',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    tag: 'Career-Oriented Learning',
    desc: 'Higher secondary teaching is tailored to each stream — lab-intensive for science, case-study driven for commerce, and project-based for computer applications. Board prep is woven into every week.',
    points: ['Stream-specific lab & practical sessions', 'Case studies & project-based Commerce learning', 'Full-syllabus revision before boards', 'Career & higher-education counselling'],
  },
];

const PROCESS = [
  { num: '1', icon: '📝', title: 'Fill Enquiry Form', desc: 'Complete the online admission enquiry form below with student and parent details.' },
  { num: '2', icon: '📞', title: 'Team Contacts You', desc: 'Our admissions team calls you within 1–2 working days to discuss seat availability.' },
  { num: '3', icon: '🏫', title: 'School Visit', desc: 'Visit the campus, meet the principal, and experience the ARG Academy environment.' },
  { num: '4', icon: '📂', title: 'Submit Documents', desc: 'Submit required documents (TC, mark sheets, photo ID) and complete registration.' },
  { num: '5', icon: '🎉', title: 'Welcome to ARG Academy', desc: 'Your child officially joins the ARG family — a future of excellence begins here.' },
];

const CONTACTS = [
  { icon: '📍', label: 'Address', value: '7th Cross, KRM Nagar, Annamalai Nagar, Chidambaram – 608 002' },
  { icon: '📞', label: 'Office', value: '93615 20505' },
  { icon: '📞', label: 'Principal', value: '93615 20502' },
  { icon: '✉️', label: 'Email', value: 'argprincipalannamalainagar@gmail.com' },
];

// ── Form types ────────────────────────────────────────────────────────────────
interface FormData { studentName: string; parentName: string; contact: string; classApplying: string; address: string; }
const emptyForm = (): FormData => ({ studentName: '', parentName: '', contact: '', classApplying: '', address: '' });

// ── Main component ────────────────────────────────────────────────────────────
const Admissions = () => {
  const [form, setForm] = useState<FormData>(emptyForm());
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.studentName.trim()) e.studentName = 'Student name is required';
    if (!form.parentName.trim()) e.parentName = 'Parent name is required';
    if (!/^\d{10}$/.test(form.contact.trim())) e.contact = 'Enter a valid 10-digit mobile number';
    if (!form.classApplying) e.classApplying = 'Please select a class';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { addApplication(form); setSubmitted(true); setLoading(false); }, 800);
  };

  const field = (id: keyof FormData, label: string, placeholder: string, type = 'text') => (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <input
        id={id} type={type} value={form[id]}
        onChange={e => { setForm(p => ({ ...p, [id]: e.target.value })); setErrors(p => ({ ...p, [id]: '' })); }}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all
          ${errors[id] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white hover:border-indigo-200'}`}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.2)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.1)_0%,transparent_60%)]" />

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
          <span className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Admissions Open 2025–26
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 leading-tight">
            Begin Your Child's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              Journey to Excellence
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            ARG Academy — Chidambaram's trusted school for <strong className="text-white">22+ years</strong>.
            Admissions open from LKG to 12th Standard. Limited seats. Act early.
          </p>

          {/* Quick stats */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_US.map((w) => (
              <div key={w.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 text-center">
                <p className="text-2xl">{w.icon}</p>
                <p className="text-2xl font-black text-white mt-1">{w.stat}</p>
                <p className="text-xs font-bold text-blue-200 mt-0.5">{w.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{w.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48L1440 0V48H0Z" fill="rgb(248 250 252)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">

        {/* ── CLASSES ── */}
        <section>
          <Reveal className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Seat Availability</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Classes We Offer</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">From the very first day of school to the final board exam — all under one roof.</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {CLASS_LEVELS.map((level, i) => (
              <Reveal key={level.label} delay={i * 80}>
                <div className={`rounded-2xl border p-5 ${level.color} text-center`}>
                  <p className="font-black text-lg">{level.label}</p>
                  <p className="text-xs font-semibold opacity-70 mt-0.5">Classes {level.range}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                    {level.cls.map(c => (
                      <span key={c} className="bg-white/60 text-xs font-bold px-2 py-0.5 rounded-full border border-current/20">{c}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── HIGHER SEC COURSES ── */}
        <section>
          <Reveal className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">11th & 12th Standard</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Higher Secondary Streams</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">Choose the path that matches your child's future ambitions.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COURSES.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className={`bg-gradient-to-r ${c.color} p-5`}>
                    <span className="text-4xl">{c.icon}</span>
                    <p className="text-white font-black text-base mt-2 leading-tight">{c.title}</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                    <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                    <span className="self-start text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {c.tag}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── TEACHING METHODOLOGY ── */}
        <section>
          <Reveal className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">How We Teach</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Teaching Methods by Grade</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-2xl mx-auto leading-relaxed">
              Every stage of school life needs a <strong>different approach</strong>. At ARG Academy, how we teach
              adapts as your child grows — from joyful play for toddlers to rigorous board preparation for seniors.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY.map((m, i) => (
              <Reveal key={m.grade} delay={i * 90}>
                <div className={`rounded-3xl border ${m.border} ${m.bg} overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  {/* Gradient top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${m.color}`} />

                  <div className="p-6 flex flex-col gap-4 flex-1">
                    {/* Icon + grade label */}
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${m.color} text-white rounded-2xl w-14 h-14 flex items-center justify-center text-3xl shrink-0 shadow-md`}>
                        {m.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{m.label}</p>
                        <h3 className="font-black text-slate-800 text-base leading-snug">{m.grade}</h3>
                      </div>
                    </div>

                    {/* Method tag pill */}
                    <span className={`self-start text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${m.color} text-white shadow-sm`}>
                      {m.tag}
                    </span>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed">{m.desc}</p>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 mt-auto pt-3 border-t border-white/60">
                      {m.points.map(pt => (
                        <li key={pt} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${m.color} shrink-0`} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ADMISSION PROCESS ── */}
        <section>
          <Reveal className="text-center mb-12">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Simple Steps</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">How to Get Admitted</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">Our admissions process is simple, transparent, and parent-friendly.</p>
          </Reveal>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 relative z-10">
              {PROCESS.map((p, i) => (
                <Reveal key={p.title} delay={i * 100}>
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white
                      ${i % 2 === 0 ? 'bg-gradient-to-br from-indigo-600 to-purple-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
                      {p.icon}
                    </div>
                    <div>
                      <p className={`text-xs font-extrabold mb-1 ${i % 2 === 0 ? 'text-indigo-600' : 'text-blue-600'}`}>STEP {p.num}</p>
                      <p className="font-black text-slate-800 text-sm">{p.title}</p>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ENQUIRY FORM + CONTACT ── */}
        <section>
          <Reveal className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold uppercase tracking-widest mb-2">Enquire Now</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800">Get in Touch</h2>
            <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">Fill in the form and our admissions team will call you back within 1–2 working days.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Contact sidebar */}
            <div className="lg:col-span-2 space-y-4">
              {CONTACTS.map(c => (
                <div key={c.label} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <span className="text-2xl shrink-0">{c.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{c.label}</p>
                    <p className="text-slate-800 font-semibold text-sm mt-0.5 break-all">{c.value}</p>
                  </div>
                </div>
              ))}

              {/* Fee concession box */}
              <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-2xl p-5 text-white">
                <p className="font-black text-base mb-2 flex items-center gap-2">🎓 Fee Concessions</p>
                <ul className="text-blue-200 text-sm space-y-1.5">
                  {['Up to 100% for rank holders', 'Up to 100% for state / national sports achievers', 'Special consideration for economically weaker sections'].map(l => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5 shrink-0">✓</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timing box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="font-black text-amber-800 text-sm flex items-center gap-2">⏰ Office Hours</p>
                <p className="text-amber-700 text-xs mt-1 leading-relaxed">Mon – Sat: 8:30 AM – 4:30 PM<br />Closed on Sundays & public holidays</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[400px]">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-5xl shadow-xl">
                    ✅
                  </div>
                  <h3 className="text-2xl font-black text-slate-800">Application Submitted!</h3>
                  <p className="text-slate-500 text-sm max-w-xs text-center leading-relaxed">
                    Thank you! Our admissions team will contact you at <strong className="text-slate-700">{form.contact || 'the number provided'}</strong> within 1–2 working days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(emptyForm()); }}
                    className="mt-2 bg-indigo-900 text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-indigo-800 transition-colors shadow-lg shadow-indigo-900/20"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-black text-slate-800">Online Admission Enquiry</h3>
                    <p className="text-slate-400 text-sm mt-1">Fill this form and we'll get back to you shortly. All fields marked * are required.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {field('studentName', 'Student Name *', 'Full name of the student')}
                    {field('parentName', 'Parent / Guardian Name *', "Father's or mother's full name")}
                    {field('contact', 'Mobile Number *', '10-digit mobile number', 'tel')}

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Class Applying For *</label>
                      <select
                        value={form.classApplying}
                        onChange={e => { setForm(p => ({ ...p, classApplying: e.target.value })); setErrors(p => ({ ...p, classApplying: '' })); }}
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all
                          ${errors.classApplying ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white hover:border-indigo-200'}`}
                      >
                        <option value="">— Select class —</option>
                        {ALL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.classApplying && <p className="text-red-500 text-xs mt-1">{errors.classApplying}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Residential Address *</label>
                      <textarea
                        rows={3}
                        value={form.address}
                        onChange={e => { setForm(p => ({ ...p, address: e.target.value })); setErrors(p => ({ ...p, address: '' })); }}
                        placeholder="Full residential address"
                        className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none transition-all
                          ${errors.address ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white hover:border-indigo-200'}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-600 hover:to-blue-600 text-white py-4 rounded-xl font-black text-sm
                        transition-all hover:-translate-y-0.5 shadow-xl shadow-indigo-900/25 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Submitting…</>
                      ) : '🚀 Submit Admission Enquiry →'}
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-2">
                      Your information is safe and will only be used to process your enquiry.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* ── Bottom trust banner ── */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white mt-16">
        <div className="max-w-5xl mx-auto px-4 py-14 text-center">
          <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest mb-3">22 Years of Proven Excellence</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Every Child Deserves the Best Start
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            At ARG Academy, we've spent over two decades shaping students who top board exams, win state championships,
            and grow into confident leaders. Your child's future starts with the right school — and this is it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
