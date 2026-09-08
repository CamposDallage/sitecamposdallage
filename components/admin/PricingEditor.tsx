"use client";
import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function PricingEditor({ prestations, settings }: { prestations: any[], settings: any }) {
  const [prestationPrices, setPrestationPrices] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    prestations.forEach(p => {
      initial[p.id] = {};
      p.pricing.forEach((pr: any) => {
        initial[p.id][`${pr.targetAudience}-default`] = pr.pricePerSqm;
      });
    });
    return initial;
  });
  const [vatRate, setVatRate] = useState(settings.vatRate || 20);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePriceChange = (prestationId: string, key: string, value: string) => {
    setPrestationPrices(prev => ({
      ...prev,
      [prestationId]: { ...prev[prestationId], [key]: parseFloat(value) || 0 }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const payload = {
        prestations: Object.entries(prestationPrices).map(([prestationId, prices]) => ({
          prestationId,
          prices: Object.entries(prices).map(([key, price]) => {
            const [targetAudience] = key.split('-');
            return { targetAudience, zone: '', pricePerSqm: price };
          })
        })),
        vatRate
      };
      await fetch('/api/admin/tarifs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 mt-0.5" />
          <div>Tarifs enregistrés avec succès</div>
        </div>
      )}
      <div className="card p-6">
        <h2 className="text-lg font-bold text-primary-900 mb-4">Paramètres généraux</h2>
        <div>
          <label className="label">Taux de TVA (%)</label>
          <input type="number" step="0.1" value={vatRate} onChange={e => setVatRate(parseFloat(e.target.value))} className="input" />
        </div>
      </div>
      <div className="card p-6">
        <h2 className="text-lg font-bold text-primary-900 mb-4">Tarifs par prestation (€/m²)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-concrete-200">
                <th className="text-left py-3 px-4 text-sm font-semibold">Prestation</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Particuliers</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Professionnels</th>
              </tr>
            </thead>
            <tbody>
              {prestations.map(p => (
                <tr key={p.id} className="border-b border-concrete-100 hover:bg-concrete-50">
                  <td className="py-3 px-4">
                    <div className="font-medium">{p.name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={prestationPrices[p.id]?.['INDIVIDUAL-default'] || ''}
                        onChange={e => handlePriceChange(p.id, 'INDIVIDUAL-default', e.target.value)}
                        className="input !py-2 !px-3 w-32"
                      />
                      <span className="text-sm text-concrete-500">€</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.5"
                        value={prestationPrices[p.id]?.['PROFESSIONAL-default'] || ''}
                        onChange={e => handlePriceChange(p.id, 'PROFESSIONAL-default', e.target.value)}
                        className="input !py-2 !px-3 w-32"
                      />
                      <span className="text-sm text-concrete-500">€</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sticky bottom-4 bg-white border border-concrete-200 rounded-xl p-4 shadow-card flex justify-between">
        <div className="text-sm text-concrete-600">
          {saved ? '✓ Modifications enregistrées' : 'Pensez à sauvegarder vos modifications'}
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary disabled:opacity-50">
          <Save className="w-5 h-5" />
          {saving ? 'Enregistrement...' : 'Enregistrer les tarifs'}
        </button>
      </div>
    </div>
  );
}
