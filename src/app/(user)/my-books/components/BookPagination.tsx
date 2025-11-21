import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookPagination = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#FFC300]/20 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 shadow-lg"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#FFC300]/20 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 text-sm font-medium">
          1
        </button>

        <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] border border-[#FFC300] shadow-lg text-sm font-bold">
          2
        </button>

        <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#FFC300]/20 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 text-sm font-medium">
          3
        </button>

        <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#FFC300]/20 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 text-sm font-medium">
          4
        </button>
      </div>

      <button
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#FFC300]/20 bg-[#1b1b1b] text-[#FFC300]/70 hover:bg-[#FFC300]/10 hover:text-[#FFC300] hover:border-[#FFC300]/40 transition-all duration-200 shadow-lg"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BookPagination;
