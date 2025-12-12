'use client';
import { useState } from 'react';
import PromptCard from './PromptCard';
import PromptPagination from './PromptPagination';

interface Prompt {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  endDate: Date;
  status: 'OPEN' | 'CLOSED';
  userId: string;
  user?: {
    id: string;
    name: string;
  };
  invitedUsers: {
    id: string;
    name: string;
  }[];
  entries?: {
    id: string;
    content: string;
    createdAt: Date;
    promptId: string;
    userId: string;
    user: {
      id: string;
      name: string;
    };
    comments: {
      id: string;
      content: string;
      createdAt: Date;
      entryId: string;
      userId: string;
      user: {
        id: string;
        name: string;
      };
    }[];
  }[];
  _count?: {
    entries: number;
  };
}

interface PromptsListProps {
  prompts: Prompt[];
}

const PromptsList = ({ prompts }: PromptsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(prompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrompts = prompts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="darkContainer2 rounded-2xl min-h-[500px] py-4 md:py-8 px-4 md:px-8 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
        {Array.from(
          { length: itemsPerPage - currentPrompts.length },
          (_, index) => (
            <div
              key={`placeholder-${index}`}
              className="relative group rounded-xl p-6 shadow-lg darkContainer2 border-2 border-dashed border-yellow-500/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-[#1f1f1f]/50 rounded"></div>
                <div className="w-12 h-4 bg-[#1f1f1f]/50 rounded"></div>
              </div>
              <div className="h-6 bg-[#1f1f1f]/50 rounded mb-1"></div>
              <div className="h-4 bg-[#1f1f1f]/50 rounded mb-2"></div>
              <div className="h-4 bg-[#1f1f1f]/50 rounded mb-4"></div>
              <div className="flex justify-end">
                <div className="h-8 w-16 bg-[#1f1f1f]/50 rounded"></div>
              </div>
            </div>
          )
        )}
      </div>
      {totalPages > 1 && (
        <PromptPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default PromptsList;
