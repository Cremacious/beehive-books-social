'use client';

import MyBookCard from './MyBookCard';
import SearchMyBooks from './SearchMyBooks';
import BookPagination from './BookPagination';
import { useState, useMemo } from 'react';


interface MyBooksDisplayProps {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string | null;
  category: string;
}

const BOOKS_PER_PAGE = 6;

const MyBooksDisplay = ({ books }: { books: MyBooksDisplayProps[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'newest':
        break;
      case 'oldest':
        filtered.reverse();
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'genre':
        filtered.sort((a, b) => a.genre.localeCompare(b.genre));
        break;
      default:
        break;
    }

    return filtered;
  }, [books, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / BOOKS_PER_PAGE);
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIdx = startIdx + BOOKS_PER_PAGE;
  const booksToShow = filteredAndSortedBooks.slice(startIdx, endIdx);

  const resetPagination = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    resetPagination();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    resetPagination();
  };

  return (
    <div className="space-y-8 w-full">
      <div className=" p-2 md:p-8 min-h-[1000px] ">
        <div className="max-w-5xl mx-auto mb-8">
          <SearchMyBooks
            searchTerm={searchTerm}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
          />
        </div>

        {/* <div className="border-2 mx-auto w-full border-yellow-600 mb-8" /> */}

        <div className="darkContainer2 rounded-2xl min-h-[1000px] py-4 md:pb-8 px-4 md:px-8">
          {filteredAndSortedBooks.length === 0 ? (
            <div className="max-w-6xl mx-auto mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: BOOKS_PER_PAGE }, (_, index) => (
                  <div
                    key={`placeholder-${index}`}
                    className="flex flex-col w-full rounded-2xl shadow-lg darkContainer3 overflow-hidden border-2 border-dashed border-yellow-500/30"
                  >
                    <div className="relative w-full h-75 flex items-center justify-center bg-[#1f1f1f]/50">
                      {/* <Plus className="w-12 h-12 text-yellow-500/50" /> */}
                    </div>
                    <div className="flex-col gap-3 p-4 bg-[#1f1f1f] h-[150px] flex items-center justify-center">
                      <p className="text-yellow-500/50 text-sm font-medium">
                        {' '}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {booksToShow.map((book) => (
                  <MyBookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    coverImage={book.cover}
                    category={book.category}
                  />
                ))}

                {Array.from(
                  { length: BOOKS_PER_PAGE - booksToShow.length },
                  (_, index) => (
                    <div
                      key={`placeholder-${index}`}
                      className="flex flex-col w-full rounded-2xl shadow-lg darkContainer3 overflow-hidden border-2 border-dashed border-yellow-500/30"
                    >
                      <div className="relative w-full h-75 flex items-center justify-center bg-[#1f1f1f]/50">
                        {/* <Plus className="w-12 h-12 text-yellow-500/50" /> */}
                      </div>
                      <div className="flex-col gap-3 p-4 bg-[#1f1f1f] h-[150px] flex items-center justify-center">
                        <p className="text-yellow-500/50 text-sm font-medium">
                          {' '}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        {filteredAndSortedBooks.length > BOOKS_PER_PAGE && (
          <div className="mt-8">
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooksDisplay;
