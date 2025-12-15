import React from 'react';
// import MyBooks from './components/MyBooks';
// import DashboardNotifications from './components/DashboardNotifications';
// import FriendActivity from './components/FriendActivity';
// import WritingStats from './components/WritingStats';
import BookClubs from './components/BookClubs';
import WritingPrompts from './components/WritingPrompts';
import ReadingList from './components/ReadingList';
// import Achievements from './components/Achievements';
import QuickActions from './components/QuickActions';
import NewPage from '@/components/layout/NewPage';

export default async function DashboardPage() {
  return (
    <NewPage>
      <div className="space-y-8">
        <div className="flex w-full">
          <QuickActions />
        </div>

        {/* <MyBooks /> */}

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardNotifications />
          <FriendActivity />
        </div> */}

        <BookClubs />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReadingList />
          <WritingPrompts />
          {/* <Achievements /> */}
        </div>
      </div>
    </NewPage>
  );
}
