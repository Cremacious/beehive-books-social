import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';
import { Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MyBooksPage = () => {
  return (
    <NewPage>
      <div className="space-y-8 w-full">
        <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FFC300]/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#FFC300]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#FFC300] to-[#FFD700] bg-clip-text text-transparent">
                  My Books
                </h1>
                <p className="text-[#FFC300]/60 mt-2 text-lg font-medium">
                  Manage and continue writing your stories
                </p>
              </div>
            </div>
            <Link href="/my-books/create">
              <Button
                variant={'beeYellow'}
                size={'lg'}
                className="flex items-center justify-center space-x-2 w-full"
              >
                <Plus size={20} />
                New Book
              </Button>
            </Link>
          </div>
        </div>
        <MyBooksDisplay />
      </div>
    </NewPage>
  );
};

export default MyBooksPage;
