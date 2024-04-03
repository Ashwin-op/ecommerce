'use client';

import { Package2, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { useCartStore } from '@/store/cart.store';

export default function Navbar() {
  const count = useCartStore((state) => state.products.length);

  return (
    <header className='container max-w-7xl'>
      <div className='flex h-16 items-center justify-between'>
        <div className='hidden lg:flex lg:flex-1 lg:items-center'>
          <Link href='/'>
            <Package2 className='h-8 w-8' />
          </Link>
        </div>

        <div className='flex flex-1 items-center lg:hidden'>
          <Link href='/search' className='ml-2 p-2 text-gray-400 hover:text-gray-500'>
            <Search className='h-6 w-6' />
          </Link>
        </div>

        <Link href='/' className='lg:hidden'>
          <Package2 className='h-8 w-8' />
        </Link>

        <div className='flex flex-1 items-center justify-end'>
          <Link href='/search' className='hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block'>
            Search
          </Link>

          <div className='flex items-center lg:ml-4'>
            <div className='ml-2 flow-root lg:ml-4'>
              <Link href='/cart' className='group -m-2 flex items-center p-2'>
                <ShoppingBag className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500' />
                <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>{count}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
