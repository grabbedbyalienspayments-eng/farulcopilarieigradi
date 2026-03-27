import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const trustItems = [
  { icon: 'ri-heart-line',          text: 'Educație timpurie cu atenție reală' },
  { icon: 'ri-shield-check-line',   text: 'Mediu cald, sigur și echilibrat' },
  { icon: 'ri-seedling-line',       text: 'Opționale variate & activități în aer liber' },
  { icon: 'ri-team-line',           text: 'Relație apropiată cu părinții' },
];

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(0);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(() => setVisible(true), 120);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
    };
  }, [onScroll]);

  const toDespreNoi = () =>
    document.getElementById('despre-noi')?.scrollIntoView({ behavior: 'smooth' });

  /* Mobile = no zoom, lighter parallax for performance */
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const parallax = Math.min(scrollY * (isMobile ? 0.06 : 0.15), isMobile ? 30 : 80);
  const zoom     = isMobile ? 1.06 : 1.08 + Math.min(scrollY / 700, 1) * 0.10;
  const beamX    = isMobile ? 80 : 80 + Math.min(scrollY / 900, 1) * 3;

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundColor: '#091C27' }}>

      {/* ── Background image with cinematic zoom + parallax ── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `translateY(${parallax}px) scale(${zoom})`,
          transformOrigin: 'center top',
          top: '-80px',
          bottom: '-80px',
          willChange: 'transform',
        }}
      >
        <img
          src="/images/cfeb0938b394.webp"
          alt="Farul Copilăriei – grădiniță privată București"
          className="w-full h-full object-cover object-center"
          fetchpriority="high"
        />
      </div>

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/90 via-marine-dark/78 to-marine-dark/42" />
      <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/65 via-transparent to-transparent" />

      {/* ── Lighthouse beam ── */}
      <div
        className="absolute inset-0 pointer-events-none animate-beam-pulse"
        style={{
          background: `
            radial-gradient(ellipse 30% 78% at ${beamX}% 9%, rgba(232,184,114,0.17) 0%, rgba(232,184,114,0.05) 48%, transparent 72%),
            radial-gradient(ellipse 16% 110% at ${beamX - 2}% 0%, rgba(232,184,114,0.11) 0%, transparent 62%)
          `,
        }}
      />

      {/* ── Floating maritime elements (desktop only) ── */}
      <div className="hidden lg:block absolute pointer-events-none select-none animate-float"
        style={{ top: '7%', right: '4%', opacity: 0.07, animationDuration: '10s', fontSize: '130px', color: '#fff' }}>
        <i className="ri-anchor-line" />
      </div>
      <div className="hidden lg:block absolute pointer-events-none select-none animate-spin-very-slow"
        style={{ top: '38%', right: '16%', opacity: 0.09, fontSize: '66px', color: '#E8B872' }}>
        <i className="ri-compass-3-line" />
      </div>
      <div className="hidden lg:block absolute pointer-events-none select-none animate-drift"
        style={{ bottom: '22%', left: '6%', opacity: 0.07, fontSize: '44px', color: '#5BA3B0' }}>
        <i className="ri-ship-line" />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-32 sm:pt-36 lg:pt-28 pb-6 lg:pb-8 w-full">
          <div className="max-w-[700px]">

            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-10 h-px bg-brand-gold/70" />
                <span className="font-body text-brand-gold/80 text-xs font-semibold uppercase tracking-[0.28em]">
                  Grădiniță privată · București
                </span>
              </div>
            </div>

            <h1
              className={`font-display leading-[0.92] transition-all ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDuration: '900ms', transitionDelay: '200ms' }}
            >
              <span className="block text-white font-semibold" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)' }}>
                Înscrierile sunt
              </span>
              <span className="block font-light italic text-brand-gold text-glow-gold" style={{ fontSize: 'clamp(2.6rem, 6vw, 5.2rem)' }}>
                în plină desfășurare.
              </span>
            </h1>

            <div
              className={`mt-8 mb-7 flex items-center gap-4 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '420ms' }}
            >
              <div className="h-px w-14 bg-gradient-to-r from-brand-gold/55 to-transparent" />
              <i className="ri-anchor-line text-brand-gold/45 text-sm" />
              <div className="h-px w-14 bg-gradient-to-l from-brand-gold/55 to-transparent" />
            </div>

            <p
              className={`font-body text-white/70 leading-relaxed max-w-[540px] transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '470ms', fontSize: '1.05rem' }}
            >
              Coridor de joacă luminos, activități educaționale zilnice, un mediu cald și atent,
              în care copilul se dezvoltă armonios și este ghidat cu blândețe în fiecare etapă.
            </p>

            <div
              className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: '620ms' }}
            >
              <Link
                to="/inscrieri"
                className="whitespace-nowrap inline-flex items-center gap-2.5 font-body font-bold text-sm px-8 py-4 rounded-full hover:scale-105 transition-all cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #E8B872 0%, #C97B4B 100%)', color: '#0A1C27' }}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-circle-fill text-base" />
                </span>
                ÎNSCRIE-ȚI COPILUL
              </Link>
              <button
                onClick={toDespreNoi}
                className="whitespace-nowrap inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-body font-semibold text-sm px-8 py-4 rounded-full hover:bg-white/20 transition-all cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-compass-3-line text-marine-light text-base" />
                </span>
                Descoperă grădinița
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Trust bar – wraps on mobile, row on tablet+ ── */}
      <div
        className={`relative z-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '780ms' }}
      >
        <div className="border-t border-white/15" style={{ backgroundColor: 'rgba(9, 28, 39, 0.92)', backdropFilter: 'blur(14px)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 sm:flex sm:items-stretch sm:divide-x divide-white/15 py-0 gap-0">
              {trustItems.map((item, i) => (
                <div
                  key={item.text}
                  className={`flex items-center gap-3 px-4 sm:px-7 py-5 sm:py-6 flex-shrink-0 ${i % 2 === 1 ? 'border-l sm:border-l-0 border-white/15' : ''} ${i >= 2 ? 'border-t sm:border-t-0 border-white/15' : ''}`}
                >
                  <span className="w-8 h-8 flex items-center justify-center flex-shrink-0 rounded-full" style={{ background: 'rgba(232,184,114,0.15)' }}>
                    <i className={`${item.icon} text-base`} style={{ color: '#E8B872' }} />
                  </span>
                  <span className="font-body text-sm font-medium leading-tight" style={{ color: '#FFFFFF', opacity: 0.88 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
