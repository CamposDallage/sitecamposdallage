import Link from 'next/link';
import { FileText, CalendarCheck, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-primary-900 to-primary-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500 rounded-full translate-y-1/2 -translate-x-1/3"></div>
      </div>
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à démarrer votre projet ?</h2>
          <p className="text-xl text-white/90 mb-10">Obtenez une estimation gratuite en quelques clics ou prenez rendez-vous avec un expert.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-primary !bg-accent-500 hover:!bg-accent-600 !py-4 !px-8 !text-base">
              <FileText className="w-5 h-5" />OBTENIR UN DEVIS
            </Link>
            <Link href="/rendez-vous" className="btn-outline !text-white !border-white hover:!bg-white hover:!text-primary-900 !py-4 !px-8 !text-base">
              <CalendarCheck className="w-5 h-5" />PRENDRE RENDEZ-VOUS
            </Link>
          </div>
          <div className="mt-10 pt-10 border-t border-white/20">
            <p className="text-white/70 mb-3">Une question ? Appelez-nous directement</p>
            <a href="tel:+33760000000" className="inline-flex items-center gap-3 text-3xl font-bold text-accent-400 hover:text-accent-300">
              <Phone className="w-8 h-8" />07 6X XX XX XX
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
