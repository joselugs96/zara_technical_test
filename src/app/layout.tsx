import type { Metadata } from 'next';
import '@/styles/globals.scss';
import { CartProvider } from '@/shared/context/CartContext';

export const metadata: Metadata = {
  title: 'Zara Technical Test - Phones Catalog',
  description: 'A catalog of phones built with Next.js, TypeScript, and SCSS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
