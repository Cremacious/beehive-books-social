import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import { BookOpen, Edit, MessageCircle, FileText, Hash } from 'lucide-react';
import coverImage from '@/assets/stock/cover.jpeg';

const book = {
  id: 1,
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

const chapters = [
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
        {/* Book Header Section */}
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
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

            {/* Book Details */}
            <div className="lg:col-span-2 space-y-4">
              <div>
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

              <p className="text-white leading-relaxed mb-6">
                {book.description}
              </p>

              {/* Stats */}
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

        {/* Chapters Section */}
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 min-h-[450px]">
          <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            Chapters
          </h2>

          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                className="flex items-center justify-between p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {chapter.title}
                    </h3>
                    {/* <p className="text-sm text-slate-600">
                      {chapter.wordCount} words
                    </p> */}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors">
                    Read
                  </button>
                  <button className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-medium transition-colors flex items-center gap-1">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default BookPage;
