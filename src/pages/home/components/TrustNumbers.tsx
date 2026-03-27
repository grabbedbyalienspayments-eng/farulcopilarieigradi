import { useEffect, useRef, useState } from 'react';

interface Metric { value: number; display: string; label: string; sublabel: string; icon: string; }

const metrics: Metric[] = [
  { value: 358,  display: '358',   label: 'Micuțe cadouri',       sublabel: 'Oferite cu drag la fiecare aniversare și eveniment special.',        icon: 'ri-gift-line' },
  { value: 3296, display: '3.296', label: 'Îmbrățișări și joacă', sublabel: 'Momente de fericire trăite în fiecare zi alături de copiii noștri.', icon: 'ri-emotion-happy-line' },
  { value: 537,  display: '537',   label: 'Zâmbete copilărite',   sublabel: 'Zâmbete reale de la copii fericiți care se simt cu adevărat acasă.', icon: 'ri-sun-line' },
];

function useCountUp(target: number, duration = 1800, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function CountCard({ m, visible, i }: { m: Metric; visible: boolean; i: number }) {
  const count = useCountUp(m.value, 1800, visible);
  const fmt = m.value >= 1000 ? count.toLocaleString('ro-RO') : count.toString();

  return (
    <div
      className={`flex flex-col items-center text-center px-8 py-14 relative transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${i * 160}ms` }}
    >
      {/* Icon circle */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full border border-marine-light/25 mb-7">
        <i className={`${m.icon} text-2xl text-marine-light`} />
      </div>

      {/* Number */}
      <div
        className="font-display font-bold text-brand-gold leading-none tabular-nums"
        style={{ fontSize: 'clamp(4rem, 7vw, 6rem)', textShadow: '0 0 60px rgba(232,184,114,0.30)' }}
      >
        {fmt}
      </div>

      {/* Label */}
      <div className="font-display text-xl font-semibold text-white/90 mt-3">{m.label}</div>

      {/* Sublabel */}
      <p className="font-body text-sm text-marine-light/70 mt-3 max-w-[220px] leading-relaxed">{m.sublabel}</p>
    </div>
  );
}

export default function TrustNumbers() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#142E3E' }}>

      {/* Top beam accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,184,114,0.08) 0%, transparent 70%)' }}
      />

      {/* Subtle anchor watermark */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none opacity-[0.04]" style={{ fontSize: '320px', color: '#E8B872', lineHeight: 1 }}>
        <i className="ri-anchor-line" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className={`text-center mb-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-brand-gold/50" />
            <span className="font-body text-brand-gold/70 text-xs font-semibold uppercase tracking-[0.28em]">
              Dovezi din inimă
            </span>
            <div className="w-8 h-px bg-brand-gold/50" />
          </div>
          <h2
            className="font-display font-semibold text-white leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Fiecare număr spune o poveste
          </h2>
          <p className="font-body text-marine-light/65 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            Nu statistici. Sunt amintiri, bucurii și momente reale trăite alături de copiii voștri.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid md:grid-cols-3 gap-0 mt-8 divide-y md:divide-y-0 md:divide-x divide-marine-light/10">
          {metrics.map((m, i) => (
            <CountCard key={m.label} m={m} visible={visible} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
