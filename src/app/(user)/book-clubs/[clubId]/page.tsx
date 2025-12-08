import NewPage from '@/components/layout/NewPage';
import Image from 'next/image';
import {
  Users,
  BookOpen,
  Shield,
  Share,
  Crown,
  User,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import coverImage from '@/assets/stock/club-cover.jpg';
import ClubProgress from '../components/ClubProgress';
import ClubDiscussionPreview from '../components/ClubDiscussionPreview';
import ClubMembersPreview from '../components/ClubMembersPreview';
import ClubReadingListPreview from '../components/ClubReadingListPreview';

import Link from 'next/link';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { getClubByIdAction } from '@/actions/club.actions';
import { getUserRoleInClub } from '@/lib/utils';

const ClubPage = async ({
  params,
}: {
  params: Promise<{ clubId: string }>;
}) => {
  const { user } = await getAuthenticatedUser();
  if (!user) throw new Error('Unauthorized');

  const { clubId } = await params;

  const club = await getClubByIdAction(clubId);

  const userRole = getUserRoleInClub(club.members, user.id);

  return (
    <NewPage>
      <div className="w-full space-y-8">
        <div className="relative">
          <div className="h-48 md:h-64 rounded-3xl overflow-hidden relative">
            <Image
              src={club.cover || coverImage}
              alt={club.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 darkContainer2" />
            <div className="absolute bottom-6 left-6 md:left-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {club.name}
              </h1>
              <div className="flex items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{club._count.members} members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="capitalize">{club.privacy}</span>
                </div>
                <div className="flex items-center gap-2">
                  {userRole === 'OWNER' && (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  )}
                  {userRole === 'MEMBER' && <User className="w-4 h-4" />}
                  <span className="capitalize">{userRole}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex gap-3">
            <Button variant={'beeDark'}>
              <Share className="w-4 h-4" />
              Share
            </Button>

            <Link href={`/book-clubs/${club.id}/settings`}>
              <Button variant={'beeYellow'}>
                <Settings className="w-4 h-4 text-black" /> Edit Club
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="darkContainer2 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#FFC300]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  About This Club
                </h2>
              </div>
              <p className="text-white/80 leading-relaxed mb-4">
                {club.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#FFC300]/10 text-[#FFC300] rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {club.rules && (
                <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#FFC300]/20">
                  <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#FFC300]" />
                    Club Rules
                  </h3>
                  <p className="text-white/70 text-sm">{club.rules}</p>
                </div>
              )}
            </div>
            <ClubProgress
              club={{
                currentBook: club.currentBook,
                currentChapter: club.currentChapter,
                id: club.id,
              }}
              userRole={userRole ?? 'MEMBER'}
            />
            <ClubDiscussionPreview
              discussions={club.discussions}
              clubId={clubId}
            />
          </div>

          <div className="space-y-6">
            <ClubMembersPreview
              club={{ id: club.id, userRole: userRole ?? undefined }}
              members={club.members}
            />
            <ClubReadingListPreview
              clubId={club.id}
              readingList={club.readingList
                .filter(item => item.book !== null)
                .map(item => ({
                  ...item,
                  addedAt: typeof item.addedAt === 'string' ? item.addedAt : item.addedAt.toISOString(),
                  book: item.book as NonNullable<typeof item.book>,
                }))}
            />
          </div>
        </div>
      </div>
    </NewPage>
  );
};

export default ClubPage;
