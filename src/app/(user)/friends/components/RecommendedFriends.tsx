'use client';

import { UserPlus, Users, Earth } from 'lucide-react';
import { Button } from '@/components/ui/button';

const recommendations = [
  {
    id: 4,
    name: 'James Wilson',
    username: 'jamesnovels',
    avatar: null,
    reason: '3 mutual friends',
    genres: ['Historical Fiction', 'Adventure'],
    booksPublished: 2,
  },
  {
    id: 5,
    name: 'Rachel Green',
    username: 'rachelpoetry',
    avatar: null,
    reason: 'Shares your interest in Poetry',
    genres: ['Poetry', 'Literary Fiction'],
    booksPublished: 1,
  },
];

const RecommendedFriends = () => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
        People You Might Know
      </h2>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="darkContainer3 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-semibold">
                  {rec.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white truncate">
                  {rec.name}
                </h4>

                <p className="text-white/60 text-sm">3 mutual friends</p>
              </div>
            </div>
            <Button
              size={'sm'}
              variant={'beeYellow'}
              className="w-full mt-4 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add Friend
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecommendedFriends;
