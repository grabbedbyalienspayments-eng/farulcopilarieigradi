import HeroNew from './components/HeroNew';
import Header from './components/Header';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import DespreNoi from './components/DespreNoi';
import TrustNumbers from './components/TrustNumbers';
import WhyUs from './components/WhyUs';
import Optionale from './components/Optionale';
import BeforeAfterSchool from './components/BeforeAfterSchool';
import GalleryPreview from './components/GalleryPreview';
import ArticlesPreview from './components/ArticlesPreview';
import ContactSection from './components/ContactSection';
import MicroCTA from './components/MicroCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <HeroNew />
      <Header />
      <main>
        <Hero />
        {/*
          ─── SECTION BLEND BRIDGE ────────────────────────────────────────
          z-index 100 → pictează DEASUPRA ambelor secțiuni (Hero nu are
          stacking context propriu, BrandStory sticky = stacking context
          dar fără z-index explicit, deci bridge-ul câștigă).
          Negative margins = se suprapune 48px în Hero + 48px în BrandStory.
          backdropFilter blur-ează ce se află fizic în spate (trust bar jos
          + imaginea BrandStory sus), creând efectul de feathered transition.
          ────────────────────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            height: '96px',
            marginTop: '-48px',
            marginBottom: '-48px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              background: 'rgba(9,28,39,0.08)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.95) 28%, rgba(0,0,0,0.95) 72%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.95) 28%, rgba(0,0,0,0.95) 72%, transparent 100%)',
            }}
          />
        </div>
        <BrandStory />
        <DespreNoi />
        <TrustNumbers />
        <WhyUs />
        <Optionale />
        <BeforeAfterSchool />
        <GalleryPreview />
        <ArticlesPreview />
        <ContactSection />
        <MicroCTA />
      </main>
      <Footer />
    </div>
  );
}
