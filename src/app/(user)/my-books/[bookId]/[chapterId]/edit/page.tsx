import NewPage from '@/components/layout/NewPage';
import EditChapterForm from './EditChapterForm';

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
