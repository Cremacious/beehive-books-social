import React from 'react';
import Sidebar from './Sidebar';
import { NotificationDropdown } from './NotificationDropdown';

const MobileHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-[#252525] border-b border-[#FFC300]/20 md:hidden sticky top-0 z-30 shadow-xl">
      <NotificationDropdown />

      <h1 className="text-xl font-bold text-[#FFC300] tracking-tight">
        Beehive Books
      </h1>
      <div className="flex space-x-4">
        <Sidebar />
      </div>
    </header>
  );
};

export default MobileHeader;
