import NewPage from '@/components/layout/NewPage';
import { BookOpen, Plus, Trash2, Edit, List, Star } from 'lucide-react';
import ReadingListCard from './ReadingListCard';
import { getReadingListsAction } from '@/actions/reading-list.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ReadingListsPage = async () => {
  const readingLists = await getReadingListsAction();

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                My Reading Lists
              </h1>
              <p className="text-white/70">
                Organize your favorite books and plan your reading journey
              </p>
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                <List className="w-4 h-4 text-[#FFC300]" />
              </div>
              <h2 className="text-xl font-bold text-white">
                Your Reading Lists
              </h2>
            </div>
 
            <Link href="/reading-lists/create">
              <Button variant={'beeYellow'}>Create New List</Button>
            </Link>
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
                <button className="px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  Create Your First List
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </NewPage>
  );
};

export default ReadingListsPage;
