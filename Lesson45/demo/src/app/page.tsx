import { getAuthenticatedAppForUser } from '@/app/lib/firebase/serverApp.js';
import { getProducts } from '@/app/lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FormComponent } from './Form';

// Force next.js to treat this route as server-side rendered
// Without this line, during the build process, next.js will treat this route as static and build a static HTML file for it

export const dynamic = "force-dynamic";

// This line also forces this route to be server-side rendered
// export const revalidate = 0;

export interface Product{
  id: string;
  title: string;
  description: string;
  timestamp: Date;
}

export default async function Home() {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();

  const products: Product[] = await getProducts(
    getFirestore(firebaseServerApp),
  );

  return (
    <main className="flex flex-col items-center gap-4 p-6">
      {products.map(p => (
        <div
          key={p.id}
          className="w-full max-w-sm bg-white rounded-lg shadow p-4 border border-gray-100"
        >
          <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
          <p className="text-gray-600 mb-2">{p.description}</p>
        </div>
      ))}

      <FormComponent />
      
    </main>
  );
}
