import Link from 'next/link';
import { Building2, Home, ArrowRight } from 'lucide-react';

export default function TwoPathsSection() {
  return (
    <section className="section bg-concrete-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">Deux publics, une expertise</h2>
          <p className="text-concrete-600 text-lg max-w-2xl mx-auto">Que vous soyez professionnel ou particulier, CamposDallage vous accompagne.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-primary-900 rounded-xl flex items-center justify-center mb-5">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div className="badge mb-4 bg-primary-100 text-primary-800">SOUS-TRAITANCE</div>
            <h3 className="text-2xl font-bold text-primary-900 mb-3">Vous êtes une entreprise ?</h3>
            <p className="text-concrete-600 mb-6">CamposDallage intervient en sous-traitance pour les entreprises générales, maçons, terrassiers.</p>
            <Link href="/professionnels" className="btn-primary w-full">DEVIS PROFESSIONNEL<ArrowRight className="w-5 h-5" /></Link>
          </div>
          <div className="card p-8 hover:shadow-2xl transition-shadow">
            <div className="w-14 h-14 bg-accent-500 rounded-xl flex items-center justify-center mb-5">
              <Home className="w-7 h-7 text-white" />
            </div>
            <div className="badge mb-4 bg-accent-100 text-accent-800">PARTICULIERS</div>
            <h3 className="text-2xl font-bold text-primary-900 mb-3">Votre projet de terrasse ou cour ?</h3>
            <p className="text-concrete-600 mb-6">Nous vous accompagnons de A à Z : préparation, terrassement, mise en oeuvre, finition.</p>
            <Link href="/devis" className="btn-primary w-full !bg-primary-900">CALCULER MON DEVIS<ArrowRight className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
