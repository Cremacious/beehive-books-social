'use client';

import { useState, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import { Search, Filter } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  category: string;
  description: string;
  chapterCount: number;
  wordCount: number;
  commentCount: number;
  cover: string | null;
  createdAt: Date;
  privacy: 'PUBLIC' | 'PRIVATE' | 'FRIENDS';
}

interface UserBooksProps {
  books: Book[];
  isOwnProfile: boolean;
}

const BOOKS_PER_PAGE = 12;

export default function UserBooks({ books, isOwnProfile }: UserBooksProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
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
    <div className="space-y-6">
      <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h2 className="text-3xl mainFont text-white">
              {isOwnProfile ? 'Your Books' : `${books.length} Published Books`}
            </h2>
            <p className="text-[#FFC300]/60 text-sm">
              {isOwnProfile
                ? 'Manage and showcase your literary works'
                : 'Explore the published works of this writer'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books by title, author, or genre..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 searchStyle"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#FFC300]/60" />
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white/80 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all md:w-48"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title A-Z</option>
                <option value="genre">Genre</option>
              </select>
            </div>
          </div>

          <div className="text-white/60 text-sm ml-4">
            Showing {booksToShow.length} of {filteredAndSortedBooks.length}{' '}
            books
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>
        {booksToShow.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
              {booksToShow.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  coverImage={book.cover}
                  category={book.category}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg text-white/80 hover:border-[#FFC300]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-all ${
                          currentPage === page
                            ? 'bg-[#FFC300] text-[#1E3A4B] font-semibold'
                            : 'bg-[#1a1a1a] border border-[#FFC300]/20 text-white/80 hover:border-[#FFC300]/40'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg text-white/80 hover:border-[#FFC300]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
            <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
              {searchTerm ? 'No Books Found' : 'No Books Yet'}
            </h3>
            <p className="text-white/70 mb-8 max-w-md leading-relaxed">
              {searchTerm
                ? `No books match your search for "${searchTerm}". Try adjusting your search terms.`
                : isOwnProfile
                ? "This writer hasn't published any books yet."
                : "You haven't published any books yet. Start your writing journey!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
