import NewPage from '@/components/layout/NewPage';
import CreateChapterForm from './CreateChapterForm';


const CreateChapterPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <CreateChapterForm bookId={bookId} />
      </div>
    </NewPage>
  );
};

export default CreateChapterPage;
