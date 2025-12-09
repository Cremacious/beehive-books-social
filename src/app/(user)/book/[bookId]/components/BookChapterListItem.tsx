'use client';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookChapterListItem = ({
  chapter,
  chapterId,
  index,
  bookId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chapter: any;
  chapterId: string;
  index: number;
  bookId: string;
}) => {


  return (
    <div
      key={chapter.id}
      className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 darkContainer3 highlightYellow rounded-xl mb-4"
    >
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="yellowBadge w-8 h-8">{index + 1}</div>
        <div>
          <h3 className="font-semibold text-white">{chapter.title}</h3>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Link href={`/book/${bookId}/${chapterId}`}>
          <Button variant={'beeYellow'}>Read</Button>
        </Link>


      </div>
    </div>
  );
};
export default BookChapterListItem;
