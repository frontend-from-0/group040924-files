import {
  collection,
  query,
  getDocs
} from "firebase/firestore";

import { db as clientDb} from "@/app/lib/firebase/clientApp";
import {Product} from '../../page';


export async function getProducts(db = clientDb) {
  const q = query(collection(db, "products"));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc?.data()?.timestamp?.toDate(),
    } as Product;
  });
}