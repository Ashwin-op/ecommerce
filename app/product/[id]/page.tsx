'use client';

import { useQuery } from '@tanstack/react-query';
import { CheckCircle2Icon, PlusCircle, Star } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { fetchProduct } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { IProduct } from '@/models/product';
import { useCartStore } from '@/store/cart.store';

export default function Product({ params }: { params: { id: number } }) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<IProduct>({
    queryKey: ['product', params.id],
    queryFn: () => fetchProduct(params.id),
    staleTime: 1000 * 60 * 5,
  });

  const { add: handleAddToCart, products } = useCartStore();

  if (isLoading) {
    return (
      <section className='container max-w-7xl py-8 md:py-12'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <div className='animate-pulse bg-gray-200 h-96 w-full' />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='container max-w-7xl py-8 md:py-12'>
        <div className='mx-auto max-w-2xl lg:max-w-none'>
          <p className='text-center text-gray-700'>An error occurred while fetching the product.</p>
        </div>
      </section>
    );
  }

  return (
    <section className='container max-w-7xl py-8 md:py-12'>
      <div className='mx-auto max-w-2xl lg:max-w-none'>
        <div className='lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8'>
          <div className='px-12'>
            <Carousel className='w-full'>
              <CarouselContent>
                {product?.images.map((image, index) => (
                  <CarouselItem key={index} className='content-center'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <Image
                          src={image}
                          alt={product.title}
                          className='w-full h-full object-cover object-center'
                          width={600}
                          height={600}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900'>{product?.title}</h1>

            <p className='mt-3 text-xl md:text-3xl tracking-tight text-gray-900'>
              ${product?.price}
              {product?.discountPercentage && (
                <span className='ml-2 text-md md:text-xl line-through text-gray-500'>
                  ${Number(product?.price + product?.price * (product?.discountPercentage / 100)).toFixed()}
                </span>
              )}
            </p>

            <div className='mt-3 flex items-center'>
              <div className='flex items-center'>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    className={cn(
                      (product?.rating || 0) > rating ? 'text-indigo-500' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    fill='currentColor'
                  />
                ))}
              </div>
            </div>

            <p className='mt-6 space-y-6 text-base text-gray-700'>{product?.description}</p>

            {products.find((p) => p.product?.id === product?.id) ? (
              <p className='mt-4 text-sm text-gray-500'>This product is already in your cart.</p>
            ) : (
              <Button
                className='mt-6'
                onClick={() => {
                  if (!product) return;
                  handleAddToCart(product);
                  toast(`Added ${product.title} to cart!`, {
                    icon: <CheckCircle2Icon className='w-5 h-5 text-green-500' />,
                  });
                }}
              >
                Add to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
