'use client';

import { BookOpen, Heart, MessageCircle, Users, UsersIcon } from 'lucide-react';
import FriendCard from '../../../../components/shared/FriendCard';

interface FriendsListProps {
  friends: {
    id: string;
    name: string;
    bio?: string;
  }[];
}

const FriendsList = ({ friends }: FriendsListProps) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        My Friends <span className="yellowBadge h-7 w-7">{friends.length}</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {friends.map((friend) => (
          <FriendCard
            key={friend.id}
            id={friend.id}
            name={friend.name}
            bio={friend.bio}
          />
        ))}
      </div>
    </div>
  );
};
export default FriendsList;
