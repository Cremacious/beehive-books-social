'use client';

import { Button } from '@/components/ui/button';
import { Calendar, BookOpen } from 'lucide-react';
import Link from 'next/link';

type ReadingListItem = {
  id: string;
  title: string;
  author: string;
  addedAt: Date;
  isRead: boolean;
  book: {
    id: string;
    cover: string | null;
  } | null;
};

type ReadingListProps = {
  items: ReadingListItem[];
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const ReadingList = ({ items }: ReadingListProps) => {
  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl mainFont text-white">Reading List</h3>
        </div>
        <Link href="/reading-lists">
          <Button variant="beeYellow" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="darkContainer3 rounded-2xl p-3 sm:p-4 md:p-6"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight flex-1 min-w-0">
                    <span className="wrap-break-word">{item.title}</span>
                  </h3>
                  {item.isRead && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      Read
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-sm sm:text-base">
                  by {item.author}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/60 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>Added {formatDate(item.addedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-8 text-white/50">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No books in your reading lists yet</p>
            {/* <Link href="/reading-lists">
              <Button variant="beeYellow" size="sm" className="mt-4">
                Create a List
              </Button>
            </Link> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReadingList;
