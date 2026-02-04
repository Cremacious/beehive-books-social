'use client';

import NewPage from '@/components/layout/NewPage';
import ProfileHeader from '@/app/(user)/profile/[userId]/components/ProfileHeader';
import UserBooks from '@/app/(user)/profile/[userId]/components/UserBooks';

const mockProfileData = {
  user: {
    id: 'demo-user',
    name: 'Demo User',
    email: 'demo@example.com',
    image: null,
    bio: 'This is a demo account to showcase the features of Beehive Books Social. I love writing, reading, and connecting with fellow book enthusiasts!',
    createdAt: new Date('2023-01-01'),
  },
  books: [
    {
      id: 'book1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      category: 'Classic',
      description: 'A classic American novel set in the Jazz Age.',
      chapterCount: 9,
      wordCount: 47094,
      commentCount: 15,
      cover: '/placeholder-book.jpg',
      createdAt: new Date('2024-01-01'),
      privacy: 'PUBLIC' as const,
    },
    {
      id: 'book2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      category: 'Drama',
      description: 'A gripping tale of racial injustice and childhood innocence.',
      chapterCount: 31,
      wordCount: 99121,
      commentCount: 8,
      cover: '/placeholder-book.jpg',
      createdAt: new Date('2024-01-05'),
      privacy: 'PUBLIC' as const,
    },
  ],
  bookCount: 2,
  isOwnProfile: true,
  isFriend: false,
  hasPendingRequest: false,
};

const DemoProfilePage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8">
        <ProfileHeader
          user={mockProfileData.user}
          bookCount={mockProfileData.bookCount}
          isOwnProfile={mockProfileData.isOwnProfile}
          isFriend={mockProfileData.isFriend}
          hasPendingRequest={mockProfileData.hasPendingRequest}
        />

        <UserBooks
          books={mockProfileData.books}
          isOwnProfile={mockProfileData.isOwnProfile}
        />
      </div>
    </NewPage>
  );
};

export default DemoProfilePage;