import NewPage from '@/components/layout/NewPage';

import DiscussionList from './DiscussionList';
import { getClubDiscussionsAction } from '@/actions/club.actions';
import BackButton from '@/components/shared/BackButton';

const ClubDiscussionPage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { clubId } = await params;

  const { club, discussions } = await getClubDiscussionsAction(clubId);

  return (
    <NewPage>
      <BackButton
        text={`Back to ${club.name}`}
        href={`/book-clubs/${clubId}`}
      />
      <div className="w-full space-y-8">
        <DiscussionList discussions={discussions} clubId={clubId} />
      </div>
    </NewPage>
  );
};

export default ClubDiscussionPage;
