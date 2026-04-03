import { Reveal } from '../components/Reveal';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0a0f1c] sm:bg-slate-50 relative selection:bg-blue-500/30">

      {/* ── 1. Hero: Immersive & Cinematic ── */}
      <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80" 
            alt="School architecture" 
            className="w-full h-full object-cover opacity-50 scale-110 animate-[slowPan_30s_ease-in-out_infinite_alternate]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-black/40 to-black/60 sm:from-slate-50" />
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-16">
          <Reveal>
            <span className="inline-block py-1.5 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-black uppercase tracking-[0.3em] mb-8 shadow-2xl">
              Our Legacy
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[1.1]">
              Shaping the <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-100 to-amber-300 drop-shadow-[0_0_30px_rgba(253,224,71,0.3)]">
                Leaders of Tomorrow
              </span>
            </h1>
            <p className="text-slate-300 text-lg md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto opacity-90">
              A rich history of academic brilliance, holistic growth, and unwavering discipline. Welcome to ARG Academy.
            </p>
          </Reveal>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-60">
          <span className="text-[10px] text-white uppercase tracking-[0.3em] font-bold">Discover</span>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* ── 2. Motto: Learn & Lead ── */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900 relative overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="w-20 h-20 bg-yellow-400/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl mx-auto mb-10 border border-yellow-400/30 shadow-lg">
              🌟
            </div>
            <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.35em] mb-5">Our Motto</p>
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
              Learn &amp; Lead
            </h2>
            <p className="text-slate-300 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
              Every programme, every classroom, every activity at ARG Academy is rooted in one guiding purpose — to build students who don't just excel academically, but who rise as confident, compassionate leaders.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className="w-16 h-0.5 bg-yellow-400/50 rounded-full"></span>
              <span className="text-yellow-400/80 text-xs font-bold uppercase tracking-widest">ARG Academy</span>
              <span className="w-16 h-0.5 bg-yellow-400/50 rounded-full"></span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. The Foundation (Story / Our Genesis) ── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <Reveal>
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full block"></span>
                  <span className="text-indigo-600 font-black uppercase tracking-[0.2em] text-sm">Our Genesis</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Built on values. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Driven by purpose.</span>
                </h2>
                <div className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed">
                  <p>
                    ARG Academy was established with a singular, profound vision: to provide world-class education that remains deeply rooted in core human values.
                  </p>
                  <p>
                    Our founder built this institution on the unshakeable belief that every child possesses unique potential waiting to be unlocked. We don't just teach the syllabus; we prepare young minds for the myriad challenges of life itself.
                  </p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={200}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[3rem] transform rotate-3 opacity-20 blur-2xl group-hover:rotate-6 group-hover:opacity-30 transition-all duration-700 pointer-events-none" />
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl aspect-[4/5] bg-slate-200 transform transition-transform duration-700 group-hover:-translate-y-2">
                  <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80" alt="School Archway" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                </div>
                <div className="absolute -bottom-8 -left-8 md:-left-12 bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] shadow-2xl border border-white max-w-[280px] animate-[float_6s_ease-in-out_infinite]">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl border border-yellow-200/50 shadow-inner">
                      🏛️
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Established</p>
                      <p className="text-3xl font-black text-slate-800 tracking-tight">22+ Years</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── 4. Leadership Spotlight ── */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-[3rem] p-1 shadow-2xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
              
              <div className="bg-slate-900/40 backdrop-blur-md rounded-[2.8rem] p-8 md:p-16 lg:p-20 relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                
                <div className="lg:col-span-4 relative group">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 bg-slate-800 relative shadow-[0_0_60px_rgba(59,130,246,0.2)]">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80" 
                      alt="Principal" 
                      className="w-full h-full object-cover opacity-90 sepia-[.3] mix-blend-luminosity group-hover:mix-blend-normal group-hover:sepia-0 group-hover:scale-105 transition-all duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6 lg:hidden">
                      <h3 className="text-2xl font-black text-white">Mrs. A. Geetha Ganesan</h3>
                      <p className="text-blue-300 text-sm font-medium">Co-Founder & Principal</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-8 text-white relative">
                  <div className="hidden lg:block mb-10">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-black uppercase tracking-[0.2em] mb-6">
                      Leadership
                    </span>
                    <h3 className="text-4xl lg:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">Mrs. A. Geetha Ganesan</h3>
                    <p className="text-blue-400 text-xl font-medium tracking-wide">Co-Founder & Principal</p>
                  </div>
                  
                  <div className="relative">
                    <span className="absolute -top-12 -left-8 text-8xl md:text-9xl text-indigo-500/20 font-serif leading-none select-none pointer-events-none">"</span>
                    <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-slate-200 italic relative z-10 pb-8 border-b border-white/10">
                      Education is not merely the accumulation of facts, but the <strong>preparation for life itself</strong>. We strive to create an environment where intellectual curiosity meets unwavering discipline, fostering the true leaders of tomorrow.
                    </p>
                    <div className="pt-8 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-400 font-medium uppercase tracking-widest">Guiding Vision</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Major Milestones (Bento Grid) ── */}
      <section className="py-24 md:py-32 bg-slate-50 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16 md:mb-24">
            <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-black uppercase tracking-[0.2em] mb-4">
              Our Pride
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">A Legacy of Excellence</h2>
            <p className="text-slate-500 mt-6 max-w-2xl mx-auto text-lg">Our unwavering commitment to holistic development has led to remarkable real-world achievements.</p>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[340px]">
            
            {/* Box 1: 100% Pass Rate */}
            <Reveal delay={100} className="md:col-span-2 group">
              <div className="h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 md:rounded-[2.5rem] rounded-3xl p-10 md:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col justify-end transform transition-transform duration-500 hover:-translate-y-2 border border-indigo-400/30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white mix-blend-overlay opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000" />
                <div className="absolute -top-10 -right-10 text-[120px] md:text-[180px] opacity-[0.05] leading-none font-black transform -rotate-12 select-none pointer-events-none">100</div>
                <h3 className="text-7xl md:text-9xl font-black mb-2 tracking-tighter drop-shadow-lg">100%</h3>
                <p className="text-2xl md:text-3xl font-bold text-blue-200 mb-4 tracking-tight">Academic Pass Rate</p>
                <p className="text-blue-100/80 max-w-lg text-sm md:text-base leading-relaxed">
                  We have proudly maintained an unbroken record of a 100% pass percentage for over twenty-two continuous years, demonstrating rigorous standards.
                </p>
              </div>
            </Reveal>
            
            {/* Box 2: National Athletes */}
            <Reveal delay={200} className="group">
              <div className="h-full bg-white md:rounded-[2.5rem] rounded-3xl p-10 border border-slate-200 shadow-xl relative overflow-hidden flex flex-col transform transition-transform duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-100 transition-colors duration-500" />
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-2xl flex items-center justify-center text-3xl mb-auto group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner border border-emerald-50">
                  🏃‍♂️
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">National Athletes</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Our focused sports programme, managed by NSNIS certified coaches, consistently produces national-level state representatives.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Box 3: Scholarships */}
            <Reveal delay={300} className="md:col-span-3 group">
              <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 md:rounded-[2.5rem] rounded-3xl p-10 md:p-14 text-amber-950 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-16 transform transition-transform duration-500 hover:-translate-y-2 border border-yellow-300">
                <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }}></div>
                <div className="relative shrink-0 w-28 h-28 md:w-40 md:h-40 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-5xl md:text-7xl shadow-[inset_0_4px_20px_rgba(255,255,255,0.8)] border-2 border-white/60 group-hover:rotate-12 transition-transform duration-700">
                  🎓
                  <div className="absolute top-0 right-0 text-2xl -translate-y-1/2 translate-x-1/2 animate-pulse">✨</div>
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-sm">Recognising True Merit</h3>
                  <p className="text-amber-900/80 text-lg md:text-xl font-semibold max-w-4xl leading-relaxed">
                    We strongly support talented students by providing substantial fee concessions up to <strong className="text-amber-950 font-black">100%</strong> for exceptional academic rank holders and outstanding sports achievers.
                  </p>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── 6. World Class Facilities (Gallery View) ── */}
      <section className="py-24 md:py-32 bg-white overflow-hidden relative border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-3xl">
              <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-[0.2em] mb-6">
                Infrastructure
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">A Campus Built for Growth</h2>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Our campus environment is meticulously designed to be safe, structured, and highly supportive, ensuring effective experiential learning for every student.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 shadow-sm shrink-0">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </span>
              <p className="font-bold text-slate-700 text-sm tracking-wide">24/7 Monitored Safe Campus</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* 3 Labs */}
            <Reveal delay={100} className="group cursor-default">
              <div className="relative h-96 lg:h-[420px] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80" alt="Laboratory" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                    🔬
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">3 Laboratories</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">Fully equipped modern science and computer laboratories for practical, hands-on learning.</p>
                </div>
              </div>
            </Reveal>

            {/* 4 Buses */}
            <Reveal delay={200} className="group cursor-default">
              <div className="relative h-96 lg:h-[420px] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&q=80" alt="School Bus" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                    🚌
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">4 Campus Buses</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">Dedicated transportation services ensuring safe and timely commutes from surrounding areas.</p>
                </div>
              </div>
            </Reveal>

            {/* Smart Classrooms */}
            <Reveal delay={300} className="group cursor-default md:col-span-2 lg:col-span-1">
              <div className="relative h-96 lg:h-[420px] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80" alt="Classroom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                    💻
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Smart Classrooms</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">Spacious, well-ventilated classrooms with digital teaching aids for modern interactive education.</p>
                </div>
              </div>
            </Reveal>

            {/* CCTV Surveillance */}
            <Reveal delay={400} className="group cursor-default">
              <div className="relative h-96 lg:h-[420px] rounded-[2rem] overflow-hidden shadow-xl border border-slate-100">
                <img src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80" alt="CCTV Surveillance" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/30 shadow-lg group-hover:bg-white/30 transition-colors">
                    📷
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">CCTV Surveillance</h3>
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed">Campus-wide 24/7 CCTV monitoring ensuring a completely safe and secure environment for every student.</p>
                </div>
              </div>
            </Reveal>
          </div>

          <style>{`
            @keyframes slowPan {
              from { object-position: center top; transform: scale(1.05); }
              to { object-position: center center; transform: scale(1.15); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
              100% { transform: translateY(0px); }
            }
          `}</style>
        </div>
      </section>

    </div>
  );
};

export default About;