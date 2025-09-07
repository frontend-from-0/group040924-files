'use server';

import { getFirestore } from 'firebase/firestore';
import { getAuthenticatedAppForUser } from '../lib/firebase/serverApp';
import { getProducts } from '../lib/firebase/firestore';
import { Product } from '../page';

export async function fetchDataFromFirebase() {
  const { firebaseServerApp } = await getAuthenticatedAppForUser();
  
    const products: Product[] = await getProducts(
      getFirestore(firebaseServerApp),
    );
    return products;
}
