'use client';

import { useEffect, useState } from 'react';
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

type Friend = {
  id: string;
  name: string;
  email: string;
  bio: string | null;
};

type Recommendation = {
  id: string;
  name: string;
  mutualFriendsCount: number;
};

type Activity = {
  id: string;
  name: string;
  activityTime: string;
  recentActivity: string;
};

const FriendSidebarDisplay = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [friendsData, recommendationsData, activitiesData] =
          await Promise.all([
            getAllUserFriendsAction(),
            getRecommendedFriendsAction(),
            getFriendActivitiesAction(),
          ]);
        setFriends(friendsData);
        setRecommendations(recommendationsData);
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching friends data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-6 max-h-[80vh] overflow-y-auto">
      <FriendRequests />
      <div className="darkContainer2 rounded-2xl shadow-xl p-2">
        <SearchFriends />
        <RecommendedFriends recommendations={recommendations} />
      </div>
      <FriendActivity activities={activities} />
      <FriendsList friends={friends} />
      
    </div>
  );
};

export default FriendSidebarDisplay;
