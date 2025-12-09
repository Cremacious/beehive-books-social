import { User } from 'lucide-react';
import NewPage from '@/components/layout/NewPage';
import UpdateProfileImage from './components/UpdateProfileImage';
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
      <div className="w-full max-w-2xl mx-auto space-y-10">
        <div className="customDark2 rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 flex items-center gap-3">
            <User className="w-7 h-7" />
            User Settings
          </h1>
          <p className="text-white/70 mb-6">
            Manage your profile, password, and account preferences
          </p>

          <UpdateProfileImage userId={user.id} />

          <PasswordChange />

          <DeleteAccount />
        </div>
      </div>
    </NewPage>
  );
};

export default UserSettingsPage;
