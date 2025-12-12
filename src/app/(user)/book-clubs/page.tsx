import NewPage from '@/components/layout/NewPage';

import MyClubs from './components/MyClubs';

import { getAllUserClubsAction } from '@/actions/club.actions';

const BookClubsPage = async () => {
  const userClubs = await getAllUserClubsAction();

  return (
    <NewPage>
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
        <MyClubs userClubs={userClubs} />
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
