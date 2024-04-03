import { IProduct } from '@/models/product';
import Image from 'next/image';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function ProductVerticalCard({ product }: { product: IProduct }) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className='hover:shadow-lg transition-shadow duration-300 overflow-hidden'>
        <CardHeader className='p-0 mb-6 aspect-w-3 aspect-h-4 h-80'>
          <Image src={product.images[0]} alt={product.title} width={200} height={200} className='w-full object-cover' />
        </CardHeader>
        <CardContent>
          <CardTitle className='line-clamp-1 tracking-normal leading-snug'>{product.title}</CardTitle>
          <CardDescription className='line-clamp-2 mt-2'>{product.description}</CardDescription>
        </CardContent>
        <CardFooter>
          <p className='text-lg font-medium text-gray-900'>
            ${product.price}
            {product.discountPercentage && (
              <span className='ml-2 text-sm line-through text-gray-500'>
                ${Number(product.price + product.price * (product.discountPercentage / 100)).toFixed()}
              </span>
            )}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
