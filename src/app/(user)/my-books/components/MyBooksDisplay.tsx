'use client';

import BookCard from '@/components/BookCard';
import SearchMyBooks from './SearchMyBooks';
import BookPagination from './BookPagination';

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
  // {
  //   id: 5,
  //   title: 'Novel Last Tpine',
  //   author: 'Anya Sharma',
  //   genre: 'Thriller',
  // },
  // {
  //   id: 6,
  //   title: 'Novel Mar Trine',
  //   author: 'Anya Sharma',
  //   genre: 'Historical',
  // },
  // {
  //   id: 7,
  //   title: 'Shadows of the Past',
  //   author: 'Anya Sharma',
  //   genre: 'Drama',
  // },
  // {
  //   id: 8,
  //   title: 'Echoes in the Wind',
  //   author: 'Anya Sharma',
  //   genre: 'Adventure',
  // },
  // {
  //   id: 9,
  //   title: 'Whispers of Tomorrow',
  //   author: 'Anya Sharma',
  //   genre: 'Dystopian',
  // },
];

const MyBooksDisplay = () => {
  return (
    <div className="space-y-8">
      <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
            <span className="text-lg">📚</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Your Library</h2>
        </div>
        <SearchMyBooks />

        {userBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl">🐝</span>
            </div>
            <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
              No Books Yet
            </h3>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              Your writing journey starts here! Create your first book and begin
              crafting stories that captivate readers around the world.
            </p>
            <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <span className="text-xl">✍️</span>
              <span>Start Your First Book</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.map((book) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                genre={book.genre}
              />
            ))}
          </div>
        )}
      </div>

      {userBooks.length > 0 && (
        <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
          <BookPagination />
        </div>
      )}
    </div>
  );
};

export default MyBooksDisplay;
