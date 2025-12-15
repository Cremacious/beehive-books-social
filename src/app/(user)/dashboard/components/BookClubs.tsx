'use client';

import { Users, MessageCircle, Calendar, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BookClubs = () => {
  const clubs = [
    {
      name: 'Fantasy Writers Hive',
      members: 156,
      nextMeeting: 'Tomorrow 7 PM',
      recentActivity: 'New chapter discussion',
      role: 'Member',
    },
    {
      name: 'Romance Authors Circle',
      members: 89,
      nextMeeting: 'Friday 6 PM',
      recentActivity: 'Character development workshop',
      role: 'Moderator',
    },
    {
      name: 'Sci-Fi Storytellers',
      members: 234,
      nextMeeting: 'Next Week',
      recentActivity: 'World-building tips shared',
      role: 'Member',
    },
  ];

  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6 ">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-xl mainFont text-white">Book Clubs</h3>
          </div>
        </div>
        <Button variant={'beeYellow'} size={'sm'}>
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {clubs.map((club, index) => (
          <div key={index} className="darkContainer3 rounded-xl p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white mb-2 wrap-break-word">
                    {club.name}
                  </h4>
                  <div className="flex flex-col gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Users size={12} />
                      <span>{club.members} members</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
                      club.role === 'Moderator'
                        ? 'bg-[#FFC300]/20 text-[#FFC300]'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                  >
                    {club.role === 'Moderator' && (
                      <Crown size={10} className="mr-1" />
                    )}
                    {club.role}
                  </div>
                  <div className="flex justify-end pt-2 md:mt-4">
                    <Link href="#">
                      <Button variant="beeYellow" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookClubs;
