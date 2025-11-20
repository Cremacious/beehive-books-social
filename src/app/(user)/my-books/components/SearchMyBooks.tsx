'use client';
import React, { useState } from 'react';
import { Search, SortAsc } from 'lucide-react';

const SearchMyBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="customDark2 rounded-2xl shadow-xl p-4 md:p-6">
      <div className="flex items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-slate-900 placeholder-slate-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchMyBooks;
