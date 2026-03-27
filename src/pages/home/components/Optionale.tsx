import { useEffect, useRef, useState } from 'react';

interface Activity { emoji: string; icon: string; title: string; text: string; accent: string; bg: string; rotate: string; }

const activities: Activity[] = [
  { emoji: '🎨', icon: 'ri-paint-brush-line',    title: 'Pictură',             text: 'Talentul se descoperă devreme, atunci când copilul este încurajat să se exprime liber prin culori.',   accent: 'text-brand-amber',      bg: 'bg-amber-50',           rotate: '-rotate-1' },
  { emoji: '🎹', icon: 'ri-music-2-line',        title: 'Pian',                text: 'Lecțiile de pian dezvoltă memoria, concentrarea, finețea motrică și sensibilitatea artistică.',        accent: 'text-brand-sage-dark',  bg: 'bg-emerald-50',         rotate: 'rotate-1' },
  { emoji: '💃', icon: 'ri-run-line',            title: 'Dans',                text: 'Dansul este un mijloc de dezvoltare fizică, emoțională și artistică pentru fiecare copil.',           accent: 'text-[#C4623A]',         bg: 'bg-orange-50',          rotate: '-rotate-1' },
  { emoji: '🌍', icon: 'ri-compass-discover-line', title: 'Cultură generală',  text: 'Lumea întreagă devine o poveste fascinantă pe înțelesul copiilor curioși.',                            accent: 'text-brand-amber-dark', bg: 'bg-yellow-50',          rotate: 'rotate-2' },
  { emoji: '🪙', icon: 'ri-coin-line',           title: 'Educație financiară', text: 'Educația financiară începe din copilărie, prin jocuri simple și activități practice.',                 accent: 'text-brand-sage-dark',  bg: 'bg-lime-50',            rotate: '-rotate-1' },
  { emoji: '♟️', icon: 'ri-focus-3-line',        title: 'Șah',                 text: 'Jocul de șah este un teren fertil pentru inteligență, răbdare și gândire strategică.',               accent: 'text-brand-amber',      bg: 'bg-stone-100',          rotate: 'rotate-1' },
  { emoji: '🗣️', icon: 'ri-mic-line',            title: 'Logopedie',           text: 'Uneori, un mic obstacol în vorbire poate deveni un zid dacă nu este corectat la timp.',               accent: 'text-[#C4623A]',         bg: 'bg-rose-50',            rotate: '-rotate-2' },
  { emoji: '🥋', icon: 'ri-shield-star-line',    title: 'Karate',              text: 'Karateul învățat de la vârste mici formează caracterul, disciplina și curajul.',                        accent: 'text-brand-amber-dark', bg: 'bg-orange-50',          rotate: 'rotate-1' },
];

const languages: Activity[] = [
  { emoji: '🇪🇸', icon: 'ri-global-line',     title: 'Limba Spaniolă', text: 'Spaniola este o limbă vie, accesibilă și extrem de vorbită la nivel mondial.',              accent: 'text-marine-mid', bg: 'bg-sky-50', rotate: 'rotate-0' },
  { emoji: '🇩🇪', icon: 'ri-translate-2',     title: 'Limba Germană',  text: 'O limbă exactă, logică și riguroasă, care dezvoltă vocabularul și structura gândirii.',      accent: 'text-marine-mid', bg: 'bg-sky-50', rotate: 'rotate-0' },
  { emoji: '🇫🇷', icon: 'ri-earth-line',      title: 'Limba Franceză', text: 'Franceza este limba artei, diplomației și eleganței culturale.',                             accent: 'text-marine-mid', bg: 'bg-sky-50', rotate: 'rotate-0' },
  { emoji: '🇬🇧', icon: 'ri-book-mark-line',  title: 'Limba Engleză',  text: 'Limba engleză este una dintre cele mai importante abilități ale viitorului.',               accent: 'text-marine-mid', bg: 'bg-sky-50', rotate: 'rotate-0' },
];

export default function Optionale() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const regular  = activities;

  return (
    <section id="optionale" ref={ref} className="py-24 lg:py-32 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className={`max-w-3xl mx-auto text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand-amber" />
            <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Activități</span>
            <div className="w-8 h-px bg-brand-amber" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">Opționale</h2>
          <p className="font-body text-brand-text-mid text-base mt-5 leading-relaxed">
            Pe lângă activitățile zilnice, Lighthouse of Childhood completează experiența educațională prin opționale
            care susțin creativitatea, motricitatea, limbajul, încrederea și dezvoltarea armonioasă a copilului.
          </p>
        </div>

        {/* Featured first (Pictură) + rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">

          {/* Featured: Pictură – spans 2 cols */}
          {regular.slice(0, 1).map((item) => (
            <div
              key={item.title}
              className={`sm:col-span-2 group bg-white rounded-2xl p-8 flex gap-6 items-start hover:ring-1 hover:ring-brand-amber/25 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '80ms' }}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.rotate}`} style={{ fontSize: '2.4rem' }}>
                <span role="img" aria-label={item.title}>{item.emoji}</span>
              </div>
              <div>
                <h3 className={`font-display text-2xl font-semibold leading-tight mb-2 ${item.accent}`}>{item.title}</h3>
                <p className="font-body text-sm text-brand-text-mid leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}

          {/* Rest of regular activities */}
          {regular.slice(1).map((item, i) => (
            <div
              key={item.title}
              className={`group bg-white rounded-2xl p-6 flex flex-col gap-4 hover:ring-1 hover:ring-brand-amber/25 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${120 + i * 70}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.rotate}`} style={{ fontSize: '1.8rem' }}>
                <span role="img" aria-label={item.title}>{item.emoji}</span>
              </div>
              <div>
                <h3 className={`font-display text-xl font-semibold leading-tight mb-1.5 ${item.accent}`}>{item.title}</h3>
                <p className="font-body text-sm text-brand-text-mid leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Language cards – marine-tinted strip */}
        <div className={`rounded-2xl overflow-hidden border border-marine-pale/20 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '560ms', background: 'rgba(200, 229, 236, 0.08)' }}>
          <div className="px-6 pt-5 pb-1 border-b border-marine-pale/15">
            <div className="flex items-center gap-2">
              <span role="img" aria-label="globe" className="text-base">🌐</span>
              <span className="font-body text-xs font-bold text-marine-mid uppercase tracking-widest">Limbi Străine</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-marine-pale/15">
            {languages.map((item, i) => (
              <div
                key={item.title}
                className={`p-6 flex flex-col gap-3 hover:bg-marine-pale/10 transition-colors duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${620 + i * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/60" style={{ fontSize: '1.6rem' }}>
                  <span role="img" aria-label={item.title}>{item.emoji}</span>
                </div>
                <h3 className={`font-display text-lg font-semibold leading-tight ${item.accent}`}>{item.title}</h3>
                <p className="font-body text-xs text-brand-text-mid leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '800ms' }}>
          <button className="whitespace-nowrap inline-flex items-center gap-2 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-7 py-3 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer">
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-apps-2-line text-sm" /></span>
            Vezi toate opționalele
          </button>
        </div>

      </div>
    </section>
  );
}
