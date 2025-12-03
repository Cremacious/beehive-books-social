'use client';
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Reply,
  Send,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

// TODO: Replace with actual types 

interface Comment {
  id: string;
  authorName: string;
  avatar: string | null;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

interface Chapter {
  id: string;
  title: string;
  commentCount: number;
  authorNotes: string | null;
  content: string;
  comments: Comment[];
}

interface ChapterCommentSectionProps {
  chapter: Chapter;
}

const ChapterCommentSection = ({ chapter }: ChapterCommentSectionProps) => {
  return (
    <div className="darkContainer2 rounded-2xl shadow-xl p-4 md:p-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
        <MessageCircle className="w-6 h-6" />
        Comments
        <span className="yellowBadge w-7 h-7">{chapter.commentCount}</span>
      </h2>

      <div className="mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <textarea
              placeholder="Share your thoughts about this chapter..."
              className="w-full  rounded-xl p-4 searchStyle"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <Button
                variant={'beeYellow'}
                className=" flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {chapter.comments.map((comment) => (
          <div
            key={comment.id}
            className="border-b border-yellow-500/10 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-white">
                    {comment.authorName}
                  </span>
                  <span className="text-white/50 text-sm">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                  <button className="text-white/50 hover:text-white/70 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-white/80 mb-3 leading-relaxed">
                  {comment.content}
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-white/60 hover:text-yellow-400 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-white/60 hover:text-yellow-400 transition-colors">
                    <Reply className="w-4 h-4" />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-4">
                        <div className="w-8 h-8 bg-yellow-500/15 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-white text-sm">
                              {reply.authorName}
                            </span>
                            <span className="text-white/50 text-xs">
                              {new Date(reply.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-white/50 hover:text-yellow-400 transition-colors text-xs">
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
