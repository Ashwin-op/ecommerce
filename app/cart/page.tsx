'use client';

import { Check, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export default function Page() {
  const {
    products,
    total,
    add: handleAddToCart,
    remove: handleRemoveFromCart,
  } = useCartStore((state) => ({
    products: state.products,
    total: state.products.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0),
    remove: state.remove,
    add: state.add,
  }));

  return (
    <section className='container max-w-3xl sm:pt-16 lg:px-8'>
      <h1 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>

      <div className='mt-12'>
        {products.length ? (
          <ul role='list' className='divide-y divide-gray-200 border-b border-t border-gray-200'>
            {products.map(({ product, quantity }) => (
              <li key={product.id} className='flex py-6'>
                <div className='flex-shrink-0'>
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className='h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32'
                    width={96}
                    height={96}
                  />
                </div>

                <div className='ml-4 flex flex-1 flex-col sm:ml-6'>
                  <div>
                    <div className='flex justify-between'>
                      <h4 className='text-lg'>
                        <Link href={`/product/${product.id}`} className='font-medium text-gray-700 hover:text-gray-800'>
                          {product.title}
                        </Link>
                      </h4>
                      <div className='ml-4 text-sm font-medium text-gray-900 flex items-center gap-2'>
                        <span>${product.price}</span>
                        <div className='text-gray-500 flex items-center'>
                          <span className='mr-1'>x</span>
                          <Input
                            type='number'
                            defaultValue={quantity}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10);
                              if (value >= 0 && value <= product.stock) {
                                if (value > quantity) {
                                  handleAddToCart(product, value - quantity);
                                } else if (value < quantity) {
                                  handleRemoveFromCart(product.id, quantity - value);
                                }
                              }
                            }}
                            className='w-16 h-8 text-center'
                            max={product.stock}
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                    <p className='mt-1 text-sm text-gray-500'>{product.brand}</p>
                  </div>

                  <div className='mt-4 flex flex-1 items-end justify-between'>
                    <p className='flex items-center space-x-2 text-sm text-gray-700'>
                      {product.stock ? (
                        <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                      ) : (
                        <Clock className='h-5 w-5 flex-shrink-0 text-gray-300' />
                      )}

                      <span>{product.stock ? `${product.stock} in stock` : 'Will be available in 7 days'}</span>
                    </p>
                    <Button
                      onClick={() => handleRemoveFromCart(product.id, quantity)}
                      variant='link'
                      className='p-0 h-auto text-red-600'
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {products.length ? (
          <section className='mt-10'>
            <div>
              <dl className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <dt className='text-base font-medium text-gray-900'>Subtotal</dt>
                  <dd className='ml-4 text-base font-medium text-gray-900'>${total}</dd>
                </div>
              </dl>
              <p className='mt-1 text-sm text-gray-500'>Shipping and taxes will be calculated at checkout.</p>
            </div>

            <Popover>
              <PopoverTrigger className='w-full'>
                <Button className='mt-10 w-full'>Proceed to Checkout</Button>
              </PopoverTrigger>
              <PopoverContent>Not Implemented For Demo</PopoverContent>
            </Popover>

            <div className='mt-6 text-center text-sm text-gray-500'>
              <p>
                or&nbsp;
                <Link href='/' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  Continue Shopping<span>&nbsp;&rarr;</span>
                </Link>
              </p>
            </div>
          </section>
        ) : (
          <div className='mt-6 text-center text-sm text-gray-500'>
            <p className='text-xl mb-4'>Your cart is empty</p>
            <Link href='/' className='font-medium text-indigo-600 hover:text-indigo-500'>
              Continue Shopping<span>&nbsp;&rarr;</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
