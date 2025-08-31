"use client";

import { signUpWithEmail } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import {AuthForm} from "@/components/AuthForm";
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();

  async function handleSignUp(email: string, password: string) {
    await signUpWithEmail(email, password);
    router.push("/");
  }

  return (
    <main className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <AuthForm type="signup" onSubmit={handleSignUp} />
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <Link
          href="/user/login"
          className="text-slate-600 hover:underline font-medium"
        >
          Log In
        </Link>
      </div>
    </main>
  );
}
