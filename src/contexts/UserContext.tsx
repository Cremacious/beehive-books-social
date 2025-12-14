'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useSession } from '@/lib/auth-client';
import { getUserByIdAction } from '@/actions/user.actions';
import { useQuery } from '@tanstack/react-query';

type User =
  | {
      id: string;
      name: string;
      email: string;
      image: string | null;
      bio: string | null;
      createdAt: string;
    }
  | null
  | undefined;

const UserContext = createContext<User>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null;
      const data = await getUserByIdAction(userId);

      const serializedUser = JSON.parse(JSON.stringify(data.user));
      return {
        ...serializedUser,
        createdAt: new Date(serializedUser.createdAt).toISOString(),
      };
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
