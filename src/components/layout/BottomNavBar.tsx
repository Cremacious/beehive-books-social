'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import dashIcon from '@/assets/icons/dashboard.png';
import myBooksIcon from '@/assets/icons/my-books.png';
// import friendIcon from '@/assets/icons/friends.png';
import pencilIcon from '@/assets/icons/pencil.png';
import listIcon from '@/assets/icons/list.png';
import clubIcon from '@/assets/icons/hive.png';
// import userIcon from '@/assets/icons/user.png';
// import { useSession } from '@/lib/auth-client';

const BottomNavBar = () => {
  // const currentUser = useSession();
  // const userId = currentUser.data?.user?.id;
  const pathname = usePathname();

  const navLinks = [
    { name: 'My Books', href: '/my-books', icon: myBooksIcon },
    // { name: 'Friends', href: '/friends', icon: friendIcon },
    { name: 'Book Clubs', href: '/book-clubs', icon: clubIcon },
    { name: 'Dashboard', href: '/dashboard', icon: dashIcon },
    { name: 'Reading Lists', href: '/reading-lists', icon: listIcon },
    { name: 'Writing Prompts', href: '/prompts', icon: pencilIcon },
    // { name: 'Profile', href: `/profile/${userId}`, icon: userIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#252525] flex justify-around items-center shadow-2xl z-50 md:hidden">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.name === 'Profile' && pathname.startsWith('/profile'));
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex flex-col items-center justify-center space-y-0.5 transition-colors duration-200"
          >
            <div
              className={`flex flex-col items-center justify-center space-y-0.5 ${
                isActive ? 'text-[#FFC300]' : 'text-gray-400'
              }`}
            >
              <Image
                src={link.icon}
                alt={link.name}
                width={22}
                height={22}
                className="w-5.5 h-5.5"
              />
              <span
                className={`text-[10px] ${isActive ? 'font-semibold' : ''}`}
              >
                {link.name === 'Writing Prompts'
                  ? 'Prompts'
                  : link.name === 'Book Clubs'
                  ? 'Clubs'
                  : link.name === 'Reading Lists'
                  ? 'Lists'
                  : link.name}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
