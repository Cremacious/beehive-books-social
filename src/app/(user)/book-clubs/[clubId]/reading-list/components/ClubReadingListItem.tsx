import { Button } from '@/components/ui/button';
import {
  BookOpen,
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
    <div key={book.id} className="darkContainer3 rounded-2xl p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
       

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white wrap-break-word">
                  {book.title}
                </h3>
                {book.isCurrentBook && (
                  <span className="px-2 py-1 bg-[#FFC300]/20 text-[#FFC300] text-xs rounded-full whitespace-nowrap">
                    Currently Reading
                  </span>
                )}
              </div>
              <p className="text-white/70 mb-3">by {book.author}</p>
              <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Added {book.dateAdded}
                </div>
                {book.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    {book.rating}/5
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full sm:w-auto sm:flex-row sm:gap-4">
              {toggleReadStatus && (
                <button
                  onClick={() => toggleReadStatus(book.id)}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium w-full sm:w-auto ${
                    book.isRead
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30'
                      : 'bg-[#FFC300]/20 text-[#FFC300] hover:bg-[#FFC300]/30 border border-[#FFC300]/30'
                  }`}
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
                </button>
              )}
              {isEditing && onSetCurrent && !book.isCurrentBook && (
                <button
                  onClick={() => onSetCurrent(book.id)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition-all text-sm font-medium w-full sm:w-auto border border-blue-500/30"
                >
                  <Crown className="w-4 h-4" />
                  Make Current Book
                </button>
              )}
              {isEditing && onDelete && (
                <Button
                  onClick={() => onDelete(book.id)}
                  variant={'destructive'}
                  className="w-full sm:w-auto"
                  size="sm"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubReadingListItem;
