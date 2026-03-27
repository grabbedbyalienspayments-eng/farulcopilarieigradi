import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProgramItem { icon: string; text: string; }

const beforeItems: ProgramItem[] = [
  { icon: 'ri-sun-line',         text: 'Program dedicat dimineții, cu structură caldă și predictibilă' },
  { icon: 'ri-home-heart-line',  text: 'Primirea copiilor într-un mediu cald și sigur, de la prima oră' },
  { icon: 'ri-restaurant-line',  text: 'Mic dejun sănătos și gustos, preparat cu grijă' },
  { icon: 'ri-book-open-line',   text: 'Recapitularea temelor rămase nefăcute, cu sprijin blând' },
  { icon: 'ri-graduation-cap-line', text: 'Activități de pregătire pentru școală, adaptate vârstei' },
  { icon: 'ri-gamepad-line',     text: 'Joacă liberă sau ghidată pentru relaxare și energie pozitivă' },
  { icon: 'ri-bus-line',         text: 'Transport organizat către școală, realizat în deplină siguranță' },
];

const afterItems: ProgramItem[] = [
  { icon: 'ri-time-line',        text: 'Program de după-amiază structurat și relaxant' },
  { icon: 'ri-restaurant-2-line', text: 'Prânz cald și sănătos, gătit cu ingrediente de calitate' },
  { icon: 'ri-pencil-ruler-2-line', text: 'Timp dedicat temelor, cu asistență din partea educatorilor' },
  { icon: 'ri-palette-line',     text: 'Activități recreative și artistice stimulative' },
  { icon: 'ri-team-line',        text: 'Jocuri de echipă și activități în aer liber' },
  { icon: 'ri-user-heart-line',  text: 'Atenție personalizată pentru fiecare copil în parte' },
];

function ProgramBlock({
  title, subtitle, items, imgSrc, imgAlt, reverse, accentColor,
}: {
  title: string; subtitle: string; items: ProgramItem[];
  imgSrc: string; imgAlt: string; reverse?: boolean; accentColor: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
      {/* Image */}
      <div className={`${reverse ? 'order-2 lg:order-1' : ''} transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : `opacity-0 ${reverse ? '-translate-x-8' : 'translate-x-8'}`}`}>
        <div className="relative">
          <div className={`absolute -top-4 ${reverse ? '-left-4' : '-right-4'} w-full h-full rounded-2xl ${accentColor}`} />
          <div className="relative rounded-2xl overflow-hidden w-full h-[420px]">
            <img
              src={imgSrc}
              alt={imgAlt}
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${reverse ? 'order-1 lg:order-2' : ''} transition-all duration-700 delay-150 ${visible ? 'opacity-100 translate-x-0' : `opacity-0 ${reverse ? 'translate-x-8' : '-translate-x-8'}`}`}>
        <span className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest mb-3 block">{subtitle}</span>
        <h2 className="font-display text-3xl lg:text-4xl font-semibold text-brand-charcoal leading-tight mb-7">{title}</h2>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-amber/15 flex-shrink-0 mt-0.5">
                <i className={`${item.icon} text-brand-amber text-sm`} />
              </span>
              <span className="font-body text-sm text-brand-charcoal leading-relaxed pt-1">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProgramBlocks() {
  return (
    <section className="py-20 lg:py-28 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-24">
        <ProgramBlock
          title="Ce este Before School?"
          subtitle="Dimineața la Lighthouse"
          items={beforeItems}
          imgSrc="/images/beforeschool-morning-001.webp"
          imgAlt="Program Before School – Farul Copilăriei dimineața"
          accentColor="bg-brand-sage-light/30"
        />
        <ProgramBlock
          title="Ce este After School?"
          subtitle="După-amiaza la Lighthouse"
          items={afterItems}
          imgSrc="/images/afterschool-afternoon-001.webp"
          imgAlt="Program After School – Farul Copilăriei după-amiaza"
          reverse
          accentColor="bg-brand-amber/15"
        />
      </div>
    </section>
  );
}
