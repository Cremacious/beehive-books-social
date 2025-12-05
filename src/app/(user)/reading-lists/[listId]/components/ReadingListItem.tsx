import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, CheckCircle, Circle, Star } from 'lucide-react';
import { useReadingListStore } from '@/stores/useReadingListStore';

export interface ReadingListBookItem {
  id: string;
  title: string;
  author: string;
  isRead: boolean;
  dateAdded: string;
  rating: number | null;
  cover: string;
}

export interface ReadingListItemProps {
  book: ReadingListBookItem;
  toggleReadStatus?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const ReadingListItem = ({
  book,
  toggleReadStatus,
  onDelete,
}: ReadingListItemProps) => {
  const isEditing = useReadingListStore((state) => state.isEditing);
  return (
    <div key={book.id} className="darkContainer3 rounded-2xl p-4 md:p-6 ">
      <div className="flex items-start gap-6">
        <div className="w-16 h-24 bg-[#FFC300]/10 rounded-lg flex items-center justify-center shrink-0">
          <BookOpen className="w-8 h-8 text-[#FFC300]/60" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {book.title}
              </h3>
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
              <button
                onClick={() => toggleReadStatus?.(book.id)}
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
              {isEditing && (
                <Button onClick={() => onDelete?.(book.id)}>Delete</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReadingListItem;
