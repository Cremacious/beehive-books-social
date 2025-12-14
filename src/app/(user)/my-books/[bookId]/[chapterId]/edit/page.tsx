import NewPage from '@/components/layout/NewPage';
import EditChapterForm from './EditChapterForm';
import { getChapterForEditAction } from '@/actions/book.actions';
import { redirect } from 'next/navigation';

const EditChapterPage = async ({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) => {
  const { bookId, chapterId } = await params;

  try {
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
  } catch (error) {
    // Redirect to the book page if chapter not found or access denied
    redirect(`/my-books/${bookId}`);
  }
};

export default EditChapterPage;
