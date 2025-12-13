'use client';

import { BookOpen, Edit, CheckCircle, Calendar, Flag } from 'lucide-react';
import { useReadingListStore } from '@/stores/useReadingListStore';
import type { ReadingList } from '@/stores/useReadingListStore';
import { Button } from '@/components/ui/button';

interface ReadingListHeaderProps {
  initialReadingList: ReadingList;
}

const ReadingListHeader = ({ initialReadingList }: ReadingListHeaderProps) => {
  const currentList = useReadingListStore((state) => state.currentList);
  const isEditing = useReadingListStore((state) => state.isEditing);
  const setIsEditing = useReadingListStore((state) => state.setIsEditing);
  const readingList = currentList || initialReadingList;
  const readCount =
    readingList.items?.filter((item) => item.isRead).length || 0;
  const unreadCount = (readingList.items?.length || 0) - readCount;

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 lg:p-10">
      <div className="flex flex-col space-y-4">
        {/* Header with title and edit button */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl mainFont font-bold text-yellow-400 mb-2 wrap-break-word">
              {readingList.title}
            </h1>
          </div>
          <div className="shrink-0">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={'beeYellow'}
              className="w-full sm:w-auto"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Save Changes' : 'Edit List'}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 text-white/70 text-sm bg-[#1a1a1a]/50 rounded-lg p-3">
            <BookOpen className="w-4 h-4 text-[#FFC300] shrink-0" />
            <span className="font-medium">
              {readingList.items?.length || 0} books
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm bg-[#1a1a1a]/50 rounded-lg p-3">
            <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
            <span className="font-medium">{readCount} read</span>
          </div>
          <div className="flex items-center gap-2 text-white/70 text-sm bg-[#1a1a1a]/50 rounded-lg p-3">
            <Flag className="w-4 h-4 shrink-0" />
            <span className="font-medium">{unreadCount} unread</span>
          </div>
        </div>

        {/* Description */}
        {readingList.description && (
          <div className="bg-[#1a1a1a]/30 rounded-lg p-4">
            <p className="text-white/80 leading-relaxed text-sm md:text-base">
              {readingList.description}
            </p>
          </div>
        )}

        {/* Created date */}
        <div className="flex items-center gap-2 text-white/50 text-sm bg-[#1a1a1a]/30 rounded-lg p-3">
          <Calendar className="w-4 h-4 shrink-0" />
          <span>Created {readingList.createdAt.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ReadingListHeader;
