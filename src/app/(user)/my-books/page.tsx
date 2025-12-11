import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';
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
