"use client";

import { signInWithEmail } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import {AuthForm} from "@/components/AuthForm";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(email: string, password: string) {
    await signInWithEmail(email, password);
    router.push("/");
  }

  return (
    <main className="max-w-md mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
      <AuthForm type="login" onSubmit={handleLogin} />
    </main>
  );
}
