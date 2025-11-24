'use client';

import { BookOpen, Heart, MessageCircle, Users, UsersIcon } from 'lucide-react';
import FriendCard from '../../../../components/shared/FriendCard';

// Friends need id, name, bio, and image

const friends = [
  {
    id: 1,
    name: 'Anya Sharma',
    username: 'anyawrites',
    avatar: null,
    status: 'online',
    lastSeen: null,
    genres: ['Romance', 'Contemporary'],
    currentBook: 'Whispers of the Heart',
    bookClubs: ['Romance Writers Hive', 'Contemporary Fiction Club'],
    readingList: ['The Seven Husbands of Evelyn Hugo', 'Beach Read'],
    recentActivity: 'Started Chapter 5 of "Whispers of the Heart"',
    activityTime: '2 hours ago',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    name: 'David Kim',
    username: 'davidreads',
    avatar: null,
    status: 'away',
    lastSeen: '1 hour ago',
    genres: ['Mystery', 'Thriller'],
    currentBook: 'The Silent Witness',
    bookClubs: ['Mystery Lovers', 'Thriller Thursday'],
    readingList: ['Gone Girl', 'The Girl on the Train'],
    recentActivity: 'Finished reading "The Silent Patient"',
    activityTime: '4 hours ago',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 3,
    name: 'Lisa Park',
    username: 'lisacreates',
    avatar: null,
    status: 'offline',
    lastSeen: '2 days ago',
    genres: ['Fantasy', 'YA'],
    currentBook: 'Dragon&apos;s Legacy',
    bookClubs: ['Fantasy Writers Guild', 'YA Authors Network'],
    readingList: ['The Cruel Prince', 'Six of Crows'],
    recentActivity: 'Joined "Fantasy Writers Guild" book club',
    activityTime: '3 days ago',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const FriendsList = () => {
  return (
    <div className="customDark2 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Users className="w-5 h-5" />
        My Friends ({friends.length})
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
