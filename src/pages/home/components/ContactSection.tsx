import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';

const FORM_URL = 'https://readdy.ai/api/form/d71arhjk1jkj467r5cjg';

interface FormValues {
  nume: string;
  email: string;
  telefon: string;
  mesaj: string;
  gdpr: boolean;
  honeypot: string;
}

const initialValues: FormValues = {
  nume: '',
  email: '',
  telefon: '',
  mesaj: '',
  gdpr: false,
  honeypot: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const contactInfo = [
  {
    icon: 'ri-phone-line',
    label: 'Telefon',
    value: '0752 318 863',
    href: 'tel:+40752318863',
  },
  {
    icon: 'ri-mail-line',
    label: 'Email',
    value: 'contact@farulcopilariei.ro',
    href: 'mailto:contact@farulcopilariei.ro',
  },
  {
    icon: 'ri-map-pin-line',
    label: 'Adresă',
    value: 'Str. Drumea Rădulescu 28',
    href: '#',
  },
  {
    icon: 'ri-navigation-line',
    label: 'Condu cu Waze',
    value: 'Deschide Waze',
    href: 'https://waze.com/ul?q=Strada+Drumea+Radulescu+28+Bucharest',
  },
];

export default function ContactSection() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.nume.trim()) newErrors.nume = 'Introduceți numele dvs.';
    if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = 'Introduceți o adresă de email validă.';
    if (!values.telefon.trim()) newErrors.telefon = 'Introduceți numărul de telefon.';
    if (!values.mesaj.trim() || values.mesaj.length < 10)
      newErrors.mesaj = 'Mesajul trebuie să aibă cel puțin 10 caractere.';
    if (values.mesaj.length > 500)
      newErrors.mesaj = 'Mesajul nu poate depăși 500 de caractere.';
    if (!values.gdpr) newErrors.gdpr = 'Trebuie să acceptați politica de confidențialitate.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (name === 'mesaj') setCharCount(value.length);
    }
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.honeypot) return;
    if (!validate()) return;
    setStatus('submitting');

    const body = new URLSearchParams();
    body.append('nume', values.nume);
    body.append('email', values.email);
    body.append('telefon', values.telefon);
    body.append('mesaj', values.mesaj);
    body.append('gdpr', values.gdpr ? 'Da' : 'Nu');

    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus('success');
        setValues(initialValues);
        setCharCount(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full font-body text-sm text-brand-charcoal bg-white border rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-brand-text-light';
  const inputNormal = `${inputBase} border-brand-sand-dark/60 focus:border-brand-amber`;
  const inputError  = `${inputBase} border-red-400 focus:border-red-500`;

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32 bg-brand-sand">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div
          className={`max-w-2xl mb-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-brand-amber" />
            <span className="font-body text-brand-amber text-xs font-bold uppercase tracking-widest">
              Contactează-ne
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-brand-charcoal leading-tight">
            Suntem aici mereu pentru tine
          </h2>
          <p className="font-body text-brand-text-mid text-base mt-5 leading-relaxed">
            Dacă vrei să afli mai multe despre grădiniță, activități, opționale, after school sau
            procesul de înscriere, te invităm să ne scrii. Îți răspundem cu grijă și claritate, astfel
            încât să poți decide informat și liniștit.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Left: Contact info – warm atmospheric */}
          <div
            className={`lg:col-span-2 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Warm info panel */}
            <div
              className="rounded-2xl overflow-hidden mb-4"
              style={{ background: 'linear-gradient(145deg, #F8F3EB 0%, #F0E9DA 100%)', border: '1px solid rgba(201,123,75,0.15)' }}
            >
              <div className="p-6 border-b border-brand-amber/10">
                <div className="flex items-center gap-2 mb-1">
                  <i className="ri-lighthouse-line text-brand-amber text-sm" />
                  <span className="font-body text-xs font-bold text-brand-amber uppercase tracking-widest">Lighthouse of Childhood</span>
                </div>
                <p className="font-body text-xs text-brand-text-light mt-1">Strada Drumea Rădulescu 28, București</p>
              </div>

              <div className="divide-y divide-brand-amber/10">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    rel={item.href.startsWith('http') ? 'nofollow noopener' : undefined}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-brand-amber/5 transition-colors cursor-pointer group"
                  >
                    <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-brand-amber/15 group-hover:bg-brand-amber/25 transition-colors flex-shrink-0">
                      <i className={`${item.icon} text-brand-amber text-sm`} />
                    </span>
                    <div>
                      <p className="font-body text-xs text-brand-text-light uppercase tracking-wide mb-0.5">{item.label}</p>
                      <p className="font-body text-sm font-semibold text-brand-charcoal group-hover:text-brand-amber transition-colors">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-52 border border-brand-sand-dark/30">
              <iframe
                title="Locație Farul Copilăriei"
                src="https://maps.google.com/maps?q=Strada+Drumea+Radulescu+28+Bucuresti+Romania&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '250ms' }}
          >
            {status === 'success' ? (
              <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center gap-4">
                <span className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-sage-light/30">
                  <i className="ri-checkbox-circle-line text-3xl text-brand-sage-dark" />
                </span>
                <h3 className="font-display text-2xl font-semibold text-brand-charcoal">
                  Mesaj trimis cu succes!
                </h3>
                <p className="font-body text-brand-text-mid text-sm max-w-sm leading-relaxed">
                  Mulțumim pentru mesaj! Echipa Lighthouse te va contacta în cel mai scurt timp.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="whitespace-nowrap mt-2 font-body text-sm font-semibold text-brand-amber border-2 border-brand-amber px-6 py-2.5 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer"
                >
                  Trimite alt mesaj
                </button>
              </div>
            ) : (
              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 lg:p-10 space-y-5"
                noValidate
              >
                {/* Honeypot – hidden */}
                <input
                  type="text"
                  name="honeypot"
                  value={values.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Nume */}
                <div>
                  <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">
                    Nume *
                  </label>
                  <input
                    type="text"
                    name="nume"
                    value={values.nume}
                    onChange={handleChange}
                    placeholder="Numele dvs."
                    className={errors.nume ? inputError : inputNormal}
                  />
                  {errors.nume && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.nume}</p>
                  )}
                </div>

                {/* Email + Telefon row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="adresa@email.ro"
                      className={errors.email ? inputError : inputNormal}
                    />
                    {errors.email && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="telefon"
                      value={values.telefon}
                      onChange={handleChange}
                      placeholder="07xx xxx xxx"
                      className={errors.telefon ? inputError : inputNormal}
                    />
                    {errors.telefon && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.telefon}</p>
                    )}
                  </div>
                </div>

                {/* Mesaj */}
                <div>
                  <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">
                    Mesaj *
                  </label>
                  <textarea
                    name="mesaj"
                    value={values.mesaj}
                    onChange={handleChange}
                    rows={5}
                    maxLength={500}
                    placeholder="Scrieți mesajul dvs. aici..."
                    className={`${errors.mesaj ? inputError : inputNormal} resize-none`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {errors.mesaj ? (
                      <p className="font-body text-xs text-red-500">{errors.mesaj}</p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`font-body text-xs ml-auto ${
                        charCount > 480 ? 'text-red-400' : 'text-brand-text-light'
                      }`}
                    >
                      {charCount}/500
                    </span>
                  </div>
                </div>

                {/* GDPR */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="gdpr"
                      checked={values.gdpr}
                      onChange={handleChange}
                      className="mt-0.5 w-4 h-4 accent-[#C97B4B] flex-shrink-0 cursor-pointer"
                    />
                    <span className="font-body text-xs text-brand-text-mid leading-relaxed">
                      Am citit și sunt de acord cu{' '}
                      <a href="#" className="text-brand-amber underline hover:no-underline" rel="nofollow">
                        Politica de confidențialitate
                      </a>{' '}
                      și cu prelucrarea datelor mele cu caracter personal în scopul procesării acestei solicitări.{' '}
                      <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.gdpr && (
                    <p className="font-body text-xs text-red-500 mt-1 ml-7">{errors.gdpr}</p>
                  )}
                </div>

                {/* reCAPTCHA placeholder */}
                <div className="flex items-center gap-3 bg-brand-sand/60 border border-brand-sand-dark/40 rounded-xl px-4 py-3">
                  <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <i className="ri-shield-check-line text-brand-sage-dark text-base" />
                  </span>
                  <span className="font-body text-xs text-brand-text-mid">
                    Trimiterea acestui formular este protejată împotriva spam-ului.
                  </span>
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-error-warning-line text-red-500 text-base" />
                    </span>
                    <span className="font-body text-xs text-red-600">
                      A apărut o eroare la trimitere. Vă rugăm încercați din nou sau contactați-ne direct.
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="whitespace-nowrap w-full inline-flex items-center justify-center gap-2 bg-brand-amber text-white font-body font-bold text-sm px-8 py-4 rounded-xl hover:bg-brand-amber-dark transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-loader-4-line text-base animate-spin" />
                      </span>
                      Se trimite...
                    </>
                  ) : (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-send-plane-line text-base" />
                      </span>
                      TRIMITE
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
