import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const beneficiiCopii = [
  { icon: 'ri-calendar-check-line', text: 'Program structurat care stimulează rutina zilnică' },
  { icon: 'ri-pencil-line',         text: 'Sprijin la teme — nicio zi nu rămâne cu restanțe' },
  { icon: 'ri-paint-brush-line',    text: 'Activități creative, artistice și sportive incluse' },
  { icon: 'ri-group-line',          text: 'Socializare cu colegi de aceeași vârstă, în mod sănătos' },
  { icon: 'ri-restaurant-line',     text: 'Hrană caldă, sănătoasă și nutritivă' },
  { icon: 'ri-user-heart-line',     text: 'Atenție personalizată din partea educatorilor dedicați' },
];

const beneficiiParinti = [
  { icon: 'ri-shield-check-line',   text: 'Liniște că cel mic este în siguranță după ore' },
  { icon: 'ri-time-line',           text: 'Program flexibil adaptat nevoilor familiei' },
  { icon: 'ri-chat-check-line',     text: 'Comunicare transparentă și constantă cu echipa' },
  { icon: 'ri-briefcase-line',      text: 'Mai mult timp disponibil pentru activitățile profesionale' },
  { icon: 'ri-heart-pulse-line',    text: 'Echipă educativă de încredere, cu experiență reală' },
  { icon: 'ri-emotion-happy-line',  text: 'Copil liniștit, echilibrat și bucuros când ajunge acasă' },
];

const educators = [
  { icon: 'ri-award-line',          text: 'Formați profesional și în perfecționare continuă' },
  { icon: 'ri-heart-line',          text: 'Pasionați, dedicați și atenți la nevoile fiecărui copil' },
  { icon: 'ri-lightbulb-line',      text: 'Creativi în abordarea activităților — nicio zi nu seamănă cu alta' },
  { icon: 'ri-parent-line',         text: 'Parteneri reali ai părinților, cu comunicare deschisă' },
];

function useVisible(threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function BeneficiiTeam() {
  const b = useVisible();
  const edu = useVisible();
  const com = useVisible();

  return (
    <>
      {/* Beneficii */}
      <section ref={b.ref} className="py-20 lg:py-28 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className={`text-center mb-14 transition-all duration-700 ${b.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">De ce contează</span>
              <span className="block w-8 h-px bg-brand-amber" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal">Beneficii reale</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Beneficii copii */}
            <div className={`bg-white rounded-2xl p-8 transition-all duration-700 ${b.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-amber/15">
                  <i className="ri-child-line text-brand-amber text-lg" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-brand-charcoal">Beneficii pentru copii</h3>
              </div>
              <ul className="space-y-4">
                {beneficiiCopii.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-amber/12 flex-shrink-0 mt-0.5">
                      <i className={`${item.icon} text-brand-amber text-xs`} />
                    </span>
                    <span className="font-body text-sm text-brand-charcoal leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Beneficii parinti */}
            <div className={`bg-white rounded-2xl p-8 transition-all duration-700 ${b.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '250ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-sage-light/30">
                  <i className="ri-parent-line text-brand-sage-dark text-lg" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-brand-charcoal">Beneficii pentru părinți</h3>
              </div>
              <ul className="space-y-4">
                {beneficiiParinti.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-sage-light/25 flex-shrink-0 mt-0.5">
                      <i className={`${item.icon} text-brand-sage-dark text-xs`} />
                    </span>
                    <span className="font-body text-sm text-brand-charcoal leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Educatori */}
      <section ref={edu.ref} className="py-20 lg:py-28 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className={`transition-all duration-700 ${edu.visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-px bg-brand-amber" />
                <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Echipa noastră</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-6">
                Cine sunt educatorii noștri?
              </h2>
              <p className="font-body text-brand-text-mid text-base leading-relaxed mb-8">
                Educatorii Lighthouse nu sunt doar profesioniști — sunt oameni care aleg în fiecare dimineață
                să vină cu drag. Formați continuu, atenți la fiecare copil și deschiși față de părinți,
                ei sunt inima acestui loc.
              </p>
              <ul className="space-y-4">
                {educators.map((item) => (
                  <li key={item.text} className="flex items-center gap-4">
                    <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-amber/15 flex-shrink-0">
                      <i className={`${item.icon} text-brand-amber text-base`} />
                    </span>
                    <span className="font-body text-sm text-brand-charcoal leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`transition-all duration-700 delay-200 ${edu.visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-brand-sand-dark" />
                <div className="relative rounded-2xl overflow-hidden w-full h-[420px]">
                  <img
                    src="/images/educators-section-001.webp"
                    alt="Educatorii Farul Copilăriei – dedicați și profesioniști"
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comunitate */}
      <section ref={com.ref} className="py-20 lg:py-28 bg-brand-warm">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <div className={`transition-all duration-700 ${com.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-brand-amber/15 border border-brand-amber/30 mx-auto mb-8">
              <i className="ri-community-line text-2xl text-brand-amber" />
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Mai mult decât un program</span>
              <span className="block w-8 h-px bg-brand-amber" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight mb-6">
              Un loc care crește o comunitate
            </h2>
            <p className="font-body text-brand-text-mid text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Before &amp; After School la Lighthouse nu este un simplu serviciu de supraveghere.
              Este un spațiu în care copiii continuă să crească, să se simtă în siguranță și să fie
              parte dintr-un grup care îi susține.
            </p>
            <p className="font-body text-brand-text-mid text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Părinții și educatorii comunică constant, se cunosc, se respectă și construiesc împreună
              un mediu de încredere. Asta nu se regăsește în orice loc — la Lighthouse, este intenționat.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/inscrieri"
                className="whitespace-nowrap inline-flex items-center gap-2 bg-brand-amber text-white font-body font-bold text-sm px-8 py-4 rounded-full hover:bg-brand-amber-dark transition-all hover:scale-105 cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-right-circle-line text-base" />
                </span>
                Înscrie-ți copilul
              </Link>
              <a
                href="tel:+40752318863"
                className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-8 py-4 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-base" />
                </span>
                0752 318 863
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
