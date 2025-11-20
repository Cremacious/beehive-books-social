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
        className={`antialiased min-h-screen bg-[#FFC300] flex flex-col md:flex-row font-sans`}
      >
        <MobileHeader />
        <DesktopSidebar />
        <div className="w-full mx-auto max-w-md lg:max-w-7xl p-2 md:p-4 flex flex-col items-center grow justify-center">
          {children}
        </div>
        <BottomNavBar />
      </div>
    </>
  );
}
