'use client';

import { Circle, PencilLine } from 'lucide-react';

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

const FriendActivity = () => {
  return (
    <div className="customDark2 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <PencilLine className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        Friend Activity
      </h2>
      <div className="space-y-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-xl"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-semibold">
                  {friend.name.charAt(0)}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white">{friend.name}</h4>
                <p className="text-white/50 text-xs">{friend.activityTime}</p>
              </div>
              <p className="text-yellow-400 text-sm mb-2">
                {friend.recentActivity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FriendActivity;
