import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Acasă',        href: '/#hero' },
  { label: 'Despre noi',   href: '/#despre-noi' },
  { label: 'Opționale',    href: '/#optionale' },
  { label: 'After school', href: '/after-school' },
  { label: 'Galerie',      href: '/#galerie' },
  { label: 'Articole',     href: '/#articole' },
  { label: 'Înscrieri',    href: '/inscrieri' },
  { label: 'Contact',      href: '/#contact' },
];

const legalLinks = [
  { label: 'Politică de confidențialitate', href: '#' },
  { label: 'Termeni și condiții',           href: '#' },
  { label: 'Politica cookies',              href: '#' },
];

const socialLinks = [
  { icon: 'ri-facebook-fill',  href: 'https://facebook.com', label: 'Facebook' },
  { icon: 'ri-instagram-line', href: 'https://instagram.com', label: 'Instagram' },
  { icon: 'ri-youtube-line',   href: 'https://youtube.com', label: 'YouTube' },
];

function handleAnchorClick(href: string) {
  if (href.startsWith('/#')) {
    const id = href.replace('/#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = href;
    }
  }
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#2A2520' }}>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1 – Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5 cursor-pointer">
              <img
                src="/images/8b2a9120d81d.webp"
                alt="Farul Copilăriei"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="font-body text-sm text-white/65 leading-relaxed mb-6">
              Lighthouse of Childhood este un spațiu al educației timpurii, născut din dragoste pentru
              copii, creat de părinți și profesori care și-au dorit un loc autentic, viu și inspirat.
              Aici, copilul se află în centrul întregii experiențe educaționale.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  rel="nofollow noopener"
                  target="_blank"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-amber/80 transition-colors cursor-pointer"
                >
                  <i className={`${s.icon} text-white text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 – Navigation */}
          <div>
            <h4 className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest mb-5">
              <a id="footer-nav" href="#footer-nav">Navigare rapidă</a>
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((item) => {
                const isPage = !item.href.startsWith('/#');
                return (
                  <li key={item.label}>
                    {isPage ? (
                      <Link
                        to={item.href}
                        className="font-body text-sm text-white/65 hover:text-brand-amber-light transition-colors cursor-pointer"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleAnchorClick(item.href)}
                        className="font-body text-sm text-white/65 hover:text-brand-amber-light transition-colors cursor-pointer bg-transparent border-none text-left"
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3 – Contact */}
          <div>
            <h4 className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest mb-5">
              <a id="footer-contact" href="#footer-contact">Contact</a>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0 mt-0.5">
                  <i className="ri-map-pin-line text-brand-amber text-sm" />
                </span>
                <div>
                  <p className="font-body text-xs text-white/40 uppercase tracking-wide mb-0.5">Adresă</p>
                  <p className="font-body text-sm text-white/80 leading-snug">
                    Strada Drumea Rădulescu Nr. 28
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                  <i className="ri-phone-line text-brand-amber text-sm" />
                </span>
                <div>
                  <p className="font-body text-xs text-white/40 uppercase tracking-wide mb-0.5">Telefon</p>
                  <a
                    href="tel:+40752318863"
                    className="font-body text-sm text-white/80 hover:text-brand-amber-light transition-colors cursor-pointer"
                  >
                    0752 318 863
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                  <i className="ri-mail-line text-brand-amber text-sm" />
                </span>
                <div>
                  <p className="font-body text-xs text-white/40 uppercase tracking-wide mb-0.5">Email</p>
                  <a
                    href="mailto:contact@farulcopilariei.ro"
                    className="font-body text-sm text-white/80 hover:text-brand-amber-light transition-colors cursor-pointer break-all"
                  >
                    contact@farulcopilariei.ro
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4 – Map */}
          <div>
            <h4 className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest mb-5">
              <a id="footer-map" href="#footer-map">Locație</a>
            </h4>
            <div className="rounded-xl overflow-hidden h-48 mb-4">
              <iframe
                title="Hartă Farul Copilăriei"
                src="https://maps.google.com/maps?q=Strada+Drumea+Radulescu+28+Bucuresti+Romania&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://waze.com/ul?q=Strada+Drumea+Radulescu+28+Bucharest"
              rel="nofollow noopener"
              target="_blank"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-white/10 hover:bg-brand-amber/70 text-white/80 hover:text-white font-body text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-navigation-line text-sm" />
              </span>
              Deschide în Waze
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: '#221E1A' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-1 text-center sm:text-left">
              <span className="font-body text-xs text-white/40">
                &copy; 2025 Lighthouse of Childhood.
              </span>
              <span className="font-body text-xs text-white/30 hidden sm:inline">·</span>
              <span className="font-body text-xs text-white/40">
                Website creat de{' '}
                <a
                  href="https://websiteon.ro/"
                  rel="nofollow noopener"
                  target="_blank"
                  className="text-brand-amber/70 hover:text-brand-amber transition-colors cursor-pointer"
                >
                  WebsiteON
                </a>
              </span>
            </div>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  rel="nofollow"
                  className="font-body text-xs text-white/35 hover:text-white/60 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
