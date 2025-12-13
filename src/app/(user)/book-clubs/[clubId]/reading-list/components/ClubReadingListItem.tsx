import { Button } from '@/components/ui/button';
import {
  Calendar,
  CheckCircle,
  Circle,
  Star,
  Crown,
} from 'lucide-react';
// import { useClubReadingListStore } from '@/stores/useClubReadingListStore';

export interface ClubReadingListBookItem {
  id: string;
  title: string;
  author: string;
  isRead: boolean;
  dateAdded: string;
  rating: number | null;
  cover: string;
  isCurrentBook: boolean;
}

export interface ClubReadingListItemProps {
  book: ClubReadingListBookItem;
  toggleReadStatus?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSetCurrent?: (id: string) => void;
  isEditing?: boolean;
}

const ClubReadingListItem = ({
  book,
  toggleReadStatus,
  onDelete,
  onSetCurrent,
  isEditing = false,
}: ClubReadingListItemProps) => {
  return (
    <div className="darkContainer3 rounded-2xl p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight flex-1 min-w-0">
              <span className="wrap-break-word">{book.title}</span>
            </h3>
            {book.isCurrentBook && (
              <span className="px-2 py-1 bg-[#FFC300]/20 text-[#FFC300] text-xs rounded-full whitespace-nowrap shrink-0 mt-0.5">
                Currently Reading
              </span>
            )}
          </div>
          <p className="text-white/70 text-sm sm:text-base">by {book.author}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/60 text-xs sm:text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 shrink-0" />
            <span>Added {book.dateAdded}</span>
          </div>
          {book.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current shrink-0" />
              <span>{book.rating}/5</span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {toggleReadStatus && (
            <Button
              onClick={() => toggleReadStatus(book.id)}
              variant={book.isRead ? 'beeSuccess' : 'beeDark'}
              size={'default'}
              className="flex-1 sm:flex-none min-h-11 sm:min-h-8"
            >
              {book.isRead ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Read
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Mark as Read
                </>
              )}
            </Button>
          )}

          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1 sm:flex-none">
              {onSetCurrent && !book.isCurrentBook && (
                <Button
                  onClick={() => onSetCurrent(book.id)}
                  variant={'beeYellow'}
                  size={'default'}
                  className="flex-1 sm:flex-none min-h-11 sm:min-h-8"
                >
                  <Crown className="w-4 h-4" />
                  <span className="hidden sm:inline">Make Current Book</span>
                  <span className="sm:hidden">Set Current</span>
                </Button>
              )}
              {onDelete && (
                <Button
                  onClick={() => onDelete(book.id)}
                  variant={'destructive'}
                  size={'default'}
                  className="flex-1 sm:flex-none min-h-11 sm:min-h-8"
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubReadingListItem;
