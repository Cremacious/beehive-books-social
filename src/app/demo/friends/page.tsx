'use client';

import NewPage from '@/components/layout/NewPage';
import FriendsList from '@/app/(user)/friends/components/FriendsList';
import FriendRequests from '@/app/(user)/friends/components/FriendRequests';
import SearchFriends from '@/app/(user)/friends/components/SearchFriends';
import RecommendedFriends from '@/app/(user)/friends/components/RecommendedFriends';
import FriendActivity from '@/app/(user)/friends/components/FriendActivity';

const mockFriends = [
  {
    id: 'friend1',
    name: 'Alice Johnson',
    image: null,
    bio: 'Avid reader and aspiring novelist.',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: 'friend2',
    name: 'Bob Smith',
    image: null,
    bio: 'Book club enthusiast and poetry lover.',
    createdAt: new Date('2023-02-01'),
  },
];

const mockRecommendations = [
  {
    id: 'rec1',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    mutualFriendsCount: 2,
  },
  {
    id: 'rec2',
    name: 'Diana Prince',
    email: 'diana@example.com',
    mutualFriendsCount: 1,
  },
];

const mockActivities = [
  {
    id: 'activity1',
    name: 'Alice Johnson',
    activityTime: '2 hours ago',
    recentActivity: 'Published a new chapter in "Mystery at Midnight"',
  },
  {
    id: 'activity2',
    name: 'Bob Smith',
    activityTime: '5 hours ago',
    recentActivity: 'Completed the prompt "Lost in Time"',
  },
];

const DemoFriendsPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 space-y-6">
            <FriendRequests />
            <div className="darkContainer2 rounded-2xl shadow-xl p-2">
              <SearchFriends />
              <RecommendedFriends recommendations={mockRecommendations} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <FriendActivity activities={mockActivities} />

            <FriendsList friends={mockFriends} />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default DemoFriendsPage;
