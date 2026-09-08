"use client";
import { useState } from 'react';
import { FileText, Calculator, CheckCircle2, ArrowRight, ArrowLeft, Info } from 'lucide-react';

const prestations = [
  { slug: 'beton-imprime', name: 'Béton imprimé', price: 85 },
  { slug: 'beton-desactive', name: 'Béton désactivé', price: 70 },
  { slug: 'dallage-industriel', name: 'Dallage industriel', price: 55 },
  { slug: 'beton-drainant', name: 'Béton drainant', price: 85 },
  { slug: 'resine-epoxy', name: 'Résine époxy', price: 80 }
];

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ customerType: 'INDIVIDUAL', prestationSlug: '', surface: 0, postalCode: '', firstName: '', lastName: '', email: '', phone: '' });
  const [calc, setCalc] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);

  const calculate = () => {
    const p = prestations.find(x => x.slug === formData.prestationSlug);
    if (!p) return;
    const totalHt = formData.surface * p.price;
    setCalc({ name: p.name, surface: formData.surface, price: p.price, totalHt, totalTtc: totalHt * 1.2 });
    setStep(3);
  };

  const handleSubmit = async () => {
    // Simulation d'envoi API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Estimation envoyée !</h2>
        <p className="text-concrete-600 mb-8">Vous recevrez un email et un SMS de confirmation.</p>
        <a href="/rendez-vous" className="btn-primary">Prendre rendez-vous</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between text-xs text-concrete-500 mb-8">
        <span className={step>=1?'text-accent-600 font-bold':''}>1. Projet</span>
        <span className={step>=2?'text-accent-600 font-bold':''}>2. Détails</span>
        <span className={step>=3?'text-accent-600 font-bold':''}>3. Estimation</span>
        <span className={step>=4?'text-accent-600 font-bold':''}>4. Coordonnées</span>
      </div>

      {step === 1 && (
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Votre projet</h2>
          <div className="mb-6">
            <label className="label">Prestation</label>
            <div className="grid grid-cols-2 gap-3">
              {prestations.map(p => (
                <label key={p.slug} className={`p-3 rounded-lg border-2 cursor-pointer ${formData.prestationSlug === p.slug ? 'border-accent-500 bg-accent-50' : 'border-concrete-200'}`}>
                  <input type="radio" checked={formData.prestationSlug === p.slug} onChange={() => setFormData({...formData, prestationSlug: p.slug})} className="sr-only" />
                  <div className="font-medium">{p.name}</div>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={() => formData.prestationSlug && setStep(2)} disabled={!formData.prestationSlug} className="btn-primary">
              Continuer<ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Détails</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="label">Surface (m²) *</label>
              <input type="number" value={formData.surface || ''} onChange={e => setFormData({...formData, surface: Number(e.target.value)})} className="input" />
            </div>
            <div>
              <label className="label">Code postal *</label>
              <input type="text" value={formData.postalCode} onChange={e => setFormData({...formData, postalCode: e.target.value})} className="input" placeholder="35000" />
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="btn-ghost"><ArrowLeft className="w-5 h-5" />Retour</button>
            <button onClick={() => formData.surface > 0 && calculate()} disabled={!formData.surface} className="btn-primary">
              <Calculator className="w-5 h-5" />Calculer
            </button>
          </div>
        </div>
      )}

      {step === 3 && calc && (
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Estimation provisoire</h2>
          <div className="bg-accent-50 border-2 border-accent-200 rounded-xl p-6 mb-6 text-center">
            <div className="text-sm text-concrete-600 mb-2">Total TTC estimé</div>
            <div className="text-5xl font-bold text-accent-600 mb-2">{calc.totalTtc.toFixed(2)} €</div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-sm flex gap-3">
            <Info className="w-5 h-5 text-yellow-600" />
            <div>
              <strong>Estimation indicative.</strong>
              <p className="text-yellow-800 mt-1">Le prix définitif sera confirmé après étude du projet.</p>
            </div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(2)} className="btn-ghost"><ArrowLeft className="w-5 h-5" />Modifier</button>
            <button onClick={() => setStep(4)} className="btn-primary">Confirmer<ArrowRight className="w-5 h-5" /></button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div><label className="label">Prénom *</label><input value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="input" /></div>
            <div><label className="label">Nom *</label><input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="input" /></div>
            <div><label className="label">Téléphone *</label><input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" /></div>
            <div><label className="label">Email *</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input" /></div>
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep(3)} className="btn-ghost"><ArrowLeft className="w-5 h-5" />Retour</button>
            <button onClick={handleSubmit} disabled={!formData.firstName || !formData.email} className="btn-primary">
              <FileText className="w-5 h-5" />Recevoir l'estimation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
