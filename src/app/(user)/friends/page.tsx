import NewPage from '@/components/layout/NewPage';
import FriendsList from './components/FriendsList';
import FriendRequests from './components/FriendRequests';
import SearchFriends from './components/SearchFriends';
import RecommendedFriends from './components/RecommendedFriends';
import FriendActivity from './components/FriendActivity';

import {
  getPendingFriendRequestsAction,
  getAllUserFriendsAction,
  getRecommendedFriendsAction,
  getFriendActivitiesAction,
} from '@/actions/friend.actions';

const FriendsPage = async () => {
  const pendingRequests = await getPendingFriendRequestsAction();
  const friends = await getAllUserFriendsAction();
  const recommendations = await getRecommendedFriendsAction();
  const activities = await getFriendActivitiesAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <FriendRequests pendingRequests={pendingRequests} />
            <div className="darkContainer2 rounded-2xl shadow-xl p-2">
              <SearchFriends />
              <RecommendedFriends recommendations={recommendations} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <FriendActivity activities={activities} />

            <FriendsList friends={friends} />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default FriendsPage;
