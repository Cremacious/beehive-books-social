'use client';

import { Home, Settings, LogOutIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from '@/lib/auth-client';
import newLogo from '@/assets/final-logo.png';
import dashIcon from '@/assets/icons/dashboard.png';
import myBooksIcon from '@/assets/icons/my-books.png';
import friendIcon from '@/assets/icons/friends.png';
import pencilIcon from '@/assets/icons/pencil.png';
import listIcon from '@/assets/icons/list.png';
import clubIcon from '@/assets/icons/hive.png';
import userIcon from '@/assets/icons/user.png';
import { NotificationDropdown } from './NotificationDropdown';
import { useUser } from '@/contexts/UserContext';
// import { Button } from '../ui/button';

const DesktopSidebar = () => {
  const currentUser = useSession();
  const userId = currentUser.data?.user?.id;
  const pathname = usePathname();
  const user = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/sign-in');
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: dashIcon },
    { name: 'My Books', href: '/my-books', icon: myBooksIcon },
    { name: 'Friends', href: '/friends', icon: friendIcon },
    { name: 'Book Clubs', href: '/book-clubs', icon: clubIcon },
    { name: 'Reading Lists', href: '/reading-lists', icon: listIcon },
    { name: 'Writing Prompts', href: '/prompts', icon: pencilIcon },
    { name: 'Profile', href: `/profile/${userId}`, icon: userIcon },
  ];

  return (
    <div className="hidden md:flex w-64 lg:w-72 xl:w-80 bg-[#252525] flex-col p-4 lg:p-6 shadow-xl space-y-6 lg:space-y-8 h-screen sticky top-0">
      <div className="ml-2">
        <Image
          src={newLogo}
          alt="Beehive Books Logo"
          width={180}
          height={80}
          className="w-auto h-16 lg:h-20"
        />
      </div>

      <NotificationDropdown />

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
            {item.icon ? (
              <Image
                src={item.icon}
                alt={`${item.name} icon`}
                width={20}
                height={20}
                className="w-5 h-5 mt-0.5"
              />
            ) : (
              <Home size={20} />
            )}
            <span className="font-medium text-sm lg:text-base">
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto ">
        <div className="flex flex-row justify-between items-center">
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
                <div className="w-10 h-10 animate-pulse bg-[#FFC300]/10 rounded-full flex items-center justify-center text-yellow-400">
                  {' '}
                </div>
              )}
            </div>
            <Link href={`/profile/${user?.id}`}>
              <span className="text-white font-medium mainFont hover:text-yellow-500 overflow-hidden text-ellipsis whitespace-nowrap">
                {user?.name || (
                  <div className="bg-[#FFC300]/10 h-8 w-28 rounded-2xl animate-pulse"></div>
                )}
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-4 border-t border-yellow-500/30 "></div>
        <div className="grid grid-cols-2 mt-4 justify-items-center items-center gap-4">
          <Link href="/settings" className=" ">
            <Settings className="text-yellow-500 h-7 w-7 hover:text-yellow-600 hover:transform hover:-translate-y-0.5" />
          </Link>
          <button onClick={handleSignOut}>
            <LogOutIcon className="ml-auto text-yellow-500 h-7 w-7 hover:text-yellow-600 hover:transform hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
