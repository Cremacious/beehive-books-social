import NewPage from '@/components/layout/NewPage';
import { MessageCircle, Hash, Edit, NotebookPen } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChapterCommentSection from '../components/ChapterCommentSection';
import { getChapterByIdAction } from '@/actions/book.actions';
import BackButton from '@/components/shared/BackButton';

const ChapterPage = async ({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) => {
  const { chapterId } = await params;
  const chapter = await getChapterByIdAction(chapterId);

  return (
    <NewPage>
      <BackButton text="Back to Book" href={`/my-books/${chapter.bookId}`} />
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl mainFont text-yellow-400 mb-3 ">
                {chapter.title}
              </h1>
              <div className="flex items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-yellow-500" />

                  <span className="font-medium">{chapter.wordCount} words</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">
                    {chapter.commentCount} comments
                  </span>
                </div>
              </div>
            </div>
            <Link
              className="hidden md:flex"
              href={`/my-books/${chapter.bookId}/${chapter.id}/edit`}
            >
              <Button variant={'beeYellow'}>
                <Edit /> Edit Chapter
              </Button>
            </Link>
          </div>

          {chapter.authorNotes && (
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
          )}

          <div className="flex md:hidden  justify-center">
            <Link className="" href={`/my-books/${chapter.bookId}/${chapter.id}/edit`}>
              <Button className="w-full" variant={'beeYellow'}>
                <Edit /> Edit Chapter
              </Button>
            </Link>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="prose prose-lg prose-invert max-w-none">
            <div
              className="text-white/90 leading-relaxed font-serif text-lg"
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
          </div>
        </div>

        <ChapterCommentSection chapter={chapter} />
      </div>
    </NewPage>
  );
};

export default ChapterPage;
