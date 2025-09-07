import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
  onIdTokenChanged as _onIdTokenChanged,
  User,
} from "firebase/auth";
import { auth } from "@/app/lib/firebase/clientApp";

export interface IdTokenChangedCallback {
  (user: User | null): void;
}

export function onAuthStateChanged(cb: IdTokenChangedCallback) {
  return _onAuthStateChanged(auth, cb);
}

export function onIdTokenChanged(cb: IdTokenChangedCallback) {
  return _onIdTokenChanged(auth, cb);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}

export async function signOut() {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}
