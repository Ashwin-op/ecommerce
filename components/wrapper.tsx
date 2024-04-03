import Footer from './home/footer';
import Navbar from './home/navbar';

export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className='min-h-[calc(100vh-184px)]'>{children}</main>
      <Footer />
    </>
  );
}
