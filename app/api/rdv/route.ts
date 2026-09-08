import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { sendAppointmentSms } from '@/lib/sms';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, date, duration, firstName, lastName, email, phone } = body;

    if (!type || !date || !firstName || !email || !phone) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const appointmentDate = new Date(date);
    
    let prospect = await prisma.prospect.findFirst({ where: { email } });
    if (!prospect) {
      prospect = await prisma.prospect.create({
        data: {
          firstName, lastName, email, phone,
          customerType: 'INDIVIDUAL',
          status: 'APPOINTMENT',
          source: 'website-rdv'
        }
      });
    }

    const appointment = await prisma.appointment.create({
      data: {
        prospectId: prospect.id,
        type,
        date: appointmentDate,
        duration: duration || 60,
        status: 'CONFIRMED'
      }
    });

    const formattedDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' }).format(appointmentDate);
    
    sendEmail(email, 'Confirmation RDV CamposDallage', `<p>Bonjour ${firstName},</p><p>Votre rendez-vous est confirmé le ${formattedDate}.</p><p>Cordialement, l'équipe CamposDallage.</p>`).catch(console.error);
    sendAppointmentSms(firstName, phone, appointmentDate, 'rendez-vous').catch(console.error);

    return NextResponse.json({ success: true, appointmentId: appointment.id });
  } catch (error: any) {
    console.error('Erreur RDV:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
