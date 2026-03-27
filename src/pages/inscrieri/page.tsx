import Header from '../home/components/Header';
import Footer from '../home/components/Footer';
import InscrieriForm from './components/InscrieriForm';

const sidebar = [
  { icon: 'ri-phone-line',       label: 'Telefon',  value: '0752 318 863',                   href: 'tel:+40752318863' },
  { icon: 'ri-mail-line',        label: 'Email',    value: 'contact@farulcopilariei.ro',      href: 'mailto:contact@farulcopilariei.ro' },
  { icon: 'ri-map-pin-line',     label: 'Adresă',   value: 'Str. Drumea Rădulescu 28, Buc.', href: '#' },
];

const steps = [
  { num: '01', title: 'Completezi formularul', desc: 'Trimiți cererea de mai jos cu datele copilului și ale familiei.' },
  { num: '02', title: 'Te contactăm noi',       desc: 'Echipa te contactează în maxim 24–48 ore cu informații despre disponibilitate.' },
  { num: '03', title: 'Vizită la grădiniță',    desc: 'Veniți să cunoașteți spațiul, echipa și atmosfera de la Lighthouse.' },
  { num: '04', title: 'Înscrierea oficială',     desc: 'Finalizăm împreună documentele și pașii de înscriere.' },
];

export default function Inscrieri() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <Header />
      <main>

        {/* Hero */}
        <div className="relative pt-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/inscrieri-hero-bg-001.webp"
              alt="Înscrieri Farul Copilăriei"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 via-brand-charcoal/60 to-brand-charcoal/35" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-brand-amber" />
              <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">
                Locuri limitate disponibile
              </span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-white leading-tight max-w-xl">
              Înscrieri
            </h1>
            <p className="font-body text-white/80 text-base mt-4 leading-relaxed max-w-xl">
              Completează formularul de mai jos dacă dorești să intri în contact cu noi pentru înscrierea
              copilului. Vom reveni către tine cu detalii despre disponibilitate, program și pașii următori.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-brand-sand">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <p className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest mb-8 text-center">
              Cum funcționează procesul
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((s) => (
                <div key={s.num} className="flex flex-col gap-3">
                  <span className="font-display text-4xl font-bold text-brand-amber/30">{s.num}</span>
                  <h3 className="font-display text-lg font-semibold text-brand-charcoal">{s.title}</h3>
                  <p className="font-body text-sm text-brand-text-mid leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form + Sidebar */}
        <div className="py-16 lg:py-24 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">

              {/* Sidebar */}
              <div className="order-2 lg:order-1 space-y-5 lg:sticky lg:top-28">
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="font-display text-xl font-semibold text-brand-charcoal mb-4">Date de contact</h3>
                  <div className="space-y-4">
                    {sidebar.map((item) => (
                      <a key={item.label} href={item.href}
                        className="flex items-center gap-3 group cursor-pointer">
                        <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-amber/15 flex-shrink-0">
                          <i className={`${item.icon} text-brand-amber text-sm`} />
                        </span>
                        <div>
                          <p className="font-body text-xs text-brand-text-light mb-0.5">{item.label}</p>
                          <p className="font-body text-sm font-semibold text-brand-charcoal group-hover:text-brand-amber transition-colors">{item.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-amber/10 border border-brand-amber/25 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-amber/20 flex-shrink-0">
                      <i className="ri-information-line text-brand-amber text-sm" />
                    </span>
                    <div>
                      <h4 className="font-body text-sm font-bold text-brand-charcoal mb-1">Preferați o vizită directă?</h4>
                      <p className="font-body text-xs text-brand-text-mid leading-relaxed mb-3">
                        Ne puteți contacta direct și stabiliți o vizită pentru a cunoaște echipa și spațiul.
                      </p>
                      <a href="tel:+40752318863"
                        className="whitespace-nowrap inline-flex items-center gap-1.5 font-body text-xs font-bold text-brand-amber cursor-pointer hover:underline">
                        <i className="ri-phone-line text-xs" /> 0752 318 863
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden h-44">
                  <iframe
                    title="Locație Farul Copilăriei"
                    src="https://maps.google.com/maps?q=Strada+Drumea+Radulescu+28+Bucuresti+Romania&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%" height="100%"
                    style={{ border: 0 }} loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Form */}
              <div className="order-1 lg:order-2 lg:col-span-2">
                <InscrieriForm />
              </div>

            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
