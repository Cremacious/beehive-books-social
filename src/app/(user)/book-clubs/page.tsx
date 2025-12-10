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
        <div className="darkContainer2 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  Book Clubs
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  Connect with fellow readers and discuss your favorite books
                </p>
              </div>
            </div>

            {userClubs.length !== 0 && (
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
            )}
          </div>
        </div>

        <MyClubs userClubs={userClubs} />
      </div>
    </NewPage>
  );
};

export default BookClubsPage;
