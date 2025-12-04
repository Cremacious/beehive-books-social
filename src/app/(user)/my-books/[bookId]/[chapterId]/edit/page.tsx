import NewPage from '@/components/layout/NewPage';
import EditChapterForm from './EditChapterForm';
import { PenTool } from 'lucide-react';
import { getChapterForEditAction } from '@/actions/book.actions';

const EditChapterPage = async ({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) => {
  const { bookId, chapterId } = await params;

  const chapter = await getChapterForEditAction(bookId, chapterId);

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="rounded-3xl shadow-2xl p-6 md:p-8 darkContainer2">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
              <PenTool className="w-6 h-6 text-[#FFC300]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                Edit Chapter
              </h1>
              <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                Share your story with the world, one chapter at a time
              </p>
            </div>
          </div>
        </div>
        <EditChapterForm
          bookId={bookId}
          chapterId={chapterId}
          chapter={chapter}
        />
      </div>
    </NewPage>
  );
};

export default EditChapterPage;
