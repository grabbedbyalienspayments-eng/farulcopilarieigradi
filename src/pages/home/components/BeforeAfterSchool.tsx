import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const features = [
  { icon: 'ri-time-line',        text: 'Program flexibil adaptat nevoilor familiei' },
  { icon: 'ri-shield-check-line', text: 'Supraveghere atentă și cadru sigur' },
  { icon: 'ri-book-open-line',   text: 'Suport pentru teme și activități educaționale' },
  { icon: 'ri-gamepad-line',     text: 'Activități recreative și timp liber organizat' },
];

export default function BeforeAfterSchool() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 lg:py-32 bg-brand-sand-dark">

      {/* Marine accent top stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-1 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(46,122,143,0.35), rgba(46,122,143,0.55), rgba(46,122,143,0.35), transparent)' }}
      />

      {/* Anchor watermark – in its own clipping container to prevent horizontal overflow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div
          className="absolute -right-10 top-1/2 -translate-y-1/2"
          style={{ opacity: 0.04, fontSize: '280px', color: '#2E7A8F', lineHeight: 1 }}
        >
          <i className="ri-anchor-line" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Image – STICKY on desktop */}
          <div
            className={`order-2 lg:order-1 lg:sticky lg:top-28 lg:self-start transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative">
              <div className="absolute -bottom-5 -left-5 w-full h-full rounded-2xl bg-marine-pale/20" />
              <div className="relative rounded-2xl overflow-hidden w-full h-[480px]">
                <img
                  src="/images/afterschool-hero-001.webp"
                  alt="Program Before & After School – Farul Copilăriei"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating time badge – border instead of shadow */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-5 py-4 border border-brand-sand-dark/20">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-marine-pale/25">
                    <i className="ri-time-line text-marine-mid text-lg" />
                  </span>
                  <div>
                    <p className="font-body text-xs text-brand-text-light">Program</p>
                    <p className="font-body text-sm font-bold text-brand-charcoal">7:00 – 19:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            className={`order-1 lg:order-2 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">
                Ceva pentru cei mai mari
              </span>
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-6">
              Before &amp; After School
            </h2>

            <p className="font-body text-brand-text-mid text-base leading-relaxed mb-8">
              Lighthouse of Childhood oferă și servicii Before &amp; After School pentru familiile care
              au nevoie de un program echilibrat, sigur și bine organizat în afara orelor clasice.
              Copiii beneficiază de susținere educațională, timp de joacă, activități recreative și
              un cadru atent, în care se simt în siguranță și valorizați.
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-10">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-amber/15 flex-shrink-0">
                    <i className={`${f.icon} text-brand-amber text-sm`} />
                  </span>
                  <span className="font-body text-sm text-brand-charcoal">{f.text}</span>
                </div>
              ))}
            </div>

            <Link
              to="/after-school"
              className="whitespace-nowrap inline-flex items-center gap-2 bg-brand-amber text-white font-body font-bold text-sm px-7 py-3.5 rounded-full hover:bg-brand-amber-dark transition-all hover:scale-105 cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line text-sm" />
              </span>
              Vezi mai mult
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
