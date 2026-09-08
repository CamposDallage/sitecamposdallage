import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-concrete-50 flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-concrete-200 h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-40">
          <div className="text-sm text-concrete-600">Bienvenue, <span className="font-medium text-primary-900">{session.email}</span></div>
          <a href="/" className="text-sm text-accent-600 hover:underline">Retour au site</a>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
