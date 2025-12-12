import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export interface ReadingListItem {
  id: string;
  title: string;
  author: string;
  addedAt: Date;
  isRead: boolean;
  bookId: string | null;
}

export interface ReadingList {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  items: ReadingListItem[];
  _count?: {
    items: number;
  };
}

export interface ReadingListCardProps {
  list: ReadingList;
}

const ReadingListCard = ({ list }: ReadingListCardProps) => {
  const bookCount = list._count?.items || list.items.length;
  const createdDate = new Date(list.createdAt).toLocaleDateString();

  return (
    <div
      key={list.id}
      className="darkContainer3 rounded-xl p-6 flex flex-col justify-between items-stretch w-full h-[300px] "
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{list.title}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">
              {list.description || 'No description'}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {bookCount} books
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[#FFC300]/10 flex flex-col gap-3">
        <p className="text-white/50 text-xs">Created {createdDate}</p>
        <Link href={`/reading-lists/${list.id}`}>
          <Button variant={'beeYellow'} className="w-full  mt-2">
            View List
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReadingListCard;
