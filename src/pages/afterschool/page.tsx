import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import ProgramBlocks from './components/ProgramBlocks';
import BeneficiiTeam from './components/BeneficiiTeam';

export default function AfterSchool() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Header />
      <main>

        {/* Hero */}
        <div className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/afterschool-page-hero-001.webp"
              alt="After School – Farul Copilăriei"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-brand-charcoal/60 to-brand-charcoal/30" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">
                Program Before &amp; After School
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-2xl">
              After school
            </h1>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-brand-sand">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-20 text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-brand-charcoal leading-tight mb-6">
              O soluție modernă pentru părinții ocupați și copiii în creștere
            </h2>
            <p className="font-body text-brand-text-mid text-base leading-relaxed">
              Lighthouse of Childhood nu este doar un centru educațional dedicat copiilor preșcolari,
              ci și un sprijin real pentru familiile care au nevoie de soluții flexibile și sigure în
              afara programului școlar. Prin serviciile de Before &amp; After School, oferim un spațiu
              cald și structurat pentru copiii care merg deja la școală, oferindu-le atât sprijin
              educațional, cât și oportunități reale de relaxare, socializare și dezvoltare personală.
            </p>

            {/* Quick stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-10 border-t border-brand-sand-dark/40">
              {[
                { icon: 'ri-time-line',         value: '7:00 – 19:00', label: 'Program zilnic' },
                { icon: 'ri-shield-check-line',  value: '100%',         label: 'Supraveghere atentă' },
                { icon: 'ri-heart-line',         value: 'Zilnic',       label: 'Activități ghidate' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-amber/15">
                    <i className={`${s.icon} text-brand-amber text-base`} />
                  </span>
                  <span className="font-display text-2xl font-bold text-brand-charcoal">{s.value}</span>
                  <span className="font-body text-xs text-brand-text-mid">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Program blocks */}
        <ProgramBlocks />

        {/* Beneficii + Team + Comunitate */}
        <BeneficiiTeam />

      </main>
      <Footer />
    </div>
  );
}
