import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DespreNoi() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="despre-noi" ref={ref} className="bg-brand-cream overflow-hidden">

      {/* ── Opening statement – full-width editorial quote ── */}
      <div
        className={`pt-20 pb-10 lg:pt-28 lg:pb-14 transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDuration: '900ms' }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-8 h-px bg-brand-amber" />
            <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Cine suntem?</span>
            <div className="w-8 h-px bg-brand-amber" />
          </div>

          {/* Large italic quote */}
          <blockquote
            className="font-display italic font-light text-brand-charcoal/80 leading-[1.15]"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)' }}
          >
            &ldquo;Din dragoste pentru copii, noi, părinții și profesorii în același timp, am căutat
            locul potrivit în care să iluminăm{' '}
            <em className="not-italic font-medium text-brand-amber">asemenea unui far</em>{' '}
            și să punem în practică gândurile, sentimentele și ideile noastre educaționale.&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-6 h-px bg-brand-amber/50" />
            <i className="ri-anchor-line text-brand-amber/40 text-xs" />
            <div className="w-6 h-px bg-brand-amber/50" />
          </div>
        </div>
      </div>

      {/* ── Split layout: text + organic image ── */}
      <div className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Text side */}
            <div
              className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Decorative left beam line */}
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-amber/40 to-transparent hidden lg:block" />

              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-7">
                Despre noi
              </h2>

              <div className="space-y-5 font-body text-brand-text-mid leading-relaxed text-base">
                <p>
                  În acest loc copiii se află în centrul actului educațional, încurajați să fie fericiți,
                  încrezători, să exploreze într-un mediu armonios, securizat și stimulativ, asigurându-le
                  o stare de bine în cea mai importantă etapă de dezvoltare.
                </p>
                <p>
                  Noi credem cu tărie în echipa noastră care vine cu drag, să creeze structuri inovative și
                  programe eficiente cu scopul formării adulților de mâine, capabili să facă față
                  schimbărilor prezente și de perspectivă.
                </p>
              </div>

              {/* Values */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['Ghidare cu blândețe', 'Explorare liberă', 'Echipă dedicată', 'Siguranță'].map((v) => (
                  <span
                    key={v}
                    className="font-body text-xs font-semibold text-marine-mid bg-marine-pale/15 border border-marine-pale/30 px-4 py-1.5 rounded-full"
                  >
                    {v}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  to="/inscrieri"
                  className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-7 py-3 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-sm" />
                  </span>
                  Vezi mai mult
                </Link>
              </div>
            </div>

            {/* Image side – organic blob */}
            <div
              className={`relative transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
              style={{ transitionDelay: '350ms' }}
            >
              {/* Decorative background shape */}
              <div
                className="absolute -top-6 -right-6 w-4/5 h-4/5 bg-brand-sand-dark"
                style={{ borderRadius: '38% 62% 45% 55% / 55% 42% 58% 45%' }}
              />

              {/* Organic image */}
              <div
                className="relative w-full h-[520px] overflow-hidden"
                style={{ borderRadius: '62% 38% 55% 45% / 42% 58% 44% 56%' }}
              >
                <img
                  src="/images/0a013ab4c4d4.webp"
                  alt="Sala de clasă Farul Copilăriei – mediu educational cald"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating lighthouse badge – border instead of shadow */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-5 py-4 border border-brand-sand-dark/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl" style={{ background: 'linear-gradient(135deg, #E8B872, #C97B4B)' }}>
                    <i className="ri-lighthouse-line text-white text-lg" />
                  </div>
                  <div>
                    <p className="font-display text-base font-semibold text-brand-charcoal leading-none">Lighthouse</p>
                    <p className="font-body text-xs text-brand-text-light mt-0.5">Farul Copilăriei</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
