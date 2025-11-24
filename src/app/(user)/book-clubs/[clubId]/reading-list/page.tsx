'use client';
import NewPage from '@/components/layout/NewPage';
import { BookOpen, Plus, User, Trash2 } from 'lucide-react';
import { useState } from 'react';


const readingList = [
  {
    id: 1,
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    votes: 8,
    status: 'completed',
    addedBy: 'Sarah Chen',
    addedDate: '2024-10-15',
  },
  {
    id: 2,
    title: 'The Girl on the Train',
    author: 'Paula Hawkins',
    votes: 6,
    status: 'current',
    addedBy: 'David Kim',
    addedDate: '2024-10-18',
  },
  {
    id: 3,
    title: 'Big Little Lies',
    author: 'Liane Moriarty',
    votes: 4,
    status: 'upcoming',
    addedBy: 'Mike Rodriguez',
    addedDate: '2024-10-20',
  },
  {
    id: 4,
    title: 'The Woman in the Window',
    author: 'A.J. Finn',
    votes: 3,
    status: 'upcoming',
    addedBy: 'Emma Thompson',
    addedDate: '2024-10-22',
  },
  {
    id: 5,
    title: 'The Couple Next Door',
    author: 'Shari Lapena',
    votes: 5,
    status: 'upcoming',
    addedBy: 'James Wilson',
    addedDate: '2024-10-25',
  },
];

const club = {
  name: 'Mystery Masters',
  userRole: 'Member', 
};

const ClubReadingListPage = () => {
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleAddBook = () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      console.log('Adding book:', newBook);
      setNewBook({ title: '', author: '' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'current':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'upcoming':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Reading List
              </h1>
              <p className="text-white/70">
                Books queued up for discussion in {club.name}
              </p>
            </div>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#FFC300]" />
            </div>
            <h2 className="text-xl font-bold text-white">Add New Book</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
              placeholder="Book title..."
              className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
            />
            <input
              type="text"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
              placeholder="Author name..."
              className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddBook}
              disabled={!newBook.title.trim() || !newBook.author.trim()}
              className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] disabled:bg-[#FFC300]/50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Book
            </button>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Club Reading List
              </h2>
            </div>
            <div className="text-[#FFC300]/60 text-sm">
              {readingList.length} books total
            </div>
          </div>

          <div className="space-y-4">
            {readingList.map((book) => (
              <div
                key={book.id}
                className="bg-[#1a1a1a] rounded-xl p-6 border border-[#FFC300]/10 hover:border-[#FFC300]/30 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      by {book.author}
                    </p>
                  </div>
                  {(club.userRole === 'Owner' ||
                    club.userRole === 'Moderator') && (
                    <button className="text-red-400 hover:text-red-300 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      book.status
                    )}`}
                  >
                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-white/60 text-sm">
                    <User className="w-3 h-3" />
                    {book.votes}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#FFC300]/10">
                  <p className="text-white/50 text-xs">
                    Added by {book.addedBy} • {book.addedDate}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {readingList.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Books Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Start building your club&apos;s reading list! Add the first book
                to get discussions started.
              </p>
              <button
                onClick={() =>
                  (
                    document.querySelector(
                      'input[placeholder="Book title..."]'
                    ) as HTMLInputElement
                  )?.focus()
                }
                className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
              >
                <Plus className="w-5 h-5" />
                Add First Book
              </button>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default ClubReadingListPage;
