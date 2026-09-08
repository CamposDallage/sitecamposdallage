"use client";
import { useState } from 'react';
import { Calendar as CalIcon, Clock, MapPin, Phone, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';

const types = [
  { value: 'SITE_VISIT', label: 'Visite chantier', icon: MapPin },
  { value: 'PHONE_APPOINTMENT', label: 'RDV téléphonique', icon: Phone }
];

export default function BookingCalendar() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ type: 'SITE_VISIT', date: '', time: '', firstName: '', lastName: '', email: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-primary-900 mb-4">Rendez-vous confirmé !</h2>
        <p className="text-concrete-600 mb-8">Vous recevrez une confirmation par email et SMS.</p>
        <a href="/" className="btn-primary">Retour à l'accueil</a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto card p-6 md:p-8">
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-6">Type de rendez-vous</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {types.map(t => (
              <label key={t.value} className={`card p-4 cursor-pointer border-2 ${formData.type === t.value ? 'border-accent-500' : 'border-concrete-200'}`}>
                <input type="radio" checked={formData.type === t.value} onChange={() => setFormData({...formData, type: t.value})} className="sr-only" />
                <div className="flex items-center gap-3">
                  <t.icon className="w-6 h-6 text-accent-500" />
                  <span className="font-semibold">{t.label}</span>
                </div>
              </label>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="label">Date *</label>
              <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input" />
            </div>
            <div>
              <label className="label">Heure *</label>
              <select value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="input">
                <option value="">Choisir...</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>14:00</option>
                <option>15:00</option>
              </select>
            </div>
          </div>
          <button onClick={() => formData.date && formData.time && setStep(2)} disabled={!formData.date || !formData.time} className="btn-primary w-full">
            Continuer
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <button onClick={() => setStep(1)} className="btn-ghost mb-4"><ArrowLeft className="w-4 h-4" /> Retour</button>
          <h2 className="text-2xl font-bold mb-6">Vos coordonnées</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div><label className="label">Prénom *</label><input value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="input" /></div>
            <div><label className="label">Nom *</label><input value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="input" /></div>
            <div><label className="label">Téléphone *</label><input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input" /></div>
            <div><label className="label">Email *</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input" /></div>
          </div>
          <button onClick={() => formData.firstName && formData.email && setSubmitted(true)} disabled={!formData.firstName || !formData.email} className="btn-primary w-full">
            Confirmer le rendez-vous
          </button>
        </>
      )}
    </div>
  );
}
