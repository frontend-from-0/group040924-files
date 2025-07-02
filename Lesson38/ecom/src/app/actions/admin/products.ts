import { NewProductFormState } from '@/app/admin/products/new/page';
import { Category } from '@/types/product';
import { z } from 'zod';
import { db, collections } from '@/utils/firebase';
import { setDoc, doc } from 'firebase/firestore';

// Backend validation
const productSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(50).max(500),
  category: z.nativeEnum(Category),
});

export async function addNewProductAction(
  currentState: NewProductFormState,
  formData: FormData,
): Promise<NewProductFormState> {
  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
  };

  const result = productSchema.safeParse(rawData);

  if (!result.success) {
    console.error('Failed parsing form data when adding a new product', result);
    return {
      success: false,
      message: 'Please correct the form input',
      inputs: { ...rawData },
      errors: result.error.flatten().fieldErrors,
    };
  }

  const id = Date.now().toString();
  const dateNow = Date.now();

  try {
    // TODO: query db for a product with the title that is entered in the form. If the title is already present in the DB, return an error and tell the user that product already exists

    await setDoc(doc(db, collections.products, id), {
      title: result.data.title,
      description: result.data.description,
      category: result.data.category,
      meta: {
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    });

    return {
      success: true,
      message: 'The product is created successfully',
      data: { id, ...result.data },
    };
  } catch (err) {
    console.error('Error adding a new product to Firebase', err);
    return {
      success: false,
      message: 'Failed creating a new product in the database',
      inputs: { ...rawData },
    };
  }
}
