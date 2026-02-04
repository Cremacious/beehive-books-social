'use client';
import { createContext, useContext, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  bio: string | null;
  createdAt: string;
};

const mockUser: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  image: null,
  bio: 'This is a demo account to showcase the features of Beehive Books Social.',
  createdAt: new Date().toISOString(),
};

const UserContext = createContext<User>(mockUser);

export const DemoUserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.Provider value={mockUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
