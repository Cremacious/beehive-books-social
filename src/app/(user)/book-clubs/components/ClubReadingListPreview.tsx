import { Vote } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ReadingListType } from '@/lib/types';
import { Button } from '@/components/ui/button';

const ClubReadingListPreview = ({
  clubId,
  readingList,
}: {
  clubId: number;
  readingList: ReadingListType[];
}) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Vote className="w-5 h-5 text-[#FFC300]" />
          Reading List
        </h3>
        <Link href={`/book-clubs/${clubId}/reading-list`}>
          <Button size={'sm'} variant={'beeYellow'}>
            View Full List
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {readingList.map((book) => (
          <div key={book.id} className="darkContainer3 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium truncate">
                  {book.title}
                </h4>
                <p className="text-[#FFC300]/60 text-xs truncate">
                  by {book.author}
                </p>
              </div>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded-full text-center ${
                book.status === 'completed'
                  ? 'bg-green-500/20 text-green-400'
                  : book.status === 'current'
                  ? 'bg-[#FFC300]/20 text-[#FFC300]'
                  : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {book.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubReadingListPreview;
