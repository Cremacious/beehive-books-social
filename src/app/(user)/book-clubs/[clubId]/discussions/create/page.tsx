import NewPage from '@/components/layout/NewPage';
import CreateClubDiscussionForm from './CreateClubDiscussionForm';

const ClubDiscussionCreatePage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { clubId } = await params;
  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto flex items-center justify-center min-h-[calc(100vh-200px)]">
        <CreateClubDiscussionForm clubId={clubId} />
      </div>
    </NewPage>
  );
};
export default ClubDiscussionCreatePage;
