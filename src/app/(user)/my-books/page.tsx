import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';
import { Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
// import { bookDisplayData } from '@/lib/sampleData/books.sample';
import { getUserBooksAction } from '@/actions/book.actions';

const MyBooksPage = async () => {
  const userBooks = await getUserBooksAction();

  return (
    <NewPage>
      <div className="space-y-8 w-full">
      
        <MyBooksDisplay books={userBooks} />
      </div>
    </NewPage>
  );
};

export default MyBooksPage;
