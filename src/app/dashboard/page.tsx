import React from 'react';
import MyBooks from './components/MyBooks';
import DashboardNotifications from './components/DashboardNotifications';
import FriendActivity from './components/FriendActivity';
import NewPage from '@/components/layout/NewPage';

export default function DashboardPage() {
  return (
    <NewPage>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <div className="col-span-3 flex-1 min-h-[400px] flex flex-col">
          <MyBooks />
        </div>
        <div className="flex flex-col gap-8 flex-1 min-h-[400px] ">
          <DashboardNotifications />
          <FriendActivity />
        </div>
      </div>
    </NewPage>
  );
}
