import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, setSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
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
