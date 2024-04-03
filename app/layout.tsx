import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { Provider } from '@/components/provider';
import { Toaster } from '@/components/ui/sonner';
import { Wrapper } from '@/components/wrapper';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Ecommerce Inc',
  description: 'The best place to buy products online.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Provider>
          <section className='flex flex-col h-auto w-full'>
            <Wrapper>
              <Suspense>{children}</Suspense>
            </Wrapper>
          </section>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
