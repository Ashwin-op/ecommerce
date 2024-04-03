import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const navigation = [
    {
      name: 'GitHub',
      href: 'https://github.com/Ashwin-op',
      icon: (props: any) => <Github {...props} />,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/bsashwin',
      icon: (props: any) => <Linkedin {...props} />,
    },
  ];

  return (
    <footer className='container max-w-7xl  py-12 md:flex items-center md:justify-between'>
      <div className='flex justify-center space-x-6 md:order-2'>
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className='text-gray-400 hover:text-gray-500'
            rel='noopener noreferrer'
            target='_blank'
          >
            <item.icon className='h-6 w-6' />
          </Link>
        ))}
      </div>
      <div className='mt-8 md:order-1 md:mt-0'>
        <p className='text-center text-xs leading-5 text-gray-500'>
          &copy; {new Date().getFullYear()} Ecommerce Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
