import NewPage from '@/components/layout/NewPage';
import { Plus, List } from 'lucide-react';
import { getReadingListsAction } from '@/actions/reading-list.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ReadingListDisplay from './ReadingListDisplay';

const ReadingListsPage = async () => {
  const readingLists = await getReadingListsAction();

  return (
    <NewPage>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl space-y-8">
          <div className="">
            <div className="items-center gap-3 mb-6 darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto justify-between">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 w-full">
                <h2 className="text-3xl font-bold mainFont text-white text-center md:text-left">
                  Your Reading Lists
                </h2>
                <div className="w-full md:w-auto">
                  {readingLists.length > 0 && (
                    <>
                      <Link href="/reading-lists/create" className="w-full">
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
              </div>
            </div>
            <div className="darkContainer2 rounded-2xl py-4 md:py-8 px-4 md:px-8">
              {readingLists.length > 0 ? (
                <ReadingListDisplay readingLists={readingLists} />
              ) : (
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                  <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
                    <List className="w-12 h-12 text-[#FFC300]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
                    No Reading Lists Yet
                  </h3>
                  <p className="text-white/70 mb-8 max-w-md leading-relaxed">
                    Create your first reading list to organize your favorite
                    books and plan your reading journey.
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
        </div>
      </div>
    </NewPage>
  );
};

export default ReadingListsPage;
