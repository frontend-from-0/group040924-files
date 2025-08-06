"use client";

import { useEffect, useState } from "react";
import { onAuthState, signOut } from "@/utils/firebase";
import Link from "next/link";

type UserInfo = {
  email: string;
};

export function Header() {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    type Unsubscribe = () => void;

    const unsubscribe: Unsubscribe = onAuthState((user) => {
      if (user) {
        const MAX_AGE = 60 * 60 * 1000;
        document.cookie = `__session=${user.uid}; Max-Age=${MAX_AGE}; path=/`;
        setUser({ email: user.email ?? "unknown" });
      } else {
        document.cookie = `__session=; Max-Age=0; path=/`;
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      <Link href="/" className="text-xl font-bold">
        Ecom
      </Link>

      <nav className="flex gap-4 items-center">
        <Link href="/cart">Cart</Link>
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hello, {user.email}</span>
            <button
              onClick={signOut}
              className="bg-slate-400 text-white px-4 py-1 rounded hover:bg-slate-500"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            href="/user/signup"
            className="bg-slate-600 text-white px-4 py-1 rounded hover:bg-slate-700"
          >
            Sign Up
          </Link>
        )}
      </nav>
    </header>
  );
}
