import NewPage from '@/components/layout/NewPage';
import {
  MessageSquare,
  Plus,
  Search,
  User,
  Heart,
  Clock,
  X,
} from 'lucide-react';
import Link from 'next/link';
// import CreateDiscussionModal from './components/CreateDiscussionModal';
import DiscussionListItem from '../../components/DiscussionListItem';
import { Button } from '@/components/ui/button';
import DiscussionList from './DiscussionList';
import { getClubDiscussionsAction } from '@/actions/club.actions';

const ClubDiscussionPage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { clubId } = await params;

  const { club, discussions } = await getClubDiscussionsAction(clubId);

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Club Discussions
              </h1>
              <p className="text-white/70">
                Join conversations about {club.name}
              </p>
            </div>
          </div>
        </div>

        <div className="darkContainer2 rounded-2xl shadow-xl p-2 md:p-8 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between md:mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#FFC300]" />
              All Discussions
              <span className="yellowBadge w-7 h-7">{discussions.length}</span>
            </h2>
            <div className="mt-4 md:mt-0">
              <Link href={`/book-clubs/${clubId}/discussions/create`}>
                <Button size={'sm'} variant={'beeYellow'}>
                  <Plus className="w-5 h-5" />
                  New Discussion
                </Button>
              </Link>
            </div>
          </div>

          <DiscussionList discussions={discussions} clubId={clubId} />
        </div>
      </div>
    </NewPage>
  );
};

export default ClubDiscussionPage;
