import NewPage from '@/components/layout/NewPage';
import { Button } from '@/components/ui/button';
import { User, MessageCircle } from 'lucide-react';
import PromptComment from './PromptComment';

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
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
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

          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-white/90 leading-relaxed whitespace-pre-line font-serif text-lg">
              {entry.content}
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-10">
          <h2 className="text-2xl font-bold text-yellow-400 mb-8 flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
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
      </div>
    </NewPage>
  );
};

export default PromptEntryPage;
