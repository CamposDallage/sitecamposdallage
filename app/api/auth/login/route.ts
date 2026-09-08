import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { authenticateUser, setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // AUTO-CREATION DE L'ADMIN SI LA BASE EST VIDE
    const adminExists = await prisma.user.findUnique({ where: { email: 'admin@camposdallage.com' } });
    if (!adminExists) {
      const pwd = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: { email: 'admin@camposdallage.com', password: pwd, firstName: 'Admin', lastName: 'Campos', role: 'ADMIN' }
      });
      await prisma.siteSettings.upsert({
        where: { id: 'settings' },
        update: {},
        create: { id: 'settings', companyName: 'CamposDallage', vatRate: 20.0 }
      });
    }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    const payload = await authenticateUser(email, password);
    if (!payload) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    await setSession(payload);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Erreur de connexion' }, { status: 500 });
  }
}