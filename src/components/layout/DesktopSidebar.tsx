'use client';

import { Home, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { getUserByIdAction } from '@/actions/user.actions';
import { useSession } from '@/lib/auth-client';
import newLogo from '@/assets/logo-trim3.png'

const DesktopSidebar = () => {
  const currentUser = useSession()
  const userId = currentUser.data?.user?.id;
  const pathname = usePathname();
  const [user, setUser] = useState<{
    id: string;
    name: string;
    image?: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof userId === 'string') {
          const data = await getUserByIdAction(userId);
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Books', href: '/my-books' },
    { name: 'Friends', href: '/friends' },
    { name: 'Book Clubs', href: '/book-clubs' },
    { name: 'Reading Lists', href: '/reading-lists' },
    { name: 'Writing Prompts', href: '/prompts' },
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: `/profile/${userId}` },
  ];

  return (
    <div className="hidden md:flex w-80 bg-[#252525] flex-col p-6 shadow-xl space-y-8 h-screen sticky top-0">
      <div className="ml-2">
        {/* <Book size={30} className="transform rotate-12" /> */}
        <Image src={newLogo} alt="Beehive Books Logo" width={200} height={90} />
    
      </div>
      <Link href="/my-books/create">
        <Button
          variant={'beeYellow'}
          className="flex items-center justify-center space-x-2 w-full"
        >
          <Plus size={20} />
          New Book
        </Button>
      </Link>

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
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}
          </div>
          <span className="text-white font-medium">
            {user?.name || 'Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
