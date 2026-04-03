import useScrollAnimation from '../../hooks/useScrollAnimation';

const milestones = [
  {
    year: '2002',
    icon: '🏫',
    title: 'The Beginning',
    color: 'bg-yellow-400',
    textColor: 'text-yellow-600',
    borderColor: 'border-yellow-400',
    description:
      'ARG Academy was founded by retired Professor P. Adiyapatham of Annamalai University with a vision to bring quality education to Annamalai Nagar, Chidambaram. The school opened its doors to its first batch of students with a commitment to excellence and holistic development.',
  },
  {
    year: '2010+',
    icon: '📚',
    title: 'Academic Excellence',
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-400',
    description:
      'Established an unbroken record of 100% pass percentage across 10th and 12th Board Examinations — maintained for over 22 consecutive years. Higher Secondary streams in Computer Applications, Commerce, Pure Science, and Biology were introduced.',
  },
  {
    year: '2015+',
    icon: '🏆',
    title: 'Sports & National Recognition',
    color: 'bg-green-500',
    textColor: 'text-green-600',
    borderColor: 'border-green-400',
    description:
      'ARG Academy emerged as a sports powerhouse, producing national-level athletes every year in Taekwondo (coached by NSNIS coaches and a Sports Science PhD holder), Kho-Kho, Netball, and Athletics (coached by a National Athlete).',
  },
  {
    year: 'Today',
    icon: '🌟',
    title: 'A Thriving Community',
    color: 'bg-indigo-500',
    textColor: 'text-indigo-600',
    borderColor: 'border-indigo-400',
    description:
      'Today, ARG Academy is home to over 700 students from LKG to 12th Standard. The school provides 4-bus transportation for surrounding areas, 3 fully equipped laboratories, and a rich extracurricular programme including yoga, silambam, Scout & Guides, and Hindi coaching.',
  },
];

const HistoryTimeline = () => {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 scroll-hidden">
          <p className="text-yellow-500 text-xs font-bold uppercase tracking-[0.25em] mb-2">Our Journey</p>
          <h2 className="text-3xl md:text-4xl font-black text-blue-950">School History</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
            Over two decades of growth, excellence, and unwavering dedication to our students.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-blue-400 to-indigo-500 -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const animClass = isLeft ? 'scroll-hidden-left' : 'scroll-hidden-right';
              const delay = `stagger-${i + 1}`;
              return (
                <div
                  key={m.year}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className={`${animClass} ${delay} bg-white rounded-2xl p-6 shadow-lg border-l-4 ${m.borderColor} hover:shadow-xl transition-shadow duration-300`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-3xl">{m.icon}</span>
                        <div className={isLeft ? 'md:text-right' : ''}>
                          <p className={`text-xs font-bold uppercase tracking-widest ${m.textColor}`}>{m.year}</p>
                          <h3 className="text-lg font-black text-blue-950">{m.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{m.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className={`scroll-hidden ${delay} w-12 h-12 rounded-full ${m.color} flex items-center justify-center shadow-lg z-10 border-4 border-white`}>
                      <span className="text-white text-lg">{m.icon}</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;
