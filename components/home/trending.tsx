'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import ProductVerticalCard from '@/components/product/vertical-card';
import { fetchProducts } from '@/lib/queries';
import { IProduct, IProducts } from '@/models/product';
import { Button } from '@/components/ui/button';

export default function Trending() {
  const {
    data: trendingProducts,
    isLoading,
    isError,
  } = useQuery<IProducts>({
    queryKey: ['trending-products'],
    queryFn: () => fetchProducts(4, Math.floor(Math.random() * 20)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <section className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Trending Products</h2>
        <div className='mt-6 animate-pulse grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='bg-gray-200 rounded-md aspect-w-3 aspect-h-5' />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>Trending Products</h2>
        <p className='mt-6 text-lg text-gray-500'>An error occurred while fetching the products.</p>
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:pt-32'>
      <div className='md:flex md:items-center md:justify-between'>
        <h2 id='favorites-heading' className='text-2xl font-bold tracking-tight text-gray-900'>
          Trending Products
        </h2>
        <Link href='/search' className='hidden md:block'>
          <Button variant='link'>
            Shop the collection
            <span>&nbsp;&rarr;</span>
          </Button>
        </Link>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8'>
        {trendingProducts?.products?.map((product: IProduct) => (
          <ProductVerticalCard key={product.id} product={product} />
        ))}
      </div>

      <Link href='/search' className='block md:hidden mt-8'>
        <Button variant='link'>
          Shop the collection
          <span>&nbsp;&rarr;</span>
        </Button>
      </Link>
    </section>
  );
}
