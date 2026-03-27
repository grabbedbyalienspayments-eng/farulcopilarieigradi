import { useEffect, useRef, useState } from 'react';

const articles = [
  {
    image: '/images/art-montessori-v3-001.webp',
    category: 'Pedagogie', title: 'Sistemul de Învățare Montessori', date: '15 Martie 2026', readTime: '4 min',
    excerpt: 'Metoda Montessori pune copilul în centrul procesului educațional, oferindu-i libertatea de a explora și de a învăța în propriul ritm, prin activități practice și materiale special concepute.',
    featured: true,
  },
  {
    image: '/images/art-develop-v3-001.webp',
    category: 'Dezvoltare', title: 'Importanța Educației Timpurii în Dezvoltarea Copilului', date: '2 Feb 2026', readTime: '5 min',
    excerpt: 'Primii ani de viață sunt esențiali pentru dezvoltarea cognitivă, emoțională și socială. Investiția în educația timpurie are un impact profund și de durată.',
    featured: false,
  },
  {
    image: '/images/art-play-v3-001.webp',
    category: 'Joacă & Educare', title: 'Metode de Învățare Prin Joacă pentru Copii de Grădiniță', date: '20 Ian 2026', readTime: '6 min',
    excerpt: 'Jocul nu este o pauză de la învățare — jocul ESTE învățarea. Descoperă cum transformăm fiecare activitate într-o experiență captivantă și educativă.',
    featured: false,
  },
];

function useReveal() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function SmallCard({ a, delay }: { a: (typeof articles)[0]; delay: number }) {
  const { ref, visible } = useReveal();
  const [hover, setHover]   = useState(false);

  return (
    <article
      ref={ref}
      className="group bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0) perspective(800px) rotateX(0deg)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-full h-48 overflow-hidden">
        <img src={a.image} alt={a.title}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          style={{ transform: hover ? 'scale(1.06)' : 'scale(1)' }} />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-body text-xs font-semibold text-brand-amber bg-brand-amber/10 px-3 py-1 rounded-full">{a.category}</span>
          <span className="font-body text-xs text-brand-text-light flex items-center gap-1"><i className="ri-time-line text-xs" /> {a.readTime}</span>
        </div>
        <h3 className="font-display text-xl font-semibold text-brand-charcoal leading-snug mb-3">{a.title}</h3>
        <p className="font-body text-sm text-brand-text-mid leading-relaxed flex-1">{a.excerpt}</p>
        <div className="mt-5 pt-4 border-t border-brand-sand-dark/40 flex items-center justify-between">
          <span className="font-body text-xs text-brand-text-light flex items-center gap-1"><i className="ri-calendar-line text-xs" /> {a.date}</span>
          <span className={`font-body text-xs font-semibold text-brand-amber flex items-center gap-1 transition-all duration-300 ${hover ? 'gap-2' : 'gap-1'}`}>
            Citește <i className="ri-arrow-right-line text-xs" />
          </span>
        </div>
      </div>
    </article>
  );
}

export default function ArticlesPreview() {
  const { ref: headerRef, visible: headerVisible } = useReveal();
  const { ref: featuredRef, visible: featuredVisible } = useReveal();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section id="articole" className="pt-24 lg:pt-32 pb-12 lg:pb-14 bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">Știri</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">Cele mai recente articole</h2>
          </div>
          <button className="whitespace-nowrap self-start md:self-auto inline-flex items-center gap-2 border-2 border-brand-amber text-brand-amber font-body font-bold text-sm px-6 py-3 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer flex-shrink-0">
            <span className="w-4 h-4 flex items-center justify-center"><i className="ri-article-line text-sm" /></span>
            Toate articolele
          </button>
        </div>

        {/* Featured article – clip-path slide reveal */}
        <div
          ref={featuredRef}
          className="group bg-white rounded-2xl overflow-hidden mb-6 cursor-pointer"
          style={{
            clipPath:  featuredVisible ? 'inset(0% 0% 0% 0% round 1rem)' : 'inset(0% 100% 0% 0% round 1rem)',
            transition: 'clip-path 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 100ms',
          }}
        >
          <div className="grid lg:grid-cols-2 items-stretch">
            <div className="w-full h-64 lg:h-auto overflow-hidden" style={{ minHeight: '280px' }}>
              <img src={featured.image} alt={featured.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-body text-xs font-semibold text-brand-amber bg-brand-amber/10 px-3 py-1 rounded-full">{featured.category}</span>
                  <span className="font-body text-xs text-brand-text-light flex items-center gap-1"><i className="ri-time-line text-xs" /> {featured.readTime}</span>
                </div>
                <h3 className="font-display text-3xl lg:text-4xl font-semibold text-brand-charcoal leading-tight mb-4">{featured.title}</h3>
                <p className="font-body text-brand-text-mid leading-relaxed">{featured.excerpt}</p>
              </div>
              <div className="mt-6 pt-5 border-t border-brand-sand-dark/40 flex items-center justify-between">
                <span className="font-body text-xs text-brand-text-light flex items-center gap-1"><i className="ri-calendar-line text-xs" /> {featured.date}</span>
                <button className="whitespace-nowrap inline-flex items-center gap-1.5 text-brand-amber font-body font-semibold text-sm group-hover:gap-3 transition-all cursor-pointer bg-transparent border-none">
                  Citește mai mult <i className="ri-arrow-right-line text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller articles */}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((a, i) => <SmallCard key={a.title} a={a} delay={300 + i * 160} />)}
        </div>

      </div>
    </section>
  );
}
