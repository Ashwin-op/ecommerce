import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero() {
  const collections = [
    {
      name: "Women's",
      href: '/search?category=womens-dresses',
      src: '/images/home-1.jpg',
      alt: 'Woman wearing a comfortable cotton t-shirt.',
    },
    {
      name: "Men's",
      href: '/search?category=mens-shirts',
      src: '/images/home-2.jpg',
      alt: 'Man wearing a comfortable and casual cotton t-shirt.',
    },
    {
      name: 'Furnitures',
      href: '/search?category=furniture',
      src: '/images/home-3.jpg',
      alt: 'Person sitting at a wooden desk with paper note organizer, pencil and tablet.',
    },
  ];

  return (
    <div className='relative'>
      <div className='absolute inset-0 hidden sm:flex sm:flex-col'>
        <div className='relative w-full flex-1 bg-gray-800'>
          <div className='absolute inset-0 overflow-hidden'>
            <Image
              src='/images/hero.png'
              alt='Hero image'
              className='h-full w-full object-cover object-center'
              width='1440'
              height='672'
            />
          </div>
          <div className='absolute inset-0 bg-gray-900 opacity-50' />
        </div>
        <div className='h-32 w-full md:h-40 lg:h-48' />
      </div>

      <div className='relative mx-auto max-w-3xl px-4 pb-96 text-center sm:px-6 sm:pb-0 lg:px-8'>
        <div className='absolute inset-0 flex flex-col sm:hidden'>
          <div className='relative w-full flex-1 bg-gray-800'>
            <div className='absolute inset-0 overflow-hidden'>
              <Image
                src='/images/hero.png'
                alt='Hero image'
                className='h-full w-full object-cover object-center'
                width='1440'
                height='672'
              />
            </div>
            <div className='absolute inset-0 bg-gray-900 opacity-50' />
          </div>
          <div className='h-48 w-full' />
        </div>
        <div className='relative py-32'>
          <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>
            Focus on what matters
          </h1>
          <Link href='/search'>
            <Button className='mt-4 sm:mt-6' size='lg'>
              Shop Collection
            </Button>
          </Link>
        </div>
      </div>

      <section className='relative -mt-96 sm:mt-0'>
        <div className='mx-auto grid max-w-md grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 sm:px-6 lg:gap-x-8 lg:px-8'>
          {collections.map((collection) => (
            <div
              key={collection.name}
              className='group relative h-96 rounded-lg shadow-xl sm:aspect-h-5 sm:aspect-w-4 sm:h-auto'
            >
              <div>
                <div className='absolute inset-0 overflow-hidden rounded-lg'>
                  <div className='absolute inset-0 overflow-hidden group-hover:scale-110 transition-transform duration-500'>
                    <Image
                      src={collection.src}
                      alt={collection.alt}
                      className='h-full w-full object-cover object-center'
                      width='600'
                      height='600'
                    />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50' />
                </div>
                <div className='absolute inset-0 flex items-end rounded-lg p-6'>
                  <div>
                    <p className='text-sm text-white'>Shop the collection</p>
                    <h3 className='mt-1 font-semibold text-white'>
                      <Link href={collection.href}>
                        <span className='absolute inset-0' />
                        {collection.name}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
