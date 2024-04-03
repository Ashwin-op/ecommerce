'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import ProductVerticalCard from '@/components/product/vertical-card';
import { fetchProducts, fetchProductsByCategory, fetchProductsByQuery } from '@/lib/queries';
import { IProduct, IProducts } from '@/models/product';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const q = searchParams.get('q');

  const {
    data: initialProducts,
    isLoading,
    error,
  } = useQuery<IProducts>({
    queryKey: ['products', category],
    queryFn: () => {
      if (category) {
        return fetchProductsByCategory(category);
      }
      if (q) {
        return fetchProductsByQuery(q);
      }
      return fetchProducts(10);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <section className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'>
        <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className='animate-pulse bg-gray-200 aspect-w-3 aspect-h-5' />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'>
        <p className='text-lg text-gray-500'>An error occurred while fetching products.</p>
      </section>
    );
  }

  return (
    <section className='mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3'>
      <div className='grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3'>
        {initialProducts?.products?.map((product: IProduct) => (
          <ProductVerticalCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
