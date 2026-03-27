import { useEffect, useRef, useState } from 'react';

const images = [
  { src: '/images/gal-story-v3-001.webp',   alt: 'Lectură în cerc' },
  { src: '/images/gal-paint-v3-001.webp',    alt: 'Atelier de pictură' },
  { src: '/images/gal-outdoor-v3-001.webp', alt: 'Curte de joacă' },
  { src: '/images/gal-nook-v3-001.webp',    alt: 'Colț de lectură' },
  { src: '/images/gal-blocks-v3-001.webp',  alt: 'Joc constructiv' },
  { src: '/images/gal-music-v3-001.webp',                            alt: 'Activitate muzicală' },
  { src: '/images/gal-lunch-v3-001.webp',     alt: 'Prânzul la grădiniță' },
  { src: '/images/gal-hall-v3-001.webp',            alt: 'Holul de primire' },
];

/* ─── Mobile/fallback masonry ─── */
function MasonryGallery() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`columns-2 md:columns-3 gap-3 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {images.map((img, i) => (
        <div key={img.alt} className={`relative group break-inside-avoid rounded-xl overflow-hidden mb-3 ${i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-52' : 'h-60'}`}
          style={{ transitionDelay: `${i * 55}ms` }}>
          <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-600" />
          <div className="absolute inset-0 bg-gradient-to-t from-marine-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-3">
            <span className="font-body text-xs font-semibold text-white/90">{img.alt}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Desktop horizontal scroll gallery ─── */
function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef   = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [progress,   setProgress]   = useState(0);
  const [activeImg,  setActiveImg]  = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const c = containerRef.current;
      const g = galleryRef.current;
      if (!c || !g) return;
      const rect       = c.getBoundingClientRect();
      const scrollable = Math.max(1, c.offsetHeight - window.innerHeight);
      const scrolled   = Math.max(0, -rect.top);
      const p          = Math.min(1, scrolled / scrollable);
      setProgress(p);
      const maxMove = Math.max(0, g.scrollWidth - window.innerWidth);
      const tx      = p * maxMove;
      setTranslateX(tx);
      const itemW = g.scrollWidth / images.length;
      setActiveImg(Math.min(images.length - 1, Math.floor(tx / Math.max(1, itemW))));
    };
    const handler = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { window.removeEventListener('scroll', handler); window.removeEventListener('resize', update); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center" style={{ backgroundColor: '#F8F3EB' }}>

        {/* Scroll progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] z-20" style={{ background: `linear-gradient(to right, #C97B4B ${progress * 100}%, rgba(201,123,75,0.12) ${progress * 100}%)`, transition: 'background 0.1s linear' }} />

        {/* Gallery row */}
        <div
          ref={galleryRef}
          className="flex items-center"
          style={{ gap: '1.5vw', paddingLeft: '5vw', paddingRight: '5vw', transform: `translateX(-${translateX}px)`, willChange: 'transform', transition: 'none' }}
        >
          {images.map((img, i) => {
            const dist  = Math.abs(i - activeImg);
            const scale = dist === 0 ? 1 : dist === 1 ? 0.97 : 0.94;
            return (
              <div
                key={img.alt}
                className="relative flex-shrink-0 overflow-hidden rounded-2xl"
                style={{ width: '55vw', height: '72vh', transform: `scale(${scale})`, transition: 'transform 0.6s ease', transformOrigin: 'center center' }}
              >
                <img src={img.src} alt={img.alt} loading="lazy" className="w-full h-full object-cover object-top" />

                {/* Caption overlay */}
                <div
                  className="absolute inset-0 flex items-end p-8"
                  style={{ background: `linear-gradient(to top, rgba(9,28,39,${dist === 0 ? 0.55 : 0.35}) 0%, transparent 60%)` }}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`font-body text-sm font-semibold transition-all duration-500 ${dist === 0 ? 'text-white/90' : 'text-white/45'}`}>
                      {img.alt}
                    </span>
                    <span className={`font-body text-xs font-semibold tabular-nums transition-all duration-500 ${dist === 0 ? 'text-brand-gold/80' : 'text-white/25'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom HUD */}
        <div className="absolute bottom-8 left-0 right-0 px-10 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            {images.map((_, i) => (
              <div key={i} className="h-[2px] rounded-full transition-all duration-400"
                style={{ width: i === activeImg ? '24px' : '6px', background: i === activeImg ? '#C97B4B' : 'rgba(42,37,32,0.18)' }} />
            ))}
          </div>
          <span className="font-body text-xs text-brand-text-light tabular-nums">
            {String(activeImg + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function GalleryPreview() {
  return (
    <section id="galerie" className="bg-brand-warm">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Momente reale</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">Galerie</h2>
            <p className="font-body text-brand-text-mid text-sm mt-3 max-w-lg leading-relaxed">
              Imagini reale din viața de zi cu zi a copiilor, din activități, joacă, proiecte, explorare și momente de comunitate.
            </p>
          </div>
          <button className="whitespace-nowrap self-start md:self-auto inline-flex items-center gap-2 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-6 py-3 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer flex-shrink-0">
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-image-line text-sm" /></span>
            Vezi toată galeria
          </button>
        </div>
      </div>

      {/* Desktop: horizontal scroll */}
      <div className="hidden lg:block -mt-12">
        <HorizontalGallery />
      </div>

      {/* Mobile: masonry */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 pb-10">
        <MasonryGallery />
      </div>

      {/* CTA button below gallery – both desktop and mobile */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-16 lg:pb-20 flex justify-center">
        <button className="whitespace-nowrap inline-flex items-center gap-2.5 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-8 py-3.5 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer">
          <span className="w-4 h-4 flex items-center justify-center"><i className="ri-gallery-line text-sm" /></span>
          Vezi toate imaginile
        </button>
      </div>

    </section>
  );
}
