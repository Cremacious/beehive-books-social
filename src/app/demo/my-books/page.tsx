'use client';

import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from '@/app/(user)/my-books/components/MyBooksDisplay';

const mockBooks = [
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
  {
    id: 'book3',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    category: 'Science Fiction',
    description: 'A dystopian social science fiction novel.',
    chapterCount: 3,
    wordCount: 88942,
    commentCount: 22,
    cover: '/placeholder-book.jpg',
    createdAt: new Date('2024-01-10'),
    privacy: 'PUBLIC' as const,
  },
];

const DemoMyBooksPage = () => {
  return (
    <NewPage>
      <div className="w-full ">
        <MyBooksDisplay books={mockBooks} />
      </div>
    </NewPage>
  );
};

export default DemoMyBooksPage;
