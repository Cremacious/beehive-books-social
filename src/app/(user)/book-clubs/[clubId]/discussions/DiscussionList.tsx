'use client';

import { MessageSquare, Plus, Search } from 'lucide-react';
import DiscussionListItem from '../../components/DiscussionListItem';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BookPagination from '../../../my-books/components/BookPagination';

interface DiscussionItem {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  likes: number;
  createdAt: string;
}

interface DiscussionListProps {
  discussions: DiscussionItem[];
  clubId: string;
}

const DISCUSSIONS_PER_PAGE = 5;

const DiscussionList = ({ discussions, clubId }: DiscussionListProps) => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedDiscussions = [...discussions].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'newest'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  const totalPages = Math.ceil(sortedDiscussions.length / DISCUSSIONS_PER_PAGE);
  const startIdx = (currentPage - 1) * DISCUSSIONS_PER_PAGE;
  const endIdx = startIdx + DISCUSSIONS_PER_PAGE;
  const discussionsToShow = sortedDiscussions.slice(startIdx, endIdx);

  return (
    <div className="">
      <div className="p-6 max-w-3xl mx-auto darkContainer2 rounded-2xl my-6 md:my-8">
        <div className="flex gap-4 flex-col md:flex-row items-center">
          <Link href={`/book-clubs/${clubId}/discussions/create`}>
            <Button variant={'beeYellow'}>
              <Plus className="w-5 h-5" />
              New Discussion
            </Button>
          </Link>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 min-w-fit">
            <span className="text-white/60 text-sm">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as 'newest' | 'oldest')
              }
              className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 min-w-[140px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      <div className="border-2 border-yellow-500/30 rounded-2xl min-h-[600px] py-8 md:py-8 px-4 md:px-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          {discussionsToShow.map((discussion) => (
            <DiscussionListItem
              discussion={discussion}
              clubId={clubId}
              key={discussion.id}
            />
          ))}

          {Array.from(
            { length: DISCUSSIONS_PER_PAGE - discussionsToShow.length },
            (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="darkContainer2 rounded-xl p-4 md:p-6 mb-4 border-2 border-dashed border-yellow-500/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-h-[120px] md:min-h-20"
              >
                <div className="flex-1 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center">
                
                  </div>
                </div>
                
              </div>
            )
          )}
        </div>

        {sortedDiscussions.length > DISCUSSIONS_PER_PAGE && (
          <div className="mt-8">
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {sortedDiscussions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
            <MessageSquare className="w-12 h-12 text-[#FFC300]" />
          </div>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
            No Discussions Yet
          </h3>
          <p className="text-white/70 mb-8 max-w-md leading-relaxed">
            Start the conversation! Create the first discussion for your book
            club.
          </p>
          <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
            <Plus className="w-5 h-5" />
            Start First Discussion
          </button>
        </div>
      )}
    </div>
  );
};
export default DiscussionList;
