import BookClubs from './components/BookClubs';
import WritingPrompts from './components/WritingPrompts';
import ReadingList from './components/ReadingList';
import QuickActions from './components/QuickActions';
import NewPage from '@/components/layout/NewPage';
import { getDashboardDataAction } from '@/actions/user.actions';

export default async function DashboardPage() {
  const data = await getDashboardDataAction();

  return (
    <NewPage>
      <div className="space-y-8">
        <div className="flex w-full">
          <QuickActions />
        </div>

        <BookClubs activities={data.clubActivities} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ReadingList items={data.readingListItems} />
          <WritingPrompts prompts={data.prompts} />
        </div>
      </div>
    </NewPage>
  );
}