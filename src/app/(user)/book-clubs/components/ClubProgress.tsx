'use client';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import { updateClubProgressAction } from '@/actions/club.actions';
import { toast } from 'sonner';

export interface ClubProgressInterface {
  currentBook: {
    id: string;
    title: string;
    author: string;
    chapterCount: number;
  } | null;
  currentChapter: number;
  id: string;
}

const ClubProgress = ({
  club,
  userRole,
}: {
  club: ClubProgressInterface;
  userRole: string;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newChapter, setNewChapter] = useState(club.currentChapter);

  const progressPercentage = club.currentBook
    ? Math.min((club.currentChapter / club.currentBook.chapterCount) * 100, 100)
    : 0;

  const handleUpdateProgress = async () => {
    setIsUpdating(true);
    try {
      const result = await updateClubProgressAction(club.id, newChapter);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update progress');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!club.currentBook) return null;

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Currently Reading</h2>
      </div>

      <div className="flex items-start gap-6">
        <div className="w-24 h-32 rounded-lg overflow-hidden shrink-0">
          {/* <Image
            src={club.cover}
            alt={club.currentBook.title}
            width={96}
            height={128}
            className="w-full h-full object-cover"
          /> */}
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {club.currentBook.title}
          </h3>
          <p className="text-[#FFC300]/80 text-lg mb-4">
            by {club.currentBook.author}
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Club Progress</span>
                <span>
                  {club.currentChapter} / {club.currentBook.chapterCount}{' '}
                  chapters ({Math.round(progressPercentage)}% Complete)
                </span>
              </div>
              <div className="w-full bg-[#2a2a2a] rounded-full h-3">
                <div
                  className="bg-[#FFC300] h-3 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {userRole === 'OWNER' && (
              <div className="flex items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-white text-sm">Chapter:</label>
                  <input
                    type="number"
                    min="0"
                    max={club.currentBook.chapterCount}
                    value={newChapter}
                    onChange={(e) =>
                      setNewChapter(parseInt(e.target.value) || 0)
                    }
                    className="w-16 bg-[#1a1a1a] border border-[#FFC300]/20 rounded px-2 py-1 text-white text-sm"
                  />
                </div>
                <Button
                  size={'sm'}
                  variant={'beeYellow'}
                  onClick={handleUpdateProgress}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Progress'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProgress;
