'use client';
import NewPage from '@/components/layout/NewPage';
import {
  MessageSquare,
  Plus,
  Search,
  User,
  Heart,
  Clock,
  X,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import CreateDiscussionModal from './components/CreateDiscussionModal';
import DiscussionListItem from '../../components/DiscussionListItem';

const discussions = [
  {
    id: 1,
    title: 'Chapter 5 Discussion - The Twist!',
    author: 'Sarah Chen',
    replies: 12,
    lastActivity: '2 hours ago',
    likes: 8,
    createdAt: '2024-11-20',
  },
  {
    id: 2,
    title: 'Character Analysis: Alicia Berenson',
    author: 'David Kim',
    replies: 8,
    lastActivity: '5 hours ago',
    likes: 6,
    createdAt: '2024-11-19',
  },
  {
    id: 3,
    title: 'Themes of Mental Health in the Novel',
    author: 'Mike Rodriguez',
    replies: 15,
    lastActivity: '1 day ago',
    likes: 12,
    createdAt: '2024-11-18',
  },
  {
    id: 4,
    title: 'Plot Predictions for Chapter 8',
    author: 'Emma Thompson',
    replies: 6,
    lastActivity: '2 days ago',
    likes: 4,
    createdAt: '2024-11-17',
  },
  {
    id: 5,
    title: 'Writing Style and Prose Analysis',
    author: 'James Wilson',
    replies: 9,
    lastActivity: '3 days ago',
    likes: 7,
    createdAt: '2024-11-16',
  },
];

const club = {
  name: 'Mystery Masters',
  userRole: 'Member',
};

const ClubDiscussionPage = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedDiscussions = [...discussions].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === 'newest'
      ? dateB.getTime() - dateA.getTime()
      : dateA.getTime() - dateB.getTime();
  });

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Club Discussions
              </h1>
              <p className="text-white/70">
                Join conversations about {club.name}
              </p>
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between md:mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFC300]" />
              All Discussions
              <span className="yellowBadge w-7 h-7">{discussions.length}</span>
            </h2>
            <div className="mt-4 md:mt-0">
              <CreateDiscussionModal size="default" />
            </div>
          </div>
          <div className="p-6 max-w-3xl mx-auto">
            <div className="flex gap-4 flex-col md:flex-row ">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 min-w-fit">
                <span className="text-white/60 text-sm">Sort:</span>
                <select
                  value={sortOrder}
                  onChange={(e) =>
                    setSortOrder(e.target.value as 'newest' | 'oldest')
                  }
                  className="bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg px-3 py-3 text-white text-sm focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 min-w-[140px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {sortedDiscussions.map((discussion) => (
              <DiscussionListItem discussion={discussion} key={discussion.id} />
            ))}
          </div>

          {sortedDiscussions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Discussions Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Start the conversation! Create the first discussion for your
                book club.
              </p>
              <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                <Plus className="w-5 h-5" />
                Start First Discussion
              </button>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default ClubDiscussionPage;
