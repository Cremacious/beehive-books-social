'use client';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChapterListItem = ({
  chapter,
  chapterId,
  index,
  bookId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chapter: any;
  chapterId: number;
  index: number;
  bookId: number;
}) => {
  const router = useRouter();

  return (
    <div
      key={chapter.id}
      className="flex items-center justify-between p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-colors mb-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          {index + 1}
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">{chapter.title}</h3>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            router.push(`/my-books/${bookId}/${chapterId}`);
          }}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
        >
          Read
        </button>
        <button className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1">
          <Edit className="w-4 h-4" />
          Edit
        </button>
      </div>
    </div>
  );
};
export default ChapterListItem;
