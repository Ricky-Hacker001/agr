import useScrollAnimation from '../../hooks/useScrollAnimation';

const VisionMission = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-14 scroll-hidden">
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.25em] mb-2">Our Foundation</p>
          <h2 className="text-3xl md:text-4xl font-black text-blue-950">Vision & Mission</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            The core principles that guide everything we do at ARG Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Vision Card */}
          <div className="scroll-hidden-left relative group bg-blue-900 rounded-3xl p-8 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />

            <div className="relative w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-400/40">
              <svg className="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>

            <h3 className="relative text-2xl font-black mb-4 text-yellow-400">Our Vision</h3>
            <p className="relative text-blue-200 leading-relaxed">
              To develop responsible, knowledgeable, and disciplined individuals who contribute
              positively to society — graduates who are not just academically accomplished but
              are compassionate leaders and ethical citizens, equipped to face the challenges
              of a dynamic world.
            </p>

            <div className="relative mt-6 pt-6 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {['Responsibility', 'Knowledge', 'Discipline', 'Integrity'].map((val) => (
                  <span key={val} className="bg-white/10 text-blue-200 text-xs px-3 py-1 rounded-full border border-white/10">
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="scroll-hidden-right relative group bg-white rounded-3xl p-8 overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-blue-100">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-50 rounded-full translate-y-8 -translate-x-8" />

            <div className="relative w-14 h-14 bg-blue-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/30">
              <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>

            <h3 className="relative text-2xl font-black mb-4 text-blue-950">Our Mission</h3>
            <ul className="relative space-y-3">
              {[
                'Provide quality, affordable education to every student',
                'Encourage academic excellence and a love of learning',
                'Nurture leadership, sportsmanship, and cultural values',
                'Promote holistic development through academics and extracurriculars',
                'Build a safe, inclusive, and inspiring campus environment',
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 w-5 h-5 shrink-0 bg-blue-900 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
