import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Marc Dubois', city: 'Rennes', project: 'Terrasse béton imprimé', rating: 5, comment: "Travail soigné et professionnel. Résultat magnifique !" },
  { name: 'Entreprise BTP Ouest', city: 'Vitré', project: 'Sous-traitance', rating: 5, comment: "Partenaire fiable. Respect des délais, qualité irréprochable." },
  { name: 'Sophie Lemaitre', city: 'Cesson-Sévigné', project: 'Cour béton désactivé', rating: 5, comment: "Équipe ponctuelle, chantier propre, résultat conforme." }
];

export default function TestimonialsSection() {
  return (
    <section className="section bg-concrete-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Ils nous font confiance</h2>
          <div className="flex items-center justify-center gap-1">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-accent-400 text-accent-400" />)}
            <span className="ml-2 font-bold text-primary-900">5.0 / 5</span>
            <span className="text-concrete-600 ml-2">sur Google</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <div key={i} className="card p-6 bg-white">
              <Quote className="w-8 h-8 text-accent-500 mb-4 opacity-30" />
              <p className="text-concrete-700 mb-6">"{t.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold">{t.name.charAt(0)}</div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-concrete-500">{t.project} - {t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="#" className="btn-primary">Voir tous les avis Google</a>
          <a href="#" className="btn-outline ml-4">Laisser un avis</a>
        </div>
      </div>
    </section>
  );
}
