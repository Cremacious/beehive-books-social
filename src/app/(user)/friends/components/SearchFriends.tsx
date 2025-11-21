'use client';

import { Search } from 'lucide-react';

const SearchFriends = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
        <Search className="w-5 h-5" />
        Find Friends
      </h2>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <input
          type="text"
          placeholder="Search by email or username"
          className="w-full bg-[#1a1a1a] border border-yellow-500/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
        />
      </div>
    </div>
  );
};
export default SearchFriends;
