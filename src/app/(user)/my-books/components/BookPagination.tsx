'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BookPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-3">
      <button
        className="flex items-center justify-center w-10 h-10 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] transition-all duration-200 shadow-lg rounded-xl"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${
              page === currentPage
                ? 'bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] border border-[#FFC300] shadow-lg font-bold'
                : 'bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] transition-all duration-200 font-medium'
            } text-sm`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] transition-all duration-200 shadow-lg"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BookPagination;
