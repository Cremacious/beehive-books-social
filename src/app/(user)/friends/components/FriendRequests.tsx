'use client';

import { Check, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const friendRequests: friendRequestType = [
  {
    id: 1,
    name: 'Sarah Chen',
    username: 'sarahwrites',
    avatar: null,
    mutualFriends: 3,
    genres: ['Mystery', 'Thriller'],
    bio: 'Mystery novelist working on my third book',
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    username: 'mikereads',
    avatar: null,
    mutualFriends: 1,
    genres: ['Sci-Fi', 'Fantasy'],
    bio: 'Beta reader and book blogger',
  },
];

type friendRequestType = {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
  mutualFriends: number;
  genres: string[];
  bio: string;
}[];

// const friendRequests: friendRequestType = [];

const FriendRequests = () => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5" />
        Friend Requests
      </h2>

      <div className="mb-6">
        {friendRequests.length > 0 ? (
          <div className="space-y-3">
            {friendRequests.map((request) => (
              <div key={request.id} className="darkContainer3 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-400 font-semibold">
                      {request.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">
                      {request.name}
                    </h4>
                    <p className="text-white/60 text-sm">
                      {request.mutualFriends} mutual friends
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    size={'sm'}
                    variant={'beeYellow'}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Accept
                  </Button>
                  <Button
                    size={'sm'}
                    className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a1a1a] rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-yellow-400" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              No Incoming Requests
            </h4>
            <p className="text-white/60 text-sm mb-4">
              When writers want to connect with you, their requests will appear
              here.
            </p>
            <button className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 py-2 px-4 rounded-lg font-medium transition-colors">
              Find Writers to Follow
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default FriendRequests;
