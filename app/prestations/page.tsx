import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const prestations = [
  { slug: 'dallage-industriel', name: 'Dallage industriel', desc: 'Haute performance.' },
  { slug: 'beton-imprime', name: 'Béton imprimé', desc: 'Motifs personnalisables.' },
  { slug: 'beton-desactive', name: 'Béton désactivé', desc: 'Aspect gravillonné.' },
  { slug: 'beton-drainant', name: 'Béton drainant', desc: 'Solution écologique.' },
  { slug: 'beton-quartzé', name: 'Béton quartzé', desc: 'Surface ultra-résistante.' },
  { slug: 'moquette-marbre', name: 'Moquette de marbre', desc: 'Résine et granulats.' },
  { slug: 'terrazzo', name: 'Terrazzo', desc: 'Revêtement haut de gamme.' },
  { slug: 'beton-poli', name: 'Béton poli', desc: 'Finition brillante.' },
  { slug: 'resine-epoxy', name: 'Résine époxy', desc: 'Revêtement technique.' },
  { slug: 'resine-pailletée', name: 'Résine pailletée', desc: 'Finition décorative.' },
  { slug: 'renovation-dalle', name: 'Rénovation de dalle', desc: 'Remise à neuf.' }
];

export default function PrestationsPage() {
  return (
    <>
      <section className="bg-primary-950 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos <span className="text-gradient">prestations</span></h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {prestations.map(p => (
              <Link key={p.slug} href="#" className="card group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-300 to-primary-600 flex items-center justify-center text-5xl text-white font-bold">
                  {p.name[0]}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                  <p className="text-concrete-600 text-sm mb-4">{p.desc}</p>
                  <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm">En savoir plus<ArrowRight className="w-4 h-4" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
