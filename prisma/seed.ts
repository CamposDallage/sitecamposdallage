import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const pwd = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@camposdallage.com' },
    update: {},
    create: { email: 'admin@camposdallage.com', password: pwd, firstName: 'Admin', lastName: 'Campos', role: 'ADMIN' }
  });

  await prisma.siteSettings.upsert({
    where: { id: 'settings' },
    update: {},
    create: { id: 'settings', companyName: 'CamposDallage', phone: '07 6X XX XX XX', email: 'contact@camposdallage.com', adminEmail: 'admin@camposdallage.com', vatRate: 20.0 }
  });

  const prestations = [
    { slug: 'dallage-industriel', name: 'Dallage industriel', short: 'Dallage', desc: 'Dallages industriels haute performance pour entrepôts, usines, parkings.', adv: 'Haute résistance|Longue durée|Usage intensif', apps: 'Entrepôts|Usines|Parkings', order: 1, pro: 45, ind: 55 },
    { slug: 'beton-imprime', name: 'Béton imprimé', short: 'Imprimé', desc: 'Béton décoratif avec motifs et couleurs personnalisables.', adv: 'Personnalisable|Esthétique|Durable', apps: 'Terrasses|Allées|Piscines', order: 2, pro: 65, ind: 85 },
    { slug: 'beton-blaye', name: 'Béton balayé', short: 'Balayé', desc: 'Finition striée économique et antidérapante.', adv: 'Économique|Antidérapant|Simple', apps: 'Allées|Cours|Trottoirs', order: 3, pro: 40, ind: 55 },
    { slug: 'beton-desactive', name: 'Béton désactivé', short: 'Désactivé', desc: 'Aspect gravillonné naturel mettant en valeur les granulats.', adv: 'Naturel|Durable|Esthétique', apps: 'Allées|Cours|Terrasses', order: 4, pro: 55, ind: 70 },
    { slug: 'beton-drainant', name: 'Béton drainant', short: 'Drainant', desc: 'Solution écologique permettant l'infiltration des eaux pluviales.', adv: 'Écologique|Conforme PLU|Perméable', apps: 'Allées|Parkings|Places', order: 5, pro: 70, ind: 85 },
    { slug: 'beton-quartzé', name: 'Béton surfacé quartzé', short: 'Quartzé', desc: 'Surface extrêmement résistante pour usage intensif.', adv: 'Ultra résistant|Longue durée|Anti-poussière', apps: 'Ateliers|Garages|Industrie', order: 6, pro: 50, ind: 65 },
    { slug: 'moquette-marbre', name: 'Moquette de marbre', short: 'Moquette', desc: 'Mélange de résine et granulats de marbre.', adv: 'Décoratif|Résistant|Sans joint', apps: 'Terrasses|Piscines|Intérieur', order: 7, pro: 90, ind: 120 },
    { slug: 'terrazzo', name: 'Terrazzo', short: 'Terrazzo', desc: 'Revêtement haut de gamme composé de fragments de marbre.', adv: 'Haut de gamme|Durable|Unique', apps: 'Intérieur|Extérieur premium', order: 8, pro: 120, ind: 160 },
    { slug: 'beton-poli', name: 'Béton poli', short: 'Poli', desc: 'Finition brillante et moderne.', adv: 'Moderne|Facile entretien|Brillant', apps: 'Commerces|Showrooms', order: 9, pro: 70, ind: 90 },
    { slug: 'resine-epoxy', name: 'Résine époxy', short: 'Époxy', desc: 'Revêtement technique résistant aux produits chimiques.', adv: 'Résistant chimique|Sans joint|Facile nettoyage', apps: 'Garages|Laboratoires', order: 10, pro: 60, ind: 80 },
    { slug: 'resine-pailletée', name: 'Résine pailletée', short: 'Pailletée', desc: 'Finition décorative avec paillettes métallisées.', adv: 'Design|Décoratif|Unique', apps: 'Garages|Showrooms', order: 11, pro: 75, ind: 95 },
    { slug: 'renovation-dalle', name: 'Rénovation de dalle', short: 'Rénovation', desc: 'Remise à neuf, traitement, réparation de dalles existantes.', adv: 'Économique|Rapide|Écologique', apps: 'Tous types de dalles', order: 12, pro: 35, ind: 45 }
  ];

  for (const p of prestations) {
    const pr = await prisma.prestation.upsert({
      where: { slug: p.slug },
      update: {},
      create: { slug: p.slug, name: p.name, shortName: p.short, description: p.desc, advantages: p.adv, applications: p.apps, displayOrder: p.order, targetAudience: 'BOTH' }
    });
    await prisma.pricing.create({ data: { prestationId: pr.id, targetAudience: 'PROFESSIONAL', pricePerSqm: p.pro } });
    await prisma.pricing.create({ data: { prestationId: pr.id, targetAudience: 'INDIVIDUAL', pricePerSqm: p.ind } });
  }

  const options = [
    { slug: 'terrassement', name: 'Terrassement', price: 25, type: 'PER_SQM' },
    { slug: 'preparation', name: 'Préparation du terrain', price: 15, type: 'PER_SQM' },
    { slug: 'evacuation', name: 'Évacuation gravats', price: 300, type: 'FIXED' },
    { slug: 'mise-niveau', name: 'Mise à niveau', price: 10, type: 'PER_SQM' },
    { slug: 'coffrage', name: 'Coffrage', price: 20, type: 'PER_SQM' },
    { slug: 'treillis', name: 'Treillis soudé', price: 12, type: 'PER_SQM' },
    { slug: 'traitement', name: 'Traitement / protection', price: 8, type: 'PER_SQM' }
  ];

  for (const o of options) {
    await prisma.pricingOption.create({ data: { slug: o.slug, name: o.name, price: o.price, priceType: o.type } });
  }

  await prisma.pricingZone.create({ data: { name: 'Rennes Métropole', postalCodes: '35000,35200,35700', travelCost: 0 } });
  await prisma.pricingZone.create({ data: { name: 'Ille-et-Vilaine', postalCodes: '35', travelCost: 50 } });
  await prisma.pricingZone.create({ data: { name: 'Bretagne hors 35', postalCodes: '22,29,56', travelCost: 150 } });

  console.log('✅ Seed terminé. Admin: admin@camposdallage.com / admin123');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
