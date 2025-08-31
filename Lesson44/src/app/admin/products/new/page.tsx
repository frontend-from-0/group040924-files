'use client';
import { allCategories, Product } from '@/types/product';
import { useActionState } from 'react';
import Form from 'next/form';
import { addNewProductAction } from '@/app/actions/admin/products';
import { SuccessPage } from './Success';

const initialState: NewProductFormState = {
  success: false,
  inputs: {},
  errors: {},
};

export interface NewProductFormState {
  success: boolean;
  message?: string;
  inputs?: Partial<Product>;
  errors?: {
    [K in keyof Product]?: string[];
  };
  data?: Partial<Product>;
}

export default function Admin() {
  const [state, formAction, isPending] = useActionState<
    NewProductFormState,
    FormData
  >(addNewProductAction, initialState);

  if (isPending) return <p>Loading...</p>;
  if (state.success) return <SuccessPage product={state.data} />;

  return (
    <main className='max-w-xl mx-auto'>
      <h1 className='my-12'>Add a New Product</h1>
      <Form action={formAction}>
        <div className='flex flex-col'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            name='title'
            className='dark:bg-stone-200 dark:text-stone-900'
            defaultValue={state?.inputs?.title ?? ''}
          />
          {state?.errors?.title ? <p>{state?.errors?.title}</p> : <></>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor='descr'>Description</label>
          <input
            type='text'
            id='descr'
            name='description'
            className='dark:bg-stone-200 dark:text-stone-900'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='category'>Category</label>

          <select
            id='category'
            name='category'
            className='dark:bg-stone-200 dark:text-stone-900'
          >
            <option defaultValue='' disabled>
              select category
            </option>
            {allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='image'>Product Image</label>
          <input
            accept='.jpeg, .jpg, .webp'
            type='file'
            id='image'
            name='image'
            className='dark:bg-stone-200 dark:text-stone-900'
          />
          {state?.errors?.images ? <p>{state?.errors?.images.join('; ')}</p> : <></>}
          {/* TODO: add image preview */}
        </div>

        <button type='submit' className='my-8'>
          Create Product
        </button>
      </Form>
    </main>
  );
}
