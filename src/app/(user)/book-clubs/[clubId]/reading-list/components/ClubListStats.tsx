'use client';

import { CheckCircle, Circle } from 'lucide-react';
import { useClubReadingListStore } from '@/stores/useClubReadingListStore';

const ClubListStats = () => {
  const items = useClubReadingListStore(
    (state) => state.currentList?.readingList || []
  );
  const readCount = items.filter((item) => item.isRead).length;
  const unreadCount = items.length - readCount;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Books Read</h3>
            <p className="text-white/60 text-sm">
              {readCount} of {items.length} books
            </p>
          </div>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                items.length > 0 ? (readCount / items.length) * 100 : 0
              }%`,
            }}
          ></div>
        </div>
      </div>

      <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FFC300]/20 rounded-lg flex items-center justify-center">
            <Circle className="w-5 h-5 text-[#FFC300]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Books to Read</h3>
            <p className="text-white/60 text-sm">{unreadCount} remaining</p>
          </div>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-2">
          <div
            className="bg-[#FFC300] h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                items.length > 0 ? (unreadCount / items.length) * 100 : 0
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ClubListStats;
