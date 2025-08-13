import Image from 'next/image';
import { BuyButton } from './BuyButton';

interface Product {
  id: string;
  title: string;
  thumbnail: string;
}

interface SuccessProps {
  searchParams: Promise<{
    canceled?: string;
  }>;
}

export default async function Home({ searchParams }: SuccessProps) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.',
    );
  }

  let products = [];

  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) throw Error('Failed fetching products');
  const data = await res.json();
  products = data.products;

  return (
    <main>
      <div className='px-40 flex flex-1 justify-center py-5'>
        <div className='layout-content-container flex flex-col max-w-[960px] flex-1'>
          <div className='flex flex-wrap justify-between gap-3 p-4'>
            <h2 className='text-[#0d141c] tracking-light text-[32px] font-bold leading-tight min-w-72'>
              Featured Products
            </h2>
          </div>

          <div className='grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4'>
            {products.map((product: Product) => {
              return (
                <div key={product.id} className='flex flex-col gap-3 pb-3'>
                  <div className='w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg'>
                    <Image
                      width={200}
                      height={200}
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </div>
                  <div>
                    <h3 className='text-[#0d141c] text-base font-medium leading-normal'>
                      {product.title}
                    </h3>
                    <BuyButton productId={product.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
