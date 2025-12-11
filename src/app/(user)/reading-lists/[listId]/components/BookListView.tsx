'use client';

import ReadingListItem from './ReadingListItem';
import { useState, useEffect } from 'react';
import { useReadingListStore } from '@/stores/useReadingListStore';
import type { ReadingList } from '@/stores/useReadingListStore';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookListViewProps {
  readingList: ReadingList;
}

const BookListView = ({ readingList }: BookListViewProps) => {
  const {
    currentList,
    setCurrentList,
    addBookToList,
    toggleBookReadStatus,
    removeBookFromList,
  } = useReadingListStore();
  const [newBook, setNewBook] = useState({ title: '', author: '' });

  useEffect(() => {
    setCurrentList(readingList);
  }, [readingList, setCurrentList]);

  const books =
    currentList?.items.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      isRead: item.isRead,
      dateAdded: item.addedAt.toISOString().split('T')[0],
      rating: null,
      cover: '/assets/stock/cover.jpeg',
    })) || [];

  const handleAddBook = async () => {
    if (newBook.title.trim() && newBook.author.trim()) {
      const formData = new FormData();
      formData.append('title', newBook.title.trim());
      formData.append('author', newBook.author.trim());
      await addBookToList(readingList.id, formData);
      setNewBook({ title: '', author: '' });
    }
  };

  const handleToggleReadStatus = async (bookId: string) => {
    await toggleBookReadStatus(readingList.id, bookId);
  };

  const handleRemoveBook = async (itemId: string) => {
    await removeBookFromList(readingList.id, itemId);
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
      <form
        className="flex flex-col md:flex-row items-center gap-4 mb-8 p-4 rounded-xl "
        onSubmit={(e) => {
          e.preventDefault();
          handleAddBook();
        }}
      >
        <input
          type="text"
          placeholder="Book Title"
          className="flex-1 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          className="flex-1 px-4 py-2 rounded-lg bg-[#232323] text-white placeholder:text-white/40 border border-[#FFC300]/20 focus:border-[#FFC300] focus:outline-none"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          required
        />
        <Button type="submit" variant={'beeYellow'}>
          <Plus className="w-4 h-4" />
          Add Book
        </Button>
      </form>
      <div className="border mx-auto w-full border-yellow-600 mb-8" />
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Books in This List
        </h2>
     
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <ReadingListItem
            key={book.id}
            book={book}
            toggleReadStatus={handleToggleReadStatus}
            onDelete={handleRemoveBook}
          />
        ))}
      </div>

      {books.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6"></div>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
            No Books in This List
          </h3>
          <p className="text-white/70 mb-8 max-w-md leading-relaxed">
            This reading list is empty. Add some books to get started!
          </p>
          <Button variant={'beeYellow'}>
            <Plus className="w-5 h-5" />
            Add Books
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookListView;
