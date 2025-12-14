'use client';

import { Home, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserByIdAction } from '@/actions/user.actions';
import { useSession } from '@/lib/auth-client';
import newLogo from '@/assets/final-logo.png';
import dashIcon from '@/assets/icons/dashboard.png';
import myBooksIcon from '@/assets/icons/my-books.png';
import friendIcon from '@/assets/icons/friends.png';
import pencilIcon from '@/assets/icons/pencil.png';
import listIcon from '@/assets/icons/list.png';
import clubIcon from '@/assets/icons/hive.png';
import userIcon from '@/assets/icons/user.png';
import { NotificationDropdown } from './NotificationDropdown';

const DesktopSidebar = () => {
  const currentUser = useSession();
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
    { name: 'Dashboard', href: '/dashboard', icon: dashIcon },
    { name: 'My Books', href: '/my-books', icon: myBooksIcon },
    { name: 'Friends', href: '/friends', icon: friendIcon },
    { name: 'Book Clubs', href: '/book-clubs', icon: clubIcon },
    { name: 'Reading Lists', href: '/reading-lists', icon: listIcon },
    { name: 'Writing Prompts', href: '/prompts', icon: pencilIcon },
    { name: 'Profile', href: `/profile/${userId}`, icon: userIcon },
  ];

  return (
    <div className="hidden md:flex w-80 bg-[#252525] flex-col p-6 shadow-xl space-y-8 h-screen sticky top-0">
      <div className="ml-2">
        {/* <Book size={30} className="transform rotate-12" /> */}
        <Image src={newLogo} alt="Beehive Books Logo" width={200} height={90} />
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
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto pt-6 border-t border-yellow-500/30 ">
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
          <Link href="/settings">
            <Settings className="text-yellow-500 h-7 w-7 hover:text-yellow-600 hover:transform hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;

// I want to create a rich text editor for writing. I want it to support basic formatting options like bold, italic, underline, headings, lists, and links. The editor should have a clean and user-friendly interface that matches the dark style of the website, with a toolbar for formatting options. It should also support keyboard shortcuts for common actions. The editor will replace a textarea in multiple different components across the site. This includes CreatePromptReplyForm, CreateChapterForm, and EditChapterForm. On chapter forms it will replace the "Content" textarea.  Look at my version of Next.js and Tailwind CSS to ensure compatibility. I am also using TypeScript.
