import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { LenisScroller } from '@/components/LenisScroller';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Tuku - Coffee',
  description: 'A coffee experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-[#f0f0f0] text-black antialiased selection:bg-orange-500 selection:text-white">
      {/* We will update the bg color to match the sequence later */}
        <LenisScroller />
        {children}
      </body>
    </html>
  );
}
