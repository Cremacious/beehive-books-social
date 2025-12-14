'use client';

import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/utils';
import { DiscussionCommentType } from '@/lib/types';
import {
  likeDiscussionReplyAction,
  unlikeDiscussionReplyAction,
} from '@/actions/club.actions';
import Image from 'next/image';

const DiscussionNestedReply = ({
  nestedReply,
}: {
  nestedReply: DiscussionCommentType;
}) => {
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const liked = localStorage.getItem(`liked-comment-${nestedReply.id}`);
    if (liked === 'true') {
      setLikedComments((prev) => ({ ...prev, [nestedReply.id]: true }));
    }
  }, [nestedReply.id]);

  const handleLike = async (commentId: string) => {
    const isLiked = likedComments[commentId] || false;
    try {
      if (isLiked) {
        await unlikeDiscussionReplyAction(commentId);
        localStorage.removeItem(`liked-comment-${commentId}`);
      } else {
        await likeDiscussionReplyAction(commentId);
        localStorage.setItem(`liked-comment-${commentId}`, 'true');
      }
      setLikedComments((prev) => ({ ...prev, [commentId]: !isLiked }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      key={nestedReply.id}
      className="ml-8 pl-4  rounded-2xl darkContainer3 p-4"
    >
      <div className="flex gap-3 mb-3 justify-center items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
            {nestedReply.author.user.image ? (
              <Image
                src={nestedReply.author.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-10 h-10 animate-pulse bg-[#FFC300]/10 rounded-full flex items-center justify-center text-yellow-400">
                {' '}
              </div>
            )}
          </div>
          <div className="font-semibold text-white text-sm">
            {nestedReply.author.user.name}
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
          <span className="text-sm">{nestedReply.likes}</span>
        </button>
      </div>
    </div>
  );
};
export default DiscussionNestedReply;
