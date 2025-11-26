import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PromptPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PromptPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PromptPaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 shadow-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 text-sm font-medium ${
              page === currentPage
                ? 'bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] border border-[#FFC300] shadow-lg font-bold'
                : 'bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 shadow-lg rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PromptPagination;
