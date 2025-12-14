'use client';
import { getUserByIdAction } from '@/actions/user.actions';
import { useSession } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const UserSidebarDisplay = () => {
  const currentUser = useSession();
  const userId = currentUser.data?.user?.id;
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

  return (
    <div className="flex items-center gap-3 p-2">
      <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="w-12 h-12 animate-pulse bg-[#FFC300]/10 rounded-full flex items-center justify-center text-yellow-400">
            {' '}
          </div>
        )}
      </div>
      <div className="flex flex-col">
        {user?.name ? (
          <p className="text-white text-xl mainFont">{user.name}</p>
        ) : (
          <div className="bg-[#FFC300]/10 h-8 w-28 rounded-2xl animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default UserSidebarDisplay;