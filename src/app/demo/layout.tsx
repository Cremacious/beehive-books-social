'use client';

import BottomNavBar from '@/components/layout/BottomNavBar';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { DemoUserProvider } from './DemoUserProvider';

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DemoUserProvider>
        <div
          className={`antialiased min-h-screen flex flex-col md:flex-row font-sans bg-[#303030]`}
        >
          <MobileHeader />
          <DesktopSidebar />
          <div className="w-full mx-auto max-w-screen-2xl p-2 md:p-6 lg:p-8 flex flex-col items-center grow justify-center">
            {children}
          </div>
          <BottomNavBar />
        </div>
      </DemoUserProvider>
    </QueryClientProvider>
  );
}