'use client';

import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Heart, Reply, User } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { useClubStore } from '@/stores/useClubStore';
import { DiscussionCommentType } from '@/lib/types';

interface DiscussionReplySectionProps {
  discussionId: string;
  initialComments: DiscussionCommentType[];
}

const DiscussionReplySection = ({
  discussionId,
  initialComments,
}: DiscussionReplySectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>(
    {}
  );
  const [comments, setComments] =
    useState<DiscussionCommentType[]>(initialComments);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isPostingReply, setIsPostingReply] = useState<Record<string, boolean>>(
    {}
  );
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const {
    addDiscussionReply,
    addNestedDiscussionReply,
    likeDiscussionReply,
    unlikeDiscussionReply,
  } = useClubStore();

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const comment = await addDiscussionReply(discussionId, newComment);
      setComments((prev) => [...prev, comment as DiscussionCommentType]);
      setNewComment('');
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostingComment(false);
    }
  };

  const handlePostReply = async (commentId: string) => {
    const replyText = replyTexts[commentId];
    if (!replyText?.trim()) return;

    setIsPostingReply((prev) => ({ ...prev, [commentId]: true }));
    try {
      const reply = await addNestedDiscussionReply(commentId, replyText);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...(comment.replies || []),
                  reply as DiscussionCommentType,
                ],
              }
            : comment
        )
      );
      setReplyTexts((prev) => ({ ...prev, [commentId]: '' }));
      setShowReplyForm((prev) => ({ ...prev, [commentId]: false }));
    } catch (error) {
      console.log(error);
    } finally {
      setIsPostingReply((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const handleLike = async (commentId: string) => {
    const isLiked = likedComments[commentId] || false;
    try {
      if (isLiked) {
        await unlikeDiscussionReply(commentId);
      } else {
        await likeDiscussionReply(commentId);
      }
      setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));

      const updateLikes = (
        comments: DiscussionCommentType[]
      ): DiscussionCommentType[] => {
        return comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: isLiked
                ? Math.max(0, comment.likes - 1)
                : comment.likes + 1,
            };
          }
          if (comment.replies) {
            return {
              ...comment,
              replies: updateLikes(comment.replies),
            };
          }
          return comment;
        });
      };

      setComments((prev) => updateLikes(prev));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleReplyForm = (commentId: string) => {
    setShowReplyForm((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
        <MessageSquare className="w-6 h-6" />
        Comment
    
      </h2>

      <div className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts about this discussion..."
              className="w-full rounded-xl p-4 searchStyle"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <Button
                variant={'beeYellow'}
                className="flex items-center gap-2"
                onClick={handlePostComment}
                disabled={isPostingComment || !newComment.trim()}
              >
                <Send className="w-4 h-4" />
                {isPostingComment ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};
export default DiscussionReplySection;
