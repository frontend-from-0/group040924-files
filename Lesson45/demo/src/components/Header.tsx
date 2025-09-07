'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  signInWithGoogle,
  signOut,
  onIdTokenChanged,
} from '@/app/lib/firebase/auth';

import { setSessionCookie, clearSessionCookie } from '@/app/actions/session';

import type { User as FirebaseUser } from 'firebase/auth';

function useUserSession(initialUser: FirebaseUser | null) {
  const router = useRouter();

  useEffect(() => {
    return onIdTokenChanged(async (user: FirebaseUser | null) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setSessionCookie(idToken);
      } else {
        await clearSessionCookie();
      }

      router.refresh();
    });
  }, [router]);

  return initialUser;
}

export default function Header({
  initialUser,
}: {
  initialUser: FirebaseUser | null;
}) {
  const user = useUserSession(initialUser);

  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    signInWithGoogle();
  };

  return (
    <header className='bg-slate-400'>
      {user ? (
        <div className='flex items-center justify-end max-w-7xl mx-auto py-4'>
          <div className='flex gap-2 items-center'>
            {user.photoURL && (
              <Image
                className='profileImage'
                src={user.photoURL}
                alt={user.email ?? ''}
                width={32}
                height={32}
              />
            )}
            <p>{user.displayName}</p>
          </div>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className='flex items-center justify-end max-w-7xl mx-auto py-4'>
          <a href='#' onClick={handleSignIn}>
            Sign In with Google
          </a>
        </div>
      )}
    </header>
  );
}
