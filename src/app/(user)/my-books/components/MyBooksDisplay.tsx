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
    <div>
      <div>
        <SearchMyBooks />
      </div>
      <div className="bg-red-400 lg:h-[900px] customDark2 p-2 md:p-4 rounded-2xl">
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
      </div>
      <BookPagination />
    </div>
  );
};
export default MyBooksDisplay;
