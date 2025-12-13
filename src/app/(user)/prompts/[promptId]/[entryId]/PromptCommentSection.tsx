'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import PromptComment from './PromptComment';
import { PromptCommentReply } from '@/stores/usePromptStore';

interface PromptCommentSectionProps {
  comments: {
    id: string;
    author: string;
    avatar: string | null;
    content: string;
    timestamp: string;
    likes: number;
    replies: PromptCommentReply[];
  }[];
}

const PromptCommentSection = ({ comments }: PromptCommentSectionProps) => {
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
            />
            <div className="flex justify-end mt-3">
              <Button variant={'beeYellow'} className=" flex items-center ">
                Add Comment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <PromptComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};
export default PromptCommentSection;
