import NewPage from '@/components/layout/NewPage';

import { getClubReadingListAction } from '@/actions/club.actions';
import ClubReadingListHeader from './components/ClubReadingListHeader';
import ClubBookListView from './components/ClubBookListView';
import ClubListStats from './components/ClubListStats';
import BackButton from '@/components/shared/BackButton';

const ClubReadingListPage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { clubId } = await params;

  const readingList = await getClubReadingListAction(clubId);

  return (
    <NewPage>
      <BackButton text="Back to Club" href={`/book-clubs/${clubId}`} />
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <ClubReadingListHeader initialReadingList={readingList} />

        <ClubBookListView readingList={readingList} />

        <ClubListStats />
      </div>
    </NewPage>
  );
};

export default ClubReadingListPage;
