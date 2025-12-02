'use client';

import BookCard from '@/components/BookCard';
import SearchMyBooks from './SearchMyBooks';
import BookPagination from './BookPagination';
import { Library } from 'lucide-react';
import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
}

const BOOKS_PER_PAGE = 9;

const MyBooksDisplay = ({ books }: { books: Book[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(books.length / BOOKS_PER_PAGE);
  const startIdx = (currentPage - 1) * BOOKS_PER_PAGE;
  const endIdx = startIdx + BOOKS_PER_PAGE;
  const booksToShow = books.slice(startIdx, endIdx);

  return (
    <div className="space-y-8">
      <div className="rounded-2xl shadow-xl p-6 md:p-8 min-h-[1000px] darkContainer2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 p-1 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
            <Library className="w-10 h-10 text-[#FFC300]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your Library</h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <SearchMyBooks />
        </div>

        {books.length === 0 ? (
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {booksToShow.map((book) => (
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
        )}
        {books.length > BOOKS_PER_PAGE && (
          <div className="mt-4">
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
