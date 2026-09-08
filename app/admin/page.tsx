import prisma from '@/lib/db';
import { FileText, Users, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default async function AdminDashboard() {
  const [newProspects, pendingQuotes, upcomingAppointments, totalRevenue, recentProspects] = await Promise.all([
    prisma.prospect.count({ where: { status: 'NEW' } }),
    prisma.quote.count({ where: { status: 'SENT' } }),
    prisma.appointment.count({ where: { date: { gte: new Date() }, status: { in: ['PENDING', 'CONFIRMED'] } } }),
    prisma.quote.aggregate({ _sum: { totalTtc: true }, where: { status: 'ACCEPTED' } }),
    prisma.prospect.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  const stats = [
    { label: 'Nouveaux prospects', value: newProspects, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { label: 'Devis en attente', value: pendingQuotes, icon: FileText, color: 'bg-amber-100 text-amber-600' },
    { label: 'RDV à venir', value: upcomingAppointments, icon: Calendar, color: 'bg-green-100 text-green-600' },
    { label: 'CA accepté', value: formatPrice(totalRevenue._sum.totalTtc || 0), icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900">Tableau de bord</h1>
        <p className="text-concrete-600 mt-1">Vue d'ensemble de votre activité</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="card p-6">
            <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-primary-900 mb-1">{stat.value}</div>
            <div className="text-sm text-concrete-600">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="p-6 border-b flex justify-between">
          <h2 className="font-bold">Derniers prospects</h2>
        </div>
        <div className="divide-y divide-concrete-100">
          {recentProspects.length === 0 ? (
            <div className="p-6 text-center text-concrete-500">Aucun prospect pour le moment</div>
          ) : (
            recentProspects.map(p => (
              <div key={p.id} className="p-4 flex justify-between hover:bg-concrete-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-900 text-white flex items-center justify-center font-bold">
                    {p.firstName[0]}{p.lastName[0]}
                  </div>
                  <div>
                    <div className="font-medium">{p.firstName} {p.lastName}</div>
                    <div className="text-sm text-concrete-500">{p.email}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">{p.status}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
