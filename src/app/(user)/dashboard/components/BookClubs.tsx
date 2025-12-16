'use client';

import {
  Users,
  Crown,
  MessageSquare,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ClubActivity = {
  id: string;
  club: {
    id: string;
    name: string;
    cover: string | null;
    memberCount: number;
  };
  member: {
    id: string;
    name: string;
    image: string | null;
    role: 'OWNER' | 'MEMBER';
  };
  action: 'discussion' | 'book_added' | 'progress_updated';
  details: string;
  createdAt: Date;
};

type BookClubsProps = {
  activities: ClubActivity[];
};

const getActionIcon = (action: ClubActivity['action']) => {
  switch (action) {
    case 'discussion':
      return <MessageSquare className="w-4 h-4 text-blue-400" />;
    case 'book_added':
      return <BookOpen className="w-4 h-4 text-green-400" />;
    case 'progress_updated':
      return <TrendingUp className="w-4 h-4 text-[#FFC300]" />;
  }
};

const getActionLabel = (action: ClubActivity['action']) => {
  switch (action) {
    case 'discussion':
      return 'New Discussion';
    case 'book_added':
      return 'Book Added';
    case 'progress_updated':
      return 'Progress Updated';
  }
};

const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const BookClubs = ({ activities }: BookClubsProps) => {
  return (
    <section className="darkContainer2 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl mainFont text-white">Book Clubs Activity</h3>
        </div>
        <Link href="/book-clubs">
          <Button variant="beeYellow" size="sm">
            View All
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="darkContainer3 rounded-xl p-4 hover:bg-[#3a3a3a] transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Link
                    href={`/book-clubs/${activity.club.id}`}
                    className="font-semibold text-white hover:text-[#FFC300] transition-colors truncate"
                  >
                    {activity.club.name}
                  </Link>
                  <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[#404040]">
                    {getActionIcon(activity.action)}
                    <span className="text-white/70">
                      {getActionLabel(activity.action)}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-full bg-[#505050] flex items-center justify-center">
                    {activity.member.role === 'OWNER' ? (
                      <Crown className="w-3 h-3 text-[#FFC300]" />
                    ) : (
                      <span className="text-xs text-white/70">
                        {activity.member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-white/70">
                    {activity.member.name}
                    {activity.member.role === 'OWNER' && (
                      <span className="text-[#FFC300] ml-1">(Owner)</span>
                    )}
                  </span>
                </div>

                <p className="text-sm text-white/80 line-clamp-2">
                  {activity.details}
                </p>

                <div className="flex items-center justify-between mt-3">
                 
                  <span className="text-xs text-white/50">
                    {formatTimeAgo(activity.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {activities.length === 0 && (
          <div className="text-center py-8 text-white/50">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No recent club activity</p>
            {/* <Link href="/book-clubs">
              <Button variant="beeYellow" size="sm" className="mt-4">
                Join a Club
              </Button>
            </Link> */}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookClubs;