import NewPage from '@/components/layout/NewPage';
import { BookOpen, Edit } from 'lucide-react';
import EditBookForm from './EditBookForm';
import { getBookByIdAction } from '@/actions/book.actions';
const EditBookPage = async ({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) => {
  const { bookId } = await params;

  const book = await getBookByIdAction(bookId);

  return (
    <NewPage>
      <div className="w-full max-w-4xl mx-auto space-y-8">


        <EditBookForm book={book} />
      </div>
    </NewPage>
  );
};
export default EditBookPage;
