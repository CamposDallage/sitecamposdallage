import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-950 text-concrete-200 pt-16 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
              <div className="font-display font-bold text-lg text-white">CamposDallage</div>
            </div>
            <p className="text-concrete-400 text-sm">Spécialiste du dallage industriel, béton décoratif et sous-traitance.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Prestations</h3>
            <ul className="space-y-2 text-sm">
              {['Dallage industriel', 'Béton imprimé', 'Béton désactivé', 'Béton drainant', 'Moquette de marbre', 'Résine époxy'].map((l, i) => (
                <li key={i}><Link href="/prestations" className="hover:text-accent-300">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Zones</h3>
            <ul className="space-y-2 text-sm">
              {['Rennes', 'Vitré', 'Saint-Malo', 'Fougères', 'Lorient', 'Bretagne'].map((l, i) => (
                <li key={i}><Link href="#" className="hover:text-accent-300">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent-400" />07 6X XX XX XX</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-accent-400" />contact@camposdallage.com</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-accent-400" /><span>Rennes, Bretagne</span></li>
              <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-accent-400" />Lun-Ven : 8h-18h</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 pt-6 flex justify-between text-sm text-concrete-400">
          <p>© {new Date().getFullYear()} CamposDallage.</p>
          <div className="flex gap-6">
            <Link href="#">Mentions légales</Link>
            <Link href="#">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
