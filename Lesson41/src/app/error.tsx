'use client';
 
import Link from 'next/link';
import { useEffect } from 'react';
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Link href="/user/login" 
      >
        Go to home page
      </Link>
    </div>
  )
}