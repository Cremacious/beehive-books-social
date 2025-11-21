import BottomNavBar from '@/components/layout/BottomNavBar';
import DesktopSidebar from '@/components/layout/DesktopSidebar';
import MobileHeader from '@/components/layout/MobileHeader';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className={`antialiased min-h-screen flex flex-col md:flex-row font-sans bg-linear-to-b from-yellow-400 to-yellow-500`}
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
