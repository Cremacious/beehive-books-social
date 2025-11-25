'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FindClubs = () => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
          <Search className="w-4 h-4 text-[#FFC300]" />
        </div>
        <h2 className="text-xl font-bold text-white">Find Book Clubs</h2>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFC300]/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for book clubs..."
            className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-[#FFC300]/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant={'beeDark'}>Mystery</Button>
          <Button variant={'beeDark'}>Fantasy</Button>
          <Button variant={'beeDark'}>Romance</Button>
          <Button variant={'beeDark'}>Sci-Fi</Button>
          <Button variant={'beeDark'}>Public Clubs</Button>
        </div>
      </div>
    </div>
  );
};

export default FindClubs;
