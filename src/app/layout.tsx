import type { Metadata } from 'next';
import '@/styles/globals.scss';
import Navbar from '@/shared/components/Navbar';
import { CartProvider } from '@/shared/context/CartContext';
import { LoadingProvider } from '@/shared/context/LoadingContext';

export const metadata: Metadata = {
  title: 'Napptilus Technical Test - Phones Catalog',
  description: 'A catalog of phones built with Next.js, TypeScript, and SCSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container">
        <CartProvider>
          <LoadingProvider>
            <Navbar />
            {children}
          </LoadingProvider>
        </CartProvider>
      </body>
    </html>
  );
}
