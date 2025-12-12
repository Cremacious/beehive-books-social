import NewPage from '@/components/layout/NewPage';
import MyBooksDisplay from './components/MyBooksDisplay';
import { getUserBooksAction } from '@/actions/book.actions';

const MyBooksPage = async () => {
  const userBooks = await getUserBooksAction();

  return (
    <NewPage>
      <div className="w-full flex items-center justify-center min-h-[calc(100vh-200px)]">
        <MyBooksDisplay books={userBooks} />
      </div>
    </NewPage>
  );
};

export default MyBooksPage;
