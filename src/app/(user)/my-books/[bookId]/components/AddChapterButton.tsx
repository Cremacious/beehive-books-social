'use client';
import { useRouter } from 'next/navigation';

import { Plus } from 'lucide-react';

const AddChapterButton = ({ bookId }: { bookId: number }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/my-books/${bookId}/create-chapter`);
      }}
      className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
    >
      <Plus className="w-4 h-4" />
      Add Chapter
    </button>
  );
};

export default AddChapterButton;
