'use client';

import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFriendStore } from '@/stores/useFriendStore';
import { useState } from 'react';

interface RecommendedFriendsProps {
  id: string;
  name: string;
  email: string;
  mutualFriendsCount: number;
}

const RecommendedFriends = ({
  recommendations,
}: {
  recommendations: RecommendedFriendsProps[];
}) => {
  const { sendFriendRequest } = useFriendStore();
  const [sentRequests, setSentRequests] = useState<Set<string>>(new Set());

  const handleSendRequest = async (email: string, id: string) => {
    try {
      await sendFriendRequest(email);
      setSentRequests(prev => new Set(prev).add(id));
    } catch (error) {
      console.error('Failed to send friend request:', error);
    }
  };
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl mainFont text-yellow-400 mb-4 flex items-center gap-2">
        People You Might Know
      </h2>
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white/60 text-sm">
              No recommendations available. Connect with more friends to see
              suggestions!
            </p>
          </div>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.id} className="darkContainer3 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 font-semibold">
                    {rec.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white truncate">
                    {rec.name}
                  </h4>

                  <p className="text-white/60 text-sm">
                    {rec.mutualFriendsCount} mutual friends
                  </p>
                </div>
              </div>
              <Button
                size={'sm'}
                variant={sentRequests.has(rec.id) ? 'beeDark' : 'beeYellow'}
                className="w-full mt-4 flex items-center justify-center gap-2"
                onClick={() => handleSendRequest(rec.email, rec.id)}
                disabled={sentRequests.has(rec.id)}
              >
                <UserPlus className="w-4 h-4" />
                {sentRequests.has(rec.id) ? 'Request Sent' : 'Add Friend'}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default RecommendedFriends;
