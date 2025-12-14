import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import FriendSidebarDisplay from './displays/FriendSidebarDisplay';
import UserSidebarDisplay from './displays/UserSidebarDisplay';

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} className="text-[#FFC300]" />
      </SheetTrigger>
      <SheetContent className="bg-[#1d1d1d] border-0">
        <SheetHeader>
          <UserSidebarDisplay />
        </SheetHeader>
        <FriendSidebarDisplay />

        <SheetFooter className="">
          <Button variant={'beeDark'} type="submit">
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
