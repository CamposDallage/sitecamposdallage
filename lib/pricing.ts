import prisma from './db';

export async function calculateQuote(input: { prestationSlug: string; target: string; surface: number; postalCode?: string; complementaryWorks: string[] }) {
  const prestation = await prisma.prestation.findUnique({ where: { slug: input.prestationSlug, isActive: true } });
  if (!prestation) throw new Error('Prestation non trouvée');

  const pricing = await prisma.pricing.findFirst({
    where: { prestationId: prestation.id, targetAudience: input.target, isActive: true }
  });
  if (!pricing) throw new Error('Tarif non trouvé');

  let basePrice = input.surface * pricing.pricePerSqm;

  let optionsTotal = 0;
  if (input.complementaryWorks.length > 0) {
    const opts = await prisma.pricingOption.findMany({ where: { slug: { in: input.complementaryWorks } } });
    for (const o of opts) {
      const price = o.priceType === 'PER_SQM' ? o.price * input.surface : o.price;
      optionsTotal += price;
    }
  }

  let travelCost = 0;
  if (input.postalCode) {
    const zones = await prisma.pricingZone.findMany();
    const zone = zones.find(z => input.postalCode!.startsWith(z.postalCodes));
    if (zone) travelCost = zone.travelCost;
  }

  const settings = await prisma.siteSettings.findFirst();
  const vatRate = settings?.vatRate ?? 20;
  const totalHt = basePrice + optionsTotal + travelCost;
  const vatAmount = totalHt * (vatRate / 100);
  const totalTtc = totalHt + vatAmount;

  return {
    prestation: { id: prestation.id, name: prestation.name, slug: prestation.slug },
    surface: input.surface,
    pricePerSqm: pricing.pricePerSqm,
    basePrice,
    optionsTotal,
    travelCost,
    vatRate,
    totalHt,
    vatAmount,
    totalTtc
  };
}
