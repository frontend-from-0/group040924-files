
export default async function ProductDetails() {

  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  if (data) return <h1 className='text-center m-12'>ProductDetails</h1>;
}
