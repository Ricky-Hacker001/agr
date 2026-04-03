import { useRef, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import FounderSection from '../components/home/FounderSection';
import VisionMission from '../components/home/VisionMission';
import HistoryTimeline from '../components/home/HistoryTimeline';
import PopupBanner from '../components/PoppopBanner';

// Reusable scroll observer for inline sections
const useInlineSectionAnimation = () => {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const targets = container.querySelectorAll<HTMLElement>(
      '.scroll-hidden, .scroll-hidden-left, .scroll-hidden-right'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
};

// Stats banner
const StatsBanner = () => {
  const ref = useInlineSectionAnimation();
  return (
    <section ref={ref} className="bg-blue-900 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { number: '700+', label: 'Students Enrolled', icon: '👨‍🎓' },
            { number: '100%', label: 'Pass Rate — 22 Years', icon: '📈' },
            { number: '3', label: 'Laboratories', icon: '🔬' },
          ].map((stat, i) => (
            <div key={stat.label} className={`scroll-hidden stagger-${i + 1}`}>
              <p className="text-3xl mb-1">{stat.icon}</p>
              <p className="text-3xl md:text-4xl font-black text-yellow-400">{stat.number}</p>
              <p className="text-blue-300 text-xs mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Location Section
const LocationSection = () => {
  const ref = useInlineSectionAnimation();
  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 scroll-hidden">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.25em] mb-2">Find Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-blue-950">Campus Location</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Visit us at ARG Academy Matriculation Higher Secondary School
          </p>
        </div>

        <div className="scroll-hidden grid grid-cols-1 md:grid-cols-3 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
          {/* Info Panel */}
          <div className="bg-blue-950 text-white p-8 flex flex-col justify-center gap-6">
            <div>
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Address</p>
              <p className="text-sm text-blue-200 leading-relaxed">
                ARG Academy Matriculation<br />Higher Secondary School,<br />Tamil Nadu, India
              </p>
            </div>
            <div>
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Phone</p>
              <a href="tel:9361520505" className="text-sm text-blue-200 hover:text-white transition-colors">
                📞 93615 20505
              </a>
            </div>
            <div>
              <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">Hours</p>
              <p className="text-sm text-blue-200">Mon – Sat: 8:00 AM – 4:00 PM</p>
            </div>
            <a
              href="https://maps.google.com/?q=ARG+ACADEMY+MATRICULATION+HIGHER+SECONDARY+SCHOOL"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block bg-yellow-400 text-blue-950 text-xs font-bold px-5 py-2.5 rounded-full hover:bg-yellow-300 transition-all text-center"
            >
              Get Directions →
            </a>
          </div>

          {/* Map */}
          <div className="md:col-span-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.3349593516946!2d79.71033777489178!3d11.383199888804853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54c2f3f153fadb%3A0xf4cd4ef4af574184!2sARG%20ACADEMY%20MATRICULATION%20HIGHER%20SECONDARY%20SCHOOL!5e0!3m2!1sen!2sin!4v1773468080817!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARG Academy Location"
              className="hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Extracurriculars
const ExtracurricularsStrip = () => {
  const ref = useInlineSectionAnimation();
  const activities = [
    { icon: '🥋', title: 'Taekwondo', sub: 'NSNIS & PhD Coaches' },
    { icon: '🏃', title: 'Athletics', sub: 'National Athlete Coach' },
    { icon: '🤸', title: 'Kho-Kho', sub: 'NSNIS Coach' },
    { icon: '🏐', title: 'Netball', sub: 'Competitive Teams' },
    { icon: '🧘', title: 'Yoga', sub: 'Daily Practice' },
    { icon: '🪃', title: 'Silambam', sub: 'Traditional Martial Art' },
    { icon: '🪖', title: 'Scout & Guides', sub: 'Leadership Program' },
    { icon: '🗣️', title: 'Hindi Coaching', sub: 'Hindi Prachar Sabha' },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-br from-indigo-950 via-blue-950 to-blue-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 scroll-hidden">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-[0.25em] mb-2">Beyond the Classroom</p>
          <h2 className="text-3xl md:text-4xl font-black">Extracurricular Activities</h2>
          <p className="text-blue-300 text-sm mt-3 max-w-lg mx-auto">
            We cultivate champions — on the field, in the arts, and in life.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {activities.map((act, i) => (
            <div
              key={act.title}
              className={`scroll-hidden stagger-${i + 1} bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-default`}
            >
              <p className="text-4xl mb-2">{act.icon}</p>
              <p className="text-white font-bold text-sm">{act.title}</p>
              <p className="text-blue-300 text-xs mt-0.5">{act.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA
const CTASection = () => {
  const ref = useInlineSectionAnimation();
  return (
    <section ref={ref} className="py-16 bg-yellow-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-hidden">
          <h2 className="text-3xl md:text-4xl font-black text-blue-950 mb-3">
            Give Your Child the ARG Advantage
          </h2>
          <p className="text-blue-800 text-base mb-8 max-w-xl mx-auto">
            Admissions are open for all classes from LKG to 12th Standard.
            Fee concessions of up to 100% are available for rank holders and sports achievers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/admissions"
              className="bg-blue-950 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-900 transition-all shadow-lg hover:scale-105"
            >
              Apply Now →
            </a>
            <a
              href="tel:9361520505"
              className="bg-white text-blue-950 px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-50 transition-all shadow-lg hover:scale-105"
            >
              📞 Call Office: 93615 20505
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
    <PopupBanner />
      <HeroSection />
      <StatsBanner />
      <FounderSection />
      <VisionMission />
      <HistoryTimeline />
      <LocationSection />
      <ExtracurricularsStrip />
      <CTASection />
    </>
  );
};

export default Home;