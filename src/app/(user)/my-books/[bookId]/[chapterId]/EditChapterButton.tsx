'use client';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EditChapterButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(`/my-books/111/11/edit`);
      }}
      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
    >
      <Edit className="w-4 h-4" />
      Edit
    </button>
  );
};
export default EditChapterButton;
