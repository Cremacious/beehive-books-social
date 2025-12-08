import NewPage from '@/components/layout/NewPage';
import BookListView from './components/BookListView'
import { getReadingListAction } from '@/actions/reading-list.actions';
import ListStats from './components/ListStats';
import ReadingListHeader from './components/ReadingListHeader';

const ReadingListPage = async ({
  params,
}: {
  params: Promise<{ listId: string }>;
}) => {
  const { listId } = await params;

  const readingList = await getReadingListAction(listId);

  return (
    <NewPage>
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <ReadingListHeader initialReadingList={readingList} />

        <BookListView readingList={readingList} />

        <ListStats />
      </div>
    </NewPage>
  );
};

export default ReadingListPage;
