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
import { Button } from '@/components/ui/button';
import ViewMembersButton from '../components/ViewMembersButton';
import Link from 'next/link';
import coverImage from '@/assets/stock/club-cover.jpg';
import ClubProgress from '../components/ClubProgress';
import ClubDiscussionPreview from '../components/ClubDiscussionPreview';
import ClubMembersPreview from '../components/ClubMembersPreview';
import ClubReadingListPreview from '../components/ClubReadingListPreview';

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
  role: 'Owner',
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
              src={coverImage}
              alt={club.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 darkContainer2" />
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
            <Button variant={'beeDark'}>
              <Share className="w-4 h-4" />
              Share
            </Button>
            {(club.userRole === 'Owner' || club.userRole === 'Moderator') && (
              <Link href={`/book-clubs/${club.id}/settings`}>
                <Button variant={'beeYellow'}>
                  <Settings className="w-4 h-4 text-black" /> Edit Club
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
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
            <ClubProgress club={club} />
            <ClubDiscussionPreview discussions={discussions} />
          </div>

          <div className="space-y-6">
            <ClubMembersPreview club={club} members={members} />
            <ClubReadingListPreview
              clubId={club.id}
              readingList={readingList}
            />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default ClubPage;
