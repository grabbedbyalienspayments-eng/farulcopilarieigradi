import { useEffect, useRef, useState } from 'react';

const scenes = [
  {
    eyebrow: 'Viziunea noastră',
    headline: 'Luminăm calea celor mici',
    body:    'Ca un far în noapte, suntem aici să ghidăm fiecare copil cu blândețe, claritate și dragoste sinceră.',
    image:   '/images/cfb3a10c9f04.webp',
    accent:  '#E8B872',
    icon:    'ri-lighthouse-line',
  },
  {
    eyebrow: 'Siguranța copilului',
    headline: 'Un loc în care copilul se simte acasă',
    body:    'Mediul Lighthouse este construit pe siguranță, căldură și predictibilitate — pentru liniștea copilului și a familiei.',
    image:   '/images/61776b9eeffb.webp',
    accent:  '#A8C4A0',
    icon:    'ri-shield-check-line',
  },
  {
    eyebrow: 'Creștere prin explorare',
    headline: 'Fiecare zi, o descoperire nouă',
    body:    'Copilăria este cel mai prețios timp de explorare. Noi îl protejăm și îl celebrăm în fiecare activitate zilnică.',
    image:   '/images/cfeb0938b394.webp',
    accent:  '#C97B4B',
    icon:    'ri-seedling-line',
  },
];

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [showHint, setShowHint]       = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect      = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled  = Math.max(0, -rect.top);
      const p         = Math.min(1, scrolled / Math.max(1, scrollable));
      setShowHint(p < 0.03);
      setActiveScene(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
    };
    const handler = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', handler, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', handler); cancelAnimationFrame(raf); };
  }, []);

  const active = scenes[activeScene];

  return (
    <div ref={containerRef} className="h-[220vh] md:h-[260vh] lg:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Entry fade from Hero ── */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{ height: '130px', zIndex: 15, background: 'linear-gradient(to bottom, #091C27 0%, transparent 100%)' }}
        />

        {/* ── Crossfading scene backgrounds ── */}
        {scenes.map((s, i) => (
          <div
            key={s.eyebrow}
            className="absolute inset-0"
            style={{ opacity: activeScene === i ? 1 : 0, transition: 'opacity 1.1s ease', zIndex: activeScene === i ? 1 : 0 }}
          >
            <img src={s.image} alt={s.headline} className="w-full h-full object-cover object-center" />
          </div>
        ))}

        {/* ── Overlays ── */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(105deg, rgba(9,28,39,0.88) 0%, rgba(20,46,62,0.72) 55%, rgba(20,46,62,0.38) 100%)' }} />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-marine-deep/55 via-transparent to-transparent" />

        {/* ── Lighthouse beam ── */}
        <div className="absolute inset-0 z-10 pointer-events-none animate-beam-pulse"
          style={{ background: 'radial-gradient(ellipse 30% 72% at 80% 10%, rgba(232,184,114,0.13) 0%, transparent 65%)' }} />

        {/* ── Content ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <div className="max-w-[680px]">

              {/* Scene progress dots */}
              <div className="flex items-center gap-2 mb-8">
                {scenes.map((_, i) => (
                  <div
                    key={i}
                    className="h-[3px] rounded-full"
                    style={{
                      width:      activeScene === i ? '32px' : '8px',
                      background: activeScene === i ? active.accent : 'rgba(255,255,255,0.20)',
                      transition: 'all 0.5s ease',
                    }}
                  />
                ))}
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px" style={{ background: active.accent, transition: 'background 0.7s ease' }} />
                <span
                  className="font-body text-xs font-semibold uppercase tracking-[0.28em]"
                  style={{ color: active.accent, transition: 'color 0.7s ease' }}
                >
                  {active.eyebrow}
                </span>
              </div>

              {/* Headline – key triggers fade-up re-animation */}
              <h2
                key={`h-${activeScene}`}
                className="font-display font-semibold text-white leading-[0.93] animate-fade-up"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
              >
                {active.headline}
              </h2>

              {/* Body */}
              <p
                key={`b-${activeScene}`}
                className="font-body text-white/70 leading-relaxed mt-6 max-w-[540px] animate-fade-up"
                style={{ fontSize: '1.05rem', animationDelay: '120ms' }}
              >
                {active.body}
              </p>

              {/* Scene counter */}
              <div className="mt-10 flex items-center gap-4">
                <span className="font-body text-xs text-white/28 uppercase tracking-widest">
                  {String(activeScene + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
                </span>
                <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-white/15 to-transparent" />
              </div>

            </div>
          </div>
        </div>

        {/* ── Bottom fade into next section ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #FAFAF5 0%, transparent 100%)' }} />

        {/* ── Scroll hint ── */}
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: showHint ? 0.6 : 0, transition: 'opacity 0.6s ease' }}
        >
          <span className="font-body text-xs text-white/50 uppercase tracking-widest">Continuă</span>
          <div className="w-px h-6 bg-gradient-to-b from-white/40 to-transparent animate-float" />
        </div>

        {/* ── Floating maritime accent ── */}
        <div className="absolute top-1/4 right-10 z-20 pointer-events-none animate-spin-very-slow" style={{ opacity: 0.07, fontSize: '80px', color: '#E8B872' }}>
          <i className="ri-compass-3-line" />
        </div>

      </div>
    </div>
  );
}
