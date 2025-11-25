import NewPage from '@/components/layout/NewPage';
import {
  MessageCircle,
  Hash,
  Edit,
  Send,
  MoreVertical,
  Heart,
  Reply,
  User,
  NotebookPen,
} from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChapterCommentSection from '../components/ChapterCommentSection';

const chapter = {
  id: 1,
  title: 'The Discovery',
  wordCount: 3200,
  commentCount: 12,
  authorNotes:
    "This chapter introduces the main character and sets up the mystery. I wanted to create a sense of wonder mixed with subtle tension. The archaeological site is inspired by real locations I've visited.",
  content: `The morning mist clung to the ancient stones like a shroud, obscuring the true majesty of the ruins that had stood silent for centuries. Dr. Elena Vasquez adjusted her wide-brimmed hat against the rising sun, her boots crunching softly on the gravel path that wound through the Peruvian highlands.

Her team had been excavating for three weeks now, but today felt different. There was an electricity in the air, a palpable sense of anticipation that made her pulse quicken. The local legends spoke of a temple hidden within these mountains—a place of power and secrets that predated even the Incas.

"Doctor Vasquez!" called Marco, her lead excavator, his voice echoing off the stone walls. "You need to see this."

She hurried to the excavation site, her heart pounding. What they had uncovered wasn't just another artifact—it was the entrance to something far more significant. The stone door, perfectly preserved despite centuries of exposure, bore markings that none of them could immediately identify.

As Elena traced her fingers over the intricate carvings, she felt a strange vibration beneath her touch. The ground seemed to hum with ancient energy, and for a moment, she wondered if they had awakened something that should have remained dormant.

"Careful, Doctor," Marco warned, his eyes wide. "This place... it feels alive."

Elena nodded, but her mind was already racing ahead. Whatever secrets lay beyond this door, she was determined to uncover them. The world of archaeology was about to change forever.`,
};

const comments = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: null,
    content:
      "This opening really draws you in! The description of the mist and ancient stones creates such an atmospheric setting. I love how you're building tension right from the start.",
    timestamp: '2 hours ago',
    likes: 8,
    replies: [
      {
        id: 2,
        author: 'Anya Sharma',
        avatar: null,
        content:
          'Thanks Sarah! I spent a lot of time on that opening scene. The Peruvian highlands are so visually striking - I wanted readers to feel like they were really there.',
        timestamp: '1 hour ago',
        likes: 3,
      },
      {
        id: 3,
        author: 'Mike Rodriguez',
        avatar: null,
        content:
          'The archaeological details feel authentic. Have you done fieldwork in Peru?',
        timestamp: '45 minutes ago',
        likes: 2,
      },
    ],
  },
  {
    id: 4,
    author: 'David Kim',
    avatar: null,
    content:
      "The character of Dr. Vasquez is intriguing. I'm curious about her background - is she based on anyone you know?",
    timestamp: '1 hour ago',
    likes: 5,
    replies: [],
  },
  {
    id: 5,
    author: 'Emma Thompson',
    avatar: null,
    content:
      "Love the pacing! You're not rushing the reveal, which makes the mystery more compelling. Can't wait for the next chapter.",
    timestamp: '30 minutes ago',
    likes: 12,
    replies: [],
  },
];

const ChapterPage = () => {
  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
                {chapter.title}
              </h1>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">
                    {chapter.wordCount.toLocaleString()} words
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">
                    {chapter.commentCount} comments
                  </span>
                </div>
              </div>
            </div>
            <Link className="hidden md:flex" href={`/my-books/111/11/edit`}>
              <Button variant={'beeYellow'}>
                <Edit /> Edit Chapter
              </Button>
            </Link>
          </div>

          <div className="backgroundYellow rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <span className="text-xl">
                <NotebookPen />
              </span>
              Author&apos;s Notes
            </h3>
            <p className="text-white/80 leading-relaxed">
              {chapter.authorNotes}
            </p>
          </div>
          <div className="flex md:hidden  justify-center">
            <Link className="" href={`/my-books/111/11/edit`}>
              <Button className="w-full" variant={'beeYellow'}>
                <Edit /> Edit Chapter
              </Button>
            </Link>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="prose prose-lg prose-invert max-w-none">
            <div className="text-white/90 leading-relaxed whitespace-pre-line font-serif text-lg">
              {chapter.content}
            </div>
          </div>
        </div>

        <ChapterCommentSection chapter={chapter} comments={comments} />
      </div>
    </NewPage>
  );
};

export default ChapterPage;
