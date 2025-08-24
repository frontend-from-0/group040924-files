import * as admin from "firebase-admin";
import { collections } from './firebase';

const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const adminAuth = admin.auth();
export const adminDB = admin.firestore();


export async function getUser(userId: string) {
  const userSnap = await adminDB.collection(collections.users).doc(userId).get();
  
  return userSnap.data();
}