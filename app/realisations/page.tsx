"use client";
import { useState } from 'react';
import { Filter } from 'lucide-react';

const filters = ['Tous', 'Dallage industriel', 'Béton imprimé', 'Béton désactivé'];
const projects = [
  { id: 1, title: 'Terrasse béton imprimé', city: 'Rennes', surface: 85, category: 'Béton imprimé' },
  { id: 2, title: 'Dallage entrepôt', city: 'Vitré', surface: 1200, category: 'Dallage industriel' },
  { id: 3, title: 'Cour béton désactivé', city: 'Cesson-Sévigné', surface: 150, category: 'Béton désactivé' }
];

export default function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const filtered = activeFilter === 'Tous' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <section className="bg-primary-950 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nos <span className="text-gradient">réalisations</span></h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === f ? 'bg-accent-500 text-white' : 'bg-concrete-100 text-concrete-700'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <div key={p.id} className="card group hover:shadow-2xl transition-all">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-300 to-primary-600"></div>
                <div className="p-5">
                  <div className="bg-accent-100 text-accent-700 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-2">{p.category}</div>
                  <h3 className="font-bold mb-2">{p.title}</h3>
                  <div className="flex justify-between text-sm text-concrete-600">
                    <span>{p.city}</span>
                    <span className="font-semibold">{p.surface} m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
