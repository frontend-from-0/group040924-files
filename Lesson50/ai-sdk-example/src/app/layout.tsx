import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/components/auth-provider';
import { Navigation } from '@/components/navigation';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Flashcards",
  description: "A simple and effective spaced repetition app.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 text-gray-800 dark:text-white`}>
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
