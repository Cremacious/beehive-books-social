import NewPage from '@/components/layout/NewPage';

import MyClubs from './components/MyClubs';

import { getAllUserClubsAction } from '@/actions/club.actions';

const BookClubsPage = async () => {
  const userClubs = await getAllUserClubsAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <MyClubs userClubs={userClubs} />
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
