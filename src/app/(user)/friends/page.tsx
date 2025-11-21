import NewPage from '@/components/layout/NewPage';
import FriendsList from './components/FriendsList';
import FriendRequests from './components/FriendRequests';
import SearchFriends from './components/SearchFriends';
import RecommendedFriends from './components/RecommendedFriends';
import FriendActivity from './components/FriendActivity';

const friendRequests = {
  incoming: [
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
  ],
  outgoing: [
    {
      id: 3,
      name: 'Emma Thompson',
      username: 'emmastories',
      avatar: null,
      sentDate: '2 days ago',
    },
  ],
};

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
  },
];

const recommendations = [
  {
    id: 4,
    name: 'James Wilson',
    username: 'jamesnovels',
    avatar: null,
    reason: '3 mutual friends',
    genres: ['Historical Fiction', 'Adventure'],
    booksPublished: 2,
  },
  {
    id: 5,
    name: 'Rachel Green',
    username: 'rachelpoetry',
    avatar: null,
    reason: 'Shares your interest in Poetry',
    genres: ['Poetry', 'Literary Fiction'],
    booksPublished: 1,
  },
];

const FriendsPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        {/* Header */}
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                My Friends
              </h1>
              <p className="text-white/70">
                Connect with fellow writers and readers in your literary
                community
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column  */}
          <div className="lg:col-span-1 space-y-6">
            <FriendRequests />
            <div className="customDark2 rounded-2xl shadow-xl p-2">
              <SearchFriends />
              <RecommendedFriends />
            </div>
          </div>

          {/* Right Column y */}
          <div className="lg:col-span-2 space-y-6">
            <FriendActivity />

            <FriendsList />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default FriendsPage;
