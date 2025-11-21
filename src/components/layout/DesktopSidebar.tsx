'use client';

import { Book, Home, Plus } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import Image from 'next/image';

const userData = {
  name: 'Chris Mackall',
  totalBooks: 6,
};

const navLinks = [
  { name: 'Home', href: '/dashboard' },
  { name: 'My Books', href: '/my-books' },
  { name: 'Friends', href: '/friends' },
  { name: 'Discover', href: '#' },
  { name: 'Book Clubs', href: '#' },
  { name: 'Settings', href: '#' },
];

const DesktopSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-80 bg-[#252525] flex-col p-6 shadow-xl space-y-8 h-screen sticky top-0">
      <div className="flex items-center space-x-2 text-[#FFC300] text-2xl font-bold">
        {/* <Book size={30} className="transform rotate-12" /> */}
        <Image src={logoImg} alt="Beehive Books Logo" width={60} height={60} />
        <span>Beehive Books</span>
      </div>

      <button
        className="px-6 py-3 bg-[#FFC300] text-[#1E3A4B] font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition duration-150 flex items-center justify-center space-x-2"
        onClick={() => router.push('/my-books/create')}
      >
        <Plus size={20} />
        <span>New Book</span>
      </button>

      <nav className="space-y-4 pt-4">
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-4 p-2 rounded-lg transition ${
              pathname === item.href
                ? 'bg-[#1b1b1b] text-[#FFC300]'
                : 'text-white hover:bg-[#1b1b1b]'
            }`}
          >
            <Home size={20} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
            A
          </div>
          <span className="text-white font-medium">{userData.name}</span>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
