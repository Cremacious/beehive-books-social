import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import {
  Users,
  BookOpen,
  MessageCircle,
  Calendar,
  Settings,
  Crown,
  Shield,
  User,
  Vote,
  Target,
  Plus,
  Share,
  Heart,
  Clock,
} from 'lucide-react';
import EditClubButton from '../components/EditClubButton';
import { Button } from '@/components/ui/button';
import ViewMembersButton from '../components/ViewMembersButton';
import Link from 'next/link';

const club = {
  id: 1,
  name: 'Mystery Masters',
  description:
    'A club for mystery and thriller enthusiasts. We dive deep into psychological thrillers, classic whodunits, and modern suspense novels. Join us for weekly discussions and monthly virtual meetups!',
  currentBook: 'The Silent Patient',
  author: 'Alex Michaelides',
  cover: '/assets/stock/cover.jpeg',
  clubCover: '/assets/stock/cover.jpeg',
  members: 12,
  privacy: 'Private',
  userRole: 'Owner',
  createdDate: '2024-10-15',
  rules:
    'Post weekly discussion questions, respect all opinions, no spoilers in titles, be kind and constructive in feedback.',
  tags: ['Mystery', 'Thriller', 'Psychological'],
};

const members = [
  {
    id: 1,
    name: 'Anya Sharma',
    role: 'Owner',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-15',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Moderator',
    avatar: null,
    status: 'away',
    joinedDate: '2024-10-16',
  },
  {
    id: 3,
    name: 'David Kim',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-18',
  },
  {
    id: 4,
    name: 'Mike Rodriguez',
    role: 'Member',
    avatar: null,
    status: 'online',
    joinedDate: '2024-10-20',
  },
  {
    id: 5,
    name: 'Emma Thompson',
    role: 'Member',
    avatar: null,
    status: 'offline',
    joinedDate: '2024-10-22',
  },
];

const discussions = [
  {
    id: 1,
    title: 'Chapter 5 Discussion - The Twist!',
    author: 'Sarah Chen',
    replies: 12,
    lastActivity: '2 hours ago',
    likes: 8,
  },
  {
    id: 2,
    title: 'Character Analysis: Alicia Berenson',
    author: 'David Kim',
    replies: 8,
    lastActivity: '5 hours ago',
    likes: 6,
  },
  {
    id: 3,
    title: 'Themes of Mental Health in the Novel',
    author: 'Mike Rodriguez',
    replies: 15,
    lastActivity: '1 day ago',
    likes: 12,
  },
];

const readingList = [
  {
    id: 1,
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    votes: 8,
    status: 'completed',
  },
  {
    id: 2,
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    votes: 6,
    status: 'current',
  },
  {
    id: 3,
    title: 'Big Little Lies',
    author: 'Liane Moriarty',
    votes: 4,
    status: 'upcoming',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Monthly Book Discussion',
    date: '2025-11-25',
    time: '7:00 PM EST',
    description: 'Discuss chapters 5-8 of The Silent Patient',
    type: 'discussion',
  },
  {
    id: 2,
    title: 'Reading Deadline',
    date: '2025-12-01',
    time: '11:59 PM EST',
    description: 'Complete Chapter 10',
    type: 'deadline',
  },
];

const ClubPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="relative">
          <div className="h-48 md:h-64 rounded-3xl overflow-hidden relative">
            <Image
              src={club.clubCover}
              alt={club.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 md:left-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {club.name}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{club.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="capitalize">{club.privacy}</span>
                </div>
                <div className="flex items-center gap-2">
                  {club.userRole === 'Owner' && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                  {club.userRole === 'Moderator' && (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                  {club.userRole === 'Member' && <User className="w-4 h-4" />}
                  <span className="capitalize">{club.userRole}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex gap-3">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all flex items-center gap-2">
              <Share className="w-4 h-4" />
              Share
            </button>
            {(club.userRole === 'Owner' || club.userRole === 'Moderator') && (
              <EditClubButton clubId={club.id} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#FFC300]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  About This Club
                </h2>
              </div>
              <p className="text-white/80 leading-relaxed mb-4">
                {club.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FFC300]/10 text-[#FFC300] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {club.rules && (
                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/20">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#FFC300]" />
                    Club Rules
                  </h3>
                  <p className="text-white/70 text-sm">{club.rules}</p>
                </div>
              )}
            </div>

            <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#FFC300]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Currently Reading
                </h2>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-24 h-32 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={club.cover}
                    alt={club.currentBook}
                    width={96}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {club.currentBook}
                  </h3>
                  <p className="text-[#FFC300]/80 text-lg mb-4">
                    by {club.author}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-white/70 mb-2">
                        <span>Club Progress</span>
                        <span>75% Complete</span>
                      </div>
                      <div className="w-full bg-[#2a2a2a] rounded-full h-3">
                        <div
                          className="bg-[#FFC300] h-3 rounded-full"
                          style={{ width: '75%' }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="px-4 py-2 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Update Progress
                      </button>
                      <button className="px-4 py-2 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Start Discussion
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#FFC300]" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Discussions</h2>
                </div>
                <button className="px-4 py-2 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Discussion
                </button>
                <Link
                  className="bg-yellow-400"
                  href={`/book-clubs/${club.id}/discussions`}
                >
                  View Discussions
                </Link>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/20 hover:border-[#FFC300]/40 transition-all cursor-pointer"
                  >
                    <h4 className="font-semibold text-white mb-2">
                      {discussion.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-[#FFC300]/60">
                          by {discussion.author}
                        </span>
                        <span className="text-white/70 flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {discussion.replies} replies
                        </span>
                        <span className="text-white/70 flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {discussion.likes}
                        </span>
                      </div>
                      <span className="text-white/70">
                        {discussion.lastActivity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FFC300]" />
                  Members ({members.length})
                </h3>
                {(club.userRole === 'Owner' ||
                  club.userRole === 'Moderator') && (
                  <button className="px-3 py-1 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all text-sm">
                    Invite
                  </button>
                )}
                <ViewMembersButton clubId={club.id} />
              </div>

              <div className="space-y-3">
                {members.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-[#FFC300]" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {member.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {member.role === 'Owner' && (
                            <Crown className="w-3 h-3 text-yellow-500" />
                          )}
                          {member.role === 'Moderator' && (
                            <Shield className="w-3 h-3 text-blue-400" />
                          )}
                          <span
                            className={`text-xs ${
                              member.role === 'Owner'
                                ? 'text-yellow-400'
                                : member.role === 'Moderator'
                                ? 'text-blue-400'
                                : 'text-gray-400'
                            }`}
                          >
                            {member.role}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        member.status === 'online'
                          ? 'bg-green-400'
                          : member.status === 'away'
                          ? 'bg-yellow-400'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>
                ))}
                {members.length > 5 && (
                  <button className="w-full text-center text-[#FFC300] hover:text-[#FFD700] transition-all text-sm py-2">
                    View all {members.length} members
                  </button>
                )}
              </div>
            </div>

            <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Vote className="w-5 h-5 text-[#FFC300]" />
                  Reading List
                </h3>
                <Link href={`/book-clubs/${club.id}/reading-list`}>
                  <button className="px-3 py-1 bg-[#FFC300]/20 text-[#FFC300] rounded-lg hover:bg-[#FFC300]/30 transition-all text-sm">
                    View List
                  </button>
                </Link>
              </div>

              <div className="space-y-3">
                {readingList.map((book) => (
                  <div
                    key={book.id}
                    className="bg-[#1a1a1a] rounded-lg p-3 border border-[#FFC300]/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="text-white text-sm font-medium truncate">
                          {book.title}
                        </h4>
                        <p className="text-[#FFC300]/60 text-xs truncate">
                          by {book.author}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Vote className="w-3 h-3 text-[#FFC300]" />
                        <span className="text-[#FFC300] text-xs">
                          {book.votes}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full text-center ${
                        book.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : book.status === 'current'
                          ? 'bg-[#FFC300]/20 text-[#FFC300]'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {book.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default ClubPage;
