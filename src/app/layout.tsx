import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import BottomNavBar from '@/components/layout/BottomNavBar';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileHeader from '@/components/layout/MobileHeader';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Beehive Books - Where Stories Come to Life',
  description:
    'A social platform for writers to share their novels, connect with readers, and build literary communities. Write, read, and discover amazing stories in your digital hive.',
  keywords:
    'writing, novels, books, social media, storytelling, book clubs, writers, readers',
  openGraph: {
    title: 'Beehive Books - Where Stories Come to Life',
    description:
      'Join our literary community to write, share, and discover amazing stories',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased min-h-screen `}
      >
        {children}
      </body>
    </html>
  );
}
