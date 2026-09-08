import Link from 'next/link';
import { ArrowRight, CalendarCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary-950">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700"></div>
      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight animate-fade-in-up">
            CamposDallage - <span className="text-gradient block mt-2">Dallage industriel & Béton décoratif</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed animate-fade-in-up animate-delay-100">
            Sous-traitance pour les professionnels et réalisation complète de vos projets pour les particuliers.
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 animate-fade-in-up animate-delay-200">
            Dallage industriel, béton décoratif, rénovation de sols. De la préparation à la mise en oeuvre, CamposDallage accompagne les professionnels du bâtiment et les particuliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <Link href="/devis" className="btn-primary !bg-accent-500 hover:!bg-accent-600">
              OBTENIR UN DEVIS<ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/rendez-vous" className="btn-outline !text-white !border-white hover:!bg-white hover:!text-primary-900">
              <CalendarCheck className="w-5 h-5" />PRENDRE RENDEZ-VOUS
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20 animate-fade-in-up animate-delay-300">
            <div><div className="text-3xl font-bold text-accent-400">500+</div><div className="text-sm text-white/70">Chantiers réalisés</div></div>
            <div><div className="text-3xl font-bold text-accent-400">15</div><div className="text-sm text-white/70">Ans d'expérience</div></div>
            <div><div className="text-3xl font-bold text-accent-400">5.0★</div><div className="text-sm text-white/70">Avis clients</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
