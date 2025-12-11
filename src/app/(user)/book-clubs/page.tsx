import NewPage from '@/components/layout/NewPage';
import { Users, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MyClubs from './components/MyClubs';

import { getAllUserClubsAction } from '@/actions/club.actions';

const BookClubsPage = async () => {
  const userClubs = await getAllUserClubsAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        {/* {userClubs.length !== 0 && (
          <>
            <Link href={'/book-clubs/create/'}>
              <Button
                variant={'beeYellow'}
                size={'lg'}
                className="flex items-center justify-center space-x-2 w-full"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Club</span>
              </Button>
            </Link>
          </>
        )} */}

        <MyClubs userClubs={userClubs} />
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
