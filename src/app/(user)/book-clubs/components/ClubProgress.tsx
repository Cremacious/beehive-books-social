'use client';

import { BookOpen, MessageCircle, Target } from 'lucide-react';
import Image from 'next/image';
import { BookClubType } from '@/lib/types';
import { Button } from '@/components/ui/button';

const ClubProgress = ({ club }: { club: BookClubType }) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-[#FFC300]" />
        </div>
        <h2 className="text-xl font-bold text-white">Currently Reading</h2>
      </div>

      <div className="flex items-start gap-6">
        <div className="w-24 h-32 rounded-lg overflow-hidden shrink-0">
          <Image
            src={club.cover}
            alt={club.currentBook}
            width={96}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2">
            {club.currentBook}
          </h3>
          <p className="text-[#FFC300]/80 text-lg mb-4">by {club.author}</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-white/70 mb-2">
                <span>Club Progress</span>
                <span>75% Complete</span>
              </div>
              <div className="w-full bg-[#2a2a2a] rounded-full h-3">
                <div
                  className="bg-[#FFC300] h-3 rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <Button size={'sm'} variant={'beeYellow'}>
                <Target className="w-4 h-4" />
                Update Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubProgress;
