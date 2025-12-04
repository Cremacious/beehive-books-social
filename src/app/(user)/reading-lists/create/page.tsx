'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewPage from '@/components/layout/NewPage';
import { BookOpen, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useReadingListStore } from '@/stores/useReadingListStore';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BookItem {
  title: string;
  author: string;
}

const CreateReadingListPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [books, setBooks] = useState<BookItem[]>([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const { createReadingList, isLoading } = useReadingListStore();
  const router = useRouter();

  const addBook = () => {
    if (newBookTitle.trim() && newBookAuthor.trim()) {
      setBooks([
        ...books,
        { title: newBookTitle.trim(), author: newBookAuthor.trim() },
      ]);
      setNewBookTitle('');
      setNewBookAuthor('');
    }
  };

  const removeBook = (index: number) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    books.forEach((book, index) => {
      formData.append(`books[${index}][title]`, book.title);
      formData.append(`books[${index}][author]`, book.author);
    });

    await createReadingList(formData);
    router.push('/reading-lists');
  };

  return (
    <NewPage>
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/reading-lists">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lists
            </Button>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-[#FFC300]" />
            Create Reading List
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-white/80 font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                placeholder="e.g., Mystery &amp; Thriller Favorites"
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
                placeholder="Describe your reading list..."
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Add Books to List
              </h3>
              <span className="text-white/60 text-sm">
                {books.length} books added
              </span>
            </div>


            <div className="p-4 bg-[#1a1a1a] rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="Book title"
                  className="px-3 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                />
                <input
                  type="text"
                  value={newBookAuthor}
                  onChange={(e) => setNewBookAuthor(e.target.value)}
                  placeholder="Author name"
                  className="px-3 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                />
              </div>
              <Button
                type="button"
                onClick={addBook}
                disabled={!newBookTitle.trim() || !newBookAuthor.trim()}
                className="w-full md:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </Button>
            </div>

      
            {books.length > 0 && (
              <div className="space-y-2">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-[#1a1a1a] rounded-lg p-3"
                  >
                    <div>
                      <h4 className="text-white font-medium">{book.title}</h4>
                      <p className="text-white/60 text-sm">by {book.author}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeBook(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              Create List
            </button>

            <Link href="/reading-lists">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
          </div>
        </form>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <h2 className="text-xl font-bold text-white mb-4">Getting Started</h2>
          <div className="space-y-3 text-white/70">
            <p>• Give your list a clear, descriptive title</p>
            <p>• Add a description to help you remember the theme or purpose</p>
            <p>• Add books now or add them later when editing the list</p>
            <p>
              • You can create multiple lists for different genres, moods, or
              reading goals
            </p>
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default CreateReadingListPage;
