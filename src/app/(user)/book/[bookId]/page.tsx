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
import BookChapterListItem from './components/BookChapterListItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import { bookDetailData } from '@/lib/sampleData/books.sample';
import { getPublicBookByIdAction } from '@/actions/book.actions';
import defaultImage from '@/assets/stock/cover.jpeg';
import { notFound } from 'next/navigation';
// const book = bookDetailData;
// const chapters = book.chapters;
import ShareButton from '@/components/shared/ShareButton';

const PublicBookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  let book;
  try {
    book = await getPublicBookByIdAction(bookId);
  } catch (error) {
    console.log(error);
    notFound();
  }

  return (
    <NewPage>
      <div className="w-full space-y-8 ">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={book.cover ?? defaultImage}
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
                  <p className="text-xl text-white mb-4">by {book.author}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="backgroundYellow  px-3 py-1 rounded-full text-sm font-medium">
                      {book.genre}
                    </span>
                    <span className="backgroundYellow px-3 py-1 rounded-full text-sm font-medium">
                      {book.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-white leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <FileText className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.chapterCount}
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
                <div className="text-center col-span-2 md:col-span-1">
                  <div className="flex items-center justify-center mb-1">
                    <MessageCircle className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-white">
                      {book.commentCount}
                    </span>
                  </div>
                  <p className="text-sm text-white">Comments</p>
                </div>
              </div>
              <ShareButton bookId={book.id} />
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-10 min-h-[450px] max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2 p-2">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              Chapters
            </h2>
          </div>

          <div className="space-y-4 ">
            {book.chapters.length === 0 ? (
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
              </div>
            ) : (
              book.chapters.map((chapter, index) => (
                <BookChapterListItem
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

export default PublicBookPage;
