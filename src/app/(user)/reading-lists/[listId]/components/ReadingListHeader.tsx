'use client';

import { BookOpen, Edit, CheckCircle, Circle, Calendar } from 'lucide-react';
import { useReadingListStore } from '@/stores/useReadingListStore';
import type { ReadingList } from '@/stores/useReadingListStore';

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
    <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#FFC300]/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#FFC300]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {readingList.title}
              </h1>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {readingList.items?.length || 0} books
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  {readCount} read
                </div>
                <div className="flex items-center gap-1">
                  <Circle className="w-4 h-4" />
                  {unreadCount} unread
                </div>
              </div>
            </div>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            {readingList.description}
          </p>
          <div className="flex items-center gap-4 text-white/50 text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Created {readingList.createdAt.toLocaleDateString()}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2"
        >
          <Edit className="w-5 h-5" />
          {isEditing ? 'Save Changes' : 'Edit List'}
        </button>
      </div>
    </div>
  );
};

export default ReadingListHeader;
