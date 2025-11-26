import { Heart, User } from 'lucide-react';
import { formatDate, getRoleColor } from '@/lib/utils';

interface NestedReply {
  id: number;
  author: {
    id: number;
    name: string;
    avatar: null | string;
    role: string;
    joinDate: string;
    postCount: number;
  };
  content: string;
  createdAt: string;
  likes: number;
}

const DiscussionNestedReply = ({
  nestedReply,
}: {
  nestedReply: NestedReply;
}) => {
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
            {nestedReply.author.name}
          </div>
          <div className={`text-xs ${getRoleColor(nestedReply.author.role)}`}>
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
  );
};
export default DiscussionNestedReply;
