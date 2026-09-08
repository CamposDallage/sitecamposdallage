import type { Metadata } from 'next';
import QuoteCalculator from '@/components/QuoteCalculator';

export const metadata: Metadata = {
  title: 'Devis en ligne gratuit - CamposDallage',
  description: 'Obtenez une estimation provisoire gratuite de votre projet en quelques clics.'
};

export default function DevisPage() {
  return (
    <>
      <section className="bg-primary-950 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Devis en ligne <span className="text-gradient">gratuit</span></h1>
          <p className="text-xl text-white/80">Obtenez une estimation provisoire en quelques clics. Pas d'engagement.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <QuoteCalculator />
        </div>
      </section>
    </>
  );
}
