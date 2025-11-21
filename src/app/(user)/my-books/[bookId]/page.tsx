import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import {
  BookOpen,
  Edit,
  MessageCircle,
  FileText,
  Hash,
  Plus,
} from 'lucide-react';
import coverImage from '@/assets/stock/cover.jpeg';
import ChapterListItem from '../components/ChapterListItem';
import AddChapterButton from './components/AddChapterButton';
import EditBookButton from './components/EditBookButton';

const book = {
  id: 111,
  title: 'The Last Spire',
  author: 'Anya Sharma',
  genre: 'Mystery',
  category: 'Fiction',
  description:
    'In the shadowed valleys of Eldoria, where ancient secrets whisper through the mist, a young archaeologist uncovers a forbidden artifact that awakens forces long dormant. As alliances fracture and betrayals unfold, she must navigate a web of intrigue to prevent catastrophe. A thrilling mystery that blends historical lore with modern suspense.',
  chaptersCount: 12,
  wordCount: 45230,
  commentCount: 47,
  cover: '/assets/stock/cover.jpeg',
  publishedDate: '2024-03-15',
  lastUpdated: '2024-11-10',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chapters: any[] = [
  { id: 1, title: 'The Discovery', wordCount: 3200 },
  { id: 2, title: 'Whispers in the Dark', wordCount: 4100 },
  { id: 3, title: 'The Ancient Map', wordCount: 3800 },
  { id: 4, title: 'Shadows of the Past', wordCount: 4200 },
  { id: 5, title: 'The Hidden Chamber', wordCount: 3600 },
  { id: 6, title: 'Betrayal', wordCount: 3900 },
  { id: 7, title: 'The Ritual', wordCount: 4300 },
  { id: 8, title: 'Awakening', wordCount: 4100 },
  { id: 9, title: 'The Chase', wordCount: 3800 },
  { id: 10, title: 'Confrontation', wordCount: 4500 },
  { id: 11, title: 'Revelation', wordCount: 4200 },
  { id: 12, title: 'The Final Stand', wordCount: 4800 },
];

const BookPage = () => {
  return (
    <NewPage>
      <div className="w-full space-y-8 ">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-white mb-1">by {book.author}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      {book.genre}
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                  </div>
                </div>
                <EditBookButton bookId={book.id} />
              </div>

              <p className="text-white leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.chaptersCount}
                    </span>
                  </div>
                  <p className="text-sm text-white">Chapters</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Hash className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.wordCount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-white">Words</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.commentCount}
                    </span>
                  </div>
                  <p className="text-sm text-white">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 min-h-[450px] max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              Chapters
            </h2>
            <AddChapterButton bookId={book.id} />
          </div>

          <div className="space-y-4 ">
            {chapters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-24 h-24 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🐝</span>
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                  No Chapters Yet
                </h3>
                <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                  Your story is waiting to be told! Start building your novel by
                  adding your first chapter. Each chapter is a step closer to
                  completing your masterpiece.
                </p>
                <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105">
                  <Plus className="w-5 h-5" />
                  Add Your First Chapter
                </button>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <ChapterListItem
                  key={chapter.id}
                  chapter={chapter}
                  chapterId={chapter.id}
                  index={index}
                  bookId={book.id}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default BookPage;
