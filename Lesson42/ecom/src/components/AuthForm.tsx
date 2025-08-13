"use client";

import { useState } from "react";

interface AuthFormProps {
  type: "signup" | "login";
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (type === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await onSubmit(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.");
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          type="email"
          id="email"
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-description"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          required
          className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {type === "signup" && (
          <p id="password-description" className="text-xs text-gray-500 mt-1">
            Minimum 6 characters
          </p>
        )}
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-slate-600 text-white py-2 px-4 rounded hover:bg-slate-700"
      >
        {type === "signup" ? "Create Account" : "Log In"}
      </button>
    </form>
  );
}
