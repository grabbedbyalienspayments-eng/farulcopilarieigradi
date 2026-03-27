import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroNew.css';

gsap.registerPlugin(ScrollTrigger);

const PORTAL_IMAGE_DESKTOP =
  '/images/6fdffa8d93f2.webp';

const PORTAL_IMAGE_MOBILE =
  '/images/308e732d1a09.webp';

export default function HeroNew() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      });

      /* ── Portal zoom: animăm ambele imagini mereu.
         CSS decide care e vizibilă (desktop/mobile).
         Fiecare are transformOrigin propriu. ── */
      tl.to(
        '.lh-portal-img--desktop',
        {
          scale: 3,
          z: 350,
          transformOrigin: 'center center',
          ease: 'power2.inOut',
          duration: 6,
        },
        0,
      );

      tl.to(
        '.lh-portal-img--mobile',
        {
          scale: 2.4,
          z: 200,
          transformOrigin: 'center 32%',
          ease: 'power2.inOut',
          duration: 6,
        },
        0,
      );

      tl.to(
        '.lh-bg-img',
        {
          filter: 'blur(0px) brightness(1.15) saturate(1.05)',
          scale: 1,
          ease: 'power1.inOut',
          duration: 5.5,
        },
        0,
      );

      tl.to(
        '.lh-headline',
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'power3.out',
          duration: 1.8,
        },
        2.0,
      );

      tl.to(
        '.lh-subheadline',
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'power3.out',
          duration: 1.6,
        },
        3.75,
      );

      tl.to({}, { duration: 1.0 }, 6.6);
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div className="lh-hero-container" ref={containerRef}>
      <section className="lh-hero">
        <div className="lh-bg-img" />
        <div className="lh-portal-wrap">
          <img
            className="lh-portal-img lh-portal-img--desktop"
            src={PORTAL_IMAGE_DESKTOP}
            alt="Intrare Lighthouse"
            draggable={false}
          />
          <img
            className="lh-portal-img lh-portal-img--mobile"
            src={PORTAL_IMAGE_MOBILE}
            alt="Intrare Lighthouse"
            draggable={false}
          />
        </div>
        <div className="lh-text-layer">
          <h1 className="lh-headline">
            Luminăm primii pași
            <br />
            ai copilului tău
          </h1>
          <p className="lh-subheadline">
            Un loc sigur, cald și atent construit
            <br />
            pentru începuturile care contează
          </p>
        </div>
      </section>
    </div>
  );
}
