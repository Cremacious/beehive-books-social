'use client';

import NewPage from '@/components/layout/NewPage';
import MyClubs from '@/app/(user)/book-clubs/components/MyClubs';

const mockClubs = [
  {
    id: 'club1',
    name: 'Classic Literature Club',
    description: 'Exploring the greatest works of classic literature together.',
    currentBook: 'The Great Gatsby by F. Scott Fitzgerald',
    cover: '/placeholder-club.jpg',
    members: 25,
    role: 'MEMBER',
    privacy: 'PUBLIC',
  },
  {
    id: 'club2',
    name: 'Sci-Fi Explorers',
    description: 'Diving into the worlds of science fiction and speculative fiction.',
    currentBook: 'Dune by Frank Herbert',
    cover: '/placeholder-club.jpg',
    members: 18,
    role: 'OWNER',
    privacy: 'PRIVATE',
  },
];

const DemoBookClubsPage = () => {
  return (
    <NewPage>
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
        <MyClubs userClubs={mockClubs} />
      </div>
    </NewPage>
  );
};

export default DemoBookClubsPage;