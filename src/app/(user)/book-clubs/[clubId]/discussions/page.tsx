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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
  });
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const handleCreateDiscussion = () => {

    console.log('Creating discussion:', newDiscussion);
    setShowCreateModal(false);
    setNewDiscussion({ title: '', content: '' });
  };

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
    
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Club Discussions
              </h1>
              <p className="text-white/70">
                Join conversations about {club.name}
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-[#FFC300] text-black font-bold rounded-xl hover:bg-[#FFD700] transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Discussion
            </button>
          </div>
        </div>


        <div className="customDark2 rounded-2xl shadow-xl p-6 border border-[#2a2a2a]">
          <div className="flex gap-4">
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

  
        <div className="customDark2 rounded-2xl shadow-xl p-6 md:p-8 border border-[#2a2a2a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFC300]" />
              All Discussions ({discussions.length})
            </h2>
          </div>

          <div className="space-y-4">
            {sortedDiscussions.map((discussion) => (
              <Link
                key={discussion.id}
                href={`/book-clubs/${111}/discussions/${discussion.id}`}
              >
                <div className="bg-[#1a1a1a] rounded-xl p-6 hover:bg-[#2a2a2a] transition-all cursor-pointer border border-[#FFC300]/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {discussion.title}
                      </h3>
                      <div className="flex items-center gap-4 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          {discussion.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies} replies
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          {discussion.likes} likes
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {discussion.lastActivity}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3"
              >
                <Plus className="w-5 h-5" />
                Start First Discussion
              </button>
            </div>
          )}
        </div>
      </div>


      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-2xl w-full border border-[#FFC300]/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Create New Discussion
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={newDiscussion.title}
                onChange={(e) =>
                  setNewDiscussion({ ...newDiscussion, title: e.target.value })
                }
                placeholder="Discussion title..."
                className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50"
              />
              <textarea
                value={newDiscussion.content}
                onChange={(e) =>
                  setNewDiscussion({
                    ...newDiscussion,
                    content: e.target.value,
                  })
                }
                placeholder="Start the conversation..."
                rows={6}
                className="w-full bg-[#2a2a2a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a2a] text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDiscussion}
                className="flex-1 px-4 py-3 bg-[#FFC300] hover:bg-[#FFD700] text-black rounded-lg font-medium transition-colors"
              >
                Create Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </NewPage>
  );
};

export default ClubDiscussionPage;
