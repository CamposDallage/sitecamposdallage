import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { calculateQuote } from '@/lib/pricing';
import { sendQuoteEmail, sendAdminNotification } from '@/lib/email';
import { sendQuoteSms } from '@/lib/sms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, customerType, prestationSlug, surface, postalCode } = body;

    if (!firstName || !email || !phone || !prestationSlug || !surface) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const calculation = await calculateQuote({
      prestationSlug,
      target: customerType === 'PROFESSIONAL' ? 'PROFESSIONAL' : 'INDIVIDUAL',
      surface: Number(surface),
      postalCode,
      complementaryWorks: []
    });

    let prospect = await prisma.prospect.findFirst({ where: { email } });
    if (!prospect) {
      prospect = await prisma.prospect.create({
        data: {
          firstName, lastName, email, phone, postalCode,
          customerType: customerType || 'INDIVIDUAL',
          status: 'NEW',
          source: 'website'
        }
      });
    }

    const quote = await prisma.quote.create({
      data: {
        prospectId: prospect.id,
        prestationId: calculation.prestation.id,
        surface: calculation.surface,
        basePrice: calculation.basePrice,
        optionsTotal: calculation.optionsTotal,
        travelCost: calculation.travelCost,
        vatRate: calculation.vatRate,
        totalHt: calculation.totalHt,
        totalTtc: calculation.totalTtc,
        isProvisional: true,
        status: 'SENT'
      }
    });

    const quoteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/devis/${quote.id}`;
    
    // Envoi asynchrone (ne bloque pas la réponse)
    sendQuoteEmail({ firstName, email, phone }, { prestation: calculation.prestation.name, surface: calculation.surface, totalTtc: calculation.totalTtc }, quoteUrl).catch(console.error);
    sendQuoteSms(firstName, phone, quoteUrl).catch(console.error);
    sendAdminNotification({ firstName, lastName, email, phone }, { prestation: calculation.prestation.name, surface: calculation.surface, totalTtc: calculation.totalTtc }).catch(console.error);

    return NextResponse.json({ success: true, quoteId: quote.id, totalTtc: calculation.totalTtc });
  } catch (error: any) {
    console.error('Erreur devis:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
