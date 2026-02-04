'use client';

import BookClubs from '@/app/(user)/dashboard/components/BookClubs';
import WritingPrompts from '@/app/(user)/dashboard/components/WritingPrompts';
import ReadingList from '@/app/(user)/dashboard/components/ReadingList';
import QuickActions from '@/app/(user)/dashboard/components/QuickActions';
import NewPage from '@/components/layout/NewPage';

const mockData = {
  readingListItems: [
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      addedAt: new Date('2024-01-01'),
      isRead: false,
      book: {
        id: 'book1',
        cover: '/placeholder-book.jpg',
      },
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      addedAt: new Date('2024-01-02'),
      isRead: true,
      book: {
        id: 'book2',
        cover: '/placeholder-book.jpg',
      },
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      addedAt: new Date('2024-01-03'),
      isRead: false,
      book: {
        id: 'book3',
        cover: '/placeholder-book.jpg',
      },
    },
  ],
  prompts: [
    {
      id: 'prompt1',
      title: 'Write about a lost memory',
      description: 'Explore the theme of forgotten memories and their impact on identity.',
      createdAt: new Date('2024-01-01'),
      endDate: new Date('2024-02-01'),
      status: 'OPEN' as const,
      user: {
        id: 'demo-user',
        name: 'Demo User',
        image: null,
      },
      entries: [],
      _count: {
        entries: 5,
      },
    },
    {
      id: 'prompt2',
      title: 'A day in the life of a character',
      description: 'Describe a single day from the perspective of an unusual character.',
      createdAt: new Date('2024-01-05'),
      endDate: new Date('2024-02-05'),
      status: 'OPEN' as const,
      user: {
        id: 'demo-user',
        name: 'Demo User',
        image: null,
      },
      entries: [],
      _count: {
        entries: 3,
      },
    },
  ],
  clubActivities: [
    {
      id: 'activity1',
      club: {
        id: 'club1',
        name: 'Classic Literature Club',
        cover: '/placeholder-club.jpg',
        memberCount: 25,
      },
      member: {
        id: 'demo-user',
        name: 'Demo User',
        image: null,
        role: 'MEMBER' as const,
      },
      action: 'discussion' as const,
      details: 'Started a discussion: "Themes in The Great Gatsby"',
      createdAt: new Date('2024-01-10'),
    },
    {
      id: 'activity2',
      club: {
        id: 'club1',
        name: 'Classic Literature Club',
        cover: '/placeholder-club.jpg',
        memberCount: 25,
      },
      member: {
        id: 'demo-user',
        name: 'Demo User',
        image: null,
        role: 'OWNER' as const,
      },
      action: 'book_added' as const,
      details: 'Added "Pride and Prejudice" by Jane Austen to the reading list',
      createdAt: new Date('2024-01-08'),
    },
  ],
};

export default function DemoDashboardPage() {
  return (
    <NewPage>
      <div className="space-y-8">
        <div className="flex w-full">
          <QuickActions />
        </div>

        <BookClubs activities={mockData.clubActivities} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReadingList items={mockData.readingListItems} />
          <WritingPrompts prompts={mockData.prompts} />
        </div>
      </div>
    </NewPage>
  );
}