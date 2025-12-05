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
  const itemsPerPage = 9;

  const totalPages = Math.ceil(prompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrompts = prompts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentPrompts.length > 0 ? (
          currentPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))
        ) : (
          <div className="text-center text-white/70 py-8">
            You haven&apos;t created any prompts yet.
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <PromptPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
export default PromptsList;
