import BottomNavBar from '@/components/layout/BottomNavBar';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileHeader from '@/components/layout/MobileHeader';
import { getCurrentServerUser } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentServerUser();
  if (!user) {
    redirect('/sign-in');
  }
  return (
    <>
      <div
        className={`antialiased min-h-screen flex flex-col md:flex-row font-sans bg-[#303030]`}
      >
        <MobileHeader />
        <DesktopSidebar />
        <div className="w-full mx-auto max-w-screen-2xl p-2 md:p-8 flex flex-col items-center grow justify-center">
          {children}
        </div>
        <BottomNavBar />
      </div>
    </>
  );
}
