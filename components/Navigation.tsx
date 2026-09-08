"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, Phone, FileText } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/professionnels', label: 'Professionnels' },
  { href: '/prestations', label: 'Prestations' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/devis', label: 'Devis' },
  { href: '/rendez-vous', label: 'RDV' },
  { href: '/contact', label: 'Contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="bg-primary-900 text-white text-sm py-2">
        <div className="container flex justify-end gap-6">
          <a href="tel:+33760000000" className="flex items-center gap-2 hover:text-accent-300">
            <Phone className="w-4 h-4" />07 6X XX XX XX
          </a>
          <span className="hidden sm:inline">- Rennes / Bretagne</span>
        </div>
      </div>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-concrete-100">
        <div className="container flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
            <div>
              <div className="font-display font-bold text-lg text-primary-900">CamposDallage</div>
              <div className="text-xs text-concrete-500">Béton décoratif - Dallage</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(i => (
              <Link key={i.href} href={i.href} className="px-3 py-2 text-sm font-medium text-concrete-700 hover:text-primary-900 rounded-md hover:bg-concrete-50">
                {i.label}
              </Link>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/rendez-vous" className="btn-outline !py-2 !px-4 !text-sm">Prendre RDV</Link>
            <Link href="/devis" className="btn-primary !py-2 !px-4 !text-sm">
              <FileText className="w-4 h-4" />Devis
            </Link>
          </div>
          <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
        {isOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="container py-4 space-y-1">
              {navItems.map(i => (
                <Link key={i.href} href={i.href} onClick={() => setIsOpen(false)} className="block px-4 py-3 hover:bg-concrete-50 rounded-lg">
                  {i.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/rendez-vous" onClick={() => setIsOpen(false)} className="btn-outline w-full">Prendre RDV</Link>
                <Link href="/devis" onClick={() => setIsOpen(false)} className="btn-primary w-full">Devis</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
