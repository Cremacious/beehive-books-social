'use client';

import { BookOpen, Edit, CheckCircle, Circle, Calendar } from 'lucide-react';
import { useClubReadingListStore } from '@/stores/useClubReadingListStore';
import type { ClubReadingList } from '@/stores/useClubReadingListStore';

interface ClubReadingListHeaderProps {
  initialReadingList: ClubReadingList;
}

const ClubReadingListHeader = ({
  initialReadingList,
}: ClubReadingListHeaderProps) => {
  const currentList = useClubReadingListStore((state) => state.currentList);
  const isEditing = useClubReadingListStore((state) => state.isEditing);
  const setIsEditing = useClubReadingListStore((state) => state.setIsEditing);
  const readingList = currentList || initialReadingList;
  const readCount =
    readingList.readingList?.filter((item) => item.isRead).length || 0;
  const unreadCount = (readingList.readingList?.length || 0) - readCount;

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
                {readingList.name} Reading List
              </h1>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {readingList.readingList?.length || 0} books
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
              Club Reading List
            </div>
          </div>
        </div>
        {readingList.userRole === 'OWNER' && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-xl transition-all flex items-center gap-2"
          >
            <Edit className="w-5 h-5" />
            {isEditing ? 'Save Changes' : 'Edit List'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ClubReadingListHeader;
