import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Circle,
  Star,
  Crown,
} from 'lucide-react';
import { useClubReadingListStore } from '@/stores/useClubReadingListStore';

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
}

const ClubReadingListItem = ({
  book,
  toggleReadStatus,
  onDelete,
}: ClubReadingListItemProps) => {
  const isEditing = useClubReadingListStore((state) => state.isEditing);

  return (
    <div key={book.id} className="darkContainer3 rounded-2xl p-4 md:p-6 ">
      <div className="flex items-start gap-6">
        <div className="w-16 h-24 bg-[#FFC300]/10 rounded-lg flex items-center justify-center shrink-0 relative">
          <BookOpen className="w-8 h-8 text-[#FFC300]/60" />
          {book.isCurrentBook && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#FFC300] rounded-full flex items-center justify-center">
              <Crown className="w-3 h-3 text-black" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{book.title}</h3>
                {book.isCurrentBook && (
                  <span className="px-2 py-1 bg-[#FFC300]/20 text-[#FFC300] text-xs rounded-full">
                    Currently Reading
                  </span>
                )}
              </div>
              <p className="text-white/70 mb-3">by {book.author}</p>
              <div className="flex items-center gap-4 text-white/60 text-sm">
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
            <div className="flex flex-row gap-4">
              {toggleReadStatus && (
                <button
                  onClick={() => toggleReadStatus(book.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    book.isRead
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-[#FFC300]/20 text-[#FFC300] hover:bg-[#FFC300]/30'
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
              {isEditing && onDelete && (
                <Button onClick={() => onDelete(book.id)}>Delete</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubReadingListItem;
