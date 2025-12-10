'use client';

import { Heart, User } from 'lucide-react';
import { useState } from 'react';
import { formatDate, getRoleColor } from '@/lib/utils';
import { DiscussionCommentType } from '@/lib/types';
import { useClubStore } from '@/stores/useClubStore';

const DiscussionNestedReply = ({
  nestedReply,
}: {
  nestedReply: DiscussionCommentType;
}) => {
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  const { likeDiscussionReply, unlikeDiscussionReply } = useClubStore();

  const handleLike = async (commentId: string) => {
    const isLiked = likedComments[commentId] || false;
    try {
      if (isLiked) {
        await unlikeDiscussionReply(commentId);
      } else {
        await likeDiscussionReply(commentId);
      }
      setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));

      // Update the nested reply likes count
      nestedReply.likes = isLiked
        ? Math.max(0, nestedReply.likes - 1)
        : nestedReply.likes + 1;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={nestedReply.id}
      className="ml-8 pl-4 border-l-2 rounded-2xl darkContainer3 p-4"
    >
      <div className="flex gap-3 mb-3">
        <div className="w-8 h-8 bg-[#FFC300]/20 rounded-full flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-[#FFC300]" />
        </div>
        <div>
          <div className="font-semibold text-white text-sm">
            {nestedReply.author.user.name}
          </div>
          <div className={`text-xs ${getRoleColor(nestedReply.author.role)}`}>
            {nestedReply.author.role}
          </div>
        </div>
        <div className="text-xs text-white/60 ml-auto">
          {formatDate(nestedReply.createdAt.toISOString())}
        </div>
      </div>
      <div className="text-white/90 leading-relaxed text-sm">
        {nestedReply.content}
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#2a2a2a]">
        <button
          className={`flex items-center gap-2 transition-colors text-xs ${
            likedComments[nestedReply.id]
              ? 'text-red-400 hover:text-red-300'
              : 'text-white/60 hover:text-[#FFC300]'
          }`}
          onClick={() => handleLike(nestedReply.id)}
        >
          <Heart className="w-3 h-3" />
          Like ({nestedReply.likes})
        </button>
      </div>
    </div>
  );
};
export default DiscussionNestedReply;
