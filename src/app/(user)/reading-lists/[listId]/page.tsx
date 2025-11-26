'use client';
import NewPage from '@/components/layout/NewPage';
import {
  BookOpen,
  Edit,
  CheckCircle,
  Circle,
  Star,
  Calendar,
} from 'lucide-react';
import { useState } from 'react';
import ReadingListItem from './components/ReadingListItem';

const readingList = {
  id: 1,
  name: 'Mystery & Thriller Favorites',
  description:
    'My all-time favorite mystery and thriller novels that keep me up at night. These are the books that defined my love for suspense and psychological twists.',
  createdDate: '2024-10-15',
  isPublic: true,
  bookCount: 8,
  books: [
    {
      id: 1,
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      isRead: true,
      dateAdded: '2024-10-15',
      rating: 5,
      cover: '/assets/stock/cover.jpeg',
    },
    {
      id: 2,
      title: 'The Girl on the Train',
      author: 'Paula Hawkins',
      isRead: true,
      dateAdded: '2024-10-16',
      rating: 4,
      cover: '/assets/stock/cover.jpeg',
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      isRead: false,
      dateAdded: '2024-10-18',
      rating: null,
      cover: '/assets/stock/cover.jpeg',
    },
    {
      id: 4,
      title: 'Big Little Lies',
      author: 'Liane Moriarty',
      isRead: false,
      dateAdded: '2024-10-20',
      rating: null,
      cover: '/assets/stock/cover.jpeg',
    },
    {
      id: 5,
      title: 'The Woman in the Window',
      author: 'A.J. Finn',
      isRead: true,
      dateAdded: '2024-10-22',
      rating: 4,
      cover: '/assets/stock/cover.jpeg',
    },
    {
      id: 6,
      title: 'Behind Closed Doors',
      author: 'B.A. Paris',
      isRead: false,
      dateAdded: '2024-10-25',
      rating: null,
      cover: '/assets/stock/cover.jpeg',
    },
  ],
};

const ReadingListPage = () => {
  const [books, setBooks] = useState(readingList.books);
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const toggleReadStatus = (bookId: number) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, isRead: !book.isRead } : book
      )
    );
  };

  const addBook = () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      const book = {
        id: Date.now(),
        title: newBook.title.trim(),
        author: newBook.author.trim(),
        isRead: false,
        dateAdded: new Date().toISOString().split('T')[0],
        rating: null,
        cover: '/assets/stock/cover.jpeg',
      };
      setBooks([...books, book]);
      setNewBook({ title: '', author: '' });
    }
  };

  const readCount = books.filter((book) => book.isRead).length;
  const unreadCount = books.filter((book) => !book.isRead).length;

  return (
    <NewPage>
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#FFC300]" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {readingList.name}
                  </h1>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {readingList.bookCount} books
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {readCount} read
                    </div>
                    <div className="flex items-center gap-1">
                      <Circle className="w-4 h-4" />
                      {unreadCount} unread
                    </div>
                    {readingList.isPublic && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        Public
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                {readingList.description}
              </p>
              <div className="flex items-center gap-4 text-white/50 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Created {readingList.createdDate}
                </div>
              </div>
            </div>
            <button className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit List
            </button>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
          <form
            className="flex flex-col md:flex-row items-center gap-4 mb-8 p-4 rounded-xl "
            onSubmit={(e) => {
              e.preventDefault();
              addBook();
            }}
          >
            <input
              type="text"
              placeholder="Book Title"
              className="flex-1 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Author"
              className="flex-1 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Add Book
            </button>
          </form>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC300]" />
              Books in This List
            </h2>
            <div className="text-[#FFC300]/60 text-sm">
              {books.length} total books
            </div>
          </div>

          <div className="space-y-4">
            {books.map((book) => (
              <ReadingListItem
                key={book.id}
                book={book}
                toggleReadStatus={toggleReadStatus}
              />
            ))}
          </div>

          {books.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Books in This List
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                This reading list is empty. Add some books to get started!
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                Add Books
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Books Read</h3>
                <p className="text-white/60 text-sm">
                  {readCount} of {books.length} books
                </p>
              </div>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    books.length > 0 ? (readCount / books.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FFC300]/20 rounded-lg flex items-center justify-center">
                <Circle className="w-5 h-5 text-[#FFC300]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Books to Read</h3>
                <p className="text-white/60 text-sm">{unreadCount} remaining</p>
              </div>
            </div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-2">
              <div
                className="bg-[#FFC300] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    books.length > 0 ? (unreadCount / books.length) * 100 : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>

          <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Average Rating</h3>
                <p className="text-white/60 text-sm">
                  {books.filter((b) => b.rating).length > 0
                    ? (
                        books.reduce((sum, b) => sum + (b.rating || 0), 0) /
                        books.filter((b) => b.rating).length
                      ).toFixed(1)
                    : 'No ratings yet'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <=
                    (books.filter((b) => b.rating).length > 0
                      ? books.reduce((sum, b) => sum + (b.rating || 0), 0) /
                        books.filter((b) => b.rating).length
                      : 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default ReadingListPage;
