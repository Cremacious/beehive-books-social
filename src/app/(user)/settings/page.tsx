import NewPage from '@/components/layout/NewPage';
import UpdateProfileImage from './components/UpdateProfileImage';
import UpdateBio from './components/UpdateBio';
import PasswordChange from './components/PasswordChange';
import DeleteAccount from './components/DeleteAccount';
import { getAuthenticatedUser } from '@/lib/auth-server';

const UserSettingsPage = async () => {
  const { user } = await getAuthenticatedUser();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return (
    <NewPage>
      <div className="w-full max-w-5xl mx-auto space-y-10">
        <div className="">
          <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl mainFont font-bold text-yellow-400 mb-2 flex items-center gap-3">
              User Settings
            </h1>
            <p className="text-white/70 mb-6">
              Manage your profile, password, and account preferences
            </p>
          </div>
        </div>
        <UpdateProfileImage userId={user.id} />

        <UpdateBio userId={user.id} />

        <PasswordChange />

        <DeleteAccount />
      </div>
    </NewPage>
  );
};

export default UserSettingsPage;
