'use client';

import ReadingListCard from './ReadingListCard';
import { ReadingList } from './ReadingListCard';
import { useState } from 'react';
import BookPagination from '../my-books/components/BookPagination';

const LISTS_PER_PAGE = 6;

const ReadingListDisplay = ({
  readingLists,
}: {
  readingLists: ReadingList[];
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(readingLists.length / LISTS_PER_PAGE);
  const startIdx = (currentPage - 1) * LISTS_PER_PAGE;
  const endIdx = startIdx + LISTS_PER_PAGE;
  const listsToShow = readingLists.slice(startIdx, endIdx);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listsToShow.map((list) => (
          <ReadingListCard key={list.id} list={list} />
        ))}

        {Array.from(
          { length: LISTS_PER_PAGE - listsToShow.length },
          (_, index) => (
            <div
              key={`placeholder-${index}`}
              className="flex flex-col w-full rounded-xl shadow-lg darkContainer3 overflow-hidden border-2 border-dashed border-yellow-500/30 h-[300px]"
            >
              <div className="flex-1 flex items-center justify-center bg-[#1f1f1f]/50"></div>
            </div>
          )
        )}
      </div>

      {readingLists.length > LISTS_PER_PAGE && (
        <div className="mt-8">
          <BookPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
export default ReadingListDisplay;
