import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  { slug: 'dallage-industriel', title: 'Dallage industriel', desc: 'Haute performance pour entrepots, usines, parkings.', target: 'pro' },
  { slug: 'beton-imprime', title: 'Beton imprime', desc: 'Motifs personnalisables pour terrasses et allees.' },
  { slug: 'beton-desactive', title: 'Beton desactive', desc: 'Aspect gravillonne elegant et durable.' },
  { slug: 'beton-blaye', title: 'Beton balaye', desc: 'Finition striee economique et antiderapante.' },
  { slug: 'beton-drainant', title: 'Beton drainant', desc: 'Solution ecologique laissant passer l\'eau.' },
  { slug: 'beton-quartze', title: 'Beton quartze', desc: 'Surface ultra-resistante pour usage intensif.', target: 'pro' },
  { slug: 'moquette-marbre', title: 'Moquette de marbre', desc: 'Resine et granulats de marbre decoratifs.' },
  { slug: 'terrazzo', title: 'Terrazzo', desc: 'Revatement haut de gamme extremement durable.' },
  { slug: 'beton-poli', title: 'Beton poli', desc: 'Finition brillante et facile d\'entretien.' },
  { slug: 'resine-epoxy', title: 'Resine epoxy', desc: 'Revatement resistant aux produits chimiques.' },
  { slug: 'resine-pailletee', title: 'Resine pailletee', desc: 'Finition decorative avec paillettes.' },
  { slug: 'renovation-dalle', title: 'Renovation de dalle', desc: 'Remise a neuf de vos dalles existantes.' }
];

export default function ServicesGrid() {
  return (
    <section className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Nos prestations</h2>
          <p className="text-concrete-600 text-lg max-w-2xl mx-auto">Une gamme complete de solutions en beton decoratif, dallage industriel et renovation.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <Link key={s.slug} href="/prestations" className="card group hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-5xl text-white font-bold relative">
                {s.title.split(' ').map(w => w[0]).join('').slice(0, 2)}
                {s.target === 'pro' && <div className="absolute top-3 right-3 bg-primary-900 text-white text-xs px-2 py-1 rounded-full font-semibold">PRO</div>}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-accent-600">{s.title}</h3>
                <p className="text-concrete-600 text-sm mb-4">{s.desc}</p>
                <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm">
                  En savoir plus<ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}