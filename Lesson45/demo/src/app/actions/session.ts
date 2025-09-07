'use server';

import { cookies } from 'next/headers';

export async function setSessionCookie(idToken: string) {
  // TODO: (recommended) verify the token on the server before setting
  (await cookies()).set({
    name: '__session',
    value: idToken,
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // optional: 7 days
  });
}

// Clear the cookie
export async function clearSessionCookie() {
  (await cookies()).delete('__session');
}
