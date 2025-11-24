'use client';
import NewPage from '@/components/layout/NewPage';
import { BookOpen, Plus, Trash2, Edit, X, List, Star } from 'lucide-react';
import { useState } from 'react';

// Placeholder data for existing reading lists
const readingLists = [
  {
    id: 1,
    name: 'Mystery & Thriller Favorites',
    description:
      'My all-time favorite mystery and thriller novels that keep me up at night',
    bookCount: 12,
    createdDate: '2024-10-15',
    isPublic: true,
    books: [
      { id: 1, title: 'Gone Girl', author: 'Gillian Flynn' },
      { id: 2, title: 'The Girl on the Train', author: 'Paula Hawkins' },
      { id: 3, title: 'The Silent Patient', author: 'Alex Michaelides' },
    ],
  },
  {
    id: 2,
    name: 'Books to Read This Winter',
    description: 'Cozy mysteries and thrillers perfect for winter reading',
    bookCount: 8,
    createdDate: '2024-11-01',
    isPublic: false,
    books: [
      { id: 4, title: 'The Thursday Murder Club', author: 'Richard Osman' },
      { id: 5, title: 'Arsenic and Adobo', author: 'Mia P. Manansala' },
    ],
  },
  {
    id: 3,
    name: 'Classic Mysteries',
    description: 'Timeless mystery novels that defined the genre',
    bookCount: 15,
    createdDate: '2024-09-20',
    isPublic: true,
    books: [
      {
        id: 6,
        title: 'The Hound of the Baskervilles',
        author: 'Arthur Conan Doyle',
      },
      { id: 7, title: 'And Then There Were None', author: 'Agatha Christie' },
    ],
  },
];

const ReadingListsPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [newList, setNewList] = useState({ name: '', description: '' });
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  const handleCreateList = () => {
    if (newList.name.trim() && newList.description.trim()) {
      console.log('Creating list:', newList);
      setShowCreateModal(false);
      setNewList({ name: '', description: '' });
    }
  };

  const handleAddBook = () => {
    if (newBook.title.trim() && newBook.author.trim() && selectedListId) {
      console.log('Adding book to list:', selectedListId, newBook);
      setShowAddBookModal(false);
      setNewBook({ title: '', author: '' });
      setSelectedListId(null);
    }
  };

  const openAddBookModal = (listId: number) => {
    setSelectedListId(listId);
    setShowAddBookModal(true);
  };

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                My Reading Lists
              </h1>
              <p className="text-white/70">
                Organize your favorite books and plan your reading journey
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#FFC300] text-black font-bold rounded-xl hover:bg-[#FFD700] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create List
            </button>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <List className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Your Reading Lists
              </h2>
            </div>
            <div className="text-[#FFC300]/60 text-sm">
              {readingLists.length} lists
            </div>
          </div>

          {readingLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingLists.map((list) => (
                <div
                  key={list.id}
                  className="bg-[#1a1a1a] rounded-xl p-6 border border-[#FFC300]/10 hover:border-[#FFC300]/30 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">
                        {list.name}
                      </h3>
                      <p className="text-white/70 text-sm mb-3 line-clamp-2">
                        {list.description}
                      </p>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          {list.bookCount} books
                        </div>
                        {list.isPublic && (
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            Public
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openAddBookModal(list.id)}
                        className="text-[#FFC300] hover:text-[#FFD700] transition-colors p-1"
                        title="Add book"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="text-white/60 hover:text-white transition-colors p-1">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {list.books.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white/80">
                        Recent Books:
                      </h4>
                      {list.books.slice(0, 3).map((book) => (
                        <div key={book.id} className="text-sm text-white/60">
                          <span className="font-medium">{book.title}</span> by{' '}
                          {book.author}
                        </div>
                      ))}
                      {list.books.length > 3 && (
                        <div className="text-sm text-[#FFC300]/60">
                          +{list.books.length - 3} more books
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-[#FFC300]/10">
                    <p className="text-white/50 text-xs">
                      Created {list.createdDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <List className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Reading Lists Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Create your first reading list to organize your favorite books
                and plan your reading journey.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
              >
                <Plus className="w-5 h-5" />
                Create Your First List
              </button>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl w-full border border-[#FFC300]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Create New Reading List
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  List Name
                </label>
                <input
                  type="text"
                  value={newList.name}
                  onChange={(e) =>
                    setNewList({ ...newList, name: e.target.value })
                  }
                  placeholder="e.g., Mystery & Thriller Favorites"
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={newList.description}
                  onChange={(e) =>
                    setNewList({ ...newList, description: e.target.value })
                  }
                  placeholder="Describe what this reading list is about..."
                  rows={4}
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a2a] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateList}
                disabled={!newList.name.trim() || !newList.description.trim()}
                className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] disabled:bg-[#FFC300]/50 disabled:cursor-not-allowed text-black rounded-lg font-medium transition-colors"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddBookModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl w-full border border-[#FFC300]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Add Book to List
              </h3>
              <button
                onClick={() => setShowAddBookModal(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Book Title
                </label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  placeholder="Enter book title..."
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  placeholder="Enter author name..."
                  className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddBookModal(false)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a2a] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBook}
                disabled={!newBook.title.trim() || !newBook.author.trim()}
                className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] disabled:bg-[#FFC300]/50 disabled:cursor-not-allowed text-black rounded-lg font-medium transition-colors"
              >
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}
    </NewPage>
  );
};

export default ReadingListsPage;
