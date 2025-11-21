'use client';

import { BookOpen, Heart, MessageCircle, Users, UsersIcon } from 'lucide-react';
import FriendCard from './FriendCard';

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
          //   <div key={friend.id} className="bg-[#1a1a1a] rounded-xl p-4">
          //     <div className="flex items-start gap-3 mb-3">
          //       <div className="relative">
          //         <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
          //           <span className="text-yellow-400 font-semibold">
          //             {friend.name.charAt(0)}
          //           </span>
          //         </div>
          //         <div
          //           className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-[#1a1a1a] ${
          //             friend.status === 'online'
          //               ? 'bg-green-500'
          //               : friend.status === 'away'
          //               ? 'bg-yellow-500'
          //               : 'bg-gray-500'
          //           }`}
          //         />
          //       </div>
          //       <div className="flex-1 min-w-0">
          //         <h4 className="font-semibold text-white truncate">
          //           {friend.name}
          //         </h4>
          //         <p className="text-white/60 text-sm">@{friend.username}</p>
          //         <p className="text-white/50 text-xs mt-1">
          //           {friend.status === 'online'
          //             ? 'Online'
          //             : friend.lastSeen
          //             ? `Last seen ${friend.lastSeen}`
          //             : 'Offline'}
          //         </p>
          //       </div>
          //     </div>

          //     <div className="mb-3">
          //       <h5 className="text-white/80 text-sm font-medium mb-1 flex items-center gap-1">
          //         <BookOpen className="w-4 h-4 text-yellow-400" />
          //         Currently Writing
          //       </h5>
          //       <p className="text-yellow-400 text-sm">{friend.currentBook}</p>
          //     </div>

          //     <div className="mb-3">
          //       <h5 className="text-white/80 text-sm font-medium mb-1 flex items-center gap-1">
          //         <UsersIcon className="w-4 h-4 text-yellow-400" />
          //         Book Clubs
          //       </h5>
          //       <div className="flex flex-wrap gap-1">
          //         {friend.bookClubs.slice(0, 2).map((club) => (
          //           <span
          //             key={club}
          //             className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full"
          //           >
          //             {club}
          //           </span>
          //         ))}
          //         {friend.bookClubs.length > 2 && (
          //           <span className="text-xs text-white/50">
          //             +{friend.bookClubs.length - 2} more
          //           </span>
          //         )}
          //       </div>
          //     </div>

          //     <div className="mb-4">
          //       <h5 className="text-white/80 text-sm font-medium mb-1 flex items-center gap-1">
          //         <Heart className="w-4 h-4 text-yellow-400" />
          //         Reading List
          //       </h5>
          //       <div className="flex flex-wrap gap-1">
          //         {friend.readingList.slice(0, 2).map((book) => (
          //           <span
          //             key={book}
          //             className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full"
          //           >
          //             {book}
          //           </span>
          //         ))}
          //         {friend.readingList.length > 2 && (
          //           <span className="text-xs text-white/50">
          //             +{friend.readingList.length - 2} more
          //           </span>
          //         )}
          //       </div>
          //     </div>

          //     <div className="flex gap-2">
          //       <button className="flex-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 py-2 px-3 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1">
          //         <MessageCircle className="w-4 h-4" />
          //         Message
          //       </button>
          //       <button className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white py-2 px-3 rounded-lg font-medium transition-colors text-sm">
          //         View Profile
          //       </button>
          //     </div>
          //   </div>
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
