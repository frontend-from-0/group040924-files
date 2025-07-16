interface Product {
  id: string;
  title: string;
}

export default async function Home() {
  let products = [];

  const res = await fetch('https://dummyjson.com/producst');
  if (!res.ok) throw Error('Failed fetching products');
  const data = await res.json();
  products = data.products;

  return (
    <main>
      <h1 className='text-center m-12'>Ecom website</h1>
      {products.map((product: Product) => {
        return <h2 key={product.id}>{product.title}</h2>;
      })}
    </main>
  );
}
