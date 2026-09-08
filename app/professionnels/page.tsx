import { CheckCircle2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ProfessionnelsPage() {
  const prestations = ['Dallage industriel', 'Béton quartzé', 'Béton imprimé', 'Béton désactivé', 'Résine époxy', 'Rénovation de dallage'];
  return (
    <>
      <section className="bg-primary-950 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">SOUS-TRAITANCE</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Votre partenaire en sous-traitance <span className="text-gradient">béton et dallage</span></h1>
            <p className="text-xl text-white/80 mb-8">CamposDallage intervient en sous-traitance pour les entreprises générales, maçons et terrassiers en Bretagne.</p>
            <Link href="/devis" className="btn-primary !bg-accent-500 inline-flex"><FileText className="w-5 h-5" />DEMANDER UN TARIF</Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Nos prestations pro</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prestations.map(p => (
              <div key={p} className="card p-5 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                <span className="font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
