import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import {
  Users,
  Plus,
  Search,
  BookOpen,
  Crown,
  Shield,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import FindClubs from './components/FindClubs';
import MyClubs from './components/MyClubs';

const userClubs = [
  {
    id: 1,
    name: 'Mystery Masters',
    description: 'A club for mystery and thriller enthusiasts',
    currentBook: 'The Silent Patient',
    cover: '/assets/stock/cover.jpeg',
    members: 12,
    role: 'Owner',
    privacy: 'Private',
    author: 'Jane Doe',
    clubCover: '/assets/stock/cover.jpeg',
    userRole: 'Owner',
    createdDate: '2024-01-01',
    genre: 'Mystery',
    location: 'Online',
    rules: 'Be respectful, No spoilers without warning',
    tags: ['mystery', 'thriller'],
  },
  {
    id: 2,
    name: 'Fantasy Fanatics',
    description: 'Exploring worlds of magic and adventure',
    currentBook: 'The Name of the Wind',
    cover: '/assets/stock/cover.jpeg',
    members: 8,
    role: 'Member',
    privacy: 'Public',
    author: 'John Smith',
    clubCover: '/assets/stock/cover.jpeg',
    userRole: 'Member',
    createdDate: '2024-02-15',
    genre: 'Fantasy',
    location: 'Online',
    rules: 'Respect all opinions, Stay on topic',
    tags: ['fantasy', 'adventure'],
  },
  {
    id: 3,
    name: 'Romance Writers Hive',
    description: 'For lovers of romance novels and heartfelt stories',
    currentBook: 'Beach Read',
    cover: '/assets/stock/cover.jpeg',
    members: 15,
    role: 'Moderator',
    privacy: 'Private',
    author: 'Emily Rose',
    clubCover: '/assets/stock/cover.jpeg',
    userRole: 'Moderator',
    createdDate: '2024-03-10',
    genre: 'Romance',
    location: 'Online',
    rules: 'Be kind, Share recommendations',
    tags: ['romance', 'novels'],
  },
];

const BookClubsPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="darkContainer2 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  Book Clubs
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  Connect with fellow readers and discuss your favorite books
                </p>
              </div>
            </div>
            <Link href={'/book-clubs/create/'}>
              <Button
                variant={'beeYellow'}
                size={'lg'}
                className="flex items-center justify-center space-x-2 w-full"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Club</span>
              </Button>
            </Link>
          </div>
        </div>
        <FindClubs />
        <MyClubs userClubs={userClubs} />
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
