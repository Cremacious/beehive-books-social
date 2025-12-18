import NewPage from '@/components/layout/NewPage';
import { getUserByIdAction } from '@/actions/user.actions';
import ProfileHeader from './components/ProfileHeader';
import UserBooks from './components/UserBooks';

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  try {
    const profileData = await getUserByIdAction(userId);

    return (
      <NewPage>
        <div className="w-full space-y-8">
          <ProfileHeader
            user={profileData.user}
            bookCount={profileData.bookCount}
            isOwnProfile={profileData.isOwnProfile}
            isFriend={profileData.isFriend}
            hasPendingRequest={profileData.hasPendingRequest}
          />

          <UserBooks
            books={profileData.books}
            isOwnProfile={profileData.isOwnProfile}
          />
        </div>
      </NewPage>
    );
  } catch (error) {
    console.log('Error fetching profile data:', error);
    return (
      <NewPage>
        <div className="w-full space-y-8">
          <div className="darkContainer2 rounded-2xl shadow-xl p-8 md:p-10 text-center">
            <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👤</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
              User Not Found
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              The user you&apos;re looking for doesn&apos;t exist or may have
              been removed.
            </p>
            <a
              href="/dashboard"
              className="inline-block px-8 py-4 bg-linear-to-r from-[#FFC300] to-[#FFD700] text-[#1E3A4B] font-bold rounded-xl shadow-lg hover:shadow-[#FFC300]/20 hover:shadow-2xl hover:scale-105 transition-all duration-200"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </NewPage>
    );
  }
};

export default ProfilePage;
