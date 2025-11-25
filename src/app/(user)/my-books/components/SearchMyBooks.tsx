'use client';
import React, { useState } from 'react';
import { Search, SortAsc } from 'lucide-react';

const SearchMyBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 searchStyle"
          />
        </div>
        <select className="px-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white/80 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all md:w-40 md:text-md text-sm">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">Title A-Z</option>
          <option value="genre">Genre</option>
        </select>
      </div>
    </div>
  );
};

export default SearchMyBooks;
