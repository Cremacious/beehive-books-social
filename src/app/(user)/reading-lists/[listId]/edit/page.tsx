'use client';
import { useState, useEffect } from 'react';
import NewPage from '@/components/layout/NewPage';
import {
  BookOpen,
  Trash2,
  Save,
  Plus,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { useReadingListStore } from '@/stores/useReadingListStore';
import { Button } from '@/components/ui/button';

const EditListPage = ({ params }: { params: { listId: string } }) => {
  const {
    currentList,
    fetchReadingList,
    editReadingList,
    addBookToList,
    removeBookFromList,
    toggleBookReadStatus,
    isLoading,
  } = useReadingListStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');

  useEffect(() => {
    fetchReadingList(params.listId);
  }, [params.listId, fetchReadingList]);

  useEffect(() => {
    if (currentList) {
      setTitle(currentList.title);
      setDescription(currentList.description || '');
    }
  }, [currentList]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    await editReadingList(params.listId, formData);
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newBookTitle);
    formData.append('author', newBookAuthor);
    await addBookToList(params.listId, formData);
    setNewBookTitle('');
    setNewBookAuthor('');
    setShowAddBookForm(false);
  };

  const handleRemoveBook = async (itemId: string) => {
    await removeBookFromList(params.listId, itemId);
  };

  const handleToggleRead = async (itemId: string) => {
    await toggleBookReadStatus(params.listId, itemId);
  };

  if (!currentList) {
    return (
      <NewPage>
        <div className="w-full max-w-3xl mx-auto flex items-center justify-center py-20">
          <div className="text-white">Loading...</div>
        </div>
      </NewPage>
    );
  }

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
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </form>

        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#FFC300]" />
              Books in This List ({currentList.items.length})
            </h2>
            <Button
              onClick={() => setShowAddBookForm(!showAddBookForm)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Book
            </Button>
          </div>

          {showAddBookForm && (
            <form
              onSubmit={handleAddBook}
              className="mb-6 p-4 bg-[#1a1a1a] rounded-lg"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 font-semibold mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                    placeholder="Enter book title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 font-semibold mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    Add Book
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddBookForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {currentList.items.length > 0 ? (
              currentList.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/10 hover:border-[#FFC300]/30 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => handleToggleRead(item.id)}
                      className="text-[#FFC300] hover:text-[#FFD700] transition-colors"
                    >
                      {item.isRead ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-white/70">by {item.author}</p>
                      <p className="text-white/50 text-sm">
                        Added {new Date(item.addedAt).toLocaleDateString()}
                        {item.isRead && ' • Read'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveBook(item.id)}
                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-white/70 py-8">
                No books in this list yet. Add your first book above!
              </div>
            )}
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default EditListPage;
