'use client';
import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SearchMyBooksProps {
  searchTerm: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const SearchMyBooks = ({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortChange,
}: SearchMyBooksProps) => {
  return (
    <div className="space-y-4 mb-6 darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="text-4xl mainFont text-white flex justify-center items-center font-bold">
          Your Books
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <Link href="/my-books/create">
            <Button
              variant={'beeYellow'}
              size={'lg'}
              className="flex items-center justify-center space-x-2 w-full"
            >
              <Plus size={20} />
              New Book
            </Button>
          </Link>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your books..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 searchStyle"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white/80 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all md:w-40 md:text-md text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchMyBooks;
