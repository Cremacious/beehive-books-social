import React from 'react';
import Sidebar from './Sidebar';
import { NotificationDropdown } from './NotificationDropdown';
import logo from '@/assets/slim-logo.png';
import Image from 'next/image';

const MobileHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-[#252525] border-b border-[#FFC300]/20 md:hidden sticky top-0 z-30 shadow-xl">
      <NotificationDropdown />
      <Image src={logo} alt="Beehive Books Logo" width={120} height={40} />

      <div className="flex space-x-4">
        <Sidebar />
      </div>
    </header>
  );
};

export default MobileHeader;
