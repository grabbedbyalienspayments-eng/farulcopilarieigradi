import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Acasă',        href: '/#hero' },
  { label: 'Despre noi',   href: '/#despre-noi' },
  { label: 'Opționale',    href: '/#optionale' },
  { label: 'After school', href: '/after-school' },
  { label: 'Galerie',      href: '/#galerie' },
  { label: 'Articole',     href: '/#articole' },
  { label: 'Înscrieri',    href: '/inscrieri' },
  { label: 'Contact',      href: '/#contact' },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location = useLocation();

  const handleScroll = useCallback(() => {
    // Only show scrolled state after the cinematic HeroNew section is fully done.
    // HeroNew pins with end: '+=200%' on a 100vh container → real scroll starts at ~2×innerHeight.
    const cinematicEnd = window.innerHeight * 2;
    setScrolled(window.scrollY > cinematicEnd);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href;
        return;
      }
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ─── Dynamic styles ─── */
  // Header height: taller before scroll to house bigger logo
  const headerHeight = scrolled ? 'h-20' : 'h-24 xl:h-28';

  // Logo height: 2x before scroll, normal after
  const logoHeight = scrolled ? 'h-12' : 'h-20 xl:h-24';

  // Scrolled background — use inline style so opacity works reliably
  const scrolledBg: React.CSSProperties = scrolled
    ? { backgroundColor: 'rgba(250,250,245,0.97)', backdropFilter: 'blur(14px)', boxShadow: '0 1px 0 rgba(42,37,32,0.07)' }
    : {};

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={scrolledBg}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/*
          Mobile layout:  [spacer] [logo — centered] [hamburger]
          Desktop layout: [logo]   [nav — flex]       [CTA]
          The `flex-1 / xl:flex-none` trick + a matching spacer on mobile
          ensures the logo is visually centered on small screens.
        */}
        <div className={`flex items-center transition-all duration-500 ${headerHeight}`}>

          {/* ── Mobile spacer (mirrors hamburger width so logo stays centred) ── */}
          <div className="xl:hidden w-10 h-10 flex-shrink-0" />

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex-1 xl:flex-none flex justify-center xl:justify-start cursor-pointer"
          >
            <img
              src="/images/8b2a9120d81d.webp"
              alt="Farul Copilăriei"
              className={`w-auto object-contain transition-all duration-500 ${logoHeight}`}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isPage  = !item.href.startsWith('/#');
              const isActive = isPage && location.pathname === item.href;
              return isPage ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-sm font-body font-medium px-3 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-brand-amber'
                      : scrolled
                      ? 'text-brand-charcoal hover:text-brand-amber'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-body font-medium px-3 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer bg-transparent border-none ${
                    scrolled
                      ? 'text-brand-charcoal hover:text-brand-amber'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden xl:block flex-shrink-0">
            <Link
              to="/inscrieri"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-brand-amber text-white text-sm font-body font-semibold px-5 py-2.5 rounded-full hover:bg-brand-amber-dark transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-line text-sm" />
              </span>
              Programează o vizită
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`xl:hidden w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer flex-shrink-0 ${
              scrolled ? 'text-brand-charcoal' : 'text-white'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meniu"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <i className={`${menuOpen ? 'ri-close-line' : 'ri-menu-3-line'} text-xl`} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div
          className="xl:hidden border-t border-brand-sand-dark/30"
          style={{ backgroundColor: 'rgba(250,250,245,0.98)', backdropFilter: 'blur(14px)' }}
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              const isPage = !item.href.startsWith('/#');
              return isPage ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-body font-medium text-brand-charcoal hover:text-brand-amber px-3 py-2.5 rounded-lg hover:bg-brand-sand transition-colors cursor-pointer"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-body font-medium text-brand-charcoal hover:text-brand-amber px-3 py-2.5 rounded-lg hover:bg-brand-sand transition-colors cursor-pointer text-left w-full bg-transparent border-none"
                >
                  {item.label}
                </button>
              );
            })}
            <Link
              to="/inscrieri"
              onClick={() => setMenuOpen(false)}
              className="mt-2 whitespace-nowrap inline-flex items-center justify-center gap-2 bg-brand-amber text-white text-sm font-body font-semibold px-5 py-3 rounded-full hover:bg-brand-amber-dark transition-colors cursor-pointer"
            >
              Programează o vizită
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
