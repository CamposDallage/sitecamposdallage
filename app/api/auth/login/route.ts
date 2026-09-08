import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key-camposdallage-12345');

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 1. Auto-création de l'admin si la base est vide
    let user = await prisma.user.findUnique({ where: { email: 'admin@camposdallage.com' } });
    if (!user) {
      const pwd = await bcrypt.hash('admin123', 10);
      user = await prisma.user.create({
        data: { email: 'admin@camposdallage.com', password: pwd, firstName: 'Admin', lastName: 'Campos', role: 'ADMIN' }
      });
    }

    // 2. Vérification du mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    // 3. Création du token de session
    const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET);

    // 4. Sauvegarde du cookie (Compatible Next.js 14)
    const cookieStore = cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // CETTE LIGNE VA NOUS DIRE EXACTEMENT CE QUI NE VA PAS
    return NextResponse.json({ error: error.message || String(error) }, { status: 500 });
  }
}