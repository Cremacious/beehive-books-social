'use client';

import { BookOpen } from 'lucide-react';
import ClubReadingListItem from './ClubReadingListItem';
import { useState, useEffect } from 'react';
import { useClubReadingListStore } from '@/stores/useClubReadingListStore';
import type { ClubReadingList } from '@/stores/useClubReadingListStore';
import { Button } from '@/components/ui/button';

interface ClubBookListViewProps {
  readingList: ClubReadingList;
}

const ClubBookListView = ({ readingList }: ClubBookListViewProps) => {
  const {
    currentList,
    setCurrentList,
    addBookToList,
    toggleBookReadStatus,
    removeBookFromList,
    setCurrentBook,
  } = useClubReadingListStore();
  const [newBook, setNewBook] = useState({ title: '', author: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setCurrentList(readingList);
  }, [readingList, setCurrentList]);

  const books =
    currentList?.readingList.map((item) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      isRead: item.isRead,
      dateAdded: item.addedAt.toISOString().split('T')[0],
      rating: null,
      cover: '/assets/stock/cover.jpeg',
      isCurrentBook: item.bookId === currentList.currentBookId,
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

  const handleSetCurrentBook = async (itemId: string) => {
    await setCurrentBook(readingList.id, itemId);
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
      {readingList.userRole === 'OWNER' && (
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
            <BookOpen className="w-4 h-4" />
            Add Book
          </Button>
        </form>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl  mainFont text-white flex items-center gap-2">
          Books in This List
        </h2>
        <div className="flex items-center gap-3">
          {/* {readingList.userRole === 'OWNER' && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-[#FFC300]/10 hover:bg-[#FFC300]/20 text-[#FFC300] rounded-lg transition-colors flex items-center gap-2"
            >
              {isEditing ? 'Done Editing' : 'Edit List'}
            </button>
          )} */}
        </div>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <ClubReadingListItem
            key={book.id}
            book={book}
            toggleReadStatus={
              readingList.userRole === 'OWNER'
                ? handleToggleReadStatus
                : undefined
            }
            onSetCurrent={
              readingList.userRole === 'OWNER'
                ? handleSetCurrentBook
                : undefined
            }
            onDelete={
              readingList.userRole === 'OWNER' ? handleRemoveBook : undefined
            }
            isEditing={isEditing}
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
            This reading list is empty.{' '}
            {readingList.userRole === 'OWNER'
              ? 'Add some books to get started!'
              : 'The club owner will add books soon.'}
          </p>
          {readingList.userRole === 'OWNER' && (
            <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              Add Books
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClubBookListView;
