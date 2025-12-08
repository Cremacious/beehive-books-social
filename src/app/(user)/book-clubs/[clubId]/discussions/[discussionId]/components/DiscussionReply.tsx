import { Clock, Heart, Reply, User } from 'lucide-react';
import DiscussionNestedReply from './DiscussionNestedReply';
import { formatDate, getRoleColor } from '@/lib/utils';
import { DiscussionCommentType } from '@/lib/types';

const DiscussionReply = ({
  reply,
  index,
}: {
  reply: DiscussionCommentType;
  index: number;
}) => {
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
              <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                <Heart className="w-4 h-4" />
                Like ({reply.likes})
              </button>
              <button className="flex items-center gap-2 text-white/60 hover:text-[#FFC300] transition-colors">
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </div>


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
