'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Reply, Send } from 'lucide-react';
import Image from 'next/image';
import { usePromptStore } from '@/stores/usePromptStore';
import { PromptComment } from '@/stores/usePromptStore';

interface PromptCommentSectionProps {
  comments: PromptComment[];
  entryId: string;
}

const PromptCommentSection = ({
  comments: initialComments,
  entryId,
}: PromptCommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>(
    {}
  );
  const [comments, setComments] = useState<PromptComment[]>(initialComments);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isPostingReply, setIsPostingReply] = useState<Record<string, boolean>>(
    {}
  );

  const { addPromptComment, addPromptReply } = usePromptStore();

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const comment = await addPromptComment(entryId, newComment);
      setComments((prev) => [...prev, comment]);
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
      const reply = await addPromptReply(commentId, replyText);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), reply],
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

  const toggleReplyForm = (commentId: string) => {
    setShowReplyForm((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-10">
      <h2 className="text-2xl mainFont text-white mb-8 flex items-center gap-3">
        Comments
        <span className="yellowBadge w-7 h-7">{comments.length}</span>
      </h2>

      <div className="mb-8">
        <div className="flex">
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts about this entry..."
              className="w-full bg-[#1a1a1a] border border-yellow-500/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
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
                {isPostingComment ? 'Posting...' : 'Add Comment'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-yellow-500/10 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex gap-4">
              <Image
                src={comment.avatar || '/default-avatar.png'}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white">
                    {comment.author}
                  </span>
                  <span className="text-xs text-white/50">
                    {comment.timestamp}
                  </span>
                </div>
                <div className="text-white/80 leading-relaxed mb-2">
                  {comment.content}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-1 text-white/60 hover:text-yellow-400 transition-colors"
                    onClick={() => toggleReplyForm(comment.id)}
                  >
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                </div>

                {showReplyForm[comment.id] && (
                  <div className="mt-4 ml-4">
                    <textarea
                      placeholder="Write a reply..."
                      className="w-full bg-[#1a1a1a] border border-yellow-500/20 rounded-xl p-3 text-white placeholder-white/50 resize-none focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
                      rows={2}
                      value={replyTexts[comment.id] || ''}
                      onChange={(e) =>
                        setReplyTexts((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                    />
                    <div className="flex justify-end mt-2 gap-2">
                      <Button
                        variant={'beeDark'}
                        size="sm"
                        onClick={() =>
                          setShowReplyForm((prev) => ({
                            ...prev,
                            [comment.id]: false,
                          }))
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        variant={'beeYellow'}
                        size="sm"
                        onClick={() => handlePostReply(comment.id)}
                        disabled={
                          isPostingReply[comment.id] ||
                          !replyTexts[comment.id]?.trim()
                        }
                      >
                        {isPostingReply[comment.id] ? 'Posting...' : 'Reply'}
                      </Button>
                    </div>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-4 mt-4 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-2">
                        <Image
                          src={reply.avatar || '/default-avatar.png'}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <span className="font-semibold text-white">
                            {reply.author}
                          </span>{' '}
                          <span className="text-xs text-white/50">
                            {reply.timestamp}
                          </span>
                          <div className="text-white/70 leading-relaxed">
                            {reply.content}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PromptCommentSection;
