import { Link } from 'react-router-dom';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: '/assets/logo/Social/facebook-solid1.svg',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: '/assets/logo/Social/instagram-fixed1.svg',
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@argacademy2025?si=uYEFOg6AsQaJ34xn',
    icon: '/assets/logo/Social/youtube-solid1.svg',
  },
  {
    name: 'Twitter / X',
    href: 'https://x.com',
    icon: '/assets/logo/Social/x-solid1.svg',
  },
];

const SocialIcons = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const btnClass =
    size === 'sm'
      ? 'w-7 h-7 rounded-lg'
      : 'w-10 h-10 rounded-xl';
  const imgClass =
    size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`${btnClass} bg-white/10 border border-white/10 flex items-center justify-center hover:bg-yellow-400/20 hover:border-yellow-400/40 hover:scale-110 transition-all duration-200`}
        >
          <img src={icon} alt={name} className={`${imgClass} object-contain`} />
        </a>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 mb-0" />

        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

            {/* Brand — spans 4 cols */}
            <div className="md:col-span-4 flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 border border-white/20 shadow-sm">
                    <img src="/assets/logo/logo.png" alt="ARG Academy" className="w-full h-full object-contain" />
                  </div>
                  <h3 className="text-2xl font-black text-yellow-400 tracking-tight">ARG Academy</h3>
                </div>
                <p className="text-blue-300 text-sm font-semibold mb-1">Matric Higher Secondary School</p>
                <p className="text-blue-400/80 text-xs leading-relaxed">
                  7th Cross, KRM Nagar, Annamalai Nagar,<br />
                  Chidambaram – 608 002
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 w-fit">
                <span className="text-yellow-400 text-sm">✦</span>
                <p className="text-xs text-blue-200 italic font-medium">"Empowering Minds Since 2002"</p>
              </div>

              {/* Social icons — below brand tagline */}
              <div>
                <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold mb-3">Follow Us</p>
                <SocialIcons size="md" />
              </div>
            </div>

            {/* Quick Links — spans 3 cols */}
            <div className="md:col-span-3 md:col-start-6">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-yellow-400 rounded-full inline-block"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About' },
                  { path: '/academics', label: 'Academics' },
                  { path: '/achievements', label: 'Achievements' },
                  { path: '/admissions', label: 'Admissions' },
                  { path: '/gallery', label: 'Gallery' },
                ].map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="group flex items-center gap-2 text-blue-300 hover:text-yellow-400 text-sm transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 group-hover:bg-yellow-400 transition-colors duration-200 shrink-0"></span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — spans 4 cols */}
            <div className="md:col-span-4 md:col-start-9">
              <h4 className="text-xs font-black text-white uppercase tracking-[0.25em] mb-6 flex items-center gap-2">
                <span className="w-4 h-0.5 bg-yellow-400 rounded-full inline-block"></span>
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5">
                    📞
                  </div>
                  <div className="text-sm text-blue-300 space-y-1">
                    <p>
                      Office:{' '}
                      <a href="tel:9361520505" className="hover:text-white transition-colors font-medium">
                        93615 20505
                      </a>
                    </p>
                    <p>
                      Principal:{' '}
                      <a href="tel:9361520502" className="hover:text-white transition-colors font-medium">
                        93615 20502
                      </a>
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5">
                    ✉️
                  </div>
                  <a
                    href="mailto:argprincipalannamalainagar@gmail.com"
                    className="text-sm text-blue-300 hover:text-white transition-colors break-all leading-relaxed"
                  >
                    argprincipalannamalainagar@gmail.com
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5">
                    📍
                  </div>
                  <a
                    href="https://maps.google.com/?q=ARG+ACADEMY+MATRICULATION+HIGHER+SECONDARY+SCHOOL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-300 hover:text-white transition-colors leading-relaxed"
                  >
                    Get Directions on Google Maps →
                  </a>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5">
                    🎓
                  </div>
                  <span className="text-sm text-blue-300">Est. 2002 </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-blue-500">
            © {new Date().getFullYear()} ARG Academy Matric Higher Secondary School. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <p className="text-xs text-blue-500 font-medium">Admissions Open · LKG to 12th Std</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;