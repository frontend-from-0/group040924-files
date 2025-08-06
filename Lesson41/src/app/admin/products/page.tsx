/* eslint-disable @typescript-eslint/no-explicit-any */
import { collections, db } from '@/utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

export default async function AdminDashboard() {
  const querySnapshot = await getDocs(collection(db, collections.products));
  const products = querySnapshot.docs.map((doc) => doc.data());

  return (
    <main>
      <h1 className='text-center m-12'>Ecom website</h1>
      {products?.length > 0 &&
        products.map((product: any) => (
            <div key={product.id} className='flex my-8 gap-4 max-w-3xl mx-auto' >
              <div className='w-3xs'>
                {product.images?.length > 0 ? (
                  <Image
                    width={200}
                    height={200}
                    src={product.images[0]}
                    alt={product.title}
                  />
                ): <></>}
              </div>
              <div>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>
            </div>
          )
        )}
    </main>
  );
}
