'use client';

import { Clock, Heart, Reply, User } from 'lucide-react';
import { useState } from 'react';
import DiscussionNestedReply from './DiscussionNestedReply';
import { formatDate, getRoleColor } from '@/lib/utils';
import { DiscussionCommentType } from '@/lib/types';
import { useClubStore } from '@/stores/useClubStore';
import { Button } from '@/components/ui/button';

const DiscussionReply = ({
  reply,
  index,
}: {
  reply: DiscussionCommentType;
  index: number;
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isPostingReply, setIsPostingReply] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const { addNestedDiscussionReply, likeDiscussionReply, unlikeDiscussionReply } = useClubStore();

  const handleLike = async (commentId: string) => {
    const isLiked = likedComments[commentId] || false;
    try {
      if (isLiked) {
        await unlikeDiscussionReply(commentId);
      } else {
        await likeDiscussionReply(commentId);
      }
      setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));

      // Update the reply likes count
      if (commentId === reply.id) {
        reply.likes = isLiked ? Math.max(0, reply.likes - 1) : reply.likes + 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostReply = async () => {
    if (!replyText.trim()) return;

    setIsPostingReply(true);
    try {
      const newReply = await addNestedDiscussionReply(reply.id, replyText);
      // Add the new reply to the replies array
      reply.replies = [...(reply.replies || []), newReply];
      setReplyText('');
      setShowReplyForm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostingReply(false);
    }
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };
  return (
    <div
      key={reply.id}
      className={`customDark2 rounded-lg shadow-xl overflow-hidden ${
        index % 2 === 0 ? 'bg-[#0a0a0a]' : 'bg-[#0d0d0d]'
      }`}
    >
      <div className="p-6 darkContainer2 rounded-2xl shadow-xl">
        <div className="flex gap-4 ">
          <div className="w-48 shrink-0">
            <div className="darkContainer3 rounded-2xl p-4 ">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#FFC300]/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-[#FFC300]" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {reply.author.user.name}
                  </div>
                  <div className={`text-xs ${getRoleColor(reply.author.role)}`}>
                    {reply.author.role}
                  </div>
                </div>
              </div>
              <div className="text-xs text-white/60 space-y-1">
                <div>
                  Joined: {new Date(reply.author.joinedAt).toLocaleDateString()}
                </div>
                <div>Posts: {reply.author.postCount}</div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
              <Clock className="w-4 h-4" />
              Posted {formatDate(reply.createdAt.toISOString())}
            </div>
            <div className="text-white/90 leading-relaxed whitespace-pre-line">
              {reply.content}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#2a2a2a]">
              <button
                className={`flex items-center gap-2 transition-colors ${
                  likedComments[reply.id]
                    ? 'text-red-400 hover:text-red-300'
                    : 'text-white/60 hover:text-[#FFC300]'
                }`}
                onClick={() => handleLike(reply.id)}
              >
                <Heart className="w-4 h-4" />
                Like ({reply.likes})
              </button>
              <button
                className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors"
                onClick={toggleReplyForm}
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </div>

            {showReplyForm && (
              <div className="mt-4">
                <textarea
                  placeholder="Write a reply..."
                  className="w-full bg-[#1a1a1a] border border-[#FFC300]/20 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:border-[#FFC300]/50 focus:ring-1 focus:ring-[#FFC300]/50 resize-vertical min-h-[100px]"
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleReplyForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={'beeYellow'}
                    size="sm"
                    onClick={handlePostReply}
                    disabled={isPostingReply || !replyText.trim()}
                  >
                    {isPostingReply ? 'Posting...' : 'Reply'}
                  </Button>
                </div>
              </div>
            )}


            {reply.replies && reply.replies.length > 0 && (
              <div className="mt-6 space-y-4">
                {reply.replies.map((nestedReply) => (
                  <DiscussionNestedReply
                    key={nestedReply.id}
                    nestedReply={nestedReply}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiscussionReply;
