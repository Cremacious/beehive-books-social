import NewPage from '@/components/layout/NewPage';
import FriendsList from './components/FriendsList';
import FriendRequests from './components/FriendRequests';
import SearchFriends from './components/SearchFriends';
import RecommendedFriends from './components/RecommendedFriends';
import FriendActivity from './components/FriendActivity';

import { getPendingFriendRequestsAction, getAllUserFriendsAction } from '@/actions/friend.actions';

const FriendsPage = async () => {
  const pendingRequests = await getPendingFriendRequestsAction();
  const friends = await getAllUserFriendsAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                My Friends
              </h1>
              <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                Connect with fellow writers and readers in your literary
                community
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <FriendRequests pendingRequests={pendingRequests} />
            <div className="darkContainer2 rounded-2xl shadow-xl p-2">
              <SearchFriends />
              <RecommendedFriends />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <FriendActivity />

            <FriendsList friends={friends} />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default FriendsPage;
