import NewPage from '@/components/layout/NewPage';
import { MessageCircle, Hash, NotebookPen } from 'lucide-react';

import ChapterCommentSection from '@/app/(user)/my-books/[bookId]/components/ChapterCommentSection';
// import { chapterDetailData } from '@/lib/sampleData/books.sample';
import { getChapterByIdAction } from '@/actions/book.actions';

// const chapter = chapterDetailData;

// TODO: word count calculation

const PublicChapterPage = async ({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) => {
  const { chapterId } = await params;
  const chapter = await getChapterByIdAction(chapterId);

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
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-3 md:p-10">
          <div className="prose prose-lg prose-invert max-w-none">
            <div
              className="chapter-content text-white/90 leading-relaxed font-serif text-lg"
              dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
          </div>
        </div>

        <ChapterCommentSection chapter={chapter} />
      </div>
    </NewPage>
  );
};

export default PublicChapterPage;
