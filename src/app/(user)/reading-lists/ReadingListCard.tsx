import { Button } from '@/components/ui/button';
import { BookOpen, Star } from 'lucide-react';
import Link from 'next/link';

export interface ReadingListBook {
  id: number;
  title: string;
  author: string;
}

export interface ReadingList {
  id: number;
  name: string;
  description: string;
  bookCount: number;
  createdDate: string;
  isPublic: boolean;
  books: ReadingListBook[];
}

export interface ReadingListCardProps {
  list: ReadingList;
}

const ReadingListCard = ({ list }: ReadingListCardProps) => {
  return (
    <div
      key={list.id}
      className="darkContainer3 rounded-xl p-6 flex flex-col justify-between items-stretch w-full h-[300px] "
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">{list.name}</h3>
            <p className="text-white/70 text-sm mb-3 line-clamp-2">
              {list.description}
            </p>
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <div className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {list.bookCount} books
              </div>
              {list.isPublic && (
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  Public
                </div>
              )}
            </div>
          </div>
        </div>

        {/* {list.books.length > 0 && (
          <div className="space-y-2 mb-2">
            <h4 className="text-sm font-medium text-white/80">Recent Books:</h4>
            {list.books.slice(0, 3).map((book) => (
              <div key={book.id} className="text-sm text-white/60">
                <span className="font-medium">{book.title}</span> by{' '}
                {book.author}
              </div>
            ))}
            {list.books.length > 3 && (
              <div className="text-sm text-[#FFC300]/60">
                +{list.books.length - 3} more books
              </div>
            )}
          </div>
        )} */}
      </div>

      <div className="mt-auto pt-4 border-t border-[#FFC300]/10 flex flex-col gap-3">
        <p className="text-white/50 text-xs">Created {list.createdDate}</p>
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
