'use client';
import NewPage from '@/components/layout/NewPage';
import {
  ArrowLeft,
  User,
  MessageSquare,
  Heart,
  Reply,
  Send,
  Clock,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


const discussion = {
  id: 1,
  title: 'Chapter 5 Discussion - The Twist!',
  createdAt: '2024-11-20T14:30:00Z',
  views: 47,
  likes: 12,
  author: {
    id: 1,
    name: 'Sarah Chen',
    avatar: null,
    role: 'Moderator',
    joinDate: '2024-10-16',
    postCount: 156,
  },
  content: `I've been thinking a lot about the twist in Chapter 5, and I wanted to start a discussion about it. Without spoiling too much for those who haven't read it yet, I found the revelation about Alicia's past to be both surprising and perfectly foreshadowed.

What did everyone think of how the author built up to this moment? Were there any clues you caught that I might have missed? And how does this change your perception of the other characters?

I'm particularly interested in discussing:
- The symbolism of the broken mirror
- Whether the twist felt earned or came out of nowhere
- How this affects Alicia's character development

Looking forward to hearing everyone's thoughts!`,
};

const replies = [
  {
    id: 1,
    author: {
      id: 2,
      name: 'David Kim',
      avatar: null,
      role: 'Member',
      joinDate: '2024-10-18',
      postCount: 89,
    },
    content: `Great points, Sarah! I actually caught the mirror symbolism early on - the way it's described as "fractured reflections" really stood out to me. It made perfect sense in hindsight.

What really surprised me was how the twist actually made me re-evaluate the entire first four chapters. Suddenly, all those seemingly random details about Alicia's daily routine took on new meaning. Did anyone else feel like they needed to go back and re-read those sections?`,
    createdAt: '2024-11-20T16:45:00Z',
    likes: 8,
    replies: [],
  },
  {
    id: 2,
    author: {
      id: 3,
      name: 'Mike Rodriguez',
      avatar: null,
      role: 'Member',
      joinDate: '2024-10-20',
      postCount: 67,
    },
    content: `I agree with David - the foreshadowing was masterful. But I have to admit, I was so focused on the mystery of "who did it" that I completely missed the "why" aspect. The psychological depth of Alicia's character really shines through in this chapter.

One thing that bothered me slightly was the pacing. The reveal felt a bit rushed compared to the slow build-up. What do you think - should the author have spread the clues out more evenly throughout the book?`,
    createdAt: '2024-11-20T18:22:00Z',
    likes: 6,
    replies: [
      {
        id: 3,
        author: {
          id: 1,
          name: 'Sarah Chen',
          avatar: null,
          role: 'Moderator',
          joinDate: '2024-10-16',
          postCount: 156,
        },
        content: `That's a really good point about the pacing, Mike. I think the author was trying to maintain suspense, but you're right that it might have been more effective to distribute the clues more evenly. It would have made the payoff even more satisfying.`,
        createdAt: '2024-11-20T19:15:00Z',
        likes: 4,
      },
    ],
  },
  {
    id: 4,
    author: {
      id: 4,
      name: 'Emma Thompson',
      avatar: null,
      role: 'Member',
      joinDate: '2024-10-22',
      postCount: 43,
    },
    content: `I loved this chapter! The twist was perfectly executed. I caught a few clues but not all of them. The broken mirror symbolism was brilliant - it really represented how Alicia's perception of reality was shattered.

I'm curious about the author's research process. Has anyone read any interviews with Alex Michaelides about how he developed this plot?`,
    createdAt: '2024-11-21T09:30:00Z',
    likes: 5,
    replies: [],
  },
];

const DiscussionThreadPage = () => {
  const [newReply, setNewReply] = useState('');

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      // Placeholder - in real app, this would submit to API
      console.log('Submitting reply:', newReply);
      setNewReply('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Owner':
        return 'text-red-400';
      case 'Moderator':
        return 'text-blue-400';
      default:
        return 'text-green-400';
    }
  };

  return (
    <NewPage>
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/book-clubs/1/discussions"
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Discussions
          </Link>
        </div>

        {/* Main Discussion Post */}
        <div className="customDark2 rounded-lg shadow-xl border border-[#2a2a2a] overflow-hidden">
          {/* Post Header */}
          <div className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-6 py-4">
            <h1 className="text-2xl font-bold text-white mb-2">
              {discussion.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {discussion.views} views
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {discussion.likes} likes
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {replies.length + 1} posts
              </div>
            </div>
          </div>

          {/* Original Post Content */}
          <div className="p-6">
            <div className="flex gap-4">
              {/* Author Info Sidebar */}
              <div className="w-48 shrink-0">
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[#FFC300]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {discussion.author.name}
                      </div>
                      <div
                        className={`text-xs ${getRoleColor(
                          discussion.author.role
                        )}`}
                      >
                        {discussion.author.role}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white/60 space-y-1">
                    <div>
                      Joined:{' '}
                      {new Date(
                        discussion.author.joinDate
                      ).toLocaleDateString()}
                    </div>
                    <div>Posts: {discussion.author.postCount}</div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                  <Clock className="w-4 h-4" />
                  Posted {formatDate(discussion.createdAt)}
                </div>
                <div className="text-white/90 leading-relaxed whitespace-pre-line">
                  {discussion.content}
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2a2a]">
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                    <Heart className="w-4 h-4" />
                    Like ({discussion.likes})
                  </button>
                  <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replies Section */}
        <div className="space-y-4">
          {replies.map((reply, index) => (
            <div
              key={reply.id}
              className={`customDark2 rounded-lg shadow-xl border border-[#2a2a2a] overflow-hidden ${
                index % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0d0d0d]'
              }`}
            >
              <div className="p-6">
                <div className="flex gap-4">
                  {/* Author Info Sidebar */}
                  <div className="w-48 shrink-0">
                    <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-[#FFC300]" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">
                            {reply.author.name}
                          </div>
                          <div
                            className={`text-xs ${getRoleColor(
                              reply.author.role
                            )}`}
                          >
                            {reply.author.role}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-white/60 space-y-1">
                        <div>
                          Joined:{' '}
                          {new Date(reply.author.joinDate).toLocaleDateString()}
                        </div>
                        <div>Posts: {reply.author.postCount}</div>
                      </div>
                    </div>
                  </div>

                  {/* Reply Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                      <Clock className="w-4 h-4" />
                      Posted {formatDate(reply.createdAt)}
                    </div>
                    <div className="text-white/90 leading-relaxed whitespace-pre-line">
                      {reply.content}
                    </div>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2a2a]">
                      <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                        <Heart className="w-4 h-4" />
                        Like ({reply.likes})
                      </button>
                      <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                        <Reply className="w-4 h-4" />
                        Reply
                      </button>
                    </div>

                    {/* Nested Replies */}
                    {reply.replies && reply.replies.length > 0 && (
                      <div className="mt-6 space-y-4">
                        {reply.replies.map((nestedReply) => (
                          <div
                            key={nestedReply.id}
                            className="ml-8 pl-4 border-l-2 border-[#FFC300]/30 bg-[#1a1a1a] rounded-lg p-4"
                          >
                            <div className="flex gap-3 mb-3">
                              <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center shrink-0">
                                <User className="w-4 h-4 text-[#FFC300]" />
                              </div>
                              <div>
                                <div className="font-semibold text-white text-sm">
                                  {nestedReply.author.name}
                                </div>
                                <div
                                  className={`text-xs ${getRoleColor(
                                    nestedReply.author.role
                                  )}`}
                                >
                                  {nestedReply.author.role}
                                </div>
                              </div>
                              <div className="text-xs text-white/60 ml-auto">
                                {formatDate(nestedReply.createdAt)}
                              </div>
                            </div>
                            <div className="text-white/90 leading-relaxed text-sm">
                              {nestedReply.content}
                            </div>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2a2a2a]">
                              <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors text-xs">
                                <Heart className="w-3 h-3" />
                                Like ({nestedReply.likes})
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reply Form */}
        <div className="customDark2 rounded-lg shadow-xl border border-[#2a2a2a] p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#FFC300]" />
            Post a Reply
          </h3>
          <div className="space-y-4">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Share your thoughts about this discussion..."
              className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 resize-vertical min-h-[120px]"
              rows={4}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitReply}
                disabled={!newReply.trim()}
                className="px-6 py-3 bg-[#FFC300] hover:bg-[#FFD700] disabled:bg-[#FFC300]/50 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default DiscussionThreadPage;
