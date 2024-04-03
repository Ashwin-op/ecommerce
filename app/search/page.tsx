'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import SearchResults from '@/components/search/results';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronsUpDown } from 'lucide-react';

export default function Search() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const q = searchParams.get('q');

  const [inputValue, setInputValue] = useState(q || '');
  const [open, setOpen] = useState(false);

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        { value: 'smartphones', label: 'Smartphones' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'fragrances', label: 'Fragrances' },
        { value: 'skincare', label: 'Skincare' },
        { value: 'groceries', label: 'Groceries' },
        { value: 'home-decoration', label: 'Home Decoration' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'tops', label: 'Tops' },
        { value: 'womens-dresses', label: "Women's Dresses" },
        { value: 'womens-shoes', label: "Women's Shoes" },
        { value: 'mens-shirts', label: "Men's Shirts" },
        { value: 'mens-shoes', label: "Men's Shoes" },
        { value: 'mens-watches', label: "Men's Watches" },
        { value: 'womens-watches', label: "Women's Watches" },
        { value: 'womens-bags', label: "Women's Bags" },
        { value: 'womens-jewellery', label: "Women's Jewellery" },
        { value: 'sunglasses', label: 'Sunglasses' },
        { value: 'automotive', label: 'Automotive' },
        { value: 'motorcycle', label: 'Motorcycle' },
        { value: 'lighting', label: 'Lighting' },
      ],
    },
  ];

  return (
    <section className='container max-w-7xl'>
      <div className='border-b border-gray-200 pb-10 pt-24'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-900'>New Arrivals</h1>
        <p className='mt-4 text-base text-gray-500'>
          Checkout out the latest release of our items, new and improved with the latest technology and design.
        </p>
      </div>

      <div className='pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4'>
        <aside>
          <p className='text-xl font-medium text-gray-900 mb-4'>Filters</p>
          <form className='mb-6 mt-4' onSubmit={() => push(`/search?q=${inputValue}`)}>
            <Input
              className='w-full bg-white'
              placeholder='Search products'
              name='q'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </form>

          <form className='hidden lg:block'>
            {filters.map((section, sectionIdx) => (
              <div key={section.name + category} className={sectionIdx === 0 ? undefined : 'pt-10'}>
                <fieldset>
                  <legend className='block text-lg font-medium text-gray-900 mb-4'>{section.name}</legend>
                  <RadioGroup defaultValue={category || ''}>
                    {section.options.map((option, optionIdx) => (
                      <Link
                        key={option.value}
                        className='flex items-center space-x-3 py-0.5 text-gray-600 hover:text-gray-900'
                        href={`/search?category=${option.value}`}
                      >
                        <RadioGroupItem value={option.value} id={`${section.id}-${optionIdx}`} />
                        <Label htmlFor={`${section.id}-${optionIdx}`} className='font-normal cursor-pointer'>
                          {option.label}
                        </Label>
                      </Link>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            ))}
          </form>

          <form className='lg:hidden'>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button className='justify-between w-full bg-white text-gray-500'>
                  {category ? <>{category}</> : <>Filter by category</>}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-75' />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className='mt-4 border-t'>
                  <Command className='pt-4'>
                    <CommandInput placeholder='Search categories...' />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      {filters.map((section, sectionIdx) => (
                        <div key={section.name + sectionIdx}>
                          <CommandGroup heading={section.name}>
                            {section.options.map((option) => (
                              <CommandItem
                                key={option.value + category}
                                value={option.value}
                                onSelect={(value) => {
                                  push(`/search?category=${value}`);
                                  setOpen(false);
                                }}
                              >
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          {sectionIdx < filters.length - 1 ? (
                            <CommandSeparator key={section.name + sectionIdx} />
                          ) : null}
                        </div>
                      ))}
                    </CommandList>
                  </Command>
                </div>
              </DrawerContent>
            </Drawer>
          </form>
        </aside>

        <SearchResults />
      </div>
    </section>
  );
}
