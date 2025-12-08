import NewPage from '@/components/layout/NewPage';
import EditClubForm from './components/EditClubForm';
import EditClubMembers from './components/EditClubMembers';
import { getClubForEditAction } from '@/actions/club.actions';

const ClubSettingsPage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { clubId } = await params;

  const club = await getClubForEditAction(clubId);
  

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                Club Settings
              </h1>
              <p className="text-white/70">
                Manage your book club details and members
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10 border border-[#2a2a2a]">
              <EditClubForm club={club} />
            </div>
          </div>

          <EditClubMembers club={club} />
        </div>
      </div>
    </NewPage>
  );
};

export default ClubSettingsPage;
