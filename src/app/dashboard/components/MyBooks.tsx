'use client';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import coverImage from '@/assets/stock/cover.jpeg';

const userData = {
  name: 'Anya Sharma',
  totalBooks: 6,
};

const userBooks = [
  {
    id: 1,
    title: 'The Last Spire',
    author: 'Anya Sharma',
    genre: 'Mystery',
  },
  {
    id: 2,
    title: 'Fantasy Fanatics',
    author: 'Anya Sharma',
    genre: 'Fantasy',
  },
  {
    id: 3,
    title: 'Novel User Title',
    author: 'Anya Sharma',
    genre: 'Romance',
  },
  {
    id: 4,
    title: 'Another Draft',
    author: 'Anya Sharma',
    genre: 'Sci-Fi',
  },
  {
    id: 5,
    title: 'Novel Last Tpine',
    author: 'Anya Sharma',
    genre: 'Thriller',
  },
  {
    id: 6,
    title: 'Novel Mar Trine',
    author: 'Anya Sharma',
    genre: 'Historical',
  },
];

const BookCard = ({
  title,
  author,
  genre,
}: {
  title: string;
  author: string;
  genre: string;
}) => (
  <div className="flex flex-col w-full cursor-pointer group rounded-2xl shadow-lg bg-[#2a2a2a] hover:shadow-2xl transition-all overflow-hidden border border-[#3a3a3a]">
    <div className="relative w-full h-40 overflow-hidden">
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
        draggable={false}
      />
    </div>

    <div className="flex flex-col gap-2 p-4 bg-[#2a2a2a] min-h-[120px]">
      <h3
        className="text-sm font-bold text-white truncate leading-tight"
        title={title}
      >
        {title}
      </h3>
      <p className="text-xs text-[#FFC300] font-medium truncate">{author}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[10px] bg-[#FFC300]/20 text-[#FFC300] px-2 py-1 rounded-md font-semibold">
          {genre}
        </span>
      </div>
    </div>
  </div>
);

const MyBooks = () => {
  return (
    <section className="mb-8 bg-linear-[#1b1b1b] rounded-3xl shadow-2xl p-6 md:p-8 border border-[#2a2a2a]">
      <div className="flex justify-between items-center mb-6 pb-5 border-b border-[#FFC300]/20 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
              My Books
            </h3>
            <p className="text-xs text-[#FFC300]/60 font-medium mt-0.5">
              {userData.totalBooks}{' '}
              {userData.totalBooks === 1 ? 'novel' : 'novels'} in your hive
            </p>
          </div>
        </div>

        <button
          className="hidden md:flex px-5 py-2.5 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 items-center gap-2 group"
          onClick={() => console.log('New Book button clicked (Desktop)')}
        >
          <Plus
            size={18}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
          <span>New Book</span>
        </button>

        <div className="absolute -bottom-px left-0 w-20 h-0.5 bg-linear-to-r from-[#FFC300] to-transparent" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userBooks.slice(0, 4).map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </section>
  );
};

export default MyBooks;
