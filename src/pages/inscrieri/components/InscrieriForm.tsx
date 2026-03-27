import { useState, ChangeEvent, FormEvent } from 'react';

const FORM_URL = 'https://readdy.ai/api/form/d71atb0hb0rqicn68e40';

interface FormValues {
  prenume_copil: string;
  nume_copil: string;
  gen: string;
  data_nasterii: string;
  zile_saptamana: string;
  data_start: string;
  frate_sora: string;
  prenume_parinte: string;
  nume_parinte: string;
  adresa_parinte: string;
  email: string;
  telefon: string;
  sursa: string;
  mesaj: string;
  consimtamant: boolean;
  gdpr: boolean;
  honeypot: string;
}

const init: FormValues = {
  prenume_copil: '', nume_copil: '', gen: '', data_nasterii: '',
  zile_saptamana: '', data_start: '', frate_sora: '',
  prenume_parinte: '', nume_parinte: '', adresa_parinte: '',
  email: '', telefon: '', sursa: '', mesaj: '',
  consimtamant: false, gdpr: false, honeypot: '',
};

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errs = Partial<Record<keyof FormValues, string>>;

const inputCls = 'w-full font-body text-sm text-brand-charcoal bg-white border rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-brand-text-light';
const inp  = (err?: string) => `${inputCls} ${err ? 'border-red-400 focus:border-red-500' : 'border-brand-sand-dark/60 focus:border-brand-amber'}`;

const GenOptions = ['Băiat', 'Fată', 'Prefer să nu specific'];
const ZileOptions = ['1 zi', '2 zile', '3 zile', '4 zile', '5 zile'];
const FrateSoraOptions = ['Da', 'Nu'];
const DataStartOptions = ['Imediat', 'Septembrie 2026', 'Octombrie 2026', 'Noiembrie 2026', 'Ianuarie 2027', 'Altă dată'];
const SursaOptions = ['Google', 'Rețele sociale (Facebook/Instagram)', 'Recomandare de la un prieten', 'Recomandare de la o familie', 'Publicitate', 'Alta'];

export default function InscrieriForm() {
  const [vals, setVals]   = useState<FormValues>(init);
  const [errs, setErrs]   = useState<Errs>({});
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);

  const set = (name: keyof FormValues, value: string | boolean) =>
    setVals((p) => ({ ...p, [name]: value }));
  const clearErr = (name: keyof FormValues) =>
    setErrs((p) => ({ ...p, [name]: undefined }));

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    set(name as keyof FormValues, type === 'checkbox' ? (checked ?? false) : value);
    if (name === 'mesaj') setCharCount(value.length);
    clearErr(name as keyof FormValues);
  };

  const validate = (): boolean => {
    const e: Errs = {};
    if (!vals.prenume_copil.trim()) e.prenume_copil = 'Câmp obligatoriu.';
    if (!vals.nume_copil.trim())    e.nume_copil    = 'Câmp obligatoriu.';
    if (!vals.gen)                  e.gen           = 'Selectați genul copilului.';
    if (!vals.data_nasterii)        e.data_nasterii = 'Câmp obligatoriu.';
    if (!vals.zile_saptamana)       e.zile_saptamana = 'Selectați numărul de zile.';
    if (!vals.data_start)           e.data_start    = 'Selectați o opțiune.';
    if (!vals.frate_sora)           e.frate_sora    = 'Selectați o opțiune.';
    if (!vals.prenume_parinte.trim()) e.prenume_parinte = 'Câmp obligatoriu.';
    if (!vals.nume_parinte.trim())  e.nume_parinte  = 'Câmp obligatoriu.';
    if (!vals.adresa_parinte.trim()) e.adresa_parinte = 'Câmp obligatoriu.';
    if (!vals.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email))
      e.email = 'Email invalid.';
    if (!vals.telefon.trim())       e.telefon       = 'Câmp obligatoriu.';
    if (!vals.sursa)                e.sursa         = 'Selectați o opțiune.';
    if (vals.mesaj.length > 500)    e.mesaj         = 'Maxim 500 de caractere.';
    if (!vals.consimtamant)         e.consimtamant  = 'Consimțământul este obligatoriu.';
    if (!vals.gdpr)                 e.gdpr          = 'Acceptul politicii de confidențialitate este obligatoriu.';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (vals.honeypot) return;
    if (!validate()) return;
    setStatus('submitting');
    const body = new URLSearchParams();
    const keys: (keyof FormValues)[] = [
      'prenume_copil','nume_copil','gen','data_nasterii','zile_saptamana',
      'data_start','frate_sora','prenume_parinte','nume_parinte',
      'adresa_parinte','email','telefon','sursa','mesaj',
    ];
    keys.forEach((k) => body.append(k, vals[k] as string));
    body.append('consimtamant', vals.consimtamant ? 'Da' : 'Nu');
    body.append('gdpr', vals.gdpr ? 'Da' : 'Nu');
    try {
      const res = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) { setVals(init); setCharCount(0); }
    } catch { setStatus('error'); }
  };

  const PillGroup = ({ name, options, err }: { name: keyof FormValues; options: string[]; err?: string }) => (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = vals[name] === opt;
          return (
            <button
              key={opt} type="button"
              onClick={() => { set(name, opt); clearErr(name); }}
              className={`whitespace-nowrap font-body text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                active
                  ? 'bg-brand-amber border-brand-amber text-white'
                  : 'bg-white border-brand-sand-dark/60 text-brand-charcoal hover:border-brand-amber'
              }`}
            >{opt}</button>
          );
        })}
      </div>
      {err && <p className="font-body text-xs text-red-500 mt-1">{err}</p>}
    </div>
  );

  const SectionTitle = ({ num, title }: { num: string; title: string }) => (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-brand-sand-dark/40">
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-brand-amber text-white font-body text-xs font-bold flex-shrink-0">{num}</span>
      <h3 className="font-display text-xl font-semibold text-brand-charcoal">{title}</h3>
    </div>
  );

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-12 text-center flex flex-col items-center gap-5">
        <span className="w-20 h-20 flex items-center justify-center rounded-full bg-brand-sage-light/30">
          <i className="ri-checkbox-circle-line text-4xl text-brand-sage-dark" />
        </span>
        <h3 className="font-display text-3xl font-semibold text-brand-charcoal">Cererea a fost trimisă!</h3>
        <p className="font-body text-brand-text-mid text-sm max-w-md leading-relaxed">
          Mulțumim pentru interes! Echipa Lighthouse of Childhood va analiza cererea și te va contacta
          în cel mai scurt timp cu informații despre disponibilitate și pașii următori.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="whitespace-nowrap mt-2 font-body text-sm font-semibold text-brand-amber border-2 border-brand-amber px-7 py-3 rounded-full hover:bg-brand-amber hover:text-white transition-all cursor-pointer"
        >
          Trimite o altă cerere
        </button>
      </div>
    );
  }

  return (
    <form data-readdy-form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Honeypot */}
      <input type="text" name="honeypot" value={vals.honeypot} onChange={handleChange}
        tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {/* Section 1 – Informații copil */}
      <div className="bg-white rounded-2xl p-7 lg:p-9">
        <SectionTitle num="1" title="Informații despre copil" />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Prenumele copilului *</label>
              <input type="text" name="prenume_copil" value={vals.prenume_copil} onChange={handleChange}
                placeholder="Prenume" className={inp(errs.prenume_copil)} />
              {errs.prenume_copil && <p className="font-body text-xs text-red-500 mt-1">{errs.prenume_copil}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Numele de familie al copilului *</label>
              <input type="text" name="nume_copil" value={vals.nume_copil} onChange={handleChange}
                placeholder="Nume de familie" className={inp(errs.nume_copil)} />
              {errs.nume_copil && <p className="font-body text-xs text-red-500 mt-1">{errs.nume_copil}</p>}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-2">Gen *</label>
            <PillGroup name="gen" options={GenOptions} err={errs.gen} />
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Data nașterii *</label>
            <input type="date" name="data_nasterii" value={vals.data_nasterii} onChange={handleChange}
              className={inp(errs.data_nasterii)} />
            {errs.data_nasterii && <p className="font-body text-xs text-red-500 mt-1">{errs.data_nasterii}</p>}
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-2">
              Câte zile pe săptămână ați dori să frecventeze copilul? *
            </label>
            <PillGroup name="zile_saptamana" options={ZileOptions} err={errs.zile_saptamana} />
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">
              Când ați dori ca copilul să înceapă? *
            </label>
            <select name="data_start" value={vals.data_start} onChange={handleChange}
              className={inp(errs.data_start)}>
              <option value="">Selectați o opțiune</option>
              {DataStartOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errs.data_start && <p className="font-body text-xs text-red-500 mt-1">{errs.data_start}</p>}
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-2">
              Copilul are un frate/o soră care frecventează sau a frecventat centrul nostru? *
            </label>
            <PillGroup name="frate_sora" options={FrateSoraOptions} err={errs.frate_sora} />
          </div>
        </div>
      </div>

      {/* Section 2 – Informații părinte */}
      <div className="bg-white rounded-2xl p-7 lg:p-9">
        <SectionTitle num="2" title="Informații despre părinte" />
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Prenume părinte *</label>
              <input type="text" name="prenume_parinte" value={vals.prenume_parinte} onChange={handleChange}
                placeholder="Prenume" className={inp(errs.prenume_parinte)} />
              {errs.prenume_parinte && <p className="font-body text-xs text-red-500 mt-1">{errs.prenume_parinte}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Nume de familie al părintelui *</label>
              <input type="text" name="nume_parinte" value={vals.nume_parinte} onChange={handleChange}
                placeholder="Nume de familie" className={inp(errs.nume_parinte)} />
              {errs.nume_parinte && <p className="font-body text-xs text-red-500 mt-1">{errs.nume_parinte}</p>}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Adresa părintelui *</label>
            <input type="text" name="adresa_parinte" value={vals.adresa_parinte} onChange={handleChange}
              placeholder="Strada, nr., sector/oraș" className={inp(errs.adresa_parinte)} />
            {errs.adresa_parinte && <p className="font-body text-xs text-red-500 mt-1">{errs.adresa_parinte}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Adresă de email *</label>
              <input type="email" name="email" value={vals.email} onChange={handleChange}
                placeholder="adresa@email.ro" className={inp(errs.email)} />
              {errs.email && <p className="font-body text-xs text-red-500 mt-1">{errs.email}</p>}
            </div>
            <div>
              <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Număr de telefon *</label>
              <input type="tel" name="telefon" value={vals.telefon} onChange={handleChange}
                placeholder="07xx xxx xxx" className={inp(errs.telefon)} />
              {errs.telefon && <p className="font-body text-xs text-red-500 mt-1">{errs.telefon}</p>}
            </div>
          </div>

          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Cum ați auzit despre noi? *</label>
            <select name="sursa" value={vals.sursa} onChange={handleChange}
              className={inp(errs.sursa)}>
              <option value="">Selectați o opțiune</option>
              {SursaOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {errs.sursa && <p className="font-body text-xs text-red-500 mt-1">{errs.sursa}</p>}
          </div>
        </div>
      </div>

      {/* Section 3 – Mesaj și consimțământ */}
      <div className="bg-white rounded-2xl p-7 lg:p-9">
        <SectionTitle num="3" title="Mesaj și consimțământ" />
        <div className="space-y-5">
          <div>
            <label className="block font-body text-xs font-semibold text-brand-charcoal uppercase tracking-wide mb-1.5">Mesaj (opțional)</label>
            <textarea name="mesaj" value={vals.mesaj} onChange={handleChange} rows={4} maxLength={500}
              placeholder="Adăugați orice informație relevantă despre copilul dvs. sau întrebări pentru echipă..."
              className={`${inp(errs.mesaj)} resize-none`} />
            <div className="flex justify-between mt-1">
              {errs.mesaj ? <p className="font-body text-xs text-red-500">{errs.mesaj}</p> : <span />}
              <span className={`font-body text-xs ml-auto ${charCount > 480 ? 'text-red-400' : 'text-brand-text-light'}`}>{charCount}/500</span>
            </div>
          </div>

          {/* Consimțământ */}
          <div className="bg-brand-sand/60 rounded-xl p-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consimtamant" checked={vals.consimtamant} onChange={handleChange}
                className="mt-0.5 w-4 h-4 accent-[#C97B4B] flex-shrink-0 cursor-pointer" />
              <span className="font-body text-sm text-brand-charcoal leading-relaxed">
                Sunt de acord ca datele mele și ale copilului să fie stocate și procesate de{' '}
                <strong className="font-semibold">Lighthouse of Childhood</strong> în scopul procesării acestei cereri de înscriere.{' '}
                <span className="text-red-400">*</span>
              </span>
            </label>
            {errs.consimtamant && <p className="font-body text-xs text-red-500 mt-2 ml-7">{errs.consimtamant}</p>}
          </div>

          {/* GDPR */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="gdpr" checked={vals.gdpr} onChange={handleChange}
                className="mt-0.5 w-4 h-4 accent-[#C97B4B] flex-shrink-0 cursor-pointer" />
              <span className="font-body text-xs text-brand-text-mid leading-relaxed">
                Sunt de acord cu{' '}
                <a href="#" className="text-brand-amber underline hover:no-underline" rel="nofollow">politica de confidențialitate</a>.{' '}
                <span className="text-red-400">*</span>
              </span>
            </label>
            {errs.gdpr && <p className="font-body text-xs text-red-500 mt-1 ml-7">{errs.gdpr}</p>}
          </div>

          {/* Anti-spam notice */}
          <div className="flex items-center gap-3 bg-brand-sand/60 border border-brand-sand-dark/40 rounded-xl px-4 py-3">
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-brand-sage-dark text-base" />
            </span>
            <span className="font-body text-xs text-brand-text-mid">Formularul este protejat împotriva spam-ului și a accesului neautorizat.</span>
          </div>

          {/* Error banner */}
          {status === 'error' && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-red-500 text-base" />
              </span>
              <span className="font-body text-xs text-red-600">
                A apărut o eroare. Vă rugăm încercați din nou sau contactați-ne direct la 0752 318 863.
              </span>
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={status === 'submitting'}
            className="whitespace-nowrap w-full inline-flex items-center justify-center gap-2 bg-brand-amber text-white font-body font-bold text-sm px-8 py-4 rounded-xl hover:bg-brand-amber-dark transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {status === 'submitting' ? (
              <><span className="w-4 h-4 flex items-center justify-center"><i className="ri-loader-4-line text-base animate-spin" /></span>Se trimite...</>
            ) : (
              <><span className="w-4 h-4 flex items-center justify-center"><i className="ri-send-plane-line text-base" /></span>TRIMITE</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
