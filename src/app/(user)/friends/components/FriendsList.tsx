import { Users,  } from 'lucide-react';
import FriendCard from '../../../../components/shared/FriendCard';

interface FriendsListProps {
  friends: {
    id: string;
    name: string;
    bio?: string | null;
  }[];
}

const FriendsList = ({ friends }: FriendsListProps) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:min-h-[610px]">
      <h2 className="text-2xl mainFont  text-yellow-400 mb-4 flex items-center gap-2">

        My Friends <span className="yellowBadge h-7 w-7">{friends.length}</span>
      </h2>
      {friends.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="iconCircle">
            <Users className="w-24 h-24 text-[#FFC300]" />
          </div>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
            No Friends Yet
          </h3>
          <p className="text-white/70 mb-8 max-w-md leading-relaxed">
            Start building your writing community! Search for other writers and
            send friend requests to connect and share your work.
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
};
export default FriendsList;
