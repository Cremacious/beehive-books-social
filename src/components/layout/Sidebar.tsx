'use client';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CircleX, Menu } from 'lucide-react';
import FriendSidebarDisplay from './displays/FriendSidebarDisplay';
import UserSidebarDisplay from './displays/UserSidebarDisplay';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu size={24} className="text-[#FFC300]" />
      </SheetTrigger>
      <SheetContent className="bg-[#1d1d1d] border-0 [&>button]:hidden">
        <SheetHeader className="flex flex-row gap-2 justify-between items-center p-4">
          <UserSidebarDisplay />
          <button onClick={() => setIsOpen(false)}>
            <CircleX size={30} className="text-yellow-500" />
          </button>
        </SheetHeader>
        <FriendSidebarDisplay />

        <SheetFooter className="">
          <LogoutButton />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
