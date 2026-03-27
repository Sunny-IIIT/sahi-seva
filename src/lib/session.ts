import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET || 'sahiseva-super-secret-key-for-dev-only-update-in-prod';
const key = new TextEncoder().encode(secretKey);

export async function encryptSession(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(key);
}

export async function decryptSession(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(sessionData: any) {
  const encryptedSession = await encryptSession(sessionData);
  const cookieStore = await cookies();
  
  cookieStore.set('sahiseva_session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sahiseva_session')?.value;
  if (!sessionCookie) return null;
  return await decryptSession(sessionCookie);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete('sahiseva_session');
}
