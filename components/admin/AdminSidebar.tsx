"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileText, Calendar, DollarSign, Settings, LogOut } from 'lucide-react';

const menuItems = [
  { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/admin', label: 'Prospects', icon: Users },
  { href: '/admin', label: 'Devis', icon: FileText },
  { href: '/admin', label: 'Rendez-vous', icon: Calendar },
  { href: '/admin/tarifs', label: 'Tarifs', icon: DollarSign },
  { href: '/admin', label: 'Paramètres', icon: Settings }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-primary-950 text-white z-50">
      <div className="flex items-center gap-2 h-20 px-6 border-b border-primary-900">
        <div className="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">C</div>
        <div>
          <div className="font-bold">CamposDallage</div>
          <div className="text-xs text-concrete-400">Administration</div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${isActive ? 'bg-accent-500 text-white' : 'text-concrete-300 hover:bg-primary-900 hover:text-white'}`}>
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-primary-900">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-concrete-300 hover:bg-primary-900">
          <LogOut className="w-5 h-5" /> Retour au site
        </Link>
      </div>
    </aside>
  );
}
