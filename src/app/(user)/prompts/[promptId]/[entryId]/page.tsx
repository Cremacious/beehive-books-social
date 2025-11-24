import NewPage from '@/components/layout/NewPage';
import { User, MessageCircle } from 'lucide-react';

const entry = {
  id: 1,
  author: 'David Kim',
  avatar: null,
  dateAdded: '2025-11-22',
  content:
    'The door was ancient, covered in moss and secrets. When I stepped through, the world shimmered and changed. I felt the forest breathe around me, and every step was a story waiting to be told.',
};

const comments = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: null,
    content:
      'Beautiful imagery! I love how you made the forest feel alive. The ending left me wanting more.',
    timestamp: '2 hours ago',
    likes: 4,
    replies: [
      {
        id: 2,
        author: 'David Kim',
        avatar: null,
        content:
          'Thank you, Sarah! I wanted the forest to be a character in itself.',
        timestamp: '1 hour ago',
        likes: 2,
      },
    ],
  },
  {
    id: 3,
    author: 'Emma Thompson',
    avatar: null,
    content:
      'The sense of mystery is so strong. I could picture every detail. Great work!',
    timestamp: '1 hour ago',
    likes: 3,
    replies: [],
  },
];

const PromptEntryPage = () => {
  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
                Entry by {entry.author}
              </h1>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{entry.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Added {entry.dateAdded}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-6 mb-8">
            <div className="text-white/90 leading-relaxed whitespace-pre-line font-serif text-lg">
              {entry.content}
            </div>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            Comments ({comments.length})
          </h2>

          <div className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <textarea
                  placeholder="Share your thoughts about this entry..."
                  className="w-full bg-[#1a1a1a] border border-yellow-500/20 rounded-xl p-4 text-white placeholder-white/50 resize-none focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button className="px-6 py-2 bg-[#FFC300] hover:bg-[#FFD700] text-black font-bold rounded-lg transition-all flex items-center gap-2">
                    Add Comment
                  </button>
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
                    <User className="w-5 h-5 text-yellow-400" />
                  </div>
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
            ))}
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default PromptEntryPage;
