import NewPage from '@/components/layout/NewPage';
import { Plus, List } from 'lucide-react';
import ReadingListCard from './ReadingListCard';
import { getReadingListsAction } from '@/actions/reading-list.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ReadingListsPage = async () => {
  const readingLists = await getReadingListsAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className=" p-6 md:p-8 ">
          <div className="flex flex-col md:flex-row items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-white text-center md:text-left">
              Your Reading Lists
            </h2>

            {readingLists.length > 0 && (
              <>
                <Link href="/reading-lists/create">
                  <Button
                    className="w-full md:w-auto mt-4 md:mt-0"
                    variant={'beeYellow'}
                  >
                    Create New List
                  </Button>
                </Link>
              </>
            )}
          </div>

          {readingLists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {readingLists.map((list) => (
                <ReadingListCard key={list.id} list={list} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
              <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                <List className="w-12 h-12 text-[#FFC300]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                No Reading Lists Yet
              </h3>
              <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                Create your first reading list to organize your favorite books
                and plan your reading journey.
              </p>
              <Link href="/reading-lists/create">
                <Button size={'lg'} variant={'beeYellow'}>
                  <Plus className="w-5 h-5" />
                  Create Your First List
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default ReadingListsPage;
