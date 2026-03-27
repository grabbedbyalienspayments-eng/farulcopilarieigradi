import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MicroCTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ backgroundColor: '#091C27' }}>

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/microcta-cinematic-v2-001.webp"
          alt="Un loc care ghidează cu blândețe"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-marine-deep/85 via-marine-deep/70 to-marine-deep/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/40 via-transparent to-marine-deep/30" />
      </div>

      {/* Light beam */}
      <div
        className="absolute inset-0 pointer-events-none animate-beam-pulse"
        style={{ background: 'radial-gradient(ellipse 35% 80% at 75% 10%, rgba(232,184,114,0.14) 0%, transparent 68%)' }}
      />

      {/* Floating compass */}
      <div className="absolute top-12 right-16 pointer-events-none animate-spin-very-slow" style={{ opacity: 0.09, fontSize: '80px', color: '#E8B872' }}>
        <i className="ri-compass-3-line" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDuration: '900ms' }}>

          {/* Lighthouse beacon visual – replaces plain circle */}
          <div className="relative mx-auto mb-12" style={{ width: '100px', height: '100px' }}>
            {/* Outer pulsing ring */}
            <div
              className="absolute rounded-full border border-brand-gold/10 animate-ping"
              style={{ inset: '-18px', animationDuration: '3s' }}
            />
            {/* Second ring */}
            <div
              className="absolute rounded-full border border-brand-gold/18"
              style={{ inset: '-8px' }}
            />
            {/* Third ring */}
            <div
              className="absolute rounded-full border border-brand-gold/28"
              style={{ inset: '-1px' }}
            />
            {/* Beam rays – upper right spread */}
            <div
              className="absolute"
              style={{
                width: '70px', height: '2px',
                background: 'linear-gradient(to right, rgba(232,184,114,0.55), transparent)',
                top: '22%', left: '58%',
                transformOrigin: 'left center',
                transform: 'rotate(-38deg)',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '55px', height: '1.5px',
                background: 'linear-gradient(to right, rgba(232,184,114,0.40), transparent)',
                top: '30%', left: '56%',
                transformOrigin: 'left center',
                transform: 'rotate(-20deg)',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '50px', height: '1.5px',
                background: 'linear-gradient(to right, rgba(232,184,114,0.35), transparent)',
                top: '18%', left: '54%',
                transformOrigin: 'left center',
                transform: 'rotate(-56deg)',
              }}
            />
            {/* Small beam to the left */}
            <div
              className="absolute"
              style={{
                width: '38px', height: '1px',
                background: 'linear-gradient(to left, rgba(232,184,114,0.25), transparent)',
                top: '25%', right: '58%',
                transformOrigin: 'right center',
                transform: 'rotate(35deg)',
              }}
            />
            {/* Inner circle */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(232,184,114,0.22) 0%, rgba(232,184,114,0.07) 100%)',
                border: '1.5px solid rgba(232,184,114,0.45)',
              }}
            >
              <i className="ri-lighthouse-line text-3xl text-brand-gold" />
            </div>
          </div>

          <p
            className="font-display italic font-light text-white leading-[1.2] max-w-3xl mx-auto"
            style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}
          >
            Vino să descoperi un loc în care copilul este ghidat cu blândețe,{' '}
            <span className="text-brand-gold not-italic">încurajat să crească firesc</span>{' '}
            și înconjurat de oameni care cred în educația făcută cu grijă.
          </p>

          {/* Divider */}
          <div className="mt-10 mb-10 flex items-center justify-center gap-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-brand-gold/50" />
            <i className="ri-anchor-line text-brand-gold/40 text-sm" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-brand-gold/50" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/inscrieri"
              className="whitespace-nowrap inline-flex items-center gap-2.5 font-body font-bold text-sm px-9 py-4 rounded-full hover:scale-105 transition-all cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #E8B872 0%, #C97B4B 100%)', color: '#091C27' }}
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-calendar-check-line text-base" />
              </span>
              Programează o vizită
            </Link>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="whitespace-nowrap inline-flex items-center gap-2.5 border-2 border-white/35 text-white font-body font-semibold text-sm px-9 py-4 rounded-full hover:bg-white/12 hover:border-white/55 transition-all cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-mail-open-line text-base" />
              </span>
              Scrie-ne un mesaj
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
