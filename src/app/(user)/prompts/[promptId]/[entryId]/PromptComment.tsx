import { User } from 'lucide-react';

export interface PromptCommentReply {
  id: string;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
}

export interface PromptComment {
  id: string;
  author: string;
  avatar: string | null;
  content: string;
  timestamp: string;
  likes: number;
  replies: PromptCommentReply[];
}

const PromptComment = ({ comment }: { comment: PromptComment }) => {
  return (
    <div
      key={comment.id}
      className="border-b border-yellow-500/10 pb-6 last:border-b-0 last:pb-0"
    >
      <div className="flex gap-4">
        <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
          <User className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{comment.author}</span>
            <span className="text-xs text-white/50">{comment.timestamp}</span>
          </div>
          <div className="text-white/80 leading-relaxed mb-2">
            {comment.content}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-4 mt-2 space-y-2">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex gap-2">
                  <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-yellow-400" />
                  </div>
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
  );
};
export default PromptComment;
