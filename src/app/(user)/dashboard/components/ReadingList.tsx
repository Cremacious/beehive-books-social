'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import Link from 'next/link';

const ReadingList = () => {
  const books = [
    {
      title: 'The Midnight Library',
      author: 'Matt Haig',

      dateAdded: 'Nov 01, 2023',
    },
  ];

  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6 ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-xl mainFont text-white">Reading List</h3>
          </div>
        </div>
        <Link href="#">
          <Button variant="beeYellow" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="darkContainer3 rounded-2xl p-3 sm:p-4 md:p-6"
          >
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-tight flex-1 min-w-0">
                    <span className="wrap-break-word">{book.title}</span>
                  </h3>
                </div>
                <p className="text-white/70 text-sm sm:text-base">
                  by {book.author}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/60 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span>Added {book.dateAdded}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadingList;
