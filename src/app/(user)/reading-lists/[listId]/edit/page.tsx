'use client';
import { useState } from 'react';
import NewPage from '@/components/layout/NewPage';
import { BookOpen, Trash2, Save } from 'lucide-react';

const initialList = {
  title: 'Mystery & Thriller Favorites',
  description:
    'My all-time favorite mystery and thriller novels that keep me up at night. These are the books that defined my love for suspense and psychological twists.',
  books: [
    { id: 1, title: 'Gone Girl', author: 'Gillian Flynn' },
    { id: 2, title: 'The Girl on the Train', author: 'Paula Hawkins' },
    { id: 3, title: 'The Silent Patient', author: 'Alex Michaelides' },
    { id: 4, title: 'Big Little Lies', author: 'Liane Moriarty' },
  ],
};

const EditListPage = () => {
  const [title, setTitle] = useState(initialList.title);
  const [description, setDescription] = useState(initialList.description);
  const [books, setBooks] = useState(initialList.books);

  const handleRemoveBook = (id: number) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here (placeholder)
    alert('List updated!');
  };

  return (
    <NewPage>
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <form
          onSubmit={handleSave}
          className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#FFC300]" />
            Edit Reading List
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                placeholder="List Title"
                required
              />
            </div>
            <div>
              <label className="block text-white/80 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none resize-none"
                placeholder="List Description"
                rows={3}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </form>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-[#FFC300]" />
            Books in This List
          </h2>
          <div className="space-y-4">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/10 hover:border-[#FFC300]/30 transition-all"
                >
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {book.title}
                    </h3>
                    <p className="text-white/70">by {book.author}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-white/70 py-8">
                No books in this list.
              </div>
            )}
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default EditListPage;
