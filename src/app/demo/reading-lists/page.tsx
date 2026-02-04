'use client';

import NewPage from '@/components/layout/NewPage';
import { Plus, List } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ReadingListDisplay from '@/app/(user)/reading-lists/ReadingListDisplay';

const mockReadingLists = [
  {
    id: 'list1',
    title: 'Classics to Read',
    description: 'A collection of classic literature I want to explore.',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10'),
    userId: 'demo-user',
    items: [
      {
        id: 'item1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        addedAt: new Date('2024-01-01'),
        isRead: true,
        bookId: 'book1',
      },
      {
        id: 'item2',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        addedAt: new Date('2024-01-02'),
        isRead: false,
        bookId: 'book2',
      },
    ],
    _count: {
      items: 2,
    },
  },
  {
    id: 'list2',
    title: 'Sci-Fi Adventures',
    description: 'Epic science fiction novels for immersive reading.',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-08'),
    userId: 'demo-user',
    items: [
      {
        id: 'item3',
        title: 'Dune',
        author: 'Frank Herbert',
        addedAt: new Date('2024-01-05'),
        isRead: false,
        bookId: 'book4',
      },
    ],
    _count: {
      items: 1,
    },
  },
];

const DemoReadingListsPage = () => {
  return (
    <NewPage>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl space-y-8">
          <div className="">
            <div className="items-center gap-3 mb-6 darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto justify-between">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 w-full">
                <h2 className="text-3xl font-bold mainFont text-white text-center md:text-left">
                  Your Reading Lists
                </h2>
                <div className="w-full md:w-auto">
                  {mockReadingLists.length > 0 && (
                    <>
                      <Link
                        href="/demo/reading-lists/create"
                        className="w-full"
                      >
                        <Button
                          className="w-full md:w-auto mt-4 md:mt-0"
                          variant={'beeYellow'}
                        >
                          Create New List
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="darkContainer2 rounded-2xl py-4 md:py-8 px-4 md:px-8">
              {mockReadingLists.length > 0 ? (
                <ReadingListDisplay readingLists={mockReadingLists} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                  <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                    <List className="w-12 h-12 text-[#FFC300]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                    No Reading Lists Yet
                  </h3>
                  <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                    Create your first reading list to organize your favorite
                    books and plan your reading journey.
                  </p>
                  <Link href="/demo/reading-lists/create">
                    <Button variant="beeYellow" size="lg">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First List
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default DemoReadingListsPage;
