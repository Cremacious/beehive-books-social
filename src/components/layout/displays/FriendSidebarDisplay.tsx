'use client';

import { useQuery } from '@tanstack/react-query';
import FriendRequests from '@/app/(user)/friends/components/FriendRequests';
import SearchFriends from '@/app/(user)/friends/components/SearchFriends';
import RecommendedFriends from '@/app/(user)/friends/components/RecommendedFriends';
import FriendActivity from '@/app/(user)/friends/components/FriendActivity';
import FriendsList from '@/app/(user)/friends/components/FriendsList';
import {
  getAllUserFriendsAction,
  getRecommendedFriendsAction,
  getFriendActivitiesAction,
} from '@/actions/friend.actions';

// type Friend = {
//   id: string;
//   name: string;
//   email: string;
//   bio: string | null;
// };

// type Recommendation = {
//   id: string;
//   name: string;
//   mutualFriendsCount: number;
// };

// type Activity = {
//   id: string;
//   name: string;
//   activityTime: string;
//   recentActivity: string;
// };

const FriendSidebarDisplay = () => {
  const { data: friends } = useQuery({
    queryKey: ['friends'],
    queryFn: getAllUserFriendsAction,
    staleTime: 5 * 60 * 1000,
  });

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: getRecommendedFriendsAction,
    staleTime: 5 * 60 * 1000,
  });

  const { data: activities } = useQuery({
    queryKey: ['activities'],
    queryFn: getFriendActivitiesAction,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
      <FriendRequests />
      <div className="darkContainer2 rounded-2xl shadow-xl p-2">
        <SearchFriends />
        <RecommendedFriends recommendations={recommendations || []} />
      </div>
      <FriendActivity activities={activities || []} />
      <FriendsList friends={friends || []} />
    </div>
  );
};

export default FriendSidebarDisplay;