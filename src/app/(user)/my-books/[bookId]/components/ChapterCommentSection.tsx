'use client';
import {
  Heart,
  MessageCircle,
  // MoreVertical,
  Reply,
  Send,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useBookStore } from '@/stores/useBookStore';

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  likes: number;
  userId: string;
  chapterId: string;
  parentId?: string | null;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  replies?: Comment[];
}

interface Chapter {
  id: string;
  title: string;
  commentCount: number;
  authorNotes: string | null;
  content: string;
  wordCount: number;
  comments: Comment[];
  isFriend: boolean;
  bookUserId: string;
}

interface ChapterCommentSectionProps {
  chapter: Chapter;
}

const ChapterCommentSection = ({ chapter }: ChapterCommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [showReplyForm, setShowReplyForm] = useState<Record<string, boolean>>(
    {}
  );
  const [comments, setComments] = useState<Comment[]>(chapter.comments);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isPostingReply, setIsPostingReply] = useState<Record<string, boolean>>(
    {}
  );
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const loadLikedStates = (comments: Comment[]): Record<string, boolean> => {
      const liked: Record<string, boolean> = {};
      const processComments = (comms: Comment[]) => {
        comms.forEach((comment) => {
          const likedKey = localStorage.getItem(`liked-comment-${comment.id}`);
          if (likedKey === 'true') {
            liked[comment.id] = true;
          }
          if (comment.replies) {
            processComments(comment.replies);
          }
        });
      };
      processComments(comments);
      return liked;
    };

    const initialLiked = loadLikedStates(chapter.comments);
    setLikedComments(initialLiked);
  }, [chapter.comments]);

  const { addComment, addReply, likeComment, unlikeComment } = useBookStore();

  if (!chapter.isFriend) {
    return null;
  }

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPostingComment(true);
    try {
      const comment = await addComment(chapter.id, newComment);
      setComments((prev) => [...prev, comment as Comment]);
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
      const reply = await addReply(commentId, replyText);
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), reply as Comment],
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
        await unlikeComment(commentId);
        localStorage.removeItem(`liked-comment-${commentId}`);
      } else {
        await likeComment(commentId);
        localStorage.setItem(`liked-comment-${commentId}`, 'true');
      }
      setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));

      const updateLikes = (comments: Comment[]): Comment[] => {
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
        <MessageCircle className="w-6 h-6" />
        Comments
        <span className="yellowBadge w-7 h-7">{comments.length}</span>
      </h2>

      <div className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts about this chapter..."
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

      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-yellow-500/10 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                {comment.user.image ? (
                  <Image
                    src={comment.user.image}
                    alt={comment.user.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-yellow-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-white">
                    {comment.user.name}
                  </span>
                  <span className="text-white/50 text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                  {/* <button className="text-white/50 hover:text-white/70 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button> */}
                </div>
                <p className="text-white/80 mb-3 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      likedComments[comment.id]
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-white/60 hover:text-yellow-400'
                    }`}
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                  <button
                    className="flex items-center gap-1 text-white/60 hover:text-yellow-400 transition-colors"
                    onClick={() => toggleReplyForm(comment.id)}
                  >
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>

                {showReplyForm[comment.id] && (
                  <div className="mt-4">
                    <textarea
                      placeholder="Write a reply..."
                      className="w-full rounded-xl p-3 searchStyle text-sm"
                      rows={2}
                      value={replyTexts[comment.id] || ''}
                      onChange={(e) =>
                        setReplyTexts((prev) => ({
                          ...prev,
                          [comment.id]: e.target.value,
                        }))
                      }
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <Button
                        variant={'beeDark'}
                        size="sm"
                        onClick={() => toggleReplyForm(comment.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant={'beeYellow'}
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handlePostReply(comment.id)}
                        disabled={
                          isPostingReply[comment.id] ||
                          !replyTexts[comment.id]?.trim()
                        }
                      >
                        <Send className="w-3 h-3" />
                        {isPostingReply[comment.id] ? 'Posting...' : 'Reply'}
                      </Button>
                    </div>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4">
                        <div className="w-8 h-8 bg-yellow-500/15 rounded-full flex items-center justify-center shrink-0">
                          {reply.user.image ? (
                            <Image
                              src={reply.user.image}
                              alt={reply.user.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-white text-sm">
                              {reply.user.name}
                            </span>
                            <span className="text-white/50 text-xs">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button
                              className={`flex items-center gap-1 transition-colors text-xs ${
                                likedComments[reply.id]
                                  ? 'text-red-400 hover:text-red-300'
                                  : 'text-white/50 hover:text-yellow-400'
                              }`}
                              onClick={() => handleLike(reply.id)}
                            >
                              <Heart className="w-3 h-3" />
                              <span>{reply.likes}</span>
                            </button>
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

export default ChapterCommentSection;
