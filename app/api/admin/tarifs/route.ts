import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

    const body = await request.json();
    const { prestations, vatRate } = body;

    if (!prestations) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    await prisma.$transaction(async (tx) => {
      for (const p of prestations) {
        for (const price of p.prices || []) {
          await tx.pricing.upsert({
            where: {
              prestationId_targetAudience_zone: {
                prestationId: p.prestationId,
                targetAudience: price.targetAudience,
                zone: price.zone || ''
              }
            },
            update: { pricePerSqm: price.pricePerSqm },
            create: {
              prestationId: p.prestationId,
              targetAudience: price.targetAudience,
              pricePerSqm: price.pricePerSqm,
              zone: price.zone || ''
            }
          });
        }
      }
      
      if (typeof vatRate === 'number') {
        const existing = await tx.siteSettings.findFirst();
        if (existing) {
          await tx.siteSettings.update({ where: { id: existing.id }, data: { vatRate } });
        } else {
          await tx.siteSettings.create({ data: { id: 'settings', vatRate } });
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Erreur tarifs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
