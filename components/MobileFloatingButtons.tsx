"use client";
import Link from 'next/link';
import { Phone, FileText } from 'lucide-react';

export default function MobileFloatingButtons() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-2">
        <a href="tel:+33760000000" className="flex items-center justify-center gap-2 py-4 text-primary-900 font-semibold">
          <Phone className="w-5 h-5" />APPELER
        </a>
        <Link href="/devis" className="flex items-center justify-center gap-2 py-4 bg-accent-500 text-white font-semibold">
          <FileText className="w-5 h-5" />DEVIS
        </Link>
      </div>
    </div>
  );
}
