'use client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';

const userData = {
  name: 'Anya Sharma',
  totalBooks: 6,
};

const userBooks = [
  {
    id: '56433',
    title: 'The Last Spire',
    author: 'Anya Sharma',
    genre: 'Mystery',
  },
  {
    id: '2',
    title: 'Fantasy Fanatics',
    author: 'Anya Sharma',
    genre: 'Fantasy',
  },
  {
    id: '3',
    title: 'Novel User Title',
    author: 'Anya Sharma',
    genre: 'Romance',
  },
  {
    id: '4',
    title: 'Another Draft',
    author: 'Anya Sharma',
    genre: 'Sci-Fi',
  },
  {
    id: '5',
    title: 'Novel Last Tpine',
    author: 'Anya Sharma',
    genre: 'Thriller',
  },
  {
    id: '6',
    title: 'Novel Mar Trine',
    author: 'Anya Sharma',
    genre: 'Historical',

  },
];


const MyBooks = () => {
  return (
    <section className="mb-8 bg-linear-[#1b1b1b] rounded-3xl shadow-2xl p-6 md:p-8 border border-[#2a2a2a]">
      <div className="flex justify-between items-center mb-6 pb-5 border-b border-[#FFC300]/20 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400">
              My Books
            </h3>
            <p className="text-xs text-[#FFC300]/60 font-medium mt-0.5">
              {userData.totalBooks}{' '}
              {userData.totalBooks === 1 ? 'novel' : 'novels'} in your hive
            </p>
          </div>
        </div>

        <Button
          size={'sm'}
          className=""
          onClick={() => console.log('New Book button clicked (Desktop)')}
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
          <span>View Books</span>
        </Button>
      </div>

      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userBooks.slice(0, 4).map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div> */}
    </section>
  );
};

export default MyBooks;
