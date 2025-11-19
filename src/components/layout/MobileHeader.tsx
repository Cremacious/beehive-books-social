import { Bell, Menu, Search } from 'lucide-react';
import React from 'react';

const MobileHeader = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-[#252525] border-b border-[#FFC300]/20 md:hidden sticky top-0 z-30 shadow-xl">
      <Menu size={24} className="text-[#FFC300]" />
      <h1 className="text-xl font-bold text-[#FFC300] tracking-tight">
        Beehive Books
      </h1>
      <div className="flex space-x-4">
        <Search size={24} className="text-[#FFC300]" />
        <Bell size={24} className="text-[#FFC300]" />
      </div>
    </header>
  );
};

export default MobileHeader;
