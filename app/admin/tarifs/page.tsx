import prisma from '@/lib/db';
import PricingEditor from '@/components/admin/PricingEditor';

export default async function AdminTarifsPage() {
  const prestations = await prisma.prestation.findMany({
    where: { isActive: true },
    include: { pricing: { orderBy: { targetAudience: 'asc' } } },
    orderBy: { displayOrder: 'asc' }
  });
  const settings = await prisma.siteSettings.findFirst() || { vatRate: 20 };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900">Gestion des tarifs</h1>
        <p className="text-concrete-600 mt-1">Modifiez les prix au m² pour les professionnels et les particuliers.</p>
      </div>
      <PricingEditor prestations={prestations} settings={settings} />
    </div>
  );
}
