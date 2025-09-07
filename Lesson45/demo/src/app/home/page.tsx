'use client';
import { useActionState } from 'react';
import {fetchDataFromFirebase} from '../actions/products';

export default function HomePage () {
  const [state, formAction, isPending] = useActionState(fetchDataFromFirebase, null);
  
  console.log('state', state);
  console.log('isPending', isPending);

  return (
    <div>
      <p>Home Page</p>
      <button onClick={formAction}></button>
    </div>
  )
}