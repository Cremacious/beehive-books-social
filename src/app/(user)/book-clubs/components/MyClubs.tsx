import { BookOpen, Crown, Plus, Shield, User, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface UserBookClubs {
  id: string;
  name: string;
  description: string;
  currentBook: string;
  cover: string;
  members: number;
  role: string;
  privacy: string;
}

const MyClubs = ({ userClubs }: { userClubs: UserBookClubs[] }) => {
  return (
    <div className="p-6 md:p-8 ">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#FFC300]/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-[#FFC300]" />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <h2 className="text-xl font-bold text-white">My Clubs</h2>
          <span className="yellowBadge h-7 w-7">{userClubs.length}</span>
        </div>
      </div>

      {userClubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
          <div className="w-24 h-24 bg-[#FFC300]/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🐝</span>
          </div>
          <h3 className="text-2xl font-bold text-[#FFC300] mb-3">
            No Clubs Yet
          </h3>
          <p className="text-white/70 mb-8 max-w-md leading-relaxed">
            Join your first book club or create one to start discussing books
            with fellow readers!
          </p>
          <Link href={'/book-clubs/create/'}>
            <Button size={'lg'} variant={'beeYellow'}>
              <Plus className="w-5 h-5" />
              <span>Create Your First Club</span>
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userClubs.map((club) => (
            <div
              key={club.id}
              className="rounded-xl p-4 darkContainer3 cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
            

                <div className="flex-1 min-w-0 flex flex-col justify-center mx-4">
                  <h3 className="font-semibold text-white truncate">
                    {club.name}
                  </h3>
                  <p className="text-[#FFC300]/60 text-sm truncate">
                    {club.currentBook}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="w-3 h-3 text-[#FFC300]/60" />
                    <span className="text-xs text-white/70">
                      {club.members} members
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full backgroundYellow`}
                    >
                      {club.privacy}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 text-sm mb-3 line-clamp-2 mx-2">
                {club.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {club.role === 'Owner' && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                  {club.role === 'Moderator' && (
                    <Shield className="w-4 h-4 text-blue-400" />
                  )}
                  {club.role === 'Member' && (
                    <User className="w-4 h-4 text-white" />
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      club.role === 'Owner'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : club.role === 'Moderator'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-white'
                    }`}
                  >
                    {club.role}
                  </span>
                </div>
                <Link href={`/book-clubs/${club.id}`}>
                  <Button size={'sm'} variant={'beeYellow'}>
                    View Club
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClubs;
